# Cachety

**English** · [Français](README.fr.md) · [Español](README.es.md) · [العربية](README.ar.md) · [فارسی](README.fa.md) · [日本語](README.ja.md) · [简体中文](README.zh.md)

**Watermark your ID and sensitive documents without them ever leaving your device.**

Cachety adds a watermark to PDFs and photos (ID cards, passports, payslips, tax notices, bank statements) entirely inside your web browser. No file is ever uploaded: there is no server that could receive one. It's free, needs no account, has no tracking, and is open source.

### 👉 Use it now: **[cachety.com](https://cachety.com)**

Available in English, Français, Español, العربية, فارسی, 日本語 and 简体中文.

![Cachety: a PDF watermarked in the browser](docs/preview.png)

## Why it exists

People are constantly asked for copies of their papers, for renting a flat, starting a job or opening a bank account. Once sent, a bare copy can be reused for anything, including identity theft. A watermark that states what the copy is for, who it's for and the date ties it to that single use. France's national cybercrime-assistance service, [Cybermalveillance.gouv.fr](https://www.cybermalveillance.gouv.fr), recommends exactly this.

Most online watermark tools do it by uploading your ID to their servers. Cachety doesn't.

## Use the online version: it's the best way

You don't need to install or build anything. **[cachety.com](https://cachety.com)** is the version we recommend for everyone:

- **Just as private.** Even online, your files never leave your device: the page does all the work inside your browser, and it is technically forbidden from sending data anywhere. Check it yourself: load the page, switch on airplane mode, and watermark a document.
- **Better protected.** The official site is served with the full set of security headers (clickjacking protection, HSTS, cross-origin isolation, a strict per-page Content-Security-Policy). A home-made copy on a basic web server often misses some of them.
- **Always up to date.** Security fixes and improvements reach you on your next visit, with nothing to update.
- **Fast everywhere.** Served from a global CDN, so it opens quickly wherever you are, and works offline once loaded.
- **Comfortable on any device.** Works on computers, iPhone and Android. Add it to your home screen like an app; on Android, share a file straight to Cachety.
- **Help included.** A guided tour shows first-time visitors where to start, and practical guides explain common situations.

Self-hosting is still possible and fully supported (see below), for organisations that need it.

## Features

- **PDFs and images:** JPG, PNG, WebP, GIF, BMP, AVIF and iPhone photos (HEIC). One file or many at once (up to 200 MB per file, 500 pages per PDF).
- **Watermark across the whole page**, blended into the image. It can't be removed by simply editing the PDF, and its layout varies on each copy. Choice of font, size, colour, opacity and a wave effect.
- **Ready-made templates** (rental, bank, job…) and a one-tap "add today's date" button.
- **Hidden data stripped:** selectable text, metadata and the GPS location of photos. Each page is rebuilt from pixels.
- **Masking:** black out an IBAN, a tax number or a photo. The content is really removed, not just covered.
- **Traceable copies:** the date and a unique reference on each copy, plus a copy log you keep yourself.
- **Several recipients:** one personalised version per recipient (up to 20), in a single download.
- **Password:** AES-256 PDF encryption (PDF 2.0), with a strong-password generator and automatic clipboard clearing.
- **Maximum size per file** (1, 2, 5 or 10 MB) for upload portals that limit it.
- **Single PDF** in the order you choose (drag and drop), or a **ZIP** archive.
- **Works on phones**, can be installed as an app, and works **offline** once loaded.
- **7 languages**, with right-to-left layout for Arabic and Persian and dedicated fonts for each script.
- **Guided help tour** for first-time visitors, offered when someone seems unsure where to start.
- **42 practical guides** for everyday situations in France, the UK, Spain and Latin America, the Arab world, Iran, Japan and China.
- **45 fact-checked comparisons** with other watermark tools (FiligraneFacile, iLovePDF, Smallpdf, PDF24, Adobe Acrobat and more), with sources, including when another tool is the better choice.

## Privacy by design, and verifiable

- All processing happens in the browser (pdf.js, canvas, pdf-lib). Files only ever exist in memory as `File`/`Blob` objects.
- The Content-Security-Policy sets `connect-src 'self'`, so the browser itself refuses any request to another domain, even if malicious code somehow ran.
- There are no cookies, analytics, third-party scripts or accounts. Only display preferences are kept in `localStorage`. Fonts are served by the site itself.
- Every guarantee is enforced by automated tests that run on every change: CSP, the absence of external resources, sanitisation of output files, and a simulated exfiltration attempt.

Full threat model, controls and tests: **[docs/security.md](docs/security.md)**. To report a vulnerability, see **[SECURITY.md](SECURITY.md)**.

## Self-hosting

There's no need to trust our deployment: the site is a static export that you can host yourself.

Prerequisite: [Bun](https://bun.sh).

```sh
git clone https://github.com/cachety/cachety
cd cachety
bun install
bun run build      # static export in out/
bunx serve out     # or any static file server
```

`out/` can be dropped as-is onto any static host. Each page carries its own Content-Security-Policy in a `<meta>` tag, so the network lock still works without our HTTP headers. To get the same protection as cachety.com, also set the headers from `out/_headers`. See [docs/deploy.md](docs/deploy.md) for Cloudflare Pages, GitHub Pages and other servers.

## Development

```sh
bun run dev        # development server
bun test           # unit tests and static security checks
bun run test:e2e   # browser suite (CHROMIUM_EXE=/path/to/chrome to use a local Chrome)
```

Stack: Next.js (static export), React, Tailwind CSS, PDF.js, pdf-lib, libheif.

- Interface strings: `lib/i18n.tsx` (French, English, Japanese, Chinese) and `lib/locales/<lang>/strings.ts` (Spanish, Arabic, Persian).
- Website text: `lib/site-copy.ts` and `lib/locales/<lang>/site.ts`. Page metadata: `lib/site-meta.ts` and `lib/locales/<lang>/meta.ts`.
- Guides: `lib/guides/<lang>.ts`.
- Comparison pages ("Cachety vs X"): `lib/compare/<lang>.ts`. Every claim about another tool must cite its source (`sources`) and carry the date it was checked (`checked`), and each page must say when the other tool is the better choice. Re-check these facts regularly: services change.
- Right-to-left languages use logical Tailwind classes (`ms-`, `pe-`, `start-`, `end-`…) rather than `ml-`, `pr-`, `left-`, `right-`.

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
