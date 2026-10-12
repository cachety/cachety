// Sécurité de l'export statique (out/) : ce qui part réellement en
// production. Vérifie que gen-sw.mjs a bien remplacé 'unsafe-inline' par
// des hachages, que CHAQUE script inline est couvert (sinon panne en prod)
// et qu'aucun autre ne l'est, et que la CSP <meta> protège aussi un
// auto-hébergement sans _headers.
//
// Sans build (out/ absent), la suite se saute proprement, comme
// site-meta.static.test.ts.

import { describe, expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { headerRules, headersFor, parseCsp } from "../lib/http-headers";

const OUT_DIR = join(import.meta.dir, "..", "out");
const built = existsSync(join(OUT_DIR, "index.html"));
if (!built) console.warn("[security.static] out/ absent : tests sautés. Lancez `bun run build`.");

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const sha = (s: string) => `'sha256-${createHash("sha256").update(s).digest("base64")}'`;

function inlineScriptHashes(html: string) {
  const out: string[] = [];
  for (const m of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (/\ssrc\s*=/i.test(m[1]) || !m[2]) continue;
    const type = m[1].match(/\btype\s*=\s*"([^"]*)"/i)?.[1];
    if (type && type !== "module" && !/javascript/i.test(type)) continue;
    out.push(sha(m[2]));
  }
  return out;
}

/** URL servie d'une page exportée (même règle que scripts/gen-sw.mjs). */
function routeOf(rel: string): string | null {
  if (rel === "404.html") return null;
  if (rel === "index.html") return "/";
  return "/" + rel.replace(/\.html$/, "");
}

const withoutFrameAncestors = (policy: string) =>
  policy
    .split(";")
    .map((d) => d.trim())
    .filter((d) => d && !d.startsWith("frame-ancestors"))
    .join("; ");

describe.skipIf(!built)("sécurité de l'export statique", () => {
  const files = built ? walk(OUT_DIR) : [];
  const htmlFiles = files.filter((f) => f.endsWith(".html"));
  const headersText = built ? readFileSync(join(OUT_DIR, "_headers"), "utf8") : "";
  const cspLines = [...headersText.matchAll(/^\s*Content-Security-Policy:\s*(.+)$/gm)].map((m) => m[1]);

  test("out/_headers : plus aucun 'unsafe-inline' dans script-src, que des hachages", () => {
    expect(cspLines.length).toBeGreaterThan(0);
    for (const policy of cspLines) {
      const scriptSrc = parseCsp(policy)["script-src"] ?? [];
      expect(scriptSrc).not.toContain("'unsafe-inline'");
      expect(scriptSrc).not.toContain("'unsafe-eval'");
      for (const v of scriptSrc.filter((v) => !["'self'", "'wasm-unsafe-eval'"].includes(v))) {
        expect(v).toMatch(/^'sha256-[A-Za-z0-9+/]+=*'$/);
      }
    }
  });

  test("limites Cloudflare Pages : 100 règles, 2 000 caractères par ligne", () => {
    expect(headerRules(headersText).length).toBeLessThanOrEqual(100);
    for (const line of headersText.split("\n")) expect(line.length).toBeLessThanOrEqual(2000);
  });

  test("le bloc « /* » ne pose pas de CSP (elle serait jointe à celle de chaque page)", () => {
    const root = headerRules(headersText).find((r) => r.pattern === "/*");
    expect(root?.headers.some(([n]) => n === "content-security-policy")).toBe(false);
  });

  test("scripts, workers et service worker : CSP stricte, sans aucun hachage", () => {
    for (const path of ["/_next/static/chunks/x.js", "/pdfjs/pdf.worker.min.mjs", "/sw.js"]) {
      const csp = headersFor(headersText, path)["content-security-policy"] ?? "";
      expect(parseCsp(csp)["script-src"], path).toEqual(["'self'", "'wasm-unsafe-eval'"]);
      expect(parseCsp(csp)["connect-src"], path).toEqual(["'self'", "blob:", "data:"]);
    }
  });

  // Pages sous /<langue>/ : regroupées (limite des 100 règles), de préférence
  // une règle par langue (« /fr/* »), sinon par section et par page. La règle
  // d'une page autorise donc ses scripts, et seulement des scripts de pages de
  // sa langue. La <meta> de chaque page reste exacte (test suivant).
  const UNDER_LANG = /^\/([a-z]{2})\/.+$/;
  // Page intégrée des partenaires : une règle commune « /embed/* ».
  const EMBED = /^\/embed\/[a-z]{2}$/;

  test("chaque page : une seule CSP ; ses scripts, et seulement des scripts de sa langue", () => {
    const langHashes = new Map<string, Set<string>>();
    const emittedOf = new Map<string, string[]>();
    for (const f of htmlFiles) {
      const rel = relative(OUT_DIR, f);
      const route = routeOf(rel);
      if (!route) continue;
      const emitted = [...new Set(inlineScriptHashes(readFileSync(f, "utf8")))].sort();
      emittedOf.set(route, emitted);
      const m = route.match(UNDER_LANG) ?? (EMBED.test(route) ? [route, "embed"] : null);
      if (m) langHashes.set(m[1], new Set([...(langHashes.get(m[1]) ?? []), ...emitted]));
    }
    for (const [route, emitted] of emittedOf) {
      const csp = headersFor(headersText, route)["content-security-policy"] ?? "";
      expect(csp, route).not.toContain(", "); // une seule règle : pas de politiques jointes
      const allowed = (parseCsp(csp)["script-src"] ?? []).filter((v) => v.startsWith("'sha256-")).sort();
      const m = route.match(UNDER_LANG) ?? (EMBED.test(route) ? [route, "embed"] : null);
      if (!m) {
        expect(allowed, route).toEqual(emitted);
        continue;
      }
      for (const h of emitted) expect(allowed, route).toContain(h);
      const own = langHashes.get(m[1])!;
      for (const h of allowed) expect(own.has(h), `${route} ${h}`).toBe(true);
    }
  });

  test("chaque page porte la CSP <meta> (sans frame-ancestors), avant tout script", () => {
    for (const f of htmlFiles) {
      const rel = relative(OUT_DIR, f);
      const html = readFileSync(f, "utf8");
      const meta = html.match(/<meta http-equiv="Content-Security-Policy" content="([^"]*)"\/>/);
      expect(meta, rel).toBeTruthy();
      const metaCsp = parseCsp(meta![1]);
      expect(metaCsp["connect-src"], rel).toEqual(["'self'", "blob:", "data:"]);
      expect(metaCsp["frame-ancestors"], rel).toBeUndefined();
      const allowed = (metaCsp["script-src"] ?? []).filter((v) => v.startsWith("'sha256-")).sort();
      expect(allowed, rel).toEqual([...new Set(inlineScriptHashes(html))].sort());
      const route = routeOf(rel);
      // Hors pages regroupées (accueils, racine), la <meta> est la copie exacte de l'en-tête.
      if (route && !UNDER_LANG.test(route) && !EMBED.test(route)) {
        const header = headersFor(headersText, route)["content-security-policy"] ?? "";
        expect(meta![1], rel).toBe(withoutFrameAncestors(header));
      }
      expect(meta!.index!, rel).toBeLessThan(html.search(/<script\b/i));
    }
  });

  test("seule la page intégrée peut s'afficher en cadre, et seulement chez le site et ses partenaires", () => {
    const partners: { domain: string }[] = JSON.parse(readFileSync(join(OUT_DIR, "..", "partners.json"), "utf8"));
    for (const path of ["/embed/en", "/embed/ar"]) {
      const h = headersFor(headersText, path);
      expect(parseCsp(h["content-security-policy"])["frame-ancestors"], path).toEqual([
        "'self'",
        ...partners.map((p) => p.domain),
      ]);
      expect(h["x-frame-options"], path).toBeUndefined();
      expect(h["cross-origin-resource-policy"], path).toBe("cross-origin");
      expect(h["x-robots-tag"], path).toBe("noindex, nofollow");
    }
    for (const path of ["/", "/en", "/fr/partners", "/en/guides/x", "/about"]) {
      const h = headersFor(headersText, path);
      expect(parseCsp(h["content-security-policy"])["frame-ancestors"], path).toEqual(["'none'"]);
      expect(h["x-frame-options"], path).toBe("DENY");
      expect(h["x-robots-tag"], path).toBeUndefined();
    }
  });

  test("page intégrée : noindex, et absente du plan du site", () => {
    const html = readFileSync(join(OUT_DIR, "embed", "en.html"), "utf8");
    expect(html).toMatch(/<meta name="robots" content="noindex, nofollow"\/>/);
    expect(readFileSync(join(OUT_DIR, "sitemap.xml"), "utf8")).not.toContain("/embed/");
  });

  test("aucune ressource externe référencée par les pages", () => {
    for (const f of htmlFiles) {
      const html = readFileSync(f, "utf8");
      for (const m of html.matchAll(/<(?:script|link|img|iframe)\b[^>]*\b(?:src|href)="(https?:)?\/\/[^"]*"/gi)) {
        // Seules les balises <link> de métadonnées (canonical, hreflang, auteur)
        // visent un autre domaine : le navigateur ne les télécharge jamais.
        expect(m[0], relative(OUT_DIR, f)).toMatch(/^<link[^>]*rel="(canonical|alternate|author)"/);
      }
    }
  });

  test("aucune source map publiée (code source et chemins internes)", () => {
    expect(files.filter((f) => f.endsWith(".map"))).toEqual([]);
  });
});
