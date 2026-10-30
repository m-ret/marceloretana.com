import Link from "next/link";
import { workLabels } from "@/components/work/labels";
import type { WorkLocale } from "@/content/work/types";
import { cn } from "@/lib/utils";

export function WorkCta({ locale, className }: { locale: WorkLocale; className?: string }) {
  const t = workLabels[locale];

  return (
    <section
      aria-labelledby="work-cta"
      className={cn("border-t border-border pt-10 md:pt-14", className)}
    >
      <h2
        id="work-cta"
        className="max-w-3xl text-3xl font-light leading-tight text-balance wrap-anywhere md:text-5xl"
      >
        {t.ctaTitle}
      </h2>
      <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <p className="max-w-xl text-lg leading-relaxed text-fg-secondary">{t.ctaBody}</p>
        <Link
          href={t.ctaHref}
          className="inline-flex min-h-12 shrink-0 items-center gap-3 self-start bg-fg px-4 text-[11px] uppercase tracking-[0.24em] text-bg transition-colors hover:bg-yellow-400 hover:text-black focus-visible:outline-offset-4 md:self-auto md:px-6 md:text-sm"
        >
          {t.ctaLink}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
