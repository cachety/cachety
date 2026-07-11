import CoreProduct from "@/components/CoreProduct";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { LangProvider } from "@/lib/i18n";

export default function Home() {
  return (
    <LangProvider>
      <Header />
      <main>
        <CoreProduct />
      </main>
      <Footer />
    </LangProvider>
  );
}
