import type { RoadmapCopy, RoadmapId, Text } from "./types";

const ITEMS: Record<RoadmapId, Text> = {
  "per-recipient-password": {
    title: "Uma senha diferente para cada destinatário",
    body: "A cópia de cada destinatário protegida com a própria senha, listada junto com os códigos depois do download. Assim, uma senha vazada só abre uma cópia.",
  },
  "suggested-areas": {
    title: "Sugestão de áreas para ocultar",
    body: "O Cachety encontra na página números de conta, CPF, RG e dados parecidos, e oferece para ocultá-los. A detecção acontece no seu aparelho, como todo o resto.",
  },
  "more-languages": {
    title: "Mais idiomas",
    body: "Italiano, coreano e turco.",
  },
  "purpose-from-recipient": {
    title: "Sugestão de motivo pelo destinatário",
    body: "Ao digitar o destinatário, como uma imobiliária, o motivo correspondente poderia ser sugerido.",
  },
  "local-word-lists": {
    title: "Senhas fáceis de ler no seu idioma",
    body: "Palavras da senha no seu próprio idioma, só com letras sem acento, para digitar do mesmo jeito em qualquer teclado.",
  },
  "simpler-tool": {
    title: "Uma ferramenta mais simples",
    body: "Três passos em palavras simples: seu documento, para que serve e quem recebe, depois a prévia e o download. As opções avançadas continuam a um toque.",
  },
  "easy-passwords": {
    title: "Senhas fáceis de ler",
    body: "Ao proteger um arquivo, agora é criada uma senha de 12 palavras aleatórias, tão forte quanto a frase de recuperação de uma carteira de criptomoedas.",
  },
};

const COPY: RoadmapCopy = {
  nav: "Novidades",
  title: "O que vem por aí",
  lead: "No que estamos trabalhando agora e as ideias que estamos avaliando. O Cachety continua grátis e de código aberto, e tudo fica no seu aparelho.",
  next: "Em breve",
  idea: "Ideias em avaliação",
  shipped: "Adicionado recentemente",
  suggest: "Sugerir uma ideia",
  suggestBody: "Sentiu falta de algo? Abra uma issue no GitHub. Ideias são bem-vindas em qualquer idioma.",
  meta: {
    title: "O que vem por aí no Cachety",
    description: "Próximos recursos do Cachety, a ferramenta grátis de marca d'água que mantém seus documentos no seu aparelho: o que vem aí, ideias e novidades recentes.",
  },
};

export default { items: ITEMS, copy: COPY };
