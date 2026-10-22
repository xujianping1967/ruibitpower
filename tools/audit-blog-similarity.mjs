/**
 * Measures how much the blog articles repeat each other.
 *
 * The complaint that started this was "12 posts, 85-91% similar, far too
 * short". The measure here is the Jaccard overlap of five-word shingles between
 * every pair: two articles that share a template and only swap a product name
 * score high, two that genuinely cover different ground score low.
 *
 * Run: node tools/audit-blog-similarity.mjs [dir]
 * `dir` defaults to src/content/blog; pass assets-unused/blog-legacy to see what
 * the replaced set scored.
 */

import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const dir = process.argv[2] ?? 'src/content/blog';
const SHINGLE = 5;

const clean = (value) =>
  value
    .replace(/^---[\s\S]*?---/, '')
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const shingles = (value) => {
  const words = value.split(' ').filter(Boolean);
  const set = new Set();
  for (let i = 0; i + SHINGLE <= words.length; i += 1) {
    set.add(words.slice(i, i + SHINGLE).join(' '));
  }
  return set;
};

const jaccard = (a, b) => {
  let shared = 0;
  for (const item of a) if (b.has(item)) shared += 1;
  return shared / (a.size + b.size - shared || 1);
};

const files = (await readdir(dir)).filter((name) => name.endsWith('.md')).sort();
if (files.length === 0) {
  console.log(`no posts in ${dir}`);
  process.exit(0);
}

const posts = [];
for (const name of files) {
  const raw = await readFile(path.join(dir, name), 'utf8');
  const title = /^title:\s*"?(.*?)"?$/m.exec(raw)?.[1] ?? name;
  const excerpt = /^excerpt:\s*"?(.*?)"?$/m.exec(raw)?.[1] ?? '';
  const published = /^publishDate:\s*"?(.*?)"?$/m.exec(raw)?.[1] ?? '';
  const updated = /^updatedDate:\s*"?(.*?)"?$/m.exec(raw)?.[1] ?? '';
  const text = clean(raw);
  posts.push({
    name,
    title,
    excerpt,
    published,
    updated,
    words: text.split(' ').filter(Boolean).length,
    set: shingles(text),
  });
}

posts.sort((a, b) => b.words - a.words);

console.log(`${dir} — ${posts.length} posts`);
console.log('');
console.log('words  title');
console.log('-'.repeat(78));
for (const post of posts) {
  console.log(`${String(post.words).padStart(5)}  ${post.title.slice(0, 68)}`);
}

const total = posts.reduce((sum, post) => sum + post.words, 0);
const shortest = posts[posts.length - 1];
console.log('');
console.log(`total words ${total}   average ${Math.round(total / posts.length)}   shortest ${shortest.words}`);

let worst = { score: -1 };
let sum = 0;
let pairs = 0;
for (let i = 0; i < posts.length; i += 1) {
  for (let j = i + 1; j < posts.length; j += 1) {
    const score = jaccard(posts[i].set, posts[j].set);
    sum += score;
    pairs += 1;
    if (score > worst.score) worst = { score, a: posts[i].title, b: posts[j].title };
  }
}
console.log(`pairwise 5-gram overlap: average ${(sum / pairs * 100).toFixed(1)}%   worst ${(worst.score * 100).toFixed(1)}%`);
console.log(`  worst pair: ${worst.a}`);
console.log(`              ${worst.b}`);

/* The excerpt is what appears on the card and in the meta description. Three of
   them were once cut at the character limit and stopped mid-sentence, which reads
   as a rendering fault, so the ending is checked rather than assumed. */
const broken = posts.filter((post) => !/[.?!]["')\]]?$/.test(post.excerpt.trim()));
const lengths = posts.map((post) => post.excerpt.length);
console.log('');
console.log(`excerpt length: ${Math.min(...lengths)}-${Math.max(...lengths)} chars`);
if (broken.length) {
  console.log(`FAIL  ${broken.length} excerpt(s) do not end at a sentence boundary:`);
  for (const post of broken) console.log(`   ${post.name}: …${post.excerpt.slice(-48)}`);
  process.exitCode = 1;
} else {
  console.log('PASS  every excerpt ends at a sentence boundary');
}

/* datePublished and dateModified used to be filled from the same value, so every
   article claimed both on the same instant — the signature of a templated blog.
   A post that was never revised must simply carry no updatedDate. */
const sameDay = posts.filter((post) => post.updated && post.updated === post.published);
const revised = posts.filter((post) => post.updated).length;
console.log('');
console.log(`dates: ${revised}/${posts.length} posts carry a real revision date, ${posts.length - revised} were never revised`);
if (sameDay.length) {
  console.log(`FAIL  ${sameDay.length} post(s) set updatedDate equal to publishDate:`);
  for (const post of sameDay) console.log(`   ${post.name}: ${post.published}`);
  process.exitCode = 1;
} else {
  console.log('PASS  no post claims an update on its own publication instant');
}
