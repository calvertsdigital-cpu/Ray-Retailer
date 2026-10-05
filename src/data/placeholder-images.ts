/**
 * Centralised placeholder image registry for Ray's Healthy Living.
 *
 * // TODO: replace every entry here with RHL-approved, licensed images
 *         before going to production. All URLs below are free-licence
 *         Unsplash photos verified to return HTTP 200 at time of writing.
 *
 * Usage:
 *   import { IMAGES } from "@/data/placeholder-images";
 *   <img src={IMAGES.featureCirculation.url} alt={IMAGES.featureCirculation.alt} />
 */

export interface PlaceholderImage {
  url: string;
  alt: string;
}

export const IMAGES = {
  // ─── Article: How to Improve Blood Circulation Naturally ─────────────────

  /** Mature couple jogging outdoors — hero / feature image */
  featureCirculation: {
    url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80",
    alt: "Mature couple jogging together outdoors on a sunny day",
  },

  /** Anatomical heart / circulatory system illustration */
  heartDiagram: {
    url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=600&q=80",
    alt: "Anatomical illustration of the human heart and circulatory system",
  },

  /** Runner's shoes on a road — Stay Active section */
  activeWalking: {
    url: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=600&q=80",
    alt: "Close-up of running shoes on a road, representing regular physical activity",
  },

  /** Colourful salmon and berry salad — circulation-friendly diet */
  healthyFood: {
    url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80",
    alt: "Healthy salad with salmon, berries and greens supporting circulation",
  },

  /** Clear glass of water — Stay Hydrated section */
  hydrationWater: {
    url: "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=600&q=80",
    alt: "Clear glass of water representing the importance of staying hydrated",
  },

  // ─── Recommended Products ─────────────────────────────────────────────────

  /** Fish oil / omega-3 capsules */
  productOmega3: {
    url: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80",
    alt: "Omega-3 fish oil capsules supplement",
  },

  /** Beetroot — beet root extract */
  productBeetRoot: {
    url: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=400&q=80",
    alt: "Fresh red beetroot, source of beet root extract supplement",
  },

  /** Dark grapes — grape seed extract */
  productGrapeSeed: {
    url: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=400&q=80",
    alt: "Cluster of dark grapes, source of grape seed extract",
  },

  // ─── Sidebar / Recent & Related Article Thumbnails ───────────────────────

  /** Immune system / green smoothie — "Boost Your Immune System" */
  thumbImmuneHealth: {
    url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=200&q=80",
    alt: "Fresh green vegetables and fruit representing immune health",
  },

  /** Sleeping person — "Importance of Quality Sleep" */
  thumbSleepHealth: {
    url: "https://images.unsplash.com/photo-1535914254981-b5012eebbd15?auto=format&fit=crop&w=200&q=80",
    alt: "Person sleeping peacefully representing quality sleep for better health",
  },

  /** Gut / digestive health food spread */
  thumbDigestiveHealth: {
    url: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=200&q=80",
    alt: "Probiotic and fibre-rich foods supporting a healthy digestive system",
  },

  /** Walking outdoors — "Walking for Better Health" */
  thumbWalking: {
    url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=200&q=80",
    alt: "Person walking outdoors for cardiovascular and overall health benefits",
  },

  /** Heart-healthy foods — "Top Nutrients for a Stronger Heart" */
  thumbHeartNutrients: {
    url: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=200&q=80",
    alt: "Assortment of heart-healthy nuts, seeds and berries",
  },

  /** General wellness / supplements */
  thumbWellness: {
    url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=200&q=80",
    alt: "Person in a peaceful wellness moment, morning routine",
  },

  /** Herbs / loose herbs article */
  thumbHerbs: {
    url: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=200&q=80",
    alt: "Assorted dried herbs and spices in small bowls",
  },

  /** Routine / daily habits article */
  thumbRoutine: {
    url: "https://images.unsplash.com/photo-1484627147104-f5197bcd6651?auto=format&fit=crop&w=200&q=80",
    alt: "Person journaling their morning wellness routine",
  },

  /** Sea moss / algae — sea moss article */
  thumbSeaMoss: {
    url: "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?auto=format&fit=crop&w=200&q=80",
    alt: "Fresh green sea vegetables representing sea moss and ocean botanicals",
  },

  /** Energy / nutrition article */
  thumbEnergy: {
    url: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80",
    alt: "Person with arms raised expressing energy and vitality",
  },

  /** Supplements / capsules */
  thumbSupplements: {
    url: "https://images.unsplash.com/photo-1606914501449-5a96b6ce24ca?auto=format&fit=crop&w=200&q=80",
    alt: "Variety of natural supplement capsules",
  },

  // ─── U20X™ Promo ─────────────────────────────────────────────────────────

  /** Person on mountaintop silhouette — U20X promo background */
  u20xBackground: {
    url: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=600&q=80",
    alt: "Person with arms raised on a mountain summit representing achievement",
  },

  // ─── Author ──────────────────────────────────────────────────────────────

  /** Generic author avatar fallback */
  authorDefault: {
    url: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=80&q=80",
    alt: "Ray's Healthy Living author avatar",
  },
} satisfies Record<string, PlaceholderImage>;
