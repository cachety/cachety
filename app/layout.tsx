import type { Metadata, Viewport } from "next";
import "@fontsource-variable/space-grotesk";
import "./globals.css";
import ServiceWorker from "@/components/ServiceWorker";

export const viewport: Viewport = {
  themeColor: "#1a1e33",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://filigrane-local.fr"),
  title: "Filigrane Local",
  description:
    "Ajoutez un filigrane à vos documents sensibles directement dans votre navigateur. Aucun envoi vers un serveur, code open source vérifiable.",
  manifest: "/manifest.webmanifest",
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
  keywords: ["filigrane", "filigrane local", "filigrane facile", "filigrane sécurisé", "watermark pdf"],
  applicationName: "Filigrane Local",
  robots: { index: true, follow: true },
  creator: "KazeTachinuu",
  appleWebApp: { title: "Filigrane Local", statusBarStyle: "black-translucent" },
  openGraph: {
    images: ["/og-image.png"],
    type: "website",
    siteName: "Filigrane Local",
    locale: "fr_FR",
    url: "https://filigrane-local.fr",
    title: "Filigrane Local : filigrane sécurisé, 100 % dans votre navigateur",
    description:
      "Ajoutez un filigrane à vos documents sensibles directement dans votre navigateur. Aucun envoi vers un serveur.",
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
