/* Make the content-types step deterministic before `astro build` runs it.

   Astro generates collection types by starting a Vite module runner that has no
   `require`. On a cold optimiser cache, CommonJS dependencies reached from that
   graph (yaml, picomatch) are evaluated as ESM and throw
   "require is not defined". `vite.ssr.noExternal: true` in astro.config.mjs
   reduces but does not remove the problem: measured on Windows with Node 22 and
   Vite 8, a cold run still fails and the next run — with the cache now warm —
   succeeds reliably.

   So the warm-up is allowed to fail and its result is ignored; the second run is
   the one that counts. If that also fails, both caches are dropped and one more
   attempt is made before giving up loudly.

   Wired up as the `prebuild` npm script so `npm run build` and CI behave the
   same. Do not call `astro build` directly to skip it. */
import { spawnSync } from 'node:child_process';
import { rmSync } from 'node:fs';
import path from 'node:path';

const site = path.resolve(import.meta.dirname, '..');
const astroBin = path.join(site, 'node_modules', 'astro', 'bin', 'astro.mjs');

const runSync = () =>
  spawnSync(process.execPath, [astroBin, 'sync'], { cwd: site, stdio: 'inherit' });

// Warm-up: expected to fail on a cold cache. Its status is deliberately ignored.
runSync();

let result = runSync();

if (result.status !== 0) {
  for (const dir of ['node_modules/.vite', '.astro']) {
    rmSync(path.join(site, dir), { recursive: true, force: true });
  }
  runSync(); // re-warm after the clear
  result = runSync();
}

if (result.status !== 0) {
  console.error('[prebuild] astro sync still failing after a warm-up and a cache clear.');
  process.exit(result.status ?? 1);
}
