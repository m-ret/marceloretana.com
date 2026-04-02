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
  title: "Web Development Costa Rica | Design, Nearshore, and Agency Services",
  description:
    "Costa Rica web development, web design, and nearshore software services by Marcelo Retana. 10+ years building websites for foreign-owned businesses, expats, and US companies that want a reliable local partner.",
  keywords: [
    "web development costa rica",
    "web design costa rica",
    "web development agency costa rica",
    "nearshore web development costa rica",
    "website design costa rica",
    "costa rica web developer",
    "hire web developer costa rica",
    "software development costa rica",
    "expat business website costa rica",
    "foreign owned business website costa rica",
    "english web developer costa rica",
    "nearshore software costa rica",
    "costa rica web agency",
    "website development costa rica",
  ],
  hero: {
    eyebrow: "Web Development Costa Rica",
    headline:
      "Costa Rica web development and design for businesses that need more than a template and a prayer.",
    subheadline:
      "I am Marcelo Retana, a senior developer based in Costa Rica with 10+ years of experience at IBM, Universal Music, and Provectus. I build websites, web applications, and design systems for foreign-owned businesses, expats, and US companies that want local presence with international execution quality.",
    supportingText:
      "Whether you need a full website build, a redesign that actually improves your business positioning, or a nearshore development partner who communicates clearly in English, this is the place to start.",
  },
  intro:
    "Most businesses searching for web development in Costa Rica run into two problems. The local agency market is flooded with cheap template work that makes your company look worse than it is. And offshore options feel disconnected from the Costa Rica market you actually operate in. I work at the intersection: Costa Rica-based, English-first, technically senior, and focused on building websites that help businesses earn trust, explain their offer, and convert visitors into qualified inquiries. This page covers everything from web development and web design to nearshore partnerships and working with foreign-owned businesses in Costa Rica.",
  proof: [
    {
      metric: "10+ years",
      title: "Senior execution, not junior handoffs",
      description:
        "Marcelo Retana has built products at IBM, Universal Music, Provectus, and Univision. The work here is founder-led and technically senior from day one.",
    },
    {
      metric: "English-first",
      title: "Clearer communication from the first email",
      description:
        "The entire process runs in English. No translation layers, no misinterpretations, no waiting for someone who actually understands the brief.",
    },
    {
      metric: "Costa Rica-based",
      title: "Local market context with international standards",
      description:
        "Based in Puerto Jimenez, Costa Rica. Close enough to understand the market, experienced enough to build at the level foreign-owned businesses expect.",
    },
    {
      metric: "600+",
      title: "Projects delivered across industries",
      description:
        "The work spans commercial websites, web applications, design systems, and lead-generation platforms for businesses in real estate, healthcare, tourism, and professional services.",
    },
    {
      metric: "Founder-led",
      title: "GEXP Software, not an agency assembly line",
      description:
        "You work directly with the person who builds, designs, and ships. No account managers, no middlemen, no surprise subcontractors.",
    },
  ],
  faq: [
    {
      question: "Do you work with foreign-owned businesses in Costa Rica?",
      answer:
        "Yes. Foreign-owned businesses and expat-led companies are one of the strongest fits for this offer. You get Costa Rica market context, English-first communication, and execution quality that matches what you are used to internationally.",
    },
    {
      question: "What is the difference between web development and web design in your work?",
      answer:
        "Web development covers the full build: architecture, code, performance, integrations, and deployment. Web design focuses on how the site looks, feels, and communicates trust. Most projects here include both because a well-designed site still needs solid development underneath, and a well-built site still needs to look credible.",
    },
    {
      question: "How does nearshore development with you work compared to a US agency?",
      answer:
        "You get the same timezone overlap, clearer communication than most offshore setups, and significantly lower overhead than a US agency. The difference is that I work directly with you instead of passing your project through layers of account managers and junior developers.",
    },
    {
      question: "Can you work as an agency-style partner for ongoing projects?",
      answer:
        "Yes. Some clients start with a single website build and evolve into ongoing work: new service pages, design iterations, SEO expansion, or technical improvements. The engagement model adapts to what the business actually needs.",
    },
    {
      question: "Is this only for software projects?",
      answer:
        "No. Many projects start with a business website, a redesign, or a lead-generation system. Software and web application work is available for businesses that need portals, custom workflows, or product-level builds.",
    },
    {
      question: "Why should I choose a Costa Rica-based developer over a cheaper offshore option?",
      answer:
        "Cheaper offshore options often mean weaker communication, less understanding of your market, and more rework. A Costa Rica-based developer gives you local context for the market you operate in, timezone alignment across the Americas, and a more direct working relationship.",
    },
    {
      question: "What does a typical web project cost?",
      answer:
        "It depends on scope. A focused business website with strong messaging and a quote flow is a different investment than a multi-page system with SEO, integrations, and sector landing pages. The quote process starts with a form so I can recommend the right scope before we talk numbers.",
    },
    {
      question: "Do you build websites for businesses outside Costa Rica?",
      answer:
        "Yes. Nearshore clients in the US and Latin America work with me for the timezone alignment, communication quality, and technical execution. The Costa Rica base is an advantage, not a limitation.",
    },
  ],
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
      eyebrow: "Web Development",
      title:
        "Costa Rica web development that goes beyond templates and delivers real business results.",
      body: "I build fast, polished websites and web applications for businesses that need their online presence to actually work. That means clean architecture, strong performance, clear messaging, and a site structure that supports growth. Most clients come to me after a bad experience with a cheap local build or a disconnected offshore team. The work here starts with understanding the business problem, not jumping to a tech stack.",
      points: [
        "Full website builds from architecture to deployment.",
        "Modern frameworks with strong performance and SEO foundations.",
        "Service pages, landing pages, and lead-generation systems that convert.",
        "Technical cleanup and migration for businesses stuck on outdated platforms.",
      ],
    },
    {
      eyebrow: "Web Design",
      title:
        "Web design that builds trust in seconds, not decoration that looks nice but converts nothing.",
      body: "If the website looks weak, the business feels weaker than it actually is. Good web design in Costa Rica is not about visual trends. It is about making the business easier to understand, easier to trust, and easier to contact. I approach design as a commercial tool: clear hierarchy, strong proof sections, and a visual language that supports the quote request instead of distracting from it.",
      points: [
        "Design that communicates positioning and credibility fast.",
        "Mobile-first layouts because that is where most traffic actually comes from.",
        "Proof blocks, trust signals, and social proof placed where they matter.",
        "Visual consistency that makes the business feel established and serious.",
      ],
    },
    {
      eyebrow: "Nearshore Development",
      title:
        "Nearshore Costa Rica development for US and international companies that want a better working model.",
      body: "Nearshore only matters if communication and quality are actually better than the alternative. Costa Rica offers timezone alignment across the Americas, a stable business environment, and strong English proficiency. What I add on top of that is senior technical execution, a founder-led model with zero agency overhead, and a track record that includes IBM, Universal Music, and multiple US-facing products. You talk to the person who builds.",
      points: [
        "Same-day timezone overlap with US East and Central time.",
        "Direct communication with the lead developer, not account managers.",
        "Lower overhead than US agencies without the quality tradeoffs of cheap offshore.",
        "Ongoing iteration and support without bloated retainer contracts.",
      ],
    },
    {
      eyebrow: "Foreign-Owned Businesses",
      title:
        "Built for expats and foreign-owned companies that need Costa Rica context without sacrificing execution quality.",
      body: "Foreign-owned businesses in Costa Rica face a specific problem: the local agency market often does not match the execution standard they expect, and hiring remotely from abroad means losing local market context. I bridge that gap. I am Costa Rican, I communicate entirely in English, and I understand what foreign-owned businesses need because I have worked with international companies for over a decade. Whether you run a service business, a hospitality operation, or a professional practice, the website should work for both your international standards and your Costa Rica audience.",
      points: [
        "English-first process built for foreign business owners and operators.",
        "Websites that work for both Costa Rica locals and international visitors.",
        "Bilingual-ready architecture for businesses that serve both markets.",
        "A partner who understands both the local context and international expectations.",
      ],
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
