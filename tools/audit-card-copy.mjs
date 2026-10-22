/**
 * Guards the homepage product cards against the two mistakes this component has
 * already made once each.
 *
 * 1. The copy drifting back on top of the photograph. The card is meant to be
 *    photograph-then-copy: the image keeps its own 3:2 at the top and the text
 *    sits beneath it on the card's fill. An earlier version absolutely
 *    positioned `.feature-card-body` over the image behind a gradient scrim, so
 *    the check is structural rather than visual — no scrim rule, no absolutely
 *    positioned body, and exactly three elements in the body.
 * 2. Text that cannot be read. With the copy off the image the background is now
 *    a known flat colour, so the contrast is computable from the stylesheet's own
 *    literals rather than from sampled pixels. This replaces the pixel-compositing
 *    audit the scrim needed; that script modelled a gradient that no longer exists.
 *
 * Run: node tools/audit-card-copy.mjs
 */

import { readFile } from 'node:fs/promises';

const css = await readFile('public/assets/css/site.css', 'utf8');
const html = await readFile('dist/index.html', 'utf8');

const results = [];
const check = (name, pass, detail) => results.push({ name, pass, detail });

/* --- 1. The copy is not over the image ---------------------------------- */

check(
  'no scrim rule in site.css',
  !/\.feature-card-scrim\s*\{/.test(css),
  'the gradient scrim is gone; the copy sits below the image',
);

check(
  'card body is not absolutely positioned',
  !/\.feature-card-body\s*\{[^}]*position:\s*absolute/.test(css),
  '.feature-card-body is in normal flow under the image',
);

check(
  'card image is not absolutely positioned',
  !/\.feature-card\s*>\s*img\s*\{[^}]*position:\s*absolute/.test(css),
  '.feature-card > img is a flex child, not an inset overlay',
);

check(
  'no scrim element in the built markup',
  !html.includes('feature-card-scrim'),
  'the component no longer renders one',
);

const bodies = [...html.matchAll(/<div class="feature-card-body">([\s\S]*?)<\/div>/g)].map((m) => m[1]);
check('four feature cards built', bodies.length === 4, `found ${bodies.length}`);
check(
  'each body is title + spec + CTA',
  bodies.length === 4 &&
    bodies.every((body) => {
      const children = body.match(/<h3|<p class="feature-card-spec"|<a class="button/g) ?? [];
      return children.length === 3;
    }),
  'no category line and no description paragraph',
);

/* --- 1b. The desktop footer is the composition that was asked for ------- */

/* This one is here because it already went wrong once. The desktop block first
   tried to reach the layout with `flex-wrap: wrap` on top of the body's base
   `flex-direction: column` — which wraps into a second COLUMN, not a second row,
   while `flex: 1 1 100%` resolves against the container's height. The title ate
   the full column and the spec and button were pushed sideways and clipped by
   `overflow: hidden`. Grid areas cannot be misread that way, so the check pins
   the grid down instead of the flex attempt. */
const desktopBody = /@media \(min-width: 769px\)[\s\S]*?\.feature-card-body\s*\{([^}]*)\}/.exec(css);
check(
  'desktop footer is an explicit two-row grid',
  Boolean(desktopBody) &&
    /display:\s*grid/.test(desktopBody[1]) &&
    /grid-template-areas:/.test(desktopBody[1]) &&
    /'title title'/.test(desktopBody[1]) &&
    /'spec\s+cta'/.test(desktopBody[1]) &&
    !/flex-wrap:\s*wrap/.test(desktopBody[1]),
  desktopBody ? 'areas: title row, then spec + CTA' : 'no min-width: 769px body rule found',
);

/* --- 1c. Mobile keeps the values it has always had ---------------------- */

/* The desktop composition is a min-width override precisely so that the base
   rule stays the mobile card. Tuning the desktop can then never drift mobile,
   as long as the base keeps these three. */
const baseCard = /\.feature-card\s*\{([^}]*)\}/.exec(css)?.[1] ?? '';
const baseH3 = /\.feature-card h3\s*\{([^}]*)\}/.exec(css)?.[1] ?? '';
const baseSpec = /\.feature-card-spec\s*\{([^}]*)\}/.exec(css)?.[1] ?? '';
check('base card has no hairline (mobile)', !/border:\s*1px/.test(baseCard), 'borderless, as mobile always was');
check('base title margin is 5px (mobile)', /margin:\s*0 0 5px/.test(baseH3), 'unchanged');
check('base spec margin is 13px (mobile)', /margin:\s*0 0 13px/.test(baseSpec), 'unchanged');

/* --- 3. The bottom of the homepage -------------------------------------- */

/* The card rules above live in site.css; the band's own fill is declared in
   cms.css, so that one has to be read from there. */
const cms = await readFile('public/assets/css/cms.css', 'utf8');

const ctaBand = /<section class="cta-band">([\s\S]*?)<\/section>/.exec(html)?.[1] ?? '';
check(
  'the conversion band offers a single action',
  (ctaBand.match(/class="button/g) ?? []).length === 1 &&
    !/wa\.me/.test(ctaBand) &&
    /href="\/contact\/"/.test(ctaBand),
  'the WhatsApp button is gone; the enquiry button stands alone',
);

const footerRule = /\.site-footer\s*\{([^}]*)\}/.exec(css)?.[1] ?? '';
check(
  'the footer is a three-column grid',
  /display:\s*grid/.test(footerRule) && (footerRule.match(/minmax\(0,/g) ?? []).length === 3,
  'brand, navigation, contact',
);
check(
  'the footer builds its navigation column',
  html.includes('class="footer-nav"') && html.includes('class="footer-contact"'),
  'and it is generated from the header items',
);

/* --- 2. The copy is readable on the card fill --------------------------- */

const hex = (value) => {
  const match = /^#([0-9a-f]{6})$/i.exec(value.trim());
  if (!match) throw new Error(`not a 6-digit hex colour: ${value}`);
  return [0, 2, 4].map((i) => parseInt(match[1].slice(i, i + 2), 16));
};

const fromCss = (pattern, label, source = css) => {
  const match = pattern.exec(source);
  if (!match) throw new Error(`could not read ${label} out of the stylesheets`);
  return match[1];
};

const srgb = (channel) => {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};
const luminance = ([r, g, b]) => 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
const ratio = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
/* A translucent foreground is composited over the fill before measuring. */
const over = (fg, alpha, bg) => fg.map((channel, i) => channel * alpha + bg[i] * (1 - alpha));

const fill = hex(fromCss(/\.feature-card\s*\{[^}]*background:\s*(#[0-9a-f]{6})/i, 'the card fill'));
const title = hex(fromCss(/\.feature-card h3\s*\{[^}]*color:\s*(#[0-9a-f]{6})/i, 'the title colour'));
const specSource = fromCss(/\.feature-card-spec\s*\{[^}]*color:\s*rgba\(([^)]+)\)/i, 'the spec colour');
const [specR, specG, specB, specA] = specSource.split(',').map((part) => Number(part.trim()));
const spec = over([specR, specG, specB], specA, fill);

const AA = 4.5;
for (const [label, colour] of [
  ['title on card fill', title],
  ['spec on card fill', spec],
]) {
  const value = ratio(colour, fill);
  check(`${label} >= ${AA}:1`, value >= AA, `${value.toFixed(2)}:1`);
}

/* The CTA is a solid white pill with its own dark ink, so it is independent of
   the card fill. */
const ctaFill = hex(fromCss(/\.feature-card-cta\s*\{[^}]*background:\s*(#[0-9a-f]{6})/i, 'the CTA fill'));
const ctaInk = hex(fromCss(/\.feature-card-cta\s*\{[^}]*color:\s*(#[0-9a-f]{6})/i, 'the CTA ink'));
check(
  `CTA label on CTA fill >= ${AA}:1`,
  ratio(ctaInk, ctaFill) >= AA,
  `${ratio(ctaInk, ctaFill).toFixed(2)}:1`,
);

/* The band's eyebrow used to fall through to --green (#0d8053), which is
   3.49:1 on the band's fill — under AA for 13px text — because the band is not
   a `.section-dark` and so missed the light green those sections use. */
const bandFill = hex(fromCss(/\.cta-band\s*\{[^}]*background:\s*(#[0-9a-f]{6})/i, 'the band fill', cms));
const bandEyebrow = hex(fromCss(/\.cta-band \.eyebrow\s*\{[^}]*color:\s*(#[0-9a-f]{6})/i, 'the band eyebrow colour'));
check(
  `band eyebrow on band fill >= ${AA}:1`,
  ratio(bandEyebrow, bandFill) >= AA,
  `${ratio(bandEyebrow, bandFill).toFixed(2)}:1`,
);

/* --- Report ------------------------------------------------------------- */

const width = Math.max(...results.map((r) => r.name.length));
let failed = 0;
for (const { name, pass, detail } of results) {
  if (!pass) failed += 1;
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name.padEnd(width)}  ${detail}`);
}
console.log('');
console.log(failed === 0 ? `all ${results.length} checks passed` : `${failed} of ${results.length} checks FAILED`);
process.exitCode = failed === 0 ? 0 : 1;
