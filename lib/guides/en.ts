import type { Guide } from "./types";

// English guides, written for readers in the United Kingdom (en-GB).
// Plain text only: no links, no HTML, no markdown.

export const GUIDES_EN: Guide[] = [
  {
    slug: "watermark-documents-for-letting-agent",
    topic: "rental",
    title: "How to watermark your ID and documents for a letting agent or landlord",
    metaTitle: "Watermark Documents for a Letting Agent or Landlord",
    description:
      "Renting a flat? Watermark your passport, payslips and bank statements for a letting agent in a minute, free, without uploading them anywhere.",
    intro:
      "Renting a home in the UK means handing over a pile of personal documents. A simple watermark tells everyone who the copy was meant for, and makes it much less useful to anyone else.",
    example: "Right to Rent check – Martin Lettings Islington – 11/10/2026",
    body: [
      { type: "h2", text: "Why letting agents ask for so much" },
      {
        type: "p",
        text: "Before you can rent a flat or house in England, the landlord or letting agent has to carry out a Right to Rent check. That usually means a copy of your passport or another ID document. Then comes referencing: payslips, bank statements, sometimes a letter from your employer or a previous landlord. Most agents handle this carefully. But your documents travel by email, sit in inboxes and shared folders, and get passed to referencing companies. Every extra copy is one more chance for something to go wrong.",
      },
      { type: "h2", text: "The fake listing scam" },
      {
        type: "p",
        text: "A common rental scam works like this. Someone posts an attractive flat at a fair price, often copied from a real advert. They say there is a lot of interest and ask you to send your ID and payslips ‘to secure the viewing’. The flat does not exist, and your documents end up being used to open accounts or take out credit in your name. A watermark that names the agent and the purpose makes such a copy far less useful. Anyone trying to reuse it would have to explain why your passport says ‘Right to Rent check – Martin Lettings Islington’ on it.",
      },
      {
        type: "warning",
        text: "Be wary if you are asked for ID before you have seen the property, or asked to pay a deposit by bank transfer to secure a flat you have never visited. If you think you have been targeted, report it to Action Fraud and tell your bank straight away.",
      },
      { type: "h2", text: "How to watermark your documents with Cachety" },
      {
        type: "steps",
        items: [
          "Open cachety.com in your browser. There is nothing to install and no account to create.",
          "Drop your files onto the page, or tap to choose them. You can add your passport, payslips and bank statements all at once.",
          "Under ‘What is this copy for?’, type the purpose or pick the Housing example. Then, under ‘Who will receive it?’, type the agent's name. The date is added automatically.",
          "Check the preview. The text is repeated diagonally across every page.",
          "Download the watermarked copies and send those, never the originals.",
        ],
      },
      {
        type: "p",
        text: "Your files never leave your device. Cachety works inside your browser: there is no server that receives your documents. Once the page has loaded, you can even switch on aeroplane mode and it keeps working.",
      },
      {
        type: "tip",
        text: "Applying to several flats? Add each agent with ‘+ Add another recipient’: each one gets their own copy, with their name on it. If a copy ever turns up somewhere it should not, you will know where it came from.",
      },
      { type: "h2", text: "Hide what the agent does not need" },
      {
        type: "p",
        text: "An agent checking your income needs to see your salary going in, not what you spent at the chemist. Click ‘Hide something’ under the preview, then draw boxes to black out account numbers or unrelated transactions. What you mask is really removed from the file, not just covered over.",
      },
      {
        type: "p",
        text: "To be clear: a watermark discourages misuse and makes a leak traceable, but it cannot make reuse physically impossible. Someone could still photograph a document. It is a sensible layer of protection, not a magic shield.",
      },
    ],
    faq: [
      {
        q: "Will a letting agent accept a watermarked passport copy?",
        a: "In most cases, yes. The watermark is see-through, so your details stay readable. If an agent needs to see the original document in person, they will tell you; a watermarked copy is for what you send by email or upload.",
      },
      {
        q: "What should my watermark say?",
        a: "Keep it to three things: the purpose, who it is for and the date. For example: Right to Rent check – Martin Lettings Islington – 11/10/2026.",
      },
      {
        q: "Is Cachety really free?",
        a: "Yes. It is free, with no account and no tracking. It is open-source software made in France by Amir Moradi.",
      },
      {
        q: "Can the agent remove the watermark?",
        a: "Not simply by editing the PDF: the watermark is blended into the page itself. That said, no watermark makes misuse impossible, so only send what is really needed.",
      },
    ],
    updated: "2026-10-12",
  },
  {
    slug: "watermark-passport-copy",
    topic: "passport",
    title: "How to watermark a copy of your passport or driving licence before emailing it",
    metaTitle: "How to Watermark a Passport Copy Before Emailing It",
    description:
      "Watermark a copy of your passport or driving licence before you email it. Free, no account, and your photo never leaves your phone or computer.",
    intro:
      "A clear copy of your passport or driving licence is exactly what an identity thief wants. Adding a watermark before you send it takes about a minute and makes that copy much harder to misuse.",
    example: "Identity check – Northgate Bank mortgage – 11/10/2026",
    body: [
      { type: "h2", text: "Why a plain copy is risky" },
      {
        type: "p",
        text: "Your passport and driving licence carry your full name, date of birth, photo and signature. Banks, employers, letting agents and solicitors all ask for copies. Once you press send, you no longer control where that copy is stored or who sees it. A plain copy can be reused anywhere. A watermarked one says who it was for, why, and when. That makes it awkward to use for anything else, such as opening an account in your name.",
      },
      { type: "h2", text: "What a good watermark looks like" },
      {
        type: "p",
        text: "Follow a simple formula: purpose, recipient, date. ‘Identity check – Northgate Bank mortgage – 11/10/2026’ is ideal. Avoid vague text like ‘COPY’ on its own: it does not tell anyone where the copy should have stayed. Keep it short too: the watermark can be up to 120 characters, but a dozen words is plenty.",
      },
      {
        type: "list",
        items: [
          "Purpose: identity check, job application, Right to Rent check.",
          "Recipient: the name of the company or person.",
          "Date: the day you send it, so an old copy cannot be passed off as new.",
        ],
      },
      { type: "h2", text: "Step by step with Cachety" },
      {
        type: "steps",
        items: [
          "Open cachety.com on your computer or phone.",
          "Drop in a photo or scan of your passport or licence. Photos from an iPhone (HEIC) work too.",
          "Say what the copy is for (type it or pick an example), then who will receive it. The date is added automatically.",
          "Check the preview. Make sure your photo and details are still readable through the watermark.",
          "Download the watermarked copy and attach that one to your email.",
        ],
      },
      {
        type: "p",
        text: "Everything happens on your own device. Your passport is never uploaded, because there is no server to upload it to. Once the page has loaded, it even works with the internet switched off.",
      },
      {
        type: "tip",
        text: "Cachety also strips hidden data from the file it gives you, including the GPS location saved in phone photos. That way your copy does not quietly reveal where you live.",
      },
      { type: "h2", text: "Front and back of a driving licence" },
      {
        type: "p",
        text: "If someone asks for both sides of your photocard licence, add both photos at once and choose ‘One PDF’ before downloading. You pick the order, so the front comes first. Some websites limit file size; the size is shown before you download, and ‘Make it smaller’ keeps it under 10, 5, 2 or 1 MB.",
      },
      {
        type: "p",
        text: "Please keep in mind that a watermark discourages misuse and makes a leak traceable, but it cannot stop someone photographing the document. If your passport or licence is lost or you suspect it is being misused, report it through the official gov.uk services, tell your bank, and report any fraud to Action Fraud.",
      },
    ],
    faq: [
      {
        q: "Is it safe to email a copy of my passport?",
        a: "It is common, but only send it to people you have checked are genuine, and only when they really need it. Watermark it first so the copy is tied to that one purpose.",
      },
      {
        q: "Will the watermark make my passport unreadable?",
        a: "No. ‘Adjust watermark’ lets you choose Light, Normal or Strong, with size, colour and opacity under ‘More settings’, and the preview shows exactly what the recipient will see before you download.",
      },
      {
        q: "Does Cachety keep a copy of my passport?",
        a: "No. Your file is processed in your browser, on your device, and is never sent to Cachety or anyone else.",
      },
      {
        q: "Can I watermark a photo taken on my iPhone?",
        a: "Yes. HEIC photos are supported, along with JPG, PNG, WebP and PDF.",
      },
    ],
    updated: "2026-10-12",
  },
  {
    slug: "send-bank-statements-safely",
    topic: "bank-statement",
    title: "How to send bank statements and payslips safely",
    metaTitle: "How to Send Bank Statements and Payslips Safely",
    description:
      "Need to send bank statements or payslips? Learn what to watermark and what to black out, like account numbers, before you hit send. Free and private.",
    intro:
      "Letting agents, mortgage brokers and lenders often ask for three months of bank statements and your latest payslips. Here is how to share them without giving away more than you need to.",
    example: "Proof of income – Homeway Lettings referencing – 11/10/2026",
    body: [
      { type: "h2", text: "What these documents reveal" },
      {
        type: "p",
        text: "A bank statement shows far more than your balance. It shows your account number and sort code, where you shop, who you pay, and sometimes your address. A payslip shows your salary, your employer, your National Insurance number and your tax code from HMRC. In the wrong hands, this is useful for fraud. Account details can be used in convincing scam calls or emails, and combined with an ID copy they can help someone pretend to be you.",
      },
      { type: "h2", text: "Watermark everything you send" },
      {
        type: "p",
        text: "Add a watermark with the purpose, the recipient and the date, for example ‘Proof of income – Homeway Lettings referencing – 11/10/2026’. The text is repeated across every page, so a single page cannot be cropped out and reused cleanly.",
      },
      { type: "h2", text: "Black out what is not needed" },
      {
        type: "list",
        items: [
          "Account numbers: often the last four digits are enough. Ask the recipient what they need.",
          "Unrelated transactions: a landlord checking your rent affordability does not need to see your shopping.",
          "National Insurance number on payslips, unless the recipient has specifically asked for it.",
          "Anything about other people, such as a partner's name on a joint account, if it is not relevant.",
        ],
      },
      {
        type: "p",
        text: "Check first: some lenders need to see full, unedited statements, and changing them without asking can cause problems with your application. If in doubt, ask which details you may hide.",
      },
      { type: "h2", text: "How to do it with Cachety" },
      {
        type: "steps",
        items: [
          "Open cachety.com in your browser.",
          "Drop in your statements and payslips. PDF downloads from your online banking work perfectly.",
          "Say what the copy is for (type it or pick the Bank example), then who will receive it. The date is added automatically.",
          "Under the preview, click ‘Hide something’ and draw boxes over the details you want to hide, then ‘Done’.",
          "Check each page. Before you download, choose ‘One PDF’ to combine everything in the order you choose, or ‘Separate files (ZIP)’, then download.",
        ],
      },
      {
        type: "tip",
        text: "Click ‘Edit the text’ and insert {code}, for example ‘ref. {code}’. Each copy gets its own short code, listed after download: click ‘Save this list’ to keep it. If a statement ever leaks, you can tell which copy it was.",
      },
      {
        type: "p",
        text: "Your statements stay on your device the whole time. Nothing is uploaded, and the masked areas are truly removed from the file rather than just hidden under a box. A watermark cannot stop someone photographing a document, but it makes any misuse traceable and far less tempting.",
      },
      {
        type: "warning",
        text: "Banks will never ask you to move money to a ‘safe account’. If you notice unfamiliar payments or think your details have been misused, call your bank on the number on the back of your card and report it to Action Fraud.",
      },
    ],
    faq: [
      {
        q: "Can I black out transactions on a bank statement?",
        a: "Often yes, especially for a letting agent. But some mortgage lenders want complete statements, so ask first.",
      },
      {
        q: "Is a watermarked statement still accepted?",
        a: "Usually, yes. The watermark is semi-transparent and every figure remains readable. If needed, choose Light under ‘Adjust watermark’.",
      },
      {
        q: "The website says my file is too big. What can I do?",
        a: "The file size is shown before you download. Click ‘Make it smaller’ and choose 10, 5, 2 or 1 MB, and Cachety will keep each file under that limit.",
      },
      {
        q: "Do I need to send payslips as PDFs?",
        a: "Not necessarily. If you only have a photo of a paper payslip, Cachety can watermark the image, or combine several into one PDF.",
      },
    ],
    updated: "2026-10-12",
  },
  {
    slug: "redact-pdf-free",
    topic: "redact",
    title: "How to properly redact a PDF or image for free",
    metaTitle: "How to Redact a PDF or Image for Free, Properly",
    description:
      "Redact a PDF for free and make sure hidden text is really gone. Why black boxes often fail, and how to black out details safely in your browser.",
    intro:
      "Drawing a black box over a number looks like it hides it. In many PDFs, though, the text is still sitting underneath and anyone can copy it. Here is how to redact properly, for free.",
    example: "Proof of address – Brightwater Energy – 11/10/2026",
    body: [
      { type: "h2", text: "Why a black box is not always enough" },
      {
        type: "p",
        text: "A PDF is made of layers. When you draw a black rectangle in many PDF editors, you are only adding a shape on top. The original text is still in the file. Someone can select it, copy it and paste it somewhere else, and there it is again. This has caught out plenty of people and organisations over the years. It is an easy mistake to make, because on screen everything looks fine.",
      },
      {
        type: "tip",
        text: "A quick test for any redacted PDF: try to select the text under the black box, or use your PDF reader's search to look for a word you hid. If it is found, the redaction did not work.",
      },
      { type: "h2", text: "How Cachety redacts" },
      {
        type: "p",
        text: "Cachety does not lay a box on top. It rebuilds each page as a picture, with the masked area blacked out for real. The hidden text is gone from the file, as is the selectable text layer and the file's hidden information, such as its author or the GPS location of a photo.",
      },
      {
        type: "steps",
        items: [
          "Open cachety.com in your browser. No sign-up is needed.",
          "Drop your PDF or image onto the page. JPG, PNG, HEIC and other common formats work too.",
          "Say what the copy is for, then who will receive it. The date is added automatically.",
          "Under the preview, click ‘Hide something’ and draw rectangles over everything you want to hide, then ‘Done’.",
          "Check the preview on every page, then download your redacted copy.",
        ],
      },
      { type: "h2", text: "What people usually redact" },
      {
        type: "list",
        items: [
          "Bank account numbers and sort codes.",
          "National Insurance numbers on payslips and letters from HMRC.",
          "Passport and licence numbers, when the recipient only needs your name and photo.",
          "Medical details, or information about children or other family members.",
          "Signatures, when a copy is just for information.",
        ],
      },
      { type: "h2", text: "Private by design" },
      {
        type: "p",
        text: "Many free online redaction tools ask you to upload your document to their servers. That is a strange thing to do with the very information you are trying to protect. Cachety works the other way round: your file stays on your device, nothing is sent anywhere, and the page even keeps working in aeroplane mode once it has loaded.",
      },
      {
        type: "warning",
        text: "Since the redacted copy is rebuilt as images, you will not be able to search or copy its text. That is the point, but keep your original somewhere safe in case you need it later.",
      },
      {
        type: "p",
        text: "Redaction and watermarking work well together, but neither is a guarantee. Someone can still photograph what they can see. Hide what is not needed, watermark what you send, and only send it to people you trust.",
      },
    ],
    faq: [
      {
        q: "Can I redact a PDF without Adobe Acrobat?",
        a: "Yes. Cachety is free, works in any modern browser, and really removes what you mask instead of just covering it.",
      },
      {
        q: "Can redacted text be recovered?",
        a: "If it was only covered with a shape, often yes. With Cachety, the masked area is removed from the file itself, so there is no hidden text left to recover.",
      },
      {
        q: "Do I have to add a watermark to redact?",
        a: "Cachety is built around watermarking, so a short watermark text is part of the process. A watermark with the purpose, recipient and date is good practice anyway, and makes any leaked copy traceable.",
      },
      {
        q: "How big a PDF can I redact?",
        a: "Up to 200 MB per file and 500 pages per PDF.",
      },
    ],
    updated: "2026-10-12",
  },
  {
    slug: "watermark-documents-on-phone",
    topic: "phone",
    title: "How to watermark documents on an iPhone or Android phone",
    metaTitle: "Watermark Documents on iPhone or Android, for Free",
    description:
      "Watermark documents and photos on your iPhone or Android phone, free and without an app store download. HEIC photos supported, nothing uploaded.",
    intro:
      "These days most of us photograph our documents with our phone and send them straight away. You can add a watermark right there on your phone, in a minute, without installing anything from an app store.",
    example: "Job application – Greenfield Foods HR – 11/10/2026",
    body: [
      { type: "h2", text: "Why watermark on your phone" },
      {
        type: "p",
        text: "Your phone is where your document photos live, so it makes sense to watermark them there. No need to email them to yourself, move them to a computer, or leave extra copies lying around. Cachety runs in your phone's web browser, such as Safari or Chrome. Your photos are processed on the phone itself and are never uploaded. It is the same tool as on a computer, with the same features: examples to pick from, hiding details, one copy per recipient and an optional password.",
      },
      { type: "h2", text: "Step by step" },
      {
        type: "steps",
        items: [
          "Open cachety.com in Safari, Chrome or your usual browser.",
          "Tap to choose your files, and pick the photos or PDFs you want to send. You can choose several at once.",
          "Say what the copy is for (type it or pick an example), then who will receive it. The date is added automatically.",
          "Check the preview.",
          "Download the watermarked copy, then share it by email, WhatsApp or whichever app you use. Delete any extra unwatermarked copies you made along the way.",
        ],
      },
      { type: "h2", text: "iPhone photos (HEIC) work too" },
      {
        type: "p",
        text: "iPhones usually save photos in a format called HEIC, which some websites refuse. Cachety accepts HEIC as well as JPG, PNG, WebP and PDF, so you can use photos straight from your camera roll.",
      },
      {
        type: "tip",
        text: "Phone photos often contain the GPS location where they were taken, which might be your home. Cachety removes that hidden information from the copy it gives you.",
      },
      { type: "h2", text: "Add it to your home screen" },
      {
        type: "p",
        text: "You can install Cachety like an app. On iPhone, tap the Share button in Safari, then ‘Add to Home Screen’. On Android, use the browser menu and choose to install the app or add it to the home screen. It then opens with one tap, just like any other app. On Android there is a handy bonus: once installed, Cachety appears in the Share menu. From your gallery or files app, tap Share on a document and pick Cachety to watermark it directly.",
      },
      {
        type: "list",
        items: [
          "Free, with no account and no tracking.",
          "Works with the internet switched off once the page has loaded.",
          "One copy per recipient, each with their own name on it.",
          "Optional password on the downloaded PDF.",
        ],
      },
      {
        type: "warning",
        text: "A watermark discourages misuse and makes a leak traceable, but it cannot stop someone taking a photo of your screen. Only send documents to people you have checked are genuine. If you are ever tricked into sharing them, contact your bank and report it to Action Fraud.",
      },
    ],
    faq: [
      {
        q: "Do I need to download an app?",
        a: "No. Cachety works in your phone's browser. You can add it to your home screen if you want quick access, but you do not have to.",
      },
      {
        q: "Does it work on older phones?",
        a: "It works in any recent version of Safari or Chrome. Very large PDFs may take longer on an older phone.",
      },
      {
        q: "Are my photos uploaded anywhere?",
        a: "No. Everything happens on your phone. You can even turn on aeroplane mode after the page has loaded and it keeps working.",
      },
      {
        q: "Can I take a photo directly from Cachety?",
        a: "When you tap to choose a file, your phone may offer to take a photo or pick one from your library. A clear, well-lit photo gives the best result.",
      },
    ],
    updated: "2026-10-12",
  },
  {
    slug: "password-protect-pdf-free",
    topic: "password",
    title: "How to password-protect a PDF for free, without uploading it",
    metaTitle: "Password-Protect a PDF for Free, Without Uploading It",
    description:
      "Password-protect a PDF for free, right in your browser. Strong encryption, an easy-to-read password made for you, and no upload.",
    intro:
      "Adding a password to a PDF means only the person with the password can open it. You can do it for free in your browser, and your document never leaves your computer or phone.",
    example: "Tenancy application – Parkside Estates Leeds – 11/10/2026",
    body: [
      { type: "h2", text: "Why add a password" },
      {
        type: "p",
        text: "Emails get forwarded, sent to the wrong person, or sit in an inbox for years. A password means that even if the file ends up in the wrong place, it cannot be opened without the password. Cachety protects your PDF with strong AES-256 encryption, the standard banks use. Most free tools ask you to upload your file first, which rather defeats the purpose. Cachety does everything on your own device instead.",
      },
      { type: "h2", text: "How to do it with Cachety" },
      {
        type: "steps",
        items: [
          "Open cachety.com in your browser.",
          "Drop your PDF or photo onto the page.",
          "Say what the copy is for, for example Tenancy application, then who will receive it, for example Parkside Estates Leeds. The date is added automatically.",
          "Check the preview, then tick ‘Lock with a password’. An easy-to-read password of 12 words is made for you. Prefer your own? Click ‘Choose my own password’, or generate a maximum-strength one.",
          "Download the protected PDF and send it. The password is shown after download, to send separately.",
        ],
      },
      {
        type: "tip",
        text: "If you copy the password, Cachety wipes it from your clipboard after one minute, so it does not linger where other apps might read it. Paste it somewhere safe first.",
      },
      { type: "h2", text: "Send the password a different way" },
      {
        type: "p",
        text: "This is the golden rule. If you send the PDF and its password in the same email, anyone who gets hold of that email has both. Send the file by email and the password by text message, or read it out over the phone.",
      },
      {
        type: "list",
        items: [
          "File by email, password by text message.",
          "File through an upload portal, password by phone call.",
          "Never put the password in the email subject or file name.",
        ],
      },
      { type: "h2", text: "What about photos?" },
      {
        type: "p",
        text: "Images cannot hold a password on their own. If you add a password to a photo, Cachety gives you an encrypted PDF instead, which opens in any normal PDF reader once the password is entered. Sending several documents? Choose ‘One PDF’ to combine them in the order you choose, so the recipient only needs to type one password.",
      },
      {
        type: "warning",
        text: "Keep a note of the password. If it is lost, nobody can open the file, not even Cachety, because the password is never sent to us or stored anywhere.",
      },
      {
        type: "p",
        text: "A password protects the file on its way. Once the recipient opens it, they can read it, so the watermark still matters: it tells everyone who the copy was for. Neither can stop someone photographing the screen, but together they make misuse much less likely. If you suspect your details have been misused, contact your bank and report it to Action Fraud.",
      },
    ],
    faq: [
      {
        q: "Is it really free to password-protect a PDF?",
        a: "Yes. Cachety is free, with no account and no tracking. It is open-source software made in France.",
      },
      {
        q: "Will the recipient need special software?",
        a: "No. Any standard PDF reader, including those built into phones and web browsers, will ask for the password and open the file.",
      },
      {
        q: "Can I add a password without a watermark?",
        a: "Cachety is designed to watermark first, then optionally add a password. A short watermark with the purpose, recipient and date is a good habit for any sensitive document.",
      },
      {
        q: "What makes a strong password?",
        a: "Long and random is best. When you tick ‘Lock with a password’, Cachety makes one of 12 random words for you, so you do not have to think one up.",
      },
    ],
    updated: "2026-10-12",
  },
];
