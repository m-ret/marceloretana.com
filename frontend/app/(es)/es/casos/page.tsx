import type { Metadata } from "next";
import { BuildStoryIndex } from "@/components/work/build-story-index";
import { getBuildStories } from "@/lib/work";
import { workIndexMetadata } from "@/lib/work-seo";

export const metadata: Metadata = workIndexMetadata("es");

export default function CasosIndexPage() {
  return <BuildStoryIndex locale="es" stories={getBuildStories("es")} />;
}
