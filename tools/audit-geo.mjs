/**
 * GEO / SEO conformance audit of the built output.
 *
 * Assesses the site against the things that decide whether a page can be
 * crawled, indexed, and *cited* by an answer engine: machine-readable identity,
 * structured data, extractable prose, entity reconciliation, and the two
 * llms-facing files.
 *
 * It prints a scorecard of PASS / PARTIAL / GAP per criterion plus the numbers
 * behind each verdict, so a verdict can be argued with.
 *
 * Run: node tools/audit-geo.mjs
 */

import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const DIST = 'dist';
const ORIGIN = 'https://ruibitpower.com';

const rows = [];
const record = (id, criterion, verdict, evidence) => rows.push({ id, criterion, verdict, evidence });
const pct = (part, whole) => `${part}/${whole} (${Math.round((part / whole) * 100)}%)`;

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function walk(dir, out = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, out);
    else if (entry.name === 'index.html') out.push(full);
  }
  return out;
}

const strip = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ');
const words = (html) => strip(html).split(/\s+/).filter(Boolean).length;

function typesIn(html) {
  const found = new Set();
  let invalid = 0;
  for (const match of html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    let data;
    try {
      data = JSON.parse(match[1]);
    } catch {
      invalid += 1;
      continue;
    }
    const stack = [data];
    while (stack.length) {
      const node = stack.pop();
      if (!node || typeof node !== 'object') continue;
      if (Array.isArray(node)) {
        stack.push(...node);
        continue;
      }
      if (node['@type']) {
        (Array.isArray(node['@type']) ? node['@type'] : [node['@type']]).forEach((t) => found.add(t));
      }
      for (const value of Object.values(node)) if (value && typeof value === 'object') stack.push(value);
    }
  }
  return { types: found, invalid };
}

/* ------------------------------------------------------------------ gather -- */

const files = await walk(DIST);
const pages = [];
for (const file of files) {
  const html = await readFile(file, 'utf8');
  const route = '/' + path.relative(DIST, file).split(path.sep).join('/').replace(/index\.html$/, '');
  const { types, invalid } = typesIn(html);
  pages.push({
    route,
    html,
    types,
    invalid,
    wordCount: words(html),
    title: /<title>([\s\S]*?)<\/title>/i.exec(html)?.[1]?.trim() ?? '',
    description: /<meta\s+name="description"\s+content="([^"]*)"/i.exec(html)?.[1]?.trim() ?? '',
    canonical: /<link[^>]*rel="canonical"[^>]*href="([^"]*)"/i.exec(html)?.[1] ?? '',
    ogImage: /property="og:image"/.test(html),
    twitter: /name="twitter:card"/.test(html),
    lang: /<html[^>]*\slang="([^"]*)"/i.exec(html)?.[1] ?? '',
    internalLinks: [...html.matchAll(/\bhref="(\/[^"#?]*)"/g)].map((m) => m[1]),
    imgs: [...html.matchAll(/<img\b([^>]*)>/gi)].map((m) => m[1]),
    sameAs: /"sameAs":\s*\[[^\]]*"[^"\]]+"/.test(html),
    hasAuthor: /"author"\s*:/.test(html),
    hasOffers: /"offers"\s*:/.test(html),
    hasRating: /"aggregateRating"\s*:/.test(html),
    hasSku: /"sku"\s*:/.test(html),
    hasDatePublished: /"datePublished"\s*:/.test(html),
    hasDateModified: /"dateModified"\s*:/.test(html),
  });
}

const content = pages.filter((p) => !p.route.startsWith('/admin'));
/* BlogPosting is the precise schema.org subtype for an article page, and it is
   what these pages emit. Matching only "Article" made the article count wrong. */
const ARTICLE_TYPES = ['Article', 'BlogPosting', 'NewsArticle', 'TechArticle'];
const isArticle = (page) => ARTICLE_TYPES.some((type) => page.types.has(type));
const articles = content.filter(isArticle);
const products = content.filter((p) => p.types.has('Product'));
const total = content.length;

/* ---------------------------------------------------------------- criteria -- */

// 1. Crawl access for AI agents.
const robots = await readFile(path.join(DIST, 'robots.txt'), 'utf8').catch(() => '');
const aiBots = ['GPTBot', 'OAI-SearchBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'CCBot'];
const allowed = aiBots.filter((bot) => new RegExp(`User-agent:\\s*${bot}\\s*\\nAllow:\\s*/`, 'i').test(robots));
record('1', 'AI crawlers allowed in robots.txt', allowed.length === aiBots.length ? 'PASS' : 'PARTIAL',
  `${allowed.length}/${aiBots.length} named agents explicitly allowed; sitemap declared: ${/^Sitemap:/im.test(robots)}`);

// 2. Sitemap.
const sitemap = await readFile(path.join(DIST, 'sitemap.xml'), 'utf8').catch(() => '');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
record('2', 'Sitemap', sitemapUrls.length >= total ? 'PASS' : 'PARTIAL', `${sitemapUrls.length} URLs for ${total} content pages`);

// 3. Machine-readable site brief.
for (const [id, file, label] of [['3', 'llms.txt', 'llms.txt (generative-engine brief)'], ['4', 'agents.md', 'agents.md (agent instructions)']]) {
  const text = await readFile(path.join(DIST, file), 'utf8').catch(() => '');
  record(id, label, text.length > 500 ? 'PASS' : text ? 'PARTIAL' : 'GAP', `${text.length} bytes`);
}

// 5. Canonical + unique metadata.
record('5', 'Canonical on every page', content.filter((p) => p.canonical.startsWith(ORIGIN)).length === total ? 'PASS' : 'PARTIAL',
  pct(content.filter((p) => p.canonical.startsWith(ORIGIN)).length, total));
const titles = new Set(content.map((p) => p.title));
const descriptions = new Set(content.map((p) => p.description));
record('6', 'Unique title and description', titles.size === total && descriptions.size === total ? 'PASS' : 'PARTIAL',
  `${titles.size} distinct titles, ${descriptions.size} distinct descriptions for ${total} pages`);

// 7. Social / preview cards.
record('7', 'Open Graph image + Twitter card', content.filter((p) => p.ogImage).length === total ? 'PASS' : 'PARTIAL',
  `og:image ${pct(content.filter((p) => p.ogImage).length, total)}, twitter:card ${pct(content.filter((p) => p.twitter).length, total)}`);

// 8. Language declaration.
record('8', 'html lang declared', content.every((p) => p.lang) ? 'PASS' : 'PARTIAL', content[0]?.lang ?? 'none');

// 9. Identity graph.
const org = content.filter((p) => p.types.has('Organization')).length;
const website = content.filter((p) => p.types.has('WebSite')).length;
record('9', 'Organization + WebSite entity', org === total && website === total ? 'PASS' : 'PARTIAL',
  `Organization ${pct(org, total)}, WebSite ${pct(website, total)}`);

// 10. Breadcrumbs.
const crumbs = content.filter((p) => p.types.has('BreadcrumbList')).length;
record('10', 'BreadcrumbList', crumbs === total ? 'PASS' : 'PARTIAL',
  `${pct(crumbs, total)}; missing on ${content.filter((p) => !p.types.has('BreadcrumbList')).map((p) => p.route).join(', ') || 'none'}`);

// 11. Article markup completeness.
const artDates = articles.filter((p) => p.hasDatePublished).length;
const artModified = articles.filter((p) => p.hasDateModified).length;
const artAuthor = articles.filter((p) => p.hasAuthor).length;
record('11', 'Article markup (dates + author)', artDates === articles.length && artAuthor === articles.length ? 'PASS' : 'PARTIAL',
  `${articles.length} articles; datePublished ${artDates}, dateModified ${artModified} (only where a real revision exists), author ${artAuthor}`);

// 12. Product markup completeness.
record('12', 'Product markup (sku / offers)', products.length
  ? (products.every((p) => p.hasSku) ? 'PARTIAL' : 'GAP')
  : 'n/a',
  `${products.length} products; sku ${products.filter((p) => p.hasSku).length}, offers ${products.filter((p) => p.hasOffers).length}, aggregateRating ${products.filter((p) => p.hasRating).length} (no published prices — RFQ model)`);

// 13. FAQ markup.
const faq = content.filter((p) => p.types.has('FAQPage')).length;
record('13', 'FAQPage for extractable answers', faq > 0 ? 'PASS' : 'GAP', `${faq} pages`);

// 14. Structured data validity.
const invalid = content.reduce((sum, p) => sum + p.invalid, 0);
record('14', 'Structured data parses', invalid === 0 ? 'PASS' : 'GAP', `${invalid} invalid JSON-LD blocks`);

// 15. Server-rendered prose (no JS needed to read the page).
const rendered = content.filter((p) => p.wordCount > 50).length;
record('15', 'Content present in HTML (no JS required)', rendered === total ? 'PASS' : 'PARTIAL', pct(rendered, total));

// 16. Thin content.
const thin = content.filter((p) => p.wordCount < 300 && !p.route.startsWith('/admin'));
record('16', 'No thin content (<300 words)', thin.length === 0 ? 'PASS' : 'PARTIAL',
  `${thin.length} pages under 300 words: ${thin.map((p) => p.route).join(', ') || 'none'}`);

// 17. Internal linking.
const linkCounts = content.map((p) => new Set(p.internalLinks).size);
const avgLinks = Math.round(linkCounts.reduce((a, b) => a + b, 0) / linkCounts.length);
record('17', 'Internal linking depth', avgLinks >= 20 ? 'PASS' : avgLinks >= 10 ? 'PARTIAL' : 'GAP',
  `median ${linkCounts.sort((a, b) => a - b)[Math.floor(linkCounts.length / 2)]} unique internal links per page`);

// 18. Image alt coverage.
const allImgs = content.flatMap((p) => p.imgs);
const withAlt = allImgs.filter((a) => /\salt="[^"]+"/i.test(a)).length;
const emptyAlt = allImgs.filter((a) => /\salt=""/i.test(a)).length;
record('18', 'Image alt text', withAlt / allImgs.length >= 0.5 ? 'PARTIAL' : 'GAP',
  `${withAlt} descriptive alt, ${emptyAlt} deliberately empty (decorative), ${allImgs.length} total`);

// 19. Entity reconciliation.
const sameAs = content.filter((p) => p.sameAs).length;
record('19', 'sameAs entity links', sameAs === 0 ? 'GAP' : 'PASS', `${sameAs} pages carry a non-empty sameAs`);

// 20. Multilingual.
const hreflang = content.filter((p) => /rel="alternate"/.test(p.html)).length;
record('20', 'hreflang', hreflang === 0 ? 'n/a' : 'PASS', 'single-language site (English)');

/* ------------------------------------------------------------------ report -- */

const width = Math.max(...rows.map((r) => r.criterion.length));
console.log(`${'#'.padEnd(3)} ${'criterion'.padEnd(width)}  verdict  evidence`);
console.log('-'.repeat(3 + width + 10 + 60));
for (const row of rows) {
  console.log(`${row.id.padEnd(3)} ${row.criterion.padEnd(width)}  ${row.verdict.padEnd(7)}  ${row.evidence}`);
}

const tally = rows.reduce((acc, r) => ({ ...acc, [r.verdict]: (acc[r.verdict] ?? 0) + 1 }), {});
console.log('');
console.log('tally', JSON.stringify(tally));
console.log(`content pages ${total} · articles ${articles.length} · products ${products.length} · words ${Math.min(...content.map((p) => p.wordCount))}-${Math.max(...content.map((p) => p.wordCount))}`);
