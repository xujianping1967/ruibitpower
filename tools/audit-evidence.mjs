#!/usr/bin/env node
/**
 * Evidence gate.
 *
 * Every product, article, and case page should be able to point at the document
 * its numbers came from. This script does not try to judge whether a citation
 * is *good* — it enforces that nothing enters the site silently uncited.
 *
 * A page passes if it has a source through either path:
 *   - a `sources` entry in its own content file (what the CMS writes), or
 *   - an entry in src/data/sources.json (verified origin URLs).
 *
 * A page without either must be listed under `noSource` in sources.json with a
 * reason. That list is the debt ledger: it can only shrink by adding sources,
 * and adding a new page without one fails the build.
 */
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (p) => JSON.parse(readFileSync(path.join(root, p), 'utf8'));
const sources = read('src/data/sources.json');
const ledger = sources.noSource ?? {};

const frontmatterValue = (text, key) => {
  const match = new RegExp(`^${key}:\\s*(.+)$`, 'm').exec(text.split(/^---$/m)[1] ?? '');
  return match ? match[1].trim() : '';
};

const collections = {
  products: {
    dir: 'src/content/products',
    ext: '.json',
    has: (file) => (read(path.join('src/content/products', file)).sources ?? []).length > 0,
  },
  blog: {
    dir: 'src/content/blog',
    ext: '.md',
    id: (file) => file.replace(/\.md$/, ''),
    has: (file) => {
      const text = readFileSync(path.join(root, 'src/content/blog', file), 'utf8');
      const value = frontmatterValue(text, 'sources');
      return Boolean(value) && value !== '[]';
    },
  },
  projects: {
    dir: 'src/content/projects',
    ext: '.json',
    has: (file) => (read(path.join('src/content/projects', file)).sources ?? []).length > 0,
  },
};

const missing = [];
let total = 0;
let cited = 0;

for (const [name, spec] of Object.entries(collections)) {
  const files = readdirSync(path.join(root, spec.dir)).filter((f) => f.endsWith(spec.ext));
  const map = sources[name] ?? {};
  let localCited = 0;
  let localDebt = 0;

  for (const file of files) {
    total += 1;
    const id = spec.id ? spec.id(file) : file.replace(/\.json$/, '');
    const slug = name === 'blog' ? id : read(path.join(spec.dir, file)).slug;
    const citedHere = Boolean(map[slug]) || spec.has(file);
    if (citedHere) {
      cited += 1;
      localCited += 1;
      continue;
    }
    if (Object.prototype.hasOwnProperty.call(ledger[name] ?? {}, slug)) {
      localDebt += 1;
      continue;
    }
    missing.push(`${name}/${slug}`);
  }

  console.log(
    `${name.padEnd(9)} ${String(files.length).padStart(3)} items  ` +
      `${String(localCited).padStart(3)} cited  ${String(localDebt).padStart(3)} on the debt ledger`,
  );
}

console.log(`\nEvidence coverage: ${cited}/${total} (${Math.round((cited / total) * 100)}%)`);

if (missing.length) {
  console.error(`\nUncited and not on the ledger (${missing.length}):`);
  for (const item of missing) console.error(`  ${item}`);
  console.error('\nAdd a source, or record why there is none in sources.json → noSource.');
  process.exit(1);
}
