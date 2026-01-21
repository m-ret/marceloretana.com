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
      "Leading a team delivering innovative software solutions, design services, and staff augmentation for businesses looking to scale.",
  },
  {
    company: "Universal Music Group",
    role: "Senior Software Developer",
    duration: "6+ yrs",
    description:
      "Fullstack development with React, Node.js, and AWS. Building dynamic interfaces and managing cloud operations.",
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
      "Built and maintained multiple high-traffic platforms including Univision.com and TUDN using Next.js, GraphQL, and modern web technologies.",
  },
  {
    company: "Prodigious Latin America",
    role: "Full Stack Developer",
    duration: "3 yrs",
    description:
      "Full stack development for Bank of America. Built web applications following latest standards.",
  },
];

export function Experience() {
  return (
    <section
      id="experience"
      className="py-32 md:py-40 px-6 md:px-12 lg:px-16 bg-[var(--color-bg-secondary)]"
    >
      <div className="max-w-6xl">
        {/* WHAT I DO section */}
        <div className="grid md:grid-cols-[200px_1fr] gap-8 md:gap-16 mb-24">
          <div>
            <h2 className="text-lg md:text-xl uppercase tracking-widest text-[var(--color-fg)] font-medium">
              What I Do
            </h2>
          </div>
          <div>
            <p className="text-3xl md:text-4xl lg:text-5xl font-light text-[var(--color-fg)] leading-tight">
              Crafting future icons, today.
            </p>
          </div>
        </div>

        {/* Experience list */}
        <div className="border-t border-[var(--color-border)]">
          {experiences.map((exp) => (
            <div
              key={exp.company}
              className="grid md:grid-cols-[200px_1fr] gap-4 md:gap-16 py-8 border-b border-[var(--color-border)] group hover:bg-[var(--color-bg-tertiary)] transition-colors -mx-4 px-4"
            >
              <div>
                <p className="text-sm text-[var(--color-fg-muted)]">{exp.duration}</p>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl text-[var(--color-fg)] font-light mb-1 group-hover:text-[var(--color-fg-secondary)] transition-colors">
                  {exp.company}
                </h3>
                <p className="text-[var(--color-fg-muted)] mb-3">{exp.role}</p>
                <p className="text-[var(--color-fg-secondary)] leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
