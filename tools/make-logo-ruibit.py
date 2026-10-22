#!/usr/bin/env python3
"""Compose the RUIBIT wordmark from outlined Segoe UI Black caps.

Benchmarked against the six peer marks (Sungrow, Pylontech, Dyness, Growatt,
CATL, Fluence): five of six are wordmarks, colours are limited to one or two,
and the difference is carried by the letters rather than by a separate icon.

The one ownable detail is the R's leg, extended into a tail that runs under the
next letters — the same flourish the uploaded artwork used, kept so the new mark
stays recognisable to existing customers.
"""
from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

FONT = Path(r"C:\Windows\Fonts\seguibl.ttf")
OUT = Path(__file__).resolve().parent.parent.parent / "wordmark-svg"

WORD = "RUIBIT"
TRACKING = 2.0          # caps need a little air; Segoe's caps are tight
NAVY = "#0b2239"
GREEN = "#12a06b"

# tail: starts at the foot of the R's leg, sweeps right under "UI", flicks up
TAIL = "M58 1 C86 27 116 31 143 25 C157 21 166 12 169 2"


def outline(text):
    font = TTFont(str(FONT))
    upem = font["head"].unitsPerEm
    scale = 100.0 / upem
    cmap = font.getBestCmap()
    glyph_set = font.getGlyphSet()
    hmtx = font["hmtx"]
    out, x = [], 0.0
    for ch in text:
        name = cmap[ord(ch)]
        pen = SVGPathPen(glyph_set)
        glyph_set[name].draw(TransformPen(pen, (scale, 0, 0, -scale, 0, 0)))
        out.append((pen.getCommands(), round(x, 3)))
        x += hmtx[name][0] * scale + TRACKING
    return out, x - TRACKING


def build(name, color, tail_color=None, first_color=None):
    paths, advance = outline(WORD)
    body = "".join(
        f'<path transform="translate({x} 0)" d="{d}" fill="{first_color if (first_color and i == 0) else color}"/>'
        for i, (d, x) in enumerate(paths)
    )
    tail = ""
    if tail_color:
        tail = (
            f'  <path d="{TAIL}" fill="none" stroke="{tail_color}" stroke-width="11" '
            f'stroke-linecap="round"/>\n'
        )
    # y from -78 (above caps) to +36 (below the tail)
    depth = 40 if tail_color else 8
    vb = f"-4 -78 {advance + 8:.2f} {78 + depth}"
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" width="{advance + 8:.0f}" '
        f'height="{78 + depth}" role="img" aria-label="Ruibit">\n'
        f"  <title>Ruibit</title>\n  {body}\n{tail}</svg>\n"
    )
    (OUT / f"logo-ruibit-{name}.svg").write_text(svg, encoding="utf-8")
    return advance


def mark():
    """Favicon only: a single R on a tile. A wordmark cannot survive 16px."""
    font = TTFont(str(FONT))
    upem = font["head"].unitsPerEm
    scale = 100.0 / upem
    name = font.getBestCmap()[ord("R")]
    pen = SVGPathPen(font.getGlyphSet())
    # fit the 70-unit cap height to 46 units and centre it in the 100 box
    s = 46 / 70 * scale
    font.getGlyphSet()[name].draw(TransformPen(pen, (s, 0, 0, -s, 27, 73)))
    svg = (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100" '
        'role="img" aria-label="Ruibit">\n  <title>Ruibit</title>\n'
        f'  <rect width="100" height="100" rx="22" fill="{NAVY}"/>\n'
        f'  <path d="{pen.getCommands()}" fill="#ffffff"/>\n</svg>\n'
    )
    (OUT / "logo-r-mark.svg").write_text(svg, encoding="utf-8")


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    print("  A:", build("a", NAVY))
    print("  B:", build("b", NAVY, NAVY))
    print("  C:", build("c", NAVY, GREEN))
    print("  D:", build("d", "#ffffff", GREEN))
    print("  A1:", build("a1", NAVY, None, GREEN))
    print("  D1:", build("d1", "#ffffff", None, GREEN))
    mark()



