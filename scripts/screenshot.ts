// Capture d'écran de l'outil pour les README (docs/preview.png, 1600×1075).
// Reproductible : l'export statique servi avec les en-têtes de production,
// un bulletin de paie fictif, le motif « Rental application » et le
// destinataire « Martin Lettings ». À relancer quand l'interface change.
//
//   bun run build && CHROMIUM_EXE="/chemin/vers/chrome" bun run screenshot

import { join } from "node:path";
import { launchBrowser, MAP_UPSERT_POLYFILL } from "../e2e/helpers/browser";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { E2E_ORIGIN, startServer } from "../e2e/helpers/server";
import { STRINGS } from "../lib/i18n";

const ROOT = join(import.meta.dir, "..");

/** Bulletin de paie anglais, fictif et marqué comme spécimen (page en anglais). */
async function specimenPayslip() {
  const doc = await PDFDocument.create();
  const page = doc.addPage([595, 842]);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const ink = rgb(0.07, 0.07, 0.1);
  const soft = rgb(0.45, 0.47, 0.52);
  page.drawRectangle({ x: 0, y: 772, width: 595, height: 70, color: rgb(0.13, 0.25, 0.57) });
  page.drawText("PAYSLIP", { x: 40, y: 798, size: 24, font: bold, color: rgb(1, 1, 1) });
  page.drawText("SPECIMEN · not a real document", { x: 360, y: 803, size: 10, font, color: rgb(1, 1, 1) });
  const rows: [string, string][] = [
    ["Employer", "Northgate Foods Ltd (fictional)"],
    ["Employee", "Alex Example"],
    ["Employee number", "E-000123"],
    ["Pay period", "September 2026"],
    ["National Insurance no.", "QQ 12 34 56 C"],
  ];
  rows.forEach(([k, v], i) => {
    page.drawText(k, { x: 60, y: 730 - i * 20, size: 10, font, color: soft });
    page.drawText(v, { x: 250, y: 730 - i * 20, size: 10, font: bold, color: ink });
  });
  const lines: [string, string][] = [
    ["Basic salary", "2,850.00"],
    ["Overtime", "180.00"],
    ["Income tax", "-412.60"],
    ["National Insurance", "-247.10"],
    ["Pension", "-151.50"],
  ];
  lines.forEach(([k, v], i) => {
    const y = 590 - i * 26;
    page.drawText(k, { x: 60, y, size: 11, font, color: ink });
    page.drawText(v, { x: 470, y, size: 11, font, color: ink });
    page.drawLine({ start: { x: 60, y: y - 8 }, end: { x: 535, y: y - 8 }, thickness: 0.5, color: rgb(0.88, 0.89, 0.9) });
  });
  page.drawText("Net pay", { x: 60, y: 430, size: 13, font: bold, color: ink });
  page.drawText("2,219.00", { x: 462, y: 430, size: 13, font: bold, color: ink });
  page.drawText("Bank account", { x: 60, y: 395, size: 10, font, color: soft });
  page.drawText("GB00 TEST 0000 0000 1234 56", { x: 250, y: 395, size: 10, font: bold, color: ink });
  for (let i = 0; i < 6; i++)
    page.drawRectangle({ x: 60, y: 340 - i * 28, width: 475 - (i % 3) * 90, height: 8, color: rgb(0.92, 0.93, 0.94) });
  return doc.save();
}
const t = STRINGS.en;
const server = startServer(join(ROOT, "out"));
const browser = await launchBrowser();
try {
  const context = await browser.newContext({ viewport: { width: 1600, height: 1075 }, deviceScaleFactor: 1 });
  await context.addInitScript(MAP_UPSERT_POLYFILL);
  // La bulle d'aide ne doit pas apparaître sur la capture.
  await context.addInitScript(() => localStorage.setItem("tourNudged", "1"));
  const page = await context.newPage();
  await page.goto(`${E2E_ORIGIN}/en`);
  await page
    .locator(`input[aria-label="${t.inputAria}"]`)
    .setInputFiles({ name: "payslip-september.pdf", mimeType: "application/pdf", buffer: Buffer.from(await specimenPayslip()) });
  await page.getByRole("button", { name: t.presets[0].label }).click();
  await page.getByRole("textbox", { name: t.recipients.aria(1) }).fill("Martin Lettings");
  await page.locator("#apercu img").first().waitFor({ timeout: 30_000 });
  await page.waitForFunction(() => !document.querySelector('#apercu [aria-busy="true"]'), null, { timeout: 30_000 });
  await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
  await page.evaluate(() => document.fonts.ready);
  await page.mouse.move(0, 0);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({ path: join(ROOT, "docs", "preview.png") });
  console.log("docs/preview.png mis à jour");
} finally {
  await browser.close();
  server.stop();
}
