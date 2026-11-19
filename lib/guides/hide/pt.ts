// Guias sobre as áreas sugeridas para ocultar (pt): encontrar e ocultar
// números de conta, passar dados bancários, enviar uma cópia do cartão.
// Escritos para leitores no Brasil (pt-BR): banco, agência e conta em vez de
// sort code, sem regras de reembolso do Reino Unido nem da zona do euro.
// Só texto puro: sem links, sem HTML, sem markdown. Nomes de exemplo inventados.
// Draft translation from the English guide, awaiting native review (ROADMAP.md, backlog: Native review).
//
// Estes guias descrevem o recurso `suggested-areas` (docs/prd-suggested-areas.md)
// como foi entregue. Os rótulos entre aspas (“Revisar”, “Ocultar todos”,
// “Este não”, “Concluir”, “Ocultar algo”, “Número da conta (IBAN)”) foram
// conferidos com lib/suggest-copy/pt.ts e lib/locales/pt/strings.ts, e a lista
// de números com lib/sensitive.ts: manter tudo em sincronia.
// O que se diz do débito em conta vem da Resolução CMN nº 4.790/2020 (arts. 3º,
// 6º e 12), lida em normativos.bcb.gov.br em 19/11/2026.

import type { Guide } from "../types";

const UPDATED = "2026-11-19";

export const HIDE_GUIDES_PT: Guide[] = [
  // ------------------------------------------------------------------
  {
    slug: "encontrar-e-ocultar-numero-de-conta-no-pdf",
    topic: "auto-redact",
    title: "Como encontrar e ocultar números de conta num PDF antes de enviar",
    metaTitle: "Encontrar e ocultar números de conta num PDF, grátis",
    description:
      "O Cachety encontra CPF, números de cartão e IBANs no seu PDF e propõe ocultá-los, no seu aparelho. Nada é enviado e nada é ocultado sem você decidir.",
    intro:
      "Um holerite, uma conta de luz ou um extrato bancário costuma trazer mais do que a pessoa que pediu precisa ver, como o CPF, um número de conta ou um número de cartão. O Cachety aponta na página os números cujo formato ele reconhece e deixa você ocultá-los com um toque, sem que o arquivo saia do seu aparelho.",
    example: "Comprovação de renda, Imobiliária Bela Vista, 18/11/2026",
    body: [
      { type: "h2", text: "Os números que você envia sem perceber" },
      {
        type: "p",
        text: "Quando a imobiliária pede três holerites, ela quer ver quem paga você e quanto. Não precisa saber em que conta o salário cai. Quando uma conta de luz serve de comprovante de residência, ninguém precisa dos dados bancários impressos no rodapé para o débito automático. Só que esses números ficam em letras miúdas, na página dois ou três, e a maioria das pessoas manda o arquivo inteiro do jeito que está.",
      },
      {
        type: "p",
        text: "Ocultar à mão funciona, mas é preciso saber onde procurar. Agora o Cachety procura para você.",
      },
      { type: "h2", text: "O que o Cachety procura" },
      {
        type: "p",
        text: "Quando você adiciona um PDF, o Cachety lê o texto dele no seu navegador e procura números cujo formato ele consegue conferir:",
      },
      {
        type: "list",
        items: [
          "Números de conta bancária escritos como IBAN, de qualquer país.",
          "Números de cartão de pagamento das principais bandeiras.",
          "O CPF, quando vem escrito com os pontos e o traço de costume ou com a palavra CPF ao lado.",
          "Números da seguridade social da França, números fiscais franceses e referências de avisos de imposto franceses.",
          "Números de identidade e números fiscais de outros países: a identificação fiscal alemã (Steuer-ID), o DNI e o NIE espanhóis, o BSN holandês, o número nacional belga, o NIF português, o código fiscal italiano, o documento de identidade de residente chinês, o My Number japonês, o código nacional iraniano e o NIK indonésio.",
        ],
      },
      {
        type: "p",
        text: "Um número só é sugerido quando passa na verificação embutida no próprio formato, como os dígitos de controle de um IBAN, ou quando um rótulo ao lado diz o que ele é. Um telefone, uma data ou o total de uma fatura não é marcado só por ser uma sequência de algarismos.",
      },
      { type: "h2", text: "Como ocultar, passo a passo" },
      {
        type: "steps",
        items: [
          "Abra cachety.com no navegador, no computador ou no celular. Não precisa criar conta.",
          "Adicione seu PDF. Diga para que serve a cópia e, depois, quem vai receber.",
          "Se o Cachety encontrar alguma coisa, uma mensagem acima da prévia diz quantos números ele achou. Escolha “Revisar”.",
          "Cada sugestão aparece contornada na página e listada com o nome, por exemplo “Número da conta (IBAN)”. Toque nas que você quer ocultar, ou escolha “Ocultar todos”. Dá para desfazer cada uma, e deixar de lado uma sugestão errada com “Este não”.",
          "Confira você mesmo todas as páginas e desenhe um retângulo sobre qualquer outra coisa que queira ocultar. Depois escolha “Concluir”: é só nesse momento que as áreas são removidas do arquivo.",
          "Confira a prévia e baixe sua cópia.",
        ],
      },
      {
        type: "tip",
        text: "Nada é ocultado sem você mandar. Se o destinatário pediu seus dados bancários, deixe o IBAN visível: é justamente o que ele precisa. O mesmo vale para o CPF, quando quem recebe precisa dele para identificar você, e para o número fiscal e a referência de um aviso de imposto francês, que permitem ao destinatário conferir se o aviso é autêntico.",
      },
      {
        type: "p",
        text: "As mesmas sugestões aparecem nas outras duas ferramentas do Cachety: quando você assina um PDF e quando reúne vários documentos num único arquivo com o Dossier.",
      },
      { type: "h2", text: "O que ele não consegue encontrar" },
      {
        type: "list",
        items: [
          "Nada que esteja numa foto ou num documento escaneado. Numa imagem não há texto para ler, então não há sugestões: desenhe os retângulos você mesmo.",
          "Códigos de barras e QR Codes. Eles podem conter as mesmas informações do texto impresso ao lado.",
          "Números em formatos que o Cachety não confere, como o RG, o CNPJ, o número da agência e da conta, uma chave Pix aleatória, o número do passaporte ou da CNH, ou um número de cliente ou de contrato.",
          "Um número de cartão que já está parcialmente oculto, como os quatro últimos dígitos num comprovante. Não sobra nada para ocultar.",
          "Nomes, endereços, datas de nascimento e telefones. Em geral são o que o destinatário precisa, por isso não são sugeridos.",
        ],
      },
      {
        type: "warning",
        text: "As sugestões são uma ajuda, não uma garantia. Elas podem deixar passar alguma coisa. Sempre confira a página inteira antes de enviar.",
      },
      { type: "h2", text: "Apagado de verdade, e nunca enviado" },
      {
        type: "p",
        text: "Uma área oculta não é uma forma preta colocada por cima do texto. O Cachety refaz cada página como imagem, então o número some do arquivo e não pode ser copiado por baixo. A busca pelos números acontece no seu navegador, com regras simples. Seu documento não é enviado a um servidor nem a um serviço de IA, e a página continua funcionando no modo avião depois de carregada.",
      },
    ],
    faq: [
      {
        q: "O Cachety oculta os números automaticamente?",
        a: "Não. Ele contorna o que encontrou e você decide, um por um ou todos de uma vez. Alguns números estão ali porque o destinatário precisa deles, e só você sabe disso.",
      },
      {
        q: "Funciona com foto ou documento escaneado?",
        a: "Não. As sugestões precisam de um PDF com texto de verdade, como os holerites, as contas e os extratos que você baixa de um site. Numa foto ou num escaneamento, desenhe os retângulos você mesmo com “Ocultar algo”.",
      },
      {
        q: "Meu documento é enviado para algum lugar para ser analisado?",
        a: "Não. As verificações rodam no seu navegador, no seu aparelho. Nada é enviado, e nenhum serviço de IA lê seu arquivo.",
      },
      {
        q: "Ele pode deixar passar um número?",
        a: "Pode. Um número dentro de uma imagem, num código de barras ou num formato que o Cachety não confere não é sugerido. Por isso a página sempre pede que você confira por conta própria.",
      },
      {
        q: "Ele cobre todas as páginas de um PDF longo?",
        a: "Sim. As sugestões cobrem todas as páginas, inclusive as que não aparecem na prévia. Para essas, a lista mostra os primeiros e os últimos caracteres de cada número, para você saber o que está ocultando.",
      },
    ],
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  {
    slug: "e-seguro-passar-dados-bancarios",
    topic: "iban",
    title: "É seguro passar seus dados bancários? Banco, agência, conta e IBAN",
    metaTitle: "É seguro passar seus dados bancários? Agência e conta",
    description:
      "O que alguém pode e não pode fazer com seu banco, agência e conta, quando passar esses dados e como ocultá-los nos documentos que não precisam deles.",
    intro:
      "Você passa seus dados bancários para receber um pagamento, e eles vêm impressos em muitos documentos que você manda por outros motivos. Sozinhos, representam pouco risco. O problema começa quando viajam junto com o resto dos seus papéis.",
    example: "Dados bancários para salário, RH da Alimentos Campo Verde, 18/11/2026",
    body: [
      { type: "h2", text: "O que alguém pode fazer com seus dados bancários" },
      {
        type: "p",
        text: "Com o banco, a agência e a conta, com a sua chave Pix ou com o seu IBAN, alguém pode depositar dinheiro na sua conta. É para isso que eles servem. Sozinhos, não bastam para sacar nem para fazer uma transferência: para isso é preciso o seu cartão, o seu acesso ao aplicativo do banco ou a sua aprovação.",
      },
      {
        type: "p",
        text: "O principal risco é um débito automático cadastrado no seu nome sem a sua autorização. No Brasil, as regras do Banco Central dizem que um débito em conta depende da autorização prévia do titular, e que o titular tem o direito de cancelar essa autorização. O banco também deve mostrar a você a lista das autorizações de débito em vigor na sua conta. Por isso, confira seus extratos e essa lista, e avise o banco na hora se aparecer um débito que você não reconhece.",
      },
      { type: "h2", text: "O perigo de verdade é o conjunto" },
      {
        type: "p",
        text: "Os dados bancários ficam muito mais úteis para um golpista quando vêm com uma cópia do seu documento com foto, seu endereço, sua assinatura e seus holerites. Juntos, eles bastam para tentar abrir uma conta ou pedir crédito no seu nome. Um cadastro de aluguel ou uma pasta de admissão no emprego contém exatamente esse conjunto. Então a pergunta é menos “o número da minha conta é secreto?” e mais “essa pessoa precisa mesmo dele?”.",
      },
      { type: "h2", text: "Quando passar e quando ocultar" },
      {
        type: "list",
        items: [
          "Passe quando alguém precisa pagar você ou cobrar um pagamento que você autorizou: o empregador, o proprietário que vai devolver a caução, uma conta que você paga por débito automático.",
          "Oculte quando o documento é enviado por outro motivo: um holerite como comprovante de renda, uma conta como comprovante de residência, um extrato bancário que só precisa mostrar seu nome e endereço.",
          "Se puder, mande seus dados bancários sozinhos, não no mesmo arquivo do seu documento de identidade.",
        ],
      },
      { type: "h2", text: "Oculte um número de conta com o Cachety" },
      {
        type: "steps",
        items: [
          "Abra cachety.com no navegador. Não precisa instalar nada nem criar conta.",
          "Adicione seu PDF ou sua foto. Diga para que serve a cópia e, depois, quem vai receber.",
          "Num PDF, o Cachety procura números de conta escritos como IBAN, o formato usado em transferências internacionais, e avisa se encontrar algum. Escolha “Revisar”, toque na sugestão para ocultá-la e depois escolha “Concluir”.",
          "A agência e a conta não são sugeridas, nem uma chave Pix de telefone, de e-mail ou aleatória, nem nada que esteja numa foto: toque em “Ocultar algo” e desenhe um retângulo sobre esses dados.",
          "Confira todas as páginas e baixe sua cópia.",
        ],
      },
      {
        type: "tip",
        text: "Quando você precisar mesmo mandar seus dados bancários, acrescente uma marca d'água dizendo para quem são e para quê, como “Dados bancários para salário, RH da Alimentos Campo Verde”. Uma cópia marcada assim é difícil de reaproveitar em outro lugar.",
      },
      { type: "h2", text: "Seu arquivo fica com você" },
      {
        type: "p",
        text: "O Cachety funciona no seu navegador. Seu extrato ou holerite nunca é enviado, e o número oculto é removido do próprio arquivo, não só coberto. Lembre que as sugestões podem deixar passar alguma coisa: confira cada página antes de enviar.",
      },
    ],
    faq: [
      {
        q: "Alguém consegue tirar dinheiro da minha conta com meus dados bancários?",
        a: "Não diretamente. A agência e a conta, a chave Pix ou o IBAN servem para depositar dinheiro. O principal risco é um débito automático cadastrado sem a sua autorização. Confira seus extratos e avise o banco na hora se vir algo que não reconhece.",
      },
      {
        q: "Devo ocultar a conta no holerite?",
        a: "Se o holerite vai como comprovante de renda, sim: o destinatário precisa do seu nome, do seu empregador e do seu salário, não da sua conta. Se o empregador pedir seus dados bancários, mande separado.",
      },
      {
        q: "O proprietário pediu meus dados bancários. Isso é normal?",
        a: "Pode ser, por exemplo para combinar o pagamento do aluguel ou devolver a caução. Nesse caso ele precisa do número, então não oculte. Coloque uma marca d'água com o nome dele e o motivo.",
      },
      {
        q: "O que faço se vir um débito automático que nunca autorizei?",
        a: "Fale com o seu banco na hora, conteste o débito, peça o cancelamento da autorização e a devolução do valor. Pelas regras do Banco Central, um débito em conta depende da sua autorização prévia. Se o atendimento não resolver, procure a ouvidoria do banco; você também pode registrar uma reclamação no Banco Central.",
      },
    ],
    updated: UPDATED,
  },

  // ------------------------------------------------------------------
  {
    slug: "mandar-foto-do-cartao-com-seguranca",
    topic: "bank-card",
    title: "Pediram uma cópia do seu cartão? O que ocultar antes de enviar",
    metaTitle: "Mandar foto do cartão: o que ocultar antes de enviar",
    description:
      "Um hotel ou vendedor pediu uma foto do seu cartão? Veja quais dígitos ocultar, por que o código de segurança (CVV) nunca deve ser enviado e como tarjá-los.",
    intro:
      "Hotéis, locadoras de carros e alguns vendedores online ainda pedem uma foto do cartão “para confirmar a reserva”. Antes de mandar qualquer coisa, oculte o que ninguém precisa ver. Melhor ainda: peça uma forma de pagamento mais segura.",
    example: "Confirmação de reserva, Pousada Recanto das Dunas, 18/11/2026",
    body: [
      { type: "h2", text: "Por que uma foto do cartão é arriscada" },
      {
        type: "p",
        text: "Na maioria dos cartões, a frente mostra o número longo do cartão, a validade e o seu nome, e o verso mostra o código de segurança (CVV), de três dígitos. Alguns cartões mais novos trazem tudo isso no verso. Juntos, são tudo de que alguém precisa para comprar pela internet com o seu cartão. Um e-mail ou uma mensagem de chat pode ficar anos em várias caixas de entrada, bem longe do seu controle.",
      },
      {
        type: "warning",
        text: "Nunca envie o código de segurança (CVV): os três dígitos do verso do cartão, ou os quatro dígitos da frente num cartão American Express. Nenhuma empresa honesta precisa dele numa foto. As próprias regras de segurança do setor de cartões proíbem as empresas de guardá-lo depois que o pagamento foi autorizado.",
      },
      { type: "h2", text: "Primeiro, peça outra forma" },
      {
        type: "p",
        text: "Uma empresa que aceita cartão deve conseguir mandar um link de pagamento seguro, cobrar pelo próprio sistema de reservas ou conferir o cartão quando você chegar. Pergunte. Se insistirem numa cópia, normalmente é para conferir que o cartão existe e está no seu nome, e uma cópia parcialmente oculta cumpre esse papel.",
      },
      { type: "h2", text: "O que ocultar e o que deixar" },
      {
        type: "list",
        items: [
          "Oculte os dígitos do meio do número do cartão. Deixe no máximo os quatro últimos, que é o que a sua via do comprovante mostra.",
          "Oculte o código de segurança (CVV). No verso do cartão, oculte toda a faixa em que ele está impresso.",
          "Oculte a validade, a menos que peçam por um bom motivo.",
          "Deixe seu nome e o logotipo do banco, para a cópia continuar provando que o cartão é seu.",
        ],
      },
      { type: "h2", text: "Oculte os dígitos com o Cachety" },
      {
        type: "steps",
        items: [
          "Tire uma foto da frente do cartão. Só fotografe o verso se pedirem.",
          "Abra cachety.com no celular ou no computador e adicione a foto.",
          "Diga para que serve a cópia e, depois, quem vai receber, por exemplo “Confirmação de reserva” e o nome do hotel.",
          "Embaixo da prévia, toque em “Ocultar algo” e desenhe um retângulo sobre os dígitos do meio, a validade e o código de segurança.",
          "Confira a prévia, baixe a cópia e envie.",
        ],
      },
      {
        type: "tip",
        text: "Num PDF, como um extrato que mostra o número completo do cartão, o Cachety consegue encontrar o número e propor ocultá-lo. Numa foto do cartão não há texto para ler, então é você quem desenha os retângulos.",
      },
      { type: "h2", text: "O que acontece com a foto" },
      {
        type: "p",
        text: "Nada sai do seu aparelho. O Cachety funciona no seu navegador, e não existe servidor que receba sua foto. Os dígitos ocultos são removidos da imagem, não só cobertos, e o local onde a foto foi tirada é apagado do arquivo. A marca d'água diz para quem a cópia foi feita, o que dificulta o reaproveitamento.",
      },
      {
        type: "p",
        text: "Para ser honesto, uma cópia com dados ocultos e marca d'água reduz o risco, mas não o elimina. Se um pedido parecer estranho, não mande o cartão de jeito nenhum e ligue para a empresa num número que você mesmo encontrou.",
      },
    ],
    faq: [
      {
        q: "Quais dígitos do número do cartão posso mostrar?",
        a: "Os quatro últimos bastam para a maioria das conferências, e são os que as lojas imprimem na sua via do comprovante. As regras de segurança dos cartões dizem que uma empresa normalmente não deve exibir mais que os primeiros dígitos, que identificam o banco, e os quatro últimos. Oculte o resto.",
      },
      {
        q: "É seguro mandar foto do cartão por e-mail ou WhatsApp?",
        a: "Não com o número completo e o código de segurança visíveis. Mensagens são copiadas, encaminhadas e guardadas, e a própria Visa orienta a nunca enviar dados de pagamento por e-mail. Se precisar mesmo mandar uma cópia, oculte antes os dígitos do meio e o código de segurança.",
      },
      {
        q: "O hotel quer a frente e o verso. O que faço?",
        a: "Pergunte por quê e proponha um link de pagamento seguro. Se mandar o verso, oculte o código de segurança e a faixa em volta dele. As regras do setor de cartões não permitem que uma empresa guarde esse código depois que o pagamento foi autorizado.",
      },
      {
        q: "Já mandei uma foto completa do meu cartão. E agora?",
        a: "Ligue para o seu banco. Ele pode bloquear o cartão e mandar outro, e vai explicar como contestar qualquer compra que você não fez. Acompanhe a fatura e o extrato nas semanas seguintes.",
      },
    ],
    updated: UPDATED,
  },
];
