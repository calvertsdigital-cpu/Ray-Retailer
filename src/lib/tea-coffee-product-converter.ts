/**
 * Tea & Coffee Product Converter
 * 
 * Converts BackendProduct to TeaCoffeeProduct format expected by tea-coffee components.
 * Handles type safety and field mapping for tea-specific and coffee-specific fields.
 */

import type { BackendProduct } from "@/lib/api";
import type { TeaCoffeeProduct, CoffeeType, TeaType, GrindPreparation, ProductType } from "@/data/tea-coffee/types";

/**
 * Convert backend product to TeaCoffeeProduct format for components
 * 
 * @param bp BackendProduct from API
 * @param applyRetailMarkup Whether to apply 1.2x markup to price (default: true)
 * @returns TeaCoffeeProduct formatted for tea-coffee components
 * 
 * @throws Error if productType is not 'tea' or 'coffee'
 */
export function convertToTeaCoffeeProduct(
  bp: BackendProduct,
  applyRetailMarkup: boolean = true
): TeaCoffeeProduct {
  // Validate product type
  if (bp.productType !== 'tea' && bp.productType !== 'coffee') {
    throw new Error(
      `Invalid product type: ${bp.productType}. Expected 'tea' or 'coffee'.`
    );
  }

  // Calculate retail price
  const wholesalePrice = bp.variants?.[0]?.price || bp.sellPrice || bp.buyPrice || 0;
  const retailPrice = applyRetailMarkup ? wholesalePrice * 1.2 : wholesalePrice;

  // Create slug from product name
  const slug = createTeaCoffeeSlug(bp.name);

  // Base product object
  const product: TeaCoffeeProduct = {
    // Identity
    id: bp._id || '',
    rhlProductId: bp.rhlId?.toString() || bp._id || '',
    slug,
    name: bp.name,
    department: 'tea-coffee',
    productType: bp.productType as ProductType,

    // Coffee-specific fields
    coffeeType: (bp.coffeeType as CoffeeType) || '',
    grindPreparation: (bp.grindPreparation as GrindPreparation) || '',
    brewingMethod: bp.brewingMethod || '',

    // Tea-specific fields
    teaType: (bp.teaType as TeaType) || '',
    botanicalFamily: bp.botanicalFamily || '',
    steepingMethod: bp.steepingMethod || '',

    // Shared product detail
    flavorProfile: '', // Not in BackendProduct, use default
    origin: '', // Not in BackendProduct, use default
    size: '', // Not in BackendProduct, use default
    price: retailPrice,
    compareAtPrice: null,
    inStock: (bp.stock || 0) > 0,
    shortDescription: bp.description || `Premium ${bp.productType} from Ray's Healthy Living`,
    longDescription: bp.description || `Premium quality ${bp.productType}. Carefully selected for taste and wellness benefits.`,
    ingredientsList: bp.ingredients || '',
    preparation: bp.brewingMethod || bp.steepingMethod || '',
    storageInstructions: 'Store in a cool, dry place away from direct sunlight.',
    caution: '',

    // Media
    images: '', // Will be set below if available

    // Taxonomy links
    relatedArticleSlug: Array.isArray(bp.relatedArticleSlug) 
      ? (bp.relatedArticleSlug[0] || '') 
      : (bp.relatedArticleSlug || ''),
    relatedHealthConcernSlug: Array.isArray(bp.relatedHealthConcernSlug) 
      ? (bp.relatedHealthConcernSlug[0] || '') 
      : (bp.relatedHealthConcernSlug || ''),
    relatedU20xChallenge: bp.relatedU20xChallenge || '',

    // Flags
    isSample: false,
    isBestSeller: false,
    isNewArrival: false,

    // SEO
    seoTitle: `${bp.name} | Ray's Healthy Living`,
    metaDescription: bp.description || `Shop ${bp.name} online at Ray's Healthy Living`,
  };

  return product;
}

/**
 * Create URL-friendly slug from product name
 * Format: "arabica-reserve-whole-bean"
 */
function createTeaCoffeeSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with hyphens
    .replace(/[^\w-]/g, '')          // Remove special characters
    .replace(/-+/g, '-')             // Replace multiple hyphens with single
    .replace(/^-+|-+$/g, '');        // Remove leading/trailing hyphens
}

/**
 * Batch convert multiple backend products to TeaCoffeeProducts
 */
export function convertToTeaCoffeeProducts(
  backendProducts: BackendProduct[],
  applyRetailMarkup: boolean = true
): TeaCoffeeProduct[] {
  return backendProducts.map(bp => {
    try {
      return convertToTeaCoffeeProduct(bp, applyRetailMarkup);
    } catch (error) {
      console.error(`Failed to convert product ${bp._id}:`, error);
      return null;
    }
  }).filter((p): p is TeaCoffeeProduct => p !== null);
}

/**
 * Filter products by type
 */
export function filterByProductType(
  products: TeaCoffeeProduct[],
  type: 'tea' | 'coffee'
): TeaCoffeeProduct[] {
  return products.filter(p => p.productType === type);
}
