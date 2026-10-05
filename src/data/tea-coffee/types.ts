/**
 * Tea & Coffee Department — Data Model
 * Ray's Healthy Living® Retailer
 *
 * These types are intentionally kept separate from the existing Product
 * interface so the Wholesale site can import them later without coupling.
 * Fields map 1-to-1 with the CSV columns defined in tea-coffee-template.csv.
 */

// ─── Shared primitives ────────────────────────────────────────────────────────

/** URL-safe slug, e.g. "arabica-reserve-whole-bean" */
export type Slug = string;

/** ISO-8601 date string, e.g. "2026-09-28" */
export type ISODate = string;

// ─── Tea & Coffee product ─────────────────────────────────────────────────────

export type ProductType = "tea" | "coffee";

/** Three coffee families, each available in three preparations. */
export type CoffeeType = "arabica" | "robusta" | "culi";

/** The three preparations that apply to every coffee family. */
export type GrindPreparation = "whole-bean" | "medium-ground" | "fine-specialty-grind";

/**
 * One of the eight tea sub-departments shown in the mega menu.
 * Keep in sync with MEGA_MENU_TEA_TYPES in the Header component.
 */
export type TeaType =
  | "loose-botanical-leaves"
  | "herbal-teas"
  | "flowers"
  | "roots"
  | "stems-traditional-botanicals"
  | "botanical-powders"
  | "tea-accessories"
  | "all-teas";

export interface TeaCoffeeProduct {
  // ── Identity ──────────────────────────────────────────────────────────────
  /** Internal UUID or RHL Product ID. Populated by the CSV loader. */
  id: string;
  /** RHL Product ID (numeric, matches backend rhlId when backend is connected). */
  rhlProductId: string;
  /** URL-safe slug used as the route param. */
  slug: Slug;
  /** Full display name, e.g. "Arabica Reserve — Whole Bean". */
  name: string;
  /** Department is always "tea-coffee" for this module. */
  department: "tea-coffee";
  /** Distinguishes tea from coffee at the top level. */
  productType: ProductType;

  // ── Coffee-specific (leave empty string "" for tea products) ──────────────
  /** "arabica" | "robusta" | "culi" — color-coded in UI. Empty for tea. */
  coffeeType: CoffeeType | "";
  /** Preparation method / grind level. Empty for tea. */
  grindPreparation: GrindPreparation | "";
  /** Short brewing instruction, e.g. "French press, 4 min, 94 °C". */
  brewingMethod: string;

  // ── Tea-specific (leave empty string "" for coffee products) ─────────────
  /** Matches one of the TeaType union values. Empty for coffee. */
  teaType: TeaType | "";
  /** Botanical family name, e.g. "Asteraceae". Empty for coffee. */
  botanicalFamily: string;
  /** Steeping instruction, e.g. "1 tsp per 240 ml, steep 5–7 min, 95 °C". */
  steepingMethod: string;

  // ── Shared product detail ─────────────────────────────────────────────────
  /** One or two adjectives, e.g. "Earthy, smooth". */
  flavorProfile: string;
  /** Country or region of origin, e.g. "Ethiopia". */
  origin: string;
  /** Retail size displayed on card, e.g. "250 g", "1 oz". */
  size: string;
  /** Retail price in USD. */
  price: number;
  /** Optional compare-at / was-price for sale display. */
  compareAtPrice: number | null;
  /** Whether item is in stock. */
  inStock: boolean;
  /** One sentence shown on collection cards. No medical claims. */
  shortDescription: string;
  /** Full body copy shown on detail page. Stored as a single string; use \n for paragraph breaks. */
  longDescription: string;
  /** Raw ingredient list as it appears on the label. */
  ingredientsList: string;
  /** Product-specific preparation notes shown on detail page. */
  preparation: string;
  /** Storage guidance, e.g. "Store in a cool, dry place away from light." */
  storageInstructions: string;
  /** Required safety / disclaimer text. Empty string if none. */
  caution: string;

  // ── Media ─────────────────────────────────────────────────────────────────
  /**
   * Pipe-separated list of image paths relative to /public, e.g.
   * "tea-coffee/chamomile-front.jpg|tea-coffee/chamomile-lifestyle.jpg"
   * The loader splits on | and uses index 0 as the cover image.
   */
  images: string;

  // ── Taxonomy links ────────────────────────────────────────────────────────
  /** Slug of a related TeaCoffeeArticle. Empty string if none. */
  relatedArticleSlug: string;
  /** Slug of a Health Concern page, e.g. "sleep". Empty string if none. */
  relatedHealthConcernSlug: string;
  /**
   * Slug of a U20X™ challenge. Empty string if none.
   * When non-empty, the U20XBridge component is rendered on the detail page.
   */
  relatedU20xChallenge: string;

  // ── Flags ─────────────────────────────────────────────────────────────────
  /**
   * TRUE for all records created from the initial placeholder CSV.
   * Set to false (or remove the record) when replaced with real product data.
   */
  isSample: boolean;
  isBestSeller: boolean;
  isNewArrival: boolean;

  // ── SEO ───────────────────────────────────────────────────────────────────
  seoTitle: string;
  metaDescription: string;
}

// ─── Article ──────────────────────────────────────────────────────────────────

export type ArticleCategory =
  | "tea-preparation"
  | "coffee-preparation"
  | "traditional-use"
  | "wellness"
  | "product-spotlight";

export interface TeaCoffeeArticle {
  id: string;
  slug: Slug;
  title: string;
  /** Short deck shown on list cards. */
  excerpt: string;
  /** Full article body. Markdown or plain text with \n for paragraphs. */
  body: string;
  category: ArticleCategory;
  /** Path relative to /public, e.g. "tea-coffee/articles/steeping-guide.jpg". */
  coverImage: string;
  publishedDate: ISODate;
  /** Slugs of TeaCoffeeProducts featured in or related to this article. */
  relatedProductSlugs: string[];
  /** Slug of a U20X™ challenge. Empty string if none. */
  relatedU20xChallenge: string;
  /** TRUE for placeholder articles — easy to find and delete. */
  isSample: boolean;
  seoTitle: string;
  metaDescription: string;
}

// ─── U20X™ Bridge ─────────────────────────────────────────────────────────────

/**
 * Lightweight reference used by the U20XBridge component.
 * Only rendered when a product or article has a non-empty relatedU20xChallenge.
 * Full U20X pages are out of scope for Phase 1.
 */
export interface U20XChallenge {
  /** URL-safe slug, becomes /u20x/<slug>. */
  slug: string;
  /** Short challenge title, e.g. "Morning Coffee Ritual". */
  title: string;
  /** One sentence describing the habit or routine. */
  description: string;
  /** CTA label on the bridge component, e.g. "Start this challenge →". */
  ctaLabel: string;
}

// ─── Loader output ────────────────────────────────────────────────────────────

/** Return type of parseCsvToTeaCoffeeProducts(). */
export interface TeaCoffeeCatalog {
  products: TeaCoffeeProduct[];
  /** All unique coffee types present in the loaded data. */
  coffeeTypes: CoffeeType[];
  /** All unique tea types present in the loaded data. */
  teaTypes: TeaType[];
  /** Count of records flagged as sample data. */
  sampleCount: number;
}
