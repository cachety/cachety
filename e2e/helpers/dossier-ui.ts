// Gestes de l'interface du mode « dossier », partagés par les suites e2e :
// déposer des fichiers, attendre la grille, lire l'ordre des pages, glisser.

import { readFileSync } from "node:fs";
import type { Page } from "playwright-core";
import { STRINGS } from "../../lib/i18n";

type T = (typeof STRINGS)["en"];
const en = STRINGS.en;

export type Upload = { name: string; mimeType: string; bytes: Uint8Array };

export const pdf = (name: string, bytes: Uint8Array): Upload => ({ name, mimeType: "application/pdf", bytes });
export const png = (name: string, bytes: Uint8Array): Upload => ({ name, mimeType: "image/png", bytes });

export async function addFiles(page: Page, files: Upload[], t: T = en) {
  await page
    .locator(`input[aria-label="${t.dossier.inputAria}"]`)
    .setInputFiles(files.map((f) => ({ name: f.name, mimeType: f.mimeType, buffer: Buffer.from(f.bytes) })));
}

/** Attend que la grille montre `count` pages, toutes rendues (vignettes à jour). */
export async function waitPages(page: Page, count: number, t: T = en) {
  await page.getByTestId("page-total").filter({ hasText: t.dossier.grid.total(count) }).waitFor({ timeout: 90_000 });
  await page.waitForFunction(
    (n) => {
      const tiles = [...document.querySelectorAll("[data-page-index]")];
      const panel = document.querySelector('[data-testid="page-grid"]');
      return !!panel && tiles.length > 0 && tiles.length <= n && tiles.every((el) => !(el as HTMLElement).dataset.busy && el.querySelector("img"));
    },
    count,
    { timeout: 90_000 }
  );
}

/** Ordre des pages affichées : « nom-du-fichier#page » (page d'origine, index 0), dans l'ordre de la grille. */
export function order(page: Page) {
  return page.evaluate(() =>
    [...document.querySelectorAll<HTMLElement>("[data-page-index]")]
      .sort((a, b) => Number(a.dataset.pageIndex) - Number(b.dataset.pageIndex))
      .map((el) => `${(el.dataset.doc ?? "").split(":")[0]}#${el.dataset.sourcePage}`)
  );
}

export const tile = (page: Page, index: number) => page.locator(`[data-page-index="${index}"]`);
export const tileButton = (page: Page, index: number) => tile(page, index).locator("[data-tile]");

export function downloadButton(page: Page, label: string) {
  return page.getByRole("button", { name: label, exact: true }).and(page.locator(":visible"));
}

export async function waitDownloadable(page: Page, label: string) {
  await downloadButton(page, label).and(page.locator(":enabled")).first().waitFor({ timeout: 90_000 });
}

export async function download(page: Page, label: string) {
  await waitDownloadable(page, label);
  const [file] = await Promise.all([page.waitForEvent("download", { timeout: 90_000 }), downloadButton(page, label).first().click()]);
  return { name: file.suggestedFilename(), bytes: new Uint8Array(readFileSync((await file.path())!)) };
}

/** Glisser à la souris : de la page `from` vers la moitié (début ou fin) de la page `to`. */
export async function dragTile(page: Page, from: number, to: number, side: "before" | "after" = "before") {
  // La souris de playwright ne fait pas défiler la page : la grille doit être à l'écran.
  await page.getByTestId("page-grid").scrollIntoViewIfNeeded();
  const a = (await tile(page, from).boundingBox())!;
  const b = (await tile(page, to).boundingBox())!;
  const rtl = await page.evaluate(() => document.documentElement.dir === "rtl");
  // « Avant » : la moitié par laquelle la lecture commence (à droite en arabe et en persan).
  const frac = side === "before" ? 0.2 : 0.8;
  const x = b.x + b.width * (rtl ? 1 - frac : frac);
  await page.mouse.move(a.x + a.width / 2, a.y + a.height / 2);
  await page.mouse.down();
  await page.mouse.move(a.x + a.width / 2 + 12, a.y + a.height / 2 + 6, { steps: 3 });
  await page.mouse.move(x, b.y + b.height / 2, { steps: 8 });
  // Laisse passer une image : la cible du dépôt est calculée par requestAnimationFrame.
  await page.waitForTimeout(80);
  await page.mouse.up();
}

/**
 * Appui long au doigt puis glisser : événements pointeur de type « touch »
 * (playwright ne sait faire qu'un tap). `hold` : durée de l'appui en ms.
 */
export async function touchDrag(page: Page, from: number, to: number, side: "before" | "after", hold: number) {
  await page.getByTestId("page-grid").scrollIntoViewIfNeeded();
  const a = (await tile(page, from).boundingBox())!;
  const b = (await tile(page, to).boundingBox())!;
  const start = { x: a.x + a.width / 2, y: a.y + a.height / 2 };
  const end = { x: b.x + b.width * (side === "before" ? 0.2 : 0.8), y: b.y + b.height / 2 };
  const fire = (type: string, p: { x: number; y: number }) =>
    page.evaluate(
      ({ type, p, index }) => {
        const init = { bubbles: true, cancelable: true, pointerId: 7, pointerType: "touch", isPrimary: true, clientX: p.x, clientY: p.y, button: 0 };
        const target = type === "pointerdown" ? document.querySelector(`[data-page-index="${index}"] [data-tile]`)! : window;
        target.dispatchEvent(new PointerEvent(type, init));
      },
      { type, p, index: from }
    );
  await fire("pointerdown", start);
  await page.waitForTimeout(hold);
  const steps = 6;
  for (let i = 1; i <= steps; i++) {
    await fire("pointermove", { x: start.x + ((end.x - start.x) * i) / steps, y: start.y + ((end.y - start.y) * i) / steps });
    await page.waitForTimeout(20);
  }
  await page.waitForTimeout(80);
  await fire("pointerup", end);
}
