import { mock } from "bun:test";
import type { ReactNode } from "react";

type LinkProps = { href: string; children?: ReactNode; className?: string; onClick?: () => void };
type ImageProps = {
  src: string | { src: string };
  alt: string;
  sizes?: string;
  className?: string;
  preload?: boolean;
};

/** Plain `a` and `img` elements in place of Next's link and image components. */
export function registerNextMocks(): void {
  mock.module("next/link", () => ({
    default: ({ href, children, className, onClick }: LinkProps) => (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    ),
  }));
  mock.module("next/image", () => ({
    default: ({ src, alt, sizes, className, preload }: ImageProps) => (
      // biome-ignore lint/performance/noImgElement: a test double for next/image
      <img
        src={typeof src === "string" ? src : src.src}
        alt={alt}
        sizes={sizes}
        className={className}
        loading={preload ? "eager" : "lazy"}
        data-preload={preload ? "true" : undefined}
      />
    ),
  }));
}
