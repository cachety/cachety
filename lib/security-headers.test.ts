// Garde-fou de la politique de sécurité HTTP (public/_headers). Chaque
// directive ci-dessous porte une promesse documentée dans docs/security.md :
// l'affaiblir doit faire échouer la CI, pas passer inaperçu en revue.

import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parseCsp, rootHeaders } from "./http-headers";

const raw = readFileSync(join(import.meta.dir, "..", "public", "_headers"), "utf8");

const headers = rootHeaders(raw);
const csp = parseCsp(headers["content-security-policy"] ?? "");

describe("Content-Security-Policy (public/_headers)", () => {
  test("aucune requête réseau hors de l'origine : la promesse « zéro transfert »", () => {
    expect(csp["connect-src"]).toEqual(["'self'", "blob:", "data:"]);
    expect(csp["default-src"]).toEqual(["'self'"]);
  });

  test("aucune source externe pour scripts, styles, polices, images, workers", () => {
    for (const d of ["script-src", "style-src", "font-src", "img-src", "worker-src"]) {
      for (const v of csp[d] ?? []) expect(v).not.toMatch(/^(https?:|\*|wss?:)/);
    }
  });

  test("pas d'eval JavaScript ; seul WebAssembly est autorisé (décodeurs pdf.js)", () => {
    expect(csp["script-src"]).not.toContain("'unsafe-eval'");
    expect(csp["script-src"]).toContain("'wasm-unsafe-eval'");
  });

  test("script-src ne contient que le gabarit 'unsafe-inline' remplacé au build", () => {
    // gen-sw.mjs le remplace par des hachages : toute autre forme casserait ce remplacement.
    expect(headers["content-security-policy"]).toContain("script-src 'self' 'unsafe-inline' ");
  });

  test("plugins, <base>, formulaires et mise en cadre interdits", () => {
    expect(csp["object-src"]).toEqual(["'none'"]);
    expect(csp["base-uri"]).toEqual(["'none'"]);
    expect(csp["form-action"]).toEqual(["'none'"]);
    expect(csp["frame-ancestors"]).toEqual(["'none'"]);
  });
});

describe("en-têtes de durcissement", () => {
  test.each([
    ["x-content-type-options", "nosniff"],
    ["x-frame-options", "DENY"],
    ["referrer-policy", "no-referrer"],
    ["cross-origin-opener-policy", "same-origin"],
    ["cross-origin-resource-policy", "same-origin"],
    ["cross-origin-embedder-policy", "require-corp"],
  ])("%s: %s", (name, value) => {
    expect(headers[name]).toBe(value);
  });

  test("HSTS ≥ 1 an, sous-domaines inclus", () => {
    const hsts = headers["strict-transport-security"] ?? "";
    expect(Number(hsts.match(/max-age=(\d+)/)?.[1])).toBeGreaterThanOrEqual(31_536_000);
    expect(hsts).toContain("includeSubDomains");
  });

  test("caméra, micro, géolocalisation, paiement… coupés", () => {
    const pp = headers["permissions-policy"] ?? "";
    for (const f of ["camera", "microphone", "geolocation", "payment", "usb"]) {
      expect(pp).toContain(`${f}=()`);
    }
  });

  test("le service worker est revalidé à chaque visite", () => {
    expect(raw).toMatch(/^\/sw\.js\n\s+Cache-Control: no-cache$/m);
  });
});
