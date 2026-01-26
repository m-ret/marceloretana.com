export function Contact() {
  return (
    <section id="contact" className="pt-32 md:pt-40 px-6 md:px-12 lg:px-16 bg-bg">
      <div className="max-w-6xl">
        {/* LET'S KEEP IN TOUCH header */}
        <div className="border-t border-border pt-8 mb-24">
          <h2 className="text-2xl md:text-3xl font-light text-fg">Let&apos;s Keep In Touch</h2>
        </div>

        {/* Contact grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          {/* Get In Touch */}
          <div className="lg:col-span-2">
            <p className="text-lg md:text-xl uppercase tracking-widest text-fg font-medium mb-2">
              Get In Touch
            </p>
            <p className="text-fg-muted text-sm mb-6">Have a project in mind? Let&apos;s talk.</p>
            <div className="flex flex-col gap-3">
              <a
                href="https://cal.com/marcelo-retana"
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg hover:text-fg-secondary transition-colors text-sm uppercase tracking-widest"
              >
                Book a Call →
              </a>
              <a
                href="mailto:info@gexpsoftware.com"
                className="text-fg-muted hover:text-fg transition-colors text-sm uppercase tracking-widest"
              >
                info@gexpsoftware.com →
              </a>
            </div>
          </div>

          {/* Location */}
          <div>
            <p className="text-lg md:text-xl uppercase tracking-widest text-fg font-medium mb-4">
              Location
            </p>
            <p className="text-fg-secondary">Puerto Jiménez</p>
            <p className="text-fg-secondary">Costa Rica</p>
          </div>

          {/* Social */}
          <div>
            <p className="text-lg md:text-xl uppercase tracking-widest text-fg font-medium mb-4">
              Social
            </p>
            <div className="flex gap-4 text-fg-secondary">
              <a
                href="https://linkedin.com/in/marceloretana"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-fg transition-colors"
              >
                Ln
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-fg transition-colors"
              >
                Gh
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm">
          <div className="flex flex-wrap gap-8 text-fg-muted">
            <a href="mailto:info@gexpsoftware.com" className="hover:text-fg transition-colors">
              info@gexpsoftware.com
            </a>
            <a href="tel:+50671077969" className="hover:text-fg transition-colors">
              +506 7107 7969
            </a>
          </div>
          <p className="text-fg-muted">&copy; {new Date().getFullYear()} Marcelo Retana</p>
        </div>
      </div>

      {/* Scrolling tagline bar */}
      <div className="mt-16 -mx-6 md:-mx-12 lg:-mx-16 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {["set-1", "set-2", "set-3", "set-4"].map((id) => (
            <div key={id} className="flex">
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
