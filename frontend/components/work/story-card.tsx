import Image from "next/image";
import Link from "next/link";
import type { BuildStory } from "@/content/work/types";

type StoryCardProps = {
  story: BuildStory;
  headingLevel?: "h2" | "h3";
};

const sizes = "(min-width: 1280px) 556px, (min-width: 768px) calc(50vw - 4rem), calc(100vw - 3rem)";

export function StoryCard({ story, headingLevel: Heading = "h2" }: StoryCardProps) {
  return (
    <Link href={story.path} className="group block">
      <div className="relative aspect-[16/10] overflow-hidden border border-border bg-bg-tertiary">
        <Image
          src={story.hero.src}
          alt=""
          fill
          sizes={sizes}
          placeholder="blur"
          className="object-cover object-top motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-6 flex items-baseline justify-between gap-4">
        <Heading className="min-w-0 text-2xl font-light text-fg wrap-anywhere md:text-3xl">
          {story.name}
        </Heading>
        <span className="shrink-0 text-sm tabular-nums text-fg-muted">{story.year}</span>
      </div>
      <p className="mt-3 text-base leading-relaxed text-fg-secondary transition-colors wrap-break-word group-hover:text-fg md:text-lg md:leading-relaxed">
        {story.title}
      </p>
      <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-fg-muted wrap-anywhere">
        {story.sector}
      </p>
    </Link>
  );
}
