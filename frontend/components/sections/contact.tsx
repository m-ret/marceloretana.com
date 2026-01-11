export function Contact() {
  return (
    <section id="contact" className="py-32 md:py-40 px-6 md:px-12 lg:px-16 bg-[var(--color-bg)]">
      <div className="max-w-6xl">
        {/* LET'S KEEP IN TOUCH header */}
        <div className="border-t border-[var(--color-border)] pt-8 mb-24">
          <h2 className="text-2xl md:text-3xl font-light text-[var(--color-fg)]">
            Let&apos;s Keep In Touch
          </h2>
        </div>

        {/* Contact grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          {/* Newsletter */}
          <div className="lg:col-span-2">
            <p className="text-lg md:text-xl uppercase tracking-widest text-[var(--color-fg)] font-medium mb-2">
              Newsletter
            </p>
            <p className="text-[var(--color-fg-muted)] text-sm mb-6">
              Tips, tricks and my latest bits
            </p>
            <form className="flex items-center border-b border-[var(--color-border)] pb-2 max-w-sm">
              <input
                type="email"
                placeholder="E-MAIL"
                className="flex-1 bg-transparent text-[var(--color-fg)] text-sm placeholder:text-[var(--color-fg-muted)] focus:outline-none"
              />
              <button type="submit" className="text-[var(--color-fg)] ml-4 hover:text-[var(--color-fg-secondary)] transition-colors">
                →
              </button>
            </form>
          </div>

          {/* Location */}
          <div>
            <p className="text-lg md:text-xl uppercase tracking-widest text-[var(--color-fg)] font-medium mb-4">
              Location
            </p>
            <p className="text-[var(--color-fg-secondary)]">Puerto Jiménez</p>
            <p className="text-[var(--color-fg-secondary)]">Costa Rica</p>
          </div>

          {/* Social */}
          <div>
            <p className="text-lg md:text-xl uppercase tracking-widest text-[var(--color-fg)] font-medium mb-4">
              Social
            </p>
            <div className="flex gap-4 text-[var(--color-fg-secondary)]">
              <a
                href="https://linkedin.com/in/marceloretana"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-fg)] transition-colors"
              >
                Ln
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-fg)] transition-colors"
              >
                Gh
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[var(--color-border)] pt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm">
          <div className="flex flex-wrap gap-8 text-[var(--color-fg-muted)]">
            <a
              href="mailto:marcelo@gexpsoftware.com"
              className="hover:text-[var(--color-fg)] transition-colors"
            >
              marcelo@gexpsoftware.com
            </a>
            <a
              href="tel:+50671077969"
              className="hover:text-[var(--color-fg)] transition-colors"
            >
              +506 7107 7969
            </a>
          </div>
          <p className="text-[var(--color-fg-muted)]">
            &copy; {new Date().getFullYear()} Marcelo Retana
          </p>
        </div>
      </div>

      {/* Scrolling tagline bar */}
      <div className="mt-24 -mx-6 md:-mx-12 lg:-mx-16 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex">
              <span className="px-8 py-4 text-sm font-bold uppercase tracking-wider bg-yellow-400 text-black">
                Building The Future
              </span>
              <span className="px-8 py-4 text-sm font-bold uppercase tracking-wider bg-cyan-500 text-black">
                Crafting Experiences
              </span>
              <span className="px-8 py-4 text-sm font-bold uppercase tracking-wider bg-rose-500 text-white">
                Solving Problems
              </span>
              <span className="px-8 py-4 text-sm font-bold uppercase tracking-wider bg-violet-500 text-white">
                Creating Impact
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
