/**
 * POST /api/inquiry — Cloudflare Pages advanced-mode worker.
 *
 * SINGLE FILE ON PURPOSE. The dashboard's drag-and-drop upload only recognises a
 * root-level `_worker.js` *file*; a `_worker.js/` directory is silently treated as
 * ordinary static files, the worker never runs, and /api/inquiry falls through to
 * the site's 404 page. That is exactly what happened on the first deployment, so
 * the handler and the router now live in one module that the build copies to
 * dist/_worker.js verbatim.
 *
 * Advanced mode means this worker sees every request, so everything that is not
 * the inquiry endpoint must be handed to `env.ASSETS`. Skipping that returns a
 * blank site, not a 404.
 *
 * Email leaves through the first transport that is configured:
 *
 *   1. RESEND_API_KEY — works on a free Pages project. This is the production
 *      path: Cloudflare Email Sending requires Workers Paid, and a Pages project
 *      cannot hold a send_email binding at all.
 *   2. env.EMAIL binding — cleanest of the three, but only reachable from a
 *      Workers deployment, so it is kept for a future move rather than assumed.
 *   3. CF_EMAIL_API_TOKEN + CF_ACCOUNT_ID — the Email Sending REST API, which
 *      needs Workers Paid plus a verified sending domain.
 *
 * MAIL_FROM must be an address at a domain verified by whichever provider is in
 * use — and a verified subdomain only authorises addresses at that subdomain.
 * Verifying inquiry.example.com does not let you send as something@example.com;
 * the default here is therefore website@inquiry.ruibitpower.com, matching the
 * domain verified in Resend.
 * A misconfiguration surfaces as a JSON error carrying the provider's code,
 * which is logged rather than shown to the visitor.
 */

const MAX_BODY_BYTES = 32 * 1024;
const MAX_FIELD_CHARS = 4000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const text = (value, limit = MAX_FIELD_CHARS) =>
  String(value ?? '')
    .replace(/\r\n/g, '\n')
    .trim()
    .slice(0, limit);

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const wantsJson = (request) =>
  (request.headers.get('accept') || '').includes('application/json') ||
  (request.headers.get('x-requested-with') || '').toLowerCase() === 'fetch';

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

/* Accept both the fetch path (FormData) and the no-JS path (urlencoded). */
async function readFields(request) {
  const type = request.headers.get('content-type') || '';
  if (type.includes('application/json')) {
    const data = await request.json();
    return data && typeof data === 'object' ? data : {};
  }
  const form = await request.formData();
  const out = {};
  for (const [key, value] of form.entries()) out[key] = typeof value === 'string' ? value : '';
  return out;
}

/* Optional KV-backed limiter. Without the binding the check is skipped rather
   than failing: a missing spam control must not drop real inquiries. */
async function overLimit(env, ip) {
  const kv = env.INQUIRY_KV;
  if (!kv || !ip) return false;
  const key = `inquiry:${ip}:${Math.floor(Date.now() / 3600000)}`;
  const used = Number((await kv.get(key)) || 0);
  if (used >= 5) return true;
  await kv.put(key, String(used + 1), { expirationTtl: 3600 });
  return false;
}

const hasMailTransport = (env) =>
  Boolean(env.RESEND_API_KEY) ||
  Boolean(env.CF_EMAIL_API_TOKEN && env.CF_ACCOUNT_ID) ||
  Boolean(env.EMAIL && typeof env.EMAIL.send === 'function');

async function sendViaResend(env, mail) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from: mail.from,
      to: [mail.to],
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
      /* Resend calls it reply_to; without it sales@ would have to copy the
         visitor's address out of the body by hand. */
      reply_to: mail.replyTo,
    }),
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const error = new Error(payload?.message || `HTTP ${response.status}`);
    error.code =
      response.status === 429
        ? 'resend_rate_limited'
        : payload?.name || `resend_http_${response.status}`;
    throw error;
  }

  return 'resend';
}

async function sendViaCloudflare(env, mail) {
  const url = `https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/email/sending/send`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env.CF_EMAIL_API_TOKEN}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      to: mail.to,
      from: mail.from,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
      headers: { 'Reply-To': mail.replyTo },
    }),
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok || payload?.success === false) {
    const first = payload?.errors?.[0];
    const error = new Error(first?.message || `HTTP ${response.status}`);
    error.code = first?.message || `http_${response.status}`;
    throw error;
  }

  /* `delivered` empty and `permanent_bounces` populated is still a 200. Treat it
     as a failure, otherwise the visitor is thanked for an inquiry nobody got. */
  const bounced = payload?.result?.permanent_bounces || [];
  if (bounced.length) {
    const error = new Error('permanent bounce');
    error.code = 'permanent_bounce';
    throw error;
  }

  return 'rest';
}

/**
 * Sends one message, choosing the transport that is actually configured.
 *
 * Order matters. Resend comes first because it is the one that works on a free
 * Pages project; the Cloudflare Email Sending API needs Workers Paid, and the
 * send_email binding is not offered to Pages at all. That makes the binding a
 * nice-to-have for a future Workers deployment rather than the default, even
 * though it is the cleanest of the three.
 */
async function deliver(env, mail) {
  if (env.RESEND_API_KEY) return sendViaResend(env, mail);

  if (env.EMAIL && typeof env.EMAIL.send === 'function') {
    await env.EMAIL.send({
      to: mail.to,
      from: mail.from,
      replyTo: mail.replyTo,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
    });
    return 'binding';
  }

  return sendViaCloudflare(env, mail);
}

export async function onRequestPost({ request, env }) {
  const origin = request.headers.get('origin');
  if (origin) {
    const host = request.headers.get('host');
    let sameOrigin = false;
    try {
      sameOrigin = new URL(origin).host === host;
    } catch {
      sameOrigin = false;
    }
    if (!sameOrigin) return json({ ok: false, error: 'origin' }, 403);
  }

  const declared = Number(request.headers.get('content-length') || 0);
  if (declared > MAX_BODY_BYTES) return json({ ok: false, error: 'too_large' }, 413);

  let fields;
  try {
    fields = await readFields(request);
  } catch {
    return json({ ok: false, error: 'unreadable' }, 400);
  }

  /* Honeypot: answer like a success so the bot does not learn, but send nothing. */
  if (text(fields['bot-field'])) {
    return wantsJson(request) ? json({ ok: true }) : Response.redirect(new URL('/contact/?sent=1', request.url), 303);
  }

  const name = text(fields.name, 200);
  const email = text(fields.email, 320);
  const country = text(fields.country, 200);
  const application = text(fields.application, 200);
  const message = text(fields.message);
  const phone = text(fields.phone, 100);
  const recommended = text(fields.recommended_system, 200);

  const missing = [
    ['name', name],
    ['email', email],
    ['country', country],
    ['application', application],
    ['message', message],
  ]
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length) return json({ ok: false, error: 'missing', fields: missing }, 400);
  if (!EMAIL_RE.test(email)) return json({ ok: false, error: 'email' }, 400);

  if (await overLimit(env, request.headers.get('cf-connecting-ip'))) {
    return json({ ok: false, error: 'rate_limited' }, 429);
  }

  /* Pages does not support the send_email binding — its supported binding list
     covers KV, D1, R2, Durable Objects, Queues, Vectorize, AI, Service,
     Hyperdrive and Analytics only. So the transport is chosen at runtime:
     binding when present (Workers, or Pages if Cloudflare ever adds it), else
     the REST API with a token stored as an encrypted secret. */
  if (!hasMailTransport(env)) {
    console.error('inquiry: no mail transport — set RESEND_API_KEY (or CF_EMAIL_API_TOKEN + CF_ACCOUNT_ID)');
    return json({ ok: false, error: 'mail_unavailable', code: 'not_configured' }, 503);
  }

  const to = env.MAIL_TO || 'sales@ruibitpower.com';
  const from = env.MAIL_FROM || 'website@inquiry.ruibitpower.com';

  const rows = [
    ['Name', name],
    ['Email', email],
    ['Phone / WhatsApp', phone || '—'],
    ['Country / Region', country],
    ['Application', application],
    ['Suggested platform', recommended || '—'],
  ];

  const bodyText = [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    'Project requirements:',
    message,
    '',
    `Submitted: ${new Date().toISOString()}`,
    `Page: ${request.headers.get('referer') || '—'}`,
  ].join('\n');

  const bodyHtml = [
    '<table cellpadding="6" cellspacing="0" style="font:14px/1.5 system-ui,sans-serif;border-collapse:collapse">',
    ...rows.map(
      ([label, value]) =>
        `<tr><td style="color:#5b6b73;vertical-align:top">${escapeHtml(label)}</td>` +
        `<td>${escapeHtml(value)}</td></tr>`,
    ),
    '</table>',
    '<p style="font:14px/1.5 system-ui,sans-serif;color:#5b6b73;margin:18px 0 6px">Project requirements</p>',
    `<pre style="font:14px/1.5 ui-monospace,monospace;white-space:pre-wrap;margin:0">${escapeHtml(message)}</pre>`,
  ].join('');

  try {
    await deliver(env, {
      to,
      from,
      replyTo: email,
      subject: `Website inquiry — ${application} — ${country} — ${name}`,
      text: bodyText,
      html: bodyHtml,
    });
  } catch (error) {
    console.error('inquiry: send failed', error?.code || '', error?.message || error);
    return json({ ok: false, error: 'send_failed', code: error?.code || 'unknown' }, 502);
  }

  if (wantsJson(request)) return json({ ok: true });
  return Response.redirect(new URL('/contact/?sent=1', request.url), 303);
}

export function onRequestGet() {
  /* The endpoint only accepts submissions; a GET is a misconfigured form. */
  return new Response('Method Not Allowed', { status: 405, headers: { allow: 'POST' } });
}

const API_PATH = '/api/inquiry';

/* Decap CMS OAuth proxy — runs inside this single-file worker because
   advanced mode ignores the functions/ directory. */
const SITE_URL = 'https://ruibitpower.com';
const CALLBACK_URL = `${SITE_URL}/admin/callback`;

async function handleAdminAuth(env) {
  const params = new URLSearchParams({
    client_id: env.GITHUB_CLIENT_ID,
    redirect_uri: CALLBACK_URL,
    scope: 'repo',
  });
  return Response.redirect(`https://github.com/login/oauth/authorize?${params}`, 302);
}

async function handleAdminCallback(request, env) {
  const code = new URL(request.url).searchParams.get('code');
  if (!code) return new Response('Missing code', { status: 400 });

  const tokenResp = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': 'ruibitpower-decap-oauth',
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: CALLBACK_URL,
    }),
  });

  const data = await tokenResp.json();
  if (!data.access_token) {
    return new Response(`OAuth error: ${JSON.stringify(data)}`, { status: 500 });
  }

  return Response.redirect(`${SITE_URL}/admin/#token=${data.access_token}`, 302);
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;

    /* Decap CMS OAuth routes */
    if (path === '/admin/auth') return handleAdminAuth(env);
    if (path === '/admin/callback') return handleAdminCallback(request, env);

    if (path === API_PATH) {
      if (request.method === 'POST') return onRequestPost({ request, env });
      if (request.method === 'GET') return onRequestGet();
      return new Response('Method Not Allowed', {
        status: 405,
        headers: { allow: 'GET, POST', 'cache-control': 'no-store' },
      });
    }

    /* Anything else under /api/ is our namespace, so answer in JSON instead of
       handing back an HTML page that looks like a routing failure. */
    if (path.startsWith('/api/')) {
      return json({ ok: false, error: 'not_found', path }, 404);
    }

    /* Static host fallback: Netlify never executes this file. */
    return env.ASSETS.fetch(request);
  },
};
