/**
 * Tea & Coffee CSV Loader
 * Ray's Healthy Living® Retailer — Phase 1 Data Model
 *
 * Converts a raw CSV string (matching tea-coffee-template.csv) into a
 * typed TeaCoffeeCatalog object. Runs entirely in the browser / at build
 * time — no file-system access required.
 *
 * Usage:
 *   import rawCsv from "@/data/tea-coffee/csv/tea-coffee-seed.csv?raw";
 *   import { parseCsvToTeaCoffeeProducts } from "@/lib/tea-coffee-loader";
 *   const catalog = parseCsvToTeaCoffeeProducts(rawCsv);
 *
 * To swap sample data for real products:
 *   1. Edit (or replace) tea-coffee-seed.csv.
 *   2. Set is_sample=false on the real rows.
 *   3. No code changes needed anywhere else.
 */

import type {
  TeaCoffeeProduct,
  TeaCoffeeCatalog,
  ProductType,
  CoffeeType,
  GrindPreparation,
  TeaType,
} from "@/data/tea-coffee/types";

// ─── Internal helpers ─────────────────────────────────────────────────────────

/** Split a CSV line respecting double-quoted fields that may contain commas. */
function splitCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      // Toggle quote mode; handle escaped double-quotes ("")
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

/** Coerce a CSV string to boolean. Treats "true" (case-insensitive) as true. */
function toBool(value: string): boolean {
  return value.trim().toLowerCase() === "true";
}

/** Coerce a CSV string to a number. Returns null if empty or NaN. */
function toNumberOrNull(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const n = parseFloat(trimmed);
  return isNaN(n) ? null : n;
}

/** Strip comment lines (starting with #) and blank lines from raw CSV text. */
function stripComments(raw: string): string {
  return raw
    .split("\n")
    .filter((line) => {
      const trimmed = line.trim();
      return trimmed.length > 0 && !trimmed.startsWith("#");
    })
    .join("\n");
}

// ─── Column index map ─────────────────────────────────────────────────────────

/** Maps every column header name to its index in the parsed row array. */
function buildColumnMap(headerRow: string[]): Record<string, number> {
  const map: Record<string, number> = {};
  headerRow.forEach((col, i) => {
    map[col.trim()] = i;
  });
  return map;
}

/** Safe column accessor — returns empty string if column is missing. */
function col(row: string[], map: Record<string, number>, name: string): string {
  const idx = map[name];
  if (idx === undefined) return "";
  return (row[idx] ?? "").trim();
}

// ─── Row → TeaCoffeeProduct ───────────────────────────────────────────────────

function parseRow(
  row: string[],
  map: Record<string, number>,
  rowIndex: number
): TeaCoffeeProduct | null {
  const id = col(row, map, "id");
  const slug = col(row, map, "slug");

  // Skip obviously empty rows
  if (!id && !slug) return null;

  const priceRaw = toNumberOrNull(col(row, map, "price"));
  if (priceRaw === null) {
    console.warn(`[tea-coffee-loader] Row ${rowIndex}: missing price — skipped (id=${id})`);
    return null;
  }

  return {
    id: id || `tc-generated-${rowIndex}`,
    rhlProductId: col(row, map, "rhl_product_id"),
    slug: slug || id,
    name: col(row, map, "name"),
    department: "tea-coffee",
    productType: col(row, map, "product_type") as ProductType,

    // Coffee-specific
    coffeeType: (col(row, map, "coffee_type") as CoffeeType) || "",
    grindPreparation: (col(row, map, "grind_preparation") as GrindPreparation) || "",
    brewingMethod: col(row, map, "brewing_method"),

    // Tea-specific
    teaType: (col(row, map, "tea_type") as TeaType) || "",
    botanicalFamily: col(row, map, "botanical_family"),
    steepingMethod: col(row, map, "steeping_method"),

    // Shared detail
    flavorProfile: col(row, map, "flavor_profile"),
    origin: col(row, map, "origin"),
    size: col(row, map, "size"),
    price: priceRaw,
    compareAtPrice: toNumberOrNull(col(row, map, "compare_at_price")),
    inStock: toBool(col(row, map, "in_stock")),
    shortDescription: col(row, map, "short_description"),
    longDescription: col(row, map, "long_description"),
    ingredientsList: col(row, map, "ingredients_list"),
    preparation: col(row, map, "preparation"),
    storageInstructions: col(row, map, "storage_instructions"),
    caution: col(row, map, "caution"),

    // Media — pipe-separated paths
    images: col(row, map, "images"),

    // Taxonomy links
    relatedArticleSlug: col(row, map, "related_article_slug"),
    relatedHealthConcernSlug: col(row, map, "related_health_concern_slug"),
    relatedU20xChallenge: col(row, map, "related_u20x_challenge"),

    // Flags
    isSample: toBool(col(row, map, "is_sample")),
    isBestSeller: toBool(col(row, map, "is_best_seller")),
    isNewArrival: toBool(col(row, map, "is_new_arrival")),

    // SEO
    seoTitle: col(row, map, "seo_title"),
    metaDescription: col(row, map, "meta_description"),
  };
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Parse a raw CSV string and return a fully typed TeaCoffeeCatalog.
 *
 * @param rawCsv  The raw text content of a CSV file matching tea-coffee-template.csv.
 * @returns       A TeaCoffeeCatalog with products, unique types, and sample count.
 *
 * @example
 * import rawCsv from "@/data/tea-coffee/csv/tea-coffee-seed.csv?raw";
 * const catalog = parseCsvToTeaCoffeeProducts(rawCsv);
 * console.log(catalog.products.length); // 17
 */
export function parseCsvToTeaCoffeeProducts(rawCsv: string): TeaCoffeeCatalog {
  const cleaned = stripComments(rawCsv);
  const lines = cleaned.split("\n").filter((l) => l.trim().length > 0);

  if (lines.length < 2) {
    console.warn("[tea-coffee-loader] CSV has no data rows.");
    return { products: [], coffeeTypes: [], teaTypes: [], sampleCount: 0 };
  }

  const headerRow = splitCsvLine(lines[0]);
  const columnMap = buildColumnMap(headerRow);

  const products: TeaCoffeeProduct[] = [];

  for (let i = 1; i < lines.length; i++) {
    const row = splitCsvLine(lines[i]);
    const product = parseRow(row, columnMap, i + 1);
    if (product) products.push(product);
  }

  // Derive unique types for filter UI
  const coffeeTypeSet = new Set<CoffeeType>();
  const teaTypeSet = new Set<TeaType>();
  let sampleCount = 0;

  for (const p of products) {
    if (p.coffeeType) coffeeTypeSet.add(p.coffeeType as CoffeeType);
    if (p.teaType) teaTypeSet.add(p.teaType as TeaType);
    if (p.isSample) sampleCount++;
  }

  return {
    products,
    coffeeTypes: Array.from(coffeeTypeSet),
    teaTypes: Array.from(teaTypeSet),
    sampleCount,
  };
}

/**
 * Convenience: return only coffee products from a catalog.
 */
export function getCoffeeProducts(catalog: TeaCoffeeCatalog): TeaCoffeeProduct[] {
  return catalog.products.filter((p) => p.productType === "coffee");
}

/**
 * Convenience: return only tea products from a catalog.
 */
export function getTeaProducts(catalog: TeaCoffeeCatalog): TeaCoffeeProduct[] {
  return catalog.products.filter((p) => p.productType === "tea");
}

/**
 * Convenience: find a single product by slug. Returns undefined if not found.
 */
export function getProductBySlug(
  catalog: TeaCoffeeCatalog,
  slug: string
): TeaCoffeeProduct | undefined {
  return catalog.products.find((p) => p.slug === slug);
}

/**
 * Return the first image path from a product's pipe-separated images field.
 * Falls back to a neutral placeholder if the field is empty.
 */
export function getCoverImage(product: TeaCoffeeProduct): string {
  if (!product.images) return "/tea-coffee/placeholder-generic.jpg";
  return product.images.split("|")[0].trim();
}

/**
 * Return all image paths from a product's pipe-separated images field.
 */
export function getAllImages(product: TeaCoffeeProduct): string[] {
  if (!product.images) return ["/tea-coffee/placeholder-generic.jpg"];
  return product.images.split("|").map((s) => s.trim()).filter(Boolean);
}

/**
 * Coffee family display labels and brand colors matching the spec.
 * Import this wherever coffee type badges are rendered.
 */
export const COFFEE_TYPE_META: Record<
  CoffeeType,
  { label: string; color: string; textColor: string }
> = {
  arabica: { label: "Arabica Reserve", color: "#2d6a3f", textColor: "#ffffff" },
  robusta: { label: "Robusta Intense", color: "#7f1d1d", textColor: "#ffffff" },
  culi:    { label: "Culi Select — Peaberry", color: "#92400e", textColor: "#ffffff" },
};

/**
 * Grind preparation display labels.
 */
export const GRIND_LABELS: Record<GrindPreparation, string> = {
  "whole-bean":           "Whole Bean",
  "medium-ground":        "Medium / Ground",
  "fine-specialty-grind": "Fine / Specialty Grind",
};
