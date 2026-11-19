import type { Metadata } from "next";
import DossierApp from "@/components/DossierApp";
import { BRAND } from "@/lib/brand";
import { DOSSIER_ALTERNATES, DOSSIER_META, LANG_CODES, ogImage, SITE_META, SITE_URL, type Lang } from "@/lib/site-meta";

// Export statique : seules /fr/dossier, /en/dossier… (les 11 langues) existent.
export const dynamicParams = false;

export function generateStaticParams() {
  return LANG_CODES.map((lang) => ({ lang }));
}

type Props = { params: Promise<{ lang: Lang }> };

// Image de partage : celle de la langue, comme l'accueil et /sign (docs/prd-dossier.md §6.1).
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const m = DOSSIER_META[lang];
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: DOSSIER_ALTERNATES[lang], languages: DOSSIER_ALTERNATES },
    openGraph: {
      images: [ogImage(lang)],
      type: "website",
      siteName: BRAND,
      locale: SITE_META[lang].ogLocale,
      alternateLocale: LANG_CODES.filter((l) => l !== lang).map((l) => SITE_META[l].ogLocale),
      url: `${SITE_URL}${DOSSIER_ALTERNATES[lang]}`,
      title: m.title,
      description: m.description,
    },
  };
}

export default async function LangDossier({ params }: Props) {
  const { lang } = await params;
  return <DossierApp forcedLang={lang} />;
}
