/**
 * Builds a sheet of magnified crops so small baked-in elements (badges,
 * ribbons, promotional stamps) can be judged. Args: <outName> then
 * pairs of <imagePath>|<region>, where region is full|top|topleft|topright.
 */
import sharp from 'sharp';
import path from 'node:path';
import { mkdirSync } from 'node:fs';

const root = path.resolve(import.meta.dirname, '..');
const outName = process.argv[2] ?? 'zoom-sheet';
const specs = process.argv.slice(3);

const CELL = 420;
const COLS = 3;
const rows = Math.ceil(specs.length / COLS);
const W = COLS * CELL;
const H = rows * (CELL + 26);

const composites = [];
const labels = [];

for (let i = 0; i < specs.length; i++) {
  const [rel, region = 'full'] = specs[i].split('|');
  const full = path.isAbsolute(rel) ? rel : path.join(root, rel);
  const meta = await sharp(full).metadata();

  let extract = { left: 0, top: 0, width: meta.width, height: meta.height };
  if (region === 'top') {
    extract = { left: 0, top: 0, width: meta.width, height: Math.round(meta.height * 0.38) };
  } else if (region === 'topleft') {
    extract = {
      left: 0,
      top: 0,
      width: Math.round(meta.width * 0.5),
      height: Math.round(meta.height * 0.45),
    };
  } else if (region === 'topright') {
    const w = Math.round(meta.width * 0.5);
    extract = { left: meta.width - w, top: 0, width: w, height: Math.round(meta.height * 0.45) };
  }

  const buf = await sharp(full)
    .extract(extract)
    .resize(CELL - 12, CELL - 12, { fit: 'contain', background: '#dfe6ef' })
    .flatten({ background: '#dfe6ef' })
    .png()
    .toBuffer();

  const col = i % COLS;
  const row = Math.floor(i / COLS);
  composites.push({ input: buf, left: col * CELL + 6, top: row * (CELL + 26) + 6 });
  labels.push(
    Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${CELL}" height="26">
        <rect width="${CELL}" height="26" fill="#111c2c"/>
        <text x="6" y="18" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#ffffff">${i + 1}. ${path.basename(rel)} [${region}]</text>
      </svg>`
    )
  );
}

labels.forEach((input, i) =>
  composites.push({
    input,
    left: (i % COLS) * CELL,
    top: Math.floor(i / COLS) * (CELL + 26) + CELL,
  })
);

mkdirSync(path.join(root, 'assets-source'), { recursive: true });
await sharp({ create: { width: W, height: H, channels: 3, background: '#e8edf4' } })
  .composite(composites)
  .jpeg({ quality: 85 })
  .toFile(path.join(root, 'assets-source', `${outName}.jpg`));
console.log(`${outName}.jpg ${W}x${H}`);
