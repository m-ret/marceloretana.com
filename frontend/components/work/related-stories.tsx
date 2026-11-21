import { StoryCard } from "@/components/work/story-card";
import type { StoryPreview } from "@/content/work/types";
import { cn } from "@/lib/utils";

type RelatedStoriesProps = {
  stories: StoryPreview[];
  /** Names the section; unique on the page. */
  id: string;
  heading: string;
  /** Small label above the heading, as on the market pages. */
  eyebrow?: string;
  className?: string;
};

/** A heading and a grid of story cards. Renders nothing when there are no stories. */
export function RelatedStories({ stories, id, heading, eyebrow, className }: RelatedStoriesProps) {
  if (stories.length === 0) return null;

  return (
    <section aria-labelledby={id} className={cn("border-t border-border pt-8", className)}>
      {eyebrow ? (
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-fg-muted">{eyebrow}</p>
      ) : null}
      <h2
        id={id}
        className="max-w-4xl text-2xl font-light leading-tight text-balance wrap-anywhere md:text-4xl"
      >
        {heading}
      </h2>
      <ul className="mt-10 grid gap-x-10 gap-y-14 md:grid-cols-2">
        {stories.map((story) => (
          <li key={story.slug} className="min-w-0">
            <StoryCard story={story} headingLevel="h3" />
          </li>
        ))}
      </ul>
    </section>
  );
}
