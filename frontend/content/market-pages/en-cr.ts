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
      "Useful for foreign-owned businesses, expats, and nearshore teams that want Costa Rica market context without low-end agency quality.",
  },
  {
    metric: "10+ years",
    title: "Senior execution",
    description:
      "Marcelo Retana has spent more than a decade building products, websites, and business systems that have to work in the real world.",
  },
  {
    metric: "600+",
    title: "Projects shipped",
    description:
      "The offer is founder-led, fast-moving, and built around clear communication instead of agency layers and vague process.",
  },
];

const sharedFaq: MarketFaq[] = [
  {
    question: "Do you work with foreign-owned businesses in Costa Rica?",
    answer:
      "Yes. I work with expats, foreign-owned businesses, and Costa Rica teams that want clearer communication in English and a more reliable delivery process.",
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
    "Costa Rica-based web development, web design, and software execution for expats, foreign-owned businesses, and nearshore teams that want a stronger local partner.",
  keywords: [
    "web development costa rica",
    "web development agency costa rica",
    "software development costa rica",
  ],
  hero: {
    eyebrow: "Costa Rica",
    headline:
      "A Costa Rica-based web and software partner for businesses that want clarity and execution.",
    subheadline:
      "Built for expats, foreign-owned businesses, and nearshore teams that want local presence, stronger quality, and a cleaner form-first process.",
    supportingText:
      "Work with someone in Costa Rica who can communicate clearly in English, move fast, and build something that feels serious from the first impression.",
  },
  intro:
    "This hub is for foreign-owned businesses, expats, and English-speaking teams that want a serious Costa Rica partner without falling into low-end local agency quality or vague offshore execution. Start with the page that matches what you are actually buying: a website, an agency-style partner, a quote, clearer pricing, or a more local execution model.",
  proof: [
    {
      metric: "English-first",
      title: "Clearer communication from day one",
      description:
        "The offer is built for buyers who want Costa Rica context without having to decode messy process or weak delivery language.",
    },
    {
      metric: "Founder-led",
      title: "Less agency drag",
      description:
        "This is meant to feel more direct and more senior than the low-end agency market most foreign-owned businesses run into first.",
    },
    {
      metric: "Quote process",
      title: "A cleaner path into scope and follow-up",
      description:
        "The site pushes toward a form-first quote flow because that produces better commercial conversations than a loose WhatsApp thread.",
    },
  ],
  faq: sharedFaq,
  cta: defaultCta,
  featuredLinks: [
    { label: "Cost", slug: "website-cost" },
    { label: "Lead Generation", slug: "lead-generation" },
    { label: "Real Estate", slug: "real-estate" },
    { label: "Healthcare", slug: "healthcare" },
    { label: "Tourism", slug: "tourism" },
    { label: "Redesign", slug: "redesign" },
    { label: "Quote", slug: "quote" },
  ],
  caseProofIds: ["gexp", "unicorn", "avodah"],
  narrativeSections: [
    {
      eyebrow: "Who this is for",
      title:
        "This lane is built for buyers who need Costa Rica context without sacrificing quality.",
      body: "A lot of foreign-owned businesses in Costa Rica want the same mix: local understanding, English communication, cleaner execution, and a website that does not look like a cheap local template. That is the gap this lane is meant to cover.",
      points: [
        "English-speaking owners and operators in Costa Rica.",
        "Foreign-owned service businesses that need a better website.",
        "Nearshore buyers who want a more direct partner.",
      ],
    },
    {
      eyebrow: "How to use it",
      title: "Pick the page that matches the buying decision you are making.",
      body: "If you need the main service page, start with web development. If you are comparing agency-style partners, start with the agency page. If you are trying to understand cost, go to pricing. If you are already close to buying, go straight to the quote page.",
    },
  ],
  alternatePath: "/es",
};

export const enCrMarketPages: MarketPage[] = [
  createPage({
    slug: "quote",
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
      headline: "Tell me what you need and I will send a clear quote.",
      subheadline:
        "If you need a new website, a redesign, or a custom build in Costa Rica, share the project context and I will reply by email with a recommendation, budget range, and next steps.",
      supportingText:
        "Start with the form if you want the conversation to stay organized from the first reply.",
    },
    intro:
      "A good quote request saves time on both sides. It gives enough context to recommend the right direction, set expectations early, and keep the conversation organized by email instead of scattering decisions across a loose chat thread.",
    proof: [
      {
        metric: "24 hours",
        title: "Fast response, better context",
        description:
          "The goal is a useful first reply with direction, not a generic acknowledgement and a vague promise to talk later.",
      },
      {
        metric: "Email-first",
        title: "Cleaner follow-up",
        description:
          "The commercial process stays easier to track when scope, budget, and next steps start in email.",
      },
      {
        metric: "Qualified",
        title: "A better start to scope",
        description:
          "The form helps filter the project before time is wasted on the wrong conversation.",
      },
    ],
    caseProofIds: ["gexp", "unicorn"],
    narrativeSections: [
      {
        eyebrow: "Why this matters",
        title: "A serious quote starts with enough context to make a real recommendation.",
        body: "If the only thing someone sends is 'I need a website,' the first response is usually weak. A stronger intake lets the recommendation include scope, likely budget range, and the next useful step instead of guesswork.",
      },
      {
        eyebrow: "What to include",
        title: "You do not need a technical brief. You need business context.",
        body: "Explain the business, the main goal, what feels broken now, and what kind of result would make the project worthwhile. That is enough to start a much better conversation.",
      },
    ],
    problemTitle: "Why a form-first path works better",
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
    relatedSlugs: ["website-cost", "redesign", "lead-generation", "real-estate"],
    alternatePath: "/es/cotizacion",
  }),
  createPage({
    slug: "website-cost",
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
        "Website pricing makes more sense when you look at what needs to be built, how clearly the business needs to communicate, and what should happen after someone lands on the site.",
    },
    intro:
      "Many businesses compare a cheap template to a serious commercial website as if they were the same product. They are not. The real price difference is in clarity, trust, conversion, and how much the site helps the business after launch instead of just existing online.",
    proof: [
      {
        metric: "Cost vs value",
        title: "The expensive mistake is paying for a site that still does nothing",
        description:
          "A lower upfront price means very little if the website fails to improve trust, message clarity, or inquiry quality.",
      },
      {
        metric: "Scope",
        title: "Pricing follows the commercial job",
        description:
          "A basic presence, a redesign, and a lead-generation system are different deliverables. They should not be compared like one flat commodity.",
      },
      {
        metric: "Proposal",
        title: "A better quote explains what moves the price",
        description:
          "Page count, messaging depth, design quality, SEO support, and intake flow all materially change the scope.",
      },
    ],
    caseProofIds: ["gexp", "avodah"],
    narrativeSections: [
      {
        eyebrow: "Why buyers get stuck here",
        title: "Most pricing confusion comes from comparing unlike things.",
        body: "One quote may cover a simple brochure site. Another may cover offer strategy, page architecture, trust building, SEO support, and a quote flow. If those two offers are compared only by price, the decision gets distorted fast.",
      },
      {
        eyebrow: "How to compare properly",
        title: "Compare how much business clarity you get, not just how many pages.",
        body: "The useful questions are whether the site will improve positioning, make the business easier to understand, and produce better inquiries. Those are the factors that change the real value of the work.",
      },
    ],
    problemTitle: "Why pricing feels confusing",
    problemPoints: [
      "Cheap template sites get compared to serious business websites.",
      "The buyer cannot see what good messaging, structure, and SEO change.",
      "There is fear of paying for a website that still does nothing.",
    ],
    solutionTitle: "How to evaluate cost better",
    solutionPoints: [
      "Define whether this is a first site, a redesign, or a growth system.",
      "Look at clarity, trust, and quote flow, not just visual polish.",
      "Ask for scope, timing, and deliverables, not just a number.",
    ],
    deliverablesTitle: "What usually changes pricing",
    deliverables: [
      "Page count",
      "Copy and messaging depth",
      "SEO support pages",
      "Special integrations",
      "Level of design customization",
    ],
    relatedSlugs: ["quote", "redesign", "lead-generation"],
    alternatePath: "/es/cuanto-cuesta",
  }),
  createPage({
    slug: "redesign",
    title: "Website Redesign Costa Rica",
    description:
      "Costa Rica website redesign for businesses that already have a site but need a stronger first impression, a clearer offer, and a better quote flow.",
    keywords: [
      "website redesign costa rica",
      "redesign website costa rica",
      "improve business website costa rica",
    ],
    hero: {
      eyebrow: "Website Redesign Costa Rica",
      headline: "If the current website feels old, the business pays for that weakness every day.",
      subheadline:
        "For businesses that already have a website but know it does not support trust, clarity, or inquiry quality well enough.",
    },
    intro:
      "A redesign matters when the current site no longer reflects the level of the business. Better structure, stronger messaging, and cleaner design can change how seriously people take the company.",
    problemTitle: "Common redesign triggers",
    problemPoints: [
      "The site no longer reflects the level of the business.",
      "Visitors still ask basic questions the site should answer.",
      "The platform or structure makes future growth harder.",
    ],
    solutionTitle: "What redesign should improve",
    solutionPoints: [
      "Clearer offer and message.",
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
    relatedSlugs: ["website-cost", "quote", "lead-generation"],
    alternatePath: "/es/rediseno",
  }),
  createPage({
    slug: "lead-generation",
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
        "The goal is practical: stronger trust, clearer context, and an easier path to a serious quote request.",
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
    relatedSlugs: ["quote", "website-cost", "redesign"],
    alternatePath: "/es/generar-clientes",
  }),
  createPage({
    slug: "real-estate",
    title: "Real Estate and Construction Web Development Costa Rica",
    description:
      "Costa Rica real estate and construction web development for businesses that need stronger trust, clearer project presentation, and better inquiry flow.",
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
      "Real estate and construction sites work best when projects are easy to review, the business feels established, and inquiry forms bring in more serious opportunities.",
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
    relatedSlugs: ["healthcare", "tourism", "website-cost", "quote"],
    alternatePath: "/es/constructoras",
  }),
  createPage({
    slug: "healthcare",
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
        "For clinics and health businesses that need a cleaner, more credible online presence in Costa Rica.",
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
    relatedSlugs: ["real-estate", "tourism", "lead-generation", "quote"],
    alternatePath: "/es/clinicas",
  }),
  createPage({
    slug: "tourism",
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
      "Tourism businesses need websites that help guests trust the experience quickly, understand what is offered, and move toward an inquiry or booking without friction.",
    problemTitle: "Why this sector struggles",
    problemPoints: [
      "Important information is scattered.",
      "The presentation does not support a premium first impression.",
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
    relatedSlugs: ["real-estate", "healthcare", "lead-generation", "quote"],
    alternatePath: "/es/turismo",
  }),
];
