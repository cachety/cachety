import type { Metadata } from "next";
import HomeApp from "@/components/HomeApp";
import {
  LANG_CODES,
  LANGUAGE_ALTERNATES,
  SITE_META,
  SITE_URL,
  type Lang,
} from "@/lib/site-meta";

// Export statique : seules /fr, /en et /ja existent.
export const dynamicParams = false;

export function generateStaticParams() {
  return LANG_CODES.map((lang) => ({ lang }));
}

type Props = { params: Promise<{ lang: Lang }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const m = SITE_META[lang];
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: m.path, languages: LANGUAGE_ALTERNATES },
    openGraph: {
      type: "website",
      siteName: "Filigrane Local",
      locale: m.ogLocale,
      alternateLocale: LANG_CODES.filter((l) => l !== lang).map(
        (l) => SITE_META[l].ogLocale
      ),
      url: `${SITE_URL}${m.path}`,
      title: m.ogTitle,
      description: m.description,
    },
  };
}

export default async function LangHome({ params }: Props) {
  const { lang } = await params;
  return <HomeApp forcedLang={lang} />;
}
