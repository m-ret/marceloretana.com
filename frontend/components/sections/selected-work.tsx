import Link from "next/link";
import { StoryCard } from "@/components/work/story-card";
import { getBuildStories } from "@/lib/work";

export function SelectedWork() {
  const stories = getBuildStories("en").slice(0, 4);

  if (stories.length === 0) return null;

  return (
    <section id="work" className="py-32 md:py-40 px-6 md:px-12 lg:px-16 bg-bg">
      <div className="max-w-6xl">
        <div className="grid md:grid-cols-[200px_1fr] gap-8 md:gap-16 mb-16 md:mb-24">
          <div>
            <h2 className="text-lg md:text-xl uppercase tracking-widest text-fg font-medium">
              Selected Work
            </h2>
          </div>
          <p className="text-3xl md:text-4xl lg:text-5xl font-light text-fg leading-tight">
            Recent projects, and the decisions behind each build.
          </p>
        </div>

        <ul className="grid gap-x-10 gap-y-16 md:grid-cols-2 md:gap-y-20">
          {stories.map((story) => (
            <li key={story.slug} className="min-w-0">
              <StoryCard story={story} headingLevel="h3" />
            </li>
          ))}
        </ul>

        <Link
          href="/work"
          className="mt-16 inline-flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-fg transition-colors hover:text-fg-secondary"
        >
          <span>All work</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
