import { z } from "zod";

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

// =============================================================================
// Zod Schemas
// =============================================================================

const strapiImageSchema = z.object({
  url: z.string(),
  alternativeText: z.string().nullable().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});

const blogPostSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string().nullable().optional(),
  content: z.array(z.any()).nullable().optional(),
  featuredImage: strapiImageSchema.nullable().optional(),
  publishedAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const experienceSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  company: z.string(),
  role: z.string(),
  description: z.string().nullable().optional(),
  startDate: z.string().nullable().optional(),
  endDate: z.string().nullable().optional(),
  current: z.boolean().optional(),
  order: z.number().optional(),
  companyLogo: strapiImageSchema.nullable().optional(),
});

const profileSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  name: z.string(),
  tagline: z.string().nullable().optional(),
  bio: z.string().nullable().optional(),
  profileImage: strapiImageSchema.nullable().optional(),
  email: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  linkedinUrl: z.string().nullable().optional(),
  skills: z.array(z.string()).nullable().optional(),
});

// =============================================================================
// Types (inferred from Zod schemas)
// =============================================================================

export type StrapiImage = z.infer<typeof strapiImageSchema>;
export type BlogPost = z.infer<typeof blogPostSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Profile = z.infer<typeof profileSchema>;

interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// =============================================================================
// Fetch Helper
// =============================================================================

async function fetchStrapi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (STRAPI_API_TOKEN) {
    headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
  }

  const response = await fetch(`${STRAPI_URL}/api${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...options?.headers,
    },
    next: {
      revalidate: 60, // ISR: revalidate every 60 seconds
    },
  });

  if (!response.ok) {
    throw new Error(`Strapi error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// =============================================================================
// API Functions with Zod Validation
// =============================================================================

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetchStrapi<StrapiResponse<unknown[]>>(
      "/blog-posts?populate=featuredImage&sort=publishedAt:desc&publicationState=live"
    );

    // Validate each post with Zod
    const validatedPosts = (response.data || [])
      .map((post) => {
        const result = blogPostSchema.safeParse(post);
        if (!result.success) {
          console.warn("Invalid blog post data:", result.error.flatten());
          return null;
        }
        return result.data;
      })
      .filter((post): post is BlogPost => post !== null);

    return validatedPosts;
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetchStrapi<StrapiResponse<unknown[]>>(
      `/blog-posts?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=featuredImage&publicationState=live`
    );

    const post = response.data?.[0];
    if (!post) return null;

    const result = blogPostSchema.safeParse(post);
    if (!result.success) {
      console.warn("Invalid blog post data:", result.error.flatten());
      return null;
    }

    return result.data;
  } catch (error) {
    console.error(`Failed to fetch blog post: ${slug}`, error);
    return null;
  }
}

export async function getExperiences(): Promise<Experience[]> {
  try {
    const response = await fetchStrapi<StrapiResponse<unknown[]>>(
      "/experiences?populate=companyLogo&sort=order:asc"
    );

    const validatedExperiences = (response.data || [])
      .map((exp) => {
        const result = experienceSchema.safeParse(exp);
        if (!result.success) {
          console.warn("Invalid experience data:", result.error.flatten());
          return null;
        }
        return result.data;
      })
      .filter((exp): exp is Experience => exp !== null);

    return validatedExperiences;
  } catch (error) {
    console.error("Failed to fetch experiences:", error);
    return [];
  }
}

export async function getProfile(): Promise<Profile | null> {
  try {
    const response = await fetchStrapi<StrapiResponse<unknown>>("/profile?populate=profileImage");

    if (!response.data) return null;

    const result = profileSchema.safeParse(response.data);
    if (!result.success) {
      console.warn("Invalid profile data:", result.error.flatten());
      return null;
    }

    return result.data;
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    return null;
  }
}

// =============================================================================
// Utility Functions
// =============================================================================

export function getStrapiImageUrl(image?: StrapiImage | null): string | null {
  if (!image?.url) return null;
  if (image.url.startsWith("http")) return image.url;
  return `${STRAPI_URL}${image.url}`;
}

// =============================================================================
// Query Keys (for React Query)
// =============================================================================

export const queryKeys = {
  blogPosts: ["blog-posts"] as const,
  blogPost: (slug: string) => ["blog-post", slug] as const,
  experiences: ["experiences"] as const,
  profile: ["profile"] as const,
};
