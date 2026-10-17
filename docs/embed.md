# Partner embed: specification

Status: **built** (2026-10). Code: `app/embed/[lang]/page.tsx`, `components/EmbedApp.tsx`,
`app/[lang]/partners/page.tsx`, `components/EmbedBuilder.tsx`, `lib/partners.ts`, `partners.json`,
`scripts/gen-sw.mjs` (headers). Tests: `lib/partners.test.ts`, `e2e/embed.e2e.ts`,
`e2e/security.static.test.ts`.

Partner websites (letting agencies, HR platforms, associations…) can show the
Cachety tool inside their own pages, in an iframe served by cachety.com. The
documents stay on the visitor's device: the partner's page can't read them,
and neither can we.

## Decisions

| Topic | Decision |
|---|---|
| Who can embed | **Approved partners only**: an allow-list of domains in `frame-ancestors`. |
| How to join | Partner opens a **GitHub issue** (template); approved domains live in a file in the repo (`partners.json`), reviewed and deployed with the site. |
| Customisation | **Pre-filled purpose**, **pre-filled recipient** (both still editable by the visitor), **accent colour**. Cachety's name and a "Runs on cachety.com" link always stay visible. |
| Tools | **Watermark** (default, so codes pasted before stay unchanged), **sign**, or **both** with a switch. Signing takes a **pre-filled place and note** under the signature. |
| Scope | **Full tool**: documents, details, preview, hide, adjust, lock, download (and, for signing, the signature, its placement, initials and the optional watermark). Without the site menu, landing sections and footer. |
| Terms | **Free**, with a gentle donation suggestion on the partner page. |
| Height | **Auto-resize**: the frame sends its height (a number) to the parent page, nothing else. |
| Language | **Set by the partner** in the embed URL (`/embed/fr`, `/embed/ja`…). |
| Partner help | A **partner page** with copy-paste embed code and a live preview, **privacy wording** partners can reuse, and a **"Used by"** list of partner sites. |

## Why it keeps every promise

- The iframe's origin is cachety.com. The browser's same-origin policy stops
  the partner page (and any script on it: analytics, ads, tag managers) from
  reading the frame's content, files or memory.
- Inside the frame, the usual CSP applies: `connect-src 'self'`, so even the
  embedded tool can't send anything anywhere.
- Only the allow-listed partners can frame the tool (`frame-ancestors`), so a
  random site can't wrap it in a misleading page.
- The visitor can always open the same tool on cachety.com from the visible
  link.

## Design

### Pages and URLs

- `/embed/<lang>` (outside the language folders on purpose: the `/fr/*` CSP
  rule must not match it, since its `frame-ancestors` differs).
- Pre-fill in the **fragment**: `https://cachety.com/embed/fr#for=Dossier%20location&to=Agence%20Martin&accent=%23005a9c`.
  The fragment is never sent to any server (not even in Cloudflare logs).
- Values are validated: text length limits as in the tool (purpose 80,
  recipient 60), accent restricted to `#rrggbb` with enough contrast against
  white (otherwise ignored).

### Tools (`tools`)

| Fragment | Shows |
|---|---|
| none, or `tools=watermark` | The watermark tool, as before. |
| `tools=sign` | The sign tool only. |
| `tools=watermark,sign` | Both, with a switch; the first listed opens first. |

- Unknown values are ignored; if nothing valid is left, the watermark tool
  shows (an old or mistyped code never breaks).
- Signing reads `place` and `note` (80 characters each), shown under the
  signature and editable by the visitor. A pre-filled `for` or `to` also
  ticks "add a watermark" on the signed copy, since it only has a use there.
- One tool is mounted at a time (both register page-wide paste and drop
  handlers). Switching with documents loaded shows an inline warning first:
  the documents of the tool being left are dropped. No `confirm()`, which
  browsers may block in cross-origin frames.
- The tools are read from the fragment after the page starts, so the frame
  shows an empty space for that instant instead of one tool replaced by the
  other.
- Same page and headers: no new route, no extra `_headers` rule.

### Headers (`_headers`, generated)

- Embed rule: `/embed/*` with `frame-ancestors 'self' https://partner-a.example https://partner-b.example`
  built from `partners.json`, and `! X-Frame-Options` to remove the `DENY` set
  on `/*` (Cloudflare's header detach syntax). All other pages keep
  `frame-ancestors 'none'` and `X-Frame-Options: DENY`.
- `Cross-Origin-Opener-Policy` / `Cross-Origin-Embedder-Policy` checked so the
  frame still loads inside partner pages.
- One extra rule in the budget (30 of 100 today).

### Resizing

- The frame posts `{ type: "cachety:height", height: <number> }` to each
  allowed origin (cachety.com and the partners), never `*`. The browser only
  delivers it when the parent's origin matches, so no other site receives it.
- A unit test checks that the message contains only those two fields.
- Partners paste a short script (shown on the partner page, no external
  file) that listens for that message and sets the iframe height.
- The height is re-sent a few times during the first seconds, in case the
  partner's listener starts after the frame.

### Partner list (`partners.json`)

```json
[{ "domain": "https://www.partner.example", "name": "Partner", "since": "2026-11" }]
```

- Validated at build (https only, no wildcard, no path).
- Feeds `frame-ancestors`, the "Used by" list and the partner page.

### Partner page (`/<lang>/partners`)

- What the embed is and why it's private, in plain words.
- Copy-paste code with the options (tools, language, purpose, recipient,
  accent, and for signing: place and note) and a live preview.
- Reusable wording, for example: "This tool runs on cachety.com. Your
  documents never leave your device: neither this site nor Cachety can see
  them."
- How to join (GitHub issue template), and the donation suggestion.
- "Used by": the partner list.

## Tests to add

- `_headers`: only `/embed/*` allows framing; its `frame-ancestors` equals the
  partner list; `X-Frame-Options` removed there only.
- Embed page: no site menu, landing or footer; "Runs on cachety.com" link
  present; pre-fill read from the fragment and validated.
- Resize message: only `type` and `height`, sent to the checked origin.
- e2e: the embed page loaded in an iframe from an allowed origin works, and
  from a non-allowed origin is refused by the browser.

## Settled points

- The embed page is never indexed: `noindex, nofollow` (meta and
  `X-Robots-Tag`), canonical to the main tool, absent from the sitemap.
- "Used by" is a small, colourless scrolling line on the partners page only
  (hidden while the list is empty, still under reduced motion).
- Downloads from an embedded frame: browsers may block a download started
  long after the click, so the done panel keeps a "Download again" link
  that always works.

## Adding a partner

1. Check the request (GitHub issue with the `partner` label): exact https
   origin, the site exists and matches the stated use.
2. Add `{ "domain": "https://…", "name": "…", "since": "YYYY-MM" }` to
   `partners.json`. The build fails on an invalid entry (`lib/partners.ts`).
3. Deploy: `frame-ancestors` on `/embed/*` and the "Used by" list update.
