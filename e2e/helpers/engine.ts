// Moteur de filigrane réel (lib/watermark.ts) chargé dans un vrai navigateur,
// sans l'interface : bundle Bun servi à côté de l'export statique (assets
// pdf.js requis). Partagé par les suites qui appellent watermarkFile.
//
// Par défaut, lib/watermark.ts est exposé en `window.__wm`. D'autres modules
// peuvent être chargés à la place (`modules` : nom global → chemin depuis la
// racine), ex. { __sig: "lib/signature.ts" } pour la couture « signature ».

import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";
import type { Browser, Page } from "playwright-core";
import { launchBrowser, MAP_UPSERT_POLYFILL } from "./browser";
import { E2E_ORIGIN, startServer, type E2eServer } from "./server";

const ROOT = join(import.meta.dir, "..", "..");

export type Engine = { page: Page; stop: () => Promise<void> };

/** Nom global (window[nom]) → module à bundler, chemin depuis la racine du dépôt. */
export type EngineModules = Record<string, string>;

const DEFAULT_MODULES: EngineModules = { __wm: "lib/watermark.ts" };

export async function startEngine(modules: EngineModules = DEFAULT_MODULES): Promise<Engine> {
  const tmp = mkdtempSync(join(tmpdir(), "filigrane-engine-"));
  const bundles: Record<string, string> = {};
  for (const [name, entry] of Object.entries(modules)) {
    const naming = `${basename(entry).replace(/\.tsx?$/, "")}.bundle.js`;
    // Un build par module, sans splitting : chaque bundle est autonome
    // (imports dynamiques — pdf.js, libheif — inlinés), un seul fichier à servir.
    const build = await Bun.build({
      entrypoints: [join(ROOT, entry)],
      target: "browser",
      format: "esm",
      outdir: tmp,
      naming,
    });
    if (!build.success) throw new AggregateError(build.logs, "bun build a échoué");
    bundles[name] = `/__e2e__/${naming}`;
  }
  writeFileSync(join(tmp, "blank.html"), "<!doctype html><meta charset='utf-8'><title>moteur</title>");
  const server: E2eServer = startServer(join(ROOT, "out"), tmp);
  const browser: Browser = await launchBrowser();
  const context = await browser.newContext();
  await context.addInitScript(MAP_UPSERT_POLYFILL);
  const page = await context.newPage();
  page.on("pageerror", (e) => console.error("[page]", e.message));
  await page.goto(`${E2E_ORIGIN}/__e2e__/blank.html`);
  await page.evaluate(async (bundles) => {
    for (const [name, url] of Object.entries(bundles)) (window as any)[name] = await import(url);
  }, bundles);
  return {
    page,
    stop: async () => {
      await browser.close();
      server.stop();
      rmSync(tmp, { recursive: true, force: true });
    },
  };
}
