"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { detectLang, type Lang } from "@/lib/i18n";
import { readPref } from "@/lib/storage";

const NOT_FOUND: Record<Lang, { message: string; back: string }> = {
  fr: { message: "Cette page n'existe pas.", back: "Retour à Cachety" },
  en: { message: "This page does not exist.", back: "Back to Cachety" },
  ja: { message: "このページは存在しません。", back: "Cachety に戻る" },
  zh: { message: "这个页面不存在。", back: "返回 Cachety" },
  es: { message: "Esta página no existe.", back: "Volver a Cachety" },
  ar: { message: "هذه الصفحة غير موجودة.", back: "العودة إلى Cachety" },
  fa: { message: "این صفحه وجود ندارد.", back: "بازگشت به Cachety" },
  de: { message: "Diese Seite gibt es nicht.", back: "Zurück zu Cachety" },
  pt: { message: "Esta página não existe.", back: "Voltar para o Cachety" },
  id: { message: "Halaman ini tidak ditemukan.", back: "Kembali ke Cachety" },
  nl: { message: "Deze pagina bestaat niet.", back: "Terug naar Cachety" },
};

export default function NotFound() {
  // Prérendu en anglais (une seule page 404 statique) ; la langue de
  // l'utilisateur est appliquée après montage, comme sur la racine.
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => {
    setLang(detectLang(readPref("lang"), navigator.language));
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
