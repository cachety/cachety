import type { Metadata, Viewport } from "next";
import "@fontsource-variable/space-grotesk";
import "./globals.css";
import ServiceWorker from "@/components/ServiceWorker";
import { LANGUAGE_ALTERNATES, SITE_META, SITE_URL } from "@/lib/site-meta";

export const viewport: Viewport = {
  themeColor: "#1a1e33",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_META.fr.title,
  description: SITE_META.fr.description,
  manifest: "/manifest.webmanifest",
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
  keywords: ["filigrane", "filigrane local", "filigrane facile", "filigrane sécurisé", "watermark pdf"],
  applicationName: "Filigrane Local",
  robots: { index: true, follow: true },
  creator: "KazeTachinuu",
  appleWebApp: { title: "Filigrane Local", statusBarStyle: "black-translucent" },
  alternates: { canonical: "/", languages: LANGUAGE_ALTERNATES },
  openGraph: {
    type: "website",
    siteName: "Filigrane Local",
    locale: SITE_META.fr.ogLocale,
    url: SITE_URL,
    title: SITE_META.fr.ogTitle,
    description: SITE_META.fr.description,
    countryName: "France",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className="min-h-dvh overflow-x-clip bg-papier text-encre antialiased font-sans px-4">
        {children}
        <ServiceWorker />
      </body>
    </html>
  );
}
