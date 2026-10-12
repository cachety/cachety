import { describe, expect, test } from "bun:test";
import { contrastWithWhite, darker, heightMessage, readPrefill, validatePartners } from "./partners";

describe("liste des partenaires", () => {
  test("accepte une origine https exacte", () => {
    expect(validatePartners([{ domain: "https://www.agence.example", name: "Agence", since: "2026-11" }])).toHaveLength(1);
    expect(validatePartners([])).toEqual([]);
  });

  test("refuse http, chemins, jokers, ports, doublons et noms douteux", () => {
    const bad = [
      { domain: "http://agence.example", name: "A", since: "2026-11" },
      { domain: "https://agence.example/page", name: "A", since: "2026-11" },
      { domain: "https://*.agence.example", name: "A", since: "2026-11" },
      { domain: "https://agence.example:8443", name: "A", since: "2026-11" },
      { domain: "https://agence.example", name: "<b>A</b>", since: "2026-11" },
      { domain: "https://agence.example", name: "A", since: "novembre" },
    ];
    for (const p of bad) expect(() => validatePartners([p])).toThrow();
    const dup = { domain: "https://agence.example", name: "A", since: "2026-11" };
    expect(() => validatePartners([dup, dup])).toThrow();
  });
});

describe("cadre intégré", () => {
  test("le message au parent ne contient que le type et la hauteur", () => {
    expect(heightMessage(812.4)).toEqual({ type: "cachety:height", height: 813 });
    expect(Object.keys(heightMessage(1))).toEqual(["type", "height"]);
  });

  test("pré-remplissage lu dans le fragment, borné et vérifié", () => {
    expect(readPrefill("#for=Dossier%20location&to=Agence%20Martin&accent=%23005A9C")).toEqual({
      purpose: "Dossier location",
      recipient: "Agence Martin",
      accent: "#005a9c",
    });
    expect(readPrefill(`#for=${"x".repeat(200)}`).purpose).toHaveLength(80);
    expect(readPrefill("#accent=red").accent).toBeUndefined();
    // Couleur trop claire : texte blanc illisible, ignorée.
    expect(readPrefill("#accent=%23ffee88").accent).toBeUndefined();
    expect(readPrefill("")).toEqual({ purpose: undefined, recipient: undefined, accent: undefined });
  });

  test("contraste et variante sombre", () => {
    expect(contrastWithWhite("#000000")).toBeCloseTo(21);
    expect(contrastWithWhite("#ffffff")).toBeCloseTo(1);
    expect(darker("#c4262e")).toBe("#a11f26");
  });
});
