# Partner embed: specification

Status: **defined, not built yet** (see `partner-embed` in [ROADMAP.md](../ROADMAP.md)).

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
| Scope | **Full tool**: documents, details, preview, hide, adjust, lock, download. Without the site menu, landing sections and footer. |
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

### Headers (`_headers`, generated)

- Embed rule: `/embed/*` with `frame-ancestors 'self' https://partner-a.example https://partner-b.example`
  built from `partners.json`, and `! X-Frame-Options` to remove the `DENY` set
  on `/*` (Cloudflare's header detach syntax). All other pages keep
  `frame-ancestors 'none'` and `X-Frame-Options: DENY`.
- `Cross-Origin-Opener-Policy` / `Cross-Origin-Embedder-Policy` checked so the
  frame still loads inside partner pages.
- One extra rule in the budget (30 of 100 today).

### Resizing

- The frame posts `{ type: "cachety:height", height: <number> }` to its
  parent, with the target origin set to the approved partner origin (taken
  from `document.referrer`, checked against the list), never `*`.
- A unit test checks that the message contains only those two fields.
- Partners paste a 10-line script (shown on the partner page, no external
  file) that listens for that message and sets the iframe height.

### Partner list (`partners.json`)

```json
[{ "domain": "https://www.partner.example", "name": "Partner", "since": "2026-11" }]
```

- Validated at build (https only, no wildcard, no path).
- Feeds `frame-ancestors`, the "Used by" list and the partner page.

### Partner page (`/<lang>/partners`)

- What the embed is and why it's private, in plain words.
- Copy-paste code with the options (language, purpose, recipient, accent)
  and a live preview.
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

## Open points

- Budget for the "Used by" list if partners grow (one line each, no logos at
  first).
- Whether the embed page should be indexed by search engines (proposal: no,
  `noindex`, and canonical to the main tool).
