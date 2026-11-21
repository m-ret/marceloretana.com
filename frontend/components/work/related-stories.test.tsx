import { describe, expect, it } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { registerNextMocks } from "@/tests/fixtures/next";
import { makePreview } from "@/tests/fixtures/work";

registerNextMocks();
const { RelatedStories } = await import("./related-stories");

const stories = [makePreview("alpha"), makePreview("beta")];

describe("RelatedStories", () => {
  it("renders nothing when there are no stories", () => {
    expect(renderToStaticMarkup(<RelatedStories stories={[]} id="more" heading="More" />)).toBe("");
  });

  it("renders a labelled section with the heading", () => {
    const html = renderToStaticMarkup(
      <RelatedStories stories={stories} id="more" heading="Keep reading" />
    );

    expect(html).toContain('aria-labelledby="more"');
    expect(html).toContain('<h2 id="more"');
    expect(html).toContain("Keep reading");
  });

  it("renders one card per story, linked and headed one level below the section", () => {
    const html = renderToStaticMarkup(
      <RelatedStories stories={stories} id="more" heading="Keep reading" />
    );

    expect(html.match(/<li /g)).toHaveLength(2);
    expect(html).toContain('href="/work/alpha"');
    expect(html).toContain('href="/work/beta"');
    expect(html).toContain("<h3");
    expect(html).toContain("alpha title en");
  });

  it("shows the eyebrow only when there is one", () => {
    const withEyebrow = renderToStaticMarkup(
      <RelatedStories stories={stories} id="more" heading="More" eyebrow="Case studies" />
    );
    const without = renderToStaticMarkup(
      <RelatedStories stories={stories} id="more" heading="More" />
    );

    expect(withEyebrow).toContain("Case studies");
    expect(withEyebrow).toContain("tracking-[0.3em]");
    expect(without).not.toContain("tracking-[0.3em]");
  });

  it("adds the caller's classes to the section", () => {
    const html = renderToStaticMarkup(
      <RelatedStories stories={stories} id="more" heading="More" className="mt-24" />
    );

    expect(html).toContain("mt-24");
    expect(html).toContain("border-t");
  });
});
