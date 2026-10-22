// Cloudflare Pages Function: Decap CMS GitHub OAuth proxy
// Routes:
//   GET /admin/auth       -> redirect to GitHub authorize
//   GET /admin/callback   -> exchange code for token, redirect back to /admin/
//
// Required environment secrets (set in Cloudflare Pages dashboard):
//   GITHUB_CLIENT_ID
//   GITHUB_CLIENT_SECRET
//   GITHUB_REPO_OWNER   (e.g. "Ruibit")
//   GITHUB_REPO_NAME    (e.g. "ruibitpower")

const SITE_URL = "https://ruibitpower.com";

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
  });
}

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname;

  // 1. Start OAuth: redirect to GitHub authorize
  if (path === "/admin/auth" || path === "/auth") {
    const clientId = env.GITHUB_CLIENT_ID;
    if (!clientId) return jsonResponse({ error: "GITHUB_CLIENT_ID not configured" }, 500);
    const redirectUri = `${SITE_URL}/admin/callback`;
    const githubUrl =
      `https://github.com/login/oauth/authorize` +
      `?client_id=${encodeURIComponent(clientId)}` +
      `&scope=repo` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}`;
    return Response.redirect(githubUrl, 302);
  }

  // 2. Callback: exchange code for token
  if (path === "/admin/callback" || path === "/callback") {
    const code = url.searchParams.get("code");
    if (!code) return new Response("Missing code", { status: 400 });

    const tokenResp = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const tokenData = await tokenResp.json();
    if (!tokenData.access_token) {
      return new Response(`OAuth error: ${tokenData.error || "no access_token"}`, { status: 400 });
    }

    // Redirect back to Decap admin with token in URL fragment
    // Decap reads the token from window.location.hash
    return Response.redirect(`${SITE_URL}/admin/#access_token=${tokenData.access_token}&provider=github`, 302);
  }

  // 3. Let everything else through (static admin files, etc.)
  return context.next();
}
