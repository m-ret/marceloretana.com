import type { MarketFaq, MarketHub, MarketPage, MarketProof } from "@/lib/market-page-types";

const generatedAt = "2026-04-01";

const defaultCta = {
  primaryLabel: "Solicitar cotizacion",
  primaryHref: "#lead-form",
  secondaryLabel: "Ver experiencia",
  secondaryHref: "/#experience",
  tertiaryLabel: "WhatsApp",
  tertiaryHref:
    "https://wa.me/50671077969?text=Hola%2C%20me%20interesa%20una%20cotizacion%20para%20mi%20negocio",
};

const sharedProof: MarketProof[] = [
  {
    metric: "10+ anos",
    title: "Experiencia senior",
    description:
      "Marcelo Retana lleva mas de una decada construyendo sitios, apps y productos digitales para negocios locales y marcas globales.",
  },
  {
    metric: "50+",
    title: "Proyectos entregados",
    description:
      "El enfoque combina velocidad, claridad comercial y ejecucion tecnica en proyectos reales, no demos ni promesas vacias.",
  },
  {
    metric: "2-4 semanas",
    title: "Entrega visible",
    description:
      "La prioridad es lanzar algo serio y util rapido, sin procesos eternos ni una cadena innecesaria de intermediarios.",
  },
];

const sharedFaq: MarketFaq[] = [
  {
    question: "Trabaja con negocios pequenos en Costa Rica?",
    answer:
      "Si. De hecho, muchas oportunidades empiezan con negocios que todavia no tienen una presencia online seria o que se ven improvisados frente a sus clientes.",
  },
  {
    question: "Todavia puedo escribir por WhatsApp?",
    answer:
      "Si, pero la via principal es el formulario. Asi la respuesta por email sale con mejor contexto, alcance y siguientes pasos.",
  },
  {
    question: "Cuanto tarda un sitio comercial bien hecho?",
    answer:
      "La mayoria de sitios para negocios se mueve en 2 a 4 semanas. Si hay SEO, integraciones, reservas o varias paginas verticales, puede tomar mas.",
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
  title: "Paginas Web y Desarrollo Web en Costa Rica",
  description:
    "Marcelo Retana ayuda a negocios en Costa Rica a verse mas serios, mas faciles de encontrar y mas faciles de contactar con paginas web bien hechas.",
  keywords: ["paginas web costa rica", "desarrollo web costa rica", "diseno web costa rica"],
  hero: {
    eyebrow: "Costa Rica",
    headline: "Sitios web para negocios que hoy se ven invisibles, viejos o improvisados.",
    subheadline:
      "Trabajo con negocios en Costa Rica que necesitan verse mas serios, explicar mejor lo que hacen y mover mas consultas por formulario.",
    supportingText:
      "Esta maquina existe para capturar demanda comercial local en lenguaje que los duenos de negocio si usan: sitio web, pagina web, diseno, desarrollo y cotizacion.",
  },
  intro:
    "Este hub organiza las paginas comerciales y sectoriales pensadas para Costa Rica. La estrategia no arranca hablando de software. Arranca hablando de confianza, claridad, clientes y una forma ordenada de pedir una propuesta.",
  proof: sharedProof,
  faq: sharedFaq,
  cta: defaultCta,
  featuredLinks: [
    { label: "Paginas Web", slug: "paginas-web-costa-rica" },
    { label: "Diseno Web", slug: "diseno-web-costa-rica" },
    { label: "Desarrollo Web", slug: "desarrollo-web-costa-rica" },
    { label: "Constructoras", slug: "constructoras" },
    { label: "Clinicas", slug: "clinicas" },
    { label: "Turismo", slug: "turismo" },
    { label: "Cotizacion", slug: "cotizacion" },
  ],
  alternatePath: "/costa-rica",
};

export const esCrMarketPages: MarketPage[] = [
  createPage({
    slug: "servicios",
    title: "Servicios Web para Negocios en Costa Rica",
    description:
      "Servicios de paginas web, redisenos, SEO comercial y desarrollos ligeros para negocios en Costa Rica que necesitan verse serios y captar mejores consultas.",
    keywords: ["servicios web costa rica", "sitio web para negocio", "agencia web costa rica"],
    hero: {
      eyebrow: "Servicios",
      headline: "No vendo solo codigo. Vendo presencia online que ayuda a cerrar mejor.",
      subheadline:
        "Desde la primera pagina web hasta un rediseno completo, el enfoque es confianza, claridad de oferta y una forma seria de captar oportunidades.",
    },
    intro:
      "Esta pagina aterriza la oferta para negocios que aun no saben exactamente que necesitan, pero si saben que su presencia online no les esta ayudando lo suficiente.",
    problemTitle: "Problemas que se repiten",
    problemPoints: [
      "Dependencia total de Instagram, Facebook o WhatsApp para explicar todo.",
      "Sitios viejos o inexistentes que hacen ver al negocio pequeno o poco serio.",
      "Falta de una forma clara para recibir consultas por email y dar seguimiento.",
    ],
    solutionTitle: "Como se corrige",
    solutionPoints: [
      "Paginas web comerciales con mensaje claro y CTA visible.",
      "Redisenos que mejoran estructura, copy y credibilidad.",
      "Paginas por servicio o vertical para crecer con SEO sin hablar raro.",
    ],
    deliverablesTitle: "Que suele incluir",
    deliverables: [
      "Copy comercial por seccion",
      "Diseno responsive",
      "Formulario de cotizacion",
      "SEO tecnico base",
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
    title: "Paginas Web Costa Rica para Negocios que Necesitan Verse Serios",
    description:
      "Paginas web en Costa Rica para negocios que necesitan una presencia profesional, una oferta clara y una forma ordenada de recibir consultas.",
    keywords: [
      "paginas web costa rica",
      "sitios web costa rica",
      "pagina web profesional costa rica",
    ],
    hero: {
      eyebrow: "Paginas Web Costa Rica",
      headline: "Su negocio necesita una pagina web que explique bien lo que hace.",
      subheadline:
        "No una presencia online por cumplir. Una pagina que ayude a dar confianza, ordenar servicios y captar mejores consultas.",
    },
    intro:
      "Esta es la busqueda mas directa del mercado local. El lenguaje aqui es simple porque el comprador normalmente no piensa en tecnologia, piensa en verse serio y conseguir clientes.",
    problemTitle: "Lo que pasa sin una pagina web seria",
    problemPoints: [
      "Todo depende de referencias, redes sociales o mensajes sueltos.",
      "No hay un lugar claro donde ver servicios, experiencia y contacto.",
      "Cuesta justificar precios si la presencia online se ve debil.",
    ],
    solutionTitle: "Lo que debe resolver la pagina",
    solutionPoints: [
      "Explicar la oferta en segundos.",
      "Construir confianza antes del primer contacto.",
      "Mover la visita hacia una consulta o cotizacion ordenada.",
    ],
    deliverablesTitle: "Piezas base",
    deliverables: [
      "Hero comercial con CTA",
      "Bloques de servicios",
      "Prueba social",
      "FAQ comercial",
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
    title: "Diseno Web Costa Rica para una Mejor Primera Impresion",
    description:
      "Diseno web en Costa Rica para negocios que necesitan verse mas confiables, mas claros y mas profesionales desde la primera visita.",
    keywords: [
      "diseno web costa rica",
      "disenador web costa rica",
      "sitio web profesional costa rica",
    ],
    hero: {
      eyebrow: "Diseno Web Costa Rica",
      headline: "Un buen diseno ayuda a que el negocio se vea serio antes de hablar con nadie.",
      subheadline:
        "La meta no es decoracion. Es transmitir confianza, claridad y valor para que la gente quiera dar el siguiente paso.",
    },
    intro:
      "Esta pagina ataca la intencion comercial de quienes ya saben que su presencia actual no transmite el nivel real de su negocio.",
    problemTitle: "Cuando el diseno falla",
    problemPoints: [
      "El sitio se ve viejo o generico.",
      "La propuesta no se entiende rapido.",
      "La marca se siente menos establecida de lo que realmente es.",
    ],
    solutionTitle: "En que se enfoca el rediseño",
    solutionPoints: [
      "Jerarquia visual clara para entender el negocio rapido.",
      "Secciones pensadas para confianza, no relleno.",
      "Version movil fuerte, porque ahi empieza mucho del trafico real.",
    ],
    deliverablesTitle: "Que suele cambiar",
    deliverables: [
      "Hero con mejor oferta",
      "Secciones de servicios mas claras",
      "Bloques de prueba y credibilidad",
      "CTA principal mejor ubicado",
      "Look and feel mas serio",
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
    title: "Desarrollo Web Costa Rica para Sitios Rapidos y Escalables",
    description:
      "Desarrollo web en Costa Rica para negocios que necesitan algo mas serio que una plantilla, con mejor rendimiento, mejor SEO y mejor capacidad de crecer.",
    keywords: ["desarrollo web costa rica", "empresa desarrollo web", "crear sitio web costa rica"],
    hero: {
      eyebrow: "Desarrollo Web Costa Rica",
      headline:
        "Desarrollo web para negocios que necesitan algo mas serio que una plantilla improvisada.",
      subheadline:
        "Construyo sitios rapidos, claros y tecnicamente limpios para que el negocio no se quede corto cuando quiera crecer o posicionarse mejor.",
    },
    intro:
      "Esta pagina mezcla ejecucion tecnica con lenguaje entendible para compradores no tecnicos. No hace falta hablar de arquitectura; hace falta hablar de un sitio que si funcione.",
    problemTitle: "Senales de una mala base",
    problemPoints: [
      "Sitios lentos o fragiles.",
      "Paginas dificiles de expandir cuando el negocio quiere crecer.",
      "Herramientas limitadas que frenan SEO, formularios o nuevas secciones.",
    ],
    solutionTitle: "Lo que entrega una mejor base",
    solutionPoints: [
      "Rendimiento fuerte desde el inicio.",
      "Estructura lista para paginas nuevas por servicio o sector.",
      "Integraciones limpias para formularios, reservas o seguimiento.",
    ],
    deliverablesTitle: "Tipos de solucion",
    deliverables: [
      "Sitio comercial a medida",
      "Landing pages por servicio",
      "CMS ligero para cambios simples",
      "Integraciones de contacto",
      "Mejoras tecnicas de velocidad",
    ],
    relatedSlugs: ["servicios", "diseno-web-costa-rica", "negocios-servicios", "cotizacion"],
    alternatePath: "/costa-rica/web-development",
  }),
  createPage({
    slug: "negocios-servicios",
    title: "Paginas Web para Negocios de Servicios en Costa Rica",
    description:
      "Paginas web para negocios de servicios en Costa Rica que necesitan explicar rapido lo que hacen, verse confiables y captar formularios mejor calificados.",
    keywords: [
      "pagina web para servicios",
      "sitio web empresa de servicios",
      "negocio de servicios costa rica",
    ],
    hero: {
      eyebrow: "Negocios de servicios",
      headline:
        "Si usted vende un servicio, su sitio debe explicar rapido por que confiar en usted.",
      subheadline:
        "Trabajo con empresas de servicios que necesitan ordenar su oferta, mostrar prueba y dejar un camino claro para pedir informacion.",
    },
    intro:
      "Este vertical es amplio, pero comercialmente fuerte. La clave es reducir la friccion para negocios que viven de consultas, no de un checkout.",
    problemTitle: "Retos tipicos",
    problemPoints: [
      "Oferta dificil de entender en pocos segundos.",
      "Poca prueba visible o ninguna diferenciacion clara.",
      "Dependencia total de mensajes directos y referencias.",
    ],
    solutionTitle: "Que si funciona",
    solutionPoints: [
      "Servicios principales explicados con copy directo.",
      "Prueba y credibilidad visibles sin inflar el sitio.",
      "Formulario claro para ordenar la oportunidad desde el inicio.",
    ],
    deliverablesTitle: "Lo esencial",
    deliverables: [
      "Paginas por servicio",
      "Prueba social y testimonios",
      "FAQ comerciales",
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
    title: "Paginas Web para Constructoras e Inmobiliarias en Costa Rica",
    description:
      "Paginas web para constructoras, desarrollos e inmobiliarias en Costa Rica que necesitan proyectar confianza, mostrar proyectos y recibir consultas mejor calificadas.",
    keywords: [
      "pagina web para constructora",
      "sitio web constructora costa rica",
      "real estate web costa rica",
    ],
    hero: {
      eyebrow: "Constructoras",
      headline: "Una constructora se juzga rapido por como se ve online.",
      subheadline:
        "La presencia digital tiene que mostrar proyectos, ubicaciones, seriedad y un camino claro para pedir informacion.",
    },
    intro:
      "La oportunidad aqui es convertir un sector con alta friccion comercial en una experiencia mucho mas clara para compradores, inversionistas y prospectos.",
    problemTitle: "Problemas comunes del sector",
    problemPoints: [
      "Proyectos sin una vitrina profesional.",
      "Informacion regada entre PDFs, redes y WhatsApp.",
      "Pocas senales de confianza para compras grandes.",
    ],
    solutionTitle: "Que deberia resolver el sitio",
    solutionPoints: [
      "Mostrar desarrollos o servicios con orden.",
      "Construir confianza desde la primera visita.",
      "Facilitar formularios de consulta con mas contexto.",
    ],
    deliverablesTitle: "Bloques recomendados",
    deliverables: [
      "Seccion de proyectos",
      "Paginas por desarrollo o servicio",
      "Formulario de consulta",
      "Prueba social y experiencia",
      "SEO local para busquedas relevantes",
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
    title: "Paginas Web para Clinicas y Salud en Costa Rica",
    description:
      "Paginas web para clinicas, consultorios y negocios de salud en Costa Rica que necesitan inspirar confianza, explicar servicios y facilitar consultas.",
    keywords: [
      "pagina web clinica costa rica",
      "sitio web clinica",
      "desarrollo web salud costa rica",
    ],
    hero: {
      eyebrow: "Clinicas",
      headline:
        "Si una clinica no inspira confianza online, pierde pacientes antes de hablar con ellos.",
      subheadline:
        "La meta es un sitio claro, profesional y facil de consultar para clinicas, centros medicos y negocios de salud.",
    },
    intro:
      "En salud, el sitio tiene que reducir ansiedad, explicar servicios y dejar claro como hacer la primera consulta.",
    problemTitle: "Lo que frena la conversion",
    problemPoints: [
      "Servicios explicados de forma confusa.",
      "Sitios viejos que no inspiran seriedad.",
      "Dificultad para agendar o dejar datos.",
    ],
    solutionTitle: "Enfoque recomendado",
    solutionPoints: [
      "Mensaje simple y orientado a confianza.",
      "Paginas por especialidad o servicio si hace falta.",
      "Llamado a la accion claro para consulta inicial.",
    ],
    deliverablesTitle: "Puede incluir",
    deliverables: [
      "Paginas por especialidad",
      "FAQ para dudas comunes",
      "Solicitud de cita o consulta",
      "Prueba profesional y testimonios",
      "Version movil clara",
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
    slug: "turismo",
    title: "Paginas Web para Turismo y Hoteleria en Costa Rica",
    description:
      "Paginas web para hoteles, tours y negocios de turismo en Costa Rica que necesitan transmitir confianza rapido y facilitar consultas o reservas.",
    keywords: [
      "pagina web turismo costa rica",
      "sitio web hotel costa rica",
      "web para tours costa rica",
    ],
    hero: {
      eyebrow: "Turismo",
      headline: "En turismo, una mala presencia online mata confianza antes de la reserva.",
      subheadline:
        "Trabajo con hoteles, tours y experiencias que necesitan comunicar valor rapido y dejar claro como consultar disponibilidad o reservar.",
    },
    intro:
      "En este vertical, el sitio es vitrina, filtro de confianza y motor de consultas al mismo tiempo. Si falla en uno, pierde en todos.",
    problemTitle: "Fricciones tipicas",
    problemPoints: [
      "Informacion clave repartida en muchas plataformas.",
      "Pocas senales de profesionalismo para turistas extranjeros.",
      "Procesos de reserva o consulta poco claros.",
    ],
    solutionTitle: "Lo que debe mejorar",
    solutionPoints: [
      "Mensaje visual fuerte con informacion practica.",
      "Paginas de experiencias, habitaciones o paquetes.",
      "CTA claro para disponibilidad, reserva o consulta.",
    ],
    deliverablesTitle: "Componentes frecuentes",
    deliverables: [
      "Paginas por servicio o experiencia",
      "Galeria o bloques visuales",
      "Formulario y contacto",
      "FAQ de viaje",
      "Version movil optimizada",
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
    title: "Cuanto Cuesta una Pagina Web en Costa Rica",
    description:
      "Guia comercial para entender cuanto cuesta una pagina web en Costa Rica, que mueve el precio y como evitar botar plata en algo que no ayuda al negocio.",
    keywords: [
      "cuanto cuesta una pagina web en costa rica",
      "precio pagina web costa rica",
      "cotizacion sitio web costa rica",
    ],
    hero: {
      eyebrow: "Costo",
      headline: "La pregunta correcta no es solo cuanto cuesta. Es que tanto le ayuda al negocio.",
      subheadline:
        "La inversion tiene que verse reflejada en confianza, claridad y mejores consultas, no solo en tener otra pagina mas en internet.",
    },
    intro:
      "Esta pagina existe para capturar la objecion mas comun del mercado local: el miedo a gastar en algo que no se entiende y no se siente necesario.",
    problemTitle: "Lo que confunde el precio",
    problemPoints: [
      "Comparar una plantilla barata con un sitio comercial real.",
      "No saber que incluye estrategia, copy, estructura y SEO.",
      "Miedo a gastar en algo que no se vea serio ni ayude a vender.",
    ],
    solutionTitle: "Como pensar el costo",
    solutionPoints: [
      "Primero defina si necesita presencia base, rediseno o paginas nuevas.",
      "Piense en confianza y conversion, no solo en el numero final.",
      "Pida una propuesta con alcance, tiempos y entregables claros.",
    ],
    deliverablesTitle: "Factores que mueven el precio",
    deliverables: [
      "Cantidad de paginas",
      "Nivel de copy y estrategia",
      "SEO o paginas sectoriales",
      "Integraciones o formularios especiales",
      "Nivel de personalizacion visual",
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
    title: "Por Que Su Negocio Necesita un Sitio Web en Costa Rica",
    description:
      "Explicacion simple de por que un negocio en Costa Rica necesita un sitio web para verse serio, explicar servicios y facilitar el contacto.",
    keywords: [
      "por que necesito un sitio web",
      "sitio web para negocio costa rica",
      "negocio sin pagina web",
    ],
    hero: {
      eyebrow: "Por que necesita un sitio web",
      headline:
        "Su negocio necesita un sitio web porque la gente juzga confianza antes de escribirle.",
      subheadline:
        "No se trata de tecnologia. Se trata de verse serio, explicar bien lo que hace y dejar una forma clara de contacto.",
    },
    intro:
      "Esta pagina existe para compradores que aun no entienden del todo por que un sitio les ayudaria. La respuesta no es tecnica: es comercial.",
    problemTitle: "Cuando no hay sitio web",
    problemPoints: [
      "El negocio se ve menos establecido.",
      "Todo depende de explicar lo mismo una y otra vez por mensajes.",
      "Se pierden oportunidades porque no hay contexto ni prueba suficiente.",
    ],
    solutionTitle: "Lo que cambia un buen sitio",
    solutionPoints: [
      "Da una primera impresion mas fuerte.",
      "Ordena servicios, preguntas frecuentes y llamada a la accion.",
      "Mejora la calidad de las consultas que llegan.",
    ],
    deliverablesTitle: "Lo minimo que debe resolver",
    deliverables: [
      "Quien es el negocio",
      "Que vende o resuelve",
      "Por que confiar",
      "Como contactarlo",
      "Que siguiente paso tomar",
    ],
    relatedSlugs: [
      "paginas-web-costa-rica",
      "negocios-servicios",
      "cuanto-cuesta-pagina-web",
      "cotizacion",
    ],
  }),
  createPage({
    slug: "cotizacion",
    title: "Solicitar Cotizacion Web en Costa Rica",
    description:
      "Solicite una cotizacion para su sitio web, rediseno o proyecto digital en Costa Rica. Reciba una respuesta clara por email en menos de 24 horas.",
    keywords: [
      "cotizacion pagina web costa rica",
      "solicitar cotizacion web",
      "propuesta sitio web costa rica",
    ],
    hero: {
      eyebrow: "Cotizacion",
      headline: "La mejor siguiente accion es una cotizacion clara.",
      subheadline:
        "Comparta el contexto de su negocio y respondo por email con un enfoque, un rango de inversion y los siguientes pasos.",
      supportingText:
        "Este formulario existe para reemplazar conversaciones desordenadas y dejar una base mas seria para avanzar.",
    },
    intro:
      "Esta es la pagina con mayor intencion comercial del sistema. Todo empuja a completar el formulario con suficiente contexto para responder bien.",
    problemTitle: "Por que usar formulario primero",
    problemPoints: [
      "Permite explicar mejor el negocio desde el inicio.",
      "Hace mas facil responder con una propuesta util por email.",
      "Evita conversaciones informales sin suficiente contexto.",
    ],
    solutionTitle: "Lo que recibe despues",
    solutionPoints: [
      "Respuesta por email en menos de 24 horas.",
      "Recomendacion de enfoque segun su negocio.",
      "Rango de inversion y siguientes pasos.",
    ],
    deliverablesTitle: "Prepare esto para avanzar mas rapido",
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
