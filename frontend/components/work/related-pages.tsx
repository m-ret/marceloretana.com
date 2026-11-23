import Link from "next/link";
import type { RelatedPageLink } from "@/lib/work-links";

type RelatedPagesProps = {
  links: RelatedPageLink[];
  /** Names the section; unique on the page. */
  id: string;
  heading: string;
  /** The caller lays the heading and the list out, e.g. as the story page's label rail. */
  className?: string;
};

/** Service pages a story is proof for. Renders nothing when there are none. */
export function RelatedPages({ links, id, heading, className }: RelatedPagesProps) {
  if (links.length === 0) return null;

  return (
    <section aria-labelledby={id} className={className}>
      <h2 id={id} className="text-sm font-medium uppercase tracking-widest text-fg">
        {heading}
      </h2>
      <ul className="min-w-0">
        {links.map((link) => (
          <li key={link.path} className="border-b border-border">
            <Link href={link.path} className="group flex items-start justify-between gap-6 py-4">
              <span className="min-w-0">
                <span className="block text-[11px] uppercase tracking-[0.2em] text-fg-muted wrap-anywhere">
                  {link.eyebrow}
                </span>
                <span className="mt-2 block text-lg leading-snug text-fg-secondary transition-colors wrap-break-word group-hover:text-fg">
                  {link.title}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="mt-4 text-fg-muted transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
