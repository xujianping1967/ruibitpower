#!/usr/bin/env node
/**
 * Header rules, checked against the two hosts that read them.
 *
 * Cloudflare merges every matching rule and joins duplicate header names with a
 * comma; Netlify does not support Cloudflare's "! Header" removal syntax. So a
 * file whose correctness depends on one block replacing another is fine on one
 * host and wrong on the other. The only safe shape is: for any URL, each header
 * name is defined by exactly one matching rule.
 *
 * Also fails if netlify.toml reintroduces [[headers]] — Netlify applies the file
 * and the config together, so every header would then be sent twice.
 */
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const headersPath = path.join(root, 'public/_headers');
const tomlPath = path.join(root, 'netlify.toml');

const errors = [];

if (!existsSync(headersPath)) {
  console.error('FAIL  public/_headers is missing');
  process.exit(1);
}

const text = readFileSync(headersPath, 'utf8');
const blocks = [];
let current = null;

for (const raw of text.split(/\r?\n/)) {
  const line = raw.trim();
  if (!line || line.startsWith('#')) continue;
  if (!/^\s/.test(raw)) {
    current = { pattern: line, headers: [] };
    blocks.push(current);
    continue;
  }
  const match = /^([A-Za-z-]+):\s*(.+)$/.exec(line);
  if (!match) {
    errors.push(`unparsable header line: ${line}`);
    continue;
  }
  if (!current) {
    errors.push(`header outside a path block: ${line}`);
    continue;
  }
  current.headers.push([match[1].toLowerCase(), match[2]]);
}

if (blocks.length > 100) errors.push(`${blocks.length} blocks — Cloudflare allows 100`);

for (const block of blocks) {
  for (const [, value] of block.headers) {
    if (value.length > 1900) errors.push(`value too long in ${block.pattern}: ${value.length} chars`);
  }
}

const matches = (pattern, url) => {
  if (!pattern.includes('*')) return pattern === url || (pattern.endsWith('/') && url.startsWith(pattern));
  const rx = new RegExp('^' + pattern.split('*').map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('.*') + '$');
  return rx.test(url);
};

const samples = ['/', '/admin/', '/products/honey-125kw-261kwh-all-in-one-ess/', '/assets/css/site.css', '/assets/images/hero-bess.webp', '/assets/js/configurator.js', '/downloads/dawnice-ci-100kwh-datasheet.pdf', '/llms.txt', '/agents.md', '/404.html'];

for (const url of samples) {
  const applied = new Map();
  for (const block of blocks) {
    if (!matches(block.pattern, url)) continue;
    for (const [name, value] of block.headers) {
      if (applied.has(name)) {
        errors.push(`${url}: "${name}" set by both ${applied.get(name)[0]} and ${block.pattern} — hosts will either duplicate or diverge`);
      }
      applied.set(name, [block.pattern, value]);
    }
  }
  console.log(`${String(applied.size).padStart(2)} headers  ${url}`);
}

const csp = blocks.find((b) => b.pattern === '/*')?.headers.find(([n]) => n === 'content-security-policy');
if (!csp) {
  errors.push('no Content-Security-Policy on /*');
} else {
  const value = csp[1];
  if (!/connect-src[^;]*https:\/\/api\.github\.com/.test(value)) {
    errors.push('CSP connect-src must allow https://api.github.com — /admin/ saves go there');
  }
  if (!/script-src[^;]*https:\/\/unpkg\.com/.test(value)) {
    errors.push('CSP script-src must allow https://unpkg.com while the CMS bundle is loaded from it');
  }
  if (!/frame-ancestors 'none'/.test(value)) errors.push("CSP is missing frame-ancestors 'none'");
}

if (existsSync(tomlPath)) {
  const toml = readFileSync(tomlPath, 'utf8');
  if (/^\s*\[\[headers\]\]/m.test(toml)) {
    errors.push('netlify.toml defines [[headers]] — Netlify would apply them in addition to public/_headers');
  }
}

if (errors.length) {
  console.error('\nFAIL header rules:');
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}
console.log(`\nPASS header rules: ${blocks.length} blocks, no URL sets the same header twice`);
