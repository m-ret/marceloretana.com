import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-16 pt-24 pb-16 bg-[var(--color-bg)]">
      <div className="max-w-6xl">
        <p className="text-[var(--color-fg-muted)] text-lg md:text-xl uppercase tracking-widest mb-8">
          404
        </p>

        <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-[var(--color-fg)] leading-tight tracking-tight mb-8">
          Page not found.
        </h1>

        <p className="text-xl md:text-2xl text-[var(--color-fg-secondary)] mb-12 max-w-2xl">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-lg text-[var(--color-fg)] hover:text-[var(--color-fg-secondary)] transition-colors"
          >
            <span>←</span>
            <span>Back to Home</span>
          </Link>
          <a
            href="mailto:info@gexpsoftware.com"
            className="inline-flex items-center gap-2 text-lg text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition-colors"
          >
            <span>Get in Touch</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
