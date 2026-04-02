const capabilities = [
  {
    category: "First Impression",
    items: [
      "Clearer offer",
      "More credible design",
      "Better service pages",
      "Stronger mobile experience",
      "A site that feels current",
    ],
  },
  {
    category: "Lead Capture",
    items: [
      "Quote forms that make sense",
      "Cleaner contact flows",
      "Service pages built to convert",
      "WhatsApp and email routing",
      "Calls to action people notice",
    ],
  },
  {
    category: "Operations",
    items: [
      "Booking and inquiry flows",
      "Easy content updates",
      "Integrations when needed",
      "Systems that reduce manual work",
      "A setup your team can manage",
    ],
  },
  {
    category: "Build Quality",
    items: [
      "Fast loading pages",
      "SEO-ready structure",
      "Stable technical setup",
      "Built to grow with the business",
      "Launch support and improvements",
    ],
  },
];

const clients = [
  "Bank of America",
  "IBM",
  "Universal Music",
  "BMW",
  "Mercedes Benz",
  "Pfizer",
  "Univision-Televisa",
  "Provectus",
  "Automation Anywhere",
  "3Pillar Global",
  "Unicorn",
  "Value Creation Labs",
  "Ambit Design",
  "Avodah",
  "Sunrise Hill Glamping",
  "Nature Escapes",
  "Vista3 Architects",
  "IdeADesign Architecture",
  "Softon Digital",
  "MyBasePay",
];

const ventures = [
  {
    name: "GEXP Software",
    url: "https://gexpsoftware.com",
    category: "Software Agency",
    tagline: "Websites, apps, and digital execution",
  },
  {
    name: "GEXP Costa Rica",
    url: "https://gexpsoftware.com/cr",
    category: "Local Services",
    tagline: "Costa Rica service lane for local businesses",
  },
  {
    name: "Inflafest",
    url: "https://inflafest.com",
    category: "Events",
    tagline: "Premier inflatable parks & festival experiences",
  },
  {
    name: "TicoGuides",
    url: "https://ticoguides.com",
    category: "Tourism",
    tagline: "Authentic Costa Rican adventures",
  },
  {
    name: "GoEasy Chat",
    url: "https://goeasy.chat",
    category: "SaaS",
    tagline: "Team-based WhatsApp customer support",
  },
];

export function About() {
  return (
    <section id="about" className="py-32 md:py-40 px-6 md:px-12 lg:px-16 bg-bg">
      <div className="max-w-6xl">
        <div className="grid md:grid-cols-[200px_1fr] gap-8 md:gap-16 mb-32">
          <div>
            <h2 className="text-lg md:text-xl uppercase tracking-widest text-fg font-medium">
              Why This Site Exists
            </h2>
          </div>
          <div>
            <p className="text-2xl md:text-3xl lg:text-4xl font-light text-fg-secondary leading-relaxed">
              I build{" "}
              <span className="text-fg font-normal">
                websites that make businesses look more serious
              </span>
              ,{" "}
              <span className="text-fg font-normal">
                quote flows that create cleaner conversations
              </span>
              , and{" "}
              <span className="text-fg font-normal">
                digital products that are easier to trust and easier to buy from
              </span>
              .
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-[200px_1fr] gap-8 md:gap-16 mb-32">
          <div>
            <h2 className="text-lg md:text-xl uppercase tracking-widest text-fg font-medium">
              My Approach
            </h2>
          </div>
          <div className="space-y-6">
            <p className="text-lg md:text-xl text-fg-secondary leading-relaxed">
              The work starts with the commercial problem, not with jargon. If the business looks
              improvised, hard to understand, or hard to contact, the website has to fix that first.
            </p>
            <p className="text-lg md:text-xl text-fg-secondary leading-relaxed">
              Then the technical side matters: performance, structure, responsive design, form
              handling, SEO signals, and the kind of build quality that holds up after launch.
            </p>
            <p className="text-lg md:text-xl text-fg leading-relaxed font-medium">
              The goal is simple, make the business easier to trust, easier to understand, and
              easier to contact.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-[200px_1fr] gap-8 md:gap-16 mb-32">
          <div>
            <h2 className="text-lg md:text-xl uppercase tracking-widest text-fg font-medium">
              Operating Context
            </h2>
          </div>
          <div>
            <p className="text-3xl md:text-4xl lg:text-5xl font-light text-fg leading-tight mb-16">
              Proof that this is operator work, not just portfolio theater.
            </p>

            {/* Venture list - minimal lines */}
            <div className="border-t border-border">
              {ventures.map((venture) => (
                <a
                  key={venture.name}
                  href={venture.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between py-6 border-b border-border hover:pl-4 transition-all"
                >
                  <div className="flex-1">
                    <span className="text-2xl md:text-3xl text-fg font-light group-hover:text-yellow-400 transition-colors">
                      {venture.name}
                    </span>
                    <span className="hidden md:inline text-fg-muted ml-4">— {venture.tagline}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs uppercase tracking-widest text-fg-muted">
                      {venture.category}
                    </span>
                    <span className="text-fg group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-16">
          <h2 className="text-sm uppercase tracking-widest text-fg font-medium mb-12">
            What This Work Usually Improves
          </h2>

          <div className="space-y-16">
            <div>
              <h3 className="text-lg md:text-xl uppercase tracking-widest text-fg font-medium mb-6">
                What Clients Usually Need Fixed
              </h3>
              <p className="text-fg-muted mb-8 max-w-2xl">
                Not a stack list. The real job is to make the business look more serious, easier to
                understand, and easier to contact.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border pt-6">
                {capabilities.map((cap) => (
                  <div key={cap.category}>
                    <h4 className="text-sm uppercase tracking-widest text-fg font-medium mb-4">
                      {cap.category}
                    </h4>
                    <div className="space-y-2">
                      {cap.items.map((item) => (
                        <p key={item} className="text-fg-secondary hover:text-fg transition-colors">
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg md:text-xl uppercase tracking-widest text-fg font-medium mb-6">
                Trusted By
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 border-t border-border">
                {clients.map((client) => (
                  <p
                    key={client}
                    className="py-3 text-fg-secondary border-b border-border hover:text-fg transition-colors"
                  >
                    {client}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
