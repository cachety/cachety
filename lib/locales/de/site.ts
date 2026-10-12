import type { SiteCopy } from "@/lib/site-copy";

// Website-Texte auf Deutsch, durchgehend „du“. Dieselben Versprechen wie auf
// Englisch, kein einziges mehr (vgl. docs/security.md). Nie „keine Werbung“
// versprechen: nur „kein Tracking, keine Werbenetzwerke“ oder „heute keine Werbung“.

export const SITE_DE: SiteCopy = {
  nav: {
    tool: "Zum Tool",
    about: "Warum ein Wasserzeichen?",
    guides: "Ratgeber",
    privacy: "Datenschutz",
    menu: "Menü",
    close: "Menü schließen",
    donate: "Spenden",
    compare: "Vergleiche",
    nameShort: "cachet (Siegel) + cacher (verbergen)",
  },
  hero: {
    title: "Wasserzeichen auf deine Dokumente, ohne sie irgendwohin zu schicken",
    lead: "Personalausweis, Reisepass, Gehaltsabrechnung, Kontoauszug: In Sekunden ist das Wasserzeichen drauf. Deine Dateien bleiben die ganze Zeit auf deinem Gerät.",
    pills: ["Kostenlos", "Ohne Konto", "Kein Upload", "Made in France"],
  },
  landing: {
    howTitle: "So funktioniert’s",
    how: [
      { title: "Dokument ablegen", body: "Ein PDF oder ein Foto, auch direkt vom iPhone. Bei Bedarf mehrere auf einmal." },
      {
        title: "Zweck angeben",
        body: "Zum Beispiel „Mietbewerbung, Hausverwaltung Lindner, 11.10.2026“. Fertige Vorlagen sind dabei.",
      },
      {
        title: "Prüfen und herunterladen",
        body: "Die Vorschau zeigt genau, was du bekommst. Die Datei mit Wasserzeichen wird auf deinem Gerät gespeichert.",
      },
    ],
    trustTitle: "Deine Dokumente verlassen nie dein Gerät",
    trustLead:
      "Die meisten Wasserzeichen-Websites laden deinen Ausweis auf ihre Server hoch. Cachety nicht: Die ganze Arbeit erledigt dein Browser, auf deinem eigenen Handy oder Computer.",
    trust: [
      {
        title: "Verarbeitung auf deinem Gerät",
        body: "Deine Dateien bleiben im Speicher deines Geräts. Tab schließen, und alles ist weg.",
      },
      {
        title: "Technisch abgesichert",
        body: "Die Seite verbietet deinem Browser, Daten an andere Websites zu senden. Selbst wenn etwas schiefginge, kämen deine Dateien nicht hinaus.",
      },
      {
        title: "Kein Konto, kein Tracking",
        body: "Keine Anmeldung, keine Tracking-Cookies, keine Besucherstatistik, keine Werbenetzwerke.",
      },
      {
        title: "Open Source und überprüfbar",
        body: "Der Code ist öffentlich. Jeder kann ihn lesen, prüfen oder eine eigene Kopie der Website betreiben.",
      },
    ],
    airplaneTitle: "Prüf es selbst: der Flugmodus-Test",
    airplaneBody:
      "Öffne diese Seite und schalte dann das Internet ab (Flugmodus). Leg ein Dokument ab: Cachety funktioniert weiter. Der Beweis, dass nichts übers Internet geht.",
    featuresTitle: "Alles, was du brauchst, um eine Kopie zu schützen",
    features: [
      {
        title: "Wasserzeichen über die ganze Seite",
        body: "Diagonal wiederholt und mit dem Bild verschmolzen: Mit einem PDF-Editor lässt es sich nicht einfach löschen.",
      },
      {
        title: "Angaben schwärzen",
        body: "Verdecke eine IBAN, eine Steuer-ID oder ein Foto. Der Inhalt wird wirklich entfernt, nicht nur überdeckt.",
      },
      {
        title: "Ein eigener Code auf jeder Kopie",
        body: "Beim Bearbeiten des Textes fügst du einen kurzen Code hinzu, der auf jeder Kopie anders ist: Taucht eine irgendwo auf, weißt du, woher sie stammt.",
      },
      {
        title: "Eine Kopie pro Empfänger",
        body: "Trag jeden Empfänger ein: Jeder bekommt seine eigene Kopie mit seinem Namen darauf, in einem einzigen Download.",
      },
      {
        title: "Ein Passwort, für dich erstellt",
        body: "Schütze die Datei mit 12 zufälligen Wörtern, die sich leicht am Telefon vorlesen lassen, und AES-256-Verschlüsselung.",
      },
      {
        title: "Versteckte Daten entfernt",
        body: "Markierbarer Text, Metadaten und der GPS-Standort von Fotos werden aus der fertigen Datei gelöscht.",
      },
      {
        title: "Klein genug für jede Website",
        body: "Lehnt eine Website oder ein E-Mail-Programm deine Datei ab, verkleinere sie auf 10, 5, 2 oder 1 MB.",
      },
      {
        title: "Funktioniert auf dem Handy",
        body: "iPhone und Android, auch HEIC-Fotos. Leg Cachety wie eine App auf deinen Startbildschirm.",
      },
    ],
    originTitle: "Kostenlos, Open Source, Made in France",
    originBody:
      "Cachety ist freie, kostenlose Software (AGPL-Lizenz). Der Code ist für alle offen und bleibt es auch. Cachety baut auf Filigrane Local und Filigraneur auf, zwei französischen Open-Source-Projekten.",
    originBy: "Entwickelt und betreut von",
    supportTitle: "Cachety unterstützen",
    supportBody:
      "Cachety ist kostenlos und bleibt es. Aber es kostet Zeit, und Domain und Entwicklungswerkzeuge kosten Geld. Wenn dir Cachety geholfen hat, hält eine kleine Spende das Projekt am Laufen.",
    supportCta: "Spenden",
    supportNote: "Freiwillig. Die Zahlung läuft über GitHub Sponsors, außerhalb dieser Website.",
    faqTitle: "Häufige Fragen",
    faq: [
      {
        q: "Werden meine Dateien auf einen Server hochgeladen?",
        a: "Nein, niemals. Die Website hat nicht einmal einen Server, der eine Datei empfangen könnte. Dein Browser erledigt alles, und die Seite verbietet ihm technisch, Kontakt zu anderen Websites aufzunehmen. Der Flugmodus-Test beweist es in zehn Sekunden.",
      },
      {
        q: "Ist das wirklich kostenlos? Wo ist der Haken?",
        a: "Es gibt keinen: kein Konto, keine Bezahlversion, keine Datensammlung. Weil nichts auf einem Server verarbeitet wird, kostet das Hosting fast nichts, und der offene Code sorgt dafür, dass es kostenlos bleibt. Finanziert wird die Entwicklung über freiwillige Spenden; vielleicht zeigt Cachety eines Tages auch ein paar handverlesene, gesponserte Links (Verschlüsselungs-Tools, Open-Source-Software…). Niemals Werbung, die dich verfolgt, und niemals etwas, das auf deinen Dokumenten beruht.",
      },
      {
        q: "Welche Dateien kann ich mit einem Wasserzeichen versehen?",
        a: "PDFs und Bilder: JPG, PNG, iPhone-Fotos (HEIC), WebP, GIF, BMP und AVIF. Bis zu 200 MB pro Datei und 500 Seiten pro PDF, mehrere Dateien auf einmal.",
      },
      {
        q: "Lässt sich das Wasserzeichen entfernen?",
        a: "Nicht mit einem PDF-Editor: Das Wasserzeichen ist Teil des Bildes jeder Seite. Ehrlich gesagt kann niemand verhindern, dass jemand ein Dokument abfotografiert oder retuschiert. Ein Wasserzeichen schreckt vor Missbrauch ab und zeigt dir, woher ein Leck kam.",
      },
      {
        q: "Was schreibe ich ins Wasserzeichen?",
        a: "Drei Dinge: wofür die Kopie ist, an wen du sie schickst und das Datum. Zum Beispiel „Mietbewerbung, Hausverwaltung Lindner, 11.10.2026“.",
      },
      {
        q: "Funktioniert das auf dem Handy?",
        a: "Ja, auf iPhone und Android. Öffne cachety.com im Browser, tippe auf die Ablagefläche und wähle ein Foto oder ein PDF. Du kannst Cachety auch auf deinen Startbildschirm legen.",
      },
    ],
    guidesTitle: "Ratgeber",
    guidesLead: "Schritt-für-Schritt-Hilfe für Alltagssituationen.",
    guidesAll: "Alle Ratgeber",
    backToTop: "Wasserzeichen setzen",
  },
  privacy: {
    title: "Datenschutz und Sicherheit",
    lead: "Deine Dokumente sind privat. Hier steht in einfachen Worten, was Cachety tut und was nicht, und wie du es selbst überprüfen kannst.",
    updated: "Aktualisiert am 12. Oktober 2026",
    sections: [
      {
        title: "Kurz gesagt",
        items: [
          "Deine Dateien werden nie hochgeladen: Dein Browser verarbeitet sie auf deinem Gerät.",
          "Kein Konto, keine Tracking-Cookies, keine Besucherstatistik, keine Werbenetzwerke.",
          "Nichts wird aufbewahrt: Tab schließen, und deine Dokumente sind aus dem Speicher verschwunden.",
          "Der Code ist öffentlich, jeder kann ihn prüfen.",
        ],
      },
      {
        title: "Was passiert, wenn du eine Datei ablegst",
        paras: [
          "Dein Browser liest die Datei in den Speicher deines Geräts. Jede Seite wird in ein Bild umgewandelt, das Wasserzeichen wird darübergelegt, und es entsteht eine völlig neue Datei. Klickst du auf Herunterladen, wird sie direkt auf deinem Gerät gespeichert.",
          "Zu keinem Zeitpunkt gehen die Datei, der Text des Wasserzeichens, die Namen der Empfänger oder das Passwort übers Internet.",
        ],
      },
      {
        title: "Was wir nicht erfassen",
        items: [
          "Deine Dokumente und ihre Vorschauen.",
          "Den Text deines Wasserzeichens und die Namen deiner Empfänger.",
          "Deine Passwörter.",
          "Deine Identität: Es gibt weder Konto noch Formular.",
          "Dein Verhalten: kein Google Analytics, kein Werbe-Pixel, kein Tracking-Cookie.",
        ],
      },
      {
        title: "Was auf deinem Gerät gespeichert wird",
        paras: [
          "Nur deine Einstellungen: Sprache, Aussehen des Wasserzeichens und die gewählte maximale Dateigröße. Sie bleiben in deinem Browser, damit du sie nicht jedes Mal neu einstellen musst. Dateien, Texte oder Passwörter werden dort nie gespeichert. Du kannst die Einstellungen jederzeit löschen, indem du die Websitedaten dieser Seite in deinem Browser entfernst.",
          "Damit Cachety offline funktioniert, speichert dein Browser außerdem eine Kopie der Seiten der Website (nicht deiner Dokumente).",
        ],
      },
      {
        title: "Hosting und Finanzierung",
        paras: [
          "Die Seiten der Website werden von Cloudflare ausgeliefert. Wie jeder Hoster sieht Cloudflare technisch die IP-Adressen der Besucher und die aufgerufenen Seiten, um sie ausliefern zu können. Deine Dokumente sieht Cloudflare nie, weil sie nie verschickt werden.",
          "Spenden laufen über GitHub Sponsors, auf der Website von GitHub und nach dessen eigener Datenschutzerklärung. Cachety sieht deine Zahlungsdaten nie, und seine Seiten enthalten weder Zahlungsformular noch Zahlungsskript.",
          "Heute gibt es auf Cachety keine Werbung. Damit das Projekt weiterlaufen kann, könnten künftig ein paar gesponserte Links erscheinen, von Hand ausgewählt und im Sinne des Projekts: Verschlüsselungs-Tools, Open-Source-Software, sicherer Dokumentenversand. Sie werden klar gekennzeichnet, von Cachety selbst ausgeliefert, ohne Werbenetzwerk und ohne Skripte von Dritten, und hängen nie von deinen Dokumenten ab. Die Sicherheitsrichtlinie der Seite verbietet weiterhin jede Verbindung zu anderen Websites.",
        ],
      },
      {
        title: "So prüfst du es selbst",
        items: [
          "Der Flugmodus-Test: Website öffnen, Internet abschalten, dann ein Dokument mit Wasserzeichen versehen. Alles funktioniert.",
          "Der Quellcode ist öffentlich: Jeder kann ihn lesen, und automatische Tests prüfen bei jeder Änderung, dass keine Daten hinausgelangen können.",
          "Für Neugierige: Die Sicherheitsrichtlinie der Seite (CSP) verbietet dem Browser jede Verbindung zu anderen Websites.",
          "Du willst niemandem vertrauen? Du kannst die Website auf deinem eigenen Computer oder Server betreiben.",
        ],
      },
      {
        title: "Zusätzlicher Schutz für deine Kopien",
        items: [
          "Geschwärzte Bereiche werden wirklich aus der Datei entfernt, nicht nur mit einem Rechteck abgedeckt.",
          "Versteckter Text, Metadaten und der GPS-Standort von Fotos werden entfernt.",
          "Passwörter nutzen AES-256-Verschlüsselung; ein kopiertes Passwort wird nach einer Minute aus der Zwischenablage gelöscht.",
          "Sicherheitslücke gefunden? Melde sie vertraulich über die Sicherheitsseite des GitHub-Repositorys.",
        ],
      },
      {
        title: "Was ein Wasserzeichen nicht kann",
        paras: [
          "Ein Wasserzeichen schreckt davon ab, eine Kopie weiterzuverwenden, und hilft dir herauszufinden, woher ein Leck kam. Es macht es nicht unmöglich, eine Kopie abzufotografieren oder zu retuschieren. Schick nur die Dokumente, die wirklich verlangt werden, und schwärze alles, was nicht nötig ist.",
        ],
      },
    ],
  },
  guidesUi: {
    title: "Ratgeber",
    lead: "Wohnung, Bank, Ausweis, Handy: So schützt du deine Dokumente Schritt für Schritt, ganz ohne Technikwissen.",
    read: "Ratgeber lesen",
    example: "Beispiel für ein Wasserzeichen",
    faqTitle: "Häufige Fragen",
    related: "Weiterlesen",
    cta: "Wasserzeichen auf mein Dokument",
    ctaNote: "Kostenlos, ohne Konto. Das Dokument verlässt nie dein Gerät.",
    updated: (d) => `Aktualisiert am ${d}`,
    allGuides: "Alle Ratgeber",
  },
  compareUi: {
    title: "Cachety im Vergleich mit anderen Wasserzeichen-Tools",
    lead: "Verständliche, geprüfte Vergleiche mit den meistgenutzten Tools: wohin deine Dateien gehen, was es kostet und wann ein anderes Tool die bessere Wahl ist.",
    read: "Vergleich lesen",
    verdictTitle: "Kurz gesagt",
    tableTitle: "Im direkten Vergleich",
    criterion: "Kriterium",
    edgeCachety: "Vorteil Cachety",
    edgeOther: (n: string) => `Vorteil ${n}`,
    chooseOther: (n: string) => `Wann ${n} die bessere Wahl ist`,
    chooseCachety: "Wann Cachety die bessere Wahl ist",
    sourcesTitle: "Quellen",
    checked: (d: string) =>
      `Angaben am ${d} auf den öffentlichen Seiten der jeweiligen Anbieter geprüft. Dienste ändern sich: Wenn hier etwas nicht mehr stimmt, sag uns auf GitHub Bescheid, dann korrigieren wir es.`,
    disclosure: "Geschrieben vom Autor von Cachety. Wir bemühen uns um Sachlichkeit und Fairness: Jede Aussage über ein anderes Tool verweist auf ihre Quelle.",
    allComparisons: "Alle Vergleiche",
    related: "Weitere Vergleiche",
  },
  footer: {
    tagline: "Wasserzeichen auf deine Dokumente, ohne dass sie je dein Gerät verlassen.",
    name: {
      pron: "/ka.ʃə.ti/",
      pos: "Substantiv",
      def: "Vom französischen cachet, dem Siegel, das ein Dokument beglaubigt, und cacher, verbergen. Ein Siegel auf dem, was du teilst, ein Schleier über dem Rest.",
    },
    support: "Projekt unterstützen",
    madeIn: "Made in France",
    by: "von",
    basedOn: "Basiert auf",
    inspiredBy: "das wiederum inspiriert ist von",
    license: "AGPL-3.0-Lizenz",
    source: "Quellcode",
    free: "Kostenloser Dienst, kein Tracking",
  },
};
