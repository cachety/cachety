import { describe, expect, test } from "bun:test";
import { PDFDocument, StandardFonts } from "pdf-lib";
import {
  clampPassword,
  encryptPdf,
  generateFilePassword,
  passwordEntropyBits,
  passwordIsShort,
  passwordIsStrong,
  passwordUtf8Length,
  combineAsPdf,
  protectFile,
} from "./file-password";

const PNG_1x1 = Uint8Array.from(
  Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
    "base64"
  )
);

describe("PDF unique", () => {
  test("une image puis un PDF deviennent un document de deux pages, dans cet ordre", async () => {
    const src = await PDFDocument.create();
    src.addPage([200, 100]);
    const merged = await combineAsPdf([
      { bytes: PNG_1x1, extension: "png" },
      { bytes: await src.save(), extension: "pdf" },
    ]);
    const out = await PDFDocument.load(merged, { updateMetadata: false });
    expect(out.getPageCount()).toBe(2);
    const [imagePage, pdfPage] = out.getPages();
    expect(imagePage.getWidth()).toBe(1);
    expect(pdfPage.getWidth()).toBe(200);
    expect(out.getProducer()).toBeUndefined();
    expect(out.getCreator()).toBeUndefined();
    expect(out.getCreationDate()).toBeUndefined();
    expect(out.getModificationDate()).toBeUndefined();
  });
});

describe("mot de passe de fichier", () => {
  test("le secret généré fait 256 bits et tient dans la limite PDF", () => {
    const password = generateFilePassword();
    expect(password).toMatch(/^[A-Za-z0-9_-]{43}$/);
    expect(passwordUtf8Length(password)).toBeLessThanOrEqual(127);
    const padded = password.replaceAll("-", "+").replaceAll("_", "/") + "=";
    expect(Buffer.from(padded, "base64")).toHaveLength(32);
    expect(passwordIsStrong(password)).toBe(true);
    expect(passwordIsShort(password)).toBe(false);
  });

  test("un mot de passe court est signalé, un long secret ne l'est pas", () => {
    expect(passwordIsShort("secret")).toBe(true);
    expect(passwordEntropyBits("")).toBe(0);
    expect(passwordIsStrong("secret")).toBe(false);
  });

  test("au-delà de 127 octets UTF-8, on coupe sans casser un caractère", () => {
    expect(clampPassword("a".repeat(200))).toHaveLength(127);
    const emoji = "😀".repeat(40);
    const clamped = clampPassword(emoji);
    expect(passwordUtf8Length(clamped)).toBeLessThanOrEqual(127);
    expect(clamped.endsWith("�")).toBe(false);
  });

  test("le PDF téléchargé est en AES-256, illisible sans le mot de passe, intact avec", async () => {
    const doc = await PDFDocument.create();
    doc.addPage([200, 200]);
    const font = await doc.embedFont(StandardFonts.Helvetica);
    doc.getPages()[0].drawText("MARKER-filigrane-xyz", { x: 20, y: 100, size: 12, font });
    doc.setTitle("MARKER-filigrane-xyz");
    const plain = await doc.save();
    const password = generateFilePassword();
    const locked = await encryptPdf(plain, password);
    const source = new TextDecoder("latin1").decode(locked);

    expect(source).toContain("/AESV3");
    expect(source).toContain("/R 6");
    expect(source).not.toContain("MARKER-filigrane-xyz");

    const { PDFDocument: Load, configure, unlockInPlace } = await loadEncrypt();
    const opened = await Load.load(locked, { ignoreEncryption: true });
    await unlockInPlace(opened, password);
    expect(opened.getTitle()).toBe("MARKER-filigrane-xyz");

    const rejected = await Load.load(locked, { ignoreEncryption: true });
    await expect(unlockInPlace(rejected, "pas-le-bon")).rejects.toThrow(/password/i);
  });

  test("un mot de passe accentué s'ouvre quelle que soit sa forme Unicode (NFKC, comme Acrobat)", async () => {
    const plain = await (await PDFDocument.create()).save();
    const decomposed = "café-secret"; // « é » en deux points de code (saisie macOS)
    const composed = "café-secret";
    const locked = await encryptPdf(plain, decomposed);

    const { PDFDocument: Load, unlockInPlace } = await loadEncrypt();
    const opened = await Load.load(locked, { ignoreEncryption: true });
    expect(await unlockInPlace(opened, composed)).toBe(true);
  });

  test("deux chiffrements du même fichier ne partagent ni clé, ni sel, ni IV", async () => {
    const plain = await (await PDFDocument.create()).save();
    const field = (pdf: Uint8Array, key: string) =>
      new TextDecoder("latin1").decode(pdf).match(new RegExp(`/${key} <([0-9a-fA-F]+)>`))?.[1];
    const a = await encryptPdf(plain, "meme-mot-de-passe");
    const b = await encryptPdf(plain, "meme-mot-de-passe");
    for (const key of ["U", "O", "UE", "OE", "Perms"]) {
      expect(field(a, key)).toBeDefined();
      expect(field(a, key)).not.toBe(field(b, key));
    }
  });

  test("une image protégée part en PDF chiffré d'une page ; sans mot de passe elle reste une image", async () => {
    const blob = new Blob([Uint8Array.from(PNG_1x1)], { type: "image/png" });
    const open = await protectFile(blob, "png", "");
    expect(open.extension).toBe("png");

    const password = generateFilePassword();
    const locked = await protectFile(blob, "png", password);
    expect(locked.extension).toBe("pdf");
    expect(new TextDecoder("latin1").decode(locked.bytes)).toContain("/AESV3");

    const { PDFDocument: Load, unlockInPlace } = await loadEncrypt();
    const opened = await Load.load(locked.bytes, { ignoreEncryption: true });
    await unlockInPlace(opened, password);
    expect(opened.getPageCount()).toBe(1);
  });
});

async function loadEncrypt() {
  const pdfLib = await import("pdf-lib");
  const { configure, unlockInPlace } = await import("pdf-lib-encrypt");
  configure(pdfLib);
  return { PDFDocument: pdfLib.PDFDocument, configure, unlockInPlace };
}
