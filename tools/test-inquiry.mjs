/**
 * Harness for worker/_worker.js.
 *
 * The handler is imported directly and driven with real Request objects; the
 * only stub is env.EMAIL, which records what would have been sent. Covers the
 * paths that decide whether a real inquiry reaches sales@ or disappears.
 */
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const { onRequestPost, onRequestGet } = await import(
  pathToFileURL(path.join(root, 'worker/_worker.js')).href
);

let sent = [];
const env = {
  MAIL_TO: 'sales@ruibitpower.com',
  MAIL_FROM: 'website@inquiry.ruibitpower.com',
  EMAIL: {
    send: async (message) => {
      sent.push(message);
      return { messageId: 'test-1' };
    },
  },
};

const base = 'https://ruibitpower.com/api/inquiry';
const form = (fields) => {
  const body = new URLSearchParams(fields);
  return new Request(base, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded', accept: 'application/json' },
    body,
  });
};

let failures = 0;
const check = (label, ok, detail = '') => {
  if (!ok) failures++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${detail ? '  -> ' + detail : ''}`);
};

const valid = {
  name: 'Ana Ruiz',
  email: 'ana@example.com',
  phone: '+34 600 000 000',
  country: 'Spain',
  application: 'Commercial & industrial BESS',
  message: 'Need 250 kWh for a cold store, grid connection is 100 kW.',
  recommended_system: 'Honey 125 kW / 261 kWh all-in-one ESS',
};

sent = [];
let res = await onRequestPost({ request: form(valid), env });
let body = await res.json();
check('valid submission returns 200', res.status === 200 && body.ok === true, `status ${res.status}`);
check('one email sent', sent.length === 1, `${sent.length} sent`);
check('goes to sales@ruibitpower.com', sent[0]?.to === 'sales@ruibitpower.com', sent[0]?.to);
check('reply-to is the visitor', sent[0]?.replyTo === 'ana@example.com', sent[0]?.replyTo);
check('subject carries application and country', /Commercial & industrial BESS/.test(sent[0]?.subject) && /Spain/.test(sent[0]?.subject), sent[0]?.subject);
check('body includes the requirements', /cold store/.test(sent[0]?.text || ''));
check('html escapes the input', !/<script/i.test(sent[0]?.html || ''));

sent = [];
res = await onRequestPost({ request: form({ ...valid, message: '<script>alert(1)</script>ok' }), env });
body = await res.json();
check('markup in a field is escaped in html', /&lt;script&gt;/.test(sent[0]?.html || ''));
check('and kept verbatim in text', /<script>alert\(1\)<\/script>ok/.test(sent[0]?.text || ''));

sent = [];
res = await onRequestPost({ request: form({ ...valid, 'bot-field': 'http://spam' }), env });
body = await res.json();
check('honeypot answers ok', res.status === 200 && body.ok === true);
check('honeypot sends nothing', sent.length === 0, `${sent.length} sent`);

sent = [];
res = await onRequestPost({ request: form({ ...valid, email: 'not-an-email' }), env });
body = await res.json();
check('invalid email rejected', res.status === 400 && body.error === 'email');
check('nothing sent on invalid email', sent.length === 0);

sent = [];
res = await onRequestPost({ request: form({ ...valid, message: '   ' }), env });
body = await res.json();
check('blank required field rejected', res.status === 400 && body.error === 'missing', JSON.stringify(body));

sent = [];
const jsonReq = new Request(base, {
  method: 'POST',
  headers: { 'content-type': 'application/json', accept: 'application/json' },
  body: JSON.stringify(valid),
});
res = await onRequestPost({ request: jsonReq, env });
check('json body accepted', res.status === 200 && sent.length === 1);

sent = [];
const noJs = new Request(base, {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams(valid),
});
res = await onRequestPost({ request: noJs, env });
check('no-JS post redirects to /contact/?sent=1', res.status === 303 && res.headers.get('location')?.endsWith('/contact/?sent=1'), res.headers.get('location'));

res = await onRequestPost({
  request: new Request(base, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded', origin: 'https://evil.example', host: 'ruibitpower.com' },
    body: new URLSearchParams(valid),
  }),
  env,
});
check('cross-origin post refused', res.status === 403);

res = await onRequestPost({ request: form(valid), env: { ...env, EMAIL: undefined } });
body = await res.json();
check('missing binding fails loudly', res.status === 503 && body.error === 'mail_unavailable');

res = await onRequestPost({
  request: form(valid),
  env: { ...env, EMAIL: { send: async () => { const e = new Error('sender'); e.code = 'E_SENDER_NOT_VERIFIED'; throw e; } } },
});
body = await res.json();
check('send error returns 502 with code', res.status === 502 && body.code === 'E_SENDER_NOT_VERIFIED', JSON.stringify(body));

/* The REST path is the one that actually runs on Pages, because Pages does not
   support the send_email binding. Driven through a stubbed global fetch. */
const restEnv = {
  MAIL_TO: 'sales@ruibitpower.com',
  MAIL_FROM: 'website@inquiry.ruibitpower.com',
  CF_EMAIL_API_TOKEN: 'tok_test',
  CF_ACCOUNT_ID: 'acct_123',
};

let calls = [];
const jsonResponse = (status, payload) =>
  new Response(JSON.stringify(payload), { status, headers: { 'content-type': 'application/json' } });

const okPayload = {
  success: true,
  errors: [],
  messages: [],
  result: { delivered: ['sales@ruibitpower.com'], permanent_bounces: [], queued: [] },
};

globalThis.fetch = async (url, init) => {
  calls.push({ url: String(url), init });
  return jsonResponse(200, okPayload);
};

calls = [];
res = await onRequestPost({ request: form(valid), env: restEnv });
body = await res.json();
check('REST transport sends without a binding', res.status === 200 && body.ok === true, `status ${res.status}`);
check(
  'REST hits the documented endpoint',
  calls[0]?.url === 'https://api.cloudflare.com/client/v4/accounts/acct_123/email/sending/send',
  calls[0]?.url
);

const payload = JSON.parse(calls[0]?.init?.body || '{}');
check('REST body addresses sales@', payload.to === 'sales@ruibitpower.com', payload.to);
check('REST body sends from the verified domain', payload.from === 'website@inquiry.ruibitpower.com', payload.from);
check('REST carries Reply-To in headers', payload.headers?.['Reply-To'] === 'ana@example.com', JSON.stringify(payload.headers));
check('REST authorises with the bearer token', /^Bearer tok_test$/.test(calls[0]?.init?.headers?.authorization || ''));

globalThis.fetch = async () => jsonResponse(403, {
  success: false,
  errors: [{ code: 10102, message: 'email.sending.error.authentication.forbidden' }],
  result: null,
});
res = await onRequestPost({ request: form(valid), env: restEnv });
body = await res.json();
check(
  'REST rejection becomes 502 with the API message',
  res.status === 502 && body.code === 'email.sending.error.authentication.forbidden',
  JSON.stringify(body)
);

globalThis.fetch = async () => jsonResponse(200, {
  success: true,
  errors: [],
  result: { delivered: [], permanent_bounces: ['sales@ruibitpower.com'], queued: [] },
});
res = await onRequestPost({ request: form(valid), env: restEnv });
body = await res.json();
check('a permanent bounce is not reported as success', res.status === 502 && body.code === 'permanent_bounce', JSON.stringify(body));

res = await onRequestPost({ request: form(valid), env: { MAIL_TO: 'sales@ruibitpower.com' } });
body = await res.json();
check(
  'no transport at all fails with not_configured',
  res.status === 503 && body.code === 'not_configured',
  JSON.stringify(body)
);

/* Resend is the transport the live deployment uses: Cloudflare Email Sending
   needs Workers Paid, so a free Pages project has to go through a provider. */
const resendEnv = {
  MAIL_TO: 'sales@ruibitpower.com',
  MAIL_FROM: 'website@inquiry.ruibitpower.com',
  RESEND_API_KEY: 're_test_key',
};

calls = [];
globalThis.fetch = async (url, init) => {
  calls.push({ url: String(url), init });
  return jsonResponse(200, { id: 'msg_123' });
};
res = await onRequestPost({ request: form(valid), env: resendEnv });
body = await res.json();
check('Resend transport sends without a binding', res.status === 200 && body.ok === true, `status ${res.status}`);
check('Resend hits its own endpoint', calls[0]?.url === 'https://api.resend.com/emails', calls[0]?.url);

const rp = JSON.parse(calls[0]?.init?.body || '{}');
check('Resend body addresses sales@', Array.isArray(rp.to) && rp.to[0] === 'sales@ruibitpower.com', JSON.stringify(rp.to));
check('Resend sends from the verified domain', rp.from === 'website@inquiry.ruibitpower.com', rp.from);
check('Resend carries reply_to for direct reply', rp.reply_to === 'ana@example.com', rp.reply_to);
check('Resend authorises with the bearer key', /^Bearer re_test_key$/.test(calls[0]?.init?.headers?.authorization || ''));

globalThis.fetch = async () => jsonResponse(401, { statusCode: 401, name: 'missing_api_key', message: 'API key is invalid' });
res = await onRequestPost({ request: form(valid), env: resendEnv });
body = await res.json();
check('Resend auth failure becomes 502 with its code', res.status === 502 && body.code === 'missing_api_key', JSON.stringify(body));

globalThis.fetch = async () => jsonResponse(429, { statusCode: 429, name: 'rate_limit_exceeded', message: 'Too many requests' });
res = await onRequestPost({ request: form(valid), env: resendEnv });
body = await res.json();
check('Resend rate limit is reported as such', res.status === 502 && body.code === 'resend_rate_limited', JSON.stringify(body));

/* Resend must win when both it and the Cloudflare API are configured, otherwise
   an account that has both keys would silently use the one needing a paid plan. */
calls = [];
globalThis.fetch = async (url, init) => {
  calls.push({ url: String(url), init });
  return jsonResponse(200, { id: 'msg_123' });
};
res = await onRequestPost({ request: form(valid), env: { ...resendEnv, CF_EMAIL_API_TOKEN: 'tok_test', CF_ACCOUNT_ID: 'acct_123' } });
check('Resend takes priority over the Cloudflare API', calls[0]?.url === 'https://api.resend.com/emails', calls[0]?.url);

res = await onRequestGet();
check('GET returns 405', res.status === 405);

console.log(failures === 0 ? '\nALL INQUIRY TESTS PASSED' : `\n${failures} INQUIRY TEST(S) FAILED`);
if (failures) process.exitCode = 1;
