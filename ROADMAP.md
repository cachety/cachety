# Roadmap and backlog

This file is the source of truth for what is planned. The public page
([cachety.com/en/roadmap](https://cachety.com/en/roadmap)) shows the items of
`lib/roadmap/`, which must keep the same ids as below
(`lib/roadmap/roadmap.test.ts` checks it). Backlog items marked *internal* are not
shown on the page.

Statuses: **next** (planned), **idea** (being considered), **shipped**.

## Next

### `per-recipient-password`: a different password for each recipient
- **Status:** next
- **Why:** today one password locks every copy. If several copies travel
  through a shared channel (one email thread, a shared folder), whoever has the
  password opens all of them. One password per recipient limits a leak to one
  copy.
- **Scope:**
  - Option "A different password for each recipient", on by default when
    there are several recipients and the password is generated.
  - The done screen lists name, code (if any) and password per recipient, with
    a Copy button per line and "Save this list". Nothing is stored.
  - Typing your own password switches back to one shared password.
  - With several documents, the files are per recipient (no single combined
    file for everyone), which is already the case.
- **Tests:** each recipient's file opens only with its own password; the list
  matches the files.

### `more-languages`: Italian, Korean, Turkish
- **Status:** next
- **Constraint:** none left on headers: rules are grouped per language
  (30 of 100 used; a language adds 2). See `docs/deploy.md`.

## Ideas

### `purpose-from-recipient`: purpose suggestions from the recipient
- **Status:** idea
- Typing "agency" could highlight the Housing example. Only after user tests
  show people start from the recipient.

### `local-word-lists`: easy-to-read passwords in your language
- **Status:** idea
- Per-language word lists of exactly 2,048 plain a-z words (no accents, no
  non-Latin script), reviewed by native speakers, so they type the same on any
  keyboard and in any PDF reader.

### `remember-signature`: remember my signature on this device
- **Status:** idea
- Opt-in only: keep the signature image on this device, with a plain sentence
  about what is stored and a one-click delete. Today the signature exists only
  in memory and is never written to storage (`docs/prd-sign.md` §4.4).

### `keep-vector-pages`: keep the text of signed PDFs
- **Status:** idea
- An overlay-only mode that keeps the original pages, so the text stays
  searchable. It needs its own sanitisation pass (metadata, attachments,
  JavaScript, annotations) and a seam test proving it, since rebuilding pages
  from pixels is what removes hidden data today.

## Backlog (internal)

- **Large batches:** show the progress bar and the All / Needs attention /
  Ready filters in the new layout only above about five documents (kept from
  the previous layout; re-check after user tests).
- **Native review:** the new tool wording in all 11 languages, especially
  Arabic, Persian, Japanese and Chinese. Also the sign wording: the legal
  section and FAQ of the sign page (FR and EN reviewed by a second reader
  before launch), and the two sign guides (`sign`, `sign-phone` topics) and
  sign roadmap entries in the nine languages other than French and English,
  which are drafts translated from the English guide. Each of those guide
  files marks them with a "Draft translation, awaiting native review" comment.
  The sign page's legal section, the "removed or reused" FAQ answer, the
  legal passages of the sign guides and the new hint under the mention
  presets (`block.mentionHint`) were rewritten on 2026-10-17 after a check
  against primary sources (eIDAS art. 25, Code civil art. 1367, 1376, 1175,
  décret 2017-1416, Cour de cassation 2022 and 2024, 1993 on "lu et
  approuvé"); the nine translations other than FR and EN need native review.
  The public "awaiting native review" sentence under the legal section was
  removed from those nine languages for v1.1.0; the review itself is still due.
  Also the partner page's tool choice and embed switch strings
  (`lib/partners-copy/*`), the nav label "Watermark" and the `sign-embed`
  roadmap text, added in English and French first.
  Dossier (2026-11-18): everything outside French and English is a draft
  translated from the English and marked "Draft translation, awaiting native
  review" where it lives: the tool strings (`dossier` block and
  `dossier_too_many_pages` in `lib/i18n.tsx` for ja and zh, and in
  `lib/locales/<lang>/strings.ts`), the page copy (`dossier` in
  `lib/site-copy.ts` and `lib/locales/<lang>/site.ts`), the page title and
  description (`lib/site-meta.ts`, `lib/locales/<lang>/meta.ts`), the nav
  label (`nav.dossier`: translated in ja, zh, es, ar, fa and id), the two
  guides (`dossier` and `size` topics), the `dossier` roadmap text, the
  partner builder labels and the one-line README entries. First things to
  check: the word chosen for "section", the five section presets (they become
  file names), the size sentences, and in the rental guides the paragraph
  about DossierFacile, which must say no more than the English one. The
  German and Dutch rental guides were adapted to local paperwork (Schufa,
  Mieterselbstauskunft; werkgeversverklaring, uittreksel BRP): check those too.
- **Dossier, released without its manual pass:** v1.2.0 went out on
  2026-11-19 on the automated suites only. Still to do by hand
  (`docs/prd-dossier.md` §11.5): the aeroplane-mode test on an iPhone and an
  Android phone, a real rental file uploaded to a real portal with a size
  limit, a 300-page file on an iPhone, and the outputs opened in Acrobat,
  Preview and a phone mail client. Also check on a real iPhone that a
  watermark on a text PDF is never drawn upside down (`nextTask` in
  `lib/watermark.ts`: seen with the test WebKit on Linux, not confirmed on
  Safari), and run the two `curl` checks of `docs/deploy.md` for the
  `/<lang>/:page` header rules.
- **Suggested areas, released without its manual pass:** the manual pass on real documents
  (`docs/prd-suggested-areas.md` §11.4): payslips from 3 French employers, a
  French tax notice, a German Lohnabrechnung, a Spanish nómina, bank details
  from 3 banks. Count detections and misses (counts only, no document), and
  check that the tax-notice note reads well. Target (§12): at least 90 % of
  IBANs and NIRs suggested, at most one false suggestion per 20 pages.
- **Suggested areas, native review:** the suggestion wording (`t.suggest`,
  `lib/suggest-copy/*`) in the nine languages other than French and English
  is a draft translated from English; each file says so in a comment. Same
  for the new README feature line in those languages.
- **Guides and comparisons for suggested areas and Dossier (2026-11-19),
  native review:** three guides on hiding numbers (`lib/guides/hide/*`), four
  guides for the Dossier tool (`lib/guides/dossier/*`) and five comparisons
  for merging and compressing (`lib/compare/dossier/*`). English and French
  are written by hand; the nine other languages are drafts and say so in a
  comment. They are localised, not literal: check first the local banking
  statements in the "hide" guides (direct-debit refund rights, card rules),
  which were checked against primary sources but not by a native speaker, and
  the quoted button labels, which must match the interface. The comparisons
  carry the same facts in every language (`lib/compare/compare.test.ts`
  checks rows, edges, sources and the `checked` date against English): when a
  vendor fact changes, change it in all 11 files and move the date.
- **Suggested areas, later:** on-device OCR for photos and scans
  (`ocr-suggestions`, about 5.8 MB of WebAssembly and model data for one
  script, needs its own PRD), barcode and QR code hints (`barcode-hint`),
  the machine-readable zone of passports (`mrz`), and more national numbers
  as languages are added. Vertical text (Japanese, Chinese) is not read yet.
  See `docs/prd-suggested-areas.md` §14.
- **Sign, later (v1.1+):** several placements per page (`multi-placement`), a
  self-hosted handwriting font for the Type tab (`script-font`), and per-country mention presets
  reviewed by native speakers (`more-mentions`). See `docs/prd-sign.md` §14.
- **Sign social image:** decided for v1 (`docs/prd-sign.md` §13.5): the sign
  pages reuse each language's social image (`public/og/<lang>.png`); a
  dedicated `sign-<lang>.png` from `scripts/og.ts` is for later.
- **User tests:** watch 3 to 5 non-technical people do "send your ID to a
  letting agency with the bank details hidden".

## Shipped

### v1.2.1: the page stays responsive while it works (2026-11)
Typing the watermark text froze Firefox at every pause: the canvas shadow
under each row is about a hundred times slower there than in Chromium or
WebKit (0.3 s of frozen page per PDF page, more than 20 s per page with the
wave option). The shadow is now drawn as one to four offset copies of the
text, which looks the same and costs the same in every browser; rows that
fall outside the page are skipped; and the watermark is drawn in slices of a
few milliseconds, so typing, scrolling and the display go on in between and a
render made useless by a new keystroke stops at once. The same pacing
(`lib/pace.ts`) now runs the photo tools of Dossier (straighten, whiten,
black and white) and the uploaded-signature tools (background, ink). Tests
fail if a render or typing holds the page for long
(`e2e/responsive.seam.e2e.ts`, `e2e/typing.e2e.ts`).

Known limit: WebKit (Safari) encodes images on the main thread, so the PNG
of a large photo still holds the page (about 2 s for 3,000 px in the Linux
test browser; real Safari not measured). Moving the encoding to a worker was
tried and withdrawn before release: in WebKit it made the page hang for good
within a few dozen signing batches (`lib/encode.ts`).

### `dossier`: one file to send (2026-11, v1.2.0)
A third tool at `/<lang>/dossier`: drop PDFs and photos; reorder, rotate and
remove single pages in a page grid; one PDF, one PDF per section or one per
document (ZIP); a size target (1, 2, 5, 10 MB or any value from 0.5 to 50)
with a readability floor and an estimate before download, measured on the
person's own pages; straighten, crop and clean up a photo of a paper page;
optional watermark, masks with suggested areas, password and fingerprint as
in the other tools; `#tools=dossier` in the partner embed. Pages are rebuilt
from pixels, as everywhere else. Six guides and five comparisons (iLovePDF,
Smallpdf, Adobe Acrobat, PDF24, Sejda) in all 11 languages. The header now
has two lines: the site, then the three tools.
Spec: [docs/prd-dossier.md](docs/prd-dossier.md).
Later: automatic corner detection, a `/compress` entry page, per-use-case
checklists, and a preview of the first pages of the whole file across
documents (today the preview is per document) (spec §14 and §5).

### `suggested-areas`: suggested areas to hide (2026-11)
On PDFs with a text layer, "Hide something" points out the IBANs, card
numbers, French social security and tax numbers, and national numbers
(Germany, Spain, the Netherlands, Belgium, Portugal, Brazil, Italy, China,
Japan, Iran, Indonesia) found on every page, on the device. A banner above
the preview says how many; each one is an outline on the page and a line in a
panel, hidden with one tap, or all at once, in one document or in every
document. Nothing is hidden automatically, and the panel always says that
suggestions can miss things (photos and scans are not read, nor are barcodes
and QR codes). A number is suggested only if its checksum passes or its label
is next to it. IBANs are recognised for the 89 countries of the registry and
22 more that use the format (Iran, Morocco, Algeria…). In the watermark, sign
and Dossier tools, in all 11 languages.
Spec: [docs/prd-suggested-areas.md](docs/prd-suggested-areas.md).

### `sign-embed`: signing on partner websites (2026-10)
Partners choose the tools in the embed code: watermark (default), sign, or
both with a switch (`#tools=watermark,sign`). Signing reads a pre-filled place
and note (`#place=…&note=…`); a pre-filled purpose or recipient also ticks
"add a watermark" on the signed copy. Same page `/embed/<lang>`, same
`partners.json` allow-list and headers. Switching tools with documents loaded
asks first, since only one tool is mounted at a time.

### `sign`: sign a document (2026-10)
A second mode at `/<lang>/sign`: draw, type or upload a signature, add the
date, place and a note if wanted, place it on a PDF or a photo, download a
signed PDF. Same network lock and airplane-mode test as the watermark tool;
the signature lives in memory only; pages are rebuilt from pixels. Options:
initial every page, add a watermark, make smaller, password lock (off by
default), SHA-256 fingerprint after download. It is a simple electronic
signature: no certificate, no timestamp, no proof of identity, and the page
says so. Two guides in all 11 languages. Spec: [docs/prd-sign.md](docs/prd-sign.md).

Comparison pages for the sign tool (2026-10-17): DocuSign, Youtrust (formerly
Yousign), Adobe Acrobat, iLovePDF and Smallpdf, in all 11 languages, in their
own "Sign" section of `/<lang>/compare` (data in `lib/compare/sign/`). Facts
checked on the publishers' pages and dated; each page says when the other tool
is the better choice (several signers, audit trail, advanced or qualified
signatures).


### `simpler-tool`: a simpler tool (2026-10)
Three steps in plain words, guided form for the watermark text with an
"Edit the text" option, preview tools (hide, adjust), sending options next to
Download, done screen with the password and codes.

### `easy-passwords`: easy-to-read passwords (2026-10)
12 random words from the BIP39 English list (132 bits) by default; the 256-bit
generator and your own password stay available.

### `partner-embed`: Cachety on partner websites (2026-10)
Approved partner sites (list in `partners.json`, requests by GitHub issue)
show the full tool in an iframe served by `/embed/<lang>` on cachety.com:
pre-filled purpose and recipient, accent colour, automatic height (only the
height crosses), `noindex`. Partner page at `/<lang>/partners` with the
embed code builder, reusable wording and a discreet "Used by" list.
Spec: [docs/embed.md](docs/embed.md).
