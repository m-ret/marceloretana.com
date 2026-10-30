import { workLabels } from "@/components/work/labels";
import { StoryCard } from "@/components/work/story-card";
import { WorkCta } from "@/components/work/work-cta";
import type { BuildStory, WorkLocale } from "@/content/work/types";
import { workIndexJsonLd } from "@/lib/work-seo";

type BuildStoryIndexProps = {
  locale: WorkLocale;
  stories: BuildStory[];
};

export function BuildStoryIndex({ locale, stories }: BuildStoryIndexProps) {
  const t = workLabels[locale];

  return (
    <main className="min-h-screen bg-bg px-6 pb-32 pt-32 text-fg md:px-12 md:pt-40 lg:px-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(workIndexJsonLd(locale, stories)).replace(/</g, "\\u003c"),
        }}
      />
      <div className="mx-auto max-w-6xl">
        <header className="max-w-4xl">
          <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-light leading-[1.02] tracking-[-0.03em] text-balance wrap-anywhere">
            {t.indexTitle}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-fg-secondary md:text-xl md:leading-relaxed">
            {t.indexIntro}
          </p>
        </header>

        {/* Even items drop a row-gap's height for an editorial stagger; DOM order stays 1, 2, 3… */}
        <ol className="mt-20 grid gap-x-10 gap-y-16 md:mt-28 md:grid-cols-2 md:gap-y-24 md:pb-24 md:[&>li:nth-child(even)]:translate-y-24">
          {stories.map((story) => (
            <li key={story.slug} className="min-w-0">
              <StoryCard story={story} />
            </li>
          ))}
        </ol>

        <WorkCta locale={locale} className="mt-24 md:mt-32" />
      </div>
    </main>
  );
}
