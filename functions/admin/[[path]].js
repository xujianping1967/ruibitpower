// Cloudflare Pages Function: OAuth proxy for Decap CMS
// Routes:
//   /admin/auth        -> redirect to GitHub authorize
//   /admin/callback    -> exchange code for token, redirect back to Decap
//
// Required env vars (set in Cloudflare Pages dashboard):
//   GITHUB_CLIENT_ID
//   GITHUB_CLIENT_SECRET

const SITE_URL = "https://ruibitpower.com";
const CALLBACK_URL = `${SITE_URL}/admin/callback`;

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname;

  // Step 1: redirect to GitHub OAuth authorize
  if (path === "/admin/auth") {
    const params = new URLSearchParams({
      client_id: env.GITHUB_CLIENT_ID,
      redirect_uri: CALLBACK_URL,
      scope: "repo",
    });
    return Response.redirect(`https://github.com/login/oauth/authorize?${params}`, 302);
  }

  // Step 2: callback - exchange code for token
  if (path === "/admin/callback") {
    const code = url.searchParams.get("code");
    if (!code) {
      return new Response("Missing code", { status: 400 });
    }

    const tokenResp = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "User-Agent": "ruibitpower-decap-oauth",
        },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
          redirect_uri: CALLBACK_URL,
        }),
      }
    );

    const data = await tokenResp.json();
    if (!data.access_token) {
      return new Response(`OAuth error: ${JSON.stringify(data)}`, { status: 500 });
    }

    // Redirect back to Decap admin with token in hash fragment
    // Decap reads token from window.location.hash or storage
    return Response.redirect(
      `${SITE_URL}/admin/#token=${data.access_token}`,
      302
    );
  }

  return new Response("Not found", { status: 404 });
}
