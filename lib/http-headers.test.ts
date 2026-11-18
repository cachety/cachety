// Lecture de _headers comme Cloudflare Pages : le serveur e2e et les tests de
// sécurité s'appuient dessus. Une erreur ici ferait tourner la suite sous une
// autre politique que la production.

import { describe, expect, test } from "bun:test";
import { headersFor, rulePattern } from "./http-headers";

describe("motifs de _headers", () => {
  test("« * » : n'importe quelle suite, « / » compris", () => {
    expect(rulePattern("/fr/guides/*").test("/fr/guides/x")).toBe(true);
    expect(rulePattern("/fr/guides/*").test("/fr/guides")).toBe(false);
    expect(rulePattern("/fr/*").test("/fr/guides/x")).toBe(true);
    expect(rulePattern("/fr/*").test("/fr")).toBe(false);
  });

  test("« :page » : un seul segment, jamais un « / »", () => {
    const re = rulePattern("/fr/:page");
    for (const path of ["/fr/sign", "/fr/dossier", "/fr/guides", "/fr/about"]) expect(re.test(path), path).toBe(true);
    for (const path of ["/fr", "/fr/", "/fr/guides/x", "/en/sign", "/fr/compare/a/b"]) expect(re.test(path), path).toBe(false);
  });

  test("une origine complète n'est pas prise pour un paramètre (« https: »)", () => {
    expect(rulePattern("https://www.cachety.com/*").test("https://www.cachety.com/fr")).toBe(true);
    expect(rulePattern("https://www.cachety.com/*").test("/fr")).toBe(false);
  });

  test("une page n'a qu'une politique : la règle « :page » et celle d'une section ne se recouvrent pas", () => {
    const text = [
      "/fr/:page",
      "  Content-Security-Policy: direct",
      "/fr/guides/*",
      "  Content-Security-Policy: guides",
      "/fr",
      "  Content-Security-Policy: home",
    ].join("\n");
    expect(headersFor(text, "/fr/dossier")["content-security-policy"]).toBe("direct");
    expect(headersFor(text, "/fr/guides")["content-security-policy"]).toBe("direct");
    expect(headersFor(text, "/fr/guides/x")["content-security-policy"]).toBe("guides");
    expect(headersFor(text, "/fr")["content-security-policy"]).toBe("home");
  });
});
