// Navigation en deux lignes (components/SiteNav.tsx) : la barre du site (pages
// à lire, don, partage, langue) et la barre des outils (filigraner, signer,
// dossier), toujours visible. Ce qu'on vérifie : on change d'outil sans ouvrir
// de menu, sur ordinateur comme sur téléphone ; le menu ne contient que les
// pages à lire ; sur téléphone, la barre des outils s'efface pendant le travail.
//
// Fichier nommé *.e2e.ts : lancé par `bun run test:e2e`.

import { afterAll, afterEach, beforeAll, describe, expect, test } from "bun:test";
import { join } from "node:path";
import type { Browser, BrowserContext } from "playwright-core";
import { launchBrowser, MAP_UPSERT_POLYFILL } from "./helpers/browser";
import { E2E_ORIGIN, startServer, type E2eServer } from "./helpers/server";
import { SITE_COPY } from "../lib/site-copy";
import { LANG_CODES } from "../lib/site-meta";

const OUT_DIR = join(import.meta.dir, "..", "out");
const nav = SITE_COPY.en.nav;

let server: E2eServer;
let browser: Browser;
let context: BrowserContext | undefined;

beforeAll(async () => {
  server = startServer(OUT_DIR);
  browser = await launchBrowser();
});
afterAll(async () => {
  await browser?.close();
  server?.stop();
});
afterEach(async () => {
  await context?.close();
  context = undefined;
});

async function open(path: string, width: number, height = 900) {
  context = await browser.newContext({ serviceWorkers: "block", viewport: { width, height } });
  await context.addInitScript(MAP_UPSERT_POLYFILL);
  const page = await context.newPage();
  await page.goto(`${E2E_ORIGIN}${path}`);
  return page;
}

describe("navigation : deux lignes", () => {
  test(
    "ordinateur : les pages à lire sur la première ligne, les trois outils sur la seconde, celui de la page en évidence",
    async () => {
      const page = await open("/en", 1440);
      // Dans l'en-tête : le pied de page a sa propre navigation.
      const tools = page.locator("header").getByRole("navigation", { name: nav.tools });
      const site = page.locator("header").getByRole("navigation", { name: nav.menu });
      expect(await tools.getByRole("link").allInnerTexts()).toEqual([nav.tool, nav.sign, nav.dossier]);
      expect(await site.getByRole("link").allInnerTexts()).toEqual([nav.guides, nav.compare, nav.about, nav.privacy]);
      expect(await tools.getByRole("link", { name: nav.tool, exact: true }).getAttribute("aria-current")).toBe("page");
      // Deux lignes : la barre des outils est sous la barre du site.
      const a = (await site.boundingBox())!;
      const b = (await tools.boundingBox())!;
      expect(b.y).toBeGreaterThanOrEqual(a.y + a.height);

      // On change d'outil d'un clic.
      await tools.getByRole("link", { name: nav.dossier, exact: true }).click();
      await page.waitForURL(`${E2E_ORIGIN}/en/dossier`);
      expect(await tools.getByRole("link", { name: nav.dossier, exact: true }).getAttribute("aria-current")).toBe("page");
      expect(await tools.getByRole("link", { name: nav.tool, exact: true }).getAttribute("aria-current")).toBeNull();

      // Sur une page à lire : aucun outil en évidence, la page l'est.
      await site.getByRole("link", { name: nav.guides, exact: true }).click();
      await page.waitForURL(`${E2E_ORIGIN}/en/guides`);
      expect(await site.getByRole("link", { name: nav.guides, exact: true }).getAttribute("aria-current")).toBe("page");
      expect(await tools.locator('[aria-current="page"]').count()).toBe(0);
    },
    60_000
  );

  test(
    "téléphone : les outils restent visibles sans ouvrir le menu ; le menu ne liste que les pages à lire",
    async () => {
      const page = await open("/en/sign", 390, 844);
      const tools = page.getByRole("navigation", { name: nav.tools });
      for (const label of [nav.tool, nav.sign, nav.dossier]) {
        expect(await tools.getByRole("link", { name: label, exact: true }).isVisible()).toBe(true);
      }
      expect(await tools.getByRole("link", { name: nav.sign, exact: true }).getAttribute("aria-current")).toBe("page");
      expect(await page.locator("#site-menu").count()).toBe(0);

      await page.getByRole("button", { name: nav.menu, exact: true }).click();
      const menu = page.locator("#site-menu");
      expect(await menu.getByRole("link").allInnerTexts()).toEqual([nav.guides, nav.compare, nav.about, nav.privacy]);
      // Échap referme le menu.
      await page.keyboard.press("Escape");
      await menu.waitFor({ state: "detached" });

      await tools.getByRole("link", { name: nav.tool, exact: true }).click();
      await page.waitForURL(`${E2E_ORIGIN}/en`);
    },
    60_000
  );

  test(
    "téléphone : aux étapes 2 et 3 d'un outil, la barre des outils s'efface comme l'accroche",
    async () => {
      // Sur une page à lire : aucun outil n'y tient l'étape à jour, on la pose à
      // la main pour vérifier la règle de style (app/globals.css).
      const page = await open("/en/guides", 390, 844);
      const tools = page.getByTestId("tool-tabs");
      expect(await tools.isVisible()).toBe(true);
      await page.evaluate(() => (document.documentElement.dataset.toolStep = "2"));
      expect(await tools.isVisible()).toBe(false);
      await page.evaluate(() => (document.documentElement.dataset.toolStep = "1"));
      expect(await tools.isVisible()).toBe(true);
    },
    60_000
  );

  test(
    "téléphone de 390 px : dans les 11 langues, les trois outils tiennent sur une ligne, sans coupe ni débordement de l'en-tête",
    async () => {
      const page = await open("/en", 390, 844);
      for (const lang of LANG_CODES) {
        await page.goto(`${E2E_ORIGIN}/${lang}/guides`);
        await page.getByTestId("tool-tabs").waitFor();
        const m = await page.evaluate(() => {
          const links = [...document.querySelectorAll<HTMLElement>('[data-testid="tool-tabs"] a')];
          return {
            rows: new Set(links.map((a) => Math.round(a.getBoundingClientRect().top))).size,
            cut: links.filter((a) => {
              const s = a.querySelector("span")!;
              return s.scrollWidth > s.clientWidth + 1;
            }).length,
            overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          };
        });
        expect(m, lang).toEqual({ rows: 1, cut: 0, overflow: 0 });
      }
    },
    120_000
  );
});
