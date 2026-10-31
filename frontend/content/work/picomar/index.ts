import type { BuildStorySource } from "../types";
import desktopDates from "./desktop-dates.webp";
import desktopJournal from "./desktop-journal.webp";
import desktopMap from "./desktop-map.webp";
import desktopVillaList from "./desktop-villa-list.webp";
import desktopVillaPage from "./desktop-villa-page.webp";
import hero from "./hero.webp";
import og from "./og.jpg";

const story: BuildStorySource = {
  slug: "picomar",
  name: "Picomar",
  year: "2026",
  liveUrl: "https://picomar.com",
  publishedAt: "2026-10-30",
  og,
  images: {
    hero: {
      src: hero,
      kind: "desktop",
      alt: {
        en: "Desktop home page of Picomar: the headline “A luxury villa, looked after.” over a photo of a modern house of glass and timber above the Pacific, with a search bar for villa, dates and guests.",
        es: "Inicio de Picomar en escritorio: el titular «A luxury villa, looked after.» sobre la foto de una casa moderna de vidrio y madera sobre el Pacífico, con una barra de búsqueda por villa, fechas y huéspedes.",
      },
      caption: {
        en: "The home page opens on one large photo and a search by villa, dates and guests.",
        es: "El inicio abre con una foto grande y una búsqueda por villa, fechas y huéspedes.",
      },
    },
    "desktop-villa-page": {
      src: desktopVillaPage,
      kind: "desktop",
      alt: {
        en: "Top of a villa page: a photo of a modern house at dusk with the villa's name, the town, bedroom, bathroom and guest counts, a Check availability link and the section menu below.",
        es: "Parte superior de la página de una villa: la foto de una casa moderna al atardecer con el nombre de la villa, el pueblo, la cantidad de habitaciones, baños y huéspedes, un enlace Check availability y el menú de secciones debajo.",
      },
      caption: {
        en: "A villa page opens on its own photo, with room and guest counts and a link to the booking card.",
        es: "La página de una villa abre con su propia foto, la cantidad de habitaciones y huéspedes y un enlace a la tarjeta de reserva.",
      },
    },
    "desktop-journal": {
      src: desktopJournal,
      kind: "desktop",
      alt: {
        en: "The journal page under the heading Latest dispatches: a large featured post beside three smaller ones, each with a photo, a date and a title.",
        es: "La página del blog bajo el título Latest dispatches: una entrada destacada grande junto a tres más pequeñas, cada una con foto, fecha y título.",
      },
      caption: {
        en: "The journal: field guides and local notes, one featured post and a list.",
        es: "El blog: guías de campo y notas locales, con una entrada destacada y una lista.",
      },
    },
    "desktop-dates": {
      src: desktopDates,
      kind: "desktop",
      alt: {
        en: "Booking card on a villa page with the date picker open on March and April 2027, a guest counter set to 2 and a Request to book button.",
        es: "Tarjeta de reserva en la página de una villa con el selector de fechas abierto en marzo y abril de 2027, un contador de huéspedes en 2 y un botón Request to book.",
      },
      caption: {
        en: "The booking card: a two-month date picker, a guest counter and the request button.",
        es: "La tarjeta de reserva: un selector de fechas de dos meses, un contador de huéspedes y el botón de solicitud.",
      },
    },
    "desktop-map": {
      src: desktopMap,
      kind: "desktop",
      alt: {
        en: "Location section of a villa page: a street map of a town with a translucent circle and a legend that reads Approximate area, above the start of the house rules.",
        es: "Sección de ubicación de la página de una villa: un mapa de calles de un pueblo con un círculo translúcido y una leyenda que dice Approximate area, sobre el inicio de las reglas de la casa.",
      },
      caption: {
        en: "The map marks a circle labelled “Approximate area”, with no street address.",
        es: "El mapa marca un círculo rotulado «Approximate area», sin dirección de calle.",
      },
    },
    "desktop-villa-list": {
      src: desktopVillaList,
      kind: "desktop",
      alt: {
        en: "The villa collection page: a filter bar for dates, guests, price, amenities and access above the first row of villa cards, each with a photo, a name and room counts.",
        es: "La página de la colección de villas: una barra de filtros de fechas, huéspedes, precio, comodidades y acceso sobre la primera fila de tarjetas, cada una con foto, nombre y cantidad de habitaciones.",
      },
      caption: {
        en: "The collection page: five filters above a grid of villa cards.",
        es: "La página de la colección: cinco filtros sobre una cuadrícula de villas.",
      },
    },
  },
  copy: {
    en: {
      title: "A villa website that sells the view and keeps the address back",
      excerpt:
        "What the Picomar website shows guests, what it holds back until a booking, and what an owner planning a similar site should check first.",
      sector: "Luxury villa rentals",
      location: "Uvita, Costa Rica",
      sections: [
        {
          heading: "A site anyone can check from outside",
          body: [
            "Picomar rents private villas on the southern Pacific coast of Costa Rica. Its website replaced a WordPress one, and the choices that matter most to a business like it are visible to anyone: how old addresses behave, what the booking card says, what the map shows, how heavy the photos are and when analytics start.",
            "The Internet Archive shows WordPress, WooCommerce, a store add-on, and Elementor, a page builder, still running on 16 June 2026. Everything below was checked from outside, and figures are as of 30 October 2026.",
          ],
          image: "desktop-villa-page",
        },
        {
          heading: "Start with the addresses the old site earned",
          body: [
            "On any rebuild, the old addresses come first. Each one may sit in a bookmark, a travel blog or Google’s index. During 2025 and 2026 the Internet Archive captured 35 old villa pages, which lived under /accommodation/, and 12 journal posts at the root of the site.",
            "A check on 30 October 2026 requested each of those 47 on the live site. Every one ends on a working page. Forty-two reach the matching new page after two permanent redirects, the signal that tells Google a page has moved for good. Five reach the villa list, a less exact landing. Only these two kinds of address were tested, and nothing is claimed about any other old address.",
          ],
          image: "desktop-journal",
        },
        {
          heading: "The booking card says what happens next",
          body: [
            "On a villa page the guest picks a date range and a party size in a booking card. The request button stays inactive until dates are chosen, and the card says the guest is not charged yet. The site’s terms add that a reservation is confirmed only once payment, as set out at checkout, has been processed and a confirmation email issued.",
            "Not every villa works this way. Four villa pages replace the card with an inquiry link, and seven add a box that sends longer stays to WhatsApp or a message. That is the trade-off of a request flow: it handles the usual stay and hands the unusual ones to a person. If long stays matter to your business, decide early which path they take.",
          ],
          image: "desktop-dates",
        },
        {
          heading: "Show the area, keep the address",
          body: [
            "Where a villa page has a map, it is a circle labelled “Approximate area”. Most villa pages add that the exact address is shared after booking. The structured data on every villa page, a block of labelled facts that search engines read, gives only the town and the country as the location.",
            "The cost is real: a circle tells a guest less than a pin would about the walk to a beach or a restaurant. The gain is that a home’s exact spot is not published for anyone to find. If you manage homes for other people, ask those owners which loss they would rather accept, and ask before the design is fixed.",
          ],
          image: "desktop-map",
        },
        {
          heading: "Photos carry the site, so weigh them",
          body: [
            "In villa rental the photos are the product, and on the home page and the villa list they are also most of what the browser downloads. On each of the 46 villa pages the top photo reaches browsers as AVIF, a newer format, when they accept it. At 1,920 pixels wide the AVIF file is 42% to 56% smaller than the same photo as JPEG.",
            "WebP, the other newer format in common use, was measured too. On those same photos it was larger than the JPEG on 23 pages and smaller on 23. A famous format is not always the smaller one, so test with your own pictures. Only the top photo on a villa page is set to load at once; the others are set to load as the visitor scrolls.",
          ],
          image: "desktop-villa-list",
        },
        {
          heading: "Start analytics only after a yes",
          body: [
            "The site uses Google Analytics and Meta’s pixel, small scripts that report which pages a visitor opens and which ads brought them. A notice on arrival offers Allow or No thanks. In a browser, before any choice, the home page contacts only picomar.com and sets no cookies. After Allow, requests go to Google and Facebook and cookies appear. After No thanks, a check across three pages found none of them.",
            "The trade-off is data. Every visitor who declines is missing from those reports, so ad numbers will look smaller than real traffic. The gain is that Google Analytics and Meta’s pixel do not run without a yes. If ads are your main source of guests, work out what you can live without before you choose.",
          ],
          image: null,
        },
      ],
      takeaways: [
        "List the old addresses first, test each one on the live site, and say what you did not test.",
        "Tell guests what happens after they press request, including that nothing is charged yet.",
        "Decide with the home owners whether the map shows an area or an exact point; it trades detail for privacy.",
        "Measure image formats on your own photos. Here AVIF roughly halved the file size, and WebP was not always smaller than the JPEG.",
        "Treat analytics consent as a business choice: you give up some data, and in return the tools stay off until a visitor says yes.",
      ],
      stack: [
        "Next.js",
        "React",
        "Tailwind CSS",
        "Vercel",
        "Sanity",
        "MapLibre",
        "OpenStreetMap",
        "GSAP",
      ],
      seo: {
        title: "Picomar: a villa site that shows areas, not addresses",
        description:
          "Marcelo Retana on the Picomar villa website: request-to-book dates, area-only maps, old villa pages forwarded, AVIF photos and analytics that wait for consent.",
      },
    },
    es: {
      title: "Un sitio de villas que vende la vista y guarda la dirección",
      excerpt:
        "Qué muestra el sitio de Picomar a los huéspedes, qué guarda hasta la reserva y qué debe revisar primero quien piense en un sitio parecido.",
      sector: "Alquiler de villas de lujo",
      location: "Uvita, Costa Rica",
      sections: [
        {
          heading: "Un sitio que cualquiera puede comprobar desde afuera",
          body: [
            "Picomar alquila villas privadas en la costa del Pacífico sur de Costa Rica. Su sitio reemplazó a uno en WordPress, y las decisiones que más importan a un negocio como ese se ven desde afuera: cómo se comportan las direcciones viejas, qué dice la tarjeta de reserva, qué muestra el mapa, cuánto pesan las fotos y cuándo empieza la analítica.",
            "El Internet Archive muestra WordPress, WooCommerce, un complemento de tienda, y Elementor, un constructor de páginas, todavía activos el 16 de junio de 2026. Todo lo que sigue se comprobó desde afuera, y las cifras son del 30 de octubre de 2026.",
          ],
          image: "desktop-villa-page",
        },
        {
          heading: "Empiece por las direcciones del sitio viejo",
          body: [
            "En cualquier rediseño, lo primero son las direcciones viejas. Cada una puede estar en un marcador, en un blog de viajes o en el índice de Google. Durante 2025 y 2026 el Internet Archive capturó 35 páginas viejas de villas, que vivían bajo /accommodation/, y 12 entradas del blog (The Journal) en la raíz del sitio.",
            "Una revisión del 30 de octubre de 2026 probó esas 47 contra el sitio en vivo. Todas terminan en una página que funciona. Cuarenta y dos llegan a la página equivalente tras dos redirecciones permanentes, la señal que le dice a Google que la página se movió para siempre. Cinco llegan a la lista de villas, un destino menos exacto. Solo se probaron estos dos tipos de dirección, y no se afirma nada sobre ninguna otra dirección vieja.",
          ],
          image: "desktop-journal",
        },
        {
          heading: "La tarjeta de reserva dice lo que sigue",
          body: [
            "En la página de una villa, el huésped elige un rango de fechas y la cantidad de personas en una tarjeta de reserva. El botón de solicitud queda inactivo hasta que se eligen fechas, y la tarjeta dice que aún no se le cobra. Los términos del sitio agregan que la reserva se confirma solo cuando se procesa el pago, tal como se indica en el checkout, y se envía un correo de confirmación.",
            "No todas las villas funcionan así. Cuatro páginas cambian la tarjeta por un enlace de consulta, y siete suman un recuadro que envía las estadías largas a WhatsApp o a un mensaje. Ese es el costo de reservar por solicitud: atiende la estadía habitual y pasa las inusuales a una persona. Si las estadías largas importan en su negocio, decida pronto por cuál camino van.",
          ],
          image: "desktop-dates",
        },
        {
          heading: "Mostrar la zona y guardar la dirección",
          body: [
            "Cuando la página de una villa tiene mapa, este es un círculo rotulado «Approximate area», que significa zona aproximada. La mayoría de las páginas añade que la dirección exacta se comparte después de reservar. Los datos estructurados de cada villa, un bloque de datos rotulados que leen los buscadores, dan solo el pueblo y el país como ubicación.",
            "El costo es real: un círculo le dice al huésped menos que un punto exacto sobre qué tan lejos queda la playa o un restaurante. La ganancia es que el lugar exacto de una casa no se publica para que cualquiera lo encuentre. Si usted administra casas de otras personas, pregunte a esos dueños cuál pérdida prefieren aceptar, y pregunte antes de fijar el diseño.",
          ],
          image: "desktop-map",
        },
        {
          heading: "Las fotos son el producto: conviene medirlas",
          body: [
            "En el alquiler de villas las fotos son el producto, y en el inicio y en la lista de villas son también la mayor parte de lo que descarga el navegador. En cada una de las 46 páginas de villa, la foto superior llega al navegador en AVIF, un formato más nuevo, cuando este lo acepta. A 1920 píxeles de ancho, el archivo AVIF pesa entre 42% y 56% menos que la misma foto en JPEG.",
            "También se midió WebP, el otro formato nuevo de uso común. Con esas mismas fotos pesó más que el JPEG en 23 páginas y menos en 23. Un formato famoso no siempre es el más liviano, así que pruebe con sus propias fotos. En la página de una villa solo la foto superior está configurada para cargar de inmediato; las demás, para cargar conforme el visitante baja.",
          ],
          image: "desktop-villa-list",
        },
        {
          heading: "Activar la analítica solo tras un sí",
          body: [
            "El sitio usa Google Analytics y el píxel de Meta, scripts pequeños que informan qué páginas abre el visitante y qué anuncios lo trajeron. Un aviso al llegar ofrece Allow (permitir) o No thanks (no, gracias). En un navegador, antes de cualquier elección, el inicio solo contacta a picomar.com y no guarda cookies. Tras Allow, aparecen solicitudes a Google y a Facebook y cookies. Tras No thanks, una revisión de tres páginas no halló ninguna.",
            "El costo son los datos. Cada visitante que rechaza queda fuera de esos reportes, así que las cifras de anuncios se verán menores que el tráfico real. La ganancia es que Google Analytics y el píxel de Meta no corren sin un sí. Si los anuncios son su principal fuente de huéspedes, defina qué puede perder antes de decidir.",
          ],
          image: null,
        },
      ],
      takeaways: [
        "Liste primero las direcciones viejas, pruebe cada una en el sitio en vivo y diga qué no probó.",
        "Diga al huésped qué pasa después de pedir reservar, incluido que todavía no se cobra nada.",
        "Decida con los dueños de las casas si el mapa muestra una zona o un punto exacto; así se cambia detalle por privacidad.",
        "Mida los formatos con sus propias fotos: aquí AVIF redujo el peso casi a la mitad y WebP no siempre pesó menos que el JPEG.",
        "Trate el consentimiento de analítica como decisión de negocio: cede algo de información y, a cambio, las herramientas esperan un sí.",
      ],
      stack: [
        "Next.js",
        "React",
        "Tailwind CSS",
        "Vercel",
        "Sanity",
        "MapLibre",
        "OpenStreetMap",
        "GSAP",
      ],
      seo: {
        title: "Picomar: sitio de villas que muestra zonas, no direcciones",
        description:
          "Marcelo Retana sobre el sitio de Picomar: reservas por solicitud, mapas por zona, páginas viejas de villas redirigidas, fotos en AVIF y analítica con permiso.",
      },
    },
  },
};

export default story;
