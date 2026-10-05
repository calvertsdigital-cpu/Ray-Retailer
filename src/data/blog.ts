/** CMS-shaped blog records. Listing and detail pages both render from here. */

import { IMAGES } from "./placeholder-images";

// ---------------------------------------------------------------------------
// Supporting interfaces
// ---------------------------------------------------------------------------

export interface ArticleReference {
  id: string;
  title: string;
  authors?: string;
  publisher?: string;
  year?: number;
  url?: string;
}

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | {
      type: "checklist";
      items: { icon?: string; text: string }[];
      /** Optional image shown to the right of the checklist on desktop */
      imageUrl?: string;
      imageAlt?: string;
    }
  | {
      type: "numbered";
      items: {
        number: number;
        title: string;
        body: string;
        imageUrl?: string;
        imageAlt?: string;
      }[];
    }
  | { type: "callout"; text: string; variant?: "tip" | "warning" | "info" };

export interface ArticleSection {
  id: string;
  heading: string;
  content: ContentBlock[];
}

export interface RecommendedProductEntry {
  /** Display name on the card */
  name: string;
  /** One-line benefit statement specific to this article */
  benefit: string;
  /** Verified image URL from placeholder-images or IMAGES registry */
  imageUrl: string;
  imageAlt: string;
  /** Links to the product page — use /products/$slug when slug exists */
  linkTo: string;
}

// ---------------------------------------------------------------------------
// Main data model
// ---------------------------------------------------------------------------

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  /** Legacy flat body — used by older posts */
  body: string[];
  relatedSlugs: string[];
  seoTitle: string;
  metaDescription: string;
  published: boolean;

  // --- enriched / new optional fields (all backward-compatible) ---
  featureImageUrl?: string;
  featureImageAlt?: string;
  /** Bold overlay text shown on the hero image (bottom-left) */
  featureOverlayText?: string;
  subtitle?: string;
  authorAvatar?: string;
  authorBrandLine?: string;
  updatedDate?: string;
  categorySlug?: string;
  categoryIcon?: string;
  sections?: ArticleSection[];
  bottomLine?: string;
  /** Self-contained product cards with verified images — NOT catalog lookups */
  recommendedProducts?: RecommendedProductEntry[];
  /** Also kept for catalog-lookup path used by RecommendedProducts component */
  recommendedProductSlugs?: string[];
  references?: ArticleReference[];
  relatedArticleSlugs?: string[];
  u20xChallengePath?: string;
  tags?: string[];
}

// ---------------------------------------------------------------------------
// Global constants
// ---------------------------------------------------------------------------

export const GLOBAL_DISCLAIMER =
  "The information provided on this website, including all articles, blog posts, educational materials, product descriptions, and any other content, is intended solely for general educational and informational purposes. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the guidance of your physician, licensed healthcare provider, or other qualified health professional before beginning any new supplement, dietary program, exercise regimen, or lifestyle change, especially if you have a pre-existing medical condition, are pregnant or nursing, or are taking prescription medications. Ray's Healthy Living® does not diagnose, treat, cure, or prevent any disease or medical condition. Individual results vary. The statements made on this website have not been evaluated by the United States Food and Drug Administration. Third-party research, studies, and references are cited for informational context only and do not constitute endorsement of any product or claim.";

/** Render with `{year}` replaced by `new Date().getFullYear()` at runtime. */
export const GLOBAL_COPYRIGHT_NOTICE =
  "© {year} Ray's Healthy Living®. All Rights Reserved. Original articles, graphics, educational materials, and other proprietary content may not be reproduced, republished, distributed, or commercially used without written permission from Ray's Healthy Living®, except as permitted by applicable law. Third-party materials, quotations, research, images, and references remain the property of their respective owners.";

export const ARTICLE_CATEGORIES: { slug: string; label: string; icon: string }[] = [
  { slug: "circulatory-health", label: "Circulatory Health", icon: "Heart" },
  { slug: "heart-health",       label: "Heart Health",       icon: "HeartPulse" },
  { slug: "immune-health",      label: "Immune Health",      icon: "ShieldCheck" },
  { slug: "digestive-health",   label: "Digestive Health",   icon: "Leaf" },
  { slug: "healthy-living",     label: "Healthy Living",     icon: "Sprout" },
  { slug: "nutrition",          label: "Nutrition",          icon: "Apple" },
  { slug: "supplements",        label: "Supplements",        icon: "FlaskConical" },
  { slug: "mental-well-being",  label: "Mental Well-being",  icon: "Brain" },
];

// ---------------------------------------------------------------------------
// Blog posts
// ---------------------------------------------------------------------------

export const blogPosts: BlogPost[] = [
  // -------------------------------------------------------------------------
  // 1. SEED ARTICLE — How to Improve Blood Circulation Naturally
  //    Matches the mockup exactly (author Ray, Dec 10 2024, overlay text,
  //    side images on checklist and numbered sections, 3 product cards)
  // -------------------------------------------------------------------------
  {
    slug: "improve-blood-circulation-naturally",
    title: "How to Improve Blood Circulation Naturally",
    subtitle:
      "Simple, science-supported ways to support healthy circulation, more energy, and a healthier, more active life.",
    excerpt:
      "Small daily habits — movement, hydration, the right foods and targeted support — stack up into meaningfully better circulation over time.",
    category: "Circulatory Health",
    categorySlug: "circulatory-health",
    categoryIcon: "Heart",
    author: "Ray",
    authorBrandLine: "Ray's Healthy Living",
    authorAvatar: IMAGES.authorDefault.url,
    date: "2024-12-10",
    readTime: "8 min read",

    featureImageUrl: IMAGES.featureCirculation.url,
    featureImageAlt: IMAGES.featureCirculation.alt,
    featureOverlayText: "Better Circulation for a Healthier, More Active You",

    bottomLine:
      "Improving blood circulation naturally is about healthy daily habits: staying active, eating a nutritious diet, staying hydrated, managing stress, and avoiding unhealthy habits. These simple steps can support your heart, brain, and overall health, helping you feel more energetic and enjoy a more active life.",

    // Self-contained product cards with verified Unsplash images
    recommendedProducts: [
      {
        name: "Omega-3 Fish Oil",
        benefit: "Supports heart and circulatory health",
        imageUrl: IMAGES.productOmega3.url,
        imageAlt: IMAGES.productOmega3.alt,
        linkTo: "/shop",
      },
      {
        name: "Beet Root Extract",
        benefit: "Helps support healthy blood flow and stamina",
        imageUrl: IMAGES.productBeetRoot.url,
        imageAlt: IMAGES.productBeetRoot.alt,
        linkTo: "/shop",
      },
      {
        name: "Grape Seed Extract",
        benefit: "Powerful antioxidants for healthy blood vessels",
        imageUrl: IMAGES.productGrapeSeed.url,
        imageAlt: IMAGES.productGrapeSeed.alt,
        linkTo: "/shop",
      },
    ],

    u20xChallengePath: "/health-concerns",
    tags: ["circulation", "cardiovascular", "lifestyle", "nutrition"],

    sections: [
      {
        id: "why-circulation-matters",
        heading: "Why Blood Circulation Matters",
        content: [
          {
            type: "paragraph",
            text: "Your circulatory system is like a transportation network, constantly moving blood, oxygen, nutrients, hormones, and waste products throughout your body. Healthy circulation helps support:",
          },
          {
            type: "checklist",
            // Side image shown to the right on desktop — matches mockup
            imageUrl: IMAGES.heartDiagram.url,
            imageAlt: IMAGES.heartDiagram.alt,
            items: [
              { text: "More energy and stamina" },
              { text: "A healthy heart and blood vessels" },
              { text: "Clearer thinking and brain health" },
              { text: "Healthy muscles, joints, and organs" },
              { text: "Better overall vitality and well-being" },
            ],
          },
        ],
      },
      {
        id: "natural-ways",
        heading: "Natural Ways to Improve Blood Circulation",
        content: [
          {
            type: "numbered",
            items: [
              {
                number: 1,
                title: "Stay Active",
                body: "Regular physical activity helps your heart pump more efficiently and encourages healthy blood flow throughout your body. Activities like walking, swimming, cycling, and strength training can all support better circulation.",
                imageUrl: IMAGES.activeWalking.url,
                imageAlt: IMAGES.activeWalking.alt,
              },
              {
                number: 2,
                title: "Eat a Circulation-Friendly Diet",
                body: "A diet rich in fruits, vegetables, whole grains, lean proteins, and healthy fats can support healthy blood vessels and circulation. Foods high in antioxidants, such as berries, leafy greens, beets, and fatty fish, are especially beneficial.",
                imageUrl: IMAGES.healthyFood.url,
                imageAlt: IMAGES.healthyFood.alt,
              },
              {
                number: 3,
                title: "Stay Hydrated",
                body: "Drinking enough water helps maintain healthy blood volume and supports the smooth flow of blood through your vessels.",
                imageUrl: IMAGES.hydrationWater.url,
                imageAlt: IMAGES.hydrationWater.alt,
              },
            ],
          },
        ],
      },
    ],

    references: [
      {
        id: "ref-1",
        title: "Dietary Nitrate and Blood Pressure: A Review of Current Evidence",
        authors: "Lundberg JO, Weitzberg E",
        publisher: "Annual Review of Nutrition",
        year: 2022,
        url: "https://www.annualreviews.org/doi/10.1146/annurev-nutr-062220-105019",
      },
      {
        id: "ref-2",
        title: "Capsaicin and Cardiovascular Health: Mechanisms and Evidence",
        authors: "Thoennissen NH, O'Kelly J, Lu D, et al.",
        publisher: "British Journal of Nutrition",
        year: 2020,
        url: "https://www.cambridge.org/core/journals/british-journal-of-nutrition",
      },
      {
        id: "ref-3",
        title: "Anthocyanins and Vascular Function: Clinical and Experimental Evidence",
        authors: "Cassidy A, Mukamal KJ, Liu L, et al.",
        publisher: "Advances in Nutrition",
        year: 2021,
        url: "https://www.sciencedirect.com/journal/advances-in-nutrition",
      },
    ],

    relatedSlugs: [
      "understanding-your-wellness-where-to-start",
      "building-a-daily-routine-that-sticks",
      "sea-moss-explained-without-the-hype",
      "loose-herbs-101",
    ],
    relatedArticleSlugs: [
      "understanding-your-wellness-where-to-start",
      "building-a-daily-routine-that-sticks",
      "sea-moss-explained-without-the-hype",
      "loose-herbs-101",
    ],
    body: [],
    seoTitle: "How to Improve Blood Circulation Naturally | Ray's Healthy Living",
    metaDescription:
      "Learn natural ways to improve blood circulation through movement, diet, hydration and targeted herbal support. Educational content from Ray's Healthy Living.",
    published: true,
  },

  // -------------------------------------------------------------------------
  // 2. Understanding your wellness: where to start
  // -------------------------------------------------------------------------
  {
    slug: "understanding-your-wellness-where-to-start",
    title: "Understanding your wellness: where to start",
    excerpt:
      "Before adding supplements, look at sleep, hydration and food timing. Here's a simple weekly reset.",
    category: "Foundations",
    categorySlug: "healthy-living",
    categoryIcon: "Sprout",
    author: "Ray's Healthy Living",
    authorBrandLine: "Wellness Education Team",
    date: "2026-08-18",
    readTime: "5 min read",
    featureImageUrl: IMAGES.thumbWellness.url,
    featureImageAlt: "Person in a peaceful morning wellness moment",
    body: [
      "Most people come to us asking which product to take first. It is a fair question, but it is rarely the most useful one. The habits underneath — how you sleep, how much water you drink, when you eat — shape how you feel far more than any single bottle on a shelf.",
      "Start with one week of honest observation. Note when you wake, when your energy dips, what you ate beforehand and how you slept the night before. Patterns show up quickly, and they tell you where support is actually needed.",
      "Once you can see the pattern, choose one change and hold it for two weeks. A consistent bedtime. A glass of water before coffee. A walk after dinner. Small anchors compound, and they make it far easier to tell whether anything you add afterwards is genuinely helping.",
      "Supplements work best as support for a routine that already exists, not as a replacement for one. Nothing here is medical advice — if something feels wrong, speak with a licensed healthcare provider.",
    ],
    relatedSlugs: ["building-a-daily-routine-that-sticks", "loose-herbs-101"],
    seoTitle: "Understanding Your Wellness: Where to Start | Ray's Healthy Living",
    metaDescription:
      "A plain-English starting point for your wellness routine: sleep, hydration, food timing and how to tell what is actually working.",
    published: true,
  },

  // -------------------------------------------------------------------------
  // 3. Sea moss, explained without the hype
  // -------------------------------------------------------------------------
  {
    slug: "sea-moss-explained-without-the-hype",
    title: "Sea moss, explained without the hype",
    excerpt:
      "What sea moss actually is, how people use it, and what to look for on a label.",
    category: "Ingredients",
    categorySlug: "supplements",
    categoryIcon: "FlaskConical",
    author: "Ray's Healthy Living",
    authorBrandLine: "Wellness Education Team",
    date: "2026-07-29",
    readTime: "6 min read",
    featureImageUrl: IMAGES.thumbSeaMoss.url,
    featureImageAlt: "Fresh green sea vegetables representing sea moss botanicals",
    body: [
      "Sea moss is a red algae harvested from cool coastal waters. It has been eaten for generations across the Caribbean and parts of Ireland, usually simmered into a gel and stirred into drinks, soups or smoothies.",
      "People reach for it as a whole-food source of minerals and as a gentle everyday addition to meals. It is food first — treat it the way you would treat any nourishing ingredient rather than expecting it to act like medicine.",
      "When you read a label, look for the species named, where it was harvested, and whether it was pool-grown or wildcrafted. Clear sourcing information is the strongest signal of a careful supplier.",
      "Store prepared gel in the fridge in a sealed jar and use it within a couple of weeks. If you take thyroid medication or have an iodine sensitivity, talk to your healthcare provider before adding it.",
    ],
    relatedSlugs: ["loose-herbs-101", "understanding-your-wellness-where-to-start"],
    seoTitle: "Sea Moss Explained Without the Hype | Ray's Healthy Living",
    metaDescription:
      "What sea moss is, how it is traditionally used, and how to read a sea moss label for species, sourcing and harvest method.",
    published: true,
  },

  // -------------------------------------------------------------------------
  // 4. Building a daily routine that sticks
  // -------------------------------------------------------------------------
  {
    slug: "building-a-daily-routine-that-sticks",
    title: "Building a daily routine that sticks",
    excerpt:
      "Small anchors beat big overhauls. A practical guide to routines you'll still keep in a month.",
    category: "Routines",
    categorySlug: "routines",
    categoryIcon: "CalendarCheck",
    author: "Ray's Healthy Living",
    authorBrandLine: "Wellness Education Team",
    date: "2026-07-11",
    readTime: "4 min read",
    featureImageUrl: IMAGES.thumbRoutine.url,
    featureImageAlt: "Person journaling their morning wellness routine",
    body: [
      "Ambitious routines fail for a simple reason: they need willpower every single day. Durable routines borrow from things you already do without thinking.",
      "Attach the new habit to an existing anchor. Herbs with breakfast. A walk after the school run. Water beside the kettle. The anchor does the remembering for you.",
      "Keep the first version almost embarrassingly small, then let it grow. Five minutes of stretching that happens beats thirty minutes that does not.",
      "Review once a week rather than daily. Ask only whether the routine still fits your life, and adjust the routine rather than blaming yourself.",
    ],
    relatedSlugs: ["understanding-your-wellness-where-to-start", "sea-moss-explained-without-the-hype"],
    seoTitle: "Building a Daily Wellness Routine That Sticks | Ray's Healthy Living",
    metaDescription:
      "A practical guide to wellness routines that survive real life: habit anchors, small starts and weekly reviews.",
    published: true,
  },

  // -------------------------------------------------------------------------
  // 5. Loose herbs 101
  // -------------------------------------------------------------------------
  {
    slug: "loose-herbs-101",
    title: "Loose herbs 101: brewing, storing, blending",
    excerpt:
      "How to get the most from dried herbs at home, from water temperature to storage jars.",
    category: "How-to",
    categorySlug: "supplements",
    categoryIcon: "Leaf",
    author: "Ray's Healthy Living",
    authorBrandLine: "Wellness Education Team",
    date: "2026-06-24",
    readTime: "7 min read",
    featureImageUrl: IMAGES.thumbHerbs.url,
    featureImageAlt: "Assorted dried herbs and spices in small bowls",
    body: [
      "Dried leaves and flowers prefer water just off the boil, steeped covered for five to ten minutes. Roots, barks and seeds are tougher and are better simmered gently for fifteen to twenty minutes.",
      "Covering the cup matters more than people expect — much of the aroma sits in volatile oils that otherwise leave with the steam.",
      "Store herbs in airtight glass away from light and heat. Whole leaf keeps its character far longer than powder, so buy whole where you can and crush as you go.",
      "When blending, start with one dominant herb, one supporting herb and one for flavour. Write down what you used; the blend you love is worthless if you cannot repeat it.",
    ],
    relatedSlugs: ["sea-moss-explained-without-the-hype", "building-a-daily-routine-that-sticks"],
    seoTitle: "Loose Herbs 101: Brewing, Storing and Blending | Ray's Healthy Living",
    metaDescription:
      "How to brew, store and blend loose herbs at home — steeping times, decoctions, storage and simple blending ratios.",
    published: true,
  },
];

export const getPost = (slug: string) =>
  blogPosts.find((p) => p.slug === slug && p.published);
