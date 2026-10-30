import type { BuildStorySource } from "../types";
import desktopAiReview from "./desktop-ai-review.webp";
import desktopDataPrivacy from "./desktop-data-privacy.webp";
import desktopParentApproval from "./desktop-parent-approval.webp";
import hero from "./hero.webp";
import mobileHero from "./mobile-hero.webp";
import og from "./og.jpg";

const story: BuildStorySource = {
  slug: "alhena",
  name: "Alhena",
  year: "2026",
  liveUrl: "https://alhena.fun",
  ownProduct: true,
  publishedAt: "2026-10-30",
  og,
  images: {
    hero: {
      src: hero,
      kind: "desktop",
      alt: {
        en: "The Alhena home page on a computer: logo, the headline “Clear tasks for school and home, for today”, a short description and a button to try the app.",
        es: "La página de inicio de Alhena en computadora: logo, el titular «Tareas del colegio y la casa, claras para hoy», una descripción breve y un botón para probar la app.",
      },
      caption: {
        en: "The public home page at alhena.fun, in Spanish.",
        es: "La página de inicio pública en alhena.fun.",
      },
    },
    "desktop-parent-approval": {
      src: desktopParentApproval,
      kind: "desktop",
      alt: {
        en: "Parent mode on the Alhena home page: a card listing four tasks waiting for confirmation, all ticked, with an “Approve all” button and a note that only ticked items are approved.",
        es: "El modo padre en la página de inicio de Alhena: una tarjeta con cuatro tareas esperando confirmación, todas marcadas, un botón «Aprobar Todas» y una nota que dice que solo se aprueban las marcadas.",
      },
      caption: {
        en: "Parent mode on the home page, with sample data: tasks marked done wait here, and only the ticked ones are approved.",
        es: "El modo padre en la página de inicio, con datos de ejemplo: aquí esperan las tareas terminadas y solo se aprueban las que tienen la casilla marcada.",
      },
    },
    "mobile-hero": {
      src: mobileHero,
      kind: "mobile",
      alt: {
        en: "The Alhena home page on a phone: logo, headline, short description, a note that linking Gmail is optional and asked for separately, and a button to try the app.",
        es: "La página de inicio de Alhena en un celular: logo, titular, descripción breve, una nota que indica que enlazar Gmail es opcional y se pide aparte, y un botón para probar la app.",
      },
      caption: {
        en: "The home page on a phone: Gmail is optional and asked for separately.",
        es: "La página de inicio en un celular: Gmail es opcional y se pide aparte.",
      },
    },
    "desktop-ai-review": {
      src: desktopAiReview,
      kind: "desktop",
      alt: {
        en: "Three feature cards on the Alhena home page. The first says that after syncing Gmail the AI proposes tasks and the parent reviews them before they reach the board.",
        es: "Tres tarjetas en la página de inicio de Alhena. La primera dice que, tras sincronizar Gmail, la IA propone tareas y el padre o la madre las revisa antes de que lleguen al tablero.",
      },
      caption: {
        en: "From the home page: the AI proposes tasks from the email, and the parent reviews them first.",
        es: "De la página de inicio: la IA propone tareas desde el correo y el padre o la madre las revisa primero.",
      },
    },
    "desktop-data-privacy": {
      src: desktopDataPrivacy,
      kind: "desktop",
      alt: {
        en: "Closing section and footer of the Alhena home page: a “Start with Google” button and a note that data is kept separate for each family, with Google sign-in and no Alhena password.",
        es: "Cierre y pie de la página de inicio de Alhena: un botón «Empezar con Google» y una nota que explica que los datos están aislados por familia, con inicio de sesión de Google y sin contraseña propia.",
      },
      caption: {
        en: "The footer note: data kept separate for each family, Google sign-in, no separate password.",
        es: "La nota del pie: datos aislados por familia, inicio de sesión con Google y sin contraseña aparte.",
      },
    },
  },
  copy: {
    en: {
      title: "How I built Alhena so the AI only drafts and a parent decides",
      excerpt:
        "I built a Spanish-language app that turns a parent’s emails into draft tasks. The choices that mattered: what the AI may do, what it may read, who decides.",
      sector: "Family task app",
      location: "Online",
      sections: [
        {
          heading: "I changed one rule on day one",
          body: [
            "On 6 April 2026 I committed the Gmail sync at 17:46 and the first AI step at 18:01. That first version wrote the model’s output straight onto the board as tasks.",
            "By 20:20 the same evening I had changed it. The commit says it in one line: “intake creates drafts for review instead of auto-creating tasks”. Now only a parent can turn a draft into a task. The cost is one extra step per notice. In exchange, nothing the model reads reaches the board until a person has looked at it.",
            "If you are planning something similar, settle this on day one: who has the last word, the software or a person? That evening it took a drafts table, a review service, three routes and a review queue to make it real.",
          ],
          image: "desktop-parent-approval",
        },
        {
          heading: "Taking the smallest slice of an inbox",
          body: [
            "The app asks Google for one Gmail permission, read-only, and only when a parent chooses to connect the inbox, as a step separate from signing in. A permission like this is called a scope: the list of things you let an app do. This one lists reading and nothing else, and the code only calls Gmail’s read endpoints.",
            "Then I narrowed what the app keeps. It follows one sender, which a parent can change in Settings, and mail from anyone else is dropped before it is saved. By default the first sync looks back 15 days, and a parent can pick another window. Later syncs ask Gmail only for what is new. Nothing runs in the background: a parent presses a button.",
            "The trade-off is that mail does not arrive by itself. The project rules in the first commit had already ruled out scheduled sync for version one. On 16 April I reworked the landing copy and the parent screens so that Gmail is clearly optional: a family can start with manual tasks and add the inbox later.",
          ],
          image: "mobile-hero",
        },
        {
          heading: "Putting limits on the AI",
          body: [
            "The rules in my first commit already said two things: use structured outputs for email extraction, and never let a model write to the database directly. So I used OpenAI’s gpt-4o-mini with a fixed form instead of free text. That form is called a schema. The API asks the model to follow it, and my code checks the answer against the same schema again before using it.",
            "Two small rules matter more than they look. Links in a draft must come from the original email, so any other link the model returns is thrown away and it cannot invent an address a parent might tap. And every result is stored with the model name and a trace number, so any draft can be traced back to the run that made it.",
            "Dates took many commits. On 8 April, 16 of the 42 commits mention dates, time windows or overdue items. If your product reads dates from free text, budget time for them.",
          ],
          image: "desktop-ai-review",
        },
        {
          heading: "From one household to many families",
          body: [
            "My first migration created ten tables, and none had a family column. Support for many families landed on 10 April, and it took two steps: a script that moved the existing data into a first family, then a migration that made the family ID mandatory on 14 tables. The order mattered: the migration’s own header says it may run only after the data has been moved.",
            "Today 17 of the 20 tables carry a family ID. What matters more is where that ID comes from. It comes from the signed-in session, not from the request.",
            "If a second customer is even possible, put the customer ID on every table from the first day. I added it on day five, with a backfill script and a careful migration. With other people’s data already inside, that step carries far more risk.",
          ],
          image: "desktop-data-privacy",
        },
        {
          heading: "What I left out of version one",
          body: [
            "The first commit already carried my project rules: no notifications, no scheduled sync, a single Gmail inbox and a light theme only. Limits written down on day one give every “can we also…” a ready answer. For an owner, the list of what you will not build is as useful as the list of what you will.",
            "What version one does have is a set of automatic checks. Every push to the main branch runs the unit tests (at the time of writing 1,321 pass and 5 that need a live database are skipped), a coverage report that reads 67% of lines, and a production build. A script also fails the build if code that talks to Gmail or OpenAI ends up in code that runs in the browser. The project rules keep both on the server.",
            "The end-to-end tests drive a real browser at desktop and iPad sizes. They are meant to run on a developer’s machine and are skipped in the pipeline. That is a known gap.",
          ],
          image: null,
        },
      ],
      takeaways: [
        "Decide early who has the last word, the software or a person, and build the product around that answer.",
        "Ask for the smallest permission you can, make it optional, and keep only the data the product needs.",
        "If you might ever have a second customer, put the customer ID on every table from the first day.",
        "Write down what version one will not do. Scope arguments become a lookup.",
        "AI demos are quick. Dates, edge cases and automatic checks need their own time, so plan for them.",
      ],
      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Auth.js",
        "PostgreSQL",
        "Drizzle ORM",
        "Gmail API",
        "OpenAI API",
        "Vitest",
      ],
      seo: {
        title: "Building Alhena: an AI that drafts, a parent who decides",
        description:
          "Marcelo Retana explains how he built Alhena, a Spanish-language app that turns a parent’s email into draft tasks: Gmail access, AI limits and family data.",
      },
    },
    es: {
      title: "Cómo construí Alhena: la IA propone y un padre o madre decide",
      excerpt:
        "Construí una app en español que convierte el correo de un padre en borradores de tareas. Las decisiones clave: qué hace la IA, qué lee y quién decide.",
      sector: "App de tareas para familias",
      location: "En línea",
      sections: [
        {
          heading: "Cambié una regla el primer día",
          body: [
            "El 6 de abril de 2026 dejé guardada la sincronización con Gmail a las 17:46 y el primer paso de IA a las 18:01. Esa primera versión pasaba lo que devolvía el modelo directo al tablero, como tareas.",
            "A las 20:20 de esa misma noche ya lo había cambiado. El mensaje del commit lo resume: la entrada de correo crea borradores para revisión en lugar de crear tareas automáticamente. Ahora solo un padre o una madre puede convertir un borrador en tarea. El costo es un paso más por aviso. A cambio, nada de lo que lee el modelo llega al tablero sin que una persona lo haya visto.",
            "Si usted está pensando en algo parecido, resuelva esto desde el primer día: ¿quién tiene la última palabra, el software o una persona? Esa noche hacerlo realidad requirió una tabla de borradores, un servicio de revisión, tres rutas y una cola de revisión.",
          ],
          image: "desktop-parent-approval",
        },
        {
          heading: "Tomar la porción más pequeña del correo",
          body: [
            "La app le pide a Google un solo permiso de Gmail, de solo lectura, y únicamente cuando el padre o la madre decide conectar el correo, como un paso aparte del inicio de sesión. A ese tipo de permiso se le llama alcance (scope): la lista de cosas que usted deja hacer a una aplicación. Este solo incluye leer, y el código únicamente llama las funciones de lectura de Gmail.",
            "Luego reduje lo que la app conserva. Sigue a un solo remitente, que el padre o la madre puede cambiar en Ajustes, y el correo de cualquier otro se descarta antes de guardarse. Por defecto la primera sincronización mira 15 días atrás, y se puede elegir otro plazo. Las siguientes piden a Gmail solo lo nuevo. Nada corre en segundo plano: alguien pulsa un botón.",
            "La contrapartida es que el correo no llega solo. Las reglas del primer commit ya descartaban la sincronización programada para la primera versión. El 16 de abril reescribí el texto de la página de inicio y ajusté las pantallas de los padres para que Gmail quede claramente como opcional: una familia puede empezar con tareas manuales y agregar el correo después.",
          ],
          image: "mobile-hero",
        },
        {
          heading: "Poner límites claros a la IA",
          body: [
            "Las reglas de mi primer commit ya decían dos cosas: usar salidas estructuradas para extraer datos del correo y nunca dejar que un modelo escriba directo en la base de datos. Por eso usé gpt-4o-mini de OpenAI con un formulario fijo en lugar de texto libre. Ese formulario se llama esquema. La API le pide al modelo que lo siga, y mi código vuelve a revisar la respuesta contra el mismo esquema antes de usarla.",
            "Dos reglas pequeñas importan más de lo que parece. Los enlaces de un borrador deben salir del correo original: cualquier otro enlace que devuelva el modelo se descarta, así no puede inventar una dirección que alguien toque. Y cada resultado se guarda con el nombre del modelo y un número de rastreo, para saber de dónde salió cada borrador.",
            "Las fechas requirieron muchos commits. El 8 de abril, 16 de los 42 commits mencionan fechas, plazos o tareas vencidas. Si su producto lee fechas de texto libre, reserve tiempo para ellas.",
          ],
          image: "desktop-ai-review",
        },
        {
          heading: "De un hogar a muchas familias",
          body: [
            "Mi primera migración creó diez tablas y ninguna tenía columna de familia. El soporte para muchas familias llegó el 10 de abril y tomó dos pasos: un script que movió los datos existentes a una primera familia y después una migración que volvió obligatorio el ID de familia en 14 tablas. El orden importaba: el propio encabezado de la migración dice que solo puede correr después de mover los datos.",
            "Hoy 17 de las 20 tablas llevan un ID de familia. Importa más de dónde sale ese ID: sale de la sesión iniciada, no de la solicitud.",
            "Si es posible que algún día tenga un segundo cliente, ponga el ID del cliente en cada tabla desde el primer día. Yo lo agregué el quinto día, con un script de relleno y una migración cuidadosa. Con datos de otras personas ya adentro, ese paso conlleva mucho más riesgo.",
          ],
          image: "desktop-data-privacy",
        },
        {
          heading: "Lo que dejé fuera de la primera versión",
          body: [
            "El primer commit del proyecto ya traía mis reglas: sin notificaciones, sin sincronización programada, un solo buzón de Gmail y solo tema claro. Los límites escritos desde el primer día le dan una respuesta lista a cada «¿y si también…?». Para un dueño de negocio, la lista de lo que no va a construir sirve tanto como la de lo que sí.",
            "Lo que sí trae la primera versión es un conjunto de revisiones automáticas. Cada cambio a la rama principal corre las pruebas unitarias (al escribir esto pasan 1,321 y se omiten 5 que necesitan una base de datos real), un informe de cobertura que marca 67% de las líneas y una compilación de producción. Además, un script hace fallar la compilación si el código que habla con Gmail o con OpenAI termina en código que corre en el navegador. Las reglas del proyecto mantienen ambos en el servidor.",
            "Las pruebas de extremo a extremo manejan un navegador real en tamaño de escritorio y de iPad. Están pensadas para correr en la computadora de quien desarrolla y se omiten en el servidor de integración. Es una brecha conocida.",
          ],
          image: null,
        },
      ],
      takeaways: [
        "Decida temprano quién tiene la última palabra, el software o una persona, y construya el producto alrededor de esa respuesta.",
        "Pida el permiso más pequeño posible, hágalo opcional y guarde solo los datos que el producto necesita.",
        "Si algún día podría tener un segundo cliente, ponga el ID del cliente en cada tabla desde el primer día.",
        "Escriba lo que la primera versión no hará. Las discusiones de alcance se vuelven una consulta.",
        "Las demostraciones de IA son rápidas. Las fechas, los casos raros y las revisiones automáticas necesitan su propio tiempo; presupuéstelos.",
      ],
      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Auth.js",
        "PostgreSQL",
        "Drizzle ORM",
        "Gmail API",
        "OpenAI API",
        "Vitest",
      ],
      seo: {
        title: "Cómo construí Alhena: la IA propone, un padre decide",
        description:
          "Marcelo Retana cuenta cómo construyó Alhena, una app en español que convierte el correo de un padre en borradores de tareas: Gmail, límites a la IA y datos.",
      },
    },
  },
};

export default story;
