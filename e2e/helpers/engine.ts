// Moteur de filigrane réel (lib/watermark.ts) chargé dans un vrai navigateur,
// sans l'interface : bundle Bun servi à côté de l'export statique (assets
// pdf.js requis). Partagé par les suites qui appellent watermarkFile.

import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { Browser, Page } from "playwright-core";
import { launchBrowser, MAP_UPSERT_POLYFILL } from "./browser";
import { E2E_ORIGIN, startServer, type E2eServer } from "./server";

const ROOT = join(import.meta.dir, "..", "..");

export type Engine = { page: Page; stop: () => Promise<void> };

export async function startEngine(): Promise<Engine> {
  const tmp = mkdtempSync(join(tmpdir(), "filigrane-engine-"));
  const build = await Bun.build({
    entrypoints: [join(ROOT, "lib/watermark.ts")],
    target: "browser",
    format: "esm",
    outdir: tmp,
    naming: "watermark.bundle.js",
  });
  if (!build.success) throw new AggregateError(build.logs, "bun build a échoué");
  writeFileSync(join(tmp, "blank.html"), "<!doctype html><meta charset='utf-8'><title>moteur</title>");
  const server: E2eServer = startServer(join(ROOT, "out"), tmp);
  const browser: Browser = await launchBrowser();
  const context = await browser.newContext();
  await context.addInitScript(MAP_UPSERT_POLYFILL);
  const page = await context.newPage();
  page.on("pageerror", (e) => console.error("[page]", e.message));
  await page.goto(`${E2E_ORIGIN}/__e2e__/blank.html`);
  await page.evaluate(async (url) => {
    (window as any).__wm = await import(url);
  }, "/__e2e__/watermark.bundle.js");
  return {
    page,
    stop: async () => {
      await browser.close();
      server.stop();
      rmSync(tmp, { recursive: true, force: true });
    },
  };
}
