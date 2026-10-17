import type { GuideBlock } from "@/lib/guides";
import type { Comparison } from "../types";

// Comparatifs de l'outil de signature (pt). Même règle éditoriale que les
// comparatifs du filigrane (lib/compare/types.ts) ; chaque entrée porte tool: "sign".
//
// Comparativos da ferramenta de assinatura, em português do Brasil. Cada
// informação sobre outra ferramenta vem das páginas públicas dela (campo
// `sources`), conferidas em 2026-10-17. Sem preços. Só texto puro.

const CHECKED = "2026-10-17";
const UPDATED = "2026-10-17";

// Células do Cachety que se repetem de uma página para outra (ficha verificada).
const C = {
  purpose: "Assinar você mesmo um documento e baixar o PDF assinado.",
  where: "No seu próprio aparelho, dentro do navegador. O documento não é enviado para nenhum servidor.",
  account: "Não precisa de conta nem cadastro. Grátis, sem plano pago.",
  create:
    "Desenhe com o dedo ou o mouse, digite seu nome ou importe uma foto da assinatura (o fundo é removido). Data, local e uma frase curta opcionais embaixo.",
  signers: "Não: uma pessoa assina o próprio documento. Não há envio para outras pessoas nem ordem de assinatura.",
  audit:
    "Não há trilha de auditoria nem carimbo de tempo. Depois do download aparece a impressão digital SHA-256 do arquivo, para você guardar.",
  identity: "Nenhuma: o Cachety não confere quem assina.",
  level: "Assinatura eletrônica simples: uma imagem colocada na página, sem certificado digital.",
  stored: "Nada: o documento e a assinatura só existem na memória da aba.",
  ads: "Sem anúncios e sem rastreadores.",
  phone: "Funciona no navegador do celular, sem app. A foto de um documento em papel vira uma página do tamanho A4.",
};

const LEGAL: GuideBlock[] = [
  { type: "h2", text: "Quanto vale uma assinatura feita no Cachety" },
  {
    type: "p",
    text: "Uma assinatura desenhada ou digitada e colocada no documento é o que se costuma chamar de assinatura eletrônica simples. Para a papelada do dia a dia, como contrato de locação, laudo de vistoria, autorização de escola ou orçamento, isso costuma ser aceito. Em caso de disputa, quem se apoia no documento é que deve provar quem o assinou: guarde o e-mail ou a mensagem com que você o devolveu. Uma assinatura qualificada, feita com certificado digital ICP-Brasil, tem uma presunção de autenticidade que a assinatura simples não tem.",
  },
  {
    type: "warning",
    text: "A assinatura do Cachety é uma imagem, como uma assinatura escaneada. Ela não prova sozinha quem assinou nem que o documento não mudou depois, e por isso é fácil de contestar. Não use o Cachety quando pedirem assinatura com certificado digital, quando a lei exigir uma forma especial, como testamento ou escritura em cartório, ou quando a outra parte impuser a própria plataforma de assinatura. Isto não é aconselhamento jurídico.",
  },
];

const HOW_TO: GuideBlock[] = [
  { type: "h2", text: "Como assinar com o Cachety" },
  {
    type: "steps",
    items: [
      "Abra cachety.com/pt/sign no navegador do celular ou do computador. Não precisa instalar nada nem criar conta.",
      "Solte o PDF ou a foto do documento na página. Você pode adicionar vários documentos de uma vez.",
      "Desenhe, digite ou importe sua assinatura. Se quiser, mantenha a data de hoje e acrescente o local e uma frase como “Li e concordo”.",
      "Arraste a assinatura até a linha certa e ajuste o tamanho. Se pedirem rubrica em todas as páginas, ative essa opção.",
      "Confira a prévia e baixe o PDF assinado. Guarde a impressão digital que aparece depois do download.",
    ],
  },
  {
    type: "tip",
    text: "O teste do modo avião: abra cachety.com/pt/sign, ative o modo avião e assine um documento. Se tudo funcionar, nada saiu do seu aparelho. Uma plataforma que recebe o arquivo não funciona sem internet.",
  },
];

export const SIGN_COMPARISONS_PT: Comparison[] = [
  // ---------------------------------------------------------------- DocuSign
  {
    tool: "sign",
    slug: "cachety-vs-docusign",
    competitor: "docusign",
    competitorName: "DocuSign",
    competitorUrl: "https://www.docusign.com/",
    title: "Cachety ou DocuSign: qual usar para assinar um documento?",
    metaTitle: "DocuSign ou Cachety: assinar PDF sem enviar o arquivo",
    description:
      "DocuSign ou Cachety? Um envia contratos para várias pessoas assinarem, com trilha de auditoria. O outro assina seu PDF no aparelho, grátis e sem conta.",
    intro:
      "O DocuSign é uma plataforma de assinatura eletrônica: você envia um documento, as pessoas assinam e tudo fica registrado. O Cachety faz outra coisa: deixa você assinar sozinho um PDF dentro do navegador, sem conta e sem enviar o arquivo.",
    verdict:
      "As duas ferramentas não fazem o mesmo trabalho. Para um contrato com várias partes, ordem de assinatura, verificação de identidade e certificado de conclusão, o DocuSign é a melhor escolha. Para assinar você mesmo um contrato de aluguel, uma autorização ou um orçamento e devolver por e-mail, o Cachety resolve em um minuto, de graça e sem que o documento saia do seu aparelho. Em troca, a assinatura do Cachety é uma imagem simples, mais fácil de contestar.",
    table: [
      {
        criterion: "Para que serve",
        cachety: C.purpose,
        other: "Enviar documentos para outras pessoas assinarem, acompanhar o andamento e guardar as provas.",
      },
      {
        criterion: "Onde o documento fica",
        cachety: C.where,
        other:
          "Na nuvem do DocuSign, em uma de cinco regiões de data centers (Estados Unidos, Canadá, Europa, Austrália e Japão). O cliente define por quanto tempo os documentos ficam guardados.",
        edge: "cachety",
      },
      {
        criterion: "Conta e custo",
        cachety: C.account,
        other:
          "Quem recebe assina de graça, sem conta. Para enviar, há um teste grátis de 30 dias e depois planos pagos (Personal, Standard, Business Pro e Advanced).",
        edge: "cachety",
      },
      {
        criterion: "Como criar a assinatura",
        cachety: C.create,
        other: "Estilo automático a partir do seu nome, desenho ou foto da assinatura (PNG, JPG, BMP ou GIF de até 200 KB).",
      },
      {
        criterion: "Vários signatários",
        cachety: C.signers,
        other: "Sim, em sequência, em paralelo ou misto, com lembretes automáticos, modelos e envio em massa.",
        edge: "other",
      },
      {
        criterion: "Provas da assinatura",
        cachety: C.audit,
        other: "Certificado de conclusão e registro de auditoria em todos os planos.",
        edge: "other",
      },
      {
        criterion: "Verificação de identidade",
        cachety: C.identity,
        other: "Código por SMS, confirmação por telefone ou verificação de documento oficial.",
        edge: "other",
      },
      {
        criterion: "Tipo de assinatura",
        cachety: C.level,
        other:
          "Documentos selados digitalmente com infraestrutura de chave pública (PKI). Assinatura eletrônica qualificada europeia como complemento dos planos.",
        edge: "other",
      },
      {
        criterion: "Campos no documento",
        cachety: "Assinatura, data, local, uma frase curta e rubrica em todas as páginas.",
        other: "Rubricas, texto, caixas de seleção, botões de opção, listas suspensas e outros campos.",
        edge: "other",
      },
      {
        criterion: "No celular",
        cachety: C.phone,
        other: "Apps para iPhone e Android.",
      },
    ],
    body: [
      { type: "h2", text: "Duas ferramentas para trabalhos diferentes" },
      {
        type: "p",
        text: "O DocuSign foi feito para quem precisa colher assinaturas: uma empresa que manda contratos para clientes, um RH que envia documentos para funcionários, uma imobiliária que organiza a assinatura de várias partes. O documento sobe para a plataforma, cada pessoa recebe um link e assina na ordem definida. No fim, sai um certificado de conclusão com o histórico de quem fez o quê.",
      },
      {
        type: "p",
        text: "O Cachety resolve um caso mais simples e muito comum: alguém mandou um PDF para você assinar e devolver. Você desenha ou digita sua assinatura, coloca no lugar certo e baixa o arquivo, sem criar conta e sem que o documento passe por um servidor.",
      },
      { type: "h2", text: "Onde fica o seu documento" },
      {
        type: "p",
        text: "No DocuSign, o documento é guardado na nuvem da empresa, numa das cinco regiões de data centers que ela oferece, e quem envia decide por quanto tempo ele fica lá, podendo apagar quando quiser. Faz sentido: as provas de uma assinatura precisam ficar guardadas em algum lugar. No Cachety, o documento é lido na memória do navegador e o PDF assinado é salvo direto no seu aparelho. Nenhuma cópia fica com terceiros.",
      },
      { type: "h2", text: "Em que o DocuSign é melhor" },
      {
        type: "list",
        items: [
          "Vários signatários, em sequência ou ao mesmo tempo, com lembretes automáticos.",
          "Certificado de conclusão e registro de auditoria em todos os planos.",
          "Verificação de identidade por SMS, telefone ou documento oficial.",
          "Documentos selados com PKI e assinatura qualificada europeia como complemento.",
          "Assinatura em 44 idiomas, mais de 1.100 integrações e APIs para automatizar.",
        ],
      },
      { type: "h2", text: "Em que o Cachety ajuda" },
      {
        type: "list",
        items: [
          "Grátis e sem conta, inclusive para assinar o seu próprio documento.",
          "O documento não sai do seu aparelho, e tudo funciona até no modo avião.",
          "A foto de um documento em papel vira uma página do tamanho A4, pronta para assinar.",
          "O PDF assinado sai sem texto oculto, metadados nem localização GPS das fotos, com senha opcional.",
          "Rubrica em todas as páginas e marca d'água opcional com finalidade, destinatário e data.",
        ],
      },
      ...LEGAL,
      ...HOW_TO,
    ],
    chooseOther: [
      "O contrato precisa da assinatura de várias pessoas, numa ordem definida.",
      "Você precisa de trilha de auditoria, certificado de conclusão ou verificação da identidade de quem assina.",
      "Pedem uma assinatura avançada ou qualificada, com certificado.",
      "Sua empresa manda documentos para assinar com frequência e quer modelos, lembretes e integrações.",
    ],
    chooseCachety: [
      "Você só precisa assinar e devolver um documento do dia a dia, como contrato de aluguel, autorização ou orçamento.",
      "Não quer criar conta nem enviar o documento para um servidor.",
      "Quer assinar pelo celular, até a partir de uma foto do papel, sem instalar app.",
    ],
    faq: [
      {
        q: "Dá para usar o DocuSign de graça?",
        a: "Para assinar um documento que alguém mandou pelo DocuSign, sim: quem recebe assina de graça e sem conta. Para enviar documentos, o DocuSign oferece um teste grátis de 30 dias e depois planos pagos.",
      },
      {
        q: "A assinatura do Cachety vale tanto quanto a do DocuSign?",
        a: "Não. O Cachety coloca uma imagem da sua assinatura na página, o que se chama de assinatura eletrônica simples, e não registra quem assinou nem quando. O DocuSign acrescenta selo digital, registro de auditoria e, se for configurado, verificação de identidade. Numa disputa, essas provas pesam. Para papéis do dia a dia, a assinatura simples costuma ser aceita.",
      },
      {
        q: "Recebi um contrato pelo DocuSign. Posso assinar com o Cachety?",
        a: "Melhor não. Se a outra parte mandou pelo DocuSign, ela espera a assinatura dentro da plataforma, com o registro que vem junto. Assine pelo link que você recebeu. O Cachety serve para quando mandam um PDF por e-mail ou mensagem e pedem que você devolva assinado.",
      },
      {
        q: "O DocuSign guarda meus documentos?",
        a: "Sim, na nuvem da empresa, numa das regiões de data centers dela. Quem envia define o prazo e pode apagar quando quiser. No Cachety não há nada para apagar: o documento nunca é enviado.",
      },
    ],
    sources: [
      { label: "DocuSign: teste grátis de 30 dias", url: "https://www.docusign.com/learn/add-electronic-signature-pdf-free" },
      { label: "DocuSign: assinar grátis, sem conta", url: "https://www.docusign.com/en-gb/esignature/sign-document-online-free" },
      { label: "DocuSign: planos do eSignature", url: "https://ecom.docusign.com/plans-and-pricing/esignature" },
      { label: "DocuSign: recursos do eSignature", url: "https://www.docusign.com/en-ca/products/electronic-signature/features" },
      { label: "DocuSign: personalizar a assinatura", url: "https://docusign.com/blog/quick-tip-customizing-your-signature" },
      {
        label: "DocuSign: assinatura eletrônica qualificada",
        url: "https://www.docusign.com/en-gb/products/electronic-signature/qualified-electronic-signature",
      },
      { label: "DocuSign: idiomas e integrações", url: "https://www.docusign.com/products/electronic-signature" },
      { label: "DocuSign: regiões de data centers", url: "https://www.docusign.com/privacy/data-residency" },
      { label: "DocuSign: gestão e retenção de dados", url: "https://www.docusign.com/trust/privacy/data-mgmt-privacy" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ---------------------------------------------------------------- Youtrust (ex-Yousign)
  {
    tool: "sign",
    slug: "cachety-vs-yousign",
    competitor: "yousign",
    competitorName: "Youtrust (ex-Yousign)",
    competitorUrl: "https://www.youtrust.com/",
    title: "Cachety ou Youtrust (ex-Yousign): qual usar para assinar?",
    metaTitle: "Youtrust (ex-Yousign) ou Cachety para assinar PDF",
    description:
      "Youtrust (ex-Yousign) é uma plataforma francesa de assinatura eletrônica, com conta e provas guardadas. Compare com o Cachety, que assina no seu aparelho.",
    intro:
      "A Yousign, plataforma francesa de assinatura eletrônica, passou a se chamar Youtrust em julho de 2026. O serviço guarda as provas de cada assinatura e oferece os níveis avançado e qualificado. O Cachety é uma ferramenta simples para assinar você mesmo um PDF no navegador, sem conta.",
    verdict:
      "Se você precisa mandar um contrato para outras pessoas assinarem, com um arquivo de provas com data e hora, ou de uma assinatura avançada ou qualificada, o Youtrust é a melhor escolha. Se só precisa assinar e devolver um documento do dia a dia, o Cachety faz isso sem conta e sem que o arquivo saia do seu aparelho. A assinatura do Cachety, porém, é uma imagem simples, mais fácil de contestar.",
    table: [
      {
        criterion: "Para que serve",
        cachety: C.purpose,
        other: "Assinar e pedir assinaturas, nos níveis simples, avançado e qualificado.",
      },
      {
        criterion: "Onde o documento fica",
        cachety: C.where,
        other: "Nos servidores do Youtrust, hospedados exclusivamente na França. As provas são arquivadas pela Arkhinéo.",
        edge: "cachety",
      },
      {
        criterion: "Conta",
        cachety: "Não precisa de conta nem cadastro.",
        other: "Obrigatória, inclusive no plano gratuito.",
        edge: "cachety",
      },
      {
        criterion: "Plano gratuito",
        cachety: "Tudo é grátis: não existe plano pago.",
        other:
          "Sem anúncios, com assinatura dos seus próprios documentos sem limite e 2 pedidos de assinatura por mês. Planos pagos One, Plus e Pro.",
      },
      {
        criterion: "Provas da assinatura",
        cachety: C.audit,
        other: "Arquivo de provas com data e hora, guardado por 10 anos, em todos os planos.",
        edge: "other",
      },
      {
        criterion: "Níveis de assinatura",
        cachety: C.level,
        other:
          "Simples (com código opcional), avançada (com verificação de identidade) e qualificada (com verificação por vídeo). Avançada e qualificada são complementos pagos dos planos Plus e Pro.",
        edge: "other",
      },
      {
        criterion: "Fluxo de assinatura",
        cachety: C.signers,
        other: "Aprovações, ordem dos signatários, lembretes automáticos e modelos. Integra com Zapier e HubSpot; a API é um produto à parte.",
        edge: "other",
      },
      {
        criterion: "Como criar a assinatura",
        cachety: C.create,
        other: "Desenhar, digitar ou importar, sem instalar nada.",
      },
      {
        criterion: "O que fica guardado",
        cachety: C.stored,
        other: "As provas de assinatura por 10 anos e os dados de identidade por 90 dias, segundo a política de privacidade.",
      },
    ],
    body: [
      { type: "h2", text: "Yousign agora é Youtrust" },
      {
        type: "p",
        text: "Em julho de 2026, a Yousign passou a usar o nome Youtrust. A empresa responsável, Youtrust SAS, fica em Caen, na França. Durante a transição, o aplicativo ainda pode aparecer como Yousign, e a migração deve terminar até 2027. Se você conhecia a Yousign, é o mesmo serviço.",
      },
      { type: "h2", text: "Duas ferramentas para trabalhos diferentes" },
      {
        type: "p",
        text: "O Youtrust é uma plataforma de assinatura eletrônica: você envia o documento, convida as pessoas, acompanha quem já assinou e, no fim, tem um arquivo de provas com data e hora. A empresa diz que suas assinaturas seguem o regulamento europeu eIDAS e valem na União Europeia e no Reino Unido, ao contrário de assinaturas que são só uma imagem ou um escaneamento. Para um documento usado no Brasil, confira com quem vai recebê-lo que tipo de assinatura é aceito.",
      },
      {
        type: "p",
        text: "O Cachety não envia nada para ninguém. Ele serve para o caso em que mandaram um PDF para você assinar e devolver: você coloca sua assinatura, baixa o arquivo e responde o e-mail.",
      },
      { type: "h2", text: "Onde fica o seu documento" },
      {
        type: "p",
        text: "No Youtrust, o documento fica nos servidores da empresa, hospedados só na França, e as provas de assinatura são guardadas por 10 anos. Isso faz parte do serviço: é o que permite mostrar, anos depois, quem assinou e quando. No Cachety, o documento nunca sai do seu aparelho, e por isso também não existe registro guardado por terceiros. Se a assinatura for contestada, você terá o seu PDF, a impressão digital dele e o e-mail com que o enviou.",
      },
      { type: "h2", text: "Em que o Youtrust é melhor" },
      {
        type: "list",
        items: [
          "Arquivo de provas com data e hora, guardado por 10 anos, em todos os planos, até no gratuito.",
          "Assinaturas avançada e qualificada, com verificação de identidade, como complementos pagos.",
          "Está na lista europeia de prestadores de serviços de confiança qualificados.",
          "Ordem dos signatários, aprovações, lembretes automáticos e modelos.",
          "Código de acesso por SMS antes de assinar, no plano Plus.",
        ],
      },
      { type: "h2", text: "Em que o Cachety ajuda" },
      {
        type: "list",
        items: [
          "Nenhuma conta para criar: você abre a página e assina.",
          "O documento não sai do seu aparelho, e tudo funciona até no modo avião.",
          "A foto de um documento em papel vira uma página do tamanho A4, pronta para assinar.",
          "O PDF assinado sai sem texto oculto, metadados nem localização GPS das fotos, com senha opcional.",
          "Vários documentos assinados de uma vez, com rubrica em todas as páginas se precisar.",
        ],
      },
      ...LEGAL,
      ...HOW_TO,
    ],
    chooseOther: [
      "Você precisa colher a assinatura de outras pessoas, com ordem e lembretes.",
      "Quer um arquivo de provas com data e hora, guardado por anos.",
      "Pedem uma assinatura avançada ou qualificada, com verificação de identidade.",
      "Você trabalha com empresas europeias e prefere um prestador hospedado na França.",
    ],
    chooseCachety: [
      "Você só precisa assinar e devolver um documento do dia a dia.",
      "Não quer criar conta nem deixar uma cópia do documento num servidor.",
      "Quer assinar vários PDFs ou fotos de documentos de uma vez, de graça.",
    ],
    faq: [
      {
        q: "Yousign e Youtrust são a mesma coisa?",
        a: "Sim. A Yousign anunciou que passaria a se chamar Youtrust a partir de julho de 2026. Durante a transição, o aplicativo ainda pode aparecer com o nome antigo.",
      },
      {
        q: "O Youtrust tem plano gratuito?",
        a: "Tem. Ele pede uma conta, não tem anúncios, permite assinar os seus próprios documentos sem limite e enviar 2 pedidos de assinatura por mês. O arquivo de provas também vem no plano gratuito.",
      },
      {
        q: "A assinatura do Cachety vale tanto quanto a do Youtrust?",
        a: "Não. A assinatura do Cachety é uma imagem, sem arquivo de provas nem verificação de identidade. O próprio Youtrust lembra que assinaturas feitas só com uma imagem ou um escaneamento são mais fracas. Para papéis do dia a dia, a assinatura simples costuma ser aceita; para o que pode virar disputa, prefira uma plataforma com provas.",
      },
      {
        q: "Onde o Youtrust guarda meus documentos?",
        a: "Em servidores hospedados exclusivamente na França, segundo a página de segurança da empresa. As provas de assinatura ficam guardadas por 10 anos.",
      },
    ],
    sources: [
      { label: "Youtrust: Yousign agora é Youtrust", url: "https://youtrust.com/yousign-becomes-youtrust" },
      { label: "Youtrust: plano gratuito", url: "https://youtrust.com/electronic-signature-freemium" },
      { label: "Youtrust: planos", url: "https://youtrust.com/pricing-application" },
      { label: "Youtrust: níveis de assinatura", url: "https://youtrust.com/e-signature" },
      { label: "Youtrust: recursos do aplicativo", url: "https://youtrust.com/application" },
      { label: "Youtrust: como assinar um PDF", url: "https://youtrust.com/blog/how-to-sign-a-pdf" },
      { label: "Youtrust: segurança e hospedagem", url: "https://youtrust.com/security" },
      { label: "Youtrust: política de privacidade", url: "https://youtrust.com/privacy" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ---------------------------------------------------------------- Adobe Acrobat
  {
    tool: "sign",
    slug: "cachety-vs-adobe-fill-sign",
    competitor: "adobe-fill-sign",
    competitorName: "Adobe Acrobat",
    competitorUrl: "https://www.adobe.com/acrobat/online/sign-pdf.html",
    title: "Cachety ou Adobe Acrobat: qual usar para assinar um PDF?",
    metaTitle: "Adobe Acrobat ou Cachety: assinar PDF sem upload",
    description:
      "Assinar PDF no Adobe Acrobat ou no Cachety? Onde fica o arquivo, quando é preciso login e quando a assinatura com certificado do Acrobat faz diferença.",
    intro:
      "O Acrobat, da Adobe, oferece várias formas de assinar: a ferramenta online Assinar PDF, o app Adobe Fill & Sign e, para empresas, o Acrobat Sign. O Cachety faz uma coisa só: deixa você assinar um documento dentro do navegador, sem enviar o arquivo e sem login.",
    verdict:
      "Para pedir a assinatura de outras pessoas, ter trilha de auditoria ou usar uma assinatura digital com certificado, o Acrobat é a melhor escolha. Para assinar um PDF do dia a dia e devolver, o Cachety evita o envio do arquivo e não pede conta. A assinatura do Cachety é uma imagem simples, bem mais fácil de contestar do que uma assinatura com certificado.",
    table: [
      {
        criterion: "Para que serve",
        cachety: C.purpose,
        other: "Assinar PDF online, pedir assinaturas e, com o Acrobat Sign, organizar a assinatura de documentos numa empresa.",
      },
      {
        criterion: "Onde o documento fica",
        cachety: C.where,
        other:
          "Nos servidores da Adobe, que apagam o arquivo, a menos que você entre na conta para salvá-lo. A página não informa o prazo nem o país.",
        edge: "cachety",
      },
      {
        criterion: "Conta",
        cachety: "Não precisa de conta nem cadastro.",
        other: "A página da ferramenta diz que é preciso entrar na conta para concluir o formulário preenchível.",
        edge: "cachety",
      },
      {
        criterion: "Como criar a assinatura",
        cachety: C.create,
        other: "Digitar, desenhar ou importar uma imagem da assinatura.",
      },
      {
        criterion: "Campos no documento",
        cachety: "Assinatura, data, local, uma frase curta e rubrica em todas as páginas.",
        other: "Assinatura, rubricas, texto, marcas de seleção e linhas.",
      },
      {
        criterion: "Pedir assinaturas e trilha de auditoria",
        cachety: C.signers,
        other:
          "Possível, mas pode exigir um plano pago do Acrobat. O Acrobat Sign envia para vários signatários, com modelos e trilhas de auditoria.",
        edge: "other",
      },
      {
        criterion: "Assinatura com certificado",
        cachety: C.level,
        other:
          "Assinaturas digitais baseadas em certificado que, segundo a Adobe, atendem ao nível qualificado do eIDAS. O Acrobat Sign trabalha com mais de 200 prestadores de serviços de confiança.",
        edge: "other",
      },
      {
        criterion: "Integrações",
        cachety: "Nenhuma: é uma página da web.",
        other: "O Acrobat Sign funciona dentro do Microsoft Word, Teams, Salesforce e Workday.",
        edge: "other",
      },
      {
        criterion: "No celular",
        cachety: C.phone,
        other: "App Acrobat Reader para iPhone e Android, com assinatura, e app Adobe Fill & Sign para iPhone, que fotografa um formulário em papel.",
      },
    ],
    body: [
      { type: "h2", text: "O Acrobat tem várias ferramentas de assinatura" },
      {
        type: "p",
        text: "Quando se fala em assinar com a Adobe, podem ser três coisas: a ferramenta online Assinar PDF, que roda no site; o app Adobe Fill & Sign, que preenche e assina formulários no iPhone; e o Acrobat Sign, o serviço para empresas mandarem documentos a vários signatários, com modelos e trilhas de auditoria. Esta página compara o Cachety principalmente com a ferramenta online, que é a mais próxima dele.",
      },
      { type: "h2", text: "Onde fica o seu documento" },
      {
        type: "p",
        text: "A ferramenta online da Adobe envia o PDF para os servidores da empresa. A página diz que o arquivo é tratado com segurança e apagado, a menos que você entre na conta para salvá-lo, mas não informa em quanto tempo nem em que país. Para quem está na União Europeia, a responsável pelos dados é a Adobe Systems Software Ireland Limited. No Cachety, o PDF é lido na memória do navegador e o arquivo assinado é salvo direto no seu aparelho.",
      },
      { type: "h2", text: "Em que o Acrobat é melhor" },
      {
        type: "list",
        items: [
          "Assinaturas digitais com certificado, que a Adobe diz atenderem ao nível qualificado do eIDAS.",
          "Acrobat Sign: vários signatários, modelos e trilhas de auditoria.",
          "Integração com Microsoft Word, Teams, Salesforce e Workday.",
          "Apps de celular, incluindo o Fill & Sign, que fotografa um formulário em papel.",
          "Mais campos no documento, como marcas de seleção e linhas.",
        ],
      },
      {
        type: "p",
        text: "A Adobe também diz que suas assinaturas eletrônicas são legalmente suficientes segundo o ESIGN Act e a UETA, que são leis dos Estados Unidos. Para um documento usado no Brasil, o que conta são as regras brasileiras e o que a outra parte aceita.",
      },
      { type: "h2", text: "Em que o Cachety ajuda" },
      {
        type: "list",
        items: [
          "Nenhum login, nem para baixar o documento assinado.",
          "O documento não sai do seu aparelho, e tudo funciona até no modo avião.",
          "A foto de um documento em papel vira uma página do tamanho A4, direto no navegador do celular.",
          "O PDF assinado sai sem texto oculto, metadados nem localização GPS das fotos, com senha opcional.",
          "Vários documentos assinados de uma vez, com marca d'água opcional com finalidade, destinatário e data.",
        ],
      },
      ...LEGAL,
      ...HOW_TO,
    ],
    chooseOther: [
      "Pedem uma assinatura digital com certificado.",
      "Você precisa mandar o documento para várias pessoas assinarem e ter trilha de auditoria.",
      "Sua empresa já usa Word, Teams ou Salesforce e quer assinar por lá.",
      "Você já tem conta Adobe e quer guardar os documentos nela.",
    ],
    chooseCachety: [
      "Você só quer assinar e devolver um PDF, sem entrar em conta nenhuma.",
      "Prefere que o documento não seja enviado para um servidor.",
      "Tem só a versão em papel e quer assinar uma foto dela pelo navegador do celular.",
    ],
    faq: [
      {
        q: "Precisa de conta para assinar PDF no site da Adobe?",
        a: "A página da ferramenta Assinar PDF diz que é preciso entrar na conta para concluir o formulário preenchível. No Cachety não existe conta: você abre a página e assina.",
      },
      {
        q: "A Adobe guarda o meu PDF?",
        a: "Segundo a página da ferramenta, o arquivo é tratado nos servidores da Adobe e apagado, a menos que você entre na conta para salvá-lo. A página não diz em quanto tempo.",
      },
      {
        q: "Qual é a diferença entre a assinatura do Cachety e a assinatura digital do Acrobat?",
        a: "A do Cachety é uma imagem colocada na página: uma assinatura eletrônica simples. A assinatura digital do Acrobat usa um certificado que vincula a assinatura a quem assinou e mostra se o documento mudou depois. Quando pedirem uma assinatura com certificado, use uma ferramenta como o Acrobat.",
      },
      {
        q: "O Adobe Fill & Sign faz a mesma coisa que o Cachety?",
        a: "Em parte: os dois deixam você assinar a foto de um formulário em papel. O Fill & Sign é um app para iPhone. O Cachety funciona no navegador de qualquer celular ou computador e não envia o documento.",
      },
    ],
    sources: [
      { label: "Adobe: Assinar PDF online", url: "https://www.adobe.com/acrobat/online/sign-pdf.html" },
      { label: "App Store: Adobe Fill & Sign", url: "https://apps.apple.com/cr/app/adobe-fill-sign/id950099951" },
      { label: "Adobe: Acrobat Sign para empresas", url: "https://www.adobe.com/acrobat/business/sign.html" },
      { label: "Adobe: conformidade com o eIDAS", url: "https://www.adobe.com/acrobat/business/compliance/eidas.html" },
      { label: "Adobe: política de privacidade", url: "https://www.adobe.com/privacy/policy.html" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ---------------------------------------------------------------- iLovePDF
  {
    tool: "sign",
    slug: "cachety-vs-ilovepdf-sign",
    competitor: "ilovepdf-sign",
    competitorName: "iLovePDF",
    competitorUrl: "https://www.ilovepdf.com/sign-pdf",
    title: "Cachety ou iLovePDF: qual usar para assinar um PDF?",
    metaTitle: "iLovePDF ou Cachety para assinar PDF: comparativo",
    description:
      "Assinar PDF no iLovePDF ou no Cachety: envio do arquivo, conta, anúncios, trilha de auditoria e assinatura digital. Veja quando cada um é melhor.",
    intro:
      "O iLovePDF, de uma empresa de Barcelona, tem uma ferramenta para assinar PDF ligada ao serviço iLoveSign. Dá para assinar sozinho ou convidar outras pessoas. O Cachety só assina o seu próprio documento, e faz isso sem enviar o arquivo.",
    verdict:
      "O iLovePDF oferece assinatura simples e, no Premium, assinatura digital com hash certificado e carimbo de tempo qualificado, além de convites, ordem de assinatura e trilha de auditoria. Para um contrato com várias partes ou que precise de provas, ele é a melhor escolha. Para assinar sozinho um documento do dia a dia, o Cachety não envia o arquivo, não tem anúncios e não pede conta; em troca, a assinatura é só uma imagem, mais fácil de contestar.",
    table: [
      {
        criterion: "Onde o documento fica",
        cachety: C.where,
        other:
          "Nos servidores do iLovePDF, dentro do Espaço Econômico Europeu. Os arquivos são apagados em até duas horas; documentos assinados ficam guardados por até 5 anos.",
        edge: "cachety",
      },
      {
        criterion: "Conta",
        cachety: "Não precisa de conta nem cadastro.",
        other: "Necessária para pedir assinaturas a outras pessoas.",
      },
      {
        criterion: "Tipos de assinatura",
        cachety: C.level,
        other: "Assinatura simples e, no Premium, assinatura digital com hash certificado e carimbo de tempo qualificado embutidos no PDF.",
        edge: "other",
      },
      {
        criterion: "Vários signatários",
        cachety: C.signers,
        other: "Opção de assinar só você ou convidar outras pessoas, com ordem de assinatura, prazo de validade e lembretes.",
        edge: "other",
      },
      {
        criterion: "Provas da assinatura",
        cachety: C.audit,
        other: "Trilha de auditoria gerada no fim; a tabela de planos do iLoveSign fala em arquivo por 10 anos.",
        edge: "other",
      },
      {
        criterion: "Verificação de identidade",
        cachety: C.identity,
        other: "Validação por SMS, que transforma a assinatura em assinatura avançada no padrão eIDAS, e opção de leitura de documento de identidade.",
        edge: "other",
      },
      {
        criterion: "Como criar a assinatura",
        cachety: C.create,
        other: "Desenhar, digitar ou importar (PNG, JPG ou SVG), com rubrica, data e campos de texto.",
      },
      {
        criterion: "Anúncios e limites do plano gratuito",
        cachety: "Sem anúncios, sem rastreadores e sem plano pago.",
        other: "O plano Basic gratuito tem anúncios e limite de 50 MB para assinar, e os pedidos de assinatura são limitados.",
        edge: "cachety",
      },
      {
        criterion: "No celular",
        cachety: C.phone,
        other: "Apps para iPhone e Android.",
      },
    ],
    body: [
      { type: "h2", text: "Assinatura simples ou digital" },
      {
        type: "p",
        text: "O iLovePDF oferece dois tipos. A assinatura simples é parecida com a do Cachety: você desenha, digita ou importa sua assinatura e a coloca na página. A assinatura digital, no Premium, vai além: o iLovePDF embute no PDF um hash certificado e um carimbo de tempo qualificado, que permitem mostrar que o documento não mudou depois. Com validação por SMS, a assinatura passa a ser avançada no padrão europeu eIDAS.",
      },
      {
        type: "p",
        text: "O Cachety só faz a primeira coisa: uma assinatura eletrônica simples, sem certificado nem carimbo de tempo. Em troca, faz isso sem que o documento saia do seu aparelho.",
      },
      { type: "h2", text: "Onde fica o seu documento" },
      {
        type: "p",
        text: "No iLovePDF, o PDF é enviado para os servidores da empresa, dentro do Espaço Econômico Europeu. A página de segurança diz que os arquivos são apagados em até duas horas e que os documentos assinados ficam guardados por no máximo 5 anos. A empresa tem certificação ISO/IEC 27001. No Cachety, nenhum servidor recebe o documento, e por isso não há nada para apagar.",
      },
      { type: "h2", text: "Em que o iLovePDF é melhor" },
      {
        type: "list",
        items: [
          "Assinatura digital com hash certificado e carimbo de tempo qualificado, no Premium.",
          "Convites para outras pessoas, com ordem de assinatura, prazo e lembretes.",
          "Trilha de auditoria ao final da assinatura.",
          "Validação por SMS e leitura de documento de identidade.",
          "Muitas outras ferramentas de PDF no mesmo site, e apps de celular.",
        ],
      },
      { type: "h2", text: "Em que o Cachety ajuda" },
      {
        type: "list",
        items: [
          "O documento não sai do seu aparelho, e tudo funciona até no modo avião.",
          "Sem anúncios, sem conta e sem plano pago.",
          "A foto de um documento em papel vira uma página do tamanho A4, pronta para assinar.",
          "O PDF assinado sai sem texto oculto, metadados nem localização GPS das fotos, com senha opcional.",
          "Impressão digital SHA-256 de cada arquivo depois do download, para você guardar.",
        ],
      },
      ...LEGAL,
      ...HOW_TO,
    ],
    chooseOther: [
      "Você precisa convidar outras pessoas para assinar, numa ordem definida.",
      "Quer uma trilha de auditoria ou uma assinatura digital com carimbo de tempo qualificado.",
      "Pedem uma assinatura avançada, com validação por SMS ou documento de identidade.",
      "Você já usa o iLovePDF para outras tarefas de PDF e quer tudo no mesmo lugar.",
    ],
    chooseCachety: [
      "Você só precisa assinar e devolver um documento do dia a dia.",
      "Não quer que o documento passe por um servidor, nem por duas horas.",
      "Quer assinar sem anúncios e sem criar conta.",
    ],
    faq: [
      {
        q: "O iLovePDF guarda meus documentos assinados?",
        a: "A página de segurança diz que os arquivos são apagados em até duas horas, mas que os documentos assinados ficam guardados por no máximo 5 anos. No Cachety, o documento nunca é enviado.",
      },
      {
        q: "Qual é a diferença entre a assinatura simples e a digital do iLovePDF?",
        a: "A simples é uma assinatura colocada na página, como a do Cachety. A digital, no Premium, embute no PDF um hash certificado e um carimbo de tempo qualificado, que servem para mostrar se o documento foi alterado depois.",
      },
      {
        q: "A assinatura do Cachety tem trilha de auditoria?",
        a: "Não. O Cachety não registra quem assinou nem quando. Ele mostra a impressão digital SHA-256 do arquivo depois do download, que ajuda a reconhecer a versão que você assinou, mas isso não substitui uma trilha de auditoria. Se você precisa de uma, use uma plataforma como o iLovePDF.",
      },
    ],
    sources: [
      { label: "iLovePDF: assinar PDF", url: "https://www.ilovepdf.com/sign-pdf" },
      {
        label: "iLovePDF: como assinar um PDF (blog)",
        url: "https://www.ilovepdf.com/blog/how-to-add-a-signature-to-a-pdf-document-online-using-ilovepdf",
      },
      { label: "iLovePDF: planos", url: "https://www.ilovepdf.com/pricing" },
      { label: "iLoveSign: planos de assinatura", url: "https://www.ilovesign.com/esignature-pricing" },
      { label: "iLovePDF: segurança", url: "https://www.ilovepdf.com/help/security" },
      { label: "iLovePDF: política de privacidade", url: "https://www.ilovepdf.com/help/privacy" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },

  // ---------------------------------------------------------------- Smallpdf
  {
    tool: "sign",
    slug: "cachety-vs-smallpdf-sign",
    competitor: "smallpdf-sign",
    competitorName: "Smallpdf",
    competitorUrl: "https://smallpdf.com/sign-pdf",
    title: "Cachety ou Smallpdf: qual usar para assinar um PDF?",
    metaTitle: "Smallpdf ou Cachety para assinar PDF sem cadastro",
    description:
      "Smallpdf e Cachety assinam PDF sem cadastro. A diferença: o Smallpdf envia o arquivo para os servidores dele, e o Cachety assina tudo no seu aparelho.",
    intro:
      "O Smallpdf, de uma empresa de Zurique, tem uma ferramenta para assinar PDF que não pede cadastro nem instalação. Para pedir assinaturas a outras pessoas, ele usa o serviço Sign.com. O Cachety também dispensa cadastro, mas o documento não sai do seu aparelho.",
    verdict:
      "Para assinar sozinho, as duas ferramentas se parecem no uso: desenhar, digitar ou importar a assinatura, sem criar conta. A diferença é onde o arquivo fica: o Smallpdf o processa nos servidores dele e o apaga depois de uma hora; o Cachety não envia nada. Se você precisa pedir a assinatura de outras pessoas, com acompanhamento e certificado de conclusão, o Smallpdf com o Sign.com é a melhor escolha.",
    table: [
      {
        criterion: "Conta",
        cachety: "Não precisa de conta nem cadastro.",
        other: "Não precisa de cadastro nem instalação para assinar.",
      },
      {
        criterion: "Onde o documento fica",
        cachety: C.where,
        other: "Nos servidores do Smallpdf, com envio criptografado (TLS). A política de privacidade cita servidores da Hetzner na União Europeia e a Cloudflare.",
        edge: "cachety",
      },
      {
        criterion: "Por quanto tempo fica guardado",
        cachety: "Nada a apagar: o Cachety nunca recebe o documento.",
        other: "Apagado automaticamente depois de uma hora, a menos que você o salve na sua conta Smallpdf.",
        edge: "cachety",
      },
      {
        criterion: "Como criar a assinatura",
        cachety: C.create,
        other: "Desenhar, digitar ou importar; acrescentar rubrica, texto e datas.",
      },
      {
        criterion: "Pedir assinaturas a outras pessoas",
        cachety: C.signers,
        other: "Sim, pelo Sign.com, com acompanhamento, selos digitais e certificado de conclusão.",
        edge: "other",
      },
      {
        criterion: "Uso gratuito",
        cachety: "Grátis, sem plano pago e sem cota de downloads, porque tudo roda no seu aparelho.",
        other: "Limite diário de downloads no uso gratuito; o Sign.com gratuito permite um número limitado de documentos por mês.",
        edge: "cachety",
      },
      {
        criterion: "Rastreamento",
        cachety: C.ads,
        other: "Com o seu consentimento, Google Analytics, remarketing do Google Ads, Facebook Pixel e LinkedIn.",
        edge: "cachety",
      },
      {
        criterion: "O que cada um diz sobre a validade",
        cachety: "Assinatura eletrônica simples, uma imagem: não prova sozinha quem assinou e é fácil de contestar.",
        other: "O Sign.com fala em assinaturas válidas segundo o eIDAS, sem dizer o nível; o Smallpdf diz que é juridicamente vinculante e pede que você confira as leis locais.",
      },
      {
        criterion: "No celular",
        cachety: C.phone,
        other: "Apps para Android e iPhone.",
      },
    ],
    body: [
      { type: "h2", text: "Parecidos no uso, diferentes no caminho do arquivo" },
      {
        type: "p",
        text: "Smallpdf e Cachety fazem quase o mesmo gesto: você abre a página, cria a assinatura, coloca no lugar e baixa o PDF, sem cadastro. A diferença não aparece na tela. No Smallpdf, o arquivo é enviado com criptografia para os servidores da empresa, processado lá e apagado depois de uma hora, se você não salvar na conta. No Cachety, o arquivo nunca sai do navegador.",
      },
      {
        type: "p",
        text: "O Smallpdf também diz, na política de privacidade, que usa com o seu consentimento ferramentas como Google Analytics, remarketing do Google Ads, Facebook Pixel e LinkedIn. O Cachety não tem anúncios nem rastreadores.",
      },
      { type: "h2", text: "Em que o Smallpdf é melhor" },
      {
        type: "list",
        items: [
          "Pedir assinaturas a outras pessoas e acompanhar o andamento, pelo Sign.com.",
          "Selos digitais e certificado de conclusão nos documentos enviados pelo Sign.com.",
          "Campos de texto e datas, além da assinatura e da rubrica.",
          "Muitas outras ferramentas de PDF no mesmo site, e apps de celular.",
        ],
      },
      { type: "h2", text: "Em que o Cachety ajuda" },
      {
        type: "list",
        items: [
          "O documento não sai do seu aparelho, e tudo funciona até no modo avião.",
          "Sem rastreadores, sem anúncios e sem limite diário.",
          "A foto de um documento em papel vira uma página do tamanho A4, pronta para assinar.",
          "O PDF assinado sai sem texto oculto, metadados nem localização GPS das fotos, com senha opcional.",
          "Rubrica em todas as páginas e marca d'água opcional com finalidade, destinatário e data.",
        ],
      },
      ...LEGAL,
      ...HOW_TO,
    ],
    chooseOther: [
      "Você precisa mandar o documento para outras pessoas assinarem e acompanhar quem já assinou.",
      "Quer selos digitais e um certificado de conclusão, como os do Sign.com.",
      "Já usa o Smallpdf para outras tarefas de PDF e quer tudo no mesmo lugar.",
    ],
    chooseCachety: [
      "Você quer assinar sem que o documento seja enviado, nem por uma hora.",
      "Prefere um site sem rastreadores de publicidade.",
      "Assina vários documentos e não quer esbarrar num limite diário.",
    ],
    faq: [
      {
        q: "O Smallpdf precisa de cadastro para assinar?",
        a: "Não. A página de assinatura diz que não é preciso criar conta nem instalar nada. O Cachety também não pede cadastro. A diferença é que o Smallpdf envia o arquivo para os servidores dele.",
      },
      {
        q: "Por quanto tempo o Smallpdf guarda meu PDF?",
        a: "Segundo a página da ferramenta, os arquivos são apagados automaticamente depois de uma hora, a menos que você os salve na sua conta Smallpdf.",
      },
      {
        q: "A assinatura do Smallpdf vale mais que a do Cachety?",
        a: "Para assinar sozinho, as duas colocam a sua assinatura na página. Quando você pede assinaturas pelo Sign.com, entram selos digitais e um certificado de conclusão, que o Cachety não tem. A própria Smallpdf pede que você confira as leis locais. Para papéis do dia a dia, a assinatura simples costuma ser aceita.",
      },
    ],
    sources: [
      { label: "Smallpdf: assinar PDF", url: "https://smallpdf.com/sign-pdf" },
      { label: "Smallpdf: assinatura eletrônica", url: "https://smallpdf.com/sign" },
      { label: "Smallpdf: planos", url: "https://smallpdf.com/pricing" },
      { label: "Sign.com com Smallpdf", url: "https://sign.com/smallpdf" },
      { label: "Smallpdf: política de privacidade", url: "https://smallpdf.com/privacy" },
    ],
    checked: CHECKED,
    updated: UPDATED,
  },
];
