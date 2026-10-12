import type { Comparison } from "./types";

// Vergleiche auf Deutsch (Deutschland zuerst, lesbar in Österreich und der
// Schweiz). Vergleichende Werbung: Jede Aussage über ein anderes Tool stammt
// von dessen eigenen öffentlichen Seiten (Feld `sources`), geprüft am
// 2026-10-12. Was dort nicht steht, wird so benannt („nicht dokumentiert“).
// Keine Preise in Euro, weil sie sich oft ändern. Nur reiner Text.

const CHECKED = "2026-10-12";
const UPDATED = "2026-10-12";

// Cachety-Zellen, die sich wiederholen (geprüftes Datenblatt).
const C = {
  where: "Auf deinem eigenen Gerät, im Browser. Die Datei wird an keinen Server geschickt.",
  retention: "Nichts zu löschen: Cachety bekommt deine Dateien nie.",
  account: "Kein Konto, keine Anmeldung.",
  price: "Kostenlos, ohne Bezahlversion.",
  ads: "Heute keine Werbung, keine Tracker, keine Tracking-Cookies, keine Besucherstatistik.",
  watermark: "Nur Text, diagonal über die ganze Seite wiederholt und mit dem Seitenbild verschmolzen: Mit einem PDF-Editor lässt es sich nicht entfernen.",
  redact: "Ja: Rechteck ziehen, und der Inhalt wird wirklich aus der Datei entfernt.",
  password: "Ja, optionale AES-256-Verschlüsselung des fertigen PDFs.",
  recipients: "Ja: bis zu 20 Empfänger, für jeden eine eigene Version, auf Wunsch mit eindeutiger Referenz.",
  offline: "Ja: Nach dem Laden der Seite funktioniert es im Flugmodus.",
  openSource: "Ja, AGPL-3.0-Lizenz, Code öffentlich.",
  logo: "Nein, nur Text-Wasserzeichen.",
  otherTools: "Nein: nur Wasserzeichen, Schwärzen, Passwort, Zusammenfügen und Dateigröße.",
};

const HOW_TO: { type: "steps"; items: string[] } = {
  type: "steps",
  items: [
    "Öffne cachety.com im Browser, auf dem Handy oder am Computer. Nichts zu installieren.",
    "Leg deinen Ausweis, deine Gehaltsabrechnung oder deinen Kontoauszug ab. Mehrere Dateien auf einmal gehen auch.",
    "Gib an, wofür die Kopie ist und wer sie bekommt, zum Beispiel: Mietbewerbung, Hausverwaltung Lindner. Das Datum kommt automatisch dazu.",
    "Schwärze bei Bedarf mit „Etwas schwärzen“, was der Empfänger nicht sehen muss, und hak „Mit Passwort schützen“ an, wenn du willst.",
    "Lade die Kopie mit Wasserzeichen herunter und schick diese, nie das Original.",
  ],
};

const AIRPLANE_TIP = {
  type: "tip" as const,
  text: "Der Flugmodus-Test: Öffne Cachety, schalte den Flugmodus ein und leg dein Dokument ab. Wird das Wasserzeichen trotzdem gesetzt, hat nichts dein Gerät verlassen. Ein Tool, das Dateien hochlädt, funktioniert offline nicht.",
};

export const COMPARISONS_DE: Comparison[] = [
  // ───────────────────────────── PDF24 ─────────────────────────────
  {
    slug: "cachety-vs-pdf24",
    competitor: "pdf24",
    competitorName: "PDF24",
    competitorUrl: "https://tools.pdf24.org/de/",
    title: "Cachety oder PDF24: Wasserzeichen auf die Ausweiskopie, aber wo?",
    metaTitle: "PDF24 Wasserzeichen: Alternative ohne Upload",
    description:
      "PDF24 setzt Wasserzeichen auf seinen Servern und löscht Dateien nach einer Stunde. Cachety arbeitet auf deinem Gerät. Ein fairer Vergleich.",
    intro:
      "PDF24 von der Berliner geek Software GmbH ist in Deutschland für viele das PDF-Werkzeug schlechthin: kostenlos, ohne Limits, ohne Anmeldung. Das Online-Wasserzeichen wird allerdings auf den Servern von PDF24 gesetzt. Cachety ist ebenfalls kostenlos, aber deine Datei verlässt nie dein Gerät.",
    verdict:
      "PDF24 ist ein starker, großzügiger Werkzeugkasten, und mit PDF24 Creator für Windows bleiben die Dateien sogar auf deinem PC. Für ein schnelles Wasserzeichen auf die Ausweiskopie, vom Handy oder vom Mac aus, spart Cachety dir den Upload und kommt ohne Werbenetzwerke aus.",
    table: [
      {
        criterion: "Wo die Datei verarbeitet wird",
        cachety: C.where,
        other: "Online-Tool: auf den Servern von PDF24, laut Tool-Seite in Deutschland, laut FAQ in Rechenzentren in der EU. PDF24 Creator für Windows arbeitet auf deinem PC.",
        edge: "cachety",
      },
      {
        criterion: "Wie lange die Datei gespeichert wird",
        cachety: C.retention,
        other: "Automatische Löschung vom Server innerhalb einer Stunde nach der Verarbeitung.",
        edge: "cachety",
      },
      { criterion: "Preis und Grenzen", cachety: C.price, other: "Kostenlos, ohne Limits und ohne Registrierung." },
      {
        criterion: "Werbung und Tracking",
        cachety: C.ads,
        other: "Finanziert über Werbung auf den Webseiten. Die Datenschutzerklärung nennt Google AdSense, Google Analytics und Google Remarketing.",
        edge: "cachety",
      },
      {
        criterion: "Art des Wasserzeichens",
        cachety: C.watermark,
        other: "Text mit Schrift, Größe, Farbe und Transparenz; neun Positionen oder ganze Seite füllen, Winkel und Abstand frei wählbar.",
      },
      {
        criterion: "Schwärzen, Passwort, Metadaten",
        cachety: "Alles auf demselben Bildschirm wie das Wasserzeichen.",
        other: "Als eigene Tools vorhanden: PDF schwärzen, PDF verschlüsseln, Metadaten entfernen.",
      },
      { criterion: "Eine Kopie pro Empfänger", cachety: C.recipients, other: "Im Wasserzeichen-Tool nicht vorhanden.", edge: "cachety" },
      {
        criterion: "Weitere PDF-Tools",
        cachety: C.otherTools,
        other: "Dutzende kostenlose Tools, dazu die kostenlose Desktop-App PDF24 Creator für Windows.",
        edge: "other",
      },
    ],
    body: [
      { type: "h2", text: "Was mit deiner Datei bei PDF24 online passiert" },
      {
        type: "p",
        text: "PDF24 ist da offen: Das Wasserzeichen wird auf Servern gesetzt, die Verarbeitungsserver stehen in der EU, und alle Dateien werden innerhalb einer Stunde gelöscht. Das ist eine klare, faire Regelung eines deutschen Unternehmens. Trotzdem geht eine Kopie deines Ausweises oder deiner Gehaltsabrechnung übers Internet und liegt bis zu einer Stunde auf einem Rechner, den du nicht kontrollierst.",
      },
      {
        type: "p",
        text: "Cachety geht anders vor. Die Seite wird einmal geladen, danach passiert alles in deinem Browser. Dein Dokument wird nirgendwohin geschickt, also muss hinterher auch nichts gelöscht werden.",
      },
      AIRPLANE_TIP,
      { type: "h2", text: "Wo PDF24 besser ist" },
      {
        type: "p",
        text: "PDF24 bietet Dutzende kostenlose Tools ohne Limits, vom Komprimieren übers Umwandeln bis zur Texterkennung. Unter Windows erledigt PDF24 Creator die Arbeit auf deinem eigenen PC, was auch für den Datenschutz eine gute Wahl ist. Cachety kann weder umwandeln noch PDFs bearbeiten und hat keine Desktop-App.",
      },
      { type: "h2", text: "Wo Cachety bei Ausweisdokumenten besser ist" },
      {
        type: "list",
        items: [
          "Läuft auf deinem Gerät mit jedem System, auch auf iPhone, Android und Mac, ohne Installation.",
          "Keine Werbenetzwerke und keine Werbe-Tracker auf der Seite.",
          "Wasserzeichen, Schwärzen, Passwort und Entfernen versteckter Daten in einem Schritt.",
          "Eine Kopie pro Empfänger, praktisch, wenn du dich bei mehreren Hausverwaltungen bewirbst.",
        ],
      },
      { type: "h2", text: "So geht’s mit Cachety" },
      HOW_TO,
    ],
    chooseOther: [
      "Du nutzt Windows und willst eine kostenlose Desktop-App, bei der die Dateien auf deinem PC bleiben.",
      "Du brauchst viele weitere kostenlose PDF-Tools, etwa zum Umwandeln, Komprimieren oder für Texterkennung.",
      "Der Text im PDF soll nach dem Wasserzeichen markierbar bleiben.",
      "Du willst das Wasserzeichen an einer bestimmten Stelle platzieren statt über die ganze Seite.",
    ],
    chooseCachety: [
      "Du willst deinen Ausweis auf dem Handy oder Mac mit Wasserzeichen versehen, ohne ihn hochzuladen.",
      "Du bevorzugst eine Seite ohne Werbenetzwerke und Werbe-Tracker.",
      "Du brauchst Schwärzen, Passwort und eine Kopie pro Empfänger in einem einzigen Tool.",
    ],
    faq: [
      {
        q: "Lädt PDF24 meine Dateien hoch?",
        a: "Bei den Online-Tools ja. PDF24 schreibt, dass die Dateien auf Servern in der EU verarbeitet und innerhalb einer Stunde gelöscht werden. Die Windows-App PDF24 Creator arbeitet dagegen auf deinem PC.",
      },
      {
        q: "Ist PDF24 sicher für die Ausweiskopie?",
        a: "PDF24 ist ein deutsches Unternehmen mit klarer Löschregel. Ob dir das reicht, entscheidest du. Soll dein Ausweis dein Gerät gar nicht erst verlassen, umgeht ein reines Browser-Tool wie Cachety die Frage.",
      },
      {
        q: "Ist PDF24 wirklich kostenlos?",
        a: "Ja. PDF24 sagt, seine Tools seien kostenlos und uneingeschränkt, finanziert über Werbung. Cachety ist ebenfalls kostenlos, heute ohne Werbung und ohne Tracker.",
      },
    ],
    sources: [
      { label: "PDF24: Wasserzeichen einfügen", url: "https://tools.pdf24.org/de/wasserzeichen-einfuegen" },
      { label: "PDF24: FAQ", url: "https://tools.pdf24.org/de/faq" },
      { label: "PDF24: Datenschutzerklärung", url: "https://www.pdf24.org/de/datenschutz" },
      { label: "PDF24: alle Tools", url: "https://tools.pdf24.org/de/alle-tools" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ───────────────────────────── iLovePDF ─────────────────────────────
  {
    slug: "cachety-vs-ilovepdf",
    competitor: "ilovepdf",
    competitorName: "iLovePDF",
    competitorUrl: "https://www.ilovepdf.com/de",
    title: "Cachety oder iLovePDF: Womit versiehst du deinen Ausweis mit Wasserzeichen?",
    metaTitle: "iLovePDF-Alternative für die Ausweiskopie",
    description:
      "iLovePDF lädt dein PDF auf seine Server und löscht es nach zwei Stunden. Cachety setzt das Wasserzeichen auf deinem Gerät. Ein ehrlicher Vergleich.",
    intro:
      "iLovePDF aus Barcelona gehört zu den bekanntesten PDF-Websites, und sein Wasserzeichen-Tool ist schnell und vielseitig. Um einen Ausweis oder eine Gehaltsabrechnung zu bearbeiten, braucht iLovePDF aber eine Kopie der Datei auf seinen Servern. Cachety erledigt dasselbe, ohne dass die Datei dein Handy oder deinen Computer verlässt.",
    verdict:
      "Für ein Logo als Wasserzeichen oder für alltägliche PDF-Aufgaben wie Zusammenfügen, Umwandeln oder Unterschreiben ist iLovePDF der vollständigere Werkzeugkasten. Für Ausweis, Gehaltsabrechnung oder Kontoauszug vermeidet Cachety jeden Upload. Wenn du deinen Ausweis keinem fremden Server anvertrauen willst, ist das der entscheidende Unterschied.",
    table: [
      {
        criterion: "Wo die Datei verarbeitet wird",
        cachety: C.where,
        other: "Auf den Servern von iLovePDF, über eine verschlüsselte HTTPS-Verbindung.",
        edge: "cachety",
      },
      {
        criterion: "Wie lange die Datei gespeichert wird",
        cachety: C.retention,
        other: "Löschung innerhalb von zwei Stunden nach der Verarbeitung, laut Datenschutzerklärung.",
        edge: "cachety",
      },
      {
        criterion: "Preis",
        cachety: C.price,
        other: "Kostenlose Basisversion mit begrenzter Nutzung; das Premium-Abo hebt die Grenzen auf.",
      },
      {
        criterion: "Werbung",
        cachety: C.ads,
        other: "Werbefreiheit ist laut Preisseite eine Premium-Funktion; die Basisversion ist nicht werbefrei.",
        edge: "cachety",
      },
      {
        criterion: "Art des Wasserzeichens",
        cachety: C.watermark,
        other: "Text oder Bild, an gewählter Stelle oder als Mosaik, mit Transparenz und Drehung.",
        edge: "other",
      },
      {
        criterion: "Lässt sich das Wasserzeichen entfernen?",
        cachety: "Nicht einfach: Es ist Teil des Seitenbildes.",
        other: "Nicht dokumentiert. Du wählst, ob es vor oder hinter den Inhalt des PDFs kommt.",
      },
      { criterion: "Schwärzen", cachety: C.redact, other: "Als eigenes Tool „PDF schwärzen“ vorhanden." },
      { criterion: "Eine Kopie pro Empfänger", cachety: C.recipients, other: "Im Wasserzeichen-Tool nicht vorhanden.", edge: "cachety" },
      {
        criterion: "Offline",
        cachety: C.offline,
        other: "Mit der Desktop-App für Windows und Mac, die laut Preisseite ein Premium- oder Business-Abo voraussetzt.",
        edge: "cachety",
      },
      {
        criterion: "Weitere PDF-Tools",
        cachety: C.otherTools,
        other: "Große Auswahl: Zusammenfügen, Teilen, Komprimieren, Umwandeln, Unterschreiben und mehr.",
        edge: "other",
      },
    ],
    body: [
      { type: "h2", text: "Der eigentliche Unterschied: wohin dein Ausweis geht" },
      {
        type: "p",
        text: "Auf der Website von iLovePDF wird deine Datei an die Server geschickt, dort bearbeitet und an dich zurückgegeben. iLovePDF schreibt, dass die Übertragung verschlüsselt ist, die Dateien innerhalb von zwei Stunden gelöscht werden und das Unternehmen nach ISO 27001 zertifiziert ist. Das ist eine vernünftige Regelung. Für diese Zeit liegt eine Kopie deines Ausweises aber auf einem Rechner, den du nicht kontrollierst. Bei Cachety läuft alles in deinem Browser. Das ist kein Versprechen, die Datei schnell zu löschen: Sie wird schlicht nie verschickt.",
      },
      AIRPLANE_TIP,
      { type: "h2", text: "Wo iLovePDF besser ist" },
      {
        type: "p",
        text: "iLovePDF ist ein kompletter PDF-Werkzeugkasten. Zusammenfügen, Komprimieren, nach Word umwandeln, Unterschreiben: All das kann es, Cachety nicht. Das Wasserzeichen-Tool nimmt auch Bilder an, so kann eine Firma ihr Logo auf Dokumente stempeln. Cachety setzt nur Text-Wasserzeichen.",
      },
      { type: "h2", text: "Wo Cachety bei Ausweisdokumenten besser ist" },
      {
        type: "list",
        items: [
          "Die Datei verlässt nie dein Gerät: kein Upload, keine Löschfrist, über die du nachdenken musst.",
          "Das Wasserzeichen ist mit jeder Seite verschmolzen und lässt sich nicht einfach per PDF-Editor löschen.",
          "Schwärzen von IBAN, Steuer-ID oder Foto im selben Schritt.",
          "Eine Kopie pro Hausverwaltung, Arbeitgeber oder Bank, jede mit eigenem Namen.",
          "Versteckte Daten wie Metadaten, GPS-Standort und Textebene werden entfernt.",
        ],
      },
      { type: "h2", text: "So geht’s mit Cachety" },
      HOW_TO,
      {
        type: "p",
        text: "Der Fairness halber: Cachety wandelt jede Seite in ein Bild um, der Text ist danach nicht mehr markierbar oder durchsuchbar. Das ist Absicht, damit sich das Wasserzeichen schwer entfernen lässt, kann die Datei aber größer machen als das Original.",
      },
    ],
    chooseOther: [
      "Du willst ein Logo oder Bild als Wasserzeichen verwenden.",
      "Du musst deine PDFs am selben Ort auch zusammenfügen, komprimieren, umwandeln oder unterschreiben.",
      "Du hast ein Premium-Abo und willst viele Dateien mit der Desktop-App bearbeiten.",
    ],
    chooseCachety: [
      "Du versiehst Ausweis, Reisepass, Gehaltsabrechnung oder Kontoauszug mit Wasserzeichen und willst, dass sie dein Gerät nie verlassen.",
      "Du willst jeder Hausverwaltung oder jedem Arbeitgeber eine eigene, benannte Kopie schicken.",
      "Du willst schwärzen und ein Passwort setzen, alles in einem Schritt.",
      "Du willst ein kostenloses Tool ohne Werbenetzwerke, ohne Konto und ohne Installation.",
    ],
    faq: [
      {
        q: "Ist iLovePDF sicher für Ausweisdokumente?",
        a: "iLovePDF verschlüsselt die Übertragung, löscht Dateien innerhalb von zwei Stunden und ist nach ISO 27001 zertifiziert. Die Frage ist, ob du deinen Ausweis so lange auf fremden Servern haben willst. Wenn nicht, nimm ein Tool, das auf deinem Gerät arbeitet, etwa Cachety.",
      },
      {
        q: "Lädt iLovePDF meine Dateien hoch?",
        a: "Ja, die Website verarbeitet Dateien auf den Servern von iLovePDF. Die Desktop-App für Windows und Mac arbeitet lokal, setzt aber ein Abo voraus.",
      },
      {
        q: "Kann ich mit Cachety ein Logo als Wasserzeichen setzen?",
        a: "Nein. Cachety setzt nur Text-Wasserzeichen. Für ein Logo nimmt das Wasserzeichen-Tool von iLovePDF auch Bilder an.",
      },
    ],
    sources: [
      { label: "iLovePDF: Wasserzeichen in PDF einfügen", url: "https://www.ilovepdf.com/de/pdf_wasserzeichen" },
      { label: "iLovePDF: Datenschutzerklärung", url: "https://www.ilovepdf.com/help/privacy" },
      { label: "iLovePDF: Sicherheit und ISO 27001", url: "https://www.ilovepdf.com/help/security" },
      { label: "iLovePDF: Preise", url: "https://www.ilovepdf.com/pricing" },
      { label: "iLovePDF: PDF schwärzen", url: "https://www.ilovepdf.com/de/schwarzen-pdf" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ───────────────────────────── Smallpdf ─────────────────────────────
  {
    slug: "cachety-vs-smallpdf",
    competitor: "smallpdf",
    competitorName: "Smallpdf",
    competitorUrl: "https://smallpdf.com/de",
    title: "Cachety oder Smallpdf: Wasserzeichen auf deine Dokumente",
    metaTitle: "Smallpdf-Wasserzeichen: Alternative ohne Upload",
    description:
      "Smallpdf lädt dein PDF für das Wasserzeichen auf seine Server. Cachety arbeitet auf deinem Gerät, kostenlos und ohne Konto. Der Vergleich.",
    intro:
      "Smallpdf aus der Schweiz ist eine beliebte, aufgeräumte PDF-Website mit einfachem Wasserzeichen-Tool. Die Seite verspricht, du könntest alles „direkt in deinem Browser“ anpassen. Die eigene FAQ erklärt aber, dass die Dateien hochgeladen und nach einer Stunde von den Servern gelöscht werden. Cachety lässt die Datei von Anfang bis Ende auf deinem Gerät.",
    verdict:
      "Smallpdf ist ein guter Allround-Dienst mit App und vielen Tools, für alltägliche Dokumente eine solide Wahl. Für Personalausweis, Reisepass oder Gehaltsabrechnung vermeidet Cachety den Upload ganz und bringt Funktionen für Ausweisdokumente mit, etwa Schwärzen und eine Kopie pro Empfänger.",
    table: [
      {
        criterion: "Wo die Datei verarbeitet wird",
        cachety: C.where,
        other: "Auf Servern, laut Datenschutzerklärung beim Hoster Hetzner in der EU.",
        edge: "cachety",
      },
      {
        criterion: "Wie lange die Datei gespeichert wird",
        cachety: C.retention,
        other: "Automatische Löschung nach einer Stunde, außer du speicherst die Dateien in einem Konto.",
        edge: "cachety",
      },
      { criterion: "Konto", cachety: C.account, other: "Für das Wasserzeichen-Tool nicht nötig." },
      {
        criterion: "Kostenlose Nutzung",
        cachety: C.price,
        other: "Kostenloser Plan mit begrenzten Downloads (tägliches Download-Limit); Pro hebt die Grenzen auf.",
        edge: "cachety",
      },
      {
        criterion: "Analyse- und Werbe-Tracker",
        cachety: C.ads,
        other: "Die Datenschutzerklärung nennt unter anderem Google Analytics, Hotjar, Google Ads, Facebook Pixel und LinkedIn Insight Tag, teils abhängig von deiner Einwilligung.",
        edge: "cachety",
      },
      {
        criterion: "Art des Wasserzeichens",
        cachety: C.watermark,
        other: "Text mit Schrift, Größe, Farbe und Deckkraft.",
      },
      {
        criterion: "Schwärzen und Passwort",
        cachety: "Schwärzen und optionales Passwort sind eingebaut.",
        other: "Als eigene Tools „PDF schwärzen“ und „PDF verschlüsseln“ vorhanden.",
      },
      { criterion: "Eine Kopie pro Empfänger", cachety: C.recipients, other: "Im Wasserzeichen-Tool nicht vorhanden.", edge: "cachety" },
      {
        criterion: "Apps und weitere Tools",
        cachety: "Nur Web, läuft auf dem Handy. Nur Wasserzeichen und verwandte Aufgaben.",
        other: "Mobile App und mehr als 30 PDF-Tools.",
        edge: "other",
      },
    ],
    body: [
      { type: "h2", text: "„Direkt im Browser“ heißt nicht „auf deinem Gerät“" },
      {
        type: "p",
        text: "Die Wasserzeichen-Seite von Smallpdf lädt dich ein, Text, Schrift und Deckkraft „direkt in deinem Browser“ anzupassen. Das beschreibt, wo du klickst, nicht wo gearbeitet wird. In der FAQ derselben Seite steht, dass Uploads und Downloads per TLS verschlüsselt und alle Dateien nach einer Stunde von den Servern gelöscht werden. Die Datenschutzerklärung ergänzt, dass hochgeladene Dateien vorübergehend auf Servern von Hetzner in der EU liegen.",
      },
      {
        type: "p",
        text: "Bei Cachety finden Klicken und Arbeiten auf deinem Gerät statt. Dein Dokument geht an keinen Server, auch nicht an unseren, denn es gibt keinen Server, der Dateien empfängt.",
      },
      AIRPLANE_TIP,
      { type: "h2", text: "Wo Smallpdf besser ist" },
      {
        type: "p",
        text: "Smallpdf bietet viele Tools, vom Komprimieren übers Umwandeln bis zur elektronischen Unterschrift, dazu eine Mobile App. Wer jeden Tag mit PDFs arbeitet, hat damit alles an einem Ort. Cachety macht nur eine Sache: Dokumente schützen, die du teilst. Text bearbeiten, unterschreiben oder umwandeln kann es nicht.",
      },
      { type: "h2", text: "Wo Cachety bei Ausweisdokumenten besser ist" },
      {
        type: "list",
        items: [
          "Kein Upload, also keine Löschfrist und kein fremder Hoster.",
          "Keine Analyse- oder Werbe-Tracker auf der Seite.",
          "Das Wasserzeichen ist in jede Seite eingezeichnet und wiederholt, Herausschneiden ist schwer.",
          "Schwärzen, Passwort und eine Kopie pro Empfänger auf einem Bildschirm.",
        ],
      },
      { type: "h2", text: "So geht’s mit Cachety" },
      HOW_TO,
    ],
    chooseOther: [
      "Du brauchst einen breiten PDF-Werkzeugkasten an einem Ort, mit Komprimieren, Umwandeln und Unterschreiben.",
      "Du willst lieber eine App als eine Website.",
      "Der Text im PDF soll nach dem Wasserzeichen markierbar bleiben.",
    ],
    chooseCachety: [
      "Du teilst Ausweis, Gehaltsabrechnung oder Kontoauszug und willst nichts hochladen.",
      "Du bevorzugst eine Seite ohne Analyse- und Werbe-Tracker.",
      "Du brauchst eine benannte Kopie pro Empfänger oder willst gleichzeitig schwärzen.",
    ],
    faq: [
      {
        q: "Lädt Smallpdf meine Dateien hoch?",
        a: "Ja. Laut eigener FAQ werden die Dateien verschlüsselt hochgeladen und nach einer Stunde von den Servern gelöscht, außer du speicherst sie in einem Konto.",
      },
      {
        q: "Ist Smallpdf sicher für die Ausweiskopie?",
        a: "Smallpdf nutzt TLS-Verschlüsselung und nennt DSGVO-Konformität und ISO-Zertifizierung. Trotzdem wird dein Ausweis hochgeladen und eine Zeit lang auf Servern gespeichert. Willst du das vermeiden, setzt Cachety das Wasserzeichen auf deinem Gerät.",
      },
      {
        q: "Behält Cachety den Text markierbar?",
        a: "Nein. Jede Seite wird zu einem Bild mit eingezeichnetem Wasserzeichen, das macht es viel schwerer zu entfernen. Brauchst du durchsuchbaren Text, spricht das für ein anderes Tool.",
      },
    ],
    sources: [
      { label: "Smallpdf: Wasserzeichen-PDF und FAQ", url: "https://smallpdf.com/de/pdf-wasserzeichen" },
      { label: "Smallpdf: Datenschutzerklärung", url: "https://smallpdf.com/privacy" },
      { label: "Smallpdf: Preise und Pläne", url: "https://smallpdf.com/de/pricing" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ─────────────────────────── Adobe Acrobat ───────────────────────────
  {
    slug: "cachety-vs-adobe-acrobat",
    competitor: "adobe-acrobat",
    competitorName: "Adobe Acrobat",
    competitorUrl: "https://www.adobe.com/de/acrobat.html",
    title: "Cachety oder Adobe Acrobat: Wasserzeichen ohne Abo",
    metaTitle: "Adobe Acrobat Wasserzeichen: kostenlose Alternative",
    description:
      "Unter den kostenlosen Online-Tools von Adobe gibt es kein Wasserzeichen; das bietet das kostenpflichtige Acrobat. Cachety ist gratis, auf deinem Gerät.",
    intro:
      "Adobe Acrobat ist der Standard für die PDF-Bearbeitung und kann natürlich Wasserzeichen setzen. Unter den kostenlosen Online-Tools von Adobe ist ein Wasserzeichen-Tool aber nicht dabei. Cachety ist ein kostenloser Weg, eine Ausweiskopie mit Wasserzeichen zu versehen, ohne den Browser zu verlassen.",
    verdict:
      "Wenn du Acrobat schon bezahlst oder professionelle PDF-Bearbeitung brauchst, ist Acrobat das stärkere Werkzeug, mit Text- und Bild-Wasserzeichen und vielem mehr. Willst du nur deinen Ausweis oder deine Gehaltsabrechnung vor dem Versand schützen, erledigt Cachety das kostenlos, ohne Konto, und die Datei bleibt auf deinem Gerät.",
    table: [
      {
        criterion: "Kostenloses Wasserzeichen",
        cachety: C.price,
        other: "Unter den kostenlosen Online-Tools nicht aufgeführt. Wasserzeichen gibt es im kostenpflichtigen Acrobat.",
        edge: "cachety",
      },
      { criterion: "Konto", cachety: C.account, other: "Adobe-Konto und Abo.", edge: "cachety" },
      {
        criterion: "Wo die Datei verarbeitet wird",
        cachety: C.where,
        other: "In der Desktop-App auf deinem Computer; bei Acrobat im Web über den Online-Dienst von Adobe.",
      },
      {
        criterion: "Art des Wasserzeichens",
        cachety: C.watermark,
        other: "Text oder Bild, mit Schrift, Größe, Farbe, Deckkraft und Position.",
        edge: "other",
      },
      {
        criterion: "Schwärzen",
        cachety: "Eingebaut, kostenlos.",
        other: "Laut Versionsvergleich eine Funktion von Acrobat Pro.",
        edge: "cachety",
      },
      {
        criterion: "Passwortschutz",
        cachety: C.password,
        other: "Vorhanden, auch als kostenloses Online-Tool „PDF-Dateien schützen“.",
      },
      {
        criterion: "Weitere PDF-Funktionen",
        cachety: C.otherTools,
        other: "Komplette PDF-Bearbeitung, Umwandlung, Texterkennung, Formulare, E-Signaturen und vieles mehr.",
        edge: "other",
      },
      { criterion: "Open Source", cachety: C.openSource, other: "Nein, proprietäre Software." },
    ],
    body: [
      { type: "h2", text: "Kann man mit Adobe kostenlos ein Wasserzeichen setzen?" },
      {
        type: "p",
        text: "Adobe bietet viele kostenlose Online-Tools, darunter PDF bearbeiten, Kombinieren, Komprimieren und PDF-Dateien schützen. Ein Wasserzeichen-Tool ist nicht darunter. Adobe beschreibt das Wasserzeichen als Funktion der Acrobat-Software: Acrobat öffnen, PDF bearbeiten, Wasserzeichen. Wer nach einem kostenlosen Adobe-Wasserzeichen sucht, landet also bei einem kostenpflichtigen Plan.",
      },
      {
        type: "p",
        text: "Für eine einmalige Sache, etwa die Ausweiskopie für die Hausverwaltung, ist ein Abo viel Aufwand. Cachety ist kostenlos und braucht kein Konto.",
      },
      { type: "h2", text: "Wo Acrobat besser ist" },
      {
        type: "p",
        text: "Acrobat ist ein Profi-Werkzeug. Es kann ein Bild oder Logo als Wasserzeichen setzen, den Text eines PDFs bearbeiten, Formulare ausfüllen und unterschreiben lassen, Texterkennung durchführen und vieles mehr. Für ein Büro, das den ganzen Tag mit PDFs arbeitet, spielt es in einer anderen Liga als Cachety, das nur Dokumente vor dem Teilen schützt.",
      },
      { type: "h2", text: "Wo Cachety bei Ausweisdokumenten besser ist" },
      {
        type: "list",
        items: [
          "Kostenlos, ohne Konto, ohne Abo und ohne Testphase, die du kündigen musst.",
          "Deine Datei wird im Browser verarbeitet und nie an einen Server geschickt.",
          "Schwärzen ist enthalten, du kannst IBAN oder Foto verbergen, ohne für Pro zu zahlen.",
          "Eine benannte Kopie pro Empfänger, bis zu 20 auf einmal.",
          "Läuft auf dem Handy, auch mit iPhone-Fotos, ohne Installation.",
        ],
      },
      { type: "h2", text: "So geht’s mit Cachety" },
      HOW_TO,
      AIRPLANE_TIP,
    ],
    chooseOther: [
      "Du bezahlst Acrobat schon und bist daran gewöhnt.",
      "Du brauchst ein Bild- oder Logo-Wasserzeichen oder vollständige PDF-Bearbeitung, Formulare und Texterkennung.",
      "Dein Arbeitgeber schreibt ein kommerzielles Produkt mit Support vor.",
    ],
    chooseCachety: [
      "Du willst nur Ausweis, Gehaltsabrechnung oder Kontoauszug mit Wasserzeichen versehen, kostenlos und ohne Abo.",
      "Deine Datei soll auf deinem Gerät bleiben.",
      "Du willst schwärzen, ohne einen Pro-Plan zu bezahlen.",
    ],
    faq: [
      {
        q: "Kann ich in Adobe Acrobat kostenlos ein Wasserzeichen setzen?",
        a: "In der Liste der kostenlosen Online-Tools von Adobe gibt es kein Wasserzeichen-Tool. Wasserzeichen sind eine Funktion des kostenpflichtigen Acrobat.",
      },
      {
        q: "Was ist eine kostenlose Alternative zu Adobe für die Ausweiskopie?",
        a: "Cachety ist kostenlos und arbeitet im Browser, ohne deine Datei hochzuladen. Es setzt ein Text-Wasserzeichen über die ganze Seite, kann schwärzen und ein Passwort setzen.",
      },
      {
        q: "Kann Cachety ein Logo setzen wie Acrobat?",
        a: "Nein, Cachety setzt nur Text-Wasserzeichen. Brauchst du ein Logo, ist Acrobat oder ein anderes Tool mit Bild-Wasserzeichen die bessere Wahl.",
      },
    ],
    sources: [
      { label: "Adobe: kostenlose Acrobat-Online-Tools", url: "https://www.adobe.com/de/acrobat/online.html" },
      { label: "Adobe: Acrobat-Versionen im Vergleich", url: "https://www.adobe.com/de/acrobat/pricing/compare-versions.html" },
      { label: "Adobe: What is a watermark", url: "https://www.adobe.com/acrobat/resources/what-is-a-watermark.html" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ───────────────────────────── Sejda ─────────────────────────────
  {
    slug: "cachety-vs-sejda",
    competitor: "sejda",
    competitorName: "Sejda",
    competitorUrl: "https://www.sejda.com/de/",
    title: "Cachety oder Sejda: Welches Wasserzeichen-Tool passt zu deinen Dokumenten?",
    metaTitle: "Sejda-Alternative für Wasserzeichen auf dem Ausweis",
    description:
      "Das Web-Tool von Sejda lädt Dateien hoch und löscht sie nach zwei Stunden, Sejda Desktop arbeitet lokal. Cachety arbeitet im Browser. Der Vergleich.",
    intro:
      "Sejda ist ein solides PDF-Tool mit präzisem Wasserzeichen-Editor, inklusive Bild-Wasserzeichen. Die Web-Version lädt deine Dateien auf Sejdas Server; wer lokal arbeiten will, installiert Sejda Desktop. Cachety arbeitet lokal, ohne Installation.",
    verdict:
      "Für exakt platzierte Text- oder Logo-Wasserzeichen und Stapelverarbeitung ist Sejda stark. Für die Ausweiskopie vom Handy aus, ohne Upload und ohne Stundenlimit, ist Cachety der einfachere Weg.",
    table: [
      {
        criterion: "Wo die Datei verarbeitet wird",
        cachety: C.where,
        other: "Web-Version: auf Sejdas Servern. Sejda Desktop: auf deinem Computer, ohne Upload.",
        edge: "cachety",
      },
      {
        criterion: "Wie lange die Datei gespeichert wird",
        cachety: C.retention,
        other: "Automatische Löschung nach zwei Stunden.",
        edge: "cachety",
      },
      {
        criterion: "Kostenlose Nutzung",
        cachety: C.price,
        other: "Kostenlos mit Grenzen: 3 Aufgaben pro Stunde, 50 Seiten und 50 MB pro Datei. Bezahlpässe heben die Grenzen auf.",
        edge: "cachety",
      },
      { criterion: "Konto", cachety: C.account, other: "Für die kostenlose Nutzung nicht nötig." },
      {
        criterion: "Art des Wasserzeichens",
        cachety: C.watermark,
        other: "Text oder Bild (PNG, JPG, GIF, SVG), frei positionierbar per Ziehen oder Koordinaten, mit Deckkraft und Seitenbereich.",
        edge: "other",
      },
      { criterion: "Eine Kopie pro Empfänger", cachety: C.recipients, other: "Im Wasserzeichen-Tool nicht vorhanden.", edge: "cachety" },
      { criterion: "Offline", cachety: C.offline, other: "Mit Sejda Desktop." },
      {
        criterion: "Stapelverarbeitung und Vorlagen",
        cachety: "Mehrere Dateien auf einmal; keine gespeicherten Wasserzeichen-Vorlagen.",
        other: "Stapelverarbeitung und speicherbare Wasserzeichen-Vorlagen.",
        edge: "other",
      },
    ],
    body: [
      { type: "h2", text: "Web oder Desktop: zwei verschiedene Wege bei Sejda" },
      {
        type: "p",
        text: "Sejda bietet zwei Versionen. Die Web-Version schickt deine Dateien an Sejdas Server und löscht sie nach zwei Stunden. Sejda Desktop ist ein Programm für den Computer, das Dokumente dort verarbeitet, ohne sie hochzuladen. Wer Sejda für einen Ausweis nutzen will, ist mit der Desktop-Version auf der sicheren Seite, muss sie aber installieren.",
      },
      {
        type: "p",
        text: "Cachety verbindet beides: Es läuft im Browser, auch auf dem Handy, und die Datei verlässt trotzdem nie dein Gerät.",
      },
      AIRPLANE_TIP,
      { type: "h2", text: "Wo Sejda besser ist" },
      {
        type: "list",
        items: [
          "Bild-Wasserzeichen, etwa ein Firmenlogo.",
          "Exakte Platzierung per Ziehen oder Koordinaten, nur auf bestimmten Seiten.",
          "Gespeicherte Vorlagen und Stapelverarbeitung für viele Dokumente.",
        ],
      },
      { type: "h2", text: "Wo Cachety bei persönlichen Dokumenten besser ist" },
      {
        type: "list",
        items: [
          "Kein Upload und keine Installation, auch auf iPhone und Android.",
          "Keine Stunden- oder Seitenlimits.",
          "Schwärzen, Passwort und eine Kopie pro Empfänger in einem Schritt.",
          "Versteckte Daten wie Metadaten und GPS-Standort werden entfernt.",
        ],
      },
      { type: "h2", text: "So geht’s mit Cachety" },
      HOW_TO,
    ],
    chooseOther: [
      "Du willst ein Logo als Wasserzeichen, exakt platziert.",
      "Du bearbeitest regelmäßig viele Dokumente mit derselben gespeicherten Vorlage.",
      "Du arbeitest lieber mit einem installierten Desktop-Programm.",
    ],
    chooseCachety: [
      "Du willst deine Ausweiskopie ohne Upload und ohne Installation schützen, auch vom Handy aus.",
      "Du willst keine Stundenlimits.",
      "Du brauchst Schwärzen, Passwort und eine eigene Kopie pro Empfänger.",
    ],
    faq: [
      {
        q: "Lädt Sejda meine Dateien hoch?",
        a: "Die Web-Version ja, die Dateien werden nach zwei Stunden gelöscht. Sejda Desktop verarbeitet sie auf deinem Computer.",
      },
      {
        q: "Ist Sejda kostenlos?",
        a: "Ja, mit Grenzen: 3 Aufgaben pro Stunde, 50 Seiten und 50 MB pro Datei. Für mehr gibt es Bezahlpässe. Cachety ist kostenlos, ohne Bezahlversion.",
      },
      {
        q: "Kann Cachety Wasserzeichen an eine bestimmte Stelle setzen?",
        a: "Nein. Cachety wiederholt den Text diagonal über die ganze Seite, damit er sich nicht herausschneiden lässt. Für ein gezielt platziertes Wasserzeichen ist Sejda besser.",
      },
    ],
    sources: [
      { label: "Sejda: Wasserzeichen-Tool", url: "https://www.sejda.com/de/watermark-pdf" },
      { label: "Sejda: Preise und Desktop", url: "https://www.sejda.com/pricing" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ───────────────────────────── Watermarkly ─────────────────────────────
  {
    slug: "cachety-vs-watermarkly",
    competitor: "watermarkly",
    competitorName: "Watermarkly",
    competitorUrl: "https://watermarkly.com/de/",
    title: "Cachety oder Watermarkly: zwei Tools, die nichts hochladen",
    metaTitle: "Watermarkly oder Cachety: Was passt zum Ausweis?",
    description:
      "Watermarkly und Cachety arbeiten im Browser, ohne Upload. Worin sie sich bei Fotos, Logos und Ausweisdokumenten unterscheiden, im Überblick.",
    intro:
      "Watermarkly aus Warschau verarbeitet Dateien wie Cachety direkt auf deinem Gerät. Beide sind also gute Optionen, wenn du nichts hochladen willst. Der Unterschied liegt darin, wofür sie gebaut sind.",
    verdict:
      "Watermarkly ist für Fotografen und Marken gemacht: Logos, viele Effekte, große Fotostapel und Apps. Cachety ist für persönliche Dokumente gemacht: schwärzen, Passwort, eine Kopie pro Empfänger und offener Code. Für die Ausweiskopie bringt Cachety mehr passende Funktionen mit, für das Logo auf deinen Fotos Watermarkly.",
    table: [
      {
        criterion: "Wo die Datei verarbeitet wird",
        cachety: C.where,
        other: "Auf deinem Gerät: Laut Datenschutzerklärung werden Dateien im Browser verarbeitet und nicht übers Internet geschickt.",
      },
      { criterion: "Konto", cachety: C.account, other: "Keine Registrierung nötig." },
      {
        criterion: "Kostenlose Version",
        cachety: C.price,
        other: "Kostenlos ohne Grenzen bei Anzahl, Größe und Seiten, aber mit einem kleinen Watermarkly-Logo unten auf den PDF-Seiten. Dazu gibt es Bezahlversionen.",
        edge: "cachety",
      },
      {
        criterion: "Tracking",
        cachety: C.ads,
        other: "Misst Besuche mit Google Analytics, laut Datenschutzerklärung.",
        edge: "cachety",
      },
      {
        criterion: "Art des Wasserzeichens",
        cachety: C.watermark,
        other: "Text und Logo, mit Schrift, Farbe, Transparenz, über 30 Effekten und Kachelung über das ganze Dokument.",
      },
      { criterion: "Logo als Wasserzeichen", cachety: C.logo, other: "Ja.", edge: "other" },
      {
        criterion: "Schwärzen und Passwort",
        cachety: "Ja, beides.",
        other: "Auf der Wasserzeichen-Seite für PDFs nicht zu finden.",
        edge: "cachety",
      },
      { criterion: "Eine Kopie pro Empfänger", cachety: C.recipients, other: "Nicht dokumentiert.", edge: "cachety" },
      {
        criterion: "Apps",
        cachety: "Website, die sich auf den Startbildschirm legen lässt. Keine Desktop-App.",
        other: "Apps für Windows, Mac, Linux, iOS und Android.",
        edge: "other",
      },
      { criterion: "Open Source", cachety: C.openSource, other: "Nicht angegeben.", edge: "cachety" },
    ],
    body: [
      { type: "h2", text: "Beide arbeiten auf deinem Gerät" },
      {
        type: "p",
        text: "Nicht jede Wasserzeichen-Website lädt deine Dateien hoch. Watermarkly schreibt, dass jedes Dokument direkt auf deinem Gerät verarbeitet wird. Cachety macht es genauso. In beiden Fällen landet dein Dokument auf keinem Server.",
      },
      {
        type: "p",
        text: "Ein Unterschied: Der Code von Cachety ist öffentlich, jeder kann nachprüfen, was er tut. Und die Seite blockiert technisch jedes Senden von Daten an andere Websites. Den Flugmodus-Test kannst du mit beiden Tools machen.",
      },
      { type: "h2", text: "Wo Watermarkly besser ist" },
      {
        type: "list",
        items: [
          "Logos und viele Gestaltungsmöglichkeiten fürs Wasserzeichen.",
          "Große Stapel von Fotos, vor allem mit den Apps.",
          "Apps für alle gängigen Systeme.",
        ],
      },
      { type: "h2", text: "Wo Cachety bei persönlichen Dokumenten besser ist" },
      {
        type: "list",
        items: [
          "Schwärzen, etwa einer IBAN, und das Geschwärzte verschwindet aus der Datei.",
          "Passwortschutz für das PDF.",
          "Eine Version pro Empfänger mit eindeutiger Referenz, damit du weißt, woher eine Kopie stammt.",
          "Kein fremdes Logo auf deinen Seiten, und keine Besucherstatistik.",
        ],
      },
      { type: "h2", text: "So geht’s mit Cachety" },
      HOW_TO,
      AIRPLANE_TIP,
    ],
    chooseOther: [
      "Du willst dein Logo auf Fotos setzen.",
      "Du musst Hunderte oder Tausende Fotos auf einmal bearbeiten.",
      "Du bevorzugst eine installierte App auf dem Computer oder Handy.",
    ],
    chooseCachety: [
      "Du schützt deine Ausweiskopie oder Gehaltsabrechnungen und willst schwärzen und ein Passwort setzen.",
      "Du willst für jeden Empfänger eine eigene Kopie.",
      "Du willst ein Open-Source-Tool ohne Besucherstatistik und ohne fremdes Logo auf deinen Seiten.",
    ],
    faq: [
      {
        q: "Lädt Watermarkly meine Dateien hoch?",
        a: "Laut Website und Datenschutzerklärung nein: Die Dateien werden im Browser auf deinem Gerät verarbeitet.",
      },
      {
        q: "Ist Watermarkly kostenlos?",
        a: "Es gibt eine kostenlose Version, die ein kleines Watermarkly-Logo unten auf die PDF-Seiten setzt, und Bezahlversionen. Cachety ist kostenlos, ohne Bezahlversion und ohne fremdes Logo.",
      },
      {
        q: "Was ist besser für den Ausweis, Watermarkly oder Cachety?",
        a: "Beide arbeiten ohne Upload. Cachety bringt Funktionen für Ausweisdokumente mit: schwärzen, Passwort und eine Kopie pro Empfänger.",
      },
    ],
    sources: [
      { label: "Watermarkly: Wasserzeichen auf PDF", url: "https://watermarkly.com/de/watermark-pdf/" },
      { label: "Watermarkly: Datenschutzerklärung", url: "https://watermarkly.com/privacy/" },
      { label: "Watermarkly: Startseite und Apps", url: "https://watermarkly.com/" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ─────────────────────────── Meine Ausweiskopie ───────────────────────────
  {
    slug: "cachety-vs-meine-ausweiskopie",
    competitor: "meine-ausweiskopie",
    competitorName: "Meine Ausweiskopie",
    competitorUrl: "https://github.com/Varbin/ausweiskopie",
    title: "Cachety oder „Meine Ausweiskopie“: zwei offene Tools für die Ausweiskopie",
    metaTitle: "„Meine Ausweiskopie“ oder Cachety: der Vergleich",
    description:
      "„Meine Ausweiskopie“ ist eine Open-Source-Desktop-App für deutsche Ausweise, Cachety läuft im Browser. Beide arbeiten offline. Die Unterschiede.",
    intro:
      "„Meine Ausweiskopie“ ist ein kleines Open-Source-Programm eines unabhängigen Entwicklers, gemacht genau für eine Aufgabe: Kopien deutscher Ausweise mit Wasserzeichen zu versehen und unnötige Felder zu schwärzen. Wie Cachety arbeitet es lokal. Der Unterschied liegt im Wie und im Wofür.",
    verdict:
      "Beide nehmen den Datenschutz ernst und lassen deinen Ausweis auf deinem Gerät. „Meine Ausweiskopie“ kennt den Aufbau deutscher Ausweise und Reisepässe und ist als Desktop-Programm für Windows, macOS und Linux gedacht. Cachety läuft ohne Installation im Browser, auch auf dem Handy, und schützt außer Ausweisen auch PDFs wie Gehaltsabrechnungen und Kontoauszüge.",
    table: [
      {
        criterion: "Wo die Datei verarbeitet wird",
        cachety: C.where,
        other: "Lokal auf deinem Computer, als Desktop-Programm.",
      },
      {
        criterion: "Installation",
        cachety: "Keine: Website öffnen, fertig. Auf Wunsch auf den Startbildschirm legen.",
        other: "Programm für Windows und macOS (ohne Installation lauffähig), unter Linux über Flatpak, oder über Python.",
        edge: "cachety",
      },
      {
        criterion: "Handy",
        cachety: "Ja, iPhone und Android, auch HEIC-Fotos.",
        other: "Nein, nur Desktop.",
        edge: "cachety",
      },
      {
        criterion: "Unterstützte Dokumente",
        cachety: "Beliebige PDFs und Bilder: Ausweis, Gehaltsabrechnung, Kontoauszug, Steuerbescheid…",
        other: "Deutscher Personalausweis (drei Versionen), vorläufiger Personalausweis und Reisepass.",
        edge: "cachety",
      },
      {
        criterion: "Schwärzen",
        cachety: "Freihändig: Du ziehst Rechtecke, wo du willst.",
        other: "Auf deutsche Ausweise zugeschnitten, etwa für Ausweisnummer und Zugangsnummer (CAN).",
      },
      { criterion: "Preis", cachety: C.price, other: "Kostenlos, Open Source." },
      { criterion: "Open Source", cachety: C.openSource, other: "Ja, MPL-2.0-Lizenz, Code auf GitHub." },
      { criterion: "Passwort und eine Kopie pro Empfänger", cachety: "Ja, beides.", other: "Nicht dokumentiert.", edge: "cachety" },
    ],
    body: [
      { type: "h2", text: "Zwei Tools mit derselben Haltung" },
      {
        type: "p",
        text: "„Meine Ausweiskopie“ beruft sich ausdrücklich auf § 20 des Personalausweisgesetzes: Die Kopie muss eindeutig und dauerhaft als Kopie erkennbar sein. Das Programm setzt ein Wasserzeichen und lässt dich Felder schwärzen, die der Empfänger nicht braucht, etwa Ausweisnummer oder Zugangsnummer. Cachety verfolgt dasselbe Ziel. Beide sind kostenlos, beide sind Open Source, und bei beiden bleibt dein Ausweis auf deinem Gerät.",
      },
      { type: "h2", text: "Wo „Meine Ausweiskopie“ besser ist" },
      {
        type: "list",
        items: [
          "Es ist auf deutsche Ausweise und Reisepässe zugeschnitten.",
          "Als Desktop-Programm brauchst du dafür nicht einmal einen Browser.",
        ],
      },
      { type: "h2", text: "Wo Cachety besser ist" },
      {
        type: "list",
        items: [
          "Keine Installation: Es läuft in jedem aktuellen Browser, auch auf iPhone und Android.",
          "Nicht nur Ausweise: auch mehrseitige PDFs wie Gehaltsabrechnungen, Kontoauszüge oder Steuerbescheide.",
          "Passwort, eine Kopie pro Empfänger mit eindeutiger Referenz, maximale Dateigröße für Upload-Portale.",
          "Versteckte Daten wie Metadaten und GPS-Standort werden entfernt.",
        ],
      },
      { type: "h2", text: "So geht’s mit Cachety" },
      HOW_TO,
      AIRPLANE_TIP,
    ],
    chooseOther: [
      "Du willst ein Desktop-Programm, das genau auf die Felder deutscher Ausweise und Reisepässe zugeschnitten ist.",
      "Du arbeitest unter Linux und installierst Programme gern über Flatpak.",
    ],
    chooseCachety: [
      "Du willst am Handy arbeiten oder nichts installieren.",
      "Du musst außer dem Ausweis auch Gehaltsabrechnungen, Kontoauszüge oder andere PDFs schützen.",
      "Du brauchst ein Passwort oder eine eigene Kopie pro Empfänger.",
    ],
    faq: [
      {
        q: "Lädt „Meine Ausweiskopie“ meinen Ausweis hoch?",
        a: "Nein. Es ist ein Desktop-Programm, das auf deinem Computer arbeitet.",
      },
      {
        q: "Funktioniert „Meine Ausweiskopie“ auf dem Handy?",
        a: "Nein, es gibt Versionen für Windows, macOS und Linux. Auf dem Handy kannst du Cachety im Browser nutzen.",
      },
      {
        q: "Welche Felder sollte ich auf der Ausweiskopie schwärzen?",
        a: "Vor allem die Zugangsnummer (CAN) und die Seriennummer, wenn der Empfänger sie nicht braucht. Das geht mit beiden Tools.",
      },
    ],
    sources: [
      { label: "Ausweiskopie: Quellcode und Anleitung (GitHub)", url: "https://github.com/Varbin/ausweiskopie" },
      { label: "Meine Ausweiskopie auf Flathub", url: "https://flathub.org/apps/in.varb.Ausweiskopie" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },
];
