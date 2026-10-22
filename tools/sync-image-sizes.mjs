#!/usr/bin/env node
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve('public');
const IMAGE_ROOT = path.join(ROOT, 'assets', 'images');
const OUTPUT = path.resolve('src/data/image-sizes.json');
const EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.tif', '.tiff']);

async function walk(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (EXTENSIONS.has(path.extname(entry.name).toLowerCase())) files.push(full);
  }
  return files;
}

const files = (await walk(IMAGE_ROOT)).sort((a, b) => a.localeCompare(b));
const sizes = {};
const failures = [];

for (const file of files) {
  try {
    const { width, height } = await sharp(file).metadata();
    if (!width || !height) throw new Error('missing intrinsic dimensions');
    const url = '/' + path.relative(ROOT, file).split(path.sep).join('/');
    sizes[url] = [width, height];
  } catch (error) {
    failures.push(`${path.relative(process.cwd(), file)}: ${error.message}`);
  }
}

if (failures.length) {
  console.error('Image metadata failures:');
  for (const failure of failures) console.error('  ' + failure);
  process.exit(1);
}

const next = JSON.stringify(sizes, null, 2) + '\n';
const previous = await readFile(OUTPUT, 'utf8').catch(() => '');
if (previous !== next) await writeFile(OUTPUT, next, 'utf8');
console.log(`image dimensions synchronized: ${files.length} files${previous === next ? ' (unchanged)' : ' (updated)'}`);
