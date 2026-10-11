# Cachety security model

This document describes what the application protects, against whom, by
what means, how each guarantee is **verified automatically**, and what it
does not guarantee. It is the reference for code review: a change that
weakens any of the controls below must say so explicitly and update this
document.

Reporting a vulnerability: see [SECURITY.md](../SECURITY.md).

---

## 1. What we protect

Users drop identity documents, tax notices, payslips and rent receipts:
critical documents. The assets to protect are therefore:

| Asset | Expected property |
| --- | --- |
| Dropped files (PDF, images) | **Confidentiality**: they never leave the device. |
| Hidden content of the files (text layer, metadata, EXIF/GPS, attachments) | **Non-disclosure**: absent from the output file. |
| Output file | **Integrity** of the watermark: it cannot be removed by simply editing the PDF. |
| Passwords (opening a locked PDF, encrypting the output) | **Confidentiality**: in memory only, never persisted or transmitted. |
| Served code | **Integrity**: no third-party script, no unapproved inline script. |

## 2. Architecture and attack surface

The application is a **static export** (Next.js `output: "export"`) served
by Cloudflare Pages. **There is no application server, no database, no API,
no account, no cookie, no analytics.** All processing happens in the
browser:

```
file ──► pdf.js (Web Worker) ──► canvas ──► watermark ──► JPEG/PNG ──► pdf-lib ──► [AES-256] ──► download (blob:)
```

The remaining attack surface is therefore:

1. **Hostile files** parsed by pdf.js, libheif and the browser's image decoders.
2. **Script injection** (XSS) that could read the files and exfiltrate them.
3. **The supply chain**: npm dependencies, CI actions, host.
4. **Leakage through the output file**: original data that would survive processing.
5. **The service worker**, which controls every request of the origin.

## 3. Threat model

| # | Threat | Attacker | Controls | Verification |
| --- | --- | --- | --- | --- |
| T1 | Exfiltration of the files to a third-party server | Injected script, compromised dependency | CSP `connect-src 'self'`, `default-src 'self'` (§4.1) | `ui.smoke.e2e.ts` (exfiltration blocked, zero off-origin requests), `security-headers.test.ts` |
| T2 | XSS via file name, watermark text, `localStorage` | Booby-trapped file or link | React escaping, no `dangerouslySetInnerHTML`/`eval`, hash-based CSP (§4.2) | `security.static.test.ts` |
| T3 | Code execution via a booby-trapped PDF (PDF JavaScript, XFA, malicious font) | Sender of the document | pdf.js 6 without an `eval` path, XFA disabled, rendering in a Worker, CSP without `unsafe-eval` (§4.3) | `watermark.seam.e2e.ts` (adversarial corpus) |
| T4 | Leakage of hidden data in the output (text, author, GPS, attachment, JS, links) | Recipient of the watermarked document | Full rasterisation, re-encoding of images (§4.4) | `watermark.seam.e2e.ts` (sanitisation) |
| T5 | Removal of the watermark by editing the PDF | Recipient | The watermark is blended into the pixels, not a layer (§4.4) | same |
| T6 | Cryptographic attack on the protected PDF | Recipient, thief of the file | AES-256 (PDF 2.0, /V 5 /R 6), never RC4, 256-bit generated secret (§4.5) | `file-password.test.ts` |
| T7 | Zip-Slip when extracting the downloaded archive | Forged file name | Only the basename is kept, names de-duplicated (§4.6) | `files.test.ts` |
| T8 | Clickjacking, tab-nabbing, Referer leakage | Third-party site | `frame-ancestors 'none'`, `X-Frame-Options`, COOP, `noopener noreferrer`, `Referrer-Policy` (§4.7) | `security-headers.test.ts` |
| T9 | Vulnerable or compromised dependency | Supply chain | Frozen lockfile, `bun audit` in CI + weekly, Dependabot, actions pinned by SHA (§4.8) | CI |
| T10 | Poisoned or stale service worker | Network, old deployment | Same origin, GET only, revalidation of `sw.js` (§4.9) | `security-headers.test.ts` |

## 4. Controls in place

### 4.1 Network isolation: the "zero upload" promise

The Content-Security-Policy ([public/_headers](../public/_headers)) is the
technical proof that nothing leaves:

```
default-src 'self'; script-src 'self' <sha256 hashes> 'wasm-unsafe-eval';
style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data: blob:;
worker-src 'self' blob:; connect-src 'self' blob: data:; object-src 'none';
base-uri 'none'; frame-ancestors 'none'; form-action 'none'
```

- `connect-src 'self'`: `fetch`, XHR, WebSocket and `sendBeacon` to another
  domain are refused by the browser, **even if a malicious script managed
  to run**.
- `form-action 'none'`, `base-uri 'none'`: no exfiltration through a form
  or by hijacking relative URLs.
- No external resource (font, CDN, analytics): fonts are self-hosted
  (`@fontsource`), and the pdf.js resources are copied into `public/pdfjs/`.

**One policy per page.** Each page carries its own React Server Components
payload, so each has different inline bootstrap scripts. A single policy
listing every hash would exceed Cloudflare Pages' limit of 2,000 characters
per `_headers` line, and Cloudflare silently ignores an over-long rule, which
would leave no CSP at all. Cloudflare also joins two matching rules that set
the same header with a comma, which makes the browser enforce *both*
policies. The build ([scripts/gen-sw.mjs](../scripts/gen-sw.mjs)) therefore:

- removes the CSP from the `/*` block (which keeps every other header);
- adds one exact-path rule per page (`/`, `/fr`, `/fr/privacy`…), whose
  `script-src` lists only that page's hashes;
- groups the many guide and comparison pages into one rule per language and
  section (`/fr/guides/*`, `/fr/compare/*`), listing the hashes of those
  pages only. Each of these pages still carries its exact `<meta>` policy,
  and the browser enforces both, so a page can only run its own scripts;
- adds a strict rule with no hash at all for `/_next/*`, `/pdfjs/*` and
  `/sw.js` (scripts, the pdf.js worker and the service worker);
- fails the build if the result exceeds 100 rules or 2,000 characters per line.

`404.html` is served for unknown URLs, so no path rule matches it. It is
covered by its `<meta>` policy (below).

**Self-hosting.** `_headers` is only read by Cloudflare Pages. The build
therefore copies each page's policy into a `<meta http-equiv>` tag placed
before any script on that page ([scripts/gen-sw.mjs](../scripts/gen-sw.mjs)).
A self-hosted deployment thus keeps the network lock; only
`frame-ancestors`, HSTS and the other HTTP headers must be reconfigured on
the server (see §6).

### 4.2 Script injection (XSS)

- All untrusted data (file names, watermark text, `localStorage` values)
  goes through React rendering, which escapes HTML. The code uses neither
  `dangerouslySetInnerHTML`, nor `innerHTML`, nor `eval`, nor
  `new Function`.
- `script-src` allows **no** arbitrary inline script: at build time,
  `'unsafe-inline'` is replaced, page by page, with the sha256 hashes of the
  bootstrap scripts Next actually emitted on that page. The build fails if a `<script>` escapes
  the analysis; the static test fails if an inline script is not covered or
  if a hash is orphaned.
- `'unsafe-eval'` is absent; only `'wasm-unsafe-eval'` is granted, required
  by the WebAssembly decoders (pdf.js for JPEG 2000 and JBIG2, libheif for
  HEIC).
- `style-src 'unsafe-inline'` remains necessary (React inline styles). The
  residual risk (CSS injection) is low: with no script and no external
  connection, an injected stylesheet cannot exfiltrate anything.
- Structured data (JSON-LD, `type="application/ld+json"`) is injected into
  the exported HTML by [scripts/seo.ts](../scripts/seo.ts), not by React, so
  no `dangerouslySetInnerHTML` is needed. It is built only from constants in
  the repository, never from user input, with `<` escaped as `\u003c`. It is
  data, never executed, so the CSP doesn't apply to it.
- Preferences read from `localStorage` (language, style) are validated
  against an allowlist and bounded (`normalizeStyle`, `detectLang`); a
  forged value falls back to the defaults.

### 4.3 Parsing hostile files

- **Format allowlist** (`lib/files.ts`, `ACCEPT` and `fileKind`): PDF, PNG,
  JPEG, WebP, GIF, BMP, AVIF, and HEIC/HEIF (`image/heic`, `image/heif`,
  `image/heic-sequence`, `image/heif-sequence`, or the `.heic`/`.heif`
  extension when the type is empty or generic; see `lib/heic.ts`). SVG
  (scriptable), TIFF, office formats and any other type are refused.
- **pdf.js 6**: the code-execution path through font `eval` (the
  CVE-2024-4367 class) no longer exists; the CSP would forbid it anyway.
  pdf.js never executes a PDF's embedded JavaScript (no `pdf.scripting`),
  and the XFA engine is explicitly disabled (`enableXfa: false`).
- The PDF is parsed in a **Web Worker** isolated from the DOM.
- Canvas dimensions are capped (`fitScale`: 16.7 Mpx, 8192 px per side): an
  oversized page does not crash the tab.
- **Input caps** (`lib/watermark.ts`, `lib/image-size.ts`): 200 MB per file,
  500 pages per PDF, 250 megapixels per image. Checked before any rendering
  (size before the file is read), for every entry point.
- **Decompression bombs**: an image's dimensions are read from its header
  (PNG, JPEG, GIF, BMP, WebP — `lib/image-size.ts`) **before** any
  decoding; a few KB announcing 40,000 × 40,000 pixels are refused. For
  HEIC decoded by libheif, the dimensions are checked before the pixels are
  decoded (same 250 Mpx cap). AVIF, and HEIC decoded natively by the
  browser, have no header pre-check (see §6).
- **Format detection** (`fileKind`): MIME type first, then a closed list of
  legacy aliases, and the extension only if the type is empty or generic
  (`application/octet-stream`). An explicit type of another format (an SVG
  renamed to `.png`) is still refused.
- Read errors are converted to neutral codes (`pdf_unreadable`,
  `image_unreadable`…): no internal message is displayed.

### 4.4 Output sanitisation (anti-leak and anti-removal)

This is the central property for critical documents. **Each page is
rendered to an image, the watermark is drawn into the pixels, then the page
is re-encoded** (JPEG for a PDF, PNG for an image) into a document
**created from scratch**. Consequences, verified by the sanitisation test:

- No text layer: neither the visible text nor hidden text (white on white,
  outside the frame) can be copied or extracted.
- No original metadata: title, author, subject, keywords, XMP.
- No attachment, no JavaScript, no open action, no link, no form, no
  embedded font.
- Images: EXIF metadata (GPS, camera, date) disappears when re-encoding
  canvas → PNG.
- The watermark cannot be removed by editing the PDF: there is no
  "watermark" object to remove, only pixels.
- **Masking (redaction)**: the areas drawn on the preview are painted black
  on the rendered page, **before** the watermark and the encoding
  (`lib/masks.ts`). The masked content is not covered by a layer: it no
  longer exists in the file (no text, no original pixel). Edges are rounded
  outwards so that no sliver remains. Verified by the masking tests (engine
  and UI).
- **Target size**: the reduction (JPEG quality, then resolution) is applied
  after the watermark; it can neither remove it nor reintroduce data.

### 4.4 ter Resistance to watermark-removal tools

Public removal tools apply a few known techniques. Each one is replayed on
the engine's real output by a test bench (`e2e/removal.e2e.ts`), which
measures the share of the watermark that survives (1: intact, 0: removed)
and fails CI below a threshold.

| Technique | Countermeasure | Survival (before → after) |
| --- | --- | --- |
| Delete the watermark object from the PDF | Rasterised pages: there is no object (§4.4) | — |
| Selecting the watermark's colour | **Dark, neutral outline** around each letter: a thin dark stroke like the document's text; without the fill, the letters remain readable as hollow shapes | 0.16 → 0.40 |
| "Levels": whiten everything that is not dark | Same outline: erasing it erases the document's text | 0.16 → 0.50 |
| Median filter | Strokes and tiling thick enough | 0.89 → 0.83 |
| Multi-copy estimation (Dekel et al., CVPR 2017): median of several documents bearing the same stamp, then inversion of the alpha blending | **Layout variation on every render** (angle 45° ± 7°, tiling offset, spacing ± 15 %), drawn from `crypto.getRandomValues`: no common pattern to estimate | 0.20 → 0.98 |

The watermark covers the whole page and crosses the content (names,
amounts, IBAN): an AI erasing tool has to **reinvent** those characters,
and the reference is repeated everywhere — a single forgotten fragment
identifies the copy.

### 4.4 bis Traceable copies and recipients

- A copy's reference (5 characters, Crockford base32) is drawn from
  `crypto.getRandomValues`: unpredictable, so a third party cannot forge
  the reference of another copy.
- **Nothing is retained**: neither the recipients, nor the references, nor
  the register. The register is displayed so that the user keeps it
  themselves (copied to the clipboard on request).
- Each recipient receives a separately rendered version (different text in
  the pixels). File and folder names derived from recipients are reduced to
  letters, digits and hyphens (`recipientSlug`): no path separator, no `..`.

### 4.5 Encryption of the output file

- **AES-256, PDF 2.0 (/V 5 /R 6, /AESV3)** via `pdf-lib-encrypt`, built on
  WebCrypto. RC4 is never requested, and the library refuses to fall back
  to RC4 if WebCrypto is missing (it throws an error).
- **Review of `pdf-lib-encrypt` 1.0.3** (write path, the only one used):
  256-bit file key and random salts (CSPRNG), algorithm 2.B compliant with
  ISO 32000-2, correct `/UE`, `/OE`, `/Perms`, random IV per string and per
  stream, metadata encrypted, no object left in clear (no object streams),
  no network access or `eval`, no dependency or install script. **Gap
  fixed**: the library omits SASLprep; the application normalises the
  password to NFKC before encryption, otherwise an "é" typed in decomposed
  form (macOS) made the file impossible to open in Acrobat. Limitation
  inherent to the format: unauthenticated AES-CBC; a third party can
  corrupt the file, not read it.
- The password copied with "Copy" is **cleared from the clipboard after
  60 s** (when the user returns to the tab if it does not have focus),
  unless the user copied something else in the page in the meantime
  (`lib/clipboard.ts`).
- The "Generate" button produces **256 bits** from `crypto.getRandomValues`
  (CSPRNG), encoded as base64url (43 characters).
- A weak password (< 12 characters or < 80 estimated bits) is flagged.
- The PDF limit of 127 UTF-8 bytes is enforced without splitting a
  character.
- Passwords live only in the component's memory: never in `localStorage`,
  the URL, logs or the service worker. `autoComplete="one-time-code"`
  prevents the browser from remembering them.

### 4.6 ZIP archive

File names are reduced to their basename (no `../`) and de-duplicated
before compression (`zipDocuments`). Per-recipient folders are likewise
reduced to a single segment.

### 4.7 HTTP headers

| Header | Value | Role |
| --- | --- | --- |
| `Content-Security-Policy` | see §4.1 | Network isolation, anti-XSS |
| `Strict-Transport-Security` | 2 years, subdomains, preload | HTTPS mandatory |
| `X-Content-Type-Options` | `nosniff` | No interpretation of a file as a script |
| `X-Frame-Options` | `DENY` | Anti-clickjacking (older browsers) |
| `Referrer-Policy` | `no-referrer` | No URL passed to outbound links |
| `Permissions-Policy` | camera, microphone, geolocation, USB, serial, HID, Bluetooth, payment, Topics disabled | Least privilege |
| `Cross-Origin-Opener-Policy` | `same-origin` | Window isolation (XS-Leaks, Spectre) |
| `Cross-Origin-Resource-Policy` | `same-origin` | Resources cannot be embedded by another site |
| `Cross-Origin-Embedder-Policy` | `require-corp` | With COOP: isolated page (`crossOriginIsolated`), better protection against Spectre |
| `Cache-Control` (`/sw.js`) | `no-cache` | A fix propagates on the next visit |

Outbound links (source code, upstream projects, donations) carry
`rel="noopener noreferrer"`: they send no referrer. The one exception is the
author's name, linked to amirmoradi.com with `referrerpolicy="origin"`: it
sends only `https://cachety.com`, never a path or query. The donation link only
opens GitHub Sponsors in a new tab; the site embeds no payment form or
third-party script. No user data is ever in a URL, so nothing could leak.

Sponsored links (none today; the privacy page reserves the possibility) must
follow the same rules: an `<a>` with `rel="sponsored noopener noreferrer"`
and, at most, an image served from `'self'`. No ad network, no third-party
script, iframe or pixel, and no change to `connect-src`, `img-src` or
`script-src`. A sponsored slot never reads anything from the tool's state.

### 4.8 Supply chain

- `bun.lock` frozen (`bun install --frozen-lockfile` in CI). Bun does not
  run the `postinstall` scripts of unapproved dependencies.
- `bun audit` on every CI run **and every Monday** (scheduled trigger), so
  that a published CVE fails CI without waiting for a commit.
- Dependabot opens PRs for npm dependencies and GitHub Actions.
- GitHub Actions **pinned by commit SHA**, `permissions: contents: read`,
  `persist-credentials: false`: a compromised job has no write token.
- Bun version pinned in CI.
- No source map published.
- Deliberately few runtime dependencies: `pdfjs-dist` (Mozilla), `pdf-lib`,
  `pdf-lib-encrypt`, `fflate`, `libheif-js`, React/Next.
  `pdf-lib-encrypt` is a small, single-maintainer library: its version is
  **pinned exactly** (`1.0.3`) and any update must be reviewed (diff of the
  source code, not just the changelog).
- **`libheif-js` 1.23.5** (HEIC decoding), pinned exactly. Review:
  Emscripten wrapper of libheif (Struktur AG, the reference implementation
  of the format), actively maintained; LGPL-3.0 licence, compatible with
  the project's AGPL; no install script; neither `eval` nor `new Function`.
  The variant used (`libheif-bundle.mjs`) embeds its WebAssembly:
  Emscripten's download code is never called (and the CSP would forbid it
  outside the origin). Loaded on demand, only for the first HEIC file;
  dimensions checked before the pixels are decoded (same 250 Mpx cap).
  Rejected: `heic2any`, abandoned since 2023 and bundling an old libheif.

### 4.9 Service worker

It only handles `GET` requests **from the same origin**, and only caches
successful `basic` responses. Files dropped into the page only travel
through in-memory `File`/`Blob` objects.

**Bounded exception: sharing from a phone** (Web Share Target). The system
sends the shared files as `POST /share-target`; the service worker
intercepts this request (it never goes to the network), stores the files in
a temporary local cache (`cachety-share-inbox`, at most 50 files), then
opens `/?shared=1`. The page picks up the files and **deletes the cache
immediately**, even on error (`lib/share-inbox.ts`). Verified by the
sharing test: after loading, the cache no longer exists.

The HEIC decoder (~2 MB) is not precached: it is only downloaded (from the
origin) for the first HEIC file.

### 4.10 Local storage

`localStorage` only holds preferences: language, watermark appearance,
automatic application, target size. **No file, no watermark text, no
password.** Previews are `blob:` URLs revoked as soon as they are no longer
needed.

## 5. Security tests

Every guarantee above is covered by a test that fails if it is weakened.
The browser tests run **under the production headers**: the e2e server
replays `out/_headers` ([e2e/helpers/server.ts](../e2e/helpers/server.ts)).

| File | What is verified |
| --- | --- |
| `lib/security-headers.test.ts` | CSP directives (no external origin, no `unsafe-eval`, `object-src`/`base-uri`/`form-action`/`frame-ancestors` set to `'none'`) and hardening headers |
| `e2e/security.static.test.ts` | Real export: no `'unsafe-inline'` left in any policy; each page's `<meta>` CSP lists exactly that page's inline scripts, and its header rule lists them too (guide and comparison pages: those of their section only); no CSP on `/*` (no joined policies); a strict hash-free CSP on scripts and workers; Cloudflare limits (100 rules, 2,000 characters per line); `<meta>` before any script; no external resource; no source map |
| `e2e/ui.smoke.e2e.ts` (security) | A complete watermarking run only contacts the origin, with no CSP violation; an exfiltration attempt via `fetch` is blocked |
| `e2e/watermark.seam.e2e.ts` (sanitisation) | A hostile PDF (hidden text, Info/XMP metadata, attachment, `OpenAction` JavaScript, link) leaves **nothing** in the output; a JPEG with EXIF comes out without metadata |
| `e2e/watermark.seam.e2e.ts` (adversarial corpus) | Empty file, rotated page, oversized page: clean rejection or valid output |
| `lib/file-password.test.ts` | AES-256 /R 6, unreadable without the password, 256-bit generated secret, 127-byte limit, accented password openable (NFKC), key/salts/IV never reused |
| `lib/clipboard.test.ts` | Password cleared from the clipboard when the delay expires, or when focus returns; another copy is not overwritten |
| `e2e/watermark.seam.e2e.ts` (error contract) | Caps: > 200 MB → `file_too_large`, > 500 pages → `pdf_too_many_pages` |
| `lib/files.test.ts` | Format allowlist (SVG refused), Zip-Slip, name collisions |
| `lib/masks.test.ts`, `lib/stamp-text.test.ts` | Mask geometry; references (alphabet, unbiased randomness), safe folder names |
| `e2e/watermark.seam.e2e.ts` (masking, target size, HEIC) | No original pixel under a mask; noise compressed below the target; real HEIC decoded, fake HEIC rejected |
| `e2e/features.e2e.ts` | One file per recipient, distinct references; mask drawn in the UI; share received, then inbox emptied |
| `e2e/removal.e2e.ts` | Removal bench: colour selection, levels, 5×5 median, multi-copy estimation; survival thresholds in CI |
| `lib/image-size.test.ts` | Dimensions read without decoding; 40,000 × 40,000 bomb refused, 200 Mpx photo accepted |
| `bun audit` (CI) | No known CVE in the dependency tree |

Run everything:

```sh
bun audit                                        # known CVEs
bun test                                         # unit tests + header policy
bun run build && bun test ./e2e/security.static.test.ts
bun run test:e2e                                 # browser, under the production CSP
# Locally without Playwright's Chromium: CHROMIUM_EXE="/path/to/chrome" bun run test:e2e
```

## 6. Limits and residual risks

What the application **does not guarantee**, stated plainly:

- **A watermark is a deterrent, not DRM.** Anyone who receives the file can
  photograph it, crop it or retouch the pixels. The watermark makes reuse
  detectable and traceable; it does not prevent it. The defences in §4.4
  ter make removal costly and imperfect, not impossible: an AI erasing tool
  (inpainting, image-editing models) can repaint the page; it then has to
  reinvent the covered text, which makes the forgery unreliable. Retyping
  the document (OCR) bypasses any watermark: only verification with the
  issuer addresses that.
- **No invisible watermark.** Evaluated (trial of 2026-10-10 on the
  reference implementation of a keyed DCT mark): it survives JPEG
  re-encoding but disappears with the slightest screenshot, print to PDF,
  crop or resize (shifted 8×8 block grid), and leaves visible mottling on
  a white background. Invisible marks can moreover be erased by AI
  regeneration (Zhao et al., 2023).
- **Password protection is only as good as the password.** AES-256
  encryption is strong; a short password can be guessed offline. Prefer
  the "Generate" button and send the password through a different channel
  than the file.
- **Trust in the host.** The code is served by Cloudflare Pages; a
  compromised deployment could serve different code. The repository is
  public and the site can be self-hosted with one command (see README) for
  anyone who does not want to trust any deployment.
- **Self-hosting**: the `<meta>` CSP is present, but HTTPS, HSTS,
  `X-Frame-Options`/`frame-ancestors`, `X-Content-Type-Options`,
  `Referrer-Policy`, `Permissions-Policy` and COOP/CORP must be configured
  on the server, based on `out/_headers`.
- **Resource exhaustion**: files, pages and pixels are capped (§4.3). An
  AVIF image has no header reading: its dimensions are left to the
  browser's decoder. The same applies to a HEIC file when the browser
  decodes it natively (Safari): `createImageBitmap` is tried first, and the
  250 Mpx check only runs in the libheif fallback. The impact of a failure
  stays local to the tab.
- **Compromised device**: browser extensions, spyware and software reading
  the clipboard are out of scope. The copied password is cleared from the
  clipboard after one minute (§4.5), but spyware can read it before then.
- **Trusted Types not enabled.** Tried (`require-trusted-types-for
  'script'`): it breaks the application, because Next's module loader and
  the creation of the pdf.js Worker write to protected sinks. Enabling it
  would require a default policy covering these internal components. The
  risk covered (DOM XSS) is already greatly reduced: no `innerHTML` in the
  code, hash-based CSP, no external connection possible.

## 7. Checklist for every contribution

Before merging a PR:

- [ ] No request, font, image or script to an external domain.
- [ ] No `dangerouslySetInnerHTML`, `innerHTML`, `eval`, `new Function`.
- [ ] `public/_headers` not weakened (otherwise: justification + update of
      this document).
- [ ] No user data (file, text, password) in `localStorage`, the URL, logs
      or the service worker.
- [ ] A new dependency is justified, maintained and reviewed; an update of
      `pdf-lib-encrypt` is reviewed line by line.
- [ ] A new input format goes through the allowlist and the rasterisation
      pipeline (no copying of objects from the original document).
- [ ] `bun audit`, `bun test` and `bun run test:e2e` are green.
