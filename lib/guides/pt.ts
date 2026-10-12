import type { Guide } from "./types";

// Guias em português do Brasil. Não são traduções: são equivalentes locais
// (RG e CIN, CNH, aluguel com imobiliária, holerite e Imposto de Renda, selfie
// com documento, golpes). Fatos conferidos em 2026-10-12: CIN com o CPF como
// número único e RG antigo válido até 1º de março de 2032; app CNH do Brasil
// (antiga Carteira Digital de Trânsito); Registrato e BC Protege+ do Banco
// Central. Só texto puro: sem links, sem HTML, sem markdown. Empresas e nomes
// de exemplo inventados.

export const GUIDES_PT: Guide[] = [
  // ───────────────────────────── Aluguel ─────────────────────────────
  {
    slug: "marca-dagua-documentos-aluguel-imobiliaria",
    topic: "rental",
    title: "Como colocar marca d'água no RG, holerite e documentos para alugar com imobiliária",
    metaTitle: "Marca d'água nos documentos para alugar imóvel",
    description:
      "Vai alugar? Coloque marca d'água no RG ou CNH, holerites e Imposto de Renda antes de mandar para a imobiliária. Grátis e sem enviar a nenhum site.",
    intro:
      "Para alugar um imóvel, a imobiliária quase sempre pede a mesma pasta: documento com foto, CPF, comprovante de residência, os últimos holerites e às vezes a declaração do Imposto de Renda. Uma marca d'água deixa claro para quem era cada cópia e torna esses papéis muito menos úteis para qualquer outra pessoa.",
    example: "Cadastro de aluguel, Imobiliária Horizonte, 11/10/2026",
    body: [
      { type: "h2", text: "Por que pedem tantos documentos" },
      {
        type: "p",
        text: "A imobiliária e o proprietário querem saber quem você é e se a sua renda cobre o aluguel. Muitas usam a regra de que o aluguel não deve passar de cerca de 30% da renda. Por isso pedem RG ou CNH, comprovante de renda (os três últimos holerites, a carteira de trabalho ou a declaração do IR com o recibo de entrega) e, muitas vezes, os mesmos papéis do fiador. Se o contrato tiver seguro-fiança ou título de capitalização, seus documentos ainda passam por uma seguradora. Cada cópia a mais é uma chance a mais de algo dar errado.",
      },
      { type: "h2", text: "O golpe do aluguel que não existe" },
      {
        type: "p",
        text: "É um golpe muito comum. Alguém anuncia um imóvel bonito por um preço bem abaixo do bairro, muitas vezes com fotos copiadas de um anúncio verdadeiro. O contato vai rápido para o WhatsApp, o suposto dono diz que está viajando, que tem fila de interessados, e pede seus documentos e um Pix para “garantir a reserva”. O imóvel não existe, e seus documentos podem servir para abrir contas ou pedir crédito no seu nome. Com uma marca d'água que diz “Cadastro de aluguel, Imobiliária Horizonte”, essa cópia vale muito pouco para outra coisa.",
      },
      {
        type: "warning",
        text: "Desconfie de quem pede documentos ou Pix antes de você visitar o imóvel. Confira se o corretor ou a imobiliária tem registro ativo no CRECI do seu estado. Se caiu num golpe, avise seu banco na hora e registre um boletim de ocorrência; em muitos estados dá para fazer pela delegacia online.",
      },
      { type: "h2", text: "Como fazer com o Cachety" },
      {
        type: "steps",
        items: [
          "Abra cachety.com no navegador. Não precisa instalar nada nem criar conta.",
          "Solte seus arquivos na página ou toque nela para escolher. Você pode adicionar de uma vez o RG, os holerites e o comprovante de residência.",
          "Em “Para que serve esta cópia?”, escreva o motivo ou escolha o exemplo Aluguel em “Ou escolha um:”. Em “Quem vai receber?”, coloque o nome da imobiliária. A data entra sozinha.",
          "Confira a prévia: o texto se repete na diagonal em todas as páginas.",
          "Baixe as cópias com marca d'água e envie essas, nunca os originais.",
        ],
      },
      {
        type: "p",
        text: "Seus arquivos não saem do seu aparelho. O Cachety funciona dentro do navegador: não existe servidor que receba seus documentos. Depois que a página carrega, você pode até ativar o modo avião, e ela continua funcionando.",
      },
      {
        type: "tip",
        text: "Está vendo vários imóveis ao mesmo tempo? Adicione cada imobiliária com “+ Adicionar outro destinatário”: cada uma recebe a sua própria cópia, com o nome dela. Se uma cópia aparecer onde não devia, você sabe de onde ela saiu.",
      },
      { type: "h2", text: "Oculte o que eles não precisam ver" },
      {
        type: "p",
        text: "Para conferir sua renda, a imobiliária precisa ver o seu salário, não cada compra do mês. Se mandar extrato bancário, toque em “Ocultar algo” embaixo da prévia, desenhe retângulos sobre as movimentações que não interessam e toque em “Concluir”. O que você oculta é apagado de verdade do arquivo, não só coberto. Lembre também: a marca d'água desestimula o mau uso e ajuda a rastrear um vazamento, mas não o torna impossível. Alguém sempre pode fotografar um documento.",
      },
    ],
    faq: [
      {
        q: "A imobiliária vai aceitar um RG com marca d'água?",
        a: "Na grande maioria dos casos, sim. A marca d'água é semitransparente, então seus dados continuam legíveis. Se precisarem conferir o original, vão pedir pessoalmente ou na assinatura do contrato; a cópia com marca d'água é para o que você manda por e-mail, WhatsApp ou formulário.",
      },
      {
        q: "O que escrevo na marca d'água?",
        a: "Três coisas: para que serve, para quem e a data. Por exemplo: Cadastro de aluguel, Imobiliária Horizonte, 11/10/2026.",
      },
      {
        q: "Também posso usar para os documentos do fiador?",
        a: "Pode e deve. O ideal é o próprio fiador colocar a marca d'água nos documentos dele antes de mandar para você ou para a imobiliária.",
      },
      {
        q: "O Cachety é grátis mesmo?",
        a: "Sim. É grátis, sem cadastro e sem rastreamento. É um software de código aberto feito na França por Amir Moradi.",
      },
    ],
    updated: "2026-10-12",
  },

  // ───────────────────────────── RG e CIN ─────────────────────────────
  {
    slug: "marca-dagua-rg-cin",
    topic: "id-card",
    title: "Como colocar marca d'água na cópia do RG ou da nova Carteira de Identidade (CIN)",
    metaTitle: "Como colocar marca d'água no RG ou na CIN",
    description:
      "Proteja a cópia do seu RG ou da nova Carteira de Identidade Nacional com uma marca d'água antes de enviar. Grátis, sem cadastro e sem sair do celular.",
    intro:
      "Uma foto nítida do seu RG é exatamente o que um golpista procura. Colocar uma marca d'água antes de enviar leva um minuto e torna a cópia bem mais difícil de aproveitar, seja o RG antigo ou a nova Carteira de Identidade Nacional.",
    example: "Abertura de conta, Banco Aurora, 11/10/2026",
    body: [
      { type: "h2", text: "RG antigo ou CIN: o cuidado é o mesmo" },
      {
        type: "p",
        text: "A Carteira de Identidade Nacional (CIN) está substituindo o RG estadual. Ela usa o CPF como número único em todo o país e tem versão física e digital, no app gov.br. O RG no modelo antigo continua valendo até 1º de março de 2032, então os dois vão circular por muitos anos. Em qualquer um deles estão seu nome completo, o número do documento, a data de nascimento, a filiação, a foto e a assinatura. E na CIN, o próprio número do documento é o seu CPF.",
      },
      {
        type: "p",
        text: "Pedem cópia do RG o banco, a empresa que vai contratar você, a operadora de celular, a academia, a escola dos filhos e o contador. Depois que você envia, não controla mais onde a cópia fica nem quem a vê. Uma cópia sem marca serve para qualquer coisa. Uma cópia com marca d'água diz para quem era, para quê e quando.",
      },
      { type: "h2", text: "Como é uma boa marca d'água" },
      {
        type: "list",
        items: [
          "Finalidade: abertura de conta, cadastro de aluguel, admissão no emprego.",
          "Destinatário: o nome da empresa ou da pessoa.",
          "Data: o dia do envio, para que uma cópia antiga não passe por nova.",
        ],
      },
      {
        type: "p",
        text: "Evite escrever só “CÓPIA”: isso não diz onde a cópia deveria ter ficado. E seja breve: a marca d'água aceita até 120 caracteres, mas uma dúzia de palavras basta.",
      },
      { type: "h2", text: "Passo a passo com o Cachety" },
      {
        type: "steps",
        items: [
          "Abra cachety.com no computador ou no celular.",
          "Solte uma foto ou um escaneamento do seu RG ou da CIN. Fotos de iPhone (HEIC) também funcionam.",
          "Diga para que serve a cópia (escreva ou escolha um exemplo) e quem vai receber. A data entra sozinha.",
          "Confira a prévia. Veja se sua foto e seus dados continuam legíveis através da marca.",
          "Baixe a cópia com marca d'água e anexe essa ao e-mail ou à conversa.",
        ],
      },
      { type: "h2", text: "Frente e verso num só arquivo" },
      {
        type: "p",
        text: "Se pedirem os dois lados, adicione as duas fotos de uma vez e baixe tudo junto num único PDF. Você escolhe a ordem, para a frente vir primeiro. Antes de baixar, você vê o tamanho do arquivo; se o site onde você precisa enviar limita o tamanho, toque em “Diminuir o tamanho” e escolha 10, 5, 2 ou 1 MB.",
      },
      {
        type: "tip",
        text: "O Cachety também apaga os dados escondidos do arquivo final, como a localização GPS que as fotos do celular guardam. Assim, sua cópia não revela sem querer onde você mora.",
      },
      {
        type: "p",
        text: "Tudo acontece no seu próprio aparelho: seu RG não é enviado para lugar nenhum, porque não existe servidor para recebê-lo. Lembre que a marca d'água desestimula o mau uso e ajuda a rastrear um vazamento, mas não impede ninguém de fotografar o documento. Se perder o RG ou desconfiar que estão usando seus dados, registre um boletim de ocorrência e avise seu banco.",
      },
    ],
    faq: [
      {
        q: "É seguro mandar foto do RG pelo WhatsApp?",
        a: "É comum, mas faça isso só com quem você confirmou ser de confiança e só quando realmente precisarem. Antes, coloque uma marca d'água para que a cópia fique presa a esse único uso.",
      },
      {
        q: "A marca d'água vai deixar meu RG ilegível?",
        a: "Não. Em “Ajustar a marca d'água” você escolhe Suave, Normal ou Forte, e o resto (tamanho, cor, opacidade) fica em “Mais ajustes”. A prévia mostra exatamente o que o destinatário vai ver antes de você baixar.",
      },
      {
        q: "Funciona com a CIN digital do app gov.br?",
        a: "Sim, se você tiver o documento como imagem ou PDF, por exemplo um print da tela. Coloque a marca d'água nesse arquivo antes de enviar. Quando um serviço pede para validar a CIN pelo QR Code ou pelo próprio app, aí não é preciso mandar cópia.",
      },
      {
        q: "Uma empresa pode exigir cópia do meu documento?",
        a: "Muitas pedem, e às vezes há motivo, como abrir uma conta ou assinar um contrato. Pela LGPD, a empresa deve tratar só os dados necessários para a finalidade. Você pode perguntar para que serve a cópia e por quanto tempo ela fica guardada.",
      },
    ],
    updated: "2026-10-12",
  },

  // ───────────────────────────── CNH ─────────────────────────────
  {
    slug: "marca-dagua-cnh",
    topic: "drivers-license",
    title: "Como colocar marca d'água na cópia da CNH antes de enviar",
    metaTitle: "Marca d'água na CNH: proteja a cópia da carteira",
    description:
      "A CNH reúne foto, CPF, RG e filiação num só documento. Veja como colocar marca d'água na cópia antes de mandar, grátis e sem enviar a nenhum servidor.",
    intro:
      "Muita gente usa a CNH como documento de identidade para tudo: aluguel, emprego, banco, locadora de carros. Só que ela reúne num único papel quase todos os seus dados. Por isso vale a pena colocar uma marca d'água em cada cópia que você manda.",
    example: "Locação de veículo, Locadora Rota Sul, 11/10/2026",
    body: [
      { type: "h2", text: "Por que a cópia da CNH é tão visada" },
      {
        type: "p",
        text: "Na CNH aparecem seu nome, a foto, a assinatura, a data de nascimento, o nome dos pais, o número do CPF e o do RG, além do número de registro da habilitação. Para um golpista, é um pacote completo: dá para tentar abrir conta, contratar crediário ou linha de celular no seu nome. Uma cópia com marca d'água, dizendo para quem e para quê foi enviada, perde muito do valor para quem quer reaproveitá-la.",
      },
      { type: "h2", text: "CNH física ou digital" },
      {
        type: "p",
        text: "A CNH digital fica no app CNH do Brasil, o antigo aplicativo Carteira Digital de Trânsito. Quando alguém confere a carteira pessoalmente, você mostra no próprio app e não precisa mandar nada. Quando pedem uma cópia por e-mail, WhatsApp ou formulário, mande uma foto ou um PDF com marca d'água, nunca o arquivo puro.",
      },
      { type: "h2", text: "Passo a passo com o Cachety" },
      {
        type: "steps",
        items: [
          "Fotografe a CNH aberta sobre uma mesa, com boa luz e sem reflexo, ou use um print da CNH digital.",
          "Abra cachety.com e solte a foto ou o PDF na página.",
          "Diga para que serve a cópia e quem vai receber. Por exemplo: Locação de veículo, para a Locadora Rota Sul. A data entra sozinha.",
          "Confira na prévia que tudo continua legível. Se precisar, toque em “Ajustar a marca d'água” e escolha Suave.",
          "Baixe a cópia com marca d'água e envie essa.",
        ],
      },
      {
        type: "tip",
        text: "Se o destinatário só precisa confirmar que você é habilitado, pergunte se pode ocultar alguns dados, como o número do RG ou a filiação. Toque em “Ocultar algo” embaixo da prévia e desenhe um retângulo sobre eles: o que você oculta é apagado do arquivo.",
      },
      {
        type: "warning",
        text: "Cuidado com mensagens sobre multa, renovação ou suspensão da CNH com link para pagar ou “regularizar”. Os serviços oficiais estão no app CNH do Brasil, no gov.br e no site do Detran do seu estado. Nunca mande foto da CNH para quem entrou em contato com você do nada.",
      },
      {
        type: "p",
        text: "O Cachety faz tudo dentro do seu navegador. A foto da sua CNH não sai do celular ou do computador. Faça o teste: carregue a página, ative o modo avião e coloque a marca d'água. Funciona igual.",
      },
    ],
    faq: [
      {
        q: "A locadora ou a empresa aceita CNH com marca d'água?",
        a: "Para a cópia enviada à distância, normalmente sim, porque os dados continuam legíveis. Na retirada do carro ou na admissão, eles costumam conferir o documento original ou a CNH digital no app.",
      },
      {
        q: "Posso usar a CNH no lugar do RG?",
        a: "Sim, a CNH vale como documento de identidade com foto no Brasil. Por isso mesmo a cópia dela merece o mesmo cuidado que a do RG.",
      },
      {
        q: "Perdi minha CNH. E agora?",
        a: "Registre um boletim de ocorrência, peça a segunda via pelo Detran ou pelo app CNH do Brasil e fique de olho em contas abertas no seu nome pelo Registrato, do Banco Central.",
      },
    ],
    updated: "2026-10-12",
  },

  // ───────────────────────────── Holerite e IR ─────────────────────────────
  {
    slug: "enviar-holerite-imposto-de-renda-com-seguranca",
    topic: "tax-payslip",
    title: "Como enviar holerite e declaração do Imposto de Renda com mais segurança",
    metaTitle: "Enviar holerite e Imposto de Renda com segurança",
    description:
      "Holerite e declaração do IR mostram salário, CPF, conta e bens. Coloque marca d'água e oculte o que não precisam ver antes de enviar. Grátis.",
    intro:
      "Holerite e declaração do Imposto de Renda são pedidos o tempo todo como comprovante de renda: aluguel, financiamento, crediário, cartão. São também dos documentos que mais revelam sobre você. Dá para enviar só o necessário, e com marca d'água.",
    example: "Comprovação de renda, Financeira Vale Verde, 11/10/2026",
    body: [
      { type: "h2", text: "O que esses documentos revelam" },
      {
        type: "p",
        text: "O holerite, ou contracheque, mostra seu nome, CPF, cargo, salário, descontos, a empresa onde você trabalha e às vezes o banco e a conta onde o salário cai. A declaração do IR vai muito além: dependentes, bens, contas bancárias, rendimentos e dívidas. É informação de sobra para um golpista montar uma história convincente, como ligar fingindo ser do seu banco ou do RH da sua empresa.",
      },
      { type: "h2", text: "Envie só o que pedirem" },
      {
        type: "list",
        items: [
          "Pergunte quantos holerites são necessários. Normalmente são os três últimos.",
          "Para o IR, pergunte se bastam o recibo de entrega e as páginas de identificação e de rendimentos, em vez da declaração inteira.",
          "Se mandar extrato bancário, oculte as movimentações que não têm relação com a renda.",
          "Para cada destinatário, uma cópia com o nome dele na marca d'água.",
        ],
      },
      { type: "h2", text: "Passo a passo com o Cachety" },
      {
        type: "steps",
        items: [
          "Abra cachety.com e solte os PDFs dos holerites e da declaração. Pode ser vários de uma vez.",
          "Em “Ou escolha um:”, toque no exemplo Financiamento, Aluguel ou Imposto de renda, ou escreva o seu texto. Depois coloque o nome do destinatário. A data entra sozinha.",
          "Embaixo da prévia, toque em “Ocultar algo” e desenhe retângulos sobre o que não precisam ver, como número da conta ou bens que não vêm ao caso. Depois toque em “Concluir”.",
          "Confira a prévia página por página.",
          "Em “Antes de baixar”, escolha “Um único PDF”, na ordem que você quiser, ou “Arquivos separados (ZIP)”, e baixe.",
        ],
      },
      {
        type: "tip",
        text: "Quer mais proteção? Marque “Proteger com senha” (criptografia AES-256): o Cachety cria uma senha fácil de ler, de 12 palavras, e mostra depois do download. Passe a senha por outro canal, por exemplo por telefone, nunca na mesma mensagem do arquivo.",
      },
      {
        type: "p",
        text: "O Cachety refaz cada página a partir da imagem: o texto selecionável e os metadados do PDF original somem do arquivo final, e o que você ocultou não pode ser recuperado. E nada disso passa pela internet: o processamento acontece no seu navegador.",
      },
      {
        type: "warning",
        text: "A marca d'água desestimula o reaproveitamento e ajuda a descobrir de onde veio um vazamento, mas não impede que alguém fotografe ou altere uma cópia. Desconfie de quem pede holerite ou IR por WhatsApp para liberar um empréstimo “pré-aprovado” que você não pediu.",
      },
    ],
    faq: [
      {
        q: "O banco ou a imobiliária aceita holerite com marca d'água?",
        a: "Em geral, sim: os valores continuam legíveis. Se precisarem de um documento oficial sem alteração, vão pedir de outra forma, por exemplo pela autorização de consulta ou pelo original.",
      },
      {
        q: "Posso ocultar parte da declaração do Imposto de Renda?",
        a: "Você pode ocultar o que não for necessário para a análise, como detalhes de bens ou contas que não têm relação com o pedido. Combine antes com o destinatário para evitar que ele recuse o documento.",
      },
      {
        q: "O PDF continua pesquisável depois?",
        a: "Não. As páginas viram imagens, então o texto não pode mais ser selecionado nem copiado. É justamente isso que impede alguém de remover a marca d'água ou de recuperar o que você ocultou.",
      },
    ],
    updated: "2026-10-12",
  },

  // ───────────────────────────── Verificação online ─────────────────────────────
  {
    slug: "selfie-com-documento-verificacao-online",
    topic: "online-verification",
    title: "Selfie com documento e verificação online: quando enviar e como se proteger",
    metaTitle: "Selfie com documento: quando enviar e como se proteger",
    description:
      "Apps de banco e fintechs pedem selfie e foto do RG ou CNH. Veja quando é normal, como fugir do golpe da selfie e quando usar marca d'água.",
    intro:
      "Abrir conta digital, se cadastrar num app de entregas ou de transporte, comprar num marketplace: quase tudo hoje pede foto do documento e uma selfie. Na maioria das vezes é um procedimento legítimo. Mas os golpistas também aprenderam a pedir.",
    example: "Cadastro de vendedor, Feira Online Bem-te-vi, 11/10/2026",
    body: [
      { type: "h2", text: "Como funciona a verificação de verdade" },
      {
        type: "p",
        text: "Bancos, fintechs e aplicativos sérios fazem a verificação dentro do próprio app oficial: você fotografa o documento e faz uma selfie com prova de vida, virando o rosto ou piscando quando o app pede. Nesse caso, a foto é tirada pelo app e você não tem como colocar marca d'água, e tudo bem: o processo foi feito para isso, e a imagem vai direto para a empresa que você escolheu.",
      },
      { type: "h2", text: "O golpe da selfie" },
      {
        type: "p",
        text: "O golpe é outro: alguém se passa por banco, loja ou órgão público e pede, por WhatsApp, e-mail ou ligação, uma selfie segurando o documento para “confirmar seu cadastro” ou “liberar um benefício”. Com essa foto e os dados do documento, criminosos tentam abrir contas, pedir empréstimos e enganar sistemas de biometria facial. Nenhum banco pede selfie com documento por mensagem.",
      },
      {
        type: "warning",
        text: "Faça verificações só dentro do app oficial que você mesmo baixou da loja, ou no site que você digitou. Se alguém pediu sua selfie por mensagem, não envie, desligue e ligue para o número oficial que está no seu cartão ou no site da empresa.",
      },
      { type: "h2", text: "Quando a marca d'água ajuda" },
      {
        type: "list",
        items: [
          "Quando um site ou uma pessoa pede uma foto do documento por e-mail, WhatsApp ou formulário de upload.",
          "Quando você manda o documento para um vendedor, um anfitrião de hospedagem ou um contratante que não usa um app de verificação.",
          "Quando um formulário aceita qualquer imagem ou PDF que você escolher.",
        ],
      },
      {
        type: "steps",
        items: [
          "Abra cachety.com e solte a foto do documento.",
          "Diga para que serve a cópia e quem vai receber. Por exemplo: Cadastro de vendedor, para a Feira Online Bem-te-vi. A data entra sozinha.",
          "Se o destinatário só precisa ver nome e foto, toque em “Ocultar algo” embaixo da prévia e desenhe um retângulo sobre os outros números.",
          "Se o formulário recusar arquivos grandes, toque em “Diminuir o tamanho” e escolha 10, 5, 2 ou 1 MB.",
          "Baixe a imagem com marca d'água e envie essa.",
        ],
      },
      {
        type: "tip",
        text: "Para acompanhar o que acontece com o seu CPF, o Registrato, do Banco Central, mostra em quais instituições você tem conta. E o BC Protege+, também do Banco Central, permite bloquear a abertura de novas contas no seu nome. Os dois usam login gov.br.",
      },
      {
        type: "p",
        text: "Uma marca d'água pode atrapalhar uma verificação automática feita pelo app de um banco. Por isso, use-a nas cópias que você manda fora desses processos, não dentro do app oficial. E lembre que ela desestimula o reaproveitamento, mas não o torna impossível.",
      },
    ],
    faq: [
      {
        q: "Banco pede selfie segurando o documento pelo WhatsApp?",
        a: "Não. Verificações legítimas são feitas dentro do app ou do site oficial. Um pedido por WhatsApp, SMS ou ligação é sinal clássico de golpe.",
      },
      {
        q: "Posso colocar marca d'água na foto que o app do banco pede?",
        a: "Não é recomendado. O app tira a foto ele mesmo e verifica o documento automaticamente, e uma marca d'água pode fazer a verificação falhar. Ali, o próprio processo já limita o uso da imagem.",
      },
      {
        q: "Mandei minha selfie com documento para um golpista. O que faço?",
        a: "Avise seu banco, registre um boletim de ocorrência, consulte o Registrato para ver se abriram contas no seu nome e ative o BC Protege+ para bloquear novas aberturas.",
      },
    ],
    updated: "2026-10-12",
  },

  // ───────────────────────────── Golpes ─────────────────────────────
  {
    slug: "golpe-copia-documento-roubo-identidade",
    topic: "identity-theft",
    title: "Golpes com cópia de documento: como se proteger e o que fazer",
    metaTitle: "Golpe com cópia de RG ou CNH: como se proteger",
    description:
      "Uma cópia de RG ou CNH basta para golpistas abrirem conta ou pedir crédito no seu nome. Veja como se proteger com marca d'água e o que fazer se acontecer.",
    intro:
      "Conta digital aberta no seu nome, empréstimo que você nunca pediu, linha de celular desconhecida: muitos golpes começam com uma simples cópia de documento que circulou por aí. Não dá para evitar todo risco, mas dá para reduzir bastante.",
    example: "Admissão, Construtora Ipê Amarelo, 11/10/2026",
    body: [
      { type: "h2", text: "Como uma cópia vira golpe" },
      {
        type: "p",
        text: "Cópias de RG, CNH e comprovantes ficam em caixas de e-mail, conversas de WhatsApp e pastas compartilhadas de empresas. Elas vazam por descuido, por invasão ou porque foram parar nas mãos erradas, como num anúncio falso de emprego ou de aluguel. Com a cópia e alguns dados, o golpista tenta abrir contas, fazer crediário, contratar linha de celular ou se passar por você para enganar seus contatos.",
      },
      { type: "h2", text: "O que a marca d'água muda" },
      {
        type: "p",
        text: "Uma cópia com “Admissão, Construtora Ipê Amarelo, 11/10/2026” escrito na diagonal sobre a página inteira chama atenção em qualquer análise. Quem tentar usá-la para abrir uma conta vai ter que explicar por que o seu RG diz que era para uma construtora. E se a cópia aparecer em algum lugar, você sabe de qual envio ela saiu.",
      },
      {
        type: "list",
        items: [
          "Finalidade: deixa claro que qualquer outro uso é indevido.",
          "Destinatário: aponta a origem se a cópia vazar.",
          "Data: impede que uma cópia antiga seja apresentada como recente.",
        ],
      },
      { type: "h2", text: "Proteja cada cópia em um minuto" },
      {
        type: "steps",
        items: [
          "Abra cachety.com no celular ou no computador.",
          "Solte o documento que você vai enviar.",
          "Diga para que serve a cópia (escreva ou escolha um exemplo) e quem vai receber. A data entra sozinha.",
          "Se quiser, toque em “Editar o texto” e insira {código}: cada cópia ganha um código curto próprio, e a lista fica com você depois do download.",
          "Baixe e envie a cópia com marca d'água. Guarde o original só com você.",
        ],
      },
      {
        type: "tip",
        text: "Hábitos que ajudam: envie só o que pedirem, oculte o que não for necessário, confira se quem pede é mesmo quem diz ser e apague das conversas as fotos de documentos que você já não precisa compartilhar.",
      },
      { type: "h2", text: "Se você desconfia que usaram seus documentos" },
      {
        type: "list",
        items: [
          "Consulte o Registrato, do Banco Central, para ver em quais instituições existe conta no seu CPF.",
          "Ative o BC Protege+ para bloquear a abertura de novas contas no seu nome.",
          "Registre um boletim de ocorrência; em muitos estados dá para fazer pela delegacia online.",
          "Conteste a conta ou a dívida direto com a instituição e guarde os protocolos.",
          "Se uma empresa vazou seus dados, você pode reclamar com ela e, depois, com a ANPD, a autoridade da LGPD.",
        ],
      },
      {
        type: "warning",
        text: "A marca d'água desestimula e ajuda a rastrear, mas não torna o mau uso impossível: ninguém impede alguém de fotografar ou adulterar uma imagem. Ela é uma camada a mais, junto com o cuidado de enviar só o necessário.",
      },
    ],
    faq: [
      {
        q: "Só com a cópia do RG dá para abrir conta no meu nome?",
        a: "Os bancos têm verificações, mas golpistas combinam cópias com outros dados vazados e às vezes conseguem. Quanto menos útil for a cópia que circula, melhor. Por isso a marca d'água e o BC Protege+ ajudam.",
      },
      {
        q: "Como sei se abriram conta no meu CPF?",
        a: "Pelo Registrato, do Banco Central, com login gov.br. Ele mostra os relacionamentos com instituições financeiras no seu CPF.",
      },
      {
        q: "A marca d'água tem valor legal?",
        a: "Ela não é um documento oficial. Serve para deixar claro para que a cópia foi entregue e para identificar a origem de um vazamento, o que pode ajudar a explicar o caso ao banco ou à polícia.",
      },
    ],
    updated: "2026-10-12",
  },

  // ───────────────────────────── Ocultar dados ─────────────────────────────
  {
    slug: "ocultar-dados-pdf-gratis",
    topic: "redact",
    title: "Como ocultar o CPF, a conta ou a foto num PDF, de graça e de verdade",
    metaTitle: "Ocultar dados num PDF de graça: CPF, conta, foto",
    description:
      "Tarja preta que some de verdade: oculte CPF, dados bancários ou foto num PDF ou imagem, grátis, sem cadastro e sem enviar o arquivo a nenhum site.",
    intro:
      "Colocar um retângulo preto por cima de um dado no editor de PDF muitas vezes não apaga nada: o texto continua lá embaixo e pode ser copiado. Para ocultar de verdade, a informação precisa sair do arquivo.",
    example: "Comprovante de residência, Condomínio Jardim das Palmeiras, 11/10/2026",
    body: [
      { type: "h2", text: "O erro mais comum" },
      {
        type: "p",
        text: "Muita gente tarja dados desenhando uma forma preta no PDF ou riscando com a caneta do celular. Visualmente parece resolvido. Mas, num PDF, o texto original costuma continuar no arquivo, debaixo da forma: basta selecionar e copiar, ou abrir em outro programa, para ver tudo. E nas fotos, o arquivo pode guardar outros dados, como a localização GPS.",
      },
      { type: "h2", text: "O que vale ocultar" },
      {
        type: "list",
        items: [
          "Números de conta, agência e chaves Pix num extrato.",
          "Movimentações que não têm relação com o que foi pedido.",
          "O CPF ou o número do RG, quando o destinatário não precisa deles.",
          "A foto ou a assinatura, quando só o nome importa.",
          "Dados de outras pessoas, como dependentes num documento.",
        ],
      },
      { type: "h2", text: "Passo a passo com o Cachety" },
      {
        type: "steps",
        items: [
          "Abra cachety.com e solte o PDF ou a imagem.",
          "Diga para que serve a cópia e quem vai receber. A data entra sozinha.",
          "Embaixo da prévia, toque em “Ocultar algo” e desenhe um retângulo sobre cada dado a esconder. Você pode desenhar vários na mesma página, e mover, redimensionar ou remover cada um.",
          "Toque em “Concluir” e confira o resultado na prévia.",
          "Baixe o arquivo. O que você ocultou não existe mais nele.",
        ],
      },
      {
        type: "p",
        text: "O Cachety refaz cada página como imagem: o que está sob o retângulo é substituído, e o texto selecionável, os metadados e a localização GPS das fotos são removidos do arquivo final. Por isso não há como “descobrir” o que estava escondido.",
      },
      {
        type: "tip",
        text: "Antes de ocultar o CPF, pergunte se o destinatário precisa dele. Bancos e empresas que vão emitir contrato ou nota fiscal normalmente precisam. Oculte só o que for realmente dispensável, para não ter o documento recusado.",
      },
      {
        type: "warning",
        text: "A ocultação está disponível nas primeiras páginas do documento, e o arquivo final não é mais pesquisável, porque as páginas viram imagens. Se você precisa de texto pesquisável, use outra ferramenta para isso e confira o resultado com cuidado.",
      },
    ],
    faq: [
      {
        q: "Tarjar com um retângulo preto no PDF apaga o dado?",
        a: "Nem sempre. Em muitos editores, o texto continua no arquivo, debaixo do retângulo. No Cachety, a página é refeita como imagem, então o que foi ocultado deixa de existir no arquivo.",
      },
      {
        q: "Posso ocultar dados sem colocar marca d'água?",
        a: "O Cachety foi pensado para fazer as duas coisas juntas, e a marca d'água é o centro da ferramenta. Uma marca d'água discreta, com opacidade baixa, quase não atrapalha a leitura.",
      },
      {
        q: "O arquivo é enviado para algum lugar?",
        a: "Não. Tudo acontece no seu navegador. Você pode comprovar com o teste do modo avião: carregue a página, desligue a internet e continue usando normalmente.",
      },
    ],
    updated: "2026-10-12",
  },

  // ───────────────────────────── Celular ─────────────────────────────
  {
    slug: "marca-dagua-pelo-celular",
    topic: "phone",
    title: "Como colocar marca d'água em documentos pelo celular, no iPhone ou Android",
    metaTitle: "Marca d'água em documento pelo celular, sem app",
    description:
      "Coloque marca d'água na foto do RG, CNH ou num PDF direto do iPhone ou Android, sem baixar app e sem enviar o arquivo para nenhum servidor.",
    intro:
      "Hoje quase todo documento é enviado pelo celular: fotografado, anexado no WhatsApp ou num formulário. Dá para colocar a marca d'água ali mesmo, no navegador do celular, sem instalar nada.",
    example: "Matrícula escolar, Colégio Sabiá, 11/10/2026",
    body: [
      { type: "h2", text: "Sem app para instalar" },
      {
        type: "p",
        text: "O Cachety é um site que funciona dentro do navegador: Safari, Chrome, Samsung Internet ou outro. Não precisa baixar app, criar conta nem dar permissões. E, mesmo sendo um site, seus arquivos ficam no celular: o processamento é feito pelo próprio aparelho.",
      },
      { type: "h2", text: "Passo a passo" },
      {
        type: "steps",
        items: [
          "Abra cachety.com no navegador do celular.",
          "Toque na área de arquivos e escolha uma foto da galeria, tire uma foto na hora ou pegue um PDF nos arquivos.",
          "Diga para que serve a cópia (escreva ou toque num exemplo) e quem vai receber. A data entra sozinha.",
          "Confira a prévia; toque na página para ampliar.",
          "Baixe o arquivo com marca d'água e compartilhe pelo WhatsApp, e-mail ou formulário.",
        ],
      },
      { type: "h2", text: "Dicas para uma boa foto do documento" },
      {
        type: "list",
        items: [
          "Coloque o documento sobre uma superfície escura e lisa, com boa luz e sem flash.",
          "Enquadre só o documento, reto, e confira se nada está cortado.",
          "Fotos de iPhone em HEIC funcionam normalmente, não precisa converter.",
          "Se o formulário limita o tamanho, toque em “Diminuir o tamanho” antes de baixar e escolha 10, 5, 2 ou 1 MB.",
        ],
      },
      {
        type: "tip",
        text: "Adicione o Cachety à tela inicial para abrir como um app. No Android, você também pode compartilhar um arquivo direto para o Cachety a partir da galeria ou do gerenciador de arquivos.",
      },
      {
        type: "p",
        text: "Depois que a página carrega, o Cachety funciona até sem internet. Faça o teste do modo avião: abra o site, ative o modo avião e coloque a marca d'água num documento. Se funciona, é porque nada saiu do seu celular.",
      },
      {
        type: "warning",
        text: "Apague das conversas e da galeria as fotos de documentos que você não precisa mais, e prefira enviar sempre a versão com marca d'água. Uma foto sem marca esquecida num grupo de WhatsApp pode ser reaproveitada por qualquer pessoa.",
      },
    ],
    faq: [
      {
        q: "Preciso baixar algum aplicativo?",
        a: "Não. Basta o navegador do celular. Se quiser, adicione o Cachety à tela inicial para abrir mais rápido.",
      },
      {
        q: "Funciona com foto do iPhone?",
        a: "Sim, inclusive no formato HEIC, que é o padrão das câmeras do iPhone.",
      },
      {
        q: "Meu celular é simples. Vai funcionar?",
        a: "Na maioria dos celulares atuais, sim. Documentos muito grandes, com muitas páginas, podem demorar mais ou pesar na memória; nesse caso, divida o PDF em partes menores.",
      },
    ],
    updated: "2026-10-12",
  },
];
