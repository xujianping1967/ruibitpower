/**
 * Builds a copy of dist/ that can be opened directly from disk by
 * double-clicking index.html — no local web server required.
 *
 * Astro emits root-absolute paths ("/assets/css/site.css", "/products/"), which
 * only resolve when served from a web root. Over file:// they break. This script
 * rewrites every href/src/srcset into a path relative to the current page, and
 * maps directory links onto their index.html so in-page navigation works.
 *
 * Usage: node tools/make-offline-copy.mjs
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync, copyFileSync, rmSync, existsSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const srcDir = path.join(root, 'dist');
const outDir = path.join(root, 'preview-offline');

const SKIP = new Set(['_redirects', '_headers']);

/* Turn a root-absolute URL into one relative to the page's own directory. */
const toRelative = (url, prefix) => {
  const hashIndex = url.search(/[?#]/);
  const pathPart = hashIndex === -1 ? url : url.slice(0, hashIndex);
  const suffix = hashIndex === -1 ? '' : url.slice(hashIndex);

  const clean = pathPart.replace(/^\/+/, '');
  if (clean === '') return `${prefix}index.html${suffix}`;
  if (clean.endsWith('/')) return `${prefix}${clean}index.html${suffix}`;

  const lastSegment = clean.split('/').pop() ?? '';
  const hasExtension = /\.[a-z0-9]{2,5}$/i.test(lastSegment);
  return hasExtension ? `${prefix}${clean}${suffix}` : `${prefix}${clean}/index.html${suffix}`;
};

/* Any attribute that can hold a root-absolute URL and is read back by script
   belongs here. `data-src` / `data-image` are included because a component that
   stores its real path in a data attribute would otherwise resolve against the
   drive root under file://. */
const URL_ATTRS = 'href|src|data-src|data-image|data-full|data-lightbox-src|poster';

const rewriteHtml = (html, prefix) => {
  const attrRe = new RegExp(`(\\s(?:${URL_ATTRS})=")(\\/(?!\\/)[^"]*)(")`, 'g');
  let out = html.replace(attrRe, (_m, a, url, b) => `${a}${toRelative(url, prefix)}${b}`);

  // srcset: comma-separated "url descriptor" pairs
  out = out.replace(/(\ssrcset=")([^"]*)(")/g, (_m, a, value, b) => {
    const rewritten = value
      .split(',')
      .map((entry) => {
        const trimmed = entry.trim();
        if (!trimmed) return trimmed;
        const [url, ...descriptor] = trimmed.split(/\s+/);
        const next = url.startsWith('/') && !url.startsWith('//') ? toRelative(url, prefix) : url;
        return [next, ...descriptor].join(' ');
      })
      .join(', ');
    return `${a}${rewritten}${b}`;
  });

  return out;
};

const walk = (dir, relBase = '') => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const rel = relBase ? `${relBase}/${entry.name}` : entry.name;
    const from = path.join(dir, entry.name);
    const to = path.join(outDir, rel);

    if (entry.isDirectory()) {
      mkdirSync(to, { recursive: true });
      walk(from, rel);
      continue;
    }

    if (SKIP.has(entry.name)) continue;

    if (entry.name.endsWith('.html')) {
      const depth = rel.split('/').length - 1;
      const prefix = '../'.repeat(depth);
      writeFileSync(to, rewriteHtml(readFileSync(from, 'utf8'), prefix), 'utf8');
    } else {
      copyFileSync(from, to);
    }
  }
};

if (!existsSync(srcDir)) {
  console.error('dist/ not found — run `npm run build` first.');
  process.exit(1);
}

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });
walk(srcDir);

writeFileSync(
  path.join(outDir, 'HOW-TO-VIEW.txt'),
  [
    'Ruibit Power — offline preview',
    '',
    'Double-click  index.html  in this folder.',
    'Every page, image and stylesheet is included locally and links work',
    'between pages, so you can click through the whole site without a server.',
    '',
    'Note: this copy is for review only. The deployed site is built from dist/',
    'and served over HTTP. Form submission does not work in this offline copy.',
    '',
  ].join('\r\n'),
  'utf8'
);

const count = (dir) => readdirSync(dir, { withFileTypes: true }).reduce(
  (sum, entry) => sum + (entry.isDirectory() ? count(path.join(dir, entry.name)) : 1),
  0
);
console.log(`preview-offline/  ${count(outDir)} files`);
console.log('open preview-offline/index.html');
