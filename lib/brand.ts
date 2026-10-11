// Identité du projet : nom, domaine, dépôt, auteur, et la chaîne de
// paternité exigée par l'AGPL (§5a : œuvre modifiée, auteurs d'origine
// crédités). Source unique : en-tête, pied de page, métadonnées, JSON-LD.
// Surtout pas de "use client" ici (importé par le layout serveur).

export const BRAND = "Cachety";
export const SITE_URL = "https://cachety.com";
export const REPO_URL = "https://github.com/cachety/cachety";

/**
 * Projet personnel : un auteur, aucune société. Chaque mention du nom renvoie
 * à son site (lien « author », origine seule transmise : voir AuthorLink).
 */
export const AUTHOR = { name: "Amir Moradi", url: "https://amirmoradi.com" } as const;

/**
 * Page de dons (lien sortant seulement : aucun script ni formulaire de
 * paiement sur le site). Doit rester alignée sur .github/FUNDING.yml.
 */
export const DONATE_URL = "https://github.com/sponsors/amirhmoradi";

/** Œuvres dont Cachety dérive, de la plus récente à la plus ancienne. */
export const UPSTREAM = [
  {
    name: "Filigrane Local",
    author: "Hugo Sibony (KazeTachinuu)",
    url: "https://github.com/KazeTachinuu/filigrane-local",
  },
  {
    name: "Filigraneur",
    author: "CyberClarence",
    url: "https://github.com/cyberclarence/filigraneur",
  },
] as const;
