import { describe, expect, it } from "bun:test";
import { comparisonAlternateUrl } from "@/lib/compare-alternates";

describe("comparisonAlternateUrl", () => {
  it("sends an English comparison to its Spanish page, not to the redirecting -es address", () => {
    expect(comparisonAlternateUrl("nextjs-vs-astro", "en")).toBe(
      "https://marceloretana.com/es/compare/nextjs-vs-astro"
    );
  });

  it("sends a Spanish comparison to its English page", () => {
    expect(comparisonAlternateUrl("nextjs-vs-astro", "es")).toBe(
      "https://marceloretana.com/compare/nextjs-vs-astro"
    );
  });

  it("drops the -es that Spanish files carry on disk", () => {
    expect(comparisonAlternateUrl("react-vs-vue-es", "es")).toBe(
      "https://marceloretana.com/compare/react-vs-vue"
    );
  });

  it("only drops a trailing -es", () => {
    expect(comparisonAlternateUrl("tools-es-vs-bun-es", "es")).toBe(
      "https://marceloretana.com/compare/tools-es-vs-bun"
    );
  });
});
