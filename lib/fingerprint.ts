// Empreinte SHA-256 (WebCrypto, aussi disponible sous Bun) : identifie une
// signature dans la clé du tampon, et un fichier signé à l'écran. Rien n'est
// envoyé ni conservé : le calcul se fait en mémoire.

/** SHA-256 en hexadécimal minuscule (64 caractères). */
export async function sha256Hex(input: Uint8Array | ArrayBuffer | Blob): Promise<string> {
  const buffer: ArrayBuffer =
    input instanceof Blob
      ? await input.arrayBuffer()
      : input instanceof Uint8Array
        ? // Copie : digest refuse les vues sur un SharedArrayBuffer, et une vue
          // peut ne couvrir qu'une partie de son tampon.
          (input.slice().buffer as ArrayBuffer)
        : input;
  const digest = new Uint8Array(await crypto.subtle.digest("SHA-256", buffer));
  let hex = "";
  for (const byte of digest) hex += byte.toString(16).padStart(2, "0");
  return hex;
}
