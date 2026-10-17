export type PartnersCopy = {
  /** Lien du pied de page vers la page partenaires. */
  nav: string;
  meta: { title: string; description: string };
  title: string;
  lead: string;
  privacyTitle: string;
  privacy: string[];
  codeTitle: string;
  codeLead: string;
  options: {
    lang: string;
    purpose: string;
    purposePlaceholder: string;
    recipient: string;
    recipientPlaceholder: string;
    accent: string;
    accentHint: string;
    tools: string;
    toolChoices: { watermark: string; sign: string; both: string };
    /** Sous les champs « signer » (lieu, mention) : effet d'un motif pré-rempli. */
    signHint: string;
  };
  embedCode: string;
  resizeCode: string;
  resizeHelp: string;
  copy: string;
  copied: string;
  previewTitle: string;
  previewNote: string;
  wordingTitle: string;
  wordingLead: string;
  wording: string;
  joinTitle: string;
  join: string[];
  joinCta: string;
  freeTitle: string;
  free: string;
  donateCta: string;
  usedBy: string;
  /** Bandeau de la page intégrée. */
  embed: {
    runsOn: string;
    private: string;
    /** Choix de l'outil quand le partenaire propose les deux. */
    switchLabel: string;
    switchWarn: string;
    switchConfirm: string;
    switchCancel: string;
  };
};
