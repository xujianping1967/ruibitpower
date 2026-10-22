#!/usr/bin/env node
/**
 * Run a Python script with whichever interpreter this machine actually has.
 *
 * Windows normally exposes `python` (and the `py` launcher, which some installs
 * have instead), while most Linux images expose `python3` only and may not have
 * a bare `python` at all. Hard-coding either name made `npm run verify` fail on
 * the other platform, so the lookup is done at runtime.
 *
 * Usage: node tools/run-python.mjs tools/audit-redirects.py [args...]
 */
import { spawnSync } from 'node:child_process';

const [, , script, ...rest] = process.argv;

if (!script) {
  console.error('usage: node tools/run-python.mjs <script.py> [...args]');
  process.exit(2);
}

const candidates = process.platform === 'win32'
  ? ['python', 'python3', 'py']
  : ['python3', 'python'];

const works = (cmd) => {
  const probe = spawnSync(cmd, ['--version'], { stdio: 'ignore' });
  return !probe.error && probe.status === 0;
};

const interpreter = candidates.find((cmd) => {
  try {
    return works(cmd);
  } catch {
    return false;
  }
});

if (!interpreter) {
  console.error(
    `No Python interpreter found. Tried: ${candidates.join(', ')}. ` +
      'Install Python 3 and re-run, or run the script directly.',
  );
  process.exit(127);
}

const result = spawnSync(interpreter, [script, ...rest], { stdio: 'inherit' });

if (result.error) {
  console.error(`Failed to start ${interpreter}: ${result.error.message}`);
  process.exit(1);
}

process.exit(result.status ?? 1);
