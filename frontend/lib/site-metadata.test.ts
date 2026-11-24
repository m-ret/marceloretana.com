import { describe, expect, it } from "bun:test";
import { fakeParent } from "@/tests/fixtures/metadata";

const { siteMetadata, withShareImages } = await import("./site-metadata");

describe("siteMetadata", () => {
  it("gives the English pages a share image and a Twitter image", () => {
    expect(siteMetadata.openGraph?.images).toEqual([
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Marcelo Retana - Full-Stack Developer",
      },
    ]);
    expect(siteMetadata.twitter?.images).toEqual(["/twitter-image"]);
  });
});

describe("withShareImages", () => {
  const spanish = [{ url: "/es/opengraph-image-abc123" }];

  it("puts the layouts' share image back into a page's own openGraph", async () => {
    const metadata = {
      openGraph: { title: "Blog | Marcelo Retana", url: "https://marceloretana.com/blog" },
    };

    const result = await withShareImages(metadata, fakeParent(spanish));

    expect(result.openGraph).toEqual({
      title: "Blog | Marcelo Retana",
      url: "https://marceloretana.com/blog",
      images: spanish,
    });
  });

  it("keeps everything else the page set", async () => {
    const metadata = { title: "Blog", description: "Notes", openGraph: { title: "Blog" } };

    const result = await withShareImages(metadata, fakeParent(spanish));

    expect(result.title).toBe("Blog");
    expect(result.description).toBe("Notes");
  });

  it("gives a page without its own openGraph one with the images", async () => {
    const result = await withShareImages({ title: "Contacto" }, fakeParent(spanish));

    expect(result.openGraph).toEqual({ images: spanish });
  });

  it("does not touch the page when its layouts have no share image", async () => {
    const metadata = { openGraph: { title: "Blog" } };

    expect(await withShareImages(metadata, fakeParent())).toBe(metadata);
  });
});
