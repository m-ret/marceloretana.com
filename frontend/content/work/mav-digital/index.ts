import type { BuildStorySource } from "../types";
import desktopAplicar from "./desktop-aplicar.webp";
import desktopServicioEn from "./desktop-servicio-en.webp";
import desktopTresDirecciones from "./desktop-tres-direcciones.webp";
import hero from "./hero.webp";
import mobileHero from "./mobile-hero.webp";
import og from "./og.jpg";
import photoEdificio from "./photo-edificio.webp";

const story: BuildStorySource = {
  slug: "mav-digital",
  name: "MAV Boutique",
  year: "2026",
  liveUrl: "https://mav-digital.com",
  publishedAt: "2026-10-30",
  og,
  images: {
    hero: {
      src: hero,
      kind: "desktop",
      alt: {
        en: "Desktop home page of MAV Boutique: the headline “Patrimonio bajo control.” beside an outline map of Costa Rica with the MAV mark.",
        es: "Inicio de MAV Boutique en escritorio: el titular «Patrimonio bajo control.» junto a un mapa de Costa Rica con la marca MAV.",
      },
      caption: {
        en: "The home page: headline, two calls to action and the Costa Rica plate.",
        es: "El inicio: titular, dos llamados a la acción y la placa de Costa Rica.",
      },
    },
    "photo-edificio": {
      src: photoEdificio,
      kind: "photo",
      alt: {
        en: "The firm’s building in Pérez Zeledón, with its signs on both fronts",
        es: "El edificio de la firma en Pérez Zeledón, con sus rótulos en las dos fachadas",
      },
      caption: {
        en: "The firm’s building, as shown on its About page.",
        es: "El edificio de la firma, tal como aparece en su página Nosotros.",
      },
    },
    "desktop-servicio-en": {
      src: desktopServicioEn,
      kind: "desktop",
      alt: {
        en: "English page “Accounting Services” with a side index of related services and the first sections of text.",
        es: "Página en inglés «Accounting Services» con un índice lateral de servicios relacionados y las primeras secciones de texto.",
      },
      caption: {
        en: "The English version of the accounting pillar; the header switch now reads ES.",
        es: "La versión en inglés del pilar contable; el selector del encabezado ahora dice ES.",
      },
    },
    "desktop-tres-direcciones": {
      src: desktopTresDirecciones,
      kind: "desktop",
      alt: {
        en: "The design showroom page “Tres direcciones. Una sola marca.” with three panels named Planta, Protocolo and Torre de Control.",
        es: "La página de la sala de muestras «Tres direcciones. Una sola marca.» con tres paneles: Planta, Protocolo y Torre de Control.",
      },
      caption: {
        en: "The three directions the owner compared.",
        es: "Las tres direcciones que el dueño comparó.",
      },
    },
    "mobile-hero": {
      src: mobileHero,
      kind: "mobile",
      alt: {
        en: "Phone view of the home page: headline, two buttons and the top of the Costa Rica map.",
        es: "El inicio en un teléfono: titular, dos botones y la parte superior del mapa de Costa Rica.",
      },
      caption: {
        en: "On phones the hero stacks and uses the light map drawing.",
        es: "En teléfonos la portada se apila y usa el dibujo liviano del mapa.",
      },
    },
    "desktop-aplicar": {
      src: desktopAplicar,
      kind: "desktop",
      alt: {
        en: "The application page at step 1 of 3, with empty fields for name, company, email and phone and a button to continue.",
        es: "La página de aplicación en el paso 1 de 3, con campos vacíos de nombre, empresa, correo y teléfono y un botón para continuar.",
      },
      caption: {
        en: "The application form starts with contact details; later steps ask about the business.",
        es: "El formulario de aplicación empieza con datos de contacto; los pasos siguientes preguntan por el negocio.",
      },
    },
  },
  copy: {
    en: {
      title: "How I replaced a firm’s WordPress site without losing 52 addresses",
      excerpt:
        "What I decided, and why, when an accounting and legal firm in Costa Rica moved from WordPress to a bilingual site built with Next.js.",
      sector: "Accounting and legal advisory",
      location: "Pérez Zeledón, Costa Rica",
      sections: [
        {
          heading: "Start with the list of old addresses",
          body: [
            "The firm behind this site does accounting, tax and corporate legal work in Pérez Zeledón, and its old website ran on WordPress. The goal was to replace it without breaking anything people already use. So before building the production site, I listed every public page I could find on the old site, with its address.",
            "There were 52. Each one may sit in a bookmark, an email signature or Google’s index. Page by page I decided whether it keeps its address or redirects, which means sending the visitor to the new page automatically. In the end 47 kept the same path and 5 redirect. All 52 were checked against the live site again: every one ends on a working page. Figures in this story are as of 30 October 2026.",
          ],
          image: "photo-edificio",
        },
        {
          heading: "My first version was too thin",
          body: [
            "My first production build, on 25 September, was a home page plus a few thin subpages, with most old addresses redirected into sections of the home. On 26 September I dropped that plan for the other option on the table: every old page keeps its own path on the new site.",
            "So the project grew into the whole website: 26 Spanish pages and 25 English ones, 47 of them carried over from the old site. Then I compared new with old, page by page. On 45 carried-over pages, at least 95% of the old words are still there, along with every old heading.",
            "Two languages need one more thing. Each paired page tells search engines where its twin lives, using a tag called hreflang. One Spanish landing page has no English twin, so its language switch opens the English home.",
          ],
          image: "desktop-servicio-en",
        },
        {
          heading: "Three directions before one site",
          body: [
            "From May to August the project ran as a showroom of three working directions: Planta, an industrial poster; Protocolo, a case file; and Torre de Control, an instrument panel. All three were live pages the owner could open and compare. On 20 August 2026 the owner chose Torre de Control.",
            "The downside is real: two of the three were never used. I still recommend it to a firm whose business is trust, because choosing between finished pages is easier than choosing between pictures.",
          ],
          image: "desktop-tres-direcciones",
        },
        {
          heading: "A hero that phones do not pay for",
          body: [
            "The home page opens on a map of Costa Rica. On a large screen with a mouse, it is a 3D plate, and I limited the 3D version to those screens. On a phone, or when a visitor asks their device for less motion, the page draws a flat version of the map and never loads the 3D library.",
            "Measured on the live site, uncompressed: the site’s own JavaScript (the code the browser downloads to run it) comes to about 700 KB on a phone and about 1.6 MB on a desktop running the 3D plate. Nothing in the scene moves by itself for more than five seconds, the point where the web accessibility guidelines ask for a pause control.",
            "One small detail: the first outline of the country in the code was typed from memory and read as a generic blob. It was replaced with one traced from a licensed vector map, simplified from 801 points to 286.",
          ],
          image: "mobile-hero",
        },
        {
          heading: "The form confirms only what was sent",
          body: [
            "Applying to this firm takes three steps, not a message box. A form that fails silently is the worst case for an owner, because the lost message leaves no trace. So the confirmation screen appears only after the email provider accepts the message. If it does not, the visitor is told so, and every answer stays on screen.",
            "From there they can send the same text by WhatsApp, copy it, download it or email it. The cost is more code and more screens to test. I think one lost application costs more than that.",
          ],
          image: "desktop-aplicar",
        },
        {
          heading: "What the checks show, and what they miss",
          body: [
            "Run again, three of the project’s checks gave these results. An accessibility scan with axe, an open-source checker, covered all 51 pages at phone and desktop width and found no serious or critical issue. A script that compares the new site with the old one passed 548 checks against the live domain. A third script reads the site’s text and fails on promises, hours, prices or percentages the owner has not confirmed; it came back clean. The 360 unit tests in the repository pass as well.",
            "Automated checks have limits. They catch regressions and common mistakes; they do not replace a person reading each page or the owner approving the wording. The accessibility scan also listed four moderate heading-order notices on two pages.",
          ],
          image: null,
        },
      ],
      takeaways: [
        "List every old address before designing anything, then decide for each one: keep it, redirect it, or retire it on purpose.",
        "Ask for three working directions instead of mockups, and accept that two of them will be thrown away.",
        "A form should confirm a message only after the email service accepts it, and keep the visitor’s answers when it fails.",
        "Ask what the site loads on a phone. Heavy visuals can be reserved for the screens that can carry them.",
        "Run accessibility and SEO checks on the live site, not only on a test copy, and read the pages yourself.",
      ],
      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "GSAP",
        "Three.js",
        "Bun",
        "Vercel",
        "Resend",
      ],
      seo: {
        title: "MAV Boutique: leaving WordPress without losing 52 addresses",
        description:
          "Marcelo Retana on replacing a Costa Rican firm’s WordPress site with a bilingual Next.js site: old addresses, design choices, forms and live checks.",
      },
    },
    es: {
      title: "Cómo reemplacé el WordPress de una firma sin perder 52 direcciones",
      excerpt:
        "Qué decidí, y por qué, cuando una firma contable y legal de Costa Rica pasó de WordPress a un sitio bilingüe hecho con Next.js.",
      sector: "Asesoría contable y legal",
      location: "Pérez Zeledón, Costa Rica",
      sections: [
        {
          heading: "Empecé por la lista de direcciones viejas",
          body: [
            "La firma detrás de este sitio hace contabilidad, impuestos y trabajo legal corporativo en Pérez Zeledón, y su sitio anterior corría en WordPress. La meta era reemplazarlo sin romper nada de lo que la gente ya usa. Por eso, antes de construir el sitio nuevo, anoté todas las páginas públicas del sitio viejo que pude encontrar, con su dirección.",
            "Eran 52. Cada una puede estar guardada en un marcador, en la firma de un correo o en el índice de Google. Página por página decidí si conservaba su dirección o se redirigía, es decir, si mandaba al visitante a la página nueva de forma automática. Al final 47 mantuvieron la misma ruta y 5 se redirigen. Se revisaron de nuevo las 52 contra el sitio en vivo: todas terminan en una página que funciona. Las cifras de este caso corresponden al 30 de octubre de 2026.",
          ],
          image: "photo-edificio",
        },
        {
          heading: "Mi primera versión se quedó corta",
          body: [
            "Mi primera versión de producción, del 25 de setiembre, era un inicio con unas pocas subpáginas de poco contenido, y casi todas las direcciones viejas se redirigían a secciones del inicio. El 26 de setiembre descarté ese plan y tomé la otra opción sobre la mesa: cada página vieja conserva su propia ruta en el sitio nuevo.",
            "Así el proyecto pasó a ser el sitio completo: 26 páginas en español y 25 en inglés, 47 de ellas traídas del sitio anterior. Luego comparé lo nuevo con lo viejo, página por página. En 45 páginas traídas del sitio anterior sigue al menos el 95% de las palabras originales, junto con todos los títulos viejos.",
            "Dos idiomas piden algo más. Cada página emparejada le dice a los buscadores dónde está su versión en el otro idioma, con una etiqueta llamada hreflang. Una página de aterrizaje en español no tiene versión en inglés, así que su selector de idioma abre el inicio en inglés.",
          ],
          image: "desktop-servicio-en",
        },
        {
          heading: "Tres direcciones antes de un solo sitio",
          body: [
            "De mayo a agosto el proyecto fue una sala de muestras con tres direcciones funcionales: Planta, un afiche industrial; Protocolo, un expediente; y Torre de Control, un tablero de instrumentos. Las tres eran páginas reales que el dueño podía abrir y comparar. El 20 de agosto de 2026 eligió Torre de Control.",
            "El inconveniente es real: dos de las tres nunca se usaron. Aun así se lo recomiendo a una firma cuyo negocio es la confianza, porque elegir entre páginas terminadas es más fácil que elegir entre imágenes.",
          ],
          image: "desktop-tres-direcciones",
        },
        {
          heading: "Una portada que no castiga al teléfono",
          body: [
            "El inicio abre con un mapa de Costa Rica. En una pantalla grande con mouse es una placa 3D, y limité la versión 3D a esas pantallas. En un teléfono, o cuando el visitante le pide a su dispositivo menos movimiento, la página dibuja una versión plana del mapa y nunca carga la biblioteca 3D.",
            "Medido en el sitio en vivo, sin comprimir: el JavaScript propio del sitio (el código que el navegador descarga para ejecutarlo) suma unos 700 KB en un teléfono y unos 1.6 MB en una computadora que corre la placa 3D. Nada de la escena se mueve solo por más de cinco segundos, el punto en que las pautas de accesibilidad web piden un control de pausa.",
            "Un detalle: el primer contorno del país en el código se escribió de memoria y parecía una mancha genérica. Se reemplazó por uno trazado de un mapa vectorial con licencia, simplificado de 801 puntos a 286.",
          ],
          image: "mobile-hero",
        },
        {
          heading: "El formulario confirma solo lo que se envió",
          body: [
            "Aplicar a esta firma lleva tres pasos, no un simple cuadro de mensaje. Un formulario que falla en silencio es el peor caso para un dueño, porque el mensaje perdido no deja rastro. Por eso la pantalla de confirmación aparece solo cuando el proveedor de correo acepta el mensaje. Si no lo acepta, el visitante lo ve en pantalla y todas sus respuestas siguen ahí.",
            "Desde ahí puede mandar el mismo texto por WhatsApp, copiarlo, descargarlo o enviarlo por correo. El costo es más código y más pantallas que probar. Creo que una solicitud perdida cuesta más que eso.",
          ],
          image: "desktop-aplicar",
        },
        {
          heading: "Qué muestran las revisiones y qué no",
          body: [
            "Al correrlas de nuevo, tres de las revisiones del proyecto dieron estos resultados. Un escaneo de accesibilidad con axe, una herramienta de código abierto, recorrió las 51 páginas en ancho de teléfono y de escritorio y no halló ningún problema grave ni crítico. Un script que compara el sitio nuevo con el anterior pasó 548 revisiones contra el dominio en vivo. Un tercer script lee los textos del sitio y falla si encuentra promesas, horarios, precios o porcentajes que el dueño no ha confirmado; salió limpio. Las 360 pruebas unitarias del repositorio también pasan.",
            "Las revisiones automáticas tienen límites. Detectan regresiones y errores comunes, pero no sustituyen a una persona que lea cada página ni al dueño que apruebe la redacción. El escaneo de accesibilidad también listó cuatro avisos moderados de orden de títulos en dos páginas.",
          ],
          image: null,
        },
      ],
      takeaways: [
        "Liste todas las direcciones viejas antes de diseñar y decida una por una: conservarla, redirigirla o retirarla a propósito.",
        "Pida tres direcciones de diseño funcionales en lugar de maquetas, y acepte que dos se van a descartar.",
        "Un formulario debe confirmar el envío solo cuando el servicio de correo lo acepta, y conservar las respuestas si algo falla.",
        "Pregunte qué carga el sitio en un teléfono. Lo pesado puede reservarse para las pantallas que lo aguantan.",
        "Corra las revisiones de accesibilidad y SEO sobre el sitio en vivo, no solo sobre una copia, y lea usted las páginas.",
      ],
      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "GSAP",
        "Three.js",
        "Bun",
        "Vercel",
        "Resend",
      ],
      seo: {
        title: "MAV Boutique: dejar WordPress sin perder 52 direcciones",
        description:
          "Marcelo Retana cuenta cómo reemplazó el WordPress de una firma de Costa Rica por un sitio bilingüe: direcciones viejas, diseño, formularios y revisiones.",
      },
    },
  },
};

export default story;
