import type { Metadata } from "next";
import SignApp from "@/components/SignApp";
import { BRAND } from "@/lib/brand";
import { langRedirectScript } from "@/lib/lang-redirect";
import { LANG_CODES, ogImage, SIGN_ALTERNATES, SIGN_META, SITE_META, SITE_URL } from "@/lib/site-meta";

// /sign (x-default, anglaise) : comme la racine, un navigateur dans une autre
// langue part tout de suite vers /<langue>/sign, avant tout rendu.
const REDIRECT = langRedirectScript("/sign");

export const metadata: Metadata = {
  title: SIGN_META.en.title,
  description: SIGN_META.en.description,
  alternates: { canonical: SIGN_ALTERNATES["x-default"], languages: SIGN_ALTERNATES },
  openGraph: {
    images: [ogImage("en")],
    type: "website",
    siteName: BRAND,
    locale: SITE_META.en.ogLocale,
    alternateLocale: LANG_CODES.filter((l) => l !== "en").map((l) => SITE_META[l].ogLocale),
    url: `${SITE_URL}${SIGN_ALTERNATES["x-default"]}`,
    title: SIGN_META.en.title,
    description: SIGN_META.en.description,
  },
};

export default function SignPage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: REDIRECT }} />
      <SignApp />
    </>
  );
}
