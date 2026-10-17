import type { Metadata } from "next";
import SignApp from "@/components/SignApp";
import { BRAND } from "@/lib/brand";
import { LANG_CODES, ogImage, SIGN_ALTERNATES, SIGN_META, SITE_META, SITE_URL, type Lang } from "@/lib/site-meta";

// Export statique : seules /fr/sign, /en/sign… (les 11 langues) existent.
export const dynamicParams = false;

export function generateStaticParams() {
  return LANG_CODES.map((lang) => ({ lang }));
}

type Props = { params: Promise<{ lang: Lang }> };

// Image de partage : celle de la langue, comme l'accueil (docs/prd-sign.md §6.1).
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const m = SIGN_META[lang];
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: SIGN_ALTERNATES[lang], languages: SIGN_ALTERNATES },
    openGraph: {
      images: [ogImage(lang)],
      type: "website",
      siteName: BRAND,
      locale: SITE_META[lang].ogLocale,
      alternateLocale: LANG_CODES.filter((l) => l !== lang).map((l) => SITE_META[l].ogLocale),
      url: `${SITE_URL}${SIGN_ALTERNATES[lang]}`,
      title: m.title,
      description: m.description,
    },
  };
}

export default async function LangSign({ params }: Props) {
  const { lang } = await params;
  return <SignApp forcedLang={lang} />;
}
