// Mot de passe lisible : 12 mots tirés au hasard dans la liste BIP39, comme la
// phrase de récupération d'un portefeuille crypto. 12 × 11 bits = 132 bits.
//
// - Aléa : crypto.getRandomValues, jamais Math.random.
// - Aucun biais : 2 048 = 2^11, chaque mot prend exactement 11 bits (masque),
//   sans modulo ni rejet.
// - Taille : 12 mots de 8 lettres au plus et 11 tirets font 107 octets, sous
//   la limite de 127 octets des mots de passe PDF (aucune troncature).

import { BIP39_ENGLISH } from "@/lib/bip39-english";

export const PASSPHRASE_WORDS = 12;
export const PASSPHRASE_BITS = PASSPHRASE_WORDS * 11;
const SEPARATOR = "-";
const WORD_SET = new Set(BIP39_ENGLISH);

export function generatePassphrase(
  random: (n: number) => Uint16Array = (n) => crypto.getRandomValues(new Uint16Array(n))
) {
  return Array.from(random(PASSPHRASE_WORDS), (r) => BIP39_ENGLISH[r & 2047]).join(SEPARATOR);
}

/** Vrai pour un mot de passe de la forme produite ici (12 mots de la liste). */
export function isPassphrase(password: string) {
  const words = password.split(SEPARATOR);
  return words.length === PASSPHRASE_WORDS && words.every((w) => WORD_SET.has(w));
}
