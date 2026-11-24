import { describe, expect, it, mock } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { fakeParent } from "@/tests/fixtures/metadata";

mock.module("@/components/sections/contact-form", () => ({
  ContactForm: ({ locale, sourcePage }: { locale: string; sourcePage: string }) => (
    <form data-locale={locale} data-source={sourcePage} />
  ),
}));
const { default: ContactoPage, generateMetadata } = await import("./page");

const images = [{ url: "/es/opengraph-image-abc123" }];

describe("Spanish contact page metadata", () => {
  it("is its own canonical", async () => {
    const metadata = await generateMetadata(undefined, fakeParent(images));

    expect(metadata.alternates?.canonical).toBe("/es/contacto");
  });

  it("leaves the brand to the root title template", async () => {
    const metadata = await generateMetadata(undefined, fakeParent(images));

    expect(metadata.title).toBe("Contacto");
  });

  it("points back at its English pair, as the English page points at it", async () => {
    const metadata = await generateMetadata(undefined, fakeParent(images));

    expect(metadata.alternates?.languages).toEqual({ en: "/contact", "x-default": "/contact" });
  });

  it("is shared with its own title and address, and with the Spanish share image", async () => {
    const metadata = await generateMetadata(undefined, fakeParent(images));

    expect(metadata.openGraph).toMatchObject({
      title: "Contacto | Marcelo Retana",
      url: "https://marceloretana.com/es/contacto",
      locale: "es_CR",
      images,
    });
  });
});

describe("ContactoPage", () => {
  it("shows the Costa Rica form and reports where it was filled in", () => {
    const html = renderToStaticMarkup(<ContactoPage />);

    expect(html).toContain('data-locale="cr"');
    expect(html).toContain('data-source="/es/contacto"');
  });

  it("has one heading for people who use a screen reader", () => {
    const html = renderToStaticMarkup(<ContactoPage />);

    expect(html.match(/<h1/g)).toHaveLength(1);
    expect(html).toContain('<h1 class="sr-only">Contacto</h1>');
  });
});
