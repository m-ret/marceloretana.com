import Image from "next/image";

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-16 pt-24 pb-16 bg-[var(--color-bg)]">
      <div className="max-w-6xl">
        {/* Page label */}
        <p className="text-[var(--color-fg)] text-lg md:text-xl uppercase tracking-widest mb-8">
          About
        </p>

        {/* Main headline - Large, thin typography */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-[var(--color-fg)] leading-tight tracking-tight mb-16 md:mb-24">
          I craft digital experiences
          <br />
          that bring ideas to life
          <br />
          around the world.
        </h1>

        {/* Profile image section */}
        <div className="flex flex-col md:flex-row gap-0">
          {/* Image */}
          <div className="relative w-full md:w-80 h-96 md:h-[520px] flex-shrink-0">
            <Image
              src="/profile.jpeg"
              alt="Marcelo Retana"
              fill
              className="object-cover object-top"
              priority
            />
          </div>

          {/* Info panel */}
          <div className="bg-yellow-400 p-8 md:p-10 flex flex-col justify-between md:w-80">
            <div>
              <h2 className="text-2xl md:text-3xl font-light text-black mb-2">Marcelo Retana</h2>
              <p className="text-black/70 text-sm mb-6">Founder & Software Engineer</p>
              <p className="text-black/80 leading-relaxed mb-4">
                Serial entrepreneur passionate about helping small businesses scale through
                technology. Software engineer with a love for UI/UX design.
              </p>
              <p className="text-black/80 leading-relaxed text-sm">
                Building with the most modern tools — Claude Code, AI-powered workflows, and
                cutting-edge frameworks. Based in Puerto Jiménez, Costa Rica.
              </p>
            </div>
            <div className="mt-8 space-y-2 text-sm">
              <a
                href="https://gexpsoftware.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-black underline underline-offset-4 hover:text-black/60 transition-colors"
              >
                GEXP Software →
              </a>
              <a
                href="https://inflafest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-black underline underline-offset-4 hover:text-black/60 transition-colors"
              >
                Inflafest Costa Rica →
              </a>
              <a
                href="https://ticoguides.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-black underline underline-offset-4 hover:text-black/60 transition-colors"
              >
                TicoGuides →
              </a>
            </div>
          </div>

          {/* Get in Touch */}
          <div className="flex flex-col justify-end p-8 md:p-10 md:pl-16">
            <p className="text-lg md:text-xl uppercase tracking-widest text-[var(--color-fg)] font-medium mb-4">
              Get in Touch
            </p>
            <a
              href="mailto:info@gexpsoftware.com"
              className="text-xl md:text-2xl text-[var(--color-fg-secondary)] hover:text-[var(--color-fg)] transition-colors"
            >
              info@gexpsoftware.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
