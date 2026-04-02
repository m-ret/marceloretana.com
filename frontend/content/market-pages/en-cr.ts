import type { MarketFaq, MarketHub, MarketPage, MarketProof } from "@/lib/market-page-types";

const generatedAt = "2026-04-01";

const defaultCta = {
  primaryLabel: "Request a Quote",
  primaryHref: "#lead-form",
  secondaryLabel: "See Experience",
  secondaryHref: "/#experience",
  tertiaryLabel: "Schedule a Call",
  tertiaryHref: "https://cal.com/marcelo-retana",
};

const sharedProof: MarketProof[] = [
  {
    metric: "Costa Rica",
    title: "Local context",
    description:
      "Useful for foreign-owned businesses, expats, and nearshore buyers who want Costa Rica market context without low-end agency quality.",
  },
  {
    metric: "10+ years",
    title: "Senior execution",
    description:
      "Marcelo Retana has spent more than a decade building products, websites, and business systems that have to work in the real world.",
  },
  {
    metric: "50+",
    title: "Projects shipped",
    description:
      "The offer is founder-led, fast-moving, and built around clear communication instead of agency layers and vague process.",
  },
];

const sharedFaq: MarketFaq[] = [
  {
    question: "Do you work with foreign-owned businesses in Costa Rica?",
    answer:
      "Yes. That is one of the clearest fits for this English machine, especially for buyers who want Costa Rica context and a cleaner communication process in English.",
  },
  {
    question: "Is this only for software projects?",
    answer:
      "No. Many projects start with a website, a redesign, or a focused lead-generation system before they expand into heavier software work.",
  },
  {
    question: "Why is the form the primary CTA?",
    answer:
      "Because it creates a cleaner commercial process. Email follow-up is easier to track, easier to scope, and more useful than a chaotic WhatsApp thread.",
  },
];

function createPage(
  page: Omit<MarketPage, "machine" | "locale" | "path" | "generatedAt" | "cta" | "proof" | "faq"> &
    Partial<Pick<MarketPage, "cta" | "proof" | "faq">>
): MarketPage {
  return {
    machine: "en-cr",
    locale: "en",
    path: `/costa-rica/${page.slug}`,
    generatedAt,
    cta: page.cta ?? defaultCta,
    proof: page.proof ?? sharedProof,
    faq: page.faq ?? sharedFaq,
    ...page,
  };
}

export const enCrHub: MarketHub = {
  machine: "en-cr",
  locale: "en",
  path: "/costa-rica",
  generatedAt,
  title: "Costa Rica Web Development and Design",
  description:
    "Costa Rica-based web development, web design, and software execution for expats, foreign-owned businesses, and nearshore buyers who want a stronger local partner.",
  keywords: [
    "web development costa rica",
    "web development agency costa rica",
    "software development costa rica",
  ],
  hero: {
    eyebrow: "Costa Rica",
    headline:
      "A Costa Rica-based web and software partner for buyers who want clarity and execution.",
    subheadline:
      "Built for expats, foreign-owned businesses, and nearshore buyers who want local presence, stronger quality, and a cleaner form-first process.",
    supportingText:
      "This machine exists for English demand that explicitly includes Costa Rica in the search, not generic global agency traffic.",
  },
  intro:
    "This hub organizes the English Costa Rica service and sector pages that support commercial-intent searches from foreign buyers evaluating a Costa Rica team.",
  proof: sharedProof,
  faq: sharedFaq,
  cta: defaultCta,
  featuredLinks: [
    { label: "Web Development", slug: "web-development" },
    { label: "Web Development Agency", slug: "web-development-agency" },
    { label: "Software Development", slug: "software-development" },
    { label: "Web Design", slug: "web-design" },
    { label: "Quote", slug: "request-a-quote" },
    { label: "Cost", slug: "website-cost-costa-rica" },
    { label: "Why Costa Rica", slug: "why-costa-rica" },
    { label: "Nearshore", slug: "nearshore-web-development" },
    { label: "Real Estate", slug: "real-estate-web-development" },
  ],
  alternatePath: "/cr",
};

export const enCrMarketPages: MarketPage[] = [
  createPage({
    slug: "web-development",
    title: "Web Development Costa Rica for Serious Business Websites",
    description:
      "Costa Rica web development for businesses that need a stronger website, a better redesign, or a local execution partner that communicates clearly in English.",
    keywords: [
      "web development costa rica",
      "website development costa rica",
      "hire web developer costa rica",
    ],
    hero: {
      eyebrow: "Web Development Costa Rica",
      headline: "Costa Rica web development for buyers who need more than a cheap build.",
      subheadline:
        "I build fast, polished websites and commercial landing pages for buyers who want strong execution and a cleaner process than low-end offshore chaos.",
    },
    intro:
      "This is the main English money page for foreign buyers searching directly for Costa Rica web development, not just generic remote help.",
    problemTitle: "Why buyers search this term",
    problemPoints: [
      "They want a Costa Rica-based partner, not a random remote freelancer.",
      "They need a website that feels credible to local and international customers.",
      "They want direct communication and stronger delivery standards.",
    ],
    solutionTitle: "What the page promises",
    solutionPoints: [
      "Clear English communication.",
      "Modern execution and better performance.",
      "A website that is easier to trust, easier to understand, and easier to contact.",
    ],
    deliverablesTitle: "Typical scope",
    deliverables: [
      "Business website",
      "Service landing pages",
      "Redesign and repositioning",
      "Quote form setup",
      "Technical SEO foundation",
    ],
    relatedSlugs: [
      "web-development-agency",
      "web-design",
      "why-costa-rica",
      "service-business-web-development",
    ],
    alternatePath: "/cr/desarrollo-web-costa-rica",
  }),
  createPage({
    slug: "web-development-agency",
    title: "Web Development Agency Costa Rica for Foreign-Owned Businesses",
    description:
      "Costa Rica web development agency positioning for foreign-owned businesses and expats who want a local partner with stronger execution and a cleaner commercial process.",
    keywords: [
      "web development agency costa rica",
      "agency web development costa rica",
      "costa rica web agency",
    ],
    hero: {
      eyebrow: "Web Development Agency Costa Rica",
      headline:
        "If you are searching for a Costa Rica web agency, you are usually buying clarity as much as code.",
      subheadline:
        "This page is built for buyers who want local context, serious execution, and a quote-first process that feels more structured than WhatsApp-first agencies.",
    },
    intro:
      "The goal here is not to sound like a big agency. It is to position a stronger founder-led alternative for buyers who still search with agency language.",
    problemTitle: "What these buyers are really trying to avoid",
    problemPoints: [
      "Weak communication and messy scoping.",
      "A cheap-looking site that makes the business feel weaker.",
      "Paying agency prices without senior execution.",
    ],
    solutionTitle: "How this offer is framed",
    solutionPoints: [
      "Founder-led execution with fewer layers.",
      "A local Costa Rica perspective for the market and the buyer.",
      "A form-first process that leads to cleaner follow-up by email.",
    ],
    deliverablesTitle: "What they usually need",
    deliverables: [
      "Positioning cleanup",
      "Website rebuild or redesign",
      "Service pages that convert",
      "Better lead capture",
      "A clearer commercial proposal",
    ],
    relatedSlugs: ["web-development", "web-design", "why-costa-rica", "software-development"],
  }),
  createPage({
    slug: "software-development",
    title: "Software Development Costa Rica for Custom Workflows and Products",
    description:
      "Costa Rica software development for businesses that need a stronger local partner for portals, apps, custom workflows, and product execution.",
    keywords: [
      "software development costa rica",
      "custom software costa rica",
      "nearshore software costa rica",
    ],
    hero: {
      eyebrow: "Software Development Costa Rica",
      headline: "Costa Rica software development when the problem is bigger than a brochure site.",
      subheadline:
        "Use this page for buyers who do search for software, portals, apps, and custom workflows in Costa Rica.",
    },
    intro:
      "This page is intentionally English-first because the demand comes from foreigners and nearshore buyers much more than local Costa Rica SMB search behavior.",
    problemTitle: "What these buyers need",
    problemPoints: [
      "A team in Costa Rica with stronger execution than low-end local vendors.",
      "Clear project framing before money gets wasted.",
      "A partner that can handle websites, apps, and process-heavy work.",
    ],
    solutionTitle: "How the work is framed",
    solutionPoints: [
      "Start with the business problem, not feature soup.",
      "Ship the first useful version fast.",
      "Keep communication and implementation tight enough for real business use.",
    ],
    deliverablesTitle: "Common project types",
    deliverables: [
      "Custom portals",
      "Lead and operations workflows",
      "Web applications",
      "Internal tools with cleaner UX",
      "Product and MVP builds",
    ],
    relatedSlugs: [
      "web-development",
      "web-development-agency",
      "why-costa-rica",
      "healthcare-web-development",
    ],
  }),
  createPage({
    slug: "web-design",
    title: "Web Design Costa Rica for Better Trust and Positioning",
    description:
      "Costa Rica web design for businesses that need a more credible, polished website and a better first impression.",
    keywords: ["web design costa rica", "website design costa rica", "costa rica web designer"],
    hero: {
      eyebrow: "Web Design Costa Rica",
      headline: "If the website looks weak, the business feels weaker than it is.",
      subheadline:
        "This page speaks to buyers who are evaluating visual quality, trust, and positioning before they think about deeper software.",
    },
    intro:
      "The positioning here is design as a trust lever, not design as decoration. That matters a lot in Costa Rica service markets and tourism-heavy segments.",
    problemTitle: "What poor web design signals",
    problemPoints: [
      "The business feels smaller or less established than it really is.",
      "Potential buyers do not immediately understand the offer.",
      "The site fails to support pricing power or credibility.",
    ],
    solutionTitle: "What better design should do",
    solutionPoints: [
      "Clarify positioning quickly.",
      "Build trust in seconds.",
      "Support the quote request instead of distracting from it.",
    ],
    deliverablesTitle: "Typical design-led work",
    deliverables: [
      "Homepage repositioning",
      "Service page hierarchy",
      "Proof and trust blocks",
      "Form-first contact design",
      "Mobile-first cleanup",
    ],
    relatedSlugs: [
      "web-development",
      "web-development-agency",
      "service-business-web-development",
      "tourism-web-development",
    ],
    alternatePath: "/cr/diseno-web-costa-rica",
  }),
  createPage({
    slug: "why-costa-rica",
    title: "Why Work with a Costa Rica Web Team",
    description:
      "Why a Costa Rica-based web and software partner can be a strong fit for expats, foreign-owned businesses, and nearshore buyers.",
    keywords: ["why costa rica web development", "costa rica agency", "nearshore costa rica"],
    hero: {
      eyebrow: "Why Costa Rica",
      headline:
        "Costa Rica can be the right middle ground between local context and modern execution.",
      subheadline:
        "This page explains the strategic case for hiring a Costa Rica team instead of defaulting to the US or generic offshore options.",
    },
    intro:
      "This is a persuasion page for buyers already considering Costa Rica as a location signal and trying to decide whether the location is actually an advantage.",
    problemTitle: "Buyer uncertainty",
    problemPoints: [
      "Will quality feel too low compared to a US firm?",
      "Will communication be messy?",
      "Will the team understand the local market while still working at a high standard?",
    ],
    solutionTitle: "Why the location helps",
    solutionPoints: [
      "Local market context for Costa Rica businesses.",
      "Better timezone alignment for the Americas.",
      "A credible bridge between local execution and international-facing polish.",
    ],
    deliverablesTitle: "Reasons that matter",
    deliverables: [
      "Faster decision cycles",
      "Cleaner communication",
      "Better local relevance",
      "Stronger operational clarity",
      "A more grounded project scope",
    ],
    relatedSlugs: [
      "web-development",
      "web-development-agency",
      "real-estate-web-development",
      "tourism-web-development",
    ],
  }),
  createPage({
    slug: "request-a-quote",
    title: "Request a Website Quote in Costa Rica",
    description:
      "Request a quote for a website, redesign, or software project in Costa Rica. Get a clear email response with scope, timing, and next steps.",
    keywords: [
      "request a quote costa rica website",
      "website quote costa rica",
      "web development quote costa rica",
    ],
    hero: {
      eyebrow: "Request a Quote",
      headline: "The best next step is a cleaner quote request.",
      subheadline:
        "Share your business context and I will reply by email with a recommended direction, a budget range, and the next steps.",
      supportingText:
        "This page exists for buyers who want a more serious process than an open-ended WhatsApp thread.",
    },
    intro:
      "This is the strongest commercial-intent page in the English machine. It is built to turn interest into a qualified email conversation quickly.",
    problemTitle: "Why buyers prefer a form-first path",
    problemPoints: [
      "It gives enough context to scope properly.",
      "It makes follow-up easier to track by email.",
      "It avoids vague conversations that go nowhere.",
    ],
    solutionTitle: "What happens after submission",
    solutionPoints: [
      "A reply within 24 hours.",
      "A recommendation based on the business and the project type.",
      "A cleaner next step with timing and budget context.",
    ],
    deliverablesTitle: "Best information to send",
    deliverables: ["Business type", "Project type", "Main goal", "Budget range", "Ideal timeline"],
    relatedSlugs: [
      "web-development",
      "website-cost-costa-rica",
      "website-redesign-costa-rica",
      "lead-generation-websites-costa-rica",
    ],
    alternatePath: "/cr/cotizacion",
  }),
  createPage({
    slug: "website-cost-costa-rica",
    title: "How Much Does a Website Cost in Costa Rica",
    description:
      "Website cost guidance for Costa Rica businesses and foreign-owned companies. Understand what moves pricing and how to evaluate quotes without wasting money.",
    keywords: [
      "website cost costa rica",
      "how much does a website cost in costa rica",
      "web design pricing costa rica",
    ],
    hero: {
      eyebrow: "Website Cost Costa Rica",
      headline:
        "The question is not only how much a website costs. It is what the website actually does for the business.",
      subheadline:
        "This page exists to capture pricing objections and move the buyer toward a more grounded quote conversation.",
    },
    intro:
      "Many Costa Rica buyers, local and foreign, get stuck comparing a cheap template to a serious commercial website. That is the wrong comparison.",
    problemTitle: "Why pricing feels confusing",
    problemPoints: [
      "Cheap template sites get compared to strategy-led commercial builds.",
      "The buyer cannot see what good messaging, structure, and SEO change.",
      "There is fear of paying for a website that still does nothing.",
    ],
    solutionTitle: "How to evaluate cost better",
    solutionPoints: [
      "Define whether this is a first site, a redesign, or a growth system.",
      "Look at clarity, trust, and lead capture, not just visual polish.",
      "Ask for scope, timing, and deliverables, not just a number.",
    ],
    deliverablesTitle: "What usually changes pricing",
    deliverables: [
      "Page count",
      "Copy and positioning depth",
      "SEO support pages",
      "Special integrations",
      "Level of design customization",
    ],
    relatedSlugs: [
      "request-a-quote",
      "web-development",
      "website-redesign-costa-rica",
      "lead-generation-websites-costa-rica",
    ],
    alternatePath: "/cr/cuanto-cuesta-pagina-web",
  }),
  createPage({
    slug: "website-redesign-costa-rica",
    title: "Website Redesign Costa Rica",
    description:
      "Costa Rica website redesign for businesses that already have a site but need a stronger first impression, a clearer offer, and better lead capture.",
    keywords: [
      "website redesign costa rica",
      "redesign website costa rica",
      "improve business website costa rica",
    ],
    hero: {
      eyebrow: "Website Redesign Costa Rica",
      headline: "If the current website feels old, the business pays for that weakness every day.",
      subheadline:
        "This page is built for buyers who already have a website but know it does not support trust, positioning, or inquiry quality well enough.",
    },
    intro:
      "Redesign intent is strong because the buyer already believes the website matters. The page only has to show what better execution changes.",
    problemTitle: "Common redesign triggers",
    problemPoints: [
      "The site no longer reflects the level of the business.",
      "Visitors still ask basic questions the site should answer.",
      "The platform or structure makes future growth harder.",
    ],
    solutionTitle: "What redesign should improve",
    solutionPoints: [
      "Clearer positioning.",
      "Stronger visual trust.",
      "A cleaner path from traffic to quote request.",
    ],
    deliverablesTitle: "What gets reviewed",
    deliverables: [
      "Messaging and hierarchy",
      "Page architecture",
      "Design consistency",
      "Technical cleanup",
      "CTA and form flow",
    ],
    relatedSlugs: [
      "web-design",
      "website-cost-costa-rica",
      "request-a-quote",
      "lead-generation-websites-costa-rica",
    ],
    alternatePath: "/cr/rediseno-sitio-web",
  }),
  createPage({
    slug: "lead-generation-websites-costa-rica",
    title: "Lead Generation Websites Costa Rica",
    description:
      "Costa Rica websites built to create better inquiries by improving trust, offer clarity, and form-first conversion instead of just looking modern.",
    keywords: [
      "lead generation websites costa rica",
      "website that gets leads costa rica",
      "business website that gets clients costa rica",
    ],
    hero: {
      eyebrow: "Lead Generation Websites",
      headline:
        "A website does not generate leads by existing. It generates leads when it communicates well.",
      subheadline:
        "This page turns an abstract growth promise into something practical: better trust, better context, and a clearer quote path.",
    },
    intro:
      "Many buyers say they want more leads, but what they really need is a website that explains the offer fast, proves credibility, and makes inquiry easier.",
    problemTitle: "Why many sites fail to generate leads",
    problemPoints: [
      "The offer is unclear.",
      "Proof is weak or buried.",
      "The next step is vague or too informal.",
    ],
    solutionTitle: "What helps convert better",
    solutionPoints: [
      "Clear headline and offer framing.",
      "Proof and trust signals where they matter.",
      "A visible form that filters and qualifies inquiries.",
    ],
    deliverablesTitle: "Core conversion pieces",
    deliverables: [
      "Offer-led hero section",
      "Service detail blocks",
      "Trust and proof sections",
      "FAQ and objection handling",
      "Primary quote CTA",
    ],
    relatedSlugs: [
      "web-development",
      "request-a-quote",
      "website-cost-costa-rica",
      "service-business-web-development",
    ],
    alternatePath: "/cr/sitio-web-que-genere-clientes",
  }),
  createPage({
    slug: "expat-business-web-development",
    title: "Web Development for Expat and Foreign-Owned Businesses in Costa Rica",
    description:
      "Costa Rica web development for expat-led and foreign-owned businesses that want stronger communication, better quality, and local market context.",
    keywords: [
      "expat business web development costa rica",
      "foreign owned business website costa rica",
      "english web developer costa rica",
    ],
    hero: {
      eyebrow: "Expat and Foreign-Owned Businesses",
      headline:
        "Foreign-owned businesses in Costa Rica often need local context without sacrificing execution quality.",
      subheadline:
        "This page is for buyers who want English communication, a Costa Rica-based partner, and a cleaner commercial process than the local low-end agency market.",
    },
    intro:
      "This is one of the cleanest fits for the English machine because the buyer already wants Costa Rica, but still expects a professional process.",
    problemTitle: "What these buyers struggle with",
    problemPoints: [
      "Communication often feels too informal.",
      "Local agencies may not match the quality they need.",
      "The site has to work for both international and local customers.",
    ],
    solutionTitle: "What the offer gives them",
    solutionPoints: [
      "English-first communication.",
      "Costa Rica market context.",
      "Cleaner positioning and quote flow.",
    ],
    deliverablesTitle: "Typical needs",
    deliverables: [
      "Business website",
      "Service landing pages",
      "Positioning cleanup",
      "Quote form setup",
      "Bilingual-ready structure",
    ],
    relatedSlugs: [
      "web-development-agency",
      "why-costa-rica",
      "service-business-web-development",
      "request-a-quote",
    ],
  }),
  createPage({
    slug: "nearshore-web-development",
    title: "Nearshore Web Development Costa Rica",
    description:
      "Nearshore web development in Costa Rica for buyers who want timezone alignment, direct communication, and a stronger quality bar than low-end offshore teams.",
    keywords: [
      "nearshore web development costa rica",
      "costa rica nearshore development",
      "nearshore software costa rica",
    ],
    hero: {
      eyebrow: "Nearshore Costa Rica",
      headline: "Nearshore only matters if the communication and quality are actually better.",
      subheadline:
        "This page positions Costa Rica as a practical middle ground for buyers who want timezone alignment and cleaner execution without paying top-end US agency overhead.",
    },
    intro:
      "The nearshore angle is strategic, not buzzword-driven. Buyers searching this language are comparing delivery models, not just design styles.",
    problemTitle: "Why nearshore buyers hesitate",
    problemPoints: [
      "They worry Costa Rica might still feel too small or too informal.",
      "They need better communication than generic offshore outsourcing.",
      "They want a tighter process without bloated agency layers.",
    ],
    solutionTitle: "Why Costa Rica can fit",
    solutionPoints: [
      "Timezone alignment across the Americas.",
      "Local presence for Costa Rica market work.",
      "A founder-led execution model with less noise.",
    ],
    deliverablesTitle: "What nearshore buyers usually need",
    deliverables: [
      "Commercial website work",
      "Service page systems",
      "Portal or workflow builds",
      "Quote and intake flows",
      "Ongoing iteration without agency drag",
    ],
    relatedSlugs: [
      "why-costa-rica",
      "software-development",
      "web-development-agency",
      "expat-business-web-development",
    ],
  }),
  createPage({
    slug: "service-business-web-development",
    title: "Service Business Web Development Costa Rica",
    description:
      "Costa Rica web development for service businesses that need stronger positioning, better lead capture, and a more credible online presence.",
    keywords: [
      "service business web development costa rica",
      "small business website costa rica",
      "website for service company costa rica",
    ],
    hero: {
      eyebrow: "Service Businesses",
      headline: "Most service businesses do not need more complexity. They need more clarity.",
      subheadline:
        "This page targets service businesses that want a stronger first impression and a better path from traffic to inquiry.",
    },
    intro:
      "This is the broadest English vertical page because many foreign-owned Costa Rica businesses fall into service categories rather than product-heavy companies.",
    problemTitle: "Common commercial issues",
    problemPoints: [
      "The offer is hard to understand quickly.",
      "Proof is weak or invisible.",
      "The contact path is too informal or too vague.",
    ],
    solutionTitle: "What better pages do",
    solutionPoints: [
      "Clarify the offer quickly.",
      "Show trust and experience.",
      "Push the buyer into a cleaner quote form instead of endless back-and-forth.",
    ],
    deliverablesTitle: "Best-fit deliverables",
    deliverables: [
      "Service pages",
      "Proof and case-study sections",
      "Quote form flow",
      "Sector pages for SEO growth",
      "Technical cleanup for speed and clarity",
    ],
    relatedSlugs: [
      "web-development",
      "web-design",
      "web-development-agency",
      "healthcare-web-development",
    ],
    alternatePath: "/cr/negocios-servicios",
  }),
  createPage({
    slug: "real-estate-web-development",
    title: "Real Estate and Construction Web Development Costa Rica",
    description:
      "Costa Rica real estate and construction web development for businesses that need stronger trust, clearer project presentation, and better lead capture.",
    keywords: [
      "real estate web development costa rica",
      "construction website costa rica",
      "property web design costa rica",
    ],
    hero: {
      eyebrow: "Real Estate and Construction",
      headline: "Real estate businesses lose trust fast when the website feels improvised.",
      subheadline:
        "Built for developers, agencies, and construction-adjacent businesses that need stronger online presentation in Costa Rica.",
    },
    intro:
      "The offer is built around proof, listing clarity, and lead capture for serious property inquiries rather than casual browsing.",
    problemTitle: "What goes wrong",
    problemPoints: [
      "Projects and listings are hard to understand.",
      "The brand does not look established enough.",
      "Leads come in without enough context or not at all.",
    ],
    solutionTitle: "What the site should do",
    solutionPoints: [
      "Show projects clearly.",
      "Build trust with presentation and structure.",
      "Move buyers into an inquiry form with less friction.",
    ],
    deliverablesTitle: "Useful features",
    deliverables: [
      "Project pages",
      "Service and developer pages",
      "Inquiry forms",
      "Proof and credibility blocks",
      "SEO-ready page structure",
    ],
    relatedSlugs: ["web-development", "web-design", "why-costa-rica", "software-development"],
    alternatePath: "/cr/constructoras",
  }),
  createPage({
    slug: "healthcare-web-development",
    title: "Healthcare Web Development Costa Rica",
    description:
      "Costa Rica healthcare web development for clinics, practices, and health businesses that need trust, clarity, and a better patient inquiry flow.",
    keywords: [
      "healthcare web development costa rica",
      "clinic website costa rica",
      "medical website costa rica",
    ],
    hero: {
      eyebrow: "Healthcare",
      headline: "Healthcare buyers decide trust before they decide contact.",
      subheadline:
        "This page supports clinics and health businesses that need a cleaner, more credible online presence in Costa Rica.",
    },
    intro:
      "The emphasis here is trust, service clarity, and better inquiry flow instead of flashy design or vague tech language.",
    problemTitle: "Where these sites usually fail",
    problemPoints: [
      "Weak first impression.",
      "Poor service explanation.",
      "No obvious next step for an inquiry or appointment request.",
    ],
    solutionTitle: "What better execution looks like",
    solutionPoints: [
      "Simple and credible structure.",
      "Service explanation that feels easier to trust.",
      "A form path that filters and qualifies inquiries better.",
    ],
    deliverablesTitle: "Typical page system",
    deliverables: [
      "Specialty pages",
      "FAQ blocks",
      "Provider or clinic profile sections",
      "Inquiry or appointment forms",
      "Mobile-first trust signals",
    ],
    relatedSlugs: [
      "web-development",
      "software-development",
      "service-business-web-development",
      "why-costa-rica",
    ],
    alternatePath: "/cr/clinicas",
  }),
  createPage({
    slug: "tourism-web-development",
    title: "Tourism and Hospitality Web Development Costa Rica",
    description:
      "Costa Rica tourism web development for hotels, tours, and hospitality businesses that need clearer presentation and stronger inquiry or booking intent.",
    keywords: [
      "tourism web development costa rica",
      "hotel website costa rica",
      "tour company web design costa rica",
    ],
    hero: {
      eyebrow: "Tourism and Hospitality",
      headline: "Tourism websites have to sell trust and clarity before the guest asks a question.",
      subheadline:
        "Built for hotels, tours, and hospitality businesses that need stronger presentation for international and local buyers alike.",
    },
    intro:
      "This page captures English demand from tourism operators, lodge owners, and expat-owned hospitality businesses in Costa Rica.",
    problemTitle: "Why this vertical struggles",
    problemPoints: [
      "Important information is scattered.",
      "The presentation does not support premium positioning.",
      "Visitors cannot easily move from interest to inquiry.",
    ],
    solutionTitle: "What the site should improve",
    solutionPoints: [
      "Better package or experience presentation.",
      "Clear inquiry or availability flow.",
      "More confidence for international visitors evaluating the business online.",
    ],
    deliverablesTitle: "Useful hospitality blocks",
    deliverables: [
      "Rooms, tours, or package pages",
      "Gallery-led storytelling",
      "FAQ for buyer hesitation",
      "Quote or booking inquiry forms",
      "Mobile-friendly trust flow",
    ],
    relatedSlugs: [
      "web-design",
      "web-development",
      "why-costa-rica",
      "service-business-web-development",
    ],
    alternatePath: "/cr/turismo",
  }),
];
