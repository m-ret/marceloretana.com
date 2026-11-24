import type { ResolvingMetadata } from "next";

type ShareImage = { url: string };

/** What a page's layouts resolved before it. `undefined` stands for layouts without a share image. */
export function fakeParent(images?: ShareImage[]): ResolvingMetadata {
  return Promise.resolve({
    openGraph: images ? { images } : undefined,
  }) as unknown as ResolvingMetadata;
}
