# PRD — Cachety Sign: sign a PDF without it ever leaving your device

| | |
| --- | --- |
| Status | Draft v1 — 2026-10-17 |
| Owner | Amir Moradi |
| Target | Ship on cachety.com in the week of 2026-10-19 → 2026-10-25 |
| Repo | `cachety/cachety` (this file lives at `docs/prd-sign.md`) |
| Related | `docs/security.md`, `ROADMAP.md`, `CONTRIBUTING.md` |

> **One-line pitch.** Draw, type or upload your signature, place it on any PDF or photo, download a flattened, metadata-free PDF. Nothing is uploaded: the page is technically forbidden from contacting any other site, exactly like the watermark tool.

---

## 0. How to use this document in Cursor

- Sections 5 (functional spec), 6 (architecture) and 9 (implementation plan) are the ones to feed to the agent, one work package at a time. Each work package in §9 lists the files it touches and its acceptance tests.
- Section 10 (copy, FR + EN) is meant to be pasted into `lib/i18n.tsx` and `lib/locales/<lang>/strings.ts` as-is, then translated to the other 9 languages. The structure tests (`lib/i18n.test.ts`) will fail until all 11 languages carry the new keys — that is intended.
- Anything marked **Must** is launch-blocking. **Should** is in scope if Thursday evening is reached with Must done. **Could** is explicitly deferred to v1.1 and must not be started during the launch week.
- The ground rules in `CONTRIBUTING.md` and the guarantees in `docs/security.md` apply unchanged. A change that weakens any control must say so explicitly and update `docs/security.md`.

---

## 1. Why this feature, why now

The watermark tool landed on LinkedIn because it had four properties at once: an everyday pain that everyone recognises, a single verifiable promise ("airplane-mode test"), a French/sovereignty angle against incumbents that upload your files, and a live URL people could try in ten seconds.

Signing a PDF has the same shape, with a bigger daily volume:

- Bail (lease), état des lieux, attestation sur l'honneur, attestation d'hébergement, devis, mandat, contrat de prestation, autorisation parentale, documents d'école and d'association, procès-verbal, lettre de résiliation.
- The usual path today is Yousign/DocuSign (account, upload, cost) or iLovePDF/Smallpdf/Adobe online (upload). Many people print, sign, photograph and send a JPEG.
- A hand-drawn signature placed on the document is what is commonly called a *signature électronique simple* (the word "simple" is industry usage, not a legal term): under eIDAS art. 25 a court cannot deny it legal effect or admissibility as evidence solely because it is electronic, and it is what most of the documents above actually need. The tool must say so plainly, and say equally plainly when it is **not** enough (see §4.3).

Strategically, this is the second product of the "nothing leaves your device" family, built on the same codebase so it inherits the CSP lock, the exfiltration tests, the sanitisation pipeline and the eleven languages. It compounds the brand instead of starting a new one.

## 2. Goals and non-goals

### Goals (v1)

1. A person with a PDF (or a photo of a document) can sign it on cachety.com in under a minute, on phone or computer, with no account and no upload.
2. The output is a PDF whose pages are flattened pixels: the signature cannot be lifted off as a layer, and the original's hidden data (text layer, metadata, EXIF/GPS, attachments, JavaScript, links) is gone — the same guarantee as the watermark output.
3. Every guarantee is verified by automated tests, like the rest of the project.
4. The tool is honest about legal value: it explains what a simple electronic signature is worth and when a qualified signature is required.
5. Shipped in all 11 languages, right-to-left included, with at least two practical guides at launch.

### Non-goals (v1 — do not build)

- No advanced or qualified electronic signature, no certificate, no PAdES, no timestamp authority, no identity verification. We never claim any of these.
- No multi-party workflow (sending for signature, tracking who signed, reminders). There is no server; there will be none.
- No persistent storage of the signature by default (see §5.4 for the opt-in decision, deferred).
- No PDF form filling, no text editing of the document, no annotation beyond the signature block.
- No keeping of the original vector pages (searchable text). v1 rasterises everything, like the watermark tool. This is a deliberate, documented trade-off (§4.2).

## 3. Users and jobs to be done

| User | Situation | Job |
| --- | --- | --- |
| Tenant / job seeker (primary) | Agency sends a PDF to sign and return by email | "Sign this and send it back now, from my phone, without creating an account or printing." |
| Parent / volunteer | School or association form, autorisation parentale, attestation | "Sign, date, add 'lu et approuvé', done." |
| Freelancer / small business | Devis or contrat de prestation to return to a client | "Sign and initial each page, lock it with a password, keep a fingerprint of what I sent." |
| Person with a paper document | Already printed, needs a signed copy | "Photograph it, sign on the photo, get a clean PDF." |
| Letting agency / HR platform (partner, later) | Wants candidates to sign on their own site | Embed, v1.1 — out of scope for launch week. |

Accessibility: the signature editor must be fully keyboard-operable (place, move, resize, delete), like `MaskEditor`. Drawing itself requires a pointer; the "type your name" path is the keyboard-accessible alternative and must always be offered.

## 4. Product principles and decisions

### 4.1 Same promise, same proof

The page is served under the same CSP (`connect-src 'self'`, `form-action 'none'`, hash-based `script-src`). The airplane-mode test paragraph appears on the sign page too. No new storage beyond display preferences.

### 4.2 Flattened output (decision)

The signed PDF is rebuilt from pixels, page by page, exactly like the watermark output: `pdf.js → canvas → [masks] → signature overlay → JPEG → pdf-lib`. Consequences, all accepted for v1:

- Text is no longer selectable in the signed copy. The counterparty already has the original; the signed copy is the copy that matters, as an image.
- File size follows the watermark tool's budget ladder ("Make it smaller" works unchanged).
- Signature integrity: the signature is part of the page image; it cannot be moved, deleted or re-used by editing the PDF (same as T5 in `docs/security.md`).

A "keep original pages, overlay only" mode is a **Could** for v1.1 (it would keep text searchable but reintroduce the hidden-data leakage problem, so it needs its own sanitisation pass). Do not build it now.

### 4.3 Legal honesty (decision)

The page carries a short, plain-language section (§10.6) stating that:

- a signature drawn or typed and placed on the document is what is commonly called a *simple electronic signature* (eIDAS, Regulation (EU) 910/2014 as amended by 2024/1183, art. 25(1): a court cannot deny it legal effect or admissibility as evidence solely because it is electronic);
- under French law (Code civil art. 1367) a signature identifies its author and shows their consent, and an electronic one must rely on a reliable process linking it to the document; only a *qualified* signature benefits from a presumption of reliability (décret n° 2017-1416) and is equivalent to a handwritten one (eIDAS art. 25(2)). An image of a signature (scanned or pasted) is not by itself an art. 1367 electronic signature: it counts if nobody disputes it, but carries little weight if disputed (Cass. soc. 14 déc. 2022 n° 21-19.841; Cass. com. 13 mars 2024 n° 22-16.487). In a dispute, whoever relies on the document must prove who signed it;
- it is usually accepted for everyday documents (lease and rental paperwork, attestations, quotes, school and association forms), and **not** the right tool when a qualified signature is required, when the law requires a handwritten statement (personal guarantee, IOU: Code civil art. 1376), for wills and family or succession acts (art. 1175), for notarial deeds, or when the other party imposes a specific platform (some loan and insurance contracts, certain public procedures: the platform is their choice, not a legal requirement).
- the mention presets ("Lu et approuvé", "Bon pour accord") have no legal value of their own (Cass. 1re civ. 27 janv. 1993 n° 91-12.115); a one-line hint under the presets says so (`block.mentionHint`).

Wording checked against primary sources on 2026-10-17 (eIDAS consolidated text, Code civil, décret 2017-1416, the Cour de cassation decisions above, service-public.gouv.fr A17339).

This is the only place in the product where we talk about law; it must be factual, hedged ("this is not legal advice") and translated with care. Native-speaker review is required before launch for FR and EN; the other languages may carry the English wording with a one-line note until reviewed (same backlog item as the existing wording review).

### 4.4 Signature privacy (decision)

The signature image exists only in memory. It is not written to `localStorage`, not cached by the service worker, not kept in a `Blob` URL after the page is left. "Remember my signature on this device" is a **Could** (opt-in, with a clear sentence about what is stored); not in v1.

### 4.5 One brand, one codebase, one new route

The feature ships as a second mode of Cachety at `/<lang>/sign`, not as a separate product. Shared header, footer, language switch, drop zone, document list, preview, password lock, size budget, download/bundle code. The home page and the sign page cross-link.

## 5. Functional specification

The flow keeps Cachety's three-step structure so the existing step bar, tour and phone layout apply with minimal change.

### Step 1 — Your documents

Identical to the watermark tool: drop zone (click, drag, paste, Android share target), PDF and images (JPG, PNG, WebP, GIF, BMP, AVIF, HEIC), several files at once, same limits (200 MB per file, 500 pages), locked PDFs unlocked in the list, drag-to-reorder. Reuse `DocList`, `Doc`, `useDragReorder`, `takeSharedFiles`.

Differences:

- Output is always a PDF (an image becomes a one-page PDF). The PNG/JPG output branch is not offered.
- The "Hide something" (mask) tool stays available in Step 3's preview: people often need to black out a line before signing a copy. **Should**, because it is already built; cost is wiring only.

### Step 2 — Your signature

A `SignaturePad` panel with three tabs. The result of each tab is the same object: a trimmed, transparent PNG with a known aspect ratio (`SignatureImage`, §6.2).

**2a. Draw (default on touch devices)**

- Canvas sized to the panel width, 3:1 aspect, white background with a faint baseline. Pointer events only (`pointerdown/move/up`, `getCoalescedEvents` where available, `touch-action: none`), drawn at `devicePixelRatio` so lines are crisp on export.
- Stroke: round caps and joins, width 2.5 CSS px, quadratic-Bézier midpoint smoothing. No pressure, no velocity-based width in v1.
- Buttons: Clear, Undo (last stroke). Ink colour: black (default) or dark blue.
- On commit (leaving the tab, or at first placement), the drawing is trimmed to the ink bounding box plus 6 % padding, and rasterised to a transparent PNG at least 1200 px wide (upscaled if the pad was smaller), so a signature placed at 30 % of an A4 page at 2× stays sharp.
- Empty canvas = no signature; Step 3 is unreachable until one exists (same `reachable()` pattern as `meaningful` today).

**2b. Type (default on desktop keyboard focus, and the accessible path)**

- One text field: the name as it should appear. Rendered in a handwriting-leaning self-hosted font. We have no script font in `@fontsource` today; **decision:** v1 uses the existing serif in italic at large size (no new dependency, no external font). Adding a self-hosted script font is a **Could** (check licence, add to `scripts/fonts.mjs`, keep `font-src 'self'`).
- Ink colour: black or dark blue. Output is the same trimmed transparent PNG.

**2c. Upload (an image of a signature)**

- Accept PNG, JPG, WebP, HEIC (through the existing `heicBitmap` path). Same pixel-count cap (`MAX_IMAGE_PIXELS`) and the same header pre-check as images in the watermark engine.
- Background removal, on by default: pixels with luminance above a threshold become transparent; threshold slider 150–240 (default 200). Preview updates live. Toggle "Keep the background" for pre-cut PNGs.
- Ink: "Keep original colours" (default) or recolour to black / dark blue (all opaque pixels set to the chosen colour, alpha kept).
- Then trimmed exactly like 2a.

**2d. Details under the signature (optional, one block)**

A small text block rendered below the signature, in the page's language, from three optional inputs:

- Date: on by default, today in the page locale's short date (reuse `today()` and the locale's date format).
- Place: free text ("Fait à Paris").
- Mention: free text with language-specific presets, e.g. FR "Lu et approuvé", "Bon pour accord"; EN "Read and approved", "Agreed". Presets are plain strings in i18n.

Rendered as one or two lines in the sans font, dark grey, sized relative to the signature width. Part of the same overlay image so placement is one gesture.

### Step 3 — Place, check, download

**3a. Placement editor (`SignatureEditor`)**

- Built on the `MaskEditor` interaction model: an absolutely-positioned box over the page preview, in normalised page coordinates (`0..1`, page space, so RTL layout does not flip anything).
- Default placement on first entry: bottom-right of the **last** page, width 28 % of page width, 6 % margin from the right and bottom edges (the most common signature spot on French forms and contracts). Aspect ratio locked to the signature image.
- Gestures: drag to move; corner handle to resize (ratio locked); `×` to remove. Keyboard: Tab to the box, arrows move by 1 %, Shift+arrows by 5 %, `+`/`-` resize, Delete removes. Same key step constants as `MaskEditor` (`KEY_STEP`).
- Page navigation: the existing previous/next page controls. The signature can be placed on any previewed page (first 12 pages are previewed today — `PREVIEW_MAX_PAGES`). For documents longer than that: **Must** raise `PREVIEW_MAX_PAGES` behaviour for the sign mode so the *last* page is always previewable (render previews for the first 11 pages plus the last page, and label the gap), because the last page is where signatures go. Implementation detail in §6.4.
- "Also initial every page" toggle (**Should**): places a copy of the signature at 16 % width at the bottom-right of every page except the signature page. One toggle, no per-page editing in v1.
- Several placements on one document (two signatures, signature + initials in a different spot): **Could**. v1 allows one signature placement plus the optional initials toggle.
- Multiple documents: the placement is per document. A document with no placement is not rendered as "ready"; the list shows "Place your signature" as its attention state (reuse the `needsAttention` pattern with a new reason).

**3b. Preview**

The real engine output (page re-rendered with the overlay), shown as today. Changing the placement re-renders only that document, debounced; the existing in-flight/abort queue in `CoreProduct` is reused (the overlay is part of the stamp key, §6.3).

**3c. Download options (reuse)**

- Lock with a password: identical to today (`FilePassword`, 12-word passphrase by default, AES-256). Default **off** for signing (the counterparty must be able to open it; the watermark tool's default should not be copied blindly — check what it is today and keep the sign default off).
- Make it smaller: identical (`SizeTargetMb` ladder).
- Single PDF in chosen order, or ZIP: identical (`combineAsPdf`, `zipDocuments`).
- Output file name: `<original>-signed.pdf` (i18n `sign.suffix`, ASCII — enforced by `lib/i18n.test.ts`).

**3d. Fingerprint (Should)**

After download, show the SHA-256 of each produced file (`crypto.subtle.digest`), with one sentence: "Keep this fingerprint. If a different version of the document ever turns up, you can show it is not the one you signed." Copy button. Not stored. This is cheap, useful, and reinforces the honesty section without over-claiming.

### Watermark on top (Should)

A single checkbox in Step 3: "Also add a watermark (purpose, recipient, date)". When ticked, the standard Step 2 stamp fields of the watermark tool appear inline (purpose, one recipient) and the engine draws the watermark after the signature overlay. This reuses `composeSimple` and the existing style. It is a cross-sell between the two tools and a real need (a signed ID-card-attached lease). If it threatens the Friday date, it is the first thing to cut.

### Help and content

- `HelpTour` gets a sign-mode variant with three stops (drop, sign, place). **Should**.
- Two guides at launch (**Must**), FR and EN written by hand, the other nine languages drafted and flagged for native review (existing backlog item):
  - `sign-a-lease-or-rental-document` (topic `rental` already exists; add topic `sign`)
  - `sign-a-pdf-on-your-phone` (topic `phone`)
  Guides must satisfy `lib/guides/guides.test.ts` (slug rules, 60/155-char meta limits, steps + FAQ, no links in text, hreflang alternates pointing to existing guides).
- Comparison pages: **Could** for launch (Yousign, DocuSign, Adobe Fill & Sign, iLovePDF Sign, Smallpdf eSign). Each must cite the vendor page with a `checked` date and say when the other tool is the better choice (always, when a qualified signature is needed). Do these in the week after launch, not before.
- Roadmap: add a `sign` entry to `lib/roadmap/*` as `shipped` on launch day, and the deferred items (`remember-signature`, `keep-vector-pages`, `sign-embed`) as `idea`.

## 6. Architecture and code changes

### 6.1 Routes and pages

| Route | File | Notes |
| --- | --- | --- |
| `/<lang>/sign` | `app/[lang]/sign/page.tsx` | Static, `generateStaticParams` over `LANG_CODES`, `dynamicParams = false`, metadata from `SIGN_META`. Mirrors `app/[lang]/about/page.tsx`. |
| `/sign` | `app/sign/page.tsx` | Language-detecting redirector like `app/about/page.tsx`. |
| `/embed/<lang>/sign` | — | Not in v1. |

`components/SignApp.tsx` mirrors `HomeApp.tsx`: `LangProvider`, `Header`, `<CoreProduct mode="sign" />`, a `SignLanding` with the legal section and FAQ, `Footer`.

Site plumbing to update (each has a test that will catch an omission):

- `lib/site-meta.ts`: `SIGN_META`, `SIGN_ALTERNATES` (`pageAlternates("/sign", true)`), used by `generateMetadata`.
- `scripts/seo.ts`: sitemap entries for `/sign` and `/<lang>/sign`; JSON-LD `SoftwareApplication`/`WebPage` block like the home page.
- `scripts/gen-sw.mjs`: the `LANG_ABOUT` route regex becomes `^/(lang)/(about|sign)\.html$` so the sign page is precached and works offline.
- `components/SiteNav.tsx`: new `NavKey` `"sign"` between tool and guides; `lib/site-copy.ts` nav labels.
- `public/og/`: v1 reuses the language OG image; a dedicated `sign-<lang>.png` from `scripts/og.ts` is a **Could**.
- `e2e/security.static.test.ts` must keep passing: one CSP per page, hash-only `script-src`, no external resource. Nothing in this feature introduces an inline script or an external asset; if the build emits a new inline chunk, the hash is generated by the existing pipeline.

### 6.2 New modules (`lib/`)

```ts
// lib/signature.ts — pure image processing, testable in Bun with ImageData-like inputs
export type SignatureImage = {
  /** Transparent PNG bytes, trimmed to the ink. */
  png: Uint8Array;
  width: number;   // px
  height: number;  // px
  /** Décodée à la demande pour le rendu ; jamais persistée. */
};
export const SIGNATURE_MIN_WIDTH = 1200;          // px, export resolution of the pad
export const INK = { black: "#111111", blue: "#1b3a8a" } as const;
export type InkId = keyof typeof INK;

/** Pixels plus clairs que `threshold` (luma 0..255) deviennent transparents. */
export function removeBackground(data: ImageData, threshold: number): ImageData;
/** Tous les pixels opaques prennent la couleur donnée ; l'alpha est conservé. */
export function recolor(data: ImageData, hex: string): ImageData;
/** Boîte englobante des pixels non transparents, avec marge relative. */
export function inkBounds(data: ImageData, alphaMin?: number, pad?: number): { x: number; y: number; w: number; h: number } | null;
export function trim(data: ImageData, pad?: number): ImageData;
export async function toPng(data: ImageData): Promise<Uint8Array>;   // canvas, browser only
export async function fromFile(file: File): Promise<ImageData>;       // uses heicBitmap + imageSize guards
```

```ts
// lib/overlays.ts — geometry, mirrors lib/masks.ts
export type OverlayRect = { x: number; y: number; w: number; h: number }; // normalised, page space
export type Overlay = { rect: OverlayRect; image: "signature" | "initials" };
export type PageOverlays = Record<number, Overlay[]>;
export const DEFAULT_SIGNATURE_WIDTH = 0.28;
export const DEFAULT_INITIALS_WIDTH = 0.16;
export const EDGE_MARGIN = 0.06;
export function defaultPlacement(pageAspect: number, imageAspect: number, width?: number): OverlayRect; // bottom-right
export function moveRect / resizeKeepingRatio / clampToPage(...)
export function overlaysKey(o: PageOverlays | undefined): string;  // participates in the stamp key
export function paintOverlays(ctx, width, height, overlays: Overlay[] | undefined, images: { signature: ImageBitmap; initials?: ImageBitmap }): void;
```

```ts
// lib/sign-block.ts — the date/place/mention lines under the signature
export function composeSignBlock(parts: { date?: string; place?: string; mention?: string }, t: Strings): string[]; // 0..2 lines
export async function composeSignatureWithBlock(sig: SignatureImage, lines: string[], ink: InkId): Promise<SignatureImage>;
```

### 6.3 Engine change (`lib/watermark.ts`)

Minimal and backward compatible:

- `RenderOptions` gains `overlays?: PageOverlays` and `overlayImages?: { signature: ImageBitmap; initials?: ImageBitmap }`.
- In both `watermarkPdf` and `watermarkImage`, after `paintMasks(...)` and before `drawWatermark(...)`: `paintOverlays(ctx, canvas.width, canvas.height, overlays?.[pageIndex], overlayImages)`. Order matters: masks remove, overlay adds, watermark (if any) goes over everything so it is not easier to remove than the signature.
- `drawWatermark` already returns when `text.trim()` is empty, so sign mode passes `""` when the watermark checkbox is off. No branch needed.
- Add `forcePdf?: boolean` to `RenderOptions`: `watermarkImage` wraps its PNG/JPG result into a one-page PDF (move `imageToPdf` from `lib/file-password.ts` to `lib/files.ts` and export it) so the result `extension` is always `"pdf"` in sign mode.
- Keep the function name `watermarkFile`; export an alias `renderFile = watermarkFile` and use the alias in sign code so the intent reads correctly. Renaming the engine is not worth the diff.
- The overlay bitmap is drawn with `ctx.drawImage(image, x, y, w, h)` after `ctx.imageSmoothingQuality = "high"`. Because the PNG is ≥ 1200 px wide and pages render at 2× (`RENDER_SCALE`), a 28 %-wide placement on A4 (≈ 1190 px at 2×) never upscales.

Stamp key: `CoreProduct` builds `stamp` from `stampKey(previewText, style)` + size. In sign mode it must also include `overlaysKey(doc.overlays)` and a hash of the signature bytes (first 16 hex chars of SHA-256, computed once per `SignatureImage`), so a redraw of the signature or a move re-renders, and nothing else does. `unlockKey` already includes `masksKey`; add `overlaysKey` next to it, per document.

### 6.4 Previews beyond page 12

`PREVIEW_MAX_PAGES = 12` previews the first 12 pages. For signing, the last page matters most. Change `watermarkPdf` to accept `previewPages?: (pageCount: number) => number[]` in `RenderOptions` (default: first 12). Sign mode passes "first 11 and the last". The preview strip shows a "pages 12–N not shown" separator. `MaskEditor`'s `maskable` logic already handles non-previewed pages; `SignatureEditor` follows it.

### 6.5 Components

| Component | Role | Based on |
| --- | --- | --- |
| `components/CoreProduct.tsx` | Gains `mode: "watermark" \| "sign"` (default `"watermark"`). Step 2 renders `StampDetails` or `SignaturePad`; Step 3 wraps the preview in `SignatureEditor` instead of/alongside `MaskEditor`; bundle code forces PDF. Keep the diff additive; do not fork the component. | — |
| `components/SignaturePad.tsx` | Tabs Draw / Type / Upload, ink colour, details block inputs. Emits `SignatureImage \| null`. | `FilePassword` for tab/toggle patterns |
| `components/SignatureEditor.tsx` | Placement overlay on the preview, keyboard + pointer. | `MaskEditor` (copy, do not generalise yet) |
| `components/SignLanding.tsx` | Below-the-tool content: promise, how it works, legal section, FAQ, guides teasers. | `Landing` |
| `components/Fingerprint.tsx` (Should) | SHA-256 list after download, copy buttons. | `DonePanel` |

State added to `Doc` (`lib/doc.ts`): `overlays?: PageOverlays`. State added to `CoreProduct` (sign mode only): `signature: SignatureImage | null`, `ink: InkId`, `block: { date: boolean; place: string; mention: string }`, `initials: boolean`, `withWatermark: boolean`.

### 6.6 i18n

- New namespace `t.sign` in `BASE_STRINGS` (fr, en, ja, zh in `lib/i18n.tsx`) and in each `lib/locales/<lang>/strings.ts`. Keys listed in §10. `lib/i18n.test.ts` enforces identical key sets across the 11 languages and ASCII filename suffixes.
- Site copy for the landing and nav: `lib/site-copy.ts` + `lib/locales/<lang>/site.ts` (`lib/site-copy.test.ts` enforces structure).
- Page meta: `lib/site-meta.ts` + `lib/locales/<lang>/meta.ts`.
- RTL: only logical Tailwind classes; the placement box uses page coordinates so it does not flip (same as masks).

### 6.7 Security model updates (`docs/security.md`)

Add to the document (it is the review reference):

- §1 assets: "Signature image (drawn, typed or uploaded)": confidentiality — memory only, never persisted, never transmitted; the blob is revoked when the page unloads or the signature is replaced.
- §2 attack surface: one new decoder path — uploaded signature images go through the same `createImageBitmap`/libheif path with the same pixel cap and header pre-check as document images. No new library.
- §3 threats: T4/T5 unchanged and now also cover the signature (it is pixels in the page). New line **T11**: "Reuse of the signature by a recipient (cut out of the signed copy and pasted elsewhere)". Controls: the legal section and FAQ say this risk exists with any image signature, including paper scans; the "also add a watermark" option ties the copy to a purpose/recipient; initials on each page make page substitution visible. Verification: copy present (`site-copy.test.ts`), none technical — we do not claim to prevent it.
- §4.1 unchanged; the sign page carries the same CSP `<meta>` and is covered by `ui.smoke.e2e.ts` (zero off-origin requests, exfiltration attempt blocked) — add `/en/sign` to the routes that test walks.
- §5 limits: state plainly that this is a simple electronic signature, with no certificate and no timestamp, and that the tool does not prove who signed.

## 7. Data, privacy and storage

| Data | Where | Lifetime |
| --- | --- | --- |
| Documents | memory (`File`/`Blob`) | until removed or tab closed (unchanged) |
| Signature image | memory (`Uint8Array` + one `ImageBitmap`) | replaced or tab closed; bitmap `.close()` on replace |
| Placement rects | React state | tab lifetime |
| Ink colour, last tab used, "date on" toggle | `localStorage` display prefs via `lib/storage.ts` | persistent, non-sensitive, same category as watermark style |
| Name typed in "Type" tab | memory | **not** stored (it is a name) |
| Place / mention text | memory | not stored |
| Fingerprints | shown once | not stored |

No cookies, no analytics, no new network request, no new origin. The service worker precaches the sign page like the others; it never caches `blob:` data.

## 8. Edge cases and error handling

- Rotated PDF pages (`/Rotate 90/270`): pdf.js viewport handles orientation; placement is in rendered-page space, so "bottom-right" is bottom-right as displayed. Test with a landscape and a rotated fixture.
- Mixed page sizes: placement is per page in normalised coordinates; the initials toggle uses each page's own size.
- Very small pages (receipts) and very large (A2 plans): width % keeps the signature proportional; enforce a minimum rendered width of 120 px at 2× so a signature never degrades to a smudge; warn if the page would make it smaller.
- Signature uploaded as a dark photo: background removal with threshold 200 leaves the photo mostly opaque; the preview makes this obvious and the slider goes down to 150; the FAQ says "photograph on white paper, in daylight".
- Huge signature upload: same `MAX_IMAGE_PIXELS` guard and `image_too_large` error key; reuse existing error strings.
- Locked PDF: unlock in the list, then sign (unchanged flow).
- 500-page document with initials on every page: render time is the existing per-page cost plus one `drawImage`; progress bar unchanged. No new limit.
- Leaving Step 2 without a signature: Step 3 is unreachable; the step label shows the "Draw, type or upload your signature" hint (same `active` logic as `meaningful`).
- Browser without `PointerEvent` coalescing: fall back to plain `pointermove` (Safari supports both since 2023; Firefox ESR supports coalesced events).
- Phone in landscape with the keyboard open (Type tab): the pad must not reflow under the keyboard; test on iOS Safari and Chrome Android in `ui.smoke.e2e.ts` at phone viewport.

## 9. Implementation plan (launch week)

Work packages are independent enough to run two Cursor sessions in parallel where marked ∥. Each package lists the files and the test that proves it. Keep one pull request per package.

### WP0 — Branch and skeleton (Sun 19, 1 h)

- Branch `feat/sign`. Add this PRD at `docs/prd-sign.md`.
- `lib/overlays.ts`, `lib/signature.ts`, `lib/sign-block.ts` with types and `TODO` bodies; `lib/overlays.test.ts`, `lib/signature.test.ts` with the test names from §11 marked `test.todo`.
- Done when: `bun test` runs with the new `todo` tests listed and stays green.

### WP1 — Engine: overlays in the render pipeline (Mon 20, half day) ∥

- `lib/overlays.ts` geometry + `paintOverlays`; `lib/watermark.ts` `RenderOptions.overlays/overlayImages/forcePdf/previewPages`; move and export `imageToPdf`.
- Tests: `lib/overlays.test.ts` (geometry); `e2e/watermark.seam.e2e.ts` new cases (§11.2) using `e2e/helpers/engine.ts` with a 1×1-pixel-meaningful overlay fixture.
- Done when: a signed fixture PDF has the overlay pixels at the expected spot on page N, no text layer, no metadata, and the image-input path returns `extension: "pdf"`.

### WP2 — Signature image processing (Mon 20, half day) ∥

- `lib/signature.ts`: `removeBackground`, `recolor`, `inkBounds`, `trim`, `toPng`, `fromFile`.
- Tests: pure functions on synthetic `ImageData` in Bun (no canvas needed): threshold behaviour, alpha preservation on recolor, bounds with padding, empty image → `null`.
- Done when: unit tests green; `toPng` verified in the browser seam test (PNG decodes, has alpha).

### WP3 — SignaturePad component (Tue 21) ∥

- Draw / Type / Upload tabs, ink colour, details block, undo/clear, commit to `SignatureImage`.
- Strings: `t.sign.pad.*` in all 11 languages (English fallback allowed for the 7 locale files on day one, replaced by Thursday).
- Tests: `ui.smoke.e2e.ts` draws a stroke with `page.mouse`, asserts a non-empty signature; Type tab with a name; Upload with a fixture JPG of a signature on paper.
- Done when: all three tabs produce a trimmed transparent PNG and the Step 3 button becomes reachable.

### WP4 — Route, CoreProduct sign mode, SignatureEditor (Tue 21 → Wed 22)

- `app/[lang]/sign/page.tsx`, `app/sign/page.tsx`, `components/SignApp.tsx`, `components/SignLanding.tsx` (content can be placeholder until WP6).
- `CoreProduct` `mode` prop; `SignatureEditor`; `Doc.overlays`; stamp key extension; previews "first 11 + last"; force PDF in bundling; `-signed` suffix.
- `lib/site-meta.ts`, `scripts/seo.ts`, `scripts/gen-sw.mjs`, `SiteNav`.
- Tests: `e2e/security.static.test.ts` and `e2e/site-meta.static.test.ts` pass on the new routes; `ui.smoke.e2e.ts` end-to-end: drop PDF → draw → place → download; the downloaded file opens with pdf-lib, has N pages, no `/Info` author, no text content; zero off-origin requests on `/en/sign`.
- Done when: the full flow works on desktop and at phone viewport in Chromium, Firefox and WebKit (CI matrix).

### WP5 — Download extras (Wed 22, half day)

- Initials toggle (**Should**), fingerprint panel (**Should**), "also add a watermark" checkbox (**Should**, cut first if late). Password lock default off in sign mode.
- Tests: seam test for initials on every page; unit test for the fingerprint helper; e2e for the watermark checkbox producing a stamp on the page.

### WP6 — Content and copy (Wed 22 → Thu 23)

- Landing copy, legal section, FAQ in FR and EN by hand; the 9 other languages drafted; nav labels; page meta; two guides; roadmap entries; README section "Sign a document" in `README.md` and `README.fr.md` (others: one line + link).
- Tests: `site-copy.test.ts`, `guides.test.ts`, `roadmap.test.ts`, `text-hygiene.test.ts`.
- Done when: all content tests pass and FR/EN legal text has been reviewed by a second reader.

### WP7 — Security doc, OG, release (Thu 23 → Fri 24 morning)

- `docs/security.md` updates (§6.7). `SECURITY.md` unchanged.
- `bun run build && bun run test:e2e`; `bun run screenshot` for a second README image (`docs/preview-sign.png`); OG image reuse decision recorded.
- Deploy with the existing `deploy` script; smoke-test the airplane-mode claim manually on iPhone and Android.
- Tag `v1.1.0` (the project is at `1.0.0`; signing is a minor, not a major).

### Friday 24 — Launch

- LinkedIn post (FR, then EN in comments or a second post), the same structure that worked: the pain, the one promise, the airplane-mode test, the honesty paragraph about *signature simple* vs qualified, the link.
- GitHub release notes; roadmap page shows `sign` as shipped.

## 10. Copy (FR and EN) — paste-ready

Keys are given as they should appear under `t.sign`. Plain words, short sentences, no jargon, no promise the code does not keep. Other languages: translate from EN, keep the same structure.

### 10.1 Navigation and page meta

```
nav.sign              FR "Signer"                       EN "Sign"
meta.title            FR "Signer un PDF gratuitement, sans l'envoyer nulle part"
                      EN "Sign a PDF for free, without uploading it"
meta.description      FR "Dessinez, tapez ou importez votre signature et posez-la sur un PDF ou une photo. Tout se passe dans votre navigateur : aucun fichier n'est envoyé. Gratuit, sans compte, open source."
                      EN "Draw, type or upload your signature and place it on a PDF or a photo. Everything happens in your browser: no file is uploaded. Free, no account, open source."
```

### 10.2 Hero

```
hero.title            FR "Signez un document sans l'envoyer nulle part"
                      EN "Sign a document without sending it anywhere"
hero.lead             FR "Bail, attestation, devis, autorisation : signez en quelques secondes. Le document reste sur votre appareil du début à la fin."
                      EN "Lease, attestation, quote, consent form: sign in seconds. The document stays on your device from start to finish."
hero.badges           FR ["Gratuit", "Sans compte", "Rien n'est envoyé", "Fabriqué en France"]
                      EN ["Free", "No account", "Nothing uploaded", "Made in France"]
```

### 10.3 Steps

```
step1                 FR "Vos documents"                EN "Your documents"
step2                 FR "Votre signature"              EN "Your signature"
step3                 FR "Placez, vérifiez, téléchargez" EN "Place, check, download"
stepShort             FR ["Documents", "Signature", "Télécharger"]   EN ["Documents", "Signature", "Download"]
```

### 10.4 Signature pad

```
pad.draw              FR "Dessiner"      EN "Draw"
pad.type              FR "Taper"         EN "Type"
pad.upload            FR "Importer"      EN "Upload"
pad.drawHint          FR "Signez ici avec le doigt, le stylet ou la souris."
                      EN "Sign here with your finger, a stylus or the mouse."
pad.clear             FR "Effacer"       EN "Clear"
pad.undo              FR "Annuler le dernier trait"   EN "Undo last stroke"
pad.typeLabel         FR "Votre nom, tel qu'il doit apparaître"
                      EN "Your name, as it should appear"
pad.typeHint          FR "Il n'est pas enregistré."   EN "It is not saved."
pad.uploadHint        FR "Une photo de votre signature sur papier blanc, ou une image déjà détourée."
                      EN "A photo of your signature on white paper, or an already cut-out image."
pad.removeBg          FR "Retirer le fond"             EN "Remove the background"
pad.threshold         FR "Sensibilité"                 EN "Sensitivity"
pad.ink               FR "Encre"                       EN "Ink"
pad.inkBlack          FR "Noire"                       EN "Black"
pad.inkBlue           FR "Bleue"                       EN "Blue"
pad.inkKeep           FR "Couleurs d'origine"          EN "Original colours"
pad.empty             FR "Dessinez, tapez ou importez votre signature pour continuer."
                      EN "Draw, type or upload your signature to continue."
```

### 10.5 Details block and placement

```
block.title           FR "Sous la signature (facultatif)"   EN "Under the signature (optional)"
block.date            FR "Date"                             EN "Date"
block.dateToday       FR "Aujourd'hui"                      EN "Today"
block.place           FR "Lieu"                             EN "Place"
block.placePh         FR "Ex. : Fait à Paris"               EN "E.g. Signed in London"
block.mention         FR "Mention"                          EN "Note"
block.mentions        FR ["Lu et approuvé", "Bon pour accord", "Certifié exact"]
                      EN ["Read and approved", "Agreed", "Certified correct"]
block.mentionHint     FR "Mention d'usage, sans valeur juridique propre."
                      EN "A customary phrase, with no legal effect of its own."
place.hint            FR "Faites glisser la signature à sa place. Le coin la redimensionne."
                      EN "Drag the signature into place. The corner resizes it."
place.keyboard        FR "Au clavier : flèches pour déplacer, + et − pour redimensionner, Suppr pour retirer."
                      EN "Keyboard: arrows to move, + and − to resize, Delete to remove."
place.missing         FR "Placez votre signature sur ce document."
                      EN "Place your signature on this document."
place.initials        FR "Parapher aussi chaque page"      EN "Also initial every page"
place.lastPage        FR "Dernière page"                   EN "Last page"
place.gap             (a: number, b: number) => FR `Pages ${a} à ${b} non affichées` EN `Pages ${a} to ${b} not shown`
withWatermark         FR "Ajouter aussi un filigrane (usage, destinataire, date)"
                      EN "Also add a watermark (purpose, recipient, date)"
suffix                "-signed"   (ASCII, all languages)
fingerprint.title     FR "Empreinte du fichier"            EN "File fingerprint"
fingerprint.body      FR "Gardez cette empreinte. Si une autre version du document réapparaît un jour, vous pourrez montrer que ce n'est pas celle que vous avez signée."
                      EN "Keep this fingerprint. If a different version of the document ever turns up, you can show it is not the one you signed."
```

### 10.6 Legal section (landing) — review required before launch

```
legal.title           FR "Quelle valeur a cette signature ?"
                      EN "What is this signature worth?"
legal.p1              FR "Une signature dessinée ou tapée puis posée sur le document est ce qu'on appelle couramment une signature électronique « simple ». En Europe, un juge ne peut pas l'écarter comme preuve au seul motif qu'elle est électronique (règlement eIDAS, article 25). En France, une signature identifie son auteur et montre qu'il consent à l'acte ; sous forme électronique, elle doit reposer sur un procédé fiable qui la relie au document (Code civil, article 1367). Une image de signature, comme une signature scannée, ne remplit pas seule cette condition : elle vaut signature si personne ne la conteste, mais pèse peu si elle l'est (Cour de cassation, 2022 et 2024)."
                      EN "A signature drawn or typed and placed on the document is what is commonly called a 'simple' electronic signature. In the EU, a court cannot reject it as evidence solely because it is electronic (eIDAS Regulation, article 25). In France, a signature identifies its author and shows their consent; in electronic form, it must rely on a reliable process linking it to the document (Civil Code, article 1367). A signature image, like a scanned signature, does not meet that test on its own: it counts if nobody disputes it, but carries little weight if someone does (Cour de cassation, 2022 and 2024)."
legal.p2              FR "Pour les documents de tous les jours, c'est en général accepté : dossier de location, attestation, devis, formulaire d'école ou d'association. En cas de litige, celui qui s'appuie sur le document doit prouver qui l'a signé ; gardez l'e-mail ou le message avec lequel il a été envoyé. Seule une signature « qualifiée » (avec un certificat délivré par un prestataire qualifié) est présumée fiable et équivaut à une signature manuscrite."
                      EN "For everyday documents, this is usually accepted: rental applications, certificates, quotes, school or club forms. In a dispute, whoever relies on the document must prove who signed it; keep the email or message it was sent with. Only a 'qualified' signature (with a certificate from a qualified provider) is presumed reliable and equivalent to a handwritten one."
legal.p3              FR "Ce n'est pas le bon outil quand une signature qualifiée est exigée, quand la loi demande une mention écrite de votre main (caution, reconnaissance de dette), pour un testament ou un acte devant notaire, ou quand l'autre partie impose une plateforme précise (certains contrats de prêt ou d'assurance, certaines démarches administratives). Dans ce cas, utilisez l'outil demandé."
                      EN "This is not the right tool when a qualified signature is required, when the law requires a statement in your own handwriting (guarantees, IOUs), for a will or a notarial deed, or when the other party requires a specific platform (some loan or insurance contracts, some administrative procedures). In that case, use the tool you are asked to use."
legal.note            FR "Ceci n'est pas un conseil juridique."   EN "This is not legal advice."
```

### 10.7 FAQ (landing)

```
faq.uploaded.q        FR "Mon document est-il envoyé à un serveur ?"            EN "Is my document uploaded to a server?"
faq.uploaded.a        FR "Non, jamais. Le site n'a pas de serveur qui pourrait recevoir un fichier. Votre navigateur fait tout le travail, et la page lui interdit techniquement de contacter un autre site. Le test du mode avion le prouve en dix secondes."
                      EN "No, never. The site doesn't even have a server that could receive a file. Your browser does all the work, and the page technically forbids it from contacting any other website. The airplane-mode test proves it in ten seconds."
faq.saved.q           FR "Ma signature est-elle enregistrée ?"                   EN "Is my signature saved?"
faq.saved.a           FR "Non. Elle n'existe que dans la mémoire de l'onglet. Fermez-le et elle disparaît."
                      EN "No. It only exists in the tab's memory. Close the tab and it is gone."
faq.remove.q          FR "Peut-on retirer ou réutiliser ma signature ?"           EN "Can my signature be removed or reused?"
faq.remove.a          FR "Elle fait partie de l'image de chaque page : on ne peut pas la déplacer ou la supprimer comme un élément du PDF. Comme une signature scannée sur papier, quelqu'un pourrait la découper et la coller ailleurs, et le fichier ne prouve ni qui l'a posée ni que le document n'a pas été modifié ensuite. Gardez votre copie. Pour limiter ce risque, ajoutez un filigrane qui lie la copie à son usage, et paraphez chaque page."
                      EN "It is part of the image of each page: it cannot be moved or deleted as a PDF element. Like a scanned paper signature, someone could cut it out and paste it elsewhere, and the file does not prove who placed it or that the document was not changed afterwards. Keep your copy. To limit that risk, add a watermark that ties the copy to its purpose, and initial every page."
faq.text.q            FR "Le texte du PDF signé est-il encore sélectionnable ?"   EN "Is the text of the signed PDF still selectable?"
faq.text.a            FR "Non. Chaque page est reconstruite à partir de ses pixels, ce qui retire aussi le texte caché, les métadonnées et la position GPS des photos. Votre original reste chez vous, intact."
                      EN "No. Each page is rebuilt from its pixels, which also strips hidden text, metadata and photo GPS location. Your original stays with you, untouched."
faq.phone.q           FR "Ça marche sur mon téléphone ?"                        EN "Does it work on my phone?"
faq.phone.a           FR "Oui, sur iPhone et Android. Signez avec le doigt, importez une photo si vous préférez."
                      EN "Yes, on iPhone and Android. Sign with your finger, or upload a photo if you prefer."
```

## 11. Test plan

### 11.1 Unit (Bun, `bun test`)

- `lib/overlays.test.ts`: default placement is bottom-right with margins for portrait and landscape pages; resize keeps ratio; clamp never leaves the page; `overlaysKey` is order-independent per page and stable across re-serialisation; initials placement for N pages skips the signature page.
- `lib/signature.test.ts`: `removeBackground` at 200 makes a white pixel transparent and a grey-80 pixel opaque; `recolor` keeps alpha and sets RGB; `inkBounds` returns `null` on a fully transparent image and a padded box otherwise; `trim` output dimensions.
- `lib/sign-block.test.ts`: zero, one and two lines; date formatting per language; presets exist in all 11 languages (same pattern as `i18n.test.ts` presets test).
- `lib/i18n.test.ts`, `site-copy.test.ts`, `site-meta.test.ts`, `guides.test.ts`, `roadmap.test.ts`: unchanged, must pass with the new keys, pages and guides.
- `lib/files.test.ts`: `-signed` suffix and `imageToPdf` export.

### 11.2 Engine seam (`e2e/watermark.seam.e2e.ts`, real browser, no UI)

- Overlay pixels: sign a 3-page fixture with a solid-red 100×30 PNG overlay at a known rect on page 3; sample the output page 3 raster at the centre of the rect → red; sample page 1 at the same spot → page colour. Prove the overlay lands where the editor says.
- Order: masks painted before overlay (a mask covering the overlay rect must not hide the signature); watermark drawn after (when text is non-empty).
- Sanitisation unchanged: signed output has no text content, no `/Info` author/producer values from the source, no attachments, no JavaScript, no annotations (run the existing sanitisation assertions on the signed output).
- Image input: a JPG signed with `forcePdf` returns `extension: "pdf"`, one page with the image's proportions, as large as fits in an A4 sheet (landscape when the image is wider than tall). Decided 2026-10-17: page = pixel size made phone photos 1.4 m tall and upscaled small images to arbitrary sizes; A4 is what recipients print.
- `previewPages` "first 11 + last" on a 40-page fixture yields 12 previews and the 12th is the last page.
- Adversarial corpus: run the existing corpus through sign mode with an overlay; same expectations (no crash, no leak).

### 11.3 UI (`e2e/ui.smoke.e2e.ts`, `e2e/features.e2e.ts`)

- `/en/sign` and `/fr/sign` load with the CSP meta; an injected `fetch("https://example.com")` is blocked; zero off-origin requests during a full sign flow (reuse the existing harness that counts requests).
- Full flow desktop: drop PDF → Draw tab stroke → Step 3 → default placement visible → move with keyboard → download → file is a PDF with the right page count.
- Type tab path with keyboard only (no pointer events) reaches download.
- Upload tab: fixture photo of a signature on paper; background removed; recolour to blue; placement; download.
- Phone viewport (390×844): the three steps show one at a time, the pad is usable with touch, the placement handle is reachable.
- RTL (`/ar/sign`): layout mirrors, placement box does not.
- Initials toggle: output pages 1..N-1 carry a small overlay (seam check by pixel on page 1).
- Fingerprint: shown values equal `sha256` computed in the test over the downloaded bytes.

### 11.4 Static (`e2e/security.static.test.ts`, `site-meta.static.test.ts`)

- New routes carry exactly one CSP, hash-only script sources, language-scoped scripts, hreflang for 11 languages plus `x-default`, OG image present; sign page is in the sitemap and in the service-worker precache; no source maps; no external resource.

### 11.5 Manual before launch

- Airplane-mode test on iPhone Safari and Android Chrome.
- Open the signed PDF in Acrobat, Apple Preview, Chrome, Firefox, and a phone mail client; confirm the signature renders and the file size is reasonable (A4 contract, 4 pages, under 2 MB at default quality).
- A real lease from a French agency: sign + initial + lock + "make smaller 5 MB", then send to yourself.

## 12. Success criteria (two weeks after launch)

- Sign page used from at least 5 countries (no analytics — judge from guide referrals, issues, and LinkedIn comments; we do not add tracking to measure this).
- No security regression: CI green, `docs/security.md` updated, no issue reporting an upload or a leak.
- At least one external contributor touches the sign strings or a guide.
- Qualitative: the launch post generates comments that argue about *signature simple* vs qualified — that is the conversation we want to be in.

## 13. Open questions (decide before WP3)

1. **Script font for the Type tab.** Serif italic (no new asset) vs a self-hosted handwriting font (needs licence check and `scripts/fonts.mjs` work). Recommendation: serif italic for launch; revisit after seeing how often Type is used.
2. **Default password lock in sign mode.** Recommendation: off; the recipient must be able to open the file without a phone call.
3. **Initials style.** Same signature at 16 % width, or the typed initials of the name? Recommendation: the same signature image scaled down — no extra UI, and it is what most people do by hand.
4. **"Also add a watermark" scope.** Full Step 2 of the watermark tool inline, or purpose + one recipient only? Recommendation: purpose + one recipient; the full tool is one click away.
5. **Separate OG image.** Reuse the language OG for launch or generate `sign-<lang>.png`? Recommendation: reuse; the LinkedIn post carries its own image anyway.

## 14. Deferred backlog (v1.1+, do not start in launch week)

- `remember-signature`: opt-in persistence of the signature image on this device, with a plain sentence about what is stored and a one-click delete.
- `keep-vector-pages`: overlay-only mode that preserves searchable text, with its own sanitisation pass (strip metadata, attachments, JavaScript, annotations) and a seam test proving it.
- `sign-embed`: `/embed/<lang>/sign` for partners, with pre-filled mention and place, same `partners.json` allow-list.
- `multi-placement`: several signatures and free-form initials per page.
- `script-font`: self-hosted handwriting font for the Type tab.
- `sign-comparisons`: "Cachety vs Yousign / DocuSign / Adobe Fill & Sign / iLovePDF Sign / Smallpdf eSign" pages, fact-checked and dated, each stating when the other tool is the better choice. **Done 2026-10-17** (`lib/compare/sign/`; Yousign is now Youtrust).
- `more-mentions`: per-country mention presets reviewed by native speakers.
