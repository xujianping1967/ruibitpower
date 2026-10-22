"""Analyse the HTML shape of the posts that are about to be imported.

Reports, per post: element names used, image references, link targets, and a
word count. Read-only. Run: python tools/publii-analyse.py
"""

import collections
import datetime
import os
import re
import sqlite3

ROOTS = {
    "bess": r"D:\Administrator\Documents\Publii\sites\ruibitbess\input",
    "energy": r"D:\Administrator\Documents\Publii\sites\ruibitenergy\input",
}

SELECTION = {
    "bess": [81, 82, 83, 85, 95, 114],
    "energy": [97, 98, 99, 111, 115, 122],
}

TAG = re.compile(r"<\s*([a-zA-Z][a-zA-Z0-9]*)", re.I)
IMGREF = re.compile(r"#DOMAIN_NAME#([^\"'\s>)]+)", re.I)
HREF = re.compile(r'href="([^"]+)"', re.I)


def strip_tags(value):
    text = re.sub(r"<(script|style)[\s\S]*?</\1>", " ", value, flags=re.I)
    text = re.sub(r"<[^>]+>", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def main():
    for site, ids in SELECTION.items():
        root = ROOTS[site]
        con = sqlite3.connect("file:" + (root + r"\db.sqlite").replace("\\", "/") + "?mode=ro", uri=True)
        print("#" * 26, site)
        for pid in ids:
            row = con.execute(
                "select title, slug, text, created_at, featured_image_id from posts where id=?", (pid,)
            ).fetchone()
            title, slug, text, created, featured = row
            tags = collections.Counter(t.lower() for t in TAG.findall(text or ""))
            words = len(strip_tags(text or "").split())
            when = datetime.datetime.utcfromtimestamp(created / 1000).strftime("%Y-%m-%d")
            print("\n%d  %s" % (pid, title))
            print("   slug=%s  %s  words=%d  featured_id=%s" % (slug, when, words, featured))
            print("   tags: " + ", ".join("%s×%d" % (k, v) for k, v in tags.most_common()))
            refs = sorted(set(IMGREF.findall(text or "")))
            d = os.path.join(root, "media", "posts", str(pid))
            on_disk = sorted(os.listdir(d)) if os.path.isdir(d) else []
            print("   img refs: %s" % refs)
            print("   on disk : %s" % [f for f in on_disk if not os.path.isdir(os.path.join(d, f))])
            hrefs = sorted(set(HREF.findall(text or "")))
            external = [h for h in hrefs if h.startswith("#DOMAIN_NAME#")]
            other = [h for h in hrefs if not h.startswith("#DOMAIN_NAME#")]
            print("   hrefs(domain): %s" % external[:8])
            print("   hrefs(other) : %s" % other[:8])
        con.close()


if __name__ == "__main__":
    main()
