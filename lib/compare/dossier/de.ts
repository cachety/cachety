import type { Comparison } from "../types";

// Vergleiche für das Dossier-Tool (de): PDFs und Fotos zu einer Datei
// zusammenfügen und unter eine Größengrenze bringen. Dieselbe redaktionelle
// Regel wie bei den anderen Vergleichen (lib/compare/types.ts); jeder Eintrag
// trägt tool: "dossier". Geschrieben für Leserinnen und Leser in Deutschland,
// in der Du-Form. Nur reiner Text.
// Draft translation from the English guide, awaiting native review (ROADMAP.md, backlog: Native review).
// Jede Aussage über ein anderes Tool ist durch eine Seite aus dessen `sources`
// belegt, gelesen am `checked`-Datum, und aus der englischen Fassung übernommen,
// ohne etwas hinzuzufügen. Preise ändern sich oft, deshalb stehen hier keine.
//
// Die Cachety-Spalte beschreibt das Dossier-Tool laut docs/prd-dossier.md
// (Must-Umfang). Erst mit dem Tool veröffentlichen, nicht vorher, und die
// Spalte dann mit der ausgelieferten Oberfläche abgleichen.

const CHECKED = "2026-11-18";
const UPDATED = "2026-11-18";

/** Adresse des Tools, ohne Schema geschrieben. */
const TOOL = "cachety.com/de/dossier";

// Gemeinsame Formulierungen für die Cachety-Spalte.
const CACHETY = {
  where: "In deinem Browser, auf deinem eigenen Gerät. Nichts wird hochgeladen.",
  kept: "Nichts wird aufbewahrt: Es gibt keinen Server, der deine Dateien empfängt.",
  free: "Kostenlos, ohne Konto, ohne Bezahlversion und ohne Tageslimit. Bis zu 200 MB pro Datei, 500 Seiten pro PDF und 1.000 Seiten insgesamt.",
  pages: "Alle Seiten aller Dateien in einer Übersicht: eine Seite verschieben, auch von einer Datei in eine andere, sie drehen oder entfernen.",
  size: "Du wählst eine maximale Größe: 1, 2, 5 oder 10 MB. Cachety sagt vor dem Download, ob die Datei darunter bleibt und lesbar ist.",
  output:
    "Jede Seite wird als Bild neu aufgebaut. Der Text lässt sich weder markieren noch durchsuchen, und ein reines Text-PDF kann größer werden.",
  hidden: "In jeder Datei entfernt: versteckter Text, Autor und andere Eigenschaften, Anhänge, Links und der GPS-Standort von Fotos.",
  inputs: "PDFs und Fotos gemischt, auch HEIC-Fotos vom iPhone. Keine Word-, Excel- oder PowerPoint-Dateien.",
  offline: "Nichts zu installieren. Nach dem Laden funktioniert die Seite auch im Flugmodus, auf dem Handy und am Computer.",
  ads: "Keine Werbung und keine Tracker. Der Code ist Open Source.",
};

const PIXELS: Comparison["body"] = [
  { type: "h2", text: "Was für eine Datei Cachety erzeugt" },
  {
    type: "p",
    text: "Cachety hängt nicht deine Originalseiten aneinander. Es baut jede Seite als Bild neu auf und macht aus diesen Bildern ein neues PDF. So entfernt es, was man nicht sieht: versteckten Text, den Namen des Autors, Anhänge, Links und den GPS-Standort von Fotos. Das hat einen echten Preis: Der Text der neuen Datei lässt sich weder markieren noch durchsuchen, und ein PDF, das nur Text enthielt, kann größer werden als das Original, außer du wählst eine maximale Größe.",
  },
  {
    type: "warning",
    text: "Cachety ist nicht das richtige Werkzeug, wenn der Text markierbar oder durchsuchbar bleiben muss, wenn Lesezeichen oder Formularfelder erhalten bleiben sollen, wenn du Word- oder Excel-Dateien hinzufügen willst oder wenn du Texterkennung (OCR) für einen Scan brauchst.",
  },
];

const HOW_TO: Comparison["body"] = [
  { type: "h2", text: "So machst du mit Cachety ein einziges PDF" },
  {
    type: "steps",
    items: [
      `Öffne ${TOOL} im Browser, am Computer oder auf dem Handy. Nichts zu installieren, kein Konto.`,
      "Füge deine PDFs und Fotos hinzu. Ein Foto wird zu einer Seite.",
      "Geh zu den Seiten: Zieh sie in die richtige Reihenfolge, dreh die quer liegenden und entferne die, die du nicht willst.",
      "Wähle als Ergebnis ein einziges PDF und, wenn dir eine Größengrenze genannt wurde, 1, 2, 5 oder 10 MB.",
      "Prüf die Vorschau, schwärze Angaben, die der Empfänger nicht braucht, und lade die Datei herunter.",
    ],
  },
];

const FAQ_UPLOADED = (other: string, answer: string) => ({
  q: `Werden meine Dateien bei Cachety oder ${other} hochgeladen?`,
  a: `Bei Cachety nein: Die Arbeit passiert in deinem Browser, und es gibt keinen Server, der deine Dateien empfängt. ${answer}`,
});

const FAQ_TEXT = {
  q: "Lässt sich der Text nach dem Zusammenfügen mit Cachety noch markieren?",
  a: "Nein. Cachety baut jede Seite als Bild neu auf. Das entfernt versteckte Daten, aber auch den markierbaren Text. Brauchst du den Text, nimm ein Tool, das die Originalseiten aneinanderhängt.",
};

export const DOSSIER_COMPARISONS_DE: Comparison[] = [
  // ───────────────────────────── iLovePDF ─────────────────────────────
  {
    tool: "dossier",
    slug: "cachety-vs-ilovepdf-merge",
    competitor: "ilovepdf-merge",
    competitorName: "iLovePDF",
    competitorUrl: "https://www.ilovepdf.com/",
    title: "Cachety oder iLovePDF: PDFs zusammenfügen und komprimieren, ohne sie hochzuladen",
    metaTitle: "iLovePDF-Alternative: PDF zusammenfügen ohne Upload",
    description:
      "iLovePDF fügt PDFs auf seinen Servern zusammen und komprimiert sie. Cachety macht es im Browser: kein Upload, versteckte Daten entfernt. Ein fairer Vergleich.",
    intro:
      "iLovePDF aus Barcelona gehört zu den meistgenutzten Sammlungen von Online-PDF-Tools. Seine Tools zum Zusammenfügen und Komprimieren verarbeiten deine Dateien auf seinen Servern. Cachety erledigt eine engere Aufgabe auf deinem eigenen Gerät: Es macht aus PDFs und Fotos eine Datei unter einer Größengrenze, ohne sie hochzuladen.",
    verdict:
      "iLovePDF kann mehr: Office-Dateien, Texterkennung, viele Dateien auf einmal und eine kostenpflichtige Desktop-App, die offline arbeitet. Dafür ist es die bessere Wahl. Cachety ist die bessere Wahl, wenn es um persönliche Dokumente geht, die du lieber nicht hochlädst, wenn Fotos und PDFs in dieselbe Datei sollen oder wenn ein Formular eine Größengrenze in Megabyte vorgibt.",
    table: [
      {
        criterion: "Wo die Dateien verarbeitet werden",
        cachety: CACHETY.where,
        other: "Auf der Website: auf den Servern von iLovePDF. Die Desktop-App verarbeitet Dateien, mit einem kostenpflichtigen Tarif, auf deinem Computer.",
        edge: "cachety",
      },
      {
        criterion: "Wie lange Dateien aufbewahrt werden",
        cachety: CACHETY.kept,
        other: "Automatische Löschung innerhalb von zwei Stunden nach der Verarbeitung. Mit einer Schaltfläche auf der Download-Seite lassen sie sich früher löschen.",
        edge: "cachety",
      },
      {
        criterion: "Konto, kostenlose Nutzung und Grenzen",
        cachety: CACHETY.free,
        other: "Kostenlos ohne Registrierung, für eine begrenzte Zahl von Dokumenten. Kostenloses Zusammenfügen: bis zu 100 Dateien und 300 MB pro Aufgabe. Kostenloses Komprimieren: 5 Dateien pro Aufgabe. Ein kostenpflichtiger Tarif hebt die Grenzen an.",
      },
      {
        criterion: "Seiten in die richtige Reihenfolge bringen",
        cachety: CACHETY.pages,
        other: "Beim Zusammenfügen werden ganze Dateien umsortiert. Einzelne Seiten sortieren, löschen und drehen geht in einem eigenen Tool, Organize PDF.",
        edge: "cachety",
      },
      {
        criterion: "Unter eine Größengrenze kommen",
        cachety: CACHETY.size,
        other: "Drei Kompressionsstufen: extrem, empfohlen und weniger. Keine Zielgröße in Megabyte.",
        edge: "cachety",
      },
      {
        criterion: "Fotos und PDFs zusammen",
        cachety: CACHETY.inputs,
        other: "Auf der Website in zwei Schritten: erst die Bilder in ein PDF umwandeln, dann zusammenfügen. Für Word-, Excel- und PowerPoint-Dateien gibt es eigene Konverter.",
      },
      {
        criterion: "Was für ein PDF entsteht",
        cachety: CACHETY.output,
        other: "Auf der Seite zum Zusammenfügen nicht beschrieben. Ein eigenes Tool erkennt Text (OCR), um einen Scan durchsuchbar zu machen.",
      },
      {
        criterion: "Versteckte Daten",
        cachety: CACHETY.hidden,
        other: "Für die Tools der Website nicht dokumentiert. Die Desktop-App kann die Metadaten eines PDFs bearbeiten oder löschen.",
      },
      {
        criterion: "Apps und Offline-Nutzung",
        cachety: CACHETY.offline,
        other: "Eine Desktop-App für Windows und Mac, die offline läuft: Die kostenlose Stufe ist ein PDF-Reader, die Tools brauchen einen kostenpflichtigen Tarif. Apps für iOS und Android.",
      },
      {
        criterion: "Werbung und Tracker",
        cachety: CACHETY.ads,
        other: "Der kostenlose Tarif zeigt Werbung; der kostenpflichtige Tarif entfernt sie.",
        edge: "cachety",
      },
    ],
    body: [
      { type: "h2", text: "Ein großer Online-Werkzeugkasten und ein Tool, das auf deinem Gerät bleibt" },
      {
        type: "p",
        text: "Auf der Website von iLovePDF werden deine Dateien an dessen Server geschickt, dort verarbeitet und innerhalb von zwei Stunden automatisch gelöscht. Auf der Download-Seite kannst du sie früher löschen. iLovePDF gibt an, nach ISO/IEC 27001 zertifiziert zu sein und Dateien über eine verschlüsselte Verbindung zu übertragen. Die Website gibt es in 26 Sprachen.",
      },
      {
        type: "p",
        text: "Cachety bereitet nur eine Datei zum Verschicken vor: die PDFs und Fotos, die von dir verlangt wurden, in der richtigen Reihenfolge, in einem PDF der passenden Größe. Alles passiert in deinem Browser. Es gibt keinen Upload, also muss hinterher auch nichts gelöscht werden.",
      },
      { type: "h2", text: "Wo iLovePDF besser ist" },
      {
        type: "list",
        items: [
          "Es wandelt Word-, Excel- und PowerPoint-Dateien in PDFs um.",
          "Es erkennt Text in Scans (OCR), sodass ein gescanntes PDF durchsuchbar werden kann.",
          "Es nimmt große Aufträge an: bis zu 100 Dateien beim kostenlosen Zusammenfügen.",
          "Seine kostenpflichtige Desktop-App verarbeitet Dateien auf deinem Computer, mit denselben Tools wie die Website.",
        ],
      },
      { type: "h2", text: "Wo Cachety besser ist" },
      {
        type: "list",
        items: [
          "Deine Dateien werden nie hochgeladen, kostenlos, auf dem Handy wie am Computer.",
          "Fotos und PDFs kommen in einem Schritt in dieselbe Datei, und einzelne Seiten lassen sich an derselben Stelle verschieben, drehen oder entfernen.",
          "Du wählst eine Größe in Megabyte, so wie Online-Formulare ihre Grenzen angeben, und erfährst vor dem Download, wenn sie sich nicht erreichen lässt, ohne dass die Datei unleserlich wird.",
          "Versteckte Daten werden aus jeder Datei entfernt, und es gibt keine Werbung.",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "Du musst Word-, Excel- oder PowerPoint-Dateien umwandeln oder den Text eines Scans erkennen lassen.",
      "Du hast viele Dateien oder sehr große PDFs, die in einem Durchgang verarbeitet werden sollen.",
      "Du bezahlst für iLovePDF und nutzt dessen Desktop-App, die auf deinem Computer arbeitet.",
    ],
    chooseCachety: [
      "Die Dateien sind Ausweise, Gehaltsabrechnungen oder Kontoauszüge, und du willst sie lieber nicht hochladen.",
      "Du brauchst Fotos und PDFs in derselben Datei, mit den Seiten in deiner Reihenfolge.",
      "Ein Formular verlangt eine einzige Datei unter 1, 2, 5 oder 10 MB.",
    ],
    faq: [
      FAQ_UPLOADED(
        "iLovePDF",
        "Auf der Website von iLovePDF ja: Die Dateien werden auf dessen Servern verarbeitet und innerhalb von zwei Stunden gelöscht. Die Desktop-App verarbeitet Dateien auf deinem Computer, mit einem kostenpflichtigen Tarif."
      ),
      {
        q: "Kann iLovePDF ein PDF auf eine genaue Größe komprimieren?",
        a: "Nein. Es bietet drei Kompressionsstufen, und im eigenen Ratgeber von iLovePDF steht, dass kein Tool eine genaue Ausgabegröße versprechen kann. Bei Cachety wählst du 1, 2, 5 oder 10 MB und erfährst vor dem Download, wenn die Datei nicht darunter bleiben und lesbar sein kann.",
      },
      {
        q: "Funktioniert iLovePDF offline?",
        a: "Die Desktop-App für Windows und Mac ja, aber die Tools darin brauchen einen kostenpflichtigen Tarif. Cachety ist eine Webseite, die nach dem Laden auch im Flugmodus weiter funktioniert, kostenlos.",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "iLovePDF: PDF zusammenfügen", url: "https://www.ilovepdf.com/merge_pdf" },
      { label: "iLovePDF: PDF komprimieren", url: "https://www.ilovepdf.com/compress_pdf" },
      { label: "iLovePDF: Preise und Grenzen je Tool", url: "https://www.ilovepdf.com/pricing" },
      { label: "iLovePDF: Sicherheit", url: "https://www.ilovepdf.com/help/security" },
      { label: "iLovePDF: Fragen und Antworten", url: "https://www.ilovepdf.com/help/faq" },
      { label: "iLovePDF Desktop", url: "https://www.ilovepdf.com/desktop" },
      { label: "iLovePDF-Blog: Web, Desktop oder Mobil", url: "https://www.ilovepdf.com/blog/pdf-web-or-desktop" },
      { label: "iLovePDF-Blog: PDF-Seiten organisieren", url: "https://www.ilovepdf.com/blog/organize-pdf-pages" },
      { label: "iLovePDF-Blog: PDF- und JPG-Dateien zusammenfügen", url: "https://www.ilovepdf.com/blog/merge-pdf-and-jpg-files-online" },
      { label: "iLovePDF-Blog: PDF auf eine bestimmte Größe komprimieren", url: "https://www.ilovepdf.com/blog/compress-pdf-to-specific-size" },
      {
        label: "iLovePDF-Blog: PDF-Metadaten bearbeiten oder entfernen",
        url: "https://www.ilovepdf.com/blog/edit-or-remove-pdf-metadata-windows-mac",
      },
      { label: "iLovePDF-Blog: 15 Jahre iLovePDF", url: "https://www.ilovepdf.com/blog/ilovepdf-15-years-anniversary-milestones" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ───────────────────────────── Smallpdf ─────────────────────────────
  {
    tool: "dossier",
    slug: "cachety-vs-smallpdf-merge",
    competitor: "smallpdf-merge",
    competitorName: "Smallpdf",
    competitorUrl: "https://smallpdf.com/",
    title: "Cachety oder Smallpdf: PDFs zusammenfügen und komprimieren, ohne sie hochzuladen",
    metaTitle: "Smallpdf-Alternative: PDF zusammenfügen ohne Upload",
    description:
      "Smallpdf fügt PDFs in der Cloud zusammen und komprimiert sie, mit täglichem Gratis-Limit. Cachety macht es im Browser, kostenlos und ohne Upload. Ein Vergleich.",
    intro:
      "Smallpdf ist eine bekannte Sammlung von Online-PDF-Tools aus der Schweiz, mit Apps für Handys und Windows. Seine Tools zum Zusammenfügen und Komprimieren arbeiten in der Cloud. Cachety erledigt eine engere Aufgabe auf deinem eigenen Gerät: Es macht aus PDFs und Fotos eine Datei unter einer Größengrenze, ohne sie hochzuladen.",
    verdict:
      "Smallpdf kann mehr: Es nimmt Word-, Excel- und PowerPoint-Dateien an, erkennt Text in Scans und hat eine Windows-App, die offline arbeitet. Dafür ist es die bessere Wahl. Cachety ist die bessere Wahl, wenn es um persönliche Dokumente geht, die du lieber nicht hochlädst, wenn du an einem Tag mehr als ein, zwei Dateien vorbereiten musst oder wenn ein Formular eine Größengrenze in Megabyte vorgibt.",
    table: [
      {
        criterion: "Wo die Dateien verarbeitet werden",
        cachety: CACHETY.where,
        other: "In der Cloud. Die Dateien werden auf Server in der Europäischen Union hochgeladen. Die Desktop-App für Windows verarbeitet Dateien offline.",
        edge: "cachety",
      },
      {
        criterion: "Wie lange Dateien aufbewahrt werden",
        cachety: CACHETY.kept,
        other: "Löschung von den Servern nach einer Stunde, außer du speicherst sie in deinem Konto.",
        edge: "cachety",
      },
      {
        criterion: "Konto, kostenlose Nutzung und Grenzen",
        cachety: CACHETY.free,
        other: "Keine Registrierung nötig. Die kostenlose Nutzung hat eine tägliche Download-Grenze und eine Grenze für die Dateigröße; ein kostenpflichtiger Tarif hebt sie auf.",
        edge: "cachety",
      },
      {
        criterion: "Seiten in die richtige Reihenfolge bringen",
        cachety: CACHETY.pages,
        other: "Beim Zusammenfügen lassen sich Seiten neu anordnen, drehen und löschen. Ein eigenes Tool, Organize, macht dasselbe mit einem einzelnen PDF.",
      },
      {
        criterion: "Unter eine Größengrenze kommen",
        cachety: CACHETY.size,
        other: "Kompressionsstufen, keine Größe in Megabyte. Die einfache Kompression ist kostenlos; stärkere Stufen gehören zum kostenpflichtigen Tarif.",
        edge: "cachety",
      },
      {
        criterion: "Welche Dateitypen angenommen werden",
        cachety: CACHETY.inputs,
        other: "PDF, Word, Excel, PowerPoint, JPG und PNG beim Zusammenfügen: Andere Dateien werden zuerst in PDF umgewandelt. HEIC-Fotos im Tool JPG to PDF.",
        edge: "other",
      },
      {
        criterion: "Was für ein PDF entsteht",
        cachety: CACHETY.output,
        other: "Auf der Seite zum Zusammenfügen nicht beschrieben. Texterkennung (OCR) gibt es als eigenes Tool.",
      },
      {
        criterion: "Versteckte Daten",
        cachety: CACHETY.hidden,
        other: "Für das Zusammenfügen auf den Produkt- und Hilfeseiten nicht dokumentiert.",
      },
      {
        criterion: "Apps und Offline-Nutzung",
        cachety: CACHETY.offline,
        other: "Apps für iOS und Android und eine Desktop-App für Windows, die offline arbeitet. Die Desktop-App für Mac wird nicht mehr unterstützt.",
      },
    ],
    body: [
      { type: "h2", text: "Ein Werkzeugkasten in der Cloud und ein Tool, das auf deinem Gerät bleibt" },
      {
        type: "p",
        text: "Smallpdf beschreibt seine Tools zum Zusammenfügen und Komprimieren als cloudbasiert: Deine Dateien werden hochgeladen, auf seinen Servern verarbeitet und nach einer Stunde gelöscht, außer du speicherst sie in deinem Konto. Smallpdf gibt an, nach ISO/IEC 27001 zertifiziert zu sein und bei der Dateiübertragung TLS-Verschlüsselung zu verwenden. Seine Tools gibt es in 24 Sprachen.",
      },
      {
        type: "p",
        text: "Cachety hat hier eine einzige Aufgabe: aus den PDFs und Fotos, die jemand von dir verlangt hat, eine saubere Datei der passenden Größe zu machen. Alles passiert in deinem Browser. Es gibt keinen Upload, also muss hinterher auch nichts gelöscht werden.",
      },
      { type: "h2", text: "Wo Smallpdf besser ist" },
      {
        type: "list",
        items: [
          "Es wandelt Word-, Excel- und PowerPoint-Dateien in PDFs um und fügt sie in einem Durchgang zusammen.",
          "Es bietet Texterkennung (OCR), sodass ein Scan durchsuchbar werden kann.",
          "Es hat Handy-Apps mit Scanner und eine Windows-App, die Dateien offline verarbeitet.",
          "Mit einem Konto kannst du deine Dokumente online aufbewahren und auf einem anderen Gerät wiederfinden.",
        ],
      },
      { type: "h2", text: "Wo Cachety besser ist" },
      {
        type: "list",
        items: [
          "Deine Dateien werden nie hochgeladen, auf dem Handy wie am Computer, und es ist nichts zu installieren.",
          "Es gibt kein Tageslimit und keinen kostenpflichtigen Tarif.",
          "Du wählst eine Größe in Megabyte, so wie Online-Formulare ihre Grenzen angeben, und erfährst vor dem Download, wenn sie sich nicht erreichen lässt, ohne dass die Datei unleserlich wird.",
          "Versteckte Daten werden aus jeder Datei entfernt, ohne zusätzlichen Schritt.",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "Du musst Word-, Excel- oder PowerPoint-Dateien in das zusammengefügte PDF aufnehmen.",
      "Der Text eines Scans soll erkannt werden (OCR).",
      "Du nutzt Windows und willst eine installierte App, die offline arbeitet.",
      "Du willst deine Dokumente in einem Online-Konto aufbewahren.",
    ],
    chooseCachety: [
      "Die Dateien sind Ausweise, Gehaltsabrechnungen oder Kontoauszüge, und du willst sie lieber nicht hochladen.",
      "Ein Formular verlangt eine einzige Datei unter 1, 2, 5 oder 10 MB.",
      "Du bist am Handy und willst weder eine App installieren noch ein Konto anlegen.",
    ],
    faq: [
      FAQ_UPLOADED(
        "Smallpdf",
        "Bei den Online-Tools von Smallpdf ja: Die Dateien werden auf dessen Server hochgeladen und nach einer Stunde gelöscht, außer du speicherst sie in deinem Konto. Die Desktop-App für Windows verarbeitet Dateien offline."
      ),
      {
        q: "Kann Smallpdf ein PDF auf eine genaue Größe komprimieren?",
        a: "Nein. Smallpdf bietet Kompressionsstufen, und im eigenen Blog steht, dass sich im Tool keine genaue Größe eingeben lässt. Bei Cachety wählst du 1, 2, 5 oder 10 MB.",
      },
      {
        q: "Ist Smallpdf kostenlos?",
        a: "Teilweise. Zusammenfügen und einfache Kompression sind kostenlos, mit einer täglichen Download-Grenze; stärkere Kompression und unbegrenzte Nutzung gehören zum kostenpflichtigen Tarif. Cachety ist kostenlos, ohne Tageslimit und ohne kostenpflichtigen Tarif.",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "Smallpdf: PDF zusammenfügen", url: "https://smallpdf.com/merge-pdf" },
      { label: "Smallpdf: PDF komprimieren", url: "https://smallpdf.com/compress-pdf" },
      { label: "Smallpdf: PDF organisieren", url: "https://smallpdf.com/organize-pdf" },
      { label: "Smallpdf: JPG in PDF", url: "https://smallpdf.com/jpg-to-pdf" },
      { label: "Smallpdf: Preise und Tarifvergleich", url: "https://smallpdf.com/pricing" },
      { label: "Smallpdf: Datenschutzerklärung", url: "https://smallpdf.com/privacy" },
      { label: "Smallpdf Trust Center", url: "https://smallpdf.com/trust-center" },
      { label: "Smallpdf: Apps und Erweiterungen", url: "https://smallpdf.com/download" },
      { label: "Smallpdf-Blog: PDF auf eine gewählte Größe komprimieren", url: "https://smallpdf.com/blog/compress-pdf-to-chosen-size" },
      { label: "Über Smallpdf", url: "https://smallpdf.com/about" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ─────────────────────────── Adobe Acrobat ───────────────────────────
  {
    tool: "dossier",
    slug: "cachety-vs-adobe-merge",
    competitor: "adobe-merge",
    competitorName: "Adobe Acrobat",
    competitorUrl: "https://www.adobe.com/acrobat/online.html",
    title: "Cachety oder Adobe Acrobat online: PDFs zusammenfügen und komprimieren",
    metaTitle: "Adobe-Acrobat-Alternative: PDF zusammenfügen, kein Upload",
    description:
      "Adobes kostenlose Online-Tools fügen PDFs auf Adobe-Servern zusammen und komprimieren sie. Cachety macht es im Browser, ohne Upload und ohne Anmeldung.",
    intro:
      "Adobe hat das PDF erfunden, und seine kostenlosen Acrobat-Online-Tools fügen PDFs in jedem Browser zusammen und komprimieren sie. Die Dateien werden auf Adobe-Servern verarbeitet. Cachety erledigt eine engere Aufgabe auf deinem eigenen Gerät: Es macht aus PDFs und Fotos eine Datei unter einer Größengrenze, ohne sie hochzuladen.",
    verdict:
      "Für PDFs, deren Text bleiben muss, wie er ist, ist das Zusammenfügen bei Adobe die bessere Wahl: Es verbindet Dateien, ohne die Qualität von Bildern, Text oder Formatierung zu verringern, und nimmt bis zu 100 Dateien an. Die kostenpflichtige Desktop-App kann weit mehr als Cachety. Cachety ist die bessere Wahl für persönliche Dokumente, die du lieber nicht hochlädst, um Fotos und PDFs kostenlos zu mischen und um eine Größengrenze in Megabyte einzuhalten.",
    table: [
      {
        criterion: "Wo die Dateien verarbeitet werden",
        cachety: CACHETY.where,
        other: "Bei den Online-Tools: auf Adobe-Servern. Die Desktop-App von Acrobat komprimiert Dateien lokal auf deinem Gerät.",
        edge: "cachety",
      },
      {
        criterion: "Wie lange Dateien aufbewahrt werden",
        cachety: CACHETY.kept,
        other: "Löschung von den Adobe-Servern, außer du meldest dich an, um sie in deinem Konto zu speichern. Nach dem Download kannst du eine Datei selbst löschen.",
        edge: "cachety",
      },
      {
        criterion: "Konto, kostenlose Nutzung und Grenzen",
        cachety: CACHETY.free,
        other: "Zusammenfügen: bis zu 100 Dateien mit je 500 Seiten, ohne Wasserzeichen. Komprimieren: kostenlos mit begrenzter Nutzung; unbegrenzte Nutzung braucht einen kostenpflichtigen Tarif.",
      },
      {
        criterion: "Seiten in die richtige Reihenfolge bringen",
        cachety: CACHETY.pages,
        other: "Dateien lassen sich vor dem Zusammenfügen umsortieren. Um einzelne Seiten neu zu ordnen, musst du dich anmelden.",
        edge: "cachety",
      },
      {
        criterion: "Unter eine Größengrenze kommen",
        cachety: CACHETY.size,
        other: "Drei Kompressionsstufen: hoch, mittel und niedrig. Dateien bis 2 GB.",
      },
      {
        criterion: "Fotos und andere Dateitypen",
        cachety: CACHETY.inputs,
        other: "Das kostenlose Zusammenfügen nimmt PDFs an. PDFs mit Word-, Excel-, PowerPoint- oder Bilddateien zu verbinden gehört zu Acrobat Pro. Ein eigenes Tool macht aus Bildern ein PDF, und zum Herunterladen des Ergebnisses musst du dich anmelden.",
      },
      {
        criterion: "Was für ein PDF entsteht",
        cachety: CACHETY.output,
        other: "Dateien werden verbunden, ohne Bilder, Text oder Formatierung zu komprimieren oder in der Qualität zu verringern.",
        edge: "other",
      },
      {
        criterion: "Versteckte Daten",
        cachety: CACHETY.hidden,
        other: "Das Entfernen versteckter Informationen („sanitize“) und das Schwärzen sind Funktionen des kostenpflichtigen Acrobat Pro.",
        edge: "cachety",
      },
      {
        criterion: "Apps und Offline-Nutzung",
        cachety: CACHETY.offline,
        other: "Mit dem kostenlosen Acrobat Reader kannst du PDFs ansehen, kommentieren, ausfüllen und unterschreiben. Bearbeiten, Umwandeln und Komprimieren gibt es in der kostenpflichtigen Desktop-App. Die Handy-App Adobe Scan speichert Scans im Cloud-Speicher von Adobe.",
      },
    ],
    body: [
      { type: "h2", text: "Der Maßstab für PDFs und ein kleines Tool für eine Aufgabe" },
      {
        type: "p",
        text: "Adobe bietet mehr als 25 kostenlose Online-Tools. Das Tool zum Zusammenfügen nimmt bis zu 100 Dateien an und verbindet sie, ohne ihre Qualität zu verändern. Das Tool zum Komprimieren bietet drei Stufen. Beide schicken deine Dateien an Adobe-Server, wo sie gelöscht werden, außer du meldest dich an, um sie zu speichern. Adobe gibt an, dass Dateien bei der Übertragung und im gespeicherten Zustand verschlüsselt sind, und nennt ISO 27001 und SOC 2 unter seinen Zertifizierungen für Acrobat im Web.",
      },
      {
        type: "p",
        text: "Cachety bereitet nur eine Datei zum Verschicken vor: die PDFs und Fotos, die von dir verlangt wurden, in der richtigen Reihenfolge, in einem PDF der passenden Größe. Alles passiert in deinem Browser, ohne Anmeldung an irgendeiner Stelle.",
      },
      { type: "h2", text: "Wo Adobe Acrobat besser ist" },
      {
        type: "list",
        items: [
          "Das zusammengefügte PDF behält die Qualität von Text, Bildern und Formatierung des Originals.",
          "Es bewältigt große Aufträge: bis zu 100 Dateien beim Zusammenfügen und Dateien bis 2 GB beim Komprimieren.",
          "Die kostenpflichtige Desktop-App bearbeitet Text und Bilder, wandelt Dateien um, komprimiert und schwärzt.",
          "Wenn du schon für Acrobat bezahlst, ist alles an einem Ort, mit deinen Dateien in deinem Adobe-Konto.",
        ],
      },
      { type: "h2", text: "Wo Cachety besser ist" },
      {
        type: "list",
        items: [
          "Deine Dateien werden nie hochgeladen, und es gibt an keiner Stelle eine Anmeldung.",
          "Einzelne Seiten verschieben, drehen und entfernen ist kostenlos und braucht kein Konto.",
          "Fotos und PDFs kommen kostenlos in dieselbe Datei, auch HEIC-Fotos vom iPhone.",
          "Versteckte Daten werden aus jeder Datei entfernt, eine Funktion, die Adobe seinem kostenpflichtigen Pro-Tarif vorbehält.",
          "Du wählst eine Größe in Megabyte und erfährst vor dem Download, ob sie sich erreichen lässt.",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "Der Text des zusammengefügten PDFs muss markierbar und durchsuchbar bleiben.",
      "Du hast Dutzende Dateien oder sehr große PDFs zu verbinden.",
      "Du bezahlst schon für Acrobat, oder du musst auch bearbeiten, umwandeln oder Text erkennen lassen.",
    ],
    chooseCachety: [
      "Die Dateien sind Ausweise, Gehaltsabrechnungen oder Kontoauszüge, und du willst sie lieber nicht hochladen.",
      "Du willst Seiten neu ordnen, drehen oder entfernen, ohne dich anzumelden.",
      "Du musst Fotos und PDFs mischen und das Ergebnis unter 1, 2, 5 oder 10 MB halten.",
    ],
    faq: [
      FAQ_UPLOADED(
        "Adobe Acrobat",
        "Bei den Online-Tools von Adobe ja: Die Dateien werden auf Adobe-Servern verarbeitet und gelöscht, außer du meldest dich an, um sie zu speichern. Die Desktop-App von Acrobat arbeitet auf deinem eigenen Gerät."
      ),
      {
        q: "Brauche ich ein Adobe-Konto, um PDFs zusammenzufügen?",
        a: "Zum Zusammenfügen und Herunterladen nicht. Adobe verlangt eine Anmeldung, um einzelne Seiten neu zu ordnen, die Datei per Link zu teilen oder ein aus Bildern erstelltes PDF herunterzuladen. Cachety hat gar kein Konto.",
      },
      {
        q: "Kann Acrobat online Metadaten aus einem PDF entfernen?",
        a: "Das Entfernen versteckter Informationen ist eine Funktion des kostenpflichtigen Acrobat Pro. Cachety entfernt versteckte Daten aus jeder Datei, die es erzeugt, indem es die Seiten als Bilder neu aufbaut.",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "Adobe Acrobat: kostenlose Online-Tools", url: "https://www.adobe.com/acrobat/online.html" },
      { label: "Adobe Acrobat: PDFs zusammenfügen", url: "https://www.adobe.com/acrobat/online/merge-pdf.html" },
      { label: "Adobe Acrobat: PDF komprimieren", url: "https://www.adobe.com/acrobat/online/compress-pdf.html" },
      { label: "Adobe Acrobat: JPG in PDF", url: "https://www.adobe.com/acrobat/online/jpg-to-pdf.html" },
      { label: "Adobe Acrobat: PDF-Seiten neu anordnen", url: "https://www.adobe.com/acrobat/online/rearrange-pdf.html" },
      { label: "Adobe Acrobat: PDF-Seiten löschen", url: "https://www.adobe.com/acrobat/online/delete-pdf-pages.html" },
      { label: "Adobe Acrobat Reader", url: "https://www.adobe.com/acrobat/pdf-reader.html" },
      { label: "Adobe Acrobat: Tarife im Vergleich", url: "https://www.adobe.com/acrobat/pricing/compare-versions.html" },
      { label: "Adobe Scan", url: "https://www.adobe.com/acrobat/mobile/scanner-app.html" },
      {
        label: "Adobe Acrobat Services: Sicherheitsübersicht",
        url: "https://www.adobe.com/cc-shared/assets/pdf/trust-center/ungated/whitepapers/doc-cloud/acrobat-dc-security-overview-ue.pdf",
      },
      { label: "Adobe: Compliance-Liste", url: "https://www.adobe.com/trust/compliance/compliance-list.html" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ────────────────────────────── PDF24 ──────────────────────────────
  {
    tool: "dossier",
    slug: "cachety-vs-pdf24-merge",
    competitor: "pdf24-merge",
    competitorName: "PDF24",
    competitorUrl: "https://tools.pdf24.org/",
    title: "Cachety oder PDF24: PDFs zusammenfügen und komprimieren, ohne sie hochzuladen",
    metaTitle: "PDF24-Alternative: PDF zusammenfügen ohne Upload",
    description:
      "PDF24 fügt PDFs online auf seinen Servern zusammen und komprimiert sie; die Windows-App arbeitet offline. Cachety läuft in jedem Browser, ohne Upload.",
    intro:
      "PDF24 ist eine kostenlose deutsche Sammlung von PDF-Tools. Die Online-Tools verarbeiten Dateien auf den Servern von PDF24, und das Windows-Programm PDF24 Creator erledigt dieselbe Arbeit auf deinem PC. Cachety läuft im Browser jedes Geräts und lädt deine Dateien nie hoch, erledigt aber eine engere Aufgabe.",
    verdict:
      "Auf einem Windows-Computer ist PDF24 Creator kaum zu schlagen: Es ist kostenlos, arbeitet offline und hängt die Originalseiten aneinander, der Text bleibt also, wie er war. Auf einem Handy, einem Mac oder einem Computer, auf dem du nichts installieren kannst, heißt PDF24: die Online-Tools, und die laden deine Dateien hoch. Dort ist Cachety die bessere Wahl für persönliche Dokumente, und du kannst eine Größe in Megabyte wählen.",
    table: [
      {
        criterion: "Wo die Dateien verarbeitet werden",
        cachety: CACHETY.where,
        other: "Online-Tools: in der Cloud, auf den Servern von PDF24. PDF24 Creator (Windows): auf deinem PC, ohne Upload.",
      },
      {
        criterion: "Wie lange Dateien aufbewahrt werden",
        cachety: CACHETY.kept,
        other: "Online: automatische Löschung nach einer Stunde. Die Dateien lassen sich auch sofort von Hand entfernen.",
        edge: "cachety",
      },
      {
        criterion: "Konto, kostenlose Nutzung und Grenzen",
        cachety: CACHETY.free,
        other: "Kostenlos und ohne Einschränkung, ohne Registrierung. Online darf eine Datei bis zu 1.000 MB und ein Auftrag bis zu 10 GB groß sein.",
      },
      {
        criterion: "Seiten in die richtige Reihenfolge bringen",
        cachety: CACHETY.pages,
        other: "Dateien werden per Drag-and-drop umsortiert. Ein Seitenmodus zeigt die Seiten aller Dateien. Seiten drehen und Seiten entfernen sind eigene Tools.",
      },
      {
        criterion: "Unter eine Größengrenze kommen",
        cachety: CACHETY.size,
        other: "Du stellst die Auflösung (DPI) und die Bildqualität ein, mit einer Graustufen-Option. Eine Option „auf 5 MB komprimieren“ gibt es nicht.",
        edge: "cachety",
      },
      {
        criterion: "Welche Dateitypen angenommen werden",
        cachety: CACHETY.inputs,
        other: "PDFs, Bilder, Word-Dokumente und andere Dateien. HEIC-Fotos vom iPhone werden im Tool zum Zusammenfügen nicht unterstützt.",
      },
      {
        criterion: "Was für ein PDF entsteht",
        cachety: CACHETY.output,
        other: "Seiten werden so übernommen, wie sie sind, und nicht neu erzeugt: Text, Bilder und Schriften behalten ihre Qualität.",
        edge: "other",
      },
      {
        criterion: "Versteckte Daten",
        cachety: CACHETY.hidden,
        other: "Ein eigenes Tool entfernt die Metadaten eines PDFs.",
      },
      {
        criterion: "Apps und Offline-Nutzung",
        cachety: CACHETY.offline,
        other: "PDF24 Creator bringt alle Tools offline, nur unter Windows. Eine Version für Mac oder Linux gibt es noch nicht, und in den App-Stores für Handys gibt es keine App.",
      },
      {
        criterion: "Werbung und Tracker",
        cachety: CACHETY.ads,
        other: "Die Online-Tools werden durch Werbung finanziert. Die Datenschutzerklärung nennt Google AdSense und Google Analytics.",
        edge: "cachety",
      },
    ],
    body: [
      { type: "h2", text: "Zwei Wege, PDF24 zu nutzen" },
      {
        type: "p",
        text: "Die Online-Tools von PDF24 sind kostenlos, brauchen keine Registrierung und werden durch Werbung finanziert. Sie verarbeiten deine Dateien auf den Servern von PDF24: Die Übertragung ist verschlüsselt, und die Dateien werden nach einer Stunde gelöscht. PDF24 wird von einem Unternehmen mit Sitz in Berlin betrieben.",
      },
      {
        type: "p",
        text: "PDF24 Creator ist etwas anderes. Es ist ein kostenloses Windows-Programm, das alle PDF24-Tools auf deinen PC bringt. Dort bleiben die Dateien lokal und werden nicht hochgeladen. Wenn du Windows nutzt und Software installieren kannst, bekommst du damit dieselbe Privatsphäre wie bei Cachety und mehr Funktionen.",
      },
      { type: "h2", text: "Wo PDF24 besser ist" },
      {
        type: "list",
        items: [
          "Das zusammengefügte PDF behält die Originalseiten, der Text bleibt also markierbar und die Datei leicht.",
          "Es nimmt Word-Dokumente und andere Dateien an und bietet Texterkennung (OCR).",
          "Unter Windows erledigt PDF24 Creator all das offline und kostenlos.",
          "Du kannst Auflösung und Bildqualität der Kompression selbst einstellen.",
        ],
      },
      { type: "h2", text: "Wo Cachety besser ist" },
      {
        type: "list",
        items: [
          "Kein Upload auf jedem Gerät: Handy, Mac, Linux-Computer oder ein PC, auf dem du keine Software installieren kannst.",
          "Du wählst eine Größe in Megabyte, statt Einstellungen auszuprobieren, bis die Datei klein genug ist.",
          "HEIC-Fotos vom iPhone werden so angenommen, wie sie sind.",
          "Versteckte Daten werden aus jeder Datei entfernt, ohne zusätzlichen Schritt.",
          "Keine Werbung und keine Tracker.",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "Du nutzt Windows und kannst PDF24 Creator installieren: Es arbeitet offline und behält die Originalseiten.",
      "Der Text des zusammengefügten PDFs muss markierbar und durchsuchbar bleiben.",
      "Du musst Word-Dokumente hinzufügen oder den Text eines Scans erkennen lassen.",
      "Du willst Auflösung und Bildqualität selbst einstellen.",
    ],
    chooseCachety: [
      "Du bist am Handy, am Mac oder an einem Computer, auf dem du keine Software installieren kannst, und willst deine Dokumente lieber nicht hochladen.",
      "Ein Formular verlangt eine einzige Datei unter 1, 2, 5 oder 10 MB.",
      "Deine Fotos kommen von einem iPhone.",
    ],
    faq: [
      FAQ_UPLOADED(
        "PDF24",
        "Bei den Online-Tools von PDF24 ja: Die Dateien werden auf dessen Servern verarbeitet und nach einer Stunde gelöscht. Bei PDF24 Creator unter Windows nein: Die Dateien bleiben auf deinem PC."
      ),
      {
        q: "Kann PDF24 ein PDF auf eine bestimmte Größe komprimieren?",
        a: "Nicht direkt. Du stellst Auflösung und Bildqualität ein, und in der eigenen Anleitung von PDF24 steht, dass es keine Option „auf 5 MB komprimieren“ gibt. Bei Cachety wählst du 1, 2, 5 oder 10 MB.",
      },
      {
        q: "Funktioniert PDF24 offline auf einem Mac oder Handy?",
        a: "Nein. PDF24 Creator gibt es nur für Windows. Auf einem Mac oder Handy bietet PDF24 seine Online-Tools an, die Dateien auf seinen Servern verarbeiten. Cachety läuft im Browser jedes Geräts, ohne Upload.",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "PDF24 Tools: PDF zusammenfügen", url: "https://tools.pdf24.org/en/merge-pdf" },
      { label: "PDF24 Tools: PDF komprimieren", url: "https://tools.pdf24.org/en/compress-pdf" },
      { label: "PDF24 Tools: Bilder in PDF", url: "https://tools.pdf24.org/en/images-to-pdf" },
      { label: "PDF24 Tools: PDF-Metadaten entfernen", url: "https://tools.pdf24.org/en/remove-pdf-metadata" },
      { label: "PDF24 Tools: Fragen und Antworten", url: "https://tools.pdf24.org/en/faq" },
      { label: "PDF24 Creator", url: "https://tools.pdf24.org/en/creator" },
      { label: "PDF24-Hilfe: PDF-Dateien zusammenfügen", url: "https://help.pdf24.org/en/how-to-merge-pdf-files-with-pdf24/" },
      { label: "PDF24-Hilfe: PDF komprimieren", url: "https://help.pdf24.org/en/compress-pdf-guide/" },
      { label: "PDF24-Hilfe: Mac, Linux und Handys", url: "https://help.pdf24.org/en/pdf24-for-mac-linux-portable/" },
      { label: "PDF24: Datenschutzerklärung", url: "https://www.pdf24.org/en/privacy-policy" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ────────────────────────────── Sejda ──────────────────────────────
  {
    tool: "dossier",
    slug: "cachety-vs-sejda-merge",
    competitor: "sejda-merge",
    competitorName: "Sejda",
    competitorUrl: "https://www.sejda.com/",
    title: "Cachety oder Sejda: PDFs zusammenfügen und komprimieren, ohne sie hochzuladen",
    metaTitle: "Sejda-Alternative: PDF zusammenfügen ohne Upload",
    description:
      "Sejda fügt PDFs online zusammen und komprimiert sie, oder per Desktop-App auf deinem Computer, mit Gratis-Grenzen. Cachety läuft im Browser, ohne Upload.",
    intro:
      "Sejda ist ein niederländischer PDF-Werkzeugkasten mit zwei Seiten: Online-Tools, die Dateien auf seinen Servern verarbeiten, und Sejda Desktop, eine App für Mac, Windows und Linux, die sie auf deinem Computer verarbeitet. Beide haben in der kostenlosen Nutzung Grenzen. Cachety läuft im Browser jedes Geräts, lädt nichts hoch und hat kein Stunden- oder Tageslimit, erledigt aber eine engere Aufgabe.",
    verdict:
      "Das Zusammenfügen bei Sejda kann mehr: Es behält Lesezeichen, erstellt ein Inhaltsverzeichnis und kann den Dateinamen unten auf die Seiten drucken. Bei Sejda Desktop bleiben die Dateien auf deinem Computer. Nimm Sejda, wenn du diese Optionen brauchst. Nimm Cachety für persönliche Dokumente auf dem Handy oder ohne Installation, für Dateien jenseits der kostenlosen Grenzen von Sejda und für eine Größengrenze in Megabyte.",
    table: [
      {
        criterion: "Wo die Dateien verarbeitet werden",
        cachety: CACHETY.where,
        other: "Online: hochgeladen und auf den Servern von Sejda verarbeitet. Sejda Desktop: auf deinem Computer, ohne Upload.",
      },
      {
        criterion: "Wie lange Dateien aufbewahrt werden",
        cachety: CACHETY.kept,
        other: "Online: automatische Löschung nach 2 Stunden. Mit einer Schaltfläche lassen sie sich früher löschen.",
        edge: "cachety",
      },
      {
        criterion: "Konto, kostenlose Nutzung und Grenzen",
        cachety: CACHETY.free,
        other: "Keine Registrierung. Kostenloses Zusammenfügen online: bis zu 50 Seiten oder 50 MB, 3 Aufgaben pro Stunde. Kostenloses Komprimieren: bis zu 200 Seiten oder 100 MB. Desktop kostenlos: 3 Aufgaben pro Tag. Ein kostenpflichtiger Tarif hebt die Grenzen auf.",
        edge: "cachety",
      },
      {
        criterion: "Seiten in die richtige Reihenfolge bringen",
        cachety: CACHETY.pages,
        other: "Dateien werden per Drag-and-drop umsortiert. In einer Seitenansicht lassen sich Seiten vor dem Zusammenfügen löschen, umsortieren und duplizieren.",
      },
      {
        criterion: "Unter eine Größengrenze kommen",
        cachety: CACHETY.size,
        other: "Einstellungen für Bildqualität und Auflösung, mit einer Graustufen-Option. Keine Zielgröße in Megabyte.",
        edge: "cachety",
      },
      {
        criterion: "Welche Dateitypen angenommen werden",
        cachety: CACHETY.inputs,
        other: "PDFs und Bilder wie JPG und PNG im Tool zum Zusammenfügen. HEIC-Bilder werden nicht unterstützt.",
      },
      {
        criterion: "Optionen beim Zusammenfügen",
        cachety: "Keine außer der Seitenreihenfolge: keine Lesezeichen, kein Inhaltsverzeichnis.",
        other: "Lesezeichen je Datei behalten oder anlegen, ein Inhaltsverzeichnis, leere Seiten für doppelseitigen Druck, der Dateiname in der Fußzeile.",
        edge: "other",
      },
      {
        criterion: "Versteckte Daten",
        cachety: CACHETY.hidden,
        other: "Ein eigenes Tool bearbeitet die Metadaten eines PDFs.",
      },
      {
        criterion: "Apps und Offline-Nutzung",
        cachety: CACHETY.offline,
        other: "Sejda Desktop für Mac, Windows und Linux arbeitet offline, mit denselben Funktionen wie der Online-Dienst.",
      },
    ],
    body: [
      { type: "h2", text: "Online oder auf deinem Computer: Sejda bietet beides" },
      {
        type: "p",
        text: "Auf der Website von Sejda lädst du deine Dokumente hoch, und sie werden auf dessen Servern verarbeitet. Sejda gibt an, dass Dateien bei der Übertragung und im gespeicherten Zustand verschlüsselt sind und nach zwei Stunden automatisch gelöscht werden. Der kostenlose Dienst ist nach Seiten, Megabyte und Aufgaben pro Stunde begrenzt.",
      },
      {
        type: "p",
        text: "Sejda Desktop verarbeitet Dateien auf deinem Computer, ohne Upload, unter Mac, Windows und Linux. Die kostenlose Version erlaubt drei Aufgaben pro Tag. Ein Detail ist bei persönlichen Dokumenten wichtig: In den Nutzungsbedingungen von Sejda steht, dass Nutzer keine sensiblen persönlichen Informationen, etwa staatlich vergebene Identifikationsnummern, an den Online-Dienst übermitteln dürfen.",
      },
      { type: "h2", text: "Wo Sejda besser ist" },
      {
        type: "list",
        items: [
          "Optionen beim Zusammenfügen, die Cachety nicht hat: Lesezeichen, ein Inhaltsverzeichnis, leere Seiten für doppelseitigen Druck.",
          "Eine Desktop-App für Mac, Windows und Linux, bei der die Dateien auf deinem Computer bleiben.",
          "Viele weitere Tools an einem Ort: Texterkennung (OCR), Zuschneiden, Begradigen von Scans, Bearbeiten.",
          "Feine Kontrolle über die Kompression, mit Einstellungen für Bildqualität und Auflösung.",
        ],
      },
      { type: "h2", text: "Wo Cachety besser ist" },
      {
        type: "list",
        items: [
          "Nichts wird hochgeladen und nichts installiert, auf dem Handy wie am Computer.",
          "Keine 50-Seiten-Grenze und keine Begrenzung der Aufgaben pro Stunde oder pro Tag: Eine Datei mit 60 Seiten oder eine vierte Datei in derselben Stunde ist kein Problem.",
          "Du wählst eine Größe in Megabyte und erfährst vor dem Download, ob sie sich erreichen lässt.",
          "HEIC-Fotos vom iPhone werden so angenommen, wie sie sind, und versteckte Daten werden aus jeder Datei entfernt.",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "Du brauchst Lesezeichen oder ein Inhaltsverzeichnis im zusammengefügten PDF.",
      "Du kannst Sejda Desktop installieren und dein Auftrag passt in die kostenlosen Grenzen, oder du hast einen kostenpflichtigen Tarif.",
      "Du brauchst Texterkennung, Zuschneiden oder Begradigen von Scans.",
    ],
    chooseCachety: [
      "Die Dateien sind Ausweise, Gehaltsabrechnungen oder Kontoauszüge, und du bist am Handy oder kannst keine Software installieren.",
      "Deine Datei hat mehr als 50 Seiten, oder du musst in derselben Stunde mehrere Dateien vorbereiten.",
      "Ein Formular verlangt eine einzige Datei unter 1, 2, 5 oder 10 MB.",
    ],
    faq: [
      FAQ_UPLOADED(
        "Sejda",
        "Bei den Online-Tools von Sejda ja: Die Dateien werden auf dessen Server hochgeladen und nach zwei Stunden gelöscht. Bei Sejda Desktop nein: Die Dateien werden auf deinem Computer verarbeitet."
      ),
      {
        q: "Welche kostenlosen Grenzen hat Sejda beim Zusammenfügen?",
        a: "Online: Dokumente bis zu 50 Seiten oder 50 MB und drei Aufgaben pro Stunde. Die kostenlose Version von Sejda Desktop erlaubt drei Aufgaben pro Tag. Cachety hat keine solchen Grenzen: bis zu 1.000 Seiten in einer Datei.",
      },
      {
        q: "Kann Sejda ein PDF auf eine bestimmte Größe komprimieren?",
        a: "Das Tool zum Komprimieren bietet Einstellungen für Bildqualität und Auflösung, keine Zielgröße. Bei Cachety wählst du 1, 2, 5 oder 10 MB.",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "Sejda: PDF zusammenfügen", url: "https://www.sejda.com/merge-pdf" },
      { label: "Sejda: PDF komprimieren", url: "https://www.sejda.com/compress-pdf" },
      { label: "Sejda: JPG in PDF", url: "https://www.sejda.com/jpg-to-pdf" },
      { label: "Sejda: PDF-Seiten organisieren", url: "https://www.sejda.com/organize-pdf" },
      { label: "Sejda: PDF-Metadaten bearbeiten", url: "https://www.sejda.com/edit-pdf-metadata" },
      { label: "Sejda: Preise und Fragen", url: "https://www.sejda.com/pricing" },
      { label: "Sejda Desktop", url: "https://www.sejda.com/desktop" },
      { label: "Sejda: Sicherheit", url: "https://www.sejda.com/security" },
      { label: "Sejda: Datenschutzerklärung", url: "https://www.sejda.com/privacy" },
      { label: "Sejda: Nutzungsbedingungen", url: "https://www.sejda.com/terms" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },
];
