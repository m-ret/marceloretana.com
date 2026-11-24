import { describe, expect, it, mock } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";

let pathname = "/work";
mock.module("next/navigation", () => ({ usePathname: () => pathname }));
mock.module("@/lib/language-pairs", () => ({
  getAlternatePath: (path: string) =>
    ({ "/work": "/es/casos", "/es/casos": "/work" })[path] ?? null,
  getLanguageHubFallback: (path: string) =>
    ({ "/blog/post": "/es", "/es/blog/post": "/costa-rica" })[path] ?? null,
}));
const { LanguageToggle } = await import("./language-toggle");

function renderAt(path: string, onGlass?: boolean) {
  pathname = path;
  return renderToStaticMarkup(<LanguageToggle onGlass={onGlass} />);
}

describe("LanguageToggle", () => {
  it("links the Spanish twin of an English page, in a Spanish label", () => {
    const html = renderAt("/work");

    expect(html).toContain('href="/es/casos"');
    expect(html).toContain('lang="es"');
    expect(html).toContain('aria-label="EN / ES: Cambiar a Español"');
  });

  it("links the English twin of a Spanish page", () => {
    const html = renderAt("/es/casos");

    expect(html).toContain('href="/work"');
    expect(html).toContain('lang="en"');
    expect(html).toContain('aria-label="EN / ES: Switch to English"');
  });

  it("starts its name with the visible text and repeats it as the tooltip", () => {
    const html = renderAt("/work");

    expect(html).toContain('title="EN / ES: Cambiar a Español"');
    expect(html).toContain("<span");
    expect(html).toContain(">EN</span>");
    expect(html).toContain(">ES</span>");
  });

  it("falls back to the other language's services hub", () => {
    expect(renderAt("/blog/post")).toContain('aria-label="EN / ES: Spanish services hub"');
    expect(renderAt("/blog/post")).toContain('href="/es"');
    expect(renderAt("/es/blog/post")).toContain('aria-label="EN / ES: English services hub"');
    expect(renderAt("/es/blog/post")).toContain('lang="en"');
  });

  it("renders nothing where the other language has no page", () => {
    expect(renderAt("/contact")).toBe("");
  });

  it("uses themed colors by default and white on the always-dark pill", () => {
    expect(renderAt("/work")).toContain("text-fg-muted hover:text-fg");
    expect(renderAt("/work")).not.toContain("text-white");

    const glass = renderAt("/work", true);
    expect(glass).toContain("text-white/75 hover:text-white");
    expect(glass).not.toContain("text-fg");
  });

  it("marks the current language", () => {
    expect(renderAt("/work")).toContain('<span class="text-fg">EN</span>');
    expect(renderAt("/es/casos")).toContain('<span class="text-fg">ES</span>');
    expect(renderAt("/es/casos", true)).toContain('<span class="text-white">ES</span>');
  });
});
