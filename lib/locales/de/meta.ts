import { BRAND } from "@/lib/brand";
import type { LocaleMeta } from "@/lib/site-meta";

export const META_DE: LocaleMeta = {
  site: {
    path: "/de",
    ogLocale: "de_DE",
    title: `${BRAND}: Ausweis-Wasserzeichen kostenlos, ohne Upload`,
    ogTitle: `${BRAND}: Wasserzeichen, ohne dass Dokumente dein Gerät verlassen`,
    description:
      "Wasserzeichen für Ausweiskopie, Gehaltsabrechnung und PDF, kostenlos. Alles passiert im Browser, keine Datei wird hochgeladen. Open Source, aus Frankreich.",
  },
  about: {
    title: `Warum ein Wasserzeichen auf die Ausweiskopie? | ${BRAND}`,
    description:
      "Wozu ein Wasserzeichen auf Ausweis und Nachweisen dient: Kopien gegen Weiterverwendung sichern, nachverfolgbar machen und vor Identitätsdiebstahl schützen.",
  },
  privacy: {
    title: `Datenschutz: Deine Dateien bleiben bei dir | ${BRAND}`,
    description:
      "So schützt Cachety deine Dokumente: Verarbeitung im Browser, kein Upload, kein Konto, keine Tracking-Cookies. Einfach erklärt und selbst überprüfbar.",
  },
  guides: {
    title: `Ratgeber: Ausweiskopie, Wasserzeichen, Schwärzen | ${BRAND}`,
    description:
      "Schritt für Schritt: Wasserzeichen auf Personalausweis, Gehaltsabrechnung und Mietbewerbung, PDF schwärzen, Video-Ident und Handy. Kostenlos.",
  },
  compare: {
    title: `Wasserzeichen- und Signatur-Tools im Vergleich | ${BRAND}`,
    description:
      "Cachety im Vergleich mit PDF24, iLovePDF, DocuSign und Co.: wohin deine Dateien gehen, Preis, Grenzen und Datenschutz. Vergleiche mit Quellen.",
  },
  sign: {
    title: `PDF kostenlos unterschreiben, ohne Upload | ${BRAND}`,
    description:
      "Zeichne, tippe oder importiere deine Unterschrift und setz sie auf ein PDF oder Foto. Alles passiert im Browser, nichts wird hochgeladen. Kostenlos, ohne Konto.",
  },
};
