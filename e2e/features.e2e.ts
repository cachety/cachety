// Fonctionnalités de copie, de bout en bout dans l'interface : plusieurs
// destinataires avec codes ({code}), fichiers séparés par destinataire,
// masquage tracé sur l'aperçu, et réception de fichiers partagés via le
// service worker.
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
    "une copie par destinataire, chacune avec son code, listé après le téléchargement",
    async () => {
      const page = await openPage("/fr");
      await addPdf(page, "bulletin.pdf", await makePdf([[300, 400]]));
      await page.getByLabel(t.purpose.label).fill("Dossier location");
      const recipient = (n: number) => page.getByRole("textbox", { name: t.recipients.aria(n) });
      await recipient(1).fill("Agence Martin");
      await page.getByRole("button", { name: t.recipients.add }).click();
      await recipient(2).fill("Foncia Lyon");
      await page.getByRole("button", { name: t.recipients.add }).click();
      await recipient(3).fill("agence martin"); // doublon : ignoré
      await page.getByText(t.recipients.eachOwn).waitFor();

      // Texte libre : « réf. {code} » ajouté, un code par destinataire à côté de son nom.
      await page.getByRole("button", { name: t.stampCard.edit }).click();
      await page.getByRole("button", { name: `${t.trace.refLabel} ${t.stampCard.tokens.code}` }).click();
      const badges = await page.locator(`span[title="${t.stampCard.codeTitle}"]`).allTextContents();
      expect(badges.slice(0, 2).every((c) => /^[0-9A-HJKMNP-TV-Z]{5}$/.test(c))).toBe(true);
      expect(new Set(badges.slice(0, 2)).size).toBe(2);

      const button = page.getByRole("button", { name: t.download.copies(2) }).last();
      await button.and(page.locator(":enabled")).waitFor({ timeout: 30_000 });
      const pdfs = await download(page, t.download.copies(2));
      expect(pdfs.name).toBe(`${t.zipName}.zip`);
      const entries = unzipSync(pdfs.bytes);
      expect(Object.keys(entries).sort()).toEqual([`${t.zipName}-agence-martin.pdf`, `${t.zipName}-foncia-lyon.pdf`]);
      for (const bytes of Object.values(entries)) {
        expect((await PDFDocument.load(bytes)).getPageCount()).toBe(1);
      }
      // Versions différentes (texte différent dans les pixels).
      const [a, b] = Object.values(entries);
      expect(Buffer.compare(Buffer.from(a), Buffer.from(b))).not.toBe(0);

      // Écran final : la liste des copies et de leurs codes, les mêmes qu'à l'écran.
      await page.getByText(t.done.codesTitle).waitFor();
      const listed = await page.locator("li").filter({ hasText: /^(Agence Martin|Foncia Lyon)/ }).allTextContents();
      expect(listed).toHaveLength(2);
      expect(listed.join(" ")).toContain(badges[0]);
      expect(listed.join(" ")).toContain(badges[1]);
    },
    120_000
  );

  test(
    "deux documents en fichiers séparés : un dossier par destinataire dans le ZIP",
    async () => {
      const page = await openPage("/fr");
      await addPdf(page, "bulletin.pdf", await makePdf([[300, 400]]));
      await addPdf(page, "avis.pdf", await makePdf([[300, 400]]));
      await page.getByLabel(t.purpose.label).fill("Dossier location");
      await page.getByRole("textbox", { name: t.recipients.aria(1) }).fill("Agence Martin");
      await page.getByRole("button", { name: t.recipients.add }).click();
      await page.getByRole("textbox", { name: t.recipients.aria(2) }).fill("Foncia Lyon");
      await page.getByRole("radio", { name: t.send.zip }).click({ timeout: 30_000 });
      await page.getByRole("button", { name: t.download.copies(2) }).last().and(page.locator(":enabled")).waitFor({ timeout: 30_000 });
      const zip = await download(page, t.download.copies(2));
      expect(Object.keys(unzipSync(zip.bytes)).sort()).toEqual([
        `agence-martin/avis-${t.suffix}.pdf`,
        `agence-martin/bulletin-${t.suffix}.pdf`,
        `foncia-lyon/avis-${t.suffix}.pdf`,
        `foncia-lyon/bulletin-${t.suffix}.pdf`,
      ]);
    },
    120_000
  );
});

describe("après le téléchargement", () => {
  test(
    "Fermer et « Filigraner un autre document » fonctionnent sans casser la page",
    async () => {
      const page = await openPage("/fr");
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await addPdf(page, "bulletin.pdf", await makePdf([[300, 400]]));
      await page.getByLabel(t.purpose.label).fill("Dossier location");
      const button = page.getByRole("button", { name: t.download.one, exact: true });
      await button.and(page.locator(":enabled")).waitFor({ timeout: 30_000 });

      await download(page, t.download.one);
      await page.getByText(t.done.title).waitFor();
      await page.getByRole("button", { name: t.done.close }).click();
      await page.getByText(t.done.title).waitFor({ state: "detached" });
      // L'outil est toujours là, avec le document.
      await page.locator("li").filter({ hasText: "bulletin.pdf" }).first().waitFor();

      await download(page, t.download.one);
      await page.getByRole("button", { name: t.done.another }).click();
      await page.getByText(t.dropTitle).waitFor();
      expect(await page.getByLabel(t.purpose.label).inputValue()).toBe("");
      expect(errors).toEqual([]);
    },
    90_000
  );

  test(
    "fichier verrouillé : quitter sans avoir gardé le mot de passe demande confirmation",
    async () => {
      const page = await openPage("/fr");
      await addPdf(page, "bulletin.pdf", await makePdf([[300, 400]]));
      await page.getByLabel(t.purpose.label).fill("Dossier location");
      await page.getByText(t.filePassword.lock).click();
      const button = page.getByRole("button", { name: t.download.one, exact: true });
      await button.and(page.locator(":enabled")).waitFor({ timeout: 30_000 });
      await download(page, t.download.one);
      await page.getByText(t.done.pwTitle).waitFor();

      // Fermer : le panneau demande d'abord si le mot de passe est gardé.
      await page.getByRole("button", { name: t.done.close }).click();
      await page.getByText(t.done.pwCheckTitle).waitFor();
      await page.getByRole("button", { name: t.done.pwBack }).click();
      await page.getByText(t.done.pwCheckTitle).waitFor({ state: "detached" });
      await page.getByText(t.done.pwTitle).waitFor(); // toujours là

      await page.getByRole("button", { name: t.done.close }).click();
      await page.getByRole("button", { name: t.done.pwNoted }).click();
      await page.getByText(t.done.pwTitle).waitFor({ state: "detached" });
    },
    90_000
  );
});

describe("masquage depuis l'aperçu", () => {
  test(
    "tracer une zone puis Terminé la noircit dans le document produit",
    async () => {
      const page = await openPage("/fr");
      await addPdf(page, "bleu.pdf", await makeBluePdf());
      await page.getByLabel(t.purpose.label).fill("Copie e2e");
      await page.getByRole("button", { name: t.tools.hide }).click({ timeout: 30_000 });

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
      // La zone tracée peut être retirée une par une (bouton ×).
      await page.getByRole("button", { name: t.mask.remove(1) }).waitFor();
      await page.getByRole("button", { name: t.mask.done }).click();

      // Re-rendu du document (l'aperçu précédent reste affiché, marqué
      // aria-busy, jusqu'au nouveau), puis l'aperçu porte la zone noire.
      await page.getByRole("button", { name: t.tools.hidden(1) }).waitFor({ timeout: 30_000 });
      await page.waitForFunction(() => !document.querySelector('#apercu [aria-busy="true"]'), null, { timeout: 30_000 });
      const preview = page.locator(`img[alt="${t.previewAlt("bleu.pdf", 1)}"]`).first();
      await page.waitForFunction(
        (alt) => {
          const img = document.querySelector<HTMLImageElement>(`img[alt="${alt}"]`);
          return !!img?.complete;
        },
        t.previewAlt("bleu.pdf", 1),
        { timeout: 30_000 }
      );
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

describe("aperçu stable", () => {
  test(
    "plusieurs documents de tailles différentes : changer le réglage ne fait pas sauter l'aperçu d'un document à l'autre",
    async () => {
      const page = await openPage("/fr");
      await page.locator(`input[aria-label="${t.inputAria}"]`).setInputFiles([
        { name: "a4.pdf", mimeType: "application/pdf", buffer: Buffer.from(await makePdf([[595, 842]])) },
        { name: "carte.pdf", mimeType: "application/pdf", buffer: Buffer.from(await makePdf([[300, 190]])) },
      ]);
      await page.getByLabel(t.purpose.label).fill("Copie e2e");
      await page.getByText(t.status.ready, { exact: true }).nth(1).waitFor({ timeout: 30_000 });
      await page.waitForFunction(() => !document.querySelector('#apercu [aria-busy="true"]'), null, { timeout: 30_000 });

      const shownDoc = () =>
        page.evaluate(() => {
          const alt = document.querySelector<HTMLImageElement>("#apercu img[alt]")?.alt ?? "";
          return alt.includes("a4.pdf") ? "a4" : alt.includes("carte.pdf") ? "carte" : "";
        });
      const before = await shownDoc();
      expect(before).not.toBe("");

      await page.getByRole("button", { name: t.tools.adjust }).click();
      await page.getByRole("radio", { name: t.style.presets.strong }).click();
      const seen = new Set<string>();
      const until = Date.now() + 4_000;
      while (Date.now() < until) {
        seen.add(await shownDoc());
        await page.waitForTimeout(40);
      }
      expect([...seen]).toEqual([before]);
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
