"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { detectLang, type Lang } from "@/lib/i18n";

const NOT_FOUND: Record<Lang, { message: string; back: string }> = {
  fr: { message: "Cette page n'existe pas.", back: "Retour à Filigrane Local" },
  en: { message: "This page does not exist.", back: "Back to Filigrane Local" },
  ja: { message: "このページは存在しません。", back: "Filigrane Local に戻る" },
};

export default function NotFound() {
  // Prérendu en français (une seule page 404 statique) ; la langue de
  // l'utilisateur est appliquée après montage, comme sur la racine.
  const [lang, setLang] = useState<Lang>("fr");
  useEffect(() => {
    setLang(detectLang(localStorage.getItem("lang"), navigator.language));
  }, []);
  const t = NOT_FOUND[lang];

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-3">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="text-lg text-encre-2">{t.message}</p>
      <Link href="/" className="text-bleu underline hover:no-underline">
        {t.back}
      </Link>
    </div>
  );
}
