import { describe, expect, it } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { registerNextMocks } from "@/tests/fixtures/next";

registerNextMocks();
const { RelatedPages } = await import("./related-pages");

const links = [
  { path: "/costa-rica/tourism", eyebrow: "Tourism", title: "Tourism title" },
  { path: "/costa-rica/redesign", eyebrow: "Redesign", title: "Redesign title" },
];

describe("RelatedPages", () => {
  it("renders nothing when there are no links", () => {
    expect(renderToStaticMarkup(<RelatedPages links={[]} id="services" heading="Services" />)).toBe(
      ""
    );
  });

  it("renders a labelled section with the heading", () => {
    const html = renderToStaticMarkup(
      <RelatedPages links={links} id="services" heading="Related services" />
    );

    expect(html).toContain('aria-labelledby="services"');
    expect(html).toContain('<h2 id="services"');
    expect(html).toContain("Related services");
  });

  it("renders one link per page with its eyebrow and title", () => {
    const html = renderToStaticMarkup(
      <RelatedPages links={links} id="services" heading="Related services" />
    );

    expect(html.match(/<li /g)).toHaveLength(2);
    expect(html).toContain('href="/costa-rica/tourism"');
    expect(html).toContain('href="/costa-rica/redesign"');
    expect(html).toContain("Tourism");
    expect(html).toContain("Redesign title");
  });

  it("hides the arrow from assistive technology", () => {
    const html = renderToStaticMarkup(
      <RelatedPages links={links} id="services" heading="Related services" />
    );

    expect(html).toContain('aria-hidden="true"');
  });

  it("puts the caller's classes on the section", () => {
    const html = renderToStaticMarkup(
      <RelatedPages links={links} id="services" heading="Services" className="grid gap-6" />
    );

    expect(html).toContain('<section aria-labelledby="services" class="grid gap-6">');
  });
});
