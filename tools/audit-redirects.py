#!/usr/bin/env python3
"""Validate every rule in public/_redirects against the built site.

A 301 that lands on a 404 wastes the link equity twice: once for the old URL and
once for the confidence a crawler puts in the redirect. This checks each target
against dist/ and fails loudly.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"
REDIRECTS = ROOT / "public" / "_redirects"


def resolves(target: str) -> bool:
    """True if the path is served by the build (dir index, file, or asset)."""
    path = target.split("?")[0].split("#")[0].strip()
    if not path.startswith("/"):
        return False
    rel = path.lstrip("/")
    candidates = [
        DIST / rel,
        DIST / rel / "index.html",
        DIST / f"{rel}.html",
    ]
    return any(c.exists() and c.is_file() for c in candidates)


def main() -> int:
    if not REDIRECTS.exists():
        print("missing _redirects")
        return 1
    if not DIST.exists():
        print("missing dist/ — run npm run build first")
        return 1

    rules, missing, checked = [], [], 0
    for raw in REDIRECTS.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#"):
            continue
        parts = line.split()
        if len(parts) < 2:
            continue
        src, dst = parts[0], parts[1]
        rules.append((src, dst))
        checked += 1
        if not resolves(dst):
            missing.append((src, dst))

    print(f"rules: {checked}")
    if missing:
        print(f"FAIL — {len(missing)} target(s) do not exist in dist/:")
        for src, dst in missing:
            print(f"  {src}  ->  {dst}")
        return 1

    # a redirect loop is the other way this file goes wrong
    targets = {d for _, d in rules}
    loops = [(s, d) for s, d in rules if s in targets]
    if loops:
        print(f"FAIL — {len(loops)} rule(s) point at another redirect source:")
        for s, d in loops:
            print(f"  {s}  ->  {d}")
        return 1

    print("PASS — every redirect target resolves")
    return 0


if __name__ == "__main__":
    sys.exit(main())
