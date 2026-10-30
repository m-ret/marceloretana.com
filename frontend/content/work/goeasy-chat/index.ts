import type { BuildStorySource } from "../types";
import desktopCountryCostaRica from "./desktop-country-costa-rica.webp";
import desktopSignup from "./desktop-signup.webp";
import hero from "./hero.webp";
import og from "./og.jpg";
import videoAssignAgent from "./video-assign-agent.webp";
import videoInbox from "./video-inbox.webp";
import videoTemplates from "./video-templates.webp";

const story: BuildStorySource = {
  slug: "goeasy-chat",
  name: "GoEasy.Chat",
  year: "2026",
  liveUrl: "https://goeasy.chat",
  ownProduct: true,
  publishedAt: "2026-10-30",
  og,
  images: {
    hero: {
      src: hero,
      kind: "desktop",
      alt: {
        en: "GoEasy.Chat home page in Spanish: headline, email field to start, and the top of a sample team inbox.",
        es: "Página de inicio de GoEasy.Chat en español: titular, campo de correo para empezar y la parte superior de una bandeja de equipo de ejemplo.",
      },
      caption: {
        en: "The Spanish home page at goeasy.chat. The inbox shown is sample data.",
        es: "La página de inicio en español de goeasy.chat. La bandeja que se ve es de ejemplo.",
      },
    },
    "video-inbox": {
      src: videoInbox,
      kind: "video",
      alt: {
        en: "Still from the GoEasy.Chat demo video: a list of conversations with labels, unread counts and assigned agents.",
        es: "Fotograma del video de demostración de GoEasy.Chat: lista de conversaciones con etiquetas, mensajes sin leer y agentes asignados.",
      },
      caption: {
        en: "The shared inbox, from the demo video on the site. Names and messages are sample data.",
        es: "La bandeja compartida, del video de demostración del sitio. Los nombres y mensajes son de ejemplo.",
      },
    },
    "desktop-signup": {
      src: desktopSignup,
      kind: "desktop",
      alt: {
        en: "GoEasy.Chat signup form, step 1 of 4: company name, subdomain, admin name and admin email.",
        es: "Formulario de registro de GoEasy.Chat, paso 1 de 4: nombre de la empresa, subdominio, nombre y correo del administrador.",
      },
      caption: {
        en: "Step 1 of 4: company details and the customer’s own address under goeasy.chat.",
        es: "Paso 1 de 4: datos de la empresa y la dirección propia del cliente bajo goeasy.chat.",
      },
    },
    "video-templates": {
      src: videoTemplates,
      kind: "video",
      alt: {
        en: "Still from the GoEasy.Chat demo video: two WhatsApp message templates with the customer and agent names filled in.",
        es: "Fotograma del video de demostración de GoEasy.Chat: dos plantillas de mensaje de WhatsApp con los nombres del cliente y del agente completados.",
      },
      caption: {
        en: "Template messages restart a conversation once WhatsApp’s 24-hour window has closed. Sample data.",
        es: "Las plantillas permiten retomar una conversación cuando se cierra la ventana de 24 horas de WhatsApp. Datos de ejemplo.",
      },
    },
    "video-assign-agent": {
      src: videoAssignAgent,
      kind: "video",
      alt: {
        en: "Still from the GoEasy.Chat demo video: a dialog to assign a conversation to one of three agents.",
        es: "Fotograma del video de demostración de GoEasy.Chat: un cuadro para asignar una conversación a uno de tres agentes.",
      },
      caption: {
        en: "Assigning a conversation to an agent. Sample data.",
        es: "Asignar una conversación a un agente. Datos de ejemplo.",
      },
    },
    "desktop-country-costa-rica": {
      src: desktopCountryCostaRica,
      kind: "desktop",
      alt: {
        en: "GoEasy.Chat landing page for Costa Rica, in Spanish, with cards that pair common problems with answers, and a button that plays a short product video.",
        es: "Página de GoEasy.Chat para Costa Rica, con tarjetas que unen problemas comunes con sus respuestas y un botón que abre un video corto del producto.",
      },
      caption: {
        en: "One of ten country pages. This one is for Costa Rica, in Spanish.",
        es: "Una de las diez páginas por país. Esta es la de Costa Rica.",
      },
    },
  },
  copy: {
    en: {
      title: "Building GoEasy.Chat: what I reused and what I built",
      excerpt:
        "The decisions behind a WhatsApp team inbox I built: an open-source engine, one address per customer, a self-serve signup, and WhatsApp’s own rules.",
      sector: "WhatsApp support software",
      location: "San José, Costa Rica",
      sections: [
        {
          heading: "Why I did not write a chat engine",
          body: [
            "A shared WhatsApp inbox needs conversations, agents, labels, notifications and a way to keep them in sync. That is a lot of parts, and an open-source tool called Chatwoot already had them working. So the first decision was what to borrow.",
            "I tried Chatwoot with my own clients first. The engine was sound. The screens were the problem: people got lost in them, and connecting a WhatsApp number to Meta was more than most could do alone. So I kept the engine and replaced the screens. Developers call this a headless backend: Chatwoot stores and moves the data, and GoEasy.Chat is what customers use.",
            "The price of that choice is two systems to keep in step. My app sends the browser’s API requests to Chatwoot through a small relay of its own. In return, the engine is self-hosted, and the screens customers use every day are our own code.",
          ],
          image: "video-inbox",
        },
        {
          heading: "One address for every customer",
          body: [
            "Each business that signs up gets its own address, such as yourcompany.goeasy.chat. Behind it sits a separate workspace in the engine, with its own agents, contacts and conversations. One copy of the code serves everyone. Developers call this multi-tenant: many tenants, one application.",
            "The customer picks the address on the signup form. It must be two to thirty characters of lowercase letters, numbers or hyphens, it cannot be a reserved word, and it cannot already be taken. The form checks that as the person types, and the server checks it again before it creates anything.",
            "The honest cost of multi-tenant software is that one mistake can reach every customer. So before the first customer arrives, decide how customers are kept apart, and test that boundary. Mine is the address plus the workspace behind it, and automated tests cover how an address is resolved.",
          ],
          image: null,
        },
        {
          heading: "Signup is part of the product",
          body: [
            "The signup runs in four steps: company details, payment, WhatsApp and a final confirmation. I moved account creation to the payment step, so someone who stops halfway still has a login. The signup is self-service, so a business does not have to talk to me to get started.",
            "The trial lasts 14 days. The payment screen says plainly that nothing is charged today and shows the date of the first charge. Payment details are entered in Paddle’s checkout, not in our forms. Paddle is the merchant of record, which means Paddle is the legal seller of the subscription.",
            "After payment the app does the setup by itself. It creates the workspace and the administrator, registers the link the engine uses to tell our app about new conversations, and sends a welcome email. The last step connects WhatsApp, and it can be skipped and finished later from the admin panel.",
          ],
          image: "desktop-signup",
        },
        {
          heading: "WhatsApp’s rules shape the screens",
          body: [
            "WhatsApp is not a neutral pipe. After a customer has been silent for more than 24 hours, a business can only reach them again with a template, a message Meta has approved in advance. GoEasy.Chat marks those conversations as expired and shows a banner that leads to the template list. Agents do not have to count the hours themselves.",
            "Templates need Meta’s approval, and approval is Meta’s decision, not ours. When WhatsApp is connected, the app submits four starter templates, each in Spanish and English, so the business has something to send as soon as Meta approves them. The templates page shows each status and has a sync button.",
            "Two smaller rules also shaped the product. The business’s own number can keep working on the phone, because Meta’s Embedded Signup has a mode called coexistence. The number must have been active on the WhatsApp Business app for at least seven days, and the signup says so before anyone starts. And browsers record voice notes in formats WhatsApp rejects, so the app converts each recording to MP3 first.",
          ],
          image: "video-templates",
        },
        {
          heading: "Assignment rules an owner can read",
          body: [
            "The first question about a shared inbox is who answers a new message. The app decides in a fixed order. If the contact has an assigned owner, the chat goes to that person. If not, it returns to whoever dealt with that customer most recently. If neither applies, it rotates through the team in turn, which is called round-robin.",
            "The rotation does not look at who is online. The settings screen says so in plain words, and an administrator can switch the rotation off. It is simple and predictable, but it is not clever. A team that works in shifts should turn it off and hand out conversations manually, to a person or to a team.",
            "Roles are few: administrators set things up, agents answer, and a third role exists for us as the operators of the service. Eight help topics inside the app, including ones on assignments and roles, come in Spanish and English.",
          ],
          image: "video-assign-agent",
        },
        {
          heading: "Spanish first, English second, and 13 pages",
          body: [
            "The product speaks Spanish and English: the site, the app and the help topics. Visitors reach the Spanish site at the main address and the English one under /en. Inside the app, each user picks a language in the sidebar.",
            "For search I added thirteen pages in Spanish: ten countries, including Costa Rica, Mexico and Colombia, and three industries: clinics, online shops and real estate. Each page describes a common problem, shows how the inbox handles it and answers two common questions in a format search engines can read. They are plain pages, and I make no claim about how they rank.",
            "The demo videos are code too. I wrote them in Remotion, a tool that renders video from React components, so every video exists in Spanish and English from the same source.",
          ],
          image: "desktop-country-costa-rica",
        },
      ],
      takeaways: [
        "Reuse a proven engine, and spend your effort on the screens and steps your customers actually touch.",
        "Decide how customers are kept apart before the first one signs up, and test that boundary.",
        "Make signup self-serve, but let people stop halfway and still end up with a working login.",
        "Learn the platform’s rules first. WhatsApp’s 24-hour window and template approval shape the whole product.",
        "Write down in plain words how work is assigned, and show those words on the settings screen.",
      ],
      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Chatwoot",
        "Paddle",
        "next-intl",
        "Vitest",
        "Remotion",
        "Bun",
      ],
      seo: {
        title: "How I built GoEasy.Chat: an engine reused, screens rebuilt",
        description:
          "Marcelo Retana on building GoEasy.Chat, a WhatsApp team inbox: an open-source engine, one address per customer, self-serve signup and WhatsApp’s own rules.",
      },
    },
    es: {
      title: "Cómo construí GoEasy.Chat: lo que reutilicé y lo que escribí",
      excerpt:
        "Las decisiones detrás de una bandeja de WhatsApp para equipos: un motor abierto, una dirección por cliente, registro de autoservicio y las reglas de WhatsApp.",
      sector: "Software de atención por WhatsApp",
      location: "San José, Costa Rica",
      sections: [
        {
          heading: "Por qué no escribí un motor de chat",
          body: [
            "Una bandeja compartida de WhatsApp necesita conversaciones, agentes, etiquetas, notificaciones y una forma de mantenerlo todo sincronizado. Son muchas piezas, y una herramienta de código abierto llamada Chatwoot ya las tenía funcionando. Así que la primera decisión fue qué tomar prestado.",
            "Probé Chatwoot primero con mis propios clientes. El motor era sólido. El problema eran las pantallas: la gente se perdía en ellas, y conectar un número de WhatsApp con Meta era más de lo que la mayoría podía hacer sola. Así que conservé el motor y cambié las pantallas. Los desarrolladores le llaman backend headless, es decir, sin pantallas propias: Chatwoot guarda y mueve los datos, y GoEasy.Chat es lo que usan los clientes.",
            "Esa decisión tiene un costo: hay dos sistemas que mantener alineados. Mi aplicación envía las solicitudes de API del navegador hacia Chatwoot por medio de una pequeña ruta intermedia propia. A cambio, el motor corre en un servidor propio y las pantallas que los clientes usan a diario son código nuestro.",
          ],
          image: "video-inbox",
        },
        {
          heading: "Una dirección para cada cliente",
          body: [
            "Cada negocio que se registra recibe su propia dirección, como sunegocio.goeasy.chat. Detrás hay un espacio de trabajo separado en el motor, con sus propios agentes, contactos y conversaciones. Una sola copia del código atiende a todos. A este modelo se le llama multi-tenant: varias empresas, una sola aplicación.",
            "El cliente elige la dirección en el formulario. Debe tener entre dos y treinta caracteres, solo letras minúsculas, números o guiones, no puede ser una palabra reservada y no puede estar ya en uso. El formulario lo revisa mientras la persona escribe, y el servidor lo vuelve a revisar antes de crear nada.",
            "El costo real del software multi-tenant es que un error puede alcanzar a todos los clientes. Por eso, antes de que llegue el primero, hay que decidir cómo se mantiene separado a cada cliente y probar esa frontera. La mía es la dirección más el espacio de trabajo que hay detrás, y pruebas automáticas cubren cómo se resuelve una dirección.",
          ],
          image: null,
        },
        {
          heading: "El registro también es parte del producto",
          body: [
            "El registro avanza en cuatro pasos: primero los datos de la empresa, luego el pago, después WhatsApp y al final la confirmación. Pasé la creación de la cuenta al paso del pago, para que quien se detenga a medias igual tenga su usuario. El registro es de autoservicio, así que un negocio no tiene que hablar conmigo para empezar.",
            "La prueba dura 14 días. La pantalla de pago dice con claridad que hoy no se cobra nada y muestra la fecha del primer cobro. Los datos de pago se ingresan en el checkout de Paddle, no en nuestros formularios. Paddle es el comerciante registrado (merchant of record): es el vendedor legal de la suscripción.",
            "Después del pago, la aplicación hace la configuración sola. Crea el espacio de trabajo y el administrador, registra el enlace con el que el motor avisa a nuestra aplicación de las conversaciones nuevas y envía un correo de bienvenida. El último paso conecta WhatsApp y se puede omitir para terminarlo después desde el panel de administración.",
          ],
          image: "desktop-signup",
        },
        {
          heading: "Las reglas de WhatsApp moldean las pantallas",
          body: [
            "WhatsApp no es un canal neutro. Cuando un cliente lleva más de 24 horas sin escribir, el negocio solo puede volver a contactarlo con una plantilla, un mensaje que Meta aprobó de antemano. GoEasy.Chat marca esas conversaciones como expiradas y muestra un aviso que lleva a la lista de plantillas. El agente no tiene que contar las horas por su cuenta.",
            "Las plantillas necesitan la aprobación de Meta, y esa decisión es de Meta, no nuestra. Al conectar WhatsApp, la aplicación envía cuatro plantillas iniciales, cada una en español e inglés, para que el negocio tenga algo que enviar apenas Meta las apruebe. La página de plantillas muestra el estado de cada una y tiene un botón para sincronizar.",
            "Otras dos reglas también moldearon el producto. El número del negocio puede seguir funcionando en el teléfono, porque el registro de Meta tiene un modo llamado coexistencia. El número debe llevar al menos siete días activo en la aplicación WhatsApp Business, y el registro lo avisa antes de empezar. Y los navegadores graban las notas de voz en formatos que WhatsApp rechaza, así que la aplicación convierte cada grabación a MP3 primero.",
          ],
          image: "video-templates",
        },
        {
          heading: "Reglas de asignación que un dueño pueda leer",
          body: [
            "La primera pregunta sobre una bandeja compartida es quién responde un mensaje nuevo. La aplicación decide en un orden fijo. Si el contacto tiene un responsable asignado, el chat va a esa persona. Si no, vuelve al agente que atendió al cliente la última vez. Si tampoco aplica, rota por el equipo en turnos, lo que se llama round-robin.",
            "La rotación no mira quién está conectado. La pantalla de configuración lo dice con palabras sencillas, y un administrador puede apagarla. Es simple y predecible, pero no es astuta. Un equipo que trabaja por turnos debería apagarla y repartir las conversaciones manualmente, entre personas o por equipos.",
            "Los roles son pocos: los administradores configuran, los agentes responden y existe un tercer rol para nosotros, como operadores del servicio. Ocho temas de ayuda dentro de la aplicación, entre ellos asignaciones y roles, están en español e inglés.",
          ],
          image: "video-assign-agent",
        },
        {
          heading: "Primero español, luego inglés, y 13 páginas",
          body: [
            "El producto habla español e inglés: el sitio, la aplicación y los temas de ayuda. Quien visita el sitio llega al español en la dirección principal y al inglés bajo /en. Dentro de la aplicación, cada usuario elige su idioma en la barra lateral.",
            "Para las búsquedas agregué trece páginas en español: diez países, entre ellos Costa Rica, México y Colombia, y tres industrias: clínicas, tiendas en línea e inmobiliarias. Cada página describe un problema común, muestra cómo lo atiende la bandeja y responde dos preguntas frecuentes en un formato que los buscadores pueden leer. Son páginas sencillas y no afirmo nada sobre su posición en los resultados.",
            "Los videos de demostración también son código. Los escribí en Remotion, una herramienta que genera video a partir de componentes de React, así que cada video existe en español y en inglés desde la misma fuente.",
          ],
          image: "desktop-country-costa-rica",
        },
      ],
      takeaways: [
        "Reutilice un motor probado y dedique su esfuerzo a las pantallas y los pasos que sus clientes sí tocan.",
        "Decida cómo se mantiene separado a cada cliente antes de que se registre el primero, y pruebe esa frontera.",
        "Deje que el cliente se registre por su cuenta, pero que pueda detenerse a medias y aun así tener un usuario funcionando.",
        "Aprenda primero las reglas de la plataforma: la ventana de 24 horas de WhatsApp y la aprobación de plantillas moldean todo el producto.",
        "Escriba con palabras claras cómo se asigna el trabajo y muestre esas palabras en la pantalla de configuración.",
      ],
      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Chatwoot",
        "Paddle",
        "next-intl",
        "Vitest",
        "Remotion",
        "Bun",
      ],
      seo: {
        title: "Cómo construí GoEasy.Chat: lo que reutilicé y escribí",
        description:
          "Marcelo Retana cuenta cómo construyó GoEasy.Chat, una bandeja de WhatsApp para equipos: motor abierto, una dirección por cliente y las reglas de WhatsApp.",
      },
    },
  },
};

export default story;
