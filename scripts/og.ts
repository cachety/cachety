// Images de partage (Open Graph / X), 1200×630, une par langue :
// public/og/<lang>.png. Rendues par Chrome à partir d'une carte HTML, avec
// les polices du site (Space Grotesk, Cairo, Vazirmatn, Noto Sans JP/SC) et
// la mise en page de droite à gauche pour l'arabe et le persan.
//
// Outil de maintenance, PAS une étape du build (il faut un Chrome) : les PNG
// sont versionnés. À relancer quand le titre ou les promesses changent :
//
//   bun run assets && CHROMIUM_EXE="/chemin/vers/chrome" bun run scripts/og.ts

import { mkdir } from "node:fs/promises";
import { join, normalize } from "node:path";
import { chromium } from "playwright-core";
import { BRAND } from "../lib/brand";
import { exampleStamp, STRINGS } from "../lib/i18n";
import { SITE_COPY } from "../lib/site-copy";
import { dirOf, HREFLANG, LANG_CODES, type Lang } from "../lib/site-meta";

const ROOT = join(import.meta.dir, "..");
const OUT = join(ROOT, "public", "og");
const W = 1200;
const H = 630;

// Mêmes piles que app/globals.css : le latin en Space Grotesk, chaque
// écriture dans sa police.
const STACK: Record<Lang, string> = {
  fr: `"Space Grotesk Variable", sans-serif`,
  en: `"Space Grotesk Variable", sans-serif`,
  es: `"Space Grotesk Variable", sans-serif`,
  ar: `"Space Grotesk Variable", "Cairo Variable", sans-serif`,
  fa: `"Space Grotesk Variable", "Vazirmatn Variable", sans-serif`,
  ja: `"Space Grotesk Variable", "Noto Sans JP Variable", sans-serif`,
  zh: `"Space Grotesk Variable", "Noto Sans SC Variable", sans-serif`,
};

const FONT_FACES = `
@font-face { font-family: "Space Grotesk Variable"; font-weight: 300 700;
  src: url(/node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2) format("woff2-variations");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+20AC, U+2122, U+2212; }
@font-face { font-family: "Space Grotesk Variable"; font-weight: 300 700;
  src: url(/node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-ext-wght-normal.woff2) format("woff2-variations");
  unicode-range: U+0100-024F, U+1E00-1EFF, U+2C60-2C7F, U+A720-A7FF; }
@font-face { font-family: "Cairo Variable"; font-weight: 200 1000;
  src: url(/node_modules/@fontsource-variable/cairo/files/cairo-arabic-wght-normal.woff2) format("woff2-variations");
  unicode-range: U+0600-06FF, U+0750-077F, U+08A0-08FF, U+200C-200E, U+FB50-FDFF, U+FE70-FEFF; }
@font-face { font-family: "Vazirmatn Variable"; font-weight: 100 900;
  src: url(/node_modules/@fontsource-variable/vazirmatn/files/vazirmatn-arabic-wght-normal.woff2) format("woff2-variations");
  unicode-range: U+0600-06FF, U+0750-077F, U+08A0-08FF, U+200C-200E, U+FB50-FDFF, U+FE70-FEFF; }
`;

const LOGO = `<svg viewBox="0 0 48 48" width="64" height="64" aria-hidden="true">
  <rect width="48" height="48" rx="11" fill="#1a1e33"/>
  <defs><clipPath id="s"><path d="M12 8h17l7 7v25a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z"/></clipPath></defs>
  <path d="M12 8h17l7 7v25a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z" fill="#f2f3f0"/>
  <g clip-path="url(#s)" stroke="#c4262e" stroke-width="2.4" stroke-linecap="round">
    <path d="M8 22L26 8"/><path d="M8 30L36 10" opacity=".85"/><path d="M8 38L38 16" opacity=".7"/>
    <path d="M14 42L38 24" opacity=".55"/><path d="M24 42L38 32" opacity=".4"/>
  </g>
  <path d="M29 8v5a2 2 0 0 0 2 2h5z" fill="#c9cbc4"/>
</svg>`;

const CHECK = `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#15803d" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>`;

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function card(lang: Lang): string {
  const c = SITE_COPY[lang];
  const stamp = esc(exampleStamp(STRINGS[lang]));
  const rtl = dirOf(lang) === "rtl";
  // Filigrane du document : lignes de texte répétées, tournées comme sur le site.
  const rows = Array.from({ length: 9 }, () => `<div class="row">${`${stamp} · `.repeat(4)}</div>`).join("");
  const lines = Array.from({ length: 11 }, (_, i) => `<i style="width:${[92, 70, 84, 60, 88, 76, 52, 90, 66, 80, 58][i]}%"></i>`).join("");
  return `<!doctype html>
<html lang="${HREFLANG[lang]}" dir="${dirOf(lang)}">
<head>
<meta charset="utf-8">
${lang === "ja" ? '<link rel="stylesheet" href="/public/fonts/noto-sans-jp/index.css">' : ""}
${lang === "zh" ? '<link rel="stylesheet" href="/public/fonts/noto-sans-sc/index.css">' : ""}
<style>
${FONT_FACES}
* { box-sizing: border-box; margin: 0; }
html, body { width: ${W}px; height: ${H}px; }
body { font-family: ${STACK[lang]}; background: #f2f3f0; color: #1a1e33; overflow: hidden; position: relative; }
.wrap { position: absolute; inset: 0; display: flex; align-items: center; gap: 48px; padding: 56px 64px; }
.text { flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; gap: 26px; }
.brand { display: flex; align-items: center; gap: 16px; }
.brand b { font-size: 40px; font-weight: 700; letter-spacing: -0.02em; }
.brand span { display: block; font-size: 17px; color: #5c6072; margin-top: 2px; }
h1 { font-size: ${rtl || lang === "ja" || lang === "zh" ? 52 : 56}px; line-height: ${rtl ? 1.35 : 1.08}; font-weight: 700; letter-spacing: ${rtl ? "normal" : "-0.02em"}; text-wrap: balance; ${lang === "ja" ? "word-break: auto-phrase;" : ""} ${lang === "zh" ? "word-break: keep-all;" : ""} }
.pills { display: flex; flex-wrap: wrap; gap: 12px; }
.pill { display: inline-flex; align-items: center; gap: 8px; background: #fff; border: 2px solid #d8dad3; border-radius: 999px; padding: 8px 18px 8px 14px; font-size: 22px; font-weight: 500; }
.url { font-size: 24px; font-weight: 700; color: #c4262e; letter-spacing: 0.01em; }
.doc { flex: 0 0 360px; height: 460px; background: #fff; border-radius: 18px; box-shadow: 0 24px 60px rgba(26,30,51,.18), 0 2px 8px rgba(26,30,51,.08); transform: rotate(${rtl ? 4 : -4}deg); position: relative; overflow: hidden; }
.doc .head { height: 70px; background: #223f92; }
.doc .lines { padding: 26px 28px; display: flex; flex-direction: column; gap: 16px; }
.doc .lines i { display: block; height: 11px; border-radius: 6px; background: #e8e9ec; }
.wm { position: absolute; inset: -40%; transform: rotate(-35deg); display: flex; flex-direction: column; justify-content: center; gap: 30px; color: #c4262e; opacity: .55; font-weight: 700; font-size: 21px; white-space: nowrap; direction: ${rtl ? "rtl" : "ltr"}; }
.bar { position: absolute; left: 0; right: 0; bottom: 0; height: 10px; background: linear-gradient(90deg, #c4262e, #9e1c23); }
</style>
</head>
<body>
<div class="wrap">
  <div class="text">
    <div class="brand">${LOGO}<div><b>${BRAND}</b><span>${esc(c.nav.nameShort)}</span></div></div>
    <h1>${esc(c.hero.title)}</h1>
    <div class="pills">${c.hero.pills.map((p) => `<span class="pill">${CHECK}${esc(p)}</span>`).join("")}</div>
    <div class="url"><bdi dir="ltr">cachety.com</bdi></div>
  </div>
  <div class="doc"><div class="head"></div><div class="lines">${lines}</div><div class="wm">${rows}</div></div>
</div>
<div class="bar"></div>
</body>
</html>`;
}

// Petit serveur local : la carte charge les polices depuis node_modules et public/.
const server = Bun.serve({
  port: 0,
  hostname: "127.0.0.1",
  async fetch(req) {
    const path = decodeURIComponent(new URL(req.url).pathname);
    const lang = path.match(/^\/card\/([a-z]{2})$/)?.[1];
    if (lang && (LANG_CODES as readonly string[]).includes(lang)) {
      return new Response(card(lang as Lang), { headers: { "Content-Type": "text/html; charset=utf-8" } });
    }
    const file = normalize(join(ROOT, path));
    if (!file.startsWith(ROOT) || !/\.(woff2|css)$/.test(file)) return new Response("not found", { status: 404 });
    const f = Bun.file(file);
    if (!(await f.exists())) return new Response("not found", { status: 404 });
    return new Response(f, { headers: { "Content-Type": file.endsWith(".css") ? "text/css" : "font/woff2" } });
  },
});

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch(process.env.CHROMIUM_EXE ? { executablePath: process.env.CHROMIUM_EXE } : {});
try {
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  for (const lang of LANG_CODES) {
    await page.goto(`http://127.0.0.1:${server.port}/card/${lang}`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    // Garde-fou : un titre qui déborde serait coupé sur les réseaux sociaux.
    const overflow = await page.evaluate(() => {
      const t = document.querySelector(".text")!.getBoundingClientRect();
      return t.bottom > innerHeight - 20 || t.top < 20;
    });
    if (overflow) throw new Error(`og: le texte déborde de l'image (${lang})`);
    await page.screenshot({ path: join(OUT, `${lang}.png`) });
    console.log(`og: public/og/${lang}.png`);
  }
} finally {
  await browser.close();
  server.stop(true);
}
