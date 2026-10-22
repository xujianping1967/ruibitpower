/**
 * Reframes the reference-deployment card images to 3:2.
 *
 * Case cards use the same 3:2 band as product cards. The render-based case
 * images are square, so containing them in a 3:2 band left ~63px of empty white
 * either side and made the subject read small. This crops the square sources to
 * their content and re-frames them to fill the band, using the same measured-trim
 * approach as tools/product-images.mjs.
 *
 * The Nigeria card is a real field photograph (a 2.17:1 group shot). It cannot be
 * re-framed the same way, so it is left to the browser and displayed with
 * object-fit: cover instead (see `imageFit` in the project JSON).
 *
 * Usage: node tools/case-images.mjs [--write]
 */
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const outDir = path.join(root, 'public', 'assets', 'images', 'cases');

const CANVAS_W = 1200;
const CANVAS_H = 800;
const FILL = 0.9;
const PAD = 0.03;
const TRIM_THRESHOLD = 12;

/**
 * These cards display at roughly 377x251 CSS px, i.e. ~754x502 device px at 2x.
 * The 1200x800 canvas is therefore ~3x the size the browser actually needs, so
 * filling the band costs no visible sharpness: whatever is magnified here is
 * downsampled again at display time. An earlier 1.15x cap assumed the canvas
 * matched the display size and left subjects stranded in the middle of the band.
 */
const MAX_UPSCALE = 2.0;

/** case slug -> source path (relative to the project root) */
const MAP = [
  ['austria-factory-30kw-80kwh-bess', 'public/assets/images/products/loong-power-bs09-112-dp/01.jpg'],
  ['germany-30kw-hybrid-inverter-80kwh-lifepo4', 'public/assets/images/products/dawnice-residential-hybrid-inverter/01.jpg'],
  ['germany-470kw-solar-energy-storage-reference', 'assets-source/dawnice/container-1mwh.webp'],
  ['israel-10kw-hybrid-20kwh-battery', 'assets-source/dawnice/hzb-lct-10.webp'],
  ['usa-100kw-pcs-150kwh-lifepo4-storage', 'public/assets/images/products/honey-125kw-261kwh-all-in-one-ess/01.jpg'],
];

const WRITE = process.argv.includes('--write');
if (WRITE) mkdirSync(outDir, { recursive: true });

console.log(WRITE ? 'MODE: write\n' : 'MODE: measure only (pass --write)\n');

for (const [slug, rel] of MAP) {
  const src = path.join(root, rel);
  const meta = await sharp(src).metadata();

  let box;
  try {
    const probe = await sharp(src).trim({ threshold: TRIM_THRESHOLD }).toBuffer({ resolveWithObject: true });
    box = { width: probe.info.width, height: probe.info.height };
  } catch (error) {
    console.log(`${slug.padEnd(48)} trim failed: ${error.message}`);
    continue;
  }

  const padX = Math.round(box.width * PAD);
  const padY = Math.round(box.height * PAD);
  const extract = {
    left: 0,
    top: 0,
    width: Math.min(meta.width, box.width + padX * 2),
    height: Math.min(meta.height, box.height + padY * 2),
  };
  // Centre the extraction on the measured content.
  extract.left = Math.max(0, Math.round((meta.width - extract.width) / 2));
  extract.top = Math.max(0, Math.round((meta.height - extract.height) / 2));

  const scale = Math.min((CANVAS_W * FILL) / extract.width, (CANVAS_H * FILL) / extract.height, MAX_UPSCALE);
  const targetW = Math.round(extract.width * scale);
  const targetH = Math.round(extract.height * scale);

  const content = await sharp(src).extract(extract).resize(targetW, targetH, { fit: 'fill' }).toBuffer();

  const canvas = sharp({ create: { width: CANVAS_W, height: CANVAS_H, channels: 3, background: '#ffffff' } })
    .composite([{ input: content, left: Math.round((CANVAS_W - targetW) / 2), top: Math.round((CANVAS_H - targetH) / 2) }]);

  if (WRITE) {
    await canvas.clone().webp({ quality: 88, effort: 5 }).toFile(path.join(outDir, `${slug}.webp`));
    await canvas.clone().jpeg({ quality: 90, mozjpeg: true }).toFile(path.join(outDir, `${slug}.jpg`));
  }

  const ratio = targetW / extract.width;
  console.log(
    `${slug.padEnd(48)} ${(meta.width + 'x' + meta.height).padEnd(10)} content ${(box.width + 'x' + box.height).padEnd(10)} -> ${targetW}x${targetH}  ${ratio > 1.005 ? 'upscale ' + ratio.toFixed(2) + 'x' : 'native'}`
  );
}
