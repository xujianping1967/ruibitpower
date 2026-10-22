/**
 * Takes the four generated homepage feature-card images from media-output/,
 * writes optimised WebP + JPG into public/assets/images/home/, and builds a
 * contact sheet so the set can be reviewed as one grid.
 */
import sharp from 'sharp';
import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const mediaDir = path.join(root, '..', 'media-output');
const outDir = path.join(root, 'public', 'assets', 'images', 'home');
mkdirSync(outDir, { recursive: true });

/** product slug -> generated file in media-output/ */
/* Round 2. The first set was four variations of the same recipe — blue-hour
   dusk, concrete, an industrial facade — so the row read as one repeated
   scene. These four are deliberately different worlds, one per lighting
   condition: cool mid-day industrial yard / warm golden-hour solar field /
   warm domestic interior / cool wet night forecourt. */
const MAP = [
  ['honey-125kw-261kwh-all-in-one-ess', 'img-mv67rc2z-ea51b9a5.png'],
  ['sunflower-125kw-261kwh-pv-hybrid-ess', 'img-mv67reeh-d449ca0f.png'],
  ['six-ultra-bs06-s-hv-stackable', 'img-mv67sv1d-e3e32ee4.png'],
  ['loong-power-bs09-112-dp', 'img-mv67szh0-653f9286.png'],
];

for (const [slug, file] of MAP) {
  const src = path.join(mediaDir, file);
  if (!existsSync(src)) {
    console.log(`${slug.padEnd(38)} MISSING ${file}`);
    continue;
  }
  const meta = await sharp(src).metadata();
  const image = sharp(src);
  await image.clone().webp({ quality: 86, effort: 5 }).toFile(path.join(outDir, `${slug}.webp`));
  await image.clone().jpeg({ quality: 88, mozjpeg: true }).toFile(path.join(outDir, `${slug}.jpg`));
  console.log(`${slug.padEnd(38)} ${meta.width}x${meta.height}  -> webp + jpg`);
}

/* Contact sheet: 2x2 at 594px per cell = the real card size in a 1180 container. */
const CELL_W = 594;
const CELL_H = 396;
const GAP = 12;
const W = CELL_W * 2 + GAP * 3;
const H = CELL_H * 2 + GAP * 3;

const composites = [];
for (let i = 0; i < MAP.length; i++) {
  const [slug] = MAP[i];
  const p = path.join(outDir, `${slug}.jpg`);
  if (!existsSync(p)) continue;
  const buf = await sharp(p).resize(CELL_W, CELL_H, { fit: 'cover' }).png().toBuffer();
  composites.push({
    input: buf,
    left: GAP + (i % 2) * (CELL_W + GAP),
    top: GAP + Math.floor(i / 2) * (CELL_H + GAP),
  });
}

await sharp({ create: { width: W, height: H, channels: 3, background: '#0b1220' } })
  .composite(composites)
  .jpeg({ quality: 84 })
  .toFile(path.join(root, 'assets-source', 'home-cards-sheet.jpg'));

const files = readdirSync(outDir);
console.log(`\nwrote ${files.length} files to public/assets/images/home/`);
console.log('contact sheet -> assets-source/home-cards-sheet.jpg  (2x2, card-sized)');
