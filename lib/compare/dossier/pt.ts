import type { Comparison } from "../types";

// Comparativos da ferramenta Dossier (pt): juntar PDFs e fotos num único
// arquivo e deixá-lo abaixo de um limite de tamanho. Mesma regra editorial dos
// outros comparativos (lib/compare/types.ts); cada entrada leva tool: "dossier".
// Escritos para leitores no Brasil (pt-BR). Só texto puro.
// Draft translation from the English guide, awaiting native review (ROADMAP.md, backlog: Native review).
// Cada informação sobre outra ferramenta vem de uma página listada em `sources`,
// lida na data `checked`. Os preços mudam muito, por isso nenhum é citado.
//
// A coluna do Cachety descreve a ferramenta Dossier como especificada em
// docs/prd-dossier.md (escopo Must). Publicar junto com a ferramenta, não
// antes, e conferir a coluna com a interface entregue.

const CHECKED = "2026-11-18";
const UPDATED = "2026-11-18";

/** Endereço da ferramenta, escrito sem esquema. */
const TOOL = "cachety.com/pt/dossier";

// Texto comum da coluna do Cachety.
const CACHETY = {
  where: "No seu próprio aparelho, dentro do navegador. Nada é enviado.",
  kept: "Nada fica guardado: não existe servidor que receba seus arquivos.",
  free: "Grátis, sem conta, sem plano pago e sem limite diário. Até 200 MB por arquivo, 500 páginas por PDF e 1.000 páginas no total.",
  pages: "Todas as páginas de todos os arquivos numa só grade: mova uma página, até de um arquivo para outro, gire ou remova.",
  size: "Você escolhe um tamanho máximo: 1, 2, 5 ou 10 MB. Antes do download, o Cachety avisa se o arquivo vai caber e continuar legível.",
  output:
    "Cada página é refeita como imagem. O texto não pode ser selecionado nem pesquisado, e um PDF só de texto pode sair maior.",
  hidden: "Removidos em todo arquivo: texto oculto, autor e outras propriedades, anexos, links e a localização GPS das fotos.",
  inputs: "PDFs e fotos juntos, inclusive fotos HEIC do iPhone. Não aceita arquivos do Word, do Excel nem do PowerPoint.",
  offline: "Nada para instalar. Depois de carregada, a página continua funcionando no modo avião, no celular ou no computador.",
  ads: "Sem anúncios e sem rastreadores. O código é aberto.",
};

const PIXELS: Comparison["body"] = [
  { type: "h2", text: "Como é um arquivo feito pelo Cachety" },
  {
    type: "p",
    text: "O Cachety não junta suas páginas originais. Ele refaz cada página como imagem e monta um novo PDF com essas imagens. É assim que ele remove o que você não vê: texto oculto, nome do autor, anexos, links e a localização GPS das fotos. O preço é real: o texto do novo arquivo não pode ser selecionado nem pesquisado, e um PDF que só tinha texto pode sair maior que o original, a menos que você escolha um tamanho máximo.",
  },
  {
    type: "warning",
    text: "O Cachety não é a ferramenta certa quando o texto precisa continuar selecionável ou pesquisável, quando você precisa manter marcadores ou campos de formulário, quando quer incluir arquivos do Word ou do Excel, ou quando precisa de reconhecimento de texto (OCR) num documento escaneado.",
  },
];

const HOW_TO: Comparison["body"] = [
  { type: "h2", text: "Como fazer um único PDF com o Cachety" },
  {
    type: "steps",
    items: [
      `Abra ${TOOL} no navegador, no computador ou no celular. Não precisa instalar nada nem criar conta.`,
      "Adicione seus PDFs e suas fotos. Cada foto vira uma página.",
      "Passe para as páginas: arraste para colocar em ordem, gire as que estiverem de lado e remova as que você não quer.",
      "Escolha a opção de um único PDF e, se deram um limite de tamanho, escolha 1, 2, 5 ou 10 MB.",
      "Confira a prévia, oculte qualquer dado de que o destinatário não precise e baixe o arquivo.",
    ],
  },
];

const FAQ_UPLOADED = (other: string, answer: string) => ({
  q: `Meus arquivos são enviados para um servidor com o Cachety ou com o ${other}?`,
  a: `Com o Cachety, não: o trabalho é feito no seu navegador e não existe servidor que receba seus arquivos. ${answer}`,
});

const FAQ_TEXT = {
  q: "O texto continua selecionável depois de juntar com o Cachety?",
  a: "Não. O Cachety refaz cada página como imagem, o que remove os dados ocultos, mas também o texto selecionável. Se você precisa do texto, use uma ferramenta que junte as páginas originais.",
};

export const DOSSIER_COMPARISONS_PT: Comparison[] = [
  // ───────────────────────────── iLovePDF ─────────────────────────────
  {
    tool: "dossier",
    slug: "cachety-vs-ilovepdf-merge",
    competitor: "ilovepdf-merge",
    competitorName: "iLovePDF",
    competitorUrl: "https://www.ilovepdf.com/",
    title: "Cachety ou iLovePDF: juntar e comprimir PDFs sem enviar os arquivos",
    metaTitle: "Alternativa ao iLovePDF para juntar PDF sem upload",
    description:
      "O iLovePDF junta e comprime PDFs nos servidores dele. O Cachety faz isso no seu navegador: nada é enviado, e os dados ocultos são removidos. Comparativo justo.",
    intro:
      "O iLovePDF é um dos conjuntos de ferramentas de PDF online mais usados, feito em Barcelona. As ferramentas dele para juntar e comprimir PDF processam seus arquivos nos servidores da empresa. O Cachety faz um trabalho mais restrito, no seu próprio aparelho: reúne PDFs e fotos num único arquivo, abaixo de um limite de tamanho, sem enviá-los.",
    verdict:
      "O iLovePDF faz mais: arquivos do Office, reconhecimento de texto, muitos arquivos de uma vez e um aplicativo de computador pago que funciona offline. Para isso, ele é a melhor escolha. O Cachety é a melhor escolha quando os arquivos são documentos pessoais que você prefere não enviar, quando fotos e PDFs precisam ir no mesmo arquivo ou quando um formulário impõe um limite de tamanho em megabytes.",
    table: [
      {
        criterion: "Onde os arquivos são processados",
        cachety: CACHETY.where,
        other: "No site, nos servidores do iLovePDF. O aplicativo de computador, num plano pago, processa os arquivos no seu computador.",
        edge: "cachety",
      },
      {
        criterion: "Por quanto tempo os arquivos ficam guardados",
        cachety: CACHETY.kept,
        other: "Apagados automaticamente em até duas horas depois de processados. Um botão na tela de download apaga antes.",
        edge: "cachety",
      },
      {
        criterion: "Conta, uso grátis e limites",
        cachety: CACHETY.free,
        other: "Grátis sem cadastro, para um número limitado de documentos. Juntar grátis: até 100 arquivos e 300 MB por tarefa. Comprimir grátis: 5 arquivos por tarefa. Um plano pago aumenta os limites.",
      },
      {
        criterion: "Colocar as páginas em ordem",
        cachety: CACHETY.pages,
        other: "A ferramenta de juntar reordena arquivos inteiros. Ordenar, excluir e girar páginas avulsas é feito numa ferramenta separada, a de organizar PDF.",
        edge: "cachety",
      },
      {
        criterion: "Ficar abaixo de um limite de tamanho",
        cachety: CACHETY.size,
        other: "Três níveis de compressão: extrema, recomendada e menor. Não há um tamanho em megabytes para atingir.",
        edge: "cachety",
      },
      {
        criterion: "Fotos e PDFs juntos",
        cachety: CACHETY.inputs,
        other: "Em duas etapas no site: primeiro converter as imagens em PDF, depois juntar. Arquivos do Word, do Excel e do PowerPoint têm conversores próprios.",
      },
      {
        criterion: "Como é o novo PDF",
        cachety: CACHETY.output,
        other: "Não descrito na página da ferramenta de juntar. Uma ferramenta separada reconhece o texto (OCR) para tornar pesquisável um documento escaneado.",
      },
      {
        criterion: "Dados ocultos",
        cachety: CACHETY.hidden,
        other: "Não documentado para as ferramentas do site. O aplicativo de computador pode editar ou apagar os metadados de um PDF.",
      },
      {
        criterion: "Aplicativos e uso offline",
        cachety: CACHETY.offline,
        other: "Um aplicativo de computador para Windows e Mac que funciona offline: a versão grátis é um leitor de PDF, e as ferramentas exigem um plano pago. Apps para iOS e Android.",
      },
      {
        criterion: "Anúncios e rastreadores",
        cachety: CACHETY.ads,
        other: "O plano grátis mostra anúncios; o plano pago os remove.",
        edge: "cachety",
      },
    ],
    body: [
      { type: "h2", text: "Uma grande caixa de ferramentas online e uma ferramenta que fica no seu aparelho" },
      {
        type: "p",
        text: "No site do iLovePDF, seus arquivos são enviados para os servidores da empresa, processados lá e apagados automaticamente em até duas horas. Você pode apagá-los antes pela tela de download. O iLovePDF diz que tem a certificação ISO/IEC 27001 e que transfere os arquivos por uma conexão criptografada. O site está disponível em 26 idiomas.",
      },
      {
        type: "p",
        text: "O Cachety só prepara um arquivo para enviar: os PDFs e as fotos que pediram a você, em ordem, num único PDF do tamanho certo. Tudo acontece no seu navegador. Não há envio, então não há nada para apagar depois.",
      },
      { type: "h2", text: "Em que o iLovePDF é melhor" },
      {
        type: "list",
        items: [
          "Converte arquivos do Word, do Excel e do PowerPoint em PDF.",
          "Reconhece o texto de documentos escaneados (OCR), e assim um PDF escaneado pode se tornar pesquisável.",
          "Aceita trabalhos grandes: até 100 arquivos de uma vez ao juntar de graça.",
          "O aplicativo de computador pago processa os arquivos no seu computador, com as mesmas ferramentas do site.",
        ],
      },
      { type: "h2", text: "Em que o Cachety é melhor" },
      {
        type: "list",
        items: [
          "Seus arquivos nunca são enviados, de graça, tanto no celular quanto no computador.",
          "Fotos e PDFs vão para o mesmo arquivo numa única etapa, e as páginas avulsas podem ser movidas, giradas ou removidas no mesmo lugar.",
          "Você escolhe um tamanho em megabytes, do jeito que os formulários online informam seus limites, e o Cachety avisa antes do download se não der para chegar a ele mantendo o arquivo legível.",
          "Os dados ocultos são removidos de todo arquivo, e não há anúncios.",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "Você precisa converter arquivos do Word, do Excel ou do PowerPoint, ou reconhecer o texto de um documento escaneado.",
      "Você tem muitos arquivos ou PDFs muito grandes para processar de uma vez.",
      "Você paga pelo iLovePDF e usa o aplicativo de computador dele, que trabalha no seu computador.",
    ],
    chooseCachety: [
      "Os arquivos são documentos de identidade, holerites ou extratos bancários e você prefere não enviá-los.",
      "Você precisa de fotos e PDFs no mesmo arquivo, com as páginas na sua ordem.",
      "Um formulário pede um único arquivo com menos de 1, 2, 5 ou 10 MB.",
    ],
    faq: [
      FAQ_UPLOADED(
        "iLovePDF",
        "Com o site do iLovePDF, sim: os arquivos são processados nos servidores dele e apagados em até duas horas. O aplicativo de computador dele processa os arquivos no seu computador, num plano pago."
      ),
      {
        q: "O iLovePDF consegue comprimir um PDF para um tamanho exato?",
        a: "Não. Ele oferece três níveis de compressão, e o próprio guia dele diz que nenhuma ferramenta pode prometer um tamanho final exato. Com o Cachety você escolhe 1, 2, 5 ou 10 MB, e ele avisa antes do download se o arquivo não puder caber e continuar legível.",
      },
      {
        q: "O iLovePDF funciona offline?",
        a: "O aplicativo de computador dele para Windows e Mac funciona, mas as ferramentas do aplicativo exigem um plano pago. O Cachety é uma página da web que continua funcionando no modo avião depois de carregada, de graça.",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "iLovePDF: juntar PDF", url: "https://www.ilovepdf.com/merge_pdf" },
      { label: "iLovePDF: comprimir PDF", url: "https://www.ilovepdf.com/compress_pdf" },
      { label: "iLovePDF: preços e limites por ferramenta", url: "https://www.ilovepdf.com/pricing" },
      { label: "iLovePDF: segurança", url: "https://www.ilovepdf.com/help/security" },
      { label: "iLovePDF: perguntas e respostas", url: "https://www.ilovepdf.com/help/faq" },
      { label: "iLovePDF Desktop", url: "https://www.ilovepdf.com/desktop" },
      { label: "Blog do iLovePDF: web, computador ou celular", url: "https://www.ilovepdf.com/blog/pdf-web-or-desktop" },
      { label: "Blog do iLovePDF: organizar páginas de PDF", url: "https://www.ilovepdf.com/blog/organize-pdf-pages" },
      { label: "Blog do iLovePDF: juntar arquivos PDF e JPG", url: "https://www.ilovepdf.com/blog/merge-pdf-and-jpg-files-online" },
      { label: "Blog do iLovePDF: comprimir um PDF para um tamanho específico", url: "https://www.ilovepdf.com/blog/compress-pdf-to-specific-size" },
      {
        label: "Blog do iLovePDF: editar ou remover metadados de PDF",
        url: "https://www.ilovepdf.com/blog/edit-or-remove-pdf-metadata-windows-mac",
      },
      { label: "Blog do iLovePDF: 15 anos do iLovePDF", url: "https://www.ilovepdf.com/blog/ilovepdf-15-years-anniversary-milestones" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ───────────────────────────── Smallpdf ─────────────────────────────
  {
    tool: "dossier",
    slug: "cachety-vs-smallpdf-merge",
    competitor: "smallpdf-merge",
    competitorName: "Smallpdf",
    competitorUrl: "https://smallpdf.com/",
    title: "Cachety ou Smallpdf: juntar e comprimir PDFs sem enviar os arquivos",
    metaTitle: "Alternativa ao Smallpdf para juntar PDF sem upload",
    description:
      "O Smallpdf junta e comprime PDFs na nuvem, com um limite diário no uso grátis. O Cachety faz isso no seu navegador, grátis e sem envio. Comparativo justo.",
    intro:
      "O Smallpdf é um conjunto conhecido de ferramentas de PDF online, da Suíça, com apps para celular e para Windows. As ferramentas dele para juntar e comprimir PDF funcionam na nuvem. O Cachety faz um trabalho mais restrito, no seu próprio aparelho: reúne PDFs e fotos num único arquivo, abaixo de um limite de tamanho, sem enviá-los.",
    verdict:
      "O Smallpdf faz mais: aceita arquivos do Word, do Excel e do PowerPoint, reconhece o texto de documentos escaneados e tem um aplicativo para Windows que funciona offline. Para isso, ele é a melhor escolha. O Cachety é a melhor escolha quando os arquivos são documentos pessoais que você prefere não enviar, quando você tem mais de um ou dois arquivos para preparar no mesmo dia ou quando um formulário impõe um limite de tamanho em megabytes.",
    table: [
      {
        criterion: "Onde os arquivos são processados",
        cachety: CACHETY.where,
        other: "Na nuvem. Os arquivos são enviados para servidores localizados na União Europeia. O aplicativo de computador para Windows trabalha com os arquivos offline.",
        edge: "cachety",
      },
      {
        criterion: "Por quanto tempo os arquivos ficam guardados",
        cachety: CACHETY.kept,
        other: "Apagados dos servidores depois de uma hora, a menos que você os salve na sua conta.",
        edge: "cachety",
      },
      {
        criterion: "Conta, uso grátis e limites",
        cachety: CACHETY.free,
        other: "Não precisa de cadastro. O uso grátis tem um limite diário de downloads e um limite de tamanho de arquivo; um plano pago remove os dois.",
        edge: "cachety",
      },
      {
        criterion: "Colocar as páginas em ordem",
        cachety: CACHETY.pages,
        other: "A ferramenta de juntar reorganiza, gira e exclui páginas. Uma ferramenta separada, a de organizar, faz o mesmo num único PDF.",
      },
      {
        criterion: "Ficar abaixo de um limite de tamanho",
        cachety: CACHETY.size,
        other: "Níveis de compressão, não um tamanho em megabytes. A compressão básica é grátis; os níveis mais fortes fazem parte do plano pago.",
        edge: "cachety",
      },
      {
        criterion: "Tipos de arquivo aceitos",
        cachety: CACHETY.inputs,
        other: "PDF, Word, Excel, PowerPoint, JPG e PNG na ferramenta de juntar: os outros arquivos são convertidos em PDF primeiro. Fotos HEIC na ferramenta de JPG para PDF.",
        edge: "other",
      },
      {
        criterion: "Como é o novo PDF",
        cachety: CACHETY.output,
        other: "Não descrito na página da ferramenta de juntar. O reconhecimento de texto (OCR) é oferecido como ferramenta separada.",
      },
      {
        criterion: "Dados ocultos",
        cachety: CACHETY.hidden,
        other: "Não documentado para a ferramenta de juntar nas páginas do produto nem nas de ajuda.",
      },
      {
        criterion: "Aplicativos e uso offline",
        cachety: CACHETY.offline,
        other: "Apps para iOS e Android, e um aplicativo de computador para Windows que funciona offline. O aplicativo de computador para Mac não tem mais suporte.",
      },
    ],
    body: [
      { type: "h2", text: "Uma caixa de ferramentas na nuvem e uma ferramenta que fica no seu aparelho" },
      {
        type: "p",
        text: "O Smallpdf descreve suas ferramentas de juntar e de comprimir como baseadas na nuvem: seus arquivos são enviados, processados nos servidores dele e apagados depois de uma hora, a menos que você os salve na sua conta. O Smallpdf diz que tem a certificação ISO/IEC 27001 e que usa criptografia TLS durante a transferência dos arquivos. As ferramentas dele estão disponíveis em 24 idiomas.",
      },
      {
        type: "p",
        text: "Aqui o Cachety tem um só trabalho: transformar os PDFs e as fotos que pediram a você num único arquivo limpo, do tamanho certo. Tudo acontece no seu navegador. Não há envio, então não há nada para apagar depois.",
      },
      { type: "h2", text: "Em que o Smallpdf é melhor" },
      {
        type: "list",
        items: [
          "Converte arquivos do Word, do Excel e do PowerPoint em PDF e junta tudo de uma vez.",
          "Oferece reconhecimento de texto (OCR), e assim um documento escaneado pode se tornar pesquisável.",
          "Tem apps de celular com scanner e um aplicativo para Windows que trabalha com os arquivos offline.",
          "Uma conta permite guardar seus documentos online e encontrá-los em outro aparelho.",
        ],
      },
      { type: "h2", text: "Em que o Cachety é melhor" },
      {
        type: "list",
        items: [
          "Seus arquivos nunca são enviados, tanto no celular quanto no computador, e não há nada para instalar.",
          "Não há limite diário nem plano pago.",
          "Você escolhe um tamanho em megabytes, do jeito que os formulários online informam seus limites, e o Cachety avisa antes do download se não der para chegar a ele mantendo o arquivo legível.",
          "Os dados ocultos são removidos de todo arquivo, sem uma etapa separada.",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "Você precisa incluir arquivos do Word, do Excel ou do PowerPoint no PDF final.",
      "Você precisa que o texto de um documento escaneado seja reconhecido (OCR).",
      "Você usa Windows e quer um aplicativo instalado que funcione offline.",
      "Você quer guardar seus documentos numa conta online.",
    ],
    chooseCachety: [
      "Os arquivos são documentos de identidade, holerites ou extratos bancários e você prefere não enviá-los.",
      "Um formulário pede um único arquivo com menos de 1, 2, 5 ou 10 MB.",
      "Você está no celular e não quer instalar um app nem criar uma conta.",
    ],
    faq: [
      FAQ_UPLOADED(
        "Smallpdf",
        "Com as ferramentas online do Smallpdf, sim: os arquivos são enviados para os servidores dele e apagados depois de uma hora, a menos que você os salve na sua conta. O aplicativo de computador dele para Windows trabalha com os arquivos offline."
      ),
      {
        q: "O Smallpdf consegue comprimir um PDF para um tamanho exato?",
        a: "Não. O Smallpdf oferece níveis de compressão, e o próprio blog dele diz que a ferramenta não deixa digitar um tamanho exato. Com o Cachety você escolhe 1, 2, 5 ou 10 MB.",
      },
      {
        q: "O Smallpdf é grátis?",
        a: "Em parte. Juntar PDFs e a compressão básica são grátis, com um limite diário de downloads; a compressão mais forte e o uso ilimitado fazem parte do plano pago. O Cachety é grátis, sem limite diário e sem plano pago.",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "Smallpdf: juntar PDF", url: "https://smallpdf.com/merge-pdf" },
      { label: "Smallpdf: comprimir PDF", url: "https://smallpdf.com/compress-pdf" },
      { label: "Smallpdf: organizar PDF", url: "https://smallpdf.com/organize-pdf" },
      { label: "Smallpdf: JPG para PDF", url: "https://smallpdf.com/jpg-to-pdf" },
      { label: "Smallpdf: preços e comparação de planos", url: "https://smallpdf.com/pricing" },
      { label: "Smallpdf: aviso de privacidade", url: "https://smallpdf.com/privacy" },
      { label: "Smallpdf: central de confiança (Trust Center)", url: "https://smallpdf.com/trust-center" },
      { label: "Smallpdf: apps e extensões", url: "https://smallpdf.com/download" },
      { label: "Blog do Smallpdf: comprimir um PDF para um tamanho escolhido", url: "https://smallpdf.com/blog/compress-pdf-to-chosen-size" },
      { label: "Sobre o Smallpdf", url: "https://smallpdf.com/about" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ─────────────────────────── Adobe Acrobat ───────────────────────────
  {
    tool: "dossier",
    slug: "cachety-vs-adobe-merge",
    competitor: "adobe-merge",
    competitorName: "Adobe Acrobat",
    competitorUrl: "https://www.adobe.com/acrobat/online.html",
    title: "Cachety ou Adobe Acrobat online: juntar e comprimir PDFs",
    metaTitle: "Alternativa ao Adobe Acrobat para juntar PDF sem upload",
    description:
      "As ferramentas online grátis da Adobe juntam e comprimem PDFs nos servidores da Adobe. O Cachety faz isso no seu navegador, sem envio e sem login. Comparativo.",
    intro:
      "A Adobe inventou o PDF, e as ferramentas online grátis do Acrobat juntam e comprimem PDFs em qualquer navegador. Os arquivos são tratados nos servidores da Adobe. O Cachety faz um trabalho mais restrito, no seu próprio aparelho: reúne PDFs e fotos num único arquivo, abaixo de um limite de tamanho, sem enviá-los.",
    verdict:
      "Para PDFs cujo texto precisa ficar como está, a ferramenta de juntar da Adobe é a melhor escolha: ela combina os arquivos sem reduzir a qualidade das imagens, do texto ou da formatação, e aceita até 100 arquivos. O aplicativo de computador pago faz muito mais que o Cachety. O Cachety é a melhor escolha para documentos pessoais que você prefere não enviar, para misturar fotos e PDFs de graça e para respeitar um limite de tamanho dado em megabytes.",
    table: [
      {
        criterion: "Onde os arquivos são processados",
        cachety: CACHETY.where,
        other: "Nas ferramentas online, nos servidores da Adobe. O aplicativo Acrobat para computador comprime os arquivos localmente, no seu aparelho.",
        edge: "cachety",
      },
      {
        criterion: "Por quanto tempo os arquivos ficam guardados",
        cachety: CACHETY.kept,
        other: "Apagados dos servidores da Adobe, a menos que você faça login para salvá-los na sua conta. Você mesmo pode apagar um arquivo depois de baixá-lo.",
        edge: "cachety",
      },
      {
        criterion: "Conta, uso grátis e limites",
        cachety: CACHETY.free,
        other: "Juntar: até 100 arquivos de 500 páginas cada, sem marca d'água. Comprimir: grátis com uso limitado; o uso ilimitado exige um plano pago.",
      },
      {
        criterion: "Colocar as páginas em ordem",
        cachety: CACHETY.pages,
        other: "Os arquivos podem ser reordenados antes de juntar. Reorganizar páginas avulsas exige login.",
        edge: "cachety",
      },
      {
        criterion: "Ficar abaixo de um limite de tamanho",
        cachety: CACHETY.size,
        other: "Três níveis de compressão: alta, média e baixa. Arquivos de até 2 GB.",
      },
      {
        criterion: "Fotos e outros tipos de arquivo",
        cachety: CACHETY.inputs,
        other: "A ferramenta grátis de juntar aceita PDFs. Combinar PDFs com arquivos do Word, do Excel, do PowerPoint ou de imagem faz parte do Acrobat Pro. Uma ferramenta separada transforma imagens em PDF, e é preciso fazer login para baixar o resultado.",
      },
      {
        criterion: "Como é o novo PDF",
        cachety: CACHETY.output,
        other: "Os arquivos são combinados sem compressão e sem redução da qualidade das imagens, do texto ou da formatação.",
        edge: "other",
      },
      {
        criterion: "Dados ocultos",
        cachety: CACHETY.hidden,
        other: "Remover informações ocultas (“sanitize”) e tarjar conteúdo são recursos do Acrobat Pro, que é pago.",
        edge: "cachety",
      },
      {
        criterion: "Aplicativos e uso offline",
        cachety: CACHETY.offline,
        other: "O Acrobat Reader, grátis, exibe, anota, preenche e assina. Editar, converter e comprimir ficam no aplicativo de computador pago. O app de celular Adobe Scan guarda as digitalizações no armazenamento em nuvem da Adobe.",
      },
    ],
    body: [
      { type: "h2", text: "A referência em PDF e uma ferramenta pequena para um só trabalho" },
      {
        type: "p",
        text: "A Adobe oferece mais de 25 ferramentas online grátis. A de juntar PDFs aceita até 100 arquivos e os combina sem alterar a qualidade. A de comprimir PDF oferece três níveis. As duas enviam seus arquivos para os servidores da Adobe, onde são apagados, a menos que você faça login para salvá-los. A Adobe diz que os arquivos são criptografados em trânsito e em repouso, e lista ISO 27001 e SOC 2 entre as certificações do Acrobat na web.",
      },
      {
        type: "p",
        text: "O Cachety só prepara um arquivo para enviar: os PDFs e as fotos que pediram a você, em ordem, num único PDF do tamanho certo. Tudo acontece no seu navegador, sem login em nenhuma etapa.",
      },
      { type: "h2", text: "Em que o Adobe Acrobat é melhor" },
      {
        type: "list",
        items: [
          "O PDF final mantém a qualidade do texto, das imagens e da formatação originais.",
          "Dá conta de trabalhos grandes: até 100 arquivos de uma vez ao juntar, e arquivos de até 2 GB no compressor.",
          "O aplicativo de computador pago edita texto e imagens, converte arquivos, comprime e tarja conteúdo.",
          "Se você já paga pelo Acrobat, tudo fica num só lugar, com seus arquivos na sua conta Adobe.",
        ],
      },
      { type: "h2", text: "Em que o Cachety é melhor" },
      {
        type: "list",
        items: [
          "Seus arquivos nunca são enviados, e não há login em nenhum momento.",
          "Mover, girar e remover páginas avulsas é grátis e não exige conta.",
          "Fotos e PDFs vão para o mesmo arquivo de graça, inclusive fotos HEIC do iPhone.",
          "Os dados ocultos são removidos de todo arquivo, um recurso que a Adobe reserva ao plano Pro, pago.",
          "Você escolhe um tamanho em megabytes e o Cachety avisa antes do download se dá para chegar a ele.",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "O texto do PDF final precisa continuar selecionável e pesquisável.",
      "Você tem dezenas de arquivos ou PDFs muito grandes para combinar.",
      "Você já paga pelo Acrobat, ou também precisa editar, converter ou reconhecer texto.",
    ],
    chooseCachety: [
      "Os arquivos são documentos de identidade, holerites ou extratos bancários e você prefere não enviá-los.",
      "Você quer reordenar, girar ou remover páginas sem fazer login.",
      "Você precisa misturar fotos e PDFs e manter o resultado abaixo de 1, 2, 5 ou 10 MB.",
    ],
    faq: [
      FAQ_UPLOADED(
        "Adobe Acrobat",
        "Com as ferramentas online da Adobe, sim: os arquivos são tratados nos servidores da Adobe e apagados, a menos que você faça login para salvá-los. O aplicativo Acrobat para computador trabalha no seu próprio aparelho."
      ),
      {
        q: "Preciso de uma conta Adobe para juntar PDFs?",
        a: "Para juntar e baixar, não. A Adobe pede login para reorganizar páginas avulsas, para compartilhar o arquivo por link ou para baixar um PDF feito a partir de imagens. O Cachety não tem conta nenhuma.",
      },
      {
        q: "O Acrobat online consegue remover os metadados de um PDF?",
        a: "Remover informações ocultas é um recurso do Acrobat Pro, que é pago. O Cachety remove os dados ocultos de todo arquivo que ele gera, refazendo as páginas como imagens.",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "Adobe Acrobat: ferramentas online grátis", url: "https://www.adobe.com/acrobat/online.html" },
      { label: "Adobe Acrobat: juntar PDFs", url: "https://www.adobe.com/acrobat/online/merge-pdf.html" },
      { label: "Adobe Acrobat: comprimir PDF", url: "https://www.adobe.com/acrobat/online/compress-pdf.html" },
      { label: "Adobe Acrobat: JPG para PDF", url: "https://www.adobe.com/acrobat/online/jpg-to-pdf.html" },
      { label: "Adobe Acrobat: reordenar páginas de PDF", url: "https://www.adobe.com/acrobat/online/rearrange-pdf.html" },
      { label: "Adobe Acrobat: excluir páginas de PDF", url: "https://www.adobe.com/acrobat/online/delete-pdf-pages.html" },
      { label: "Adobe Acrobat Reader", url: "https://www.adobe.com/acrobat/pdf-reader.html" },
      { label: "Adobe Acrobat: comparação de planos", url: "https://www.adobe.com/acrobat/pricing/compare-versions.html" },
      { label: "Adobe Scan", url: "https://www.adobe.com/acrobat/mobile/scanner-app.html" },
      {
        label: "Adobe Acrobat Services: visão geral de segurança",
        url: "https://www.adobe.com/cc-shared/assets/pdf/trust-center/ungated/whitepapers/doc-cloud/acrobat-dc-security-overview-ue.pdf",
      },
      { label: "Adobe: lista de conformidade", url: "https://www.adobe.com/trust/compliance/compliance-list.html" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ────────────────────────────── PDF24 ──────────────────────────────
  {
    tool: "dossier",
    slug: "cachety-vs-pdf24-merge",
    competitor: "pdf24-merge",
    competitorName: "PDF24",
    competitorUrl: "https://tools.pdf24.org/",
    title: "Cachety ou PDF24: juntar e comprimir PDFs sem enviar os arquivos",
    metaTitle: "Alternativa ao PDF24 para juntar PDF sem upload",
    description:
      "As ferramentas online do PDF24 juntam e comprimem PDFs nos servidores dele; o programa de Windows é offline. O Cachety roda em qualquer navegador, sem envio.",
    intro:
      "O PDF24 é um conjunto alemão e gratuito de ferramentas de PDF. As ferramentas online processam os arquivos nos servidores do PDF24, e o programa para Windows, o PDF24 Creator, faz o mesmo trabalho no seu PC. O Cachety funciona no navegador de qualquer aparelho e nunca envia seus arquivos, mas faz um trabalho mais restrito.",
    verdict:
      "Num computador com Windows, o PDF24 Creator é difícil de superar: é grátis, funciona offline e junta as páginas originais, então o texto fica como estava. No celular, no Mac ou num computador em que você não pode instalar nada, usar o PDF24 significa usar as ferramentas online, que enviam seus arquivos. Nesses casos, o Cachety é a melhor escolha para documentos pessoais, e ele deixa você escolher um tamanho em megabytes.",
    table: [
      {
        criterion: "Onde os arquivos são processados",
        cachety: CACHETY.where,
        other: "Ferramentas online: na nuvem, nos servidores do PDF24. PDF24 Creator (Windows): no seu PC, sem envio.",
      },
      {
        criterion: "Por quanto tempo os arquivos ficam guardados",
        cachety: CACHETY.kept,
        other: "Online: apagados automaticamente depois de uma hora. Também dá para removê-los à mão, imediatamente.",
        edge: "cachety",
      },
      {
        criterion: "Conta, uso grátis e limites",
        cachety: CACHETY.free,
        other: "Grátis e sem restrições, sem cadastro. Online, um arquivo pode ter até 1.000 MB e um trabalho, até 10 GB.",
      },
      {
        criterion: "Colocar as páginas em ordem",
        cachety: CACHETY.pages,
        other: "Os arquivos são reordenados arrastando e soltando. Um modo de páginas mostra as páginas de todos os arquivos. Girar e remover páginas são ferramentas separadas.",
      },
      {
        criterion: "Ficar abaixo de um limite de tamanho",
        cachety: CACHETY.size,
        other: "Você define a resolução (DPI) e a qualidade da imagem, com uma opção de tons de cinza. Não existe uma opção “comprimir para 5 MB”.",
        edge: "cachety",
      },
      {
        criterion: "Tipos de arquivo aceitos",
        cachety: CACHETY.inputs,
        other: "PDFs, imagens, documentos do Word e outros arquivos. As fotos HEIC do iPhone não são aceitas na ferramenta de juntar.",
      },
      {
        criterion: "Como é o novo PDF",
        cachety: CACHETY.output,
        other: "As páginas são aproveitadas como estão, sem serem recriadas: texto, imagens e fontes mantêm a qualidade.",
        edge: "other",
      },
      {
        criterion: "Dados ocultos",
        cachety: CACHETY.hidden,
        other: "Uma ferramenta separada remove os metadados de um PDF.",
      },
      {
        criterion: "Aplicativos e uso offline",
        cachety: CACHETY.offline,
        other: "O PDF24 Creator leva todas as ferramentas para o uso offline, só no Windows. Ainda não há versão para Mac nem para Linux, nem app nas lojas de aplicativos de celular.",
      },
      {
        criterion: "Anúncios e rastreadores",
        cachety: CACHETY.ads,
        other: "As ferramentas online são financiadas por publicidade. A política de privacidade cita o Google AdSense e o Google Analytics.",
        edge: "cachety",
      },
    ],
    body: [
      { type: "h2", text: "Duas formas de usar o PDF24" },
      {
        type: "p",
        text: "As ferramentas online do PDF24 são grátis, não pedem cadastro e são financiadas por anúncios. Elas processam seus arquivos nos servidores do PDF24: a transferência é criptografada, e os arquivos são apagados depois de uma hora. O PDF24 é mantido por uma empresa com sede em Berlim.",
      },
      {
        type: "p",
        text: "O PDF24 Creator é diferente. É um programa grátis para Windows que leva todas as ferramentas do PDF24 para o seu PC, onde os arquivos ficam no próprio computador e não são enviados. Se você usa Windows e pode instalar programas, ele oferece a mesma privacidade do Cachety e mais recursos.",
      },
      { type: "h2", text: "Em que o PDF24 é melhor" },
      {
        type: "list",
        items: [
          "O PDF final mantém as páginas originais, então o texto continua selecionável e o arquivo continua leve.",
          "Aceita documentos do Word e outros arquivos, e oferece reconhecimento de texto (OCR).",
          "No Windows, o PDF24 Creator faz tudo isso offline, de graça.",
          "Você mesmo pode definir a resolução e a qualidade de imagem da compressão.",
        ],
      },
      { type: "h2", text: "Em que o Cachety é melhor" },
      {
        type: "list",
        items: [
          "Sem envio em qualquer aparelho: celular, Mac, computador com Linux ou PC em que você não pode instalar programas.",
          "Você escolhe um tamanho em megabytes, em vez de testar ajustes até o arquivo ficar pequeno o bastante.",
          "As fotos HEIC do iPhone são aceitas do jeito que estão.",
          "Os dados ocultos são removidos de todo arquivo, sem uma etapa separada.",
          "Sem anúncios e sem rastreadores.",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "Você usa Windows e pode instalar o PDF24 Creator: ele funciona offline e mantém as páginas originais.",
      "O texto do PDF final precisa continuar selecionável e pesquisável.",
      "Você precisa incluir documentos do Word ou reconhecer o texto de um documento escaneado.",
      "Você quer definir a resolução e a qualidade da imagem por conta própria.",
    ],
    chooseCachety: [
      "Você está no celular, no Mac ou num computador em que não pode instalar programas, e prefere não enviar seus documentos.",
      "Um formulário pede um único arquivo com menos de 1, 2, 5 ou 10 MB.",
      "Suas fotos vêm de um iPhone.",
    ],
    faq: [
      FAQ_UPLOADED(
        "PDF24",
        "Com as ferramentas online do PDF24, sim: os arquivos são processados nos servidores dele e apagados depois de uma hora. Com o PDF24 Creator no Windows, não: os arquivos ficam no seu PC."
      ),
      {
        q: "O PDF24 consegue comprimir um PDF para um tamanho determinado?",
        a: "Não diretamente. Você define a resolução e a qualidade da imagem, e o próprio guia do PDF24 diz que não existe uma opção “comprimir para 5 MB”. Com o Cachety você escolhe 1, 2, 5 ou 10 MB.",
      },
      {
        q: "O PDF24 funciona offline no Mac ou no celular?",
        a: "Não. O PDF24 Creator é só para Windows. No Mac ou no celular, o PDF24 oferece as ferramentas online, que processam os arquivos nos servidores dele. O Cachety funciona no navegador de qualquer aparelho, sem envio.",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "PDF24 Tools: juntar PDF", url: "https://tools.pdf24.org/en/merge-pdf" },
      { label: "PDF24 Tools: comprimir PDF", url: "https://tools.pdf24.org/en/compress-pdf" },
      { label: "PDF24 Tools: imagens para PDF", url: "https://tools.pdf24.org/en/images-to-pdf" },
      { label: "PDF24 Tools: remover metadados de PDF", url: "https://tools.pdf24.org/en/remove-pdf-metadata" },
      { label: "PDF24 Tools: perguntas e respostas", url: "https://tools.pdf24.org/en/faq" },
      { label: "PDF24 Creator", url: "https://tools.pdf24.org/en/creator" },
      { label: "Ajuda do PDF24: juntar arquivos PDF", url: "https://help.pdf24.org/en/how-to-merge-pdf-files-with-pdf24/" },
      { label: "Ajuda do PDF24: comprimir um PDF", url: "https://help.pdf24.org/en/compress-pdf-guide/" },
      { label: "Ajuda do PDF24: Mac, Linux e celulares", url: "https://help.pdf24.org/en/pdf24-for-mac-linux-portable/" },
      { label: "PDF24: política de privacidade", url: "https://www.pdf24.org/en/privacy-policy" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ────────────────────────────── Sejda ──────────────────────────────
  {
    tool: "dossier",
    slug: "cachety-vs-sejda-merge",
    competitor: "sejda-merge",
    competitorName: "Sejda",
    competitorUrl: "https://www.sejda.com/",
    title: "Cachety ou Sejda: juntar e comprimir PDFs sem enviar os arquivos",
    metaTitle: "Alternativa ao Sejda para juntar PDF sem upload",
    description:
      "O Sejda junta e comprime PDFs online, ou no seu computador com o aplicativo dele, dentro de limites grátis. O Cachety funciona no navegador, sem envio.",
    intro:
      "O Sejda é uma caixa de ferramentas de PDF holandesa com duas faces: ferramentas online que processam os arquivos nos servidores dele, e o Sejda Desktop, um aplicativo para Mac, Windows e Linux que os processa no seu computador. Os dois têm limites no uso grátis. O Cachety funciona no navegador de qualquer aparelho, não envia nada e não tem limite por hora nem por dia, mas faz um trabalho mais restrito.",
    verdict:
      "A ferramenta de juntar do Sejda é mais rica: mantém os marcadores, monta um sumário e pode imprimir o nome do arquivo no rodapé das páginas. O Sejda Desktop mantém os arquivos no seu computador. Escolha o Sejda quando precisar dessas opções. Escolha o Cachety para documentos pessoais no celular ou sem instalar nada, para arquivos acima dos limites grátis do Sejda e para um limite de tamanho dado em megabytes.",
    table: [
      {
        criterion: "Onde os arquivos são processados",
        cachety: CACHETY.where,
        other: "Online: enviados e processados nos servidores do Sejda. Sejda Desktop: no seu computador, sem envio.",
      },
      {
        criterion: "Por quanto tempo os arquivos ficam guardados",
        cachety: CACHETY.kept,
        other: "Online: apagados automaticamente depois de 2 horas. Um botão apaga antes.",
        edge: "cachety",
      },
      {
        criterion: "Conta, uso grátis e limites",
        cachety: CACHETY.free,
        other: "Sem cadastro. Juntar online grátis: até 50 páginas ou 50 MB, 3 tarefas por hora. Comprimir grátis: até 200 páginas ou 100 MB. Sejda Desktop grátis: 3 tarefas por dia. Um plano pago remove os limites.",
        edge: "cachety",
      },
      {
        criterion: "Colocar as páginas em ordem",
        cachety: CACHETY.pages,
        other: "Os arquivos são reordenados arrastando e soltando. Uma visualização de páginas exclui, reordena e duplica páginas antes de juntar.",
      },
      {
        criterion: "Ficar abaixo de um limite de tamanho",
        cachety: CACHETY.size,
        other: "Ajustes de qualidade de imagem e de resolução, com uma opção de tons de cinza. Não há um tamanho em megabytes para atingir.",
        edge: "cachety",
      },
      {
        criterion: "Tipos de arquivo aceitos",
        cachety: CACHETY.inputs,
        other: "PDFs e imagens como JPG e PNG na ferramenta de juntar. Imagens HEIC não são aceitas.",
      },
      {
        criterion: "Opções ao juntar",
        cachety: "Nenhuma além da ordem das páginas: sem marcadores, sem sumário.",
        other: "Marcadores mantidos ou criados por arquivo, um sumário, páginas em branco para impressão frente e verso, o nome do arquivo no rodapé.",
        edge: "other",
      },
      {
        criterion: "Dados ocultos",
        cachety: CACHETY.hidden,
        other: "Uma ferramenta separada edita os metadados de um PDF.",
      },
      {
        criterion: "Aplicativos e uso offline",
        cachety: CACHETY.offline,
        other: "O Sejda Desktop, para Mac, Windows e Linux, funciona offline, com os mesmos recursos do serviço online.",
      },
    ],
    body: [
      { type: "h2", text: "Online ou no seu computador: o Sejda oferece os dois" },
      {
        type: "p",
        text: "No site do Sejda, você envia seus documentos, e eles são processados nos servidores dele. O Sejda diz que os arquivos são criptografados em trânsito e em repouso, e apagados automaticamente depois de duas horas. O serviço grátis é limitado em páginas, megabytes e tarefas por hora.",
      },
      {
        type: "p",
        text: "O Sejda Desktop processa os arquivos no seu computador, sem envio, no Mac, no Windows e no Linux. A versão grátis permite três tarefas por dia. Um detalhe importa para documentos pessoais: os termos de serviço do Sejda dizem que os usuários não devem enviar ao serviço online informações pessoais sensíveis, como números de documentos de identificação emitidos pelo governo.",
      },
      { type: "h2", text: "Em que o Sejda é melhor" },
      {
        type: "list",
        items: [
          "Opções ao juntar que o Cachety não tem: marcadores, sumário, páginas em branco para impressão frente e verso.",
          "Um aplicativo para Mac, Windows e Linux que mantém os arquivos no seu computador.",
          "Muitas outras ferramentas no mesmo lugar: reconhecimento de texto (OCR), recorte, endireitamento de documentos escaneados, edição.",
          "Controle fino da compressão, com ajustes de qualidade de imagem e de resolução.",
        ],
      },
      { type: "h2", text: "Em que o Cachety é melhor" },
      {
        type: "list",
        items: [
          "Nada é enviado e nada é instalado, tanto no celular quanto no computador.",
          "Sem limite de 50 páginas e sem teto de tarefas por hora ou por dia: um arquivo de 60 páginas ou um quarto arquivo na mesma hora não é problema.",
          "Você escolhe um tamanho em megabytes e o Cachety avisa antes do download se dá para chegar a ele.",
          "As fotos HEIC do iPhone são aceitas do jeito que estão, e os dados ocultos são removidos de todo arquivo.",
        ],
      },
      ...PIXELS,
      ...HOW_TO,
    ],
    chooseOther: [
      "Você precisa de marcadores ou de um sumário no PDF final.",
      "Você pode instalar o Sejda Desktop e seu trabalho cabe nos limites grátis, ou você tem um plano pago.",
      "Você precisa de reconhecimento de texto, recorte ou endireitamento de documentos escaneados.",
    ],
    chooseCachety: [
      "Os arquivos são documentos de identidade, holerites ou extratos bancários, e você está no celular ou não pode instalar programas.",
      "Seu arquivo tem mais de 50 páginas, ou você tem vários arquivos para preparar na mesma hora.",
      "Um formulário pede um único arquivo com menos de 1, 2, 5 ou 10 MB.",
    ],
    faq: [
      FAQ_UPLOADED(
        "Sejda",
        "Com as ferramentas online do Sejda, sim: os arquivos são enviados para os servidores dele e apagados depois de duas horas. Com o Sejda Desktop, não: os arquivos são processados no seu computador."
      ),
      {
        q: "Quais são os limites grátis do Sejda para juntar PDFs?",
        a: "Online, documentos de até 50 páginas ou 50 MB e três tarefas por hora. A versão grátis do Sejda Desktop permite três tarefas por dia. O Cachety não tem esses limites: até 1.000 páginas num só arquivo.",
      },
      {
        q: "O Sejda consegue comprimir um PDF para um tamanho determinado?",
        a: "A ferramenta de comprimir dele oferece ajustes de qualidade de imagem e de resolução, não um tamanho para atingir. Com o Cachety você escolhe 1, 2, 5 ou 10 MB.",
      },
      FAQ_TEXT,
    ],
    sources: [
      { label: "Sejda: juntar PDF", url: "https://www.sejda.com/merge-pdf" },
      { label: "Sejda: comprimir PDF", url: "https://www.sejda.com/compress-pdf" },
      { label: "Sejda: JPG para PDF", url: "https://www.sejda.com/jpg-to-pdf" },
      { label: "Sejda: organizar páginas de PDF", url: "https://www.sejda.com/organize-pdf" },
      { label: "Sejda: editar metadados de PDF", url: "https://www.sejda.com/edit-pdf-metadata" },
      { label: "Sejda: preços e perguntas", url: "https://www.sejda.com/pricing" },
      { label: "Sejda Desktop", url: "https://www.sejda.com/desktop" },
      { label: "Segurança no Sejda", url: "https://www.sejda.com/security" },
      { label: "Sejda: política de privacidade", url: "https://www.sejda.com/privacy" },
      { label: "Sejda: termos de serviço", url: "https://www.sejda.com/terms" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },
];
