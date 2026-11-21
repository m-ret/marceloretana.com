import { describe, expect, it } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { registerMarketMock } from "@/tests/fixtures/market";
import { registerNextMocks } from "@/tests/fixtures/next";
import { registerWorkMock } from "@/tests/fixtures/work";

registerNextMocks();
registerWorkMock();
registerMarketMock();
const { RelatedWorkSection } = await import("./related-work-section");

describe("RelatedWorkSection", () => {
  it("shows the English stories on an English service page", () => {
    const html = renderToStaticMarkup(
      <RelatedWorkSection locale="en" path="/costa-rica/tourism" />
    );

    expect(html).toContain("Case studies");
    expect(html).toContain("Related projects, and how I built them.");
    expect(html).toContain('href="/work/alpha"');
    expect(html).toContain('href="/work/beta"');
    expect(html).not.toContain("/work/gamma");
  });

  it("shows the Spanish stories on the Spanish twin", () => {
    const html = renderToStaticMarkup(<RelatedWorkSection locale="es" path="/es/turismo" />);

    expect(html).toContain("Casos");
    expect(html).toContain("Proyectos relacionados y cómo los construí.");
    expect(html).toContain('href="/es/casos/alpha"');
    expect(html).toContain('href="/es/casos/beta"');
  });

  it("renders nothing when no story is proof for the page", () => {
    expect(renderToStaticMarkup(<RelatedWorkSection locale="en" path="/costa-rica" />)).toBe("");
  });

  it("passes the caller's classes to the section", () => {
    const html = renderToStaticMarkup(
      <RelatedWorkSection locale="en" path="/costa-rica/redesign" className="mt-16 max-w-6xl" />
    );

    expect(html).toContain("mt-16");
    expect(html).toContain("max-w-6xl");
  });
});
