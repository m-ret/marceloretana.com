import { describe, expect, it, mock } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";

mock.module("@/components/sections/contact-form", () => ({
  ContactForm: ({ locale, sourcePage }: { locale: string; sourcePage: string }) => (
    <form data-locale={locale} data-source={sourcePage} />
  ),
}));
const { default: ContactoPage, metadata } = await import("./page");

describe("Spanish contact page metadata", () => {
  it("is its own canonical", () => {
    expect(metadata.alternates?.canonical).toBe("/es/contacto");
  });

  it("leaves the brand to the root title template", () => {
    expect(metadata.title).toBe("Contacto");
  });

  it("points back at its English pair, as the English page points at it", () => {
    expect(metadata.alternates?.languages).toEqual({ en: "/contact", "x-default": "/contact" });
  });
});

describe("ContactoPage", () => {
  it("shows the Costa Rica form and reports where it was filled in", () => {
    const html = renderToStaticMarkup(<ContactoPage />);

    expect(html).toContain('data-locale="cr"');
    expect(html).toContain('data-source="/es/contacto"');
  });
});
