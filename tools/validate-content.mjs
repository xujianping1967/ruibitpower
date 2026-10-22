#!/usr/bin/env node
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import YAML from 'yaml';

const errors = [];
const warnings = [];
const slugs = new Map();
const productSlugs = new Set();

async function exists(file) {
  try { return (await stat(file)).isFile(); } catch { return false; }
}
async function files(dir, extension) {
  return (await readdir(dir)).filter((name) => name.endsWith(extension)).sort().map((name) => path.join(dir, name));
}
function required(data, names, file) {
  for (const name of names) if (data[name] === undefined || data[name] === null || data[name] === '') errors.push(`${file}: missing ${name}`);
}
function requiredKeys(data, names, file) {
  for (const name of names) if (!(name in data)) errors.push(`${file}: missing field ${name}`);
}
function rememberSlug(scope, slug, file) {
  const key = `${scope}:${slug}`;
  if (slugs.has(key)) errors.push(`${file}: duplicate slug ${slug} (also ${slugs.get(key)})`);
  else slugs.set(key, file);
}
async function checkAsset(value, file, field) {
  if (!value || !value.startsWith('/')) return;
  const target = path.join('public', value.replace(/^\//, ''));
  if (!(await exists(target))) errors.push(`${file}: ${field} does not exist: ${value}`);
}

for (const file of await files('src/content/products', '.json')) {
  let data;
  try { data = JSON.parse(await readFile(file, 'utf8')); } catch (error) { errors.push(`${file}: invalid JSON (${error.message})`); continue; }
  required(data, ['title', 'slug', 'category', 'summary', 'heroImage'], file);
  rememberSlug('product', data.slug, file);
  productSlugs.add(data.slug);
  await checkAsset(data.heroImage, file, 'heroImage');
  for (const [index, image] of (data.gallery ?? []).entries()) await checkAsset(image, file, `gallery[${index}]`);
}

for (const file of await files('src/content/projects', '.json')) {
  let data;
  try { data = JSON.parse(await readFile(file, 'utf8')); } catch (error) { errors.push(`${file}: invalid JSON (${error.message})`); continue; }
  required(data, ['title', 'slug', 'country', 'application', 'capacity', 'summary', 'image'], file);
  requiredKeys(data, ['challenge', 'solution', 'result'], file);
  for (const name of ['challenge', 'solution', 'result']) {
    if (data[name] === '') warnings.push(`${file}: ${name} is intentionally blank until verified evidence is available`);
  }
  rememberSlug('project', data.slug, file);
  await checkAsset(data.image, file, 'image');
  if ((data.sourceLabel || data.evidenceType) && !data.sourceUrl) errors.push(`${file}: sourceLabel/evidenceType requires sourceUrl`);
}

for (const file of await files('src/content/blog', '.md')) {
  const source = await readFile(file, 'utf8');
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) { errors.push(`${file}: missing YAML frontmatter`); continue; }
  let data;
  try { data = YAML.parse(match[1]); } catch (error) { errors.push(`${file}: invalid YAML (${error.message})`); continue; }
  required(data, ['title', 'category', 'excerpt', 'publishDate'], file);
  const slug = path.basename(file, '.md');
  rememberSlug('blog', slug, file);
  await checkAsset(data.featuredImage, file, 'featuredImage');
  for (const related of data.relatedProducts ?? []) if (!productSlugs.has(related)) errors.push(`${file}: unknown related product ${related}`);
}

for (const file of ['src/data/site.json', 'src/data/trust.json', 'src/data/form.json', 'src/data/downloads.json']) {
  try { JSON.parse(await readFile(file, 'utf8')); } catch (error) { errors.push(`${file}: invalid JSON (${error.message})`); }
}

if (errors.length) {
  console.error(`CONTENT VALIDATION FAILED (${errors.length})`);
  for (const error of errors) console.error('  ' + error);
  process.exit(1);
}
if (warnings.length) {
  console.warn(`CONTENT WARNINGS (${warnings.length})`);
  for (const warning of warnings) console.warn('  ' + warning);
}
console.log('PASS content validation: products, blog, projects, data files, asset paths and cross-references');
