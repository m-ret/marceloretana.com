interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  description: string;
}

const experiences: ExperienceItem[] = [
  {
    company: "GEXP Software",
    role: "Founder",
    duration: "7+ yrs",
    description:
      "Building high-converting websites, web apps, and MVPs for startups and growing businesses. Modern tech stack, performance-first development, and SEO optimization.",
  },
  {
    company: "Universal Music Group",
    role: "Senior Software Developer",
    duration: "6+ yrs",
    description:
      "Full-stack development with React, Next.js, Node.js, and AWS. Built high-traffic web applications, managed cloud infrastructure, and delivered internal tools at enterprise scale.",
  },
  {
    company: "Provectus",
    role: "Software Engineer",
    duration: "4+ yrs",
    description:
      "AWS Premier Consulting Partner. Working on AI solutions, MLOps, and cloud transformation projects.",
  },
  {
    company: "IBM",
    role: "Senior Software Engineer",
    duration: "1 yr",
    description:
      "Built and maintained business process tools using React, Node.js, and IBM Carbon Design System.",
  },
  {
    company: "Univision-Televisa",
    role: "Full Stack Developer",
    duration: "4 yrs",
    description:
      "Built and maintained high-traffic platforms including Univision.com and TUDN serving millions of users. Next.js, GraphQL, and performance-optimized architecture.",
  },
  {
    company: "Prodigious Latin America",
    role: "Full Stack Developer",
    duration: "3 yrs",
    description:
      "Full-stack development for Bank of America. Built secure, standards-compliant web applications for one of the largest financial institutions in the world.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-32 md:py-40 px-6 md:px-12 lg:px-16 bg-bg-secondary">
      <div className="max-w-6xl">
        {/* WHAT I DO section */}
        <div className="grid md:grid-cols-[200px_1fr] gap-8 md:gap-16 mb-24">
          <div>
            <h2 className="text-lg md:text-xl uppercase tracking-widest text-fg font-medium">
              What I Do
            </h2>
          </div>
          <div>
            <p className="text-3xl md:text-4xl lg:text-5xl font-light text-fg leading-tight">
              10+ years shipping software that works.
            </p>
          </div>
        </div>

        {/* Experience list */}
        <div className="border-t border-border">
          {experiences.map((exp) => (
            <div
              key={exp.company}
              className="grid md:grid-cols-[200px_1fr] gap-4 md:gap-16 py-8 border-b border-border group hover:bg-bg-tertiary transition-colors -mx-4 px-4"
            >
              <div>
                <p className="text-sm text-fg-muted">{exp.duration}</p>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl text-fg font-light mb-1 group-hover:text-fg-secondary transition-colors">
                  {exp.company}
                </h3>
                <p className="text-fg-muted mb-3">{exp.role}</p>
                <p className="text-fg-secondary leading-relaxed">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
