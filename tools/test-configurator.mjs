/**
 * Deterministic harness for public/assets/js/configurator.js.
 *
 * The widget builds its result with DOM nodes rather than an HTML string, so
 * the stub implements the handful of node APIs it uses instead of faking an
 * innerHTML string. That also lets the last case assert the thing that made
 * the string version unsafe: a typed country must never become an element.
 */
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const listeners = {};

class El {
  constructor(tag) {
    this.tagName = tag;
    this.children = [];
    this.attrs = {};
    this.className = '';
    this.hidden = false;
    this._text = '';
  }
  set textContent(value) {
    this._text = value == null ? '' : String(value);
    this.children.length = 0;
  }
  get textContent() {
    return this._text + this.children.map((child) => child.textContent).join('');
  }
  setAttribute(name, value) {
    this.attrs[name] = String(value);
  }
  append(...nodes) {
    this.children.push(...nodes);
  }
  scrollIntoView() {}
  *walk() {
    for (const child of this.children) {
      yield child;
      yield* child.walk();
    }
  }
  find(className) {
    for (const node of this.walk()) if (node.className === className) return node;
    return null;
  }
  countTag(tagName) {
    let total = 0;
    for (const node of this.walk()) if (node.tagName === tagName) total += 1;
    return total;
  }
}

const form = { addEventListener: (type, fn) => (listeners[type] ||= []).push(fn) };
const result = new El('div');
result.hidden = true;

let current = {};
globalThis.FormData = class {
  get(key) {
    return key in current ? current[key] : null;
  }
};
globalThis.document = {
  createElement: (tag) => new El(tag),
  querySelector: (selector) =>
    selector === '[data-configurator]' ? form : selector === '[data-configurator-result]' ? result : null,
};

await import(pathToFileURL(path.join(root, 'public/assets/js/configurator.js')).href);

const fire = (type) => (listeners[type] || []).forEach((fn) => fn());

const run = (values) => {
  current = values;
  fire('input');
  const titleNode = result.find('cfg-title');
  const quote = result.find('button primary');
  const specs = result.find('button secondary');
  const href = quote?.attrs.href ?? null;
  return {
    title: titleNode?.textContent ?? null,
    href,
    recommended: href ? new URLSearchParams(href.split('?')[1]).get('recommended') : null,
    specLink: specs?.attrs.href ?? null,
    unitNote: Boolean(result.find('cfg-unit')),
    summary: result.find('cfg-summary')?.textContent ?? '',
    hidden: result.hidden,
  };
};

const cases = [
  ['residential 10 kWh', { application: 'residential', energy: 10 }, 'PowerFly wall-mounted / ground-mounted series'],
  ['residential 30 kWh', { application: 'residential', energy: 30 }, 'Six Ultra BS06-S high-voltage stackable'],
  ['residential 100 kWh', { application: 'residential', energy: 100 }, 'BS09 112 kWh outdoor ESS (DC-coupled)'],
  ['commercial 100 kWh', { application: 'commercial', energy: 100 }, 'BS09 112 kWh outdoor ESS (DC-coupled)'],
  ['commercial 125kW/261kWh', { application: 'commercial', power: 125, energy: 261 }, 'Honey 125 kW / 261 kWh all-in-one ESS'],
  ['commercial 400 kWh', { application: 'commercial', energy: 400 }, 'BS09 225 kWh DC ESS'],
  ['commercial 800 kWh', { application: 'commercial', energy: 800 }, 'Containerized BESS'],
  ['industrial 500 kWh', { application: 'industrial', energy: 500 }, 'Containerized BESS'],
  ['pvhybrid', { application: 'pvhybrid', energy: 261 }, 'Sunflower 125 kW / 261 kWh PV hybrid ESS'],
  ['ev charging', { application: 'ev', energy: 200 }, 'Honey 125 kW / 261 kWh all-in-one ESS'],
  ['containerized', { application: 'containerized' }, 'Containerized BESS'],
  ['commercial, power only 200 kW', { application: 'commercial', power: 200 }, 'Honey outdoor cabinet ESS'],
  ['commercial, no sizing', { application: 'commercial' }, 'Honey 125 kW / 261 kWh all-in-one ESS'],
];

let failures = 0;

for (const [label, input, expected] of cases) {
  const out = run(input);
  const ok = out.title === expected;
  if (!ok) failures++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label.padEnd(30)} -> ${out.title ?? '(no result)'}`);
  if (!ok) console.log(`      expected: ${expected}`);
}

/* Multi-unit expansion note when the target exceeds one unit of the
   recommended platform (300 kWh -> BS09 225 kWh, i.e. 2 x 225 kWh).
   A 500 kWh brief lands on containerized storage, which has no single-unit
   capacity, so no unit note is expected there. */
const big = run({ application: 'commercial', energy: 300 });
console.log(`${big.unitNote ? 'PASS' : 'FAIL'}  oversized brief emits unit note   -> ${big.title} / note=${big.unitNote}`);
if (!big.unitNote) failures++;

const container = run({ application: 'commercial', energy: 500 });
const containerOk = container.title === 'Containerized BESS' && !container.unitNote;
console.log(`${containerOk ? 'PASS' : 'FAIL'}  containerized brief has no unit note`);
if (!containerOk) failures++;

/* CTA wiring: params must round-trip for the contact-form prefill */
const resi = run({ application: 'residential', power: 5, energy: 10, country: 'Germany', pv: 6, backup: 4 });
const params = new URLSearchParams(resi.href.split('?')[1]);
const wiring = ['application', 'power', 'energy', 'country', 'pv', 'backup', 'recommended'].every((k) => params.get(k));
console.log(`${wiring ? 'PASS' : 'FAIL'}  RFQ link carries all prefill params`);
if (!wiring) {
  failures++;
  console.log(`      got: ${resi.href}`);
}

/* Empty application must hide the result panel */
const empty = run({ application: '' });
console.log(`${empty.hidden ? 'PASS' : 'FAIL'}  empty application hides result panel`);
if (!empty.hidden) failures++;

/* Regression: the country field is free text and used to be concatenated into
   an HTML string. It must now survive as text, with nothing parsed into nodes. */
const hostile = '<img src=x onerror="alert(1)">';
const injected = run({ application: 'commercial', energy: 200, country: hostile });
const noNode = result.countTag('img') === 0;
const textKept = injected.summary.includes(hostile);
console.log(`${noNode && textKept ? 'PASS' : 'FAIL'}  country input stays text, no element injected`);
if (!(noNode && textKept)) {
  failures++;
  console.log(`      summary: ${JSON.stringify(injected.summary)}  img nodes: ${result.countTag('img')}`);
}

/* Same class of input through the query string the widget writes into the CTA:
   the payload must be percent-encoded rather than break the attribute. */
const attrSafe = !injected.href.includes('<img') && injected.href.includes('%3Cimg');
console.log(`${attrSafe ? 'PASS' : 'FAIL'}  CTA href percent-encodes the same input`);
if (!attrSafe) failures++;

console.log(failures === 0 ? '\nALL CONFIGURATOR TESTS PASSED' : `\n${failures} CONFIGURATOR TEST(S) FAILED`);
if (failures) process.exitCode = 1;
