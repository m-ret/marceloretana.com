import type { Metadata } from "next";
import { BuildStoryIndex } from "@/components/work/build-story-index";
import { getBuildStories } from "@/lib/work";
import { workIndexMetadata } from "@/lib/work-seo";

export const metadata: Metadata = workIndexMetadata("en");

export default function WorkIndexPage() {
  return <BuildStoryIndex locale="en" stories={getBuildStories("en")} />;
}
