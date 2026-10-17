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
  "remember-signature": {
    title: "Lembrar minha assinatura neste aparelho",
    body: "Uma opção, só se você quiser, para guardar sua assinatura neste aparelho, com uma frase clara sobre o que fica salvo e um toque para apagar. Hoje ela nunca é salva.",
  },
  "keep-vector-pages": {
    title: "Manter o texto dos PDFs assinados",
    body: "Uma opção para assinar sem refazer as páginas a partir dos pixels, para que o texto continue pesquisável. Ela viria com a sua própria remoção dos dados ocultos.",
  },
  "sign-embed": {
    title: "Assinatura em sites parceiros",
    body: "Sites aprovados podem mostrar a ferramenta de assinatura nas próprias páginas, sozinha ou ao lado da marca d'água, com o local e a observação já preenchidos. Os documentos continuam no aparelho do visitante.",
  },
  "sign": {
    title: "Assinar um documento",
    body: "Desenhe, digite ou importe a imagem da sua assinatura, coloque num PDF ou numa foto e baixe um PDF assinado. Como na marca d'água, nada é enviado.",
  },
  "simpler-tool": {
    title: "Uma ferramenta mais simples",
    body: "Três passos em palavras simples: seu documento, para que serve e quem recebe, depois a prévia e o download. As opções avançadas continuam a um toque.",
  },
  "easy-passwords": {
    title: "Senhas fáceis de ler",
    body: "Ao proteger um arquivo, agora é criada uma senha de 12 palavras aleatórias, tão forte quanto a frase de recuperação de uma carteira de criptomoedas.",
  },
  "partner-embed": {
    title: "Cachety em sites parceiros",
    body: "Sites aprovados podem exibir a ferramenta nas próprias páginas. Ela continua rodando em cachety.com, então os documentos ficam no aparelho do visitante, fora do alcance do site que a exibe.",
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
    description: "Próximos recursos do Cachety, a ferramenta grátis para pôr marca d'água e assinar sem que seus documentos saiam do seu aparelho: o que vem aí e novidades.",
  },
};

export default { items: ITEMS, copy: COPY };
