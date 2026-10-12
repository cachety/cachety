# Cachety

[English](README.md) · [Français](README.fr.md) · [Español](README.es.md) · **Português** · [Deutsch](README.de.md) · [Nederlands](README.nl.md) · [Bahasa Indonesia](README.id.md) · [العربية](README.ar.md) · [فارسی](README.fa.md) · [日本語](README.ja.md) · [简体中文](README.zh.md)

**Coloque marca d'água nos seus documentos de identidade e papéis sensíveis sem que eles saiam do seu aparelho.**

O Cachety coloca marca d'água em PDFs e fotos (RG, CNH, passaporte, holerite, declaração do Imposto de Renda, extrato bancário) inteiramente dentro do seu navegador. Nenhum arquivo é enviado: não existe servidor que possa receber um. É grátis, não precisa de cadastro, não rastreia ninguém e tem código aberto.

### 👉 Use agora: **[cachety.com](https://cachety.com)**

Disponível em English, Français, Español, Português, Deutsch, Nederlands, Bahasa Indonesia, العربية, فارسی, 日本語 e 简体中文.

![Cachety: um PDF com marca d'água feita no navegador](docs/preview.png)

## Por que ele existe

Pedem cópia dos nossos documentos o tempo todo: para alugar um imóvel, começar num emprego, abrir uma conta no banco. Depois de enviada, uma cópia sem marca pode ser reaproveitada para qualquer coisa, inclusive golpes e roubo de identidade. Uma marca d'água que diz para que serve a cópia, para quem é e a data prende a cópia a esse único uso. O serviço oficial francês de apoio às vítimas de crimes digitais, [Cybermalveillance.gouv.fr](https://www.cybermalveillance.gouv.fr), recomenda exatamente isso.

A maioria das ferramentas online de marca d'água faz isso enviando seu documento para os servidores delas. O Cachety, não.

## Use a versão online: é o melhor jeito

Você não precisa instalar nem compilar nada. **[cachety.com](https://cachety.com)** é a versão que recomendamos para todo mundo:

- **Igualmente privada.** Mesmo online, seus arquivos nunca saem do seu aparelho: a página faz todo o trabalho dentro do navegador e é tecnicamente proibida de enviar dados para qualquer lugar. Confira você mesmo: carregue a página, ative o modo avião e coloque marca d'água num documento.
- **Mais protegida.** O site oficial é servido com o conjunto completo de cabeçalhos de segurança (proteção contra clickjacking, HSTS, isolamento entre origens, uma Content-Security-Policy rigorosa por página). Uma cópia caseira num servidor web simples muitas vezes deixa alguns de fora.
- **Sempre atualizada.** Correções de segurança e melhorias chegam na sua próxima visita, sem nada para atualizar.
- **Rápida em qualquer lugar.** Servida por uma CDN global, abre rápido onde você estiver e funciona offline depois de carregada.
- **Confortável em qualquer aparelho.** Funciona no computador, no iPhone e no Android. Adicione à tela inicial como um app; no Android, compartilhe um arquivo direto para o Cachety.
- **Ajuda incluída.** Um tour guiado mostra por onde começar para quem chega pela primeira vez, e guias práticos explicam as situações mais comuns.

Hospedar por conta própria continua possível e com suporte completo (veja abaixo), para as organizações que precisam disso.

## Recursos

- **PDFs e imagens:** JPG, PNG, WebP, GIF, BMP, AVIF e fotos de iPhone (HEIC). Um arquivo ou vários de uma vez (até 200 MB por arquivo, 500 páginas por PDF).
- **Marca d'água na página inteira**, incorporada à imagem. Não sai só editando o PDF, e a disposição varia em cada cópia. Escolha de fonte, tamanho, cor, opacidade e efeito de ondulação.
- **Três passos simples:** seu documento, para que serve e quem vai receber, depois a prévia e o download. O texto da marca d'água é escrito para você ("finalidade, destinatário, data", com exemplos prontos) e pode ser editado à vontade.
- **Dados ocultos removidos:** texto selecionável, metadados e a localização GPS das fotos. Cada página é reconstruída a partir dos pixels.
- **Ocultação:** cubra um número de conta, o CPF ou uma foto. O conteúdo é realmente apagado, não só coberto.
- **Cópias rastreáveis:** adicione `{code}` ao texto e cada cópia ganha seu próprio código curto, listado depois do download para você guardar.
- **Vários destinatários:** uma cópia por destinatário (até 20), cada uma com o nome da pessoa, num único download.
- **Senha:** criptografia AES-256 do PDF (PDF 2.0). Marcar "Proteger com senha" cria uma senha fácil de ler com 12 palavras aleatórias (132 bits, lista de palavras BIP39); sua própria senha ou uma senha aleatória de 256 bits continuam disponíveis. Limpeza automática da área de transferência.
- **Tamanho do arquivo mostrado antes do download**, com "Diminuir o tamanho" (10, 5, 2 ou 1 MB) para portais e e-mails que limitam o envio.
- **PDF único** na ordem que você escolher (arrastar e soltar), ou um arquivo **ZIP**.
- **Funciona no celular**, pode ser instalado como app e funciona **offline** depois de carregado.
- **11 idiomas**, com layout da direita para a esquerda para árabe e persa e fontes próprias para cada escrita.
- **Tour de ajuda guiado** para quem chega pela primeira vez, oferecido quando a pessoa parece não saber por onde começar.
- **70 guias práticos** para situações do dia a dia na França, no Reino Unido, na Alemanha, na Holanda, na Espanha e na América Latina, no Brasil, na Indonésia, no mundo árabe, no Irã, no Japão e na China.
- **82 comparativos verificados** com outras ferramentas de marca d'água (FiligraneFacile, iLovePDF, Proton, Smallpdf, PDF24, Adobe Acrobat e outras), com fontes, incluindo quando outra ferramenta é a melhor escolha.
- **Em sites parceiros:** sites aprovados podem mostrar a ferramenta nas próprias páginas (um iframe servido por cachety.com, então o site anfitrião não vê os documentos). Veja [docs/embed.md](docs/embed.md) e [cachety.com/pt/partners](https://cachety.com/pt/partners).

## Privacidade desde a concepção, e verificável

- Todo o processamento acontece no navegador (pdf.js, canvas, pdf-lib). Os arquivos só existem na memória, como objetos `File`/`Blob`.
- A Content-Security-Policy define `connect-src 'self'`, então o próprio navegador recusa qualquer requisição para outro domínio, mesmo que algum código malicioso chegasse a rodar.
- Não há cookies, estatísticas, scripts de terceiros nem contas. Só as preferências de exibição ficam no `localStorage`. As fontes são servidas pelo próprio site.
- Cada garantia é verificada por testes automáticos que rodam a cada mudança: CSP, ausência de recursos externos, limpeza dos arquivos gerados e uma tentativa simulada de exfiltração.

Modelo de ameaças, controles e testes completos: **[docs/security.md](docs/security.md)**. Para relatar uma vulnerabilidade, veja **[SECURITY.md](SECURITY.md)**.

## Hospedar por conta própria

Não é preciso confiar na nossa implantação: o site é uma exportação estática que você mesmo pode hospedar.

Pré-requisito: [Bun](https://bun.sh).

```sh
git clone https://github.com/cachety/cachety
cd cachety
bun install
bun run build      # exportação estática em out/
bunx serve out     # ou qualquer servidor de arquivos estáticos
```

A pasta `out/` pode ser colocada como está em qualquer hospedagem estática. Cada página leva a própria Content-Security-Policy numa tag `<meta>`, então o bloqueio de rede continua funcionando sem os nossos cabeçalhos HTTP. Para ter a mesma proteção do cachety.com, configure também os cabeçalhos de `out/_headers`. Veja [docs/deploy.md](docs/deploy.md) para Cloudflare Pages, GitHub Pages e outros servidores.

## Coloque o Cachety no seu site (parceiros)

Imobiliárias, plataformas de RH, associações: sites aprovados podem mostrar a ferramenta completa nas próprias páginas, para que quem envia documentos coloque a marca d'água ali mesmo.

- **Privado desde a concepção:** a ferramenta roda em um quadro servido por cachety.com. A página que a exibe, e qualquer script nela, não consegue ler os documentos. Eles nunca saem do aparelho do visitante.
- **Personalizável:** finalidade e destinatário já preenchidos (o visitante pode mudar), cor dos botões e idioma. Só a altura do quadro é enviada para a página.
- **Só parceiros aprovados:** os sites autorizados ficam em [`partners.json`](partners.json). O navegador recusa todos os outros.
- **Grátis**, como o resto do projeto. Se for útil, uma doação é bem-vinda.

**Como participar:** [abra um pedido](https://github.com/cachety/cachety/issues/new?template=partner.yml) com o endereço do seu site. Depois de aprovado e publicado, cole o código:

```html
<iframe src="https://cachety.com/embed/pt#for=Proposta%20de%20aluguel&to=Imobili%C3%A1ria%20Martins"
        title="Cachety" loading="lazy" allow="clipboard-write"
        style="width: 100%; min-height: 640px; border: 0"></iframe>
```

A [página para sites](https://cachety.com/pt/partners) gera esse código para você, com uma prévia real, o script curto de altura automática e um texto pronto para usar. Detalhes técnicos: [docs/embed.md](docs/embed.md).

## Desenvolvimento

```sh
bun run dev        # servidor de desenvolvimento
bun test           # testes unitários e verificações estáticas de segurança
bun run test:e2e   # testes no navegador (CHROMIUM_EXE=/caminho/do/chrome para usar um Chrome local)
```

Tecnologias: Next.js (exportação estática), React, Tailwind CSS, PDF.js, pdf-lib, libheif.

- Textos da interface: `lib/i18n.tsx` (francês, inglês, japonês, chinês) e `lib/locales/<lang>/strings.ts` (os outros idiomas).
- Textos do site: `lib/site-copy.ts` e `lib/locales/<lang>/site.ts`. Metadados das páginas: `lib/site-meta.ts` e `lib/locales/<lang>/meta.ts`.
- Guias: `lib/guides/<lang>.ts`.
- Páginas de comparação ("Cachety ou X"): `lib/compare/<lang>.ts`. Toda afirmação sobre outra ferramenta precisa citar a fonte (`sources`) e trazer a data em que foi conferida (`checked`), e cada página precisa dizer quando a outra ferramenta é a melhor escolha. Confira esses fatos regularmente: os serviços mudam.
- As imagens de compartilhamento (`public/og/<lang>.png`, 1200×630) são geradas a partir dos próprios textos e fontes do site com `bun run og` (precisa do Chrome: defina `CHROMIUM_EXE`). Rode de novo quando o título ou as promessas mudarem.
- Os idiomas da direita para a esquerda usam classes lógicas do Tailwind (`ms-`, `pe-`, `start-`, `end-`…) em vez de `ml-`, `pr-`, `left-`, `right-`.

Todos os idiomas precisam manter a mesma estrutura; os testes verificam isso. Regras de contribuição e mapa dos arquivos: **[CONTRIBUTING.md](CONTRIBUTING.md)**.

## Apoie o projeto

O Cachety é grátis e vai continuar grátis. Se ele ajudou você, dá para [apoiar pelo GitHub Sponsors](https://github.com/sponsors/amirhmoradi). As doações ajudam a pagar o domínio e as ferramentas de desenvolvimento e, acima de tudo, o tempo que tudo isso exige.

Hoje não há anúncios. O projeto pode um dia mostrar alguns links patrocinados escolhidos a dedo, no mesmo espírito (ferramentas de criptografia, software livre, envio seguro de documentos). As regras para isso são rígidas e fazem parte da promessa de privacidade:

- claramente identificados como patrocinados;
- servidos pelo próprio domínio do Cachety (só imagens e links): sem rede de anúncios, sem script de terceiros, sem pixel de rastreamento;
- nunca escolhidos nem exibidos com base em qualquer coisa que a pessoa coloque na ferramenta;
- a Content-Security-Policy continua tão rigorosa quanto hoje (`connect-src 'self'`).

## Créditos e licença

O Cachety é um projeto pessoal, criado e mantido por **[Amir Moradi](https://amirmoradi.com)** na França.

Ele é uma versão modificada do **[Filigrane Local](https://github.com/KazeTachinuu/filigrane-local)**, de Hugo Sibony (KazeTachinuu). Esse projeto, por sua vez, foi uma reescrita inspirada no **[Filigraneur](https://github.com/cyberclarence/filigraneur)**, de CyberClarence. Obrigado aos dois. Veja [NOTICE](NOTICE) para mais detalhes.

As senhas fáceis de ler usam a **[lista de palavras BIP39 em inglês](https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt)** (licença MIT, © 2013 Marek Palatinus, Pavol Rusnak, Aaron Voisine, Sean Bowe).

O que está planejado: **[ROADMAP.md](ROADMAP.md)**, também disponível em [cachety.com/pt/roadmap](https://cachety.com/pt/roadmap).

Licenciado sob a **GNU Affero General Public License v3.0** ([LICENSE](LICENSE)). Se você roda uma versão modificada como serviço, a AGPL exige que você ofereça o código-fonte dela aos seus usuários.
