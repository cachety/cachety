import type { Metadata } from "next";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { LangProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Pourquoi filigraner vos documents ? | Filigrane Local",
  description:
    "À quoi sert un filigrane sur une pièce d'identité ou un justificatif : limiter la réutilisation d'une copie, la rendre traçable et se protéger de l'usurpation d'identité.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <LangProvider>
      <About />
      <Footer />
    </LangProvider>
  );
}
