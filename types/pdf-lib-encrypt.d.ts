declare module "pdf-lib-encrypt" {
  export function configure(pdfLib: typeof import("pdf-lib")): void;
  export function lock(
    bytes: Uint8Array,
    password: string,
    opts?: { algo?: "aes256" | "rc4"; permissions?: number }
  ): Promise<Uint8Array>;
  export function unlockInPlace(
    doc: import("pdf-lib").PDFDocument,
    password: string
  ): Promise<boolean>;
}
