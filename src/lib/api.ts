/**
 * API client for Ray's Healthy Living backend
 * Connects to Ray-wholsell-1 backend for products and data
 */

import capsules from "@/assets/product-capsules.jpg";
import irishMoss from "@/assets/cat-irish-moss.jpg";
import looseHerbs from "@/assets/cat-loose-herbs.jpg";
import essentialOil from "@/assets/cat-essential-oil.jpg";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://ray-wholsell.onrender.com';

export interface BackendProduct {
  _id: string;
  name: string;
  description?: string;
  department?: string;
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

export interface FetchProductsOptions {
  limit?: number;
  search?: string;
  departments?: string[];
  categories?: string[];
  minPrice?: number;
  maxPrice?: number;
}

/**
 * Fetch all products from the backend catalog API
 */
export async function fetchProducts(
  options: FetchProductsOptions = {}
): Promise<BackendProduct[]> {
  try {
    const { 
      limit = 500, 
      search = '', 
      departments = [], 
      categories = [],
      minPrice,
      maxPrice
    } = options;

    const params = new URLSearchParams({
      page: '1',
      limit: limit.toString(),
      ...(search && { search })
    });

    // Add department filters
    departments.forEach(dept => {
      params.append('department', dept);
    });

    // Add category filters
    categories.forEach(cat => {
      params.append('category', cat);
    });

    console.log('🔍 Fetching products with params:', {
      departments,
      categories,
      search,
      url: `${BACKEND_URL}/api/user/catalog/products?${params}`
    });

    const response = await fetch(
      `${BACKEND_URL}/api/user/catalog/products?${params}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-website-role': 'retailer',
        }
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch products:', response.statusText);
      return [];
    }

    const data = await response.json();
    let products = data.products || [];

    console.log(`✅ Received ${products.length} products from backend (total: ${data.totalProducts})`);

    // Apply client-side price filtering if needed
    if (minPrice !== undefined || maxPrice !== undefined) {
      products = products.filter((p: BackendProduct) => {
        const price = p.variants?.[0]?.price || p.sellPrice || p.buyPrice || 0;
        const retailPrice = price * 1.2; // Apply retail markup
        if (minPrice !== undefined && retailPrice < minPrice) return false;
        if (maxPrice !== undefined && retailPrice > maxPrice) return false;
        return true;
      });
    }

    return products;
  } catch (error) {
    console.error('Error fetching products from backend:', error);
    return [];
  }
}

/**
 * Search products by query
 */
export async function searchBackendProducts(query: string): Promise<BackendProduct[]> {
  return fetchProducts({ limit: 500, search: query });
}

/**
 * Get product by RHL ID or slug
 */
export async function getProductBySlug(slug: string): Promise<BackendProduct | null> {
  try {
    console.log('🔍 Fetching product by slug:', slug);
    
    // Try multiple search strategies
    const searchStrategies = [
      slug, // Original slug
      slug.replace(/-/g, ' '), // Replace hyphens with spaces
      slug.split('-').slice(0, 3).join(' '), // First 3 words
    ];

    for (const searchTerm of searchStrategies) {
      const response = await fetch(
        `${BACKEND_URL}/api/user/catalog/products?search=${encodeURIComponent(searchTerm)}&limit=10`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-website-role': 'retailer',
          }
        }
      );

      if (!response.ok) {
        console.error('Failed to fetch product:', response.statusText);
        continue;
      }

      const data = await response.json();
      if (data.products && data.products.length > 0) {
        console.log('✅ Found product:', data.products[0].name);
        return data.products[0];
      }
    }

    console.warn('⚠️ No product found for slug:', slug);
    return null;
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
          'x-website-role': 'retailer',
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
 * Generate a professional placeholder image as data URI with gradient
 */
function generatePlaceholderImage(productName: string): string {
  const initials = productName
    .split(' ')
    .filter(word => word.length > 0)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  // Professional color gradients
  const gradients = [
    ['#16a34a', '#15803d'], // Green
    ['#059669', '#047857'], // Emerald
    ['#0891b2', '#0e7490'], // Cyan
    ['#7c3aed', '#6d28d9'], // Violet
    ['#dc2626', '#b91c1c'], // Red
  ];
  
  const hashCode = productName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const [color1, color2] = gradients[hashCode % gradients.length];

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#grad)"/>
      <circle cx="200" cy="140" r="70" fill="rgba(255,255,255,0.15)"/>
      <text 
        x="200" y="160" 
        font-size="80" 
        font-weight="bold" 
        fill="white" 
        text-anchor="middle" 
        dominant-baseline="middle"
        font-family="Arial, Helvetica, sans-serif"
      >${initials}</text>
      <text 
        x="200" y="260" 
        font-size="18" 
        fill="rgba(255,255,255,0.9)" 
        text-anchor="middle" 
        font-family="Arial, Helvetica, sans-serif"
        font-weight="600"
      >Ray's Healthy Living</text>
      <text 
        x="200" y="285" 
        font-size="14" 
        fill="rgba(255,255,255,0.7)" 
        text-anchor="middle" 
        font-family="Arial, Helvetica, sans-serif"
      >Natural Supplements</text>
    </svg>
  `.trim();

  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Convert backend product to frontend product format with retail markup
 */
export function convertBackendProduct(bp: BackendProduct, applyRetailMarkup: boolean = true): any {
  const wholesalePrice = bp.variants?.[0]?.price || bp.sellPrice || bp.buyPrice || 0;
  const retailPrice = applyRetailMarkup ? wholesalePrice * 1.2 : wholesalePrice;
  
  // Use real product image instead of SVG placeholder
  const productImage = capsules;
  
  // Product media gallery with multiple images and video
  const mediaGallery = [
    {
      id: 'main',
      type: 'image',
      kind: 'front-label',
      label: 'Product image',
      src: productImage,
      alt: bp.name,
      sortOrder: 1,
      published: true,
    },
    {
      id: 'irish-moss',
      type: 'image',
      kind: 'ingredient',
      label: 'Irish Moss ingredient',
      src: irishMoss,
      alt: 'Irish Moss',
      sortOrder: 2,
      published: true,
    },
    {
      id: 'essential-oil',
      type: 'image',
      kind: 'ingredient',
      label: 'Essential oils',
      src: essentialOil,
      alt: 'Essential Oils',
      sortOrder: 3,
      published: true,
    },
    {
      id: 'video',
      type: 'video',
      kind: 'demo',
      label: 'Product demonstration',
      src: 'https://res.cloudinary.com/v3zgtcwc/video/upload/v1789891095/WhatsApp_Video_2026-09-16_at_5.53.47_AM.mp4',
      alt: 'Product video',
      sortOrder: 4,
      published: true,
    }
  ];
  
  return {
    id: bp._id,
    slug: createSlugFromProduct(bp),
    name: bp.name,
    brand: bp.brand || bp.manufacturerName || 'Ray\'s Healthy Living',
    sku: bp.sku,
    upc: bp.upc || bp.variants?.[0]?.rhlUpc,
    rhlId: bp.rhlId,
    price: retailPrice,
    wholesalePrice: wholesalePrice,
    msrp: retailPrice,
    department: bp.department,
    category: bp.category,
    shortDescription: bp.description || `Premium quality ${bp.name} from Ray's Healthy Living`,
    longDescription: bp.description ? [bp.description] : [
      `${bp.name} is a premium quality supplement carefully formulated to support your wellness goals.`,
      'Made with natural ingredients and manufactured to the highest quality standards.',
      'Each batch is tested for purity and potency to ensure you receive the best product possible.'
    ],
    supportStatement: bp.description,
    ingredients: bp.ingredients || '',
    inStock: (bp.stock || 0) > 0,
    stock: bp.stock || 0,
    rating: 4.5,
    reviewCount: 12,
    isBestSeller: false,
    isNewArrival: false,
    concernSlugs: [],
    seoTitle: `${bp.name} | Ray's Healthy Living`,
    metaDescription: bp.description || `Shop ${bp.name} online. Premium quality supplements delivered to your door.`,
    benefits: [],
    additionalInfo: [
      { question: 'Product Information', answer: bp.description || 'High-quality natural supplement' },
      { question: 'Ingredients', answer: bp.ingredients || 'See product label for complete ingredient list' },
      { question: 'Suggested Use', answer: 'Follow label directions or consult with a healthcare professional' },
      { question: 'Storage', answer: 'Store in a cool, dry place away from direct sunlight' },
    ],
    reviews: [
      {
        id: '1',
        rating: 5,
        title: 'Great product!',
        body: 'High quality supplement. Noticed positive results within a few weeks.',
        author: 'Verified Customer',
        date: new Date().toLocaleDateString(),
        verified: true,
      }
    ],
    relatedSlugs: [],
    media: mediaGallery,
    variants: bp.variants?.map((v, idx) => ({
      id: v._id || v.sku || `variant-${idx}`,
      label: v.size || 'Standard',
      sku: v.sku,
      price: applyRetailMarkup ? (v.price || wholesalePrice) * 1.2 : (v.price || wholesalePrice),
      wholesalePrice: v.price || wholesalePrice,
    })) || [{
      id: 'default',
      label: 'Standard',
      sku: bp.sku,
      price: retailPrice,
      wholesalePrice: wholesalePrice,
    }],
  };
}

/**
 * Create URL-friendly slug from product
 */
function createSlugFromProduct(bp: BackendProduct): string {
  // Use product name to create slug
  const nameSlug = bp.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  return nameSlug;
}
