import type { SiteCopy } from "@/lib/site-copy";

// Textos do site em português do Brasil, tratamento por "você". Mesmas
// promessas que em inglês, nem uma a mais (cf. docs/security.md).

export const SITE_PT: SiteCopy = {
  nav: {
    tool: "A ferramenta",
    sign: "Assinar",
    about: "Por que uma marca d'água?",
    guides: "Guias",
    privacy: "Privacidade",
    menu: "Menu",
    close: "Fechar o menu",
    donate: "Doar",
    compare: "Comparativos",
    nameShort: "cachet (selo) + cacher (esconder)",
  },
  hero: {
    title: "Coloque marca d'água nos seus documentos sem enviá-los para lugar nenhum",
    lead: "RG, CNH, passaporte, holerite, extrato bancário: coloque uma marca d'água em segundos. Seus arquivos ficam no seu aparelho do começo ao fim.",
    pills: ["Grátis", "Sem cadastro", "Nada é enviado", "Feito na França"],
  },
  landing: {
    howTitle: "Como funciona",
    how: [
      {
        title: "Solte seu documento",
        body: "Um PDF ou uma foto, mesmo tirada com iPhone. Vários de uma vez, se precisar.",
      },
      {
        title: "Diga para que serve",
        body: "Por exemplo: \"Cadastro de aluguel, Imobiliária Horizonte, 11/10/2026\". Há modelos prontos.",
      },
      {
        title: "Confira e baixe",
        body: "A prévia mostra exatamente o que você vai receber. O arquivo com marca d'água é salvo no seu aparelho.",
      },
    ],
    trustTitle: "Seus documentos nunca saem do seu aparelho",
    trustLead:
      "A maioria dos sites de marca d'água envia seu documento de identidade para os servidores deles. O Cachety não: todo o trabalho é feito pelo seu navegador, no seu próprio celular ou computador.",
    trust: [
      {
        title: "Processado no seu aparelho",
        body: "Seus arquivos ficam na memória do seu aparelho. Feche a aba e tudo desaparece.",
      },
      {
        title: "Proteção embutida",
        body: "A página proíbe seu navegador de enviar dados para qualquer outro site. Mesmo que algo desse errado, seus arquivos não teriam como sair.",
      },
      {
        title: "Sem cadastro, sem rastreamento",
        body: "Sem conta, sem cookies de rastreamento, sem estatísticas de visitas, sem redes de anúncios.",
      },
      {
        title: "Código aberto e verificável",
        body: "O código é público. Qualquer pessoa pode ler, revisar ou hospedar a própria cópia do site.",
      },
    ],
    airplaneTitle: "Confira você mesmo: o teste do modo avião",
    airplaneBody:
      "Abra esta página e depois desligue a internet (modo avião). Solte um documento: o Cachety continua funcionando. É a prova de que nada passa pela internet.",
    featuresTitle: "Tudo o que você precisa para proteger uma cópia",
    features: [
      {
        title: "Marca d'água na página inteira",
        body: "Repetida na diagonal e incorporada à imagem: não sai só editando o PDF.",
      },
      {
        title: "Ocultar informações",
        body: "Esconda um número de conta, o CPF ou uma foto. O conteúdo é apagado de verdade, não só coberto.",
      },
      {
        title: "Um código único em cada cópia",
        body: "Ao editar o texto, inclua um código curto, diferente em cada cópia: se uma aparecer por aí, você sabe de onde ela saiu.",
      },
      {
        title: "Uma cópia por destinatário",
        body: "Adicione cada destinatário: cada um recebe a própria cópia, com o nome dele, num único download.",
      },
      {
        title: "Uma senha criada para você",
        body: "Proteja o arquivo com 12 palavras aleatórias, fáceis de ditar por telefone, e criptografia AES-256.",
      },
      {
        title: "Dados ocultos removidos",
        body: "O texto selecionável, os metadados e a localização GPS das fotos são apagados do arquivo final.",
      },
      {
        title: "Leve para qualquer site",
        body: "Se um site ou e-mail recusar o seu arquivo, diminua para 10, 5, 2 ou 1 MB.",
      },
      {
        title: "Funciona no celular",
        body: "iPhone e Android, inclusive fotos HEIC. Adicione o Cachety à tela inicial como um app.",
      },
    ],
    originTitle: "Grátis, de código aberto, feito na França",
    originBody:
      "O Cachety é software livre e gratuito (licença AGPL). O código é aberto para todos e vai continuar assim. Ele se baseia no Filigrane Local e no Filigraneur, dois projetos franceses de código aberto.",
    originBy: "Criado e mantido por",
    supportTitle: "Apoie o Cachety",
    supportBody:
      "O Cachety é grátis e vai continuar grátis. Mas ele exige tempo, e o domínio e as ferramentas de desenvolvimento custam dinheiro. Se o Cachety foi útil para você, uma pequena doação ajuda a mantê-lo.",
    supportCta: "Fazer uma doação",
    supportNote: "Opcional. O pagamento é feito no GitHub Sponsors, fora deste site.",
    faqTitle: "Perguntas frequentes",
    faq: [
      {
        q: "Meus arquivos são enviados para algum servidor?",
        a: "Não, nunca. O site nem tem um servidor capaz de receber um arquivo. Seu navegador faz todo o trabalho, e a página o impede tecnicamente de se conectar a qualquer outro site. O teste do modo avião comprova isso em dez segundos.",
      },
      {
        q: "É grátis mesmo? Qual é a pegadinha?",
        a: "Não tem pegadinha: sem cadastro, sem versão paga, sem coleta de dados. Como nada é processado num servidor, hospedar o site quase não custa nada, e o código aberto garante que ele vai continuar grátis. Para financiar o desenvolvimento, o Cachety conta com doações voluntárias e talvez um dia mostre alguns links patrocinados escolhidos a dedo (ferramentas de criptografia, software livre…). Nunca anúncios que rastreiam você, e nunca nada baseado nos seus documentos.",
      },
      {
        q: "Em quais arquivos posso colocar marca d'água?",
        a: "PDFs e imagens: JPG, PNG, fotos de iPhone (HEIC), WebP, GIF, BMP e AVIF. Até 200 MB por arquivo e 500 páginas por PDF, com vários arquivos de uma vez.",
      },
      {
        q: "Dá para tirar a marca d'água?",
        a: "Não com um editor de PDF: a marca d'água faz parte da imagem de cada página. Sendo honestos, nada impede alguém de fotografar ou adulterar um documento. A marca d'água desestimula o reaproveitamento e mostra de onde veio um vazamento.",
      },
      {
        q: "O que escrevo na marca d'água?",
        a: "Três coisas: para que serve a cópia, para quem você vai enviar e a data. Por exemplo: \"Cadastro de aluguel, Imobiliária Horizonte, 11/10/2026\".",
      },
      {
        q: "Funciona no celular?",
        a: "Sim, no iPhone e no Android. Abra cachety.com no navegador, toque na área de arquivos e escolha uma foto ou um PDF. Você também pode adicionar o Cachety à tela inicial.",
      },
    ],
    signLink: {
      title: "Tem um documento para assinar?",
      body: "Contrato de aluguel, declaração, orçamento: desenhe, digite ou importe sua assinatura e coloque no PDF. Aqui também nada é enviado.",
      cta: "Assinar um documento",
    },
    guidesTitle: "Guias práticos",
    guidesLead: "Ajuda passo a passo para situações do dia a dia.",
    guidesAll: "Todos os guias",
    backToTop: "Colocar uma marca d'água",
  },
  // Legal section and FAQ: draft translation from the English wording, awaiting native review (ROADMAP.md, backlog: Native review).
  sign: {
    hero: {
      title: "Assine um documento sem enviá-lo a lugar nenhum",
      lead: "Contrato de aluguel, declaração, orçamento, autorização: assine em segundos. O documento fica no seu aparelho do começo ao fim.",
      pills: ["Grátis", "Sem cadastro", "Nada é enviado", "Feito na França"],
    },
    howTitle: "Como funciona",
    how: [
      { title: "Solte seu documento", body: "Um PDF ou uma foto do documento, mesmo tirada com o celular. Vários de uma vez, se precisar." },
      { title: "Crie sua assinatura", body: "Desenhe com o dedo ou o mouse, digite seu nome ou importe uma foto da sua assinatura." },
      {
        title: "Posicione e baixe",
        body: "Arraste-a para o lugar certo. A prévia mostra exatamente o PDF assinado, que é salvo no seu aparelho.",
      },
    ],
    airplaneTitle: "Confira você mesmo: o teste do modo avião",
    airplaneBody:
      "Abra esta página e depois desligue a internet (modo avião). Solte um documento e assine: o Cachety continua funcionando. É a prova de que nada passa pela internet.",
    legal: {
      title: "Que valor tem esta assinatura?",
      p1: "Uma assinatura desenhada ou digitada e colocada no documento é o que a lei chama de assinatura eletrônica “simples”. Na União Europeia, uma assinatura não pode ser recusada só por ser eletrônica (Regulamento eIDAS, artigo 25). Na França, uma assinatura identifica o seu autor e mostra o seu consentimento; na forma eletrônica, deve basear-se em um processo confiável que a vincule ao documento (Código Civil, artigo 1367).",
      p2: "Para documentos do dia a dia, isso costuma bastar: papéis de aluguel, declarações, orçamentos, formulários de escola ou de associação. Em caso de contestação, cabe a você mostrar que é o autor; uma assinatura “qualificada” (com certificado de um prestador credenciado) tem uma presunção de confiabilidade que a assinatura simples não tem.",
      p3: "Não é a ferramenta certa quando se exige uma assinatura qualificada, ou quando a outra parte impõe uma plataforma específica: alguns contratos de empréstimo ou de seguro, escrituras em cartório, certos procedimentos oficiais. Nesse caso, use a ferramenta que pedirem.",
      note: "Isto não é aconselhamento jurídico. As regras para alguns documentos mudam de país para país. Esta tradução ainda aguarda revisão por um falante nativo.",
    },
    faqTitle: "Perguntas frequentes",
    faq: [
      {
        q: "Meu documento é enviado para algum servidor?",
        a: "Não, nunca. O site nem tem um servidor capaz de receber um arquivo. Seu navegador faz todo o trabalho, e a página o impede tecnicamente de se conectar a qualquer outro site. O teste do modo avião comprova isso em dez segundos.",
      },
      {
        q: "Minha assinatura fica salva?",
        a: "Não. Ela só existe na memória da aba. Feche a aba e ela desaparece.",
      },
      {
        q: "Minha assinatura pode ser removida ou reutilizada?",
        a: "Ela faz parte da imagem de cada página: não dá para movê-la ou apagá-la editando o PDF. Como acontece com uma assinatura em papel escaneada, alguém poderia recortá-la e colar em outro lugar. Para limitar esse risco, adicione uma marca d'água que vincule a cópia à sua finalidade e rubrique cada página.",
      },
      {
        q: "O texto do PDF assinado ainda pode ser selecionado?",
        a: "Não. Cada página é reconstruída a partir dos seus pixels, o que também remove texto oculto, metadados e a localização GPS das fotos. Seu original fica com você, intacto.",
      },
      {
        q: "Funciona no meu celular?",
        a: "Sim, no iPhone e no Android. Assine com o dedo ou, se preferir, importe uma foto.",
      },
    ],
    watermarkLink: {
      title: "Vai mandar também uma cópia do seu RG?",
      body: "RG, declaração de imposto, holerite: coloque uma marca d'água que limite a cópia a uma única finalidade. Mesmo site, mesma promessa: nada é enviado.",
      cta: "Colocar uma marca d'água",
    },
    backToTop: "Assinar um documento",
  },
  privacy: {
    title: "Privacidade e segurança",
    lead: "Seus documentos são pessoais. Aqui explicamos, com palavras simples, o que o Cachety faz e o que não faz, e como conferir isso você mesmo.",
    updated: "Atualizado em 12 de outubro de 2026",
    sections: [
      {
        title: "Resumindo",
        items: [
          "Seus arquivos nunca são enviados: quem processa é o seu navegador, no seu aparelho.",
          "Sem cadastro, sem cookies de rastreamento, sem estatísticas de visitas, sem redes de anúncios.",
          "Nada fica guardado: feche a aba e seus documentos somem da memória.",
          "O código é público e qualquer pessoa pode revisá-lo.",
        ],
      },
      {
        title: "O que acontece quando você solta um arquivo",
        paras: [
          "Seu navegador lê o arquivo na memória do seu aparelho. Cada página vira uma imagem, a marca d'água é desenhada por cima e um arquivo totalmente novo é criado. Quando você clica em Baixar, ele é salvo direto no seu aparelho.",
          "Em nenhum momento o arquivo, o texto da marca d'água, os nomes dos destinatários ou a senha passam pela internet.",
        ],
      },
      {
        title: "O que não coletamos",
        items: [
          "Seus documentos e as prévias deles.",
          "O texto da sua marca d'água e os nomes dos seus destinatários.",
          "Suas senhas.",
          "Sua identidade: não há conta nem formulário.",
          "Seus hábitos: nada de Google Analytics, pixel de anúncios ou cookie de rastreamento.",
        ],
      },
      {
        title: "O que fica salvo no seu aparelho",
        paras: [
          "Só as suas preferências: idioma, aparência da marca d'água e o tamanho máximo de arquivo que você escolheu. Elas ficam no seu navegador para você não ter que configurar tudo de novo. Nenhum arquivo, texto ou senha é guardado ali. Você pode apagá-las quando quiser, limpando os dados deste site no navegador.",
          "Para funcionar sem internet, seu navegador também guarda uma cópia das páginas do site (não dos seus documentos).",
        ],
      },
      {
        title: "Hospedagem e financiamento",
        paras: [
          "As páginas do site são entregues pela Cloudflare. Como qualquer serviço de hospedagem, ela vê tecnicamente os endereços IP dos visitantes e as páginas pedidas, para poder entregá-las. Ela nunca vê seus documentos, porque eles nunca são enviados.",
          "As doações passam pelo GitHub Sponsors, no próprio site do GitHub e sob a política de privacidade dele. O Cachety nunca vê seus dados de pagamento, e as páginas dele não têm nenhum formulário ou script de pagamento.",
          "Hoje não há anúncios no Cachety. Para o projeto seguir em frente, no futuro podem aparecer alguns links patrocinados, escolhidos a dedo e fiéis ao espírito do projeto: ferramentas de criptografia, software livre, envio seguro de documentos. Eles serão claramente identificados, entregues pelo próprio Cachety sem redes de anúncios nem scripts de terceiros, e nunca vão depender dos seus documentos. A política de segurança da página vai continuar proibindo qualquer conexão com outro site.",
        ],
      },
      {
        title: "Como conferir você mesmo",
        items: [
          "O teste do modo avião: abra o site, desligue a internet e coloque marca d'água num documento. Tudo funciona.",
          "O código-fonte é público: qualquer pessoa pode lê-lo, e testes automáticos verificam a cada mudança que nenhum dado consegue sair.",
          "Para os curiosos: a política de segurança da página (CSP) proíbe o navegador de se conectar a qualquer outro site.",
          "Prefere não confiar em ninguém? Você pode rodar o site no seu próprio computador ou servidor.",
        ],
      },
      {
        title: "Suas cópias, bem protegidas",
        items: [
          "As áreas ocultas são apagadas de verdade do arquivo, não só cobertas por um retângulo.",
          "O texto oculto, os metadados e a localização GPS das fotos são removidos.",
          "As senhas usam criptografia AES-256; depois de copiada, a senha é apagada da área de transferência em um minuto.",
          "Encontrou uma falha de segurança? Avise em particular pela página de segurança do repositório no GitHub.",
        ],
      },
      {
        title: "O que uma marca d'água não consegue fazer",
        paras: [
          "Uma marca d'água desestimula o reaproveitamento de uma cópia e ajuda a descobrir de onde veio um vazamento. Ela não impede ninguém de fotografar ou adulterar uma cópia. Envie só os documentos que realmente pedirem e oculte tudo o que não for necessário.",
        ],
      },
    ],
  },
  guidesUi: {
    title: "Guias práticos",
    lead: "Aluguel, banco, CNH, celular: como proteger seus documentos passo a passo, sem precisar entender de informática.",
    read: "Ler o guia",
    example: "Exemplo de marca d'água",
    faqTitle: "Perguntas frequentes",
    related: "Continue lendo",
    cta: "Colocar marca d'água no meu documento",
    ctaSign: "Assinar meu documento",
    ctaNote: "Grátis, sem cadastro. O documento nunca sai do seu aparelho.",
    updated: (d) => `Atualizado em ${d}`,
    allGuides: "Todos os guias",
  },
  compareUi: {
    title: "Cachety e outras ferramentas de marca d'água",
    lead: "Comparativos claros e verificados com as ferramentas mais usadas: para onde vão seus arquivos, quanto custa e quando outra ferramenta é a melhor escolha.",
    read: "Ler o comparativo",
    verdictTitle: "Resumindo",
    tableTitle: "Lado a lado",
    criterion: "Critério",
    edgeCachety: "Vantagem do Cachety",
    edgeOther: (n: string) => `Vantagem do ${n}`,
    chooseOther: (n: string) => `Quando o ${n} é a melhor escolha`,
    chooseCachety: "Quando o Cachety é a melhor escolha",
    sourcesTitle: "Fontes",
    checked: (d: string) =>
      `Informações conferidas em ${d} nas páginas públicas de cada empresa. Os serviços mudam: se algo não estiver mais correto, avise no GitHub e nós corrigimos.`,
    disclosure:
      "Escrito pelo autor do Cachety. Buscamos ser objetivos e justos: cada afirmação sobre outra ferramenta tem link para a fonte.",
    allComparisons: "Todos os comparativos",
    related: "Outros comparativos",
  },
  footer: {
    tagline: "Coloque marca d'água nos seus documentos sem que eles saiam do seu aparelho.",
    name: {
      pron: "/ka.ʃə.ti/",
      pos: "substantivo",
      def: "Do francês cachet, o selo que dá fé a um documento, e cacher, esconder. Um selo sobre o que você compartilha, um véu sobre o resto.",
    },
    support: "Apoie o projeto",
    madeIn: "Feito na França",
    by: "por",
    basedOn: "Baseado em",
    inspiredBy: "que por sua vez se inspira em",
    license: "Licença AGPL-3.0",
    source: "Código-fonte",
    free: "Serviço gratuito, sem rastreamento",
  },
};
