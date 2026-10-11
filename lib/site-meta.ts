// Métadonnées par langue, importables côté serveur (layout, pages statiques)
// comme côté client (bouton de partage). Surtout pas de "use client" ici.

import { BRAND, SITE_URL } from "@/lib/brand";
import { META_AR } from "@/lib/locales/ar/meta";
import { META_ES } from "@/lib/locales/es/meta";
import { META_FA } from "@/lib/locales/fa/meta";

export { SITE_URL };

export const LANG_CODES = ["fr", "en", "ja", "zh", "es", "ar", "fa"] as const;
export type Lang = (typeof LANG_CODES)[number];

export const isLang = (v: string): v is Lang =>
  (LANG_CODES as readonly string[]).includes(v);

/** hreflang et <html lang> : le chinois simplifié a besoin de zh-CN pour les glyphes. */
export const HREFLANG: Record<Lang, string> = {
  fr: "fr",
  en: "en",
  ja: "ja",
  zh: "zh-CN",
  es: "es",
  ar: "ar",
  fa: "fa",
};

/** Langues écrites de droite à gauche : <html dir="rtl">. */
export const RTL_LANGS: readonly Lang[] = ["ar", "fa"];
export const dirOf = (lang: Lang): "rtl" | "ltr" => (RTL_LANGS.includes(lang) ? "rtl" : "ltr");

// hreflang : la racine détecte la langue, /fr /en /ja… l'imposent.
export const LANGUAGE_ALTERNATES: Record<string, string> = {
  "x-default": "/",
  ...Object.fromEntries(LANG_CODES.map((l) => [l, `/${l}`])),
};

/** Alternatives hreflang d'une page présente dans les quatre langues (« /about », « /privacy »…). */
export function pageAlternates(suffix: string, withDefault = false): Record<string, string> {
  const out: Record<string, string> = withDefault ? { "x-default": suffix } : {};
  for (const l of LANG_CODES) out[l] = `/${l}${suffix}`;
  return out;
}

export type SiteMeta = {
  path: string;
  ogLocale: string;
  title: string;
  ogTitle: string;
  description: string;
};

// Page « Pourquoi filigraner ? » : /about détecte la langue (x-default),
// /fr/about /en/about /ja/about /zh/about l'imposent (métadonnées et lang corrects).
export const ABOUT_ALTERNATES: Record<string, string> = pageAlternates("/about", true);

export type PageMeta = { title: string; description: string };

/** Métadonnées d'une langue ajoutée dans lib/locales/<lang>/meta.ts. */
export type LocaleMeta = {
  site: SiteMeta;
  about: PageMeta;
  privacy: PageMeta;
  guides: PageMeta;
  compare: PageMeta;
};

export const ABOUT_META: Record<Lang, PageMeta> = {
  fr: {
    title: `Pourquoi filigraner vos papiers d'identité ? | ${BRAND}`,
    description:
      "À quoi sert un filigrane sur une pièce d'identité ou un justificatif : limiter la réutilisation d'une copie, la rendre traçable et se protéger de l'usurpation d'identité.",
  },
  en: {
    title: `Why watermark your ID documents? | ${BRAND}`,
    description:
      "What a watermark on an ID or supporting document is for: stopping a copy being reused, making it traceable, and protecting yourself from identity theft.",
  },
  ja: {
    title: `なぜ身分証のコピーに透かしを入れるのか | ${BRAND}`,
    description:
      "身分証や証明書類に透かしを入れる意味：コピーの使い回しを防ぎ、出どころを追跡可能にし、なりすましから身を守ります。",
  },
  zh: {
    title: `为什么要给证件复印件加水印 | ${BRAND}`,
    description:
      "给身份证件或证明材料加水印的作用：防止复印件被挪作他用，让出处可追溯，保护自己免遭身份冒用。",
  },
  es: META_ES.about,
  ar: META_AR.about,
  fa: META_FA.about,
};

export const PRIVACY_META: Record<Lang, PageMeta> = {
  fr: {
    title: `Confidentialité et sécurité : vos fichiers restent chez vous | ${BRAND}`,
    description:
      "Comment Cachety protège vos documents : traitement dans votre navigateur, aucun envoi, aucun compte, aucun cookie de suivi. Expliqué simplement, et vérifiable.",
  },
  en: {
    title: `Privacy & security: your files stay with you | ${BRAND}`,
    description:
      "How Cachety protects your documents: processed in your browser, never uploaded, no account, no tracking cookies. Explained simply, and verifiable.",
  },
  ja: {
    title: `プライバシーと安全性：ファイルは手元から出ません | ${BRAND}`,
    description:
      "Cachety が書類を守るしくみ：ブラウザ内で処理し、アップロードなし、登録なし、追跡クッキーなし。わかりやすく説明し、誰でも確かめられます。",
  },
  zh: {
    title: `隐私与安全：文件始终留在您手中 | ${BRAND}`,
    description:
      "Cachety 如何保护您的文件：在浏览器内处理，从不上传，无需注册，没有跟踪 Cookie。通俗易懂，人人可以验证。",
  },
  es: META_ES.privacy,
  ar: META_AR.privacy,
  fa: META_FA.privacy,
};

export const GUIDES_META: Record<Lang, PageMeta> = {
  fr: {
    title: `Guides : filigraner et protéger vos papiers | ${BRAND}`,
    description:
      "Guides pas à pas pour filigraner un dossier de location, une carte d'identité, un avis d'imposition, masquer un IBAN ou le faire depuis votre téléphone.",
  },
  en: {
    title: `Guides: watermark and protect your documents | ${BRAND}`,
    description:
      "Step-by-step guides to watermark ID for a letting agent, a passport copy or bank statements, redact a PDF, or password-protect it, all for free.",
  },
  ja: {
    title: `ガイド：書類に透かしを入れて身を守る | ${BRAND}`,
    description:
      "マイナンバーカード、運転免許証、賃貸申込の身分証コピーに透かしを入れる方法、黒塗りのしかた、スマホでの手順をやさしく解説します。",
  },
  zh: {
    title: `指南：给证件加水印，保护个人信息 | ${BRAND}`,
    description:
      "手把手教您给身份证复印件、租房和求职材料加水印，遮挡身份证号，用手机操作，以及免费给 PDF 加密码。",
  },
  es: META_ES.guides,
  ar: META_AR.guides,
  fa: META_FA.guides,
};

export const COMPARE_META: Record<Lang, PageMeta> = {
  fr: {
    title: `Comparatifs d'outils de filigrane | ${BRAND}`,
    description:
      "Cachety comparé aux outils de filigrane les plus utilisés : où vont vos fichiers, prix, limites, confidentialité. Des comparatifs factuels et sourcés.",
  },
  en: {
    title: `Watermark tool comparisons | ${BRAND}`,
    description:
      "Cachety compared with the most popular watermark tools: where your files go, price, limits and privacy. Factual comparisons, with sources.",
  },
  ja: {
    title: `透かしツール比較 | ${BRAND}`,
    description:
      "よく使われる透かしツールと Cachety を比較。ファイルの送信先、料金、制限、プライバシーを、出典つきで事実に基づいて解説します。",
  },
  zh: {
    title: `水印工具对比 | ${BRAND}`,
    description: "将 Cachety 与常用水印工具逐项对比：文件去向、价格、限制和隐私。基于事实，附资料来源。",
  },
  es: META_ES.compare,
  ar: META_AR.compare,
  fa: META_FA.compare,
};

export const SITE_META: Record<Lang, SiteMeta> = {
  fr: {
    path: "/fr",
    ogLocale: "fr_FR",
    title: `${BRAND} : filigrane sécurisé pour vos papiers, sans envoi`,
    ogTitle: `${BRAND} : filigranez vos papiers sans qu'ils quittent votre appareil`,
    description:
      "Ajoutez un filigrane à vos pièces d'identité et justificatifs, gratuitement. Tout se passe dans votre navigateur : aucun fichier n'est envoyé. Open source, conçu en France.",
  },
  en: {
    path: "/en",
    ogLocale: "en_GB",
    title: `${BRAND}: watermark your ID and documents privately, for free`,
    ogTitle: `${BRAND}: watermark documents without them ever leaving your device`,
    description:
      "Add a watermark to your ID and sensitive documents, free. Everything happens in your browser: no file is ever uploaded. Open source, made in France.",
  },
  ja: {
    path: "/ja",
    ogLocale: "ja_JP",
    title: `${BRAND}：身分証や書類に透かしを。アップロード不要・無料`,
    ogTitle: `${BRAND}：書類を端末の外に出さずに透かしを入れる`,
    description:
      "身分証や大切な書類に無料で透かしを入れられます。処理はすべてブラウザの中で行われ、ファイルは一切送信されません。オープンソース、フランス製。",
  },
  zh: {
    path: "/zh",
    ogLocale: "zh_CN",
    title: `${BRAND}：免费给证件和文件加水印，文件不上传`,
    ogTitle: `${BRAND}：文件不离开设备，就能加水印`,
    description:
      "免费为身份证件和敏感文件添加水印。全部在浏览器内完成，文件绝不上传。开源软件，法国制作。",
  },
  es: META_ES.site,
  ar: META_AR.site,
  fa: META_FA.site,
};
