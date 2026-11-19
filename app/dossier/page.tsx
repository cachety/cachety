import type { Metadata } from "next";
import DossierApp from "@/components/DossierApp";
import { BRAND } from "@/lib/brand";
import { langRedirectScript } from "@/lib/lang-redirect";
import { DOSSIER_ALTERNATES, DOSSIER_META, LANG_CODES, ogImage, SITE_META, SITE_URL } from "@/lib/site-meta";

// /dossier (x-default, anglaise) : comme la racine et /sign, un navigateur dans
// une autre langue part tout de suite vers /<langue>/dossier, avant tout rendu.
const REDIRECT = langRedirectScript("/dossier");

export const metadata: Metadata = {
  title: DOSSIER_META.en.title,
  description: DOSSIER_META.en.description,
  alternates: { canonical: DOSSIER_ALTERNATES["x-default"], languages: DOSSIER_ALTERNATES },
  openGraph: {
    images: [ogImage("en")],
    type: "website",
    siteName: BRAND,
    locale: SITE_META.en.ogLocale,
    alternateLocale: LANG_CODES.filter((l) => l !== "en").map((l) => SITE_META[l].ogLocale),
    url: `${SITE_URL}${DOSSIER_ALTERNATES["x-default"]}`,
    title: DOSSIER_META.en.title,
    description: DOSSIER_META.en.description,
  },
};

export default function DossierPage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: REDIRECT }} />
      <DossierApp />
    </>
  );
}
