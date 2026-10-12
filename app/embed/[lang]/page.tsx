import type { Metadata } from "next";
import EmbedApp from "@/components/EmbedApp";
import { BRAND } from "@/lib/brand";
import { LANG_CODES, SITE_META, type Lang } from "@/lib/site-meta";

// Page affichée dans une iframe par les sites partenaires (docs/embed.md).
// Hors des dossiers de langue : sa politique de cadre diffère (frame-ancestors).
export const dynamicParams = false;

export function generateStaticParams() {
  return LANG_CODES.map((lang) => ({ lang }));
}

type Props = { params: Promise<{ lang: Lang }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: BRAND,
    description: SITE_META[lang].description,
    // Jamais dans les moteurs de recherche : la page à référencer est l'outil lui-même.
    robots: { index: false, follow: false },
    alternates: { canonical: SITE_META[lang].path, languages: {} },
    openGraph: null,
  };
}

export default async function EmbedPage({ params }: Props) {
  const { lang } = await params;
  return <EmbedApp lang={lang} />;
}
