/**
 * ESM face for picomatch, which ships CommonJS only.
 *
 * Astro's content layer imports picomatch while generating collection types.
 * Vite's SSR module runner evaluates that import as ESM, so the CJS file's
 * `require` calls throw "require is not defined" and `astro sync` aborts.
 * Aliasing picomatch to this file keeps the import graph ESM while the actual
 * implementation is still loaded by Node itself, which handles CJS natively.
 *
 * Named exports are listed explicitly because ESM cannot re-export a CJS
 * namespace dynamically; these are the ones picomatch documents.
 */
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const picomatch = require('picomatch');

export default picomatch;
export const scan = picomatch.scan;
export const parse = picomatch.parse;
export const makeRe = picomatch.makeRe;
export const test = picomatch.test;
