import type { MarketFaq, MarketHub, MarketPage, MarketProof } from "@/lib/market-page-types";

const generatedAt = "2026-04-01";

const defaultCta = {
  primaryLabel: "Solicitar cotización",
  primaryHref: "#lead-form",
  secondaryLabel: "Ver experiencia",
  secondaryHref: "/#experience",
  tertiaryLabel: "WhatsApp",
  tertiaryHref:
    "https://wa.me/50671077969?text=Hola%2C%20me%20interesa%20una%20cotizacion%20para%20mi%20negocio",
};

const sharedProof: MarketProof[] = [
  {
    metric: "10+ años",
    title: "Experiencia senior",
    description:
      "Marcelo Retana lleva más de una década construyendo sitios, apps y productos digitales para negocios locales y marcas globales.",
  },
  {
    metric: "600+",
    title: "Proyectos entregados",
    description:
      "El enfoque combina velocidad, claridad comercial y ejecución técnica en proyectos reales, no demos ni promesas vacías.",
  },
  {
    metric: "2-4 semanas",
    title: "Entrega visible",
    description:
      "La prioridad es lanzar algo serio y útil rápido, sin procesos eternos ni una cadena innecesaria de intermediarios.",
  },
];

const sharedFaq: MarketFaq[] = [
  {
    question: "¿Trabaja con negocios pequeños en Costa Rica?",
    answer:
      "Sí. De hecho, muchas oportunidades empiezan con negocios que todavía no tienen una presencia online seria o que se ven improvisados frente a sus clientes.",
  },
  {
    question: "¿Todavía puedo escribir por WhatsApp?",
    answer:
      "Sí, pero la vía principal es el formulario. Así la respuesta por email sale con mejor contexto, alcance y siguientes pasos.",
  },
  {
    question: "¿Cuánto tarda un sitio comercial bien hecho?",
    answer:
      "La mayoría de sitios para negocios se mueve en 2 a 4 semanas. Si hay SEO, integraciones, reservas o varias páginas verticales, puede tomar más.",
  },
];

function createPage(
  page: Omit<MarketPage, "machine" | "locale" | "path" | "generatedAt" | "cta" | "proof" | "faq"> &
    Partial<Pick<MarketPage, "cta" | "proof" | "faq">>
): MarketPage {
  return {
    machine: "es-cr",
    locale: "es",
    path: `/es/${page.slug}`,
    generatedAt,
    cta: page.cta ?? defaultCta,
    proof: page.proof ?? sharedProof,
    faq: page.faq ?? sharedFaq,
    ...page,
  };
}

export const esCrHub: MarketHub = {
  machine: "es-cr",
  locale: "es",
  path: "/es",
  generatedAt,
  title: "Páginas Web Costa Rica | Diseño Web, Desarrollo Web y SEO",
  description:
    "Páginas web profesionales en Costa Rica por Marcelo Retana. Diseño web, desarrollo web a medida y SEO para negocios que necesitan verse serios, salir en Google y recibir mejores consultas.",
  keywords: [
    "páginas web costa rica",
    "diseño web costa rica",
    "desarrollo web costa rica",
    "seo costa rica",
    "página web profesional costa rica",
    "sitio web costa rica",
    "crear página web costa rica",
    "diseñador web costa rica",
    "empresa desarrollo web costa rica",
    "posicionamiento web costa rica",
    "agencia web costa rica",
    "cuánto cuesta una página web en costa rica",
    "página web para negocio costa rica",
    "sitio web profesional costa rica",
  ],
  hero: {
    eyebrow: "Páginas Web Costa Rica",
    headline:
      "Páginas web para negocios en Costa Rica que necesitan verse serios, salir en Google y recibir mejores consultas.",
    subheadline:
      "Soy Marcelo Retana, desarrollador web con más de 10 años de experiencia en empresas como IBM, Universal Music y Provectus. Ayudo a negocios en Costa Rica a tener una presencia online profesional que explique bien lo que hacen, inspire confianza y convierta visitas en oportunidades reales.",
    supportingText:
      "Si hoy su negocio depende de redes sociales, referencias o WhatsApp para todo, un buen sitio web le da una base más fuerte: más credibilidad, más claridad y una forma más ordenada de recibir consultas.",
  },
  intro:
    "La mayoría de negocios en Costa Rica no necesitan una app ni un sistema complejo. Necesitan una página web que se vea profesional, que explique rápido lo que venden y que haga fácil el siguiente paso para el cliente. Eso es lo que hago. Desde páginas web nuevas hasta rediseños, desde optimización para Google hasta sistemas de captación de clientes. Todo con ejecución técnica seria, diseño que genera confianza y una comunicación directa donde usted habla conmigo, no con intermediarios. Esta página cubre todo: páginas web profesionales, diseño web, desarrollo web a medida y SEO para negocios en Costa Rica.",
  proof: [
    {
      metric: "10+ años",
      title: "Experiencia senior, no juniors aprendiendo con su proyecto",
      description:
        "Marcelo Retana ha construido productos en IBM, Universal Music, Provectus y Univision. El trabajo aquí es directo, técnicamente fuerte y con criterio comercial desde el primer día.",
    },
    {
      metric: "600+",
      title: "Proyectos entregados en distintos sectores",
      description:
        "El portafolio incluye sitios comerciales, aplicaciones web, sistemas de diseño y plataformas de captación para negocios en construcción, salud, turismo y servicios profesionales.",
    },
    {
      metric: "GEXP Software",
      title: "Trato directo, sin capas de agencia",
      description:
        "Usted habla con la persona que diseña, construye y entrega. Sin gerentes de cuenta, sin intermediarios, sin subcontratistas sorpresa.",
    },
    {
      metric: "2-4 semanas",
      title: "Entrega visible y rápida",
      description:
        "La prioridad es lanzar algo serio y útil rápido. Sin procesos eternos, sin cadenas innecesarias de aprobaciones ni reuniones que no avanzan nada.",
    },
    {
      metric: "Costa Rica",
      title: "Contexto local con estándar internacional",
      description:
        "Basado en Puerto Jiménez, Costa Rica. Con conocimiento del mercado local y la calidad técnica que su negocio necesita para competir en serio.",
    },
  ],
  faq: [
    {
      question: "¿Trabaja con negocios pequeños en Costa Rica?",
      answer:
        "Sí. De hecho, muchos proyectos empiezan con negocios que todavía no tienen una presencia online seria o que se ven improvisados frente a sus clientes. No hace falta ser una empresa grande para necesitar una página web bien hecha.",
    },
    {
      question: "¿Cuál es la diferencia entre diseño web y desarrollo web?",
      answer:
        "El diseño web se enfoca en cómo se ve y cómo comunica el sitio: la estructura visual, la jerarquía del contenido y la confianza que transmite. El desarrollo web es la construcción técnica: el código, el rendimiento, las integraciones y la arquitectura. La mayoría de proyectos aquí incluyen ambos, porque un sitio bonito que carga lento no sirve, y un sitio rápido que se ve amateur tampoco.",
    },
    {
      question: "¿Qué incluye el servicio de SEO?",
      answer:
        "No vendo SEO como un truco ni como una promesa mágica. Lo que hago es construir páginas con estructura correcta, títulos claros, contenido relevante y señales técnicas limpias para que Google entienda mejor lo que su negocio ofrece. Eso incluye arquitectura de páginas comerciales, optimización de títulos y descripciones, enlazado interno y páginas nuevas cuando la demanda lo justifica.",
    },
    {
      question: "¿Cuánto cuesta una página web?",
      answer:
        "Depende del alcance. No es lo mismo una presencia base con una sola página que un sistema con páginas por servicio, SEO, integraciones y formularios avanzados. El proceso de cotización empieza con el formulario para que pueda recomendar el alcance correcto antes de hablar de números.",
    },
    {
      question: "¿Cuánto tarda un sitio comercial bien hecho?",
      answer:
        "La mayoría de sitios para negocios se mueve en 2 a 4 semanas. Si hay SEO, integraciones, reservas o varias páginas sectoriales, puede tomar un poco más. Pero la prioridad siempre es mostrar avance rápido.",
    },
    {
      question: "¿Todavía puedo escribir por WhatsApp?",
      answer:
        "Sí, pero la vía principal es el formulario. Así la respuesta por email sale con mejor contexto, alcance y siguientes pasos. WhatsApp está disponible para consultas rápidas, pero el proceso comercial se ordena mejor por email.",
    },
    {
      question: "¿Sirve solo para negocios de tecnología?",
      answer:
        "No. La mayoría de clientes son negocios de servicios, constructoras, clínicas, hoteles y empresas que venden algo que necesitan explicar bien. No hace falta ser tech para necesitar una presencia online seria.",
    },
    {
      question: "¿Puede hacer rediseño de un sitio que ya tengo?",
      answer:
        "Sí. Muchos proyectos empiezan porque el negocio ya tiene un sitio pero ese sitio no le está ayudando a vender, no refleja el nivel actual de la empresa o se quedó desactualizado. El rediseño mejora mensaje, diseño, estructura y conversión.",
    },
    {
      question: "¿Ayuda a que mi negocio salga en Google?",
      answer:
        "Sí. Todo sitio que construyo tiene una base SEO sólida: estructura de páginas pensada para búsquedas comerciales, títulos optimizados, velocidad de carga fuerte y contenido que responde a lo que la gente realmente busca en Costa Rica.",
    },
  ],
  cta: defaultCta,
  featuredLinks: [
    { label: "Precio", slug: "cuanto-cuesta" },
    { label: "Generar clientes", slug: "generar-clientes" },
    { label: "Constructoras", slug: "constructoras" },
    { label: "Clínicas", slug: "clinicas" },
    { label: "Turismo", slug: "turismo" },
    { label: "Rediseño", slug: "rediseno" },
    { label: "Cotización", slug: "cotizacion" },
  ],
  caseProofIds: ["gexp", "nature-escapes", "vista3-architects"],
  narrativeSections: [
    {
      eyebrow: "Páginas Web Profesionales",
      title:
        "Una página web profesional no es un lujo. Es la base para que su negocio deje de depender solo de redes y referencias.",
      body: "En Costa Rica muchos negocios todavía funcionan sin página web o con una presencia tan débil que más bien les resta credibilidad. El resultado es claro: dependen de Instagram, Facebook o WhatsApp para todo, pierden clientes que no logran encontrarlos, y cada día tienen que explicar lo mismo porque no hay un lugar donde el cliente pueda entender la oferta por su cuenta. Una página web profesional resuelve eso. Explica qué hace su negocio, muestra prueba de que lo hace bien y deja un camino claro para que el cliente dé el siguiente paso sin perseguirlo por mensajes.",
      points: [
        "Presencia profesional que inspira confianza desde la primera visita.",
        "Estructura clara con servicios, experiencia y formulario de contacto.",
        "Diseño que se ve bien en celular, donde llega la mayoría del tráfico.",
        "Base técnica sólida para crecer con nuevas páginas cuando haga falta.",
      ],
    },
    {
      eyebrow: "Diseño Web",
      title:
        "El diseño web no es decoración. Es la diferencia entre que un cliente confíe en su negocio o cierre la pestaña.",
      body: "Cuando alguien llega a su sitio, decide en segundos si se queda o se va. Si la página se ve vieja, desordenada o genérica, el negocio parece menos serio de lo que realmente es. Un buen diseño web no se trata de verse bonito. Se trata de comunicar confianza rápido, hacer que la oferta se entienda sin esfuerzo y guiar al visitante hacia la acción que usted necesita: una consulta, una cotización o una llamada. Trabajo el diseño como herramienta comercial, no como arte.",
      points: [
        "Jerarquía visual clara para que el visitante entienda el negocio en segundos.",
        "Secciones de prueba social y credibilidad donde realmente importan.",
        "Diseño responsive que funciona igual de bien en celular y computadora.",
        "Consistencia visual que hace que el negocio se sienta establecido y confiable.",
      ],
    },
    {
      eyebrow: "Desarrollo Web",
      title:
        "Desarrollo web a medida para negocios que necesitan algo más serio que una plantilla improvisada.",
      body: "Hay una diferencia enorme entre un sitio armado con una plantilla barata y un sitio construido con criterio técnico. La plantilla puede verse aceptable al principio, pero se queda corta cuando quiere agregar páginas, mejorar la velocidad, integrar formularios o posicionarse en Google. El desarrollo web a medida le da al negocio una base técnica limpia, rápida y preparada para crecer. Construyo con frameworks modernos que cargan rápido, indexan bien y se pueden expandir sin tener que empezar de cero.",
      points: [
        "Sitios rápidos construidos con arquitectura moderna y limpia.",
        "Estructura lista para crecer con nuevas páginas por servicio o sector.",
        "Integraciones limpias con formularios, reservas y herramientas de contacto.",
        "Rendimiento técnico fuerte que ayuda al SEO y a la experiencia del usuario.",
      ],
    },
    {
      eyebrow: "SEO",
      title:
        "SEO para que su negocio aparezca en Google cuando la gente busca lo que usted vende en Costa Rica.",
      body: "SEO no es magia ni trucos. Es tener las páginas correctas, con el contenido correcto, organizadas de una forma que Google pueda entender. Muchos negocios en Costa Rica tienen un solo homepage que intenta decirlo todo y no dice nada bien. La solución es crear páginas comerciales específicas: una por cada servicio, una por cada sector, una por cada pregunta frecuente que sus clientes ya le hacen. Así Google puede mostrar su negocio justo cuando alguien busca lo que usted ofrece.",
      points: [
        "Arquitectura de páginas pensada para capturar búsquedas comerciales reales.",
        "Títulos, descripciones y contenido optimizado para intención local.",
        "Estructura técnica limpia: velocidad, indexación y enlazado interno.",
        "Páginas nuevas por servicio o sector cuando la demanda lo justifica.",
      ],
    },
  ],
  alternatePath: "/costa-rica",
};

export const esCrMarketPages: MarketPage[] = [
  createPage({
    slug: "cuanto-cuesta",
    title: "Cuánto Cuesta una Página Web en Costa Rica",
    description:
      "Guía comercial para entender cuánto cuesta una página web en Costa Rica, qué mueve el precio y cómo evitar botar plata en algo que no ayuda al negocio.",
    keywords: [
      "cuanto cuesta una pagina web en costa rica",
      "precio página web costa rica",
      "cotización sitio web costa rica",
    ],
    hero: {
      eyebrow: "Costo",
      headline: "La pregunta correcta no es solo cuánto cuesta. Es qué tanto le ayuda al negocio.",
      subheadline:
        "La inversión tiene que verse reflejada en confianza, claridad y mejores consultas, no solo en tener otra página más en internet.",
    },
    intro:
      "El precio se vuelve confuso cuando se compara una plantilla básica con un sitio comercial que sí ayuda a vender. No cuestan lo mismo porque no resuelven lo mismo. Una página barata puede darle presencia; una página bien planteada puede ayudarle a justificar mejor su negocio, ordenar el contacto y crecer con más claridad.",
    proof: [
      {
        metric: "Costo real",
        title: "Lo caro es publicar algo que no ayuda",
        description:
          "El mayor riesgo no es pagar más. Es pagar por una web que igual obliga a explicar todo por mensajes y no mejora la percepción del negocio.",
      },
      {
        metric: "Alcance",
        title: "El precio cambia según la ambición comercial",
        description:
          "No es lo mismo una presencia base que un sistema con servicios, sectores, SEO, prueba y mejor captación.",
      },
      {
        metric: "Propuesta",
        title: "La cotización debe explicar el porqué",
        description:
          "Una cifra sin alcance, prioridades y entregables deja al negocio igual de confundido que antes.",
      },
    ],
    caseProofIds: ["gexp", "nature-escapes"],
    narrativeSections: [
      {
        eyebrow: "Qué suele salir mal",
        title: "Mucha gente compara precios como si todo fuera la misma página.",
        body: "No lo es. Hay negocios que solo necesitan una presencia simple y hay otros que necesitan una estructura capaz de explicar servicios, soportar SEO, mostrar prueba y captar mejores consultas. Si se mezclan esas dos cosas en la comparación, el precio siempre va a parecer arbitrario.",
      },
      {
        eyebrow: "Cómo evaluar mejor",
        title: "Pida una cotización que hable de negocio, no solo de diseño.",
        body: "La mejor forma de comparar propuestas es revisar qué problema resuelven, cuántas páginas necesita de verdad, qué tan claro queda el mensaje y si la conversión queda ordenada desde el principio.",
      },
    ],
    problemTitle: "Lo que confunde el precio",
    problemPoints: [
      "Comparar una plantilla barata con un sitio comercial real.",
      "No saber qué incluye el mensaje, la estructura y el SEO.",
      "Miedo a gastar en algo que no se vea serio ni ayude a vender.",
    ],
    solutionTitle: "Cómo pensar el costo",
    solutionPoints: [
      "Primero defina si necesita presencia base, rediseño o páginas nuevas.",
      "Piense en confianza y conversión, no solo en el número final.",
      "Pida una propuesta con alcance, tiempos y entregables claros.",
    ],
    deliverablesTitle: "Factores que mueven el precio",
    deliverables: [
      "Cantidad de páginas",
      "Nivel de copy y mensaje comercial",
      "SEO o páginas sectoriales",
      "Integraciones o formularios especiales",
      "Nivel de personalización visual",
    ],
    relatedSlugs: ["generar-clientes", "rediseno", "cotizacion"],
    alternatePath: "/costa-rica/website-cost",
  }),
  createPage({
    slug: "generar-clientes",
    title: "Sitio Web que Genere Clientes en Costa Rica",
    description:
      "Cómo estructurar un sitio web en Costa Rica para que inspire confianza, explique bien la oferta y convierta visitas en consultas por formulario.",
    keywords: [
      "sitio web que genere clientes",
      "página web para conseguir clientes",
      "web conversion costa rica",
    ],
    hero: {
      eyebrow: "Generar clientes",
      headline: "Un sitio web no genera clientes por existir. Genera cuando comunica bien.",
      subheadline:
        "La combinación correcta es mensaje, estructura, prueba y un paso claro para mover a la persona a pedir información.",
    },
    intro:
      "Conseguir más clientes no depende solo de tener una página. Depende de tener una página que explique bien, dé confianza y deje un siguiente paso muy claro.",
    problemTitle: "Por qué muchos sitios no convierten",
    problemPoints: [
      "No dejan claro qué hace el negocio.",
      "No muestran prueba suficiente.",
      "Esconden el siguiente paso.",
    ],
    solutionTitle: "Lo que sí ayuda a convertir",
    solutionPoints: [
      "Titular claro y relevante.",
      "Prueba social o experiencia visible.",
      "Formulario principal repetido en puntos clave.",
    ],
    deliverablesTitle: "Piezas de una página que convierte",
    deliverables: [
      "Sección principal con oferta clara",
      "Secciones por servicio",
      "Prueba y casos",
      "Preguntas frecuentes y objeciones",
      "Llamado principal de cotización",
    ],
    relatedSlugs: ["cuanto-cuesta", "constructoras", "cotizacion"],
    alternatePath: "/costa-rica/lead-generation",
  }),
  createPage({
    slug: "constructoras",
    title: "Páginas Web para Constructoras e Inmobiliarias en Costa Rica",
    description:
      "Páginas web para constructoras, desarrollos e inmobiliarias en Costa Rica que necesitan proyectar confianza, mostrar proyectos y recibir consultas mejor calificadas.",
    keywords: [
      "página web para constructora",
      "sitio web constructora costa rica",
      "real estate web costa rica",
    ],
    hero: {
      eyebrow: "Constructoras",
      headline: "Una constructora se juzga rápido por cómo se ve online.",
      subheadline:
        "La presencia digital tiene que mostrar proyectos, ubicaciones, seriedad y un camino claro para pedir información.",
    },
    intro:
      "Constructoras, desarrolladores e inmobiliarias venden proyectos de alto valor. Por eso la presencia online no puede verse improvisada. Tiene que transmitir orden, respaldo y una forma clara de pedir información sin depender de PDFs regados, redes sociales o mensajes sueltos.",
    proof: [
      {
        metric: "Proyectos visibles",
        title: "Presentación más fuerte",
        description:
          "Un sitio bien estructurado permite mostrar proyectos, ubicaciones, tipologías y servicios sin que la persona tenga que perseguir la información.",
      },
      {
        metric: "Confianza",
        title: "Menos fricción para consultas grandes",
        description:
          "Cuando la inversión es alta, la web tiene que respaldar la percepción de seriedad antes de que el prospecto escriba.",
      },
      {
        metric: "SEO local",
        title: "Más páginas con intención clara",
        description:
          "Servicios, desarrollos y ubicaciones pueden convertirse en páginas con más sentido comercial y más capacidad de captura.",
      },
    ],
    caseProofIds: ["vista3-architects", "gexp"],
    narrativeSections: [
      {
        eyebrow: "Qué se juzga aquí",
        title: "En construcción e inmobiliaria la web funciona como señal de estabilidad.",
        body: "Quien compra o invierte en este sector quiere sentir que la empresa tiene criterio, procesos y respaldo. Si la presencia online se siente débil, el riesgo percibido sube. Eso hace más difícil pedir una reunión, justificar precios o mover proyectos importantes.",
      },
      {
        eyebrow: "Qué debe cambiar",
        title: "La información tiene que sentirse ordenada y comprable.",
        body: "La web debe separar bien proyectos, servicios, zonas, experiencia y contacto. Cuando todo eso está claro, el prospecto llega mejor filtrado y con más contexto para una conversación seria.",
      },
    ],
    problemTitle: "Problemas comunes del sector",
    problemPoints: [
      "Proyectos sin una vitrina profesional.",
      "Información regada entre PDFs, redes y WhatsApp.",
      "Pocas señales de confianza para compras grandes.",
    ],
    solutionTitle: "Qué debería resolver el sitio",
    solutionPoints: [
      "Mostrar desarrollos o servicios con orden.",
      "Construir confianza desde la primera visita.",
      "Facilitar formularios de consulta con más contexto.",
    ],
    deliverablesTitle: "Bloques recomendados",
    deliverables: [
      "Sección de proyectos",
      "Páginas por desarrollo o servicio",
      "Formulario de consulta",
      "Prueba social y experiencia",
      "SEO local para búsquedas relevantes",
    ],
    relatedSlugs: ["cuanto-cuesta", "generar-clientes", "clinicas", "cotizacion"],
    alternatePath: "/costa-rica/real-estate",
  }),
  createPage({
    slug: "clinicas",
    title: "Páginas Web para Clínicas y Negocios de Salud en Costa Rica",
    description:
      "Páginas web para clínicas, consultorios y negocios de salud en Costa Rica que necesitan inspirar confianza, explicar servicios y facilitar consultas.",
    keywords: [
      "página web clínica costa rica",
      "sitio web clínica",
      "desarrollo web salud costa rica",
    ],
    hero: {
      eyebrow: "Clínicas",
      headline:
        "Si una clínica no inspira confianza online, pierde pacientes antes de hablar con ellos.",
      subheadline:
        "La meta es un sitio claro, profesional y fácil de consultar para clínicas, centros médicos y negocios de salud.",
    },
    intro:
      "En salud, la web tiene que transmitir calma, profesionalismo y claridad. Si el sitio se ve viejo, confuso o demasiado informal, mucha gente decide no escribir siquiera. Por eso una clínica necesita una presencia que explique servicios con orden y deje un camino claro para la primera consulta.",
    proof: [
      {
        metric: "Confianza",
        title: "Primera impresión más profesional",
        description:
          "El diseño, el tono y la estructura tienen que reducir ansiedad, no aumentarla.",
      },
      {
        metric: "Claridad",
        title: "Servicios más fáciles de entender",
        description:
          "Especialidades, tratamientos y preguntas frecuentes deben sentirse accesibles incluso para alguien que viene nervioso o apurado.",
      },
      {
        metric: "Contacto",
        title: "Mejor paso hacia la consulta",
        description:
          "La solicitud de cita o consulta tiene que ser visible, sencilla y confiable desde móvil.",
      },
    ],
    caseProofIds: ["dr-bahia-ballena", "gexp"],
    narrativeSections: [
      {
        eyebrow: "Qué importa aquí",
        title: "La gente decide si confía antes de decidir si pregunta.",
        body: "Una clínica no compite solo por aparecer en Google. Compite por transmitir suficiente tranquilidad como para que la persona dé el siguiente paso. Eso depende de cómo se presentan los servicios, el profesional, la experiencia y la forma de contacto.",
      },
      {
        eyebrow: "Qué debe resolver",
        title: "El sitio tiene que quitar dudas básicas sin complicar la experiencia.",
        body: "La persona debería entender rápido qué atienden, dónde están, cómo pedir información y por qué confiar. Si esos puntos no están claros, la consulta se pierde o llega con demasiada fricción.",
      },
    ],
    problemTitle: "Lo que frena la conversión",
    problemPoints: [
      "Servicios explicados de forma confusa.",
      "Sitios viejos que no inspiran seriedad.",
      "Dificultad para agendar o dejar datos.",
    ],
    solutionTitle: "Enfoque recomendado",
    solutionPoints: [
      "Mensaje simple y orientado a confianza.",
      "Páginas por especialidad o servicio si hace falta.",
      "Botón principal claro para la consulta inicial.",
    ],
    deliverablesTitle: "Puede incluir",
    deliverables: [
      "Páginas por especialidad",
      "Preguntas frecuentes",
      "Solicitud de cita o consulta",
      "Prueba profesional y testimonios",
      "Versión móvil clara",
    ],
    relatedSlugs: ["constructoras", "turismo", "generar-clientes", "cotizacion"],
    alternatePath: "/costa-rica/healthcare",
  }),
  createPage({
    slug: "turismo",
    title: "Páginas Web para Turismo y Hotelería en Costa Rica",
    description:
      "Páginas web para hoteles, tours y negocios de turismo en Costa Rica que necesitan transmitir confianza rápido y facilitar consultas o reservas.",
    keywords: [
      "página web turismo costa rica",
      "sitio web hotel costa rica",
      "web para tours costa rica",
    ],
    hero: {
      eyebrow: "Turismo",
      headline: "En turismo, una mala presencia online mata la confianza antes de la reserva.",
      subheadline:
        "Trabajo con hoteles, tours y experiencias que necesitan comunicar valor rápido y dejar claro cómo consultar disponibilidad o reservar.",
    },
    intro:
      "En turismo y hotelería la web vende antes de que alguien pregunte por disponibilidad. Tiene que mostrar bien la experiencia, responder dudas prácticas y dejar claro cómo consultar o reservar. Si eso falla, el negocio pierde confianza, urgencia y valor percibido al mismo tiempo.",
    proof: [
      {
        metric: "Visual",
        title: "La experiencia se entiende más rápido",
        description:
          "Habitaciones, tours, paquetes o experiencias deben sentirse claros y deseables en segundos.",
      },
      {
        metric: "Turistas",
        title: "Mejor confianza para compradores extranjeros",
        description:
          "La persona necesita señales de profesionalismo antes de comprometer una consulta o reserva desde otro país.",
      },
      {
        metric: "Consulta",
        title: "Más claridad en disponibilidad o reserva",
        description:
          "Un siguiente paso visible evita que la persona se pierda entre Instagram, WhatsApp y otras plataformas.",
      },
    ],
    caseProofIds: ["nature-escapes", "gexp"],
    narrativeSections: [
      {
        eyebrow: "Lo que vende turismo",
        title: "Turismo vende confianza, contexto y deseo en muy poco tiempo.",
        body: "La persona compara varias opciones rápido. Si no entiende bien la experiencia, los diferenciales, la ubicación o la forma de reservar, pasa a la siguiente opción. Por eso la web debe trabajar como vitrina y filtro de confianza al mismo tiempo.",
      },
      {
        eyebrow: "Qué debe resolver",
        title: "La web tiene que mover a la persona del interés a la consulta.",
        body: "Eso significa fotos y estructura que sí ayuden, información práctica bien visible y un CTA que no dependa de perseguir respuestas por mensajes desordenados.",
      },
    ],
    problemTitle: "Fricciones típicas",
    problemPoints: [
      "Información clave repartida en muchas plataformas.",
      "Pocas señales de profesionalismo para turistas extranjeros.",
      "Procesos de reserva o consulta poco claros.",
    ],
    solutionTitle: "Lo que debe mejorar",
    solutionPoints: [
      "Mensaje visual fuerte con información práctica.",
      "Páginas de experiencias, habitaciones o paquetes.",
      "Paso claro para disponibilidad, reserva o consulta.",
    ],
    deliverablesTitle: "Componentes frecuentes",
    deliverables: [
      "Páginas por servicio o experiencia",
      "Galería o bloques visuales",
      "Formulario y contacto",
      "Preguntas frecuentes de viaje",
      "Versión móvil optimizada",
    ],
    relatedSlugs: ["constructoras", "clinicas", "generar-clientes", "cotizacion"],
    alternatePath: "/costa-rica/tourism",
  }),
  createPage({
    slug: "rediseno",
    title: "Rediseño de Sitio Web en Costa Rica",
    description:
      "Rediseño de sitio web para negocios en Costa Rica que ya tienen una web, pero no se ve profesional, no explica bien o no ayuda a vender.",
    keywords: [
      "rediseño sitio web costa rica",
      "mejorar página web",
      "actualizar sitio web negocio",
    ],
    hero: {
      eyebrow: "Rediseño",
      headline: "Si su sitio actual se ve viejo, el negocio paga ese costo todos los días.",
      subheadline:
        "Rediseñamos sitios para que el negocio se vea más fuerte, se entienda mejor y convierta mejor que la versión anterior.",
    },
    intro:
      "Muchas empresas ya tienen sitio, pero ese sitio no les ayuda a vender, justificar mejor sus precios o dar una mejor primera impresión.",
    problemTitle: "Señales de que toca rediseñar",
    problemPoints: [
      "La web ya no representa el nivel real del negocio.",
      "Cuesta actualizarla o agregar nuevas páginas.",
      "La gente pregunta lo básico porque el sitio no lo deja claro.",
    ],
    solutionTitle: "Lo que cambia el rediseño",
    solutionPoints: [
      "Mensaje comercial más claro.",
      "Jerarquía visual mejorada.",
      "Conversión más ordenada hacia formulario y contacto.",
    ],
    deliverablesTitle: "Lo que reviso",
    deliverables: [
      "Mensaje y propuesta de valor",
      "Arquitectura de contenido",
      "Diseño y consistencia visual",
      "Velocidad y estructura técnica",
      "Llamados y formularios",
    ],
    relatedSlugs: ["cuanto-cuesta", "generar-clientes", "cotizacion"],
    alternatePath: "/costa-rica/redesign",
  }),
  createPage({
    slug: "cotizacion",
    title: "Solicitar Cotización Web en Costa Rica",
    description:
      "Solicite una cotización para su sitio web, rediseño o proyecto digital en Costa Rica. Reciba una respuesta clara por email en menos de 24 horas.",
    keywords: [
      "cotización página web costa rica",
      "solicitar cotización web",
      "propuesta sitio web costa rica",
    ],
    hero: {
      eyebrow: "Cotización",
      headline: "Cuénteme sobre el proyecto y le envío una cotización clara.",
      subheadline:
        "Si necesita un sitio web nuevo, mejorar el actual o cotizar una app, deje el contexto aquí y le respondo por email con una recomendación, un rango de inversión y los siguientes pasos.",
      supportingText:
        "Así la conversación empieza ordenada, con mejor contexto y sin perder tiempo en mensajes sueltos.",
    },
    intro:
      "Una buena cotización empieza con contexto. Cuando entiendo qué vende, qué necesita y qué quiere lograr, puedo responder con algo útil en lugar de una cifra al aire. Por eso el formulario importa: ayuda a pasar de una conversación informal a una propuesta con más sentido comercial.",
    proof: [
      {
        metric: "Menos ruido",
        title: "La conversación arranca con más contexto",
        description:
          "El formulario evita perseguir datos básicos en varios mensajes antes de poder responder algo serio.",
      },
      {
        metric: "24 horas",
        title: "Respuesta más útil por email",
        description:
          "La respuesta se plantea con recomendación, rango de inversión y siguiente paso, no solo con disponibilidad para chatear.",
      },
      {
        metric: "Seguimiento",
        title: "Más fácil de ordenar después",
        description:
          "Email permite retomar, comparar y dar seguimiento con más claridad que un hilo caótico de WhatsApp.",
      },
    ],
    caseProofIds: ["gexp"],
    narrativeSections: [
      {
        eyebrow: "Por qué esta vía",
        title: "Cotizar bien requiere contexto, no solo urgencia.",
        body: "Muchos negocios quieren una respuesta rápida, pero una respuesta rápida sin contexto casi siempre termina siendo incompleta o engañosa. Si entiendo el negocio, la meta principal y el nivel de inversión, puedo responder con algo mucho más útil desde el primer intercambio.",
      },
      {
        eyebrow: "Qué ayuda a avanzar",
        title: "Mientras más claro venga el proyecto, mejor sale la primera recomendación.",
        body: "No hace falta llegar con especificaciones técnicas. Lo importante es decir qué vende, qué necesita mejorar primero y qué tipo de resultado espera conseguir con la web o el proyecto.",
      },
    ],
    problemTitle: "Por qué usar el formulario primero",
    problemPoints: [
      "Permite explicar mejor el negocio desde el inicio.",
      "Hace más fácil responder con una propuesta útil por email.",
      "Evita conversaciones informales sin suficiente contexto.",
    ],
    solutionTitle: "Lo que recibe después",
    solutionPoints: [
      "Respuesta por email en menos de 24 horas.",
      "Recomendación de enfoque según su negocio.",
      "Rango de inversión y siguientes pasos.",
    ],
    deliverablesTitle: "Prepare esto para avanzar más rápido",
    deliverables: [
      "Tipo de proyecto",
      "Industria o negocio",
      "Meta principal",
      "Presupuesto aproximado",
      "Tiempo ideal",
    ],
    relatedSlugs: ["cuanto-cuesta", "generar-clientes", "rediseno", "constructoras"],
    alternatePath: "/costa-rica/quote",
  }),
];
