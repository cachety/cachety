import type { Guide } from "./types";

// Ratgeber auf Deutsch, vor allem für Deutschland (Personalausweis, PAuswG,
// Mieterselbstauskunft, Gehaltsabrechnung, Video-Ident), lesbar auch in
// Österreich und der Schweiz. Keine Übersetzungen, sondern lokale Entsprechungen.
// Nur reiner Text: keine Links, kein HTML, kein Markdown. Alle Firmen- und
// Personennamen in den Beispielen sind erfunden.

export const GUIDES_DE: Guide[] = [
  {
    slug: "personalausweis-kopie-wasserzeichen",
    topic: "id-card",
    title: "Personalausweis kopieren: So geht’s richtig, mit Wasserzeichen und Schwärzen",
    metaTitle: "Personalausweis-Kopie mit Wasserzeichen und Schwärzen",
    description:
      "Ausweiskopie richtig machen: als Kopie kennzeichnen, Zugangsnummer und Seriennummer schwärzen, Wasserzeichen setzen. Kostenlos und ohne Upload.",
    intro:
      "Ob Bank, Vermieter oder neuer Arbeitgeber: Eine Kopie des Personalausweises wird oft verlangt. Das Gesetz erlaubt sie, aber nur unter Bedingungen. Mit einem Wasserzeichen und ein paar geschwärzten Feldern erfüllst du sie und machst die Kopie für Betrüger fast wertlos.",
    example: "Kopie für Kontoeröffnung, Bank Elbtal, 11.10.2026",
    body: [
      { type: "h2", text: "Was das Personalausweisgesetz sagt" },
      {
        type: "p",
        text: "Nach § 20 des Personalausweisgesetzes darf der Ausweis nur vom Inhaber selbst oder mit seiner Zustimmung kopiert werden, und zwar so, dass die Kopie eindeutig und dauerhaft als Kopie erkennbar ist. Wer deine Kopie bekommt, darf sie nicht an Dritte weitergeben. Ein Wasserzeichen quer über die Kopie erfüllt die Anforderung „als Kopie erkennbar“ auf einfache Weise und sagt gleich dazu, für wen und wofür sie gedacht ist.",
      },
      { type: "h2", text: "Welche Felder du schwärzen solltest" },
      {
        type: "p",
        text: "Daten, die für die Identifizierung nicht gebraucht werden, darfst und solltest du auf der Kopie schwärzen. Das Bundesinnenministerium nennt ausdrücklich die Zugangsnummer und die Seriennummer.",
      },
      {
        type: "list",
        items: [
          "Die sechsstellige Zugangsnummer (CAN) unten rechts auf der Vorderseite.",
          "Die Seriennummer (Ausweisnummer) oben rechts auf der Vorderseite und auf der Rückseite.",
          "Die maschinenlesbare Zone auf der Rückseite, die drei Zeilen mit den vielen „<“-Zeichen, wenn der Empfänger sie nicht braucht.",
          "Je nach Zweck: Größe, Augenfarbe oder die Unterschrift.",
        ],
      },
      {
        type: "warning",
        text: "Banken und andere Stellen, die nach dem Geldwäschegesetz deine Identität prüfen müssen, dürfen eine vollständige Kopie verlangen. Frag im Zweifel vorher nach, welche Angaben du schwärzen darfst, sonst wird dein Antrag womöglich zurückgeschickt.",
      },
      { type: "h2", text: "Schritt für Schritt mit Cachety" },
      {
        type: "steps",
        items: [
          "Öffne cachety.com im Browser, am Computer oder auf dem Handy. Nichts installieren, kein Konto.",
          "Leg ein Foto oder einen Scan von Vorder- und Rückseite ab. iPhone-Fotos (HEIC) funktionieren auch.",
          "Gib unter „Wofür ist diese Kopie?“ den Zweck ein oder wähle ein Beispiel, dann unter „Wer bekommt sie?“ den Empfänger. Das Datum kommt automatisch dazu.",
          "Tippe unter der Vorschau auf „Etwas schwärzen“, zieh Rechtecke über Zugangsnummer und Seriennummer und tippe auf „Fertig“.",
          "Prüf in der Vorschau, dass Foto und Name lesbar bleiben, und lade die Kopie herunter. Schick nur diese Kopie, nie den Originalscan.",
        ],
      },
      {
        type: "p",
        text: "Dein Ausweis wird dabei nirgendwohin hochgeladen. Cachety arbeitet komplett in deinem Browser, es gibt keinen Server, der die Datei empfangen könnte. Wenn die Seite geladen ist, funktioniert sie sogar im Flugmodus.",
      },
      {
        type: "tip",
        text: "Vorder- und Rückseite gehören zusammen? Füge beide Fotos hinzu und lade sie als ein gemeinsames PDF herunter. Die Reihenfolge legst du selbst fest.",
      },
      { type: "h2", text: "Gilt das auch für den Reisepass?" },
      {
        type: "p",
        text: "Für den Reisepass gilt nach dem Passgesetz dieselbe Regel: Die Kopie muss eindeutig und dauerhaft als Kopie erkennbar sein. Auch hier hilft ein Wasserzeichen mit Zweck, Empfänger und Datum. Und ehrlich gesagt: Ein Wasserzeichen verhindert nicht, dass jemand die Kopie abfotografiert. Es macht Missbrauch aber deutlich unattraktiver und zeigt dir, woher ein Leck stammt.",
      },
    ],
    faq: [
      {
        q: "Darf ich meinen Personalausweis überhaupt kopieren?",
        a: "Ja. Du darfst ihn selbst kopieren oder kopieren lassen, wenn die Kopie eindeutig und dauerhaft als Kopie erkennbar ist. Der Empfänger darf sie nicht an Dritte weitergeben.",
      },
      {
        q: "Welche Nummer auf dem Ausweis soll ich schwärzen?",
        a: "Vor allem die sechsstellige Zugangsnummer (CAN) und die Seriennummer. Beide werden für die Identifizierung meist nicht gebraucht.",
      },
      {
        q: "Was schreibe ich ins Wasserzeichen?",
        a: "Zweck, Empfänger und Datum, zum Beispiel: Kopie für Kontoeröffnung, Bank Elbtal, 11.10.2026. Nur „Kopie“ reicht als Kennzeichnung, sagt aber nicht, wo die Kopie hingehört.",
      },
      {
        q: "Speichert Cachety meinen Ausweis?",
        a: "Nein. Die Datei wird in deinem Browser auf deinem Gerät verarbeitet und weder an Cachety noch an sonst jemanden geschickt.",
      },
    ],
    updated: "2026-10-12",
  },
  {
    slug: "mietbewerbung-unterlagen-wasserzeichen",
    topic: "rental",
    title: "Mietbewerbung: Unterlagen mit Wasserzeichen schützen",
    metaTitle: "Mietbewerbung: Unterlagen mit Wasserzeichen schützen",
    description:
      "Wohnung gesucht? Schütze Ausweis, Gehaltsnachweise und Schufa-Auskunft für die Mietbewerbung mit Wasserzeichen. Kostenlos, ohne Upload.",
    intro:
      "Wer in Deutschland eine Wohnung sucht, verschickt eine ganze Mappe an persönlichen Unterlagen, oft an mehrere Vermieter gleichzeitig. Ein Wasserzeichen zeigt, für wen jede Kopie bestimmt war, und macht sie für alle anderen wertlos.",
    example: "Mietbewerbung, Hausverwaltung Lindner, 11.10.2026",
    body: [
      { type: "h2", text: "Was Vermieter wann verlangen dürfen" },
      {
        type: "p",
        text: "Die Datenschutzkonferenz, das gemeinsame Gremium der deutschen Datenschutzbehörden, hat dazu eine Orientierungshilfe veröffentlicht. Die Grundregel: Vermieter dürfen nur so viel abfragen, wie in der jeweiligen Phase nötig ist. Bei der Besichtigung reichen Name und Kontaktdaten. Eine Ausweiskopie darf dort nicht angefertigt werden; erlaubt ist höchstens, dass der Vermieter einen Blick auf deinen Ausweis wirft. Angaben zum Einkommen sind erst gefragt, wenn du die Wohnung konkret mieten willst.",
      },
      {
        type: "list",
        items: [
          "Mieterselbstauskunft: nur Fragen, die für den Mietvertrag wirklich wichtig sind.",
          "Einkommensnachweise: meist die letzten Gehaltsabrechnungen oder eine Bescheinigung des Arbeitgebers.",
          "Bonitätsauskunft, zum Beispiel eine Schufa-Auskunft.",
          "Manchmal eine Mietschuldenfreiheitsbescheinigung vom bisherigen Vermieter.",
        ],
      },
      { type: "h2", text: "Vorsicht vor Fake-Wohnungsanzeigen" },
      {
        type: "p",
        text: "Eine beliebte Masche: Eine schöne Wohnung zum günstigen Preis, der „Vermieter“ ist angeblich im Ausland und will vorab eine Ausweiskopie und eine Kaution, bevor er den Schlüssel schickt. Die Wohnung gibt es nicht, und mit deiner Ausweiskopie werden später Konten oder Verträge auf deinen Namen abgeschlossen. Eine Kopie mit dem Wasserzeichen „Mietbewerbung, Hausverwaltung Lindner“ taugt für so etwas kaum.",
      },
      {
        type: "warning",
        text: "Schick nie eine Ausweiskopie oder Geld für eine Wohnung, die du nicht besichtigt hast. Wenn du glaubst, auf eine Fake-Anzeige hereingefallen zu sein, melde sie dem Portal und erstatte Anzeige bei der Polizei.",
      },
      { type: "h2", text: "So schützt du deine Mappe mit Cachety" },
      {
        type: "steps",
        items: [
          "Öffne cachety.com im Browser. Keine Installation, kein Konto.",
          "Leg alle Unterlagen auf einmal ab: Ausweis, Gehaltsabrechnungen, Schufa-Auskunft.",
          "Wähle das Beispiel „Wohnung“ und gib unter „Wer bekommt sie?“ den Namen der Hausverwaltung ein. Das Datum kommt automatisch dazu.",
          "Prüf jede Seite in der Vorschau und schwärze mit „Etwas schwärzen“, was der Vermieter nicht braucht.",
          "Wähle „Ein PDF“ und lade alles als ein gemeinsames PDF herunter, in der Reihenfolge deiner Wahl. Viele Portale mögen eine einzige Datei lieber.",
        ],
      },
      {
        type: "tip",
        text: "Du bewirbst dich bei mehreren Wohnungen? Füge jede Hausverwaltung mit „+ Weiteren Empfänger hinzufügen“ hinzu: Jede bekommt ihre eigene Kopie mit ihrem Namen. Taucht eine Kopie irgendwo auf, weißt du sofort, woher sie kommt.",
      },
      { type: "h2", text: "Was du schwärzen kannst" },
      {
        type: "p",
        text: "Auf der Gehaltsabrechnung interessiert den Vermieter das Nettoeinkommen, nicht deine Steuer-ID, deine Sozialversicherungsnummer oder deine Konfession, die sich aus der Kirchensteuer ergibt. Auf der Ausweiskopie kannst du Zugangsnummer und Seriennummer schwärzen. Was du schwärzt, wird wirklich aus der Datei entfernt, nicht nur überdeckt. Deine Dateien verlassen dabei nie dein Gerät.",
      },
    ],
    faq: [
      {
        q: "Akzeptiert ein Vermieter Unterlagen mit Wasserzeichen?",
        a: "In aller Regel ja. Das Wasserzeichen ist halbtransparent, alle Angaben bleiben lesbar. Die Deckkraft kannst du anpassen.",
      },
      {
        q: "Muss ich schon bei der Besichtigung eine Ausweiskopie abgeben?",
        a: "Nach der Orientierungshilfe der Datenschutzkonferenz nicht: Bei der Besichtigung reichen Name und Kontaktdaten, eine Ausweiskopie ist dort unzulässig.",
      },
      {
        q: "Was schreibe ich ins Wasserzeichen?",
        a: "Zweck, Empfänger und Datum, zum Beispiel: Mietbewerbung, Hausverwaltung Lindner, 11.10.2026.",
      },
      {
        q: "Das Portal sagt, meine Datei ist zu groß. Was tun?",
        a: "Vor dem Download siehst du die Dateigröße. Tippe auf „Verkleinern“ und wähle 10, 5, 2 oder 1 MB. Cachety hält jede Datei unter dieser Grenze.",
      },
    ],
    updated: "2026-10-12",
  },
  {
    slug: "gehaltsabrechnung-steuerbescheid-sicher-senden",
    topic: "tax-payslip",
    title: "Gehaltsabrechnung und Steuerbescheid sicher verschicken",
    metaTitle: "Gehaltsabrechnung und Steuerbescheid sicher verschicken",
    description:
      "Gehaltsnachweis oder Steuerbescheid verlangt? So schwärzt du Steuer-ID und Sozialversicherungsnummer und setzt ein Wasserzeichen, ohne Upload.",
    intro:
      "Gehaltsabrechnungen und Steuerbescheide brauchst du für den Kredit, die Wohnung, das Elterngeld oder die Kita-Gebühren. Sie verraten aber viel mehr als dein Einkommen. So verschickst du nur das, was wirklich gebraucht wird.",
    example: "Einkommensnachweis, Kreditantrag Bank Elbtal, 11.10.2026",
    body: [
      { type: "h2", text: "Was in diesen Dokumenten steht" },
      {
        type: "p",
        text: "Eine Gehaltsabrechnung zeigt nicht nur Brutto und Netto. Darauf stehen auch deine Steuer-Identifikationsnummer, deine Sozialversicherungsnummer, deine Steuerklasse, deine Krankenkasse, deine IBAN und über die Kirchensteuer sogar deine Konfession. Ein Steuerbescheid enthält Steuer-ID, Steuernummer, alle Einkünfte und oft die Bankverbindung. Zusammen mit einer Ausweiskopie ist das genau das Material, das jemand braucht, um sich als du auszugeben.",
      },
      { type: "h2", text: "Was du schwärzen kannst" },
      {
        type: "list",
        items: [
          "Steuer-ID und Sozialversicherungsnummer, wenn der Empfänger sie nicht ausdrücklich braucht.",
          "Das Kirchensteuermerkmal: Deine Religion geht einen Vermieter nichts an.",
          "Die IBAN, oft genügen die letzten vier Ziffern.",
          "Angaben zu Pfändungen, Unterhalt oder Partnern, wenn sie für den Zweck keine Rolle spielen.",
        ],
      },
      {
        type: "warning",
        text: "Bei Krediten, Elterngeld oder Sozialleistungen verlangen Banken und Behörden manchmal vollständige Unterlagen. Frag vorher, was du schwärzen darfst, sonst verzögert sich dein Antrag.",
      },
      { type: "h2", text: "Ein Wasserzeichen auf jede Seite" },
      {
        type: "p",
        text: "Schreib Zweck, Empfänger und Datum ins Wasserzeichen, zum Beispiel „Einkommensnachweis, Kreditantrag Bank Elbtal, 11.10.2026“. Der Text wird diagonal über jede Seite wiederholt, so lässt sich keine Seite sauber herausschneiden und anderswo verwenden.",
      },
      { type: "h2", text: "So geht’s mit Cachety" },
      {
        type: "steps",
        items: [
          "Öffne cachety.com im Browser.",
          "Leg deine Abrechnungen oder den Steuerbescheid ab. PDFs aus dem Online-Banking, aus DATEV-Portalen oder aus ELSTER funktionieren genauso wie Fotos von Papier.",
          "Wähle ein Beispiel wie „Steuer“ oder „Kredit“ und gib unter „Wer bekommt sie?“ den Empfänger ein. Das Datum kommt automatisch dazu.",
          "Tippe unter der Vorschau auf „Etwas schwärzen“, zieh Rechtecke über die Angaben, die du verbergen willst, und tippe auf „Fertig“.",
          "Prüf jede Seite, wähle „Ein PDF“ oder „Einzelne Dateien (ZIP)“ und lade alles herunter.",
        ],
      },
      {
        type: "tip",
        text: "Tippe auf „Text bearbeiten“ und füge {Code} ein, etwa „Ref. {Code}“. Jede Kopie bekommt dann ihren eigenen kurzen Code, und nach dem Download erhältst du die Liste der Codes („Liste speichern“). Taucht eine Abrechnung irgendwo auf, weißt du, welche Kopie es war.",
      },
      {
        type: "p",
        text: "Deine Unterlagen bleiben die ganze Zeit auf deinem Gerät. Nichts wird hochgeladen, und geschwärzte Bereiche werden wirklich aus der Datei entfernt. Ein Wasserzeichen verhindert kein Foto vom Bildschirm, aber es macht Missbrauch nachverfolgbar und deutlich weniger verlockend.",
      },
    ],
    faq: [
      {
        q: "Wird eine Gehaltsabrechnung mit Wasserzeichen akzeptiert?",
        a: "Meistens ja. Das Wasserzeichen ist halbtransparent, jede Zahl bleibt lesbar. Die Deckkraft lässt sich verringern.",
      },
      {
        q: "Darf ich die Steuer-ID auf der Gehaltsabrechnung schwärzen?",
        a: "Für den Vermieter in der Regel ja, er braucht sie nicht. Banken oder Behörden können anderes verlangen, frag im Zweifel nach.",
      },
      {
        q: "Ich habe nur ein Foto der Abrechnung. Geht das?",
        a: "Ja. Cachety versieht auch Fotos mit einem Wasserzeichen und kann mehrere Bilder zu einem PDF zusammenfassen.",
      },
      {
        q: "Lädt Cachety meine Unterlagen hoch?",
        a: "Nein. Alles passiert in deinem Browser. Nach dem Laden der Seite funktioniert Cachety sogar im Flugmodus.",
      },
    ],
    updated: "2026-10-12",
  },
  {
    slug: "pdf-schwaerzen-kostenlos",
    topic: "redact",
    title: "PDF richtig schwärzen, kostenlos und ohne Upload",
    metaTitle: "PDF richtig schwärzen: kostenlos und ohne Upload",
    description:
      "PDF kostenlos schwärzen und sicher sein, dass der Text darunter wirklich weg ist. Warum schwarze Balken oft versagen und wie es richtig geht.",
    intro:
      "Ein schwarzer Balken über einer Nummer sieht aus, als wäre sie verschwunden. In vielen PDFs steht der Text aber noch darunter, und jeder kann ihn herauskopieren. So schwärzt du richtig, kostenlos.",
    example: "Wohnsitznachweis, Stadtwerke Lindenau, 11.10.2026",
    body: [
      { type: "h2", text: "Warum ein schwarzer Balken nicht immer reicht" },
      {
        type: "p",
        text: "Ein PDF besteht aus Ebenen. Zeichnest du in vielen Programmen ein schwarzes Rechteck, legst du nur eine Form obendrauf. Der ursprüngliche Text bleibt in der Datei. Man kann ihn markieren, kopieren und woanders einfügen, und schon ist er wieder da. Das ist schon vielen Menschen und sogar Behörden passiert, weil auf dem Bildschirm alles in Ordnung aussieht.",
      },
      {
        type: "tip",
        text: "Der schnelle Test für jedes geschwärzte PDF: Versuch, den Text unter dem Balken zu markieren, oder such mit der Suchfunktion deines PDF-Readers nach einem Wort, das du geschwärzt hast. Wird es gefunden, hat die Schwärzung nicht funktioniert.",
      },
      { type: "h2", text: "Wie Cachety schwärzt" },
      {
        type: "p",
        text: "Cachety legt keinen Balken obendrauf. Jede Seite wird als Bild neu aufgebaut, und der geschwärzte Bereich ist darin wirklich schwarz. Der verborgene Text ist aus der Datei verschwunden, ebenso die markierbare Textebene und versteckte Angaben wie Autor oder der GPS-Standort eines Fotos.",
      },
      {
        type: "steps",
        items: [
          "Öffne cachety.com im Browser. Keine Anmeldung nötig.",
          "Leg dein PDF oder Bild ab. JPG, PNG, HEIC und andere gängige Formate gehen auch.",
          "Gib an, wofür die Kopie ist und wer sie bekommt. Das Datum kommt automatisch dazu.",
          "Tippe unter der Vorschau auf „Etwas schwärzen“, zieh Rechtecke über alles, was verschwinden soll, und tippe auf „Fertig“.",
          "Prüf die Vorschau auf jeder Seite und lade die geschwärzte Kopie herunter.",
        ],
      },
      { type: "h2", text: "Was häufig geschwärzt wird" },
      {
        type: "list",
        items: [
          "IBAN und Kontonummern.",
          "Steuer-ID und Sozialversicherungsnummer.",
          "Zugangsnummer und Seriennummer auf der Ausweiskopie.",
          "Gesundheitsdaten oder Angaben zu Kindern und anderen Familienmitgliedern.",
          "Unterschriften, wenn die Kopie nur zur Information dient.",
        ],
      },
      { type: "h2", text: "Privat von Anfang an" },
      {
        type: "p",
        text: "Viele kostenlose Online-Tools zum Schwärzen laden dein Dokument erst auf ihre Server. Eigentlich seltsam, wenn man genau diese Angaben schützen will. Bei Cachety bleibt die Datei auf deinem Gerät, nichts wird verschickt, und nach dem Laden funktioniert die Seite sogar im Flugmodus.",
      },
      {
        type: "warning",
        text: "Weil die geschwärzte Kopie aus Bildern besteht, kannst du ihren Text nicht mehr durchsuchen oder kopieren. Genau das ist der Zweck. Bewahr das Original aber an einem sicheren Ort auf.",
      },
    ],
    faq: [
      {
        q: "Kann ich ein PDF ohne Adobe Acrobat schwärzen?",
        a: "Ja. Cachety ist kostenlos, läuft in jedem aktuellen Browser und entfernt das Geschwärzte wirklich, statt es nur abzudecken.",
      },
      {
        q: "Lässt sich geschwärzter Text wiederherstellen?",
        a: "Wenn er nur mit einer Form abgedeckt wurde, oft ja. Bei Cachety wird der Bereich aus der Datei selbst entfernt, es bleibt kein versteckter Text übrig.",
      },
      {
        q: "Muss ich ein Wasserzeichen setzen, um zu schwärzen?",
        a: "Cachety ist um das Wasserzeichen herum gebaut, ein kurzer Text gehört also dazu. Zweck, Empfänger und Datum sind ohnehin eine gute Gewohnheit.",
      },
      {
        q: "Wie groß darf das PDF sein?",
        a: "Bis zu 200 MB pro Datei und 500 Seiten pro PDF. Schwärzen ist auf den ersten Seiten eines Dokuments möglich, die Vorschau zeigt dir, wie viele es sind.",
      },
    ],
    updated: "2026-10-12",
  },
  {
    slug: "wasserzeichen-auf-dem-handy",
    topic: "phone",
    title: "Wasserzeichen auf dem Handy setzen, auf iPhone und Android",
    metaTitle: "Wasserzeichen auf dem Handy: iPhone und Android, gratis",
    description:
      "Dokumente und Fotos auf iPhone oder Android mit Wasserzeichen versehen, kostenlos und ohne App aus dem Store. HEIC-Fotos gehen, kein Upload.",
    intro:
      "Die meisten fotografieren ihre Unterlagen heute mit dem Handy und schicken sie gleich weiter. Das Wasserzeichen kannst du direkt dort setzen, in einer Minute und ohne etwas aus dem App Store zu installieren.",
    example: "Bewerbung, Personalabteilung Brenner Logistik, 11.10.2026",
    body: [
      { type: "h2", text: "Warum direkt auf dem Handy" },
      {
        type: "p",
        text: "Auf dem Handy liegen die Fotos deiner Dokumente ohnehin. Also kannst du sie auch dort mit einem Wasserzeichen versehen, ohne sie dir selbst zu mailen oder auf den Computer zu übertragen. Cachety läuft im Browser deines Handys, etwa in Safari oder Chrome. Deine Fotos werden auf dem Handy selbst verarbeitet und nie hochgeladen. Es ist dasselbe Tool wie am Computer, mit Beispielen, Schwärzen, mehreren Empfängern und optionalem Passwort.",
      },
      { type: "h2", text: "Schritt für Schritt" },
      {
        type: "steps",
        items: [
          "Öffne cachety.com in Safari, Chrome oder deinem gewohnten Browser.",
          "Tippe auf die Ablagefläche und wähle die Fotos oder PDFs, die du schicken willst. Mehrere auf einmal gehen auch.",
          "Gib an, wofür die Kopie ist, oder wähle ein Beispiel, dann, wer sie bekommt. Das Datum kommt automatisch dazu.",
          "Prüf die Vorschau.",
          "Lade die Kopie herunter und teile sie per Mail, WhatsApp, Signal oder der App deiner Wahl. Lösch danach überflüssige Kopien ohne Wasserzeichen.",
        ],
      },
      { type: "h2", text: "iPhone-Fotos (HEIC) funktionieren auch" },
      {
        type: "p",
        text: "iPhones speichern Fotos meist im Format HEIC, das manche Websites ablehnen. Cachety nimmt HEIC genauso an wie JPG, PNG, WebP und PDF. Du kannst also Fotos direkt aus deiner Mediathek verwenden.",
      },
      {
        type: "tip",
        text: "Handyfotos enthalten oft den GPS-Standort, an dem sie aufgenommen wurden, und das ist häufig deine Wohnung. Cachety entfernt diese versteckten Angaben aus der Kopie.",
      },
      { type: "h2", text: "Auf den Startbildschirm legen" },
      {
        type: "p",
        text: "Du kannst Cachety wie eine App installieren. Auf dem iPhone tippst du in Safari auf „Teilen“ und dann auf „Zum Home-Bildschirm“. Auf Android wählst du im Browsermenü „App installieren“ oder „Zum Startbildschirm hinzufügen“. Auf Android gibt es einen Bonus: Nach der Installation erscheint Cachety im Teilen-Menü. In der Galerie oder der Dateien-App tippst du bei einem Dokument auf „Teilen“ und wählst Cachety.",
      },
      {
        type: "list",
        items: [
          "Kostenlos, ohne Konto und ohne Tracking.",
          "Funktioniert nach dem Laden der Seite auch ohne Internet.",
          "Mehrere Empfänger: Jeder bekommt seine eigene Kopie mit seinem Namen.",
          "Optionales Passwort für das heruntergeladene PDF.",
        ],
      },
      {
        type: "warning",
        text: "Ein Wasserzeichen schreckt vor Missbrauch ab und macht ein Leck nachverfolgbar, aber es verhindert keinen Screenshot. Schick Dokumente nur an Empfänger, die du geprüft hast.",
      },
    ],
    faq: [
      {
        q: "Muss ich eine App herunterladen?",
        a: "Nein. Cachety läuft im Browser deines Handys. Du kannst es auf den Startbildschirm legen, musst aber nicht.",
      },
      {
        q: "Geht das auch auf älteren Handys?",
        a: "Es funktioniert in jeder aktuellen Version von Safari oder Chrome. Sehr große PDFs brauchen auf älteren Geräten etwas länger.",
      },
      {
        q: "Werden meine Fotos irgendwo hochgeladen?",
        a: "Nein. Alles passiert auf deinem Handy. Nach dem Laden der Seite kannst du sogar den Flugmodus einschalten.",
      },
      {
        q: "Kann ich direkt aus Cachety ein Foto machen?",
        a: "Wenn du eine Datei auswählst, bietet dir dein Handy oft an, ein Foto aufzunehmen oder eines aus der Mediathek zu wählen. Ein scharfes, gut beleuchtetes Foto gibt das beste Ergebnis.",
      },
    ],
    updated: "2026-10-12",
  },
  {
    slug: "video-ident-ausweis-hochladen",
    topic: "online-verification",
    title: "Video-Ident und Ausweis hochladen: Worauf du achten solltest",
    metaTitle: "Video-Ident und Ausweis hochladen: worauf achten?",
    description:
      "Ausweis online hochladen oder per Video-Ident zeigen? Wann ein Wasserzeichen hilft, wann nicht, und wie du die Fake-Job-Masche erkennst.",
    intro:
      "Konto eröffnen, Handyvertrag abschließen, Mietwagen buchen: Immer öfter musst du dich online ausweisen. Mal lädst du ein Foto deines Ausweises hoch, mal hältst du ihn in einem Video-Ident in die Kamera. Hier erfährst du, wo ein Wasserzeichen hilft und wo Vorsicht wichtiger ist.",
    example: "Identitätsprüfung, Handyvertrag Funkwerk Mobil, 11.10.2026",
    body: [
      { type: "h2", text: "Zwei Arten, sich online auszuweisen" },
      {
        type: "p",
        text: "Beim Video-Ident sprichst du live mit einem Mitarbeiter und zeigst deinen Ausweis in die Kamera. Ein Wasserzeichen ist hier nicht möglich und auch nicht vorgesehen, denn geprüft werden die echten Sicherheitsmerkmale. Anders ist es, wenn eine Firma dich bittet, ein Foto oder einen Scan hochzuladen oder per Mail zu schicken. Diese Kopie kannst und solltest du schützen.",
      },
      { type: "h2", text: "Die Fake-Job-Masche" },
      {
        type: "p",
        text: "Die Verbraucherzentralen warnen vor einer verbreiteten Betrugsmasche: ein angeblicher Nebenjob als App-Tester von zu Hause. Du sollst einen Arbeitsvertrag unterschreiben, eine Ausweiskopie schicken und dann zum „Testen“ ein Video-Ident für ein neues Bankkonto durchlaufen. Das Konto wird angeblich danach gelöscht. In Wahrheit läuft es auf deinen Namen und wird für Geldwäsche oder Fake-Shops benutzt. Ärger mit Bank und Polizei bekommst dann du.",
      },
      {
        type: "warning",
        text: "Kein seriöser Arbeitgeber lässt dich für einen Job ein Bankkonto per Video-Ident eröffnen. Hast du das schon getan, ruf sofort die Bank an, lass das Konto sperren und erstatte Anzeige bei der Polizei.",
      },
      { type: "h2", text: "Wenn du eine Ausweiskopie hochladen musst" },
      {
        type: "steps",
        items: [
          "Prüf zuerst, ob die Firma echt ist: Impressum, bekannte Website, keine Anfrage per Messenger von Fremden.",
          "Öffne cachety.com und leg das Foto deines Ausweises ab.",
          "Gib an, wofür die Kopie ist und wer sie bekommt. Das Datum kommt automatisch dazu.",
          "Schwärze Zugangsnummer und Seriennummer, wenn der Empfänger sie nicht braucht.",
          "Viele Upload-Formulare erlauben nur wenige MB: Ist die angezeigte Dateigröße zu hoch, tippe auf „Verkleinern“. Dann lade die Kopie herunter.",
        ],
      },
      {
        type: "tip",
        text: "Stell die Deckkraft so ein, dass Foto und Angaben gut lesbar bleiben. Lehnt ein Anbieter Kopien mit Wasserzeichen trotzdem ab, frag nach einem anderen Weg, etwa der Online-Ausweisfunktion deines Personalausweises.",
      },
      { type: "h2", text: "Die Online-Ausweisfunktion als Alternative" },
      {
        type: "p",
        text: "Viele Banken und Behörden akzeptieren die Online-Ausweisfunktion: Du hältst den Ausweis ans Handy und gibst deine PIN ein. Dabei werden nur die Daten übermittelt, die der Anbieter mit staatlicher Berechtigung abfragen darf, und es entsteht keine Bildkopie deines Ausweises. Wo das angeboten wird, ist es oft die sicherere Wahl.",
      },
      {
        type: "p",
        text: "Cachety verarbeitet dein Ausweisfoto übrigens nur in deinem Browser. Es gibt keinen Server, der die Datei empfangen könnte.",
      },
    ],
    faq: [
      {
        q: "Kann ich beim Video-Ident ein Wasserzeichen verwenden?",
        a: "Nein. Beim Video-Ident zeigst du den echten Ausweis live in die Kamera. Ein Wasserzeichen schützt nur Kopien, die du hochlädst oder verschickst.",
      },
      {
        q: "Woran erkenne ich die App-Tester-Masche?",
        a: "Du sollst für einen Nebenjob ein Konto per Video-Ident eröffnen oder Zugangsdaten weitergeben. Das macht kein seriöser Arbeitgeber.",
      },
      {
        q: "Was schreibe ich ins Wasserzeichen beim Upload?",
        a: "Zweck, Empfänger und Datum, zum Beispiel: Identitätsprüfung, Handyvertrag Funkwerk Mobil, 11.10.2026.",
      },
    ],
    updated: "2026-10-12",
  },
  {
    slug: "identitaetsdiebstahl-ausweiskopie",
    topic: "identity-theft",
    title: "Identitätsdiebstahl mit der Ausweiskopie: vorbeugen und richtig reagieren",
    metaTitle: "Identitätsdiebstahl mit Ausweiskopie: vorbeugen",
    description:
      "Wie Betrüger Ausweiskopien missbrauchen, wie du deine Kopien schützt und was du tust, wenn deine Identität gestohlen wurde. Einfach erklärt.",
    intro:
      "Mit einer guten Kopie deines Ausweises können Betrüger Verträge abschließen, Waren bestellen oder Konten eröffnen, und die Rechnungen landen bei dir. Ein paar einfache Gewohnheiten machen deine Kopien für sie fast wertlos.",
    example: "Nur für Versicherungsantrag, Versicherung Rheintal, 11.10.2026",
    body: [
      { type: "h2", text: "Wie Ausweiskopien missbraucht werden" },
      {
        type: "p",
        text: "Ausweiskopien landen auf vielen Wegen bei Betrügern: über gehackte Postfächer, Fake-Wohnungsanzeigen, gefälschte Stellenangebote oder Datenlecks bei Firmen. Mit Name, Geburtsdatum, Foto und Adresse bestellen sie auf Rechnung, schließen Handyverträge ab oder eröffnen Konten, über die dann Geld aus anderen Betrügereien fließt. Oft merkst du es erst, wenn Mahnungen oder ein Inkassoschreiben kommen.",
      },
      { type: "h2", text: "Vorbeugen: drei Gewohnheiten" },
      {
        type: "list",
        items: [
          "Nur verschicken, was wirklich verlangt wird, und nur an Empfänger, die du geprüft hast.",
          "Jede Kopie mit Wasserzeichen versehen: Zweck, Empfänger, Datum.",
          "Schwärzen, was nicht gebraucht wird, vor allem Zugangsnummer und Seriennummer des Ausweises.",
        ],
      },
      {
        type: "p",
        text: "Eine Kopie mit dem Wasserzeichen „Nur für Versicherungsantrag, Versicherung Rheintal, 11.10.2026“ lässt sich bei einem Online-Händler oder einer Bank kaum noch glaubwürdig vorzeigen. Und wenn sie doch auftaucht, weißt du, woher sie stammt.",
      },
      { type: "h2", text: "So versiehst du deine Kopien mit Cachety" },
      {
        type: "steps",
        items: [
          "Öffne cachety.com im Browser, ohne Konto und ohne Installation.",
          "Leg deine Ausweiskopie und die übrigen Unterlagen ab.",
          "Gib den Zweck ein oder wähle ein Beispiel, dann jeden Empfänger mit „+ Weiteren Empfänger hinzufügen“. Das Datum kommt automatisch dazu.",
          "Tippe auf „Text bearbeiten“ und füge {Code} ein, damit jede Kopie ihren eigenen kurzen Code bekommt, und bewahre die Liste nach dem Download auf („Liste speichern“).",
          "Prüf die Vorschau und lade die Kopien herunter.",
        ],
      },
      {
        type: "tip",
        text: "Die eindeutige Referenz ist bei einem Verdacht Gold wert: Du kannst der Polizei sagen, welcher Empfänger genau diese Kopie bekommen hat.",
      },
      { type: "h2", text: "Wenn es schon passiert ist" },
      {
        type: "steps",
        items: [
          "Erstatte Anzeige bei der Polizei, vor Ort oder über die Onlinewache deines Bundeslandes. Die Anzeige brauchst du gegenüber Firmen und Inkassobüros.",
          "Widersprich unbekannten Forderungen schriftlich und leg die Anzeige bei.",
          "Informiere deine Bank und lass verdächtige Konten oder Karten sperren.",
          "Fordere bei der Schufa und anderen Auskunfteien deine kostenlose Datenkopie an und prüfe, ob fremde Verträge eingetragen sind.",
          "Ist dein Ausweis verloren oder gestohlen, melde das beim Bürgeramt oder der Polizei und lass die Online-Ausweisfunktion über die Sperrhotline 116 116 sperren.",
        ],
      },
      {
        type: "warning",
        text: "Ein Wasserzeichen ist ein guter Schutz, aber keine Garantie: Niemand kann verhindern, dass eine Kopie abfotografiert wird. Es macht Missbrauch nur deutlich schwieriger und nachverfolgbar.",
      },
    ],
    faq: [
      {
        q: "Kann jemand mit meiner Ausweiskopie ein Konto eröffnen?",
        a: "Seriöse Banken prüfen die Identität mit dem echten Ausweis, etwa per Video-Ident. Bei Online-Händlern und manchen Verträgen reicht Betrügern aber oft eine Kopie. Ein Wasserzeichen mit Zweck und Empfänger macht das deutlich schwerer.",
      },
      {
        q: "Woran merke ich, dass meine Identität missbraucht wird?",
        a: "An Rechnungen oder Mahnungen für Bestellungen, die du nicht kennst, an Post von unbekannten Firmen oder an Einträgen in deiner Schufa-Auskunft.",
      },
      {
        q: "Speichert Cachety meine Unterlagen?",
        a: "Nein. Alles wird in deinem Browser verarbeitet, nichts wird hochgeladen oder gespeichert.",
      },
    ],
    updated: "2026-10-12",
  },

  // Draft translation from the English guide, awaiting native review (ROADMAP.md, backlog: Native review).
  // Ratgeber zum Unterschreiben (Werkzeug Unterschreiben, /de/sign).
  {
    slug: "mietvertrag-online-unterschreiben",
    topic: "sign",
    tool: "sign",
    title: "Mietvertrag und Mietunterlagen online unterschreiben, ohne sie hochzuladen",
    metaTitle: "Mietvertrag online unterschreiben: kostenlos, ohne Upload",
    description:
      "Unterschreibe Mietvertrag, Übergabeprotokoll oder Selbstauskunft im Browser: Unterschrift zeichnen oder tippen, platzieren, fertig. Kein Upload.",
    intro:
      "Makler und Vermieter schicken den Mietvertrag oft als PDF und wollen ihn unterschrieben per E-Mail zurück. Du musst dafür nichts ausdrucken, scannen oder ein Konto anlegen: Du unterschreibst in etwa einer Minute im Browser, und das Dokument verlässt nie dein Gerät.",
    example: "Unterschriebener Mietvertrag – nur für Hausverwaltung Berger – 17.10.2026",
    body: [
      { type: "h2", text: "Was du bei einer Wohnung unterschreiben sollst" },
      {
        type: "p",
        text: "Eine Wohnung zu mieten heißt Papierkram: der Mietvertrag selbst, das Übergabeprotokoll beim Einzug, oft eine Mieterselbstauskunft. Meist kommt alles als PDF mit einer Zeile für die Unterschrift. Üblich ist entweder eine Signatur-Website, auf die du die Datei hochlädst und für die du ein Konto brauchst, oder Ausdrucken, Unterschreiben, Einscannen und Zurückschicken. Cachety erledigt das stattdessen in deinem Browser.",
      },
      { type: "h2", text: "So unterschreibst du deine Mietunterlagen mit Cachety" },
      {
        type: "steps",
        items: [
          "Öffne cachety.com/de/sign im Browser, am Computer oder auf dem Handy. Nichts installieren, kein Konto.",
          "Deine Dokumente: Leg das PDF auf der Seite ab oder tippe, um es auszuwählen. Mehrere Dateien auf einmal gehen auch, zum Beispiel Mietvertrag und Übergabeprotokoll. Ein Foto eines Papierdokuments funktioniert ebenfalls: Es wird zu einem einseitigen PDF.",
          "Deine Unterschrift: Zeichne sie mit dem Finger, einem Eingabestift oder der Maus, tippe deinen Namen oder lade ein Foto deiner Unterschrift auf weißem Papier hoch. Darunter kannst du das heutige Datum stehen lassen und, wenn du willst, den Ort und einen kurzen Vermerk wie „Gelesen und genehmigt“ ergänzen.",
          "Platzieren, prüfen, herunterladen: Deine Unterschrift erscheint unten rechts auf der letzten Seite. Zieh sie auf die Unterschriftszeile und vergrößere oder verkleinere sie über die Ecke. Wenn der Vermieter auf jeder Seite ein Kürzel möchte, schalte das Paraphieren aller Seiten ein.",
          "Prüf die Vorschau und lade die Datei herunter. Die unterschriebene Kopie behält den ursprünglichen Namen mit -signed am Ende. Diese Kopie schickst du zurück.",
        ],
      },
      {
        type: "p",
        text: "Bei mehreren Dokumenten bekommt jedes seine eigene Platzierung. Ein Dokument ist erst fertig, wenn deine Unterschrift darauf ist: Die Liste zeigt dir, welche noch warten.",
      },
      {
        type: "tip",
        text: "Nach dem Herunterladen zeigt Cachety einen Fingerabdruck jeder Datei: einen kurzen Code, berechnet aus genau der Datei, die du verschickt hast. Kopier ihn und heb ihn bei deinen Unterlagen auf. Taucht irgendwann eine andere Fassung des Vertrags auf, kannst du zeigen, dass es nicht die ist, die du unterschrieben hast.",
      },
      { type: "h2", text: "Optionen, die du kennen solltest" },
      {
        type: "list",
        items: [
          "Alle Seiten paraphieren setzt eine kleine Kopie deiner Unterschrift unten rechts auf jede andere Seite. So fällt eine ausgetauschte Seite leichter auf.",
          "„Mit Passwort schützen“ ist standardmäßig aus, denn der Vermieter muss die Datei öffnen können. Schalte es nur ein, wenn du ihm das Passwort auf anderem Weg gibst, zum Beispiel am Telefon.",
          "„Verkleinern“ hilft, wenn das E-Mail-Postfach oder das Portal die Dateigröße begrenzt.",
          "Zusätzlich ein Wasserzeichen schreibt Zweck, Empfänger und Datum quer über die unterschriebene Kopie.",
        ],
      },
      { type: "h2", text: "Deine Unterlagen verlassen nie dein Gerät" },
      {
        type: "p",
        text: "Cachety arbeitet in deinem Browser. Es gibt keinen Server, der deine Dokumente empfängt, und der Seite ist technisch verboten, eine andere Website zu kontaktieren. Prüf es selbst: Wenn die Seite geladen ist, schalte den Flugmodus ein und unterschreib dann dein Dokument. Alles funktioniert weiter. Auch deine Unterschrift wird nicht gespeichert: Sie existiert nur im Speicher des Tabs und ist weg, sobald du ihn schließt.",
      },
      {
        type: "p",
        text: "Jede Seite der unterschriebenen Kopie wird aus ihren Pixeln neu aufgebaut. Das entfernt versteckten Text und Metadaten, und der Text lässt sich in der unterschriebenen Kopie nicht mehr markieren. Dein Original bleibt unverändert bei dir.",
      },
      { type: "h2", text: "Ist diese Unterschrift für einen Mietvertrag gültig?" },
      {
        type: "p",
        text: "Eine Unterschrift, die du zeichnest oder tippst und auf das Dokument setzt, ist rechtlich eine einfache elektronische Signatur. In der EU darf einer Signatur die Rechtswirkung nicht allein deshalb abgesprochen werden, weil sie elektronisch ist (eIDAS-Verordnung, Artikel 25). Für alltägliche Mietunterlagen reicht das in der Regel. Die Regeln unterscheiden sich aber je nach Land und Dokument.",
      },
      {
        type: "p",
        text: "Wird die Unterschrift einmal angezweifelt, musst du unter Umständen selbst zeigen, dass du unterschrieben hast. Eine qualifizierte Signatur, erstellt mit einem Zertifikat eines zugelassenen Anbieters, genießt eine Vermutung der Zuverlässigkeit, die eine einfache Signatur nicht hat.",
      },
      {
        type: "warning",
        text: "Das ist nicht das richtige Werkzeug, wenn eine qualifizierte Signatur verlangt wird oder die andere Seite auf einer bestimmten Plattform besteht: manche Kredit- und Versicherungsverträge, notarielle Urkunden, bestimmte Behördenverfahren. Nutze dann, was verlangt wird. Das ist keine Rechtsberatung.",
      },
      { type: "h2", text: "Kann jemand meine Unterschrift wiederverwenden?" },
      {
        type: "p",
        text: "Deine Unterschrift ist Teil des Bildes jeder Seite. Man kann sie also nicht verschieben oder löschen, indem man das PDF bearbeitet. Aber wie bei einer eingescannten Unterschrift auf Papier könnte jemand sie aus dem Bild ausschneiden und woanders einfügen. Das kann kein Bild einer Unterschrift verhindern. Um das Risiko zu senken, füge ein Wasserzeichen hinzu, das die Kopie an Zweck und Empfänger bindet, und paraphiere jede Seite.",
      },
    ],
    faq: [
      {
        q: "Akzeptiert ein Vermieter einen so unterschriebenen Vertrag?",
        a: "In den meisten Fällen ja: Ein unterschriebenes PDF per E-Mail zurückzuschicken ist bei Mietunterlagen üblich. Wenn die Hausverwaltung eine eigene Signaturplattform nutzt und darauf besteht, nimm ihre.",
      },
      {
        q: "Muss ich etwas ausdrucken?",
        a: "Nein. Du unterschreibst am Bildschirm und schickst das unterschriebene PDF zurück. Hast du nur ein Exemplar auf Papier, fotografiere es gut beleuchtet und unterschreib auf dem Foto.",
      },
      {
        q: "Wird meine Unterschrift gespeichert?",
        a: "Nein. Sie existiert nur im Speicher des Tabs. Schließ ihn, und sie ist weg. Beim nächsten Mal zeichnest oder tippst du sie neu.",
      },
      {
        q: "Kann ich im unterschriebenen PDF noch Text kopieren?",
        a: "Nein. Jede Seite wird aus ihren Pixeln neu aufgebaut, dabei werden auch versteckter Text und Metadaten entfernt. Behalte dein Original, wenn du den Text brauchst.",
      },
      {
        q: "Ist Cachety wirklich kostenlos?",
        a: "Ja. Kostenlos, ohne Konto und ohne Tracking. Es ist Open-Source-Software, entwickelt in Frankreich von Amir Moradi.",
      },
    ],
    updated: "2026-10-17",
  },
  {
    slug: "pdf-am-handy-unterschreiben",
    topic: "sign-phone",
    tool: "sign",
    title: "Ein PDF auf dem iPhone oder Android-Handy unterschreiben",
    metaTitle: "PDF am Handy unterschreiben: iPhone und Android, kostenlos",
    description:
      "Unterschreibe ein PDF mit dem Finger auf deinem iPhone oder Android-Handy. Keine App, kein Konto, und das Dokument wird nie hochgeladen. Kostenlos.",
    intro:
      "Jemand hat dir ein PDF zum Unterschreiben geschickt, und kein Computer ist in der Nähe. Du kannst es mit dem Finger auf dem Handy unterschreiben, direkt im Browser, in etwa einer Minute.",
    example: "Einverständniserklärung – nur für Grundschule am Lindenpark – 17.10.2026",
    body: [
      { type: "h2", text: "Keine App, kein Konto, kein Upload" },
      {
        type: "p",
        text: "Cachety läuft im Browser deines Handys, etwa Safari oder Chrome. Du lädst nichts aus einem App Store und legst kein Konto an. Das Dokument wird auf dem Handy selbst verarbeitet und nie hochgeladen: Der Seite ist technisch verboten, eine andere Website zu kontaktieren.",
      },
      { type: "h2", text: "Schritt für Schritt" },
      {
        type: "steps",
        items: [
          "Speichere das erhaltene PDF auf deinem Handy. In den meisten Mail-Apps tippst du auf den Anhang und sicherst ihn in Dateien auf dem iPhone oder in Downloads auf Android.",
          "Öffne cachety.com/de/sign im Browser, tippe auf das Ablagefeld und wähle das PDF. Ein Foto eines Papierdokuments geht auch.",
          "Zeichne deine Unterschrift mit dem Finger in das Feld. Nicht zufrieden? Mach den letzten Strich rückgängig oder lösch alles und versuch es noch mal. Du kannst auch deinen Namen tippen oder ein Foto deiner Unterschrift hochladen.",
          "Wähle, was unter der Unterschrift stehen soll, wenn überhaupt. Das heutige Datum ist voreingestellt, und du kannst den Ort und einen Vermerk wie „Gelesen und genehmigt“ hinzufügen.",
          "Geh zum Schritt Platzieren, prüfen, herunterladen. Deine Unterschrift erscheint unten rechts auf der letzten Seite. Zieh sie mit dem Finger an ihren Platz und ändere die Größe über die Ecke.",
          "Prüf die Vorschau, lade das unterschriebene PDF herunter und schick es per E-Mail oder Messenger zurück.",
        ],
      },
      {
        type: "tip",
        text: "Schreib etwas größer als auf Papier und lass dir Zeit. Der leere Rand um die Unterschrift wird automatisch entfernt, damit sie auf der Seite scharf bleibt.",
      },
      { type: "h2", text: "Lieber ein Foto deiner Unterschrift?" },
      {
        type: "p",
        text: "Wenn dir das Unterschreiben mit dem Finger schwerfällt, unterschreib auf einem weißen Blatt mit einem dunklen Stift, fotografiere es bei Tageslicht und wähle das Hochladen. Der weiße Hintergrund wird für dich entfernt. Ist noch etwas Papier zu sehen, verschieb den Regler für die Empfindlichkeit. iPhone-Fotos (HEIC) funktionieren auch.",
      },
      { type: "h2", text: "Prüf, dass alles auf deinem Handy bleibt" },
      {
        type: "p",
        text: "Wenn die Seite geladen ist, schalte den Flugmodus ein, wähle dann dein PDF und unterschreib es. Alles funktioniert weiter, also wird nichts irgendwohin geschickt. Deine Unterschrift wird nicht gespeichert: Schließ den Tab, und sie ist weg.",
      },
      { type: "h2", text: "Optionen vor dem Herunterladen" },
      {
        type: "list",
        items: [
          "Alle Seiten paraphieren setzt eine kleine Kopie deiner Unterschrift auf die übrigen Seiten.",
          "„Verkleinern“ hält die Datei unter der Größe, die eine E-Mail oder eine Website erlaubt.",
          "„Mit Passwort schützen“ ist standardmäßig aus, damit der Empfänger die Datei sofort öffnen kann.",
          "Nach dem Herunterladen wird ein Fingerabdruck der Datei angezeigt. Heb ihn auf: Taucht je eine andere Fassung auf, kannst du zeigen, dass es nicht die ist, die du unterschrieben hast.",
        ],
      },
      { type: "h2", text: "Was diese Unterschrift wert ist" },
      {
        type: "p",
        text: "Eine Unterschrift, die du auf dem Handy zeichnest und auf das Dokument setzt, ist eine einfache elektronische Signatur. Für alltägliche Dokumente reicht sie in der Regel, etwa für Schul- und Vereinsformulare, Einverständniserklärungen, Angebote und Mietunterlagen. Wird sie angezweifelt, musst du unter Umständen selbst zeigen, dass du unterschrieben hast.",
      },
      {
        type: "warning",
        text: "Das ist nicht das richtige Werkzeug, wenn eine qualifizierte Signatur mit Zertifikat verlangt wird oder die andere Seite auf ihrer eigenen Plattform besteht: manche Kredit- und Versicherungsverträge, notarielle Urkunden, bestimmte Behördenverfahren. Und wie bei einer eingescannten Unterschrift auf Papier könnte jemand deine Unterschrift aus der Kopie ausschneiden und wiederverwenden. Ein Wasserzeichen mit Zweck und Empfänger und ein Kürzel auf jeder Seite senken dieses Risiko. Das ist keine Rechtsberatung.",
      },
    ],
    faq: [
      {
        q: "Muss ich eine App herunterladen?",
        a: "Nein. Cachety funktioniert im Browser deines Handys. Du kannst es für schnellen Zugriff auf den Startbildschirm legen, musst aber nicht.",
      },
      {
        q: "Kann ich mit einem Eingabestift unterschreiben?",
        a: "Ja. Das Unterschriftsfeld funktioniert mit dem Finger, einem Eingabestift oder am Computer mit der Maus.",
      },
      {
        q: "Wird das PDF irgendwo hochgeladen?",
        a: "Nein. Alles passiert auf deinem Handy. Schalte nach dem Laden der Seite den Flugmodus ein: Es funktioniert weiter.",
      },
      {
        q: "Warum kann ich den Text im unterschriebenen PDF nicht mehr markieren?",
        a: "Jede Seite wird aus ihren Pixeln neu aufgebaut. So lässt sich die Unterschrift nicht ablösen, und versteckte Daten werden entfernt. Dein Original bleibt unverändert auf deinem Handy.",
      },
    ],
    updated: "2026-10-17",
  },
];
