/**
 * Copy worker/_worker.js to dist/_worker.js — a single file, not a directory.
 *
 * The dashboard upload only recognises a root-level `_worker.js` file. Shipping
 * `_worker.js/index.js` deployed the site fine but left the worker unregistered:
 * /api/inquiry answered with the custom 404 page while every other route worked,
 * which is easy to misread as "the form endpoint is missing".
 */
import { copyFileSync, existsSync, mkdirSync, rmSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const from = path.join(root, 'worker/_worker.js');
const to = path.join(root, 'dist/_worker.js');

if (!existsSync(from)) {
  console.error('[worker] worker/_worker.js is missing');
  process.exit(1);
}
if (!existsSync(path.join(root, 'dist'))) {
  console.error('[worker] dist/ does not exist — run astro build first');
  process.exit(1);
}

/* A leftover dist/_worker.js directory from an earlier build would shadow the
   file and reproduce the exact failure this script exists to prevent. */
rmSync(to, { recursive: true, force: true });
mkdirSync(path.dirname(to), { recursive: true });
copyFileSync(from, to);

const source = readFileSync(to, 'utf8');
const required = ['export default', 'env.ASSETS.fetch', 'onRequestPost'];
const missing = required.filter((token) => !source.includes(token));
if (missing.length) {
  console.error(`[worker] dist/_worker.js is missing: ${missing.join(', ')}`);
  process.exit(1);
}

console.log(`[worker] dist/_worker.js (${(source.length / 1024).toFixed(1)} KB, single file)`);
