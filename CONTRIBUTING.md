# Contributing to Cachety

Thank you for helping! Cachety is a small personal project, so clear, focused contributions are the easiest to accept.

## Ways to help

- **Report a bug or a wrong fact**, with the [issue forms](https://github.com/cachety/cachety/issues/new/choose). Never attach a real ID or personal document.
- **Fix a translation.** Native speakers of any of the 11 languages are very welcome.
- **Keep comparison pages accurate.** If a "Cachety vs X" page is out of date, open an issue or a pull request with a public source.
- **Security problems:** report them privately, never in a public issue. See [SECURITY.md](SECURITY.md).

## Getting started

Prerequisites: [Bun](https://bun.sh) 1.4 and Node.js 24 (see `.nvmrc`).

```sh
bun install
bun run dev        # http://localhost:3000
bun test           # unit tests and static security checks
bun run build      # static export in out/
bun run test:e2e   # browser suite (CHROMIUM_EXE=/path/to/chrome to use a local Chrome)
```

## Ground rules (they protect users' documents)

These are checked by tests and in review. A change that breaks one is not merged.

1. **Nothing leaves the browser.** No request to another domain, no analytics, no third-party script, font or image. The Content-Security-Policy (`connect-src 'self'`) must stay as strict as it is.
2. **No raw HTML from data.** No `dangerouslySetInnerHTML`, `innerHTML` or `eval`. Guides and comparisons are plain text.
3. **Every language keeps the same structure.** If you add a string, add it to all 11 languages (tests compare them).
4. **Right-to-left works.** Use logical Tailwind classes (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`, `text-start`) instead of `ml-`, `mr-`, `pl-`, `pr-`, `left-`, `right-`, `text-left`.
5. **Plain words.** Most users are not technical. Short sentences, no jargon, and no promise the code doesn't keep (see [docs/security.md](docs/security.md)).
6. **Comparison pages are factual and fair.** Every claim about another tool cites the vendor's public page (`sources`), carries the date it was checked (`checked`), and each page says honestly when the other tool is the better choice.

## Where things live

| What | Where |
| --- | --- |
| Tool interface strings | `lib/i18n.tsx`, `lib/locales/<lang>/strings.ts` |
| Website text | `lib/site-copy.ts`, `lib/locales/<lang>/site.ts` |
| Page metadata (SEO) | `lib/site-meta.ts`, `lib/locales/<lang>/meta.ts` |
| Guides | `lib/guides/<lang>.ts` |
| Comparisons | `lib/compare/<lang>.ts` |
| Watermark engine | `lib/watermark.ts`, `lib/watermark-style.ts` |
| Security headers and CSP | `public/_headers`, `scripts/gen-sw.mjs` |

## Pull requests

- Keep each pull request to one topic, and describe what it changes and why.
- Run `bun test` and, for interface changes, `bun run test:e2e` before opening it. CI runs everything again, including Firefox and WebKit.
- Contributions are accepted under the project's licence, the [GNU Affero General Public License v3.0](LICENSE).
