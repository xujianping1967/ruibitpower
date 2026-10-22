"""Inventory the blog posts held in the two Publii SQLite databases.

Read-only: opens each database with mode=ro so nothing can be modified.
Run: python tools/publii-inventory.py
"""

import json
import os
import re
import sqlite3
import sys

SITES = {
    "bess": r"D:\Administrator\Documents\Publii\sites\ruibitbess\input\db.sqlite",
    "energy": r"D:\Administrator\Documents\Publii\sites\ruibitenergy\input\db.sqlite",
}


def open_ro(path):
    if not os.path.exists(path):
        raise SystemExit("missing database: " + path)
    return sqlite3.connect("file:" + path.replace("\\", "/") + "?mode=ro", uri=True)


def tables(con):
    cur = con.execute("select name from sqlite_master where type='table' order by name")
    return [row[0] for row in cur]


def columns(con, table):
    return [row[1] for row in con.execute('pragma table_info("%s")' % table)]


def strip_tags(html):
    text = re.sub(r"<(script|style)[\s\S]*?</\1>", " ", html, flags=re.I)
    text = re.sub(r"<[^>]+>", " ", text)
    text = re.sub(r"&nbsp;", " ", text)
    text = re.sub(r"&amp;", "&", text)
    return re.sub(r"\s+", " ", text).strip()


def main():
    for label, path in SITES.items():
        con = open_ro(path)
        print("=" * 24, label)
        print("tables:", ", ".join(tables(con)))
        if "posts" not in tables(con):
            print("  no posts table")
            con.close()
            continue
        cols = columns(con, "posts")
        print("posts columns:", ", ".join(cols))
        wanted = [c for c in ("id", "title", "slug", "status", "created_at", "published_at", "content", "text", "featured_image") if c in cols]
        rows = con.execute('select %s from posts order by id' % ", ".join('"%s"' % c for c in wanted)).fetchall()
        print("rows:", len(rows))
        for row in rows:
            rec = dict(zip(wanted, row))
            body = rec.get("content") or rec.get("text") or ""
            words = len(strip_tags(body).split())
            imgs = len(re.findall(r"<img\b", body, flags=re.I))
            print(
                "  id=%s status=%s words=%4d imgs=%d  %s"
                % (rec.get("id"), rec.get("status"), words, imgs, (rec.get("title") or "")[:78])
            )
        con.close()


if __name__ == "__main__":
    main()
