# Cachety

[English](README.md) · [Français](README.fr.md) · **Español** · [Português](README.pt.md) · [Deutsch](README.de.md) · [Nederlands](README.nl.md) · [Bahasa Indonesia](README.id.md) · [العربية](README.ar.md) · [فارسی](README.fa.md) · [日本語](README.ja.md) · [简体中文](README.zh.md)

**Pon una marca de agua a tus documentos de identidad y papeles sensibles sin que salgan nunca de tu dispositivo.**

Cachety añade una marca de agua a PDF y fotos (documento de identidad, pasaporte, nómina, declaración de impuestos, extracto bancario) por completo dentro de tu navegador. Ningún archivo se sube nunca: no existe ningún servidor que pudiera recibirlo. Es gratis, no necesita cuenta, no te rastrea y es de código abierto.

### 👉 Úsalo ahora: **[cachety.com](https://cachety.com)**

Disponible en English, Français, Español, Português, Deutsch, Nederlands, Bahasa Indonesia, العربية, فارسی, 日本語 y 简体中文.

![Cachety: un PDF con marca de agua en el navegador](docs/preview.png)

## Por qué existe

Constantemente nos piden copias de nuestros documentos: para alquilar un piso, empezar un trabajo o abrir una cuenta en el banco. Una vez enviada, una copia sin protección puede usarse para cualquier cosa, incluso para suplantar tu identidad. Una marca de agua que indica para qué es la copia, a quién va dirigida y la fecha la limita a ese único uso. Es justo lo que recomienda [Cybermalveillance.gouv.fr](https://www.cybermalveillance.gouv.fr), el servicio nacional francés de ayuda a las víctimas de ciberdelitos.

La mayoría de las herramientas de marca de agua en línea lo hacen subiendo tu documento de identidad a sus servidores. Cachety no.

## Usa la versión en línea: es la mejor opción

No tienes que instalar ni compilar nada. **[cachety.com](https://cachety.com)** es la versión que recomendamos a todo el mundo:

- **Igual de privada.** Incluso en línea, tus archivos nunca salen de tu dispositivo: la página hace todo el trabajo dentro de tu navegador, y tiene técnicamente prohibido enviar datos a ningún sitio. Compruébalo tú mismo: abre la página, activa el modo avión y ponle una marca de agua a un documento.
- **Mejor protegida.** El sitio oficial se sirve con todas las cabeceras de seguridad (protección contra clickjacking, HSTS, aislamiento cross-origin y una Content-Security-Policy estricta para cada página). Una copia casera en un servidor web básico suele olvidar alguna.
- **Siempre al día.** Las correcciones de seguridad y las mejoras te llegan en tu próxima visita, sin tener que actualizar nada.
- **Rápida en todas partes.** Se sirve desde una CDN global, así que abre rápido estés donde estés, y funciona sin conexión una vez cargada.
- **Cómoda en cualquier dispositivo.** Funciona en ordenadores, iPhone y Android. Añádela a tu pantalla de inicio como una app; en Android, comparte un archivo directamente con Cachety.
- **Con ayuda incluida.** Un recorrido guiado enseña a quien llega por primera vez por dónde empezar, y unas guías prácticas explican las situaciones más comunes.

Alojarla por tu cuenta sigue siendo posible y está totalmente soportado (ver más abajo), para las organizaciones que lo necesiten.

## Funciones

- **PDF e imágenes:** JPG, PNG, WebP, GIF, BMP, AVIF y fotos de iPhone (HEIC). Un archivo o muchos a la vez (hasta 200 MB por archivo y 500 páginas por PDF).
- **Marca de agua en toda la página**, fundida en la imagen. No se puede quitar con solo editar el PDF, y su disposición cambia en cada copia. Puedes elegir la fuente, el tamaño, el color, la opacidad y un efecto de onda.
- **Tres pasos sencillos:** tu documento, para qué es y quién lo recibe, y luego vista previa y descarga. El texto de la marca de agua se escribe por ti («motivo, destinatario, fecha», con ejemplos ya hechos) y puedes editarlo libremente.
- **Datos ocultos eliminados:** texto seleccionable, metadatos y ubicación GPS de las fotos. Cada página se reconstruye a partir de sus píxeles.
- **Tachado:** oculta un IBAN, un número fiscal o una foto. El contenido se elimina de verdad, no solo se tapa.
- **Copias rastreables:** añade `{code}` al texto y cada copia recibe su propia referencia corta, que aparece en una lista después de la descarga para que la guardes.
- **Varios destinatarios:** una copia para cada destinatario (hasta 20), cada una con su nombre, en una sola descarga.
- **Contraseña:** cifrado de PDF AES-256 (PDF 2.0). Al marcar «Proteger con contraseña» se crea una contraseña fácil de leer de 12 palabras aleatorias (132 bits, lista de palabras BIP39); también puedes usar tu propia contraseña o una aleatoria de 256 bits. Borrado automático del portapapeles.
- **Tamaño del archivo visible antes de descargar**, con «Reducir el tamaño» (10, 5, 2 o 1 MB) para los portales y correos que lo limitan.
- **Un solo PDF** en el orden que elijas (arrastrando y soltando), o un archivo **ZIP**.
- **Funciona en el móvil**, se puede instalar como una app y funciona **sin conexión** una vez cargada.
- **11 idiomas**, con diseño de derecha a izquierda para el árabe y el persa, y fuentes específicas para cada escritura.
- **Recorrido guiado** para quien llega por primera vez, que se ofrece cuando alguien parece no saber por dónde empezar.
- **70 guías prácticas** para situaciones cotidianas en Francia, el Reino Unido, Alemania, los Países Bajos, España y Latinoamérica, Brasil, Indonesia, el mundo árabe, Irán, Japón y China.
- **71 comparativas verificadas** con otras herramientas de marca de agua (FiligraneFacile, iLovePDF, Smallpdf, PDF24, Adobe Acrobat y más), con sus fuentes, incluido cuándo otra herramienta es mejor opción.

## Privacidad desde el diseño, y verificable

- Todo el procesamiento ocurre en el navegador (pdf.js, canvas, pdf-lib). Los archivos solo existen en memoria, como objetos `File`/`Blob`.
- La Content-Security-Policy establece `connect-src 'self'`, así que el propio navegador rechaza cualquier petición a otro dominio, incluso si llegara a ejecutarse código malicioso.
- No hay cookies, ni estadísticas, ni scripts de terceros, ni cuentas. Solo se guardan las preferencias de visualización en `localStorage`. Las fuentes las sirve el propio sitio.
- Cada garantía se comprueba con pruebas automáticas que se ejecutan con cada cambio: la CSP, la ausencia de recursos externos, la limpieza de los archivos generados y un intento simulado de exfiltración.

Modelo de amenazas completo, controles y pruebas: **[docs/security.md](docs/security.md)**. Para informar de una vulnerabilidad, consulta **[SECURITY.md](SECURITY.md)**.

## Alojarlo por tu cuenta

No tienes por qué fiarte de nuestro despliegue: el sitio es una exportación estática que puedes alojar tú mismo.

Requisito: [Bun](https://bun.sh).

```sh
git clone https://github.com/cachety/cachety
cd cachety
bun install
bun run build      # static export in out/
bunx serve out     # or any static file server
```

Puedes subir `out/` tal cual a cualquier alojamiento estático. Cada página lleva su propia Content-Security-Policy en una etiqueta `<meta>`, así que el bloqueo de red sigue funcionando sin nuestras cabeceras HTTP. Para tener la misma protección que cachety.com, configura también las cabeceras de `out/_headers`. Consulta [docs/deploy.md](docs/deploy.md) para Cloudflare Pages, GitHub Pages y otros servidores.

## Desarrollo

```sh
bun run dev        # development server
bun test           # unit tests and static security checks
bun run test:e2e   # browser suite (CHROMIUM_EXE=/path/to/chrome to use a local Chrome)
```

Tecnologías: Next.js (exportación estática), React, Tailwind CSS, PDF.js, pdf-lib, libheif.

- Textos de la interfaz: `lib/i18n.tsx` (francés, inglés, japonés, chino) y `lib/locales/<lang>/strings.ts` (los demás idiomas).
- Textos del sitio web: `lib/site-copy.ts` y `lib/locales/<lang>/site.ts`. Metadatos de las páginas: `lib/site-meta.ts` y `lib/locales/<lang>/meta.ts`.
- Guías: `lib/guides/<lang>.ts`.
- Páginas de comparativa («Cachety vs X»): `lib/compare/<lang>.ts`. Cada afirmación sobre otra herramienta debe citar su fuente (`sources`) e indicar la fecha en que se comprobó (`checked`), y cada página debe decir cuándo la otra herramienta es mejor opción. Vuelve a comprobar estos datos con regularidad: los servicios cambian.
- Los idiomas de derecha a izquierda usan clases lógicas de Tailwind (`ms-`, `pe-`, `start-`, `end-`…) en lugar de `ml-`, `pr-`, `left-`, `right-`.

Todos los idiomas deben mantener la misma estructura; las pruebas lo comprueban.

## Apoya el proyecto

Cachety es gratis y lo seguirá siendo. Si te ha sido útil, puedes [apoyarlo en GitHub Sponsors](https://github.com/sponsors/amirhmoradi). Los donativos ayudan a pagar el dominio y las herramientas de desarrollo, y sobre todo el tiempo que todo esto requiere.

Hoy no hay anuncios. Algún día el proyecto podría mostrar unos pocos enlaces patrocinados, elegidos a mano y con el mismo espíritu (herramientas de cifrado, software libre, envío seguro de documentos). Las reglas para ellos son estrictas y forman parte de la promesa de privacidad:

- claramente señalados como patrocinados;
- servidos desde el propio dominio de Cachety (solo imágenes y enlaces): sin redes publicitarias, sin scripts de terceros, sin píxeles de seguimiento;
- nunca elegidos ni mostrados en función de nada de lo que el usuario pone en la herramienta;
- la Content-Security-Policy sigue igual de estricta que ahora (`connect-src 'self'`).

## Créditos y licencia

Cachety es un proyecto personal, creado y mantenido por **[Amir Moradi](https://amirmoradi.com)** en Francia.

Es una versión modificada de **[Filigrane Local](https://github.com/KazeTachinuu/filigrane-local)** de Hugo Sibony (KazeTachinuu), que a su vez fue una reescritura inspirada en **[Filigraneur](https://github.com/cyberclarence/filigraneur)** de CyberClarence. Gracias a los dos. Consulta [NOTICE](NOTICE) para más detalles.

Las contraseñas fáciles de leer usan la **[lista de palabras BIP39 en inglés](https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt)** (licencia MIT, © 2013 Marek Palatinus, Pavol Rusnak, Aaron Voisine, Sean Bowe).

Lo que viene: **[ROADMAP.md](ROADMAP.md)**, también disponible en [cachety.com/es/roadmap](https://cachety.com/es/roadmap).

Publicado bajo la licencia **GNU Affero General Public License v3.0** ([LICENSE](LICENSE)). Si ofreces una versión modificada como servicio, la AGPL te obliga a poner su código fuente a disposición de tus usuarios.
