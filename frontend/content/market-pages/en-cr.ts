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
    "Costa Rica web development and design by Marcelo Retana. 10+ years building websites for foreign-owned businesses, expats, and US companies. Request a quote today.",
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
    title: "Website Quote Costa Rica | Get a Clear Proposal Fast",
    description:
      "Request a website quote in Costa Rica from a senior developer with 10+ years of experience. Get scope, timeline, and budget range by email within 24 hours.",
    keywords: [
      "request a quote costa rica website",
      "website quote costa rica",
      "web development quote costa rica",
    ],
    hero: {
      eyebrow: "Request a Quote",
      headline: "Get a Website Quote in Costa Rica With Scope, Timeline, and Budget in One Reply",
      subheadline:
        "Share your project context and I will reply by email with a recommendation, budget range, and clear next steps. No sales calls, no chasing.",
      supportingText:
        "Start with the form if you want the conversation to stay organized from the first reply.",
    },
    intro:
      "Requesting a website quote in Costa Rica should not mean sitting through a sales pitch or waiting a week for a vague number. Share the business context here and I will reply within 24 hours with a useful recommendation, a realistic budget range, and next steps you can actually act on.",
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
    faq: [
      {
        question: "What happens after I submit the form?",
        answer:
          "You get an email reply within 24 hours. That reply includes a project recommendation, estimated budget range, and a suggested next step. There is no sales funnel or auto-sequence -- just a direct response from the person who would actually build the project.",
      },
      {
        question: "How fast will I hear back?",
        answer:
          "Within one business day. Most replies go out the same day. The response is not a template -- it is written after reviewing what you described, so it takes a bit longer than an auto-responder but it is actually useful.",
      },
      {
        question: "Do I need to know exactly what I want before requesting a quote?",
        answer:
          "No. Most people know the problem but not the solution, and that is fine. If you can explain what the business does, what feels broken about the current site or lack of one, and what a good outcome would look like, that is more than enough to start a useful conversation.",
      },
      {
        question: "Is there a cost for the initial consultation?",
        answer:
          "No. The first response and any initial scoping conversation are free. You only pay once we agree on a project scope and you decide to move forward. There is no pressure to commit from a form submission.",
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
    title: "Website Cost in Costa Rica | What You Actually Pay For",
    description:
      "Understand website cost in Costa Rica before you request a quote. See what moves pricing, what separates a $500 site from a $5,000 one, and how to evaluate proposals.",
    keywords: [
      "website cost costa rica",
      "how much does a website cost in costa rica",
      "web design pricing costa rica",
    ],
    hero: {
      eyebrow: "Website Cost Costa Rica",
      headline:
        "Website Cost in Costa Rica: What Separates a Site That Works From One That Just Exists",
      subheadline:
        "Website pricing makes more sense when you look at what needs to be built, how clearly the business needs to communicate, and what should happen after someone lands on the site.",
    },
    intro:
      "Website cost in Costa Rica ranges from a few hundred dollars for a template install to several thousand for a site that actually positions the business, builds trust, and drives inquiries. The difference is not just visual polish -- it is whether the site helps you close business after launch or just sits there looking decent.",
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
    faq: [
      {
        question: "What affects the price of a website in Costa Rica?",
        answer:
          "Four things move the price more than anything else: the number of unique pages, the depth of messaging and copywriting work, the level of design customization, and whether the site includes SEO structure, integrations, or a lead-capture flow. A five-page brochure site with stock copy is a fundamentally different project than a twenty-page site with custom messaging, proof sections, and an intake form.",
      },
      {
        question: "Is a $500 website the same as a $5,000 one?",
        answer:
          "No, and the difference is not just how it looks. A $500 site is usually a template with your logo dropped in and generic copy. A $5,000 site includes strategic messaging, a page structure built for how people actually buy, trust-building sections, and a conversion path that turns visitors into real inquiries. The cheaper site exists online. The better one works for the business.",
      },
      {
        question: "Do I pay everything upfront?",
        answer:
          "No. Projects typically split into a deposit to start and a final payment at launch. For larger builds, we can add a mid-project milestone. The exact split depends on scope, and it is always defined before work starts so there are no surprises.",
      },
      {
        question: "What is included in the price?",
        answer:
          "Every proposal includes a clear deliverables list. The base always covers design, development, and deployment. Depending on scope, it may also include copywriting, SEO page structure, form setup, analytics integration, and a round of revisions. Nothing is hidden -- if it is not on the list, you are not paying for it.",
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
    title: "Website Redesign Costa Rica | Fix What's Costing You Clients",
    description:
      "Website redesign in Costa Rica for businesses whose current site undermines trust and loses inquiries. Stronger messaging, modern design, and a real conversion path.",
    keywords: [
      "website redesign costa rica",
      "redesign website costa rica",
      "improve business website costa rica",
    ],
    hero: {
      eyebrow: "Website Redesign Costa Rica",
      headline: "Website Redesign in Costa Rica That Fixes What's Costing You Clients Every Day",
      subheadline:
        "For businesses that already have a website but know it undermines trust, buries the offer, and makes serious buyers leave without reaching out.",
    },
    intro:
      "A website redesign in Costa Rica is not about making things prettier -- it is about fixing the gap between how good the business actually is and how weak the site makes it look. If your current site does not clearly explain what you do, prove you are credible, and give visitors a reason to contact you, the redesign pays for itself in recovered opportunities.",
    narrativeSections: [
      {
        eyebrow: "When it is time",
        title:
          "The site stopped matching the business two years ago and you feel it in every conversation.",
        body: "Most redesign clients share the same story: the business has grown, the offer has sharpened, but the website still looks like version one. Visitors who find you through referrals or search see a site that does not match the quality of work you actually deliver. That disconnect costs you trust before the first email.",
        points: [
          "The site looks dated compared to competitors.",
          "Visitors ask questions the homepage should already answer.",
          "The design works on desktop but breaks on mobile.",
          "You avoid sending people to the site because it misrepresents the business.",
        ],
      },
      {
        eyebrow: "What changes",
        title: "A redesign is not a coat of paint. It is a new commercial system.",
        body: "The real deliverable is a site that earns trust faster, explains the offer in the first scroll, and gives visitors a clear path to contact you. That means rewriting the messaging, restructuring the pages around how people actually buy, and building a design that feels as established as the business behind it.",
        points: [
          "Rewritten hero and offer messaging.",
          "Page architecture built around conversion, not decoration.",
          "Trust signals and proof placed where buyers hesitate.",
          "A visible quote or inquiry path on every key page.",
        ],
      },
    ],
    faq: [
      {
        question: "How do I know my site needs a redesign?",
        answer:
          "Three reliable signals: you feel embarrassed sending people to the site, visitors frequently ask questions the site should answer, or the site has not been updated in more than two years while the business has evolved. If any of those are true, the site is actively working against you.",
      },
      {
        question: "Will I lose my Google rankings during a redesign?",
        answer:
          "Not if the migration is handled properly. I set up proper URL redirects, preserve existing page authority, and maintain SEO-critical elements like title tags, meta descriptions, and heading structure. Most clients see rankings improve after a redesign because the new site is faster, better structured, and more relevant.",
      },
      {
        question: "How long does a website redesign take?",
        answer:
          "Most redesign projects take four to eight weeks depending on scope. A focused five-page business site can be done in four weeks. A larger site with multiple service pages, new copy, and integrations may take six to eight. I give you a timeline before work starts and stick to it.",
      },
      {
        question: "Can you keep my current content and just improve the design?",
        answer:
          "Yes, but I will tell you honestly if the content is part of the problem. In most cases, the messaging needs at least a rewrite of headlines and key sections to match the new design. I can work with what you have and improve it, or write new copy from scratch if that is what the project needs.",
      },
    ],
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
    title: "Lead Generation Websites Costa Rica | Sites That Convert",
    description:
      "Lead generation websites in Costa Rica built to convert visitors into qualified inquiries. Clear messaging, trust signals, and form-first design by a senior developer.",
    keywords: [
      "lead generation websites costa rica",
      "website that gets leads costa rica",
      "business website that gets clients costa rica",
    ],
    hero: {
      eyebrow: "Lead Generation Websites",
      headline:
        "Lead Generation Websites in Costa Rica That Turn Visitors Into Qualified Inquiries",
      subheadline:
        "The goal is practical: stronger trust, clearer context, and an easier path from first visit to serious quote request.",
    },
    intro:
      "A lead generation website in Costa Rica does not work by looking modern -- it works by communicating clearly. If the offer is hard to understand, the proof is buried, and the next step is a WhatsApp number, you are losing the visitors who would have been your best clients.",
    narrativeSections: [
      {
        eyebrow: "Why most sites fail here",
        title: "Traffic is not the problem. The site is leaking the visitors you already have.",
        body: "Most businesses that say they need more leads actually have a conversion problem, not a traffic problem. Visitors land on the site, scan for ten seconds, and leave because the offer is unclear, trust is missing, or there is no obvious next step. Fixing those three things changes the math without spending more on ads.",
        points: [
          "The hero section does not explain what you do in one scroll.",
          "There is no proof section visible before the fold.",
          "The only CTA is a buried contact page or a phone number.",
          "Mobile visitors see a worse version of an already unclear message.",
        ],
      },
      {
        eyebrow: "What a lead generation site actually needs",
        title: "Clear offer, visible proof, and a form that qualifies instead of just collecting.",
        body: "A site that generates leads has three jobs: explain the offer fast, prove the business is credible, and make it easy to take the next step. That means a strong hero, trust-building sections where buyers hesitate, and a form that collects enough context to start a real conversation instead of just an email address.",
        points: [
          "Offer-led hero with a clear headline and CTA.",
          "Proof blocks and case studies placed at decision points.",
          "An intake form that pre-qualifies the inquiry.",
          "Service pages that answer objections before they are asked.",
        ],
      },
    ],
    faq: [
      {
        question: "What makes a website generate leads?",
        answer:
          "Three things: a clear offer that visitors understand in seconds, proof that the business is credible and experienced, and a visible next step that makes it easy to reach out. Most sites fail at all three. Fixing them -- in that order -- is what turns a brochure site into a lead generation system.",
      },
      {
        question: "How long before I see results from a new lead generation site?",
        answer:
          "If you already have traffic, improvements show within weeks of launch because you are converting visitors who were already there. If the site also needs SEO work to attract new traffic, meaningful organic results typically take three to six months. Paid traffic can produce leads much faster if the site is ready to convert.",
      },
      {
        question: "Do you set up the forms and tracking?",
        answer:
          "Yes. Every lead generation project includes form setup, email notifications, and basic analytics tracking. If you need CRM integration, UTM parameter capture, or conversion event tracking for ad platforms, that is part of the scope discussion and gets built into the project.",
      },
      {
        question: "What if I already have a site but it does not convert?",
        answer:
          "That is the most common starting point. Sometimes the fix is a focused redesign of the homepage and key landing pages. Other times the messaging needs a full rewrite. I review what you have, identify where visitors are dropping off, and recommend the smallest scope that will make the biggest difference.",
      },
    ],
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
    title: "Real Estate Web Development Costa Rica | Sites Buyers Trust",
    description:
      "Real estate web development in Costa Rica for developers, agencies, and construction firms. Project galleries, inquiry forms, and trust-building design that closes.",
    keywords: [
      "real estate web development costa rica",
      "construction website costa rica",
      "property web design costa rica",
    ],
    hero: {
      eyebrow: "Real Estate and Construction",
      headline:
        "Real Estate Web Development in Costa Rica That Makes Projects Sell, Not Just Display",
      subheadline:
        "Built for developers, agencies, and construction firms that need their online presence to match the quality of what they are building on the ground.",
    },
    intro:
      "Real estate web development in Costa Rica has a specific challenge: buyers are making high-stakes decisions based on what they see online, often before they ever visit a property. If the site looks improvised, the projects look risky -- regardless of how good the actual build quality is.",
    narrativeSections: [
      {
        eyebrow: "The real estate problem",
        title:
          "Your projects are worth millions but your website looks like it was built in a weekend.",
        body: "In Costa Rica real estate, international buyers often discover projects online first. They compare your site to competitors in seconds. If yours has blurry renders, scattered information, and no clear way to inquire, they move on to the developer whose site feels more professional. The project quality does not matter if the site never earns enough trust for the buyer to reach out.",
        points: [
          "International buyers judge the project by the site quality.",
          "Scattered listings with inconsistent information lose serious inquiries.",
          "No gallery or project detail page means no way to evaluate remotely.",
          "Generic contact forms collect noise instead of qualified leads.",
        ],
      },
      {
        eyebrow: "What works",
        title:
          "Project pages that answer every question a buyer has before they pick up the phone.",
        body: "The best real estate sites in Costa Rica work like a showroom: each project has its own page with gallery, floor plans, location context, pricing indicators, and a direct inquiry form. The homepage positions the developer as credible and experienced. Service pages explain the process. The result is fewer tire-kicker inquiries and more conversations with serious buyers.",
        points: [
          "Dedicated project landing pages with gallery and specs.",
          "Developer credibility section with track record and proof.",
          "Location-aware content that helps international buyers understand the market.",
          "Inquiry forms that capture project interest and buyer context.",
        ],
      },
    ],
    faq: [
      {
        question: "Can you integrate MLS listings into the site?",
        answer:
          "Yes, depending on which MLS or listing service you use. I can integrate feeds from common Costa Rica real estate platforms and US-facing MLS systems. For clients who manage their own inventory, I build a project management structure that is easier to update than a third-party listing tool and gives you full control over presentation.",
      },
      {
        question: "Do you build individual property gallery pages?",
        answer:
          "Yes, and they are one of the most important parts of a real estate site. Each project or property gets its own page with photo gallery, specifications, floor plans if available, location context, and a direct inquiry form. These pages do the selling work before the phone call happens.",
      },
      {
        question: "What do real estate clients search for online in Costa Rica?",
        answer:
          "It depends on the buyer type. International buyers search for location-specific terms like 'Costa Rica beach property' or 'Guanacaste real estate.' Local and expat buyers tend to search by developer name or project type. I structure the site to capture both types of search intent with dedicated landing pages.",
      },
      {
        question: "How do project landing pages work?",
        answer:
          "Each active project gets a dedicated page with everything a buyer needs to evaluate it remotely: gallery, floor plan options, location map, pricing range or status, and a project-specific inquiry form. These pages are built to rank in search and to convert visitors who find the project through Google, social media, or referral links.",
      },
    ],
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
    title: "Healthcare Web Development Costa Rica | Sites Patients Trust",
    description:
      "Healthcare web development in Costa Rica for clinics, practices, and medical businesses. Build patient trust online with clear service pages and appointment flows.",
    keywords: [
      "healthcare web development costa rica",
      "clinic website costa rica",
      "medical website costa rica",
    ],
    hero: {
      eyebrow: "Healthcare",
      headline: "Healthcare Web Development in Costa Rica That Patients Actually Trust",
      subheadline:
        "For clinics, practices, and health businesses that need a credible online presence -- not a template that makes the practice look smaller than it is.",
    },
    intro:
      "Healthcare web development in Costa Rica requires a different approach -- patients decide whether to trust a practice within seconds of landing on the site. If the design looks outdated, the services are hard to find, or there is no clear way to request an appointment, they leave and call the next clinic on the list.",
    narrativeSections: [
      {
        eyebrow: "What a healthcare website needs to do",
        title: "Patients decide whether to trust your practice before they ever call.",
        body: "A healthcare website has one job: make the patient feel confident enough to take the next step. That means clear service descriptions they can understand without medical jargon, provider profiles that build personal trust, and an obvious path to request an appointment or ask a question. Most clinic sites fail because they are built like brochures instead of trust-building systems.",
        points: [
          "Clear service descriptions in patient-friendly language.",
          "Doctor and provider profiles with credentials and photos.",
          "Easy appointment request or inquiry flow.",
          "Mobile-first design because most patients search from their phone.",
        ],
      },
      {
        eyebrow: "Why it matters in Costa Rica",
        title:
          "Medical tourism and expat patients have higher expectations for what a clinic site should look like.",
        body: "In Costa Rica, many clinics serve both local patients and international visitors who are evaluating the practice entirely online. A site that looks amateur immediately loses the medical tourism patient who was comparing three clinics. For expat-serving practices, English-language pages with clear pricing context and credential displays are not optional -- they are the minimum expectation.",
        points: [
          "Bilingual capability for practices that serve international patients.",
          "Trust signals that matter to medical tourism visitors.",
          "Insurance and pricing transparency where applicable.",
          "Google Maps and location context for visitors planning a trip.",
        ],
      },
    ],
    faq: [
      {
        question: "Do you handle patient-facing websites for clinics and practices?",
        answer:
          "Yes, that is the primary focus. I build sites where the patient is the audience, not other doctors. That means clear service pages, provider profiles, appointment request flows, and a design that communicates professionalism and warmth at the same time. The site should feel like walking into a well-run clinic.",
      },
      {
        question: "Can the site include online appointment booking?",
        answer:
          "Yes. I can integrate with common scheduling tools or build a custom appointment request form that fits your workflow. Some clinics prefer a full booking system with calendar availability. Others prefer a simple request form that the front desk confirms by phone or email. The right approach depends on how your practice operates.",
      },
      {
        question: "How do you build trust for clinics online?",
        answer:
          "Through specific, visible proof: doctor credentials and certifications displayed prominently, patient testimonials where permitted, professional photography, clear service explanations, and a design that feels modern and clean. Trust is not one element -- it is the cumulative effect of every section on the page working together.",
      },
      {
        question: "Do you work with specialty practices or only general clinics?",
        answer:
          "Both. I have built sites for general practice clinics, dental offices, and specialty practices. The approach adapts to the specialty -- a dental site needs before-and-after galleries, a surgical practice needs detailed procedure pages, and a wellness clinic needs package presentation. The structure changes but the trust-building framework stays the same.",
      },
    ],
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
    title: "Tourism Web Development Costa Rica | Sites That Book Guests",
    description:
      "Tourism web development in Costa Rica for hotels, tour operators, and hospitality businesses. Showcase experiences, build guest trust, and drive direct bookings.",
    keywords: [
      "tourism web development costa rica",
      "hotel website costa rica",
      "tour company web design costa rica",
    ],
    hero: {
      eyebrow: "Tourism and Hospitality",
      headline:
        "Tourism Web Development in Costa Rica That Books Guests Instead of Just Displaying Photos",
      subheadline:
        "Built for hotels, tour operators, and hospitality businesses that need their website to sell the experience as well as they deliver it.",
    },
    intro:
      "Tourism web development in Costa Rica has to do more than look tropical -- international guests evaluate your property or tour entirely online before they commit. If the site cannot communicate the experience clearly, show social proof, and offer a frictionless booking or inquiry path, you lose the guest to a competitor with a better online presence.",
    narrativeSections: [
      {
        eyebrow: "Why tourism sites underperform",
        title: "Guests are ready to book but your site makes them hesitate instead of commit.",
        body: "Most tourism websites in Costa Rica fail at the same three things: the experience is hard to visualize, the booking or inquiry path is buried, and there is not enough social proof to overcome the anxiety of booking something in a foreign country. Visitors scroll through vague descriptions and blurry photos, then go to TripAdvisor or Airbnb where the decision feels safer.",
        points: [
          "Vague descriptions that do not help guests picture the experience.",
          "No visible reviews or social proof on the site itself.",
          "Booking or inquiry forms buried three clicks deep.",
          "The site looks outdated compared to OTA listings of the same property.",
        ],
      },
      {
        eyebrow: "What works",
        title: "A tourism site that sells the experience the way the guest wants to buy it.",
        body: "The best hospitality websites work like a concierge: they answer the guest's questions before they are asked, make the experience feel tangible through strong visuals and specific descriptions, and put the booking or inquiry step exactly where the guest is ready to commit. Every page should reduce friction and increase confidence.",
        points: [
          "Experience pages with gallery, itinerary, and pricing context.",
          "Reviews and guest testimonials placed at decision points.",
          "Visible booking or inquiry CTA on every experience page.",
          "Mobile-first design because most travel research happens on phones.",
        ],
      },
    ],
    faq: [
      {
        question: "Can the site handle online bookings directly?",
        answer:
          "Yes. Depending on your operation, I can integrate with booking engines you already use, connect to platforms like Fareharbor or Rezdy for tours, or build a custom inquiry and reservation flow. For smaller operations, a well-designed inquiry form that captures dates and guest preferences is often more effective than a complex booking system.",
      },
      {
        question: "Do you optimize for travel searches?",
        answer:
          "Yes. Tourism SEO is a core part of the build. I structure the site with location-specific pages, experience-based content, and schema markup that helps Google understand what you offer. For competitive terms like 'Costa Rica eco lodge' or 'Osa Peninsula tours,' the site needs dedicated landing pages with strong content, not just a homepage.",
      },
      {
        question: "How do you showcase tours and destinations on the site?",
        answer:
          "Each tour or experience gets a dedicated page with a photo gallery, detailed description, practical information like duration and difficulty, pricing context, and a direct booking or inquiry form. Group tours, multi-day packages, and seasonal offerings each get their own presentation. The goal is to give the guest everything they need to decide without calling first.",
      },
      {
        question: "Do you integrate with booking platforms like Airbnb or Booking.com?",
        answer:
          "The site can link to your OTA listings, but the real goal is to drive direct bookings and reduce your dependency on platforms that take a commission. I build the direct booking path strong enough that guests who find you on an OTA end up booking through your site instead. That saves you the 15-20% commission on every reservation.",
      },
    ],
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
