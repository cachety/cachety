// Tests de fumée de l'interface (3, volontairement légers) sur l'export
// statique servi tel quel. Les libellés viennent de lib/i18n pour rester
// synchrones avec l'application.
//
// Fichier nommé *.e2e.ts : ignoré par `bun test` (unitaires) ; lancé
// explicitement par `bun run test:e2e`.

import { afterAll, afterEach, beforeAll, describe, expect, test } from "bun:test";
import { join } from "node:path";
import type { Browser, BrowserContext, Page } from "playwright-core";
import { browserName, launchBrowser, MAP_UPSERT_POLYFILL } from "./helpers/browser";
import { E2E_ORIGIN, startServer, type E2eServer } from "./helpers/server";
import { makePdf } from "./helpers/fixtures";
import { STRINGS } from "../lib/i18n";

const OUT_DIR = join(import.meta.dir, "..", "out");

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

async function openPage(path: string, options?: Parameters<Browser["newContext"]>[0]) {
  // Le service worker est bloqué : il mettrait l'export en cache entre les
  // tests et masquerait le serveur statique.
  context = await browser.newContext({ serviceWorkers: "block", ...options });
  await context.addInitScript(MAP_UPSERT_POLYFILL);
  const page = await context.newPage();
  await page.goto(`${E2E_ORIGIN}${path}`);
  return page;
}

/** Les contrôles d'en-tête existent en double (mobile + desktop) : on ne garde que le visible. */
function visible(page: Page, selector: string) {
  return page.locator(selector).filter({ visible: true }).first();
}

describe("fumée : interface", () => {
  test(
    "déposer un PDF + saisir le texte → statut « prêt » et téléchargement proposé",
    async () => {
      const t = STRINGS.fr;
      const page = await openPage("/fr");

      const pdf = await makePdf([[200, 300]]);
      await page
        .locator(`input[aria-label="${t.inputAria}"]`)
        .setInputFiles({ name: "quittance.pdf", mimeType: "application/pdf", buffer: Buffer.from(pdf) });
      await page
        .locator(`textarea[aria-label="${t.textareaAria}"]`)
        .fill("Copie réservée au test e2e");

      // L'aperçu auto attend 500 ms puis pdf.js rend la page : délai large.
      // (pas de @playwright/test ici : les attentes passent par waitFor.)
      await page
        .getByText(t.status.ready, { exact: true })
        .waitFor({ state: "visible", timeout: 30_000 });
      await page.locator("a[download]").waitFor({ state: "visible" });
    },
    60_000
  );

  test(
    "/en impose l'anglais ; le sélecteur passe en /ja via replaceState, sans navigation",
    async () => {
      const page = await openPage("/en");
      await page.getByText(STRINGS.en.dropTitle).waitFor({ state: "visible" });

      // Témoin : une vraie navigation le ferait disparaître.
      await page.evaluate(() => {
        (window as any).__pasDeNavigation = true;
      });

      await visible(page, 'button[aria-label="Langue / Language"]').click();
      await page.getByRole("option", { name: /日本語/ }).click();

      await page.getByText(STRINGS.ja.dropTitle).waitFor({ state: "visible" });
      expect(new URL(page.url()).pathname).toBe("/ja");
      expect(await page.evaluate(() => (window as any).__pasDeNavigation)).toBe(true);
    },
    30_000
  );

  // grantPermissions(clipboard-*) n'existe que sur Chromium ; le bouton est
  // couvert par le job Chromium bloquant de la CI, on saute ailleurs.
  test.skipIf(browserName() !== "chromium")(
    "le bouton Partager copie l'URL épinglant la langue",
    async () => {
      const page = await openPage("/en", {
        permissions: ["clipboard-read", "clipboard-write"],
      });
      // Fenêtre desktop (pointer non tactile) : le bouton copie toujours,
      // navigator.share n'est préféré que sur pointeur « coarse ».
      await visible(page, `button[aria-label="${STRINGS.en.share}"]`).click();

      await page.getByText(STRINGS.en.shareCopied).waitFor({ state: "visible" });
      expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
        `${E2E_ORIGIN}/en`
      );
    },
    30_000
  );
});
