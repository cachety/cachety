import type { Guide } from "./types";

// Uitleg in het Nederlands, geschreven voor Nederland (BSN, KopieID, makelaars,
// werkgeversverklaring) met waar nodig een opmerking voor Vlaanderen (eID,
// rijksregisternummer). Geen vertalingen maar lokale equivalenten. Alleen
// platte tekst: geen links, geen HTML, geen markdown. Bedrijfsnamen zijn verzonnen.

export const GUIDES_NL: Guide[] = [
  // ───────────────────────────── ID-bewijs ─────────────────────────────
  {
    slug: "veilige-kopie-id-bewijs",
    topic: "id-card",
    title: "Zo maak je een veilige kopie van je ID-kaart of paspoort",
    metaTitle: "Veilige kopie ID maken: BSN doorstrepen en watermerk",
    description:
      "Een veilige kopie van je identiteitsbewijs in een minuut: BSN en pasfoto afdekken, doel en datum erop. Gratis, zonder je ID ergens te uploaden.",
    intro:
      "De overheid raadt het al jaren aan: stuur nooit zomaar een kale kopie van je paspoort of identiteitskaart. Een veilige kopie heeft je BSN onleesbaar gemaakt en vermeldt voor wie hij is, waarvoor en wanneer. Zo maak je er een, op je telefoon of computer.",
    example: "Kopie voor huuraanvraag, Makelaardij De Linde, 12-10-2026",
    body: [
      { type: "h2", text: "Wat een veilige kopie is" },
      {
        type: "p",
        text: "De Rijksoverheid geeft een eenvoudig recept. Maak je burgerservicenummer (BSN) onleesbaar, ook in de cijferreeks onderaan het document. Zet op de kopie dat het een kopie is. Schrijf erbij voor welke organisatie of welk product de kopie bedoeld is. En zet de datum erop waarop je hem afgeeft. Wie zo'n kopie in handen krijgt, kan er weinig mee: hij is duidelijk gemaakt voor één organisatie, op één dag, met één doel.",
      },
      {
        type: "list",
        items: [
          "Het doel: huuraanvraag, bankrekening openen, telefoonabonnement.",
          "De ontvanger: de naam van het bedrijf of de persoon.",
          "De datum: de dag dat je de kopie verstuurt.",
          "Het woord kopie, zodat niemand hem voor een origineel kan laten doorgaan.",
        ],
      },
      { type: "h2", text: "Mag die organisatie wel om een kopie vragen?" },
      {
        type: "p",
        text: "Lang niet iedereen mag een kopie van je identiteitsbewijs maken of bewaren. Volgens de Rijksoverheid mogen onder meer overheidsinstanties, banken, notarissen, casino's, levensverzekeraars en je werkgever dat. Andere bedrijven, zoals een telecomaanbieder of autoverhuurder, alleen onder voorwaarden, en dan moeten de pasfoto en het BSN afgeschermd zijn. Vaak is een kopie helemaal niet nodig: het bedrijf kan ook gewoon het soort document en het documentnummer noteren. Vraag gerust waarom ze een kopie willen en op welke regel ze zich baseren.",
      },
      {
        type: "p",
        text: "Je BSN is nog strenger beschermd. Organisaties buiten de overheid mogen het alleen gebruiken als een wet dat toestaat, en alleen voor het doel uit die wet. Jouw toestemming verandert daar niets aan. Een bank of werkgever heeft je BSN nodig voor de Belastingdienst; een makelaar of webwinkel in de regel niet.",
      },
      { type: "h2", text: "Zo maak je een veilige kopie met Cachety" },
      {
        type: "steps",
        items: [
          "Open cachety.com in je browser, op je telefoon of computer. Je hoeft niets te installeren en geen account aan te maken.",
          "Sleep een foto of scan van je ID-kaart of paspoort in het vak, of tik om hem te kiezen. Foto's van een iPhone (HEIC) werken ook.",
          "Vul bij Waarvoor is deze kopie? het doel in, bijvoorbeeld Huuraanvraag, en bij Wie krijgt hem? de ontvanger, bijvoorbeeld Makelaardij De Linde. De datum komt er automatisch bij.",
          "Kies onder het voorbeeld Iets afdekken, teken een rechthoek over je BSN en tik op Klaar. Vergeet de cijferreeks onderaan niet, en dek ook je pasfoto af als de ontvanger die niet nodig heeft.",
          "Controleer het voorbeeld en download de kopie. Stuur alleen deze versie, nooit het origineel.",
        ],
      },
      {
        type: "p",
        text: "Je ID verlaat je apparaat niet. Cachety werkt helemaal in je browser: er is geen server die je documenten ontvangt. Zet na het laden gerust je telefoon in vliegtuigmodus: het blijft werken.",
      },
      {
        type: "tip",
        text: "Wat je afdekt, wordt echt uit het bestand gehaald, niet alleen met een zwart blok bedekt. Niemand kan je BSN dus later onder de rechthoek vandaan halen door de tekst te selecteren.",
      },
      { type: "h2", text: "En de KopieID-app van de overheid?" },
      {
        type: "p",
        text: "De Rijksoverheid heeft een gratis app, KopieID, voor iPhone en Android. Je fotografeert je identiteitsbewijs, streept gegevens door en vult in voor wie en waarvoor de kopie is; die tekst komt met de datum als watermerk op de kopie. Dat is een prima keuze als je alleen een Nederlands identiteitsbewijs op je telefoon wilt beveiligen. Cachety is handig als je al een pdf of scan hebt, op je computer werkt, ook je loonstroken en bankafschriften wilt beveiligen, of in één keer een eigen versie voor meerdere ontvangers wilt maken.",
      },
      { type: "h2", text: "Woon je in België?" },
      {
        type: "p",
        text: "Op de Belgische eID staat je rijksregisternummer. De Gegevensbeschermingsautoriteit wijst erop dat je kaart tonen vaak genoeg is en dat een kopie een laatste redmiddel hoort te zijn. Moet het toch, kopieer dan alleen de voorkant of maak het rijksregisternummer onleesbaar als de ontvanger het niet wettelijk nodig heeft. Met Cachety dek je het af zoals een BSN.",
      },
      {
        type: "warning",
        text: "Een watermerk ontmoedigt misbruik en maakt een lek traceerbaar, maar kan niet voorkomen dat iemand je kopie fotografeert. Ben je je ID kwijt of vermoed je misbruik, meld het dan bij je gemeente of de politie, en neem contact op met het Centraal Meldpunt Identiteitsfraude.",
      },
    ],
    faq: [
      {
        q: "Moet ik mijn BSN altijd doorstrepen?",
        a: "Als de ontvanger geen wettelijke basis heeft om je BSN te gebruiken, ja. Denk aan een makelaar, verhuurder of webwinkel. Je werkgever, je bank en de overheid mogen je BSN wel gebruiken; daar kun je het laten staan.",
      },
      {
        q: "Accepteert een bank of werkgever een kopie met watermerk?",
        a: "Meestal wel. Het watermerk is doorzichtig, dus alle gegevens blijven leesbaar. Een organisatie die een volledige kopie mag bewaren, zal soms vragen om niets af te dekken. Twijfel je, vraag het dan voordat je verstuurt.",
      },
      {
        q: "Wat is het verschil met de KopieID-app?",
        a: "Beide zijn gratis en zetten een watermerk met doel en datum op je kopie. KopieID is een app van de overheid voor je telefoon, gemaakt voor identiteitsbewijzen die je fotografeert. Cachety werkt in elke browser, ook op een computer, en verwerkt ook pdf's zoals loonstroken, met een wachtwoord en een versie per ontvanger als extra.",
      },
      {
        q: "Is Cachety echt gratis?",
        a: "Ja. Gratis, zonder account en zonder tracking. Het is opensourcesoftware, gemaakt in Frankrijk door Amir Moradi.",
      },
    ],
    updated: "2026-10-12",
  },

  // ───────────────────────────── Huurwoning ─────────────────────────────
  {
    slug: "documenten-huurwoning-veilig-versturen",
    topic: "rental",
    title: "Je ID en loonstroken veilig naar een makelaar of verhuurder sturen",
    metaTitle: "Documenten voor een huurwoning veilig versturen",
    description:
      "Op zoek naar een huurwoning? Zet een watermerk op je ID, loonstroken en werkgeversverklaring voor de makelaar, en trap niet in nepverhuurders.",
    intro:
      "Wie een huurwoning zoekt, stuurt al snel een hele map persoonlijke documenten rond. Een watermerk laat zien voor welke makelaar en welke woning elke kopie bedoeld is, en maakt hem voor iedereen anders veel minder bruikbaar.",
    example: "Huuraanvraag Lindenlaan 12, Makelaardij De Linde, 12-10-2026",
    body: [
      { type: "h2", text: "Waarom makelaars zoveel vragen" },
      {
        type: "p",
        text: "Een verhuurder wil weten of je de huur kunt betalen. Daarom vragen makelaars vaak om een kopie van je identiteitsbewijs, een werkgeversverklaring, een paar recente loonstroken en soms een bankafschrift of een uittreksel uit de BRP. Voor een bezichtiging alleen hoeven ze niet al je gegevens te hebben. Pas als de woning echt aan jou wordt toegewezen, hebben ze een sterkere reden om meer te vragen. Je documenten gaan per mail, belanden in gedeelde mappen en soms bij een screeningsbureau. Elke extra kopie is een extra kans dat er iets misgaat.",
      },
      { type: "h2", text: "Pas op voor nepverhuurders" },
      {
        type: "p",
        text: "Een bekende truc: iemand zet een mooie woning voor een redelijke prijs online, vaak gekopieerd van een echte advertentie. Er is veel belangstelling, zegt de verhuurder, dus stuur alvast je paspoort en loonstroken om de bezichtiging te reserveren. De woning bestaat niet, en met je documenten worden abonnementen of leningen op jouw naam afgesloten. Een watermerk met de naam van de makelaar en het doel maakt zo'n kopie veel minder waard. Wie hem wil hergebruiken, moet uitleggen waarom er Huuraanvraag Lindenlaan 12, Makelaardij De Linde op je paspoort staat.",
      },
      {
        type: "warning",
        text: "Wees op je hoede als je je ID moet sturen voordat je de woning hebt gezien, of als je een borg moet overmaken voor een woning waar je nooit binnen bent geweest. Vertrouw je het niet, meld het dan bij de Fraudehelpdesk en neem bij schade direct contact op met je bank.",
      },
      { type: "h2", text: "Zo zet je een watermerk op je documenten" },
      {
        type: "steps",
        items: [
          "Open cachety.com in je browser. Er is niets te installeren en geen account nodig.",
          "Sleep je bestanden erin, of tik om ze te kiezen. Je ID, loonstroken en werkgeversverklaring kunnen in één keer.",
          "Kies het voorbeeld Huurwoning, vul eventueel het adres aan en zet bij Wie krijgt hem? de naam van de makelaar. De datum komt er automatisch bij.",
          "Dek je BSN af op je ID en je loonstroken: een makelaar heeft er geen wettelijke basis voor.",
          "Controleer het voorbeeld en download de kopieën. Stuur die, nooit de originelen.",
        ],
      },
      {
        type: "p",
        text: "Je bestanden blijven op je eigen apparaat. Cachety werkt in je browser: er is geen server die je documenten ontvangt. Na het laden werkt het zelfs in vliegtuigmodus.",
      },
      {
        type: "tip",
        text: "Reageer je op meerdere woningen? Voeg elke makelaar toe met + Nog een ontvanger toevoegen: iedereen krijgt in één keer een eigen kopie, met de eigen naam erop. Duikt er ooit een kopie op waar hij niet hoort, dan weet je waar hij vandaan komt.",
      },
      { type: "h2", text: "Laat alleen zien wat nodig is" },
      {
        type: "p",
        text: "Een makelaar die je inkomen controleert, wil je salaris zien binnenkomen, niet wat je bij de drogist uitgaf. Teken op het voorbeeld rechthoeken over je rekeningnummer, je BSN of afschrijvingen die er niet toe doen. Wat je afdekt, wordt echt uit het bestand verwijderd. Eerlijk is eerlijk: een watermerk ontmoedigt misbruik en maakt een lek traceerbaar, maar maakt hergebruik niet onmogelijk. Het is een verstandige extra laag, geen wondermiddel.",
      },
    ],
    faq: [
      {
        q: "Accepteert een makelaar een kopie met watermerk?",
        a: "In de meeste gevallen wel. Het watermerk is doorzichtig, dus je gegevens blijven leesbaar. Wil een makelaar het origineel zien, dan laat je dat bij de bezichtiging of ondertekening zien; de kopie met watermerk is voor wat je mailt of uploadt.",
      },
      {
        q: "Mag een verhuurder mijn BSN vragen?",
        a: "Organisaties buiten de overheid mogen je BSN alleen gebruiken als een wet dat toestaat. Een gewone verhuurder of makelaar heeft daar in de regel geen basis voor. Dek het dus af op je ID en je loonstroken, en vraag waarom als iemand erop staat.",
      },
      {
        q: "Wat zet ik in het watermerk?",
        a: "Het doel, de ontvanger en de datum. Bijvoorbeeld: Huuraanvraag Lindenlaan 12, Makelaardij De Linde, 12-10-2026.",
      },
      {
        q: "Kan de makelaar het watermerk weghalen?",
        a: "Niet door de pdf gewoon te bewerken: het watermerk zit in het beeld van elke pagina. Geen enkel watermerk maakt misbruik onmogelijk, dus stuur alleen wat echt nodig is.",
      },
    ],
    updated: "2026-10-12",
  },

  // ─────────────────────── Loonstrook en werkgeversverklaring ───────────────────────
  {
    slug: "loonstrook-werkgeversverklaring-veilig-versturen",
    topic: "tax-payslip",
    title: "Loonstrook, werkgeversverklaring of IB60 veilig versturen",
    metaTitle: "Loonstrook en werkgeversverklaring veilig versturen",
    description:
      "Loonstrook, werkgeversverklaring of IB60 nodig voor een huurwoning of hypotheek? Zet er een watermerk op en lak je BSN zwart, gratis en zonder uploaden.",
    intro:
      "Voor een huurwoning, een hypotheek of een lening moet je laten zien wat je verdient. Daarvoor stuur je documenten vol gevoelige gegevens: je salaris, je BSN, je adres en je werkgever. Met een watermerk en een paar afgedekte vakjes verstuur je ze een stuk veiliger.",
    example: "Hypotheekaanvraag, Hypotheekhuis Zuidwal, 12-10-2026",
    body: [
      { type: "h2", text: "Welke documenten er meestal gevraagd worden" },
      {
        type: "list",
        items: [
          "Loonstroken: meestal de laatste een tot drie maanden. Daar staan je salaris, je BSN, je adres en vaak je rekeningnummer op.",
          "Werkgeversverklaring: een formulier dat je werkgever invult over je contract en inkomen.",
          "Inkomensverklaring (IB60): te downloaden bij de Belastingdienst, vaak gevraagd bij een hypotheek.",
          "Jaaropgave: het overzicht van je loon over een heel jaar.",
        ],
      },
      { type: "h2", text: "Wie mag wat zien?" },
      {
        type: "p",
        text: "Organisaties buiten de overheid mogen je BSN alleen gebruiken als een wet dat toestaat. Een bank of hypotheekverstrekker heeft je BSN nodig voor de Belastingdienst, dus daar kun je het meestal laten staan. Een makelaar, verhuurder of andere partij heeft er in de regel geen wettelijke basis voor. Daar dek je het af. Je salaris laat je natuurlijk staan: daar gaat het juist om.",
      },
      { type: "h2", text: "Zo beveilig je je loonstrook met Cachety" },
      {
        type: "steps",
        items: [
          "Open cachety.com in je browser. Geen account, niets te installeren.",
          "Sleep je loonstroken, werkgeversverklaring en IB60 erin. Pdf's en foto's werken allebei.",
          "Vul in waarvoor de kopie is, of kies het voorbeeld Hypotheek of Huurwoning, en zet bij Wie krijgt hem? de naam van de ontvanger. De datum komt er automatisch bij.",
          "Dek af wat de ontvanger niet nodig heeft: je BSN voor een verhuurder, je personeelsnummer, je rekeningnummer.",
          "Wil je alles in één bestand? Kies Eén pdf, zet de documenten in de juiste volgorde en download.",
        ],
      },
      {
        type: "tip",
        text: "Moet het bestand onder een bepaalde grootte blijven voor een uploadportaal? Voor het downloaden zie je de bestandsgrootte. Kies Kleiner maken en houd elk bestand onder 10, 5, 2 of 1 MB.",
      },
      { type: "h2", text: "Een wachtwoord voor de extra voorzichtigen" },
      {
        type: "p",
        text: "Vink Beveiligen met een wachtwoord aan (AES-256): je krijgt een goed leesbaar wachtwoord van 12 woorden, dat je na het downloaden ziet. Liever je eigen? Kies Zelf een wachtwoord kiezen. Stuur het wachtwoord via een ander kanaal dan het bestand, bijvoorbeeld per sms als de pdf per mail gaat. Zo heeft iemand die alleen je mailbox binnenkomt nog niets aan het document.",
      },
      {
        type: "p",
        text: "Je documenten worden niet geüpload. Cachety doet al het werk in je browser, op je eigen apparaat. Dat is precies wat je wilt met een document waarop je salaris en je BSN staan.",
      },
      {
        type: "warning",
        text: "Cachety zet elke pagina om in een afbeelding. De tekst in het resultaat is dus niet meer te selecteren. Sommige hypotheekverstrekkers lezen documenten automatisch in en vragen om het originele bestand. Vraag het na als je twijfelt, en bewaar je originelen goed.",
      },
    ],
    faq: [
      {
        q: "Mag ik mijn BSN op mijn loonstrook zwartlakken?",
        a: "Voor een verhuurder of makelaar wel: die heeft geen wettelijke basis om je BSN te gebruiken. Voor een bank of hypotheekverstrekker kan het nodig zijn om het te laten staan. Vraag het na als je het niet zeker weet.",
      },
      {
        q: "Werkt het ook voor een Belgische loonfiche?",
        a: "Ja. Cachety werkt met elke pdf of foto. Dek op een Belgisch document je rijksregisternummer af als de ontvanger het niet wettelijk nodig heeft.",
      },
      {
        q: "Kan ik meerdere loonstroken in één pdf zetten?",
        a: "Ja. Voeg ze allemaal toe, kies Eén pdf, sleep ze in de goede volgorde en download één bestand met watermerk.",
      },
      {
        q: "Worden mijn loonstroken ergens opgeslagen?",
        a: "Nee. Ze blijven in het geheugen van je apparaat en verdwijnen als je het tabblad sluit. Er is geen server die ze ontvangt.",
      },
    ],
    updated: "2026-10-12",
  },

  // ───────────────────────────── Zwartlakken ─────────────────────────────
  {
    slug: "bsn-zwartlakken-pdf",
    topic: "redact",
    title: "Zo lak je je BSN of andere gegevens echt zwart in een pdf",
    metaTitle: "BSN zwartlakken in een pdf: gratis en echt verwijderd",
    description:
      "BSN, rekeningnummer of pasfoto zwartlakken in een pdf of foto? Waarom een zwart blok vaak niet genoeg is, en hoe je het gratis goed doet.",
    intro:
      "Een zwart blok over een nummer lijkt het te verbergen. In veel pdf's staat de tekst er alleen nog gewoon onder, en kan iedereen hem kopiëren. Zo lak je gegevens gratis en goed zwart.",
    example: "Kopie voor telefoonabonnement, Telgo Mobiel, 12-10-2026",
    body: [
      { type: "h2", text: "Waarom een zwart blok niet altijd genoeg is" },
      {
        type: "p",
        text: "Een pdf bestaat uit lagen. Teken je in veel pdf-programma's een zwarte rechthoek, dan leg je alleen een vorm bovenop. De oorspronkelijke tekst zit nog in het bestand. Iemand kan hem selecteren, kopiëren en ergens anders plakken, en daar staat je BSN weer. Daar zijn al heel wat mensen en organisaties ingetrapt. Het is een makkelijke fout, want op het scherm ziet alles er goed uit.",
      },
      {
        type: "tip",
        text: "Een snelle test voor elke zwartgelakte pdf: probeer de tekst onder het zwarte blok te selecteren, of zoek met de zoekfunctie van je pdf-lezer naar een woord dat je hebt verborgen. Wordt het gevonden, dan is het niet gelukt.",
      },
      { type: "h2", text: "Hoe Cachety zwartlakt" },
      {
        type: "p",
        text: "Cachety legt geen blok bovenop. Elke pagina wordt opnieuw opgebouwd als afbeelding, met het afgedekte gebied echt zwart gemaakt. De verborgen tekst is weg uit het bestand, net als de selecteerbare tekstlaag en de verborgen informatie van het bestand, zoals de auteur of de gps-locatie van een foto.",
      },
      {
        type: "steps",
        items: [
          "Open cachety.com in je browser. Je hoeft je niet te registreren.",
          "Sleep je pdf of afbeelding in het vak. JPG, PNG, HEIC en andere gangbare formaten werken ook.",
          "Vul in waarvoor de kopie is en wie hem krijgt. De datum komt er automatisch bij.",
          "Kies onder het voorbeeld Iets afdekken, teken rechthoeken over alles wat weg moet en tik op Klaar.",
          "Controleer het voorbeeld op elke pagina en download je zwartgelakte kopie.",
        ],
      },
      { type: "h2", text: "Wat mensen meestal zwartlakken" },
      {
        type: "list",
        items: [
          "Het BSN op een identiteitsbewijs, ook in de cijferreeks onderaan, en op loonstroken en brieven van de Belastingdienst.",
          "Het rijksregisternummer op een Belgische eID of loonfiche.",
          "De pasfoto, als de ontvanger alleen je naam en geboortedatum nodig heeft.",
          "Rekeningnummers en afschrijvingen die er niet toe doen.",
          "Medische gegevens, of informatie over kinderen of andere gezinsleden.",
        ],
      },
      { type: "h2", text: "Privé zonder uploaden" },
      {
        type: "p",
        text: "Veel gratis online tools om te censureren of zwart te lakken vragen je om je document naar hun servers te uploaden. Dat is vreemd voor precies de gegevens die je wilt beschermen. Cachety werkt andersom: je bestand blijft op je apparaat, er wordt niets verstuurd, en na het laden werkt de pagina zelfs in vliegtuigmodus.",
      },
      {
        type: "warning",
        text: "Omdat de zwartgelakte kopie uit afbeeldingen bestaat, kun je de tekst niet meer doorzoeken of kopiëren. Dat is de bedoeling, maar bewaar je origineel goed voor als je het later nodig hebt.",
      },
    ],
    faq: [
      {
        q: "Kan ik een pdf zwartlakken zonder Adobe Acrobat?",
        a: "Ja. Cachety is gratis, werkt in elke moderne browser en verwijdert echt wat je afdekt, in plaats van het alleen te bedekken.",
      },
      {
        q: "Kan zwartgelakte tekst worden teruggehaald?",
        a: "Als hij alleen met een vorm is bedekt, vaak wel. Bij Cachety wordt het afgedekte gebied uit het bestand zelf verwijderd, dus er blijft geen verborgen tekst over.",
      },
      {
        q: "Moet ik een watermerk toevoegen om zwart te lakken?",
        a: "Cachety is gebouwd rond het watermerk, dus een korte tekst hoort bij het proces. Een watermerk met doel, ontvanger en datum is sowieso verstandig en maakt een gelekte kopie traceerbaar.",
      },
      {
        q: "Hoe groot mag de pdf zijn?",
        a: "Tot 200 MB per bestand en 500 pagina's per pdf. Afdekken kan op de eerste pagina's van het document; de app laat zien tot welke pagina.",
      },
    ],
    updated: "2026-10-12",
  },

  // ───────────────────────────── Telefoon ─────────────────────────────
  {
    slug: "watermerk-op-telefoon",
    topic: "phone",
    title: "Zo zet je een watermerk op een document met je iPhone of Android",
    metaTitle: "Watermerk op je telefoon: iPhone en Android, gratis",
    description:
      "Zet gratis een watermerk op documenten en foto's op je iPhone of Android, zonder app uit de App Store. HEIC-foto's werken, er wordt niets geüpload.",
    intro:
      "De meeste mensen fotograferen hun documenten met hun telefoon en sturen ze meteen door. Je kunt daar ook direct een watermerk op zetten, in een minuut, zonder iets te installeren.",
    example: "Sollicitatie, Groenhof Logistiek, afdeling HR, 12-10-2026",
    body: [
      { type: "h2", text: "Waarom op je telefoon" },
      {
        type: "p",
        text: "Op je telefoon staan de foto's van je documenten al, dus daar zet je er ook het watermerk op. Je hoeft ze niet naar jezelf te mailen, naar een computer te zetten of extra kopieën te laten slingeren. Cachety draait in de browser van je telefoon, zoals Safari of Chrome. Je foto's worden op de telefoon zelf verwerkt en nooit geüpload. Het is dezelfde tool als op de computer, met dezelfde functies: voorbeelden, afdekken, meerdere ontvangers en een wachtwoord als je dat wilt.",
      },
      { type: "h2", text: "Stap voor stap" },
      {
        type: "steps",
        items: [
          "Open cachety.com in Safari, Chrome of je gewone browser.",
          "Tik op het vak en kies de foto's of pdf's die je wilt versturen. Meerdere tegelijk kan.",
          "Vul in waarvoor de kopie is, of kies een voorbeeld, en daarna wie hem krijgt. De datum komt er automatisch bij.",
          "Controleer het voorbeeld. Dek je BSN af met Iets afdekken als de ontvanger het niet nodig heeft.",
          "Download de kopie met watermerk en deel hem via mail, WhatsApp of een andere app. Verwijder daarna de kale kopieën die je onderweg hebt gemaakt.",
        ],
      },
      { type: "h2", text: "Foto's van je iPhone (HEIC) werken ook" },
      {
        type: "p",
        text: "iPhones slaan foto's meestal op als HEIC, een formaat dat sommige websites weigeren. Cachety accepteert HEIC, maar ook JPG, PNG, WebP en pdf, dus je kunt foto's zo uit je fotobibliotheek gebruiken.",
      },
      {
        type: "tip",
        text: "Foto's van je telefoon bevatten vaak de gps-locatie waar ze zijn gemaakt, en dat kan je huis zijn. Cachety haalt die verborgen informatie uit de kopie die je krijgt.",
      },
      { type: "h2", text: "Zet het op je beginscherm" },
      {
        type: "p",
        text: "Je kunt Cachety als een app installeren. Op een iPhone tik je in Safari op de deelknop en dan op Zet op beginscherm. Op Android kies je in het menu van de browser voor app installeren of toevoegen aan startscherm. Daarna open je het met één tik, net als elke andere app. Op Android krijg je er een handigheidje bij: na de installatie staat Cachety in het deelmenu. Tik in je galerij of bestanden-app op Delen bij een document en kies Cachety om er direct een watermerk op te zetten.",
      },
      {
        type: "list",
        items: [
          "Gratis, zonder account en zonder tracking.",
          "Werkt zonder internet zodra de pagina is geladen.",
          "Meerdere ontvangers: iedereen krijgt een eigen kopie, met de eigen naam erop.",
          "Een wachtwoord op de gedownloade pdf als je dat wilt.",
        ],
      },
      {
        type: "warning",
        text: "Een watermerk ontmoedigt misbruik en maakt een lek traceerbaar, maar kan niet voorkomen dat iemand een foto van je scherm maakt. Stuur documenten alleen naar mensen waarvan je hebt nagegaan dat ze echt zijn. Ben je toch opgelicht, neem dan contact op met je bank en doe aangifte bij de politie.",
      },
    ],
    faq: [
      {
        q: "Moet ik een app downloaden?",
        a: "Nee. Cachety werkt in de browser van je telefoon. Je kunt het op je beginscherm zetten voor snelle toegang, maar dat hoeft niet.",
      },
      {
        q: "Werkt het op oudere telefoons?",
        a: "Het werkt in elke recente versie van Safari of Chrome. Heel grote pdf's kunnen op een oudere telefoon wat langer duren.",
      },
      {
        q: "Worden mijn foto's ergens geüpload?",
        a: "Nee. Alles gebeurt op je telefoon. Zet na het laden van de pagina gerust vliegtuigmodus aan: het blijft werken.",
      },
      {
        q: "Kan ik direct vanuit Cachety een foto maken?",
        a: "Als je op het vak tikt, biedt je telefoon vaak aan om een foto te maken of er een uit je bibliotheek te kiezen. Een scherpe foto bij goed licht geeft het beste resultaat.",
      },
    ],
    updated: "2026-10-12",
  },

  // ───────────────────────────── Identiteitsfraude ─────────────────────────────
  {
    slug: "identiteitsfraude-voorkomen-kopie-id",
    topic: "identity-theft",
    title: "Identiteitsfraude met een kopie van je ID voorkomen, en wat te doen als het misgaat",
    metaTitle: "Identiteitsfraude voorkomen met een veilige kopie ID",
    description:
      "Met een kale kopie van je paspoort kan een oplichter veel kwaad. Zo maak je misbruik moeilijker, en dit doe je als het toch misgaat.",
    intro:
      "Met je naam, geboortedatum en BSN kan een oplichter een abonnement afsluiten of een lening aanvragen op jouw naam. Een kopie van je identiteitsbewijs is daarvoor vaak het startpunt. Je kunt het hem een stuk lastiger maken.",
    example: "Kopie voor rekening openen, Polderbank, 12-10-2026",
    body: [
      { type: "h2", text: "Hoe een kopie wordt misbruikt" },
      {
        type: "p",
        text: "Oplichters hebben vaak geen origineel nodig. Een duidelijke kopie van je paspoort of ID-kaart, samen met een loonstrook of bankafschrift, is genoeg om bij sommige bedrijven een telefoonabonnement, een lening of een webwinkelaccount aan te vragen. Zulke kopieën komen uit gehackte mailboxen, slecht beveiligde bedrijfsmappen, nepadvertenties voor woningen of banen, en berichten van iemand die zich voordoet als familielid.",
      },
      { type: "h2", text: "Vijf gewoontes die misbruik moeilijker maken" },
      {
        type: "list",
        items: [
          "Vraag eerst of een kopie echt nodig is. Vaak kan een bedrijf ook alleen het soort document en het nummer noteren.",
          "Maak je BSN onleesbaar als de ontvanger geen wettelijke basis heeft om het te gebruiken, ook in de cijferreeks onderaan.",
          "Zet op elke kopie het doel, de ontvanger en de datum, als watermerk over de hele pagina.",
          "Maak voor elke ontvanger een eigen versie, zodat je weet waar een gelekte kopie vandaan komt.",
          "Stuur nooit documenten naar iemand die je niet hebt gecontroleerd, hoe dringend het ook klinkt.",
        ],
      },
      { type: "h2", text: "Zo maak je een kopie die weinig waard is voor oplichters" },
      {
        type: "steps",
        items: [
          "Open cachety.com in je browser, op je telefoon of computer.",
          "Voeg een foto of scan van je identiteitsbewijs toe.",
          "Vul in waarvoor de kopie is en wie hem krijgt. De datum komt er automatisch bij.",
          "Kies Tekst bewerken en voeg {code} in, bijvoorbeeld kenm. {code}: elke kopie krijgt een eigen korte code. Bewaar na het downloaden de lijst met Lijst opslaan, want hij wordt nergens anders opgeslagen.",
          "Dek je BSN en, als die niet nodig is, je pasfoto af. Download de kopie en stuur alleen die.",
        ],
      },
      {
        type: "tip",
        text: "Een kopie met watermerk die toch opduikt, vertelt je direct waar het lek zat: de naam van de ontvanger en het kenmerk staan erop. Dat helpt als je moet uitleggen dat jij die lening of dat abonnement niet hebt afgesloten.",
      },
      { type: "h2", text: "Wat te doen als het toch misgaat" },
      {
        type: "steps",
        items: [
          "Verzamel bewijs: brieven van incassobureaus, rekeningen van abonnementen die je niet hebt afgesloten, afschriften.",
          "Neem contact op met het bedrijf waar het misbruik plaatsvond en vraag de aanvraagpapieren op, zoals de gebruikte kopie van je ID.",
          "Doe aangifte bij de politie en neem zoveel mogelijk documenten mee.",
          "Meld het bij het Centraal Meldpunt Identiteitsfraude en -fouten. Dat helpt slachtoffers als ze er met de betrokken organisaties zelf niet uitkomen.",
          "Ben je je identiteitsbewijs kwijt of is het gestolen, meld dat dan ook bij je gemeente of de politie.",
        ],
      },
      {
        type: "p",
        text: "Goed om te weten: een kopie van een identiteitsbewijs is zelf geen geldig identiteitsbewijs. Dat is een belangrijk punt als je moet aantonen dat iemand anders zich voor jou heeft uitgegeven.",
      },
      {
        type: "warning",
        text: "Een watermerk is een verstandige extra laag, geen garantie. Het maakt misbruik lastiger en een lek traceerbaar, maar kan niet voorkomen dat iemand een document fotografeert of nabewerkt.",
      },
    ],
    faq: [
      {
        q: "Wat kan iemand met een kopie van mijn paspoort?",
        a: "Met een duidelijke kopie, zeker als je BSN erop staat, kan een oplichter bij sommige bedrijven een abonnement, lening of account op jouw naam proberen aan te vragen. Een watermerk met doel, ontvanger en datum en een afgedekt BSN maken dat een stuk moeilijker.",
      },
      {
        q: "Waar meld ik identiteitsfraude?",
        a: "Doe aangifte bij de politie en meld het bij het Centraal Meldpunt Identiteitsfraude en -fouten. Neem ook direct contact op met de bedrijven waar het misbruik plaatsvond, en met je bank als er geld mee gemoeid is.",
      },
      {
        q: "Helpt een watermerk echt?",
        a: "Het maakt een kopie minder bruikbaar voor iets anders dan het doel dat erop staat, en het laat zien waar een lek vandaan kwam. Het is geen schild tegen alles, maar wel een goedkope en snelle extra drempel.",
      },
      {
        q: "Wordt mijn ID ergens opgeslagen als ik Cachety gebruik?",
        a: "Nee. Je ID wordt in je browser verwerkt, op je eigen apparaat. Er is geen server die het ontvangt, en na het sluiten van het tabblad is alles uit het geheugen.",
      },
    ],
    updated: "2026-10-12",
  },

  // Draft translation from the English guide, awaiting native review (ROADMAP.md, backlog: Native review).
  // ───────────────────────────── Ondertekenen ─────────────────────────────
  {
    slug: "huurcontract-online-ondertekenen",
    topic: "sign",
    tool: "sign",
    title: "Zo onderteken je een huurcontract of huurdocument online, zonder het te uploaden",
    metaTitle: "Huurcontract online ondertekenen: gratis, zonder upload",
    description:
      "Onderteken je huurovereenkomst, opleveringsrapport of huurformulier in je browser: handtekening tekenen of typen, plaatsen, klaar. Er wordt niets geüpload.",
    intro:
      "Makelaars en verhuurders sturen de huurovereenkomst vaak als pdf en willen hem ondertekend terug per mail. Je hoeft niets te printen, te scannen of een account aan te maken: je ondertekent in ongeveer een minuut in je browser, en het document verlaat je apparaat nooit.",
    example: "Ondertekende huurovereenkomst, alleen voor Makelaardij De Linde, 17-10-2026",
    body: [
      { type: "h2", text: "Wat je moet ondertekenen bij een huurwoning" },
      {
        type: "p",
        text: "Een woning huren betekent papierwerk: de huurovereenkomst zelf, het opleveringsrapport of inspectierapport bij de sleuteloverdracht, soms een verklaring voor de screening. Meestal komt alles als pdf met een regel voor je handtekening. Gebruikelijk is een ondertekenwebsite waar je het bestand moet uploaden en een account nodig hebt, of printen, tekenen, scannen en terugsturen. Cachety doet het in plaats daarvan in je browser.",
      },
      { type: "h2", text: "Zo onderteken je je huurdocumenten met Cachety" },
      {
        type: "steps",
        items: [
          "Open cachety.com/nl/sign in je browser, op de computer of op je telefoon. Niets te installeren, geen account nodig.",
          "Je documenten: sleep de pdf naar de pagina, of tik om hem te kiezen. Meerdere bestanden tegelijk kan ook, bijvoorbeeld de huurovereenkomst en het opleveringsrapport. Een foto van een papieren document werkt ook: die wordt een pdf van één pagina.",
          "Je handtekening: teken hem met je vinger, een stylus of de muis, typ je naam, of importeer een foto van je handtekening op wit papier. Eronder kun je de datum van vandaag laten staan en als je wilt de plaats en een korte vermelding toevoegen, zoals Gelezen en goedgekeurd.",
          "Plaatsen, controleren, downloaden: je handtekening verschijnt rechtsonder op de laatste pagina. Sleep hem naar de handtekeningregel en pas de grootte aan met de hoek. Vraagt de makelaar om een paraaf op elke pagina, zet dan Ook elke pagina paraferen aan.",
          "Controleer het voorbeeld en download. De ondertekende kopie houdt de oorspronkelijke naam, met -signed erachter. Die kopie stuur je terug.",
        ],
      },
      {
        type: "p",
        text: "Bij meerdere documenten krijgt elk document zijn eigen plek. Een document is pas klaar als je handtekening erop staat: de lijst laat zien welke nog wachten.",
      },
      {
        type: "tip",
        text: "Na het downloaden toont Cachety een vingerafdruk van elk bestand: een code van 64 tekens, berekend uit precies het bestand dat je hebt gedownload. Kopieer hem, bewaar hem bij je papieren en stuur hem mee met het document (bijvoorbeeld in dezelfde e-mail). Duikt er ooit een andere versie van het contract op, dan klopt de vingerafdruk niet: je ziet dat het niet het bestand is dat jij hebt verstuurd.",
      },
      { type: "h2", text: "Handige opties" },
      {
        type: "list",
        items: [
          "Ook elke pagina paraferen zet een kleine kopie van je handtekening rechtsonder op elke andere pagina. Een verwisselde pagina valt zo sneller op.",
          "Beveiligen met een wachtwoord staat standaard uit, want de makelaar moet het bestand kunnen openen. Zet het alleen aan als je het wachtwoord op een andere manier doorgeeft, bijvoorbeeld telefonisch.",
          "Kleiner maken helpt als de mail of het portaal van de makelaar de bestandsgrootte beperkt.",
          "Een watermerk toevoegen zet het doel, de ontvanger en de datum over de ondertekende kopie.",
        ],
      },
      { type: "h2", text: "Je documenten verlaten je apparaat nooit" },
      {
        type: "p",
        text: "Cachety werkt in je browser. Er is geen server die je documenten ontvangt, en de pagina mag technisch gezien geen contact maken met een andere website. Controleer het zelf: zet vliegtuigmodus aan zodra de pagina is geladen, en onderteken dan je document. Alles blijft werken. Ook je handtekening wordt niet bewaard: hij bestaat alleen in het geheugen van het tabblad en is weg zodra je het sluit.",
      },
      {
        type: "p",
        text: "Elke pagina van de ondertekende kopie wordt opnieuw opgebouwd uit haar pixels. Daardoor verdwijnen verborgen tekst en metadata, en kun je de tekst in de ondertekende kopie niet meer selecteren. Je origineel blijft onaangeroerd bij jou.",
      },
      { type: "h2", text: "Is deze handtekening geldig voor een huurcontract?" },
      {
        type: "p",
        text: "Een handtekening die je tekent of typt en op het document zet, is wat men gewoonlijk een gewone elektronische handtekening noemt. In de EU mag een rechter haar niet als bewijs weigeren alleen omdat ze elektronisch is (eIDAS-verordening, artikel 25). Voor alledaagse huurdocumenten is dat meestal genoeg. De regels verschillen wel per land en per document.",
      },
      {
        type: "p",
        text: "Wordt de handtekening ooit betwist, dan moet wie zich op het document beroept, bewijzen wie het heeft ondertekend. Bewaar daarom de e-mail of het bericht waarmee het is verstuurd. Alleen een gekwalificeerde handtekening, gezet met een certificaat van een gekwalificeerde aanbieder, wordt vermoed betrouwbaar te zijn en staat gelijk aan een handgeschreven handtekening.",
      },
      {
        type: "warning",
        text: "Dit is niet de juiste tool als een gekwalificeerde handtekening verplicht is, als de wet een vermelding in je eigen handschrift eist (borgtocht, schuldbekentenis), voor een testament of een notariële akte, of als de andere partij een bepaald platform eist (sommige leen- of verzekeringscontracten, bepaalde procedures bij de overheid). Gebruik dan wat zij vragen. Dit is geen juridisch advies.",
      },
      { type: "h2", text: "Kan iemand mijn handtekening hergebruiken?" },
      {
        type: "p",
        text: "Je handtekening is deel van het beeld van elke pagina. Je kunt hem dus niet als onderdeel van de pdf verplaatsen of verwijderen. Maar net als bij een gescande handtekening op papier zou iemand hem uit het beeld kunnen knippen en ergens anders kunnen plakken. Geen enkele afbeelding van een handtekening kan dat voorkomen, en het bestand bewijst niet wie hem heeft geplaatst of dat het document daarna niet is gewijzigd. Bewaar je kopie. Beperk het risico met een watermerk dat de kopie aan het doel en de ontvanger koppelt, en parafeer elke pagina.",
      },
    ],
    faq: [
      {
        q: "Accepteert een makelaar een document dat zo is ondertekend?",
        a: "Meestal wel: een ondertekende pdf per mail terugsturen is gewoon bij huurdocumenten. Gebruikt de makelaar een eigen ondertekenplatform en staat hij daarop, gebruik dan dat.",
      },
      {
        q: "Moet ik iets printen?",
        a: "Nee. Je tekent op het scherm en stuurt de ondertekende pdf terug. Heb je alleen een papieren exemplaar, maak er dan een scherpe foto van bij goed licht en onderteken de foto.",
      },
      {
        q: "Wordt mijn handtekening bewaard?",
        a: "Nee. Hij bestaat alleen in het geheugen van het tabblad. Sluit het en hij is weg. De volgende keer teken of typ je hem opnieuw.",
      },
      {
        q: "Kan ik nog tekst kopiëren uit de ondertekende pdf?",
        a: "Nee. Elke pagina wordt opnieuw opgebouwd uit haar pixels, waardoor ook verborgen tekst en metadata verdwijnen. Bewaar je origineel als je de tekst nodig hebt.",
      },
      {
        q: "Is Cachety echt gratis?",
        a: "Ja. Gratis, zonder account en zonder tracking. Het is opensourcesoftware, gemaakt in Frankrijk door Amir Moradi.",
      },
    ],
    updated: "2026-10-17",
  },
  {
    slug: "pdf-ondertekenen-op-telefoon",
    topic: "sign-phone",
    tool: "sign",
    title: "Zo onderteken je een pdf op je iPhone of Android-telefoon",
    metaTitle: "Pdf ondertekenen op je telefoon: iPhone en Android, gratis",
    description:
      "Onderteken een pdf met je vinger op je iPhone of Android-telefoon. Geen app, geen account, en het document wordt nooit geüpload. Gratis en open source.",
    intro:
      "Iemand heeft je een pdf gemaild om te ondertekenen en terug te sturen, en er is geen computer in de buurt. Je kunt hem met je vinger ondertekenen op je telefoon, gewoon in de browser, in ongeveer een minuut.",
    example: "Ondertekend toestemmingsformulier, alleen voor basisschool De Regenboog, 17-10-2026",
    body: [
      { type: "h2", text: "Geen app, geen account, geen upload" },
      {
        type: "p",
        text: "Cachety draait in de browser van je telefoon, zoals Safari of Chrome. Je downloadt niets uit een appwinkel en maakt geen account aan. Het document wordt op de telefoon zelf verwerkt en nooit geüpload: de pagina mag technisch gezien geen contact maken met een andere website.",
      },
      { type: "h2", text: "Stap voor stap" },
      {
        type: "steps",
        items: [
          "Bewaar de pdf die je kreeg op je telefoon. In de meeste mailapps tik je op de bijlage en bewaar je hem in Bestanden op een iPhone of in Downloads op Android.",
          "Open cachety.com/nl/sign in je browser, tik op het vak en kies de pdf. Een foto van een papieren document werkt ook.",
          "Teken je handtekening met je vinger in het vak. Niet tevreden? Maak de laatste lijn ongedaan of wis alles en probeer het opnieuw. Je kunt ook je naam typen of een foto van je handtekening importeren.",
          "Kies wat er onder de handtekening komt, als je dat wilt. De datum van vandaag staat standaard aan, en je kunt de plaats en een vermelding zoals Gelezen en goedgekeurd toevoegen.",
          "Ga naar de stap plaatsen, controleren, downloaden. Je handtekening verschijnt rechtsonder op de laatste pagina. Sleep hem met je vinger op zijn plek en pas de grootte aan met de hoek.",
          "Controleer het voorbeeld, download de ondertekende pdf en stuur hem terug via mail of een berichtenapp.",
        ],
      },
      {
        type: "tip",
        text: "Teken iets groter dan op papier en neem de tijd. De lege ruimte rond je handtekening wordt automatisch weggehaald, zodat hij scherp blijft op de pagina.",
      },
      { type: "h2", text: "Liever een foto van je handtekening?" },
      {
        type: "p",
        text: "Vind je tekenen met je vinger lastig, zet dan je handtekening op een wit vel met een donkere pen, maak er bij daglicht een foto van en kies Importeren. De witte achtergrond wordt voor je weggehaald. Is er nog wat papier te zien, schuif dan met de regelaar Gevoeligheid. Foto's van je iPhone (HEIC) werken ook.",
      },
      { type: "h2", text: "Controleer dat alles op je telefoon blijft" },
      {
        type: "p",
        text: "Zet vliegtuigmodus aan zodra de pagina is geladen, kies dan je pdf en onderteken hem. Alles blijft werken, dus er wordt niets verstuurd. Je handtekening wordt niet bewaard: sluit het tabblad en hij is weg.",
      },
      { type: "h2", text: "Opties voor je downloadt" },
      {
        type: "list",
        items: [
          "Ook elke pagina paraferen zet een kleine kopie van je handtekening op de andere pagina's.",
          "Kleiner maken houdt het bestand onder de grootte die een mail of website toestaat.",
          "Beveiligen met een wachtwoord staat standaard uit, zodat de ontvanger het bestand meteen kan openen.",
          "Na het downloaden zie je een vingerafdruk van het bestand. Bewaar hem en stuur hem mee met het document: duikt er ooit een andere versie op, dan klopt de vingerafdruk niet en zie je dat het niet het bestand is dat jij hebt verstuurd.",
        ],
      },
      { type: "h2", text: "Wat deze handtekening waard is" },
      {
        type: "p",
        text: "Een handtekening die je op je telefoon tekent en op het document zet, noemt men gewoonlijk een gewone elektronische handtekening. Voor alledaagse documenten wordt die meestal geaccepteerd, zoals formulieren van school of de sportclub, toestemmingsformulieren, offertes en huurdocumenten. Wordt hij ooit betwist, dan moet wie zich op het document beroept, bewijzen wie het heeft ondertekend; bewaar de e-mail of het bericht waarmee het is verstuurd.",
      },
      {
        type: "warning",
        text: "Dit is niet de juiste tool als een gekwalificeerde handtekening met certificaat verplicht is, als de wet een vermelding in je eigen handschrift eist (borgtocht, schuldbekentenis), voor een testament of een notariële akte, of als de andere partij haar eigen ondertekenplatform eist (sommige leen- of verzekeringscontracten, bepaalde procedures bij de overheid). En net als bij een gescande handtekening op papier kan iemand je handtekening uit de kopie knippen en hergebruiken. Een watermerk met het doel en de ontvanger, en een paraaf op elke pagina, beperken dat risico. Dit is geen juridisch advies.",
      },
    ],
    faq: [
      {
        q: "Moet ik een app downloaden?",
        a: "Nee. Cachety werkt in de browser van je telefoon. Je kunt het op je beginscherm zetten voor snelle toegang, maar dat hoeft niet.",
      },
      {
        q: "Kan ik met een stylus tekenen?",
        a: "Ja. Het handtekeningvak werkt met je vinger, een stylus of, op een computer, de muis.",
      },
      {
        q: "Wordt de pdf ergens geüpload?",
        a: "Nee. Alles gebeurt op je telefoon. Zet na het laden van de pagina gerust vliegtuigmodus aan: het blijft werken.",
      },
      {
        q: "Waarom kan ik de tekst in de ondertekende pdf niet meer selecteren?",
        a: "Elke pagina wordt opnieuw opgebouwd uit haar pixels. Zo kan de handtekening er niet af worden gehaald en verdwijnen verborgen gegevens. Je origineel blijft onaangeroerd op je telefoon.",
      },
    ],
    updated: "2026-10-17",
  },
];
