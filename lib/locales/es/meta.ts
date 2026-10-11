import { BRAND } from "@/lib/brand";
import type { LocaleMeta } from "@/lib/site-meta";

export const META_ES: LocaleMeta = {
  site: {
    path: "/es",
    ogLocale: "es_ES",
    title: `${BRAND}: marca de agua gratis para tu DNI, sin subirlo`,
    ogTitle: `${BRAND}: marca de agua sin sacar tus documentos del móvil`,
    description:
      "Pon una marca de agua a tu DNI y documentos sensibles, gratis. Todo pasa en tu navegador: ningún archivo se sube. Código abierto, hecho en Francia.",
  },
  about: {
    title: `¿Por qué poner marca de agua a tu DNI? | ${BRAND}`,
    description:
      "Para qué sirve una marca de agua en tu DNI o justificantes: evitar que reutilicen la copia, hacerla rastreable y protegerte del robo de identidad.",
  },
  privacy: {
    title: `Privacidad y seguridad: tus archivos no salen | ${BRAND}`,
    description:
      "Cómo protege Cachety tus documentos: se procesan en tu navegador, nunca se suben, sin cuenta ni cookies de seguimiento. Explicado fácil y comprobable.",
  },
  guides: {
    title: `Guías: marca de agua y protección de documentos | ${BRAND}`,
    description:
      "Guías paso a paso para poner marca de agua a tu DNI, NIE o INE, nóminas y alquiler, tachar datos de un PDF o hacerlo desde el móvil. Gratis.",
  },
  compare: {
    title: `Comparativas de herramientas de marca de agua | ${BRAND}`,
    description:
      "Cachety frente a las herramientas de marca de agua más usadas: adónde van tus archivos, precio, límites y privacidad. Comparativas con fuentes.",
  },
};
