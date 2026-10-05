/**
 * Tea & Coffee Articles — Placeholder Seed Data
 * Ray's Healthy Living® Retailer — Phase 1
 *
 * These are SAMPLE articles. All three have isSample: true so they are
 * easy to find and delete when replaced with real editorial content.
 *
 * Rules followed:
 *   • No medical claims or health benefit assertions.
 *   • Body copy is neutral, factual preparation and education content.
 *   • relatedProductSlugs reference slugs that exist in tea-coffee-seed.csv.
 *   • relatedU20xChallenge is populated on one article to demonstrate
 *     the U20XBridge wiring; the others leave it empty.
 */

import type { TeaCoffeeArticle } from "./types";

export const SAMPLE_ARTICLES: TeaCoffeeArticle[] = [
  // ── Article 1 ─────────────────────────────────────────────────────────────
  {
    id: "art-001",
    slug: "tea-preparation-guide",
    title: "How to Prepare Loose-Leaf Tea — A Practical Guide",
    excerpt:
      "Temperature, steeping time and the amount of leaf you use all affect the cup you end up with. Here is what to pay attention to.",
    body: `Loose-leaf tea rewards a little attention to detail. The three variables that matter most are water temperature, the amount of leaf, and steeping time.\n\nWater temperature matters because different types of leaves release their character at different heat levels. Delicate flowers and green-style botanicals are better suited to water just off the boil or slightly cooler; robust roots and bark can take a full rolling boil.\n\nA general starting point for most loose botanicals is one level teaspoon per 240 ml of water. From there, adjust to your own taste — more leaf gives a stronger brew, less gives a lighter one.\n\nSteeping time is easy to experiment with. Start in the middle of the recommended range, taste, and note whether you want more or less intensity next time. Most herbal infusions are forgiving; unlike some teas, they do not become unpleasantly bitter if steeped a little longer.\n\nAlways strain thoroughly before drinking, especially with cut and sifted material. A fine mesh strainer or an infuser basket works well for most loose botanicals.\n\nStore unused dry botanicals in a sealed container away from moisture and direct light. Most dried leaves and flowers keep well for six to twelve months if stored correctly.`,
    category: "tea-preparation",
    coverImage: "/tea-coffee/articles/tea-preparation-guide.svg",
    publishedDate: "2026-09-01",
    relatedProductSlugs: [
      "chamomile-loose-botanical",
      "peppermint-herbal-tea",
      "hibiscus-flowers-loose",
      "valerian-root-cut-sifted",
      "lemongrass-stems-loose",
      "bamboo-tea-strainer",
    ],
    relatedU20xChallenge: "",
    isSample: true,
    seoTitle: "How to Prepare Loose-Leaf Tea | Ray's Healthy Living",
    metaDescription:
      "A practical guide to preparing loose-leaf tea — water temperature, steeping time, and how much leaf to use.",
  },

  // ── Article 2 ─────────────────────────────────────────────────────────────
  {
    id: "art-002",
    slug: "coffee-preparation-guide",
    title: "Understanding Coffee Grind and Preparation",
    excerpt:
      "The relationship between grind size, brew method and extraction is the foundation of a good cup of coffee.",
    body: `Coffee preparation comes down to three basic relationships: grind size, contact time, and water temperature.\n\nGrind size controls how quickly water extracts from the ground coffee. A coarse grind has more surface area protected inside each particle, so it needs longer contact time — hence the longer steep in a French press. A fine grind exposes more surface area immediately, which is why espresso can complete in under 30 seconds under pressure.\n\nContact time follows from grind size. A coarse French-press grind brewed for the same time as an espresso would be under-extracted and thin. The reverse — a fine grind left in extended contact with water — leads to over-extraction and bitterness.\n\nWater temperature works within a relatively small window. Most filter and immersion methods work well between 90 and 96 °C. Espresso is typically pulled at around 93–94 °C. Letting water cool slightly after boiling is often sufficient for home brewing.\n\nWhole bean coffee begins to lose freshness within a few weeks of roasting. Pre-ground coffee begins to lose flavour much faster once the container is opened. If freshness matters, grind only what you need for each brew.\n\nThe three Ray's coffee types — Arabica Reserve, Robusta Intense, and Culi Select Peaberry — each have a recommended starting point listed on their product pages. Those are starting points, not fixed rules. Adjust grind size, dose, and time until the cup suits your preference.`,
    category: "coffee-preparation",
    coverImage: "/tea-coffee/articles/coffee-preparation-guide.svg",
    publishedDate: "2026-09-05",
    relatedProductSlugs: [
      "arabica-reserve-whole-bean",
      "robusta-intense-whole-bean",
      "culi-select-peaberry-whole-bean",
      "arabica-reserve-medium-ground",
      "arabica-reserve-fine-specialty-grind",
    ],
    relatedU20xChallenge: "morning-coffee-ritual",
    isSample: true,
    seoTitle: "Understanding Coffee Grind and Preparation | Ray's Healthy Living",
    metaDescription:
      "How grind size, contact time and water temperature affect your coffee. A practical guide from Ray's Healthy Living.",
  },

  // ── Article 3 ─────────────────────────────────────────────────────────────
  {
    id: "art-003",
    slug: "botanical-powders-in-warm-drinks",
    title: "Using Botanical Powders in Warm Drinks",
    excerpt:
      "Powder-form botanicals dissolve or suspend best in warm liquid, but technique matters. Here is what works.",
    body: `Botanical powders behave differently from cut and sifted leaf. Because the particle size is so small, they do not steep in the same way — the goal is to get the powder evenly distributed through the liquid rather than extracted from it.\n\nWarm milk or water at around 60–70 °C tends to work better than boiling liquid for powders. Very hot liquid can cause some powders to clump or form a skin on the surface before they have mixed in. A lower temperature gives you more time to whisk or blend before the liquid starts to set.\n\nThe most effective method is a small whisk or a milk frother. Add the powder to a small amount of warm liquid first, whisk to form a smooth paste, then add the rest of the liquid and whisk again. This avoids the dry clumps that form when powder is added to a full cup all at once.\n\nA blender works well for larger volumes and produces a smoother, more consistent drink.\n\nSome botanical powders have a naturally strong or bitter flavour at higher doses. Start with a smaller amount than the label suggests, taste, and increase gradually over a few days if needed.\n\nStore powder-form botanicals in a sealed, dry container away from heat and humidity. Moisture exposure degrades powders quickly.`,
    category: "tea-preparation",
    coverImage: "/tea-coffee/articles/botanical-powders-guide.svg",
    publishedDate: "2026-09-10",
    relatedProductSlugs: ["ashwagandha-botanical-powder"],
    relatedU20xChallenge: "",
    isSample: true,
    seoTitle: "Using Botanical Powders in Warm Drinks | Ray's Healthy Living",
    metaDescription:
      "How to mix botanical powders into warm drinks for a smooth, evenly distributed cup. Tips from Ray's Healthy Living.",
  },
];

/** Convenience: find an article by slug. Returns undefined if not found. */
export function getArticleBySlug(slug: string): TeaCoffeeArticle | undefined {
  return SAMPLE_ARTICLES.find((a) => a.slug === slug);
}

/** Convenience: find articles related to a product slug. */
export function getArticlesForProduct(productSlug: string): TeaCoffeeArticle[] {
  return SAMPLE_ARTICLES.filter((a) => a.relatedProductSlugs.includes(productSlug));
}
