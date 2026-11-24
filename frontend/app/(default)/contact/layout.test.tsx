import { describe, expect, it } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";

const { default: ContactLayout, metadata } = await import("./layout");

describe("contact layout metadata", () => {
  it("makes the page its own canonical, not a copy of the home page", () => {
    expect(metadata.alternates?.canonical).toBe("/contact");
    expect(metadata.openGraph?.url).toBe("https://marceloretana.com/contact");
  });

  it("names the page and describes it", () => {
    expect(metadata.title).toBe("Contact");
    expect(metadata.description).toContain("web development services in Costa Rica");
    expect(metadata.openGraph?.title).toBe("Contact | Marcelo Retana");
  });

  it("points at its Spanish pair", () => {
    expect(metadata.alternates?.languages).toEqual({
      es: "/es/contacto",
      "x-default": "/contact",
    });
  });

  it("keeps the site name and locale for sharing", () => {
    expect(metadata.openGraph).toMatchObject({ siteName: "Marcelo Retana", locale: "en_US" });
  });
});

describe("ContactLayout", () => {
  it("renders the page it wraps, unchanged", () => {
    expect(
      renderToStaticMarkup(
        <ContactLayout>
          <p>the form</p>
        </ContactLayout>
      )
    ).toBe("<p>the form</p>");
  });
});
