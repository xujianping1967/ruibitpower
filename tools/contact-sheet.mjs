/**
 * Builds a labelled contact sheet of the downloaded source images so their
 * content (and any baked-in text) can be reviewed in a single look.
 */
import sharp from 'sharp';
import { readdirSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
/* Optional args: <subfolder> <output-name>. Defaults to the downloaded sources. */
const sub = process.argv[2] ?? 'dawnice';
const outName = process.argv[3] ?? 'contact-sheet';
const dir = path.join(root, 'assets-source', sub);

const files = readdirSync(dir)
  .filter((f) => /\.(webp|png|jpe?g)$/i.test(f) && !f.endsWith('.svg'))
  .sort();
const CELL = 300;
const COLS = 5;
const ROWS = Math.ceil(files.length / COLS);
const W = COLS * CELL;
const H = ROWS * (CELL + 26);

const composites = [];
const labels = [];

for (let i = 0; i < files.length; i++) {
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  const x = col * CELL;
  const y = row * (CELL + 26);

  let buf;
  try {
    buf = await sharp(path.join(dir, files[i]))
      .resize(CELL - 16, CELL - 16, { fit: 'contain', background: '#dfe6ef' })
      .flatten({ background: '#dfe6ef' })
      .png()
      .toBuffer();
  } catch {
    buf = await sharp({
      create: { width: CELL - 16, height: CELL - 16, channels: 3, background: '#ffdede' },
    })
      .png()
      .toBuffer();
  }

  composites.push({ input: buf, left: x + 8, top: y + 8 });

  const label = `${i + 1}. ${files[i].replace(/\.(webp|png|jpe?g)$/i, '')}`;
  labels.push(
    Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${CELL}" height="26">
        <rect width="${CELL}" height="26" fill="#111c2c"/>
        <text x="6" y="18" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#ffffff">${label}</text>
      </svg>`
    )
  );
}

composites.push(...labels.map((input, i) => ({
  input,
  left: (i % COLS) * CELL,
  top: Math.floor(i / COLS) * (CELL + 26) + CELL,
})));

const outPath = path.join(root, 'assets-source', `${outName}.jpg`);
await sharp({ create: { width: W, height: H, channels: 3, background: '#e8edf4' } })
  .composite(composites)
  .jpeg({ quality: 82 })
  .toFile(outPath);

console.log(`${outName}.jpg  ${W}x${H}  (${files.length} images from assets-source/${sub})`);
files.forEach((f, i) => console.log(`  ${String(i + 1).padStart(2)}. ${f}`));
