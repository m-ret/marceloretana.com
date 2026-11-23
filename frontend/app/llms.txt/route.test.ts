import { describe, expect, it, mock } from "bun:test";
import { registerWorkMock } from "@/tests/fixtures/work";

registerWorkMock();
mock.module("@/lib/posts", () => ({
  getAllPosts: () => [{ slug: "hello-world", title: "Hello world", excerpt: "A first post" }],
}));
const { GET, dynamic } = await import("./route");

describe("GET /llms.txt", () => {
  it("is generated at build time", () => {
    expect(dynamic).toBe("force-static");
  });

  it("serves plain text", () => {
    const response = GET();

    expect(response.headers.get("Content-Type")).toBe("text/plain; charset=utf-8");
  });

  it("links the work index from the About list", async () => {
    const text = await GET().text();

    expect(text).toContain(
      "- [Work](https://marceloretana.com/work): First-person build stories from real projects"
    );
  });

  it("lists every case study with its English link and excerpt", async () => {
    const text = await GET().text();

    expect(text).toContain(
      "- [alpha title en](https://marceloretana.com/work/alpha): alpha excerpt en"
    );
    expect(text).toContain(
      "- [beta title en](https://marceloretana.com/work/beta): beta excerpt en"
    );
    expect(text).toContain(
      "- [gamma title en](https://marceloretana.com/work/gamma): gamma excerpt en"
    );
  });

  it("points to both indexes, the Spanish twins and the company version", async () => {
    const text = await GET().text();

    expect(text).toContain("## Case Studies");
    expect(text).toContain("English index: https://marceloretana.com/work\n");
    expect(text).toContain("Spanish index: https://marceloretana.com/es/casos\n");
    expect(text).toContain("https://marceloretana.com/es/casos/<same-slug>");
    expect(text).toContain("https://gexpsoftware.com/work/<same-slug>");
  });

  it("puts the case studies before the blog posts and keeps the posts", async () => {
    const text = await GET().text();

    expect(text.indexOf("## Case Studies")).toBeLessThan(text.indexOf("## Blog Posts"));
    expect(text).toContain(
      "- [Hello world](https://marceloretana.com/blog/hello-world): A first post"
    );
  });
});
