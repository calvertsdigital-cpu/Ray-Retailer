/**
 * Lightweight, browser-side content overrides ("admin mode").
 *
 * Product records ship with the app as data. The admin screen writes edits
 * into localStorage as a thin override layer keyed by product slug, and the
 * catalog applies them at load time — so every page (shop, product page,
 * categories, brands, health concerns) reflects the edits with no code change.
 *
 * This is deliberately storage-only: it is Phase 1 authoring, not a
 * multi-user backend. Moving the same override shape into a database later
 * requires no change to the pages.
 */
import type { Product } from "@/data/types";

export const CMS_STORAGE_KEY = "rhl.cms.v1";
export const ADMIN_FLAG_KEY = "rhl.admin.v1";

export interface ProductOverride {
  name?: string;
  brand?: string;
  category?: string;
  shortDescription?: string;
  supportStatement?: string;
  longDescription?: string[];
  price?: number;
  image?: string;
  inStock?: boolean;
  hidden?: boolean;
}

export type OverrideMap = Record<string, ProductOverride>;

export function readOverrides(): OverrideMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(CMS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as OverrideMap) : {};
  } catch {
    return {};
  }
}

export function writeOverrides(map: OverrideMap) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(map));
}

/** Mutates the in-memory catalog so every page renders the edited content. */
export function applyStoredOverrides(list: Product[]) {
  const map = readOverrides();
  if (!Object.keys(map).length) return;
  for (const product of list) {
    const patch = map[product.slug];
    if (!patch) continue;
    if (patch.name) product.name = patch.name;
    if (patch.brand) product.brand = patch.brand;
    if (patch.category) product.category = patch.category;
    if (patch.shortDescription) product.shortDescription = patch.shortDescription;
    if (patch.supportStatement) product.supportStatement = patch.supportStatement;
    if (patch.longDescription) product.longDescription = patch.longDescription;
    if (typeof patch.price === "number") product.price = patch.price;
    if (typeof patch.inStock === "boolean") product.inStock = patch.inStock;
    if (patch.image) {
      product.media = product.media.map((m, i) => (i === 0 ? { ...m, src: patch.image! } : m));
    }
  }
}

/** Slugs the admin has hidden from the storefront. */
export function hiddenSlugs(): Set<string> {
  return new Set(
    Object.entries(readOverrides())
      .filter(([, v]) => v.hidden)
      .map(([slug]) => slug),
  );
}

export function isAdmin() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(ADMIN_FLAG_KEY) === "granted";
}

// ---------------------------------------------------------------------------
// Blog CMS — same localStorage pattern as product overrides
// ---------------------------------------------------------------------------

export const BLOG_CMS_KEY = "rhl.blog.v1";

/**
 * A blog post record as stored/edited in the admin.
 * All fields are optional so the admin can save partial drafts.
 * Merged with the static blogPosts array at runtime.
 */
export interface BlogPostDraft {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categorySlug?: string;
  author: string;
  authorBrandLine?: string;
  date: string;          // ISO YYYY-MM-DD
  readTime: string;
  featureImageUrl: string;
  featureImageAlt: string;
  featureOverlayText?: string;
  subtitle?: string;
  body: string[];        // one paragraph per item
  bottomLine?: string;
  published: boolean;
  // SEO
  seoTitle?: string;
  metaDescription?: string;
  // relationships
  relatedSlugs?: string[];
  tags?: string[];
  // CMS meta
  _source: "admin";      // marks as admin-created vs static
  _createdAt: string;    // ISO timestamp
  _updatedAt: string;
}

export type BlogDraftMap = Record<string, BlogPostDraft>;

export function readBlogDrafts(): BlogDraftMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(BLOG_CMS_KEY);
    return raw ? (JSON.parse(raw) as BlogDraftMap) : {};
  } catch {
    return {};
  }
}

export function writeBlogDrafts(map: BlogDraftMap) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(BLOG_CMS_KEY, JSON.stringify(map));
}

export function saveBlogPost(post: BlogPostDraft) {
  const map = readBlogDrafts();
  map[post.slug] = { ...post, _updatedAt: new Date().toISOString() };
  writeBlogDrafts(map);
}

export function deleteBlogPost(slug: string) {
  const map = readBlogDrafts();
  delete map[slug];
  writeBlogDrafts(map);
}

/** Generate a URL-safe slug from a title */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}
