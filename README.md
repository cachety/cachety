# Cachety

**Watermark your ID and sensitive documents without them ever leaving your device.**

Cachety adds a watermark to PDFs and photos (ID cards, passports, payslips, tax notices, bank statements) entirely inside your web browser. No file is ever uploaded: there is no server that could receive one. It's free, with no account and no ads, and open source.

**[cachety.com](https://cachety.com)** · Available in English, Français, 日本語 and 简体中文

![Cachety: a PDF watermarked in the browser](docs/preview.png)

## Why it exists

People are constantly asked for copies of their papers, for renting a flat, starting a job or opening a bank account. Once sent, a bare copy can be reused for anything, including identity theft. A watermark that states what the copy is for, who it's for and the date ties it to that single use. France's national cybercrime-assistance service, [Cybermalveillance.gouv.fr](https://www.cybermalveillance.gouv.fr), recommends exactly this.

Most online watermark tools do it by uploading your ID to their servers. Cachety doesn't.

## Features

- **PDFs and images:** JPG, PNG, WebP, GIF, BMP, AVIF and iPhone photos (HEIC). One file or hundreds at once.
- **Watermark across the whole page**, blended into the image. It can't be removed by simply editing the PDF, and its layout is randomised on each copy.
- **Hidden data stripped:** selectable text, metadata and the GPS location of photos. Each page is rebuilt from pixels.
- **Masking:** black out an IBAN, a tax number or a photo. The content is really removed, not just covered.
- **Traceable copies:** the date and a unique reference on each copy, plus a copy log you keep yourself.
- **Several recipients:** one personalised version per recipient, in a single download.
- **Password:** AES-256 PDF encryption (PDF 2.0), with a strong-password generator and automatic clipboard clearing.
- **Maximum size per file** (1, 2, 5 or 10 MB) for upload portals that limit it.
- **Single PDF** in the order you choose (drag and drop), or a **ZIP** archive.
- **Works on phones** and can be installed as an app. On Android, you can share a file straight to Cachety.
- **Works offline** once loaded. Try it: turn on airplane mode and keep going.
- **20+ practical guides** for everyday situations in France, the UK, Japan and China.

## Privacy by design, and verifiable

- All processing happens in the browser (pdf.js, canvas, pdf-lib). Files only ever exist in memory as `File`/`Blob` objects.
- The Content-Security-Policy sets `connect-src 'self'`, so the browser itself refuses any request to another domain, even if malicious code somehow ran.
- There are no cookies, analytics, third-party scripts or accounts. Only display preferences are kept in `localStorage`.
- Every guarantee is enforced by automated tests that run on every change: CSP, the absence of external resources, sanitisation of output files, and a simulated exfiltration attempt.

Full threat model, controls and tests: **[docs/security.md](docs/security.md)**. To report a vulnerability, see **[SECURITY.md](SECURITY.md)**.

## Self-hosting

There's no need to trust our deployment. The site is a static export that you can host yourself.

Prerequisite: [Bun](https://bun.sh).

```sh
git clone https://github.com/cachety/cachety
cd cachety
bun install
bun run build      # static export in out/
bunx serve out     # or any static file server
```

`out/` can be dropped as-is onto any static host. Each page carries its own Content-Security-Policy in a `<meta>` tag, so the network lock still works without our HTTP headers. See [docs/deploy.md](docs/deploy.md) for Cloudflare Pages, GitHub Pages and the headers to set on your own server.

## Development

```sh
bun run dev        # development server
bun test           # unit tests
bun run test:e2e   # browser suite (CHROMIUM_EXE=/path/to/chrome to use a local Chrome)
```

Stack: Next.js (static export), React, Tailwind CSS, PDF.js, pdf-lib, libheif.

- Interface strings live in `lib/i18n.tsx` (the tool) and `lib/site-copy.ts` (the website).
- Guides live in `lib/guides/<lang>.ts`.
- Comparison pages ("Cachety vs X") live in `lib/compare/<lang>.ts`. Every claim about another tool must cite its source (`sources`) and carry the date it was checked (`checked`), and each page must say when the other tool is the better choice. Re-check these facts regularly: services change.
- Metadata lives in `lib/site-meta.ts`.

Every language must keep the same structure; tests check this.

## Support the project

Cachety is free and will stay free. If it helped you, you can [support it on GitHub Sponsors](https://github.com/sponsors/amirhmoradi). Donations help pay for the domain and development tools, and above all for the time it takes.

There are no ads today. The project may one day show a few hand-picked sponsored links in the same spirit (encryption tools, open-source software, secure document sharing). The rules for those are strict and part of the privacy promise:

- clearly marked as sponsored;
- served from Cachety's own domain (images and links only): no ad network, no third-party script, no tracking pixel;
- never chosen from, or shown based on, anything the user puts in the tool;
- the Content-Security-Policy stays as strict as it is now (`connect-src 'self'`).

## Credits and licence

Cachety is a personal project, designed and maintained by **[Amir Moradi](https://amirmoradi.com)** in France.

It is a modified version of **[Filigrane Local](https://github.com/KazeTachinuu/filigrane-local)** by Hugo Sibony (KazeTachinuu). That project was itself a rewrite inspired by **[Filigraneur](https://github.com/cyberclarence/filigraneur)** by CyberClarence. Thank you to both. See [NOTICE](NOTICE) for details.

Licensed under the **GNU Affero General Public License v3.0** ([LICENSE](LICENSE)). If you run a modified version as a service, the AGPL requires you to offer its source code to your users.
