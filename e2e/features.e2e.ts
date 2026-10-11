// Fonctionnalités de copie, de bout en bout dans l'interface : plusieurs
// destinataires avec références traçables, masquage tracé sur l'aperçu,
// et réception de fichiers partagés via le service worker.
//
// Fichier nommé *.e2e.ts : lancé par `bun run test:e2e`.

import { afterAll, afterEach, beforeAll, describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { unzipSync } from "fflate";
import { PDFDocument } from "pdf-lib";
import type { Browser, BrowserContext, Page } from "playwright-core";
import { launchBrowser, MAP_UPSERT_POLYFILL } from "./helpers/browser";
import { E2E_ORIGIN, startServer, type E2eServer } from "./helpers/server";
import { makeBluePdf, makePdf } from "./helpers/fixtures";
import { STRINGS } from "../lib/i18n";

const OUT_DIR = join(import.meta.dir, "..", "out");
const t = STRINGS.fr;

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
  for (const page of context?.pages() ?? []) await page.goto("about:blank").catch(() => {});
  await context?.close();
  context = undefined;
});

async function openPage(path: string, serviceWorkers: "allow" | "block" = "block") {
  context = await browser.newContext({ serviceWorkers });
  await context.addInitScript(MAP_UPSERT_POLYFILL);
  const page = await context.newPage();
  await page.goto(`${E2E_ORIGIN}${path}`);
  return page;
}

async function addPdf(page: Page, name: string, bytes: Uint8Array) {
  await page
    .locator(`input[aria-label="${t.inputAria}"]`)
    .setInputFiles({ name, mimeType: "application/pdf", buffer: Buffer.from(bytes) });
}

async function download(page: Page, button: string) {
  const [file] = await Promise.all([
    page.waitForEvent("download", { timeout: 60_000 }),
    page.getByRole("button", { name: button }).click(),
  ]);
  return { name: file.suggestedFilename(), bytes: new Uint8Array(readFileSync((await file.path())!)) };
}

describe("plusieurs destinataires, copies traçables", () => {
  test(
    "un PDF par destinataire, chacun avec sa référence au registre",
    async () => {
      const page = await openPage("/fr");
      await addPdf(page, "bulletin.pdf", await makePdf([[300, 400]]));
      await page.locator(`textarea[aria-label="${t.textareaAria}"]`).fill("Dossier location");
      await page.getByText(t.multi.toggle).click();
      await page.getByLabel(t.multi.label).fill("Agence Martin\nFoncia Lyon\nagence martin");
      await page.getByText(t.multi.count(2)).waitFor();
      await page.getByText(t.trace.toggle).click();

      // Registre : une ligne par destinataire, références distinctes au bon format.
      const lines = await page.locator("ul.font-mono li").allTextContents();
      expect(lines).toHaveLength(2);
      const refs = lines.map((l) => l.match(/· ([0-9A-HJKMNP-TV-Z]{5}) ·/)?.[1]);
      expect(refs.every(Boolean)).toBe(true);
      expect(new Set(refs).size).toBe(2);
      expect(lines[0]).toContain("Agence Martin");
      expect(lines[1]).toContain("Foncia Lyon");

      await page.getByText(t.multi.previewFor("Agence Martin")).waitFor({ timeout: 30_000 });
      const pdfs = await download(page, t.multi.downloadPdf(2));
      expect(pdfs.name).toBe(`${t.zipName}.zip`);
      const entries = unzipSync(pdfs.bytes);
      expect(Object.keys(entries).sort()).toEqual([
        `${t.zipName}-agence-martin.pdf`,
        `${t.zipName}-foncia-lyon.pdf`,
      ]);
      for (const bytes of Object.values(entries)) {
        expect((await PDFDocument.load(bytes)).getPageCount()).toBe(1);
      }
      // Versions différentes (texte différent dans les pixels).
      const [a, b] = Object.values(entries);
      expect(Buffer.compare(Buffer.from(a), Buffer.from(b))).not.toBe(0);

      const zip = await download(page, t.multi.downloadZip(2));
      expect(Object.keys(unzipSync(zip.bytes)).sort()).toEqual([
        `agence-martin/bulletin-${t.suffix}.pdf`,
        `foncia-lyon/bulletin-${t.suffix}.pdf`,
      ]);
    },
    120_000
  );
});

describe("masquage depuis l'aperçu", () => {
  test(
    "tracer une zone puis l'appliquer la noircit dans le document produit",
    async () => {
      const page = await openPage("/fr");
      await addPdf(page, "bleu.pdf", await makeBluePdf());
      await page.locator(`textarea[aria-label="${t.textareaAria}"]`).fill("Copie e2e");
      await page.getByRole("button", { name: t.mask.start }).click({ timeout: 30_000 });

      const surface = page.getByRole("application", { name: t.mask.surface(1) });
      // L'aperçu dépasse la fenêtre de 720 px : on l'aligne en haut, pour que
      // tout le tracé (du coin jusqu'au milieu) reste à l'écran (Firefox ignore
      // un geste qui sort de la fenêtre).
      await surface.evaluate((el) => el.scrollIntoView({ block: "start" }));
      const box = (await surface.boundingBox())!;
      await page.mouse.move(box.x + 2, box.y + 2);
      await page.mouse.down();
      await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.5, { steps: 8 });
      await page.mouse.up();
      await page.getByRole("button", { name: t.mask.apply(1) }).click();

      // Re-rendu du document, puis l'aperçu porte la zone noire.
      await page.getByText(t.mask.onPage(1)).waitFor({ timeout: 30_000 });
      const preview = page.locator(`img[alt="${t.previewAlt("bleu.pdf", 1)}"]`).first();
      const blue = await preview.evaluate(async (img: HTMLImageElement) => {
        const bmp = await createImageBitmap(await (await fetch(img.src)).blob());
        const c = document.createElement("canvas");
        c.width = bmp.width;
        c.height = bmp.height;
        const ctx = c.getContext("2d")!;
        ctx.drawImage(bmp, 0, 0);
        const count = (x: number, y: number, w: number, h: number) => {
          const d = ctx.getImageData(x, y, w, h).data;
          let n = 0;
          for (let i = 0; i < d.length; i += 4) if (d[i + 2] > 120 && d[i + 2] > d[i] + 40) n++;
          return n;
        };
        const q = Math.floor(bmp.width * 0.4);
        return { masked: count(4, 4, q, q), open: count(bmp.width - q, bmp.height - q, q, q) };
      });
      expect(blue.masked).toBe(0);
      expect(blue.open).toBeGreaterThan(5_000);
    },
    90_000
  );
});

describe("partage depuis le téléphone (Web Share Target)", () => {
  test(
    "un fichier partagé arrive dans la liste et la boîte de réception locale est vidée",
    async () => {
      const page = await openPage("/", "allow");
      await page.waitForFunction(() => !!navigator.serviceWorker?.controller, null, { timeout: 30_000 });

      // Ce que ferait le système : un POST multipart vers /share-target,
      // intercepté par le service worker (rien ne part sur le réseau).
      const pdf = Array.from(await makePdf([[200, 300]]));
      const redirected = await page.evaluate(async (bytes) => {
        const form = new FormData();
        form.append("files", new File([Uint8Array.from(bytes)], "partage.pdf", { type: "application/pdf" }));
        const res = await fetch("/share-target", { method: "POST", body: form });
        return new URL(res.url).search;
      }, pdf);
      expect(redirected).toBe("?shared=1");

      await page.goto(`${E2E_ORIGIN}/?shared=1`);
      await page.locator("li").filter({ hasText: "partage.pdf" }).first().waitFor({ timeout: 30_000 });
      expect(new URL(page.url()).search).toBe("");
      expect(await page.evaluate(() => caches.has("cachety-share-inbox"))).toBe(false);
    },
    90_000
  );
});
