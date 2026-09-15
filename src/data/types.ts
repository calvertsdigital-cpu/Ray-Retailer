/**
 * Content model for the Ray's Healthy Living platform.
 *
 * These types mirror the CMS / database fields required by the approved
 * Product Page and Health Concern specifications. Every page renders from
 * these records — no condition-specific or product-specific content is
 * hardcoded into a template.
 */

export type MediaKind = "front-label" | "back-label" | "size-reference" | "benefits" | "lifestyle" | "video";

export interface ProductMedia {
  id: string;
  /** Only ONE item of type "video" may exist in the top media stack. */
  type: "image" | "video";
  kind: MediaKind;
  label: string;
  src: string;
  /** Poster image for video media. */
  poster?: string;
  alt: string;
  sortOrder: number;
  published: boolean;
  approved?: boolean;
}

export interface ProductBenefit {
  icon: string;
  title: string;
  text: string;
}

export interface AccordionRow {
  id: string;
  title: string;
  body?: string;
  items?: string[];
  faqs?: { q: string; a: string }[];
  sortOrder: number;
  visible: boolean;
}

export interface ProductVariant {
  id: string;
  label: string;
  priceDelta: number;
  sku: string;
}

export interface Product {
  id: string;
  sku: string;
  upc?: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  shortDescription: string;
  /** One-line support statement used on cards and health-concern pages. */
  supportStatement: string;
  longDescription: string[];
  media: ProductMedia[];
  benefits: ProductBenefit[];
  variants?: ProductVariant[];
  /** Health concern slugs this product is mapped to. No duplicate records. */
  concernSlugs: string[];
  relatedSlugs: string[];
  additionalInfo: AccordionRow[];
  reviews: Review[];
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  seoTitle: string;
  metaDescription: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
}

export interface Category {
  slug: string;
  name: string;
  blurb: string;
  image: string;
}

export interface RecommendedProductRef {
  /** References an existing product record by slug — never a duplicate. */
  slug: string;
  /** Editable, concern-specific support note shown on the card. */
  note: string;
  defaultQty: number;
  inBundle: boolean;
}

export interface HealthConcern {
  id: string;
  slug: string;
  name: string;
  category: string;
  heroHeadline: string;
  heroSubtext: string;
  heroImage?: string;
  /** Optional bundle basket heading + intro shown beside the concern content. */
  bundleTitle?: string;
  bundleSubtext?: string;
  icon: string;
  fastFacts: { title: string; text: string }[];
  bestFor: string[];
  notFor: string[];
  commonSymptoms: string[];
  possibleCauses: { title: string; text: string }[];
  recommended: RecommendedProductRef[];
  dailyRoutine: { title: string; text: string }[];
  cta: { title: string; text: string; buttonLabel: string };
  disclaimer: string;
  safetyWarning?: string;
  seoTitle: string;
  metaDescription: string;
  published: boolean;
}
