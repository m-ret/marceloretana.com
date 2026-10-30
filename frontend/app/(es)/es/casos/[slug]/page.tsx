import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BuildStoryPage } from "@/components/work/build-story-page";
import { getBuildStory, getBuildStorySlugs } from "@/lib/work";
import { buildStoryMetadata } from "@/lib/work-seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getBuildStorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getBuildStory("es", slug);
  return story ? buildStoryMetadata(story) : { title: "Caso no encontrado" };
}

export default async function CasoPage({ params }: PageProps) {
  const { slug } = await params;
  const story = getBuildStory("es", slug);

  if (!story) {
    notFound();
  }

  return <BuildStoryPage story={story} />;
}
