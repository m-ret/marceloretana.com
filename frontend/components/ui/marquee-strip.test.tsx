import { describe, expect, it } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { MarqueeStrip } from "./marquee-strip";

describe("MarqueeStrip", () => {
  const html = renderToStaticMarkup(<MarqueeStrip />);

  it("repeats its phrases so the scroll can loop", () => {
    expect(html.match(/Building The Future/g)).toHaveLength(4);
    expect(html).toContain("animate-marquee");
  });

  it("exposes only the first copy to assistive technology", () => {
    expect(html.match(/aria-hidden="true"/g)).toHaveLength(3);
    expect(html.indexOf("aria-hidden")).toBeGreaterThan(html.indexOf("Creating Impact"));
  });

  it("uses chip colors that keep white text readable", () => {
    expect(html).toContain("bg-rose-600 text-white");
    expect(html).toContain("bg-violet-600 text-white");
    expect(html).not.toContain("bg-rose-500");
    expect(html).not.toContain("bg-violet-500");
  });
});
