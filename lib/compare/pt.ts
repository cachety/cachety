import type { Comparison } from "./types";

// Comparativos em português do Brasil. Propaganda comparativa: cada
// informação sobre outra ferramenta vem das páginas públicas dela (campo
// `sources`, de preferência as versões em português), conferidas em
// 2026-10-12. O que não está publicado é dito como tal ("não informa").
// Só texto puro.

const CHECKED = "2026-10-12";
const UPDATED = "2026-10-12";

// Células do Cachety que se repetem de uma página para outra (ficha verificada).
const C = {
  where: "No seu próprio aparelho, dentro do navegador. O arquivo não é enviado para nenhum servidor.",
  retention: "Nada a apagar: o Cachety nunca recebe seus arquivos.",
  account: "Não precisa de conta nem cadastro.",
  price: "Grátis, sem versão paga.",
  ads: "Hoje não há anúncios, nem rastreadores, nem cookies de rastreamento, nem estatísticas de visitas.",
  watermark:
    "Só texto, repetido na diagonal pela página inteira e incorporado à imagem da página: não sai editando o PDF.",
  redact: "Sim: você desenha retângulos e o que foi coberto é apagado de verdade do arquivo.",
  password: "Sim, criptografia AES-256 opcional do PDF final.",
  recipients: "Sim: até 20 destinatários, uma versão para cada um, com código único opcional.",
  offline: "Sim: depois que a página carrega, funciona no modo avião.",
  openSource: "Sim, licença AGPL-3.0, código público.",
  logo: "Não, só marca d'água de texto.",
  otherTools: "Não: só marca d'água, ocultar áreas, senha, juntar documentos e ajustar o tamanho do arquivo.",
};

const HOW_TO: { type: "steps"; items: string[] } = {
  type: "steps",
  items: [
    "Abra cachety.com no navegador do celular ou do computador. Não precisa instalar nada.",
    "Solte seu RG, CNH, passaporte ou holerite na página. Você pode adicionar vários arquivos de uma vez.",
    "Escreva para que serve a cópia, para quem e a data, por exemplo: Cadastro de aluguel, Imobiliária Horizonte, 11/10/2026.",
    "Se quiser, oculte o que não precisam ver e coloque uma senha.",
    "Baixe a cópia com marca d'água e envie essa, nunca o original.",
  ],
};

const AIRPLANE_TIP = {
  type: "tip" as const,
  text: "O teste do modo avião: abra o Cachety, ative o modo avião e adicione seu documento. Se a marca d'água for aplicada mesmo assim, nada saiu do seu aparelho. Uma ferramenta que envia arquivos não funciona sem internet.",
};

export const COMPARISONS_PT: Comparison[] = [
  // ───────────────────────────── iLovePDF ─────────────────────────────
  {
    slug: "cachety-vs-ilovepdf",
    competitor: "ilovepdf",
    competitorName: "iLovePDF",
    competitorUrl: "https://www.ilovepdf.com/pt",
    title: "Cachety ou iLovePDF: qual usar para colocar marca d'água no RG?",
    metaTitle: "Alternativa ao iLovePDF para marca d'água no RG",
    description:
      "iLovePDF ou Cachety para colocar marca d'água no RG ou CNH: para onde vai seu arquivo, por quanto tempo fica guardado e quando vale cada um.",
    intro:
      "O iLovePDF, de uma empresa de Barcelona, é um dos sites de PDF mais usados no Brasil. A ferramenta de marca d'água funciona bem, mas o arquivo é enviado para os servidores dele. O Cachety coloca a marca d'água sem que o documento saia do seu celular ou computador.",
    verdict:
      "Para um documento de identidade, a diferença principal é onde o arquivo fica enquanto é processado. No iLovePDF, ele é enviado aos servidores da empresa e apagado em até duas horas, segundo a política dela. No Cachety, ele não sai do seu aparelho. Se você precisa de logo como marca d'água ou de muitas outras ferramentas de PDF, o iLovePDF é mais completo.",
    table: [
      {
        criterion: "Onde o arquivo é processado",
        cachety: C.where,
        other: "Nos servidores do iLovePDF, depois do envio. O aplicativo para Windows e Mac processa no seu computador, até offline.",
        edge: "cachety",
      },
      {
        criterion: "Por quanto tempo fica guardado",
        cachety: C.retention,
        other: "A política de privacidade diz que os arquivos são apagados em até duas horas após o processamento.",
        edge: "cachety",
      },
      {
        criterion: "Preço",
        cachety: C.price,
        other: "Plano gratuito com processamento limitado e plano Premium pago, cobrado em euros.",
      },
      {
        criterion: "Anúncios",
        cachety: C.ads,
        other: "A “experiência sem anúncios” aparece como vantagem do Premium, ou seja, o plano gratuito tem anúncios.",
        edge: "cachety",
      },
      {
        criterion: "Tipo de marca d'água",
        cachety: C.watermark,
        other: "Texto ou imagem, com posição, transparência, rotação, intervalo de páginas e camada acima ou abaixo do conteúdo. Não informa se fica incorporada à página.",
      },
      { criterion: "Marca d'água com logo", cachety: C.logo, other: "Sim, dá para inserir uma imagem.", edge: "other" },
      {
        criterion: "Ocultar dados e senha",
        cachety: "Sim, as duas coisas na mesma etapa da marca d'água.",
        other: "Sim, com as ferramentas separadas Ocultar PDF e Proteger PDF.",
      },
      {
        criterion: "Uma cópia por destinatário",
        cachety: C.recipients,
        other: "Não informa na ferramenta de marca d'água.",
        edge: "cachety",
      },
      {
        criterion: "Outras ferramentas de PDF",
        cachety: C.otherTools,
        other: "Muitas: juntar, dividir, comprimir, converter, assinar, OCR e mais.",
        edge: "other",
      },
    ],
    body: [
      { type: "h2", text: "A diferença que importa com um RG" },
      {
        type: "p",
        text: "Quando você usa o iLovePDF no site, o arquivo viaja pela internet até os servidores da empresa, é processado lá e volta para você. Por algum tempo, uma cópia do seu RG fica num servidor de outra empresa, sob as regras dela. O iLovePDF diz que apaga esses arquivos em até duas horas. No Cachety, essa viagem não existe: tudo acontece dentro do navegador.",
      },
      {
        type: "p",
        text: "Não se trata de desconfiar do iLovePDF, uma empresa europeia sujeita ao RGPD. Trata-se de uma regra simples: um documento que não é copiado para lugar nenhum não pode vazar desse lugar.",
      },
      { type: "h2", text: "Em que o iLovePDF é melhor" },
      {
        type: "list",
        items: [
          "Você pode usar uma imagem ou um logo como marca d'água.",
          "Tem dezenas de ferramentas: comprimir, converter para Word, assinar, OCR, organizar páginas.",
          "Tem aplicativo para Windows e Mac que processa os arquivos no seu computador, sem internet.",
          "Escolhe em quais páginas a marca d'água aparece e se ela fica acima ou abaixo do conteúdo.",
        ],
      },
      { type: "h2", text: "Em que o Cachety ajuda com documentos pessoais" },
      {
        type: "list",
        items: [
          "A marca d'água se repete na diagonal pela página inteira e fica incorporada a ela.",
          "Você oculta um número ou uma foto na mesma etapa, e o que foi ocultado é apagado de verdade.",
          "Cria uma versão diferente para cada destinatário, por exemplo uma por imobiliária.",
          "Remove dados escondidos, como metadados e a localização GPS das fotos do celular.",
        ],
      },
      { type: "h2", text: "Como fazer com o Cachety" },
      HOW_TO,
      AIRPLANE_TIP,
    ],
    chooseOther: [
      "Você quer colocar um logo ou uma imagem como marca d'água.",
      "Precisa de outras ferramentas de PDF, como comprimir, converter ou assinar, no mesmo lugar.",
      "Prefere um aplicativo de computador completo, que também trabalha offline.",
    ],
    chooseCachety: [
      "Vai colocar marca d'água no RG, CNH, passaporte ou holerite e não quer que eles saiam do seu aparelho.",
      "Quer ocultar dados e colocar senha na mesma etapa da marca d'água.",
      "Envia o mesmo documento para várias pessoas e quer uma cópia para cada uma.",
    ],
    faq: [
      {
        q: "É seguro usar o iLovePDF com o RG?",
        a: "O iLovePDF diz que apaga os arquivos em até duas horas. Mesmo assim, seu RG passa um tempo nos servidores da empresa. Se você prefere que ele não saia do celular ou do computador, use uma ferramenta que trabalha no navegador, como o Cachety, ou o aplicativo de computador do próprio iLovePDF.",
      },
      {
        q: "Por quanto tempo o iLovePDF guarda meus arquivos?",
        a: "Segundo a política de privacidade e as perguntas frequentes, no máximo duas horas depois do processamento.",
      },
      {
        q: "O Cachety é uma alternativa grátis ao iLovePDF?",
        a: "Para marca d'água de texto, ocultar dados e proteger com senha, sim: é grátis e sem cadastro. Para converter, comprimir ou assinar PDF, não: o Cachety não faz isso.",
      },
      {
        q: "Como sei que o Cachety não envia meu arquivo?",
        a: "Faça o teste do modo avião: abra a página, desligue a internet e adicione seu documento. Se funcionar igual, nada foi enviado.",
      },
    ],
    sources: [
      { label: "iLovePDF: política de privacidade", url: "https://www.ilovepdf.com/pt/ajuda/privacidade" },
      { label: "iLovePDF: perguntas frequentes", url: "https://www.ilovepdf.com/pt/ajuda/preguntas-frequentes" },
      { label: "iLovePDF: inserir marca d'água em PDF", url: "https://www.ilovepdf.com/pt/pdf_inserir_marca_daigua" },
      { label: "iLovePDF: preços e vantagens do Premium", url: "https://www.ilovepdf.com/pt/preco" },
      { label: "iLovePDF: aplicativo para computador", url: "https://www.ilovepdf.com/pt/aplicativo" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ───────────────────────────── Smallpdf ─────────────────────────────
  {
    slug: "cachety-vs-smallpdf",
    competitor: "smallpdf",
    competitorName: "Smallpdf",
    competitorUrl: "https://smallpdf.com/pt",
    title: "Cachety ou Smallpdf para colocar marca d'água nos seus documentos",
    metaTitle: "Smallpdf ou Cachety: marca d'água no RG e na CNH",
    description:
      "O Smallpdf envia seus arquivos? Comparamos Smallpdf e Cachety para marca d'água no RG: servidores, exclusão, rastreamento e o que cada um faz melhor.",
    intro:
      "O Smallpdf é um site suíço conhecido de ferramentas de PDF. A marca d'água é feita pelo navegador, mas o arquivo é processado nos servidores dele. O Cachety faz tudo no seu aparelho.",
    verdict:
      "Funcionar no navegador não quer dizer que o arquivo fica no seu aparelho. O Smallpdf envia os arquivos para os servidores dele e diz que os apaga depois de uma hora. O Cachety não envia nada. O Smallpdf é melhor se você quer um pacote completo de ferramentas de PDF.",
    table: [
      {
        criterion: "Onde o arquivo é processado",
        cachety: C.where,
        other: "Nos servidores do Smallpdf, com envio por criptografia TLS. A política de privacidade cita servidores da Hetzner.",
        edge: "cachety",
      },
      {
        criterion: "Por quanto tempo fica guardado",
        cachety: C.retention,
        other: "A página da ferramenta diz que os arquivos são apagados automaticamente depois de uma hora.",
        edge: "cachety",
      },
      { criterion: "Cadastro", cachety: C.account, other: "A página diz: sem criação de conta." },
      {
        criterion: "Preço",
        cachety: C.price,
        other: "Grátis para marca d'água de texto, com limites de uso na versão gratuita, e planos pagos.",
      },
      {
        criterion: "Rastreamento",
        cachety: C.ads,
        other: "A política de privacidade cita, entre outros, Google Analytics, Hotjar, Google Ads, Facebook Pixel e LinkedIn.",
        edge: "cachety",
      },
      {
        criterion: "Tipo de marca d'água",
        cachety: C.watermark,
        other: "Só texto, com fonte, tamanho, cor e opacidade. Não informa se fica incorporada à página.",
      },
      { criterion: "Ocultar dados e senha", cachety: "Sim, na mesma etapa da marca d'água.", other: "Por ferramentas separadas do site." },
      { criterion: "Uso sem internet", cachety: C.offline, other: "A ferramenta web precisa de internet para enviar o arquivo.", edge: "cachety" },
      {
        criterion: "Outras ferramentas de PDF",
        cachety: C.otherTools,
        other: "Muitas: comprimir, converter, editar, assinar e mais.",
        edge: "other",
      },
    ],
    body: [
      { type: "h2", text: "No navegador nem sempre quer dizer no seu aparelho" },
      {
        type: "p",
        text: "O Smallpdf diz que funciona no navegador, e é verdade: não precisa instalar nada. Mas a própria página da marca d'água explica que usa criptografia TLS para enviar e baixar os arquivos e que eles são apagados depois de uma hora. Ou seja: durante esse tempo, uma cópia do seu documento fica num servidor de outra empresa.",
      },
      {
        type: "p",
        text: "O Cachety também funciona no navegador, mas o trabalho é feito no seu celular ou computador. Não existe servidor que receba seus arquivos, e você pode conferir com o modo avião.",
      },
      { type: "h2", text: "O que o Smallpdf faz bem" },
      {
        type: "list",
        items: [
          "Reúne muitas ferramentas de PDF numa interface bem simples.",
          "Não exige cadastro para colocar marca d'água de texto.",
          "Com conta, você pode guardar os arquivos e voltar a eles depois.",
        ],
      },
      { type: "h2", text: "Por que o Cachety combina mais com documentos de identidade" },
      {
        type: "list",
        items: [
          "O documento nunca sai do seu aparelho.",
          "A marca d'água cobre a página inteira na diagonal, difícil de recortar.",
          "Ocultar dados, colocar senha e criar uma cópia por destinatário se faz na mesma etapa.",
          "Hoje não há rastreadores nem cookies de anúncios.",
        ],
      },
      { type: "h2", text: "Como fazer com o Cachety" },
      HOW_TO,
      AIRPLANE_TIP,
    ],
    chooseOther: [
      "Você precisa converter, comprimir, editar ou assinar PDF no mesmo site.",
      "Quer guardar seus documentos numa conta na nuvem.",
      "Trabalha em equipe e quer um plano empresarial com suporte.",
    ],
    chooseCachety: [
      "Quer colocar marca d'água no RG ou nos holerites sem enviar para nenhum servidor.",
      "Prefere um site sem rastreadores nem cookies de anúncios.",
      "Precisa de várias cópias, uma por destinatário, cada uma com o próprio texto.",
    ],
    faq: [
      {
        q: "O Smallpdf envia meus arquivos pela internet?",
        a: "Sim. A página da marca d'água diz que os envios usam criptografia TLS e que os arquivos são apagados automaticamente depois de uma hora.",
      },
      {
        q: "É seguro usar o Smallpdf com o RG?",
        a: "O Smallpdf protege a transferência e apaga os arquivos pouco depois. Mas seu RG passa pelos servidores dele. Se você prefere que ele não saia do seu aparelho, use uma ferramenta que trabalha localmente, como o Cachety.",
      },
      {
        q: "O Smallpdf aceita logo como marca d'água?",
        a: "A página da ferramenta diz que, por enquanto, ela aceita marcas d'água de texto. O Cachety também não aceita logo: só texto.",
      },
    ],
    sources: [
      { label: "Smallpdf: marca d'água em PDF", url: "https://smallpdf.com/pt/marca-d-agua-pdf" },
      { label: "Smallpdf: aviso de privacidade", url: "https://smallpdf.com/privacy" },
      { label: "Smallpdf: planos", url: "https://smallpdf.com/pricing" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ───────────────────────────── PDF24 ─────────────────────────────
  {
    slug: "cachety-vs-pdf24",
    competitor: "pdf24",
    competitorName: "PDF24 Tools",
    competitorUrl: "https://tools.pdf24.org/pt/",
    title: "Cachety ou PDF24: marca d'água nos documentos, com e sem envio",
    metaTitle: "PDF24 ou Cachety: marca d'água sem enviar o arquivo",
    description:
      "O PDF24 é grátis e sem cadastro, mas processa nos servidores dele e vive de publicidade. Comparamos PDF24 e Cachety para a marca d'água do seu RG.",
    intro:
      "O PDF24 é um site alemão muito popular: grátis, sem cadastro e com dezenas de ferramentas. A marca d'água é aplicada nos servidores dele, na Alemanha. O Cachety aplica no seu próprio aparelho.",
    verdict:
      "Os dois são grátis e sem cadastro. A diferença está no caminho do arquivo: o PDF24 envia e apaga depois de uma hora, e se mantém com publicidade. O Cachety não envia e hoje não tem anúncios. Se você usa Windows e quer muitas ferramentas offline, o programa gratuito PDF24 Creator é uma ótima opção.",
    table: [
      {
        criterion: "Onde o arquivo é processado",
        cachety: C.where,
        other: "Em servidores do PDF24 na Alemanha. O programa PDF24 Creator, para Windows, trabalha no seu computador.",
        edge: "cachety",
      },
      {
        criterion: "Por quanto tempo fica guardado",
        cachety: C.retention,
        other: "O arquivo é apagado automaticamente do servidor uma hora depois.",
        edge: "cachety",
      },
      { criterion: "Cadastro", cachety: C.account, other: "Não precisa de cadastro." },
      { criterion: "Preço", cachety: C.price, other: "100% grátis." },
      {
        criterion: "Anúncios e rastreamento",
        cachety: C.ads,
        other: "O site diz que é grátis graças à publicidade. A política de privacidade cita Google AdSense, Google Analytics e remarketing.",
        edge: "cachety",
      },
      {
        criterion: "Tipo de marca d'água",
        cachety: C.watermark,
        other: "Texto com fonte, tamanho, cor, transparência e ângulo, em várias posições da página. Não informa se fica incorporada.",
      },
      {
        criterion: "Ocultar dados, senha e metadados",
        cachety: "Sim, tudo na mesma etapa da marca d'água.",
        other: "Sim, com ferramentas separadas: censurar PDF, proteger PDF e remover metadados.",
      },
      { criterion: "Uma cópia por destinatário", cachety: C.recipients, other: "Não informa na ferramenta de marca d'água.", edge: "cachety" },
      { criterion: "Uso sem internet", cachety: C.offline, other: "Com o PDF24 Creator, gratuito para Windows." },
      {
        criterion: "Outras ferramentas de PDF",
        cachety: C.otherTools,
        other: "Muitíssimas: juntar, comprimir, converter, OCR e mais.",
        edge: "other",
      },
    ],
    body: [
      { type: "h2", text: "Duas ferramentas grátis, dois caminhos diferentes" },
      {
        type: "p",
        text: "O PDF24 é transparente sobre isso: a marca d'água é aplicada nos servidores dele, na Alemanha, e o arquivo é apagado uma hora depois. É um serviço sério e sujeito ao RGPD europeu. Mas, durante essa hora, uma cópia do seu documento está fora do seu aparelho.",
      },
      {
        type: "p",
        text: "No Cachety, o arquivo não viaja. A página carrega uma vez e, a partir daí, todo o trabalho é do seu navegador. Por isso ele continua funcionando no modo avião.",
      },
      { type: "h2", text: "O que o PDF24 faz muito bem" },
      {
        type: "list",
        items: [
          "É grátis e sem cadastro.",
          "Tem dezenas de ferramentas de PDF no mesmo site.",
          "O PDF24 Creator, programa gratuito para Windows, trabalha offline e deixa os arquivos no seu PC.",
          "A marca d'água tem várias opções de posição e ângulo.",
        ],
      },
      { type: "h2", text: "O que o Cachety acrescenta para documentos pessoais" },
      {
        type: "list",
        items: [
          "Ocultar dados, criptografar e remover dados escondidos na mesma etapa, sem passar por várias ferramentas.",
          "Uma versão por destinatário, cada uma com o nome dele e um código único.",
          "Funciona igual no celular, inclusive com fotos HEIC do iPhone.",
          "Hoje sem anúncios nem rastreadores.",
        ],
      },
      { type: "h2", text: "Como fazer com o Cachety" },
      HOW_TO,
      AIRPLANE_TIP,
    ],
    chooseOther: [
      "Você usa Windows e quer um programa grátis com muitas ferramentas que funcione offline: o PDF24 Creator.",
      "Precisa converter, comprimir ou fazer OCR, além da marca d'água.",
      "Quer colocar a marca d'água numa posição específica da página.",
    ],
    chooseCachety: [
      "Quer colocar marca d'água no RG pelo celular ou por qualquer computador, sem enviar para servidor nenhum.",
      "Prefere um site sem publicidade nem rastreadores de anúncios.",
      "Precisa ocultar dados e criar uma cópia por destinatário numa só etapa.",
    ],
    faq: [
      {
        q: "O PDF24 é seguro para o RG?",
        a: "O PDF24 processa os arquivos em servidores na Alemanha e os apaga em uma hora. É um serviço sério, mas seu RG sai do seu aparelho. Se você não quer isso, use o PDF24 Creator no Windows ou um site que trabalha localmente, como o Cachety.",
      },
      {
        q: "O PDF24 tem anúncios?",
        a: "Sim. O próprio site diz que é grátis graças à publicidade, e a política de privacidade cita o Google AdSense.",
      },
      {
        q: "Posso usar o Cachety sem internet, como o PDF24 Creator?",
        a: "Sim, depois que a página carrega. Você também pode adicioná-lo à tela inicial do celular, como um app.",
      },
    ],
    sources: [
      { label: "PDF24: inserir marca d'água", url: "https://tools.pdf24.org/pt/inserir-marca-dagua" },
      { label: "PDF24: todas as ferramentas", url: "https://tools.pdf24.org/pt/todas-as-ferramentas" },
      { label: "PDF24: política de privacidade", url: "https://www.pdf24.org/en/privacy-policy" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ───────────────────────────── Sejda ─────────────────────────────
  {
    slug: "cachety-vs-sejda",
    competitor: "sejda",
    competitorName: "Sejda",
    competitorUrl: "https://www.sejda.com/pt",
    title: "Cachety ou Sejda: marca d'água em PDF, na nuvem ou no seu aparelho",
    metaTitle: "Sejda ou Cachety: comparativo de marca d'água em PDF",
    description:
      "O Sejda envia seus PDFs e os apaga em 2 horas; o Cachety não envia nada. Comparamos os dois para colocar marca d'água no RG, holerite e documentos.",
    intro:
      "O Sejda é um editor de PDF com uma ferramenta de marca d'água muito completa. A versão web envia seus arquivos para os servidores dele; a versão para computador, não. O Cachety trabalha sempre no seu aparelho, pelo navegador.",
    verdict:
      "O Sejda é mais flexível no visual da marca d'água: aceita imagens, posições exatas e também cria uma versão por texto. A versão web, porém, envia seus arquivos e os apaga depois de duas horas. O Cachety não envia nada e junta ocultar dados e senha na mesma etapa.",
    table: [
      {
        criterion: "Onde o arquivo é processado",
        cachety: C.where,
        other: "Sejda Web: nos servidores dele, com envio criptografado. Sejda Desktop: no seu computador.",
        edge: "cachety",
      },
      {
        criterion: "Por quanto tempo fica guardado",
        cachety: C.retention,
        other: "A página diz que os arquivos são apagados automaticamente depois de 2 horas.",
        edge: "cachety",
      },
      {
        criterion: "Preço e limites",
        cachety: C.price,
        other: "Grátis até 200 páginas ou 50 MB e 3 tarefas por hora; planos pagos para mais.",
        edge: "cachety",
      },
      {
        criterion: "Tipo de marca d'água",
        cachety: C.watermark,
        other: "Texto ou imagem, com posição livre ou por coordenadas, rotação, tamanho, transparência, cor e fonte, em páginas escolhidas. Não informa se fica incorporada.",
      },
      { criterion: "Marca d'água com logo", cachety: C.logo, other: "Sim: JPG, PNG, GIF ou SVG.", edge: "other" },
      {
        criterion: "Uma cópia por destinatário",
        cachety: C.recipients,
        other: "Sim: você escreve vários textos, um por linha, e ele gera uma versão com cada um.",
      },
      { criterion: "Uso sem internet", cachety: C.offline, other: "Com o Sejda Desktop." },
      {
        criterion: "Outras ferramentas de PDF",
        cachety: C.otherTools,
        other: "Muitas: editar, juntar, dividir, comprimir, assinar, preencher formulários.",
        edge: "other",
      },
    ],
    body: [
      { type: "h2", text: "Uma ferramenta muito completa, mas na nuvem" },
      {
        type: "p",
        text: "A marca d'água do Sejda permite quase tudo: texto ou logo, posição exata, páginas específicas e modelos salvos. Para usar no site, o PDF é enviado aos servidores dele e apagado depois de duas horas. Se você prefere que ele não saia do computador, o Sejda oferece uma versão para desktop.",
      },
      {
        type: "p",
        text: "O Cachety não tem tantas opções de visual, mas nunca envia seu documento. Tudo é feito no navegador, também no celular, e você confere com o modo avião.",
      },
      { type: "h2", text: "Em que o Sejda é melhor" },
      {
        type: "list",
        items: [
          "Aceita logos e imagens como marca d'água.",
          "Você coloca a marca d'água exatamente onde quiser.",
          "O Sejda Desktop processa no seu computador, sem enviar nada.",
          "Inclui um editor de PDF completo.",
        ],
      },
      { type: "h2", text: "Em que o Cachety ajuda" },
      {
        type: "list",
        items: [
          "Trabalha localmente também no celular, sem instalar nada.",
          "Oculta áreas, como um número de conta, e as apaga de verdade do arquivo.",
          "A marca d'água cobre a página inteira na diagonal e fica incorporada a ela.",
          "É grátis, sem limite de tarefas por hora.",
        ],
      },
      { type: "h2", text: "Como fazer com o Cachety" },
      HOW_TO,
      AIRPLANE_TIP,
    ],
    chooseOther: [
      "Você precisa de um logo ou imagem como marca d'água, numa posição exata.",
      "Quer um editor de PDF completo, na web ou no computador.",
      "Usa computador e prefere o Sejda Desktop para processar localmente com mais opções de visual.",
    ],
    chooseCachety: [
      "Quer colocar marca d'água em documentos de identidade sem enviar, também pelo celular.",
      "Precisa ocultar dados sensíveis na mesma etapa da marca d'água.",
      "Prefere uma ferramenta grátis sem limite de tarefas por hora.",
    ],
    faq: [
      {
        q: "O Sejda guarda meus arquivos?",
        a: "A ferramenta web informa que os arquivos são apagados automaticamente depois de duas horas.",
      },
      {
        q: "O Sejda cria uma cópia diferente para cada destinatário?",
        a: "Sim. Se você escrever vários textos de marca d'água, um por linha, ele gera uma versão do documento com cada texto. O Cachety também faz isso, até 20 destinatários.",
      },
      {
        q: "Existe alternativa ao Sejda que não envia o PDF?",
        a: "Sim: o Sejda Desktop trabalha no seu computador. O Cachety trabalha no seu navegador, grátis, também no celular.",
      },
    ],
    sources: [
      { label: "Sejda: marca d'água em PDF (português)", url: "https://www.sejda.com/pt/watermark-pdf" },
      { label: "Sejda: watermark PDF (inglês, vários textos)", url: "https://www.sejda.com/watermark-pdf" },
      { label: "Sejda: preços", url: "https://www.sejda.com/pricing" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ───────────────────────────── Adobe Acrobat ─────────────────────────────
  {
    slug: "cachety-vs-adobe-acrobat",
    competitor: "adobe-acrobat",
    competitorName: "Adobe Acrobat",
    competitorUrl: "https://www.adobe.com/br/acrobat.html",
    title: "Cachety ou Adobe Acrobat: marca d'água sem pagar assinatura",
    metaTitle: "Marca d'água sem Adobe Acrobat: alternativa grátis",
    description:
      "As ferramentas online grátis da Adobe não incluem marca d'água: ela fica no Acrobat pago. Comparamos Adobe Acrobat e Cachety para seus documentos.",
    intro:
      "O Adobe Acrobat é a referência em PDF. Mas adicionar marca d'água é um recurso do Acrobat pago, Standard ou Pro: ele não aparece entre as ferramentas online gratuitas. O Cachety faz isso de graça, no navegador e sem enviar o arquivo.",
    verdict:
      "Se você já paga o Acrobat e trabalha com PDF todo dia, a marca d'água dele é muito completa: texto ou imagem, com posição, rotação e aplicação em vários arquivos. Se você só quer proteger a cópia do RG ou do holerite, o Cachety faz isso grátis, sem conta e sem o documento sair do seu aparelho.",
    table: [
      {
        criterion: "Marca d'água grátis",
        cachety: "Sim, sempre grátis.",
        other: "Não: não está entre as ferramentas online gratuitas. Precisa do Acrobat Standard ou Pro, pagos.",
        edge: "cachety",
      },
      {
        criterion: "Onde o arquivo é processado",
        cachety: C.where,
        other: "O Acrobat para desktop trabalha no seu computador. As ferramentas online usam a nuvem da Adobe.",
      },
      { criterion: "Conta", cachety: C.account, other: "Várias ferramentas online pedem login numa conta Adobe; o Acrobat pago exige conta com assinatura.", edge: "cachety" },
      {
        criterion: "Tipo de marca d'água",
        cachety: C.watermark,
        other: "Texto ou imagem (PDF, JPEG ou BMP), com opacidade, rotação, tamanho e posição, e aplicação em vários arquivos.",
      },
      { criterion: "Marca d'água com logo", cachety: C.logo, other: "Sim.", edge: "other" },
      { criterion: "Ocultar dados", cachety: C.redact, other: "Sim, a ocultação de informações faz parte do Acrobat Pro." },
      { criterion: "Senha", cachety: C.password, other: "Sim, até na ferramenta online gratuita Proteger PDF." },
      { criterion: "Código aberto", cachety: C.openSource, other: "Não, é software proprietário.", edge: "cachety" },
      {
        criterion: "Outras ferramentas de PDF",
        cachety: C.otherTools,
        other: "O pacote mais completo: editar, assinar, comparar, OCR, formulários e mais.",
        edge: "other",
      },
    ],
    body: [
      { type: "h2", text: "Na Adobe, a marca d'água é paga" },
      {
        type: "p",
        text: "Muita gente procura como colocar marca d'água com a Adobe e descobre que ela não está entre as ferramentas online gratuitas, que incluem editar, juntar ou proteger com senha. A marca d'água faz parte do Acrobat pago, no computador.",
      },
      {
        type: "p",
        text: "O Cachety cobre exatamente essa necessidade sem custo: marca d'água de texto, ocultar dados e senha. E faz isso no navegador, sem conta e sem enviar seu documento.",
      },
      { type: "h2", text: "Quando o Acrobat vale a pena" },
      {
        type: "list",
        items: [
          "Você trabalha com PDF todos os dias e precisa editar, assinar, comparar ou fazer OCR.",
          "Quer usar o logo da sua empresa como marca d'água.",
          "Sua empresa já tem licenças do Acrobat.",
        ],
      },
      { type: "h2", text: "Quando o Cachety basta" },
      {
        type: "list",
        items: [
          "Você só quer proteger a cópia do RG, CNH, passaporte ou holerite.",
          "Não quer criar conta nem pagar assinatura.",
          "Quer fazer pelo celular, inclusive com fotos do iPhone.",
        ],
      },
      { type: "h2", text: "Como fazer com o Cachety" },
      HOW_TO,
      AIRPLANE_TIP,
    ],
    chooseOther: [
      "Você já paga o Acrobat e quer fazer tudo no mesmo programa.",
      "Precisa de marca d'água com logo ou imagem.",
      "Precisa de edição profissional de PDF: editar texto, assinar, comparar, OCR.",
    ],
    chooseCachety: [
      "Quer marca d'água grátis, sem conta nem assinatura.",
      "Não quer que seu documento de identidade saia do seu aparelho.",
      "Quer ocultar dados e criptografar o PDF sem instalar nada.",
    ],
    faq: [
      {
        q: "Dá para colocar marca d'água de graça com a Adobe?",
        a: "Não com as ferramentas online gratuitas: a marca d'água não está nessa lista. É um recurso do Acrobat Standard e do Acrobat Pro, pagos.",
      },
      {
        q: "Como colocar marca d'água num PDF sem o Adobe Acrobat?",
        a: "Com uma ferramenta grátis como o Cachety: abra o site, solte o PDF, escreva o texto e baixe a cópia. O arquivo não sai do seu aparelho.",
      },
      {
        q: "O Cachety substitui o Acrobat?",
        a: "Para marca d'água de texto, ocultar dados e proteger com senha, sim. Para editar texto, assinar, converter ou fazer OCR, não: o Cachety não faz isso.",
      },
    ],
    sources: [
      { label: "Adobe: ferramentas online gratuitas do Acrobat", url: "https://www.adobe.com/br/acrobat/online.html" },
      {
        label: "Adobe: adicionar marcas d'água no Acrobat para desktop",
        url: "https://helpx.adobe.com/acrobat/desktop/edit-documents/add-backgrounds-and-watermarks/add-watermarks.html",
      },
      { label: "Adobe: comparação das versões do Acrobat", url: "https://www.adobe.com/acrobat/pricing/compare-versions.html" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ───────────────────────────── Canva ─────────────────────────────
  {
    slug: "cachety-vs-canva",
    competitor: "canva",
    competitorName: "Canva",
    competitorUrl: "https://www.canva.com/pt_br/",
    title: "Cachety ou Canva: onde colocar a marca d'água no seu RG?",
    metaTitle: "Canva ou Cachety: marca d'água em documentos",
    description:
      "O Canva é ótimo para design, mas seus arquivos vão para a sua conta na nuvem. Comparamos Canva e Cachety para colocar marca d'água no RG e documentos.",
    intro:
      "O Canva é uma plataforma de design australiana que muita gente usa para colocar logo em fotos. Para um documento de identidade, porém, isso significa enviar o arquivo para a sua conta no Canva. O Cachety coloca a marca d'água sem o arquivo sair do seu aparelho.",
    verdict:
      "O Canva é a melhor opção para colocar seu logo em fotos ou artes que você vai publicar. Para a cópia do RG ou do holerite, o Cachety é mais direto: sem conta, sem enviar nada e com recursos pensados para documentos pessoais, como ocultar dados ou criar uma cópia por destinatário.",
    table: [
      { criterion: "Onde o arquivo é processado", cachety: C.where, other: "Na nuvem do Canva: o arquivo é enviado para a sua conta.", edge: "cachety" },
      {
        criterion: "Por quanto tempo fica guardado",
        cachety: C.retention,
        other: "A política diz que guarda as informações pelo tempo comercialmente razoável e enquanto houver finalidade válida.",
        edge: "cachety",
      },
      { criterion: "Conta", cachety: C.account, other: "É preciso entrar numa conta Canva para criar e editar.", edge: "cachety" },
      {
        criterion: "Publicidade e rastreamento",
        cachety: C.ads,
        other: "A política de privacidade menciona cookies e dados usados para publicidade, inclusive com parceiros como Facebook e Google.",
        edge: "cachety",
      },
      {
        criterion: "Uso do seu conteúdo para IA",
        cachety: "Não se aplica: o Cachety não recebe seus arquivos.",
        other: "A política diz que pode analisar o conteúdo enviado para treinar IA, com opção de desativar nas configurações de privacidade.",
        edge: "cachety",
      },
      {
        criterion: "Tipo de marca d'água",
        cachety: C.watermark,
        other: "Pelo app Watermark Maker: texto ou logo, com opacidade e disposição. Não informa se fica incorporada.",
      },
      { criterion: "Marca d'água com logo e design", cachety: C.logo, other: "Sim, com todas as ferramentas de design do Canva.", edge: "other" },
      {
        criterion: "Ocultar dados e senha",
        cachety: "Sim, as duas coisas.",
        other: "Não encontramos ferramentas de ocultação nem de senha de PDF.",
        edge: "cachety",
      },
      { criterion: "Uma cópia por destinatário", cachety: C.recipients, other: "Não informa.", edge: "cachety" },
    ],
    body: [
      { type: "h2", text: "Uma ótima ferramenta de design, não de documentos pessoais" },
      {
        type: "p",
        text: "O Canva é excelente para criar posts, cartazes ou fotos com seu logo. Mas tudo o que você edita no Canva fica guardado na sua conta, na nuvem. Para um RG, isso quer dizer que uma cópia do documento fica nos servidores de uma empresa, pelo tempo que a política dela considera razoável.",
      },
      {
        type: "p",
        text: "O Cachety funciona ao contrário: não há conta nem nuvem. Você abre a página, adiciona o documento e baixa a cópia. O original não sai do seu celular ou computador.",
      },
      { type: "h2", text: "Em que o Canva é melhor" },
      {
        type: "list",
        items: [
          "Marcas d'água com seu logo e um visual caprichado.",
          "Milhares de modelos, fontes e elementos gráficos.",
          "Ideal para proteger fotos que você vai publicar nas redes ou num site.",
        ],
      },
      { type: "h2", text: "Em que o Cachety é melhor para o seu RG" },
      {
        type: "list",
        items: [
          "Não precisa de conta e o arquivo não é enviado.",
          "A marca d'água se repete pela página inteira e fica incorporada a ela.",
          "Você pode ocultar dados, remover metadados e proteger o PDF com senha.",
        ],
      },
      { type: "h2", text: "Como fazer com o Cachety" },
      HOW_TO,
      AIRPLANE_TIP,
    ],
    chooseOther: [
      "Você quer colocar seu logo em fotos ou artes que vai publicar.",
      "Precisa de um visual caprichado, com as fontes e cores da sua marca.",
      "Já trabalha no Canva e quer tudo no mesmo lugar.",
    ],
    chooseCachety: [
      "Vai enviar a cópia do RG, CNH ou passaporte e não quer subir para nenhuma nuvem.",
      "Não quer criar conta para uma coisa que leva um minuto.",
      "Precisa ocultar dados ou proteger o PDF com senha.",
    ],
    faq: [
      {
        q: "É boa ideia enviar meu RG para o Canva?",
        a: "O Canva não foi pensado para documentos de identidade. O que você envia fica na sua conta, na nuvem. Para a cópia do RG, é mais prudente uma ferramenta que trabalha no seu aparelho, como o Cachety.",
      },
      {
        q: "Como colocar marca d'água no Canva?",
        a: "O Canva oferece o app Watermark Maker, que adiciona um texto ou um logo como marca d'água nos seus designs. Segundo o Canva, ele pode ser usado em qualquer plano.",
      },
      {
        q: "O Cachety pode usar meu logo como marca d'água?",
        a: "Não. O Cachety só faz marca d'água de texto. Para logo, o Canva é a melhor opção.",
      },
    ],
    sources: [
      { label: "Canva: política de privacidade", url: "https://www.canva.com/policies/privacy-policy/" },
      { label: "Canva: app Watermark Maker", url: "https://www.canva.com/apps/AAGa702Tp2E/watermark-maker" },
      { label: "Canva: marca d'água em PDF", url: "https://www.canva.com/features/add-watermark-to-pdf/" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },
];
