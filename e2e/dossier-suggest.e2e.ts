// Suggestions de masquage en mode « dossier » : les deux fonctions ensemble.
// Le bandeau et le panneau sont ceux des autres outils ; ce qui est propre au
// dossier, c'est la rotation d'une page : ses masques sont retirés, et ses
// suggestions sont relues dans le nouveau sens (docs/prd-suggested-areas.md
// §8, docs/prd-dossier.md §6.3).
//
// Et l'aperçu de l'étape 3 : il ne montre que les pages gardées, dans l'ordre
// du fichier produit (docs/prd-dossier.md §5, étape 3).
//
// Fichier nommé *.e2e.ts : lancé par `bun run test:e2e`.

import { afterAll, afterEach, beforeAll, describe, expect, test } from "bun:test";
import { join } from "node:path";
import { PDFDocument } from "pdf-lib";
import type { Browser, BrowserContext, Locator, Page } from "playwright-core";
import { launchBrowser, MAP_UPSERT_POLYFILL } from "./helpers/browser";
import { E2E_ORIGIN, startServer, type E2eServer } from "./helpers/server";
import { pageJpeg, scanPdfForLeaks } from "./helpers/fixtures";
import { makeSuggestPayslip, type Box, type PayslipFixture } from "./helpers/suggest-fixtures";
import { makeColourPdf, type Rgb } from "./helpers/dossier-fixtures";
import { addFiles, download, dragTile, order, pdf, tile, waitPages } from "./helpers/dossier-ui";
import { STRINGS } from "../lib/i18n";

const OUT_DIR = join(import.meta.dir, "..", "out");
const en = STRINGS.en;
const d = en.dossier;

let server: E2eServer;
let browser: Browser;
let context: BrowserContext | undefined;
let payslip: PayslipFixture;
let requests: string[] = [];

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

async function openDossier() {
  context = await browser.newContext({ serviceWorkers: "block", viewport: { width: 1440, height: 1000 } });
  await context.addInitScript(MAP_UPSERT_POLYFILL);
  requests = [];
  context.on("request", (r) => requests.push(r.url()));
  const page = await context.newPage();
  await page.goto(`${E2E_ORIGIN}/en/dossier`);
  return page;
}

const banner = (page: Page) => page.getByTestId("suggestions-banner");
const panel = (page: Page) => page.getByTestId("suggestions-panel");
const outlines = (page: Page) => page.getByTestId("suggestion-outline");
const exact = (page: Page, name: string) => page.getByRole("button", { name, exact: true });

async function settled(page: Page) {
  await page.waitForFunction(() => !document.querySelector('#apercu [aria-busy="true"]'), null, { timeout: 60_000 });
}

/** Bandeau → panneau → « Tout masquer » → « Terminé », puis le nouveau rendu. */
async function hideEverything(page: Page, count: number) {
  await banner(page).filter({ hasText: en.suggest.banner(count) }).waitFor({ timeout: 60_000 });
  await settled(page);
  await exact(page, en.suggest.review).click();
  await panel(page).waitFor();
  expect(await outlines(page).count()).toBe(count);
  return async () => {
    await exact(page, en.suggest.hideAll).click();
    await exact(page, en.mask.done).click();
    await exact(page, en.tools.hidden(count)).waitFor({ timeout: 60_000 });
    await settled(page);
  };
}

/** Part de pixels sombres d'une zone (fractions de page) d'une page produite (JPEG). */
function darkShare(page: Page, jpeg: Uint8Array, region: Box) {
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
      const px = ctx.getImageData(x0, y0, w, h).data;
      let dark = 0;
      for (let i = 0; i < px.length; i += 4) if (0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2] < 128) dark++;
      return dark / (px.length / 4);
    },
    { b64: Buffer.from(jpeg).toString("base64"), r: region }
  );
}

/** Un quart de tour dans le sens horaire : le coin haut-gauche passe en haut à droite. */
const turned = (b: Box): Box => ({ x: 1 - b.y - b.h, y: b.x, w: b.h, h: b.w });

async function fraction(surface: Locator, el: Locator): Promise<Box> {
  const s = (await surface.boundingBox())!;
  const b = (await el.boundingBox())!;
  return { x: (b.x - s.x) / s.width, y: (b.y - s.y) / s.height, w: b.width / s.width, h: b.height / s.height };
}

const offOrigin = () => requests.filter((u) => !u.startsWith(`${E2E_ORIGIN}/`) && !u.startsWith("blob:") && !u.startsWith("data:"));

describe("dossier : suggestions de masquage", () => {
  test(
    "le bandeau paraît à l'étape 3 ; « Tout masquer » noircit les numéros dans le dossier téléchargé",
    async () => {
      const page = await openDossier();
      await addFiles(page, [pdf("payslip.pdf", payslip.bytes)]);
      await waitPages(page, 1);

      const hide = await hideEverything(page, 2);
      // Seule la forme masquée du numéro est affichée, et l'avertissement est là.
      const text = await panel(page).innerText();
      expect(text).toContain("FR14 •••• •••• 2606");
      expect(text).toContain(en.suggest.footer);
      await hide();
      expect(await banner(page).count()).toBe(0);

      const file = await download(page, d.download);
      expect((await PDFDocument.load(file.bytes)).getPageCount()).toBe(1);
      const jpeg = await pageJpeg(file.bytes, 0);
      // Pas de filigrane par défaut en mode dossier : la zone masquée est noire.
      for (const spot of payslip.spots) expect(await darkShare(page, jpeg, spot.box)).toBeGreaterThan(0.95);
      for (const decoy of payslip.decoys.slice(0, 4)) expect(await darkShare(page, jpeg, decoy)).toBeLessThan(0.6);
      expect((await scanPdfForLeaks(file.bytes)).keys).toEqual([]);
      expect(offOrigin()).toEqual([]);
    },
    180_000
  );

  test(
    "tourner une page retire ses masques et relit ses suggestions dans le nouveau sens",
    async () => {
      const page = await openDossier();
      await addFiles(page, [pdf("payslip.pdf", payslip.bytes)]);
      await waitPages(page, 1);
      await (await hideEverything(page, 2))();

      // Un quart de tour : les masques de la page sont retirés, l'utilisateur est prévenu.
      await tile(page, 0).getByRole("button", { name: `${d.grid.rotate} 1`, exact: true }).click();
      await page.getByText(d.grid.rotateClearsMasks).first().waitFor();
      await waitPages(page, 1);
      expect(await tile(page, 0).getAttribute("data-rotate")).toBe("90");

      // Les deux numéros sont proposés à nouveau, là où ils sont maintenant.
      const hide = await hideEverything(page, 2);
      const surface = page.getByRole("application", { name: en.mask.surface(1) });
      const drawn: Box[] = [];
      for (let i = 0; i < 2; i++) drawn.push(await fraction(surface, outlines(page).nth(i)));
      for (const spot of payslip.spots) {
        const want = turned(spot.box);
        const covering = drawn.filter(
          (at) =>
            at.x <= want.x + 0.005 &&
            at.x + at.w >= want.x + want.w - 0.005 &&
            at.y <= want.y + 0.005 &&
            at.y + at.h >= want.y + want.h - 0.005
        );
        expect(covering.length).toBe(1);
      }
      await hide();

      const file = await download(page, d.download);
      const [out] = (await PDFDocument.load(file.bytes)).getPages();
      // La page produite est réellement en paysage.
      expect([Math.round(out.getWidth()), Math.round(out.getHeight())]).toEqual([842, 595]);
      const jpeg = await pageJpeg(file.bytes, 0);
      for (const spot of payslip.spots) expect(await darkShare(page, jpeg, turned(spot.box))).toBeGreaterThan(0.95);
      // Là où les numéros se trouvaient avant la rotation, rien n'est resté masqué.
      for (const spot of payslip.spots) expect(await darkShare(page, jpeg, spot.box)).toBeLessThan(0.6);
      for (const decoy of payslip.decoys.slice(0, 4)) expect(await darkShare(page, jpeg, turned(decoy))).toBeLessThan(0.6);
      expect(offOrigin()).toEqual([]);
    },
    240_000
  );
});

describe("dossier : aperçu de l'étape 3", () => {
  const RED: Rgb = [220, 30, 30];
  const GREEN: Rgb = [30, 170, 60];
  const BLUE: Rgb = [30, 60, 200];
  const preview = (page: Page) => page.locator("#apercu");
  /** Texte de remplacement de la page affichée dans l'aperçu. */
  const shownAlt = (page: Page) => preview(page).locator("button > img").first().getAttribute("alt");
  const pager = (page: Page, name: string) => preview(page).getByRole("button", { name, exact: true });

  test(
    "seules les pages gardées, dans l'ordre du fichier ; plus aucune page : l'aperçu le dit",
    async () => {
      const page = await openDossier();
      await addFiles(page, [pdf("abc.pdf", await makeColourPdf([RED, GREEN, BLUE]))]);
      await waitPages(page, 3);
      await settled(page);
      // Ni « filigranée » ni « signée » : une page du dossier.
      expect(await shownAlt(page)).toBe(d.previewAlt("abc.pdf", 1));

      // La page bleue passe en tête, la verte est retirée.
      await dragTile(page, 2, 0, "before");
      expect(await order(page)).toEqual(["abc.pdf#2", "abc.pdf#0", "abc.pdf#1"]);
      await tile(page, 2).getByRole("button", { name: `${d.grid.remove} 3`, exact: true }).click();
      await waitPages(page, 2);

      // L'aperçu : la bleue (page 3 du document), puis la rouge, et rien d'autre.
      await preview(page).getByText(en.pageOf(3, 3)).waitFor();
      expect(await shownAlt(page)).toBe(d.previewAlt("abc.pdf", 3));
      expect(await pager(page, en.pagerPrev).getAttribute("aria-disabled")).toBe("true");
      await pager(page, en.pagerNext).click();
      await preview(page).getByText(en.pageOf(1, 3)).waitFor();
      expect(await shownAlt(page)).toBe(d.previewAlt("abc.pdf", 1));
      expect(await pager(page, en.pagerNext).getAttribute("aria-disabled")).toBe("true");

      // Le fichier suit le même ordre.
      const file = await download(page, d.download);
      expect((await PDFDocument.load(file.bytes)).getPageCount()).toBe(2);
    },
    180_000
  );

  test(
    "document dont toutes les pages sont retirées : pas d'aperçu, pas de suggestion",
    async () => {
      const page = await openDossier();
      await addFiles(page, [pdf("payslip.pdf", payslip.bytes)]);
      await waitPages(page, 1);
      await banner(page).filter({ hasText: en.suggest.banner(2) }).waitFor({ timeout: 60_000 });

      await tile(page, 0).getByRole("button", { name: `${d.grid.remove} 1`, exact: true }).click();
      const none = page.getByTestId("preview-none");
      await none.waitFor();
      expect(await none.innerText()).toContain(d.grid.noPages);
      expect(await banner(page).count()).toBe(0);

      // « Annuler » : la page revient, ses suggestions aussi.
      await page.getByTestId("page-undo").getByRole("button", { name: d.grid.undo, exact: true }).click();
      await banner(page).filter({ hasText: en.suggest.banner(2) }).waitFor({ timeout: 60_000 });
    },
    120_000
  );
});
