const capabilities = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "React Native", "TypeScript", "SSR/RSC"],
  },
  {
    category: "Backend",
    items: ["Node.js", "GraphQL", "REST APIs", "PostgreSQL", "Redis"],
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS", "Hetzner", "Coolify", "Docker", "CI/CD"],
  },
  {
    category: "AI-Powered Dev",
    items: ["Claude Code", "Cursor", "AI Workflows"],
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
    tagline: "Digital products for startups & enterprises",
  },
  {
    name: "GEXP Costa Rica",
    url: "https://gexpsoftware.com/cr",
    category: "Local Services",
    tagline: "Empowering local businesses with technology",
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
        {/* WHO I AM section */}
        <div className="grid md:grid-cols-[200px_1fr] gap-8 md:gap-16 mb-32">
          <div>
            <h2 className="text-lg md:text-xl uppercase tracking-widest text-fg font-medium">
              Who I Am
            </h2>
          </div>
          <div>
            <p className="text-2xl md:text-3xl lg:text-4xl font-light text-fg-secondary leading-relaxed">
              I&apos;m a Software Engineer and serial entrepreneur who builds{" "}
              <span className="text-fg font-normal">modern, high-converting websites</span>,{" "}
              <span className="text-fg font-normal">scalable apps</span>, and{" "}
              <span className="text-fg font-normal">
                digital products that drive real business results
              </span>
              .
            </p>
          </div>
        </div>

        {/* MY APPROACH section */}
        <div className="grid md:grid-cols-[200px_1fr] gap-8 md:gap-16 mb-32">
          <div>
            <h2 className="text-lg md:text-xl uppercase tracking-widest text-fg font-medium">
              My Approach
            </h2>
          </div>
          <div className="space-y-6">
            <p className="text-lg md:text-xl text-fg-secondary leading-relaxed">
              I combine deep technical expertise with a keen eye for design. Every site I build is
              performance-first, SEO-optimized, and engineered for conversions. Every pixel matters,
              every interaction counts.
            </p>
            <p className="text-lg md:text-xl text-fg-secondary leading-relaxed">
              I leverage the most modern tools in the industry — Next.js, AI-powered development,
              and advanced search optimization for both Google and AI search engines like ChatGPT
              and Perplexity. My sites don&apos;t just look good — they generate leads.
            </p>
            <p className="text-lg md:text-xl text-fg leading-relaxed font-medium">
              My mission? Helping businesses compete with the big players through technology that
              performs, converts, and scales.
            </p>
          </div>
        </div>

        {/* VENTURES section */}
        <div className="grid md:grid-cols-[200px_1fr] gap-8 md:gap-16 mb-32">
          <div>
            <h2 className="text-lg md:text-xl uppercase tracking-widest text-fg font-medium">
              My Ventures
            </h2>
          </div>
          <div>
            <p className="text-3xl md:text-4xl lg:text-5xl font-light text-fg leading-tight mb-16">
              Building businesses that matter.
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

        {/* INDEX section */}
        <div className="border-t border-border pt-16">
          <h2 className="text-sm uppercase tracking-widest text-fg font-medium mb-12">Index</h2>

          <div className="space-y-16">
            {/* Full-Stack Capabilities */}
            <div>
              <h3 className="text-lg md:text-xl uppercase tracking-widest text-fg font-medium mb-6">
                Full-Stack Capabilities
              </h3>
              <p className="text-fg-muted mb-8 max-w-2xl">
                End-to-end ownership — from high-converting interfaces to scalable cloud
                infrastructure.
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

            {/* Trusted By */}
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
