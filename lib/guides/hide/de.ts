// Ratgeber zu den vorgeschlagenen Bereichen zum Schwärzen (de): Kontonummern
// im PDF finden und schwärzen, Bankverbindung weitergeben, Kopie der Bankkarte
// verschicken. Geschrieben für Leserinnen und Leser in Deutschland, in der
// Du-Form. Nur reiner Text: keine Links, kein HTML, kein Markdown. Alle
// Firmennamen in den Beispielen sind erfunden.
// Draft translation from the English guide, awaiting native review (ROADMAP.md, backlog: Native review).
//
// Diese Ratgeber beschreiben die Funktion `suggested-areas`
// (docs/prd-suggested-areas.md), wie sie ausgeliefert ist. Die zitierten
// Beschriftungen („Ansehen“, „Alle schwärzen“, „Diese nicht“, „Fertig“,
// „Etwas schwärzen“) sind mit lib/suggest-copy/de.ts und
// lib/locales/de/strings.ts abgeglichen, die Liste der Nummern mit
// lib/sensitive.ts: bitte im Gleichschritt halten.

import type { Guide } from "../types";

const UPDATED = "2026-11-19";

export const HIDE_GUIDES_DE: Guide[] = [
  // ------------------------------------------------------------------
  {
    slug: "iban-und-kontonummern-im-pdf-schwaerzen",
    topic: "auto-redact",
    title: "Kontonummern im PDF finden und schwärzen, bevor du es verschickst",
    metaTitle: "IBAN und Kartennummern im PDF finden und schwärzen",
    description:
      "Cachety findet IBANs und Kartennummern in deinem PDF und bietet an, sie zu schwärzen, auf deinem Gerät. Kein Upload, und nichts wird ohne dich geschwärzt.",
    intro:
      "Auf einer Gehaltsabrechnung, einer Rechnung oder einem Kontoauszug steht oft mehr, als der Empfänger braucht, zum Beispiel eine Kontonummer oder eine Kartennummer. Cachety zeigt dir solche Nummern auf der Seite, und du schwärzt sie mit einem Fingertipp, ohne dass die Datei dein Gerät verlässt.",
    example: "Einkommensnachweis, Hausverwaltung Sonnenberg, 18.11.2026",
    body: [
      { type: "h2", text: "Die Nummern, die du mitschickst, ohne es zu merken" },
      {
        type: "p",
        text: "Wenn eine Hausverwaltung drei Gehaltsabrechnungen verlangt, will sie sehen, wer dich bezahlt und wie viel. Das Konto, auf das dein Gehalt geht, braucht sie dafür nicht. Dient eine Stromrechnung als Wohnsitznachweis, braucht niemand die Bankverbindung, die unten für die Lastschrift aufgedruckt ist. Solche Nummern stehen aber im Kleingedruckten, auf Seite zwei oder drei, und die meisten schicken die Datei so, wie sie ist.",
      },
      {
        type: "p",
        text: "Von Hand schwärzen geht, aber du musst wissen, wo du suchen sollst. Cachety sucht jetzt für dich.",
      },
      { type: "h2", text: "Wonach Cachety sucht" },
      {
        type: "p",
        text: "Wenn du ein PDF hinzufügst, liest Cachety dessen Text in deinem Browser und sucht nach Nummern, deren Format sich prüfen lässt:",
      },
      {
        type: "list",
        items: [
          "Kontonummern im IBAN-Format, aus jedem Land.",
          "Nummern von Zahlungskarten der großen Kartennetzwerke.",
          "Deine Steuer-ID, die steuerliche Identifikationsnummer mit elf Ziffern.",
          "Französische Sozialversicherungsnummern, französische Steuernummern und die Referenzen französischer Steuerbescheide.",
          "Ausweis- und Steuernummern aus anderen Ländern: die spanischen Nummern DNI und NIE, die niederländische BSN, die belgische Nationalregisternummer, die portugiesische NIF, die brasilianische CPF, die italienische Steuernummer (codice fiscale), die chinesische Personalausweisnummer, die japanische My Number, der iranische nationale Code und die indonesische NIK.",
        ],
      },
      {
        type: "p",
        text: "Eine Nummer wird nur vorgeschlagen, wenn sie die Prüfung besteht, die in ihrem Format eingebaut ist, etwa die Prüfziffern einer IBAN, oder wenn daneben steht, was sie ist. Eine Telefonnummer, ein Datum oder ein Rechnungsbetrag wird nicht markiert, nur weil es eine Reihe von Ziffern ist.",
      },
      { type: "h2", text: "So schwärzt du sie, Schritt für Schritt" },
      {
        type: "steps",
        items: [
          "Öffne cachety.com im Browser, am Computer oder auf dem Handy. Ein Konto brauchst du nicht.",
          "Füge dein PDF hinzu. Gib an, wofür die Kopie ist, und dann, wer sie bekommt.",
          "Hat Cachety etwas gefunden, steht über der Vorschau, wie viele Nummern es sind. Wähle „Ansehen“.",
          "Jeder Vorschlag ist auf der Seite umrandet und mit seinem Namen aufgeführt, zum Beispiel „Kontonummer (IBAN)“. Tippe die an, die du schwärzen willst, oder wähle „Alle schwärzen“. Jede Schwärzung kannst du rückgängig machen, und einen falschen Vorschlag legst du mit „Diese nicht“ beiseite.",
          "Sieh dir jede Seite selbst an und zieh ein Rechteck über alles, was sonst noch verschwinden soll. Wähle dann „Fertig“: Erst in diesem Moment werden die Bereiche aus der Datei entfernt.",
          "Prüf die Vorschau und lade deine Kopie herunter.",
        ],
      },
      {
        type: "tip",
        text: "Nichts wird geschwärzt, bevor du es sagst. Hat der Empfänger nach deiner Bankverbindung gefragt, lass die IBAN sichtbar: Genau die braucht er. Dasselbe gilt für die Steuernummer und die Referenz auf einem französischen Steuerbescheid: Mit ihnen kann der Empfänger prüfen, ob der Bescheid echt ist.",
      },
      {
        type: "p",
        text: "Dieselben Vorschläge gibt es in den beiden anderen Tools von Cachety: wenn du ein PDF unterschreibst und wenn du mit Dossier mehrere Dokumente zu einer Datei zusammenfügst.",
      },
      { type: "h2", text: "Was Cachety nicht finden kann" },
      {
        type: "list",
        items: [
          "Alles auf einem Foto oder Scan. In einem Bild gibt es keinen Text zum Lesen, also auch keine Vorschläge: Zieh die Rechtecke selbst.",
          "Barcodes und QR-Codes. Sie können dieselben Angaben enthalten wie der Text, der daneben gedruckt ist.",
          "Nummern in Formaten, die Cachety nicht prüft, etwa eine Sozialversicherungsnummer, die Steuernummer vom Finanzamt (nicht die Steuer-ID), eine alte Kontonummer mit Bankleitzahl, eine Kunden- oder Vertragsnummer, eine Reisepass- oder Führerscheinnummer.",
          "Eine Kartennummer, die schon teilweise unkenntlich gemacht ist, etwa die letzten vier Ziffern auf einem Beleg. Da gibt es nichts mehr zu schwärzen.",
          "Namen, Adressen, Geburtsdaten und Telefonnummern. Meist braucht der Empfänger genau diese Angaben, deshalb werden sie nicht vorgeschlagen.",
        ],
      },
      {
        type: "warning",
        text: "Die Vorschläge sind eine Hilfe, keine Garantie. Sie können etwas übersehen. Prüf immer die ganze Seite selbst, bevor du sie verschickst.",
      },
      { type: "h2", text: "Wirklich entfernt und nie hochgeladen" },
      {
        type: "p",
        text: "Ein geschwärzter Bereich ist keine schwarze Form, die über dem Text liegt. Cachety baut jede Seite als Bild neu auf: Die Nummer ist aus der Datei verschwunden und lässt sich nicht darunter herauskopieren. Die Suche nach Nummern läuft in deinem Browser, mit einfachen Regeln. Dein Dokument wird weder an einen Server noch an einen KI-Dienst geschickt, und nach dem Laden funktioniert die Seite auch im Flugmodus.",
      },
    ],
    faq: [
      {
        q: "Schwärzt Cachety Nummern automatisch?",
        a: "Nein. Es umrandet, was es gefunden hat, und du entscheidest, einzeln oder für alle auf einmal. Manche Nummern stehen da, weil der Empfänger sie braucht, und das weißt nur du.",
      },
      {
        q: "Funktioniert das auch bei einem Foto oder einem gescannten Dokument?",
        a: "Nein. Vorschläge gibt es nur bei einem PDF mit echtem Text, wie den Gehaltsabrechnungen, Rechnungen und Kontoauszügen, die du von einer Website herunterlädst. Auf einem Foto oder Scan ziehst du die Rechtecke selbst, mit „Etwas schwärzen“.",
      },
      {
        q: "Wird mein Dokument irgendwohin geschickt, um es zu analysieren?",
        a: "Nein. Die Prüfungen laufen in deinem Browser, auf deinem Gerät. Nichts wird hochgeladen, und kein KI-Dienst liest deine Datei.",
      },
      {
        q: "Kann eine Nummer übersehen werden?",
        a: "Ja. Eine Nummer in einem Bild, in einem Barcode oder in einem Format, das Cachety nicht prüft, wird nicht vorgeschlagen. Deshalb bittet dich die Seite immer, selbst nachzusehen.",
      },
      {
        q: "Werden alle Seiten eines langen PDFs durchsucht?",
        a: "Ja. Die Vorschläge decken jede Seite ab, auch die Seiten, die in der Vorschau nicht gezeigt werden. Für sie zeigt die Liste die ersten und letzten Zeichen jeder Nummer, damit du weißt, was du schwärzt.",
      },
    ],
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  {
    slug: "iban-weitergeben-gefaehrlich",
    topic: "iban",
    title: "IBAN und Kontodaten weitergeben: Ist das sicher?",
    metaTitle: "IBAN weitergeben: Ist das sicher oder gefährlich?",
    description:
      "Was jemand mit deiner IBAN machen kann und was nicht, wann du deine Kontodaten weitergibst und wie du sie auf Dokumenten schwärzt, die sie nicht brauchen.",
    intro:
      "Du gibst deine Bankverbindung heraus, um Geld zu bekommen, und sie steht auf vielen Dokumenten, die du aus anderen Gründen verschickst. Für sich allein ist das Risiko gering. Schwierig wird es, wenn sie zusammen mit deinen übrigen Unterlagen unterwegs ist.",
    example: "Bankverbindung für Gehalt, Personalabteilung Grünfeld Feinkost, 18.11.2026",
    body: [
      { type: "h2", text: "Was jemand mit deinen Kontodaten machen kann" },
      {
        type: "p",
        text: "Mit deiner IBAN kann jemand Geld auf dein Konto überweisen. Dafür ist sie da. Für sich allein reicht sie nicht, um Geld abzuheben oder eine Überweisung zu machen: Dafür braucht man deine Karte, deine Zugangsdaten zum Online-Banking oder deine Freigabe.",
      },
      {
        type: "p",
        text: "Das Hauptrisiko ist eine Lastschrift, die ohne deine Zustimmung auf deinen Namen eingerichtet wird. Bei einer SEPA-Basislastschrift, der üblichen Lastschrift für Privatkunden im ganzen Euroraum, kannst du dir eine Abbuchung innerhalb von acht Wochen nach der Belastung von deiner Bank erstatten lassen, ohne Gründe zu nennen, und innerhalb von 13 Monaten, wenn du sie nie autorisiert hast. Prüf also deine Kontoauszüge und melde deiner Bank jede Abbuchung, die du nicht kennst.",
      },
      { type: "h2", text: "Die eigentliche Gefahr ist das Gesamtpaket" },
      {
        type: "p",
        text: "Für Betrüger wird eine Bankverbindung viel nützlicher, wenn sie zusammen mit einer Kopie deines Ausweises, deiner Adresse, deiner Unterschrift und deinen Gehaltsabrechnungen kommt. Zusammen reicht das für den Versuch, auf deinen Namen ein Konto zu eröffnen oder einen Kredit aufzunehmen. Eine Mietbewerbung oder eine Bewerbungsmappe enthält genau dieses Paket. Die Frage ist also weniger „Ist meine Kontonummer geheim?“ als „Braucht diese Person sie überhaupt?“.",
      },
      { type: "h2", text: "Wann du sie weitergibst und wann du sie schwärzt" },
      {
        type: "list",
        items: [
          "Gib sie weiter, wenn dir jemand Geld überweisen oder eine vereinbarte Zahlung einziehen soll: dein Arbeitgeber, ein Vermieter, der die Kaution zurückzahlt, ein Versorger, den du per Lastschrift bezahlst.",
          "Schwärze sie, wenn das Dokument aus einem anderen Grund verschickt wird: eine Gehaltsabrechnung als Einkommensnachweis, eine Rechnung als Wohnsitznachweis, ein Kontoauszug, der nur deinen Namen und deine Adresse zeigen soll.",
          "Wenn es geht, schick deine Bankverbindung einzeln und nicht in derselben Datei wie deinen Ausweis.",
        ],
      },
      { type: "h2", text: "Eine Kontonummer mit Cachety schwärzen" },
      {
        type: "steps",
        items: [
          "Öffne cachety.com im Browser. Nichts installieren, kein Konto.",
          "Füge dein PDF oder Foto hinzu. Gib an, wofür die Kopie ist, und dann, wer sie bekommt.",
          "In einem PDF sucht Cachety nach IBANs und sagt dir, wenn es eine findet. Wähle „Ansehen“, tippe den Vorschlag an, um die IBAN zu schwärzen, und wähle dann „Fertig“.",
          "Eine Kontonummer, die nicht im IBAN-Format geschrieben ist, etwa eine alte Kontonummer mit Bankleitzahl, wird nicht vorgeschlagen, und auf einem Foto wird gar nichts vorgeschlagen: Tippe auf „Etwas schwärzen“ und zieh ein Rechteck darüber.",
          "Prüf jede Seite und lade dann deine Kopie herunter.",
        ],
      },
      {
        type: "tip",
        text: "Wenn du deine Bankverbindung doch schicken musst, setz ein Wasserzeichen, das sagt, für wen und wofür sie gedacht ist, etwa „Bankverbindung für Gehalt, Personalabteilung Grünfeld Feinkost“. Eine so gekennzeichnete Kopie lässt sich anderswo kaum wiederverwenden.",
      },
      { type: "h2", text: "Deine Datei bleibt bei dir" },
      {
        type: "p",
        text: "Cachety arbeitet in deinem Browser. Dein Kontoauszug oder deine Gehaltsabrechnung wird nie hochgeladen, und die geschwärzte Nummer wird aus der Datei selbst entfernt, nicht nur überdeckt. Denk daran, dass die Vorschläge etwas übersehen können: Sieh dir jede Seite an, bevor du sie verschickst.",
      },
    ],
    faq: [
      {
        q: "Kann jemand mit meiner IBAN Geld von meinem Konto abbuchen?",
        a: "Nicht direkt. Mit einer IBAN kann man dir Geld überweisen. Das Risiko ist eine Lastschrift, die ohne deine Zustimmung eingerichtet wird, und die kannst du dir erstatten lassen. Prüf deine Kontoauszüge und melde alles, was du nicht kennst.",
      },
      {
        q: "Soll ich die IBAN auf der Gehaltsabrechnung schwärzen?",
        a: "Wenn die Abrechnung als Einkommensnachweis dient, ja: Der Empfänger braucht deinen Namen, deinen Arbeitgeber und dein Gehalt, nicht dein Konto. Fragt dein Arbeitgeber nach deiner Bankverbindung, schick sie getrennt.",
      },
      {
        q: "Mein Vermieter fragt nach meiner Bankverbindung. Ist das normal?",
        a: "Das kann sein, zum Beispiel um die Mietzahlung einzurichten oder eine Kaution zurückzuzahlen. Dann braucht er die Nummer, also schwärze sie nicht. Setz ein Wasserzeichen mit seinem Namen und dem Zweck.",
      },
      {
        q: "Was tue ich, wenn ich eine Lastschrift sehe, der ich nie zugestimmt habe?",
        a: "Melde dich sofort bei deiner Bank und verlange die Erstattung. Bei einer SEPA-Lastschrift hast du 13 Monate Zeit, eine Abbuchung zu beanstanden, die du nicht autorisiert hast.",
      },
    ],
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  {
    slug: "kopie-bankkarte-schicken-was-schwaerzen",
    topic: "bank-card",
    title: "Kopie deiner Bankkarte verlangt? Was du schwärzt, bevor du sie schickst",
    metaTitle: "Kopie der Bank- oder Kreditkarte: Was schwärzen?",
    description:
      "Ein Hotel oder Händler will ein Foto deiner Karte? Welche Ziffern du schwärzt, warum der Sicherheitscode nie mitgeschickt wird und wie das Schwärzen geht.",
    intro:
      "Hotels, Autovermietungen und manche Online-Händler verlangen immer noch ein Foto deiner Karte, „um die Buchung zu bestätigen“. Schwärze, was niemand braucht, bevor du etwas schickst. Noch besser: Frag nach einem sichereren Zahlungsweg.",
    example: "Buchungsbestätigung, Hotel Alpenrose Tannbach, 18.11.2026",
    body: [
      { type: "h2", text: "Warum ein Foto deiner Karte riskant ist" },
      {
        type: "p",
        text: "Bei den meisten Karten stehen auf der Vorderseite die lange Kartennummer, das Ablaufdatum und dein Name, und auf der Rückseite steht der dreistellige Sicherheitscode (CVC), auch Kartenprüfnummer genannt. Bei manchen neueren Karten steht all das auf der Rückseite. Zusammen ist das alles, was jemand braucht, um mit deiner Karte online zu bezahlen. Eine E-Mail oder Chatnachricht kann jahrelang in mehreren Postfächern liegen, weit außerhalb deiner Kontrolle.",
      },
      {
        type: "warning",
        text: "Schick nie den Sicherheitscode mit: die drei Ziffern auf der Rückseite der Karte oder die vier Ziffern auf der Vorderseite einer American-Express-Karte. Kein seriöses Unternehmen braucht ihn auf einem Foto. Die Sicherheitsregeln der Kartenbranche verbieten Unternehmen, ihn aufzubewahren, sobald die Zahlung autorisiert ist.",
      },
      { type: "h2", text: "Frag zuerst nach einem anderen Weg" },
      {
        type: "p",
        text: "Ein Unternehmen, das Karten annimmt, sollte dir einen sicheren Zahlungslink schicken, die Zahlung über sein Buchungssystem abwickeln oder die Karte bei der Ankunft prüfen können. Frag danach. Besteht es auf einer Kopie, will es meist nur prüfen, dass die Karte existiert und auf deinen Namen läuft. Dafür reicht eine teilweise geschwärzte Kopie.",
      },
      { type: "h2", text: "Was du schwärzt und was du stehen lässt" },
      {
        type: "list",
        items: [
          "Schwärze die mittleren Ziffern der Kartennummer. Lass höchstens die letzten vier stehen, so wie auf dem Kassenbeleg, den du selbst bekommst.",
          "Schwärze den Sicherheitscode. Auf der Rückseite schwärzt du den ganzen Streifen, auf dem er steht.",
          "Schwärze das Ablaufdatum, außer es wird aus gutem Grund verlangt.",
          "Lass deinen Namen und das Logo der Bank stehen, damit die Kopie weiter zeigt, dass die Karte dir gehört.",
        ],
      },
      { type: "h2", text: "Die Ziffern mit Cachety schwärzen" },
      {
        type: "steps",
        items: [
          "Fotografiere die Vorderseite der Karte. Die Rückseite nur, wenn sie verlangt wird.",
          "Öffne cachety.com auf dem Handy oder am Computer und füge das Foto hinzu.",
          "Gib an, wofür die Kopie ist, und dann, wer sie bekommt, zum Beispiel „Buchungsbestätigung“ und den Namen des Hotels.",
          "Tippe unter der Vorschau auf „Etwas schwärzen“ und zieh Rechtecke über die mittleren Ziffern, das Ablaufdatum und den Sicherheitscode.",
          "Prüf die Vorschau, lade die Kopie herunter und schick sie ab.",
        ],
      },
      {
        type: "tip",
        text: "In einem PDF, etwa einer Abrechnung mit vollständiger Kartennummer, kann Cachety die Nummer finden und anbieten, sie zu schwärzen. Auf einem Foto der Karte gibt es keinen Text zum Lesen, dort ziehst du die Rechtecke selbst.",
      },
      { type: "h2", text: "Was mit dem Foto passiert" },
      {
        type: "p",
        text: "Nichts verlässt dein Gerät. Cachety arbeitet in deinem Browser, und es gibt keinen Server, der dein Foto empfängt. Die geschwärzten Ziffern werden aus dem Bild entfernt, nicht nur überdeckt, und der Aufnahmeort des Fotos wird aus der Datei gelöscht. Das Wasserzeichen sagt, für wen die Kopie gemacht wurde. Das erschwert es, sie anderswo zu verwenden.",
      },
      {
        type: "p",
        text: "Ehrlich gesagt: Eine geschwärzte Kopie mit Wasserzeichen senkt das Risiko, beseitigt es aber nicht. Kommt dir eine Anfrage seltsam vor, schick die Karte gar nicht und ruf das Unternehmen unter einer Nummer an, die du selbst herausgesucht hast.",
      },
    ],
    faq: [
      {
        q: "Welche Ziffern meiner Kartennummer darf ich zeigen?",
        a: "Die letzten vier reichen für die meisten Prüfungen, und sie stehen auch auf dem Kassenbeleg, den du selbst bekommst. Nach den Sicherheitsregeln der Kartenbranche soll ein Unternehmen in der Regel nicht mehr anzeigen als die ersten Ziffern, an denen man die Bank erkennt, und die letzten vier. Den Rest schwärzt du.",
      },
      {
        q: "Ist es sicher, ein Foto meiner Karte per E-Mail oder WhatsApp zu schicken?",
        a: "Nicht, wenn die vollständige Nummer und der Sicherheitscode zu sehen sind. Nachrichten werden kopiert, weitergeleitet und gespeichert, und Visa selbst rät, Zahlungsdaten nie per E-Mail zu schicken. Musst du eine Kopie schicken, schwärze vorher die mittleren Ziffern und den Sicherheitscode.",
      },
      {
        q: "Das Hotel will Vorder- und Rückseite. Was mache ich?",
        a: "Frag nach dem Grund und schlag stattdessen einen sicheren Zahlungslink vor. Schickst du die Rückseite doch, schwärze den Sicherheitscode und den Streifen darum herum. Nach den Regeln der Kartenbranche darf ein Unternehmen diesen Code nicht aufbewahren, sobald die Zahlung autorisiert ist.",
      },
      {
        q: "Ich habe schon ein vollständiges Foto meiner Karte geschickt. Was jetzt?",
        a: "Ruf deine Bank an. Sie kann die Karte sperren und eine neue schicken, und sie sagt dir, wie du Zahlungen reklamierst, die nicht von dir stammen. Behalte deine Kontoauszüge in den folgenden Wochen im Blick.",
      },
    ],
    updated: UPDATED,
  },
];
