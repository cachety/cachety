# Cachety

**English** · [Français](README.fr.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Nederlands](README.nl.md) · [Bahasa Indonesia](README.id.md) · [العربية](README.ar.md) · [فارسی](README.fa.md) · [日本語](README.ja.md) · [简体中文](README.zh.md)

**Watermark your ID and sensitive documents without them ever leaving your device.**

Cachety adds a watermark to PDFs and photos (ID cards, passports, payslips, tax notices, bank statements) entirely inside your web browser. No file is ever uploaded: there is no server that could receive one. It's free, needs no account, has no tracking, and is open source.

### 👉 Use it now: **[cachety.com](https://cachety.com)**

Available in English, Français, Español, Português, Deutsch, Nederlands, Bahasa Indonesia, العربية, فارسی, 日本語 and 简体中文.

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
- **Three simple steps:** your document, what it's for and who gets it, then preview and download. The watermark text is written for you ("purpose, recipient, date", with ready-made examples) and can be edited freely.
- **Hidden data stripped:** selectable text, metadata and the GPS location of photos. Each page is rebuilt from pixels.
- **Masking:** black out an IBAN, a tax number or a photo. The content is really removed, not just covered.
- **Traceable copies:** add `{code}` to the text and every copy gets its own short reference, listed after download for you to keep.
- **Several recipients:** one copy per recipient (up to 20), each with their name on it, in a single download.
- **Password:** AES-256 PDF encryption (PDF 2.0). Ticking "Lock with a password" makes an easy-to-read password of 12 random words (132 bits, BIP39 word list); your own password or a random 256-bit one stay available. Automatic clipboard clearing.
- **File size shown before download**, with "Make it smaller" (10, 5, 2 or 1 MB) for upload portals and emails that limit it.
- **Single PDF** in the order you choose (drag and drop), or a **ZIP** archive.
- **Works on phones**, can be installed as an app, and works **offline** once loaded.
- **11 languages**, with right-to-left layout for Arabic and Persian and dedicated fonts for each script.
- **Guided help tour** for first-time visitors, offered when someone seems unsure where to start.
- **92 practical guides** for everyday situations in France, the UK, Germany, the Netherlands, Spain and Latin America, Brazil, Indonesia, the Arab world, Iran, Japan and China.
- **82 fact-checked comparisons** with other watermark tools (iLovePDF, Proton, Smallpdf, PDF24, Adobe Acrobat, KopieID, FiligraneFacile and more), with sources, including when another tool is the better choice.
- **On partner websites:** approved sites can show the watermark tool, the sign tool or both in their own pages (an iframe served by cachety.com, so the host site can't see the documents). See [docs/embed.md](docs/embed.md) and [cachety.com/en/partners](https://cachety.com/en/partners).

## Sign a document

Cachety can also sign a PDF, at **[cachety.com/en/sign](https://cachety.com/en/sign)**. Draw your signature with a finger, a stylus or the mouse, type your name, or upload a photo of it. Add the date, the place and a note such as "Read and approved" if you wish, place it on the page, and download a signed PDF.

- **Same promise:** nothing is uploaded. The sign page has the same network lock as the watermark tool, and the airplane-mode test works there too. Your signature only exists in the tab's memory and is never saved.
- **Flattened output:** each page is rebuilt from pixels, so the signature can't be moved or deleted by editing the PDF, and hidden text, metadata and photo GPS location are removed. The text is no longer selectable in the signed copy; your original stays untouched.
- **Options:** initial every page, add a watermark (purpose, recipient, date), make the file smaller, lock it with a password (off by default, so the recipient can open it), and keep a SHA-256 fingerprint of each file you send.
- **PDFs and photos**, several documents at once, on computers and phones, in all 11 languages.

**What it's worth:** a signature placed this way is a *simple electronic signature*. It is generally enough for everyday documents (rental paperwork, attestations, quotes, school and association forms). It is not a qualified signature: there is no certificate, no timestamp, and nothing that proves who signed. When a qualified signature or a specific platform is required, use that instead. This is not legal advice.

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

## Put Cachety on your website (partners)

Letting agencies, HR platforms, associations: approved websites can show the full tool in their own pages, so the people who send them documents can watermark them on the spot.

- **Private by design:** the tool runs in a frame served by cachety.com. The host page, and any script on it, can't read the documents. They never leave the visitor's device.
- **Customisable:** pre-filled purpose and recipient (visitors can still change them), button colour and language. Only the frame's height is sent to the host page.
- **Approved partners only:** the allowed websites are listed in [`partners.json`](partners.json). Every other site is refused by the browser.
- **Free**, like the rest of the project. A donation is welcome if it's useful to you.

**How to join:** [open a partner request](https://github.com/cachety/cachety/issues/new?template=partner.yml) with your website's address. Once it's approved and deployed, paste the embed code:

```html
<iframe src="https://cachety.com/embed/en#for=Rental%20application&to=Martin%20Lettings"
        title="Cachety" loading="lazy" allow="clipboard-write"
        style="width: 100%; min-height: 640px; border: 0"></iframe>
```

To offer signing too, add `tools=sign` (signing only) or `tools=watermark,sign` (both, the visitor switches) to the fragment, with an optional pre-filled place and note under the signature: `#tools=watermark,sign&place=Lyon&note=Agreed`.

The [partners page](https://cachety.com/en/partners) builds this code for you, with a live preview, the short script for automatic height, and wording you can reuse. Technical details: [docs/embed.md](docs/embed.md).

## Development

```sh
bun run dev        # development server
bun test           # unit tests and static security checks
bun run test:e2e   # browser suite (CHROMIUM_EXE=/path/to/chrome to use a local Chrome)
```

Stack: Next.js (static export), React, Tailwind CSS, PDF.js, pdf-lib, libheif.

- Interface strings: `lib/i18n.tsx` (French, English, Japanese, Chinese) and `lib/locales/<lang>/strings.ts` (the other languages).
- Website text: `lib/site-copy.ts` and `lib/locales/<lang>/site.ts`. Page metadata: `lib/site-meta.ts` and `lib/locales/<lang>/meta.ts`.
- Guides: `lib/guides/<lang>.ts`.
- Comparison pages ("Cachety vs X"): `lib/compare/<lang>.ts`. Every claim about another tool must cite its source (`sources`) and carry the date it was checked (`checked`), and each page must say when the other tool is the better choice. Re-check these facts regularly: services change.
- Social sharing images (`public/og/<lang>.png`, 1200×630) are generated from the site's own text and fonts with `bun run og` (needs Chrome: set `CHROMIUM_EXE`). Re-run it when the headline or the promises change.
- The screenshots (`docs/preview.png` for the watermark tool, `docs/preview-sign.png` for the sign tool, 1600×1075) are taken from the built site with `bun run build && bun run screenshot` (same `CHROMIUM_EXE`; `bun run screenshot sign` or `watermark` takes only one). Re-run it when the interface changes.
- Right-to-left languages use logical Tailwind classes (`ms-`, `pe-`, `start-`, `end-`…) rather than `ml-`, `pr-`, `left-`, `right-`.

Every language must keep the same structure; tests check this. Contribution rules and file map: **[CONTRIBUTING.md](CONTRIBUTING.md)**.

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

Easy-to-read passwords use the **[BIP39 English word list](https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt)** (MIT License, © 2013 Marek Palatinus, Pavol Rusnak, Aaron Voisine, Sean Bowe).

What's planned: **[ROADMAP.md](ROADMAP.md)**, also shown at [cachety.com/en/roadmap](https://cachety.com/en/roadmap).

Licensed under the **GNU Affero General Public License v3.0** ([LICENSE](LICENSE)). If you run a modified version as a service, the AGPL requires you to offer its source code to your users.
