"""Dump one Publii post so the HTML shape and its image references are visible.

Read-only. Run: python tools/publii-dump.py <site> <post-id>
"""

import os
import re
import sqlite3
import sys

ROOTS = {
    "bess": r"D:\Administrator\Documents\Publii\sites\ruibitbess\input",
    "energy": r"D:\Administrator\Documents\Publii\sites\ruibitenergy\input",
}


def main():
    site = sys.argv[1] if len(sys.argv) > 1 else "bess"
    post_id = int(sys.argv[2]) if len(sys.argv) > 2 else 81
    root = ROOTS[site]
    con = sqlite3.connect("file:" + (root + r"\db.sqlite").replace("\\", "/") + "?mode=ro", uri=True)

    row = con.execute(
        "select id, title, slug, status, created_at, featured_image_id, text from posts where id=?",
        (post_id,),
    ).fetchone()
    if not row:
        raise SystemExit("no post %s" % post_id)
    pid, title, slug, status, created, featured, text = row
    print("id:", pid)
    print("title:", title)
    print("slug:", slug)
    print("status:", status)
    print("created_at:", created)
    print("featured_image_id:", featured)
    print("text length:", len(text or ""))

    print("\n--- image references in text ---")
    refs = re.findall(r'(?:src|data-src|href)="([^"]*media[^"]*)"', text or "", flags=re.I)
    for ref in sorted(set(refs)):
        print("  ", ref)

    print("\n--- posts_images rows for this post ---")
    try:
        cols = [c[1] for c in con.execute('pragma table_info("posts_images")')]
        print("   columns:", cols)
        for r in con.execute("select * from posts_images where post_id=?", (post_id,)):
            print("   ", r)
    except Exception as exc:  # noqa: BLE001
        print("   (no table)", exc)

    print("\n--- media dir ---")
    d = os.path.join(root, "media", "posts", str(post_id))
    if os.path.isdir(d):
        for name in sorted(os.listdir(d)):
            p = os.path.join(d, name)
            print("   %8d  %s" % (os.path.getsize(p), name))
    else:
        print("   (missing)", d)

    print("\n--- first 2600 chars of text ---")
    print((text or "")[:2600])
    con.close()


if __name__ == "__main__":
    main()
