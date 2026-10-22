"""Import the full text and artwork of selected Publii posts into the Astro blog.

The Publii databases are opened read-only. For each selected post this copies
every image the body references into the site's public folder, rewrites the
`#DOMAIN_NAME#` placeholder to that new path, strips the editor's Tailwind
utility classes so the site's own typography applies, and writes one Markdown
file whose body is the original article HTML unchanged.

Run:  python tools/import-publii-posts.py            (all selections)
      python tools/import-publii-posts.py --only 81  (a single post)
"""

import argparse
import datetime
import os
import re
import shutil
import sqlite3
import sys

SITE_ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
CONTENT_DIR = os.path.join(SITE_ROOT, "src", "content", "blog")
PUBLIC_DIR = os.path.join(SITE_ROOT, "public", "assets", "images", "blog")

INPUT_ROOTS = {
    "bess": r"D:\Administrator\Documents\Publii\sites\ruibitbess\input",
    "energy": r"D:\Administrator\Documents\Publii\sites\ruibitenergy\input",
}

# Path prefixes that exist in the new site. Links that start with "/" and match
# none of these point at pages from the old sites that were not carried over, so
# the anchor is unwrapped and its text kept.
KEEP_PREFIXES = (
    "/products/",
    "/solutions/",
    "/projects/",
    "/technology/",
    "/resources/",
    "/blog/",
    "/contact/",
    "/about/",
)

SELECTION = [
    # C&I / BESS site
    dict(site="bess", id=81, category="C&I BESS",
         products=["loong-power-bs09-112-dp", "honey-125kw-261kwh-all-in-one-ess"]),
    dict(site="bess", id=82, category="System design",
         products=["honey-125kw-261kwh-all-in-one-ess"]),
    dict(site="bess", id=83, category="Buyer guide",
         products=["honey-125kw-261kwh-all-in-one-ess", "loong-power-bs09-225-d"]),
    dict(site="bess", id=85, category="Safety",
         products=["honey-wd-ecf260s-dc-outdoor", "loong-power-bs09-225-d"]),
    dict(site="bess", id=95, category="System design",
         products=["honey-wd-ecf260s-dc-outdoor", "honey-125kw-261kwh-all-in-one-ess"]),
    dict(site="bess", id=114, category="Application",
         products=["loong-power-bs09-112-dp", "sunflower-125kw-261kwh-pv-hybrid-ess"]),
    # Residential site
    dict(site="energy", id=97, category="Residential storage",
         products=["powerfly-hzeb-lct-10", "six-ultra-bs06-s-hv-stackable"]),
    dict(site="energy", id=98, category="System design",
         products=["six-ultra-bs06-s-hv-stackable", "powerfly-hzeb-lct-10"]),
    dict(site="energy", id=99, category="System design",
         products=["powerfly-hzeb-lct-10"]),
    dict(site="energy", id=111, category="Safety",
         products=["powerfly-hzeb-lct-5", "six-ultra-bs06-s-hv-stackable"]),
    dict(site="energy", id=115, category="Buyer guide",
         products=["powerfly-hzeb-lct-10", "powerfly-hzeb-lct-20"]),
    dict(site="energy", id=122, category="Residential storage",
         products=["powerfly-hzeb-lct-10", "six-ultra-bs06-s-hv-stackable"]),
]

# Second batch: fifty more articles, chosen from the same two Publii sites by
# length (every one is over 1,100 words in source) and by how little they repeat
# the first twelve. The two hand-written posts already on the site — AC vs DC
# coupling and EV-charging sizing — are for commercial scope, so the residential
# versions here (energy 154 and 140) are deliberate companion pieces, not repeats.
SELECTION += [
    # --- C&I / BESS site -------------------------------------------------
    dict(site="bess", id=121, category="C&I BESS",
         products=["dawnice-containerized-bess", "honey-125kw-261kwh-all-in-one-ess"]),
    dict(site="bess", id=120, category="Certification",
         products=["loong-power-bs09-225-d", "honey-wd-ecf260s-dc-outdoor"]),
    dict(site="bess", id=124, category="Application",
         products=["sunflower-125kw-261kwh-pv-hybrid-ess", "dawnice-containerized-bess"]),
    dict(site="bess", id=119, category="Safety",
         products=["honey-125kw-261kwh-all-in-one-ess", "loong-power-bs09-112-dp"]),
    dict(site="bess", id=117, category="Buyer guide",
         products=["honey-125kw-261kwh-all-in-one-ess", "dawnice-enterflex-bs09-64-241-rack"]),
    dict(site="bess", id=123, category="Buyer guide",
         products=["honey-125kw-261kwh-all-in-one-ess", "loong-power-bs09-225-d"]),
    dict(site="bess", id=155, category="Certification",
         products=["dawnice-containerized-bess", "honey-125kw-261kwh-all-in-one-ess"]),
    dict(site="bess", id=172, category="Technology",
         products=["loong-power-bs09-225-d", "dawnice-enterflex-bs09-64-241-rack"]),
    dict(site="bess", id=160, category="Certification",
         products=["honey-wd-ecf260s-dc-outdoor", "dawnice-containerized-bess"]),
    dict(site="bess", id=158, category="Buyer guide",
         products=["honey-125kw-261kwh-all-in-one-ess"]),
    dict(site="bess", id=97, category="Safety",
         products=["loong-power-bs09-225-d", "honey-wd-ecf260s-dc-outdoor"]),
    dict(site="bess", id=116, category="Sizing",
         products=["honey-125kw-261kwh-all-in-one-ess", "dawnice-enterflex-bs09-64-241-rack"]),
    dict(site="bess", id=94, category="Buyer guide",
         products=["honey-125kw-261kwh-all-in-one-ess"]),
    dict(site="bess", id=151, category="Installation",
         products=["dawnice-containerized-bess", "loong-power-bs09-112-dp"]),
    dict(site="bess", id=138, category="Buyer guide",
         products=["honey-125kw-261kwh-all-in-one-ess"]),
    dict(site="bess", id=174, category="Safety",
         products=["dawnice-containerized-bess", "honey-wd-ecf260s-dc-outdoor"]),
    dict(site="bess", id=145, category="System design",
         products=["honey-125kw-261kwh-all-in-one-ess", "dawnice-containerized-bess"]),
    dict(site="bess", id=167, category="Technology",
         products=["loong-power-bs09-112-dp", "honey-wd-ecf260s-dc-outdoor"]),
    dict(site="bess", id=115, category="Sizing",
         products=["loong-power-bs09-112-dp", "honey-125kw-261kwh-all-in-one-ess"]),
    dict(site="bess", id=98, category="Installation",
         products=["dawnice-containerized-bess", "loong-power-bs09-225-d"]),
    dict(site="bess", id=90, category="Buyer guide",
         products=["honey-125kw-261kwh-all-in-one-ess", "dawnice-containerized-bess"]),
    dict(site="bess", id=149, category="Safety",
         products=["dawnice-containerized-bess", "honey-wd-ecf260s-dc-outdoor"]),
    dict(site="bess", id=169, category="System design",
         products=["dawnice-hzeb-hct-125ts-265-genset-hybrid", "sunflower-125kw-261kwh-pv-hybrid-ess"]),
    dict(site="bess", id=143, category="Buyer guide",
         products=["dawnice-containerized-bess"]),
    dict(site="bess", id=100, category="Buyer guide",
         products=["honey-125kw-261kwh-all-in-one-ess", "dawnice-enterflex-bs09-64-241-rack"]),
    # --- residential site -------------------------------------------------
    dict(site="energy", id=174, category="Technology",
         products=["powerfly-hzeb-lct-16", "powerfly-hzeb-lct-20"]),
    dict(site="energy", id=140, category="Application",
         products=["powerfly-hzeb-lct-20", "dw-home-all-in-one-ess"]),
    dict(site="energy", id=154, category="System design",
         products=["powerfly-hzeb-lct-10", "six-ultra-bs06-s-hv-stackable"]),
    dict(site="energy", id=148, category="Buyer guide",
         products=["powerfly-hzeb-lct-10", "dw-home-all-in-one-ess"]),
    dict(site="energy", id=146, category="Technology",
         products=["powerfly-hzeb-lct-16", "six-ultra-bs06-s-hv-stackable"]),
    dict(site="energy", id=143, category="Technology",
         products=["six-ultra-bs06-s-hv-stackable", "powerfly-hzeb-lct-16"]),
    dict(site="energy", id=166, category="Installation",
         products=["powerfly-hzeb-lct-20"]),
    dict(site="energy", id=110, category="Buyer guide",
         products=["powerfly-hzeb-lct-16", "six-ultra-bs06-s-hv-stackable"]),
    dict(site="energy", id=150, category="Application",
         products=["powerfly-hzeb-lct-10", "dawnice-residential-hybrid-inverter"]),
    dict(site="energy", id=169, category="System design",
         products=["dawnice-residential-hybrid-inverter", "six-ultra-bs06-s-hv-stackable"]),
    dict(site="energy", id=162, category="Technology",
         products=["powerfly-hzeb-lct-16", "dawnice-residential-hybrid-inverter"]),
    dict(site="energy", id=158, category="Application",
         products=["powerfly-hzeb-lct-20", "dw-home-all-in-one-ess"]),
    dict(site="energy", id=120, category="Buyer guide",
         products=["dw-home-all-in-one-ess", "powerfly-hzeb-lct-10"]),
    dict(site="energy", id=159, category="System design",
         products=["powerfly-hzeb-lct-10", "six-ultra-bs06-s-hv-stackable"]),
    dict(site="energy", id=173, category="System design",
         products=["dawnice-hzeb-hct-125ts-265-genset-hybrid", "powerfly-hzeb-lct-20"]),
    dict(site="energy", id=151, category="Residential storage",
         products=["powerfly-hzeb-lct-16"]),
    dict(site="energy", id=157, category="Sizing",
         products=["powerfly-hzeb-lct-16", "powerfly-hzeb-lct-20"]),
    dict(site="energy", id=163, category="Buyer guide",
         products=["powerfly-hzeb-lct-16", "six-ultra-bs06-s-hv-stackable"]),
    dict(site="energy", id=170, category="Sizing",
         products=["powerfly-hzeb-lct-5", "powerfly-hzeb-lct-10", "powerfly-hzeb-lct-20"]),
    dict(site="energy", id=132, category="Logistics",
         products=["powerfly-hzeb-lct-10", "powerfly-hzeb-lct-16"]),
    dict(site="energy", id=138, category="Sizing",
         products=["powerfly-hzeb-lct-10", "dw-home-all-in-one-ess"]),
    dict(site="energy", id=161, category="Installation",
         products=["dw-home-all-in-one-ess", "powerfly-hzeb-lct-16"]),
    dict(site="energy", id=134, category="Sizing",
         products=["powerfly-hzeb-lct-10"]),
    dict(site="energy", id=116, category="Buyer guide",
         products=["powerfly-hzeb-lct-10", "six-ultra-bs06-s-hv-stackable"]),
    dict(site="energy", id=176, category="System design",
         products=["dw-home-all-in-one-ess", "powerfly-hzeb-lct-20"]),
]

LEAD_IMAGE_WINDOW = 600  # chars; an image this early is treated as the lead image


def strip_tags(value):
    text = re.sub(r"<(script|style)[\s\S]*?</\1>", " ", value, flags=re.I)
    text = re.sub(r"<br\s*/?>", " ", text, flags=re.I)
    text = re.sub(r"<[^>]+>", " ", text)
    text = (text.replace("&nbsp;", " ").replace("&amp;", "&")
                .replace("&lt;", "<").replace("&gt;", ">").replace("&quot;", '"')
                .replace("&#39;", "'").replace("&rsquo;", "'"))
    return re.sub(r"\s+", " ", text).strip()


def make_excerpt(body, limit=168):
    """First sentence or two of the article, within a meta-description length.

    The excerpt must end where the thought ends. Three of the first twelve were
    cut at the character limit and stopped mid-sentence ("…the control clock run
    at"), which reads as a rendering fault rather than a summary, so a clause
    boundary is used when the opening sentence will not fit.
    """
    first = re.search(r"<p[^>]*>([\s\S]*?)</p>", body, re.I)
    source = strip_tags(first.group(1)) if first else strip_tags(body)
    if not source:
        return ""

    sentences = [s.strip() for s in re.findall(r"[^.!?]+[.!?]+", source) if s.strip()]
    picked = ""
    for sentence in sentences:
        candidate = (picked + " " + sentence).strip()
        if len(candidate) > limit and picked:
            break
        picked = candidate
        if len(picked) >= limit - 40:
            break
    if picked and len(picked) <= limit:
        return re.sub(r"\s+", " ", picked).strip()

    window = source[:limit]
    for separator in ("; ", ": ", ", ", " \u2014 "):
        cut = window.rfind(separator)
        if cut >= 90:
            return re.sub(r"\s+", " ", window[:cut]).rstrip(" ,;:\u2014") + "."

    # Nothing to cut at: keep the opening sentence whole rather than break it.
    opening = sentences[0] if sentences else source
    return re.sub(r"\s+", " ", opening[: limit + 40]).strip()


def yaml_string(value):
    return '"' + value.replace("\\", "\\\\").replace('"', '\\"') + '"'


def seo_title(title, limit=62):
    """A shorter <title> when the original headline is too long for a SERP.

    The database titles run to 89 characters and Google truncates around 600px
    (roughly 60 characters), so the distinguishing words at the end never show.
    The full headline stays as the visible H1 and as the schema `headline`; only
    the <title> is shortened, and only at a natural break.
    """
    if len(title) <= limit:
        return None
    for separator in (":", "?", " \u2014"):
        cut = title.find(separator)
        if 20 <= cut <= limit:
            return (title[: cut + 1] if separator == "?" else title[:cut]).strip()
    for connector in (" from ", " for ", " with "):
        cut = title.find(connector)
        if 20 <= cut <= limit:
            return title[:cut].strip()
    return None


def iso_stamp(ms):
    """The full instant rather than just the day.

    Four of the twelve articles share a publication date, so a date-only value
    made them indistinguishable; the source records the time as well.
    """
    return datetime.datetime.fromtimestamp(ms / 1000, datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def normalise_images(body):
    def fix(match):
        tag = match.group(0)
        tag = re.sub(r'\s(?:loading|decoding)="[^"]*"', "", tag, flags=re.I)
        if not re.search(r'\salt="[^"]*"', tag, flags=re.I):
            tag = tag[:-1].rstrip("/").rstrip() + ' alt="">'
        closer = ">" if tag.rstrip().endswith(">") else ""
        return tag[:-len(closer)] + ' loading="lazy" decoding="async"' + closer

    return re.sub(r"<img\b[^>]*>", fix, body, flags=re.I)


def fix_links(body):
    body = body.replace("&amp;utm_source=chatgpt.com", "")
    body = re.sub(r"\?utm_source=chatgpt\.com&?", "?", body, flags=re.I)
    body = body.replace("?&", "?").replace("?\"", '"')

    def unwrap(match):
        href, text = match.group(1), match.group(2)
        if href.startswith("/") and not href.startswith("http") and not href.startswith(KEEP_PREFIXES):
            return text
        return match.group(0)

    return re.sub(r'<a\b[^>]*href="(/[^"]*)"[^>]*>([\s\S]*?)</a>', unwrap, body, flags=re.I)


def process(entry, only_report=False):
    root = INPUT_ROOTS[entry["site"]]
    db = os.path.join(root, "db.sqlite")
    con = sqlite3.connect("file:" + db.replace("\\", "/") + "?mode=ro", uri=True)
    row = con.execute(
        "select title, slug, text, created_at, modified_at from posts where id=?", (entry["id"],)
    ).fetchone()
    con.close()
    if not row:
        raise SystemExit("post %s not found in %s" % (entry["id"], entry["site"]))

    title, slug, raw, created, modified = row
    title = re.sub(r"\s+", " ", title or "").strip()
    body = raw or ""

    media_dir = os.path.join(root, "media", "posts", str(entry["id"]))
    refs = [r for r in dict.fromkeys(re.findall(r"#DOMAIN_NAME#([^\"'\s>)]+)", body)) if re.search(r"\.(jpe?g|png|webp|gif)$", r, re.I)]
    missing = [r for r in refs if not os.path.isfile(os.path.join(media_dir, r))]
    if missing:
        raise SystemExit("post %s references missing files: %s" % (entry["id"], missing))

    body = body.replace("#DOMAIN_NAME#", "/assets/images/blog/%s/" % slug)
    body = re.sub(r'\s(?:class|style|srcset|sizes|id|role)\s*=\s*"[^"]*"', "", body, flags=re.I)
    body = fix_links(body)
    body = normalise_images(body)

    featured = None
    if refs:
        featured = "/assets/images/blog/%s/%s" % (slug, refs[0])
        offset = body.find('src="' + featured + '"')
        if 0 <= offset <= LEAD_IMAGE_WINDOW:
            # The lead image becomes the article hero, so drop the one inline copy
            # of it rather than showing the same picture twice on the page.
            body = re.sub(r'<img\b[^>]*src="' + re.escape(featured) + r'"[^>]*>', "", body, count=1)

    # These tables carry four columns of figures and cannot shrink below about
    # 780px, which is wider than a phone. A table cannot scroll on its own, and
    # without a container the whole page scrolls sideways to reveal a column, so
    # each table gets its own horizontal scroller.
    body = re.sub(r"<table\b", '<div class="table-wrap"><table', body, flags=re.I)
    body = re.sub(r"</table>", "</table></div>", body, flags=re.I)

    body = re.sub(r"<p>\s*</p>", "", body, flags=re.I)
    body = re.sub(r"<div>\s*</div>", "", body, flags=re.I)
    body = re.sub(r"\n{3,}", "\n\n", body).strip()

    when = iso_stamp(created)
    # Only a genuine revision counts. Publii re-saves modified_at on every edit,
    # so an equality means the post has never been touched since publication.
    revised = iso_stamp(modified) if modified and modified > created else None
    excerpt = make_excerpt(body or raw)

    if only_report:
        print("title:", title)
        print("slug:", slug)
        print("date:", when)
        print("images:", refs)
        print("featured:", featured)
        print("words:", len(strip_tags(body).split()))
        print("excerpt:", excerpt)
        print("anchors left:", len(re.findall(r"<a\b", body, flags=re.I)))
        return

    out_dir = os.path.join(PUBLIC_DIR, slug)
    os.makedirs(out_dir, exist_ok=True)
    for name in refs:
        shutil.copyfile(os.path.join(media_dir, name), os.path.join(out_dir, name))

    front = [
        "---",
        "title: " + yaml_string(title),
        "category: " + yaml_string(entry["category"]),
        "excerpt: " + yaml_string(excerpt),
        'publishDate: "%s"' % when,
    ]
    if revised:
        front.append('updatedDate: "%s"' % revised)
    short = seo_title(title)
    if short:
        front += ["seo:", "  title: " + yaml_string(short)]
    if featured:
        front.append("featuredImage: " + yaml_string(featured))
    if entry["products"]:
        front.append("relatedProducts:")
        for product in entry["products"]:
            front.append("  - " + yaml_string(product))
    front += ["---", ""]

    path = os.path.join(CONTENT_DIR, slug + ".md")
    with open(path, "w", encoding="utf-8", newline="\n") as handle:
        handle.write("\n".join(front) + "\n" + body + "\n")

    print("%-6s %-4s words=%-5d imgs=%d  %s" % (entry["site"], entry["id"], len(strip_tags(body).split()), len(refs), slug))


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--only", type=int, default=None)
    parser.add_argument("--report", action="store_true")
    # Re-running the first batch would overwrite hand edits made after import
    # (the cost article's arithmetic was corrected by hand, for instance), so the
    # second batch is addressable on its own rather than by re-running everything.
    parser.add_argument("--batch2", action="store_true",
                        help="only the fifty posts added in the second batch")
    parser.add_argument("--site", choices=["bess", "energy"], default=None,
                        help="restrict --batch2 to one source site")
    args = parser.parse_args()

    queue = SELECTION[12:] if args.batch2 else SELECTION
    if args.site:
        queue = [e for e in queue if e["site"] == args.site]

    os.makedirs(CONTENT_DIR, exist_ok=True)
    for entry in queue:
        if args.only and entry["id"] != args.only:
            continue
        process(entry, only_report=args.report)


if __name__ == "__main__":
    main()
