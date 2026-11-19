# PRD — Suggested areas to hide: Cachety points out the bank details and ID numbers on the page

| | |
| --- | --- |
| Status | Draft v1 — 2026-11-18 |
| Owner | Amir Moradi |
| Target | v1.1.x (minor feature inside existing tools), before Dossier ([prd-dossier.md](prd-dossier.md)) |
| Roadmap id | `suggested-areas` (already **next** in `ROADMAP.md`) |
| Related | `lib/masks.ts`, `components/MaskEditor.tsx`, `docs/security.md` §4.4 |

> **One-line pitch.** When a PDF contains an IBAN, a card number, a social security or tax number, Cachety finds it on the device and offers to black it out with one tap. It never hides anything without asking, and it says plainly that the person still has to check the page.

---

## 0. How to use this document

- §5 (functional spec), §6 (architecture) and §9 (work packages) are the ones to hand to an agent, one package at a time.
- **Must** is release-blocking, **Should** is in scope once Must is done, **Could** is deferred.
- The masks produced by a suggestion are ordinary masks: everything `docs/security.md` §4.4 guarantees about masks (pixels and text gone from the output) applies unchanged. This feature adds **detection**, not a new way of removing content.

---

## 1. Why this feature

"Hide something" exists in all three tools, but people don't always know what is sensitive on a payslip or a tax notice, and drawing rectangles on a phone is fiddly. The roadmap entry says it in one line: *people don't always know what to hide (account number, tax number, card number).*

The documents people send most (payslips, tax notices, bank details forms, invoices, rent receipts, energy bills) are nearly always **generated PDFs with a text layer**. pdf.js already reads that text when Cachety renders the page. Finding an IBAN in it and turning its position into a mask is cheap, accurate, and needs no new dependency.

What it must not become: a promise that "Cachety found everything". Detection misses things (an image of a number, a barcode, an unusual format) and sometimes flags things that are fine to send. The honest framing is **suggestions**, and the page says so every time.

## 2. Goals and non-goals

### Goals (v1)

1. On PDFs with a text layer, suggest the areas holding the sensitive numbers in §5.2, on **every page**, not just the 12 previewed ones.
2. One tap hides one suggestion; one button hides them all. Nothing is hidden without the person's action.
3. Each suggestion says what it is ("Bank account number (IBAN)") and, where it matters, why the recipient may need it.
4. Zero false confidence: the panel always says suggestions can miss things, and that barcodes and QR codes can hold the same data.
5. Runs on the device, inside the existing CSP, with no new runtime dependency and no new storage.
6. Works in the watermark, sign and (later) Dossier tools, in 11 languages.

### Non-goals (v1 — do not build)

- No OCR. Photos and scanned PDFs without a text layer get no suggestions in v1. The panel says "No text to read on this page: draw the areas yourself." On-device OCR is a **Could** (§14), with a cost stated up front.
- No detection of faces, signatures, photos, MRZ lines on photos, barcodes or QR codes (v1).
- No names, addresses, dates of birth, phone numbers or e-mail addresses: too noisy, and usually what the recipient needs.
- No automatic hiding, ever, including "hide all by default".
- No "redaction report" or certificate.

## 3. Users and situations

| Situation | What is on the page | What the recipient usually needs |
| --- | --- | --- |
| Rental application, payslips | Social security number (NIR), employer IDs, sometimes the IBAN the salary is paid into | Name, employer, net pay. Not the NIR. |
| Rental application, tax notice (France) | Tax number (numéro fiscal), notice reference, reference tax income | The landlord may check the notice with the tax office's online service, which needs **both** the tax number and the notice reference. Hiding them can get the file rejected. |
| Bank details form (RIB) for a landlord or employer | IBAN, BIC | The IBAN: that is why they asked. Hide nothing. |
| Invoice or bill as proof of address | Customer number, sometimes a partial card number or IBAN for direct debit | Name and address. |
| Any ID sent "for information" | Card numbers, ID numbers | Depends; the person decides. |

This table is why nothing is hidden by default, and why some categories carry a one-line "they may need it" note (§5.3).

## 4. Product principles and decisions

### 4.1 Suggest, never decide (decision)

Suggestions are drawn as dashed outlines on the preview and listed in a panel. They become masks only when the person taps them or taps "Hide them all". Reasons: false positives would destroy content the recipient needs (an IBAN on a RIB), and silent masking would make people trust detection more than it deserves.

### 4.2 Validated numbers only (decision)

A suggestion needs either a **checksum that passes** (IBAN mod 97, Luhn, NIR key…) or, for formats without a checksum, a **label next to it** ("Numéro fiscal", "NIK"…). A bare run of digits is never suggested. This keeps false positives rare enough that people keep reading the panel.

### 4.3 Text layer only in v1 (decision)

Detection reads pdf.js `getTextContent()`. It is exact on generated PDFs, free in bundle size, and fast. OCR for photos would add about 5.8 MB of WebAssembly and model data for one language (`tesseract-core-simd-lstm.wasm` ≈ 2.9 MB + `eng.traineddata.gz` best_int ≈ 2.9 MB, sizes from jsDelivr on 2026-11-18), more for each script, and seconds of work per page on a phone. That deserves its own decision (§14).

### 4.4 The page tells the truth about limits

The panel's footer, always visible when suggestions are shown:

> Suggestions can miss things. Check the whole page yourself. Barcodes and QR codes can contain the same information.

The QR note matters: French tax notices carry a 2D-Doc barcode on the first page (since April 2022, per the DGFiP), and it encodes data from the notice. A person who hides the tax number but leaves the 2D-Doc has hidden less than they think. They can mask the barcode with the normal tool. Whether they should depends on the recipient (the 2D-Doc is also how the notice is authenticated).

## 5. Functional specification

### 5.1 Where it appears

- In the existing "Hide something" flow of all tools. When the preview opens and the current document has suggestions, a compact banner sits above the preview:
  > **We found 3 numbers you may want to hide.** [Review]
- "Review" opens the mask editor (as "Hide something" does today) with:
  - dashed outlines over each suggested area on the shown page, in the accent colour, with a small label chip ("IBAN");
  - a **suggestions panel** next to the preview (below it on phones), listing every suggestion of the document, grouped by page.
- Documents without a text layer, or with no findings, show no banner. In the mask editor, the panel says "Nothing found to suggest on this document" or "No text to read on this document: draw the areas yourself."

### 5.2 What is detected (v1)

Must: international, checksum-based, and the main French case.

| Id | Category (label shown) | Rule | Validation |
| --- | --- | --- | --- |
| `iban` | Bank account number (IBAN) | 2 letters, 2 digits, 11–30 alphanumerics, spaces allowed every 4 | Country length table (ISO 13616 registry) + mod 97 = 1 |
| `card` | Card number | 13–19 digits, spaces or dashes allowed | Luhn + known issuer prefix (2-series and 51–55 Mastercard, 4 Visa, 34/37 Amex, 6011/65 Discover, 35 JCB, 62 UnionPay) |
| `fr-nir` | Social security number (France) | 1/2 + YY + MM + dept (incl. 2A/2B) + 3 + 3 digits, + 2-digit key; spaces allowed | Key = 97 − (number mod 97), 2A→19, 2B→18 |
| `fr-tax` | Tax number (France) | 13 digits starting 0–3 | Label within the same line or the line above: "numéro fiscal", "n° fiscal", "SPI" |
| `fr-tax-ref` | Tax notice reference (France) | 13 alphanumerics | Label: "référence de l'avis" |

Should: national numbers with a published checksum, for the languages Cachety serves.

| Id | Category | Validation |
| --- | --- | --- |
| `de-taxid` | Tax ID (Germany, Steuer-ID) | 11 digits, first ≠ 0, ISO 7064 MOD 11,10 |
| `es-dni` | ID number (Spain, DNI/NIE) | 8 digits + letter / X·Y·Z + 7 digits + letter, mod 23 letter table |
| `nl-bsn` | Citizen service number (Netherlands, BSN) | 9 digits, 11-proof; label "BSN" or "burgerservicenummer" required (9-digit runs are common) |
| `be-nn` | National number (Belgium) | 11 digits, 97 − mod 97 (with the post-2000 "2" prefix variant) |
| `pt-nif` | Tax number (Portugal, NIF) | 9 digits, mod 11; label "NIF" or "contribuinte" required |
| `br-cpf` | CPF (Brazil) | 11 digits, two check digits; formatted `000.000.000-00` or label "CPF" |
| `it-cf` | Tax code (Italy, codice fiscale) | 16 alphanumerics, check character (odd/even tables) |
| `cn-id` | Resident ID (China) | 18 characters, ISO 7064 MOD 11-2 (X allowed) |
| `jp-mynumber` | My Number (Japan) | 12 digits, check digit; label "個人番号" or "マイナンバー" required |
| `ir-melli` | National code (Iran) | 10 digits, mod 11 check; label "کد ملی" required |
| `id-nik` | NIK (Indonesia) | 16 digits, region + date structure; label "NIK" required (no checksum) |

Digit normalisation before matching: Arabic-Indic (U+0660–0669) and Extended Arabic-Indic (U+06F0–06F9, Persian) digits map to ASCII; full-width digits (U+FF10–FF19) too; non-breaking and thin spaces count as spaces.

Not detected on purpose (v1): BIC/SWIFT codes (not sensitive on their own), names, addresses, dates, phone numbers, e-mail, customer numbers, amounts.

### 5.3 Notes on some categories

Shown under the suggestion in the panel, one line, plain words:

- `fr-tax`, `fr-tax-ref`: "The recipient may use it to check that your tax notice is genuine. Hide it only if they don't need that."
- `iban`: "If they asked for your bank details, they need it."
- Others: no note.

### 5.4 Interactions

- **Tap a suggestion** (outline on the preview, or its row in the panel): it becomes a mask (solid black, as drawn by hand) and its row shows "Hidden ✓" with "Undo".
- **Hide them all**: hides every suggestion of this document, on every page, including pages beyond the 12 previewed (§5.5). Confirmation inline, not a modal: "3 areas hidden on pages 1, 2 and 14. [Undo]".
- **Hide them all in every document** (multi-document batches): one more button when other documents have suggestions too.
- Accepted suggestions are ordinary masks: movable, resizable and removable with the existing editor gestures.
- **Not this**: a small "×" on a suggestion dismisses it for this document (it stops being outlined). Dismissals are not remembered after the tab is closed.
- Keyboard: the panel is a list of toggle buttons (`aria-pressed`); Tab reaches each; Enter or Space toggles; "Hide them all" is a normal button. The outlines on the preview are decorative (`aria-hidden`); the panel is the accessible path.
- Screen readers: the banner is a `role="status"` message; toggling announces "IBAN on page 2 hidden" through the existing `aria-live` region.

### 5.5 Pages beyond the preview

The mask editor can only draw on previewed pages today (`maskable`, "Masking is available on the first 12 pages"). Suggestions are computed for **all** pages, and accepting one on page 14 adds a mask on page 14 even though the page is not shown. The panel lists those rows under "Pages not shown in the preview" with the extracted text partly hidden (`FR76 •••• •••• 0189`) so the person knows what they are hiding. The existing limit message gets a second sentence when suggestions exist: "Suggestions cover every page."

### 5.6 Box geometry

- The suggested rectangle covers the matched characters with a margin: 15 % of the text height above and below, 0.5 × the average character width left and right. People prefer a slightly generous black box to a sliver of digit showing.
- A match split across lines (rare: long IBANs wrapped in a narrow column) gives one rectangle per line, accepted and undone together.
- Rotated pages and rotated text: rectangles are axis-aligned in displayed-page coordinates (the same space as masks). Text at an angle gets the axis-aligned box of its rotated quadrilateral.

## 6. Architecture and code changes

### 6.1 Overview

```
pdf.js page.getTextContent()        (browser, per page, during or after render)
  → lib/text-lines.ts                (items → lines with per-character boxes, page-normalised)
  → lib/sensitive.ts                 (pure: lines → matches, with validators)
  → Doc.suggestions: PageSuggestions (React state, per document)
  → MaskEditor + SuggestionsPanel    (outline, accept → addMask)
```

### 6.2 Text extraction (`lib/text-lines.ts`, new; extraction runs in the browser)

```ts
export type CharBox = { x: number; y: number; w: number; h: number }; // normalised, displayed page
export type Line = { text: string; boxes: CharBox[] };                 // boxes[i] for text[i]
/** Group text items into lines by baseline, then estimate per-character boxes. */
export function linesFromItems(items: TextItemLike[], viewport: ViewportLike, styles: Record<string, { ascent?: number; descent?: number }>): Line[];
```

- Position of an item: `Util.transform(viewport.transform, item.transform)` gives the baseline origin and the font scale in device space. Divide by the viewport size for normalised coordinates. Height = font size × (ascent − descent), using `styles[fontName]` when present, else 1.0 × font size.
- Per-character boxes: split `item.width` across characters, proportionally (equal width). Digits are near-monospace in almost every font, and the box margins (§5.6) absorb the error. Measuring real glyph widths through pdf.js font data is not worth it in v1.
- Lines: items whose baselines are within 0.3 × font height and that overlap or nearly touch horizontally (gap < 1.5 × average character width) belong to the same line. Insert a space between items when the gap > 0.25 × average character width. `hasEOL` ends a line.
- Ignore items outside the page box (some PDFs put text off-page), and items with zero width.
- Invisible text (render mode 3, common in OCR'd scans) is kept: its positions match the image beneath, so its matches are real.

Where to call it: in the same pdf.js pass that renders the page (`watermarkPdf`), behind a new `RenderOptions.extractText?: boolean`. For each page, after `page.render`, call `page.getTextContent()` and return `lines: Line[][]` in the result. That avoids loading the PDF twice. Because text does not depend on the stamp (watermark text, size), the result is computed **once per document** (keyed by file id + password): the queue passes `extractText: true` only while `doc.suggestions === undefined`.

Cost: `getTextContent` is fast compared with rendering (no rasterisation). Measure on the 500-page fixture in WP1; budget ≤ 10 % added render time. If it is more, extract in a second, lower-priority pass after the first render.

### 6.3 Detection (`lib/sensitive.ts`, new, pure, Bun-testable)

```ts
export type SensitiveKind = "iban" | "card" | "fr-nir" | "fr-tax" | "fr-tax-ref" | /* Should */ "de-taxid" | "es-dni" | "nl-bsn" | "be-nn" | "pt-nif" | "br-cpf" | "it-cf" | "cn-id" | "jp-mynumber" | "ir-melli" | "id-nik";
export type Match = { kind: SensitiveKind; page: number; line: number; start: number; end: number; masked: string }; // masked = "FR76 •••• … 0189"
export function normaliseDigits(s: string): string;               // §5.2 digit and space normalisation, same length mapping
export function findSensitive(pages: string[][]): Match[];         // pages → lines → text
export function rectsFor(match: Match, lines: Line[][]): MaskRect[]; // union of char boxes + margins, one per line
// validators, each exported for tests
export function ibanValid(s: string): boolean;
export function luhnValid(s: string): boolean;
export function nirValid(s: string): boolean;
// … one per kind
```

- Matching scans each line's normalised text with one regular expression per kind, allowing internal spaces, dots and dashes, then strips separators and validates. The index map from stripped text back to line positions is kept so `rectsFor` can find the boxes.
- Labels: the kind's label list (lower-cased, accents folded) is searched in the same line before the match, and in the line directly above. Labels are per kind, not per page language: a German payslip can sit in the French interface.
- Overlaps: when two kinds match the same characters, keep the more specific one (a checksum-validated national number over a card number).
- `masked` keeps the first 4 and last 4 characters only. It is shown in the panel and never logged.
- Performance: linear in text length; a 500-page document is well under 100 ms in Bun. A unit test asserts that bound on a generated corpus.

### 6.4 State and UI

- `Doc` (`lib/doc.ts`) gains `suggestions?: PageSuggestions`, where `PageSuggestions = { matches: Match[]; rects: Record<number, MaskRect[][]> }` (per page, per match, one or more rects). It also gains `dismissed?: Set<number>` (match indexes). Accepting a suggestion calls the existing `addMask`. Undoing removes exactly those rectangles (compared by `masksKey`-style rounding).
- Suggestions do **not** enter the stamp key. Only accepted masks do, as today through `masksKey`. So showing suggestions never triggers a re-render.
- `components/SuggestionsPanel.tsx` (new): the grouped list, "Hide them all", per-row notes, "Pages not shown in the preview" group.
- `components/MaskEditor.tsx`: a `suggestions?: { rect: MaskRect; label: string; onAccept: () => void; onDismiss: () => void }[]` prop that draws dashed outlines with a label chip and a "×". No change to drawing or editing behaviour.
- `CoreProduct.tsx`: the banner above the preview; wires `extractText` in the render queue; passes the current page's suggestions to `MaskEditor`. In all modes.

### 6.5 i18n

`t.suggest` namespace in the 11 languages (keys in §10). Category labels are part of it (`t.suggest.kinds.iban`, …). The per-kind label **lists** used for detection (`"numéro fiscal"`, `"NIK"`) are data in `lib/sensitive.ts`, not interface strings, and are not translated.

### 6.6 Security model updates (`docs/security.md`)

- §1 assets: "Text extracted from the documents (for suggestions)": memory only, never stored, never sent, dropped when the document is removed; the panel shows only the masked form.
- §2 attack surface: no new decoder. `getTextContent` is pdf.js code already loaded for rendering. Hostile text (very long lines, millions of items, odd Unicode) is bounded: lines are cut at 2,000 characters, and extraction stops after 200,000 items per document with suggestions marked incomplete ("Suggestions stopped early on this document"). Regular expressions are linear (no nested quantifiers); a test runs them on pathological input with a time bound.
- §3 threats: new **T12, "False sense of completeness"**. The person relies on suggestions and sends a page with a sensitive number that was not detected (image text, barcode, unknown format). Controls: no automatic hiding (§4.1), the permanent "Suggestions can miss things" footer, the barcode note. Verification: `site-copy`/`i18n` tests assert the footer exists in all 11 languages. Nothing technical is claimed.
- §4.4: unchanged. Accepted suggestions are masks; the seam tests prove the masked text is absent from the output.

## 7. Data, privacy and storage

| Data | Where | Lifetime |
| --- | --- | --- |
| Extracted lines and boxes | memory (per document) | until the document is removed or the tab is closed |
| Matches (masked form) | memory | same |
| Dismissed suggestions | memory | same; not remembered |
| Accepted suggestions | ordinary masks in `Doc.masks` | as masks today |

No new `localStorage` key, no network request, no telemetry, not even counts.

## 8. Edge cases

- Encrypted PDF: suggestions appear after unlocking, like the render.
- A PDF whose text layer does not match its image (bad OCR, text drawn white): suggestions may outline empty areas. Harmless: the person sees the outline sits on nothing and does not accept it.
- Text split character by character into separate items (some generators): the line builder joins them; tested with a fixture made of one-character items.
- Ligatures and unusual fonts: digits are rarely affected; IBAN letters are capitals. Accept small box errors, covered by the margins.
- Right-to-left pages (Arabic, Persian): numbers stay left-to-right in the text layer; positions come from transforms, not text order, so boxes are right. Test with an `ar` fixture containing an IBAN.
- Multi-column layouts: lines are built per column because of the horizontal gap rule.
- Very long documents: suggestions for all 500 pages; the panel groups by page and is virtualised past 200 rows.
- A suggestion accepted, then the person rotates the page (Dossier): masks are cleared on rotation with a notice (Dossier PRD §6.3); suggestions are recomputed from the stored lines and the new rotation.

## 9. Implementation plan

Sizes are rough working days for one developer with an agent.

### WP0 — Skeleton (0.25 day)

- Branch `feat/suggested-areas`; `lib/sensitive.ts`, `lib/text-lines.ts` with types and `test.todo`s.

### WP1 — Detection core (1.5 days) ∥

- Validators and `findSensitive` for the Must kinds, `normaliseDigits`, `masked`.
- Tests: §11.1 (valid and invalid vectors, labels, overlaps, linear time).

### WP2 — Text lines from pdf.js (1 day) ∥

- `linesFromItems`; `RenderOptions.extractText`; result `lines`.
- Tests: §11.2 seam fixtures; timing on the 500-page fixture.

### WP3 — UI (1.5 days)

- Banner, `SuggestionsPanel`, `MaskEditor` suggestions prop, accept/undo/dismiss, "Hide them all", pages beyond the preview.
- Tests: §11.3.

### WP4 — Should kinds (1 day)

- National numbers in §5.2 (Should table), each with official or published test vectors.

### WP5 — Copy, docs, release (0.5 day)

- Strings in 11 languages, `docs/security.md` (§6.6), README feature line, roadmap: `suggested-areas` → shipped.

Must scope: WP0–WP3 + WP5 (≈ 4.75 days). With WP4: ≈ 5.75 days.

## 10. Copy (FR and EN)

Keys under `t.suggest`.

```
banner                (n) FR n > 1 ? `Nous avons trouvé ${n} numéros que vous voudrez peut-être masquer.` : "Nous avons trouvé un numéro que vous voudrez peut-être masquer."
                          EN n > 1 ? `We found ${n} numbers you may want to hide.` : "We found a number you may want to hide."
review                FR "Voir"                          EN "Review"
title                 FR "Suggestions"                   EN "Suggestions"
hideAll               FR "Tout masquer"                  EN "Hide them all"
hideAllDocs           FR "Tout masquer dans tous les documents"   EN "Hide them all in every document"
hidden                FR "Masqué"                        EN "Hidden"
undo                  FR "Annuler"                       EN "Undo"
dismiss               FR "Pas celui-ci"                  EN "Not this one"
onPage                (p) FR `Page ${p}`                 EN `Page ${p}`
notShown              FR "Pages non affichées dans l'aperçu"   EN "Pages not shown in the preview"
coverAll              FR "Les suggestions couvrent toutes les pages."   EN "Suggestions cover every page."
doneAll               (n, pages) FR `${n} zones masquées (pages ${pages}).`   EN `${n} areas hidden (pages ${pages}).`
none                  FR "Rien à suggérer sur ce document."   EN "Nothing to suggest on this document."
noText                FR "Pas de texte à lire sur ce document : tracez les zones vous-même."
                      EN "No text to read on this document: draw the areas yourself."
incomplete            FR "Les suggestions se sont arrêtées avant la fin de ce document."
                      EN "Suggestions stopped before the end of this document."
footer                FR "Les suggestions peuvent en oublier. Vérifiez vous-même toute la page. Les codes-barres et QR codes peuvent contenir les mêmes informations."
                      EN "Suggestions can miss things. Check the whole page yourself. Barcodes and QR codes can contain the same information."
note.frTax            FR "Le destinataire peut s'en servir pour vérifier que votre avis d'impôt est authentique. Ne le masquez que s'il n'en a pas besoin."
                      EN "The recipient may use it to check that your tax notice is genuine. Hide it only if they don't need that."
note.iban             FR "S'il vous a demandé vos coordonnées bancaires, il en a besoin."
                      EN "If they asked for your bank details, they need it."
kinds.iban            FR "Numéro de compte (IBAN)"       EN "Bank account number (IBAN)"
kinds.card            FR "Numéro de carte bancaire"      EN "Card number"
kinds.fr-nir          FR "Numéro de sécurité sociale"    EN "Social security number (France)"
kinds.fr-tax          FR "Numéro fiscal"                 EN "Tax number (France)"
kinds.fr-tax-ref      FR "Référence de l'avis d'impôt"   EN "Tax notice reference (France)"
```

## 11. Test plan

### 11.1 Unit (Bun)

- `lib/sensitive.test.ts`:
  - IBAN: valid examples from the ISO 13616 registry for FR, DE, GB, ES, NL, BE, PT, IT, plus a 34-character one (MT/LC); invalid: one digit changed, wrong country length, lowercase accepted, spaces in groups of 4 and irregular spaces accepted, text glued before and after rejected (`XFR76…`).
  - Card: test PANs (4111 1111 1111 1111, 5555 5555 5555 4444, 3782 822463 10005) match; Luhn-valid numbers with an unknown prefix do not; dates and phone numbers never match.
  - NIR: valid men/women, Corsica 2A/2B, wrong key rejected, spaced format.
  - FR tax: 13 digits with the label on the same line, on the line above; without a label: no match.
  - Normalisation: Persian and Arabic-Indic digits, full-width digits, no-break and thin spaces.
  - Overlaps: a number that is both Luhn-valid and a national number → the national number only.
  - Performance: 500 pages × 60 lines of random text with digits → `findSensitive` under 100 ms; pathological input (100,000 digits in one line, alternating separators) under 50 ms.
  - `masked` never contains more than 8 characters of the original.
- `lib/text-lines.test.ts`: synthetic items (plain objects) → line grouping, gap spaces, `hasEOL`, one-character items joined, off-page items dropped, rotated transform gives axis-aligned boxes, RTL page.
- `lib/i18n.test.ts`: `t.suggest` keys in 11 languages; `footer` non-empty everywhere.

### 11.2 Engine seam (`e2e/watermark.seam.e2e.ts`)

- Fixture PDFs generated with pdf-lib in the test, text at known coordinates:
  - A payslip-like page: NIR at a known spot, IBAN split into two text items, unrelated numbers (amounts, dates, a phone number).
  - The same page rotated 90° (`/Rotate`).
  - A 40-page PDF with an IBAN on page 30.
- Assertions: suggested rectangles cover the drawn text's bounding box (computed from pdf-lib's `widthOfTextAtSize` and font height) with the §5.6 margins (tolerance 1 % of page width); no rectangle for the amounts, dates and phone number; accepting all suggestions → the output page has black pixels over the text area, and the output contains no text at all (existing sanitisation check) — the masked digits are gone from the pixels too (sample the area: all black).
- Extraction cost: on the 500-page fixture, render time with `extractText` ≤ 1.10 × without.

### 11.3 UI (`e2e/features.e2e.ts` or `e2e/suggest.e2e.ts`)

- Watermark tool: drop the payslip fixture → banner shows "We found 2 numbers…" → Review → two outlines and two rows → tap one → it turns into a mask → Undo → back → Hide them all → download → the masked areas are black in the output.
- Page 30 of the 40-page fixture: listed under "Pages not shown in the preview", masked form shown, Hide → the downloaded page 30 is black at the spot.
- Sign tool: same banner and flow on a signed document.
- A photo (JPG) → no banner; in the mask editor, "No text to read…".
- Keyboard only: Tab to the panel, toggle with Space, "Hide them all" with Enter.
- `/ar/` and `/fa/`: panel mirrors; outlines stay on the numbers.
- Network: zero off-origin requests during the whole flow (existing harness).

### 11.4 Manual before release

- Real documents from 3 French employers' payslips, a French tax notice, a German Lohnabrechnung, a Spanish nómina, a RIB from 3 banks: count detections and misses, write the result (counts only, no document) in the PR.
- Check that the tax-notice note shows and reads well.

## 12. Success criteria

- No analytics. Judge from issues, guide feedback and the manual corpus: on the real-document set, at least 90 % of IBANs and NIRs suggested, and no more than one false suggestion per 20 pages.
- No report of Cachety hiding something without being asked (by design, there should be none).

## 13. Open questions

1. **"Hide them all in every document"** in v1 (recommended: yes, batches are common in the watermark tool) or later.
2. **Tax-notice categories** (`fr-tax`, `fr-tax-ref`): suggest them with the note (recommended), or leave them out entirely because they are often needed.
3. **Card numbers shown partially masked on the document** (`**** **** **** 1234`): not detected by design (Luhn fails). Confirm that is the wanted behaviour (recommended: yes, those are already masked).
4. **Banner placement on phones**: above the preview (recommended) or inside the step bar.

## 14. Deferred backlog

- `ocr-suggestions`: on-device OCR for photos and scans. Option: Tesseract.js, self-hosted under `public/` (`'wasm-unsafe-eval'` is already in the CSP for pdf.js and libheif; `connect-src 'self'` unchanged), loaded only when the person taps "Look for numbers in this photo", never precached by default. Cost: ~2.9 MB core + ~2.9 MB per Latin-script model; slower on phones. Needs its own PRD with timings on a mid-range Android.
- `barcode-hint`: detect 2D-Doc/QR codes on the page (`BarcodeDetector` where available: Chromium and Android; not in Firefox) and suggest them, with the authentication caveat of §4.4.
- `mrz`: machine-readable zone of passports and ID cards; only useful with OCR.
- More national numbers as languages are added (`more-languages`: Italian is already in the Should list, Korean RRN, Turkish TCKN).
