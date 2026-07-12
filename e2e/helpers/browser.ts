// Lancement du navigateur pour la suite e2e (playwright-core utilisé comme
// bibliothèque, le runner reste bun:test).
//
// Résolution de l'exécutable Chromium, dans l'ordre :
//   1. CHROMIUM_EXE                — chemin explicite (CI ou poste local) ;
//   2. /opt/pw-browsers/chromium   — Chromium préinstallé du conteneur ;
//   3. le registre de playwright-core (PLAYWRIGHT_BROWSERS_PATH), alimenté
//      par `bunx playwright-core install <navigateur>`.
// Firefox et WebKit passent toujours par le registre (cas 3).

import { existsSync } from "node:fs";
import { chromium, firefox, webkit, type Browser } from "playwright-core";

export type BrowserName = "chromium" | "firefox" | "webkit";

/** Navigateur ciblé par la suite (matrice CI) — chromium par défaut. */
export function browserName(): BrowserName {
  const name = process.env.BROWSER ?? "chromium";
  if (name !== "chromium" && name !== "firefox" && name !== "webkit") {
    throw new Error(`BROWSER inconnu : ${name} (chromium | firefox | webkit)`);
  }
  return name;
}

export function chromiumExecutable(): string | undefined {
  if (process.env.CHROMIUM_EXE) return process.env.CHROMIUM_EXE;
  if (existsSync("/opt/pw-browsers/chromium")) return "/opt/pw-browsers/chromium";
  return undefined; // registre playwright-core
}

// Émule les navigateurs 2026 sur le Chromium plus ancien du conteneur :
// pdf.js 6 requiert Map.prototype.getOrInsertComputed (proposition « upsert »),
// absente de Chromium ≤ 141. `??=` rend le polyfill inoffensif sur un
// navigateur récent qui l'implémente déjà. Injecté dans la page via
// addInitScript ET préfixé au worker pdf.js par le serveur statique
// (un init script n'atteint pas les workers).
export const MAP_UPSERT_POLYFILL = `
Map.prototype.getOrInsertComputed ??= function (k, f) { if (!this.has(k)) this.set(k, f(k)); return this.get(k); };
Map.prototype.getOrInsert ??= function (k, v) { if (!this.has(k)) this.set(k, v); return this.get(k); };
`;

export async function launchBrowser(): Promise<Browser> {
  const name = browserName();
  const type = { chromium, firefox, webkit }[name];
  return type.launch({
    executablePath: name === "chromium" ? chromiumExecutable() : undefined,
  });
}
