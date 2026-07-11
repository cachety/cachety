"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "fr" | "en";

export type ErrorKey =
  | "unsupported"
  | "pdf_unreadable"
  | "pdf_empty"
  | "image_unreadable"
  | "canvas_unavailable"
  | "export_failed";

const plural = (n: number, s: string) => `${n} ${s}${n > 1 ? "s" : ""}`;

export const STRINGS = {
  fr: {
    switchTo: "Switch to English",
    taglinePre: "Ajoutez un filigrane à vos documents sensibles,",
    taglineStrong: "sans qu'ils ne quittent jamais votre appareil",
    badge: "Traitement 100 % local, zéro envoi.",
    sourceLong: "code source vérifiable",
    sourceShort: "code source",
    step1: "Vos documents",
    step2: "Texte du filigrane",
    step3: "Vérifiez, puis téléchargez",
    dropTitle: "Déposez vos PDF ou images ici",
    dropHint: "ou cliquez pour parcourir. Vous pouvez aussi coller (Ctrl+V).",
    dropAdd: "Ajouter d'autres documents (dépôt, clic ou Ctrl+V)",
    inputAria: "Ajouter des documents à filigraner (PDF ou images)",
    rejected: (names: string) =>
      `Format non pris en charge : ${names}. Seuls les PDF et les images (JPG, PNG…) sont acceptés.`,
    remove: (name: string) => `Retirer ${name}`,
    pages: (n: number) => plural(n, "page"),
    status: { pending: "en attente", processing: "en cours", ready: "prêt", error: "erreur" },
    pageOf: (a: number, b: number) => `page ${a} / ${b}`,
    textareaAria: "Texte du filigrane à apposer sur vos documents",
    placeholder: "Ex. : Copie exclusivement destinée à mon dossier de location",
    presets: [
      "Copie exclusivement destinée à mon dossier de location. Toute autre utilisation est interdite",
      "Copie fournie uniquement à ma banque. Reproduction et réutilisation interdites",
      "Copie remise pour vérification d'identité. Toute autre utilisation est interdite",
    ],
    addDate: "Ajouter la date du jour",
    onDate: (base: string, date: string) => `${base}, le ${date}`,
    tip: "Conseil : indiquez le destinataire et la date. Un filigrane précis est inutilisable ailleurs.",
    downloadAll: (n: number) => `Tout télécharger (${plural(n, "document")})`,
    zipName: "documents-filigranes",
    autoApply: "Aperçu auto",
    apply: "Appliquer le filigrane",
    applyHint: "Cliquez sur « Appliquer » pour générer l'aperçu.",
    dropAnywhere: "Déposez vos documents n'importe où",
    clearAll: "Tout effacer",
    emptyStart: "Déposez un document pour commencer.",
    emptyText: "Saisissez un texte de filigrane pour lancer le traitement.",
    processingGeneric: "Traitement en cours…",
    processingDoc: (name: string, p?: [number, number]) =>
      `${name} : filigrane en cours…${p ? ` page ${p[0]} / ${p[1]}` : ""}`,
    docError: (name: string, msg: string) => `${name} : ${msg}`,
    srProcessing: "Filigrane en cours.",
    srReady: (n: number) => `${plural(n, "document")} prêt${n > 1 ? "s" : ""} au téléchargement.`,
    previewAlt: (name: string, p: number) => `${name}, aperçu de la page ${p} filigranée`,
    zoomOpen: (p: number) => `Agrandir l'aperçu de la page ${p}`,
    zoomLabel: (p: number) => `Aperçu agrandi de la page ${p}`,
    zoomAlt: (name: string, p: number) => `${name}, page ${p} agrandie`,
    zoomClose: "Fermer l'aperçu",
    pagerNav: "Navigation entre les pages",
    pagerPrev: "Page précédente",
    pagerNext: "Page suivante",
    previewLimit: (shown: number, total: number) =>
      `Aperçu limité aux ${shown} premières pages. Le fichier téléchargé contient les ${total} pages.`,
    suffix: "filigrane",
    sizeUnit: "Mo",
    locale: "fr-FR",
    footerMade: "Par",
    footerInspired: ", inspiré de",
    footerLicense: ". Licence AGPL.",
    errors: {
      unsupported: "Format non pris en charge. Choisissez un PDF ou une image (JPG, PNG…).",
      pdf_unreadable: "Ce PDF n'a pas pu être lu (fichier corrompu ou protégé par mot de passe).",
      pdf_empty: "Ce PDF ne contient aucune page.",
      image_unreadable: "Cette image n'a pas pu être lue. Essayez un JPG ou un PNG.",
      canvas_unavailable: "Votre navigateur ne permet pas le rendu du document.",
      export_failed: "L'export de la page a échoué.",
      generic: "Le traitement a échoué. Réessayez.",
    } as Record<ErrorKey | "generic", string>,
  },
  en: {
    switchTo: "Passer en français",
    taglinePre: "Add a watermark to your sensitive documents,",
    taglineStrong: "without them ever leaving your device",
    badge: "100 % local processing, nothing uploaded.",
    sourceLong: "verifiable source code",
    sourceShort: "source code",
    step1: "Your documents",
    step2: "Watermark text",
    step3: "Review, then download",
    dropTitle: "Drop your PDFs or images here",
    dropHint: "or click to browse. You can also paste (Ctrl+V).",
    dropAdd: "Add more documents (drop, click or Ctrl+V)",
    inputAria: "Add documents to watermark (PDF or images)",
    rejected: (names: string) =>
      `Unsupported format: ${names}. Only PDFs and images (JPG, PNG…) are accepted.`,
    remove: (name: string) => `Remove ${name}`,
    pages: (n: number) => plural(n, "page"),
    status: { pending: "waiting", processing: "processing", ready: "ready", error: "error" },
    pageOf: (a: number, b: number) => `page ${a} / ${b}`,
    textareaAria: "Watermark text to stamp on your documents",
    placeholder: "e.g. Copy for my rental application only",
    presets: [
      "Copy solely for my rental application. Any other use is prohibited",
      "Copy provided to my bank only. Reproduction and reuse prohibited",
      "Copy submitted for identity verification. Any other use is prohibited",
    ],
    addDate: "Add today's date",
    onDate: (base: string, date: string) => `${base}, ${date}`,
    tip: "Tip: include the recipient and the date. A specific watermark can't be reused elsewhere.",
    downloadAll: (n: number) => `Download all (${plural(n, "document")})`,
    zipName: "watermarked-documents",
    autoApply: "Auto preview",
    apply: "Apply watermark",
    applyHint: "Click Apply to generate the preview.",
    dropAnywhere: "Drop your documents anywhere",
    clearAll: "Clear all",
    emptyStart: "Drop a document to get started.",
    emptyText: "Enter watermark text to start processing.",
    processingGeneric: "Processing…",
    processingDoc: (name: string, p?: [number, number]) =>
      `${name}: watermarking…${p ? ` page ${p[0]} / ${p[1]}` : ""}`,
    docError: (name: string, msg: string) => `${name}: ${msg}`,
    srProcessing: "Watermarking in progress.",
    srReady: (n: number) => `${plural(n, "document")} ready to download.`,
    previewAlt: (name: string, p: number) => `${name}, preview of watermarked page ${p}`,
    zoomOpen: (p: number) => `Enlarge preview of page ${p}`,
    zoomLabel: (p: number) => `Enlarged preview of page ${p}`,
    zoomAlt: (name: string, p: number) => `${name}, page ${p} enlarged`,
    zoomClose: "Close preview",
    pagerNav: "Page navigation",
    pagerPrev: "Previous page",
    pagerNext: "Next page",
    previewLimit: (shown: number, total: number) =>
      `Preview limited to the first ${shown} pages. The downloaded file contains all ${total} pages.`,
    suffix: "watermarked",
    sizeUnit: "MB",
    locale: "en-GB",
    footerMade: "By",
    footerInspired: ", inspired by",
    footerLicense: ". AGPL license.",
    errors: {
      unsupported: "Unsupported format. Choose a PDF or an image (JPG, PNG…).",
      pdf_unreadable: "This PDF could not be read (corrupted or password-protected).",
      pdf_empty: "This PDF has no pages.",
      image_unreadable: "This image could not be read. Try a JPG or PNG.",
      canvas_unavailable: "Your browser can't render this document.",
      export_failed: "Exporting the page failed.",
      generic: "Processing failed. Please try again.",
    } as Record<ErrorKey | "generic", string>,
  },
};

export type Strings = (typeof STRINGS)["fr"];

const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Strings;
}>({ lang: "fr", setLang: () => {}, t: STRINGS.fr });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    const detected: Lang =
      saved ?? (navigator.language.toLowerCase().startsWith("fr") ? "fr" : "en");
    setLangState(detected);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    localStorage.setItem("lang", l);
    setLangState(l);
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: STRINGS[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
export const useT = () => useContext(LangContext).t;
