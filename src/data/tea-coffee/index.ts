/**
 * Tea & Coffee Data Module — Exports
 * Ray's Healthy Living® Retailer
 *
 * Central export point for all tea-coffee data types, seed articles, and loaders.
 */

// ── Types ──────────────────────────────────────────────────────────────────
export type {
  TeaCoffeeProduct,
  TeaCoffeeArticle,
  U20XChallenge,
  TeaCoffeeCatalog,
  Slug,
  ISODate,
  ProductType,
  CoffeeType,
  GrindPreparation,
  TeaType,
  ArticleCategory,
} from "./types";

// ── Articles Seed ──────────────────────────────────────────────────────────
export { SAMPLE_ARTICLES, getArticleBySlug, getArticlesForProduct } from "./articles-seed";

// ── CSV Loader & Helper Functions ──────────────────────────────────────────
export {
  loadTeaCoffeeCatalogFromSeed,
  parseTeaCoffeeCsv,
  parseTeaCoffeeRow,
  // Helper functions
  getCoffeeProducts,
  getTeaProducts,
  getSampleProducts,
  getNonSampleProducts,
  getCoffeeByType,
  getTeaByType,
  getCoffeeByGrind,
  getProductBySlug,
  searchProducts,
  getBestSellers,
  getNewArrivals,
} from "./loader";

/**
 * Convenience wrapper: parse CSV text and return catalog.
 * Used in routes that need to load from inline seed data.
 */
export function parseCsvToTeaCoffeeProducts(csvText: string) {
  const { parseTeaCoffeeCsv } = require("./loader");
  return parseTeaCoffeeCsv(csvText);
}

