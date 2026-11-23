import { describe, expect, it } from "bun:test";
import { checkRelated, MAX_RELATED_PAGES, type MarketIndexEntry } from "./related";

const market = new Map<string, MarketIndexEntry>([
  ["/costa-rica/tourism", { locale: "en", alternatePath: "/es/turismo" }],
  ["/es/turismo", { locale: "es", alternatePath: "/costa-rica/tourism" }],
  ["/costa-rica/orphan", { locale: "en" }],
  ["/costa-rica/broken", { locale: "en", alternatePath: "/es/missing" }],
  ["/costa-rica/wrong-twin", { locale: "en", alternatePath: "/costa-rica/tourism" }],
]);
const slugs = ["alpha", "beta", "gamma"];

describe("checkRelated", () => {
  it("accepts known stories and an English page with a Spanish twin", () => {
    expect(
      checkRelated("alpha", ["beta", "gamma"], ["/costa-rica/tourism"], slugs, market)
    ).toEqual([]);
  });

  it("accepts a story that is proof for no page", () => {
    expect(checkRelated("alpha", ["beta", "gamma"], [], slugs, market)).toEqual([]);
  });

  it("rejects a story that relates to itself", () => {
    expect(checkRelated("alpha", ["alpha", "beta"], [], slugs, market)).toEqual([
      'relatedStories: "alpha" is the story itself',
    ]);
  });

  it("rejects a story that does not exist", () => {
    expect(checkRelated("alpha", ["beta", "nope"], [], slugs, market)).toEqual([
      'relatedStories: unknown story "nope"',
    ]);
  });

  it("rejects a story listed twice", () => {
    expect(checkRelated("alpha", ["beta", "beta"], [], slugs, market)).toEqual([
      'relatedStories: "beta" is listed twice',
    ]);
  });

  it("rejects more pages than the limit", () => {
    const pages = Array.from({ length: MAX_RELATED_PAGES + 1 }, () => "/costa-rica/tourism");
    const errors = checkRelated("alpha", ["beta", "gamma"], pages, slugs, market);
    expect(errors).toContain(`relatedPages: ${MAX_RELATED_PAGES + 1} pages; at most 3`);
  });

  it("rejects a page listed twice", () => {
    expect(
      checkRelated(
        "alpha",
        ["beta", "gamma"],
        ["/costa-rica/tourism", "/costa-rica/tourism"],
        slugs,
        market
      )
    ).toEqual(['relatedPages: "/costa-rica/tourism" is listed twice']);
  });

  it("rejects a path that is not a market page", () => {
    expect(checkRelated("alpha", ["beta", "gamma"], ["/nope"], slugs, market)).toEqual([
      'relatedPages: "/nope" is not a market page',
    ]);
  });

  it("rejects the Spanish page, since stories name the English one", () => {
    expect(checkRelated("alpha", ["beta", "gamma"], ["/es/turismo"], slugs, market)).toEqual([
      'relatedPages: "/es/turismo" must be the English page',
    ]);
  });

  it("rejects an English page whose Spanish twin is missing", () => {
    const paths = ["/costa-rica/orphan", "/costa-rica/broken", "/costa-rica/wrong-twin"];
    expect(checkRelated("alpha", ["beta", "gamma"], paths, slugs, market)).toEqual(
      paths.map((path) => `relatedPages: "${path}" has no Spanish twin through alternatePath`)
    );
  });
});
