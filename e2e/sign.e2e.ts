// Mode « signer » (/<lang>/sign), de bout en bout dans l'interface : dessiner,
// taper ou importer une signature, la placer, télécharger, puis relire le PDF
// produit (pages, métadonnées, couche texte, pixels de la signature).
//
// Fichier nommé *.e2e.ts : lancé par `bun run test:e2e`.

import { afterAll, afterEach, beforeAll, describe, expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { PDFDocument } from "pdf-lib";
import type { Browser, BrowserContext, Page } from "playwright-core";
import { browserName, launchBrowser, MAP_UPSERT_POLYFILL } from "./helpers/browser";
import { E2E_ORIGIN, startServer, type E2eServer } from "./helpers/server";
import { makePdf, makeSignablePdf, pageJpeg, scanPdfForLeaks } from "./helpers/fixtures";
import { STRINGS } from "../lib/i18n";

const OUT_DIR = join(import.meta.dir, "..", "out");
const en = STRINGS.en;

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

async function openPage(path: string, options?: Parameters<Browser["newContext"]>[0]) {
  context = await browser.newContext({ serviceWorkers: "block", ...options });
  await context.addInitScript(MAP_UPSERT_POLYFILL);
  const page = await context.newPage();
  await page.goto(`${E2E_ORIGIN}${path}`);
  return page;
}

async function addFile(page: Page, name: string, bytes: Uint8Array, t = en, mimeType = "application/pdf") {
  await page.locator(`input[aria-label="${t.sign.inputAria}"]`).setInputFiles({ name, mimeType, buffer: Buffer.from(bytes) });
}

/** Un trait en zigzag sur le pavé « Dessiner », à la souris. */
async function drawStroke(page: Page, t = en) {
  const pad = page.getByRole("img", { name: t.sign.pad.canvasLabel });
  await pad.scrollIntoViewIfNeeded();
  const box = (await pad.boundingBox())!;
  await page.mouse.move(box.x + box.width * 0.2, box.y + box.height * 0.6);
  await page.mouse.down();
  for (let i = 1; i <= 12; i++) {
    await page.mouse.move(box.x + box.width * (0.2 + i * 0.05), box.y + box.height * (i % 2 ? 0.3 : 0.7), { steps: 3 });
  }
  await page.mouse.up();
}

async function typeName(page: Page, name: string, t = en) {
  await page.getByRole("tab", { name: t.sign.pad.type }).click();
  await page.getByLabel(t.sign.pad.typeLabel).fill(name);
}

/** Bouton de téléchargement actif : signature placée et rendu terminé. */
function downloadButton(page: Page, t = en) {
  return page.getByRole("button", { name: t.download.one, exact: true });
}
async function waitDownloadable(page: Page, t = en) {
  await downloadButton(page, t).and(page.locator(":enabled")).waitFor({ timeout: 60_000 });
}

async function download(page: Page, t = en, click?: () => Promise<void>) {
  const [file] = await Promise.all([
    page.waitForEvent("download", { timeout: 60_000 }),
    click ? click() : downloadButton(page, t).click(),
  ]);
  return { name: file.suggestedFilename(), bytes: new Uint8Array(readFileSync((await file.path())!)) };
}

/** Boîte de la signature sur l'aperçu. */
const signatureBox = (page: Page, pageNumber: number, t = en) =>
  page.getByRole("button", { name: t.sign.place.boxLabel(pageNumber) });

/** Position de la boîte en fractions de la page affichée. */
async function boxFraction(page: Page) {
  return page.evaluate(() => {
    const box = document.querySelector('[data-testid="signature-box"]') as HTMLElement | null;
    const surface = document.querySelector('[data-testid="signature-surface"]') as HTMLElement | null;
    if (!box || !surface) return null;
    const b = box.getBoundingClientRect();
    const s = surface.getBoundingClientRect();
    return { x: (b.left - s.left) / s.width, y: (b.top - s.top) / s.height, w: b.width / s.width, h: b.height / s.height };
  });
}

/**
 * Part de pixels sombres (luminance < 160) d'une zone d'une page produite.
 * La page (image JPEG du PDF) est décodée par le navigateur.
 */
async function darkShare(page: Page, jpeg: Uint8Array, region: { x: number; y: number; w: number; h: number }) {
  return page.evaluate(
    async ({ b64, region }) => {
      const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
      const bitmap = await createImageBitmap(new Blob([bytes], { type: "image/jpeg" }));
      const canvas = document.createElement("canvas");
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(bitmap, 0, 0);
      const x = Math.floor(region.x * bitmap.width);
      const y = Math.floor(region.y * bitmap.height);
      const w = Math.max(1, Math.floor(region.w * bitmap.width));
      const h = Math.max(1, Math.floor(region.h * bitmap.height));
      const d = ctx.getImageData(x, y, w, h).data;
      let dark = 0;
      for (let i = 0; i < d.length; i += 4) if (0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2] < 160) dark++;
      return dark / (d.length / 4);
    },
    { b64: Buffer.from(jpeg).toString("base64"), region }
  );
}

/** Pixels « bleu encre » (bleu nettement dominant) d'une zone d'une page produite. */
async function blueShare(page: Page, jpeg: Uint8Array, region: { x: number; y: number; w: number; h: number }) {
  return page.evaluate(
    async ({ b64, region }) => {
      const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
      const bitmap = await createImageBitmap(new Blob([bytes], { type: "image/jpeg" }));
      const canvas = document.createElement("canvas");
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(bitmap, 0, 0);
      const d = ctx.getImageData(
        Math.floor(region.x * bitmap.width),
        Math.floor(region.y * bitmap.height),
        Math.floor(region.w * bitmap.width),
        Math.floor(region.h * bitmap.height)
      ).data;
      let blue = 0;
      for (let i = 0; i < d.length; i += 4) if (d[i + 2] > d[i] + 40 && d[i + 2] > d[i + 1] + 30 && d[i] < 120) blue++;
      return blue / (d.length / 4);
    },
    { b64: Buffer.from(jpeg).toString("base64"), region }
  );
}

/** Zone de la signature par défaut : en bas à droite, 28 % de large, marges de 6 %. */
const DEFAULT_SPOT = { x: 0.66, y: 0.8, w: 0.28, h: 0.14 };

describe("signer : parcours complet", () => {
  test(
    "ordinateur : PDF → Dessiner → placement par défaut sur la dernière page → déplacé au clavier → PDF propre",
    async () => {
      const page = await openPage("/en/sign");
      await addFile(page, "lease.pdf", await makeSignablePdf(3));
      await page.getByRole("tab", { name: en.sign.pad.draw }).click();
      await drawStroke(page);

      // Placement par défaut : dernière page, en bas à droite.
      const box = signatureBox(page, 3);
      await box.waitFor({ timeout: 60_000 });
      await page.getByText(en.pageOf(3, 3)).waitFor();
      await page.getByText(en.sign.place.lastPage).first().waitFor();
      const start = (await boxFraction(page))!;
      expect(start.x + start.w).toBeCloseTo(0.94, 1);
      expect(start.y + start.h).toBeCloseTo(0.94, 1);
      expect(start.w).toBeCloseTo(0.28, 1);

      // Clavier : Maj + flèche gauche, deux fois (2 × 5 %).
      await box.focus();
      await page.keyboard.press("Shift+ArrowLeft");
      await page.keyboard.press("Shift+ArrowLeft");
      await page.waitForFunction(
        (x0) => {
          const b = document.querySelector('[data-testid="signature-box"]')!.getBoundingClientRect();
          const s = document.querySelector('[data-testid="signature-surface"]')!.getBoundingClientRect();
          return (b.left - s.left) / s.width < x0 - 0.08;
        },
        start.x
      );
      expect(await box.evaluate((el) => el === document.activeElement)).toBe(true);

      await waitDownloadable(page);
      const out = await download(page);
      expect(out.name).toBe("lease-signed.pdf");
      const pdf = await PDFDocument.load(out.bytes);
      expect(pdf.getPageCount()).toBe(3);
      expect(pdf.getAuthor()).toBeUndefined();
      const leaks = await scanPdfForLeaks(out.bytes);
      expect(leaks.markerHits).toBe(0);
      expect(leaks.keys).toEqual([]);

      // L'encre est sur la dernière page, à l'endroit déplacé ; rien sur la première.
      const moved = { x: start.x - 0.1, y: start.y, w: start.w, h: start.h };
      const last = await pageJpeg(out.bytes, 2);
      expect(await darkShare(page, last, moved)).toBeGreaterThan(0.005);
      expect(await darkShare(page, await pageJpeg(out.bytes, 0), DEFAULT_SPOT)).toBe(0);
    },
    120_000
  );

  test(
    "clavier seulement (onglet Taper) : du nom tapé au téléchargement, sans pointeur",
    async () => {
      const page = await openPage("/en/sign");
      await addFile(page, "form.pdf", await makePdf([[595, 842]]));
      const focused = () =>
        page.evaluate(() => {
          const el = document.activeElement as HTMLElement | null;
          return el ? `${el.tagName}|${el.getAttribute("aria-label") ?? ""}|${el.id}|${el.textContent?.trim().slice(0, 40) ?? ""}` : "";
        });
      /** Tab jusqu'à l'élément voulu (au plus 80 fois). */
      const tabTo = async (match: (f: string) => boolean) => {
        const seen: string[] = [];
        for (let i = 0; i < 80; i++) {
          await page.keyboard.press("Tab");
          const f = await focused();
          seen.push(f);
          if (match(f)) return;
        }
        throw new Error(`élément jamais atteint au clavier ; parcours : ${seen.join(" › ")}`);
      };
      const nameInput = page.getByLabel(en.sign.pad.typeLabel);
      const nameId = await nameInput.evaluate((el) => el.id);
      // Sur ordinateur, l'onglet Taper est celui par défaut.
      expect(await page.getByRole("tab", { name: en.sign.pad.type }).getAttribute("aria-selected")).toBe("true");
      await page.locator("body").focus();
      await tabTo((f) => f.startsWith("INPUT") && f.split("|")[2] === nameId);
      await page.keyboard.type("Jane Doe");

      // Le rendu de l'aperçu prend un moment ; on l'attend sans rien toucher.
      await signatureBox(page, 1).waitFor({ timeout: 60_000 });
      await tabTo((f) => f.includes(en.sign.place.boxLabel(1)));
      await page.keyboard.press("ArrowUp");
      // Rendu relancé par le déplacement : le bouton redevient actif (et focalisable).
      await waitDownloadable(page);
      await tabTo((f) => f.startsWith("BUTTON") && f.endsWith(`|${en.download.one}`));
      const out = await download(page, en, () => page.keyboard.press("Enter"));
      expect(out.name).toBe("form-signed.pdf");
      expect((await PDFDocument.load(out.bytes)).getPageCount()).toBe(1);
      expect(await darkShare(page, await pageJpeg(out.bytes, 0), { x: 0.6, y: 0.7, w: 0.36, h: 0.28 })).toBeGreaterThan(0.003);
    },
    120_000
  );

  test(
    "Importer : photo d'une signature sur papier, fond retiré, encre bleue",
    async () => {
      const page = await openPage("/en/sign");
      await addFile(page, "quote.pdf", await makePdf([[595, 842]]));
      // « Photo » fabriquée dans le navigateur : papier crème bruité, trait foncé, JPEG.
      const jpg = await page.evaluate(async () => {
        const c = document.createElement("canvas");
        c.width = 900;
        c.height = 400;
        const ctx = c.getContext("2d")!;
        ctx.fillStyle = "#f3f0e8";
        ctx.fillRect(0, 0, 900, 400);
        const img = ctx.getImageData(0, 0, 900, 400);
        for (let i = 0; i < img.data.length; i += 4) {
          const n = (Math.random() - 0.5) * 16;
          img.data[i] += n;
          img.data[i + 1] += n;
          img.data[i + 2] += n;
        }
        ctx.putImageData(img, 0, 0);
        ctx.strokeStyle = "#202020";
        ctx.lineWidth = 9;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(120, 260);
        ctx.bezierCurveTo(250, 40, 330, 380, 450, 180);
        ctx.bezierCurveTo(560, 40, 640, 330, 780, 150);
        ctx.stroke();
        const blob = await new Promise<Blob>((r) => c.toBlob((b) => r(b!), "image/jpeg", 0.9));
        return btoa(String.fromCharCode(...new Uint8Array(await blob.arrayBuffer())));
      });
      await page.getByRole("tab", { name: en.sign.pad.upload }).click();
      await page
        .locator(`input[aria-label="${en.sign.pad.uploadButton}"]`)
        .setInputFiles({ name: "signature.jpg", mimeType: "image/jpeg", buffer: Buffer.from(jpg, "base64") });
      await page.getByRole("radio", { name: en.sign.pad.removeBg }).waitFor();
      expect(await page.getByRole("radio", { name: en.sign.pad.removeBg }).getAttribute("aria-checked")).toBe("true");
      await page.getByRole("radiogroup", { name: en.sign.pad.ink }).getByRole("radio", { name: en.sign.pad.inkBlue }).click();

      // Aperçu : coins transparents (fond retiré), encre bleue.
      const preview = page.locator('[data-testid="signature-preview"] canvas');
      await page.waitForFunction(() => {
        const c = document.querySelector('[data-testid="signature-preview"] canvas') as HTMLCanvasElement | null;
        if (!c || c.width < 10) return false;
        const d = c.getContext("2d")!.getImageData(0, 0, c.width, c.height).data;
        let blue = 0;
        for (let i = 0; i < d.length; i += 4) if (d[i + 3] > 200 && d[i + 2] > d[i] + 60) blue++;
        return blue > 100;
      });
      const corners = await preview.evaluate((c: HTMLCanvasElement) => {
        const ctx = c.getContext("2d")!;
        return [ctx.getImageData(1, 1, 1, 1).data[3], ctx.getImageData(c.width - 2, c.height - 2, 1, 1).data[3]];
      });
      expect(corners).toEqual([0, 0]);

      await waitDownloadable(page);
      const out = await download(page);
      const jpeg = await pageJpeg(out.bytes, 0);
      expect(await blueShare(page, jpeg, DEFAULT_SPOT)).toBeGreaterThan(0.003);
      // Le fond crème n'a pas été collé : le reste de la zone reste blanc.
      expect(await darkShare(page, jpeg, { x: 0.6, y: 0.75, w: 0.05, h: 0.03 })).toBe(0);
    },
    120_000
  );
});

describe("signer : téléphone", () => {
  test(
    "390 × 844 : une étape à la fois, pavé au doigt, poignée accessible",
    async () => {
      const page = await openPage("/en/sign", {
        viewport: { width: 390, height: 844 },
        hasTouch: true,
        isMobile: browserName() !== "firefox",
      });
      const section = (label: string) => page.locator(`section[aria-label="${label}"]`);
      await addFile(page, "lease.pdf", await makePdf([[595, 842]]));
      expect(await section(en.sign.step2).isVisible()).toBe(false);
      expect(await section(en.sign.step3).isVisible()).toBe(false);
      await page.getByRole("button", { name: en.sign.next.signature }).click();
      expect(await section(en.sign.step1).isVisible()).toBe(false);
      // Écran tactile : « Dessiner » par défaut.
      expect(await page.getByRole("tab", { name: en.sign.pad.draw }).getAttribute("aria-selected")).toBe("true");

      const pad = page.getByRole("img", { name: en.sign.pad.canvasLabel });
      await pad.scrollIntoViewIfNeeded();
      const b = (await pad.boundingBox())!;
      const pts = Array.from({ length: 10 }, (_, i) => ({
        x: b.x + b.width * (0.15 + i * 0.07),
        y: b.y + b.height * (i % 2 ? 0.35 : 0.65),
      }));
      if (browserName() === "chromium") {
        // Vrai geste tactile (pointerType « touch »), via le protocole de Chromium.
        const cdp = await context!.newCDPSession(page);
        const touch = (type: "touchStart" | "touchMove" | "touchEnd", p?: { x: number; y: number }) =>
          cdp.send("Input.dispatchTouchEvent", { type, touchPoints: p ? [{ x: p.x, y: p.y }] : [] });
        await touch("touchStart", pts[0]);
        for (const p of pts.slice(1)) await touch("touchMove", p);
        await touch("touchEnd");
      } else {
        await page.mouse.move(pts[0].x, pts[0].y);
        await page.mouse.down();
        for (const p of pts.slice(1)) await page.mouse.move(p.x, p.y, { steps: 2 });
        await page.mouse.up();
      }

      const next = page.getByRole("button", { name: en.sign.next.place });
      await next.and(page.locator(":enabled")).waitFor({ timeout: 30_000 });
      await next.click();
      expect(await section(en.sign.step2).isVisible()).toBe(false);
      await signatureBox(page, 1).waitFor({ timeout: 60_000 });

      // Poignée : visible et saisissable (32 px), sous la barre du bas ? On la ramène à l'écran.
      const handle = page.locator('[data-testid="signature-handle"]');
      await handle.scrollIntoViewIfNeeded();
      const h = (await handle.boundingBox())!;
      expect(h.width).toBeGreaterThanOrEqual(32);
      expect(h.x + h.width).toBeLessThanOrEqual(390 + 1);
      const bar = (await downloadButton(page).boundingBox())!;
      // Hors de la barre fixe du bas : sinon le doigt toucherait le bouton.
      if (h.y + h.height > bar.y - 8) {
        await page.mouse.wheel(0, 200);
      }
      const before = (await boxFraction(page))!;
      const hh = (await handle.boundingBox())!;
      await page.mouse.move(hh.x + hh.width / 2, hh.y + hh.height / 2);
      await page.mouse.down();
      await page.mouse.move(hh.x - 60, hh.y - 20, { steps: 6 });
      await page.mouse.up();
      await page.waitForFunction((w0) => {
        const b = document.querySelector('[data-testid="signature-box"]')!.getBoundingClientRect();
        const s = document.querySelector('[data-testid="signature-surface"]')!.getBoundingClientRect();
        return b.width / s.width < w0 - 0.05;
      }, before.w);
      await waitDownloadable(page);
    },
    120_000
  );
});

describe("signer : droite à gauche", () => {
  test(
    "/ar/sign : la mise en page s'inverse, la boîte de signature non (coordonnées de la page)",
    async () => {
      const ar = STRINGS.ar;
      const page = await openPage("/ar/sign");
      expect(await page.evaluate(() => document.documentElement.dir)).toBe("rtl");
      await addFile(page, "عقد.pdf", await makePdf([[595, 842]]), ar);
      await typeName(page, "سارة", ar);
      await signatureBox(page, 1, ar).waitFor({ timeout: 60_000 });

      // Colonnes inversées : l'étape 1 à droite de l'aperçu.
      const step1 = (await page.locator(`section[aria-label="${ar.sign.step1}"]`).boundingBox())!;
      const step3 = (await page.locator(`section[aria-label="${ar.sign.step3}"]`).boundingBox())!;
      expect(step1.x).toBeGreaterThan(step3.x);
      // Boîte : toujours en bas à DROITE de la page.
      const f = (await boxFraction(page))!;
      expect(f.x + f.w).toBeCloseTo(0.94, 1);
      // La flèche droite déplace vers la droite de la page, même en arabe.
      await signatureBox(page, 1, ar).focus();
      await page.keyboard.press("Shift+ArrowLeft");
      await page.keyboard.press("ArrowRight");
      await page.waitForFunction((x0) => {
        const b = document.querySelector('[data-testid="signature-box"]')!.getBoundingClientRect();
        const s = document.querySelector('[data-testid="signature-surface"]')!.getBoundingClientRect();
        return Math.abs((b.left - s.left) / s.width - (x0 - 0.04)) < 0.005;
      }, f.x);
    },
    120_000
  );
});

describe("signer : options", () => {
  test(
    "parapher chaque page : la page 1 porte le petit paraphe, la dernière la signature",
    async () => {
      const page = await openPage("/en/sign");
      await addFile(page, "contract.pdf", await makePdf([[595, 842], [595, 842], [595, 842]]));
      await typeName(page, "Jane Doe");
      await signatureBox(page, 3).waitFor({ timeout: 60_000 });
      await page.getByRole("checkbox", { name: en.sign.place.initials }).check();
      await waitDownloadable(page);
      const out = await download(page);
      const first = await pageJpeg(out.bytes, 0);
      // Paraphe : 16 % de large, en bas à droite.
      expect(await darkShare(page, first, { x: 0.78, y: 0.86, w: 0.16, h: 0.08 })).toBeGreaterThan(0.003);
      expect(await darkShare(page, first, { x: 0.06, y: 0.86, w: 0.3, h: 0.08 })).toBe(0);
      // Page de la signature : pas de paraphe en plus, la signature (28 %) seulement.
      expect(await darkShare(page, await pageJpeg(out.bytes, 2), DEFAULT_SPOT)).toBeGreaterThan(0.003);
    },
    120_000
  );

  test(
    "empreinte affichée = SHA-256 des octets téléchargés",
    async () => {
      const page = await openPage("/en/sign");
      await addFile(page, "lease.pdf", await makePdf([[595, 842]]));
      await typeName(page, "Jane Doe");
      await waitDownloadable(page);
      const out = await download(page);
      const shown = await page.locator('[data-testid="fingerprint"] code').getAttribute("data-hash");
      expect(shown).toBe(createHash("sha256").update(out.bytes).digest("hex"));
      await page.getByText(en.sign.fingerprint.title).waitFor();
      await page.getByRole("button", { name: en.sign.another }).waitFor();
    },
    120_000
  );

  test(
    "« ajouter aussi un filigrane » : le texte du filigrane couvre la page",
    async () => {
      const page = await openPage("/en/sign");
      await addFile(page, "lease.pdf", await makePdf([[595, 842]]));
      await typeName(page, "Jane Doe");
      await waitDownloadable(page);
      const plain = await download(page);
      const top = { x: 0.1, y: 0.1, w: 0.8, h: 0.5 };
      expect(await darkShare(page, await pageJpeg(plain.bytes, 0), top)).toBe(0);

      await page.getByRole("checkbox", { name: en.sign.withWatermark }).check();
      await page.getByLabel(en.purpose.label).fill("Rental application");
      await page.getByLabel(en.recipients.label).fill("Martin Lettings");
      await page.waitForTimeout(700);
      await waitDownloadable(page);
      const stamped = await download(page);
      const jpeg = await pageJpeg(stamped.bytes, 0);
      // Le filigrane est clair et semi-transparent : on compte les pixels non blancs.
      const tinted = await page.evaluate(async (b64) => {
        const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
        const bitmap = await createImageBitmap(new Blob([bytes], { type: "image/jpeg" }));
        const c = document.createElement("canvas");
        c.width = bitmap.width;
        c.height = bitmap.height;
        const ctx = c.getContext("2d")!;
        ctx.drawImage(bitmap, 0, 0);
        const d = ctx.getImageData(0, 0, c.width, Math.floor(c.height * 0.6)).data;
        let n = 0;
        for (let i = 0; i < d.length; i += 4) if (d[i] < 235 || d[i + 1] < 235 || d[i + 2] < 235) n++;
        return n / (d.length / 4);
      }, Buffer.from(jpeg).toString("base64"));
      expect(tinted).toBeGreaterThan(0.01);
    },
    120_000
  );

  test(
    "document de plus de 12 pages : la dernière page est prévisualisée, l'intervalle signalé",
    async () => {
      const page = await openPage("/en/sign");
      await addFile(page, "long.pdf", await makePdf(Array.from({ length: 15 }, () => [300, 420] as [number, number])));
      await typeName(page, "Jane Doe");
      await signatureBox(page, 15).waitFor({ timeout: 90_000 });
      await page.getByText(en.pageOf(15, 15)).waitFor();
      await page.getByText(en.sign.place.gap(12, 14)).first().waitFor();
      // Page précédente : la 11e (les pages 12 à 14 ne sont pas rendues en aperçu).
      await page.getByRole("button", { name: en.pagerPrev }).click();
      await page.getByText(en.pageOf(11, 15)).waitFor();
      await page.getByText(en.sign.place.isOn(15)).waitFor();
    },
    120_000
  );
});
