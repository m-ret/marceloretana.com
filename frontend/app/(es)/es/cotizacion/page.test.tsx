import { describe, expect, it, mock } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { fakeParent } from "@/tests/fixtures/metadata";

mock.module("@/components/sections/contact-form", () => ({
  ContactForm: ({ locale, sourcePage }: { locale: string; sourcePage: string }) => (
    <form data-locale={locale} data-source={sourcePage} />
  ),
}));
const { default: CotizacionPage, generateMetadata } = await import("./page");

const images = [{ url: "/es/opengraph-image-abc123" }];

describe("Spanish quote page metadata", () => {
  it("is its own canonical and leaves the brand to the root title template", async () => {
    const metadata = await generateMetadata(undefined, fakeParent(images));

    expect(metadata.alternates?.canonical).toBe("/es/cotizacion");
    expect(metadata.title).toBe("Solicitar Cotización");
  });

  it("points back at the English quote page, which points at it", async () => {
    const metadata = await generateMetadata(undefined, fakeParent(images));

    expect(metadata.alternates?.languages).toEqual({
      en: "/costa-rica/quote",
      "x-default": "/costa-rica/quote",
    });
  });

  it("is shared with its own title and address, and with the Spanish share image", async () => {
    const metadata = await generateMetadata(undefined, fakeParent(images));

    expect(metadata.openGraph).toMatchObject({
      title: "Solicitar Cotización | Marcelo Retana",
      url: "https://marceloretana.com/es/cotizacion",
      locale: "es_CR",
      images,
    });
  });
});

describe("CotizacionPage", () => {
  it("shows the Costa Rica form and reports where it was filled in", () => {
    const html = renderToStaticMarkup(<CotizacionPage />);

    expect(html).toContain('data-locale="cr"');
    expect(html).toContain('data-source="/es/cotizacion"');
  });

  it("has one heading for people who use a screen reader", () => {
    const html = renderToStaticMarkup(<CotizacionPage />);

    expect(html.match(/<h1/g)).toHaveLength(1);
    expect(html).toContain('<h1 class="sr-only">Solicitar cotización</h1>');
  });
});
