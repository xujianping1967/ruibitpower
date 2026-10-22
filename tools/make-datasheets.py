#!/usr/bin/env python3
"""Generate A4 product datasheet PDFs for the Ruibit Power site.

Every value printed comes from the site's own content files:
  src/content/products/<slug>.json   -> title, category, summary, metrics,
                                        specs, applications, hero image
  src/data/trust.json                -> certification list and the exact
                                        commercial-terms wording
  src/data/site.json                 -> brand, legal name, contact details,
                                        manufacturing partner

Nothing is invented. Anything model-specific that the site does not publish is
listed on page 2 as "on request" instead of being filled with a plausible
number.

The PDF is produced by printing an HTML/CSS document with headless Chrome, so
the datasheet inherits the site's typography and colour rather than looking
like a spreadsheet export.

Usage:
    python tools/make-datasheets.py honey-125kw-261kwh-all-in-one-ess \
                                     sunflower-125kw-261kwh-pv-hybrid-ess
"""

import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PRODUCTS = ROOT / "src" / "content" / "products"
OUT_DIR = ROOT / "public" / "downloads"
BUILD_DIR = ROOT / "_datasheet-build"

CHROME_CANDIDATES = [
    Path.home() / "AppData/Local/Google/Chrome/Application/chrome.exe",
    Path("C:/Program Files/Google/Chrome/Application/chrome.exe"),
    Path("C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"),
    Path("C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"),
    Path("C:/Program Files/Microsoft/Edge/Application/msedge.exe"),
]

REVISION = "Rev. 2026-10"

# Model- and project-specific figures the site does not publish. Listing them
# explicitly is more useful to a procurement engineer than silence, and it
# keeps the document honest about its own scope.
ON_REQUEST = [
    "Round-trip efficiency",
    "Derating curve and ambient limits",
    "Operating temperature range",
    "Communication protocols",
    "Grid-code compliance",
    "Warranty term in years",
    "Certificate numbers for this variant",
    "Single-line diagram and terminal layout",
    "Transport and container data",
    "Acoustic noise level",
]


def load_json(path):
    with path.open(encoding="utf-8") as handle:
        return json.load(handle)


def esc(value):
    return (
        str(value)
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )


def file_uri(path):
    return Path(path).resolve().as_uri()


def build_html(product, site, trust):
    slug = product["slug"]
    title = product["title"]
    category = product["category"]
    summary = product["summary"]
    # heroImage is stored as a site-absolute path ("/assets/..."). pathlib treats
    # a leading slash as absolute and would discard ROOT, producing file:///assets/...
    hero = file_uri(ROOT / "public" / product["heroImage"].lstrip("/"))
    logo = file_uri(ROOT / "public" / "assets/images/logo-mark.svg")

    metrics_html = "".join(
        f'<div class="metric"><strong>{esc(m["value"])}</strong>'
        f'<span>{esc(m["label"])}</span></div>'
        for m in product["metrics"]
    )

    specs_html = "".join(
        f'<tr><th>{esc(s["label"])}</th><td>{esc(s["value"])}</td></tr>'
        for s in product["specs"]
    )

    apps_html = "".join(f'<span class="chip">{esc(a)}</span>' for a in product["applications"])

    certs = trust["dawnice"]["certifications"]
    certs_html = "".join(f'<span class="chip mono">{esc(c)}</span>' for c in certs)

    # Nine of the ten published commitments; "Languages" is dropped from a
    # per-product datasheet because it reads as a company fact, not a term.
    wanted = [
        "Quotation response",
        "Product warranty",
        "Minimum order quantity",
        "Samples",
        "Lead time",
        "Incoterms",
        "Payment terms",
        "OEM / ODM",
    ]
    commitments = {c["title"]: c["detail"] for c in trust["ruibit"]["serviceCommitments"]}
    terms_html = "".join(
        f'<tr><td>{esc(k)}</td><td>{esc(commitments[k])}</td></tr>'
        for k in wanted
        if k in commitments
    )

    on_request_html = "".join(f"<li>{esc(item)}</li>" for item in ON_REQUEST)

    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>{esc(title)} — Datasheet</title>
<style>
  @page {{ size: A4; margin: 0; }}
  * {{ box-sizing: border-box; }}
  html, body {{ margin: 0; padding: 0; }}
  body {{
    font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
    color: #10202f;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }}
  .page {{
    width: 210mm; height: 297mm;
    padding: 14mm 16mm 11mm;
    display: flex; flex-direction: column;
    page-break-after: always;
    position: relative;
  }}
  .page:last-child {{ page-break-after: auto; }}

  /* --- running head --- */
  .head {{ display: flex; justify-content: space-between; align-items: flex-start; }}
  .brand {{ display: flex; align-items: center; gap: 3mm; }}
  .brand img {{ width: 8.5mm; height: 8.5mm; display: block; }}
  .wordmark {{ font-size: 12.5px; font-weight: 800; letter-spacing: .01em; }}
  .wordmark span {{
    display: block; font-size: 7.5px; font-weight: 600; color: #6b7c88;
    letter-spacing: .16em; text-transform: uppercase; margin-top: .6mm;
  }}
  .docmeta {{ text-align: right; }}
  .docmeta strong {{
    display: block; font-size: 7.5px; font-weight: 800; letter-spacing: .2em;
    text-transform: uppercase; color: #0d8053;
  }}
  .docmeta span {{ display: block; font-size: 7px; color: #6b7c88; margin-top: 1mm; letter-spacing: .04em; }}

  .rule {{ height: 2px; background: #163f73; margin: 4mm 0 0; }}

  h1 {{
    font-size: 26px; line-height: 1.14; font-weight: 800; letter-spacing: -.02em;
    margin: 9mm 0 0; max-width: 165mm;
  }}
  .eyebrow {{
    font-size: 7.5px; font-weight: 800; letter-spacing: .16em; text-transform: uppercase;
    color: #0d8053; margin: 0 0 2mm;
  }}
  .summary {{ font-size: 10.5px; line-height: 1.6; color: #33454f; margin: 4mm 0 0; max-width: 158mm; }}

  .hero {{
    margin: 7mm 0 0; flex: 1 1 auto; min-height: 56mm; max-height: 94mm;
    border-radius: 2px; overflow: hidden; background: #eef2f5;
  }}
  .hero img {{ width: 100%; height: 100%; object-fit: cover; display: block; }}

  .metrics {{
    display: grid; grid-template-columns: repeat(4, 1fr);
    border-top: 1px solid #dfe6ec; border-bottom: 1px solid #dfe6ec;
    margin: 7mm 0 0;
  }}
  .metric {{ padding: 3.2mm 0 3.2mm 4mm; border-left: 1px solid #dfe6ec; }}
  .metric:first-child {{ border-left: 0; padding-left: 0; }}
  .metric strong {{ display: block; font-size: 16px; font-weight: 800; letter-spacing: -.01em; }}
  .metric span {{
    display: block; font-size: 7px; font-weight: 700; letter-spacing: .14em;
    text-transform: uppercase; color: #6b7c88; margin-top: 1.2mm;
  }}

  h2 {{
    font-size: 8px; font-weight: 800; letter-spacing: .18em; text-transform: uppercase;
    color: #163f73; margin: 9mm 0 3.2mm; padding-bottom: 1.8mm;
    border-bottom: 1px solid #dfe6ec;
  }}
  h2:first-child {{ margin-top: 0; }}

  table {{ width: 100%; border-collapse: collapse; }}
  .specs th {{
    text-align: left; font-size: 9px; font-weight: 500; color: #5b6b78;
    padding: 2.1mm 0; border-bottom: 1px solid #eef2f5; width: 52mm;
    vertical-align: top;
  }}
  .specs td {{
    font-size: 9.5px; font-weight: 650; padding: 2.1mm 0;
    border-bottom: 1px solid #eef2f5;
  }}
  .specs tr:nth-child(even) th, .specs tr:nth-child(even) td {{ background: #f8fafb; }}
  .specs tr:nth-child(even) th {{ padding-left: 2mm; }}
  .specs tr:nth-child(even) td {{ padding-right: 2mm; }}

  .chip {{
    display: inline-block; font-size: 8px; font-weight: 600; color: #24384a;
    border: 1px solid #d5dee5; border-radius: 999px;
    padding: 1.7mm 3.2mm; margin: 0 1.8mm 2mm 0; background: #fff;
  }}
  .chip.mono {{ font-family: Consolas, "Courier New", monospace; letter-spacing: .02em; }}

  .terms td {{ font-size: 9px; padding: 2.6mm 0; border-bottom: 1px solid #eef2f5; vertical-align: top; }}
  .terms td:first-child {{ font-weight: 700; width: 42mm; color: #10202f; }}
  .terms td:last-child {{ color: #45596a; line-height: 1.45; }}

  .cols {{ columns: 2; column-gap: 10mm; margin: 0; padding: 0; list-style: none; }}
  .cols li {{
    font-size: 9px; color: #45596a; padding: 2.1mm 0 2.1mm 4mm;
    position: relative; break-inside: avoid;
  }}
  .cols li::before {{
    content: ""; position: absolute; left: 0; top: 2.5mm;
    width: 1.6mm; height: 1.6mm; background: #0d8053;
  }}

  .note {{ font-size: 8px; line-height: 1.5; color: #6b7c88; margin: 3mm 0 0; }}

  .contact {{
    margin-top: auto; border-left: 3px solid #0d8053; padding: 1mm 0 1mm 5mm;
  }}
  .contact .legal {{ font-size: 8px; color: #6b7c88; letter-spacing: .02em; }}
  .contact .lines {{ font-size: 8.5px; line-height: 1.8; color: #24384a; margin-top: 1.5mm; }}
  .contact .lines b {{ font-weight: 700; }}

  .foot {{
    margin-top: 6mm; padding-top: 3mm; border-top: 1px solid #dfe6ec;
    display: flex; justify-content: space-between; gap: 8mm;
    font-size: 6.8px; line-height: 1.45; color: #8697a3;
  }}
  .foot .left {{ max-width: 130mm; }}
  .foot .right {{ white-space: nowrap; font-variant-numeric: tabular-nums; }}
</style>
</head>
<body>

<!-- ============================== PAGE 1 ============================== -->
<div class="page">
  <div class="head">
    <div class="brand">
      <img src="{logo}" alt="Ruibit Power">
      <div class="wordmark">RUIBIT POWER<span>Energy storage systems</span></div>
    </div>
    <div class="docmeta">
      <strong>Datasheet</strong>
      <span>{REVISION}</span>
    </div>
  </div>
  <div class="rule"></div>

  <p class="eyebrow">{esc(category)}</p>
  <h1>{esc(title)}</h1>
  <p class="summary">{esc(summary)}</p>

  <div class="hero"><img src="{hero}" alt="{esc(title)}"></div>

  <div class="metrics">{metrics_html}</div>

  <h2>Core specifications</h2>
  <table class="specs">{specs_html}</table>

  <div class="foot">
    <div class="left">
      Ruibit Power &middot; {esc(title)} &middot; {REVISION}. Platform specifications only;
      final configuration is confirmed in the quotation for the destination market.
    </div>
    <div class="right">1 / 2</div>
  </div>
</div>

<!-- ============================== PAGE 2 ============================== -->
<div class="page">
  <div class="head">
    <div class="brand">
      <img src="{logo}" alt="Ruibit Power">
      <div class="wordmark">RUIBIT POWER<span>{esc(title)}</span></div>
    </div>
    <div class="docmeta">
      <strong>Datasheet</strong>
      <span>{REVISION} &middot; page 2</span>
    </div>
  </div>
  <div class="rule"></div>

  <h2>Applications</h2>
  <div>{apps_html}</div>

  <h2>Compliance and documentation</h2>
  <p class="note" style="margin-top:0; font-size:8.5px; color:#45596a;">
    Standards referenced across the range. The model-specific certificate package for the
    destination market is issued with the confirmed order configuration.
  </p>
  <div style="margin-top:3mm;">{certs_html}</div>
  <p class="note">{esc(trust["dawnice"]["certificationNote"])}</p>

  <h2>Standard commercial terms</h2>
  <table class="terms">{terms_html}</table>

  <h2>Parameters confirmed per configuration</h2>
  <p class="note" style="margin-top:0; font-size:8.5px; color:#45596a;">
    The following are model- and project-specific. They are stated in the quotation and in the
    order documentation rather than as blanket figures on a platform datasheet.
  </p>
  <ul class="cols">{on_request_html}</ul>

  <div class="contact">
    <div class="legal">{esc(site["legalName"])} &middot; {esc(site["brand"])}</div>
    <div class="lines">
      <b>{esc(site["email"])}</b> &nbsp;&middot;&nbsp; WhatsApp <b>{esc(site["whatsapp"])}</b><br>
      {esc(site["domain"].replace("https://", ""))} &nbsp;&middot;&nbsp; {esc(site["address"])}<br>
      Manufacturing partner: {esc(site["manufacturingPartner"])}
    </div>
  </div>

  <div class="foot">
    <div class="left">
      &copy; 2026 {esc(site["legalName"])}. All specifications describe the standard platform and are
      subject to confirmation in the quotation. Certification applicability depends on product model,
      order configuration, and destination market.
    </div>
    <div class="right">2 / 2</div>
  </div>
</div>

</body>
</html>
"""


def find_chrome():
    for candidate in CHROME_CANDIDATES:
        if candidate.exists():
            return candidate
    raise SystemExit("Chrome or Edge not found; cannot print the PDF.")


def render(slug, chrome):
    product = load_json(PRODUCTS / f"{slug}.json")
    site = load_json(ROOT / "src" / "data" / "site.json")
    trust = load_json(ROOT / "src" / "data" / "trust.json")

    BUILD_DIR.mkdir(parents=True, exist_ok=True)
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    html_path = BUILD_DIR / f"{slug}.html"
    html_path.write_text(build_html(product, site, trust), encoding="utf-8")

    pdf_path = OUT_DIR / f"{slug}-datasheet.pdf"
    # A stale file from an earlier run would make the existence check below pass
    # even when Chrome silently skipped the write, so clear it and compare mtime.
    if pdf_path.exists():
        pdf_path.unlink()

    # Chrome hands the command to an already running instance and drops
    # --print-to-pdf when it shares a profile, so each run gets its own.
    profile_dir = BUILD_DIR / f"chrome-profile-{slug}"
    result = subprocess.run(
        [
            str(chrome),
            "--headless=new",
            "--disable-gpu",
            "--no-sandbox",
            "--no-pdf-header-footer",
            "--virtual-time-budget=4000",
            f"--user-data-dir={profile_dir}",
            f"--print-to-pdf={pdf_path}",
            html_path.as_uri(),
        ],
        capture_output=True,
        text=True,
    )
    if not pdf_path.exists():
        raise SystemExit(f"PDF not produced for {slug}: {result.stderr[:500]}")

    size_kb = round(pdf_path.stat().st_size / 1024)
    print(f"  {pdf_path.name:52s} {size_kb:5d} KB")
    return pdf_path


def main():
    slugs = sys.argv[1:]
    if not slugs:
        raise SystemExit("Pass one or more product slugs.")
    chrome = find_chrome()
    print("Rendering datasheets")
    for slug in slugs:
        render(slug, chrome)


if __name__ == "__main__":
    main()

