#!/usr/bin/env node
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

async function walk(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

const failures = [];
let images = 0;
for (const file of await walk('dist')) {
  const html = await readFile(file, 'utf8');
  const route = '/' + path.relative('dist', file).split(path.sep).join('/');
  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    images += 1;
    const tag = match[0];
    const src = tag.match(/\bsrc=["']([^"']+)/i)?.[1] ?? '(unknown source)';
    if (!/\balt\s*=/.test(tag)) failures.push(`${route}: missing alt on ${src}`);
    if (!/\bwidth\s*=/.test(tag) || !/\bheight\s*=/.test(tag)) {
      failures.push(`${route}: missing width/height on ${src}`);
    }
  }
}

if (failures.length) {
  console.error(`FAIL image audit: ${failures.length} issue(s) across ${images} image references`);
  for (const failure of failures.slice(0, 40)) console.error('  ' + failure);
  if (failures.length > 40) console.error(`  ... ${failures.length - 40} more`);
  process.exit(1);
}
console.log(`PASS image audit: ${images} references carry alt text and intrinsic dimensions`);
