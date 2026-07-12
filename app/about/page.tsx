import type { Metadata } from "next";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { LangProvider } from "@/lib/i18n";
import { ABOUT_ALTERNATES, ABOUT_META } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: ABOUT_META.fr.title,
  description: ABOUT_META.fr.description,
  alternates: { canonical: "/about", languages: ABOUT_ALTERNATES },
};

export default function AboutPage() {
  return (
    <LangProvider>
      <About />
      <Footer width="max-w-4xl" />
    </LangProvider>
  );
}
