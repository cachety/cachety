// Après `next build` (avant gen-sw.mjs) : données structurées JSON-LD dans
// les pages, et sitemap.xml généré depuis la liste réelle des pages.
//
// Le JSON-LD est injecté ici, dans le HTML exporté, plutôt que par React :
// cela évite tout dangerouslySetInnerHTML (règle du projet, docs/security.md).
// Ce sont des données (type application/ld+json), jamais exécutées : la CSP
// ne les concerne pas et gen-sw.mjs ne les hache pas.

import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { AUTHOR, BRAND, REPO_URL, SITE_URL } from "../lib/brand";
import { compareIndexPath, comparePath, comparisonAlternates, COMPARISONS } from "../lib/compare";
import { GUIDES, guideAlternates, guidePath, guidesIndexPath } from "../lib/guides";
import {
  ABOUT_ALTERNATES,
  ABOUT_META,
  COMPARE_META,
  GUIDES_META,
  HREFLANG,
  LANG_CODES,
  PRIVACY_META,
  SITE_META,
  type Lang,
  type PageMeta,
} from "../lib/site-meta";
import { SITE_COPY } from "../lib/site-copy";
import { ROADMAP_COPY } from "../lib/roadmap";

const OUT = "out";
const TODAY = new Date().toISOString().slice(0, 10);

/**
 * Date du dernier commit touchant ces chemins (AAAA-MM-JJ). Un <lastmod> qui
 * change à chaque build est ignoré par les moteurs : on date chaque page par
 * ses vraies sources. Sans git (archive), date du jour.
 */
function gitDate(...paths: string[]): string {
  try {
    const d = execFileSync("git", ["log", "-1", "--format=%cs", "--", ...paths], { encoding: "utf8" }).trim();
    return d || TODAY;
  } catch {
    return TODAY;
  }
}
const ROADMAP_DATE = gitDate("lib/roadmap", "ROADMAP.md");
const SITE_DATE = gitDate("lib/site-copy.ts", "lib/i18n.tsx", "lib/site-meta.ts", "lib/locales", "components", "app");

// Projet personnel : l'auteur est aussi l'éditeur.
const author = { "@type": "Person", name: AUTHOR.name, url: AUTHOR.url };
const publisher = author;
const ogImageUrl = (lang: Lang) => `${SITE_URL}/og/${lang}.png`;
const homeUrl = (lang: Lang) => `${SITE_URL}/${lang}`;

/** Fil d'Ariane localisé : accueil de la langue, puis les étapes données. */
const breadcrumb = (lang: Lang, ...steps: { name: string; item: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: [{ name: BRAND, item: homeUrl(lang) }, ...steps].map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    ...s,
  })),
});

const faqPage = (faq: { q: string; a: string }[]) => ({
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

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

function home(lang: Lang, url: string) {
  const m = SITE_META[lang];
  const copy = SITE_COPY[lang];
  const webApp = {
    "@type": "WebApplication",
    "@id": `${SITE_URL}/#app`,
    name: BRAND,
    url,
    description: m.description,
    image: ogImageUrl(lang),
    screenshot: ogImageUrl(lang),
    featureList: copy.landing.features.map((f) => `${f.title}: ${f.body}`),
    sameAs: [REPO_URL],
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
  const webSite = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: BRAND,
    url: SITE_URL,
    inLanguage: LANG_CODES.map((l) => HREFLANG[l]),
    publisher,
  };
  return { "@context": "https://schema.org", "@graph": [webApp, webSite, faqPage(copy.landing.faq)] };
}

// Accueil : la racine (x-default) est en anglais, chaque /<lang> dans sa langue.
await inject("index.html", home("en", SITE_URL));
for (const lang of LANG_CODES) await inject(`${lang}.html`, home(lang, homeUrl(lang)));

/** Page simple (pourquoi filigraner, confidentialité) : WebPage + fil d'Ariane. */
function webPage(lang: Lang, type: string, meta: PageMeta, url: string, dateModified: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": type,
        name: meta.title,
        description: meta.description,
        url,
        inLanguage: HREFLANG[lang],
        dateModified,
        image: ogImageUrl(lang),
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#app` },
        author,
        publisher,
      },
      breadcrumb(lang, { name: meta.title, item: url }),
    ],
  };
}

/** Index des guides ou des comparatifs : CollectionPage + liste des pages. */
function collection(lang: Lang, meta: PageMeta, name: string, url: string, items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: meta.title,
        description: meta.description,
        url,
        inLanguage: HREFLANG[lang],
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: it.url })),
        },
      },
      breadcrumb(lang, { name, item: url }),
    ],
  };
}

await inject("about.html", webPage("en", "AboutPage", ABOUT_META.en, `${SITE_URL}${ABOUT_ALTERNATES["x-default"]}`, SITE_DATE));
for (const lang of LANG_CODES) {
  const nav = SITE_COPY[lang].nav;
  await inject(`${lang}/about.html`, webPage(lang, "AboutPage", ABOUT_META[lang], `${SITE_URL}${ABOUT_ALTERNATES[lang]}`, SITE_DATE));
  await inject(`${lang}/privacy.html`, webPage(lang, "WebPage", PRIVACY_META[lang], `${SITE_URL}/${lang}/privacy`, SITE_DATE));
  await inject(`${lang}/roadmap.html`, webPage(lang, "WebPage", ROADMAP_COPY[lang].meta, `${SITE_URL}/${lang}/roadmap`, ROADMAP_DATE));
  await inject(
    `${lang}/guides.html`,
    collection(lang, GUIDES_META[lang], nav.guides, `${SITE_URL}${guidesIndexPath(lang)}`,
      GUIDES[lang].map((g) => ({ name: g.title, url: `${SITE_URL}${guidePath(lang, g.slug)}` })))
  );
  await inject(
    `${lang}/compare.html`,
    collection(lang, COMPARE_META[lang], nav.compare, `${SITE_URL}${compareIndexPath(lang)}`,
      COMPARISONS[lang].map((c) => ({ name: c.title, url: `${SITE_URL}${comparePath(lang, c.slug)}` })))
  );
}

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
          datePublished: g.updated,
          dateModified: g.updated,
          image: ogImageUrl(lang),
          mainEntityOfPage: url,
          isPartOf: { "@id": `${SITE_URL}/#website` },
          author,
          publisher,
        },
        breadcrumb(
          lang,
          { name: SITE_COPY[lang].nav.guides, item: `${SITE_URL}${guidesIndexPath(lang)}` },
          { name: g.title, item: url }
        ),
        faqPage(g.faq),
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
          datePublished: c.updated,
          dateModified: c.updated,
          image: ogImageUrl(lang),
          mainEntityOfPage: url,
          isPartOf: { "@id": `${SITE_URL}/#website` },
          author,
          publisher,
          about: [
            { "@type": "SoftwareApplication", name: BRAND, url: SITE_URL, applicationCategory: "SecurityApplication" },
            { "@type": "SoftwareApplication", name: c.competitorName, url: c.competitorUrl },
          ],
          citation: c.sources.map((x) => x.url),
        },
        breadcrumb(
          lang,
          { name: SITE_COPY[lang].nav.compare, item: `${SITE_URL}${compareIndexPath(lang)}` },
          { name: c.title, item: url }
        ),
        faqPage(c.faq),
      ],
    });
  }
}
console.log("seo: JSON-LD injecté (accueil, à propos, confidentialité, index, guides, comparatifs)");

// La page 404 (servie pour toute URL inconnue) hérite du layout racine : ni
// canonique ni alternatives hreflang, qui la feraient passer pour l'accueil.
for (const file of ["404.html", "_not-found.html"]) {
  const path = join(OUT, file);
  if (!existsSync(path)) continue;
  const html = await readFile(path, "utf8");
  await writeFile(path, html.replace(/<link rel="(?:canonical|alternate)"[^>]*\/?>/g, ""));
}

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
entries.push({ path: "/", alternates: homeAlt, lastmod: SITE_DATE });
for (const l of LANG_CODES) entries.push({ path: `/${l}`, alternates: homeAlt, lastmod: SITE_DATE });
const indexDate: Record<string, string> = {
  "/about": SITE_DATE,
  "/privacy": SITE_DATE,
  "/roadmap": ROADMAP_DATE,
  "/guides": gitDate("lib/guides", "lib/site-meta.ts", "lib/locales"),
  "/compare": gitDate("lib/compare", "lib/site-meta.ts", "lib/locales"),
};
for (const suffix of ["/about", "/guides", "/compare", "/privacy", "/roadmap"]) {
  const alt = allLangs(suffix, suffix === "/about" ? "/about" : undefined);
  if (suffix === "/about") entries.push({ path: "/about", alternates: alt, lastmod: SITE_DATE });
  for (const l of LANG_CODES) entries.push({ path: `/${l}${suffix}`, alternates: alt, lastmod: indexDate[suffix] });
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

// ---- llms.txt ---------------------------------------------------------------
// Résumé du site pour les moteurs génératifs (format llmstxt.org) : généré
// depuis les mêmes textes que les pages, il ne peut pas les contredire.

const en = SITE_COPY.en;
const line = (name: string, path: string, desc?: string) => `- [${name}](${SITE_URL}${path})${desc ? `: ${desc}` : ""}`;
const llms = [
  `# ${BRAND}`,
  "",
  `> ${SITE_META.en.description}`,
  "",
  `${BRAND} (${SITE_URL}) is a free, open-source (AGPL-3.0) web app that adds a watermark to ID cards, passports, payslips, bank statements and other personal documents. The PDF or image is processed entirely in the visitor's browser and is never uploaded: there is no server that receives files. Source code: ${REPO_URL}. Author: ${AUTHOR.name} (${AUTHOR.url}).`,
  "",
  "## Features",
  "",
  ...en.landing.features.map((f) => `- ${f.title}: ${f.body}`),
  "",
  "## FAQ",
  "",
  ...en.landing.faq.flatMap((f) => [`### ${f.q}`, "", f.a, ""]),
  "## Pages",
  "",
  line(SITE_META.en.title, "/en", SITE_META.en.description),
  line(ABOUT_META.en.title, "/en/about", ABOUT_META.en.description),
  line(PRIVACY_META.en.title, "/en/privacy", PRIVACY_META.en.description),
  line(ROADMAP_COPY.en.meta.title, "/en/roadmap", ROADMAP_COPY.en.meta.description),
  "",
  "## Guides",
  "",
  ...GUIDES.en.map((g) => line(g.title, guidePath("en", g.slug), g.description)),
  "",
  "## Comparisons",
  "",
  ...COMPARISONS.en.map((c) => line(c.title, comparePath("en", c.slug), c.description)),
  "",
  "## Other languages",
  "",
  ...LANG_CODES.filter((l) => l !== "en").flatMap((l) => [
    line(`${SITE_META[l].title} (${HREFLANG[l]})`, SITE_META[l].path, SITE_META[l].description),
    ...GUIDES[l].map((g) => `  ${line(g.title, guidePath(l, g.slug))}`),
    ...COMPARISONS[l].map((c) => `  ${line(c.title, comparePath(l, c.slug))}`),
  ]),
  "",
].join("\n");
await writeFile(join(OUT, "llms.txt"), llms);
console.log(`seo: llms.txt (${llms.split("\n").length} lignes)`);
