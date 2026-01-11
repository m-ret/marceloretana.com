const skills = [
  "React",
  "React Native",
  "TypeScript",
  "Node.js",
  "Next.js",
  "AWS",
  "GraphQL",
  "UI/UX Design",
  "Claude Code",
  "AI Tools",
];

const clients = [
  "Bank of America",
  "IBM",
  "Universal Music",
  "BMW",
  "Mercedes Benz",
  "Pfizer",
  "Univision",
  "Provectus",
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
];

export function About() {
  return (
    <section id="about" className="py-32 md:py-40 px-6 md:px-12 lg:px-16 bg-[var(--color-bg)]">
      <div className="max-w-6xl">
        {/* WHO I AM section */}
        <div className="grid md:grid-cols-[200px_1fr] gap-8 md:gap-16 mb-32">
          <div>
            <h2 className="text-lg md:text-xl uppercase tracking-widest text-[var(--color-fg)] font-medium">
              Who I Am
            </h2>
          </div>
          <div>
            <p className="text-2xl md:text-3xl lg:text-4xl font-light text-[var(--color-fg-secondary)] leading-relaxed">
              I&apos;m a Software Engineer and serial entrepreneur with a passion for creating work that{" "}
              <span className="text-[var(--color-fg)] font-normal">empowers small businesses</span>,{" "}
              <span className="text-[var(--color-fg)] font-normal">transforms ideas into reality</span>{" "}
              and{" "}
              <span className="text-[var(--color-fg)] font-normal">drives meaningful impact</span>.
            </p>
          </div>
        </div>

        {/* MY APPROACH section */}
        <div className="grid md:grid-cols-[200px_1fr] gap-8 md:gap-16 mb-32">
          <div>
            <h2 className="text-lg md:text-xl uppercase tracking-widest text-[var(--color-fg)] font-medium">
              My Approach
            </h2>
          </div>
          <div className="space-y-6">
            <p className="text-lg md:text-xl text-[var(--color-fg-secondary)] leading-relaxed">
              I combine deep technical expertise with a keen eye for design. While I write code
              that scales, I never lose sight of the user experience. Every pixel matters,
              every interaction counts.
            </p>
            <p className="text-lg md:text-xl text-[var(--color-fg-secondary)] leading-relaxed">
              I leverage the most modern tools in the industry — from AI-powered development
              with Claude Code to cutting-edge frameworks. I believe in working smarter,
              not just harder, to deliver exceptional results.
            </p>
            <p className="text-lg md:text-xl text-[var(--color-fg)] leading-relaxed font-medium">
              My mission? Helping small businesses compete with the big players through
              technology that just works.
            </p>
          </div>
        </div>

        {/* VENTURES section */}
        <div className="grid md:grid-cols-[200px_1fr] gap-8 md:gap-16 mb-32">
          <div>
            <h2 className="text-lg md:text-xl uppercase tracking-widest text-[var(--color-fg)] font-medium">
              My Ventures
            </h2>
          </div>
          <div>
            <p className="text-3xl md:text-4xl lg:text-5xl font-light text-[var(--color-fg)] leading-tight mb-16">
              Building businesses that matter.
            </p>

            {/* Venture list - minimal lines */}
            <div className="border-t border-[var(--color-border)]">
              {ventures.map((venture) => (
                <a
                  key={venture.name}
                  href={venture.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between py-6 border-b border-[var(--color-border)] hover:pl-4 transition-all"
                >
                  <div className="flex-1">
                    <span className="text-2xl md:text-3xl text-[var(--color-fg)] font-light group-hover:text-yellow-400 transition-colors">
                      {venture.name}
                    </span>
                    <span className="hidden md:inline text-[var(--color-fg-muted)] ml-4">
                      — {venture.tagline}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs uppercase tracking-widest text-[var(--color-fg-muted)]">
                      {venture.category}
                    </span>
                    <span className="text-[var(--color-fg)] group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* INDEX section */}
        <div className="border-t border-[var(--color-border)] pt-16">
          <h2 className="text-sm uppercase tracking-widest text-[var(--color-fg)] font-medium mb-12">
            Index
          </h2>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Skills */}
            <div>
              <h3 className="text-lg md:text-xl uppercase tracking-widest text-[var(--color-fg)] font-medium mb-6">
                Technologies & Tools
              </h3>
              <div className="border-t border-[var(--color-border)]">
                <div className="grid grid-cols-2 gap-x-8">
                  {skills.map((skill) => (
                    <p
                      key={skill}
                      className="py-2 text-[var(--color-fg-secondary)] border-b border-[var(--color-border)] hover:text-[var(--color-fg)] transition-colors"
                    >
                      {skill}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Clients */}
            <div>
              <h3 className="text-lg md:text-xl uppercase tracking-widest text-[var(--color-fg)] font-medium mb-6">
                Trusted By
              </h3>
              <div className="border-t border-[var(--color-border)]">
                <div className="grid grid-cols-2 gap-x-8">
                  {clients.map((client) => (
                    <p
                      key={client}
                      className="py-2 text-[var(--color-fg-secondary)] border-b border-[var(--color-border)] hover:text-[var(--color-fg)] transition-colors"
                    >
                      {client}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
