import { afterEach, describe, expect, it } from "bun:test";
import {
  FAKE_SOURCE_COUNT,
  fakeSources,
  makeCopy,
  makeSource,
  registerWorkMock,
} from "@/tests/fixtures/work";

registerWorkMock();
const { getBuildStories, getBuildStory, getBuildStorySlugs, workPath } = await import("@/lib/work");

afterEach(() => {
  fakeSources.splice(FAKE_SOURCE_COUNT);
});

describe("workPath", () => {
  it("builds English paths", () => {
    expect(workPath("en")).toBe("/work");
    expect(workPath("en", "alpha")).toBe("/work/alpha");
  });

  it("builds Spanish paths", () => {
    expect(workPath("es")).toBe("/es/casos");
    expect(workPath("es", "alpha")).toBe("/es/casos/alpha");
  });
});

describe("getBuildStories", () => {
  it("lists every story in registry order", () => {
    expect(getBuildStories("en").map((story) => story.slug)).toEqual(["alpha", "beta", "gamma"]);
  });

  it("localizes copy, paths and image text", () => {
    const [alpha] = getBuildStories("es");

    expect(alpha.title).toBe("alpha title es");
    expect(alpha.path).toBe("/es/casos/alpha");
    expect(alpha.caseStudyUrl).toBe("https://gexpsoftware.com/cr/casos/alpha");
    expect(alpha.hero.alt).toBe("alpha-hero alt es");
    expect(alpha.sections[0].image?.alt).toBe("alpha-figure alt es");
    expect(alpha.sections[0].image?.caption).toBe("alpha-figure caption es");
    expect(alpha.sections[1].image).toBeNull();
  });

  it("links the English case study on gexpsoftware.com", () => {
    expect(getBuildStories("en")[0].caseStudyUrl).toBe("https://gexpsoftware.com/work/alpha");
  });

  it("wraps next around to the first story", () => {
    const stories = getBuildStories("en");

    expect(stories[0].next).toEqual({
      slug: "beta",
      name: "beta name",
      title: "beta title en",
      path: "/work/beta",
    });
    expect(stories[2].next.slug).toBe("alpha");
  });

  it("flags own products", () => {
    expect(getBuildStories("en").map((story) => story.ownProduct)).toEqual([false, false, true]);
  });

  it("resolves related stories as previews in the story's language", () => {
    const [alpha] = getBuildStories("es");

    expect(alpha.related.map((story) => story.path)).toEqual(["/es/casos/beta", "/es/casos/gamma"]);
    expect(alpha.related[0]).toEqual({
      slug: "beta",
      name: "beta name",
      year: "2026",
      title: "beta title es",
      sector: "beta sector es",
      path: "/es/casos/beta",
      hero: {
        src: fakeSources[1].images.hero.src,
        kind: "desktop",
        alt: "beta-hero alt es",
        caption: "beta-hero caption es",
      },
    });
  });

  it("passes through the pages a story is proof for", () => {
    expect(getBuildStories("en").map((story) => story.relatedPages)).toEqual([
      ["/costa-rica/tourism"],
      ["/costa-rica/tourism", "/costa-rica/redesign"],
      [],
    ]);
  });

  it("throws when a related story does not exist", () => {
    fakeSources.push(makeSource("broken", { relatedStories: ["alpha", "nope"] }));

    expect(() => getBuildStory("en", "broken")).toThrow(
      'broken: lists an invalid related story "nope"'
    );
  });

  it("throws when a story lists itself as related", () => {
    fakeSources.push(makeSource("broken", { relatedStories: ["alpha", "broken"] }));

    expect(() => getBuildStory("en", "broken")).toThrow(
      'broken: lists an invalid related story "broken"'
    );
  });

  it("throws when a section names an image the story does not have", () => {
    fakeSources.push(
      makeSource("broken", {
        copy: { en: makeCopy("broken", "en", "missing"), es: makeCopy("broken", "es") },
      })
    );

    expect(() => getBuildStory("en", "broken")).toThrow('broken: unknown image "missing"');
  });
});

describe("getBuildStory", () => {
  it("returns one story by slug", () => {
    expect(getBuildStory("en", "beta")?.name).toBe("beta name");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getBuildStory("en", "nope")).toBeUndefined();
  });
});

describe("getBuildStorySlugs", () => {
  it("lists the slugs in registry order", () => {
    expect(getBuildStorySlugs()).toEqual(["alpha", "beta", "gamma"]);
  });
});
