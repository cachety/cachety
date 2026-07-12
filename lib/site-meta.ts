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

// Page « Pourquoi filigraner ? » : /about détecte la langue (x-default),
// /fr/about /en/about /ja/about l'imposent (métadonnées et lang corrects).
export const ABOUT_ALTERNATES: Record<string, string> = {
  "x-default": "/about",
  fr: "/fr/about",
  en: "/en/about",
  ja: "/ja/about",
};

export const ABOUT_META: Record<Lang, { title: string; description: string }> = {
  fr: {
    title: "Pourquoi filigraner vos documents ? | Filigrane Local",
    description:
      "À quoi sert un filigrane sur une pièce d'identité ou un justificatif : limiter la réutilisation d'une copie, la rendre traçable et se protéger de l'usurpation d'identité.",
  },
  en: {
    title: "Why watermark your documents? | Filigrane Local",
    description:
      "What a watermark on an ID or supporting document is for: limiting reuse of a copy, making it traceable, and protecting yourself from identity theft.",
  },
  ja: {
    title: "なぜ書類に透かしを入れるのか | Filigrane Local",
    description:
      "身分証や証明書類に透かしを入れる意味：コピーの再利用を防ぎ、出どころを追跡可能にし、なりすましから身を守ります。",
  },
};

export const SITE_META: Record<Lang, SiteMeta> = {
  fr: {
    path: "/fr",
    ogLocale: "fr_FR",
    title: "Filigrane Local",
    ogTitle: "Filigrane Local : filigrane sécurisé, 100 % localement",
    description:
      "Ajoutez un filigrane à vos documents sensibles, 100 % localement. Aucun envoi vers un serveur, code open source vérifiable.",
  },
  en: {
    path: "/en",
    ogLocale: "en_GB",
    title: "Filigrane Local — Secure watermark, 100% local",
    ogTitle: "Filigrane Local: secure watermark, 100% local",
    description:
      "Add a watermark to your sensitive documents, 100% locally. Nothing is uploaded to any server, verifiable open-source code.",
  },
  ja: {
    path: "/ja",
    ogLocale: "ja_JP",
    title: "Filigrane Local — 100% ローカルで完結する安全な透かし",
    ogTitle: "Filigrane Local：100% ローカルで完結する安全な透かし",
    description:
      "機密文書への透かし入れを 100% ローカルで。サーバーへの送信は一切なし、検証可能なオープンソースです。",
  },
};
