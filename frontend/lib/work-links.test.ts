import { describe, expect, it } from "bun:test";
import { registerMarketMock } from "@/tests/fixtures/market";
import { registerWorkMock } from "@/tests/fixtures/work";

registerWorkMock();
registerMarketMock();
const { getRelatedPages, getStoriesForPage } = await import("@/lib/work-links");

describe("getRelatedPages", () => {
  it("links the English pages for an English story", () => {
    expect(
      getRelatedPages({
        locale: "en",
        relatedPages: ["/costa-rica/tourism", "/costa-rica/redesign"],
      })
    ).toEqual([
      { path: "/costa-rica/tourism", eyebrow: "Tourism", title: "Tourism title" },
      { path: "/costa-rica/redesign", eyebrow: "Redesign", title: "Redesign title" },
    ]);
  });

  it("links the Spanish twins for a Spanish story", () => {
    expect(
      getRelatedPages({
        locale: "es",
        relatedPages: ["/costa-rica/tourism", "/costa-rica/redesign"],
      })
    ).toEqual([
      { path: "/es/turismo", eyebrow: "Turismo", title: "Título de turismo" },
      { path: "/es/rediseno", eyebrow: "Rediseño", title: "Título de rediseño" },
    ]);
  });

  it("returns nothing for a story that is proof for no page", () => {
    expect(getRelatedPages({ locale: "en", relatedPages: [] })).toEqual([]);
  });

  it("skips a path that is not a market page", () => {
    expect(getRelatedPages({ locale: "en", relatedPages: ["/nope"] })).toEqual([]);
  });

  it("keeps an English page that has no Spanish twin, but skips it in Spanish", () => {
    const relatedPages = ["/costa-rica/orphan"];

    expect(getRelatedPages({ locale: "en", relatedPages }).map((link) => link.path)).toEqual([
      "/costa-rica/orphan",
    ]);
    expect(getRelatedPages({ locale: "es", relatedPages })).toEqual([]);
  });
});

describe("getStoriesForPage", () => {
  it("lists the English stories that name an English page, in registry order", () => {
    expect(getStoriesForPage("/costa-rica/tourism").map((story) => story.path)).toEqual([
      "/work/alpha",
      "/work/beta",
    ]);
  });

  it("lists the Spanish stories for the Spanish twin of that page", () => {
    expect(getStoriesForPage("/es/turismo").map((story) => story.path)).toEqual([
      "/es/casos/alpha",
      "/es/casos/beta",
    ]);
  });

  it("lists only the stories that name the page", () => {
    expect(getStoriesForPage("/costa-rica/redesign").map((story) => story.slug)).toEqual(["beta"]);
  });

  it("returns nothing for a page no story names", () => {
    expect(getStoriesForPage("/costa-rica")).toEqual([]);
  });

  it("returns nothing for a path that is not a market page", () => {
    expect(getStoriesForPage("/nope")).toEqual([]);
  });

  it("returns nothing for a Spanish page without an English twin", () => {
    expect(getStoriesForPage("/es/solo")).toEqual([]);
  });
});
