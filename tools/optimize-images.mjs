/**
 * Produce optimised WebP derivatives for the two images actually used by the
 * trust sections. Originals are kept untouched.
 *
 * factory.jpg 1950x650 / 494 KB -> product-range banner
 * office.webp   600x399 /  29 KB -> facility photo (already small, kept as-is)
 */
import sharp from 'sharp';
import { statSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
/* Source images live outside public/ so they are not deployed; only the
   generated derivatives belong in public/. */
const source = path.join(root, 'assets-unused');
const images = path.join(root, 'public', 'assets', 'images');
const src = (file) => path.join(source, file);
const out = (file) => path.join(images, file);
const kb = (file) => Math.round(statSync(file).size / 1024);

// Wide product-range banner, 1600px is enough for a 1180px container and keeps
// the file far below the 494 KB JPEG it is derived from.
await sharp(src('factory.jpg'))
  .resize(1600, null, { withoutEnlargement: true })
  .webp({ quality: 82, effort: 5 })
  .toFile(out('factory-range.webp'));

// Small-screen variant so mobile does not download the 1600px file.
await sharp(src('factory.jpg'))
  .resize(760, null, { withoutEnlargement: true })
  .webp({ quality: 80, effort: 5 })
  .toFile(out('factory-range-sm.webp'));

console.log(`assets-unused/factory.jpg  ${kb(src('factory.jpg'))} KB (source, unchanged, not deployed)`);
console.log(`factory-range.webp         ${kb(out('factory-range.webp'))} KB`);
console.log(`factory-range-sm.webp      ${kb(out('factory-range-sm.webp'))} KB`);
