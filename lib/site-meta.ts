// Métadonnées par langue, importables côté serveur (layout, pages statiques)
// comme côté client (bouton de partage). Surtout pas de "use client" ici.

export const LANG_CODES = ["fr", "en", "ja"] as const;
export type Lang = (typeof LANG_CODES)[number];

export const isLang = (v: string): v is Lang =>
  (LANG_CODES as readonly string[]).includes(v);

export const SITE_URL = "https://filigrane-local.fr";

// hreflang : la racine détecte la langue, /fr /en /ja l'imposent.
export const LANGUAGE_ALTERNATES: Record<string, string> = {
  "x-default": "/",
  fr: "/fr",
  en: "/en",
  ja: "/ja",
};

export type SiteMeta = {
  path: string;
  ogLocale: string;
  title: string;
  ogTitle: string;
  description: string;
};

export const SITE_META: Record<Lang, SiteMeta> = {
  fr: {
    path: "/fr",
    ogLocale: "fr_FR",
    title: "Filigrane Local",
    ogTitle: "Filigrane Local : filigrane sécurisé, 100 % dans votre navigateur",
    description:
      "Ajoutez un filigrane à vos documents sensibles directement dans votre navigateur. Aucun envoi vers un serveur, code open source vérifiable.",
  },
  en: {
    path: "/en",
    ogLocale: "en_GB",
    title: "Filigrane Local — Secure watermark, 100 % in your browser",
    ogTitle: "Filigrane Local: secure watermark, 100 % in your browser",
    description:
      "Add a watermark to your sensitive documents right in your browser. Nothing is uploaded to any server, verifiable open-source code.",
  },
  ja: {
    path: "/ja",
    ogLocale: "ja_JP",
    title: "Filigrane Local — ブラウザ内で完結する安全な透かし",
    ogTitle: "Filigrane Local：ブラウザ内で完結する安全な透かし",
    description:
      "機密文書への透かし入れを、すべてブラウザ内で。サーバーへの送信は一切なし、検証可能なオープンソースです。",
  },
};
