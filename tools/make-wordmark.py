#!/usr/bin/env python3
"""Build the Ruibit wordmark as a self-contained SVG (text converted to paths).

The uploaded artwork is a 363x153 JPEG, so the letterforms cannot be traced from
pixels. Instead the wordmark is re-set in Segoe UI Black and immediately outlined,
which removes the font dependency: the SVG renders identically on any machine and
can be printed, etched or silkscreened.

The first i is the dotless U+0131 and its dot is replaced by a battery glyph whose
box is derived from the real metrics of the dotted i, so the replacement sits on
the same optical line as the original dot.
"""
from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

FONT = Path(r"C:\Windows\Fonts\seguibl.ttf")
OUT = Path(__file__).resolve().parent.parent.parent / "wordmark-svg"
PREVIEW = OUT

WORD = "Ruıbit"          # dotless i: its dot is drawn as the battery
TRACKING = -1            # units per em of 100; slight negative tracking
BATTERY = dict(x=133.0, y=-70.0, w=22.0, h=13.0, rx=3.6, nub_w=5.0, nub_h=7.0, nub_rx=1.6)

COLORWAYS = {
    "v1": dict(
        fills=["#2b6fa8", "#2b6fa8", "#2b6fa8", "#e8a723", "#d9352c", "#8fa832"],
        battery="#2b6fa8",
    ),
    "v2": dict(
        fills=["#0b2239"] * 6,
        battery="#12a06b",
    ),
    "v3": dict(
        fills=["#0b2239"] * 6,
        battery="#0b2239",
    ),
    "v3-white": dict(
        fills=["#ffffff"] * 6,
        battery="#ffffff",
    ),
}


def glyph_paths():
    """Return (path_d, x_offset, advance) per character, normalised to 100 upem."""
    font = TTFont(str(FONT))
    upem = font["head"].unitsPerEm
    scale = 100.0 / upem
    cmap = font.getBestCmap()
    glyph_set = font.getGlyphSet()
    hmtx = font["hmtx"]

    out, x = [], 0.0
    for ch in WORD:
        name = cmap[ord(ch)]
        pen = SVGPathPen(glyph_set)
        # font coordinates are y-up, SVG is y-down: flip and scale in one transform
        glyph_set[name].draw(TransformPen(pen, (scale, 0, 0, -scale, 0, 0)))
        out.append((pen.getCommands(), round(x, 3)))
        x += hmtx[name][0] * scale + TRACKING
    return out, round(x, 3)


def battery_svg(color):
    b = BATTERY
    return (
        f'<g fill="{color}">'
        f'<rect x="{b["x"]}" y="{b["y"]}" width="{b["w"]}" height="{b["h"]}" rx="{b["rx"]}"/>'
        f'<rect x="{b["x"] + b["w"]}" y="{b["y"] + (b["h"] - b["nub_h"]) / 2}" '
        f'width="{b["nub_w"]}" height="{b["nub_h"]}" rx="{b["nub_rx"]}"/>'
        "</g>"
    )


def build(name, fills, battery):
    paths, advance = glyph_paths()
    body = "".join(
        f'<path transform="translate({x} 0)" d="{d}" fill="{fills[i]}"/>'
        for i, (d, x) in enumerate(paths)
    )
    # vertical extent: cap height 70, dot to 73 above baseline, battery to 70
    vb = f"-3 -78 {advance + 6 :.2f} 92"
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" '
        f'width="{advance + 6:.0f}" height="92" role="img" aria-label="Ruibit">\n'
        f"  <title>Ruibit</title>\n"
        f"  {body}\n"
        f"  {battery_svg(battery)}\n"
        f"</svg>\n"
    )
    (OUT / f"logo-wordmark-{name}.svg").write_text(svg, encoding="utf-8")
    return advance, vb


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    info = {}
    for name, cfg in COLORWAYS.items():
        info[name] = build(name, cfg["fills"], cfg["battery"])
    # favicon tile: the battery alone on a navy tile, for 16-32px
    tile = (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100" '
        'role="img" aria-label="Ruibit">\n  <title>Ruibit</title>\n'
        '  <rect width="100" height="100" rx="22" fill="#0b2239"/>\n'
        '  <g fill="#12a06b"><rect x="17" y="39" width="56" height="34" rx="8"/>'
        '<rect x="73" y="47" width="12" height="18" rx="4"/></g>\n'
        '  <rect x="24" y="46" width="18" height="20" rx="4" fill="#0b2239" opacity=".9"/>\n'
        "</svg>\n"
    )
    (OUT / "logo-mark.svg").write_text(tile, encoding="utf-8")
    for k, v in info.items():
        print(f"  {k}: advance={v[0]:.1f} viewBox={v[1]}")


if __name__ == "__main__":
    main()

