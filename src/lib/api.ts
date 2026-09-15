/**
 * API client for Ray's Healthy Living backend
 * Connects to Ray-wholsell-1 backend for products and data
 */

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://ray-wholsell.onrender.com';

export interface BackendProduct {
  _id: string;
  name: string;
  description?: string;
  category?: string;
  sku?: string;
  upc?: string;
  rhlId?: number;
  price?: number;
  buyPrice?: number;
  sellPrice?: number;
  stock?: number;
  variants?: Array<{
    _id?: string;
    size?: string;
    price?: number;
    sku?: string;
    rhlUpc?: string;
    binLocation?: string;
    itemNumber?: string;
  }>;
  brand?: string;
  manufacturerName?: string;
  ingredients?: string;
  type?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Fetch all products from the backend catalog API
 */
export async function fetchProducts(
  limit: number = 500,
  search: string = ''
): Promise<BackendProduct[]> {
  try {
    const params = new URLSearchParams({
      page: '1',
      limit: limit.toString(),
      ...(search && { search })
    });

    const response = await fetch(
      `${BACKEND_URL}/api/user/catalog/products?${params}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch products:', response.statusText);
      return [];
    }

    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error('Error fetching products from backend:', error);
    return [];
  }
}

/**
 * Search products by query
 */
export async function searchBackendProducts(query: string): Promise<BackendProduct[]> {
  return fetchProducts(500, query);
}

/**
 * Get product by ID
 */
export async function getProductById(productId: string): Promise<BackendProduct | null> {
  try {
    const response = await fetch(
      `${BACKEND_URL}/api/user/catalog/products/${productId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch product:', response.statusText);
      return null;
    }

    const data = await response.json();
    return data.product || null;
  } catch (error) {
    console.error('Error fetching product from backend:', error);
    return null;
  }
}

/**
 * Get categories from backend
 */
export async function fetchCategories(): Promise<any[]> {
  try {
    const response = await fetch(
      `${BACKEND_URL}/api/user/catalog/categories`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch categories:', response.statusText);
      return [];
    }

    const data = await response.json();
    return data.categories || [];
  } catch (error) {
    console.error('Error fetching categories from backend:', error);
    return [];
  }
}

/**
 * Convert backend product to frontend product format
 */
export function convertBackendProduct(bp: BackendProduct): any {
  const price = bp.variants?.[0]?.price || bp.sellPrice || bp.buyPrice || 0;
  
  return {
    id: bp._id,
    slug: (bp.rhlId || bp.sku || bp._id).toString().toLowerCase().replace(/\s+/g, '-'),
    name: bp.name,
    brand: bp.brand || bp.manufacturerName || 'Ray\'s Healthy Living',
    sku: bp.sku,
    upc: bp.upc || bp.variants?.[0]?.rhlUpc,
    price,
    msrp: price,
    category: bp.category,
    shortDescription: bp.description,
    supportStatement: bp.description,
    ingredients: bp.ingredients,
    stock: bp.stock || 0,
    rating: 4.5,
    isBestSeller: false,
    isNewArrival: false,
    concernSlugs: [],
    media: [{
      id: 'main',
      type: 'image',
      kind: 'front-label',
      label: 'Product image',
      src: '/placeholder-product.jpg',
      alt: bp.name,
      sortOrder: 1,
      published: true,
    }],
    variants: bp.variants?.map((v) => ({
      id: v._id || v.sku,
      label: v.size || 'Default',
      sku: v.sku,
      price: v.price || price,
    })) || [],
  };
}
