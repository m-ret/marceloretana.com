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
  title: "Páginas Web y Desarrollo Web en Costa Rica",
  description:
    "Marcelo Retana ayuda a negocios en Costa Rica a verse más serios, más fáciles de encontrar y más fáciles de contactar con páginas web bien hechas.",
  keywords: ["páginas web costa rica", "desarrollo web costa rica", "diseño web costa rica"],
  hero: {
    eyebrow: "Costa Rica",
    headline: "Sitios web para negocios que hoy se ven invisibles, viejos o improvisados.",
    subheadline:
      "Trabajo con negocios en Costa Rica que necesitan verse más serios, explicar mejor lo que hacen y mover más consultas por formulario.",
    supportingText:
      "Si hoy su negocio depende demasiado de redes, referencias o WhatsApp, un buen sitio web puede darle una presencia más clara, confiable y fácil de contactar.",
  },
  intro:
    "Aquí no estoy vendiendo tecnología por sonar moderno. Estoy vendiendo una presencia online que ayude a un negocio en Costa Rica a verse serio, explicar mejor lo que hace y mover mejores consultas por formulario. Si hoy su negocio se apoya demasiado en redes sociales, referencias o WhatsApp, este hub le enseña por dónde empezar según su caso.",
  proof: [
    {
      metric: "Costa Rica",
      title: "Lenguaje comercial, no técnico",
      description:
        "Las páginas se plantean desde lo que aquí sí se busca: sitio web, página web, cotización, verse serio, salir en Google y recibir consultas.",
    },
    {
      metric: "Formulario primero",
      title: "Cotización más ordenada",
      description:
        "La meta no es abrir otro chat. La meta es recibir contexto suficiente para responder por email con una propuesta más clara.",
    },
    {
      metric: "Sectores reales",
      title: "Enfoque en negocios que sí compran",
      description:
        "Constructoras, clínicas, turismo y negocios de servicios tienen necesidades distintas. Por eso cada página fuerte ataca una decisión comercial diferente.",
    },
  ],
  faq: sharedFaq,
  cta: defaultCta,
  featuredLinks: [
    { label: "Precio", slug: "cuanto-cuesta" },
    { label: "Generar clientes", slug: "generar-clientes" },
    { label: "Constructoras", slug: "constructoras" },
    { label: "Clínicas", slug: "clinicas" },
    { label: "Turismo", slug: "turismo" },
    { label: "Rediseño", slug: "rediseno" },
  ],
  caseProofIds: ["gexp", "nature-escapes", "vista3-architects"],
  narrativeSections: [
    {
      eyebrow: "Qué resuelve",
      title: "Un buen sitio no existe para verse bonito. Existe para bajar fricción comercial.",
      body: "En Costa Rica mucha gente todavía pregunta si de verdad necesita una página web. La respuesta depende menos de la tecnología y más de tres cosas: si el negocio se ve serio, si lo que vende se entiende rápido y si el siguiente paso está claro. Cuando eso falla, la empresa termina explicando lo mismo todos los días por mensajes sueltos.",
      points: [
        "Mejor primera impresión para negocios que hoy se ven improvisados.",
        "Más claridad sobre servicios, sectores y diferenciales.",
        "Un camino más serio para cotizar y dar seguimiento.",
      ],
    },
    {
      eyebrow: "Cómo usar este hub",
      title: "Empiece por la intención comercial, no por una categoría técnica.",
      body: "Si necesita la presencia base del negocio, empiece por páginas web. Si el problema es percepción, empiece por diseño. Si el problema es salir en búsquedas y sumar más páginas, empiece por SEO. Si quiere saber si ya vale la pena hablar, empiece por precio o cotización.",
      points: [
        "Páginas base para verse serio.",
        "Páginas sectoriales para capturar demanda específica.",
        "Precio y cotización para pasar a una conversación real.",
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
  }),
];
