/**
 * Produces the unified product image set.
 *
 * Target: 1200x800 (3:2), white studio background, product centred with a
 * consistent fill ratio, no baked-in promotional text.
 *
 * Framing strategy — every source is a 1:1 or near-1:1 manufacturer render with
 * the product centred on white. Containment alone would leave ~40% empty side
 * space, so the content bounding box is measured with sharp's trim and the
 * product is re-framed to a constant fill ratio. The trim is only used to
 * MEASURE; the pixels are re-extracted from the untouched original with a
 * safety pad added, so no part of a product is clipped.
 *
 *   node tools/product-images.mjs            # measure only
 *   node tools/product-images.mjs --write    # write the images
 */
import sharp from 'sharp';
import { readFileSync, writeFileSync, mkdirSync, statSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const srcDir = path.join(root, 'assets-source', 'dawnice');
const outDir = path.join(root, 'assets-source', 'out');

const CANVAS_W = 1200;
const CANVAS_H = 800; // 3:2
const FILL = 0.88; // preferred share of the limiting canvas dimension
const MAX_UPSCALE = 1.15; // hard cap: beyond this the render visibly softens
const PAD = 0.03; // extra safety pad around the measured content box
const TRIM_THRESHOLD = 12;

/**
 * Ruibit product slug -> [source image, optional upscale-cap override].
 *
 * Source selection note: each source was inspected visually before use.
 * Manufacturer pages mix clean product renders with brochure pages, dimension
 * diagrams and images carrying baked-in promotional copy, so the mapping below
 * is a curated pick, not a bulk download. Where the manufacturer's own asset
 * carried baked-in text, the clean standing image was preferred instead.
 *
 * Cap overrides: only the containerized system needs one. Its source frames a
 * long low object (3.5:1) inside a square, so reaching a comparable on-canvas
 * size requires magnification no amount of layout can avoid.
 */
const MAP = [
  ['powerfly-hzeb-lct-5', 'hzb-lct-5.webp'],
  ['powerfly-hzeb-lct-10', 'hzb-lct-10.webp'],
  ['powerfly-hzeb-lct-20', 'hzb-lct-20.webp'],
  ['six-ultra-bs06-s-hv-stackable', 'six-ultra-bs06s.webp'],
  ['loong-power-bs09-112-dp', 'bs09-112-right.webp'],
  ['loong-power-bs09-225-d', 'hct-200-dc.webp'],
  ['honey-125kw-261kwh-all-in-one-ess', 'honey-125-261-angle.webp'],
  ['honey-wd-ecf260s-dc-outdoor', 'honey-dc-out-persp.webp'],
  ['sunflower-125kw-261kwh-pv-hybrid-ess', 'hct-125ts-265.webp'],
  ['dawnice-containerized-bess', 'container-1mwh.webp', 1.4],
  ['dawnice-residential-hybrid-inverter', 'inv-side.webp'],
  ['dw-home-all-in-one-ess', 'ruibit-home-01.jpg'],
];

const WRITE = process.argv.includes('--write');
if (WRITE) mkdirSync(outDir, { recursive: true });

const rows = [];

for (const [slug, file, capOverride] of MAP) {
  const cap = capOverride ?? MAX_UPSCALE;
  const srcPath = path.join(srcDir, file);
  const original = sharp(srcPath);
  const meta = await original.metadata();

  // Measure the content bounding box (trim does not mutate the input buffer).
  let box = { left: 0, top: 0, width: meta.width, height: meta.height };
  try {
    const probe = await sharp(srcPath).trim({ threshold: TRIM_THRESHOLD }).toBuffer({ resolveWithObject: true });
    box = {
      left: probe.info.trimOffsetLeft ? -probe.info.trimOffsetLeft : 0,
      top: probe.info.trimOffsetTop ? -probe.info.trimOffsetTop : 0,
      width: probe.info.width,
      height: probe.info.height,
    };
    // sharp reports trimOffset* as the offset removed from each side.
    box.left = Math.abs(probe.info.trimOffsetLeft ?? 0);
    box.top = Math.abs(probe.info.trimOffsetTop ?? 0);
  } catch (error) {
    rows.push({ slug, file, note: `trim failed: ${error.message}` });
    continue;
  }

  // Safety pad, clamped to the original frame.
  const padX = Math.round(box.width * PAD);
  const padY = Math.round(box.height * PAD);
  const extract = {
    left: Math.max(0, box.left - padX),
    top: Math.max(0, box.top - padY),
    width: Math.min(meta.width - Math.max(0, box.left - padX), box.width + padX * 2),
    height: Math.min(meta.height - Math.max(0, box.top - padY), box.height + padY * 2),
  };

  // Scale so the extracted content fills FILL of the limiting canvas dimension,
  // but never magnify past MAX_UPSCALE. Sources are 700-750 px, so a larger
  // factor would trade sharpness for uniformity — a bad trade on a site whose
  // visual credibility rests on the product photography. Products therefore
  // differ slightly in rendered size, in proportion to their real bulk.
  const maxW = CANVAS_W * FILL;
  const maxH = CANVAS_H * FILL;
  const scale = Math.min(maxW / extract.width, maxH / extract.height, cap);
  const targetW = Math.round(extract.width * scale);
  const targetH = Math.round(extract.height * scale);

  const content = await sharp(srcPath)
    .extract(extract)
    .resize(targetW, targetH, { fit: 'fill' })
    .toBuffer();

  const canvas = sharp({
    create: { width: CANVAS_W, height: CANVAS_H, channels: 3, background: '#ffffff' },
  }).composite([
    {
      input: content,
      left: Math.round((CANVAS_W - targetW) / 2),
      top: Math.round((CANVAS_H - targetH) / 2),
    },
  ]);

  if (WRITE) {
    await canvas.clone().webp({ quality: 88, effort: 5 }).toFile(path.join(outDir, `${slug}.webp`));
    await canvas.clone().jpeg({ quality: 90, mozjpeg: true }).toFile(path.join(outDir, `${slug}.jpg`));
  }

  const ratio = targetW / extract.width;
  const upscale = ratio > 1.005 ? `upscale ${ratio.toFixed(2)}x` : ratio < 0.995 ? `downscale ${ratio.toFixed(2)}x` : 'native';
  const heightShare = `${Math.round((targetH / CANVAS_H) * 100)}%h`;
  rows.push({
    slug,
    file,
    src: `${meta.width}x${meta.height}`,
    box: `${box.width}x${box.height} @${box.left},${box.top}`,
    fillPct: `${Math.round((box.width / meta.width) * 100)}%w ${Math.round((box.height / meta.height) * 100)}%h`,
    target: `${targetW}x${targetH}`,
    scale: `${upscale.padEnd(14)} ${heightShare}`,
  });
}

console.log(WRITE ? 'MODE: write\n' : 'MODE: measure only (pass --write)\n');
for (const r of rows) {
  if (r.note) {
    console.log(`${r.slug.padEnd(38)} ${r.file.padEnd(24)} ${r.note}`);
  } else {
    console.log(
      `${r.slug.padEnd(38)} ${r.src.padEnd(10)} box ${r.box.padEnd(20)} ${r.fillPct.padEnd(12)} -> ${r.target.padEnd(10)} ${r.scale}`
    );
  }
}
if (WRITE) {
  const files = MAP.flatMap(([slug]) => [path.join(outDir, `${slug}.webp`), path.join(outDir, `${slug}.jpg`)]); // eslint-disable-line
  const total = files.reduce((sum, f) => sum + statSync(f).size, 0);
  console.log(`\nwrote ${files.length} files, ${Math.round(total / 1024)} KB total`);
}
