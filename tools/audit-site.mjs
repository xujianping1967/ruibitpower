/**
 * Whole-site audit of the built output.
 *
 * Walks every page in dist/, and checks the things that silently rot: a second
 * h1, a title that repeats another page's, a description that went missing, an
 * internal link to a page that no longer exists, an image without alt text,
 * structured data that does not parse, a sitemap entry pointing nothing.
 *
 * Run: node tools/audit-site.mjs
 * Exit code is 1 when any check fails.
 */

import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const DIST = 'dist';
/* site.json declares the domain without www, and every canonical, og:url and
   schema @id follows it. Checking against a www host reported all 40 pages as
   broken when none of them were. */
const ORIGIN = 'https://ruibitpower.com';

/* /admin/ is the Decap CMS shell, not a page: it has no h1, description or
   structured data by design, and it is excluded from the sitemap on purpose. */
const isToolPage = (route) => route.startsWith('/admin');

const failures = [];
const notes = [];
const pages = [];

const fail = (page, check, detail) => failures.push({ page, check, detail });

async function exists(target) {
  try {
    await stat(target);
    return true;
  } catch {
    return false;
  }
}

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (entry.name === 'index.html') out.push(full);
  }
  return out;
}

/* Resolve a site-absolute URL to a file inside dist. Directory URLs map to their
   index.html, matching how the host serves them. */
async function resolveLocal(url) {
  const clean = url.split('#')[0].split('?')[0];
  if (!clean.startsWith('/')) return null;
  const rel = clean.replace(/^\//, '');
  const candidate = path.join(DIST, rel);
  if (rel === '' ) return (await exists(path.join(DIST, 'index.html'))) ? 'ok' : 'missing';
  if (await exists(candidate)) {
    const info = await stat(candidate);
    return info.isDirectory() ? ((await exists(path.join(candidate, 'index.html'))) ? 'ok' : 'missing') : 'ok';
  }
  if (!path.extname(clean) && (await exists(path.join(candidate, 'index.html')))) return 'ok';
  return 'missing';
}

const strip = (html) => html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<[^>]+>/g, ' ');

const files = await walk(DIST);
for (const file of files) {
  const html = await readFile(file, 'utf8');
  const route = '/' + path.relative(DIST, file).replace(/\\/g, '/').replace(/index\.html$/, '');

  const title = /<title>([\s\S]*?)<\/title>/i.exec(html)?.[1]?.trim() ?? '';
  const description = /<meta\s+name="description"\s+content="([^"]*)"/i.exec(html)?.[1]?.trim() ?? '';
  const lang = /<html[^>]*\slang="([^"]*)"/i.exec(html)?.[1] ?? '';
  const canonical = /<link[^>]*rel="canonical"[^>]*href="([^"]*)"/i.exec(html)?.[1] ?? '';
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  const words = strip(html).split(/\s+/).filter(Boolean).length;
  const size = Buffer.byteLength(html);

  pages.push({ route, title, description, words, size });

  if (!lang) fail(route, 'html lang', 'missing');

  if (!isToolPage(route)) {
    if (h1s.length !== 1) fail(route, 'single h1', `found ${h1s.length}`);
    if (!title) fail(route, 'title', 'missing');
    else if (title.length > 65) notes.push(`${route}  title is ${title.length} chars`);
    if (!description) fail(route, 'meta description', 'missing');
    else if (description.length < 70 || description.length > 165) {
      notes.push(`${route}  description is ${description.length} chars`);
    }
    if (!canonical) fail(route, 'canonical', 'missing');
    else if (!canonical.startsWith(ORIGIN)) fail(route, 'canonical', canonical);

    // Structured data must parse, and a page carrying none is worth knowing about.
    const blocks = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
    if (blocks.length === 0) fail(route, 'structured data', 'no JSON-LD');
    for (const [, body] of blocks) {
      try {
        JSON.parse(body);
      } catch (error) {
        fail(route, 'structured data', 'JSON-LD does not parse: ' + error.message.slice(0, 60));
      }
    }
  }

  for (const [, attrs] of html.matchAll(/<img\b([^>]*)>/gi)) {
    if (!/\salt="[^"]*"/i.test(attrs)) fail(route, 'img alt', attrs.slice(0, 70));
  }

  for (const [, href] of html.matchAll(/\bhref="([^"]*)"/gi)) {
    if (href.startsWith('/')) {
      const result = await resolveLocal(href);
      if (result === 'missing') fail(route, 'internal link', href);
    } else if (href === '#' || href.startsWith('javascript:')) {
      fail(route, 'dead link', href);
    }
  }

  for (const [, src] of html.matchAll(/\bsrc="([^"]*)"/gi)) {
    if (src.startsWith('/')) {
      const result = await resolveLocal(src);
      if (result === 'missing') fail(route, 'asset', src);
    }
  }
}

/* Duplicate metadata across pages competes in search results. */
const byTitle = new Map();
const byDescription = new Map();
for (const page of pages) {
  byTitle.set(page.title, [...(byTitle.get(page.title) ?? []), page.route]);
  byDescription.set(page.description, [...(byDescription.get(page.description) ?? []), page.route]);
}
for (const [title, routes] of byTitle) {
  if (routes.length > 1) fail(routes.join(' '), 'duplicate title', title.slice(0, 60));
}
for (const [description, routes] of byDescription) {
  if (routes.length > 1) fail(routes.join(' '), 'duplicate description', description.slice(0, 50));
}

/* The sitemap is only useful if every entry resolves. */
const sitemap = await readFile(path.join(DIST, 'sitemap.xml'), 'utf8').catch(() => '');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
for (const url of sitemapUrls) {
  const result = await resolveLocal(url.replace(ORIGIN, ''));
  if (result === 'missing') fail('/sitemap.xml', 'sitemap entry', url);
}
for (const page of pages) {
  if (isToolPage(page.route)) continue;
  const url = ORIGIN + page.route;
  if (!sitemapUrls.includes(url)) fail('/sitemap.xml', 'page not in sitemap', page.route);
}

for (const required of ['robots.txt', 'llms.txt', 'agents.md', 'favicon.svg', 'sitemap.xml']) {
  if (!(await exists(path.join(DIST, required)))) fail('/', 'required file', required);
}

/* ---------------------------------------------------------------- report -- */

const totalBytes = pages.reduce((sum, page) => sum + page.size, 0);
console.log(`pages         ${pages.length}`);
console.log(`html bytes    ${(totalBytes / 1024 / 1024).toFixed(2)} MB`);
console.log(`words range   ${Math.min(...pages.map((p) => p.words))} – ${Math.max(...pages.map((p) => p.words))}`);
console.log(`sitemap urls  ${sitemapUrls.length}`);
console.log('');

if (notes.length) {
  console.log(`worth a look (${notes.length}):`);
  for (const note of notes) console.log('  ' + note);
  console.log('');
}

if (failures.length) {
  const grouped = new Map();
  for (const item of failures) grouped.set(item.check, [...(grouped.get(item.check) ?? []), item]);
  console.log(`FAILURES (${failures.length})`);
  for (const [check, items] of [...grouped.entries()].sort((a, b) => b[1].length - a[1].length)) {
    console.log(`  ${check}: ${items.length}`);
    for (const item of items.slice(0, 6)) console.log(`     ${item.page}  →  ${item.detail}`);
    if (items.length > 6) console.log(`     … ${items.length - 6} more`);
  }
  process.exitCode = 1;
} else {
  console.log('PASS  no structural problems found');
}
