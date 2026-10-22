#!/usr/bin/env node
/**
 * Start the local editing environment: content backup, Astro dev server, and the
 * Decap local proxy.
 *
 * Decap's local backend talks to `decap-server` over 127.0.0.1:8081 and saves
 * directly into the repository — no git, no OAuth, no hosted backend. The CMS is
 * served by the Astro dev server at /admin/, so a save is picked up by the same
 * hot reload that renders the preview.
 *
 * Two processes, one Ctrl-C: if either dies the other is stopped, otherwise a
 * stale dev server keeps port 4321 and the next start fails with EADDRINUSE.
 */
import { spawn } from 'node:child_process';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const isWindows = process.platform === 'win32';

const children = [];
let shuttingDown = false;

function run(label, command, args, extraEnv = {}) {
  const child = spawn(command, args, {
    cwd: root,
    stdio: 'inherit',
    shell: isWindows,
    env: { ...process.env, FORCE_COLOR: '1', ...extraEnv },
  });
  children.push(child);
  child.on('exit', (code) => {
    if (shuttingDown) return;
    console.log(`\n[admin] ${label} exited (${code}); stopping the rest.`);
    shutdown(code ?? 1);
  });
  return child;
}

function shutdown(code) {
  if (shuttingDown) return;
  shuttingDown = true;
  for (const child of children) {
    if (child.exitCode === null) child.kill();
  }
  setTimeout(() => process.exit(code), 300);
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

console.log('[admin] backing up content first...');
const backup = spawn(process.execPath, [path.join(root, 'tools/backup-content.mjs')], {
  cwd: root,
  stdio: 'inherit',
});

backup.on('exit', (code) => {
  if (code !== 0) {
    console.error('[admin] backup failed; refusing to start without a restore point.');
    process.exit(code ?? 1);
  }

  console.log('\n[admin] starting decap-server and astro dev...\n');
  /* BIND_HOST keeps the proxy on loopback. decap-server defaults to 0.0.0.0,
     which exposes write access to this project to anything on the local network
     — the CMS needs no credentials in local mode. */
  run('decap-server', 'npx', ['decap-server'], { BIND_HOST: '127.0.0.1' });
  run('astro dev', 'npx', ['astro', 'dev', '--host', '127.0.0.1', '--port', '4321']);

  setTimeout(() => {
    console.log('\n----------------------------------------------------------');
    console.log('  Editor    http://localhost:4321/admin/index.html');
    console.log('  Preview   http://localhost:4321/');
    console.log('  Saves go straight into src/ and public/assets/uploads/.');
    console.log('  Ctrl-C stops both processes.');
    console.log('----------------------------------------------------------\n');
  }, 3000);
});
