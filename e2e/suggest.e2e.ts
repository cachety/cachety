// Suggestions de masquage, de bout en bout dans l'interface : bandeau,
// panneau, contours sur l'aperçu, accepter, annuler, tout masquer, écarter,
// pages au-delà de l'aperçu, mode « signer », clavier seul, droite à gauche,
// puis relecture du fichier téléchargé (zones noires).
//
// docs/prd-suggested-areas.md §11.3.
//
// Fichier nommé *.e2e.ts : lancé par `bun run test:e2e`.

import { afterAll, afterEach, beforeAll, describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { unzipSync } from "fflate";
import { PDFDocument } from "pdf-lib";
import type { Browser, BrowserContext, Locator, Page } from "playwright-core";
import { browserName, launchBrowser, MAP_UPSERT_POLYFILL } from "./helpers/browser";
import { E2E_ORIGIN, startServer, type E2eServer } from "./helpers/server";
import { makeNoisePng, pageJpeg } from "./helpers/fixtures";
import { IBAN_PAGE_30, makeLongPdf, makeSuggestPayslip, type Box, type PayslipFixture } from "./helpers/suggest-fixtures";
import { STRINGS, type Lang } from "../lib/i18n";

const OUT_DIR = join(import.meta.dir, "..", "out");
const en = STRINGS.en;

let server: E2eServer;
let browser: Browser;
let context: BrowserContext | undefined;
let payslip: PayslipFixture;

beforeAll(async () => {
  server = startServer(OUT_DIR);
  browser = await launchBrowser();
  payslip = await makeSuggestPayslip();
});

afterAll(async () => {
  await browser?.close();
  server?.stop();
});

afterEach(async () => {
  for (const page of context?.pages() ?? []) await page.goto("about:blank").catch(() => {});
  await context?.close();
  context = undefined;
});

async function openPage(path: string, options?: Parameters<Browser["newContext"]>[0]) {
  context = await browser.newContext({ serviceWorkers: "block", viewport: { width: 1440, height: 900 }, ...options });
  await context.addInitScript(MAP_UPSERT_POLYFILL);
  const page = await context.newPage();
  await page.goto(`${E2E_ORIGIN}${path}`);
  return page;
}

type File = { name: string; bytes: Uint8Array; mimeType?: string };
async function addFiles(page: Page, files: File[], label = en.inputAria) {
  await page
    .locator(`input[aria-label="${label}"]`)
    .setInputFiles(files.map((f) => ({ name: f.name, mimeType: f.mimeType ?? "application/pdf", buffer: Buffer.from(f.bytes) })));
}

const banner = (page: Page) => page.getByTestId("suggestions-banner");
const panel = (page: Page) => page.getByTestId("suggestions-panel");
const outlines = (page: Page) => page.getByTestId("suggestion-outline");
/** Ligne du panneau (bouton à bascule) dont le nom contient `name`. */
const row = (page: Page, name: string) => panel(page).locator("button[aria-pressed]").filter({ hasText: name });
const exact = (page: Page, name: string) => page.getByRole("button", { name, exact: true });

/** Le rendu en cours est terminé : l'aperçu affiché est à jour. */
async function settled(page: Page) {
  await page.waitForFunction(() => !document.querySelector('#apercu [aria-busy="true"]'), null, { timeout: 60_000 });
}

/** Ouvre le panneau depuis le bandeau. */
async function review(page: Page, t = en) {
  await banner(page).waitFor({ timeout: 60_000 });
  await settled(page);
  await exact(page, t.suggest.review).click();
  await panel(page).waitFor();
}

/** « Terminé », puis attend le nouveau rendu : le bouton « Masqué : n » en témoigne. */
async function done(page: Page, hiddenCount: number, t = en) {
  await exact(page, t.mask.done).click();
  await exact(page, t.tools.hidden(hiddenCount)).waitFor({ timeout: 60_000 });
  await settled(page);
}

async function download(page: Page, t = en) {
  const button = exact(page, t.download.one).and(page.locator(":enabled")).last();
  await button.waitFor({ timeout: 60_000 });
  const [file] = await Promise.all([page.waitForEvent("download", { timeout: 60_000 }), button.click()]);
  return { name: file.suggestedFilename(), bytes: new Uint8Array(readFileSync((await file.path())!)) };
}

/** Luminance maximale et part de pixels sombres d'une zone (fractions de page) d'une page produite (JPEG). */
function brightness(page: Page, jpeg: Uint8Array, region: Box) {
  return page.evaluate(
    async ({ b64, r }) => {
      const data = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
      const bmp = await createImageBitmap(new Blob([data], { type: "image/jpeg" }));
      const c = document.createElement("canvas");
      c.width = bmp.width;
      c.height = bmp.height;
      const ctx = c.getContext("2d")!;
      ctx.drawImage(bmp, 0, 0);
      const x0 = Math.ceil(r.x * bmp.width);
      const y0 = Math.ceil(r.y * bmp.height);
      const w = Math.max(1, Math.floor((r.x + r.w) * bmp.width) - x0);
      const h = Math.max(1, Math.floor((r.y + r.h) * bmp.height) - y0);
      const d = ctx.getImageData(x0, y0, w, h).data;
      let max = 0;
      let dark = 0;
      for (let i = 0; i < d.length; i += 4) {
        const lum = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
        if (lum > max) max = lum;
        if (lum < 128) dark++;
      }
      return { max, darkShare: dark / (d.length / 4) };
    },
    { b64: Buffer.from(jpeg).toString("base64"), r: region }
  );
}

/**
 * Le filigrane passe par-dessus les masques : une zone masquée n'est pas
 * noire partout, mais elle ne garde rien de clair qui ne soit du filigrane.
 * On vérifie donc qu'elle est très majoritairement sombre.
 */
async function expectMasked(page: Page, jpeg: Uint8Array, box: Box) {
  expect((await brightness(page, jpeg, box)).darkShare).toBeGreaterThan(0.7);
}
/** Zone restée lisible : du papier clair, peu d'encre. */
async function expectReadable(page: Page, jpeg: Uint8Array, box: Box) {
  const b = await brightness(page, jpeg, box);
  expect(b.max).toBeGreaterThan(200);
  expect(b.darkShare).toBeLessThan(0.6);
}

/** Position d'un élément en fractions de la surface de tracé. */
async function fraction(surface: Locator, el: Locator): Promise<Box> {
  const s = (await surface.boundingBox())!;
  const b = (await el.boundingBox())!;
  return { x: (b.x - s.x) / s.width, y: (b.y - s.y) / s.height, w: b.width / s.width, h: b.height / s.height };
}

describe("outil filigrane : du bandeau au fichier téléchargé", () => {
  test(
    "bandeau « 2 numéros », Voir, deux contours et deux lignes ; toucher, annuler, tout masquer ; les zones sont noires dans le fichier ; rien ne sort du navigateur",
    async () => {
      context = await browser.newContext({ serviceWorkers: "block", viewport: { width: 1440, height: 900 } });
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
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await page.goto(`${E2E_ORIGIN}/en`);

      await addFiles(page, [{ name: "payslip.pdf", bytes: payslip.bytes }]);
      await page.getByLabel(en.purpose.label).fill("Rental application");

      // Le bandeau : un message d'état, rien n'est encore masqué.
      await banner(page).waitFor({ timeout: 60_000 });
      expect(await banner(page).getAttribute("role")).toBe("status");
      expect(await banner(page).innerText()).toContain(en.suggest.banner(2));
      expect(await exact(page, en.tools.hide).count()).toBe(1);
      expect(await outlines(page).count()).toBe(0);

      await review(page);
      // Deux contours décoratifs sur la page, deux lignes dans le panneau.
      expect(await outlines(page).count()).toBe(2);
      expect(await outlines(page).first().getAttribute("aria-hidden")).toBe("true");
      const rows = panel(page).locator("button[aria-pressed]");
      expect(await rows.count()).toBe(2);
      expect(await rows.allInnerTexts()).toEqual([
        expect.stringContaining(en.suggest.kinds["fr-nir"]),
        expect.stringContaining(en.suggest.kinds.iban),
      ]);
      // Seule la forme masquée du numéro est écrite ; l'IBAN porte sa note.
      const text = await panel(page).innerText();
      expect(text).toContain("FR14 •••• •••• 2606");
      expect(text).not.toContain("2004");
      expect(text).toContain(en.suggest.note.iban);
      expect(text).toContain(en.suggest.footer);
      expect(await panel(page).getByText(en.suggest.onPage(1), { exact: true }).count()).toBe(1);

      // Les contours sont sur les numéros.
      const surface = page.getByRole("application", { name: en.mask.surface(1) });
      for (const [i, spot] of payslip.spots.entries()) {
        const at = await fraction(surface, outlines(page).nth(i));
        expect(at.x).toBeLessThanOrEqual(spot.box.x + 0.005);
        expect(at.x + at.w).toBeGreaterThanOrEqual(spot.box.x + spot.box.w - 0.005);
        expect(Math.abs(at.y + at.h / 2 - (spot.box.y + spot.box.h / 2))).toBeLessThan(0.01);
      }

      // Toucher un contour : il devient un masque ordinaire, sa ligne dit « Masqué » et « Annuler ».
      await outlines(page).first().click();
      await page.getByRole("button", { name: en.mask.area(1), exact: true }).waitFor();
      expect(await outlines(page).count()).toBe(1);
      const nir = row(page, en.suggest.kinds["fr-nir"]);
      expect(await nir.getAttribute("aria-pressed")).toBe("true");
      expect(await nir.innerText()).toContain(en.suggest.hidden);
      expect(await nir.innerText()).toContain(en.suggest.undo);
      // Annoncé aux lecteurs d'écran.
      await panel(page).getByText(en.suggest.announce(en.suggest.kinds["fr-nir"], 1, true)).waitFor({ state: "attached" });

      // Annuler : retour à l'état d'avant.
      await nir.click();
      expect(await nir.getAttribute("aria-pressed")).toBe("false");
      expect(await outlines(page).count()).toBe(2);
      expect(await page.getByRole("button", { name: en.mask.area(1), exact: true }).count()).toBe(0);

      // Tout masquer : confirmation dans le panneau, annulable.
      await exact(page, en.suggest.hideAll).click();
      const confirmation = page.getByTestId("suggestions-done");
      await confirmation.waitFor();
      expect(await confirmation.innerText()).toContain(en.suggest.doneAll(2, "1", 1));
      expect(await rows.evaluateAll((els) => els.map((e) => e.getAttribute("aria-pressed")))).toEqual(["true", "true"]);
      expect(await outlines(page).count()).toBe(0);
      await confirmation.getByRole("button", { name: en.suggest.undo }).click();
      expect(await outlines(page).count()).toBe(2);
      await exact(page, en.suggest.hideAll).click();

      // Rien n'est appliqué avant « Terminé » : un seul nouveau rendu.
      await done(page, 2);
      expect(await banner(page).count()).toBe(0);

      const file = await download(page);
      expect(file.name).toBe(`payslip-${en.suffix}.pdf`);
      const jpeg = await pageJpeg(file.bytes, 0);
      for (const spot of payslip.spots) await expectMasked(page, jpeg, spot.box);
      for (const decoy of payslip.decoys.slice(0, 4)) await expectReadable(page, jpeg, decoy);

      // Du dépôt au téléchargement : aucune requête hors de l'origine, aucune violation CSP.
      const offOrigin = requests.filter((u) => !u.startsWith(`${E2E_ORIGIN}/`) && !u.startsWith("blob:") && !u.startsWith("data:"));
      expect(offOrigin).toEqual([]);
      expect(await page.evaluate(() => (window as any).__csp)).toEqual([]);
      expect(errors).toEqual([]);
    },
    180_000
  );

  test(
    "« Pas celui-ci » écarte une suggestion ; « Annuler » n'applique rien",
    async () => {
      const page = await openPage("/en");
      await addFiles(page, [{ name: "payslip.pdf", bytes: payslip.bytes }]);
      await page.getByLabel(en.purpose.label).fill("Rental application");
      await review(page);

      // Écarter l'IBAN : sa ligne et son contour disparaissent.
      await panel(page).getByRole("button", { name: new RegExp(`^${en.suggest.dismiss}`) }).nth(1).click();
      expect(await row(page, en.suggest.kinds.iban).count()).toBe(0);
      expect(await outlines(page).count()).toBe(1);
      // La croix d'un contour fait de même.
      await page.getByTestId("suggestion-dismiss").first().click();
      expect(await outlines(page).count()).toBe(0);
      await panel(page).getByText(en.suggest.none).waitFor();

      await exact(page, en.mask.cancel).click();
      // Tout est écarté : plus de bandeau, et rien n'a été masqué.
      await exact(page, en.tools.hide).waitFor();
      expect(await banner(page).count()).toBe(0);
    },
    120_000
  );

  test(
    "accepter puis « Annuler » (la barre) : aucun masque appliqué, le bandeau revient",
    async () => {
      const page = await openPage("/en");
      await addFiles(page, [{ name: "payslip.pdf", bytes: payslip.bytes }]);
      await page.getByLabel(en.purpose.label).fill("Rental application");
      await review(page);
      await exact(page, en.suggest.hideAll).click();
      await exact(page, en.mask.cancel).click();
      await exact(page, en.tools.hide).waitFor();
      expect(await banner(page).innerText()).toContain(en.suggest.banner(2));
    },
    120_000
  );
});

describe("pages au-delà de l'aperçu", () => {
  test(
    "IBAN page 30 d'un PDF de 40 pages : listé sous « Pages non affichées », masqué dans le fichier",
    async () => {
      const long = await makeLongPdf(40, 30);
      const page = await openPage("/en");
      await addFiles(page, [{ name: "lease.pdf", bytes: long.bytes }]);
      await page.getByLabel(en.purpose.label).fill("Rental application");
      await review(page);

      // Aucun contour : la page 30 n'est pas dans l'aperçu.
      expect(await outlines(page).count()).toBe(0);
      const group = panel(page).getByRole("group", { name: en.suggest.notShown });
      await group.waitFor();
      const line = group.locator("button[aria-pressed]");
      expect(await line.count()).toBe(1);
      const text = await line.innerText();
      expect(text).toContain(en.suggest.onPage(30));
      expect(text).toContain("DE89 •••• •••• 3000");
      expect(text).not.toContain(IBAN_PAGE_30);
      // Le message de limite de l'aperçu le dit aussi.
      await page.getByText(en.suggest.coverAll).waitFor();

      await line.click();
      expect(await line.getAttribute("aria-pressed")).toBe("true");
      await done(page, 1);

      const file = await download(page);
      expect((await PDFDocument.load(file.bytes)).getPageCount()).toBe(40);
      await expectMasked(page, await pageJpeg(file.bytes, 29), long.spot.box);
      // La page voisine, au même endroit, n'a rien de masqué.
      expect((await brightness(page, await pageJpeg(file.bytes, 28), long.spot.box)).darkShare).toBeLessThan(0.6);
    },
    240_000
  );
});

describe("plusieurs documents", () => {
  test(
    "« Tout masquer dans tous les documents » : chaque document reçoit ses masques ; annulable",
    async () => {
      const long = await makeLongPdf(3, 2);
      const page = await openPage("/en");
      await addFiles(page, [
        { name: "payslip.pdf", bytes: payslip.bytes },
        { name: "lease.pdf", bytes: long.bytes },
      ]);
      await page.getByLabel(en.purpose.label).fill("Rental application");
      await page.getByText(en.status.ready, { exact: true }).nth(1).waitFor({ timeout: 60_000 });
      // L'aperçu sur le bulletin de paie.
      await page.locator("#apercu select").first().selectOption({ label: "payslip.pdf" });
      await review(page);

      await exact(page, en.suggest.hideAllDocs).click();
      await page.getByTestId("suggestions-done").waitFor();
      // Annuler défait aussi les autres documents.
      await page.getByTestId("suggestions-done").getByRole("button", { name: en.suggest.undo }).click();
      expect(await outlines(page).count()).toBe(2);
      await exact(page, en.suggest.hideAllDocs).click();
      await done(page, 3);

      // Plus rien à traiter ailleurs : le bouton « tous les documents » n'est plus proposé.
      await exact(page, en.tools.hidden(3)).click();
      await panel(page).waitFor();
      expect(await exact(page, en.suggest.hideAllDocs).count()).toBe(0);
      await exact(page, en.mask.cancel).click();

      // Fichiers séparés : chaque document porte ses zones noires.
      await page.getByRole("radio", { name: en.send.zip }).click();
      const zip = await download(page);
      const files = unzipSync(zip.bytes);
      const slip = files[`payslip-${en.suffix}.pdf`];
      const lease = files[`lease-${en.suffix}.pdf`];
      for (const spot of payslip.spots) await expectMasked(page, await pageJpeg(slip, 0), spot.box);
      await expectMasked(page, await pageJpeg(lease, 1), long.spot.box);
    },
    240_000
  );
});

describe("outil « signer »", () => {
  test(
    "même bandeau et même parcours sur un document signé",
    async () => {
      const page = await openPage("/en/sign");
      await addFiles(page, [{ name: "payslip.pdf", bytes: payslip.bytes }], en.sign.inputAria);
      // Une signature tapée au clavier.
      await page.getByRole("tab", { name: en.sign.pad.type }).click();
      await page.getByLabel(en.sign.pad.typeLabel).fill("Camille Durand");

      await banner(page).waitFor({ timeout: 60_000 });
      expect(await banner(page).innerText()).toContain(en.suggest.banner(2));
      await exact(page, en.download.one).and(page.locator(":enabled")).last().waitFor({ timeout: 60_000 });
      await review(page);
      expect(await outlines(page).count()).toBe(2);
      await exact(page, en.suggest.hideAll).click();
      await done(page, 2);

      const file = await download(page);
      expect(file.name).toBe("payslip-signed.pdf");
      const jpeg = await pageJpeg(file.bytes, 0);
      // Sans filigrane en mode « signer » : la zone est entièrement noire.
      for (const spot of payslip.spots) expect((await brightness(page, jpeg, spot.box)).max).toBeLessThan(40);
      await expectReadable(page, jpeg, payslip.decoys[0]);
    },
    180_000
  );
});

describe("sans couche texte", () => {
  test(
    "photo : pas de bandeau ; dans l'éditeur, « Pas de texte à lire… »",
    async () => {
      const page = await openPage("/en");
      // Une vraie photo JPEG, fabriquée dans le navigateur.
      const jpeg = await page.evaluate(async () => {
        const c = document.createElement("canvas");
        c.width = 640;
        c.height = 480;
        const ctx = c.getContext("2d")!;
        ctx.fillStyle = "#c8d4e0";
        ctx.fillRect(0, 0, 640, 480);
        ctx.fillStyle = "#223";
        ctx.font = "28px sans-serif";
        // Un IBAN bien lisible sur la photo : sans reconnaissance de caractères, il n'est pas vu.
        ctx.fillText("FR14 2004 1010 0505 0001 3M02 606", 40, 240);
        const blob: Blob = await new Promise((r) => c.toBlob((b) => r(b!), "image/jpeg", 0.9));
        const bytes = new Uint8Array(await blob.arrayBuffer());
        return btoa(String.fromCharCode(...bytes));
      });
      await addFiles(page, [{ name: "photo.jpg", bytes: new Uint8Array(Buffer.from(jpeg, "base64")), mimeType: "image/jpeg" }]);
      await page.getByLabel(en.purpose.label).fill("Rental application");
      await page.getByText(en.status.ready, { exact: true }).waitFor({ timeout: 60_000 });
      await settled(page);
      expect(await banner(page).count()).toBe(0);

      await exact(page, en.tools.hide).click();
      await panel(page).waitFor();
      await panel(page).getByText(en.suggest.noText).waitFor();
      expect(await panel(page).locator("button").count()).toBe(0);
      // Pas de pied « les suggestions peuvent en oublier » : il n'y a pas eu de recherche.
      expect(await page.getByTestId("suggestions-footer").count()).toBe(0);
    },
    120_000
  );

  test(
    "PDF avec du texte mais rien à suggérer : pas de bandeau ; le panneau le dit, et rappelle de vérifier",
    async () => {
      const page = await openPage("/en");
      const plain = await makeLongPdf(1, 9);
      await addFiles(page, [{ name: "plain.pdf", bytes: plain.bytes }, { name: "noise.png", bytes: makeNoisePng(64, 64), mimeType: "image/png" }]);
      await page.getByLabel(en.purpose.label).fill("Rental application");
      await page.getByText(en.status.ready, { exact: true }).nth(1).waitFor({ timeout: 60_000 });
      await page.locator("#apercu select").first().selectOption({ label: "plain.pdf" });
      await settled(page);
      expect(await banner(page).count()).toBe(0);
      await exact(page, en.tools.hide).click();
      await panel(page).getByText(en.suggest.none).waitFor();
      await page.getByTestId("suggestions-footer").waitFor();
    },
    120_000
  );
});

describe("clavier seul", () => {
  test(
    "Tab jusqu'au panneau, Espace bascule une ligne, Entrée sur « Tout masquer »",
    async () => {
      const page = await openPage("/en");
      await addFiles(page, [{ name: "payslip.pdf", bytes: payslip.bytes }]);
      await page.getByLabel(en.purpose.label).fill("Rental application");
      await banner(page).waitFor({ timeout: 60_000 });
      await settled(page);

      const focused = () => page.evaluate(() => (document.activeElement as HTMLElement | null)?.innerText?.trim() ?? "");
      /** Tab jusqu'à l'élément dont le texte commence par `text` ; échoue s'il n'est pas atteint. */
      const tabTo = async (text: string, key = "Tab") => {
        for (let i = 0; i < 80; i++) {
          if ((await focused()).startsWith(text)) return;
          await page.keyboard.press(key);
        }
        throw new Error(`« ${text} » n'a pas été atteint au clavier`);
      };

      // Depuis le champ « motif » : Tab jusqu'à « Review », Entrée.
      await page.getByLabel(en.purpose.label).focus();
      await tabTo(en.suggest.review);
      await page.keyboard.press("Enter");
      await panel(page).waitFor();

      // Dans le panneau : « Tout masquer », puis une ligne par suggestion.
      await tabTo(en.suggest.hideAll);
      await page.keyboard.press("Tab");
      expect(await focused()).toStartWith(en.suggest.kinds["fr-nir"]);
      const pressed = () => page.evaluate(() => document.activeElement?.getAttribute("aria-pressed"));
      expect(await pressed()).toBe("false");
      await page.keyboard.press("Space");
      expect(await pressed()).toBe("true");
      expect(await outlines(page).count()).toBe(1);
      await page.keyboard.press("Space");
      expect(await pressed()).toBe("false");

      // Retour à « Tout masquer », Entrée.
      await tabTo(en.suggest.hideAll, "Shift+Tab");
      await page.keyboard.press("Enter");
      await page.getByTestId("suggestions-done").waitFor();
      expect(await panel(page).locator('button[aria-pressed="true"]').count()).toBe(2);

      // « Terminé » se trouve après le panneau dans l'ordre de tabulation.
      await tabTo(en.mask.done);
      await page.keyboard.press("Enter");
      await exact(page, en.tools.hidden(2)).waitFor({ timeout: 60_000 });
    },
    180_000
  );
});

describe("droite à gauche et téléphone", () => {
  for (const lang of ["ar", "fa"] as Lang[]) {
    test(
      `/${lang} : le panneau est en miroir, les contours restent sur les numéros`,
      async () => {
        const t = STRINGS[lang];
        const page = await openPage(`/${lang}`);
        await addFiles(page, [{ name: "payslip.pdf", bytes: payslip.bytes }], t.inputAria);
        await page.getByLabel(t.purpose.label).fill("Dossier location");
        await review(page, t);
        expect(await page.evaluate(() => document.documentElement.dir)).toBe("rtl");
        expect(await banner(page).count()).toBe(0);

        // Les contours suivent la page, pas le sens de l'interface.
        const surface = page.getByRole("application", { name: t.mask.surface(1) });
        expect(await outlines(page).count()).toBe(2);
        for (const [i, spot] of payslip.spots.entries()) {
          const at = await fraction(surface, outlines(page).nth(i));
          expect(at.x).toBeLessThanOrEqual(spot.box.x + 0.005);
          expect(at.x).toBeGreaterThan(spot.box.x - 0.03);
          expect(at.x + at.w).toBeGreaterThanOrEqual(spot.box.x + spot.box.w - 0.005);
        }

        // Miroir : le panneau à gauche de l'aperçu, la croix à gauche de sa ligne.
        const panelBox = (await panel(page).boundingBox())!;
        const surfaceBox = (await surface.boundingBox())!;
        expect(panelBox.x + panelBox.width).toBeLessThanOrEqual(surfaceBox.x + 1);
        const line = row(page, t.suggest.kinds.iban);
        const cross = panel(page).getByRole("button", { name: new RegExp(`^${t.suggest.dismiss}`) }).nth(1);
        expect((await cross.boundingBox())!.x).toBeLessThan((await line.boundingBox())!.x);
        // Le numéro masqué reste écrit de gauche à droite.
        expect(await panel(page).locator('span[dir="ltr"]').allInnerTexts()).toEqual(["269 •••• •••• 780", "FR14 •••• •••• 2606"]);
        expect(await panel(page).innerText()).toContain(t.suggest.footer);

        await line.click();
        expect(await line.getAttribute("aria-pressed")).toBe("true");
        expect(await outlines(page).count()).toBe(1);
        await done(page, 1, t);
      },
      180_000
    );
  }

  test(
    "téléphone : le bandeau à l'étape 3, le panneau sous l'aperçu et avant « Terminé »",
    async () => {
      const page = await openPage("/en", {
        viewport: { width: 390, height: 844 },
        hasTouch: true,
        isMobile: browserName() !== "firefox",
      });
      await addFiles(page, [{ name: "payslip.pdf", bytes: payslip.bytes }]);
      await exact(page, en.next.details).click();
      await page.getByLabel(en.purpose.label).fill("Rental application");
      await exact(page, en.next.preview).click();
      await review(page);

      const surface = page.getByRole("application", { name: en.mask.surface(1) });
      const surfaceBox = (await surface.boundingBox())!;
      const panelBox = (await panel(page).boundingBox())!;
      const doneBox = (await exact(page, en.mask.done).boundingBox())!;
      expect(panelBox.y).toBeGreaterThanOrEqual(surfaceBox.y + surfaceBox.height);
      expect(doneBox.y).toBeGreaterThanOrEqual(panelBox.y + panelBox.height);
      // Rien ne dépasse de l'écran.
      expect(panelBox.x).toBeGreaterThanOrEqual(0);
      expect(panelBox.x + panelBox.width).toBeLessThanOrEqual(390);

      // Au doigt : toucher une ligne la masque.
      await row(page, en.suggest.kinds.iban).tap();
      expect(await row(page, en.suggest.kinds.iban).getAttribute("aria-pressed")).toBe("true");
      await done(page, 1);
    },
    180_000
  );
});
