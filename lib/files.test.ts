import { describe, expect, test } from "bun:test";
import { unzipSync, strToU8 } from "fflate";
import { PDFDocument } from "pdf-lib";
import { a4PageFor, fileKind, hasVisibleText, imageToPdf, zipPaths, isSupported, outputName, uniqueName, zipDocuments } from "./files";

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

  test("un type vide ou octet-stream retombe sur l'extension (dépôt mixte)", () => {
    expect(fileKind({ type: "", name: "photo.jpg" })).toBe("image");
    expect(fileKind({ type: "", name: "photo.JPEG" })).toBe("image");
    expect(fileKind({ type: "application/octet-stream", name: "scan.PDF" })).toBe("pdf");
    expect(fileKind({ type: "image/jpg", name: "a.jpg" })).toBe("image");
    expect(isSupported({ type: "", name: "photo.png" })).toBe(true);
    expect(fileKind({ type: "", name: "notes.txt" })).toBe("unsupported");
    expect(fileKind({ type: "", name: "archive.zip" })).toBe("unsupported");
  });

  test("alias historiques acceptés ; un type explicite d'un autre format n'est jamais rattrapé par l'extension", () => {
    expect(fileKind({ type: "application/x-pdf", name: "a.pdf" })).toBe("pdf");
    expect(fileKind({ type: "image/x-png", name: "a.png" })).toBe("image");
    expect(fileKind({ type: "image/x-ms-bmp", name: "a.bmp" })).toBe("image");
    expect(fileKind({ type: "image/svg+xml", name: "piege.png" })).toBe("unsupported");
    expect(fileKind({ type: "text/html", name: "piege.pdf" })).toBe("unsupported");
  });

  test("sans extension réelle, un type vide est refusé (fichier nommé « pdf », « .png »)", () => {
    expect(fileKind({ type: "", name: "pdf" })).toBe("unsupported");
    expect(fileKind({ type: "", name: ".png" })).toBe("unsupported");
    expect(fileKind({ type: "", name: "x" })).toBe("unsupported");
  });

  // Type seul, sans nom : un type vide n'a pas d'extension sur laquelle retomber.
  test("accepte HEIC/HEIF (photos d'iPhone), par type ou par extension", () => {
    expect(fileKind({ type: "image/heic", name: "IMG_0001.HEIC" })).toBe("image");
    expect(fileKind({ type: "image/heif", name: "x" })).toBe("image");
    expect(fileKind({ type: "", name: "IMG_0001.heic" })).toBe("image");
  });

  test("refuse SVG, TIFF, bureautique, et un type vide sans nom", () => {
    for (const type of [
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

  test("mode « signer » : <original>-signed.pdf, y compris pour une photo", () => {
    expect(outputName("bail.pdf", "pdf", "signed")).toBe("bail-signed.pdf");
    expect(outputName("attestation.jpg", "pdf", "signed")).toBe("attestation-signed.pdf");
  });
});

describe("zipPaths", () => {
  test("mêmes chemins que l'archive, doublons renommés : une empreinte par fichier", () => {
    const files = [
      { name: "contract-signed.pdf", bytes: new Uint8Array([1]) },
      { name: "contract-signed.pdf", bytes: new Uint8Array([2]) },
      { name: "../x.pdf", folder: "Agence", bytes: new Uint8Array([3]) },
    ];
    expect(zipPaths(files)).toEqual(["contract-signed.pdf", "contract-signed-2.pdf", "Agence/x.pdf"]);
    expect(Object.keys(unzipSync(zipDocuments(files)))).toEqual(zipPaths(files));
  });
});

describe("zipDocuments : aucune heure de création", () => {
  test("chaque entrée porte la même date fixe (2000-01-01), pas l'heure du téléchargement", () => {
    const zip = zipDocuments([
      { name: "a.pdf", bytes: new Uint8Array([1, 2, 3]) },
      { name: "b.pdf", bytes: new Uint8Array([4]) },
    ]);
    // En-têtes locaux (signature PK\x03\x04) : date DOS aux octets 12-13 (année depuis 1980 sur 7 bits).
    const years: number[] = [];
    for (let i = 0; i + 30 <= zip.length; i++) {
      if (zip[i] === 0x50 && zip[i + 1] === 0x4b && zip[i + 2] === 3 && zip[i + 3] === 4) {
        const dosDate = zip[i + 12] | (zip[i + 13] << 8);
        years.push((dosDate >> 9) + 1980);
      }
    }
    expect(years).toEqual([2000, 2000]);
  });
});

describe("imageToPdf", () => {
  const PNG_1x1 = Uint8Array.from(
    Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
      "base64"
    )
  );
  // JPEG minimal (1 × 1, niveaux de gris) : seul l'en-tête SOF compte pour pdf-lib.
  const JPG_1x1 = Uint8Array.from(
    Buffer.from(
      "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=",
      "base64"
    )
  );

  test("une page par image, en points ce que l'image mesure en pixels (PNG et JPEG)", async () => {
    for (const [bytes, extension] of [
      [PNG_1x1, "png"],
      [JPG_1x1, "jpg"],
    ] as const) {
      const doc = await PDFDocument.load(await imageToPdf(bytes, extension));
      expect(doc.getPageCount()).toBe(1);
      expect(doc.getPage(0).getSize()).toEqual({ width: 1, height: 1 });
    }
  });

  test("« a4 » (mode signer) : page qui tient dans un A4, aux proportions de l'image, sans marge", async () => {
    // Portrait : photo de téléphone de 3000 × 4000 px, largeur A4.
    expect(a4PageFor(3000, 4000)).toEqual({ width: 595.28, height: 793.71 });
    // Paysage : petite image de 320 × 240 px, plus agrandie au hasard (800 × 600 avant).
    expect(a4PageFor(320, 240)).toEqual({ width: 793.71, height: 595.28 });
    // Plus allongée qu'un A4 : c'est la hauteur qui borne.
    expect(a4PageFor(1000, 4000)).toEqual({ width: 210.47, height: 841.89 });
    // Carré : côté du petit bord.
    expect(a4PageFor(50, 50)).toEqual({ width: 595.28, height: 595.28 });
    const doc = await PDFDocument.load(await imageToPdf(PNG_1x1, "png", "a4"));
    expect(doc.getPage(0).getSize()).toEqual({ width: 595.28, height: 595.28 });
  });

  test("aucune métadonnée : ni Producer, ni Creator, ni dates", async () => {
    // Relu sans updateMetadata : sinon pdf-lib remplit lui-même ces champs à la lecture.
    const doc = await PDFDocument.load(await imageToPdf(PNG_1x1, "png"), { updateMetadata: false });
    expect(doc.getProducer()).toBeUndefined();
    expect(doc.getCreator()).toBeUndefined();
    expect(doc.getCreationDate()).toBeUndefined();
    expect(doc.getModificationDate()).toBeUndefined();
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

describe("zipDocuments, un dossier par destinataire", () => {
  test("dossiers séparés ; un nom de dossier hostile est réduit à un seul segment", () => {
    const zip = zipDocuments([
      { name: "a.pdf", bytes: strToU8("1"), folder: "agence-martin" },
      { name: "a.pdf", bytes: strToU8("2"), folder: "foncia" },
      { name: "b.pdf", bytes: strToU8("3"), folder: "../../etc" },
      { name: "c.pdf", bytes: strToU8("4"), folder: ".." },
    ]);
    expect(Object.keys(unzipSync(zip)).sort()).toEqual([
      "agence-martin/a.pdf",
      "c.pdf",
      "etc/b.pdf",
      "foncia/a.pdf",
    ]);
  });
});
