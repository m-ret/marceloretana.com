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
    path: `/cr/${page.slug}`,
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
  path: "/cr",
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
    { label: "Páginas Web", slug: "paginas-web-costa-rica" },
    { label: "Diseño Web", slug: "diseno-web-costa-rica" },
    { label: "Desarrollo Web", slug: "desarrollo-web-costa-rica" },
    { label: "SEO", slug: "seo-costa-rica" },
    { label: "Generar clientes", slug: "sitio-web-que-genere-clientes" },
    { label: "Constructoras", slug: "constructoras" },
    { label: "Clínicas", slug: "clinicas" },
    { label: "Por qué necesita sitio web", slug: "por-que-necesita-sitio-web" },
    { label: "Precio", slug: "cuanto-cuesta-pagina-web" },
    { label: "Turismo", slug: "turismo" },
    { label: "Cotización", slug: "cotizacion" },
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
    slug: "servicios",
    noindex: true,
    title: "Servicios Web para Negocios en Costa Rica",
    description:
      "Servicios de páginas web, rediseños, SEO comercial y desarrollos ligeros para negocios en Costa Rica que necesitan verse serios y captar mejores consultas.",
    keywords: ["servicios web costa rica", "sitio web para negocio", "agencia web costa rica"],
    hero: {
      eyebrow: "Servicios",
      headline: "No vendo solo código. Vendo una presencia online que ayuda a cerrar mejor.",
      subheadline:
        "Desde la primera página web hasta un rediseño completo, el enfoque es confianza, claridad de oferta y una forma seria de captar oportunidades.",
    },
    intro:
      "Ideal para negocios que todavía no saben si necesitan una página nueva, un rediseño o varias páginas por servicio, pero sí saben que su presencia online hoy no les ayuda lo suficiente.",
    problemTitle: "Problemas que se repiten",
    problemPoints: [
      "Dependencia total de Instagram, Facebook o WhatsApp para explicar todo.",
      "Sitios viejos o inexistentes que hacen ver al negocio pequeño o poco serio.",
      "Falta de una forma clara para recibir consultas por email y dar seguimiento.",
    ],
    solutionTitle: "Cómo se corrige",
    solutionPoints: [
      "Páginas web comerciales con mensaje claro y un siguiente paso visible.",
      "Rediseños que mejoran estructura, mensaje y credibilidad.",
      "Páginas por servicio o sector para crecer con SEO sin hablar raro.",
    ],
    deliverablesTitle: "Qué suele incluir",
    deliverables: [
      "Mensaje comercial por sección",
      "Diseño responsive",
      "Formulario de cotización",
      "SEO técnico base",
      "Arquitectura lista para crecer",
    ],
    relatedSlugs: [
      "paginas-web-costa-rica",
      "diseno-web-costa-rica",
      "desarrollo-web-costa-rica",
      "cotizacion",
    ],
  }),
  createPage({
    slug: "paginas-web-costa-rica",
    title: "Páginas Web en Costa Rica para Negocios que Necesitan Verse Serios",
    description:
      "Páginas web en Costa Rica para negocios que necesitan una presencia profesional, una oferta clara y una forma ordenada de recibir consultas.",
    keywords: [
      "páginas web costa rica",
      "sitios web costa rica",
      "página web profesional costa rica",
    ],
    hero: {
      eyebrow: "Páginas Web Costa Rica",
      headline: "Su negocio necesita una página web que explique bien lo que hace.",
      subheadline:
        "No una presencia online por cumplir. Una página que ayude a dar confianza, ordenar servicios y captar mejores consultas.",
    },
    intro:
      "Cuando un negocio busca una página web, casi nunca está pensando en código. Está pensando en algo mucho más simple: verse serio, explicar mejor lo que vende y dejar una forma clara para que la gente pregunte. Esa es la diferencia entre una página de relleno y una página comercial que sí ayuda al negocio.",
    proof: [
      {
        metric: "Primera impresión",
        title: "Más claridad desde el inicio",
        description:
          "La página principal deja claro qué hace el negocio, a quién ayuda y cómo se pide información sin obligar a la persona a descifrarlo sola.",
      },
      {
        metric: "Confianza",
        title: "Más credibilidad antes del contacto",
        description:
          "Servicios, prueba, preguntas frecuentes y un CTA visible ayudan a justificar mejor el negocio antes de hablar de precio.",
      },
      {
        metric: "Formulario",
        title: "Mejores consultas",
        description:
          "La meta no es cualquier mensaje. La meta es una consulta con más contexto para responder mejor y cerrar mejor.",
      },
    ],
    caseProofIds: ["gexp", "vista3-architects"],
    narrativeSections: [
      {
        eyebrow: "Lo que compra la gente",
        title: "En la práctica, la mayoría compra confianza antes que diseño.",
        body: "Cuando alguien visita la web de un negocio local, lo primero que evalúa es si el negocio se siente real, claro y confiable. Si la información es débil, el sitio parece viejo o todo se ve improvisado, el problema no es solo estético. El negocio pierde autoridad antes de la primera conversación.",
      },
      {
        eyebrow: "Qué debe incluir",
        title: "Una página web seria ordena la venta incluso cuando usted no está respondiendo.",
        body: "Debe explicar el negocio rápido, mostrar servicios sin enredo, responder objeciones básicas y dejar un siguiente paso claro. Eso reduce preguntas repetidas, mejora la calidad de los contactos y hace que el negocio se perciba más establecido.",
        points: [
          "Titular claro y orientado a lo que vende.",
          "Secciones por servicio o solución.",
          "Prueba real y una cotización visible.",
        ],
      },
    ],
    problemTitle: "Lo que pasa sin una página web seria",
    problemPoints: [
      "Todo depende de referencias, redes sociales o mensajes sueltos.",
      "No hay un lugar claro donde ver servicios, experiencia y contacto.",
      "Cuesta justificar precios si la presencia online se ve débil.",
    ],
    solutionTitle: "Lo que debe resolver la página",
    solutionPoints: [
      "Explicar la oferta en segundos.",
      "Construir confianza antes del primer contacto.",
      "Mover la visita hacia una consulta o cotización ordenada.",
    ],
    deliverablesTitle: "Piezas base",
    deliverables: [
      "Sección principal con oferta clara",
      "Bloques de servicios",
      "Prueba social",
      "Preguntas frecuentes",
      "Formulario principal",
    ],
    relatedSlugs: [
      "diseno-web-costa-rica",
      "por-que-necesita-sitio-web",
      "cuanto-cuesta-pagina-web",
      "cotizacion",
    ],
  }),
  createPage({
    slug: "diseno-web-costa-rica",
    title: "Diseño Web en Costa Rica para una Mejor Primera Impresión",
    description:
      "Diseño web en Costa Rica para negocios que necesitan verse más confiables, más claros y más profesionales desde la primera visita.",
    keywords: [
      "diseño web costa rica",
      "diseñador web costa rica",
      "sitio web profesional costa rica",
    ],
    hero: {
      eyebrow: "Diseño Web Costa Rica",
      headline: "Un buen diseño ayuda a que el negocio se vea serio antes de hablar con nadie.",
      subheadline:
        "La meta no es la decoración. Es transmitir confianza, claridad y valor para que la gente quiera dar el siguiente paso.",
    },
    intro:
      "Si su presencia actual se ve vieja, genérica o poco clara, un mejor diseño puede cambiar la percepción del negocio antes de la primera llamada o mensaje.",
    problemTitle: "Cuando el diseño falla",
    problemPoints: [
      "El sitio se ve viejo o genérico.",
      "La propuesta no se entiende rápido.",
      "La marca se siente menos establecida de lo que realmente es.",
    ],
    solutionTitle: "En qué se enfoca el rediseño",
    solutionPoints: [
      "Jerarquía visual clara para entender el negocio rápido.",
      "Secciones pensadas para confianza, no relleno.",
      "Versión móvil fuerte, porque ahí empieza mucho del tráfico real.",
    ],
    deliverablesTitle: "Qué suele cambiar",
    deliverables: [
      "Sección principal con mejor oferta",
      "Secciones de servicios más claras",
      "Bloques de prueba y credibilidad",
      "Llamado principal mejor ubicado",
      "Una imagen más seria y consistente",
    ],
    relatedSlugs: [
      "paginas-web-costa-rica",
      "desarrollo-web-costa-rica",
      "cuanto-cuesta-pagina-web",
      "cotizacion",
    ],
    alternatePath: "/costa-rica/web-design",
  }),
  createPage({
    slug: "desarrollo-web-costa-rica",
    title: "Desarrollo Web en Costa Rica para Sitios Rápidos y Escalables",
    description:
      "Desarrollo web en Costa Rica para negocios que necesitan algo más serio que una plantilla, con mejor rendimiento, mejor SEO y mejor capacidad de crecer.",
    keywords: ["desarrollo web costa rica", "empresa desarrollo web", "crear sitio web costa rica"],
    hero: {
      eyebrow: "Desarrollo Web Costa Rica",
      headline:
        "Desarrollo web para negocios que necesitan algo más serio que una plantilla improvisada.",
      subheadline:
        "Construyo sitios rápidos, claros y técnicamente limpios para que el negocio no se quede corto cuando quiera crecer o posicionarse mejor.",
    },
    intro:
      "Aquí lo importante es que el sitio funcione bien, cargue rápido, permita crecer y no se quede corto cuando el negocio quiera agregar más páginas, formularios o integraciones.",
    problemTitle: "Señales de una mala base",
    problemPoints: [
      "Sitios lentos o frágiles.",
      "Páginas difíciles de expandir cuando el negocio quiere crecer.",
      "Herramientas limitadas que frenan SEO, formularios o nuevas secciones.",
    ],
    solutionTitle: "Lo que entrega una mejor base",
    solutionPoints: [
      "Rendimiento fuerte desde el inicio.",
      "Estructura lista para páginas nuevas por servicio o sector.",
      "Integraciones limpias para formularios, reservas o seguimiento.",
    ],
    deliverablesTitle: "Tipos de solución",
    deliverables: [
      "Sitio comercial a medida",
      "Páginas por servicio",
      "Administrador simple para cambios básicos",
      "Integraciones de contacto",
      "Mejoras técnicas de velocidad",
    ],
    relatedSlugs: ["servicios", "diseno-web-costa-rica", "negocios-servicios", "cotizacion"],
    alternatePath: "/costa-rica/web-development",
  }),
  createPage({
    slug: "seo-costa-rica",
    title: "SEO Costa Rica para Negocios que Necesitan Aparecer Mejor en Google",
    description:
      "SEO en Costa Rica para negocios que quieren aparecer mejor en Google con páginas más claras, mejores señales técnicas y más enfoque comercial.",
    keywords: ["seo costa rica", "posicionamiento web costa rica", "google negocios costa rica"],
    hero: {
      eyebrow: "SEO Costa Rica",
      headline: "SEO para negocios que necesitan que Google entienda mejor lo que venden.",
      subheadline:
        "No se trata de hacks. Se trata de mejores páginas, mejor estructura y señales más claras para que el negocio aparezca con más fuerza.",
    },
    intro:
      "SEO sirve cuando ayuda a que la gente encuentre páginas claras sobre lo que usted vende, en lugar de depender solo de una página de inicio que explica todo a medias.",
    problemTitle: "Barreras comunes",
    problemPoints: [
      "Solo existe una página de inicio sin suficiente contexto.",
      "No hay páginas por servicio o sector para captar más demanda.",
      "La estructura técnica no ayuda a indexar ni a entender la oferta.",
    ],
    solutionTitle: "Cómo se corrige",
    solutionPoints: [
      "Páginas por servicio y sector comercial.",
      "Títulos, descripciones y estructura con intención local.",
      "Enlaces internos que conectan servicios, prueba y conversión.",
    ],
    deliverablesTitle: "Trabajo SEO base",
    deliverables: [
      "Arquitectura de páginas comerciales",
      "Títulos y descripciones optimizadas",
      "Sitemap y enlazado interno",
      "Mejoras de indexación",
      "Páginas nuevas según demanda",
    ],
    relatedSlugs: [
      "desarrollo-web-costa-rica",
      "sitio-web-que-genere-clientes",
      "paginas-web-costa-rica",
      "cotizacion",
    ],
  }),
  createPage({
    slug: "negocios-servicios",
    noindex: true,
    title: "Páginas Web para Negocios de Servicios en Costa Rica",
    description:
      "Páginas web para negocios de servicios en Costa Rica que necesitan explicar rápido lo que hacen, verse confiables y captar formularios mejor calificados.",
    keywords: [
      "página web para servicios",
      "sitio web empresa de servicios",
      "negocio de servicios costa rica",
    ],
    hero: {
      eyebrow: "Negocios de servicios",
      headline:
        "Si usted vende un servicio, su sitio debe explicar rápido por qué confiar en usted.",
      subheadline:
        "Trabajo con empresas de servicios que necesitan ordenar su oferta, mostrar prueba y dejar un camino claro para pedir información.",
    },
    intro:
      "Los negocios de servicios necesitan sitios que expliquen rápido, den confianza y conviertan visitas en consultas con más contexto.",
    problemTitle: "Retos típicos",
    problemPoints: [
      "Oferta difícil de entender en pocos segundos.",
      "Poca prueba visible o ninguna diferenciación clara.",
      "Dependencia total de mensajes directos y referencias.",
    ],
    solutionTitle: "Qué sí funciona",
    solutionPoints: [
      "Servicios principales explicados con un mensaje directo.",
      "Prueba y credibilidad visibles sin inflar el sitio.",
      "Formulario claro para ordenar la oportunidad desde el inicio.",
    ],
    deliverablesTitle: "Lo esencial",
    deliverables: [
      "Páginas por servicio",
      "Prueba social y testimonios",
      "Preguntas frecuentes",
      "Formulario principal",
      "Base SEO para crecer",
    ],
    relatedSlugs: [
      "servicios",
      "paginas-web-costa-rica",
      "por-que-necesita-sitio-web",
      "cotizacion",
    ],
    alternatePath: "/costa-rica/service-business-web-development",
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
    relatedSlugs: [
      "paginas-web-costa-rica",
      "desarrollo-web-costa-rica",
      "cuanto-cuesta-pagina-web",
      "cotizacion",
    ],
    alternatePath: "/costa-rica/real-estate-web-development",
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
    relatedSlugs: [
      "paginas-web-costa-rica",
      "desarrollo-web-costa-rica",
      "por-que-necesita-sitio-web",
      "cotizacion",
    ],
    alternatePath: "/costa-rica/healthcare-web-development",
  }),
  createPage({
    slug: "consultorios",
    noindex: true,
    title: "Sitio Web para Consultorios en Costa Rica",
    description:
      "Sitios web para consultorios y profesionales de salud en Costa Rica que necesitan explicar servicios, ubicación y cómo agendar con claridad.",
    keywords: ["consultorio página web", "sitio web consultorio", "página web doctor costa rica"],
    hero: {
      eyebrow: "Consultorios",
      headline: "Un consultorio pequeño también necesita verse claro y confiable.",
      subheadline:
        "Para médicos, odontólogos y especialistas que necesitan un sitio simple, serio y fácil de consultar.",
    },
    intro:
      "Un consultorio pequeño necesita explicar servicios, ubicación y forma de contacto sin complicar demasiado la experiencia.",
    problemTitle: "Lo que suele faltar",
    problemPoints: [
      "No hay información clara sobre servicios o experiencia.",
      "Ubicación, horarios y contacto están escondidos.",
      "El paciente no entiende cómo dar el primer paso.",
    ],
    solutionTitle: "Lo que prioriza un buen sitio",
    solutionPoints: [
      "Propuesta profesional clara.",
      "Información práctica muy visible.",
      "Un botón principal para consulta o cita.",
    ],
    deliverablesTitle: "Bloques recomendados",
    deliverables: [
      "Presentación del profesional",
      "Servicios o tratamientos",
      "Ubicación y horarios",
      "Preguntas frecuentes",
      "Formulario de contacto",
    ],
    relatedSlugs: ["clinicas", "por-que-necesita-sitio-web", "cotizacion", "diseno-web-costa-rica"],
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
    relatedSlugs: [
      "paginas-web-costa-rica",
      "diseno-web-costa-rica",
      "desarrollo-web-costa-rica",
      "cotizacion",
    ],
    alternatePath: "/costa-rica/tourism-web-development",
  }),
  createPage({
    slug: "cuanto-cuesta-pagina-web",
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
    relatedSlugs: [
      "paginas-web-costa-rica",
      "diseno-web-costa-rica",
      "por-que-necesita-sitio-web",
      "cotizacion",
    ],
  }),
  createPage({
    slug: "por-que-necesita-sitio-web",
    title: "Por Qué Su Negocio Necesita un Sitio Web en Costa Rica",
    description:
      "Explicación simple de por qué un negocio en Costa Rica necesita un sitio web para verse serio, explicar servicios y facilitar el contacto.",
    keywords: [
      "por qué necesito un sitio web",
      "sitio web para negocio costa rica",
      "negocio sin página web",
    ],
    hero: {
      eyebrow: "Por qué necesita un sitio web",
      headline:
        "Su negocio necesita un sitio web porque la gente juzga confianza antes de escribirle.",
      subheadline:
        "No se trata de tecnología. Se trata de verse serio, explicar bien lo que hace y dejar una forma clara de contacto.",
    },
    intro:
      "Muchas veces el problema no es técnico. El problema es que el negocio no tiene dónde mostrarse bien, explicar su oferta y dejar un siguiente paso claro.",
    problemTitle: "Cuando no hay sitio web",
    problemPoints: [
      "El negocio se ve menos establecido.",
      "Todo depende de explicar lo mismo una y otra vez por mensajes.",
      "Se pierden oportunidades porque no hay contexto ni prueba suficiente.",
    ],
    solutionTitle: "Lo que cambia un buen sitio",
    solutionPoints: [
      "Da una primera impresión más fuerte.",
      "Ordena servicios, preguntas frecuentes y llamada a la acción.",
      "Mejora la calidad de las consultas que llegan.",
    ],
    deliverablesTitle: "Lo mínimo que debe resolver",
    deliverables: [
      "Quién es el negocio",
      "Qué vende o resuelve",
      "Por qué confiar",
      "Cómo contactarlo",
      "Qué siguiente paso tomar",
    ],
    relatedSlugs: [
      "paginas-web-costa-rica",
      "negocios-servicios",
      "cuanto-cuesta-pagina-web",
      "cotizacion",
    ],
  }),
  createPage({
    slug: "sitio-web-que-genere-clientes",
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
    relatedSlugs: ["seo-costa-rica", "paginas-web-costa-rica", "cotizacion", "casos"],
    alternatePath: "/costa-rica/lead-generation-websites-costa-rica",
  }),
  createPage({
    slug: "rediseno-sitio-web",
    noindex: true,
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
    relatedSlugs: ["diseno-web-costa-rica", "cuanto-cuesta-pagina-web", "proceso", "cotizacion"],
    alternatePath: "/costa-rica/website-redesign-costa-rica",
  }),
  createPage({
    slug: "portafolio",
    noindex: true,
    title: "Portafolio Web en Costa Rica",
    description:
      "Portafolio de sitios, productos y proyectos digitales de Marcelo Retana para mostrar calidad, criterio y velocidad de ejecución.",
    keywords: [
      "portafolio web costa rica",
      "trabajos web costa rica",
      "desarrollador web portafolio costa rica",
    ],
    hero: {
      eyebrow: "Portafolio",
      headline: "La prueba importa más que cualquier promesa.",
      subheadline:
        "Vea trabajos reales para entender el nivel de ejecución, criterio y velocidad que puede esperar.",
    },
    intro:
      "Antes de pedir una propuesta, muchas personas quieren confirmar si el trabajo realmente se ve bien y si el nivel de ejecución coincide con lo que necesitan.",
    problemTitle: "Lo que la persona quiere confirmar",
    problemPoints: [
      "Calidad visual real.",
      "Experiencia con negocios serios.",
      "Señales de que sí se entrega lo prometido.",
    ],
    solutionTitle: "Lo que debe demostrar el portafolio",
    solutionPoints: [
      "Calidad de ejecución.",
      "Variedad suficiente para distintos casos.",
      "Capacidad de mover proyectos rápido sin bajar el nivel.",
    ],
    deliverablesTitle: "Qué conviene mostrar",
    deliverables: [
      "Capturas o enlaces representativos",
      "Tipo de negocio",
      "Objetivo del proyecto",
      "Resultado o mejora visible",
      "Tiempo de entrega",
    ],
    relatedSlugs: ["casos", "constructoras", "turismo", "cotizacion"],
  }),
  createPage({
    slug: "casos",
    noindex: true,
    title: "Casos de Éxito Web en Costa Rica",
    description:
      "Casos de éxito y prueba comercial para negocios en Costa Rica que quieren validar calidad, velocidad y claridad antes de contratar.",
    keywords: [
      "casos de éxito web",
      "testimonios web costa rica",
      "prueba desarrollador web costa rica",
    ],
    hero: {
      eyebrow: "Casos de éxito",
      headline: "La mejor manera de vender confianza es con resultados y contexto.",
      subheadline:
        "Resultados, contexto y prueba real ayudan a decidir con menos riesgo que una promesa suelta o una recomendación informal.",
    },
    intro:
      "Los casos ayudan a bajar el riesgo cuando alguien ya está comparando opciones y quiere ver si de verdad se entrega lo prometido.",
    problemTitle: "Objeciones que ayuda a reducir",
    problemPoints: [
      "No saber si de verdad se entrega.",
      "No tener evidencia de calidad o experiencia.",
      "Sentir demasiado riesgo antes de pedir una propuesta.",
    ],
    solutionTitle: "Qué debe mostrar un caso",
    solutionPoints: [
      "Contexto del problema.",
      "Tipo de solución entregada.",
      "Resultado visible o mejora comercial.",
    ],
    deliverablesTitle: "Formato recomendado",
    deliverables: [
      "Resumen del negocio",
      "Problema a resolver",
      "Enfoque tomado",
      "Resultado",
      "Testimonio o cita",
    ],
    relatedSlugs: ["portafolio", "proceso", "sitio-web-que-genere-clientes", "cotizacion"],
  }),
  createPage({
    slug: "proceso",
    noindex: true,
    title: "Proceso de Trabajo Web en Costa Rica",
    description:
      "Proceso de trabajo para sitios web y proyectos comerciales en Costa Rica, desde la cotización hasta la entrega y mejoras posteriores.",
    keywords: ["proceso web costa rica", "como trabaja un desarrollador web", "proceso sitio web"],
    hero: {
      eyebrow: "Proceso",
      headline: "El proceso debe dar claridad, no burocracia.",
      subheadline:
        "La idea es pasar de una necesidad comercial a una propuesta, una entrega concreta y una presencia online mejor organizada sin vueltas innecesarias.",
    },
    intro:
      "El proceso ayuda a bajar la incertidumbre desde el inicio. La idea es que usted sepa qué pasa después de escribir, cuánto orden hay en el trabajo y cómo se llega a una entrega clara.",
    problemTitle: "Miedos comunes",
    problemPoints: [
      "No saber qué pasa después de escribir por primera vez.",
      "Temor a procesos largos o desordenados.",
      "Poca claridad en tiempos, alcance o entregables.",
    ],
    solutionTitle: "Cómo funciona el proceso",
    solutionPoints: [
      "Recibo contexto por formulario.",
      "Respondo con alcance y enfoque.",
      "Construyo, revisamos y lanzamos con tiempos claros.",
    ],
    deliverablesTitle: "Etapas",
    deliverables: [
      "Descubrimiento comercial",
      "Propuesta y alcance",
      "Diseño y estructura",
      "Desarrollo y revisión",
      "Lanzamiento y mejoras",
    ],
    relatedSlugs: ["cotizacion", "servicios", "casos", "cuanto-cuesta-pagina-web"],
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
    relatedSlugs: [
      "paginas-web-costa-rica",
      "desarrollo-web-costa-rica",
      "cuanto-cuesta-pagina-web",
      "servicios",
    ],
  }),
];
