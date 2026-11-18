// Ratgeber zum Dossier-Tool (de): PDFs zusammenfügen, Fotos zu einem PDF,
// Seiten ordnen und drehen, versteckte Daten entfernen. Jeder Eintrag trägt
// tool: "dossier". Geschrieben für Leserinnen und Leser in Deutschland, in der
// Du-Form. Nur reiner Text: keine Links, kein HTML, kein Markdown. Alle
// Firmennamen in den Beispielen sind erfunden.
// Draft translation from the English guide, awaiting native review (ROADMAP.md, backlog: Native review).
//
// Diese Ratgeber beschreiben das Dossier-Tool (docs/prd-dossier.md), nur den
// Must-Umfang: keine Abschnitte, kein Begradigen von Fotos, keine frei
// wählbare Größe. Erst mit dem Tool veröffentlichen, nicht vorher. Die
// Schaltflächen des Tools sind hier nur umschrieben, weil ihre deutschen
// Beschriftungen noch nicht feststehen: beim Veröffentlichen abgleichen.

import type { Guide } from "../types";

const UPDATED = "2026-11-18";

/** Adresse des Tools, ohne Schema geschrieben (Ratgeber enthalten keine Links). */
const TOOL = "cachety.com/de/dossier";

const NOT_UPLOADED =
  "Cachety arbeitet in deinem Browser. Es gibt keinen Server, der deine Dateien empfängt, und die Seite verbietet deinem Browser, eine andere Website zu kontaktieren. Du kannst es selbst prüfen: Lade die Seite, schalte den Flugmodus ein, und sie funktioniert weiter. Cachety ist kostenlos, ohne Konto, und der Code ist Open Source.";

const PIXELS =
  "Um versteckte Daten zu entfernen, baut Cachety jede Seite als Bild neu auf. Der Text im neuen PDF lässt sich deshalb weder markieren noch durchsuchen, und ein PDF, das nur Text enthielt, kann größer werden als das Original. Deine Originaldateien werden nicht verändert: Bewahr sie auf.";

export const DOSSIER_GUIDES_DE: Guide[] = [
  // ------------------------------------------------------------------
  {
    slug: "pdf-zusammenfuegen-ohne-upload",
    topic: "merge",
    tool: "dossier",
    title: "PDF-Dateien zu einer zusammenfügen, ohne sie hochzuladen",
    metaTitle: "PDF zusammenfügen ohne Upload, kostenlos",
    description:
      "Füge PDFs und Fotos im Browser zu einem PDF zusammen. Seiten ordnen, Größengrenze einhalten, nichts hochladen. Kostenlos und ohne Konto.",
    intro:
      "„Bitte alles in einem PDF schicken.“ Die meisten kostenlosen Tools zum Zusammenfügen laden deine Dateien erst auf ihre Server. Wenn es um deinen Ausweis, deine Gehaltsabrechnungen und deine Kontoauszüge geht, gibt es einen anderen Weg: Du machst es auf deinem eigenen Gerät.",
    example: "Mietbewerbung, Hausverwaltung Kastanienhof, 18.11.2026",
    body: [
      { type: "h2", text: "Warum Zusammenfügen im Netz keine Kleinigkeit ist" },
      {
        type: "p",
        text: "Zusammengefügt werden selten Urlaubsfotos. Es sind die Unterlagen, die eine Hausverwaltung, eine Bank, ein Arbeitgeber oder eine Behörde verlangt hat: Identitätsnachweis, Einkommensnachweis, Wohnsitznachweis. Sie alle auf einmal an eine Website zu schicken, über die du wenig weißt, nur um sie aneinanderzuhängen, ist ein Risiko, das du nicht eingehen musst.",
      },
      { type: "h2", text: "So fügst du deine Dateien mit Cachety zusammen" },
      {
        type: "steps",
        items: [
          `Öffne ${TOOL} im Browser, am Computer oder auf dem Handy. Nichts installieren, kein Konto.`,
          "Füge deine Dateien hinzu: PDFs und Fotos gemischt (JPG, PNG, HEIC-Fotos vom iPhone und weitere). Ein Foto wird zu einer Seite.",
          "Geh zu den Seiten. Jede Seite jeder Datei wird als kleines Bild gezeigt. Zieh eine Seite, um sie zu verschieben, auch von einem Dokument in ein anderes. Dreh eine Seite, die quer liegt, und entferne die Seiten, die du nicht willst.",
          "Wähle als Ergebnis ein einziges PDF. Hat die Website, an die du es schickst, eine Größengrenze, wähle sie aus: 1, 2, 5 oder 10 MB. Cachety sagt dir vor dem Download, ob die Datei darunter bleibt und lesbar ist.",
          "Prüf die Vorschau, gib der Datei einen Namen und lade sie herunter.",
        ],
      },
      {
        type: "tip",
        text: "Vor dem Download kannst du eine Kontonummer oder jede andere Angabe schwärzen, die der Empfänger nicht braucht. Der geschwärzte Bereich wird aus der Datei entfernt, nicht nur überdeckt.",
      },
      { type: "h2", text: "Was mit deinen Dateien passiert" },
      { type: "p", text: NOT_UPLOADED },
      { type: "h2", text: "Was für ein PDF dabei herauskommt" },
      { type: "p", text: PIXELS },
      {
        type: "p",
        text: "Die gute Seite daran: Die neue Datei enthält weniger als die Originale. Kein Autorenname, kein versteckter Text, keine Anhänge und kein GPS-Standort aus deinen Fotos. Was der Empfänger sieht, ist alles, was da ist.",
      },
      {
        type: "warning",
        text: "Soll der Text des zusammengefügten PDFs markierbar und durchsuchbar bleiben, etwa bei einem Bericht oder einer Abschlussarbeit, ist Cachety nicht das richtige Werkzeug. Nimm dann ein Programm, das auf deinem Computer läuft und die Originalseiten unverändert aneinanderhängt, etwa Vorschau auf dem Mac.",
      },
      { type: "h2", text: "Ein paar Grenzen, die du kennen solltest" },
      {
        type: "list",
        items: [
          "Bis zu 200 MB pro Datei, 500 Seiten pro PDF und 1.000 Seiten insgesamt.",
          "Word- und Excel-Dateien werden nicht angenommen: Speichere sie erst als PDF (Drucken, dann als PDF speichern).",
          "Ein passwortgeschütztes PDF kannst du hinzufügen: Cachety fragt nach dem Passwort, auf deinem Gerät.",
        ],
      },
    ],
    faq: [
      {
        q: "Werden meine PDFs zum Zusammenfügen hochgeladen?",
        a: "Nein. Das Zusammenfügen passiert in deinem Browser, auf deinem Gerät. Cachety hat keinen Server, der deine Dateien empfangen könnte.",
      },
      {
        q: "Kann ich PDFs und Fotos zusammenfügen?",
        a: "Ja. Füge PDFs und Fotos beliebig gemischt hinzu. Jedes Foto wird zu einer Seite, und du bringst alle Seiten in die Reihenfolge, die du willst.",
      },
      {
        q: "Lässt sich der Text nach dem Zusammenfügen noch markieren?",
        a: "Nein. Jede Seite wird als Bild neu aufgebaut, das entfernt versteckte Daten. Brauchst du markierbaren Text, nimm ein Programm auf deinem Computer, das die Originalseiten behält.",
      },
      {
        q: "Warum ist die zusammengefügte Datei manchmal größer als meine Dateien?",
        a: "Ein PDF, das nur Text enthielt, ist sehr leicht, und ein Bild derselben Seite wiegt mehr. Wähle eine maximale Größe, und Cachety verkleinert die Seiten, bis es passt.",
      },
      {
        q: "Geht das auf dem Handy?",
        a: "Ja, auf iPhone und Android, im Browser. Du verschiebst die Seiten mit dem Finger.",
      },
    ],
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  {
    slug: "fotos-in-pdf-umwandeln-handy",
    topic: "photo-to-pdf",
    tool: "dossier",
    title: "Fotos von Papierdokumenten auf dem Handy in ein PDF umwandeln",
    metaTitle: "Fotos in ein PDF umwandeln auf dem Handy, ohne App",
    description:
      "Fotografiere deine Papierunterlagen und mach im Browser deines Handys ein PDF daraus. Ohne App, ohne Upload und klein genug für ein Online-Formular.",
    intro:
      "Eine Website will ein PDF, und du hast nur Papier. Oder sie lehnt dein iPhone-Foto wegen des Formats ab. Du brauchst weder Scanner noch Scan-App: Die Kamera deines Handys und sein Browser reichen.",
    example: "Kita-Anmeldung, Kindertagesstätte Sonnenhügel, 18.11.2026",
    body: [
      { type: "h2", text: "Fotos machen, die sich gut lesen lassen" },
      {
        type: "list",
        items: [
          "Leg das Blatt flach auf eine einfarbige, dunkle Unterlage, nah an ein Fenster. Verzichte auf den Blitz, er hinterlässt einen weißen Fleck.",
          "Halte das Handy gerade über das Blatt, sodass die Ränder parallel aussehen, und fülle das Bild mit der Seite aus.",
          "Mach ein Foto pro Seite. Prüf, ob das Kleingedruckte scharf ist, bevor du weitermachst.",
        ],
      },
      { type: "h2", text: "Von den Fotos zu einem PDF" },
      {
        type: "steps",
        items: [
          `Öffne ${TOOL} im Browser deines Handys. Du musst keine App installieren.`,
          "Tippe auf die Ablagefläche und wähle deine Fotos. iPhone-Fotos im HEIC-Format funktionieren so, wie sie sind.",
          "Geh zu den Seiten. Jedes Foto ist zu einer Seite geworden. Dreh die Seiten, die quer liegen, und zieh sie in die richtige Reihenfolge.",
          "Wähle als Ergebnis ein einziges PDF und, wenn das Formular eine Größengrenze hat, 1, 2, 5 oder 10 MB.",
          "Prüf die Vorschau und lade das PDF herunter. Es wird auf deinem Handy gespeichert und kann gleich angehängt werden.",
        ],
      },
      {
        type: "tip",
        text: "Du kannst Fotos mit PDFs mischen, die du schon hast, etwa einer heruntergeladenen Gehaltsabrechnung. Alles landet in einer Datei, in der Reihenfolge, die du festlegst.",
      },
      { type: "h2", text: "Warum das Formular dein Foto abgelehnt hat" },
      {
        type: "p",
        text: "Online-Formulare nehmen oft nur PDF, JPG oder PNG an und begrenzen die Größe auf ein paar Megabyte. Ein Foto von einem neueren Handy kann mehr wiegen, und iPhones speichern Fotos als HEIC, ein Format, das viele Websites nicht lesen. Die Fotos in ein PDF mit Größengrenze umzuwandeln löst beide Probleme auf einmal.",
      },
      { type: "h2", text: "Deine Fotos bleiben auf deinem Handy" },
      { type: "p", text: NOT_UPLOADED },
      {
        type: "p",
        text: "Ein Foto merkt sich außerdem, wo und wann es aufgenommen wurde und mit welchem Handy. Cachety baut jede Seite als neues Bild auf. Diese versteckten Angaben, auch der GPS-Standort, stehen deshalb nicht in dem PDF, das du verschickst.",
      },
      {
        type: "warning",
        text: "Eine sehr kleine Größengrenze und viele Fotoseiten passen nicht immer zusammen. Kann die Datei nicht darunter bleiben und lesbar sein, sagt Cachety es dir vor dem Download: Entferne ein paar Seiten oder schick zwei Dateien.",
      },
    ],
    faq: [
      {
        q: "Brauche ich eine Scan-App?",
        a: "Nein. Mach die Fotos mit der Kamera deines Handys und öffne Cachety im Browser. Es wird nichts installiert.",
      },
      {
        q: "Funktionieren iPhone-Fotos (HEIC)?",
        a: "Ja. HEIC-Fotos werden auf deinem Gerät gelesen und zu Seiten des PDFs, wie jedes andere Foto.",
      },
      {
        q: "Werden meine Fotos hochgeladen?",
        a: "Nein. Alles passiert im Browser deines Handys. Es gibt keinen Server, der deine Fotos empfängt.",
      },
      {
        q: "Kann ich den Text im PDF durchsuchen oder kopieren?",
        a: "Nein. Die Seiten sind Bilder: Cachety liest den Text eines Fotos nicht. Bei einem Formular, das ein PDF verlangt, ist das selten ein Problem.",
      },
    ],
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  {
    slug: "pdf-seiten-drehen-sortieren-loeschen",
    topic: "pdf-pages",
    tool: "dossier",
    title: "PDF-Seiten drehen, neu ordnen oder löschen, ohne die Datei hochzuladen",
    metaTitle: "PDF-Seiten drehen, sortieren oder löschen ohne Upload",
    description:
      "Dreh eine quer liegende Seite, ändere die Reihenfolge oder entferne Seiten aus einem PDF, im Browser. Kostenlos, ohne Konto, die Datei bleibt bei dir.",
    intro:
      "Ein Scan, der auf dem Kopf steht, eine leere Seite mittendrin, ein Vertrag, von dem du nur die Seiten 1 und 7 brauchst: kleine Korrekturen, aber die meisten kostenlosen Tools wollen, dass du erst das ganze Dokument hochlädst. So machst du es auf deinem eigenen Gerät.",
    example: "Antrag Baufinanzierung, Bank Nordtor, 18.11.2026",
    body: [
      { type: "h2", text: "Seiten mit Cachety in Ordnung bringen" },
      {
        type: "steps",
        items: [
          `Öffne ${TOOL} im Browser, am Computer oder auf dem Handy.`,
          "Füge dein PDF hinzu. Mehrere Dateien gehen auch, ebenso Fotos.",
          "Geh zu den Seiten. Jede Seite wird als kleines Bild gezeigt, in der Reihenfolge der fertigen Datei.",
          "Zieh eine Seite, um sie zu verschieben. Mit der Schaltfläche zum Drehen drehst du sie jeweils um eine Vierteldrehung. Mit der Schaltfläche zum Entfernen nimmst du sie heraus. Hast du die falsche Seite entfernt, holst du sie mit Rückgängig zurück.",
          "Wähle als Ergebnis ein einziges PDF, prüf die Vorschau und lade die Datei herunter.",
        ],
      },
      {
        type: "tip",
        text: "Am Computer geht alles auch mit der Tastatur: Alt und die Pfeiltasten verschieben die ausgewählte Seite, R dreht sie, und die Taste Entf entfernt sie.",
      },
      { type: "h2", text: "Eine echte Drehung, keine Anzeigeeinstellung" },
      {
        type: "p",
        text: "Viele Tools schreiben nur einen Vermerk ins PDF: „Diese Seite gedreht anzeigen“. Manche Programme beachten ihn nicht, und beim Empfänger liegt die Seite wieder quer. Cachety baut die Seite richtig herum neu auf, sie sieht also überall gleich aus.",
      },
      { type: "h2", text: "Entfernte Seiten sind wirklich weg" },
      {
        type: "p",
        text: "Wenn du eine Seite herausnimmst, ist sie in der neuen Datei gar nicht mehr enthalten. Dasselbe gilt für das, was man in einem PDF nicht sieht: versteckten Text, Anhänge, den Namen des Autors. Die neue Datei entsteht aus dem, was auf jeder Seite zu sehen ist, und aus nichts sonst.",
      },
      { type: "h2", text: "Was du vom Ergebnis erwarten kannst" },
      { type: "p", text: PIXELS },
      {
        type: "warning",
        text: "Willst du markierbaren Text, Lesezeichen oder Formularfelder behalten, nimm ein Programm, das auf deinem Computer läuft und die Originalseiten bearbeitet, etwa Vorschau auf dem Mac.",
      },
      { type: "h2", text: "Nichts wird hochgeladen" },
      { type: "p", text: NOT_UPLOADED },
    ],
    faq: [
      {
        q: "Kann ich nur eine einzelne Seite eines PDFs drehen?",
        a: "Ja. Jede Seite hat ihre eigene Schaltfläche zum Drehen. Die anderen Seiten bleiben unverändert.",
      },
      {
        q: "Kann ich eine Seite aus einem PDF in ein anderes verschieben?",
        a: "Ja. Füge beide Dateien hinzu: Alle Seiten erscheinen zusammen, lassen sich frei verschieben und dann als ein PDF speichern.",
      },
      {
        q: "Bekomme ich eine entfernte Seite zurück?",
        a: "Ja, solange Cachety im Browser geöffnet ist: Mach das Entfernen gleich danach rückgängig oder stell die ursprüngliche Reihenfolge wieder her. Deine Originaldatei wird nie verändert.",
      },
      {
        q: "Wird mein PDF hochgeladen?",
        a: "Nein. Die Seiten werden in deinem Browser angezeigt und neu aufgebaut. Es gibt keinen Server, der deine Datei empfängt.",
      },
    ],
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  {
    slug: "metadaten-aus-pdf-und-foto-entfernen",
    topic: "metadata",
    tool: "dossier",
    title: "Metadaten und versteckte Daten aus einem PDF oder Foto entfernen, bevor du es verschickst",
    metaTitle: "Metadaten aus PDF oder Foto entfernen, ohne Upload",
    description:
      "Ein PDF oder Foto enthält mehr, als du siehst: Autor, Datumsangaben, versteckten Text, GPS-Standort. Entferne alles vor dem Versand, im Browser, ohne Upload.",
    intro:
      "Die Datei, die du verschickst, verrät mehr, als die Seite zeigt. Ein PDF kann seinen Autor und das Programm nennen, mit dem es erstellt wurde, und Text behalten, den du für gelöscht hieltest. Ein Foto kann genau sagen, wo es aufgenommen wurde. Hier steht, was in einer Datei steckt und wie du eine saubere Kopie verschickst.",
    example: "Schadensmeldung, Versicherung Klarbach, 18.11.2026",
    body: [
      { type: "h2", text: "Was eine Datei mitbringt, ohne es dir zu sagen" },
      {
        type: "list",
        items: [
          "In einem PDF: der Name des Autors, der Titel, das verwendete Programm, das Datum der Erstellung und der letzten Änderung.",
          "Ebenfalls in einem PDF: eine Ebene mit markierbarem Text, Kommentare, Links, angehängte Dateien, Formulardaten und manchmal Text, der unter einem schwarzen Balken liegt.",
          "In einem Foto: das Datum, die Marke des Handys und sehr oft der GPS-Standort des Ortes, an dem es aufgenommen wurde.",
        ],
      },
      {
        type: "p",
        text: "Nichts davon sieht man, wenn man die Seite ansieht. Alles davon kann der Empfänger mit ein paar Klicks auslesen, und ebenso jeder, an den die Datei weitergeleitet wird.",
      },
      { type: "h2", text: "Eine saubere Kopie mit Cachety erstellen" },
      {
        type: "steps",
        items: [
          `Öffne ${TOOL} im Browser. Ein Konto brauchst du nicht.`,
          "Füge dein PDF oder deine Fotos hinzu.",
          "Geh zu den Seiten und prüf, ob die Reihenfolge stimmt. Entferne die Seiten, die du nicht verschicken willst.",
          "Wähle als Ergebnis ein einziges PDF und lade es herunter.",
          "Verschick die neue Datei, nicht das Original.",
        ],
      },
      { type: "h2", text: "Wie das Bereinigen funktioniert" },
      {
        type: "p",
        text: "Cachety versucht nicht, jede versteckte Angabe einzeln zu finden und zu löschen. Es baut jede Seite als Bild dessen neu auf, was du siehst, und macht aus diesen Bildern ein neues PDF. Was auf der Seite nicht sichtbar war, steht nicht in der neuen Datei: kein Autor, kein versteckter Text, kein Anhang, kein Skript, kein Link, kein GPS-Standort.",
      },
      {
        type: "tip",
        text: "So prüfst du eine Datei: Öffne in deinem PDF-Programm die Eigenschaften und versuch, auf einer Seite Text zu markieren. Bei einer Kopie aus Cachety sind die Eigenschaften leer, und nichts lässt sich markieren.",
      },
      { type: "h2", text: "Der Preis dafür" },
      { type: "p", text: PIXELS },
      {
        type: "warning",
        text: "Das Bereinigen entfernt, was versteckt ist, nicht, was auf der Seite gedruckt steht. Ein Name, eine Kontonummer oder ein Barcode, den man sehen kann, ist weiter da. Schwärze so etwas vor dem Download: Der geschwärzte Bereich wird wirklich entfernt.",
      },
      { type: "h2", text: "Deine Datei wird zum Bereinigen nicht hochgeladen" },
      { type: "p", text: NOT_UPLOADED },
    ],
    faq: [
      {
        q: "Wird der GPS-Standort aus meinen Fotos entfernt?",
        a: "Ja. Die Seite wird als neues Bild in einem PDF aufgebaut, und die versteckten Angaben des Fotos, auch der Standort, werden nicht übernommen.",
      },
      {
        q: "Wird der Name des Autors aus einem PDF entfernt?",
        a: "Ja. Das neue PDF entsteht aus Bildern der Seiten und übernimmt die Eigenschaften der Originaldatei nicht.",
      },
      {
        q: "Kann ich den Text markierbar lassen und nur die Metadaten entfernen?",
        a: "Nicht mit Cachety. Es entfernt alle versteckten Daten, indem es die Seiten als Bilder neu aufbaut. Soll der Text markierbar bleiben, nutze in einem PDF-Programm auf deinem Computer die Funktion zum Entfernen versteckter Informationen.",
      },
      {
        q: "Ist das Ergebnis ein PDF oder ein Foto?",
        a: "Ein PDF. Ein Foto wird zu einer Seite des PDFs.",
      },
    ],
    updated: UPDATED,
  },
];
