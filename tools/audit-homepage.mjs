/**
 * Whole-homepage audit of the built output:
 *   1. section map with weight (words / images) and background tone
 *   2. internal link integrity across all built pages
 *   3. CSS coverage: classes used on the homepage vs classes defined in the CSS
 *   4. component usage across templates
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const html = readFileSync(path.join(dist, 'index.html'), 'utf8');

/* Strip script and style bodies first — inline JavaScript is not visible copy
   and would otherwise be counted as page text (it inflated the certificate
   section from ~170 to 308 "words"). */
const stripInvisible = (s) =>
  s.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ');
const words = (s) =>
  (stripInvisible(s).replace(/<[^>]+>/g, ' ').match(/[A-Za-z0-9][A-Za-z0-9''.,%/+-]*/g) || []).length;

/* ---------- 1. section map ---------- */
const main = (html.match(/<main[^>]*>([\s\S]*?)<\/main>/) || [])[1] ?? '';
const parts = main.split(/(?=<section)/).filter((p) => p.trim().startsWith('<section'));

console.log('=== 1. homepage section map ===');
console.log('idx  heading                                   tone        words  imgs  grid');
console.log('-'.repeat(100));
let totalW = 0;
let totalI = 0;
parts.forEach((p, i) => {
  const cls = (p.match(/<section[^>]*class="([^"]*)"/) || [])[1] ?? '';
  const h = p.match(/<h([12])[^>]*>(.*?)<\/h\1>/) || [];
  const title = h[2] ? h[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : '(none)';
  const w = words(p);
  const imgs = (p.match(/<img\b/g) || []).length;
  const tone = /section-dark/.test(cls) ? 'DARK' : /section-soft/.test(cls) ? 'soft' : 'white';
  const grids = [...p.matchAll(/class="([a-z0-9-]*grid[a-z0-9-]*)"/g)].map((m) => m[1]);
  totalW += w;
  totalI += imgs;
  console.log(
    `${String(i + 1).padStart(3)}  ${title.slice(0, 39).padEnd(41)} ${tone.padEnd(11)} ${String(w).padStart(5)} ${String(imgs).padStart(5)}  ${[...new Set(grids)].join(' ') || '-'}`
  );
});
console.log('-'.repeat(100));
console.log(`TOTAL words ${totalW}  images ${totalI}  sections ${parts.length}`);

const dark = parts.filter((p) => /section-dark/.test((p.match(/<section[^>]*class="([^"]*)"/) || [])[1] ?? '')).length;
console.log(`dark sections: ${dark} of ${parts.length}  (a dark tone roughly every ${(parts.length / Math.max(dark, 1)).toFixed(1)} sections)`);

/* ---------- 2. internal link integrity ---------- */
console.log('\n=== 2. internal link integrity (all built pages) ===');
const pages = [];
const walk = (dir, rel = '') => {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const r = rel ? `${rel}/${e.name}` : e.name;
    if (e.isDirectory()) walk(path.join(dir, e.name), r);
    else if (e.name.endsWith('.html')) pages.push({ file: path.join(dir, e.name), rel: r });
  }
};
walk(dist);

const badLinks = new Set();
let linkCount = 0;
for (const page of pages) {
  if (page.rel.startsWith('admin/')) continue;
  const body = readFileSync(page.file, 'utf8');
  const depth = page.rel.split('/').length - 1;
  const base = '../'.repeat(depth);
  for (const m of body.matchAll(/href="(\/(?!\/)[^"#?]*)"/g)) {
    linkCount++;
    let target = m[1];
    if (target.endsWith('/')) target += 'index.html';
    const resolved = path.join(dist, target);
    if (!existsSync(resolved)) badLinks.add(`${m[1]}  (from ${page.rel})`);
  }
}
console.log(`internal links checked: ${linkCount}`);
console.log(badLinks.size ? `BROKEN (${badLinks.size}):\n  ${[...badLinks].slice(0, 15).join('\n  ')}` : 'no broken internal links');

/* ---------- 3. CSS coverage on the homepage ---------- */
console.log('\n=== 3. CSS coverage (homepage) ===');
const cssFiles = ['styles.css', 'cms.css', 'site.css'].map((f) =>
  readFileSync(path.join(dist, 'assets', 'css', f), 'utf8')
);
const defined = new Set();
for (const css of cssFiles) {
  for (const m of css.matchAll(/\.(-?[A-Za-z_][\w-]*)/g)) defined.add(m[1]);
}
const used = new Set();
for (const m of html.matchAll(/class="([^"]+)"/g)) m[1].split(/\s+/).filter(Boolean).forEach((c) => used.add(c));
const undefinedClasses = [...used].filter((c) => !defined.has(c));
console.log(`classes used on homepage: ${used.size}`);
console.log(`used but not defined in any CSS: ${undefinedClasses.length}${undefinedClasses.length ? ' -> ' + undefinedClasses.join(', ') : ''}`);

/* Dead CSS: site.css classes that no page uses at all. */
const allPagesHtml = pages.map((p) => readFileSync(p.file, 'utf8')).join('\n');
const allUsed = new Set();
for (const m of allPagesHtml.matchAll(/class="([^"]+)"/g)) m[1].split(/\s+/).filter(Boolean).forEach((c) => allUsed.add(c));
const siteCss = cssFiles[2];
const siteClasses = [...new Set([...siteCss.matchAll(/\.(-?[A-Za-z_][\w-]*)/g)].map((m) => m[1]))];
const dead = siteClasses.filter((c) => !allUsed.has(c) && !/^(is-|has-|no-)/.test(c));
console.log(`\nsite.css classes defined: ${siteClasses.length}`);
console.log(`never used on any built page: ${dead.length}${dead.length ? ' -> ' + dead.join(', ') : ''}`);

/* ---------- 4. component usage ---------- */
console.log('\n=== 4. component usage ===');
const compDir = path.join(root, 'src', 'components');
const srcFiles = [];
const walkSrc = (dir, rel = '') => {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const r = rel ? `${rel}/${e.name}` : e.name;
    if (e.isDirectory()) walkSrc(path.join(dir, e.name), r);
    else if (/\.(astro|ts|js)$/.test(e.name)) srcFiles.push({ f: path.join(dir, e.name), r });
  }
};
walkSrc(path.join(root, 'src'));
for (const c of readdirSync(compDir)) {
  const name = c.replace('.astro', '');
  const importers = srcFiles.filter((s) => s.r !== `components/${c}` && new RegExp(`\\b${name}\\b`).test(readFileSync(s.f, 'utf8')));
  console.log(`  ${name.padEnd(22)} used by: ${importers.length ? importers.map((i) => i.r).join(', ') : '*** UNUSED ***'}`);
}

/* ---------- 5. image payload ---------- */
console.log('\n=== 5. homepage image payload ===');
const srcs = [...new Set([...html.matchAll(/<img[^>]*src="(\/assets\/images[^"]+)"/g)].map((m) => m[1]))];
let bytes = 0;
for (const s of srcs) {
  const p = path.join(dist, s.replace(/^\//, ''));
  if (existsSync(p)) {
    const kb = Math.round(statSync(p).size / 1024);
    bytes += statSync(p).size;
    console.log(`  ${String(kb).padStart(5)} KB  ${s}`);
  }
}
console.log(`  ${String(Math.round(bytes / 1024)).padStart(5)} KB  TOTAL (${srcs.length} images)`);
