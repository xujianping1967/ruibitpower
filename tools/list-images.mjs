import sharp from 'sharp';
import { statSync, readdirSync } from 'node:fs';
import path from 'node:path';

const images = path.join(path.resolve(import.meta.dirname, '..'), 'public', 'assets', 'images');

const files = [
  ...readdirSync(images).filter((f) => /\.(jpe?g|png|webp|svg)$/i.test(f)),
  ...['', 'products'].flatMap(() => []),
];

for (const file of files) {
  const full = path.join(images, file);
  try {
    const meta = await sharp(full).metadata();
    const kb = Math.round(statSync(full).size / 1024);
    const ratio = meta.width && meta.height ? (meta.width / meta.height).toFixed(2) : '-';
    console.log(
      `${file.padEnd(26)} ${String(meta.width + 'x' + meta.height).padEnd(12)} ratio ${ratio.padEnd(6)} ${String(kb + 'KB').padStart(7)}  ${meta.format}`
    );
  } catch (error) {
    console.log(`${file.padEnd(26)} ERROR ${error.message}`);
  }
}
