import type { BuildStorySource } from "../types";
import desktopAvailabilityCalendar from "./desktop-availability-calendar.webp";
import desktopExperience from "./desktop-experience.webp";
import hero from "./hero.webp";
import mobileAvailability from "./mobile-availability.webp";
import og from "./og.jpg";
import photoFirepitSunset from "./photo-firepit-sunset.webp";
import photoNightEntrance from "./photo-night-entrance.webp";

const story: BuildStorySource = {
  slug: "casa-paraiso",
  name: "Casa Paraiso",
  year: "2026",
  liveUrl: "https://casaparaisocr.com",
  publishedAt: "2026-10-30",
  og,
  images: {
    hero: {
      src: hero,
      kind: "desktop",
      alt: {
        en: "Home page of the Casa Paraiso website: the residence at dusk with its pool and terrace, the name in large serif type and the main menu.",
        es: "Página de inicio del sitio de Casa Paraiso: la residencia al atardecer con su piscina y terraza, el nombre en letra serif grande y el menú principal.",
      },
      caption: {
        en: "The home page opens on the house itself.",
        es: "La página de inicio abre con la casa.",
      },
    },
    "desktop-experience": {
      src: desktopExperience,
      kind: "desktop",
      alt: {
        en: "Home page section “What defines the stay”: a night photo of the terrace and blue-lit pool beside the numbered headings Full Ocean Panorama and Infinity Pool & Jacuzzi.",
        es: "Sección «What defines the stay» de la página de inicio: una foto nocturna de la terraza y la piscina iluminada en azul junto a los títulos numerados Full Ocean Panorama e Infinity Pool & Jacuzzi.",
      },
      caption: {
        en: "Numbered sections pair a large photo with a short text.",
        es: "Las secciones numeradas combinan una foto grande con un texto corto.",
      },
    },
    "desktop-availability-calendar": {
      src: desktopAvailabilityCalendar,
      kind: "desktop",
      alt: {
        en: "Request form next to a month calendar: a stay is selected in gold and appears in the dates field, while the name, email and message fields are empty.",
        es: "Formulario de solicitud junto a un calendario mensual: una estadía marcada en dorado aparece en el campo de fechas, y los campos de nombre, correo y mensaje están vacíos.",
      },
      caption: {
        en: "Picking two days on the calendar fills in the dates field.",
        es: "Al marcar dos días en el calendario, el campo de fechas se llena solo.",
      },
    },
    "mobile-availability": {
      src: mobileAvailability,
      kind: "mobile",
      alt: {
        en: "Phone view of the availability calendar with a stay selected, and the first form field below it.",
        es: "Vista en celular del calendario de disponibilidad con una estadía seleccionada y el primer campo del formulario debajo.",
      },
      caption: { en: "The same calendar on a phone.", es: "El mismo calendario en un celular." },
    },
    "photo-night-entrance": {
      src: photoNightEntrance,
      kind: "photo",
      alt: {
        en: "The entrance of Casa Paraiso at night, lit by path lights, with the Milky Way above the trees.",
        es: "La entrada de Casa Paraiso de noche, iluminada por luces en el camino, con la Vía Láctea sobre los árboles.",
      },
      caption: {
        en: "The entrance at night, from the residence gallery.",
        es: "La entrada de noche, de la galería de la residencia.",
      },
    },
    "photo-firepit-sunset": {
      src: photoFirepitSunset,
      kind: "photo",
      alt: {
        en: "A lit firepit on a terrace at sunset, dark chairs facing the ocean and an orange glow on the horizon.",
        es: "Un fogón encendido en una terraza al atardecer, sillas oscuras frente al océano y un resplandor naranja en el horizonte.",
      },
      caption: { en: "The firepit terrace at sunset.", es: "La terraza del fogón al atardecer." },
    },
  },
  copy: {
    en: {
      title: "How I built a request-to-book site for a private house in Uvita",
      excerpt:
        "Why the site takes requests instead of bookings, how the calendar stays current, and who edits what: the decisions behind the Casa Paraiso website.",
      sector: "Vacation rental",
      location: "Uvita, Costa Rica",
      sections: [
        {
          heading: "Nine designs, one choice",
          body: [
            "Before I wrote the real site, I built nine complete design directions as separate pages, with a picker page that linked to each one. All nine existed by the end of 10 February. The one that won was a dark editorial look with gold details.",
            "On 2 March I deleted the other eight designs and the picker in a single commit, 9,339 lines in all, and pulled shared components out of the winner. For an owner the lesson is practical. Exploring widely is quick, but only if you commit to one direction and stop. Nine live designs would have meant nine sets of code to maintain.",
          ],
          image: "desktop-experience",
        },
        {
          heading: "Why the site takes requests, not bookings",
          body: [
            "The site states that the house is available for private stays by referral, so it works on requests: a guest sends one and the owner answers. A guest gives a name, an email address and the dates, and a line under the button says a request does not confirm a reservation.",
            "The project has no payment step at all. An instant-booking engine needs rules for deposits, cancellations and double bookings. A request needs one person to say yes or no. For one house rented through referrals, the second is the simpler tool, and it leaves the decision with the owner.",
            "After sending, the guest sees a “Request received” message that promises a reply within 24 to 48 hours, and the confirmation email repeats it. If you promise a reply time, say it in both places and pick one the owner can keep.",
          ],
          image: "desktop-availability-calendar",
        },
        {
          heading: "A calendar that fetches the latest dates",
          body: [
            "A page arrives with a copy of the blocked dates that is refreshed every five minutes, and then the calendar asks the server for the current list as soon as it opens. A guest sees what the owner blocked a moment ago, not what was true at the last refresh.",
            "Guests choose dates by clicking a check-in day and then a check-out day. Past days and blocked days cannot be clicked, and the date field is read-only, so nobody can mistype a date.",
            "The automatic part matters more than it sounds. When the owner confirms a request in the admin, the site creates the blocked range by itself, and if the owner changes their mind it removes it. Nobody updates a calendar in one place and a request list in another. The trade-off is one small extra request each time the page opens, and I took it over the risk of guests asking for dates that are already gone.",
          ],
          image: "mobile-availability",
        },
        {
          heading: "Save the request, then send the email",
          body: [
            "When a guest submits the form, the request lands in the owner’s password-protected admin before any email goes out. If an email fails, the request is still there for the owner to find. Each request produces two messages through Resend: a notice to the owner, and an acknowledgement to the guest that promises a reply within 24 to 48 hours.",
            "I started with a Gmail account as the sender and replaced it with Resend, a service built for automated email, on 10 March. Whatever you choose, send automated mail from a service made for it rather than from a personal inbox.",
          ],
          image: null,
        },
        {
          heading: "Let the owner change the photos",
          body: [
            "The owner can swap the photos without calling me. The home, residence and contact pages each have one editable document in Sanity, and the room galleries and local-experience cards can be edited too. The photo fields on the pages and galleries ask for alt text, the short description that screen readers and search engines read.",
            "Editable photos bring a risk: someone uploads an enormous file. The home page already uses a photo stored at 8192 pixels wide, a file of almost 6 MB. The site resizes images on the way out and serves AVIF, a compact image format, to browsers that support it, so scrolling the whole home page on a desktop screen loads 21 photos in under 800 KB.",
            "The site also has an entry point for webhooks, which are automatic messages between two services. Sanity can call it after a publish, so the affected content can refresh without a new release. If Sanity is ever unreachable, each page falls back to built-in text and photos.",
          ],
          image: "photo-night-entrance",
        },
        {
          heading: "Links, search and timing",
          body: [
            "A preview matters when a link lands in a WhatsApp chat, so each of the four pages has its own 1200 by 630 image, title and description. Structured data, a block of code that tells Google what kind of business a page describes, marks the site as a vacation rental. A robots file asks search engines to skip the admin and API addresses.",
            "On timing: the booking flow, admin, editor and domain were all in place 22 days after my first commit, the first saved change to the code. The page-photo editor came later, on 20 April. I list dates because owners often ask how long this takes.",
          ],
          image: "photo-firepit-sunset",
        },
      ],
      takeaways: [
        "Explore several designs quickly, pick one early and delete the rest. Keeping options alive takes more work than drawing them.",
        "If you rent by referral, let guests send requests and leave the yes or no to the owner. Add online payment only if needed.",
        "Keep the calendar and the confirmation in one system, so one click in the admin updates what guests see.",
        "Save every request before sending any email, and send automated mail from a service built for it.",
        "Let the owner swap photos, require alt text, and resize images on the way out.",
      ],
      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Sanity",
        "Resend",
        "Framer Motion",
        "GSAP",
        "Vercel",
      ],
      seo: {
        title: "Building Casa Paraiso: a request-to-book rental website",
        description:
          "Marcelo Retana on building Casa Paraiso’s site: nine design directions, a request-to-book calendar, an admin that blocks dates and an editor the owner can use.",
      },
    },
    es: {
      title: "Cómo construí el sitio de reservas por solicitud de una casa en Uvita",
      excerpt:
        "Por qué el sitio recibe solicitudes y no reservas, cómo se mantiene al día el calendario y quién edita qué: las decisiones detrás del sitio de Casa Paraiso.",
      sector: "Alquiler vacacional",
      location: "Uvita, Costa Rica",
      sections: [
        {
          heading: "Nueve diseños, una decisión",
          body: [
            "Antes de escribir el sitio real, armé nueve direcciones de diseño completas, cada una en su propia página, más una página selectora que enlazaba a todas. Las nueve existían al terminar el 10 de febrero. La que ganó fue de estilo editorial oscuro, con detalles dorados.",
            "El 2 de marzo borré, en un solo cambio, los otros ocho diseños y la página selectora: 9,339 líneas en total. Después saqué del ganador los componentes compartidos. Para un dueño, la lección es práctica. Explorar mucho es rápido, pero solo si usted escoge una dirección y deja de explorar. Nueve diseños vivos habrían sido nueve códigos distintos que mantener.",
          ],
          image: "desktop-experience",
        },
        {
          heading: "Por qué hay solicitudes y no reservas",
          body: [
            "El sitio dice que la casa se ofrece para estadías privadas por referencia. Por eso funciona con solicitudes: el huésped envía una y el dueño responde. Quien escribe deja su nombre, su correo y las fechas, y bajo el botón una línea aclara que enviar una solicitud no confirma la reserva.",
            "En el proyecto no existe ningún paso de pago. Un motor de reservas instantáneas necesita reglas para depósitos, cancelaciones y reservas dobles; una solicitud solo necesita que una persona diga sí o no. Para una sola casa que se alquila por referencias, lo segundo es la herramienta más sencilla y deja la decisión en manos del dueño.",
            "Al enviar, el huésped ve el mensaje «Request received», con la promesa de una respuesta en 24 a 48 horas, y el correo de confirmación la repite. Si promete un tiempo de respuesta, dígalo en los dos lugares y escoja uno que el dueño pueda cumplir.",
          ],
          image: "desktop-availability-calendar",
        },
        {
          heading: "Un calendario que pide las fechas más recientes",
          body: [
            "La página llega con una copia de las fechas bloqueadas que se renueva cada cinco minutos y, apenas se abre, el calendario le pide al servidor la lista actual. El huésped ve lo que el dueño bloqueó hace un momento, no lo que era cierto en la última renovación.",
            "Para elegir fechas se hace clic en el día de entrada y luego en el de salida. Los días pasados y los bloqueados no se pueden marcar, y el campo de fechas es de solo lectura, así que nadie puede escribir mal una fecha.",
            "La parte automática importa más de lo que parece. Cuando el dueño confirma una solicitud en el panel, el sitio crea el rango bloqueado por sí solo, y si el dueño se arrepiente, lo quita. Nadie tiene que actualizar un calendario en un lado y una lista de solicitudes en otro. A cambio hay una pequeña consulta extra cada vez que se abre la página, y la acepté para que nadie pida fechas que ya no están.",
          ],
          image: "mobile-availability",
        },
        {
          heading: "Primero guardar la solicitud, luego el correo",
          body: [
            "Cuando un huésped envía el formulario, la solicitud llega al panel del dueño, protegido con contraseña, antes de que salga cualquier correo. Si un correo falla, la solicitud sigue ahí para que el dueño la encuentre. Cada solicitud genera dos mensajes mediante Resend: un aviso al dueño y un acuse al huésped que promete respuesta en 24 a 48 horas.",
            "Empecé con una cuenta de Gmail como remitente y el 10 de marzo la cambié por Resend, un servicio hecho para correo automático. Sea cual sea su elección, envíe el correo automático desde un servicio pensado para eso y no desde un buzón personal.",
          ],
          image: null,
        },
        {
          heading: "Que el dueño pueda cambiar las fotos",
          body: [
            "El dueño puede cambiar las fotos sin llamarme. Las páginas de inicio, residencia y contacto tienen cada una un documento editable en Sanity, y las galerías de cada espacio y las tarjetas de experiencias cercanas también se editan. Los campos de foto de las páginas y las galerías piden texto alternativo, la descripción corta que leen los lectores de pantalla y los buscadores.",
            "Las fotos editables traen un riesgo: que alguien suba un archivo enorme. La página de inicio ya usa una foto guardada a 8192 píxeles de ancho, un archivo de casi 6 MB. El sitio reduce las imágenes al servirlas y entrega AVIF, un formato compacto, a los navegadores compatibles, así que recorrer toda la página de inicio en una pantalla de escritorio carga 21 fotos en menos de 800 KB.",
            "El sitio también tiene un punto de entrada para webhooks, mensajes automáticos entre dos servicios. Sanity puede llamarlo después de una publicación, y así el contenido afectado puede actualizarse sin sacar una versión nueva. Si Sanity no responde, cada página usa textos y fotos de respaldo.",
          ],
          image: "photo-night-entrance",
        },
        {
          heading: "Enlaces, búsqueda y tiempos",
          body: [
            "La vista previa importa cuando un enlace llega a un chat de WhatsApp, así que cada una de las cuatro páginas tiene su propia imagen de 1200 por 630, su título y su descripción. Los datos estructurados, un bloque de código que le dice a Google qué tipo de negocio describe una página, identifican el sitio como alquiler vacacional. Un archivo robots les pide a los buscadores que omitan las direcciones de administración y de API.",
            "Sobre los tiempos: la lógica de solicitudes, el panel, el editor y el dominio estaban listos 22 días después de mi primer commit, el primer cambio guardado del código. El editor de fotos de las páginas llegó después, el 20 de abril. Pongo las fechas porque los dueños suelen preguntar cuánto tarda.",
          ],
          image: "photo-firepit-sunset",
        },
      ],
      takeaways: [
        "Explore varios diseños rápido, escoja uno pronto y borre el resto. Mantener opciones vivas da más trabajo que dibujarlas.",
        "Si alquila por referencia, deje que el huésped envíe una solicitud y que el dueño decida. Agregue pagos en línea solo si hacen falta.",
        "Mantenga el calendario y la confirmación en un solo sistema, para que un clic en el panel actualice lo que ven los huéspedes.",
        "Guarde cada solicitud antes de enviar cualquier correo y mande el correo automático desde un servicio hecho para eso.",
        "Deje que el dueño cambie las fotos, exija texto alternativo y reduzca las imágenes al servirlas.",
      ],
      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Sanity",
        "Resend",
        "Framer Motion",
        "GSAP",
        "Vercel",
      ],
      seo: {
        title: "Cómo construí Casa Paraiso: sitio de reservas por solicitud",
        description:
          "Marcelo Retana cuenta cómo construyó el sitio de Casa Paraiso: nueve diseños, calendario de solicitudes, un panel que bloquea fechas y un editor para el dueño.",
      },
    },
  },
};

export default story;
