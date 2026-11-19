// Guias da ferramenta Dossier (pt): juntar PDFs, fotos em PDF, ordem e
// rotação das páginas, remoção de dados ocultos. Cada entrada leva tool: "dossier".
// Escritos para leitores no Brasil (pt-BR). Só texto puro: sem links, sem
// HTML, sem markdown. Nomes de exemplo inventados.
// Draft translation from the English guide, awaiting native review (ROADMAP.md, backlog: Native review).
//
// Estes guias descrevem a ferramenta Dossier (docs/prd-dossier.md) como foi
// entregue, com seções, endireitamento de fotos e tamanho personalizado. Os
// rótulos entre aspas (“Um único PDF”, “Um PDF por seção”, “Dividir em vários
// arquivos”, “Nova seção aqui”, “Endireitar e recortar”, “Aplicar”, “Deixar o
// fundo branco”, “Preto e branco”, “Aplicar a todas as fotos”, “Outro…”,
// “Desfazer”, “Recolocar as páginas”) foram conferidos com o bloco `dossier`
// de lib/locales/pt/strings.ts: manter tudo em sincronia.

import type { Guide } from "../types";

const UPDATED = "2026-11-19";

/** Endereço da ferramenta, escrito sem esquema (os guias não têm links). */
const TOOL = "cachety.com/pt/dossier";

const NOT_UPLOADED =
  "O Cachety funciona dentro do navegador. Não existe servidor que receba seus arquivos, e a página proíbe o navegador de se conectar a qualquer outro site. Você mesmo pode conferir: carregue a página, ative o modo avião, e ela continua funcionando. É grátis, sem conta, e o código é aberto.";

const PIXELS =
  "Para remover os dados ocultos, o Cachety refaz cada página como imagem. Por isso, o texto do novo PDF não pode ser selecionado nem pesquisado, e um PDF que só tinha texto pode sair maior que o original. Seus arquivos originais não são alterados: guarde-os.";

export const DOSSIER_GUIDES_PT: Guide[] = [
  // ------------------------------------------------------------------
  {
    slug: "juntar-pdf-sem-enviar-arquivos",
    topic: "merge",
    tool: "dossier",
    title: "Como juntar arquivos PDF num só sem enviá-los para nenhum site",
    metaTitle: "Juntar PDF sem enviar os arquivos, de graça",
    description:
      "Junte PDFs e fotos num único PDF no navegador. Ponha as páginas em ordem, respeite um limite de tamanho e não envie nada. Grátis, sem conta.",
    intro:
      "“Mande tudo num único PDF, por favor.” A maioria das ferramentas grátis para juntar PDFs começa enviando seus arquivos para os servidores delas. Quando os arquivos são seu RG, seus holerites e seus extratos bancários, existe outro caminho: fazer tudo no seu próprio aparelho.",
    example: "Cadastro de aluguel, Imobiliária Parque das Águas, 18/11/2026",
    body: [
      { type: "h2", text: "Por que juntar arquivos online não é pouca coisa" },
      {
        type: "p",
        text: "Os documentos que as pessoas juntam raramente são fotos de férias. São os papéis que a imobiliária, o banco, o empregador ou um órgão público pediu: documento de identidade, comprovante de renda, comprovante de residência. Mandar tudo de uma vez para um site que você mal conhece, só para juntar os arquivos, é um risco que você não precisa correr.",
      },
      { type: "h2", text: "Junte seus arquivos com o Cachety" },
      {
        type: "steps",
        items: [
          `Abra ${TOOL} no navegador, no computador ou no celular. Não precisa instalar nada nem criar conta.`,
          "Adicione seus arquivos: PDFs e fotos juntos (JPG, PNG, fotos HEIC do iPhone e outros). Cada foto vira uma página.",
          "Passe para as páginas. Cada página de cada arquivo aparece como uma miniatura. Arraste uma página para mudá-la de lugar, até de um documento para outro. Gire a página que estiver de lado e remova as que você não quer.",
          "Escolha “Um único PDF”. Se o site para onde você vai enviar tem limite de tamanho, escolha o limite: 1, 2, 5 ou 10 MB, ou “Outro…” para qualquer limite de 0,5 a 50 MB. Antes do download, o Cachety avisa se o arquivo vai caber e continuar legível.",
          "Confira a prévia, dê um nome ao arquivo e baixe.",
        ],
      },
      {
        type: "tip",
        text: "Antes de baixar, você pode ocultar um número de conta ou qualquer outro dado de que o destinatário não precisa. Num PDF que contém texto, o Cachety aponta os números que encontra, como o CPF, um número de cartão ou um IBAN. A área oculta é removida do arquivo, não só coberta.",
      },
      { type: "h2", text: "Um arquivo por tipo de documento" },
      {
        type: "p",
        text: "Alguns sites não querem um arquivo grande, e sim um arquivo por tipo de documento: documento de identidade, holerites, comprovante de residência. Marque “Dividir em vários arquivos”, depois abra o menu de uma página e escolha “Nova seção aqui” no ponto em que cada novo arquivo deve começar. Dê um nome a cada seção: ele vira o nome do arquivo. A opção “Um PDF por seção” fica então selecionada, e você baixa todos os arquivos de uma vez, num arquivo ZIP. O limite de tamanho passa a valer para cada arquivo.",
      },
      { type: "h2", text: "O que acontece com seus arquivos" },
      { type: "p", text: NOT_UPLOADED },
      { type: "h2", text: "Como é o novo PDF" },
      { type: "p", text: PIXELS },
      {
        type: "p",
        text: "O lado bom é que o novo arquivo carrega menos coisas que os originais: sem nome de autor, sem texto oculto, sem anexos e sem a localização GPS das suas fotos. O que o destinatário vê é tudo o que existe.",
      },
      {
        type: "warning",
        text: "Se você precisa que o texto do PDF final continue selecionável e pesquisável, num relatório ou num trabalho de faculdade, por exemplo, o Cachety não é a ferramenta certa. Use um programa instalado no computador que junte as páginas originais como elas são, como o app Pré-Visualização, no Mac.",
      },
      { type: "h2", text: "Alguns limites para conhecer" },
      {
        type: "list",
        items: [
          "Até 200 MB por arquivo, 500 páginas por PDF e 1.000 páginas no total.",
          "Arquivos do Word e do Excel não são aceitos: salve-os antes como PDF (Imprimir e, depois, Salvar como PDF).",
          "Um PDF protegido por senha pode ser adicionado: o Cachety pede a senha, no seu aparelho.",
          "A marca d'água e a senha no novo arquivo são opcionais, e ficam desligadas enquanto você não pedir.",
        ],
      },
    ],
    faq: [
      {
        q: "Meus PDFs são enviados para algum lugar para serem juntados?",
        a: "Não. Os arquivos são juntados no seu navegador, no seu aparelho. O Cachety não tem servidor que possa receber seus arquivos.",
      },
      {
        q: "Posso juntar PDFs e fotos no mesmo arquivo?",
        a: "Pode. Adicione PDFs e fotos misturados. Cada foto vira uma página, e você coloca todas as páginas na ordem que quiser.",
      },
      {
        q: "O texto continua selecionável depois de juntar?",
        a: "Não. Cada página é refeita como imagem, o que remove os dados ocultos. Se você precisa de texto selecionável, use um programa no computador que mantenha as páginas originais.",
      },
      {
        q: "Por que o arquivo final às vezes fica maior que os meus arquivos?",
        a: "Um PDF que só tinha texto é muito leve, e uma imagem da mesma página pesa mais. Escolha um tamanho máximo, e o Cachety reduz as páginas para caber.",
      },
      {
        q: "Funciona no celular?",
        a: "Sim, no iPhone e no Android, pelo navegador. Você move as páginas com o dedo.",
      },
    ],
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  {
    slug: "transformar-fotos-em-pdf-pelo-celular",
    topic: "photo-to-pdf",
    tool: "dossier",
    title: "Como transformar fotos de documentos em papel num único PDF pelo celular",
    metaTitle: "Transformar fotos em um PDF pelo celular, sem app",
    description:
      "Fotografe seus documentos em papel e transforme as fotos num único PDF no navegador do celular. Sem app, sem upload, e leve o bastante para um formulário.",
    intro:
      "Um site pede um PDF e você só tem o papel. Ou ele recusa a foto do seu iPhone por causa do formato. Você não precisa de scanner nem de app de digitalização: a câmera do celular e o navegador bastam.",
    example: "Matrícula na creche, Escola Girassol, 18/11/2026",
    body: [
      { type: "h2", text: "Tire fotos fáceis de ler" },
      {
        type: "list",
        items: [
          "Coloque a folha bem esticada sobre uma superfície lisa e escura, perto de uma janela. Evite o flash, que deixa uma mancha branca.",
          "Segure o celular reto, bem em cima da folha, para as bordas ficarem paralelas, e preencha o quadro com a página. Uma foto tirada meio de lado pode ser endireitada depois.",
          "Tire uma foto por página. Antes de passar para a próxima, confira se as letras miúdas estão nítidas.",
        ],
      },
      { type: "h2", text: "Das fotos a um único PDF" },
      {
        type: "steps",
        items: [
          `Abra ${TOOL} no navegador do celular. Não há app para instalar.`,
          "Toque na área de arquivos e escolha suas fotos. As fotos do iPhone em formato HEIC funcionam do jeito que estão.",
          "Passe para as páginas. Cada foto virou uma página. Gire as que estiverem de lado e arraste para colocar na ordem certa.",
          "Se a foto saiu torta ou mostra a mesa em volta da folha, toque na página e escolha “Endireitar e recortar”. Coloque cada canto num canto da folha e escolha “Aplicar”.",
          "No mesmo lugar, “Deixar o fundo branco” transforma o papel acinzentado em branco, e “Preto e branco” tira a cor. A página fica mais fácil de ler e bem mais leve. “Aplicar a todas as fotos” faz isso em todas as fotos de uma vez.",
          "Escolha “Um único PDF” e, se o formulário tem limite de tamanho, escolha 1, 2, 5 ou 10 MB, ou “Outro…” para outro limite.",
          "Confira a prévia e baixe o PDF. Ele fica salvo no celular, pronto para anexar.",
        ],
      },
      {
        type: "tip",
        text: "Você pode misturar fotos com PDFs que já tem, como um holerite que você baixou. Tudo vai para um arquivo só, na ordem que você escolher.",
      },
      { type: "h2", text: "Por que o formulário recusou sua foto" },
      {
        type: "p",
        text: "Formulários online muitas vezes só aceitam PDF, JPG ou PNG e limitam o tamanho a poucos megabytes. A foto de um celular recente pode pesar mais que isso, e o iPhone salva as fotos em HEIC, um formato que muitos sites não leem. Transformar as fotos num único PDF com limite de tamanho resolve os dois problemas de uma vez.",
      },
      { type: "h2", text: "Suas fotos ficam no celular" },
      { type: "p", text: NOT_UPLOADED },
      {
        type: "p",
        text: "Uma foto também guarda onde e quando foi tirada, e com qual celular. O Cachety refaz cada página como uma imagem nova, então essas informações ocultas, inclusive a localização GPS, não estão no PDF que você envia.",
      },
      {
        type: "warning",
        text: "Um limite de tamanho muito pequeno e muitas páginas de foto nem sempre combinam. Se o arquivo não puder caber e continuar legível, o Cachety avisa antes do download. Tente primeiro “Preto e branco”; depois remova algumas páginas, divida o arquivo em vários ou escolha um tamanho maior, se o site permitir.",
      },
    ],
    faq: [
      {
        q: "Preciso de um app de scanner?",
        a: "Não. Tire as fotos com a câmera do celular e abra o Cachety no navegador. Nada é instalado.",
      },
      {
        q: "As fotos do iPhone (HEIC) funcionam?",
        a: "Sim. As fotos HEIC são lidas no seu aparelho e viram páginas do PDF, como qualquer outra foto.",
      },
      {
        q: "Minhas fotos são enviadas para algum lugar?",
        a: "Não. Tudo acontece no navegador do celular. Não existe servidor que receba suas fotos.",
      },
      {
        q: "Dá para pesquisar ou copiar o texto do PDF?",
        a: "Não. As páginas são imagens: o Cachety não lê o texto de uma foto. Para um formulário que pede um PDF, isso raramente é um problema.",
      },
    ],
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  {
    slug: "girar-reordenar-excluir-paginas-pdf",
    topic: "pdf-pages",
    tool: "dossier",
    title: "Como girar, reordenar ou excluir páginas de um PDF sem enviá-lo para nenhum site",
    metaTitle: "Girar, reordenar ou excluir páginas de PDF, sem upload",
    description:
      "Gire uma página de lado, mude a ordem das páginas ou remova páginas de um PDF no navegador. Grátis, sem conta, e o arquivo nunca sai do seu aparelho.",
    intro:
      "Um escaneamento que saiu de cabeça para baixo, uma página em branco no meio, um contrato do qual você só precisa das páginas 1 e 7: são ajustes pequenos, mas a maioria das ferramentas grátis quer que você envie o documento inteiro primeiro. Veja como fazer isso no seu próprio aparelho.",
    example: "Financiamento imobiliário, Banco Serra Dourada, 18/11/2026",
    body: [
      { type: "h2", text: "Arrume as páginas com o Cachety" },
      {
        type: "steps",
        items: [
          `Abra ${TOOL} no navegador, no computador ou no celular.`,
          "Adicione seu PDF. Você pode adicionar vários arquivos, e fotos também.",
          "Passe para as páginas. Cada página aparece como uma miniatura, na ordem do arquivo final.",
          "Arraste uma página para mudá-la de lugar. Use o botão de girar para virá-la um quarto de volta por vez. Use o botão de remover para tirá-la. Se remover a página errada, “Desfazer” traz a página de volta: o botão aparece por alguns segundos. No celular, toque numa página para ver as mesmas ações num menu.",
          "Escolha “Um único PDF”, confira a prévia e baixe.",
        ],
      },
      {
        type: "tip",
        text: "No computador, dá para fazer tudo pelo teclado: Alt e as setas movem a página selecionada, R gira e Delete remove.",
      },
      { type: "h2", text: "Um giro de verdade, não um ajuste de exibição" },
      {
        type: "p",
        text: "Muitas ferramentas só acrescentam ao PDF uma anotação dizendo “mostre esta página girada”. Alguns leitores de PDF ignoram essa anotação, e a página aparece de lado outra vez para quem recebe. O Cachety refaz a página na posição certa, então ela fica igual em qualquer lugar.",
      },
      { type: "h2", text: "As páginas removidas somem de verdade" },
      {
        type: "p",
        text: "Quando você tira uma página, ela simplesmente não está no novo arquivo. O mesmo vale para o que você não vê num PDF: texto oculto, anexos, o nome do autor. O novo arquivo é feito com o que aparece em cada página, e nada mais.",
      },
      { type: "h2", text: "O que esperar do resultado" },
      { type: "p", text: PIXELS },
      {
        type: "warning",
        text: "Se você precisa manter o texto selecionável, os marcadores ou os campos de formulário, use um programa instalado no computador que edite as páginas originais, como o app Pré-Visualização, no Mac.",
      },
      { type: "h2", text: "Nada é enviado" },
      { type: "p", text: NOT_UPLOADED },
    ],
    faq: [
      {
        q: "Posso girar só uma página do PDF?",
        a: "Pode. Cada página tem o próprio botão de girar. As outras páginas não mudam.",
      },
      {
        q: "Posso passar uma página de um PDF para outro?",
        a: "Pode. Adicione os dois arquivos: todas as páginas aparecem juntas e podem ser movidas livremente, e depois salvas num único PDF.",
      },
      {
        q: "Dá para recuperar uma página removida?",
        a: "Sim, com “Desfazer”, que aparece por alguns segundos depois que você remove uma página. Se você removeu todas as páginas de um documento, “Recolocar as páginas” aparece ao lado dele na lista. Passado esse momento, adicione o arquivo de novo: seu arquivo original nunca é alterado.",
      },
      {
        q: "Meu PDF é enviado para algum lugar?",
        a: "Não. As páginas são mostradas e refeitas no seu navegador. Não existe servidor que receba seu arquivo.",
      },
    ],
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  {
    slug: "remover-metadados-pdf-foto",
    topic: "metadata",
    tool: "dossier",
    title: "Como remover metadados e dados ocultos de um PDF ou de uma foto antes de enviar",
    metaTitle: "Remover metadados de PDF ou foto, sem upload",
    description:
      "Um PDF ou uma foto carrega mais do que você vê: autor, datas, texto oculto, localização GPS. Remova tudo antes de enviar, no navegador, sem upload.",
    intro:
      "O arquivo que você envia diz mais do que a página mostra. Um PDF pode trazer o nome do autor e o programa que o criou, e guardar um texto que você achava ter apagado. Uma foto pode dizer exatamente onde foi tirada. Veja o que se esconde num arquivo e como enviar uma cópia limpa.",
    example: "Aviso de sinistro, Seguradora Monte Verde, 18/11/2026",
    body: [
      { type: "h2", text: "O que um arquivo carrega sem avisar" },
      {
        type: "list",
        items: [
          "Num PDF: o nome do autor, o título, o programa usado, as datas de criação e de alteração.",
          "Também num PDF: uma camada de texto selecionável, comentários, links, arquivos anexados, dados de formulário e, às vezes, o texto que ficou debaixo de uma tarja preta.",
          "Numa foto: a data, a marca do celular e, muitas vezes, a localização GPS do lugar onde foi tirada.",
        ],
      },
      {
        type: "p",
        text: "Nada disso aparece quando você olha a página. Tudo isso pode ser lido em poucos cliques por quem recebe o arquivo, ou por qualquer pessoa para quem ele for encaminhado.",
      },
      { type: "h2", text: "Faça uma cópia limpa com o Cachety" },
      {
        type: "steps",
        items: [
          `Abra ${TOOL} no navegador. Não precisa de conta.`,
          "Adicione seu PDF ou suas fotos.",
          "Passe para as páginas e confira se estão na ordem certa. Remova as que você não quer enviar.",
          "Escolha “Um único PDF” e baixe.",
          "Envie o novo arquivo, não o original.",
        ],
      },
      { type: "h2", text: "Como a limpeza funciona" },
      {
        type: "p",
        text: "O Cachety não tenta achar e apagar cada dado oculto, um por um. Ele refaz cada página como uma imagem do que você vê e monta um novo PDF com essas imagens. O que não estava visível na página não está no novo arquivo: nem autor, nem texto oculto, nem anexo, nem script, nem link, nem localização GPS.",
      },
      {
        type: "tip",
        text: "Para conferir um arquivo, abra as propriedades dele no seu leitor de PDF e tente selecionar o texto de uma página. Numa cópia feita pelo Cachety, as propriedades estão vazias e nada pode ser selecionado.",
      },
      { type: "h2", text: "O preço a pagar" },
      { type: "p", text: PIXELS },
      {
        type: "warning",
        text: "Limpar um arquivo remove o que está escondido, não o que está impresso na página. Um nome, um número de conta ou um código de barras visível continua lá. Oculte esses dados antes de baixar: a área oculta é removida de verdade.",
      },
      { type: "h2", text: "Seu arquivo não é enviado para ser limpo" },
      { type: "p", text: NOT_UPLOADED },
    ],
    faq: [
      {
        q: "Ele remove a localização GPS das minhas fotos?",
        a: "Sim. A página é refeita como uma imagem nova dentro de um PDF, e as informações ocultas da foto, inclusive a localização, não vão junto.",
      },
      {
        q: "Ele remove o nome do autor de um PDF?",
        a: "Sim. O novo PDF é feito com imagens das páginas e não leva as propriedades do arquivo original.",
      },
      {
        q: "Posso manter o texto selecionável e remover só os metadados?",
        a: "Com o Cachety, não. Ele remove todos os dados ocultos refazendo as páginas como imagens. Para manter o texto selecionável, use o recurso de remover informações ocultas de um editor de PDF no computador.",
      },
      {
        q: "O resultado é um PDF ou uma foto?",
        a: "Um PDF. Cada foto vira uma página do PDF.",
      },
    ],
    updated: UPDATED,
  },
];
