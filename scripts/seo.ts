// Après `next build` (avant gen-sw.mjs) : données structurées JSON-LD dans
// les pages, et sitemap.xml généré depuis la liste réelle des pages.
//
// Le JSON-LD est injecté ici, dans le HTML exporté, plutôt que par React :
// cela évite tout dangerouslySetInnerHTML (règle du projet, docs/security.md).
// Ce sont des données (type application/ld+json), jamais exécutées : la CSP
// ne les concerne pas et gen-sw.mjs ne les hache pas.

import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { AUTHOR, BRAND, REPO_URL, SITE_URL } from "../lib/brand";
import { compareIndexPath, comparePath, comparisonAlternates, COMPARISONS } from "../lib/compare";
import { GUIDES, guideAlternates, guidePath, guidesIndexPath } from "../lib/guides";
import { HREFLANG, LANG_CODES, SITE_META, type Lang } from "../lib/site-meta";
import { SITE_COPY } from "../lib/site-copy";

const OUT = "out";
const TODAY = new Date().toISOString().slice(0, 10);

// Projet personnel : l'auteur est aussi l'éditeur.
const author = { "@type": "Person", name: AUTHOR.name, url: AUTHOR.url };
const publisher = author;

/** JSON sûr dans un <script> : « < » échappé, aucune fermeture de balise possible. */
const ld = (data: object) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;

async function inject(file: string, data: object) {
  const path = join(OUT, file);
  if (!existsSync(path)) throw new Error(`seo: ${file} introuvable`);
  const html = await readFile(path, "utf8");
  if (!html.includes("</head>")) throw new Error(`seo: </head> absent de ${file}`);
  await writeFile(path, html.replace("</head>", `${ld(data)}</head>`));
}

function app(lang: Lang) {
  const m = SITE_META[lang];
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: BRAND,
    url: `${SITE_URL}${m.path}`,
    description: m.description,
    inLanguage: HREFLANG[lang],
    applicationCategory: "SecurityApplication",
    operatingSystem: "Any (web browser)",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    license: "https://www.gnu.org/licenses/agpl-3.0.html",
    codeRepository: REPO_URL,
    countryOfOrigin: "FR",
    author,
    publisher,
  };
}

// Accueil : la racine (x-default) est en anglais, chaque /<lang> dans sa langue.
await inject("index.html", app("en"));
for (const lang of LANG_CODES) await inject(`${lang}.html`, app(lang));

for (const lang of LANG_CODES) {
  for (const g of GUIDES[lang]) {
    const url = `${SITE_URL}${guidePath(lang, g.slug)}`;
    await inject(`${lang}/guides/${g.slug}.html`, {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          headline: g.title,
          description: g.description,
          inLanguage: HREFLANG[lang],
          dateModified: g.updated,
          mainEntityOfPage: url,
          author,
          publisher,
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: BRAND, item: `${SITE_URL}/${lang}` },
            { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}${guidesIndexPath(lang)}` },
            { "@type": "ListItem", position: 3, name: g.title, item: url },
          ],
        },
        {
          "@type": "FAQPage",
          mainEntity: g.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
      ],
    });
  }
}
for (const lang of LANG_CODES) {
  for (const c of COMPARISONS[lang]) {
    const url = `${SITE_URL}${comparePath(lang, c.slug)}`;
    await inject(`${lang}/compare/${c.slug}.html`, {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          headline: c.title,
          description: c.description,
          inLanguage: HREFLANG[lang],
          dateModified: c.updated,
          mainEntityOfPage: url,
          author,
          publisher,
          about: [
            { "@type": "SoftwareApplication", name: BRAND, url: SITE_URL, applicationCategory: "SecurityApplication" },
            { "@type": "SoftwareApplication", name: c.competitorName, url: c.competitorUrl },
          ],
          citation: c.sources.map((x) => x.url),
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: BRAND, item: `${SITE_URL}/${lang}` },
            { "@type": "ListItem", position: 2, name: SITE_COPY[lang].nav.compare, item: `${SITE_URL}${compareIndexPath(lang)}` },
            { "@type": "ListItem", position: 3, name: c.title, item: url },
          ],
        },
        {
          "@type": "FAQPage",
          mainEntity: c.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
      ],
    });
  }
}
console.log("seo: JSON-LD injecté (accueil, guides, comparatifs)");

// ---- sitemap.xml ------------------------------------------------------------
// hreflang : mêmes codes que les <link rel="alternate"> des pages (fr, en, ja, zh).

type Entry = { path: string; alternates?: Record<string, string>; lastmod?: string };

const allLangs = (suffix: string, xDefault?: string) => {
  const alt: Record<string, string> = {};
  for (const l of LANG_CODES) alt[l] = `/${l}${suffix}`;
  if (xDefault) alt["x-default"] = xDefault;
  return alt;
};

const entries: Entry[] = [];
const homeAlt = allLangs("", "/");
entries.push({ path: "/", alternates: homeAlt });
for (const l of LANG_CODES) entries.push({ path: `/${l}`, alternates: homeAlt });
for (const suffix of ["/about", "/guides", "/compare", "/privacy"]) {
  const alt = allLangs(suffix, suffix === "/about" ? "/about" : undefined);
  for (const l of LANG_CODES) entries.push({ path: `/${l}${suffix}`, alternates: alt });
}
for (const lang of LANG_CODES) {
  for (const g of GUIDES[lang]) {
    entries.push({ path: guidePath(lang, g.slug), alternates: guideAlternates(lang, g), lastmod: g.updated });
  }
  for (const c of COMPARISONS[lang]) {
    entries.push({ path: comparePath(lang, c.slug), alternates: comparisonAlternates(lang, c), lastmod: c.updated });
  }
}

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...entries.map((e) =>
    [
      "  <url>",
      `    <loc>${SITE_URL}${e.path}</loc>`,
      `    <lastmod>${e.lastmod ?? TODAY}</lastmod>`,
      ...Object.entries(e.alternates ?? {}).map(
        ([code, p]) => `    <xhtml:link rel="alternate" hreflang="${code}" href="${SITE_URL}${p}" />`
      ),
      "  </url>",
    ].join("\n")
  ),
  "</urlset>",
  "",
].join("\n");
await writeFile(join(OUT, "sitemap.xml"), xml);
console.log(`seo: sitemap.xml (${entries.length} URL)`);
