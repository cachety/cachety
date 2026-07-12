import { describe, expect, test } from "bun:test";
import { unzipSync, strToU8 } from "fflate";
import { hasVisibleText, isSupported, outputName, uniqueName, zipDocuments } from "./files";

describe("isSupported (whitelist des formats)", () => {
  test("accepte PDF et les images réellement décodables", () => {
    for (const type of [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/webp",
      "image/gif",
      "image/bmp",
      "image/avif",
    ]) {
      expect(isSupported(type)).toBe(true);
    }
  });

  test("refuse HEIC, SVG, TIFF, bureautique et type vide", () => {
    for (const type of [
      "image/heic",
      "image/heif",
      "image/svg+xml",
      "image/tiff",
      "application/msword",
      "text/plain",
      "",
    ]) {
      expect(isSupported(type)).toBe(false);
    }
  });
});

describe("hasVisibleText", () => {
  test("vrai pour du texte visible", () => {
    expect(hasVisibleText("Copie")).toBe(true);
    expect(hasVisibleText("  a  ")).toBe(true);
  });
  test("faux pour vide, espaces, ou caractères invisibles seuls", () => {
    expect(hasVisibleText("")).toBe(false);
    expect(hasVisibleText("   ")).toBe(false);
    expect(hasVisibleText("\u200B\u200B")).toBe(false);
    expect(hasVisibleText("\uFEFF\u2060\u200D")).toBe(false);
  });
});

describe("outputName", () => {
  test("remplace l'extension d'origine et ajoute le suffixe", () => {
    expect(outputName("carte.pdf", "pdf", "filigrane")).toBe("carte-filigrane.pdf");
    expect(outputName("photo.jpg", "png", "watermarked")).toBe("photo-watermarked.png");
  });

  test("gère plusieurs points et l'absence d'extension", () => {
    expect(outputName("a.b.c.pdf", "pdf", "x")).toBe("a.b.c-x.pdf");
    expect(outputName("scan", "pdf", "x")).toBe("scan-x.pdf");
  });

  test("le suffixe FR est sans accent (nom de fichier sûr)", () => {
    expect(outputName("id.pdf", "pdf", "filigrane")).not.toMatch(/[éèêà]/);
  });
});

describe("uniqueName (dédoublonnage)", () => {
  test("suffixe incrémental sur collision", () => {
    const used = new Set<string>();
    expect(uniqueName("a.pdf", used)).toBe("a.pdf");
    expect(uniqueName("a.pdf", used)).toBe("a-2.pdf");
    expect(uniqueName("a.pdf", used)).toBe("a-3.pdf");
  });

  test("fonctionne sans extension", () => {
    const used = new Set<string>();
    expect(uniqueName("scan", used)).toBe("scan");
    expect(uniqueName("scan", used)).toBe("scan-2");
  });
});

describe("zipDocuments", () => {
  test("empaquette tous les fichiers, aucun perdu même en cas de collision", () => {
    const zip = unzipSync(
      zipDocuments([
        { name: "a.pdf", bytes: strToU8("PDF-A") },
        { name: "b.png", bytes: strToU8("PNG-B") },
        { name: "a.pdf", bytes: strToU8("PDF-A-BIS") },
      ])
    );
    expect(Object.keys(zip).sort()).toEqual(["a-2.pdf", "a.pdf", "b.png"]);
    expect(new TextDecoder().decode(zip["a.pdf"])).toBe("PDF-A");
    expect(new TextDecoder().decode(zip["a-2.pdf"])).toBe("PDF-A-BIS");
    expect(new TextDecoder().decode(zip["b.png"])).toBe("PNG-B");
  });

  test("neutralise les chemins hostiles (Zip-Slip) : seul le basename est gardé", () => {
    const zip = unzipSync(
      zipDocuments([
        { name: "../../evil.pdf", bytes: strToU8("X") },
        { name: "/etc/passwd.png", bytes: strToU8("Y") },
        { name: "a\\b\\c.pdf", bytes: strToU8("Z") },
      ])
    );
    for (const entry of Object.keys(zip)) {
      expect(entry).not.toContain("/");
      expect(entry).not.toContain("\\");
      expect(entry).not.toContain("..");
    }
    expect(Object.keys(zip).sort()).toEqual(["c.pdf", "evil.pdf", "passwd.png"]);
  });
});
