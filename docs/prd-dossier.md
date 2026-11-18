# PRD — Cachety Dossier: one send-ready file, without uploading anything

| | |
| --- | --- |
| Status | Draft v1 — 2026-11-18 |
| Owner | Amir Moradi |
| Target | v1.2.0, after `suggested-areas` ([prd-suggested-areas.md](prd-suggested-areas.md)) |
| Repo | `cachety/cachety` (this file lives at `docs/prd-dossier.md`) |
| Related | `docs/prd-sign.md`, `docs/security.md`, `docs/embed.md`, `docs/deploy.md`, `ROADMAP.md` |

> **One-line pitch.** Drop your ID, payslips, tax notice and a photo of a paper document; put the pages in order, turn or remove the ones you don't want; get one clean PDF (or one per section) under the size the website asks for. Nothing is uploaded, and the hidden data is removed on the way.

---

## 0. How to use this document

- §5 (functional spec), §6 (architecture) and §9 (work packages) are the ones to hand to an agent, one work package at a time. Each package lists the files it touches and the tests that prove it.
- §10 (copy, FR + EN) goes into `lib/i18n.tsx` and `lib/locales/<lang>/strings.ts`, then gets translated to the other 9 languages. `lib/i18n.test.ts` fails until all 11 languages carry the new keys. That is intended.
- **Must** is release-blocking. **Should** is in scope once Must is done. **Could** is deferred and must not be started in this release.
- `CONTRIBUTING.md` and `docs/security.md` apply unchanged. A change that weakens a control says so and updates `docs/security.md`.
- **Coordinate with the work in progress on `lib/watermark.ts`** (watermark variation, outline styles; uncommitted on 2026-11-18). WP1 below changes the same file. Land that work first, or rebase WP1 on it.

---

## 1. Why this feature, why now

The two tools Cachety has today, watermark and sign, sit at the end of a longer job: **sending a set of documents to someone who asked for them.** A rental application, a job file, a bank account opening, a CAF or school file, a visa application. The step just before is nearly always the same:

1. Gather 4 to 15 documents. Some are PDFs (payslips, tax notice, bank details), some are photos taken on a phone (ID card, a paper form, a receipt).
2. Turn them into one PDF, or one PDF per kind of document, in the right order, with sideways photos turned upright.
3. Get each file under the website's limit. Public and private portals commonly reject files above 1, 2, 4, 5 or 10 MB. For example, the French State's rental-dossier service DossierFacile caps each file at 10 MB and each category at a set number of pages ([its partner documentation](https://partenaire.dossierfacile.logement.gouv.fr/documentation-technique/api/taille-maximale-dupload-des-documents), checked 2026-11-18).

Today people do steps 2 and 3 on iLovePDF, Smallpdf, Adobe online, PDF24 or Sejda. These are the tools Cachety's comparison pages already name, and they process the files on their servers. These are the most sensitive documents a person owns, sent in a batch. "Nothing leaves your device" matters more here than anywhere else in the product.

Most of the engine already exists, but it is buried inside the watermark tool:

| Already built | Where | Limit today |
| --- | --- | --- |
| Several files, drag to reorder | `DocList`, `useDragReorder`, `moveTo` | Order is per **file**, not per page |
| One PDF from several files | `combineAsPdf` (`lib/file-password.ts`), `combineWithin` (`CoreProduct`) | Only after a watermark is set (`meaningful`) |
| Size target 1 / 2 / 5 / 10 MB, budget shared by page count | `lib/size-budget.ts`, `encodeWithin`, `shareOfBudget` | Fixed presets; uniform budget per page; no readability floor |
| Photo → A4 PDF page | `imageToPdf(…, "a4")`, `a4PageFor` (`lib/files.ts`) | No crop, no straightening |
| Pages rebuilt from pixels, hidden data removed | `watermarkPdf`, `watermarkImage` | — |
| Masks ("Hide something") | `lib/masks.ts`, `MaskEditor` | First 12 pages only |

So Dossier is mostly **a new front door and a page-level model** on a proven engine, not a new engine.

Strategically, "merge PDF" and "compress PDF" are among the most-searched PDF tasks. That is a general reading of search demand, not a measurement: the site has no analytics. Check it in Search Console before the release (§12). A dedicated page brings new visitors who then find watermark and sign. It is also the natural third partner-embed tool: "send us your file as one PDF under 5 MB".

## 2. Goals and non-goals

### Goals (v1)

1. From a mix of PDFs and phone photos, a person gets one PDF under a chosen size on phone or computer, in under two minutes, with no account and no upload.
2. Page-level control: reorder pages across files, rotate a page, remove a page.
3. Honest size handling: the tool says up front whether the target is reachable while staying readable. If it isn't, it says what to do (split, remove pages, choose a larger target) instead of producing an unreadable file.
4. Same guarantees as the other tools: rebuilt from pixels, metadata and hidden text removed, network locked by CSP, airplane-mode test, all verified by automated tests.
5. 11 languages, right-to-left included, with two guides at launch.

### Non-goals (v1 — do not build)

- No PDF editing: no text editing, no form filling, no annotations.
- No OCR or searchable output. Pages are pixels, as in the other tools (§4.2).
- No keeping of original vector pages ("lossless merge"). That is `keep-vector-pages`, which needs its own sanitisation pass.
- No conversion from Word, Excel or other office formats: there is no on-device converter we trust, and we will not add a server.
- No cloud import (Drive, Dropbox): it would need network access to other origins.
- No storage of a dossier between visits.

## 3. Users and jobs to be done

| User | Situation | Job |
| --- | --- | --- |
| Tenant (primary) | Agency or landlord asks for ID, 3 payslips, tax notice, proof of address, "in one PDF" or "one file per document, max 5 MB" | "Make the file they asked for, from my phone, now." |
| Job seeker / student | Application portal: one PDF, 2 MB max | "Get my CV, diploma and ID into one file that the form accepts." |
| Anyone dealing with a public body (CAF, préfecture, school, insurance) | Portal rejects the file: too big, or wrong format (HEIC photo) | "Make this photo of a paper form into a small PDF the site accepts." |
| Parent / volunteer | Association or school file, several paper forms | "Photograph the pages, straighten them, one PDF." |
| Letting agency / HR platform (partner) | Wants candidates to send clean, size-compliant files | Embed Dossier on its own site (§5.8). |

Accessibility: every page operation (move, rotate, remove, move to a section) is keyboard-operable, with announcements through the existing `aria-live` status, as for file reordering today (`t.moved`, `t.positionOf`).

## 4. Product principles and decisions

### 4.1 Same promise, same proof

Same CSP (`connect-src 'self'`, `form-action 'none'`, hash-only `script-src`), the airplane-mode paragraph, no new storage beyond display preferences, no new origin, no new runtime dependency in the Must scope.

### 4.2 Pages are rebuilt from pixels (decision)

As in the other tools: `pdf.js → canvas → [rotation] → [masks] → [watermark] → JPEG → pdf-lib`. Consequences, all accepted:

- Text is not selectable in the output.
- **A text-only PDF can come out bigger than it went in** (a 150 KB vector payslip becomes a 300–600 KB image page at default quality). The tool must not pretend to "compress" such a file. The size line shows the real estimate, and when the output is bigger than the inputs it says why in one sentence: hidden data is removed by rebuilding each page as an image (§10.4 `size.biggerWhy`). With a target, the engine shrinks the pages anyway.
- Hidden data is removed: text layer, metadata, attachments, JavaScript, links, photo GPS data. This is the honest reason to use Cachety rather than a "lossless" merger, and the landing page says so.

### 4.3 Readable before small (decision)

The current ladder (`ENCODE_LADDER`) goes down to scale 0.4 of the 2× render, about 58 dpi for an A4 page. That is unreadable for small print. Dossier sets a **readability floor**:

- `DOSSIER_MIN_SCALE = 0.55` (≈ 80 dpi on A4) by default. The engine never goes below it unless the person ticks "Allow lower quality" (Should).
- If the target cannot be reached at the floor, the result is not silently degraded. The size panel says so (`size.unreachable`) and offers three exits: split into sections (§5.4), remove pages, or pick the next target up.
- The estimate before download predicts this from the first-pass sizes (§6.4), so the person learns it before waiting for a full render.

### 4.4 No watermark required (decision)

The watermark tool needs a purpose or recipient before anything can be downloaded (`meaningful`). Dossier does not. A watermark is offered as an option ("Also add a watermark", the same pattern as sign mode's `withWatermark`), **off by default**. Many recipients want a clean copy, and the watermark tool is one click away for those who want the full set of options.

### 4.5 One brand, one codebase, one new mode

Dossier is a third `mode` of `CoreProduct` (`"watermark" | "sign" | "dossier"`), served at a new route. It shares the header, footer, language switch, drop zone, file list, preview, password lock, size budget and download code. It is not a fork. Where `CoreProduct` would grow a third branch in many places, extract a small helper instead (`modeConfig(mode)` returning labels, default options and render options; see §6.5).

### 4.6 Name and route (decision, see §13.1)

- Product name in copy: **Dossier** ("Cachety Dossier"). "Dossier" is used as-is in French, Dutch, German and Portuguese, and is understood in English. In the other languages the label is translated: "Merge" is not the job, "one file to send" is.
- Route: `/<lang>/dossier` and `/dossier`, ASCII and the same in every language, like `/sign`.
- Do not use "DossierFacile" or anything that suggests a link with the French State's service. The rental guide may mention DossierFacile by name (§5.9), factually.

## 5. Functional specification

Three steps, like the other tools, so the step bar, the tour and the phone layout apply.

### Step 1 — Your documents (Must)

Identical to the other tools: drop zone (click, drag, paste, Android share target), PDF and images (JPG, PNG, WebP, GIF, BMP, AVIF, HEIC), several files, same limits (200 MB per file, 500 pages per PDF), locked PDFs unlocked in the list, drag to reorder files.

Additions:

- A total cap: **1,000 pages per dossier** (`MAX_DOSSIER_PAGES`). Above it, the extra files go to attention with a clear reason (`errors.dossier_too_many_pages`). This bounds memory: thumbnails (§6.3) plus rendered pages.
- The list shows each file's page count once known, and a running total ("23 pages").

### Step 2 — Pages (Must)

The heart of the tool: a **page grid** of every page of every file, in output order.

- Thumbnails about 120 CSS px wide (portrait A4 → about 170 px tall), lazy-rendered (§6.3), with page number and source file name on hover/focus.
- **Reorder** by drag (pointer) or by keyboard (focus a page, then `Alt+←/→` or a "Move to position" field, like `DocRow`'s position input). Pages can move across files: the output order is a flat list of pages, not a list of files.
- **Rotate** a page 90° clockwise (button on the thumbnail, `R` key). Four presses return to 0°. Rotation is applied when the page is rebuilt from pixels, so the output page really is upright, not just tagged `/Rotate`.
- **Remove** a page (× on the thumbnail, `Delete` key), with an "Undo" toast for 8 seconds (`aria-live`). A file whose pages are all removed stays in the list, greyed out, with "No pages kept" and a "Restore" action.
- "Reset order" restores file order × page order.
- Phone: two columns of thumbnails; drag starts after a 250 ms press, so the grid scrolls normally (same pattern as `useDragReorder`); the per-page menu (⋯) gives Rotate, Remove, Move to… for those who don't drag.
- Grid virtualisation: only the visible rows plus one screen above and below are in the DOM (simple windowing, no new dependency). Required for 1,000 pages.

**Photo pages** (an image file, always one page) carry two extra actions:

- **Straighten and crop** (Should, §5.6).
- **Clean up** (Should): background whitening and contrast ("scan look"), plus "Black and white". Both make the page more readable and much smaller.

### Step 3 — Check and download (Must)

- **Output** (radio): "One PDF" (default) / "One PDF per section" (Should, §5.4) / "Separate files in a ZIP" (one PDF per source file, keeping page edits).
- **Size target**: presets "No limit", 1, 2, 5, 10 MB (`SIZE_TARGETS_MB`), plus "Other…" (Should): a number field from 0.5 to 50 MB, in steps of 0.5. With sections, the target applies **per file** ("each file under 5 MB"), because that is how portals state their limits. The label says so.
- **Estimate**: the existing estimate line, now with three states: fits ("About 3.2 MB, under 5 MB"), fits with reduced quality ("About 4.8 MB: pages will be a little less sharp"), cannot fit at the readability floor (§4.3, with the three exits).
- **Preview**: the first 12 pages of the output, in output order, as today. The page grid of Step 2 already shows everything.
- **Hide something** (Must, reused): the mask editor works on any page shown in the preview. Suggested areas (`suggested-areas`) show here when that feature ships.
- **Also add a watermark** (Should): the sign-mode pattern (purpose + one recipient, inline). Off by default.
- **Lock with a password**: reused (`FilePassword`). Default **off**: the recipient must be able to open the file.
- **File name**: one text field, prefilled with a localised default (`t.dossier.defaultName`, e.g. "dossier" / "documents"), sanitised with the existing `outputName` and `uniqueName`. With sections, each section's name is its file name.
- **Fingerprint** after download: reused from sign mode (`Fingerprint`). Useful when a landlord or employer later disputes what was sent.

### 5.4 Sections (Should)

Many recipients want one file per kind of document (DossierFacile has categories; agencies ask for "ID, payslips, tax notice, proof of address" as separate attachments).

- "Split into sections" adds section headers to the page grid. A section has a name (free text, prefilled from a per-language preset list such as "ID", "Payslips", "Tax notice", "Proof of address", "Other") and contains the pages below it until the next header.
- Pages move between sections by drag or by "Move to section…".
- Output: one PDF per section, named after the section, in one ZIP (or as separate downloads on browsers where several downloads in a row are allowed; v1 uses the ZIP to keep it simple and reliable).
- The size target applies per section file; the estimate is shown per section.

### 5.5 Size handling (Must)

See §4.3 and §6.4. User-visible rules:

- The target is a promise only when the estimate says "fits". Otherwise the panel says it is not reachable and why, before the download button.
- The download button stays enabled when the target is unreachable. The file is produced at the floor, and the done panel repeats that it is over the target (`overBudget` exists already). The person decides.

### 5.6 Straighten and crop a photo (Should)

A photo of a paper page is usually tilted, with a table or carpet around it.

- An editor opens on the photo with four corner handles, placed by default at 4 % inside the image edges (Could: auto-detected page corners, §14).
- The person drags each corner onto the page's corner. A magnifier loupe under the finger on touch devices (the corner is hidden by the finger otherwise).
- "Apply": the quadrilateral is warped to a rectangle (projective transform, §6.6), whose aspect ratio is the closest of A4 portrait, A4 landscape, Letter, or "as drawn". Default: A4 if within 6 % of A4's ratio, else as drawn.
- Keyboard: Tab between corners; arrows move by 0.5 %, Shift+arrows by 2 %.
- The warp happens on the device, in the same render pass as the rest (§6.6). The original photo is not changed.

### 5.7 Clean up (Should)

Per photo page, two toggles:

- **Whiten the background**: per-channel levels from the 2nd and 98th percentile of luminance (auto-levels), then a gentle curve. Paper becomes white, ink stays dark. It reads better and compresses much better.
- **Black and white**: desaturate after whitening. Not a 1-bit threshold, which ruins photos on ID cards.

"Apply to all photos" button. Both are pure pixel functions, unit-testable (§6.6).

### 5.8 Partner embed (Should)

- `EMBED_TOOLS` gains `"dossier"`. `#tools=dossier`, alone or with the others, same switch and confirmation as today ([embed.md](embed.md)).
- Prefill: `#size=5` (MB, one of the presets or 0.5–50) and `#sections=ID,Payslips,Tax%20notice` (comma-separated names, each cut to 40 characters on whole characters, at most 10 sections). Read by `readPrefill`, like `place` and `note`.
- The embed builder on `/<lang>/partners` gets "Dossier" in the tools select and two fields (size target, sections).
- Same `partners.json` allow-list, same `frame-ancestors` headers.

### 5.9 Help and content

- Landing below the tool (`DossierLanding`, like `SignLanding`): how it works (3 steps), the airplane-mode test, "why the file can be bigger than your originals" (§4.2), FAQ, guides, cross-links to watermark and sign.
- Two guides at launch (**Must**), FR and EN by hand, the other 9 languages drafted and flagged for native review:
  - `rental-application-one-pdf` (topic `rental`): ID + payslips + tax notice + proof of address, sections, 5 MB, optional watermark. It mentions DossierFacile factually: it is the State's free service, it has its own limits, and Cachety can prepare the files you upload there. No claim of endorsement.
  - `make-a-pdf-smaller-for-an-online-form` (new topic `size`): pick the target, what "readable" means, what to do when it doesn't fit.
- Comparison pages: **Could** for this release. The existing watermark comparisons (iLovePDF, Smallpdf, Adobe Acrobat, PDF24, Sejda) all offer merge and compress. Add a `tool: "dossier"` group later, fact-checked and dated like the sign group, each page saying when the other tool is better (lossless merge of vector PDFs, office-format conversion, OCR).
- Roadmap: add `dossier` to `lib/roadmap/*` and `ROADMAP.md` as **next** when work starts, **shipped** on release day.

## 6. Architecture and code changes

### 6.1 Routes and pages

| Route | File | Notes |
| --- | --- | --- |
| `/<lang>/dossier` | `app/[lang]/dossier/page.tsx` | Static, `generateStaticParams` over `LANG_CODES`, `dynamicParams = false`, metadata from `DOSSIER_META`. Mirrors `app/[lang]/sign/page.tsx`. |
| `/dossier` | `app/dossier/page.tsx` | Language-detecting redirector like `app/sign/page.tsx`. |
| `/embed/<lang>` | unchanged | `"dossier"` as a third tool (§5.8). |

`components/DossierApp.tsx` mirrors `SignApp.tsx`: `LangProvider`, `Header`, `<CoreProduct mode="dossier" />`, `DossierLanding`, `Footer`, plus a `DossierLangSync` like `SignLangSync`.

Site plumbing (each has a test that catches an omission):

- `lib/site-meta.ts` + `lib/locales/<lang>/meta.ts`: `DOSSIER_META`, `DOSSIER_ALTERNATES`.
- `scripts/seo.ts`: sitemap entries and the JSON-LD block, as for `/sign`.
- `scripts/gen-sw.mjs`: `LANG_PAGE` and `LANG_ABOUT` regexes gain `dossier` (`(about|sign|dossier)`) so the page is precached and works offline.
- `components/SiteNav.tsx`: `NavKey` `"dossier"` after `"sign"`; nav labels in `lib/site-copy.ts` and `lib/locales/<lang>/site.ts`.
- **Header rule budget (risk, measure first in WP0).** `_headers` is at 66 of 100 rules, and the `/en` rule line is at 1,919 of the 1,950-character `LINE_BUDGET` (`docs/deploy.md`). A new page adds its script hashes to its language's line. If a grouped language falls back to the finer grouping, it costs about 7 more rules, and the build fails above 100. WP0 adds the empty route and runs `bun run build` to read the count before any other work. If it does not fit, the fix is in `scripts/gen-sw.mjs` (for example one rule for the three tool pages of a language, which share their chunks), and that fix lands first, with `security-headers.test.ts` and `security.static.test.ts` green.

### 6.2 Page model (`lib/pages.ts`, new, pure)

```ts
/** One output page: a page of a source document, with its edits. */
export type PageRef = {
  doc: string;            // Doc.id
  page: number;           // index 0 in the source
  rotate: 0 | 90 | 180 | 270;
  /** Photo pages only: corners in normalised image coordinates, clockwise from top-left. */
  crop?: [Point, Point, Point, Point];
  clean?: { whiten: boolean; gray: boolean };
};
export type Point = { x: number; y: number };
export type Section = { id: string; name: string; start: number }; // start = index in the page list

export type DossierState = { pages: PageRef[]; sections: Section[] };

export function initialPages(docs: { id: string; pageCount: number }[]): PageRef[];
export function syncPages(state: DossierState, docs: { id: string; pageCount: number }[]): DossierState; // add new docs at the end, drop removed docs
export function movePage(state: DossierState, from: number, to: number): DossierState;
export function rotatePage(state: DossierState, index: number): DossierState;      // +90 mod 360
export function removePage(state: DossierState, index: number): { state: DossierState; undo: () => DossierState };
export function sectionOf(state: DossierState, index: number): Section | undefined;
export function splitBySection(state: DossierState): { section?: Section; pages: PageRef[] }[];
/** Per document: rotations and crops, for the stamp key and RenderOptions (§6.3). */
export function editsFor(state: DossierState, doc: string): PageEdits;
export function editsKey(e: PageEdits | undefined): string;   // stable, like masksKey
export const MAX_DOSSIER_PAGES = 1000;
```

`DossierState` lives in `CoreProduct` (dossier mode only), next to `docs`. Removing a page does not touch `Doc`. Rotating or cropping a page changes that document's `editsKey`, which is part of its stamp key, so only that document is rendered again.

### 6.3 Engine changes (`lib/watermark.ts`)

Additive, backward compatible, in `RenderOptions`:

- `edits?: PageEdits`: `Record<number, { rotate?: 90 | 180 | 270; crop?: Quad; clean?: CleanOptions }>`.
  - **PDF pages**: `rotate` is passed to `page.getViewport({ scale, rotation: (page.rotate + rotate) % 360 })`. pdf.js renders the page upright; the output page takes the rotated viewport's size. Masks stay in displayed-page coordinates, so a mask drawn after rotating covers what the person saw. When a rotation changes, existing masks for that page are cleared with a notice: the alternative, rotating the rectangles, is easy to get wrong and rare in practice.
  - **Image pages**: crop/warp (§6.6), then rotation, then clean-up, then masks, then watermark.
- `thumbnails?: number` (CSS px width × devicePixelRatio, capped at 320 px): the engine also produces a small JPEG (`quality 0.6`) of **every** page, from the same canvas before it is released, returned as `thumbs: string[]` (object URLs, revoked by `releaseResult`). No second pdf.js pass. At 1,000 pages × ~8 KB, that is about 8 MB of memory: acceptable.
- `minScale?: number`: lowest rung of `ENCODE_LADDER` allowed (`DOSSIER_MIN_SCALE = 0.55`, §4.3). `overBudget` already reports a miss.
- `pageBytes: number[]` in `WatermarkResult`: the encoded size of each page, for the weighted budget (§6.4).
- Keep `watermarkFile` / `renderFile` as the entry point, `forcePdf: true` in dossier mode (images become A4 pages, as in sign mode).

Stamp key in dossier mode: `stampKey(previewText, style)` (empty text unless the watermark option is on) + size target + `editsKey(editsFor(state, doc.id))` per document via `docStamp`. Page order and removed pages are **not** in the key: they only change assembly.

### 6.4 Assembly and size budget (`lib/assemble.ts`, new)

```ts
/** Copies pages from already-rendered, already-clean PDFs, in the given order. */
export async function assemblePdf(
  parts: Map<string, Uint8Array>,          // Doc.id → rendered PDF bytes (our own output)
  order: { doc: string; page: number }[]
): Promise<Uint8Array>;                    // newPdf() + copyPages; no metadata
/** Per-page byte budget weighted by first-pass sizes, floored, summing to maxBytes. */
export function weightedBudgets(pageBytes: number[], maxBytes: number, floor?: number): number[];
/** Will `target` fit at the readability floor? From first-pass sizes and the ladder's measured ratios. */
export function predictFit(pageBytes: number[], target: number): "fits" | "reduced" | "unreachable";
```

- `assemblePdf` uses `PDFDocument.copyPages` from pdf-lib. That is safe only because every part is Cachety's own rebuilt output (one JPEG per page, no annotations, no metadata). **Never** copy pages from a source PDF. A unit test asserts that `assemblePdf` is only called with rendered results (type-level: it takes `WatermarkResult`s, not `File`s).
- Budget: today `combineWithin` re-renders with a budget proportional to page count (`shareOfBudget`). Dossier keeps that two-pass shape but weights by **first-pass page sizes** (a photo page gets more bytes than a text page), with a floor of `pageBudget(maxBytes, n) / 3` per page so no page is starved. With sections, each section has its own budget.
- `predictFit`: compares the target with the first-pass total scaled by the compression ratio of the floor rung, measured once on the test corpus and stored as a constant (`FLOOR_RATIO`). The constant is checked by a seam test so it cannot drift silently.
- `combineAsPdf` (watermark tool) is unchanged. Dossier uses `assemblePdf` because it needs page-level order.

### 6.5 Components

| Component | Role | Based on |
| --- | --- | --- |
| `components/CoreProduct.tsx` | `mode: "watermark" \| "sign" \| "dossier"`. Step 2 renders `PageGrid` in dossier mode. Step 3: output radio, size panel, file name. Introduce `modeConfig(mode)` for labels, defaults (password off, watermark off) and `renderOptions`, so the third mode does not add a third arm to every ternary. | — |
| `components/PageGrid.tsx` | Virtualised grid of thumbnails, reorder (pointer + keyboard), rotate, remove + undo, sections (Should), page menu on phone. | `DocList`, `useDragReorder` |
| `components/PhotoFix.tsx` (Should) | Corner editor with loupe, clean-up toggles. | `SignatureEditor` (pointer/keyboard model) |
| `components/SizePanel.tsx` | Target presets + "Other…", three-state estimate, the three exits when unreachable. Wraps the size part of `SendOptions`; the watermark and sign tools keep `SendOptions` as is. | `SendOptions` |
| `components/DossierLanding.tsx` | Below-the-tool content. | `SignLanding` |
| `components/DossierApp.tsx` | Page shell. | `SignApp` |

### 6.6 Photo maths (`lib/photo-fix.ts`, new, pure)

```ts
export type Quad = [Point, Point, Point, Point];
/** 3×3 homography mapping the unit square to `quad` (solve the 8×8 system; no dependency). */
export function homography(quad: Quad): Float64Array;
export function outputSize(quad: Quad, imgW: number, imgH: number, paper: "a4" | "letter" | "free"): { w: number; h: number };
/** Inverse-map each output pixel, bilinear sampling. Works on ImageData-like {data,width,height}. */
export function warp(src: ImageDataLike, quad: Quad, w: number, h: number): ImageDataLike;
export function autoLevels(img: ImageDataLike, low?: number, high?: number): ImageDataLike; // percentiles 2 / 98
export function toGray(img: ImageDataLike): ImageDataLike;
```

All Bun-testable without a canvas, like `lib/signature.ts`. In the browser, `warp` runs on the decoded image before the canvas step. A 12-megapixel photo is warped to at most `MIN_IMAGE_SIDE`/`fitScale` output size, so the inner loop stays under about 0.5 s on a mid-range phone (measure in WP5; if slower, move it to a worker as a follow-up, not in this release).

### 6.7 i18n

- `t.dossier` namespace in `BASE_STRINGS` (fr, en, ja, zh in `lib/i18n.tsx`) and `lib/locales/<lang>/strings.ts`. Keys in §10. `defaultName` and section presets must be ASCII-safe file names after `outputName` (the test enforces ASCII for suffixes; extend it to `defaultName`).
- Landing and nav: `lib/site-copy.ts` + `lib/locales/<lang>/site.ts`. Meta: `lib/site-meta.ts` + `lib/locales/<lang>/meta.ts`.
- RTL: logical Tailwind classes. Page order is reading order, so in `ar` and `fa` the grid flows right to left, while output page 1 is still the first page. Keyboard `←/→` follow the visual direction (swap in RTL).

### 6.8 Security model updates (`docs/security.md`)

- §1 assets: unchanged (documents). Section names and the file name are text typed by the user: React-escaped, used in file names only after `outputName`/`zipPaths` (Zip-Slip control T7 applies to section names).
- §2 attack surface: no new decoder. `copyPages` is used only on Cachety's own output (§6.4). Say so explicitly; it is the one place where a PDF structure is copied instead of drawn.
- §3 threats: T4 now also covers "hidden data surviving a merge". The control is the same rasterisation, plus the `assemblePdf` rule. Verification: the seam test in §11.2.
- §4.1: `/en/dossier` added to the routes `ui.smoke.e2e.ts` walks (zero off-origin requests, exfiltration attempt blocked).
- §6 limits: a reduced-quality page can make small print illegible. The tool warns, but the person may still send it.

## 7. Data, privacy and storage

| Data | Where | Lifetime |
| --- | --- | --- |
| Documents | memory (`File`/`Blob`) | until removed or the tab is closed (unchanged) |
| Thumbnails | memory (object URLs) | revoked with the result, on removal or re-render |
| Page order, rotations, crops, sections | React state | tab lifetime |
| File name, section names | memory | not stored |
| Size target, output kind, "black and white" default | `localStorage` display preferences (`lib/storage.ts`) | persistent, non-sensitive |

No cookies, no analytics, no new request, no new origin.

## 8. Edge cases and error handling

- A PDF already rotated (`/Rotate 90`): the grid shows it as displayed; the person's rotation adds to it.
- Mixed page sizes (A4 + Letter + a receipt): each output page keeps its own size. No forced resize. Photo pages become A4-fitted pages as in sign mode.
- A locked PDF: its pages appear in the grid after unlocking, at the position of the file.
- A file that fails (corrupt, too many pages): it goes to attention as today; its pages are not in the grid; the rest of the dossier works.
- Removing a file in Step 1 after editing pages: its pages leave the grid (`syncPages`); edits to other files are kept.
- 1,000 pages at 1 MB: `predictFit` says unreachable; the panel suggests sections.
- A single small vector PDF and a target larger than it: the output may be bigger than the input (§4.2). The size line explains it.
- iOS Safari memory: the render loop already releases each canvas (`canvas.width = 0`). Thumbnails are tiny JPEGs. Test a 300-page dossier on an iPhone in the manual pass (§11.5).
- Sections with an empty name: the section's file uses the localised "Section N" name.
- Two sections with the same name: `uniqueName` adds a number.

## 9. Implementation plan

One pull request per package. ∥ marks packages that can run in parallel. Sizes are rough working days for one developer with an agent.

### WP0 — Branch, skeleton, header budget (0.5 day)

- Branch `feat/dossier`. Empty `app/[lang]/dossier` and `app/dossier` routes, `DOSSIER_META`, nav entry.
- `bun run build`: record the `_headers` rule count and the longest line. If over budget, fix `scripts/gen-sw.mjs` grouping first (§6.1).
- `lib/pages.ts`, `lib/assemble.ts`, `lib/photo-fix.ts` with types and `test.todo`s.
- Done when: build green, rule count and line length written in the PR description and in `docs/deploy.md`.

### WP1 — Engine: edits, thumbnails, floor, page sizes (1.5 days) ∥

- `RenderOptions.edits/thumbnails/minScale`, `WatermarkResult.thumbs/pageBytes` (§6.3).
- Tests: seam (§11.2) rotation, thumbnails count, floor respected, `pageBytes` sum ≈ output size.

### WP2 — Page model and assembly (1 day) ∥

- `lib/pages.ts`, `lib/assemble.ts` (`assemblePdf`, `weightedBudgets`, `predictFit`).
- Tests: unit (§11.1) and seam (assembled output clean, order right).

### WP3 — Mode, grid, Step 3 (2.5 days)

- `CoreProduct` dossier mode with `modeConfig`, `PageGrid`, `SizePanel`, file name, fingerprint reuse.
- `DossierApp`, `DossierLanding` (placeholder content until WP6), SEO and SW plumbing.
- Tests: e2e full flow (§11.3), static tests on the new routes.

### WP4 — Sections (1 day, Should)

- Section headers in the grid, per-section output and budget, ZIP.

### WP5 — Photo fix: straighten, crop, clean up (2 days, Should) ∥

- `lib/photo-fix.ts`, `PhotoFix`, engine hook for image pages.
- Tests: unit on homography and levels; seam on a synthetic tilted page; phone e2e for the corner editor.

### WP6 — Content and copy (2 days)

- Landing, FAQ, 2 guides (FR/EN by hand, 9 drafted), nav, meta, roadmap entry, README section.
- Tests: `site-copy.test.ts`, `guides.test.ts`, `roadmap.test.ts`, `text-hygiene.test.ts`.

### WP7 — Embed (0.5 day, Should)

- `EMBED_TOOLS`, `readPrefill` (`size`, `sections`), builder fields, `docs/embed.md`.
- Tests: `partners.test.ts`, `embed.e2e.ts` (dossier alone, with the switcher, prefilled size).

### WP8 — Security doc, release (0.5 day)

- `docs/security.md` (§6.8), `bun run build && bun run test:e2e` in Chromium, WebKit and Firefox, manual pass (§11.5), tag `v1.2.0` when asked.

Must scope: WP0–WP3, WP6, WP8 (≈ 8 days). With all Shoulds: ≈ 12 days.

## 10. Copy (FR and EN)

Keys under `t.dossier` unless marked otherwise. Plain words, short sentences, no promise the code doesn't keep. Translate the other languages from EN.

### 10.1 Navigation and page meta

```
nav.dossier           FR "Dossier"                      EN "Dossier"
meta.title            FR "Assembler ses documents en un PDF léger, sans rien envoyer"
                      EN "Combine documents into one small PDF, without uploading"
meta.description      FR "PDF et photos réunis en un seul fichier, dans l'ordre, sous la taille demandée. Tout se passe dans votre navigateur : rien n'est envoyé. Gratuit, open source."
                      EN "PDFs and photos in one file, in order, under the size you need. Everything happens in your browser: nothing is uploaded. Free and open source."
```

### 10.2 Hero

```
hero.title            FR "Un seul fichier à envoyer, sans rien mettre en ligne"
                      EN "One file to send, without uploading anything"
hero.lead             FR "Pièce d'identité, fiches de paie, avis d'impôt, photo d'un papier : rangez les pages, tournez celles qui sont de travers, et obtenez un PDF sous la taille demandée."
                      EN "ID, payslips, tax notice, a photo of a paper form: put the pages in order, turn the sideways ones, and get one PDF under the size you were asked for."
hero.badges           FR ["Gratuit", "Sans compte", "Rien n'est envoyé", "Fabriqué en France"]
                      EN ["Free", "No account", "Nothing uploaded", "Made in France"]
```

### 10.3 Steps and page grid

```
step1                 FR "Vos documents"               EN "Your documents"
step2                 FR "Les pages"                   EN "Pages"
step3                 FR "Vérifiez et téléchargez"     EN "Check and download"
stepShort             FR ["Documents", "Pages", "Télécharger"]   EN ["Documents", "Pages", "Download"]
grid.total            (n) FR `${n} pages`               EN `${n} pages`
grid.hint             FR "Faites glisser une page pour la déplacer. Elles peuvent passer d'un document à l'autre."
                      EN "Drag a page to move it. Pages can move from one document to another."
grid.keyboard         FR "Au clavier : Alt + flèches pour déplacer, R pour tourner, Suppr pour retirer."
                      EN "Keyboard: Alt + arrows to move, R to rotate, Delete to remove."
grid.rotate           FR "Tourner"                     EN "Rotate"
grid.remove           FR "Retirer la page"             EN "Remove page"
grid.removed          (n) FR `Page ${n} retirée.`       EN `Page ${n} removed.`
grid.undo             FR "Annuler"                     EN "Undo"
grid.reset            FR "Rétablir l'ordre d'origine"  EN "Restore the original order"
grid.moveTo           FR "Déplacer vers…"              EN "Move to…"
grid.pageOf           (p, name) FR `Page ${p} de ${name}`   EN `Page ${p} of ${name}`
grid.noPages          FR "Aucune page gardée"          EN "No pages kept"
grid.restore          FR "Remettre ses pages"          EN "Put its pages back"
grid.rotateClearsMasks FR "Les zones masquées de cette page ont été retirées : tracez-les à nouveau."
                      EN "This page's hidden areas were removed: draw them again."
photo.fix             FR "Redresser et recadrer"       EN "Straighten and crop"
photo.fixHint         FR "Placez chaque coin sur un coin de la feuille."
                      EN "Put each corner on a corner of the sheet."
photo.whiten          FR "Blanchir le fond"            EN "Whiten the background"
photo.gray            FR "Noir et blanc"               EN "Black and white"
photo.applyAll        FR "Appliquer à toutes les photos"   EN "Apply to all photos"
sections.split        FR "Séparer en plusieurs fichiers"   EN "Split into several files"
sections.add          FR "Nouvelle section ici"        EN "New section here"
sections.presets      FR ["Pièce d'identité", "Fiches de paie", "Avis d'impôt", "Justificatif de domicile", "Autre"]
                      EN ["ID", "Payslips", "Tax notice", "Proof of address", "Other"]
sections.unnamed      (n) FR `Section ${n}`             EN `Section ${n}`
```

### 10.4 Size and download

```
output.one            FR "Un seul PDF"                 EN "One PDF"
output.sections       FR "Un PDF par section"          EN "One PDF per section"
output.separate       FR "Un PDF par document (ZIP)"   EN "One PDF per document (ZIP)"
size.title            FR "Taille maximale"             EN "Maximum size"
size.other            FR "Autre…"                      EN "Other…"
size.perFile          FR "par fichier"                 EN "per file"
size.fits             (s, t) FR `Environ ${s}, sous ${t}.`   EN `About ${s}, under ${t}.`
size.reduced          (s) FR `Environ ${s} : les pages seront un peu moins nettes.`
                      EN `About ${s}: pages will be a little less sharp.`
size.unreachable      (t) FR `Impossible de passer sous ${t} en restant lisible.`
                      EN `This can't fit under ${t} and stay readable.`
size.exits            FR ["Séparer en plusieurs fichiers", "Retirer des pages", "Choisir une taille plus grande"]
                      EN ["Split into several files", "Remove pages", "Choose a larger size"]
size.allowLow         FR "Accepter une qualité plus faible"   EN "Allow lower quality"
size.biggerWhy        FR "Le fichier peut être plus lourd que vos originaux : chaque page est reconstruite en image, ce qui retire les données cachées."
                      EN "The file can be bigger than your originals: each page is rebuilt as an image, which removes hidden data."
fileName              FR "Nom du fichier"              EN "File name"
defaultName           FR "dossier"                     EN "documents"
next.pages            FR "Voir les pages"              EN "See the pages"
next.check            FR "Vérifier et télécharger"     EN "Check and download"
download              FR "Télécharger le PDF"          EN "Download the PDF"
downloadZip           FR "Télécharger les fichiers (ZIP)"   EN "Download the files (ZIP)"
```

### 10.5 FAQ (landing)

```
faq.uploaded.q        FR "Mes documents sont-ils envoyés quelque part ?"   EN "Are my documents uploaded anywhere?"
faq.uploaded.a        FR "Non. Le site n'a pas de serveur qui pourrait les recevoir, et la page interdit à votre navigateur de contacter un autre site. Le test du mode avion le prouve en dix secondes."
                      EN "No. The site has no server that could receive them, and the page forbids your browser from contacting any other site. The airplane-mode test proves it in ten seconds."
faq.bigger.q          FR "Pourquoi mon fichier est-il parfois plus lourd ?"   EN "Why is my file sometimes bigger?"
faq.bigger.a          FR "Chaque page est reconstruite à partir de ses pixels. Cela retire le texte caché, les métadonnées et la position GPS des photos, mais un PDF qui ne contenait que du texte peut grossir. Choisissez une taille maximale : Cachety réduit les pages pour tenir dedans."
                      EN "Each page is rebuilt from its pixels. That removes hidden text, metadata and photo GPS location, but a PDF that only held text can get bigger. Choose a maximum size: Cachety shrinks the pages to fit."
faq.text.q            FR "Le texte reste-t-il sélectionnable ?"   EN "Is the text still selectable?"
faq.text.a            FR "Non, les pages sont des images. Vos originaux restent intacts sur votre appareil."
                      EN "No, the pages are images. Your originals stay untouched on your device."
faq.office.q          FR "Puis-je ajouter un fichier Word ou Excel ?"   EN "Can I add a Word or Excel file?"
faq.office.a          FR "Pas directement. Enregistrez-le d'abord en PDF depuis Word, Excel ou votre téléphone (Imprimer, puis Enregistrer en PDF)."
                      EN "Not directly. Save it as a PDF first from Word, Excel or your phone (Print, then Save as PDF)."
faq.phone.q           FR "Ça marche sur mon téléphone ?"   EN "Does it work on my phone?"
faq.phone.a           FR "Oui. Prenez vos papiers en photo, redressez-les et rangez les pages avec le doigt."
                      EN "Yes. Photograph your papers, straighten them and put the pages in order with your finger."
```

## 11. Test plan

### 11.1 Unit (Bun)

- `lib/pages.test.ts`: `initialPages` order; `movePage` across documents; `rotatePage` cycles 0→90→180→270→0; `removePage` + undo restores exactly; `syncPages` adds new documents at the end and drops removed ones without touching the others' edits; `splitBySection` boundaries (empty section, last section); `editsKey` stable and order-independent; `MAX_DOSSIER_PAGES` enforced.
- `lib/assemble.test.ts`: `weightedBudgets` sums to at most `maxBytes`, respects the floor, gives more to heavier pages; `predictFit` three states on synthetic sizes; `assemblePdf` on two small pdf-lib PDFs: page order, page count, `updateMetadata: false` (no Producer/Creator), no `/Annots`.
- `lib/photo-fix.test.ts`: `homography` of the unit square is the identity; a known quad maps its corners exactly (1e-9); `warp` of a synthetic checkerboard gives straight lines; `outputSize` A4 snapping within 6 %; `autoLevels` maps the 2nd/98th percentile to 0/255; `toGray` keeps luminance.
- `lib/size-budget.test.ts`: `DOSSIER_MIN_SCALE` is on the ladder; the floor is never passed when `minScale` is set.
- `lib/partners.test.ts`: `tools=dossier`, `size` parsing (bounds, junk), `sections` (count cap, length cut on whole characters, emoji).
- `lib/i18n.test.ts`, `site-copy.test.ts`, `site-meta.test.ts`, `guides.test.ts`, `roadmap.test.ts`: pass with the new keys and pages.

### 11.2 Engine seam (`e2e/watermark.seam.e2e.ts` or a new `e2e/dossier.seam.e2e.ts`)

- Rotation: a portrait page with a red block top-left, rotated 90° → the output page is landscape, the red block is top-right.
- Thumbnails: a 30-page PDF yields 30 `thumbs`, each decodable, each ≤ 320 px wide.
- Assembly: two rendered documents, order `[B2, A1, B1]` → output pages carry the expected marker colours in that order; output has no text content, no `/Info` values from the sources, no attachments, no JavaScript, no annotations (reuse the existing sanitisation assertions).
- Budget: a 10-page mixed PDF (5 photo pages, 5 text pages) under 1 MB → the output is ≤ 1 MB, photo pages got more bytes than text pages, no page under the floor scale.
- Floor: a 60-page photo PDF under 1 MB → `overBudget: true`, every page at or above `DOSSIER_MIN_SCALE`; `predictFit` said `"unreachable"` before the render.
- `FLOOR_RATIO` check: the measured ratio on the fixture corpus is within ±15 % of the constant.
- Photo warp: a synthetic photo of a tilted white rectangle with black corner markers → after `warp`, markers sit in the output corners (±2 px).
- Adversarial corpus through dossier mode with a rotation and a mask: no crash, no leak.

### 11.3 UI (`e2e/dossier.e2e.ts`, plus `ui.smoke.e2e.ts`)

- `/en/dossier` and `/fr/dossier` load with one CSP meta; an injected `fetch("https://example.com")` is blocked; zero off-origin requests during a full flow.
- Full flow desktop: drop 2 PDFs + 1 JPG → grid shows all pages → move the photo page first → rotate one page → remove one page → 2 MB → download → one PDF with the right page count, order and orientation (check by marker colours), ≤ 2 MB.
- Keyboard only: reorder with Alt+arrows, rotate with R, remove with Delete, undo, download.
- Phone viewport (390×844): two-column grid, long-press drag, page menu, sticky bottom button per step.
- Sections (Should): three sections → ZIP with three PDFs named after the sections, each ≤ target.
- Unreachable target: the panel shows `size.unreachable` and the three exits before download.
- Embed (Should): `#tools=dossier&size=5` preselects 5 MB; the switcher with three tools asks before switching when pages are edited.
- RTL (`/ar/dossier`): the grid mirrors; output order is unchanged.

### 11.4 Static

- New routes: one CSP each, hash-only scripts, hreflang for 11 languages plus `x-default`, in the sitemap and the service-worker precache, `_headers` within 100 rules and 2,000 characters per line.

### 11.5 Manual before release

- Airplane-mode test on iPhone Safari and Android Chrome.
- A real rental file: ID photo (tilted), 3 payslips, tax notice, proof of address → sections → 5 MB each. Upload the result to a real portal that enforces a size limit.
- A 300-page dossier on an iPhone: no tab crash, thumbnails scroll smoothly.
- Open the outputs in Acrobat, Apple Preview, Chrome, Firefox, a phone mail client.

## 12. Success criteria (four weeks after release)

- No analytics, by design. Judge from Search Console (queries containing "merge", "combine", "compress", "fusionner", "compresser" leading to `/dossier` and the guides), GitHub issues, and partner requests for the `dossier` embed tool.
- Before starting WP3, check Search Console for the current query volume on those words. If nobody reaches Cachety through them, that's a signal to put the guides and comparisons first.
- No security regression: CI green, `docs/security.md` updated, no report of an upload or a leak.
- At least one partner enables `tools=dossier`.

## 13. Open questions (decide before WP3)

1. **Name and route.** `/dossier` with the label "Dossier" (recommended: short, the same in most languages, says "set of documents"), or `/merge` with "Merge" / "Fusionner" (stronger search keyword, but it names a mechanism, not the job). A `/compress` landing page that opens the same tool with one file and a target preselected is a **Could** for SEO; it costs one more route per language in the header budget (§6.1).
2. **Watermark default.** Off (recommended: many recipients want a clean copy) or on, as a nudge toward the product's original promise.
3. **Readability floor.** 0.55 of the 2× render (≈ 80 dpi on A4, recommended) or 0.75 (≈ 108 dpi; safer for small print, misses more targets).
4. **Masks after rotation.** Clear them with a notice (recommended for v1) or rotate the rectangles.
5. **Sections in Must?** Recommended Should, but it is the main need for DossierFacile users. If the Must scope ships early, do WP4 before WP5.

## 14. Deferred backlog (do not start in this release)

- `photo-auto-corners`: detect the sheet's corners automatically (edge detection + largest quadrilateral, on the device).
- `dossier-comparisons`: "Cachety vs iLovePDF / Smallpdf / Adobe / PDF24 / Sejda" for merge and compress, fact-checked and dated, each saying when the other tool is better.
- `compress-landing`: `/compress` entry page (§13.1).
- `keep-vector-pages`: lossless merge of vector PDFs with its own sanitisation pass (already an idea in `ROADMAP.md`).
- `dossier-checklists`: per-use-case checklists ("rental application in France: ID, 3 payslips…"), reviewed per country.
- Office formats, OCR, cloud import: out of scope while there is no server (§2).
