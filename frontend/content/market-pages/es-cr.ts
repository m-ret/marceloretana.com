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
    "Páginas web profesionales en Costa Rica por Marcelo Retana. Diseño, desarrollo a medida y SEO para negocios que necesitan verse serios y recibir mejores consultas.",
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
    title: "Cuánto Cuesta una Página Web en Costa Rica — Guía de Precios Real",
    description:
      "Cuánto cuesta una página web en Costa Rica: qué mueve el precio, qué incluye cada rango de inversión y cómo evitar botar plata en algo que no ayuda a su negocio. Solicite cotización.",
    keywords: [
      "cuanto cuesta una pagina web en costa rica",
      "precio página web costa rica",
      "cotización sitio web costa rica",
    ],
    hero: {
      eyebrow: "Costo",
      headline: "¿Cuánto cuesta una página web en Costa Rica? Lo que realmente mueve el precio.",
      subheadline:
        "La inversión tiene que verse reflejada en confianza, claridad y mejores consultas, no solo en tener otra página más en internet.",
    },
    intro:
      "La pregunta de cuánto cuesta una página web en Costa Rica no tiene una sola respuesta, porque no es lo mismo una plantilla básica que un sitio comercial que sí ayuda a vender. Una página barata puede darle presencia; una página bien planteada puede ayudarle a justificar mejor su negocio, ordenar el contacto y crecer con más claridad.",
    faq: [
      {
        question: "¿Qué factores afectan el precio de una página web?",
        answer:
          "El precio depende de la cantidad de páginas, el nivel de personalización del diseño, si necesita SEO, integraciones con formularios o reservas, y qué tan trabajado tiene que quedar el mensaje comercial. No es lo mismo una presencia base que un sitio con páginas por servicio y optimización para Google.",
      },
      {
        question: "¿Una página de $500 es igual a una de $5,000?",
        answer:
          "No, y la diferencia no es solo visual. Una página de $500 suele ser una plantilla con su logo y texto genérico. Una de $5,000 tiene mensaje comercial pensado, estructura para convertir visitas en consultas, SEO y una base técnica que puede crecer con el negocio.",
      },
      {
        question: "¿Se paga todo por adelantado?",
        answer:
          "No. El esquema habitual es un anticipo al iniciar y el resto contra entrega de hitos concretos. Así usted ve avance real antes de comprometer toda la inversión, y el proyecto se mueve con más confianza para ambas partes.",
      },
      {
        question: "¿Qué incluye el precio de una página web profesional?",
        answer:
          "Incluye diseño personalizado, desarrollo técnico, mensaje comercial, estructura de páginas, formulario de contacto y una base lista para SEO. No se cobra aparte por cosas básicas como que el sitio se vea bien en celular o que cargue rápido — eso viene incluido.",
      },
    ],
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
    title: "Sitio Web para Generar Clientes en Costa Rica — Más que Presencia",
    description:
      "Cómo estructurar un sitio web para generar clientes en Costa Rica: mensaje claro, prueba social, formularios estratégicos y estructura que convierte visitas en consultas reales. Solicite cotización.",
    keywords: [
      "sitio web que genere clientes",
      "página web para conseguir clientes",
      "web conversion costa rica",
    ],
    hero: {
      eyebrow: "Generar clientes",
      headline:
        "Un sitio web para generar clientes en Costa Rica que realmente convierte visitas en consultas.",
      subheadline:
        "La combinación correcta es mensaje, estructura, prueba y un paso claro para mover a la persona a pedir información.",
    },
    intro:
      "Generar clientes con un sitio web no depende solo de tener una página bonita. Depende de tener una estructura que explique bien, dé confianza y deje un siguiente paso muy claro para que la persona se convierta en consulta real.",
    faq: [
      {
        question: "¿Qué hace que un sitio web genere clientes?",
        answer:
          "Un sitio genera clientes cuando combina tres cosas: un mensaje que el visitante entiende en segundos, prueba de que usted sabe lo que hace, y un formulario visible que facilite el siguiente paso. Sin esas tres piezas, el sitio es solo una tarjeta de presentación cara.",
      },
      {
        question: "¿En cuánto tiempo veo resultados?",
        answer:
          "Las primeras consultas suelen llegar entre las primeras 2 a 6 semanas después de lanzar, dependiendo del tráfico que ya tenga y si se combinan las páginas con SEO local. Lo importante es que la estructura de conversión quede lista desde el día uno.",
      },
      {
        question: "¿Incluye formularios y seguimiento?",
        answer:
          "Sí. Cada sitio incluye formularios de contacto en puntos estratégicos, no solo al final de la página. Se configuran para que usted reciba las consultas por email con el contexto necesario para responder con una propuesta seria.",
      },
      {
        question: "¿Qué pasa si ya tengo sitio pero no convierte?",
        answer:
          "Es más común de lo que parece. Muchos negocios tienen un sitio que se ve bien pero no genera consultas porque el mensaje es vago, no hay prueba social o el formulario está escondido. En esos casos, un rediseño enfocado en conversión puede cambiar el resultado sin empezar de cero.",
      },
    ],
    narrativeSections: [
      {
        eyebrow: "El problema real",
        title: "La mayoría de sitios web en Costa Rica no están diseñados para convertir.",
        body: "Están diseñados para verse bien, y eso no es lo mismo. Un sitio que convierte tiene una estructura intencional: cada sección responde una objeción, cada bloque construye confianza, y el formulario aparece justo cuando la persona tiene suficiente contexto para dar el siguiente paso. Sin esa arquitectura, las visitas llegan y se van sin dejar rastro.",
        points: [
          "Mensaje comercial claro que filtra visitantes y atrae consultas relevantes.",
          "Prueba social y experiencia colocada donde reduce la fricción de decidir.",
          "Formularios repetidos en los puntos donde la intención de contacto es más alta.",
          "Estructura de páginas que captura tráfico de búsqueda con intención comercial.",
        ],
      },
      {
        eyebrow: "El enfoque",
        title: "Convertir más no es cuestión de trucos. Es cuestión de claridad comercial.",
        body: "La mejor forma de generar más clientes con un sitio web es hacer que la oferta se entienda rápido, que la prueba de que funciona sea visible y que el siguiente paso sea obvio. Eso aplica igual para un negocio de servicios, una constructora o una clínica. La diferencia entre un sitio que genera consultas y uno que no, casi siempre es cuestión de estructura, no de diseño.",
      },
    ],
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
    title: "Páginas Web para Constructoras en Costa Rica — Proyectos que Convencen",
    description:
      "Páginas web para constructoras e inmobiliarias en Costa Rica: galería de proyectos, páginas por desarrollo y formularios que filtran consultas serias. Solicite cotización.",
    keywords: [
      "página web para constructora",
      "sitio web constructora costa rica",
      "real estate web costa rica",
    ],
    hero: {
      eyebrow: "Constructoras",
      headline:
        "Páginas web para constructoras en Costa Rica que proyectan la seriedad que sus proyectos merecen.",
      subheadline:
        "La presencia digital tiene que mostrar proyectos, ubicaciones, seriedad y un camino claro para pedir información.",
    },
    intro:
      "Las páginas web para constructoras en Costa Rica tienen que resolver un problema concreto: transmitir orden, respaldo y una forma clara de pedir información sin depender de PDFs regados, redes sociales o mensajes sueltos. Cuando la inversión es alta, la web es la primera señal de confianza.",
    faq: [
      {
        question: "¿Pueden integrar galerías de proyectos?",
        answer:
          "Sí. El sitio se estructura para que cada proyecto tenga su propia página con galería de imágenes, ubicación, tipologías y estado del desarrollo. Así el prospecto llega con más contexto y la conversación comercial arranca con mejor base.",
      },
      {
        question: "¿Qué buscan los clientes de construcción en internet?",
        answer:
          "Buscan proyectos en zonas específicas, precios de referencia, imágenes de avance y una forma rápida de pedir información. Si su sitio no responde esas preguntas con claridad, el cliente se va a buscar a otra constructora que sí lo haga.",
      },
      {
        question: "¿Incluyen páginas por proyecto o desarrollo?",
        answer:
          "Sí. Cada proyecto activo puede tener su propia página con detalles, galería, planos y formulario de consulta. Eso no solo mejora la experiencia del visitante, también le ayuda a posicionarse en Google por búsquedas específicas de zona o tipo de proyecto.",
      },
      {
        question: "¿Sirve para inmobiliarias y constructoras?",
        answer:
          "Sí. La estructura funciona tanto para constructoras que venden sus propios desarrollos como para inmobiliarias que manejan inventario de terceros. Lo importante es que los proyectos se presenten con orden y que el formulario filtre bien las consultas.",
      },
    ],
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
    title: "Páginas Web para Clínicas en Costa Rica — Confianza desde la Primera Visita",
    description:
      "Páginas web para clínicas y negocios de salud en Costa Rica: diseño profesional, páginas por especialidad, reserva de citas y estructura que genera confianza en pacientes. Solicite cotización.",
    keywords: [
      "página web clínica costa rica",
      "sitio web clínica",
      "desarrollo web salud costa rica",
    ],
    hero: {
      eyebrow: "Clínicas",
      headline: "Páginas web para clínicas en Costa Rica que los pacientes realmente confían.",
      subheadline:
        "La meta es un sitio claro, profesional y fácil de consultar para clínicas, centros médicos y negocios de salud.",
    },
    intro:
      "Las páginas web para clínicas en Costa Rica tienen que transmitir calma, profesionalismo y claridad. Si el sitio se ve viejo, confuso o demasiado informal, mucha gente decide no escribir siquiera. Por eso una clínica necesita una presencia que explique servicios con orden y deje un camino claro para la primera consulta.",
    faq: [
      {
        question: "¿Pueden incluir reserva de citas en línea?",
        answer:
          "Sí. Se puede integrar un sistema de reserva de citas directamente en el sitio, ya sea con herramientas como Calendly o con un formulario de solicitud que usted gestiona por email. La idea es que el paciente pueda agendar sin tener que llamar o escribir por WhatsApp.",
      },
      {
        question: "¿Cómo generan confianza para clínicas?",
        answer:
          "Con diseño limpio, información médica bien organizada por especialidad, perfiles profesionales del equipo y testimonios de pacientes. Cuando la persona ve orden y profesionalismo, baja la ansiedad y es más probable que dé el siguiente paso.",
      },
      {
        question: "¿Trabajan con especialistas o solo clínicas generales?",
        answer:
          "Con ambos. La estructura se adapta: para una clínica general se crean páginas por especialidad, y para un especialista independiente se enfoca en su área con más profundidad. Lo importante es que el paciente encuentre rápido lo que busca.",
      },
      {
        question: "¿Qué debe tener un sitio web de salud?",
        answer:
          "Como mínimo: descripción clara de servicios y especialidades, información del equipo médico, forma fácil de agendar cita o consulta, y un diseño que transmita profesionalismo. Si además incluye preguntas frecuentes por tratamiento, la confianza sube y el paciente llega mejor informado.",
      },
    ],
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
    title: "Páginas Web para Turismo en Costa Rica — Hoteles, Tours y Experiencias",
    description:
      "Páginas web para turismo en Costa Rica: hoteles, tours y experiencias con galerías, reservas en línea y posicionamiento en Google para atraer viajeros. Solicite cotización.",
    keywords: [
      "página web turismo costa rica",
      "sitio web hotel costa rica",
      "web para tours costa rica",
    ],
    hero: {
      eyebrow: "Turismo",
      headline: "Páginas web para turismo en Costa Rica que convierten visitantes en reservas.",
      subheadline:
        "Trabajo con hoteles, tours y experiencias que necesitan comunicar valor rápido y dejar claro cómo consultar disponibilidad o reservar.",
    },
    intro:
      "Las páginas web para turismo en Costa Rica venden antes de que alguien pregunte por disponibilidad. Tienen que mostrar bien la experiencia, responder dudas prácticas y dejar claro cómo consultar o reservar. Si eso falla, el negocio pierde confianza, urgencia y valor percibido al mismo tiempo.",
    faq: [
      {
        question: "¿Pueden integrar reservas en línea?",
        answer:
          "Sí. Se puede conectar con sistemas de reservas como Booking Engine, FareHarbor o Rezdy, o crear un formulario de disponibilidad propio si prefiere manejar las reservas manualmente. La meta es que el visitante pueda avanzar sin salir del sitio.",
      },
      {
        question: "¿Cómo se posiciona un sitio de turismo en Google?",
        answer:
          "Con páginas específicas por tour, destino o experiencia, optimizadas para las búsquedas que los viajeros realmente hacen. Por ejemplo, 'tour de avistamiento de ballenas en Osa' es mucho más efectivo que una sola página genérica de 'nuestros tours'.",
      },
      {
        question: "¿Incluyen galerías de tours y destinos?",
        answer:
          "Sí. Cada tour, habitación o experiencia puede tener su propia página con galería de fotos, descripción, precio de referencia y formulario de consulta. Las fotos bien presentadas son la herramienta de venta más poderosa en turismo.",
      },
      {
        question: "¿Sirve para hoteles, tours y actividades?",
        answer:
          "Sí. La estructura se adapta al tipo de negocio: para un hotel se enfoca en habitaciones y amenidades, para un operador de tours en experiencias y destinos, y para actividades en disponibilidad y logística. Lo que no cambia es la necesidad de confianza visual y un paso claro hacia la reserva.",
      },
    ],
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
    title: "Rediseño de Sitio Web en Costa Rica — Más Profesional, Más Conversión",
    description:
      "Rediseño de sitio web en Costa Rica para negocios que ya tienen web pero no convierte: mensaje comercial más claro, diseño profesional y estructura que sí ayuda a vender. Solicite cotización.",
    keywords: [
      "rediseño sitio web costa rica",
      "mejorar página web",
      "actualizar sitio web negocio",
    ],
    hero: {
      eyebrow: "Rediseño",
      headline:
        "Rediseño de sitio web en Costa Rica para negocios que ya no se reconocen en su propia página.",
      subheadline:
        "Rediseñamos sitios para que el negocio se vea más fuerte, se entienda mejor y convierta mejor que la versión anterior.",
    },
    intro:
      "El rediseño de sitio web en Costa Rica es para negocios que ya tienen presencia online pero esa presencia no les ayuda a vender, justificar mejor sus precios o dar una primera impresión a la altura del trabajo que hacen.",
    faq: [
      {
        question: "¿Cómo sé si mi sitio necesita un rediseño?",
        answer:
          "Las señales más claras son: el sitio se ve desactualizado frente a su competencia, los clientes le preguntan cosas que deberían estar claras en la página, o usted mismo siente que la web no representa el nivel actual del negocio. Si le da pena mandar el link, es momento de rediseñar.",
      },
      {
        question: "¿Voy a perder mi posicionamiento en Google?",
        answer:
          "No si el rediseño se hace con criterio técnico. Se conservan las URLs que ya tienen tráfico, se implementan redirecciones donde haga falta y se mejora la estructura de contenido para que Google entienda mejor cada página. El objetivo es subir, no retroceder.",
      },
      {
        question: "¿Cuánto tarda un rediseño?",
        answer:
          "Depende del alcance, pero la mayoría se mueve entre 2 y 4 semanas. Si el sitio actual tiene muchas páginas o requiere una reestructuración fuerte del contenido, puede tomar un poco más. Siempre se acuerda un cronograma antes de arrancar.",
      },
      {
        question: "¿Pueden conservar mi contenido actual?",
        answer:
          "Sí. Se revisa todo el contenido existente y se decide qué se mantiene, qué se reescribe y qué se elimina. El objetivo no es empezar de cero sino construir sobre lo que ya funciona y mejorar lo que no está ayudando al negocio.",
      },
    ],
    narrativeSections: [
      {
        eyebrow: "La señal de alerta",
        title: "Un sitio desactualizado le cuesta clientes todos los días, aunque no lo note.",
        body: "Cada persona que llega a un sitio viejo o confuso forma una opinión en segundos. Si esa opinión es 'esto no se ve serio', el negocio pierde la oportunidad antes de que alguien lea una sola línea. El problema es que ese costo es invisible: usted no sabe cuántas personas cerraron la pestaña porque la web no les dio confianza.",
        points: [
          "Primera impresión profesional que refleja el nivel real del negocio.",
          "Mensaje comercial actualizado para cómo el negocio opera hoy.",
          "Estructura moderna que funciona bien en celular y carga rápido.",
          "Formularios de contacto visibles y fáciles de usar.",
        ],
      },
      {
        eyebrow: "El proceso",
        title:
          "Un buen rediseño no es solo cambiar colores. Es repensar cómo la web trabaja para el negocio.",
        body: "El rediseño empieza por entender qué no está funcionando: si el problema es el mensaje, la estructura, la confianza visual o la conversión. A partir de ahí se prioriza y se reconstruye lo que más impacto tiene. No se trata de empezar de cero, sino de hacer que la web finalmente haga el trabajo que debería estar haciendo.",
      },
    ],
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
    title: "Cotización de Página Web en Costa Rica — Respuesta en 24 Horas",
    description:
      "Solicite una cotización de página web en Costa Rica. Cuénteme sobre su negocio y reciba por email una recomendación, rango de inversión y siguientes pasos en menos de 24 horas.",
    keywords: [
      "cotización página web costa rica",
      "solicitar cotización web",
      "propuesta sitio web costa rica",
    ],
    hero: {
      eyebrow: "Cotización",
      headline:
        "Cotización de página web en Costa Rica: cuénteme sobre el proyecto y le respondo en 24 horas.",
      subheadline:
        "Si necesita un sitio web nuevo, mejorar el actual o cotizar una app, deje el contexto aquí y le respondo por email con una recomendación, un rango de inversión y los siguientes pasos.",
      supportingText:
        "Así la conversación empieza ordenada, con mejor contexto y sin perder tiempo en mensajes sueltos.",
    },
    intro:
      "Solicitar una cotización de página web empieza con contexto. Cuando entiendo qué vende, qué necesita y qué quiere lograr, puedo responder con algo útil en lugar de una cifra al aire. Por eso el formulario importa: ayuda a pasar de una conversación informal a una propuesta con más sentido comercial.",
    faq: [
      {
        question: "¿Qué pasa después de enviar el formulario?",
        answer:
          "Reviso la información que dejó, analizo el negocio y le respondo por email en menos de 24 horas con una recomendación de enfoque, un rango de inversión estimado y los siguientes pasos concretos. No es una respuesta automática — es una evaluación real.",
      },
      {
        question: "¿En cuánto tiempo recibo respuesta?",
        answer:
          "En menos de 24 horas hábiles. La mayoría de respuestas salen el mismo día. Si el proyecto necesita más análisis, le aviso por email y coordinamos una llamada corta para afinar los detalles.",
      },
      {
        question: "¿Necesito saber exactamente lo que quiero?",
        answer:
          "No. Muchos negocios llegan sabiendo que necesitan algo pero no están seguros de qué exactamente. Para eso sirve la primera respuesta: le ayudo a definir prioridades, alcance y qué tiene más sentido según su situación y presupuesto.",
      },
      {
        question: "¿La consulta inicial tiene costo?",
        answer:
          "No. La primera evaluación y recomendación por email es sin costo ni compromiso. Si después de eso quiere avanzar, le presento una propuesta formal con alcance, tiempos y precio claro.",
      },
    ],
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
