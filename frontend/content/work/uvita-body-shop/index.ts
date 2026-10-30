import type { BuildStorySource } from "../types";
import hero from "./hero.webp";
import mobileHome from "./mobile-home.webp";
import mobileQuoteForm from "./mobile-quote-form.webp";
import og from "./og.jpg";

const story: BuildStorySource = {
  slug: "uvita-body-shop",
  name: "Uvita Body Shop",
  year: "2026",
  liveUrl: "https://uvitabodyshop.com",
  publishedAt: "2026-10-30",
  og,
  images: {
    hero: {
      src: hero,
      kind: "desktop",
      alt: {
        en: "Uvita Body Shop home page on a desktop screen: a glossy red 3D car behind the headline “Enderezado y pintura. Acabado perfecto.”, with WhatsApp and phone buttons.",
        es: "Página de inicio de Uvita Body Shop en pantalla de escritorio: un carro rojo brillante en 3D detrás del titular «Enderezado y pintura. Acabado perfecto.», con botones de WhatsApp y teléfono.",
      },
      caption: {
        en: "The home page opens on a 3D car with two ways to reach the shop: WhatsApp and phone.",
        es: "El inicio abre con un carro en 3D y dos formas de contactar al taller: WhatsApp y teléfono.",
      },
    },
    "mobile-quote-form": {
      src: mobileQuoteForm,
      kind: "mobile",
      alt: {
        en: "Contact section on a phone: a headline, a full-width WhatsApp button, a phone button, a green “open now” badge with hours, and the first field of the quote form.",
        es: "Sección de contacto en un teléfono: un titular, un botón de WhatsApp de ancho completo, un botón de teléfono, una etiqueta verde de «abierto ahora» con el horario y el primer campo del formulario.",
      },
      caption: {
        en: "On a phone the WhatsApp button spans the full width, and the floating WhatsApp button stays in the corner.",
        es: "En el teléfono, el botón de WhatsApp ocupa todo el ancho y el botón flotante de WhatsApp queda en la esquina.",
      },
    },
    "mobile-home": {
      src: mobileHome,
      kind: "mobile",
      alt: {
        en: "Home page on a phone: the headline over a red 3D car, a short description, and WhatsApp and phone buttons side by side.",
        es: "Página de inicio en un teléfono: el titular sobre un carro rojo en 3D, una descripción breve y los botones de WhatsApp y teléfono lado a lado.",
      },
      caption: {
        en: "On a phone the hero keeps the 3D car and the two contact buttons.",
        es: "En el teléfono, el inicio conserva el carro en 3D y los dos botones de contacto.",
      },
    },
  },
  copy: {
    en: {
      title: "How I built a body shop’s site in Uvita around WhatsApp quotes",
      excerpt:
        "The choices I made on a Costa Rican body shop’s website, what each one gave up, and what an owner should ask before starting a similar project.",
      sector: "Auto body and paint",
      location: "Uvita, Costa Rica",
      sections: [
        {
          heading: "Make WhatsApp the main button",
          body: [
            "WhatsApp is the main button on this site. It sits in the first screen next to the phone button, and a floating copy follows visitors down every page. The closing section of the home page asks for exactly that: send a photo on WhatsApp.",
            "A form still exists for people who prefer typing. When someone sends it, the server is set up to email the request to the shop, and WhatsApp then opens with the text already written. That means two channels to check every day.",
            "If a visitor arrives from a tagged campaign link, I keep those tags for 90 days and add them to the request, so the shop can tell which campaign sent the message. I also set up five named events in the site’s analytics: a WhatsApp tap, a phone tap, a form sent, a form error and the 3D fallback. Visitors who send a Do-Not-Track signal are skipped. The events are there so the owner can compare which buttons people use.",
          ],
          image: "mobile-quote-form",
        },
        {
          heading: "Spanish first, English second, and the upkeep",
          body: [
            "Spanish is the default. If a visitor’s browser is set to English, the site sends them to /en instead. Every page has its own address in each language, and each one points to its twin with a hreflang tag, a small label that says “this page also exists in English, here”. It helps Google understand that the two belong together.",
            "Today English text covers the services and the guides, plus the FAQ, about, contact and privacy pages. Translation is the part owners underestimate: every later text change has to be made twice. So I kept page text in one set of files per language, and the shop’s facts, such as hours, services and areas, in a single data file that feeds the pages, the sitemap and the structured data.",
            "A second language is a commitment: budget for every later text change, not just the first translation.",
          ],
          image: null,
        },
        {
          heading: "A 3D hero, and what it costs",
          body: [
            "The home page opens on a 3D car, and the light on its paint follows the cursor. A body shop sells finish quality, and a glossy car shows it before any sentence does. The model file is small, under 70 KB, and it downloads only when needed, so the text does not wait for it.",
            "There are two trade-offs. A 3D scene asks more of a cheap phone than a photo does, and it is one more part that can fail. If your customers mostly use old phones, I would choose a photo.",
          ],
          image: "mobile-home",
        },
        {
          heading: "Treat file weight as a budget",
          body: [
            "Images are where sites get heavy. Two page images weighed 961,522 and 1,180,514 bytes, around 1 MB each. I re-encoded them smaller, still as AVIF (a compact image format), and they dropped to 33,978 and 66,610 bytes. Next.js also serves AVIF or WebP to browsers that support them.",
            "Decide the limit before the photo shoot, not after the page feels slow. It is far easier to shoot for a limit than to rescue a heavy picture later.",
            "The brand reel is the heaviest asset: four files of 5.5 to 6.5 MB. The player never starts on its own, and it gives phones held upright the vertical version, so they skip the wide file.",
          ],
          image: null,
        },
        {
          heading: "Pages that match what people type",
          body: [
            "Beyond the home page I built five service pages, four town pages for Uvita, Dominical, Ojochal and Bahía Ballena, and four guides. Each carries structured data: labels in the page code that tell Google it is a service, a list of questions or an article.",
            "The guides answer the kind of question a customer asks at the counter; one, for example, explains when a frame really needs straightening.",
            "I also published plain-text files for AI assistants and let their crawlers in through robots.txt. I cannot promise what that will do for the shop. It takes little effort, and the owner should decide whether to be found that way.",
          ],
          image: null,
        },
        {
          heading: "Keep spam out without a puzzle",
          body: [
            "Any public form attracts bots, but this one has no CAPTCHA, the picture puzzle: a customer with a damaged car and a weak signal does not need one more hurdle. Quiet checks on the server stop simple bots instead.",
          ],
          image: null,
        },
      ],
      takeaways: [
        "Pick the one action you want first. Here it is a WhatsApp message with a photo, and every page points to it.",
        "Treat translation as ongoing work. Every text change is made twice, so keep hours, services and areas in one place.",
        "Set a file-size limit for images and video before the shoot, not after the page feels slow.",
        "Protect the form without adding steps for the customer, and keep a second way to reach you.",
        "Plan a photo day early. Pictures of your own jobs are content a designer cannot invent.",
      ],
      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Three.js",
        "GSAP",
        "next-intl",
        "Vercel",
      ],
      seo: {
        title: "Uvita Body Shop: how I built a WhatsApp-first site",
        description:
          "Marcelo Retana on building Uvita Body Shop’s site: WhatsApp quotes, Spanish and English pages, a 3D hero, lighter images and spam checks without a CAPTCHA.",
      },
    },
    es: {
      title: "Cómo armé el sitio de un taller de Uvita alrededor de WhatsApp",
      excerpt:
        "Las decisiones que tomé en el sitio de un taller costarricense, a qué renuncié en cada una y qué debería preguntarse un dueño antes de un proyecto parecido.",
      sector: "Enderezado y pintura automotriz",
      location: "Uvita, Costa Rica",
      sections: [
        {
          heading: "WhatsApp como botón principal",
          body: [
            "WhatsApp es el botón principal de este sitio. Va en la primera pantalla, junto al botón de teléfono, y una copia flotante acompaña al visitante en todas las páginas. La sección final del inicio lo pide tal cual: mande una foto por WhatsApp.",
            "El formulario sigue ahí para quien prefiere escribir. Cuando alguien lo envía, el servidor está preparado para mandar la solicitud por correo al taller, y luego se abre WhatsApp con el texto ya escrito. Son dos canales que revisar todos los días.",
            "Si el visitante llega desde un enlace de campaña con etiquetas, las guardo 90 días y las agrego a la solicitud, para que el taller sepa qué campaña trajo el mensaje. También configuré cinco eventos con nombre en las estadísticas del sitio: toque en WhatsApp, toque en teléfono, formulario enviado, error del formulario y respaldo del 3D. Quien envía la señal No Rastrear queda fuera. Los eventos están para que el dueño pueda comparar qué botones usa la gente.",
          ],
          image: "mobile-quote-form",
        },
        {
          heading: "Español primero, inglés después, y el mantenimiento",
          body: [
            "El español es el idioma por defecto. Si el navegador del visitante está en inglés, el sitio lo envía a /en. Cada página tiene su propia dirección en cada idioma y apunta a su par con una etiqueta hreflang, una marca pequeña que dice «esta página también existe en inglés, aquí». Ayuda a Google a entender que las dos van juntas.",
            "Hoy el texto en inglés cubre los servicios y las guías, además de las páginas de preguntas frecuentes, «sobre nosotros», contacto y privacidad. La traducción es lo que más se subestima: cada cambio de texto posterior se hace dos veces. Por eso dejé el texto de las páginas en un conjunto de archivos por idioma, y los datos del taller, como horario, servicios y zonas, en un único archivo que alimenta las páginas, el mapa del sitio y los datos estructurados.",
            "Un segundo idioma es un compromiso: presupueste cada cambio de texto futuro, no solo la primera traducción.",
          ],
          image: null,
        },
        {
          heading: "Una portada en 3D, y lo que cuesta",
          body: [
            "El inicio abre con un carro en 3D, y la luz sobre su pintura sigue al cursor. Un taller de pintura vende calidad de acabado, y un carro brillante lo dice antes que cualquier frase. El archivo del modelo es liviano, menos de 70 KB, y se descarga solo cuando hace falta, así que el texto no depende de él.",
            "Tiene dos desventajas. Una escena 3D le exige más a un teléfono barato que una foto, y es una pieza más que puede fallar. Si sus clientes usan sobre todo teléfonos viejos, yo elegiría una foto.",
          ],
          image: "mobile-home",
        },
        {
          heading: "El peso de los archivos es un presupuesto",
          body: [
            "Las imágenes son lo que más engorda un sitio. Dos imágenes de las páginas pesaban 961,522 y 1,180,514 bytes, alrededor de 1 MB cada una. Las recodifiqué más pequeñas, todavía en AVIF (un formato compacto), y bajaron a 33,978 y 66,610 bytes. Además, Next.js entrega AVIF o WebP a los navegadores compatibles.",
            "Fije el límite antes de la sesión de fotos, no cuando la página ya se sienta lenta. Es mucho más fácil fotografiar para un límite que rescatar después una imagen pesada.",
            "El reel de marca es lo más pesado: cuatro archivos de 5.5 a 6.5 MB. El reproductor nunca arranca solo, y a los teléfonos en vertical les entrega la versión vertical, así no descargan la versión horizontal.",
          ],
          image: null,
        },
        {
          heading: "Páginas que responden lo que la gente busca",
          body: [
            "Además del inicio construí cinco páginas de servicios, cuatro de zonas (Uvita, Dominical, Ojochal y Bahía Ballena) y cuatro guías. Cada una lleva datos estructurados: etiquetas en el código que le dicen a Google si la página es un servicio, una lista de preguntas o un artículo.",
            "Las guías responden el tipo de pregunta que un cliente hace en el mostrador; una, por ejemplo, explica cuándo un chasis de verdad necesita enderezado.",
            "También publiqué archivos de texto para asistentes de IA y dejé pasar a sus rastreadores en robots.txt. No puedo prometer qué efecto tendrá para el taller. Lleva poco trabajo, y el dueño decide si quiere que lo encuentren por esa vía.",
          ],
          image: null,
        },
        {
          heading: "Fuera el spam, sin acertijos",
          body: [
            "Todo formulario público atrae bots, pero este no tiene CAPTCHA, el acertijo de imágenes: un cliente con el carro golpeado y poca señal no necesita un obstáculo más. En su lugar, unas revisiones discretas en el servidor frenan a los bots simples.",
          ],
          image: null,
        },
      ],
      takeaways: [
        "Elija primero la acción que quiere. Aquí es un mensaje de WhatsApp con una foto, y todas las páginas apuntan a ella.",
        "Trate la traducción como trabajo continuo. Cada cambio de texto se hace dos veces, así que guarde horario, servicios y zonas en un solo lugar.",
        "Ponga un límite de peso a imágenes y video antes de la sesión, no cuando la página ya se sienta lenta.",
        "Proteja el formulario sin sumar pasos al cliente, y conserve una segunda vía para contactarlo.",
        "Planee temprano un día de fotos. Las imágenes de sus propios trabajos son contenido que un diseñador no puede inventar.",
      ],
      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Three.js",
        "GSAP",
        "next-intl",
        "Vercel",
      ],
      seo: {
        title: "Uvita Body Shop: cómo armé un sitio con WhatsApp primero",
        description:
          "Marcelo Retana cuenta cómo hizo el sitio de Uvita Body Shop: cotizar por WhatsApp, español e inglés, carro 3D, imágenes livianas y spam sin CAPTCHA.",
      },
    },
  },
};

export default story;
