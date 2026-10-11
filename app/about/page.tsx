import type { Metadata } from "next";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { LangProvider } from "@/lib/i18n";
import { BRAND } from "@/lib/brand";
import { ABOUT_ALTERNATES, ABOUT_META, ogImage, SITE_META, SITE_URL } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: ABOUT_META.en.title,
  description: ABOUT_META.en.description,
  alternates: { canonical: "/about", languages: ABOUT_ALTERNATES },
  openGraph: {
    images: [ogImage("en")],
    type: "article",
    siteName: BRAND,
    locale: SITE_META.en.ogLocale,
    url: `${SITE_URL}/about`,
    title: ABOUT_META.en.title,
    description: ABOUT_META.en.description,
  },
};

export default function AboutPage() {
  return (
    <LangProvider>
      <About />
      <Footer />
    </LangProvider>
  );
}
