import type { Metadata } from "next";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { LangProvider } from "@/lib/i18n";
import { BRAND } from "@/lib/brand";
import { ABOUT_ALTERNATES, ABOUT_META, LANG_CODES, ogImage, SITE_META, SITE_URL, type Lang } from "@/lib/site-meta";

// Export statique : seules /fr/about, /en/about, /ja/about et /zh/about existent.
export const dynamicParams = false;

export function generateStaticParams() {
  return LANG_CODES.map((lang) => ({ lang }));
}

type Props = { params: Promise<{ lang: Lang }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const m = ABOUT_META[lang];
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: ABOUT_ALTERNATES[lang], languages: ABOUT_ALTERNATES },
    openGraph: {
      images: [ogImage(lang)],
      type: "article",
      siteName: BRAND,
      locale: SITE_META[lang].ogLocale,
      url: `${SITE_URL}${ABOUT_ALTERNATES[lang]}`,
      title: m.title,
      description: m.description,
    },
  };
}

export default async function LangAbout({ params }: Props) {
  const { lang } = await params;
  return (
    <LangProvider forcedLang={lang}>
      <About />
      <Footer />
    </LangProvider>
  );
}
