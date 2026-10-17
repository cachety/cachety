import type { Comparison } from "../types";

// Comparatifs de l'outil de signature (de). Même règle éditoriale que les
// comparatifs du filigrane (lib/compare/types.ts) ; chaque entrée porte tool: "sign".
//
// Vergleiche des Unterschrift-Tools auf Deutsch. Jede Aussage über ein anderes
// Tool stammt von dessen eigenen öffentlichen Seiten (Feld `sources`), geprüft
// am 2026-10-17. Keine Preise. Nichts über die Ausgabe der anderen Tools
// (abgeflacht oder nicht), weil es dort nicht dokumentiert ist. Französische
// Rechtsprechung wird nicht als deutsches Recht dargestellt. Nur reiner Text.

const CHECKED = "2026-10-17";
const UPDATED = "2026-10-17";

// Cachety-Zellen, die sich wiederholen (geprüftes Datenblatt).
const C = {
  where: "Auf deinem eigenen Gerät, im Browser. Das Dokument wird an keinen Server geschickt.",
  account: "Kein Konto, keine Anmeldung.",
  price: "Kostenlos, ohne Bezahlversion.",
  level:
    "Ein Bild deiner Unterschrift auf der Seite, üblicherweise „einfache“ elektronische Signatur genannt. Kein Zertifikat, kein Zeitstempel.",
  audit:
    "Nein: kein Prüfprotokoll und kein Abschlusszertifikat. Nach dem Download zeigt Cachety einen SHA-256-Fingerabdruck der Datei, den du aufbewahren kannst.",
  sending: "Nein: Du unterschreibst selbst. Kein Versand zur Unterschrift, keine Reihenfolge, nur eine unterzeichnende Person.",
  identity: "Keine Identitätsprüfung.",
  retention: "Nichts gespeichert: Die Unterschrift existiert nur im Speicher des Tabs, das Dokument verlässt dein Gerät nicht.",
  ads: "Keine Werbung, keine Tracker.",
  fields: "Unterschrift zeichnen, tippen oder als Foto importieren (Hintergrund wird entfernt). Optional Datum, Ort und Vermerk darunter, Kürzel auf jeder Seite, Wasserzeichen.",
};

const LEGAL = {
  type: "p" as const,
  text: "Ein Bild deiner Unterschrift auf dem Dokument, wie Cachety es erzeugt, nennt man üblicherweise eine einfache elektronische Signatur. In der EU darf einer elektronischen Signatur die Rechtswirkung nicht allein deshalb abgesprochen werden, weil sie elektronisch ist (eIDAS-Verordnung, Artikel 25). Ein solches Bild zählt, wenn niemand es bestreitet, hat aber wenig Gewicht, wenn es bestritten wird. Nur bei einer qualifizierten Signatur, erstellt mit einem Zertifikat eines qualifizierten Anbieters, wird die Zuverlässigkeit vermutet, und nur sie steht einer handschriftlichen Unterschrift gleich.",
};

const WHEN_NOT = {
  type: "warning" as const,
  text: "Nimm Cachety nicht, wenn eine fortgeschrittene oder qualifizierte Signatur verlangt ist, wenn mehrere Personen unterschreiben sollen oder ein Prüfprotokoll nötig ist, wenn das Gesetz einen eigenhändig geschriebenen Vermerk verlangt (Bürgschaft, Schuldschein), für ein Testament oder eine notarielle Urkunde, oder wenn die andere Seite eine bestimmte Plattform vorgibt.",
};

const HOW_TO: { type: "steps"; items: string[] } = {
  type: "steps",
  items: [
    "Öffne cachety.com/de/sign im Browser, am Computer oder auf dem Handy. Nichts zu installieren, kein Konto.",
    "Leg dein PDF oder ein Foto des Dokuments ab (JPG, PNG, HEIC). Mehrere Dokumente auf einmal gehen auch; ein Foto wird zu einer Seite im A4-Format.",
    "Zeichne deine Unterschrift mit dem Finger oder der Maus, tippe deinen Namen oder importiere ein Foto deiner Unterschrift. Datum, Ort und ein Vermerk darunter sind optional.",
    "Zieh die Unterschrift an ihren Platz. Bei Bedarf jede Seite abzeichnen, ein Wasserzeichen hinzufügen oder ein Passwort setzen.",
    "Lade das unterschriebene PDF herunter und bewahre den angezeigten Fingerabdruck der Datei auf.",
  ],
};

const AIRPLANE_TIP = {
  type: "tip" as const,
  text: "Der Flugmodus-Test: Öffne cachety.com/de/sign, schalte den Flugmodus ein und unterschreib dein Dokument. Funktioniert alles weiter, hat nichts dein Gerät verlassen. Ein Dienst, der Dokumente hochlädt, kann das ohne Verbindung nicht.",
};

export const SIGN_COMPARISONS_DE: Comparison[] = [
  // ───────────────────────────── DocuSign ─────────────────────────────
  {
    tool: "sign",
    slug: "cachety-vs-docusign",
    competitor: "docusign",
    competitorName: "DocuSign",
    competitorUrl: "https://www.docusign.com/",
    title: "Cachety oder DocuSign: selbst unterschreiben oder zur Unterschrift schicken?",
    metaTitle: "DocuSign oder Cachety: PDF selbst unterschreiben",
    description:
      "DocuSign verschickt Verträge zur Unterschrift, mit Abschlusszertifikat. Cachety unterschreibt dein PDF auf deinem Gerät, ohne Konto. Ein fairer Vergleich.",
    intro:
      "DocuSign ist eine der bekanntesten Plattformen für elektronische Signaturen: Du lädst einen Vertrag hoch, schickst ihn an andere zur Unterschrift und bekommst am Ende ein Abschlusszertifikat. Cachety macht etwas viel Kleineres: Du unterschreibst ein Dokument selbst, im Browser, und es verlässt dein Gerät nicht.",
    verdict:
      "Für Verträge mit mehreren Unterzeichnenden, ein Prüfprotokoll, eine Identitätsprüfung oder eine fortgeschrittene oder qualifizierte Signatur ist DocuSign die bessere Wahl. Cachety ist für den Alltag gedacht: ein Formular, eine Bescheinigung oder ein Angebot, das du selbst unterschreibst und zurückschickst, ohne Konto und ohne Upload. Das Ergebnis ist ein Bild deiner Unterschrift auf einem abgeflachten PDF, also eine einfache elektronische Signatur.",
    table: [
      {
        criterion: "Wo das Dokument verarbeitet wird",
        cachety: C.where,
        other: "In der Cloud von DocuSign, in einer von fünf Rechenzentrumsregionen: USA, Kanada, Europa, Australien oder Japan.",
        edge: "cachety",
      },
      {
        criterion: "Konto und kostenlose Nutzung",
        cachety: "Kein Konto, kostenlos, ohne Bezahlversion.",
        other: "Zum Versenden ein Abo (Personal, Standard, Business Pro, Advanced) nach einer 30-tägigen kostenlosen Testphase; Personal umfasst 5 Umschläge im Monat. Empfänger unterschreiben kostenlos und ohne Konto.",
        edge: "cachety",
      },
      {
        criterion: "Signaturniveau",
        cachety: C.level,
        other: "Dokumente werden mit einer Public-Key-Infrastruktur (PKI) digital versiegelt. Fortgeschrittene Signatur verfügbar, qualifizierte Signatur als Zusatzoption; DocuSign ist in Europa qualifizierter Vertrauensdiensteanbieter.",
        edge: "other",
      },
      {
        criterion: "Prüfprotokoll und Zertifikat",
        cachety: C.audit,
        other: "Abschlusszertifikat und Prüfprotokoll in allen Tarifen.",
        edge: "other",
      },
      {
        criterion: "An andere zur Unterschrift schicken",
        cachety: C.sending,
        other: "Ja: mehrere Unterzeichnende nacheinander, parallel oder gemischt, automatische Erinnerungen, Vorlagen, Massenversand.",
        edge: "other",
      },
      {
        criterion: "Identitätsprüfung",
        cachety: C.identity,
        other: "Einmalcode per SMS, Prüfung per Telefon oder anhand eines amtlichen Ausweises.",
        edge: "other",
      },
      {
        criterion: "Aufbewahrung",
        cachety: C.retention,
        other: "Die Aufbewahrungsdauer legt der Kunde fest; Dokumente lassen sich jederzeit löschen.",
      },
      {
        criterion: "Felder, Sprachen, Anbindungen",
        cachety: C.fields,
        other: "Initialen, Textfelder, Kontrollkästchen, Optionsfelder, Auswahllisten; Unterschreiben in 44 Sprachen, über 1.100 Integrationen, APIs, Apps für iOS und Android.",
        edge: "other",
      },
    ],
    body: [
      { type: "h2", text: "Zwei verschiedene Werkzeuge" },
      {
        type: "p",
        text: "DocuSign ist für Abläufe gebaut, bei denen andere unterschreiben: Du lädst den Vertrag hoch, legst fest, wer wo und in welcher Reihenfolge unterschreibt, und DocuSign verschickt ihn, erinnert und sammelt die Unterschriften ein. Jedes abgeschlossene Dokument bekommt ein Abschlusszertifikat, und die Identität der Unterzeichnenden lässt sich per SMS-Code oder Ausweis prüfen. Für Unternehmen, Personalabteilungen oder Hausverwaltungen ist das der passende Rahmen.",
      },
      {
        type: "p",
        text: "Cachety hat nichts davon. Es setzt ein Bild deiner Unterschrift auf dein eigenes Dokument, in deinem Browser. Das passt, wenn dir jemand ein PDF schickt mit der Bitte, es unterschrieben zurückzuschicken, und du dafür weder ein Konto anlegen noch die Datei irgendwo hochladen willst.",
      },
      { type: "h2", text: "Was ist die Unterschrift von Cachety wert?" },
      LEGAL,
      WHEN_NOT,
      { type: "h2", text: "Wo DocuSign besser ist" },
      {
        type: "list",
        items: [
          "Mehrere Unterzeichnende in fester Reihenfolge, mit automatischen Erinnerungen.",
          "Ein Abschlusszertifikat und ein Prüfprotokoll für jedes Dokument.",
          "Identitätsprüfung per SMS, Telefon oder Ausweis.",
          "Fortgeschrittene Signatur, qualifizierte Signatur als Zusatzoption.",
          "Vorlagen, Massenversand, über 1.100 Integrationen und APIs.",
        ],
      },
      { type: "h2", text: "Wo Cachety besser passt" },
      {
        type: "list",
        items: [
          "Du unterschreibst selbst, und das Dokument bleibt auf deinem Gerät.",
          "Kein Konto, keine Testphase, kein Abo.",
          "Ein Foto eines Papierdokuments wird direkt zu einer unterschriebenen A4-Seite.",
          "Die Seiten werden neu aufgebaut: Versteckter Text, Metadaten, Anhänge und GPS-Daten von Fotos verschwinden.",
        ],
      },
      { type: "h2", text: "So geht’s mit Cachety" },
      HOW_TO,
      AIRPLANE_TIP,
    ],
    chooseOther: [
      "Mehrere Personen sollen unterschreiben, in einer festen Reihenfolge und mit Erinnerungen.",
      "Du brauchst ein Prüfprotokoll oder Abschlusszertifikat als Nachweis, wer wann unterschrieben hat.",
      "Eine fortgeschrittene oder qualifizierte Signatur ist verlangt, oder die Identität der Unterzeichnenden muss geprüft werden.",
      "Du verschickst regelmäßig Verträge und willst Vorlagen, Massenversand oder eine Anbindung an deine Software.",
    ],
    chooseCachety: [
      "Du sollst ein PDF selbst unterschreiben und zurückschicken, etwa eine Bescheinigung, ein Formular oder ein Angebot.",
      "Du willst dafür kein Konto anlegen und das Dokument nicht hochladen.",
      "Du unterschreibst nur gelegentlich und brauchst weder Testphase noch Abo.",
    ],
    faq: [
      {
        q: "Kann ich mit DocuSign kostenlos unterschreiben?",
        a: "Als Empfänger ja: DocuSign schreibt, dass Empfänger kostenlos und ohne Konto unterschreiben. Wer selbst Dokumente zur Unterschrift verschicken will, braucht ein Abo; dafür gibt es eine 30-tägige kostenlose Testphase.",
      },
      {
        q: "Ist eine Unterschrift mit Cachety so viel wert wie eine mit DocuSign?",
        a: "Im Streitfall nicht. Cachety setzt ein Bild deiner Unterschrift, eine einfache elektronische Signatur ohne Zertifikat und ohne Prüfprotokoll. Sie zählt, wenn niemand sie bestreitet, hat aber wenig Gewicht, wenn sie bestritten wird. DocuSign versiegelt Dokumente digital, liefert ein Abschlusszertifikat und bietet auch fortgeschrittene und qualifizierte Signaturen an. Nur die qualifizierte steht einer handschriftlichen Unterschrift gleich.",
      },
      {
        q: "Wo speichert DocuSign meine Dokumente?",
        a: "In seiner Cloud, in einer von fünf Regionen: USA, Kanada, Europa, Australien oder Japan. Wie lange sie dort bleiben, legt der Kunde fest. Bei Cachety wird nichts hochgeladen.",
      },
      {
        q: "Mir hat jemand einen DocuSign-Link geschickt. Brauche ich Cachety?",
        a: "Nein. Dann unterschreibst du direkt bei DocuSign, kostenlos und ohne Konto. Gibt die andere Seite eine Plattform vor, nimm diese.",
      },
    ],
    sources: [
      { label: "DocuSign: PDF kostenlos unterschreiben (Testphase)", url: "https://www.docusign.com/learn/add-electronic-signature-pdf-free" },
      { label: "DocuSign: Dokument online kostenlos unterschreiben", url: "https://www.docusign.com/en-gb/esignature/sign-document-online-free" },
      { label: "DocuSign: Tarife eSignature", url: "https://ecom.docusign.com/plans-and-pricing/esignature" },
      { label: "DocuSign: Funktionen", url: "https://www.docusign.com/en-ca/products/electronic-signature/features" },
      { label: "DocuSign: eSignature", url: "https://www.docusign.com/products/electronic-signature" },
      { label: "DocuSign: fortgeschrittene Signatur", url: "https://www.docusign.com/en-gb/products/electronic-signature/advanced-electronic-signature" },
      { label: "DocuSign: qualifizierte Signatur", url: "https://www.docusign.com/en-gb/products/electronic-signature/qualified-electronic-signature" },
      { label: "DocuSign: Datenresidenz", url: "https://www.docusign.com/privacy/data-residency" },
      { label: "DocuSign: Datenverwaltung", url: "https://www.docusign.com/trust/privacy/data-mgmt-privacy" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ───────────────────────────── Youtrust (ehemals Yousign) ─────────────────────────────
  {
    tool: "sign",
    slug: "cachety-vs-yousign",
    competitor: "yousign",
    competitorName: "Youtrust (ehemals Yousign)",
    competitorUrl: "https://www.youtrust.com/",
    title: "Cachety oder Youtrust (ehemals Yousign): Womit unterschreibst du?",
    metaTitle: "Youtrust (Yousign) oder Cachety: PDF unterschreiben",
    description:
      "Youtrust, ehemals Yousign, bietet einfache, fortgeschrittene und qualifizierte Signaturen. Cachety unterschreibt dein PDF ohne Konto auf deinem Gerät.",
    intro:
      "Seit Juli 2026 heißt Yousign Youtrust; in der App kann der alte Name während der Umstellung noch auftauchen. Youtrust ist eine französische Plattform für elektronische Signaturen mit Hosting in Frankreich. Cachety ist ein kleines Browser-Tool, mit dem du ein Dokument selbst unterschreibst, ohne Konto und ohne Upload.",
    verdict:
      "Sollen andere unterschreiben, brauchst du einen Nachweis mit Zeitstempel oder ist eine fortgeschrittene oder qualifizierte Signatur verlangt, ist Youtrust die bessere Wahl, und schon der kostenlose Tarif enthält zwei Signaturanfragen im Monat. Cachety passt, wenn du nur selbst unterschreiben willst, ohne Konto und ohne das Dokument hochzuladen. Das Ergebnis ist eine einfache elektronische Signatur, ein Bild auf einem abgeflachten PDF.",
    table: [
      {
        criterion: "Wo das Dokument verarbeitet wird",
        cachety: C.where,
        other: "Auf den Servern von Youtrust, laut Anbieter ausschließlich in Frankreich gehostet.",
        edge: "cachety",
      },
      { criterion: "Konto", cachety: C.account, other: "Konto nötig, auch im kostenlosen Tarif.", edge: "cachety" },
      {
        criterion: "Kostenlose Nutzung",
        cachety: C.price,
        other: "Kostenloser Tarif: selbst unterschreiben ohne Grenze, 2 Signaturanfragen im Monat. Darüber die Tarife One, Plus und Pro.",
      },
      {
        criterion: "Signaturniveau",
        cachety: C.level,
        other: "Einfach (optional mit Einmalcode), fortgeschritten (mit Ausweisprüfung) und qualifiziert (mit Video-Identifizierung); die beiden letzten als kostenpflichtige Zusatzoptionen in Plus und Pro. Youtrust steht auf der EU-Liste der qualifizierten Vertrauensdiensteanbieter.",
        edge: "other",
      },
      {
        criterion: "Nachweis der Unterschrift",
        cachety: C.audit,
        other: "Nachweisdatei mit Zeitstempel in jedem Tarif, 10 Jahre archiviert.",
        edge: "other",
      },
      {
        criterion: "An andere zur Unterschrift schicken",
        cachety: C.sending,
        other: "Ja: Freigaben, Reihenfolge der Unterzeichnenden, automatische Erinnerungen, Vorlagen; Anbindung an Zapier und HubSpot, API als eigenes Produkt.",
        edge: "other",
      },
      {
        criterion: "Identitätsprüfung",
        cachety: C.identity,
        other: "SMS-Zugangscode vor dem Unterschreiben (Plus), Ausweisprüfung für die fortgeschrittene, Video-Identifizierung für die qualifizierte Signatur.",
        edge: "other",
      },
      {
        criterion: "Aufbewahrung",
        cachety: C.retention,
        other: "Signaturnachweise 10 Jahre, Ausweisdaten 90 Tage, laut Datenschutzerklärung.",
      },
      { criterion: "Werbung", cachety: C.ads, other: "Der kostenlose Tarif ist laut Youtrust werbefrei." },
    ],
    body: [
      { type: "h2", text: "Was Youtrust macht" },
      {
        type: "p",
        text: "Youtrust, bis Juli 2026 Yousign, ist eine Plattform für elektronische Signaturen von der Youtrust SAS aus Caen. Du unterschreibst selbst oder schickst Dokumente zur Unterschrift, legst die Reihenfolge fest, und Youtrust erinnert die Unterzeichnenden automatisch. Jede Signatur bekommt eine Nachweisdatei mit Zeitstempel, die zehn Jahre archiviert wird. Es gibt drei Niveaus, bis zur qualifizierten Signatur mit Video-Identifizierung, die Youtrust als rechtliches Gegenstück zur handschriftlichen Unterschrift beschreibt.",
      },
      {
        type: "p",
        text: "Youtrust grenzt seine Signaturen selbst ausdrücklich von einfachen Bildern und eingescannten Unterschriften ab. Genau das erzeugt Cachety: ein Bild deiner Unterschrift auf der Seite. Es ist also ein anderes Werkzeug für einen anderen Bedarf, kein Ersatz für eine Signaturplattform.",
      },
      { type: "h2", text: "Was ist die Unterschrift von Cachety wert?" },
      LEGAL,
      WHEN_NOT,
      { type: "h2", text: "Wo Youtrust besser ist" },
      {
        type: "list",
        items: [
          "Signaturanfragen an andere, mit Reihenfolge, Freigaben und Erinnerungen, zwei pro Monat schon im kostenlosen Tarif.",
          "Eine Nachweisdatei mit Zeitstempel, zehn Jahre archiviert.",
          "Fortgeschrittene und qualifizierte Signaturen mit Identitätsprüfung.",
          "Ein europäischer Anbieter mit Hosting in Frankreich, auf der EU-Liste der qualifizierten Vertrauensdiensteanbieter.",
        ],
      },
      { type: "h2", text: "Wo Cachety besser passt" },
      {
        type: "list",
        items: [
          "Kein Konto: Seite öffnen, unterschreiben, herunterladen.",
          "Das Dokument wird nicht hochgeladen, also auch nicht aufbewahrt.",
          "Kürzel auf jeder Seite und ein Wasserzeichen mit Zweck und Empfänger im selben Schritt.",
          "Funktioniert nach dem Laden der Seite auch im Flugmodus.",
        ],
      },
      { type: "h2", text: "So geht’s mit Cachety" },
      HOW_TO,
      AIRPLANE_TIP,
    ],
    chooseOther: [
      "Andere sollen unterschreiben, und du willst Reihenfolge, Erinnerungen und einen Nachweis mit Zeitstempel.",
      "Du brauchst eine fortgeschrittene oder qualifizierte Signatur, etwa weil die andere Seite sie verlangt.",
      "Die Identität der Unterzeichnenden muss geprüft werden, per SMS-Code, Ausweis oder Video.",
    ],
    chooseCachety: [
      "Du willst nur selbst ein Dokument unterschreiben, ohne dafür ein Konto anzulegen.",
      "Das Dokument soll dein Gerät nicht verlassen, etwa weil es persönliche Daten enthält.",
      "Du willst jede Seite abzeichnen und ein Wasserzeichen mit Zweck und Empfänger setzen.",
    ],
    faq: [
      {
        q: "Ist Yousign jetzt Youtrust?",
        a: "Ja. Laut Ankündigung des Anbieters wird Yousign ab Juli 2026 zu Youtrust. Während der Umstellung kann in der App noch „Yousign“ stehen; die Migration soll bis 2027 abgeschlossen sein.",
      },
      {
        q: "Ist Youtrust kostenlos?",
        a: "Es gibt einen kostenlosen, werbefreien Tarif mit Konto: selbst unterschreiben ohne Grenze und 2 Signaturanfragen im Monat. Fortgeschrittene und qualifizierte Signaturen sind kostenpflichtige Zusatzoptionen der Tarife Plus und Pro. Cachety ist kostenlos und ohne Konto, kann aber keine Anfragen verschicken.",
      },
      {
        q: "Wo liegen meine Dokumente bei Youtrust?",
        a: "Laut Youtrust ausschließlich in Frankreich; die Nachweise archiviert Arkhinéo. Signaturnachweise werden 10 Jahre, Ausweisdaten 90 Tage aufbewahrt. Bei Cachety wird nichts hochgeladen und nichts gespeichert.",
      },
      {
        q: "Hat eine Unterschrift mit Cachety denselben Wert?",
        a: "Nicht im Streitfall. Cachety erzeugt eine einfache elektronische Signatur, ein Bild ohne Zertifikat und ohne Nachweisdatei. Sie zählt, wenn niemand sie bestreitet, hat aber wenig Gewicht, wenn sie bestritten wird. Nur eine qualifizierte Signatur, wie Youtrust sie anbietet, steht einer handschriftlichen gleich.",
      },
    ],
    sources: [
      { label: "Youtrust: Yousign wird Youtrust", url: "https://youtrust.com/yousign-becomes-youtrust" },
      { label: "Youtrust: Startseite", url: "https://www.youtrust.com/" },
      { label: "Youtrust: kostenloser Tarif", url: "https://youtrust.com/electronic-signature-freemium" },
      { label: "Youtrust: Tarife", url: "https://youtrust.com/pricing-application" },
      { label: "Youtrust: elektronische Signatur", url: "https://youtrust.com/e-signature" },
      { label: "Youtrust: Funktionen der App", url: "https://youtrust.com/application" },
      { label: "Youtrust: Sicherheit", url: "https://youtrust.com/security" },
      { label: "Youtrust: Datenschutz", url: "https://youtrust.com/privacy" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ───────────────────────────── Adobe Acrobat ─────────────────────────────
  {
    tool: "sign",
    slug: "cachety-vs-adobe-fill-sign",
    competitor: "adobe-fill-sign",
    competitorName: "Adobe Acrobat",
    competitorUrl: "https://www.adobe.com/acrobat/online/sign-pdf.html",
    title: "Cachety oder Adobe Acrobat: Womit unterschreibst du ein PDF?",
    metaTitle: "Adobe Acrobat oder Cachety: PDF unterschreiben",
    description:
      "Adobe Acrobat unterschreibt PDFs online auf Adobe-Servern, Acrobat Sign schickt sie an mehrere. Cachety arbeitet in deinem Browser, ohne Konto.",
    intro:
      "Mit Adobe Acrobat kann man auf mehreren Wegen unterschreiben: im Online-Tool „PDF unterschreiben“, in den Apps Acrobat Reader und Fill & Sign und im Geschäftsprodukt Acrobat Sign. Cachety ist ein einfaches Browser-Tool, mit dem du dein Dokument selbst unterschreibst, ohne dass es dein Gerät verlässt.",
    verdict:
      "Sollen mehrere Personen unterschreiben, brauchst du Prüfprotokolle oder eine fortgeschrittene oder qualifizierte Signatur, ist Adobe mit Acrobat Sign die bessere Wahl. Für eine schnelle eigene Unterschrift auf einem PDF erspart dir Cachety den Upload und die Anmeldung. Es erzeugt ein Bild deiner Unterschrift auf einem abgeflachten PDF, also eine einfache elektronische Signatur.",
    table: [
      {
        criterion: "Wo das Dokument verarbeitet wird",
        cachety: C.where,
        other: "Online-Tool: auf Adobe-Servern. Die Datei wird gelöscht, außer du meldest dich an, um sie zu speichern; Frist und Land nennt die Seite nicht.",
        edge: "cachety",
      },
      {
        criterion: "Konto",
        cachety: C.account,
        other: "Laut der Seite musst du angemeldet sein, um das ausfüllbare Formular abzuschließen.",
        edge: "cachety",
      },
      {
        criterion: "Signaturniveau",
        cachety: C.level,
        other: "Zertifikatsbasierte digitale Signaturen erfüllen laut Adobe eIDAS-qualifizierte und andere internationale Standards. Acrobat Sign bietet einfache, fortgeschrittene und qualifizierte Signaturen, mit über 200 Vertrauensdiensteanbietern.",
        edge: "other",
      },
      {
        criterion: "Prüfprotokoll",
        cachety: C.audit,
        other: "In Acrobat Sign vorhanden. Im Online-Tool können Unterschriftsanfragen und Prüfprotokolle laut Adobe ein kostenpflichtiges Acrobat-Abo erfordern.",
        edge: "other",
      },
      {
        criterion: "An andere zur Unterschrift schicken",
        cachety: C.sending,
        other: "Acrobat Sign: an mehrere Unterzeichnende, mit Vorlagen, auch direkt aus Microsoft Word, Teams, Salesforce oder Workday.",
        edge: "other",
      },
      {
        criterion: "Unterschrift und Felder",
        cachety: C.fields,
        other: "Unterschrift tippen, zeichnen oder als Bild hochladen; Initialen, Text, Häkchen und Linien.",
      },
      {
        criterion: "Auf dem Handy",
        cachety: "Im Browser auf iPhone und Android, ohne App. Ein Foto eines Papierdokuments wird zu einer A4-Seite.",
        other: "Die App Acrobat Reader für iOS und Android kann unterschreiben; die iOS-App Adobe Fill & Sign füllt Formulare aus einem Foto des Papiers aus.",
      },
      {
        criterion: "Wer deine Daten verarbeitet",
        cachety: "Nur dein Browser: Cachety bekommt dein Dokument nie. Keine Werbung, keine Tracker.",
        other: "Adobe; Verantwortlicher für Nutzer in der EU ist Adobe Systems Software Ireland Limited.",
      },
    ],
    body: [
      { type: "h2", text: "Was Adobe anbietet" },
      {
        type: "p",
        text: "Im Online-Tool „PDF unterschreiben“ tippst oder zeichnest du deine Unterschrift oder lädst ein Bild davon hoch, und du kannst Initialen, Text, Häkchen und Linien ergänzen. Die Datei wird dabei auf Adobe-Servern verarbeitet und gelöscht, außer du meldest dich an, um sie zu speichern. Wer Dokumente an mehrere Personen schicken will, mit Vorlagen und Prüfprotokollen, nutzt Acrobat Sign, das sich auch in Word, Teams, Salesforce oder Workday einbinden lässt.",
      },
      {
        type: "p",
        text: "Bei den Signaturniveaus ist Adobe breit aufgestellt: Acrobat Sign unterstützt laut Adobe einfache, fortgeschrittene und qualifizierte Signaturen nach eIDAS und arbeitet dafür mit über 200 Vertrauensdiensteanbietern. Cachety bietet nichts davon, nur ein Bild deiner Unterschrift.",
      },
      { type: "h2", text: "Was ist die Unterschrift von Cachety wert?" },
      LEGAL,
      WHEN_NOT,
      { type: "h2", text: "Wo Adobe besser ist" },
      {
        type: "list",
        items: [
          "Zertifikatsbasierte, fortgeschrittene und qualifizierte Signaturen.",
          "Acrobat Sign für mehrere Unterzeichnende, mit Vorlagen und Prüfprotokollen.",
          "Einbindung in Microsoft Word, Teams, Salesforce und Workday.",
          "Apps für iOS und Android, dazu Fill & Sign für Papierformulare auf dem iPhone.",
        ],
      },
      { type: "h2", text: "Wo Cachety besser passt" },
      {
        type: "list",
        items: [
          "Das Dokument wird nicht hochgeladen, auch nicht für kurze Zeit.",
          "Keine Anmeldung, kein Adobe-Konto.",
          "Kürzel auf jeder Seite, Wasserzeichen und Passwort im selben Schritt.",
          "Mehrere Dokumente auf einmal, auch Fotos von Papierdokumenten.",
        ],
      },
      { type: "h2", text: "So geht’s mit Cachety" },
      HOW_TO,
      AIRPLANE_TIP,
    ],
    chooseOther: [
      "Du arbeitest ohnehin mit Acrobat und willst Dokumente direkt aus Word, Teams oder Salesforce zur Unterschrift schicken.",
      "Mehrere Personen sollen unterschreiben, mit Vorlagen und Prüfprotokoll.",
      "Du brauchst eine zertifikatsbasierte, fortgeschrittene oder qualifizierte Signatur.",
    ],
    chooseCachety: [
      "Du willst ein PDF schnell selbst unterschreiben, ohne dich irgendwo anzumelden.",
      "Das Dokument soll nicht auf fremde Server, auch nicht für kurze Zeit.",
      "Du willst Kürzel auf jeder Seite, ein Wasserzeichen und ein Passwort in einem Durchgang.",
    ],
    faq: [
      {
        q: "Speichert Adobe mein PDF, wenn ich es online unterschreibe?",
        a: "Laut Adobe wird die Datei auf Adobe-Servern verarbeitet und gelöscht, außer du meldest dich an, um sie zu speichern. Eine Frist nennt die Seite nicht. Bei Cachety wird das Dokument gar nicht erst hochgeladen.",
      },
      {
        q: "Brauche ich ein Adobe-Konto?",
        a: "Zum Abschließen eines ausfüllbaren Formulars im Online-Tool verlangt Adobe eine Anmeldung, und Unterschriftsanfragen und Prüfprotokolle können laut Adobe ein kostenpflichtiges Abo erfordern. Cachety braucht kein Konto.",
      },
      {
        q: "Was ist der Unterschied zwischen Acrobat und Acrobat Sign?",
        a: "Mit dem Online-Tool und den Acrobat-Apps unterschreibst du selbst. Acrobat Sign ist das Produkt für Unternehmen: Es schickt Dokumente an mehrere Unterzeichnende, mit Vorlagen und Prüfprotokollen, und unterstützt laut Adobe einfache, fortgeschrittene und qualifizierte Signaturen nach eIDAS.",
      },
      {
        q: "Ist eine Unterschrift mit Cachety rechtsverbindlich?",
        a: "Das verspricht Cachety nicht. Es erzeugt eine einfache elektronische Signatur: Sie zählt, wenn niemand sie bestreitet, hat aber wenig Gewicht, wenn sie bestritten wird. Ist eine qualifizierte Signatur verlangt, nimm ein Werkzeug, das sie anbietet, etwa Acrobat Sign.",
      },
    ],
    sources: [
      { label: "Adobe: PDF online unterschreiben", url: "https://www.adobe.com/acrobat/online/sign-pdf.html" },
      { label: "Adobe: Acrobat Sign für Unternehmen", url: "https://www.adobe.com/acrobat/business/sign.html" },
      { label: "Adobe: eIDAS", url: "https://www.adobe.com/acrobat/business/compliance/eidas.html" },
      { label: "App Store: Adobe Fill & Sign", url: "https://apps.apple.com/cr/app/adobe-fill-sign/id950099951" },
      { label: "Adobe: Datenschutzerklärung", url: "https://www.adobe.com/privacy/policy.html" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ───────────────────────────── iLovePDF ─────────────────────────────
  {
    tool: "sign",
    slug: "cachety-vs-ilovepdf-sign",
    competitor: "ilovepdf-sign",
    competitorName: "iLovePDF",
    competitorUrl: "https://www.ilovepdf.com/sign-pdf",
    title: "Cachety oder iLovePDF: PDF unterschreiben, auf dem Server oder auf dem Gerät?",
    metaTitle: "iLovePDF oder Cachety: PDF unterschreiben",
    description:
      "iLovePDF unterschreibt PDFs auf seinen Servern und schickt sie auch an andere. Cachety unterschreibt auf deinem Gerät, ohne Upload. Ein fairer Vergleich.",
    intro:
      "iLovePDF aus Barcelona hat ein eigenes Tool zum Unterschreiben, auch iLoveSign genannt: einfache Signatur für dich selbst, digitale Signatur und Einladungen an andere. Dafür wird das Dokument auf die Server von iLovePDF hochgeladen. Cachety unterschreibt im Browser, das Dokument bleibt auf deinem Gerät.",
    verdict:
      "Willst du andere unterschreiben lassen, mit Reihenfolge, Erinnerungen und Prüfprotokoll, oder brauchst du eine digitale oder fortgeschrittene Signatur, ist iLovePDF die bessere Wahl. Für eine eigene Unterschrift auf einem persönlichen Dokument vermeidet Cachety den Upload und die Werbung. Es erzeugt eine einfache elektronische Signatur, ein Bild auf einem abgeflachten PDF.",
    table: [
      {
        criterion: "Wo das Dokument verarbeitet wird",
        cachety: C.where,
        other: "Auf den Servern von iLovePDF; die Daten werden laut Datenschutzerklärung im EWR verarbeitet.",
        edge: "cachety",
      },
      {
        criterion: "Aufbewahrung",
        cachety: C.retention,
        other: "Dateien werden innerhalb von zwei Stunden gelöscht; unterschriebene Dokumente werden höchstens 5 Jahre aufbewahrt, das Prüfprotokoll 10 Jahre archiviert.",
        edge: "cachety",
      },
      {
        criterion: "Konto und kostenlose Nutzung",
        cachety: "Kein Konto, kostenlos, ohne Bezahlversion.",
        other: "Kostenlos: einfache Signaturen für dich selbst ohne Grenze, Anfragen an andere begrenzt, 50 MB beim Unterschreiben. Für Anfragen an andere ist ein Konto nötig.",
      },
      {
        criterion: "Werbung",
        cachety: C.ads,
        other: "Die kostenlose Basisversion ist laut Preisseite nicht werbefrei.",
        edge: "cachety",
      },
      {
        criterion: "Signaturniveau",
        cachety: C.level,
        other: "Einfache Signatur; digitale Signatur (Premium) mit signiertem, zertifiziertem Hash und qualifiziertem Zeitstempel; mit SMS-Bestätigung eine fortgeschrittene Signatur nach eIDAS.",
        edge: "other",
      },
      {
        criterion: "Prüfprotokoll",
        cachety: C.audit,
        other: "Prüfprotokoll nach Abschluss, 10 Jahre archiviert.",
        edge: "other",
      },
      {
        criterion: "An andere zur Unterschrift schicken",
        cachety: C.sending,
        other: "Ja: „Nur ich“ oder „Mehrere Personen“, mit Reihenfolge, Ablaufdatum und Erinnerungen; mit Premium 5 Einladungen im Monat.",
        edge: "other",
      },
      {
        criterion: "Identitätsprüfung",
        cachety: C.identity,
        other: "SMS-Bestätigung, optional Scan eines Ausweises.",
        edge: "other",
      },
      {
        criterion: "Unterschrift und Felder",
        cachety: C.fields,
        other: "Zeichnen, tippen oder als Bild hochladen (PNG, JPG, SVG); Initialen, Datum, Textfelder. Apps für iOS und Android.",
      },
    ],
    body: [
      { type: "h2", text: "Was mit deinem Dokument bei iLovePDF passiert" },
      {
        type: "p",
        text: "iLovePDF verarbeitet das Dokument auf seinen Servern im EWR, ist nach ISO/IEC 27001 zertifiziert und löscht Dateien innerhalb von zwei Stunden. Unterschriebene Dokumente bewahrt iLovePDF höchstens fünf Jahre auf, das Prüfprotokoll wird zehn Jahre archiviert. Für eine Signaturplattform ist das sinnvoll: Der Nachweis soll ja später noch da sein.",
      },
      {
        type: "p",
        text: "Wenn du aber nur selbst eine Bescheinigung oder ein Formular unterschreiben willst, brauchst du diesen Nachweis nicht unbedingt, und dein Dokument muss dann auch nicht auf einen fremden Server. Cachety setzt die Unterschrift in deinem Browser, ohne Upload.",
      },
      { type: "h2", text: "Was ist die Unterschrift von Cachety wert?" },
      LEGAL,
      WHEN_NOT,
      { type: "h2", text: "Wo iLovePDF besser ist" },
      {
        type: "list",
        items: [
          "Einladungen an andere, mit Reihenfolge, Ablaufdatum und Erinnerungen.",
          "Ein Prüfprotokoll, zehn Jahre archiviert.",
          "Digitale Signatur mit qualifiziertem Zeitstempel, fortgeschrittene Signatur mit SMS-Bestätigung.",
          "Apps für iOS und Android.",
        ],
      },
      { type: "h2", text: "Wo Cachety besser passt" },
      {
        type: "list",
        items: [
          "Das Dokument verlässt dein Gerät nicht, also wird auch nichts aufbewahrt.",
          "Keine Werbung, keine Tracker.",
          "Ein Foto deiner Unterschrift wird freigestellt und die Tinte neu eingefärbt.",
          "Kürzel auf jeder Seite, Wasserzeichen und Passwort im selben Schritt.",
        ],
      },
      { type: "h2", text: "So geht’s mit Cachety" },
      HOW_TO,
      AIRPLANE_TIP,
    ],
    chooseOther: [
      "Andere sollen unterschreiben, mit Reihenfolge, Ablaufdatum und Erinnerungen.",
      "Du brauchst ein Prüfprotokoll oder eine digitale Signatur mit qualifiziertem Zeitstempel.",
      "Eine fortgeschrittene Signatur mit SMS-Bestätigung oder ein Ausweis-Scan ist verlangt.",
      "Du nutzt iLovePDF ohnehin für andere PDF-Aufgaben.",
    ],
    chooseCachety: [
      "Du unterschreibst ein persönliches Dokument selbst und willst es nicht hochladen.",
      "Du willst eine Seite ohne Werbung und ohne Tracker.",
      "Du willst jede Seite abzeichnen und ein Wasserzeichen setzen, ohne Konto.",
    ],
    faq: [
      {
        q: "Lädt iLovePDF mein Dokument zum Unterschreiben hoch?",
        a: "Ja. iLovePDF verarbeitet die Daten im EWR und löscht Dateien innerhalb von zwei Stunden; unterschriebene Dokumente bewahrt es höchstens fünf Jahre auf. Bei Cachety wird nichts hochgeladen.",
      },
      {
        q: "Ist das Unterschreiben bei iLovePDF kostenlos?",
        a: "Einfache Signaturen für dich selbst sind laut iLoveSign kostenlos und unbegrenzt, Anfragen an andere sind begrenzt, und die Basisversion zeigt Werbung. Die digitale und die fortgeschrittene Signatur gehören zu Premium.",
      },
      {
        q: "Was ist der Unterschied zwischen einfacher und digitaler Signatur bei iLovePDF?",
        a: "iLovePDF unterscheidet eine einfache Signatur und eine digitale Signatur (Premium). In die digitale werden laut iLovePDF ein signierter, zertifizierter Hash und ein qualifizierter Zeitstempel eingebettet; mit SMS-Bestätigung wird daraus eine fortgeschrittene Signatur nach eIDAS. Cachety bietet nur ein Bild deiner Unterschrift, also eine einfache elektronische Signatur.",
      },
    ],
    sources: [
      { label: "iLovePDF: PDF unterschreiben", url: "https://www.ilovepdf.com/sign-pdf" },
      { label: "iLovePDF: Anleitung zum Unterschreiben", url: "https://www.ilovepdf.com/blog/how-to-add-a-signature-to-a-pdf-document-online-using-ilovepdf" },
      { label: "iLovePDF: Preise", url: "https://www.ilovepdf.com/pricing" },
      { label: "iLoveSign: Preise", url: "https://www.ilovesign.com/esignature-pricing" },
      { label: "iLovePDF: Sicherheit", url: "https://www.ilovepdf.com/help/security" },
      { label: "iLovePDF: Datenschutz", url: "https://www.ilovepdf.com/help/privacy" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ───────────────────────────── Smallpdf ─────────────────────────────
  {
    tool: "sign",
    slug: "cachety-vs-smallpdf-sign",
    competitor: "smallpdf-sign",
    competitorName: "Smallpdf",
    competitorUrl: "https://smallpdf.com/sign-pdf",
    title: "Cachety oder Smallpdf: PDF ohne Konto unterschreiben, aber wo?",
    metaTitle: "Smallpdf oder Cachety: PDF online unterschreiben",
    description:
      "Smallpdf unterschreibt PDFs ohne Konto auf Servern in der EU und löscht sie nach einer Stunde. Cachety unterschreibt auf deinem Gerät. Ein Vergleich.",
    intro:
      "Smallpdf aus Zürich gehört zu den bekanntesten PDF-Websites. Sein Tool „PDF unterschreiben“ kommt ohne Konto und ohne Installation aus; Anfragen an andere laufen über Sign.com. Die Datei wird dafür auf die Server von Smallpdf geladen. Cachety unterschreibt im Browser, ohne Upload.",
    verdict:
      "Beide kommen ohne Konto aus, wenn du selbst unterschreibst. Der Unterschied: Smallpdf verarbeitet die Datei auf seinen Servern und löscht sie nach einer Stunde, Cachety lädt sie gar nicht erst hoch. Sollen andere unterschreiben, mit Verfolgung, digitalem Siegel und Abschlusszertifikat, ist Smallpdf mit Sign.com die bessere Wahl; Cachety erzeugt nur eine einfache elektronische Signatur, ein Bild auf einem abgeflachten PDF.",
    table: [
      {
        criterion: "Wo das Dokument verarbeitet wird",
        cachety: C.where,
        other: "Auf den Servern von Smallpdf (Hetzner in der EU), über Cloudflare in den USA oder Europa, mit TLS-Verschlüsselung.",
        edge: "cachety",
      },
      {
        criterion: "Aufbewahrung",
        cachety: C.retention,
        other: "Automatische Löschung nach einer Stunde, außer du speicherst die Datei in deinem Smallpdf-Konto.",
        edge: "cachety",
      },
      { criterion: "Konto", cachety: C.account, other: "Zum Unterschreiben kein Konto und keine Installation nötig." },
      {
        criterion: "Kostenlose Nutzung",
        cachety: C.price,
        other: "Kostenlos mit einer täglichen Download-Grenze; Sign.com kostenlos für eine begrenzte Zahl von Dokumenten im Monat.",
      },
      {
        criterion: "Werbung und Tracking",
        cachety: C.ads,
        other: "Mit deiner Einwilligung: Google Analytics, Google-Ads-Remarketing, Facebook Pixel und LinkedIn, laut Datenschutzerklärung.",
        edge: "cachety",
      },
      {
        criterion: "Signaturniveau",
        cachety: C.level,
        other: "Sign.com nennt seine Signaturen „rechtsgültig und verbindlich nach eIDAS-Standards“, ohne ein Niveau anzugeben.",
      },
      {
        criterion: "Siegel und Zertifikat",
        cachety: C.audit,
        other: "Über Sign.com: digitale Siegel und Abschlusszertifikat.",
        edge: "other",
      },
      {
        criterion: "An andere zur Unterschrift schicken",
        cachety: C.sending,
        other: "Über Sign.com: Unterschriften anfordern und den Stand verfolgen.",
        edge: "other",
      },
      {
        criterion: "Unterschrift und Felder",
        cachety: C.fields,
        other: "Zeichnen, tippen oder hochladen; Unterschrift, Initialen, Text und Datum. App für Android und iOS.",
      },
    ],
    body: [
      { type: "h2", text: "Was mit deiner Datei bei Smallpdf passiert" },
      {
        type: "p",
        text: "Smallpdf macht das Unterschreiben bequem: kein Konto, keine Installation, Unterschrift zeichnen, tippen oder hochladen. Die Datei geht dafür verschlüsselt an Server von Hetzner in der EU, teils über Cloudflare in den USA oder Europa, und wird nach einer Stunde automatisch gelöscht, solange du sie nicht in einem Konto speicherst. Verantwortlich ist die Smallpdf AG in Zürich.",
      },
      {
        type: "p",
        text: "Cachety arbeitet ohne diesen Umweg. Die Seite wird einmal geladen, danach passiert alles in deinem Browser, und die Datei wird nirgendwohin geschickt. Auch Analyse- und Werbedienste gibt es keine.",
      },
      { type: "h2", text: "Was ist die Unterschrift von Cachety wert?" },
      LEGAL,
      WHEN_NOT,
      { type: "h2", text: "Wo Smallpdf besser ist" },
      {
        type: "list",
        items: [
          "Über Sign.com Unterschriften von anderen anfordern und verfolgen.",
          "Digitale Siegel und ein Abschlusszertifikat.",
          "Eine App für Android und iOS.",
        ],
      },
      { type: "h2", text: "Wo Cachety besser passt" },
      {
        type: "list",
        items: [
          "Die Datei wird nicht hochgeladen, auch nicht für eine Stunde.",
          "Keine Analyse- oder Werbedienste, auch nicht nach Einwilligung.",
          "Ein Foto eines Papierdokuments wird direkt zu einer unterschriebenen A4-Seite.",
          "Die Seiten werden neu aufgebaut: Versteckter Text, Metadaten, Anhänge und GPS-Daten von Fotos verschwinden.",
        ],
      },
      { type: "h2", text: "So geht’s mit Cachety" },
      HOW_TO,
      AIRPLANE_TIP,
    ],
    chooseOther: [
      "Andere sollen unterschreiben, und du willst den Stand verfolgen.",
      "Du brauchst ein digitales Siegel oder ein Abschlusszertifikat.",
      "Du nutzt Smallpdf ohnehin für andere PDF-Aufgaben.",
    ],
    chooseCachety: [
      "Dein Dokument enthält persönliche Daten und soll dein Gerät nicht verlassen.",
      "Du willst eine Seite ohne Analyse- und Werbedienste.",
      "Du willst jede Seite abzeichnen, ein Wasserzeichen setzen und ein Passwort vergeben, in einem Durchgang.",
    ],
    faq: [
      {
        q: "Speichert Smallpdf mein unterschriebenes PDF?",
        a: "Laut Smallpdf werden Dateien nach einer Stunde automatisch gelöscht, außer du speicherst sie in deinem Smallpdf-Konto. Verarbeitet werden sie auf Servern in der EU. Bei Cachety wird die Datei nicht hochgeladen.",
      },
      {
        q: "Ist eine Unterschrift mit Smallpdf oder Cachety rechtsverbindlich?",
        a: "Smallpdf nennt seine Unterschriften selbst rechtsverbindlich, mit dem Hinweis, die Gesetze vor Ort zu prüfen; Sign.com spricht von eIDAS-Standards, ohne ein Niveau zu nennen. Cachety erzeugt eine einfache elektronische Signatur: Sie zählt, wenn niemand sie bestreitet, hat aber wenig Gewicht, wenn sie bestritten wird. Nur eine qualifizierte Signatur steht einer handschriftlichen gleich.",
      },
      {
        q: "Ist Smallpdf kostenlos?",
        a: "Smallpdf lässt sich kostenlos nutzen, mit einer täglichen Download-Grenze; Sign.com ist für eine begrenzte Zahl von Dokumenten im Monat kostenlos. Cachety ist kostenlos, ohne Bezahlversion.",
      },
    ],
    sources: [
      { label: "Smallpdf: PDF unterschreiben", url: "https://smallpdf.com/sign-pdf" },
      { label: "Smallpdf: elektronische Signatur", url: "https://smallpdf.com/sign" },
      { label: "Smallpdf: Preise", url: "https://smallpdf.com/pricing" },
      { label: "Sign.com für Smallpdf", url: "https://sign.com/smallpdf" },
      { label: "Smallpdf: Datenschutzerklärung", url: "https://smallpdf.com/privacy" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },
];
