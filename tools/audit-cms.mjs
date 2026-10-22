#!/usr/bin/env node
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import YAML from 'yaml';

const config = YAML.parse(await readFile('public/admin/config.yml', 'utf8'));
const failures = [];

function compare(data, fields, location) {
  const configured = new Map((fields ?? []).map((field) => [field.name, field]));
  for (const [key, value] of Object.entries(data ?? {})) {
    const field = configured.get(key);
    if (!field) {
      failures.push(`${location}: field "${key}" is not exposed by the CMS`);
      continue;
    }
    if (Array.isArray(value) && field.fields) {
      value.filter((item) => item && typeof item === 'object').forEach((item, index) => compare(item, field.fields, `${location}.${key}[${index}]`));
    } else if (value && typeof value === 'object' && field.fields) {
      compare(value, field.fields, `${location}.${key}`);
    }
  }
}

for (const collectionName of ['products', 'projects']) {
  const collection = config.collections.find((entry) => entry.name === collectionName);
  for (const name of await readdir(collection.folder)) {
    if (!name.endsWith('.json')) continue;
    const data = JSON.parse(await readFile(path.join(collection.folder, name), 'utf8'));
    compare(data, collection.fields, `${collectionName}/${name}`);
  }
}

const blog = config.collections.find((entry) => entry.name === 'blog');
for (const name of await readdir(blog.folder)) {
  if (!name.endsWith('.md')) continue;
  const source = await readFile(path.join(blog.folder, name), 'utf8');
  const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1];
  if (frontmatter) compare(YAML.parse(frontmatter), blog.fields, `blog/${name}`);
}

const settings = config.collections.find((entry) => entry.name === 'settings');
for (const definition of settings.files) {
  const data = JSON.parse(await readFile(definition.file, 'utf8'));
  compare(data, definition.fields, `settings/${definition.name}`);
}

if (failures.length) {
  console.error(`CMS COVERAGE FAILED (${failures.length})`);
  for (const failure of failures) console.error('  ' + failure);
  process.exit(1);
}

console.log('PASS CMS coverage: every existing content and settings field is represented in Decap CMS');
