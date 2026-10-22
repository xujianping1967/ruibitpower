# Ruibit Power — international B2B site

Astro static site for **ruibitpower.com**. B2B energy storage supplier site (RFQ-driven, no
checkout), built for international SEO, GEO / AI discoverability, and a trust-first homepage.

## Install, verify, and deploy

```bash
npm ci
npm run verify     # complete quality gate; produces dist/
```

**Upload `dist/` — never the repository root.** `netlify.toml` sets `publish = "dist"`.

## Editing locally

```bash
npm run admin
```

That runs three things in order: a content snapshot into `../_backup/content-<stamp>/`
(keeping the newest 10), `decap-server` on 127.0.0.1:8081, and the Astro dev
server on 127.0.0.1:4321. Open **http://localhost:4321/admin/index.html**.

The trailing `index.html` is required: Astro's dev server does not resolve a
public directory to its index file, so `/admin/` answers 404 locally even though
the same path works on the deployed host.

**First visit shows a `Login` button. Click it once.** No credentials, no popup,
no GitHub redirect: the local proxy answers immediately and the session is stored
as `{"backendName":"proxy"}`, so later visits go straight to the dashboard.
Verified in a browser against this config — the button resolves in under a second
and the sidebar appears with Products, Blog, Cases / Projects, Settings and
Homepage.

That works because the backend is `git-gateway`, the pairing Decap's local proxy
is documented against. `name: github` renders the same Login screen but has no
unauthenticated path, so it never gets past it.

Decap's local backend writes straight into `src/content`, `src/data` and
`public/assets/uploads` — no git, no OAuth, no hosted backend. The preview is the
dev server itself, so a save is visible on the next reload. There is no editorial
workflow in local mode; `publish_mode` is deliberately absent from the config and
the backup is the undo path.

`decap-server` is started with `BIND_HOST=127.0.0.1`. Its default is `0.0.0.0`,
which would let anything on the local network write to this project without
credentials.

| Command | What it does |
|---|---|
| `npm run admin` | backup → decap-server → dev server |
| `npm run backup` | snapshot content only |
| `npm run check` | the full verify chain |
| `npm run deploy:zip` | verify, then build the Cloudflare zip |

`npm run deploy:zip` writes `../releases/deploy/ruibitpower-deploy-<stamp>.zip`
with `admin/` removed, and refuses to produce a package if `_worker.js`,
`_headers` or `_redirects` is missing or if anything in the output looks like a
credential (`re_…`, a private key, `sk-…`). The Resend key lives in the Pages
project as a secret and never enters the repository.

### Contact form

The form works on both hosts without branching the markup:

- **Netlify** — no `/api/inquiry` Function exists there, so the browser falls
  back to the native POST and Netlify Forms captures the inquiry.
- **Cloudflare Pages** — `worker/_worker.js` is copied to `dist/_worker.js` at
  build time as a **single file**. That detail is load-bearing: a `_worker.js/`
  directory is not registered as a worker by the dashboard's drag-and-drop
  upload, so the site serves normally while `/api/inquiry` falls through to the
  custom 404 page. It accepts the POST and sends it to `MAIL_TO` (default
  `sales@ruibitpower.com`).
  In advanced mode the worker handles every request and must forward the rest to
  `env.ASSETS`; `tools/test-worker.mjs` checks that against the built file.

Mail transport is picked at runtime, first match wins:

| # | Config | Works on |
|---|---|---|
| 1 | `RESEND_API_KEY` | free Pages project — production path |
| 2 | `send_email` binding `EMAIL` | Workers only; Pages does not offer it |
| 3 | `CF_EMAIL_API_TOKEN` + `CF_ACCOUNT_ID` | Email Sending API, Workers Paid |

Resend is first because Cloudflare Email Sending requires Workers Paid, and
Pages cannot hold a `send_email` binding at all — its binding list stops at KV,
D1, R2, Durable Objects, Queues, Vectorize, AI, Service, Hyperdrive and
Analytics. Secrets, never vars:

```sh
npx wrangler pages secret put RESEND_API_KEY
```

`MAIL_FROM` must be an address at a domain verified by whichever provider is in
use. A verified subdomain only authorises addresses at that subdomain — verifying
`inquiry.ruibitpower.com` does not permit sending as `website@ruibitpower.com`,
which is why the default is `website@inquiry.ruibitpower.com`.
`tools/test-inquiry.mjs` covers all three transports, including the priority
rule and the rate-limit and auth failure codes.

Response headers live in `public/_headers`, not in `netlify.toml`. Both Netlify
and Cloudflare Pages read that file from the publish directory, so the same
`dist/` behaves identically on either host. Do not re-add `[[headers]]` blocks to
`netlify.toml`: Netlify applies the file and the config together, and every
header would be sent twice.

`npm run verify` is the single quality gate used locally, by GitHub Actions,
and by Netlify. It validates content and asset references, checks that every
page can point at the document its numbers came from, builds the site, then
checks SEO/GEO structure, redirects, image dimensions, and the configurator.
The prebuild step regenerates `src/data/image-sizes.json`, so images uploaded
through the CMS receive intrinsic dimensions on the next build.

### Evidence

`npm run audit:evidence` prints how many products, articles, and case pages
cite a source and fails when a page is neither cited nor recorded in the debt
ledger (`noSource` in `src/data/sources.json`). A page counts as cited if it
carries a `sources` entry in its own file, or an origin URL in
`src/data/sources.json`. The ledger exists so the existing gaps are explicit:
adding a page without a source is an error, closing a gap means deleting its
ledger line.

Local preview:

```
npm run preview    # http://127.0.0.1:4321/
```

### Windows

Install Node.js 22 (Astro 7 requires >= 22.22.0) and Python 3, then open PowerShell in the project folder:

```powershell
npm ci
npm run verify
npm run dev
```

Open `http://127.0.0.1:4321/`. For local Decap CMS editing, run a second
PowerShell window in the same folder:

```powershell
npx decap-server
```

Then open `http://127.0.0.1:4321/admin/`. The Python-based redirect audit is
cross-platform: `tools/run-python.mjs` detects `python`, `python3`, or the
Windows `py` launcher automatically.

### Reviewing without a server

A dev/preview server only lives as long as the shell that started it. When you
need something you can hand to someone else, or open on a machine with no
Node installed, generate the offline copy instead:

```
node tools/make-offline-copy.mjs   # -> preview-offline/
```

Then double-click `preview-offline/index.html`. Astro emits root-absolute paths
(`/assets/...`, `/products/`), which do not resolve over `file://`, so the script
rewrites every `href`, `src` and `srcset` into a path relative to the current
page and maps directory links onto their `index.html`. Navigation between pages
therefore works by clicking, with no server.

Known limits of the offline copy: form submission does nothing (Netlify only
handles it when served), and `canonical` / Open Graph URLs still point at the
production domain — harmless for review, but do not upload this folder as the
site. The deployable artefact remains `dist/`.

## Structure

```
src/
  layouts/BaseLayout.astro      head, SEO, structured data, header/footer
  pages/                        9 static pages + products/blog/projects index + [slug] + 404
  components/                   ProductCard, Gallery, SpecTable, InquiryBand,
                                StatBand, CertGrid, ServiceCommitments, Configurator
  content/                      products (15 JSON) · blog (64 MD) · projects (23 JSON)
  data/                         site.json · trust.json · form.json
public/
  llms.txt · agents.md          AI / agent discovery
  robots.txt                    search + AI crawler policy
  admin/                        Decap CMS
  assets/css/site.css           site layer, loaded after styles.css + cms.css
  assets/js/configurator.js     B2B sizing guide (loaded on /solutions/ only)
tools/
  gen-assets.mjs                rasterises the logo + favicons from the SVG mark
  gen-og.mjs                    builds the 1200x630 OG share card
  optimize-images.mjs           generates the WebP banner derivatives
  test-configurator.mjs         deterministic tests for the sizing-guide logic
  compare-images.mjs            perceptual check for duplicate imagery
  list-images.mjs               lists asset dimensions and file sizes
assets-unused/                  source images that are NOT deployed (see below)
```

`assets-unused/` holds the source JPEGs behind the generated WebP derivatives, plus several images
that nothing on the site references. Nothing in this folder is copied into `dist/`.

## What changed in this pass

**Trust architecture (homepage)**

- Added a statistics band with two explicitly labelled groups: **Ruibit Power** (own figures) and
  **Dawnice** (manufacturing partner figures). Manufacturing scale is never presented as Ruibit's.
- Added a dark "Manufacturing & quality control" section with the quality-control checklist from the
  manufacturing partner, and the facility photo `office.webp` captioned accurately.
- Added a certification grid (10 standards) replacing the previous plain text list.
- Added a reference-deployments strip on the homepage (previously only on `/projects/`).
- Added the Dawnice product-range banner to the products section
  (`factory-range.webp`, 102 KB WebP down from the 494 KB source JPEG).
- The Nigeria case page now uses a real field photo of a Dawnice Energy deployment in Nigeria
  (`abuja.jpg`) instead of a stock product render, with an explicit caption.
  **Known limitation:** the source is only 600×276 and its original framing cuts the right end of the
  orange banner. The CSS adds no further crop or stretch (it renders at 1:1), but a replacement photo
  at ≥1200px, framed with the full banner, would materially improve this page. If you swap it, update
  `imageWidth` / `imageHeight` in the project JSON
  (`node tools/sync-project-image-dims.mjs` does this automatically) and raise
  `.project-figure { max-width }` in `site.css` to match.
- Verified image content before captioning: the file named `factory.jpg` is **not** a factory — it is
  a product-range lineup shot. It is now captioned as the product range, and the genuine facility
  building photo is used for the facility claim.
- Added a 10-item service-terms grid: quotation response, warranty, MOQ, samples, lead time,
  Incoterms, payment terms, OEM/ODM, documentation, languages.
- Added a partner-developments strip (4 dated public events, attributed to Dawnice).

**GEO / AI discoverability**

- `public/llms.txt` — entity, product families, manufacturing-partner facts, certification list,
  product status, reference deployments, citation guidance.
- `public/agents.md` — instructions for AI agents: how to size, how to submit an RFQ, and an
  explicit "must NOT be stated" list (prices, ROI, lead times, client names).
- `robots.txt` — `Disallow: /admin/`, explicit allow-list for GPTBot / ClaudeBot / PerplexityBot /
  Google-Extended / Applebot-Extended / CCBot / OAI-SearchBot.
- `sitemap.xml` — now emits `<lastmod>` and `<priority>`.

**Search / technical SEO**

- `Organization` structured data completed: `logo`, `address`, `contactPoint`, `knowsAbout`,
  `@id`; `WebSite` entity added and linked to the organization.
- `FAQPage` structured data added — **13 pages** now emit it (About + all 12 product pages).
  Previously zero.
- Breadcrumbs now use real content titles instead of slug-derived text
  (`Honey 125kW / 261kWh All-in-One ESS`, not `Honey-125kw-261kwh-all-in-one-ess`).
- Product-type pages no longer carry the `| Ruibit Power` suffix, which was pushing 18 pages past
  the ~60-character SERP limit. Longest remaining title is 59 characters.
- `Product` schema now splits `brand` from `manufacturer` and carries `sku`.

**Pages**

- `/products/`, `/projects/`, `/blog/` — the internal CMS notes that were rendering in the hero copy
  of all three index pages are gone, replaced with buyer-facing copy.
- `404.astro` — new; the build previously emitted no 404 page.
- `/about/` — rebuilt with the manufacturing partner's real facility address, a verifiable
  quality-control list, certificate grid, outbound verification links, and a 6-question B2B FAQ.
- `/contact/` — now shows the registered entity, the full facility address, supply terms, and
  accepts prefilled parameters from the sizing guide.
- `/solutions/` — hosts the revived sizing guide; each solution card links to its platform.
- `/admin/` — `noindex, nofollow`; the CMS `logo_url` no longer points at the WhatsApp QR image.

**Brand assets**

- Hand-built SVG logo mark used in the header, plus `favicon.svg`, `favicon.ico` (hand-packed ICO
  container), `favicon-32.png`, `apple-touch-icon.png`, and a 512×512 raster logo for structured data.
- `og-default.jpg` — a designed 1200×630 JPEG share card. The previous `og:image` was a
  1950×650 **WebP**, which LinkedIn, Facebook, WeChat, and WhatsApp frequently refuse to render.

**Performance / delivery**

- `public/_headers` — HSTS, CSP, Permissions-Policy, COOP and per-path cache policies, in the
  one syntax Netlify and Cloudflare Pages both read. The policy is site-wide:
  `/admin/` inherits it, so `script-src` includes unpkg and `connect-src` includes the GitHub
  API. Splitting them per path would need Cloudflare's `!` removal syntax, which Netlify
  does not support.
- Fixed a contrast defect: `.page-hero` inherited a dark navy gradient from the legacy
  `styles.css` while `cms.css` set its text colour to near-black. Fixed in `site.css` with an
  explicit light hero.

**Sizing guide**

`configurator.js` was an orphaned file — no Astro template referenced it, so it had never run.
It is now mounted on `/solutions/` and rewritten as a B2B sizing guide: application, target power,
target energy, country, PV capacity, backup duration → recommended platform + indicative band +
an RFQ link that prefills `/contact/`. Logic is covered by `tools/test-configurator.mjs`.

## Product imagery pipeline

The 12 product hero images were regenerated as a uniform set: **1200×800 (3:2),
pure white background, product centred, no baked-in promotional text.**

Sources were taken from the manufacturer's own catalogue pages rather than
upscaled from the previous 600 px site images. Every candidate was inspected
visually before use, because the manufacturer's library mixes clean product
renders with brochure pages, dimension diagrams, and images carrying baked-in
promotional copy — a bulk download would have pulled in all of it.

```
node tools/product-images.mjs            # measure framing only
node tools/product-images.mjs --write    # write the images to assets-source/out
node tools/install-product-images.mjs    # copy into the site + repoint product JSON
node tools/contact-sheet.mjs out outputs-sheet   # visual review sheet
```

Framing logic in `tools/product-images.mjs`:

- The product's bounding box is measured with `sharp.trim`, but the trim is used
  **only to measure**. Pixels are re-extracted from the untouched original with a
  3% safety pad, so no part of a product can be clipped — important here because
  several products are white on white.
- The product is scaled to fill 88% of the limiting canvas dimension, with
  magnification **capped at 1.15×**. Reaching an identical fill ratio across all
  twelve would have required up to 1.56×, which visibly softens a 700 px source.
  Rendered sizes therefore vary slightly, in proportion to each product's bulk.
- One documented exception: `dawnice-containerized-bess` is capped at 1.4×
  because its source frames a long low object (3.5:1) inside a square.

Per-product source choices worth knowing:

| Product | Source note |
|---|---|
| `dawnice-containerized-bess` | Weakest of the set — the manufacturer publishes no well-framed high-resolution container hero. Still the lowest fill ratio (35% height). A better source photo is the single biggest remaining image improvement. |
| `dawnice-residential-hybrid-inverter` | The manufacturer's main inverter asset carries baked-in banner copy ("DWH SERIES … POWERING YOUR SUSTAINABLE FUTURE"), so a clean side-view render was used instead. |
| `dw-home-all-in-one-ess` | The manufacturer's asset is a brochure page with text. The site's own standing 600 px photo was clean, so it was kept. |

### Reference-deployment card images

`tools/case-images.mjs` does the same reframe for the six `/projects/` card
images, writing to `public/assets/images/cases/`:

```
node tools/case-images.mjs --write
```

Two things worth remembering here:

- **The canvas is not the display size.** These cards display at roughly
  377×251 CSS px (~754×502 device px at 2x), while the canvas is 1200×800 — about
  3× larger than the browser needs. Magnifying the subject to fill the band
  therefore costs no visible sharpness, because it is downsampled again at
  display time. An earlier 1.15× cap wrongly assumed canvas size equalled display
  size and left the containerized-BESS subject stranded at 27% of the band
  height; at a 2.0× cap it fills 86% of the width and reads correctly.
- **Real photographs are handled differently.** The Nigeria card is a genuine
  field photograph at 2.17:1, so it cannot be reframed onto a white 3:2 canvas.
  It sets `imageFit: "cover"` in the project JSON and the card CSS switches it to
  `object-fit: cover`, filling the band instead of letterboxing.

**Known weakest image:** the containerized-BESS card. The subject is a long, low
object, so even at 86% of the band width it occupies only ~39% of the height.
That is inherent to the source framing rather than a defect, but a
better-composed container photograph would still improve it.

### Still outstanding: the 60 gallery images

Each product's gallery keeps its original shots behind the new main image.
A visual audit of all 60 found roughly **36 carry baked-in marketing text or are
diagrams/brochure pages** rather than product photos — things like `265kWh`
badges over scene photos, `125kW/261kWh` spec cards, "Diagram System connection"
graphics, and promo cards with feature chips.

Those cannot be cleaned by processing; they need re-sourcing from the
manufacturer's clean sets or removal. Triage sheet:
`assets-source/gallery-sheet.jpg`.

## Data integrity rules

These are enforced by `src/data/trust.json` → `sourceNotes` and by `public/agents.md`. Keep them.

- Manufacturing scale, certification, and global-reach figures belong to **Dawnice** and must always
  be labelled as such. Do not present them as Ruibit Power figures.
- Certificates are issued by the manufacturing partner against the confirmed order configuration
  and destination market.
- Do not state ROI, payback, savings, delivery dates, warranty durations, or client names — none are
  published, for any platform.
- Partner logos only with permission or official public proof.

## Open items — need your input before launch

1. **Ruibit Power's own registered street address.** The site currently states `Jiangxi, China`
   (derived from the legal name) and shows the Dawnice facility address separately, clearly
   labelled. `Organization` structured data uses the region-level address. Replace with the full
   registered address when you have it — schema, footer, About, and Contact should all match
   byte-for-byte.
2. **Confirm the service terms**, especially `24 working hours` for quotation response and the
   warranty / MOQ / lead-time wording in `src/data/trust.json` →
   `ruibit.ruibit.serviceCommitments` / `ruibit.serviceCommitments`. These are commitments made to
   buyers; confirm each one is deliverable.
3. **Certificate permission.** The certification grid is styled text badges, not certificate scans.
   If Dawnice permits it, replace with certificate thumbnails — that is the single biggest remaining
   trust upgrade.
4. **`sameAs` profiles.** `src/data/site.json` → `sameAs` is an empty array, so the Organization
   schema omits it. Add real, verified profile URLs only (LinkedIn company page, Alibaba storefront,
   YouTube). Do not add unverified ones.
5. **Distributor authorisation.** `Jiangxi Ruibit Intelligent Technology Co., Ltd.` is described as
   an authorized Dawnice channel. Have the authorisation letter ready for buyer due diligence, and
   consider publishing a redacted version.

## Unused assets worth a second look

Moved to `assets-unused/` because no page references them. Two are genuinely valuable and should be
used once their details are confirmed:

| File | What it actually shows | Why it is not used yet |
|---|---|---|
| `estonia.jpg` | **A real field photo** — two installers in front of an open Dawnice battery cabinet, European setting | There is no Estonia case in the projects collection. Confirm the country, site, and capacity before publishing it as a case photo. Do not relabel it. |
| `abuja.jpg` | Real Nigeria deployment photo | **Now in use** on the Nigeria case page. |
| `cabinet-ess.jpg`, `container-bess.jpg`, `home-system.jpg`, `hybrid-inverter.webp`, `wall-battery.jpg` | Product imagery | No page slot; candidates for future solution or technology pages. |

The site previously deployed 749 KB of images that no page requested. Those are now out of `dist/`.
All 79 image references in the built output resolve.

## Cleanup still recommended

Not done automatically because it deletes your files. The repository root still contains:

| Path | Status |
|---|---|
| `*.html` (33 files at root) | previous flat site — not deployed |
| `legacy-static/` (35 files) | previous flat site — not deployed |
| `assets/` (86 files) | previous flat site — not deployed |
| `sitemap.xml`, `robots.txt` at root | **stale and conflicting** — list the old `.html` URLs |
| `ruibitpower-netlify-dist-*.zip` | stale build output |
| `node_modules/` (124 MB) | build artefact |

The two stale root files are the real hazard: if the repository root is ever uploaded as the site,
search engines receive a sitemap pointing at 404s. Delete them, or move them into an `archive/`
folder that is never deployed.
