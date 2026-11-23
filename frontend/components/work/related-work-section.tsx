import { workLabels } from "@/components/work/labels";
import { RelatedStories } from "@/components/work/related-stories";
import type { WorkLocale } from "@/content/work/types";
import { getStoriesForPage } from "@/lib/work-links";

type RelatedWorkSectionProps = {
  locale: WorkLocale;
  /** Path of the service page that shows the section. */
  path: string;
  className?: string;
};

/** The build stories that are proof for a service page; nothing when no story names the page. */
export function RelatedWorkSection({ locale, path, className }: RelatedWorkSectionProps) {
  const t = workLabels[locale];

  return (
    <RelatedStories
      stories={getStoriesForPage(path)}
      id="related-work"
      eyebrow={t.caseStudiesEyebrow}
      heading={t.relatedProjects}
      className={className}
    />
  );
}
