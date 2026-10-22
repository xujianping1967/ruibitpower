/**
 * Writes the real intrinsic pixel dimensions of each project image into the
 * project JSON, so the layout can reserve the correct space and avoid a shift.
 * Run it after changing any project image.
 */
import sharp from 'sharp';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const dir = path.join(root, 'src', 'content', 'projects');

for (const file of readdirSync(dir)) {
  const full = path.join(dir, file);
  const raw = readFileSync(full, 'utf8');
  const data = JSON.parse(raw);

  const imagePath = path.join(root, 'public', data.image.replace(/^\//, ''));
  const meta = await sharp(imagePath).metadata();

  if (!meta.width || !meta.height) {
    console.log(`${file.padEnd(52)} SKIPPED (no dimensions)`);
    continue;
  }

  const changed = data.imageWidth !== meta.width || data.imageHeight !== meta.height;

  // Rebuild in the original key order, inserting the dimensions right after
  // the `image` entry so the diff stays readable.
  const rebuilt = {};
  for (const [key, value] of Object.entries(data)) {
    if (key === 'imageWidth' || key === 'imageHeight') continue;
    rebuilt[key] = value;
    if (key === 'image' || key === 'imageCaption') {
      rebuilt.imageWidth = meta.width;
      rebuilt.imageHeight = meta.height;
    }
  }
  if (!('imageWidth' in rebuilt)) {
    rebuilt.imageWidth = meta.width;
    rebuilt.imageHeight = meta.height;
  }

  writeFileSync(full, `${JSON.stringify(rebuilt, null, 2)}\n`, 'utf8');
  console.log(`${file.padEnd(52)} ${meta.width}x${meta.height} ${changed ? '(updated)' : '(unchanged)'}`);
}
