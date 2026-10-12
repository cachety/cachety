// Intégration chez les partenaires, de bout en bout : la page /embed/<langue>
// fonctionne dans un cadre autorisé (aperçu de la page partenaires, même
// origine), lit le pré-remplissage du fragment, ne transmet au parent que sa
// hauteur, et le navigateur refuse de l'afficher sur un site non autorisé.
//
// Fichier nommé *.e2e.ts : lancé par `bun run test:e2e`.

import { afterAll, afterEach, beforeAll, describe, expect, test } from "bun:test";
import { join } from "node:path";
import type { Browser, BrowserContext } from "playwright-core";
import { launchBrowser, MAP_UPSERT_POLYFILL } from "./helpers/browser";
import { E2E_ORIGIN, startServer, type E2eServer } from "./helpers/server";
import { STRINGS } from "../lib/i18n";

const OUT_DIR = join(import.meta.dir, "..", "out");
const t = STRINGS.en;
// Un autre site, absent de partners.json : port différent, donc autre origine.
const FOREIGN_PORT = 4182;
const FOREIGN = `http://127.0.0.1:${FOREIGN_PORT}`;

let server: E2eServer;
let foreign: ReturnType<typeof Bun.serve>;
let browser: Browser;
let context: BrowserContext | undefined;

beforeAll(async () => {
  server = startServer(OUT_DIR);
  foreign = Bun.serve({
    port: FOREIGN_PORT,
    hostname: "127.0.0.1",
    fetch: () =>
      new Response(`<!doctype html><title>x</title><iframe id="f" src="${E2E_ORIGIN}/embed/en" style="width:800px;height:600px"></iframe>`, {
        headers: { "Content-Type": "text/html" },
      }),
  });
  browser = await launchBrowser();
});

afterAll(async () => {
  await browser?.close();
  foreign?.stop();
  server?.stop();
});

afterEach(async () => {
  await context?.close();
  context = undefined;
});

async function open(url: string) {
  context = await browser.newContext({ serviceWorkers: "block", viewport: { width: 1280, height: 900 } });
  await context.addInitScript(MAP_UPSERT_POLYFILL);
  const page = await context.newPage();
  await page.goto(url);
  return page;
}

describe("page intégrée", () => {
  test(
    "seule : outil complet, bandeau vers cachety.com, pré-remplissage lu dans le fragment",
    async () => {
      const page = await open(`${E2E_ORIGIN}/embed/en#for=Gym%20membership&to=Northside%20Club`);
      await page.locator(`input[aria-label="${t.inputAria}"]`).waitFor({ state: "attached" });
      // Le pré-remplissage s'applique après le démarrage de la page : on l'attend.
      await page.waitForFunction(
        (label) => (document.querySelector(`input[placeholder="${label}"]`) as HTMLInputElement | null)?.value === "Gym membership",
        t.purpose.placeholder,
        { timeout: 15_000 }
      );
      expect(await page.getByLabel(t.purpose.label).inputValue()).toBe("Gym membership");
      expect(await page.getByRole("textbox", { name: t.recipients.aria(1) }).inputValue()).toBe("Northside Club");
      // Pas de menu du site ni de pied de page ; le bandeau renvoie vers cachety.com.
      expect(await page.locator("footer").count()).toBe(0);
      expect(await page.locator('a[href="https://cachety.com/en"]').count()).toBe(1);
    },
    30_000
  );

  test(
    "dans l'aperçu de la page partenaires (même origine) : affichée, et sa hauteur suit le contenu",
    async () => {
      const page = await open(`${E2E_ORIGIN}/en/partners`);
      const frame = page.frameLocator('iframe[src^="/embed/en"]');
      await frame.locator(`input[aria-label="${t.inputAria}"]`).waitFor({ state: "attached", timeout: 30_000 });
      // La page intégrée a envoyé sa hauteur : le cadre a été ajusté.
      await page.waitForFunction(
        () => {
          const h = parseInt((document.querySelector('iframe[src^="/embed/en"]') as HTMLIFrameElement).style.height);
          return h > 300 && h < 880;
        },
        null,
        { timeout: 15_000 }
      );
    },
    45_000
  );

  test(
    "chez un site non autorisé : le navigateur refuse de l'afficher",
    async () => {
      const page = await open(`${FOREIGN}/`);
      await page.waitForTimeout(2000);
      const embedded = page.frames().find((f) => f.url().startsWith(`${E2E_ORIGIN}/embed/`));
      const loaded = embedded
        ? await embedded.locator(`input[aria-label="${t.inputAria}"]`).count().catch(() => 0)
        : 0;
      expect(loaded).toBe(0);
    },
    30_000
  );

  test("le message au parent ne contient que la hauteur", async () => {
    context = await browser.newContext({ serviceWorkers: "block", viewport: { width: 1280, height: 900 } });
    await context.addInitScript(MAP_UPSERT_POLYFILL);
    // Écoute posée avant le chargement : aucun message ne peut passer inaperçu.
    await context.addInitScript(() => {
      if (window.top !== window) return;
      (window as any).__messages = [];
      window.addEventListener("message", (e) => (window as any).__messages.push(e.data));
    });
    const page = await context.newPage();
    await page.goto(`${E2E_ORIGIN}/en/partners`);
    await page.waitForFunction(() => (window as any).__messages.length > 0, null, { timeout: 20_000 });
    const messages: unknown[] = await page.evaluate(() => (window as any).__messages);
    for (const m of messages) expect(Object.keys(m as object).sort()).toEqual(["height", "type"]);
  }, 40_000);
});
