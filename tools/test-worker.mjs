/**
 * Tests the built artifact, not the source: dist/_worker.js.
 *
 * This is the file a drag-and-drop upload sends to Cloudflare. It only works if
 * the copy step ran and the relative import resolved, so importing it here is
 * itself part of the check.
 */
import { pathToFileURL } from 'node:url';
import { existsSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const entry = path.join(root, 'dist/_worker.js');

if (!existsSync(entry)) {
  console.error('FAIL  dist/_worker.js is missing — did the build run build-worker.mjs?');
  process.exit(1);
}

const { default: worker } = await import(pathToFileURL(entry).href);

let sent = [];
const env = {
  MAIL_TO: 'sales@ruibitpower.com',
  MAIL_FROM: 'website@inquiry.ruibitpower.com',
  EMAIL: {
    send: async (message) => {
      sent.push(message);
      return { messageId: 'w-1' };
    },
  },
  ASSETS: {
    fetch: async (request) => new Response('static:' + new URL(request.url).pathname, { status: 200 }),
  },
};

let failures = 0;
const check = (label, ok, detail = '') => {
  if (!ok) failures++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${detail ? '  -> ' + detail : ''}`);
};

const post = (fields) =>
  new Request('https://ruibitpower.com/api/inquiry', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded', accept: 'application/json' },
    body: new URLSearchParams(fields),
  });

const valid = {
  name: 'Wei Zhang',
  email: 'wei@example.com',
  country: 'Germany',
  application: 'PV hybrid ESS',
  message: '120 kWh hybrid for a farm, existing 60 kWp PV.',
};

let res = await worker.fetch(post(valid), env);
let body = await res.json();
check('POST /api/inquiry reaches the handler', res.status === 200 && body.ok === true, `status ${res.status}`);
check('one email queued', sent.length === 1);
check('mail is addressed to sales@', sent[0]?.to === 'sales@ruibitpower.com');

res = await worker.fetch(new Request('https://ruibitpower.com/'), env);
check('static request falls through to ASSETS', res.status === 200 && (await res.text()) === 'static:/');

res = await worker.fetch(new Request('https://ruibitpower.com/products/'), env);
check('nested static path preserved', (await res.text()) === 'static:/products/');

res = await worker.fetch(new Request('https://ruibitpower.com/api/inquiry'), env);
check('GET on the endpoint is 405', res.status === 405);

res = await worker.fetch(
  new Request('https://ruibitpower.com/api/inquiry', { method: 'PUT', body: 'x' }),
  env,
);
check('other methods are 405', res.status === 405);

/* A trailing slash is the same endpoint, not a static path. This is the case
   that returned the custom 404 page in production while the worker was fine. */
const postTo = (url) =>
  new Request(url, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded', accept: 'application/json' },
    body: new URLSearchParams(valid),
  });

res = await worker.fetch(postTo('https://ruibitpower.com/api/inquiry/'), env);
check('POST to /api/inquiry/ also reaches the handler', res.status === 200);

res = await worker.fetch(new Request('https://ruibitpower.com/api/inquiry/'), env);
check('GET with trailing slash is 405, not 404', res.status === 405);

/* Unknown paths inside the API namespace answer in JSON, so a wrong URL never
   looks like the HTML 404 page. */
res = await worker.fetch(new Request('https://ruibitpower.com/api/inquiry-notes'), env);
check('unknown /api/ path returns JSON 404', res.status === 404 && (await res.json()).error === 'not_found');

/* Something outside the namespace must still go to the static host. */
res = await worker.fetch(new Request('https://ruibitpower.com/apiary/notes'), env);
check('lookalike outside /api/ is served statically', (await res.text()) === 'static:/apiary/notes');

console.log(failures === 0 ? '\nALL WORKER TESTS PASSED' : `\n${failures} WORKER TEST(S) FAILED`);
if (failures) process.exitCode = 1;
