// Guides about suggested areas to hide (en): finding and hiding account
// numbers, sharing bank details, sending a copy of a bank card.
// Written for readers in the United Kingdom (en-GB). Plain text only: no
// link, no tag, no markdown.
//
// These guides describe the `suggested-areas` feature (docs/prd-suggested-areas.md)
// as shipped. The quoted button labels (‘Review’, ‘Hide them all’, ‘Done’,
// ‘Hide something’) are those of lib/suggest-copy/en.ts and lib/i18n.tsx, and
// the list of numbers is that of lib/sensitive.ts: keep them in step.

import type { Guide } from "../types";

const UPDATED = "2026-11-19";

export const HIDE_GUIDES_EN: Guide[] = [
  // ------------------------------------------------------------------
  {
    slug: "find-and-hide-account-numbers-in-pdf",
    topic: "auto-redact",
    title: "How to find and hide account numbers in a PDF before you send it",
    metaTitle: "Find and Hide Account Numbers in a PDF, for Free",
    description:
      "Cachety spots IBANs and card numbers in your PDF and offers to black them out, on your device. Nothing is uploaded and nothing is hidden without you.",
    intro:
      "A payslip, a bill or a bank statement often carries more than the person asking for it needs, such as an account number or a card number. Cachety points these out on the page and lets you black them out with one tap, without the file ever leaving your device.",
    example: "Proof of income – Homeway Lettings – 18/11/2026",
    body: [
      { type: "h2", text: "The numbers you send without noticing" },
      {
        type: "p",
        text: "When a letting agent asks for three payslips, they want to see who pays you and how much. They do not need the account your salary goes into. When an energy bill serves as proof of address, nobody needs the bank details printed at the bottom for the direct debit. But these numbers sit in small print, on page two or three, and most people send the whole file as it is.",
      },
      {
        type: "p",
        text: "Hiding them by hand works, but you have to know where to look. Cachety now does the looking for you.",
      },
      { type: "h2", text: "What Cachety looks for" },
      {
        type: "p",
        text: "When you add a PDF, Cachety reads its text in your browser and looks for numbers whose format it can check:",
      },
      {
        type: "list",
        items: [
          "Bank account numbers written as an IBAN, from any country.",
          "Payment card numbers from the main card networks.",
          "French social security numbers, French tax numbers and French tax notice references.",
          "National ID and tax numbers from other countries: the German tax ID, the Spanish DNI and NIE, the Dutch BSN, the Belgian national number, the Portuguese NIF, the Brazilian CPF, the Italian tax code, the Chinese resident ID, the Japanese My Number, the Iranian national code and the Indonesian NIK.",
        ],
      },
      {
        type: "p",
        text: "A number is only suggested when it passes the check built into its format, such as the control digits of an IBAN, or when a label next to it says what it is. A phone number, a date or an invoice total is not flagged just because it is a row of digits.",
      },
      { type: "h2", text: "How to hide them, step by step" },
      {
        type: "steps",
        items: [
          "Open cachety.com in your browser, on a computer or a phone. There is no account to create.",
          "Add your PDF. Say what the copy is for, then who will receive it.",
          "If Cachety has found something, a message above the preview tells you how many numbers it found. Choose ‘Review’.",
          "Each suggestion is outlined on the page and listed with its name, for example ‘Bank account number (IBAN)’. Tap the ones you want to hide, or choose ‘Hide them all’. You can undo each one, and set aside a suggestion that is wrong with ‘Not this one’.",
          "Look over every page yourself and draw a box over anything else you want to hide. Then choose ‘Done’: the areas are only removed from the file at that point.",
          "Check the preview and download your copy.",
        ],
      },
      {
        type: "tip",
        text: "Nothing is hidden until you say so. If the recipient asked for your bank details, leave the IBAN visible: it is the very thing they need. The same goes for the tax number and the notice reference on a French tax notice, which let the recipient check that the notice is genuine.",
      },
      {
        type: "p",
        text: "The same suggestions appear in Cachety's two other tools: when you sign a PDF, and when you put several documents into one file with Dossier.",
      },
      { type: "h2", text: "What it cannot find" },
      {
        type: "list",
        items: [
          "Anything in a photo or a scan. There is no text to read in a picture, so there are no suggestions: draw the boxes yourself.",
          "Barcodes and QR codes. They can hold the same information as the text printed next to them.",
          "Numbers in formats Cachety does not check, such as a UK sort code and account number, a National Insurance number or an NHS number.",
          "A card number that is already partly masked, such as the four last digits on a receipt. There is nothing left to hide.",
          "Names, addresses, dates of birth and phone numbers. They are usually what the recipient needs, so they are not suggested.",
        ],
      },
      {
        type: "warning",
        text: "Suggestions are a help, not a guarantee. They can miss things. Always check the whole page yourself before you send it.",
      },
      { type: "h2", text: "Really removed, and never uploaded" },
      {
        type: "p",
        text: "A hidden area is not a black shape laid over the text. Cachety rebuilds each page as a picture, so the number is gone from the file and cannot be copied from underneath. The search for numbers happens in your browser, with simple rules. Your document is not sent to a server or to an AI service, and the page keeps working in aeroplane mode once it has loaded.",
      },
    ],
    faq: [
      {
        q: "Does Cachety hide numbers automatically?",
        a: "No. It outlines what it has found and you decide, one by one or all at once. Some numbers are there because the recipient needs them, and only you know that.",
      },
      {
        q: "Does it work on a photo or a scanned document?",
        a: "No. Suggestions need a PDF that contains real text, like the payslips, bills and statements you download from a website. On a photo or a scan, draw the boxes yourself with ‘Hide something’.",
      },
      {
        q: "Is my document sent somewhere to be analysed?",
        a: "No. The checks run in your browser, on your device. Nothing is uploaded, and no AI service reads your file.",
      },
      {
        q: "Can it miss a number?",
        a: "Yes. A number inside a picture, a barcode, or a format Cachety does not check will not be suggested. That is why the page always asks you to check for yourself.",
      },
      {
        q: "Does it cover every page of a long PDF?",
        a: "Yes. Suggestions cover every page, including the pages that are not shown in the preview. For those, the list shows the first and last characters of each number so you know what you are hiding.",
      },
    ],
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  {
    slug: "is-it-safe-to-share-bank-details",
    topic: "iban",
    title: "Is it safe to share your bank details? Account number, sort code and IBAN",
    metaTitle: "Is It Safe to Share Your Bank Details or IBAN?",
    description:
      "What someone can and cannot do with your account number, sort code or IBAN, when to share them, and how to hide them on documents that do not need them.",
    intro:
      "You give out your bank details to be paid, and they are printed on plenty of documents you send for other reasons. On their own they are low risk. The trouble starts when they travel with the rest of your papers.",
    example: "Bank details for salary – Greenfield Foods HR – 18/11/2026",
    body: [
      { type: "h2", text: "What someone can do with your bank details" },
      {
        type: "p",
        text: "With your account number and sort code, or your IBAN, someone can pay money into your account. That is what they are for. On their own, they are not enough to take money out or to make a transfer: that needs your card, your online banking login or your approval.",
      },
      {
        type: "p",
        text: "The main risk is a direct debit set up in your name without your agreement. In the UK, the Direct Debit Guarantee protects you: if a payment is taken in error, you are entitled to a full and immediate refund from your bank, and the Guarantee also covers money collected by fraud. With a SEPA direct debit, the kind used across the euro area, you can ask your bank to refund a payment within eight weeks, and within thirteen months if you never agreed to it. So check your statements, and tell your bank about any debit you do not recognise.",
      },
      { type: "h2", text: "The real danger is the bundle" },
      {
        type: "p",
        text: "Bank details become much more useful to a fraudster when they come with a copy of your passport, your address, your signature and your payslips. Together, these are enough to try to open an account or take out credit in your name. A rental application or a job file contains exactly that bundle. So the question is less ‘is my account number secret?’ than ‘does this person need it at all?’.",
      },
      { type: "h2", text: "When to share them, and when to hide them" },
      {
        type: "list",
        items: [
          "Share them when someone has to pay you or collect a payment you agreed to: an employer, a landlord returning a deposit, a utility you pay by direct debit.",
          "Hide them when the document is sent for another reason: a payslip as proof of income, a bill as proof of address, a bank statement that only has to show your name and address.",
          "If you can, send your bank details on their own, not in the same file as your ID.",
        ],
      },
      { type: "h2", text: "Hide an account number with Cachety" },
      {
        type: "steps",
        items: [
          "Open cachety.com in your browser. Nothing is installed and there is no account.",
          "Add your PDF or photo. Say what the copy is for, then who will receive it.",
          "On a PDF, Cachety looks for IBANs and tells you if it finds one. Choose ‘Review’, tap the suggestion to hide it, then choose ‘Done’.",
          "A UK sort code and account number are not suggested, and neither is anything in a photo: click ‘Hide something’ and draw a box over them.",
          "Check every page, then download your copy.",
        ],
      },
      {
        type: "tip",
        text: "When you do have to send your bank details, add a watermark that says who they are for and why, such as ‘Bank details for salary – Greenfield Foods HR’. A copy marked like this is hard to reuse elsewhere.",
      },
      { type: "h2", text: "Your file stays with you" },
      {
        type: "p",
        text: "Cachety works in your browser. Your statement or payslip is never uploaded, and the hidden number is removed from the file itself, not just covered. Remember that suggestions can miss things: look over each page before you send it.",
      },
    ],
    faq: [
      {
        q: "Can someone take money from my account with my IBAN?",
        a: "Not directly. An IBAN lets people pay money in. The risk is a direct debit set up without your agreement, and you are entitled to a refund of those. Check your statements and report anything you do not recognise.",
      },
      {
        q: "Should I hide my IBAN on a payslip?",
        a: "If the payslip is sent as proof of income, yes: the recipient needs your name, your employer and your pay, not your account. If your employer asks for your bank details, send them separately.",
      },
      {
        q: "My landlord asked for my bank details. Is that normal?",
        a: "It can be, for example to set up the rent payment or return a deposit. In that case they need the number, so do not hide it. Add a watermark with their name and the reason.",
      },
      {
        q: "What should I do if I see a direct debit I never agreed to?",
        a: "Contact your bank at once and ask for a refund. In the UK the Direct Debit Guarantee applies. With a SEPA direct debit, you have thirteen months to dispute a payment you did not authorise.",
      },
    ],
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  {
    slug: "send-copy-of-bank-card-safely",
    topic: "bank-card",
    title: "Asked for a copy of your bank card? What to hide before you send it",
    metaTitle: "Sending a Copy of Your Bank Card: What to Hide",
    description:
      "A hotel or a seller asks for a photo of your bank card? See which digits to hide, why the security code must never be sent, and how to black them out.",
    intro:
      "Hotels, car hire firms and some online sellers still ask for a photo of your card ‘to confirm the booking’. Before you send anything, hide the parts nobody needs. Better still, ask for a safer way to pay.",
    example: "Booking confirmation – Seaview Hotel Brighton – 18/11/2026",
    body: [
      { type: "h2", text: "Why a photo of your card is risky" },
      {
        type: "p",
        text: "On most cards, the front shows the long card number, the expiry date and your name, and the back shows the three-digit security code. Some newer cards print all of these on the back. Together, they are all someone needs to pay online with your card. An email or a chat message can sit in several inboxes for years, well out of your control.",
      },
      {
        type: "warning",
        text: "Never send the security code, the three digits on the back of the card, or the four digits on the front of an American Express card. No honest business needs it in a photo. The card industry's own security rules forbid businesses from keeping it once the payment has been authorised.",
      },
      { type: "h2", text: "Ask for another way first" },
      {
        type: "p",
        text: "A business that takes cards should be able to send you a secure payment link, take the payment through its booking system, or check the card when you arrive. Ask. If they insist on a copy, it is usually to check that the card exists and is in your name, and a partly hidden copy does that job.",
      },
      { type: "h2", text: "What to hide and what to leave" },
      {
        type: "list",
        items: [
          "Hide the middle digits of the card number. Leave the last four digits at most, which is what your copy of a receipt shows.",
          "Hide the security code. On the back of the card, hide the whole strip it is printed on.",
          "Hide the expiry date, unless you are asked for it for a good reason.",
          "Leave your name and the bank's logo, so the copy still proves the card is yours.",
        ],
      },
      { type: "h2", text: "Hide the digits with Cachety" },
      {
        type: "steps",
        items: [
          "Take a photo of the front of the card. Only photograph the back if you are asked for it.",
          "Open cachety.com on your phone or computer and add the photo.",
          "Say what the copy is for, then who will receive it, for example ‘Booking confirmation’ and the hotel's name.",
          "Under the preview, click ‘Hide something’ and draw a box over the middle digits, the expiry date and the security code.",
          "Check the preview, then download the copy and send it.",
        ],
      },
      {
        type: "tip",
        text: "On a PDF, such as a statement that shows a full card number, Cachety can find the number and offer to hide it. On a photo of the card there is no text to read, so you draw the boxes yourself.",
      },
      { type: "h2", text: "What happens to the photo" },
      {
        type: "p",
        text: "Nothing leaves your device. Cachety works in your browser and there is no server that receives your photo. The hidden digits are removed from the picture, not just covered, and the place where the photo was taken is stripped from the file. The watermark says who the copy was made for, which makes it harder to reuse.",
      },
      {
        type: "p",
        text: "To be honest, a hidden and watermarked copy lowers the risk but does not remove it. If a request feels wrong, do not send the card at all, and call the business on a number you found yourself.",
      },
    ],
    faq: [
      {
        q: "Which digits of my card number can I show?",
        a: "The last four are enough for most checks, and they are what shops print on your copy of a receipt. Card security rules say a business should normally display no more than the first digits, which identify the bank, and the last four. Hide the rest.",
      },
      {
        q: "Is it safe to send a photo of my card by email or WhatsApp?",
        a: "Not with the full number and the security code visible. Messages are copied, forwarded and stored, and Visa's own advice is never to send payment information by email. If you must send a copy, hide the middle digits and the security code first.",
      },
      {
        q: "The hotel wants the front and the back. What should I do?",
        a: "Ask why, and offer a secure payment link instead. If you do send the back, hide the security code and the strip around it. The card industry's rules do not allow a business to keep that code once the payment has been authorised.",
      },
      {
        q: "I already sent a full photo of my card. What now?",
        a: "Call your bank. It can block the card and send a new one, and it will tell you how to dispute any payment you did not make. Watch your statements in the weeks that follow.",
      },
    ],
    updated: UPDATED,
  },
];
