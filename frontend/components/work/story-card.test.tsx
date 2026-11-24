import { describe, expect, it } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { registerNextMocks } from "@/tests/fixtures/next";
import { makePreview } from "@/tests/fixtures/work";

registerNextMocks();
const { StoryCard } = await import("./story-card");

describe("StoryCard", () => {
  it("links the story and shows its name, year, title and sector", () => {
    const html = renderToStaticMarkup(<StoryCard story={makePreview("alpha")} />);

    expect(html).toContain('href="/work/alpha"');
    expect(html).toContain("alpha name");
    expect(html).toContain("2026");
    expect(html).toContain("alpha title en");
    expect(html).toContain("alpha sector en");
  });

  it("loads the image lazily by default", () => {
    const html = renderToStaticMarkup(<StoryCard story={makePreview("alpha")} />);

    expect(html).toContain('loading="lazy"');
    expect(html).not.toContain("data-preload");
    expect(html).not.toMatch(/fetchpriority/i);
  });

  it("loads the image at once and at high priority for a card in the first screen", () => {
    const html = renderToStaticMarkup(<StoryCard story={makePreview("alpha")} preload />);

    expect(html).toContain('loading="eager"');
    expect(html).toContain('data-preload="true"');
    expect(html).toMatch(/fetchpriority="high"/i);
  });

  it("uses the heading level it is given", () => {
    expect(renderToStaticMarkup(<StoryCard story={makePreview("alpha")} />)).toContain("<h2");
    expect(
      renderToStaticMarkup(<StoryCard story={makePreview("alpha")} headingLevel="h3" />)
    ).toContain("<h3");
  });
});
