/**
 * Splits the built homepage into its sections and measures, per section:
 * heading, heading level, visible word count, image count, and the largest
 * image's dimensions. Used to judge whether the page is trust-STRUCTURED and
 * where its visual weight actually sits.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const html = readFileSync(path.join(root, 'dist', 'index.html'), 'utf8');

/* No inline (?s) flags — that is PCRE syntax. Use [\s\S] for cross-line matches. */
const main = (html.match(/<main[^>]*>([\s\S]*?)<\/main>/) || [])[1] ?? '';
const parts = main.split(/(?=<section)/).filter((p) => p.trim().startsWith('<section'));

const words = (s) =>
  (s.replace(/<[^>]+>/g, ' ').match(/[A-Za-z0-9][A-Za-z0-9''.,%/+-]*/g) || []).length;

console.log('idx  heading                                        lvl  words  imgs  section classes');
console.log('-'.repeat(108));

const rows = [];
let totalWords = 0;
let totalImgs = 0;

parts.forEach((part, i) => {
  const cls = (part.match(/<section[^>]*class="([^"]*)"/) || [])[1] ?? '';
  const heading = (part.match(/<h([12])[^>]*>(.*?)<\/h\1>/) || []);
  const text = heading[2] ? heading[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : '(no h1/h2)';
  const lvl = heading[1] ?? '-';
  const w = words(part);
  const imgs = (part.match(/<img\b/g) || []).length;
  totalWords += w;
  totalImgs += imgs;
  rows.push({ i: i + 1, heading: text, lvl, w, imgs, cls });
  console.log(
    `${String(i + 1).padStart(3)}  ${text.slice(0, 46).padEnd(48)} ${String(lvl).padEnd(4)} ${String(w).padStart(5)} ${String(imgs).padStart(5)}  ${cls}`
  );
});

console.log('-'.repeat(108));
console.log(`TOTAL visible words: ${totalWords}   images: ${totalImgs}`);

/* Where does the visual weight sit? Largest image in each section. */
console.log('\nlargest declared image per section (width attr):');
for (const r of rows) {
  const part = parts[r.i - 1];
  const widths = [...part.matchAll(/<img[^>]*width="(\d+)"/g)].map((m) => Number(m[1]));
  const max = widths.length ? Math.max(...widths) : 0;
  if (max) console.log(`  ${String(r.i).padStart(2)}. ${r.heading.slice(0, 44).padEnd(46)} max ${max}px`);
}

/* Trust-evidence presence check against the built page. */
console.log('\n=== trust-evidence signals present on the homepage ===');
const checks = [
  ['registered street address', /Yishang Avenue|Street|Road|No\.\s*\d+/i],
  ['named sales contact', /Sales Manager|Account Manager|Mr\.|Ms\.|Isabella|director/i],
  ['certificate scans (images)', /certificate[^"]*\.(png|jpg|webp)/i],
  ['certificate text badges', /cert-badge/],
  ['real project photographs', /abuja\.jpg|projects\//],
  ['client quote / testimonial', /testimonial|"[^"]{40,}"\s*—/i],
  ['client or partner logo wall', /logo-wall|client-logo|trusted-by/i],
  ['third-party award / press', /award|TÜV|CES\b|featured in/i],
  ['warranty term stated', /warranty/i],
  ['MOQ stated', /MOQ|minimum order/i],
  ['lead time stated', /lead time/i],
  ['incoterms stated', /Incoterms|FOB|CIF|DDP/i],
  ['response-time promise', /24 working hours/i],
  ['lifecycle traceability claim', /traceability/i],
  ['cycle-life figure', /8,?000\+? cycle|6000 cycles|6,?000 cycles/i],
  ['capacity figure', /2GWh|261\s*kWh|125\s*kW/i],
  ['attribution to manufacturer', /manufacturing partner|Dawnice/i],
  ['explicit non-claim disclaimer', /not published|on request|confirmed in the quotation/i],
];
for (const [label, re] of checks) {
  console.log(`  ${re.test(html) ? 'YES' : ' no'}  ${label}`);
}
