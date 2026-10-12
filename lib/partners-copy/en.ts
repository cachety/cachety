import type { PartnersCopy } from "./types";

const COPY: PartnersCopy = {
  nav: "For websites",
  meta: {
    title: "Put Cachety on your website",
    description: "Add Cachety's watermark tool to your website, free. Your visitors' documents stay on their device: neither your site nor Cachety can see them.",
  },
  title: "Put Cachety on your website",
  lead: "Letting agencies, HR platforms, associations: let the people who send you their ID or payslips watermark them right on your page. Free, and their documents never leave their device.",
  privacyTitle: "Why it stays private",
  privacy: [
    "The tool runs in a frame served by cachety.com. Your page, and any script on it, can't read what's inside.",
    "Documents are processed on the visitor's device. Nothing is uploaded, not to you and not to us.",
    "Only approved websites can show the tool, so nobody can wrap it in a misleading page.",
  ],
  codeTitle: "Get the code",
  codeLead: "Choose the options, then paste the two snippets into your page.",
  options: {
    lang: "Language",
    purpose: "Purpose, filled in for visitors",
    purposePlaceholder: "e.g. Rental application",
    recipient: "Recipient, filled in for visitors",
    recipientPlaceholder: "e.g. your company name",
    accent: "Button colour",
    accentHint: "Too light a colour is ignored, so the buttons stay readable.",
  },
  embedCode: "1. The frame",
  resizeCode: "2. Automatic height",
  resizeHelp: "This short script adjusts the frame's height. It only receives a number: the height.",
  copy: "Copy",
  copied: "Copied",
  previewTitle: "Preview",
  previewNote: "This is the tool as your visitors will see it. Visitors can still change what you fill in.",
  wordingTitle: "Words you can use",
  wordingLead: "A short, accurate text to put next to the tool:",
  wording: "This tool runs on cachety.com. Your documents never leave your device: neither this site nor Cachety can see them.",
  joinTitle: "How to join",
  join: [
    "Open a request on GitHub with your website's address.",
    "We check it and add your site to the list of approved websites.",
    "Once the update is online, the tool works on your pages.",
  ],
  joinCta: "Ask to become a partner",
  freeTitle: "Free",
  free: "Embedding Cachety is free, like the rest of the site. If it's useful to you and your visitors, a donation helps keep it going.",
  donateCta: "Support Cachety",
  usedBy: "Used by",
  embed: { runsOn: "Runs on cachety.com", private: "Your files stay on your device" },
};

export default COPY;
