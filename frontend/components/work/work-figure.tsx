import Image from "next/image";
import type { WorkImage } from "@/content/work/types";
import { cn } from "@/lib/utils";

type WorkFigureProps = {
  image: WorkImage;
  /** `sizes` for a figure that spans its container. Phone screenshots size themselves. */
  sizes: string;
  preload?: boolean;
  className?: string;
};

/**
 * Edge-to-edge below `sm` (the parent supplies the `px-6` gutter this cancels), framed above it.
 * Phone screenshots sit at phone scale on a tinted stage instead of stretching to the column.
 */
export function WorkFigure({ image, sizes, preload = false, className }: WorkFigureProps) {
  const caption = image.caption ? (
    <figcaption className="mt-4 max-w-[42.5rem] px-6 text-sm leading-relaxed text-fg-muted wrap-break-word sm:px-0">
      {image.caption}
    </figcaption>
  ) : null;

  if (image.kind === "mobile") {
    return (
      <figure className={cn("-mx-6 sm:mx-0", className)}>
        <div className="flex justify-center border-y border-border bg-bg-secondary px-6 py-12 sm:border md:py-20">
          <Image
            src={image.src}
            alt={image.alt}
            placeholder="blur"
            preload={preload}
            sizes="(min-width: 768px) 340px, 72vw"
            className="h-auto w-[min(72vw,340px)] rounded-[1.75rem] border border-border"
          />
        </div>
        {caption}
      </figure>
    );
  }

  return (
    <figure className={cn("-mx-6 sm:mx-0", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        placeholder="blur"
        preload={preload}
        sizes={sizes}
        className={cn(
          "block h-auto w-full bg-bg-tertiary",
          image.kind !== "photo" && "border-y border-border sm:border"
        )}
      />
      {caption}
    </figure>
  );
}
