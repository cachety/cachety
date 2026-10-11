import type { Metadata, Viewport } from "next";
import "@fontsource-variable/space-grotesk";
import "./globals.css";
import ServiceWorker from "@/components/ServiceWorker";
import { AUTHOR, BRAND } from "@/lib/brand";
import { LANGUAGE_ALTERNATES, SITE_META, SITE_URL } from "@/lib/site-meta";

export const viewport: Viewport = {
  themeColor: "#1a1e33",
};

// Racine (x-default) : anglais, public international. La langue du
// visiteur est appliquée après montage ; /fr /en /ja /zh l'imposent dès le HTML.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_META.en.title,
  description: SITE_META.en.description,
  manifest: "/manifest.webmanifest",
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
  keywords: [
    "watermark ID",
    "watermark PDF",
    "watermark documents",
    "redact PDF",
    "filigrane",
    "透かし",
    "水印",
    BRAND,
  ],
  applicationName: BRAND,
  authors: [{ name: AUTHOR.name, url: AUTHOR.url }],
  creator: AUTHOR.name,
  publisher: AUTHOR.name,
  robots: { index: true, follow: true },
  appleWebApp: { title: BRAND, statusBarStyle: "black-translucent" },
  alternates: { canonical: "/", languages: LANGUAGE_ALTERNATES },
  openGraph: {
    type: "website",
    siteName: BRAND,
    locale: SITE_META.en.ogLocale,
    url: SITE_URL,
    title: SITE_META.en.ogTitle,
    description: SITE_META.en.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      {/* flex-col : sans cela, sur un grand écran, le pied de page remontait
          au ras du contenu en laissant du vide sous lui. */}
      <body className="flex min-h-dvh flex-col overflow-x-clip bg-papier px-4 font-sans text-encre antialiased">
        {children}
        <ServiceWorker />
      </body>
    </html>
  );
}
