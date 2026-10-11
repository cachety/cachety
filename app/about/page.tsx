import type { Metadata } from "next";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { LangProvider } from "@/lib/i18n";
import { ABOUT_ALTERNATES, ABOUT_META } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: ABOUT_META.en.title,
  description: ABOUT_META.en.description,
  alternates: { canonical: "/about", languages: ABOUT_ALTERNATES },
};

export default function AboutPage() {
  return (
    <LangProvider>
      <About />
      <Footer />
    </LangProvider>
  );
}
