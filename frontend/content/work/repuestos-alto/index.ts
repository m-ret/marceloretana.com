import type { BuildStorySource } from "../types";
import hero from "./hero.webp";
import mobile3dQuote from "./mobile-3d-quote.webp";
import mobileLedCatalog from "./mobile-led-catalog.webp";
import og from "./og.jpg";
import photoLedWall from "./photo-led-wall.webp";
import videoPromoLed from "./video-promo-led.webp";

const story: BuildStorySource = {
  slug: "repuestos-alto",
  name: "Repuestos Alto",
  year: "2026",
  liveUrl: "https://www.repuestosalto.com",
  publishedAt: "2026-10-30",
  og,
  images: {
    hero: {
      src: hero,
      kind: "desktop",
      alt: {
        en: "Repuestos Alto home page on a desktop screen: dark hero with the headline “Repuestos y tecnología automotriz”, a WhatsApp button and the site menu.",
        es: "Página de inicio de Repuestos Alto en escritorio: portada oscura con el titular «Repuestos y tecnología automotriz», un botón de WhatsApp y el menú del sitio.",
      },
      caption: {
        en: "Home page hero: three rotating slides over an animated 3D wave.",
        es: "Portada del sitio: tres mensajes que rotan sobre una onda 3D animada.",
      },
    },
    "mobile-led-catalog": {
      src: mobileLedCatalog,
      kind: "mobile",
      alt: {
        en: "ALTO LED catalog on a phone: search box, type filters with counts, a sort menu and the top of the first product card.",
        es: "Catálogo ALTO LED en un celular: caja de búsqueda, filtros por tipo con su cantidad, menú de orden y el inicio del primer producto.",
      },
      caption: {
        en: "The same catalog on a phone, with search and filters at the top.",
        es: "El mismo catálogo en un celular, con la búsqueda y los filtros arriba.",
      },
    },
    "mobile-3d-quote": {
      src: mobile3dQuote,
      kind: "mobile",
      alt: {
        en: "ALTO 3D estimate form on a phone: page title and the first fields for length and width.",
        es: "Formulario de estimado ALTO 3D en un celular: título de la página y los primeros campos de largo y ancho.",
      },
      caption: {
        en: "The estimate form on a phone.",
        es: "El formulario de estimado en un celular.",
      },
    },
    "video-promo-led": {
      src: videoPromoLed,
      kind: "video",
      alt: {
        en: "Frame from the promo video: the ALTO LED title above three product pictures.",
        es: "Cuadro del video promocional: el título ALTO LED sobre tres imágenes de producto.",
      },
      caption: {
        en: "A frame from the 21.7-second promo video that plays on the home page.",
        es: "Un cuadro del video promocional de 21.7 segundos que se reproduce en la página de inicio.",
      },
    },
    "photo-led-wall": {
      src: photoLedWall,
      kind: "photo",
      alt: {
        en: "Display wall in the Repuestos Alto store with LED light bars and work lights on slatted panels above black cabinets.",
        es: "Pared de exhibición en la tienda Repuestos Alto con barras LED y luces de trabajo sobre paneles ranurados, encima de gabinetes negros.",
      },
      caption: {
        en: "The LED display wall in the store, from the site’s history page.",
        es: "La pared de exhibición de luces LED en la tienda, tomada de la página de historia del sitio.",
      },
    },
  },
  copy: {
    en: {
      title: "I designed a parts store’s website around WhatsApp instead of a cart",
      excerpt:
        "No cart, a search that forgives how people type codes, and a 3D-print estimate form: the decisions behind the Repuestos Alto site, and what they mean for yours.",
      sector: "Auto parts retail",
      location: "Pérez Zeledón, Costa Rica",
      sections: [
        {
          heading: "No cart: buying ends in WhatsApp",
          body: [
            "The first decision was something to leave out. The Repuestos Alto site has no shopping cart and no checkout. The catalog, every product page and the 3D estimate form end in the same place: a WhatsApp message with the details already written.",
            "WhatsApp is the channel the site puts first, from the button in the hero to the floating button on all 40 pages in the sitemap. A cart would have brought payments, stock counts and refunds with it. The trade-off is simple: nobody can pay on the site, and a message sent at night waits for a person to answer.",
          ],
          image: null,
        },
        {
          heading: "Pages built ahead, content edited by staff",
          body: [
            "In the first version, the content sat inside the code. Sixteen days after the first commit (the first saved version of the code), I moved it into Sanity, a hosted CMS. A CMS is an editing screen for people who do not program. Hero slides, LED products, categories, services and FAQs now come from it, and a marker like {{LED}} lets staff color a word in the brand orange without touching code. The next day I wrote a guide in Spanish for the staff.",
            "Most pages are built ahead of time and served from a cache, so a visit does not wait on the CMS. The catch is that a published edit needs a signal before it shows. In August the project gained a signed webhook route for that, which refreshes cached pages by content type. Key pages also keep fallback text, so the site does not go blank if the CMS has nothing to show.",
          ],
          image: null,
        },
        {
          heading: "A catalog search that forgives typing",
          body: [
            "In August the LED catalog gained search and filters. Its 28 products have codes like POD5-954MD-02, and people type codes in different ways, so the search ignores accents, capitals and dashes. Typing “tamano” or “tamaño” gives the same list, and a code typed with a dash or with a space finds the same products. If someone types an exact code, that product comes first.",
            "Two smaller choices matter more than they look. The type filter (pods, round lights, bars) is set by hand on each product in the CMS, because a code prefix does not tell you the shape. And the search, the type and the sort order live in the page address, so a filtered view can be sent on WhatsApp already applied.",
            "That approach suits 28 products. A catalog of thousands would need a dedicated search service.",
          ],
          image: "mobile-led-catalog",
        },
        {
          heading: "A 3D estimate that says it is approximate",
          body: [
            "ALTO 3D prints replicas of car parts, and a customer needs a way to describe a part before visiting. I built the estimate form to ask for length, width and height, where the part will live, how strong it must be, the finish and the quantity. It suggests a material and shows an approximate figure. The suggestion follows the answers: PLA by default, ASA for outdoor parts, ABS for strong parts inside the car. The site explains each in a line; ASA, for example, is the outdoor choice because it resists sunlight.",
            "The page says plainly that the figure is approximate. Then it opens WhatsApp with every choice written into the message. The form calls no server and stores nothing. That keeps it simple, but there is no list of past requests to review; they live in WhatsApp.",
          ],
          image: "mobile-3d-quote",
        },
        {
          heading: "3D scenes and video, kept in their place",
          body: [
            "Four pages open with a 3D scene made with Three.js: home, ALTO LED, ALTO 3D and the brand page. Each scene loads in the browser after the page itself, and its resolution is capped so phones do less work. The scenes are decoration, so the page reads even before one appears.",
            "The 21.7-second promo video is code too, written with Remotion. That paid off in March, when four car brands were removed from the site: I re-rendered the video from its code, with those brands taken out, instead of editing footage by hand. On the home page it never starts by itself; a visitor presses play.",
            "Visual effects add code to load and maintain, so I keep the 3D scenes and the video on the pages that sell the idea. Product pages get photos, specs and a button instead.",
          ],
          image: "video-promo-led",
        },
        {
          heading: "Real photos, light enough for a phone",
          body: [
            "The site uses the store’s own photos, such as the LED display wall and the stockroom. I added them in March, already converted to WebP. The server then sends AVIF to browsers that support it: for one 1200-pixel stockroom photo, that means 43,757 bytes instead of 91,164.",
            "Photos are often the heaviest part of a page, so they are worth checking in any project. On the catalog, 28 of the 30 images load lazily, only when they get close to the screen.",
          ],
          image: "photo-led-wall",
        },
      ],
      takeaways: [
        "Pick one place your pages send customers. Here it is WhatsApp, so there is no cart or checkout to run.",
        "Ask who edits your content and what happens after they publish. Cached pages need a signal to refresh.",
        "Test search the way people type codes: with or without dashes, accents and capitals.",
        "Ask what your estimate form stores. This one stores nothing; the request leaves as a WhatsApp message.",
        "Keep 3D and video for pages that sell the idea, and load them after the text.",
      ],
      stack: ["Next.js", "React", "TypeScript", "Sanity", "Three.js", "Remotion", "Vercel"],
      seo: {
        title: "Designing the Repuestos Alto website around WhatsApp",
        description:
          "Marcelo Retana on the decisions behind a Costa Rican parts store’s website: WhatsApp instead of a cart, a CMS, a forgiving catalog search and 3D estimates.",
      },
    },
    es: {
      title: "Diseñé el sitio de una tienda de repuestos alrededor de WhatsApp",
      excerpt:
        "Sin carrito, con una búsqueda que perdona cómo se escriben los códigos y un estimado de piezas 3D: las decisiones detrás del sitio de Repuestos Alto.",
      sector: "Venta de repuestos automotrices",
      location: "Pérez Zeledón, Costa Rica",
      sections: [
        {
          heading: "Sin carrito: la compra termina en WhatsApp",
          body: [
            "La primera decisión fue dejar algo por fuera. El sitio de Repuestos Alto no tiene carrito de compras ni pago en línea. El catálogo, cada página de producto y el formulario de estimado 3D terminan en el mismo lugar: un mensaje de WhatsApp con los datos ya escritos.",
            "WhatsApp es el canal que el sitio pone primero, desde el botón de la portada hasta el botón flotante de las 40 páginas del mapa del sitio. Un carrito habría traído pagos, conteo de inventario y devoluciones. El inconveniente es claro: nadie puede pagar en el sitio, y un mensaje enviado de noche espera a que una persona responda.",
          ],
          image: null,
        },
        {
          heading: "Páginas prearmadas y contenido editable por el personal",
          body: [
            "En la primera versión, el contenido estaba dentro del código. Dieciséis días después del primer commit (la primera versión guardada del código), lo pasé a Sanity, un CMS alojado. Un CMS es una pantalla de edición para personas que no programan. Los mensajes de portada, los productos LED, las categorías, los servicios y las preguntas frecuentes vienen de ahí, y un marcador como {{LED}} permite al personal pintar una palabra con el naranja de la marca sin tocar código. Al día siguiente escribí una guía en español para el personal.",
            "La mayoría de las páginas se arman por adelantado y se sirven desde una caché, así que una visita no espera al CMS. El detalle es que una edición publicada necesita una señal para aparecer. En agosto el proyecto sumó para eso una ruta de webhook firmada, que refresca las páginas en caché según el tipo de contenido. Las páginas clave además guardan texto de respaldo, para que el sitio no quede en blanco si el CMS no tiene nada que mostrar.",
          ],
          image: null,
        },
        {
          heading: "Una búsqueda que perdona al escribir",
          body: [
            "En agosto el catálogo LED sumó búsqueda y filtros. Sus 28 productos tienen códigos como POD5-954MD-02, y cada persona los escribe a su manera, así que la búsqueda ignora tildes, mayúsculas y guiones. Escribir «tamano» o «tamaño» da la misma lista, y un código escrito con guion o con espacio encuentra los mismos productos. Si alguien escribe un código exacto, ese producto sale primero.",
            "Dos decisiones pequeñas pesan más de lo que parece. El filtro por tipo (pods, faros redondos, barras) se asigna a mano en el CMS para cada producto, porque el prefijo del código no indica la forma. Y la búsqueda, el tipo y el orden viajan en la dirección de la página, de modo que una vista ya filtrada se puede enviar por WhatsApp.",
            "Ese enfoque sirve para 28 productos. Un catálogo de miles de artículos necesitaría un servicio de búsqueda dedicado.",
          ],
          image: "mobile-led-catalog",
        },
        {
          heading: "Un estimado 3D que se declara aproximado",
          body: [
            "ALTO 3D imprime réplicas de piezas automotrices, y el cliente necesita una forma de describir una pieza antes de visitar la tienda. Armé el formulario para que pida largo, ancho y alto, dónde se usará la pieza, qué tan resistente debe ser, el acabado y la cantidad. Sugiere un material y muestra una cifra aproximada. La sugerencia sigue las respuestas: PLA por defecto, ASA para piezas de exterior y ABS para piezas resistentes dentro del vehículo. El sitio explica cada material en una línea; ASA, por ejemplo, es la opción para exteriores porque resiste el sol.",
            "La página dice con claridad que la cifra es aproximada. Luego abre WhatsApp con cada elección escrita en el mensaje. El formulario no llama a ningún servidor ni guarda nada. Eso lo mantiene simple, pero no existe una lista de solicitudes anteriores para revisar: viven en WhatsApp.",
          ],
          image: "mobile-3d-quote",
        },
        {
          heading: "3D y video, cada uno en su lugar",
          body: [
            "Cuatro páginas abren con una escena 3D hecha con Three.js: inicio, ALTO LED, ALTO 3D y la página de marca. Cada escena carga en el navegador después de la página, y su resolución está limitada para que los celulares trabajen menos. Las escenas son decoración, así que la página se lee incluso antes de que aparezcan.",
            "El video promocional de 21.7 segundos también es código, escrito con Remotion. Eso valió la pena en marzo, cuando se quitaron cuatro marcas de vehículos del sitio: volví a generar el video desde el código, sin esas marcas, en lugar de editar el material a mano. En la página de inicio nunca arranca solo; el visitante presiona play.",
            "Los efectos visuales suman código que cargar y mantener, así que dejo las escenas 3D y el video en las páginas que venden la idea. Las páginas de producto llevan fotos, especificaciones y un botón.",
          ],
          image: "video-promo-led",
        },
        {
          heading: "Fotos reales, livianas para el celular",
          body: [
            "El sitio usa fotos propias de la tienda, como la pared de luces LED y la bodega. Las agregué en marzo, ya convertidas a WebP. Luego el servidor envía AVIF a los navegadores compatibles: para una foto de bodega de 1200 píxeles, eso significa 43,757 bytes en lugar de 91,164.",
            "Las fotos suelen ser la parte más pesada de una página, así que conviene revisarlas en cualquier proyecto. En el catálogo, 28 de las 30 imágenes cargan de forma diferida, solo cuando se acercan a la pantalla.",
          ],
          image: "photo-led-wall",
        },
      ],
      takeaways: [
        "Elija un solo lugar al que sus páginas envían al cliente. Aquí es WhatsApp, así que no hay carrito ni pago que administrar.",
        "Pregunte quién edita su contenido y qué pasa después de publicar. Las páginas en caché necesitan una señal para refrescarse.",
        "Pruebe la búsqueda como la gente escribe los códigos: con o sin guiones, tildes y mayúsculas.",
        "Pregunte qué guarda su formulario de estimado. Este no guarda nada; la solicitud sale como mensaje de WhatsApp.",
        "Reserve el 3D y el video para las páginas que venden la idea, y cárguelos después del texto.",
      ],
      stack: ["Next.js", "React", "TypeScript", "Sanity", "Three.js", "Remotion", "Vercel"],
      seo: {
        title: "Diseñé el sitio de Repuestos Alto alrededor de WhatsApp",
        description:
          "Marcelo Retana cuenta las decisiones detrás del sitio de una tienda de repuestos en Costa Rica: WhatsApp sin carrito, CMS, búsqueda tolerante y estimado 3D.",
      },
    },
  },
};

export default story;
