import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const pub = path.join(root, 'public');
const img = path.join(pub, 'assets', 'images');

const markSvg = await readFile(path.join(img, 'logo-mark.svg'));

// 1) Organization logo (square raster, used by Organization structured data)
await sharp(markSvg, { density: 400 })
  .resize(512, 512)
  .png()
  .toFile(path.join(img, 'logo-512.png'));

// 2) Favicons
await sharp(markSvg, { density: 400 }).resize(32, 32).png().toFile(path.join(pub, 'favicon-32.png'));
await sharp(markSvg, { density: 400 }).resize(180, 180).png().toFile(path.join(pub, 'apple-touch-icon.png'));

// 3) favicon.ico — ICO container wrapping a 48x48 PNG (valid on all modern platforms)
const png48 = await sharp(markSvg, { density: 400 }).resize(48, 48).png().toBuffer();
const icoHeader = Buffer.alloc(6);
icoHeader.writeUInt16LE(0, 0); // reserved
icoHeader.writeUInt16LE(1, 2); // type: icon
icoHeader.writeUInt16LE(1, 4); // image count
const icoEntry = Buffer.alloc(16);
icoEntry.writeUInt8(48, 0); // width
icoEntry.writeUInt8(48, 1); // height
icoEntry.writeUInt8(0, 2); // palette
icoEntry.writeUInt8(0, 3); // reserved
icoEntry.writeUInt16LE(1, 4); // color planes
icoEntry.writeUInt16LE(32, 6); // bpp
icoEntry.writeUInt32LE(png48.length, 8); // payload size
icoEntry.writeUInt32LE(22, 12); // payload offset
await writeFile(path.join(pub, 'favicon.ico'), Buffer.concat([icoHeader, icoEntry, png48]));

// 4) Text-rendering probe: does this sharp/librsvg build render SVG <text>?
const probeSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="60">
  <rect width="200" height="60" fill="#ffffff"/>
  <text x="10" y="40" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#000000">RUBT</text>
</svg>`;
const probe = await sharp(Buffer.from(probeSvg)).raw().toBuffer({ resolveWithObject: true });
let dark = 0;
for (let i = 0; i < probe.data.length; i += probe.info.channels) {
  if (probe.data[i] < 128) dark++;
}
console.log(`TEXT_PROBE dark_pixels=${dark} (0 => SVG text NOT rendered, use path-only overlay)`);

console.log('OK: logo-512.png, favicon-32.png, apple-touch-icon.png, favicon.ico');
