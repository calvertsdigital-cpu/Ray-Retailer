/**
 * Fetches published blog posts from the Ray's Healthy Living backend.
 * The admin creates posts via /api/admin/get-all-blogs (retailer websiteRole).
 * This merges backend posts with the static hardcoded posts.
 */
import type { BlogPost } from "@/data/blog";
import { blogPosts } from "@/data/blog";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://ray-wholsell.onrender.com";

export interface BackendBlogPost {
  _id: string;
  title: string;
  slug?: string;
  subtitle?: string;
  excerpt?: string;
  content: string;
  category?: string;
  categorySlug?: string;
  authorDisplayName?: string;
  authorBrandLine?: string;
  featureImage?: string;
  featureImageAlt?: string;
  featureOverlayText?: string;
  images?: string[];
  tags?: string[];
  readTime?: string;
  published: boolean;
  publishedAt?: string;
  createdAt: string;
  seoTitle?: string;
  metaDescription?: string;
  bottomLine?: string;
  relatedSlugs?: string[];
  author?: { name?: string };
}

/** Convert a backend blog post to the retailer BlogPost shape */
function toRetailerPost(b: BackendBlogPost): BlogPost {
  // Build a slug: prefer stored slug, else slugify title
  const slug =
    b.slug ||
    b.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 80);

  // Pick best image URL
  const featureImageUrl = b.featureImage || b.images?.[0] || "";

  // Paragraphs from plain-text content
  const body = b.content
    ? b.content
        .replace(/<[^>]+>/g, " ")
        .split(/\n+/)
        .map((p) => p.trim())
        .filter(Boolean)
    : [];

  return {
    slug,
    title: b.title,
    subtitle: b.subtitle || "",
    excerpt: b.excerpt || body[0]?.slice(0, 160) || "",
    category: b.category || "General",
    categorySlug: b.categorySlug || "",
    author: b.authorDisplayName || b.author?.name || "Ray's Healthy Living",
    authorBrandLine: b.authorBrandLine || "Ray's Healthy Living",
    date: b.publishedAt?.slice(0, 10) || b.createdAt?.slice(0, 10) || new Date().toISOString().slice(0, 10),
    readTime: b.readTime || "5 min read",
    featureImageUrl,
    featureImageAlt: b.featureImageAlt || b.title,
    featureOverlayText: b.featureOverlayText || "",
    body,
    bottomLine: b.bottomLine || "",
    published: b.published,
    relatedSlugs: b.relatedSlugs || [],
    relatedArticleSlugs: b.relatedSlugs || [],
    tags: b.tags || [],
    seoTitle: b.seoTitle || `${b.title} | Ray's Healthy Living`,
    metaDescription: b.metaDescription || b.excerpt || "",
  };
}

/** Fetch all published retailer posts from backend, merge with static posts.
 *  Static posts are always shown. Backend posts with matching slugs override static ones. */
export async function fetchAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/admin/get-all-blogs`, {
      headers: { "Content-Type": "application/json" },
      // 6-second timeout
      signal: AbortSignal.timeout(6000),
    });

    if (!res.ok) throw new Error(`Backend returned ${res.status}`);

    const data = await res.json();
    const raw: BackendBlogPost[] = data.blogs || data || [];
    const apiPosts = raw.filter((b) => b.published).map(toRetailerPost);

    // Override static posts with API versions if slug matches; append new ones
    const staticFiltered = blogPosts.filter(
      (s) => !apiPosts.some((a) => a.slug === s.slug)
    );

    return [...apiPosts, ...staticFiltered].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch {
    // Network error or timeout — fall back to static posts silently
    return blogPosts;
  }
}

/** Fetch a single post by slug — tries backend first, falls back to static */
export async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const all = await fetchAllBlogPosts();
    return all.find((p) => p.slug === slug && p.published) ?? null;
  } catch {
    return blogPosts.find((p) => p.slug === slug && p.published) ?? null;
  }
}
