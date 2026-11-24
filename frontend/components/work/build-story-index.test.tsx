import { describe, expect, it, mock } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import type { BuildStory } from "@/content/work/types";
import { registerNextMocks } from "@/tests/fixtures/next";
import { makePreview } from "@/tests/fixtures/work";

registerNextMocks();
mock.module("@/lib/work-seo", () => ({
  workIndexJsonLd: (locale: string, stories: unknown[]) => ({
    "@type": "CollectionPage",
    inLanguage: locale,
    count: stories.length,
  }),
}));
const { BuildStoryIndex } = await import("./build-story-index");

const stories = ["alpha", "beta", "gamma"].map((slug) => makePreview(slug)) as BuildStory[];

describe("BuildStoryIndex", () => {
  it("lists every story under the page title", () => {
    const html = renderToStaticMarkup(<BuildStoryIndex locale="en" stories={stories} />);

    expect(html).toContain("Projects, and how I built them.");
    expect(html.match(/<li /g)).toHaveLength(3);
    expect(html).toContain('href="/work/gamma"');
  });

  it("loads only the first two images eagerly, since only they are in the first screen", () => {
    const html = renderToStaticMarkup(<BuildStoryIndex locale="en" stories={stories} />);

    expect(html.match(/data-preload="true"/g)).toHaveLength(2);
    expect(html.match(/loading="lazy"/g)).toHaveLength(1);
    expect(html.indexOf('loading="eager"')).toBeLessThan(html.indexOf('loading="lazy"'));
  });

  it("describes the collection for search engines", () => {
    const html = renderToStaticMarkup(<BuildStoryIndex locale="es" stories={stories} />);

    expect(html).toContain("&quot;@type&quot;:&quot;CollectionPage&quot;".replace(/&quot;/g, '"'));
    expect(html).toContain('"count":3');
    expect(html).toContain("Proyectos y cómo los construí.");
  });

  it("ends with the call to action", () => {
    const html = renderToStaticMarkup(<BuildStoryIndex locale="en" stories={stories} />);

    expect(html).toContain("Planning a project like this?");
    expect(html).toContain('href="/contact"');
  });
});
