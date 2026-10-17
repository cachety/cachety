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

### `suggested-areas`: suggested areas to hide
- **Status:** next
- **Why:** people don't always know what to hide (account number, tax number,
  card number).
- **Scope:** detect IBANs, ID and tax numbers on the page (on the device, no
  network) and show them as tappable areas in "Hide something".

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
  Also the partner page's tool choice and embed switch strings
  (`lib/partners-copy/*`), the nav label "Watermark" and the `sign-embed`
  roadmap text, added in English and French first.
- **Sign, later (v1.1+):** several placements per page (`multi-placement`), a
  self-hosted handwriting font for the Type tab (`script-font`), fact-checked
  "Cachety vs Yousign / DocuSign / Adobe Fill & Sign / iLovePDF Sign /
  Smallpdf eSign" pages (`sign-comparisons`), and per-country mention presets
  reviewed by native speakers (`more-mentions`). See `docs/prd-sign.md` §14.
- **Sign social image:** decided for v1 (`docs/prd-sign.md` §13.5): the sign
  pages reuse each language's social image (`public/og/<lang>.png`); a
  dedicated `sign-<lang>.png` from `scripts/og.ts` is for later.
- **User tests:** watch 3 to 5 non-technical people do "send your ID to a
  letting agency with the bank details hidden".

## Shipped

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
