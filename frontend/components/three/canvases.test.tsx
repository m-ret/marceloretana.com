import { describe, expect, it, mock } from "bun:test";
import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";

type CanvasProps = { frameloop?: string; children?: ReactNode };
mock.module("@react-three/fiber", () => ({
  Canvas: ({ frameloop, children }: CanvasProps) => (
    <div data-frameloop={frameloop}>{children}</div>
  ),
}));
mock.module("@/components/three/hero-scene", () => ({
  HeroScene: () => <i data-scene="hero" />,
}));
mock.module("@/components/three/contact-scene", () => ({
  ContactScene: () => <i data-scene="contact" />,
}));
const { HeroCanvas } = await import("./hero-canvas");
const { ContactCanvas } = await import("./contact-canvas");

describe.each([
  ["HeroCanvas", HeroCanvas, "hero"],
  ["ContactCanvas", ContactCanvas, "contact"],
] as const)("%s", (_name, Canvas, scene) => {
  it("renders its own scene", () => {
    expect(renderToStaticMarkup(<Canvas />)).toContain(`data-scene="${scene}"`);
  });

  it("renders every frame unless told otherwise", () => {
    expect(renderToStaticMarkup(<Canvas />)).toContain('data-frameloop="always"');
  });

  it("passes the frame schedule on to the canvas", () => {
    expect(renderToStaticMarkup(<Canvas frameloop="never" />)).toContain('data-frameloop="never"');
    expect(renderToStaticMarkup(<Canvas frameloop="demand" />)).toContain(
      'data-frameloop="demand"'
    );
  });
});
