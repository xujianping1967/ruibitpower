/**
 * ESM face for yaml@2.9.1, which resolves to a CommonJS file under the `node`
 * export condition. Same problem and same fix as vendor/picomatch.mjs.
 *
 * The browser build of the same package is already ESM; this wrapper keeps the
 * entry point explicit so the alias in astro.config.mjs reads as one decision
 * rather than two different mechanisms.
 */
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const yaml = require('yaml');

export const parse = yaml.parse;
export const parseAllDocuments = yaml.parseAllDocuments;
export const parseDocument = yaml.parseDocument;
export const stringify = yaml.stringify;
export const Document = yaml.Document;
export default yaml;
