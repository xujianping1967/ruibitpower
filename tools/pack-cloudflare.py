"""Build the Cloudflare Pages deploy zip from dist/.

Three things this does that a plain Compress-Archive does not:

1. Includes /admin/ — the hosted Decap CMS now ships on the live domain,
   authenticated via GitHub OAuth through _worker.js.
2. Fails if any file looks like it carries a credential. The Resend key lives in
   the Pages project as a secret, never in the repository, and this is the check
   that keeps it that way.
3. Fails if _worker.js, _headers or _redirects is missing, because each of them
   fails silently in production: no worker means the form 404s, no headers means
   no CSP, no redirects means old URLs break.
"""

import re
import sys
import zipfile
from datetime import datetime
from pathlib import Path

SITE = Path(__file__).resolve().parent.parent
DIST = SITE / "dist"
OUT = SITE.parent / "releases" / "deploy"

REQUIRED = ["_worker.js", "_headers", "_redirects"]
EXCLUDE_FILES = {"_请先读我.txt"}

TEXT_EXT = {".js", ".mjs", ".html", ".json", ".txt", ".xml", ".css", ".md", ".toml", ".yml", ".yaml"}
SECRET_PATTERNS = [
    (re.compile(r"\bre_[A-Za-z0-9_]{16,}"), "Resend API key"),
    (re.compile(r"-----BEGIN [A-Z ]*PRIVATE KEY-----"), "private key"),
    (re.compile(r"\bsk-[A-Za-z0-9]{20,}"), "API secret key"),
]

if not DIST.is_dir():
    sys.exit("dist/ not found — run `npm run build` first.")

OUT.mkdir(parents=True, exist_ok=True)
stamp = datetime.now().strftime("%Y%m%d-%H%M%S")
target = OUT / f"ruibitpower-deploy-{stamp}.zip"

included = 0
skipped = 0
problems = []

with zipfile.ZipFile(target, "w", zipfile.ZIP_DEFLATED, compresslevel=6) as z:
    for path in sorted(DIST.rglob("*")):
        if not path.is_file():
            continue
        rel = path.relative_to(DIST).as_posix()
        if rel in EXCLUDE_FILES:
            skipped += 1
            continue

        if path.suffix.lower() in TEXT_EXT:
            try:
                text = path.read_text(encoding="utf-8", errors="ignore")
            except OSError:
                text = ""
            for pattern, label in SECRET_PATTERNS:
                if pattern.search(text):
                    problems.append(f"credential-shaped string ({label}) in {rel}")

        z.write(path, rel)
        included += 1

names = set(zipfile.ZipFile(target).namelist())
missing = [n for n in REQUIRED if n not in names]

if missing:
    problems.append("missing required file(s): " + ", ".join(missing))

if problems:
    target.unlink(missing_ok=True)
    print("DEPLOY PACKAGE REFUSED")
    for p in problems:
        print("  -", p)
    sys.exit(1)

size = target.stat().st_size / 1048576
print(f"pkg  {target}")
print(f"     {included} files, {size:.2f} MB, excluded {skipped} (delivery notes)")
print("     _worker.js, _headers, _redirects present")
print("     no credential-shaped strings found")
