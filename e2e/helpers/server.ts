// Serveur statique minimal (Bun.serve) pour la suite e2e : sert l'export
// Next (out/) exactement comme un hébergeur de pages statiques, plus un
// répertoire optionnel monté sous /__e2e__/ (bundle du moteur de filigrane,
// page blanche du harnais…).
//
// Port 4181 UNIQUEMENT — réservé à cette suite, d'autres agents utilisent
// d'autres ports.

import { existsSync } from "node:fs";
import { join, extname } from "node:path";
import { MAP_UPSERT_POLYFILL } from "./browser";

export const E2E_PORT = 4181;
export const E2E_ORIGIN = `http://127.0.0.1:${E2E_PORT}`;

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
  ".txt": "text/plain",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".wasm": "application/wasm",
  ".pdf": "application/pdf",
  ".properties": "text/plain",
};

function contentType(path: string) {
  return MIME[extname(path)] ?? "application/octet-stream";
}

export type E2eServer = { stop: () => void };

export function startServer(outDir: string, extraDir?: string): E2eServer {
  if (!existsSync(join(outDir, "index.html"))) {
    throw new Error(
      `Export statique introuvable (${outDir}/index.html) : lancez \`bun run build\` ou \`bun run test:e2e\`.`
    );
  }

  const server = Bun.serve({
    port: E2E_PORT,
    hostname: "127.0.0.1",
    async fetch(req) {
      const pathname = decodeURIComponent(new URL(req.url).pathname);

      // Fichiers du harnais (bundle, page blanche…), hors export Next.
      if (extraDir && pathname.startsWith("/__e2e__/")) {
        const file = Bun.file(join(extraDir, pathname.slice("/__e2e__/".length)));
        if (!(await file.exists())) return new Response("Not found", { status: 404 });
        return new Response(file, { headers: { "Content-Type": contentType(pathname) } });
      }

      // Le worker pdf.js s'exécute hors de la page : l'init script du
      // navigateur ne l'atteint pas. On préfixe donc le polyfill Map
      // « upsert » ici, à la volée, sans toucher aux fichiers de out/.
      if (pathname === "/pdfjs/pdf.worker.min.mjs") {
        const source = await Bun.file(join(outDir, pathname.slice(1))).text();
        return new Response(MAP_UPSERT_POLYFILL + source, {
          headers: { "Content-Type": "text/javascript" },
        });
      }

      // Résolution façon hébergeur statique : /fr → fr.html, / → index.html.
      const clean = pathname.replace(/\/+$/, "") || "/";
      const candidates =
        clean === "/"
          ? ["index.html"]
          : [clean.slice(1), `${clean.slice(1)}.html`, `${clean.slice(1)}/index.html`];
      for (const rel of candidates) {
        const file = Bun.file(join(outDir, rel));
        if (await file.exists()) {
          return new Response(file, { headers: { "Content-Type": contentType(rel) } });
        }
      }
      return new Response("Not found", { status: 404 });
    },
  });

  return { stop: () => server.stop(true) };
}
