import type { Comparison } from "./types";

// English comparison pages, written for readers in the United Kingdom (en-GB).
// Plain text only: no links, no HTML, no markdown.
// Every claim about another tool is backed by a page listed in its `sources`,
// read on the `checked` date. Prices change often, so none are quoted here.

const CHECKED = "2026-10-11";
const UPDATED = "2026-10-12";

export const COMPARISONS_EN: Comparison[] = [
  // ───────────────────────────── iLovePDF ─────────────────────────────
  {
    slug: "cachety-vs-ilovepdf",
    competitor: "ilovepdf",
    competitorName: "iLovePDF",
    competitorUrl: "https://www.ilovepdf.com/",
    title: "Cachety vs iLovePDF: which should you use to watermark your ID?",
    metaTitle: "iLovePDF Alternative for Watermarking ID Documents",
    description:
      "iLovePDF uploads your PDF to its servers and deletes it within two hours. Cachety watermarks your ID on your own device. An honest comparison.",
    intro:
      "iLovePDF is one of the best-known PDF websites, and its watermark tool is quick and capable. But to watermark a passport or a payslip, iLovePDF needs a copy of the file on its servers. Cachety does the same job without the file ever leaving your phone or computer.",
    verdict:
      "For a logo watermark or for everyday PDF jobs like merging, converting or signing, iLovePDF is the more complete toolbox. For an ID document, a payslip or a bank statement, Cachety avoids sending the file anywhere at all. If you would rather not trust anyone's servers with your passport, that is the difference that matters.",
    table: [
      {
        criterion: "Where your file is processed",
        cachety: "In your browser, on your own device. Nothing is uploaded.",
        other: "On iLovePDF's servers. Your file is uploaded over an encrypted connection.",
        edge: "cachety",
      },
      {
        criterion: "How long the file is kept",
        cachety: "Never stored anywhere except on your device.",
        other: "Deleted within two hours of processing, according to its privacy policy.",
        edge: "cachety",
      },
      {
        criterion: "Price",
        cachety: "Free, with no paid tier.",
        other: "Free version with usage limits. A paid Premium plan removes them.",
      },
      {
        criterion: "Adverts",
        cachety: "No ads or trackers today.",
        other: "The free version shows ads. An ad-free service is listed as a Premium feature.",
        edge: "cachety",
      },
      {
        criterion: "Type of watermark",
        cachety: "Text only, repeated diagonally across the whole page.",
        other: "Text or image, placed where you click or in a mosaic pattern.",
        edge: "other",
      },
      {
        criterion: "Can the watermark be stripped out?",
        cachety: "No simple way: it is blended into the page image.",
        other: "Not documented. You can choose to place it over or under the PDF content.",
      },
      {
        criterion: "Blacking out details",
        cachety: "Built in: draw boxes and the hidden content is really removed.",
        other: "Available as a separate Redact tool.",
      },
      {
        criterion: "One copy per recipient",
        cachety: "Yes, up to 20 recipients at once, each with their own name on it.",
        other: "Not offered in the watermark tool.",
        edge: "cachety",
      },
      {
        criterion: "Works offline",
        cachety: "Yes, in the browser, once the page has loaded.",
        other: "Yes, with the iLovePDF Desktop app for Windows and Mac.",
      },
      {
        criterion: "Other PDF tools",
        cachety: "Watermark, masking, combining, password and file size only.",
        other: "A large range: merge, split, compress, convert, sign and more.",
        edge: "other",
      },
    ],
    body: [
      { type: "h2", text: "The real difference: where your passport goes" },
      {
        type: "p",
        text: "When you use iLovePDF's website, your file is sent to its servers, processed there, and sent back to you. iLovePDF says uploads are encrypted and that files are deleted within two hours. That is a reasonable policy, and iLovePDF holds ISO 27001 certification. But for those two hours a copy of your ID sits on a computer you do not control, under someone else's rules. Cachety works differently. The whole thing runs inside your web browser. Your passport is read, watermarked and saved on your own device, and there is no server waiting to receive it. That is not a promise to delete your file quickly: the file is simply never sent.",
      },
      {
        type: "tip",
        text: "You can check this yourself. Open cachety.com, then switch on aeroplane mode and watermark a document. It still works, because nothing needs to travel over the internet.",
      },
      { type: "h2", text: "Where iLovePDF is better" },
      {
        type: "p",
        text: "iLovePDF is a full PDF toolbox. If you need to merge, compress, convert to Word or sign a document, it can do all of that, and Cachety cannot. Its watermark tool also accepts an image, so a business can stamp its logo on documents. Cachety only does text watermarks.",
      },
      { type: "h2", text: "Where Cachety is better for ID documents" },
      {
        type: "list",
        items: [
          "Your file never leaves your device, so there is no upload and no retention period to think about.",
          "The watermark is blended into each page, so it cannot simply be deleted by editing the PDF.",
          "You can black out details such as an account number or a photo in the same step.",
          "In a single step, you can make one copy per letting agent, employer or bank, each with its own name.",
          "Hidden data like metadata, GPS location in photos and the text layer is removed from the result.",
        ],
      },
      { type: "h2", text: "How to watermark your ID with Cachety" },
      {
        type: "steps",
        items: [
          "Open cachety.com. There is nothing to install and no account to create.",
          "Add your passport, driving licence or payslip. PDFs and photos, including iPhone photos, both work.",
          "Say what the copy is for (type it or pick an example), then who will receive it. The date is added automatically.",
          "Check the preview and download your watermarked copy.",
        ],
      },
      {
        type: "p",
        text: "To be fair: Cachety turns every page into an image, so the text in the result can no longer be selected or searched. That is deliberate, to make the watermark hard to remove, but it does mean the file can be larger than the original.",
      },
    ],
    chooseOther: [
      "You want to put a logo or an image on your documents as a watermark.",
      "You also need to merge, compress, convert or sign your PDFs in the same place.",
      "You want a desktop app to process lots of files on your computer.",
    ],
    chooseCachety: [
      "You are watermarking a passport, driving licence, payslip or bank statement and would rather it never left your device.",
      "You want to send a different, named copy to each letting agent or employer.",
      "You want to black out details and add a password to the PDF in the same step.",
      "You want a free tool with no ad networks, no account and nothing to install.",
    ],
    faq: [
      {
        q: "Is iLovePDF safe for ID documents?",
        a: "iLovePDF says uploads are encrypted and files are deleted within two hours, and it is ISO 27001 certified. The question is whether you are comfortable with a copy of your ID being on its servers for that time. If not, use a tool that works on your device, such as Cachety.",
      },
      {
        q: "Does iLovePDF upload my files?",
        a: "Yes. The website processes files on iLovePDF's servers. Its desktop app for Windows and Mac works locally instead.",
      },
      {
        q: "What is a free alternative to iLovePDF for watermarking?",
        a: "Cachety is free and watermarks PDFs and photos in your browser without uploading them. It only does text watermarks, so for a logo you would need another tool.",
      },
      {
        q: "Can I add a logo watermark with Cachety?",
        a: "No. Cachety only adds text watermarks. For a logo, iLovePDF's watermark tool accepts images.",
      },
    ],
    sources: [
      { label: "iLovePDF privacy policy", url: "https://www.ilovepdf.com/help/privacy" },
      { label: "iLovePDF FAQ", url: "https://www.ilovepdf.com/help/faq" },
      { label: "iLovePDF security", url: "https://www.ilovepdf.com/help/security" },
      { label: "iLovePDF pricing", url: "https://www.ilovepdf.com/pricing" },
      {
        label: "iLovePDF guide: how to watermark a PDF",
        url: "https://www.ilovepdf.com/blog/how-to-watermark-pages-in-a-pdf-document-online",
      },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ───────────────────────────── Smallpdf ─────────────────────────────
  {
    slug: "cachety-vs-smallpdf",
    competitor: "smallpdf",
    competitorName: "Smallpdf",
    competitorUrl: "https://smallpdf.com/",
    title: "Cachety vs Smallpdf for watermarking documents",
    metaTitle: "Smallpdf Watermark Alternative: Cachety vs Smallpdf",
    description:
      "Smallpdf uploads your PDF to its servers to add a watermark. Cachety does it on your device, free and with no account. See how they compare.",
    intro:
      "Smallpdf is a popular, polished PDF website with a simple watermark tool. Its page says it works right in your browser, but its own FAQ explains that files are uploaded and deleted from its servers afterwards. Cachety keeps the file on your device from start to finish.",
    verdict:
      "Smallpdf is a good all-round PDF service with apps and many tools, and it is a sound choice for everyday documents. For a passport, a driving licence or a payslip, Cachety avoids the upload altogether and adds features aimed at ID documents, such as masking and one copy per recipient.",
    table: [
      {
        criterion: "Where your file is processed",
        cachety: "In your browser, on your own device. Nothing is uploaded.",
        other: "On Smallpdf's servers, using a hosting provider in the European Union.",
        edge: "cachety",
      },
      {
        criterion: "How long the file is kept",
        cachety: "Never stored anywhere except on your device.",
        other: "The tool page says files are deleted after one hour. The privacy notice uses broader wording for users without an account.",
        edge: "cachety",
      },
      {
        criterion: "Account",
        cachety: "None.",
        other: "Not needed for the watermark tool.",
      },
      {
        criterion: "Free use",
        cachety: "Free, with no paid tier.",
        other: "Free with some usage limits, including a daily download limit. Pro removes them.",
        edge: "cachety",
      },
      {
        criterion: "Analytics and advertising trackers",
        cachety: "None.",
        other: "Its privacy notice lists Google Analytics, Hotjar, Google Ads, Facebook Pixel and LinkedIn Insight Tag, subject to consent.",
        edge: "cachety",
      },
      {
        criterion: "Type of watermark",
        cachety: "Text, repeated diagonally across the page.",
        other: "Text only in the watermark tool; images can be added with Edit PDF.",
      },
      {
        criterion: "Can the watermark be stripped out?",
        cachety: "No simple way: it is blended into the page image.",
        other: "Not documented.",
      },
      {
        criterion: "Blacking out details and passwords",
        cachety: "Masking and an optional password are built in.",
        other: "Available as separate Redact and Protect tools.",
      },
      {
        criterion: "One copy per recipient",
        cachety: "Yes, up to 20 named copies at once.",
        other: "Not offered in the watermark tool.",
        edge: "cachety",
      },
      {
        criterion: "Apps and other tools",
        cachety: "Web only, works on phones. Watermarking and related tasks only.",
        other: "Desktop and mobile apps, plus more than 30 PDF tools.",
        edge: "other",
      },
    ],
    body: [
      { type: "h2", text: "‘Right in your browser’ does not mean ‘on your device’" },
      {
        type: "p",
        text: "Smallpdf's watermark page invites you to customise your watermark right in your browser. That describes where you click, not where the work happens. The same page's FAQ says files are protected with encryption during upload and download, and deleted from Smallpdf's servers after one hour. Its privacy notice adds that uploaded files are stored temporarily on servers in the European Union run by a hosting company.",
      },
      {
        type: "p",
        text: "With Cachety, both the clicking and the work happen on your device. Your document is not sent to any server, ours included, because there is no server that receives files.",
      },
      {
        type: "tip",
        text: "Try the aeroplane mode test: load cachety.com, switch your phone or laptop offline, and watermark a document. If it works offline, your file cannot have gone anywhere.",
      },
      { type: "h2", text: "Where Smallpdf is better" },
      {
        type: "p",
        text: "Smallpdf offers a wide set of tools, from compression and conversion to e-signatures, with desktop and mobile apps. If you work with PDFs every day, that range is handy. Cachety does one job: protecting documents you share. It cannot edit text, sign or convert files.",
      },
      { type: "h2", text: "Where Cachety is better for ID documents" },
      {
        type: "list",
        items: [
          "No upload, so no retention period and no third-party hosting involved.",
          "No analytics or advertising trackers on the page.",
          "The watermark is drawn into each page and repeated across it, so cropping it out is hard.",
          "Masking, a password and one copy per recipient are all in the same screen.",
        ],
      },
      { type: "h2", text: "How to do it with Cachety" },
      {
        type: "steps",
        items: [
          "Open cachety.com in any browser, on your phone or computer.",
          "Add your documents. You can add several at once.",
          "Say what the copy is for (type it or pick an example), then who will receive it. The date is added automatically.",
          "If you like, click ‘Hide something’ under the preview to draw boxes over details, or tick ‘Lock with a password’.",
          "Download the watermarked copy and send that, not the original.",
        ],
      },
    ],
    chooseOther: [
      "You need a broad PDF toolkit, such as compression, conversion and e-signatures, in one place.",
      "You want a desktop or mobile app rather than a website.",
      "You want to keep the PDF text selectable after watermarking.",
    ],
    chooseCachety: [
      "You are sharing an ID document, payslip or bank statement and do not want it uploaded anywhere.",
      "You prefer a page with no analytics or advertising trackers.",
      "You need one named copy per recipient, or want to black out details at the same time.",
    ],
    faq: [
      {
        q: "Does Smallpdf upload my files?",
        a: "Yes. Smallpdf's own FAQ says files are encrypted during upload and deleted from its servers after one hour, unless you save them in an account.",
      },
      {
        q: "Is Smallpdf safe for a passport copy?",
        a: "Smallpdf uses encryption and says it is GDPR compliant and ISO certified. Even so, your passport is uploaded and kept on its servers for a while. If you would rather avoid that, Cachety watermarks it on your device instead.",
      },
      {
        q: "Is Smallpdf's watermark tool free?",
        a: "You can use it free without an account, but Smallpdf says there are usage limits for free users. Cachety is free with no account and no paid version.",
      },
      {
        q: "Does Cachety keep the text selectable?",
        a: "No. Each page becomes an image with the watermark drawn on it, which makes the watermark much harder to remove. If you need searchable text, that is a reason to use another tool.",
      },
    ],
    sources: [
      { label: "Smallpdf watermark tool and FAQ", url: "https://smallpdf.com/watermark-pdf" },
      { label: "Smallpdf privacy notice", url: "https://smallpdf.com/privacy" },
      { label: "Smallpdf pricing", url: "https://smallpdf.com/pricing" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ─────────────────────────── Adobe Acrobat ───────────────────────────
  {
    slug: "cachety-vs-adobe-acrobat",
    competitor: "adobe-acrobat",
    competitorName: "Adobe Acrobat",
    competitorUrl: "https://www.adobe.com/acrobat.html",
    title: "Cachety vs Adobe Acrobat: watermarking a PDF without a subscription",
    metaTitle: "Adobe Acrobat Watermark: a Free Alternative",
    description:
      "Adobe's free online tools do not include a watermark tool; it is part of paid Acrobat. Cachety watermarks PDFs free, on your own device.",
    intro:
      "Adobe Acrobat is the industry standard for PDF editing, and it can add watermarks. But watermarking is not among Adobe's free online tools: you need a paid Acrobat subscription. Cachety is a free way to watermark an ID document without leaving your browser.",
    verdict:
      "If you already pay for Acrobat, or you need professional PDF editing, Acrobat is the stronger tool, with text and image watermarks and many other features. If you just want to watermark a passport or payslip before sending it, Cachety does that for free, with no account, and your file stays on your device.",
    table: [
      {
        criterion: "Free watermarking",
        cachety: "Yes, free with no paid tier.",
        other: "No free online watermark tool is listed. Watermarking comes with paid Acrobat.",
        edge: "cachety",
      },
      {
        criterion: "Account",
        cachety: "None.",
        other: "An Adobe account and subscription.",
        edge: "cachety",
      },
      {
        criterion: "Where your file is processed",
        cachety: "In your browser, on your device. Nothing is uploaded.",
        other: "On your computer with the desktop app; through Adobe's online service with Acrobat on the web.",
      },
      {
        criterion: "Type of watermark",
        cachety: "Text only, repeated diagonally across the page.",
        other: "Text or image, with font, size, colour, opacity and placement.",
        edge: "other",
      },
      {
        criterion: "Blacking out details",
        cachety: "Built in, free.",
        other: "Redaction is an Acrobat Pro feature.",
        edge: "cachety",
      },
      {
        criterion: "Password protection",
        cachety: "Optional AES-256 password on the PDF.",
        other: "Available, including as a free online Protect PDF tool.",
      },
      {
        criterion: "Tracking",
        cachety: "No tracking cookies or visitor analytics.",
        other: "Adobe's privacy policy says it uses cookies and other technologies to track use of its services.",
        edge: "cachety",
      },
      {
        criterion: "Other PDF features",
        cachety: "Watermark, masking, combining, password and file size only.",
        other: "Full PDF editing, conversion, OCR, forms, e-signatures and much more.",
        edge: "other",
      },
      {
        criterion: "Open source",
        cachety: "Yes, AGPL-3.0, code published on GitHub.",
        other: "No, proprietary software.",
      },
    ],
    body: [
      { type: "h2", text: "Can you watermark a PDF free with Adobe?" },
      {
        type: "p",
        text: "Adobe offers more than 25 free online tools, including Edit PDF, Merge, Compress and Protect PDF. A watermark tool is not among them. Watermarking is part of paid Acrobat, on the desktop or on the web with a subscription. So if you search for a free Adobe watermark tool, you will be pointed towards a paid plan.",
      },
      {
        type: "p",
        text: "For a one-off job, such as sending a copy of your passport to a letting agent, a subscription is a lot to take on. Cachety is free and needs no account.",
      },
      { type: "h2", text: "Where Acrobat is better" },
      {
        type: "p",
        text: "Acrobat is a professional tool. It can place an image or logo as a watermark, edit the text of a PDF, fill and sign forms, run OCR and much more. For a business that handles PDFs all day, it is in a different league from Cachety, which only protects documents before you share them.",
      },
      { type: "h2", text: "Where Cachety is better for ID documents" },
      {
        type: "list",
        items: [
          "Free, with no account, subscription or trial to cancel.",
          "Your file is processed in your browser and never sent to a server.",
          "Masking is included, so you can hide an account number or photo without paying for Pro.",
          "You can make one named copy per recipient, up to 20 at a time.",
          "It works on a phone, including iPhone photos, with nothing to install.",
        ],
      },
      { type: "h2", text: "How to watermark a PDF free with Cachety" },
      {
        type: "steps",
        items: [
          "Open cachety.com in your browser.",
          "Add your PDF or photo.",
          "Say what the copy is for (type it or pick an example), then who will receive it. The date is added automatically.",
          "Download the result. You can tick ‘Lock with a password’ first if you want.",
        ],
      },
      {
        type: "tip",
        text: "Cachety works offline once the page has loaded. Switch on aeroplane mode before adding your file if you want to be sure nothing is sent.",
      },
    ],
    chooseOther: [
      "You already pay for Acrobat and are used to it.",
      "You need an image or logo watermark, or full PDF editing, forms and OCR.",
      "Your workplace requires a supported, commercial product.",
    ],
    chooseCachety: [
      "You just want to watermark an ID document, payslip or statement, free, without a subscription.",
      "You want your file to stay on your device.",
      "You need to black out details without paying for a Pro plan.",
    ],
    faq: [
      {
        q: "Can I add a watermark in Adobe Acrobat for free?",
        a: "Adobe's list of free online tools does not include a watermark tool. Watermarking is a feature of paid Acrobat.",
      },
      {
        q: "What is the best free alternative to Adobe for watermarking an ID?",
        a: "Cachety is a free option that works in your browser without uploading your file. It adds a text watermark repeated across the page, and can also black out details and add a password.",
      },
      {
        q: "Can Cachety add a logo like Acrobat?",
        a: "No, Cachety only adds text watermarks. If you need a logo, Acrobat or another tool that accepts images is the better choice.",
      },
    ],
    sources: [
      { label: "Adobe Acrobat free online tools", url: "https://www.adobe.com/acrobat/online.html" },
      { label: "Adobe Acrobat plans compared", url: "https://www.adobe.com/acrobat/pricing/compare-versions.html" },
      { label: "Adobe: what is a watermark", url: "https://www.adobe.com/acrobat/resources/what-is-a-watermark.html" },
      { label: "Adobe privacy policy", url: "https://www.adobe.com/privacy/policy.html" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ───────────────────────────── PDF24 ─────────────────────────────
  {
    slug: "cachety-vs-pdf24",
    competitor: "pdf24",
    competitorName: "PDF24",
    competitorUrl: "https://tools.pdf24.org/en/",
    title: "Cachety vs PDF24: watermarking your documents online",
    metaTitle: "PDF24 Watermark Alternative That Never Uploads",
    description:
      "PDF24 adds watermarks on its servers in Germany and deletes files after an hour. Cachety does it on your device. Compare the two free tools.",
    intro:
      "PDF24 is a free, generous set of PDF tools from a Berlin company, with no limits and no registration. Its online watermark tool runs on PDF24's servers in Germany. Cachety is also free, but your file never leaves your device.",
    verdict:
      "PDF24 is a strong free toolbox, and its Windows app, PDF24 Creator, keeps files on your PC. For a quick watermark on an ID document from a phone or a Mac, Cachety avoids the upload and has no ad networks or advertising trackers on the page.",
    table: [
      {
        criterion: "Where your file is processed",
        cachety: "In your browser, on your own device.",
        other: "On PDF24's servers in Germany for the online tool. PDF24 Creator for Windows works on your PC.",
        edge: "cachety",
      },
      {
        criterion: "How long the file is kept",
        cachety: "Never stored anywhere except on your device.",
        other: "Deleted from the server within one hour, or sooner if you delete it yourself.",
        edge: "cachety",
      },
      {
        criterion: "Price and limits",
        cachety: "Free, no account.",
        other: "Free, no limits and no registration.",
      },
      {
        criterion: "Adverts and trackers",
        cachety: "No ads or trackers today.",
        other: "Funded by advertising. Its privacy policy mentions Google AdSense, Google Analytics and Google remarketing.",
        edge: "cachety",
      },
      {
        criterion: "Type of watermark",
        cachety: "Text, repeated diagonally across the page, with an optional wave effect.",
        other: "Text, with nine positions or fill the page, plus angle and spacing.",
      },
      {
        criterion: "Can the watermark be stripped out?",
        cachety: "No simple way: it is blended into the page image.",
        other: "Not documented.",
      },
      {
        criterion: "Blacking out details, password, metadata",
        cachety: "All in the same screen as the watermark.",
        other: "Available as separate tools: Redact, Protect and Remove metadata.",
      },
      {
        criterion: "One copy per recipient",
        cachety: "Yes, up to 20 named copies at once.",
        other: "Not offered in the watermark tool.",
        edge: "cachety",
      },
      {
        criterion: "Other PDF tools",
        cachety: "Watermark, masking, combining, password and file size only.",
        other: "Dozens of free tools, plus a free desktop app for Windows.",
        edge: "other",
      },
    ],
    body: [
      { type: "h2", text: "What happens to your file with PDF24 online" },
      {
        type: "p",
        text: "PDF24 is open about it: the watermark is added on its servers in the cloud, the servers are in Germany, and files are deleted after one hour. That is a clear, fair policy from an EU company. It still means a copy of your passport or payslip is sent across the internet and stored for up to an hour on a machine you do not control.",
      },
      {
        type: "p",
        text: "Cachety takes a different approach. The page loads once, then everything happens inside your browser. Your document is never sent anywhere, so there is nothing to delete afterwards.",
      },
      {
        type: "tip",
        text: "Want proof? Open cachety.com, turn on aeroplane mode and watermark a file. It keeps working because nothing needs the internet.",
      },
      { type: "h2", text: "Where PDF24 is better" },
      {
        type: "p",
        text: "PDF24 has dozens of free tools with no limits, from compression to conversion and OCR. On Windows, PDF24 Creator does the work on your own PC, which is a good option for privacy too. Cachety does not convert, compress on its own, or edit PDFs, and has no desktop app.",
      },
      { type: "h2", text: "Where Cachety is better for ID documents" },
      {
        type: "list",
        items: [
          "Works on your device on any system, including iPhone, Android and Mac, with nothing to install.",
          "No ad networks and no advertising trackers on the page.",
          "Watermark, masking, password and hidden data removal in a single step.",
          "One named copy per recipient, handy when you apply to several letting agents.",
        ],
      },
      { type: "h2", text: "How to do it with Cachety" },
      {
        type: "steps",
        items: [
          "Open cachety.com.",
          "Add your PDF or photos.",
          "Say what the copy is for (type it or pick an example), then who will receive it. The date is added automatically.",
          "Download the watermarked copy.",
        ],
      },
    ],
    chooseOther: [
      "You use Windows and want a free desktop app that keeps files on your PC.",
      "You need many other free PDF tools, such as conversion, compression or OCR.",
      "You want to keep the PDF text selectable after watermarking.",
    ],
    chooseCachety: [
      "You want to watermark an ID document on a phone or a Mac without uploading it.",
      "You prefer a page with no ad networks or advertising trackers.",
      "You need masking, a password and one copy per recipient in a single tool.",
    ],
    faq: [
      {
        q: "Does PDF24 upload my files?",
        a: "Yes, for its online tools. PDF24 says the watermark is added on its servers in Germany and files are deleted after one hour. Its Windows app, PDF24 Creator, keeps files on your PC.",
      },
      {
        q: "Is PDF24 safe to use for a passport?",
        a: "PDF24 is an EU company with a clear deletion policy. Whether that is enough is up to you. If you would rather your passport never left your device, a browser-only tool like Cachety avoids the question.",
      },
      {
        q: "Is PDF24 really free?",
        a: "Yes. PDF24 says its tools are free with no limits, funded by advertising. Cachety is also free, with no ads or trackers today.",
      },
    ],
    sources: [
      { label: "PDF24 watermark tool", url: "https://tools.pdf24.org/en/add-watermark-to-pdf" },
      { label: "PDF24 FAQ", url: "https://tools.pdf24.org/en/faq" },
      { label: "PDF24 privacy policy", url: "https://www.pdf24.org/en/privacy-policy" },
      { label: "PDF24 list of tools", url: "https://tools.pdf24.org/en/all-tools" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ───────────────────────────── Sejda ─────────────────────────────
  {
    slug: "cachety-vs-sejda",
    competitor: "sejda",
    competitorName: "Sejda",
    competitorUrl: "https://www.sejda.com/",
    title: "Cachety vs Sejda: which watermark tool suits your documents?",
    metaTitle: "Sejda Watermark Alternative for ID Documents",
    description:
      "Sejda's web tool uploads files and deletes them after two hours; Sejda Desktop works offline. Cachety watermarks in your browser. Compare them.",
    intro:
      "Sejda is a capable PDF editor with a flexible watermark tool, including images, exact positioning and several versions of a document at once. Its website works by uploading your files. Cachety offers a simpler, text-only watermark that never leaves your device.",
    verdict:
      "Sejda has more watermark options than Cachety, and Sejda Desktop keeps files on your computer. If you want a free tool for ID documents that works in any browser without uploading anything, and also blacks out details, Cachety is the simpler fit.",
    table: [
      {
        criterion: "Where your file is processed",
        cachety: "In your browser, on your own device.",
        other: "On Sejda's servers for the web version. Sejda Desktop keeps files on your computer.",
        edge: "cachety",
      },
      {
        criterion: "How long the file is kept",
        cachety: "Never stored anywhere except on your device.",
        other: "Automatically deleted after two hours, according to the tool page.",
        edge: "cachety",
      },
      {
        criterion: "Free use",
        cachety: "Free. Up to 200 MB per file and 500 pages per PDF.",
        other: "Free for documents up to 200 pages or 50 MB, and 3 tasks per hour.",
        edge: "cachety",
      },
      {
        criterion: "Type of watermark",
        cachety: "Text only, repeated diagonally across the page.",
        other: "Text or image (JPG, PNG, GIF, SVG), with exact position, rotation and page ranges.",
        edge: "other",
      },
      {
        criterion: "Several versions, one per recipient",
        cachety: "Yes, up to 20 recipients at once.",
        other: "Yes, by entering several watermark texts, one per line.",
      },
      {
        criterion: "Can the watermark be stripped out?",
        cachety: "No simple way: it is blended into the page image.",
        other: "Not documented.",
      },
      {
        criterion: "Blacking out details",
        cachety: "Built in: the hidden content is really removed.",
        other: "No dedicated redaction tool found on its site.",
        edge: "cachety",
      },
      {
        criterion: "Password",
        cachety: "Optional AES-256 password.",
        other: "Available as a separate Protect tool.",
      },
      {
        criterion: "Analytics and advertising",
        cachety: "No trackers or analytics.",
        other: "Its privacy policy mentions analytics and advertising partners using cookies.",
        edge: "cachety",
      },
      {
        criterion: "Other PDF tools",
        cachety: "Watermark, masking, combining, password and file size only.",
        other: "A full online and desktop PDF editor.",
        edge: "other",
      },
    ],
    body: [
      { type: "h2", text: "Uploading versus staying on your device" },
      {
        type: "p",
        text: "Sejda's website uploads your file over an encrypted connection, processes it, and deletes it automatically after two hours. That is a reasonable policy. Sejda also sells Sejda Desktop, which it says works without your files ever leaving your computer: a good option if you are happy to install software.",
      },
      {
        type: "p",
        text: "Cachety gives you that same ‘never leaves your computer’ result without installing anything. It runs in your browser, and there is no server that receives your files.",
      },
      {
        type: "tip",
        text: "To check for yourself, open cachety.com, switch on aeroplane mode and watermark a document. It still works, because nothing is sent.",
      },
      { type: "h2", text: "Where Sejda is better" },
      {
        type: "p",
        text: "Sejda's watermark tool is more flexible. You can use an image or logo, set the exact position, pick page ranges and save templates. It is also a full PDF editor. Like Cachety, it can produce several versions of a document with a different watermark text on each, which is useful for tracing who leaked a copy.",
      },
      { type: "h2", text: "Where Cachety is better for ID documents" },
      {
        type: "list",
        items: [
          "Works on your device without installing an app.",
          "No hourly task limit, and PDFs of up to 500 pages.",
          "Masking is built in, so you can hide a photo or account number in the same step.",
          "Each copy can carry a unique reference, and hidden data such as metadata is removed.",
        ],
      },
      { type: "h2", text: "How to do it with Cachety" },
      {
        type: "steps",
        items: [
          "Open cachety.com.",
          "Add your documents.",
          "Say what the copy is for, then who will receive it. Add each recipient with ‘+ Add another recipient’ to get one copy each.",
          "With several documents, choose ‘One PDF’ or ‘Separate files (ZIP)’, then download the copies.",
        ],
      },
    ],
    chooseOther: [
      "You need an image or logo watermark, or precise positioning.",
      "You want a full PDF editor, online or on the desktop.",
      "You want to keep the PDF text selectable after watermarking.",
    ],
    chooseCachety: [
      "You want your ID to stay on your device without installing software.",
      "You need to black out details as well as watermark.",
      "You do not want hourly or page limits on a free tool.",
    ],
    faq: [
      {
        q: "Does Sejda upload my files?",
        a: "The web version does. Sejda says files are uploaded over an encrypted connection and deleted after two hours. Sejda Desktop keeps files on your computer.",
      },
      {
        q: "Can Sejda make a different watermark for each recipient?",
        a: "Yes. Sejda can generate several versions if you enter several watermark texts, one per line. Cachety can also make up to 20 named copies at once.",
      },
      {
        q: "What are Sejda's free limits?",
        a: "Sejda says its free service covers documents up to 200 pages or 50 MB, and 3 tasks per hour.",
      },
      {
        q: "Is Cachety a good free alternative to Sejda?",
        a: "For text watermarks on ID documents, yes: it is free and works on your device. For logo watermarks or PDF editing, Sejda does more.",
      },
    ],
    sources: [
      { label: "Sejda watermark tool", url: "https://www.sejda.com/watermark-pdf" },
      { label: "Sejda privacy policy", url: "https://www.sejda.com/privacy" },
      { label: "Sejda pricing", url: "https://www.sejda.com/pricing" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ───────────────────────────── Canva ─────────────────────────────
  {
    slug: "cachety-vs-canva",
    competitor: "canva",
    competitorName: "Canva",
    competitorUrl: "https://www.canva.com/",
    title: "Cachety vs Canva: watermarking an ID document",
    metaTitle: "Canva Watermark vs Cachety for ID Documents",
    description:
      "Canva can watermark PDFs, but your file is uploaded to your Canva account. Cachety watermarks IDs on your device, free. Which suits you?",
    intro:
      "Canva is a design platform, and with its Watermark Maker app you can add a text or logo watermark to a PDF. To do that, you upload your document to Canva. Cachety is built for one thing: protecting the documents you share, without uploading them.",
    verdict:
      "For branded content, such as photos, marketing material or anything with a logo, Canva is the more creative tool. For a passport, payslip or bank statement, Cachety avoids putting a copy of your ID into an online design account, and adds masking and one copy per recipient.",
    table: [
      {
        criterion: "Where your file goes",
        cachety: "Nowhere. It is processed in your browser, on your device.",
        other: "Uploaded to Canva, a cloud design platform.",
        edge: "cachety",
      },
      {
        criterion: "How long the file is kept",
        cachety: "Never stored anywhere except on your device.",
        other: "Its privacy policy says content is kept for a commercially reasonable time and as long as there is a valid purpose, including backups.",
        edge: "cachety",
      },
      {
        criterion: "Account",
        cachety: "None.",
        other: "You sign up for a Canva account.",
        edge: "cachety",
      },
      {
        criterion: "Use of your content for AI",
        cachety: "None: your files are never received.",
        other: "Its privacy policy says content may be used to train its AI, with an opt-out in privacy settings.",
        edge: "cachety",
      },
      {
        criterion: "Advertising",
        cachety: "No ads or trackers today.",
        other: "Its privacy policy names advertising partners such as Facebook, Google, LiveRamp, Outbrain and Taboola.",
        edge: "cachety",
      },
      {
        criterion: "Type of watermark",
        cachety: "Text only, repeated diagonally across the page.",
        other: "Text or logo, with opacity and layout options, through the Watermark Maker app.",
        edge: "other",
      },
      {
        criterion: "Blacking out details",
        cachety: "Built in: the hidden content is really removed.",
        other: "No dedicated redaction tool found.",
        edge: "cachety",
      },
      {
        criterion: "Password on the PDF",
        cachety: "Optional AES-256 password.",
        other: "Not documented.",
      },
      {
        criterion: "Design features",
        cachety: "None beyond the watermark.",
        other: "A full design platform with templates, images and fonts.",
        edge: "other",
      },
    ],
    body: [
      { type: "h2", text: "Your ID in a design account" },
      {
        type: "p",
        text: "To watermark a PDF in Canva, you upload it, open the Watermark Maker app, add your text or logo and download the result. It works well. But your passport then sits in your Canva account, under Canva's privacy policy, which says content is kept for as long as there is a valid purpose, including for backups. The policy also says content may be used to train AI, unless you opt out.",
      },
      {
        type: "p",
        text: "Cachety never receives your document. It is watermarked inside your browser and saved straight to your device.",
      },
      {
        type: "tip",
        text: "Try it in aeroplane mode: load cachety.com, go offline, and watermark your document. It still works, which shows nothing is being sent.",
      },
      { type: "h2", text: "Where Canva is better" },
      {
        type: "p",
        text: "Canva is made for design. If you want a logo watermark on your photos, a branded layout or matching social media posts, it is far more capable. Cachety only adds text, and it is not a design tool.",
      },
      { type: "h2", text: "Where Cachety is better for ID documents" },
      {
        type: "list",
        items: [
          "No upload and no account, so no copy of your ID is stored online.",
          "Masking, a password and hidden data removal are built in.",
          "The watermark is blended into the page image, so it cannot simply be deleted by editing the PDF.",
          "One named copy per recipient, up to 20 at a time.",
        ],
      },
      { type: "h2", text: "How to do it with Cachety" },
      {
        type: "steps",
        items: [
          "Open cachety.com.",
          "Add your passport, licence or statement.",
          "Say what the copy is for (type it or pick an example), then who will receive it. The date is added automatically.",
          "Download the watermarked copy.",
        ],
      },
    ],
    chooseOther: [
      "You want a logo or image watermark, for example on photos you sell or share.",
      "You are designing branded material and the watermark is just one part of it.",
      "You already keep your work in Canva and want everything in one place.",
    ],
    chooseCachety: [
      "You are watermarking an ID document, payslip or bank statement and do not want it stored online.",
      "You do not want to create an account just to add a watermark.",
      "You need to black out details or add a password.",
    ],
    faq: [
      {
        q: "Can you watermark a PDF in Canva?",
        a: "Yes. You upload the PDF to Canva and use the Watermark Maker app to add text or a logo, then download it again.",
      },
      {
        q: "Is it safe to upload my passport to Canva?",
        a: "Canva states it holds security certifications such as ISO 27001. Still, your passport would be stored in your account under Canva's privacy policy, which allows backups and AI training unless you opt out. A tool that works on your device, like Cachety, avoids storing it online at all.",
      },
      {
        q: "Does Canva use my uploads to train AI?",
        a: "Canva's privacy policy says it may use your content to train its AI, and that you can manage this in your privacy settings.",
      },
    ],
    sources: [
      { label: "Canva privacy policy", url: "https://www.canva.com/policies/privacy-policy/" },
      { label: "Canva: add a watermark to a PDF", url: "https://www.canva.com/features/add-watermark-to-pdf/" },
      { label: "Canva Watermark Maker app", url: "https://www.canva.com/apps/AAGa702Tp2E/watermark-maker" },
      { label: "Canva help: signing up", url: "https://www.canva.com/help/sign-up-log-in-variantb/" },
      { label: "Canva Trust Centre", url: "https://trust.canva.com/" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ─────────────────────────── Watermarkly ───────────────────────────
  {
    slug: "cachety-vs-watermarkly",
    competitor: "watermarkly",
    competitorName: "Watermarkly",
    competitorUrl: "https://watermarkly.com/",
    title: "Cachety vs Watermarkly: two watermark tools that keep files on your device",
    metaTitle: "Watermarkly vs Cachety: Which Watermark Tool?",
    description:
      "Watermarkly and Cachety both process files in your browser. Watermarkly offers logos and apps; Cachety adds masking and passwords. Compare.",
    intro:
      "Watermarkly and Cachety have something important in common: both say your files are processed on your device and not sent to their servers. The differences are in features, price and what each is designed for.",
    verdict:
      "Watermarkly is the better pick for photographers and businesses that want a logo watermark, lots of styling options or a desktop app for thousands of files. Cachety is aimed at ID documents and personal paperwork: it is free with no added branding, open source, and adds masking, passwords and one copy per recipient.",
    table: [
      {
        criterion: "Where your file is processed",
        cachety: "In your browser, on your device.",
        other: "In your browser, on your device, according to its privacy policy.",
      },
      {
        criterion: "Account",
        cachety: "None.",
        other: "No sign-up required.",
      },
      {
        criterion: "Free version",
        cachety: "Free with no paid tier and no added branding.",
        other: "Free version adds a small Watermarkly logo at the bottom of PDF pages. Paid access removes it.",
        edge: "cachety",
      },
      {
        criterion: "Analytics",
        cachety: "No visitor analytics.",
        other: "Uses Google Analytics to measure visitors, per its privacy policy.",
        edge: "cachety",
      },
      {
        criterion: "Type of watermark",
        cachety: "Text, repeated diagonally, with 3 fonts and a wave effect.",
        other: "Text or logo, with many fonts and effects, and tiling in any direction.",
        edge: "other",
      },
      {
        criterion: "Blacking out details",
        cachety: "Built in: the hidden content is really removed.",
        other: "Not found on its PDF tool page.",
        edge: "cachety",
      },
      {
        criterion: "Password and hidden data",
        cachety: "Optional AES-256 password; metadata and photo location removed.",
        other: "Not found on its PDF tool page.",
        edge: "cachety",
      },
      {
        criterion: "One copy per recipient",
        cachety: "Yes, up to 20 named copies, with a unique reference each.",
        other: "Not documented.",
        edge: "cachety",
      },
      {
        criterion: "Apps",
        cachety: "Web only; can be added to your home screen.",
        other: "Web, desktop apps for Windows and Mac, and iOS and Android apps.",
        edge: "other",
      },
      {
        criterion: "Open source",
        cachety: "Yes, AGPL-3.0, code on GitHub.",
        other: "Not documented.",
        edge: "cachety",
      },
    ],
    body: [
      { type: "h2", text: "Both keep your file on your device" },
      {
        type: "p",
        text: "Unlike most online PDF tools, Watermarkly says it processes files right in your browser and does not send them to its servers. That is the same principle as Cachety, and it is a real privacy advantage over upload-based websites. Credit where it is due.",
      },
      {
        type: "p",
        text: "One difference is how easily you can check it. Cachety's code is open source, and its pages are set up so the browser is not allowed to send data to any other site. Anyone can read the code, and anyone can try the aeroplane mode test.",
      },
      {
        type: "tip",
        text: "The aeroplane mode test works for any tool that claims to be local: load the page, go offline, and try it. If it still works, your file is not being uploaded.",
      },
      { type: "h2", text: "Where Watermarkly is better" },
      {
        type: "p",
        text: "Watermarkly is built for photographers and businesses. It handles logos, has many fonts and effects, lets you tile watermarks in any direction, and offers desktop and mobile apps for large batches. If your watermark is about branding, it is the stronger tool.",
      },
      { type: "h2", text: "Where Cachety is better for ID documents" },
      {
        type: "list",
        items: [
          "Free with no extra logo added to your pages.",
          "Masking to hide an account number or photo, with the content really removed.",
          "An optional password, and removal of hidden data such as metadata and GPS location.",
          "One named copy per recipient, each with a unique reference you can trace.",
          "No visitor analytics, and open-source code.",
        ],
      },
      { type: "h2", text: "How to do it with Cachety" },
      {
        type: "steps",
        items: [
          "Open cachety.com.",
          "Add your ID document or payslip.",
          "Say what the copy is for (type it or pick an example), then who will receive it. The date is added automatically.",
          "Optionally use ‘Hide something’ or ‘Lock with a password’, then download.",
        ],
      },
    ],
    chooseOther: [
      "You want a logo or image watermark, for example on photos.",
      "You need lots of styling options, such as effects and custom tiling.",
      "You want a desktop or mobile app to watermark large batches of files.",
    ],
    chooseCachety: [
      "You want a free watermark with no extra branding on your document.",
      "You need masking, a password or one copy per recipient for ID documents.",
      "You prefer open-source software and a page with no visitor analytics.",
    ],
    faq: [
      {
        q: "Does Watermarkly upload my files?",
        a: "According to its privacy policy and PDF page, no: Watermarkly processes files on your device and does not send them to its servers.",
      },
      {
        q: "Is Watermarkly free?",
        a: "There is a free version. For PDFs, Watermarkly says the free version adds a small Watermarkly logo at the bottom of the pages. Paid access removes it.",
      },
      {
        q: "Which is better for a passport copy, Watermarkly or Cachety?",
        a: "Both keep the file on your device. Cachety adds masking, a password and one copy per recipient, with no extra branding. Watermarkly is better if you need a logo.",
      },
    ],
    sources: [
      { label: "Watermarkly privacy policy", url: "https://watermarkly.com/privacy/" },
      { label: "Watermarkly PDF watermark tool", url: "https://watermarkly.com/watermark-pdf/" },
      { label: "Watermarkly home page", url: "https://watermarkly.com/" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },
];
