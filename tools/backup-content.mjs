#!/usr/bin/env node
/**
 * Snapshot everything the CMS can write, before the CMS starts.
 *
 * The local backend saves straight to the working tree with no drafts and no
 * undo, so a wrong bulk edit is immediately live in the source. This copy is the
 * only way back. PDFs are excluded on purpose: they are vendor documents that
 * the CMS does not edit, and copying 28 MB on every start would make the backup
 * slow enough that people would skip it.
 */
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const backupRoot = path.join(root, '..', '_backup');
const KEEP = 10;

const stamp = new Date()
  .toISOString()
  .replace(/[-:]/g, '')
  .replace(/\..+/, '')
  .replace('T', '-');

const dest = path.join(backupRoot, `content-${stamp}`);
mkdirSync(dest, { recursive: true });

const SOURCES = ['src/content', 'src/data', 'public/assets/uploads'];

let copied = 0;
for (const rel of SOURCES) {
  const from = path.join(root, rel);
  if (!existsSync(from)) continue;
  cpSync(from, path.join(dest, rel), { recursive: true });
  copied += countFiles(from);
}

function countFiles(dir) {
  let n = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    n += entry.isDirectory() ? countFiles(path.join(dir, entry.name)) : 1;
  }
  return n;
}

/* Prune old snapshots so the folder does not grow without bound. */
const snapshots = readdirSync(backupRoot)
  .filter((name) => name.startsWith('content-'))
  .sort();
for (const name of snapshots.slice(0, Math.max(0, snapshots.length - KEEP))) {
  rmSync(path.join(backupRoot, name), { recursive: true, force: true });
}

function totalBytes(dir) {
  let sum = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    sum += entry.isDirectory() ? totalBytes(p) : statSync(p).size;
  }
  return sum;
}

const size = (totalBytes(dest) / 1048576).toFixed(1);

console.log(`[backup] ${copied} files, ${size} MB -> ${dest}`);
console.log(`[backup] keeping the newest ${KEEP} snapshots`);
