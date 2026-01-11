const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

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

interface StrapiImage {
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
}

export interface BlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: unknown[];
  featuredImage?: StrapiImage;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Experience {
  id: number;
  documentId: string;
  company: string;
  role: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  current: boolean;
  order: number;
  companyLogo?: StrapiImage;
}

export interface Profile {
  id: number;
  documentId: string;
  name: string;
  tagline?: string;
  bio?: string;
  profileImage?: StrapiImage;
  email?: string;
  phone?: string;
  linkedinUrl?: string;
  skills?: string[];
}

async function fetchStrapi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (STRAPI_API_TOKEN) {
    headers["Authorization"] = `Bearer ${STRAPI_API_TOKEN}`;
  }

  const response = await fetch(`${STRAPI_URL}/api${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Strapi error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetchStrapi<StrapiResponse<BlogPost[]>>(
      "/blog-posts?populate=featuredImage&sort=publishedAt:desc&publicationState=live"
    );
    return response.data || [];
  } catch {
    console.error("Failed to fetch blog posts");
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetchStrapi<StrapiResponse<BlogPost[]>>(
      `/blog-posts?filters[slug][$eq]=${slug}&populate=featuredImage&publicationState=live`
    );
    return response.data?.[0] || null;
  } catch {
    console.error(`Failed to fetch blog post: ${slug}`);
    return null;
  }
}

export async function getExperiences(): Promise<Experience[]> {
  try {
    const response = await fetchStrapi<StrapiResponse<Experience[]>>(
      "/experiences?populate=companyLogo&sort=order:asc"
    );
    return response.data || [];
  } catch {
    console.error("Failed to fetch experiences");
    return [];
  }
}

export async function getProfile(): Promise<Profile | null> {
  try {
    const response = await fetchStrapi<StrapiResponse<Profile>>("/profile?populate=profileImage");
    return response.data || null;
  } catch {
    console.error("Failed to fetch profile");
    return null;
  }
}

export function getStrapiImageUrl(image?: StrapiImage): string | null {
  if (!image?.url) return null;
  if (image.url.startsWith("http")) return image.url;
  return `${STRAPI_URL}${image.url}`;
}
