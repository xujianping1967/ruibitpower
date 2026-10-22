import sharp from 'sharp';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const images = path.join(root, 'public', 'assets', 'images');

const W = 1200;
const H = 630;
const FONT = 'Segoe UI, Arial, Helvetica, sans-serif';

const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="scrim" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#08101c" stop-opacity="0.96"/>
      <stop offset="0.52" stop-color="#08101c" stop-opacity="0.82"/>
      <stop offset="1" stop-color="#08101c" stop-opacity="0.34"/>
    </linearGradient>
    <linearGradient id="vign" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#08101c" stop-opacity="0.55"/>
      <stop offset="0.4" stop-color="#08101c" stop-opacity="0"/>
      <stop offset="1" stop-color="#08101c" stop-opacity="0.72"/>
    </linearGradient>
    <linearGradient id="mark" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1d4d8a"/>
      <stop offset="1" stop-color="#0f9a64"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#scrim)"/>
  <rect width="${W}" height="${H}" fill="url(#vign)"/>

  <!-- logo mark -->
  <g transform="translate(72,60)">
    <rect width="52" height="52" rx="12" fill="url(#mark)"/>
    <path d="M16.6 39.5 V12.5 H31.7 A7.8 7.8 0 0 1 31.7 28.1 H16.6 M27.6 28.1 L38 39.5"
          fill="none" stroke="#ffffff" stroke-width="5.7"
          stroke-linecap="square" stroke-linejoin="miter"/>
  </g>
  <text x="138" y="96" font-family="${FONT}" font-size="30" font-weight="700" fill="#ffffff">Ruibit Power</text>
  <text x="140" y="120" font-family="${FONT}" font-size="17" fill="#9fb2c9">Authorized Dawnice energy storage channel</text>

  <!-- eyebrow -->
  <text x="72" y="250" font-family="${FONT}" font-size="17" font-weight="700"
        letter-spacing="3.4" fill="#6fe0a8">ENERGY STORAGE  ·  B2B SUPPLY</text>

  <!-- headline -->
  <text x="72" y="322" font-family="${FONT}" font-size="53" font-weight="700" fill="#ffffff">Solar battery &amp; BESS systems</text>
  <text x="72" y="386" font-family="${FONT}" font-size="53" font-weight="700" fill="#ffffff">for real project delivery.</text>

  <!-- rule -->
  <rect x="72" y="452" width="1056" height="1" fill="#ffffff" fill-opacity="0.18"/>

  <!-- fact row -->
  <text x="72" y="502" font-family="${FONT}" font-size="25" font-weight="700" fill="#ffffff">Residential · C&amp;I · Containerized</text>
  <text x="72" y="532" font-family="${FONT}" font-size="19" fill="#9fb2c9">LiFePO4 platforms · IEC / UL / CE documentation</text>

  <text x="72" y="576" font-family="${FONT}" font-size="17" fill="#6fe0a8">Quotation target: 24 working hours</text>
  <text x="1128" y="576" text-anchor="end" font-family="${FONT}" font-size="19" font-weight="700" fill="#ffffff">ruibitpower.com</text>
</svg>`;

const base = await sharp(path.join(images, 'hero-bess.webp'))
  .resize(W, H, { fit: 'cover', position: 'centre' })
  .toBuffer();

await sharp(base)
  .composite([{ input: Buffer.from(overlay), top: 0, left: 0 }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(path.join(images, 'og-default.jpg'));

console.log('OK: og-default.jpg (1200x630 JPEG)');
