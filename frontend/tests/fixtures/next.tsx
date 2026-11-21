import { mock } from "bun:test";
import type { ReactNode } from "react";

type LinkProps = { href: string; children?: ReactNode; className?: string };
type ImageProps = {
  src: string | { src: string };
  alt: string;
  sizes?: string;
  className?: string;
};

/** Plain `a` and `img` elements in place of Next's link and image components. */
export function registerNextMocks(): void {
  mock.module("next/link", () => ({
    default: ({ href, children, className }: LinkProps) => (
      <a href={href} className={className}>
        {children}
      </a>
    ),
  }));
  mock.module("next/image", () => ({
    default: ({ src, alt, sizes, className }: ImageProps) => (
      // biome-ignore lint/performance/noImgElement: a test double for next/image
      <img
        src={typeof src === "string" ? src : src.src}
        alt={alt}
        sizes={sizes}
        className={className}
      />
    ),
  }));
}
