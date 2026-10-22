/**
 * Installs the unified 3:2 product images into the site.
 *
 * - copies each generated image to public/assets/images/products/<slug>/hero-3x2.{webp,jpg}
 * - repoints the product JSON heroImage at it
 * - puts it first in the gallery, keeping the existing detail shots behind it
 *
 * Originals are left on disk, so this is reversible by reverting the JSON.
 */
import { readFileSync, writeFileSync, copyFileSync, mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const outDir = path.join(root, 'assets-source', 'out');
const contentDir = path.join(root, 'src', 'content', 'products');
const publicProducts = path.join(root, 'public', 'assets', 'images', 'products');

const targets = [
  'powerfly-hzeb-lct-5',
  'powerfly-hzeb-lct-10',
  'powerfly-hzeb-lct-20',
  'six-ultra-bs06-s-hv-stackable',
  'loong-power-bs09-112-dp',
  'loong-power-bs09-225-d',
  'honey-125kw-261kwh-all-in-one-ess',
  'honey-wd-ecf260s-dc-outdoor',
  'sunflower-125kw-261kwh-pv-hybrid-ess',
  'dawnice-containerized-bess',
  'dawnice-residential-hybrid-inverter',
  'dw-home-all-in-one-ess',
];

for (const slug of targets) {
  const dir = path.join(publicProducts, slug);
  mkdirSync(dir, { recursive: true });

  for (const ext of ['webp', 'jpg']) {
    const src = path.join(outDir, `${slug}.${ext}`);
    if (!existsSync(src)) {
      console.log(`${slug.padEnd(38)} MISSING ${ext}`);
      continue;
    }
    copyFileSync(src, path.join(dir, `hero-3x2.${ext}`));
  }

  const jsonPath = path.join(contentDir, `${slug}.json`);
  const data = JSON.parse(readFileSync(jsonPath, 'utf8'));

  const hero = `/assets/images/products/${slug}/hero-3x2.jpg`;
  const rest = (data.gallery ?? []).filter((g) => !g.includes('hero-3x2'));

  data.heroImage = hero;
  data.gallery = [hero, ...rest];

  // Keep `image` (used by some templates) in step when present.
  if (data.image) data.image = hero;

  writeFileSync(jsonPath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  console.log(`${slug.padEnd(38)} hero + gallery[0] -> hero-3x2.jpg (gallery now ${data.gallery.length})`);
}

console.log('\ndone');
