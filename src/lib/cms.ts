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
