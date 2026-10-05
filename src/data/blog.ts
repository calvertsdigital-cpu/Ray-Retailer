/** CMS-shaped blog records. Listing and detail pages both render from here. */

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
  | { type: "checklist"; items: { icon?: string; text: string }[] }
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
  body: string[];
  relatedSlugs: string[];
  seoTitle: string;
  metaDescription: string;
  published: boolean;

  // --- new optional fields (all backward-compatible) ---
  featureImageUrl?: string;
  featureImageAlt?: string;
  subtitle?: string;
  authorAvatar?: string;
  authorBrandLine?: string;
  updatedDate?: string;
  categorySlug?: string;
  categoryIcon?: string;
  sections?: ArticleSection[];
  bottomLine?: string;
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
  { slug: "heart-health", label: "Heart Health", icon: "HeartPulse" },
  { slug: "immune-health", label: "Immune Health", icon: "ShieldCheck" },
  { slug: "digestive-health", label: "Digestive Health", icon: "Leaf" },
  { slug: "healthy-living", label: "Healthy Living", icon: "Sprout" },
  { slug: "nutrition", label: "Nutrition", icon: "Apple" },
  { slug: "supplements", label: "Supplements", icon: "FlaskConical" },
  { slug: "mental-well-being", label: "Mental Well-being", icon: "Brain" },
  { slug: "routines", label: "Routines", icon: "CalendarCheck" },
];

// ---------------------------------------------------------------------------
// Blog posts
// ---------------------------------------------------------------------------

export const blogPosts: BlogPost[] = [
  // -------------------------------------------------------------------------
  // SEED: How to Improve Blood Circulation Naturally
  // -------------------------------------------------------------------------
  {
    slug: "improve-blood-circulation-naturally",
    title: "How to Improve Blood Circulation Naturally",
    subtitle: "Simple daily habits that support healthy blood flow from head to toe",
    excerpt:
      "Small daily habits — movement, hydration, the right foods and targeted support — stack up into meaningfully better circulation over time.",
    category: "Circulatory Health",
    categorySlug: "circulatory-health",
    categoryIcon: "Heart",
    author: "Ray's Healthy Living",
    authorBrandLine: "Wellness Education Team",
    date: "2025-01-15",
    readTime: "8 min read",
    featureImageUrl: "/src/assets/cat-irish-moss.jpg",
    featureImageAlt: "Illustration of healthy blood circulation",
    bottomLine:
      "Good circulation is built daily — through movement, hydration, whole foods and targeted support. No single habit or supplement does it alone, but together they compound into real, lasting change.",
    recommendedProductSlugs: [
      "organic-beet-root",
      "full-spectrum-cayenne",
      "anthocyanin-bilberry",
      "adaptogen-vitality-complex",
    ],
    u20xChallengePath: "/u20x",
    tags: ["circulation", "cardiovascular", "lifestyle", "nutrition"],
    sections: [
      {
        id: "why-circulation-matters",
        heading: "Why Circulation Matters",
        content: [
          {
            type: "paragraph",
            text: "Blood circulation is the body's delivery system — carrying oxygen and nutrients to every cell while clearing away waste products. When circulation is strong and consistent, tissues receive what they need and remove what they don't. When it slows or weakens, the effects ripple across nearly every system in the body.",
          },
          {
            type: "checklist",
            items: [
              { icon: "Snowflake", text: "Cold hands and feet, even in warm environments" },
              { icon: "BatteryLow", text: "Persistent fatigue or low energy despite adequate sleep" },
              { icon: "Zap", text: "Numbness or tingling in the extremities" },
              { icon: "Clock", text: "Slow wound healing or skin that bruises easily" },
              { icon: "CloudFog", text: "Brain fog, difficulty concentrating, or poor memory" },
            ],
          },
        ],
      },
      {
        id: "lifestyle-habits",
        heading: "Lifestyle Habits That Support Circulation",
        content: [
          {
            type: "numbered",
            items: [
              {
                number: 1,
                title: "Regular Movement",
                body: "Even moderate daily movement — a 20-to-30-minute walk, stretching, or light resistance work — contracts muscles that help push blood back toward the heart. The key is consistency rather than intensity. Sitting for long periods allows blood to pool in the legs; breaking up sedentary time every hour makes a meaningful difference.",
              },
              {
                number: 2,
                title: "Stay Hydrated",
                body: "Blood is roughly 55% plasma, most of which is water. When you're under-hydrated, blood thickens and moves more slowly. Aim for steady fluid intake throughout the day — water, herbal teas and mineral-rich broths all count. Adding trace electrolytes can help the body actually use the fluids it takes in.",
              },
              {
                number: 3,
                title: "Quit Smoking",
                body: "Smoking damages the inner lining of blood vessels and causes arteries to narrow over time. If you smoke, reducing or stopping is one of the most impactful single changes you can make for long-term vascular health. Speak with a healthcare provider about structured cessation support.",
              },
              {
                number: 4,
                title: "Manage Stress",
                body: "Chronic stress keeps the body in a low-level state of alert that causes blood vessels to constrict. Daily practices that activate the parasympathetic nervous system — slow breathing, light movement, time outdoors, adequate sleep — give vessels a chance to relax and blood to flow more freely.",
              },
            ],
          },
        ],
      },
      {
        id: "foods-for-circulation",
        heading: "Foods That Support Healthy Circulation",
        content: [
          {
            type: "paragraph",
            text: "The foods you eat directly affect blood vessel flexibility, nitric oxide production and the thickness of the blood itself. A diet centered on whole, minimally processed foods provides the raw materials your vascular system needs to stay responsive.",
          },
          {
            type: "checklist",
            items: [
              { icon: "Leaf", text: "Beets — naturally rich in nitrates that the body converts to nitric oxide, supporting vessel dilation" },
              { icon: "Flame", text: "Cayenne pepper — contains capsaicin, which may support healthy blood flow and vessel tone" },
              { icon: "Grape", text: "Berries — anthocyanins and polyphenols from blueberries, bilberries and cherries help protect vessel walls" },
              { icon: "Sprout", text: "Garlic — allicin supports healthy platelet activity and vessel relaxation" },
              { icon: "Fish", text: "Fatty fish (salmon, mackerel, sardines) — omega-3s support blood fluidity and reduce inflammatory markers" },
              { icon: "Square", text: "Dark chocolate (70%+) — flavonoids support nitric oxide production and vessel elasticity" },
              { icon: "Sun", text: "Citrus fruits — vitamin C and bioflavonoids strengthen capillary walls and support collagen in vessels" },
            ],
          },
        ],
      },
      {
        id: "targeted-support",
        heading: "Targeted Supplement Support",
        content: [
          {
            type: "paragraph",
            text: "Supplements work best as a complement to the habits above — not a shortcut around them. A well-built daily routine of movement, hydration and whole foods creates the foundation; targeted herbal and nutritional support can then reinforce areas where diet alone falls short. Look for standardized botanical extracts from suppliers with transparent sourcing, and introduce one product at a time so you can observe how your body responds. As with any supplement, discuss additions with a healthcare professional if you take prescription medication or have a diagnosed cardiovascular condition.",
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
    ],
    relatedArticleSlugs: [
      "understanding-your-wellness-where-to-start",
      "building-a-daily-routine-that-sticks",
    ],
    body: [""],
    seoTitle: "How to Improve Blood Circulation Naturally | Ray's Healthy Living",
    metaDescription:
      "Learn natural ways to improve blood circulation through movement, diet, hydration and targeted herbal support. Educational content from Ray's Healthy Living.",
    published: true,
  },

  // -------------------------------------------------------------------------
  // Existing posts — featureImageUrl and categorySlug added; all other
  // fields are unchanged.
  // -------------------------------------------------------------------------
  {
    slug: "understanding-your-wellness-where-to-start",
    title: "Understanding your wellness: where to start",
    excerpt:
      "Before adding supplements, look at sleep, hydration and food timing. Here's a simple weekly reset.",
    category: "Foundations",
    categorySlug: "healthy-living",
    author: "Ray's Healthy Living",
    date: "2026-08-18",
    readTime: "5 min read",
    featureImageUrl: "/src/assets/product-capsules.jpg",
    featureImageAlt: "Wellness essentials laid out on a clean surface",
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
  {
    slug: "sea-moss-explained-without-the-hype",
    title: "Sea moss, explained without the hype",
    excerpt:
      "What sea moss actually is, how people use it, and what to look for on a label.",
    category: "Ingredients",
    categorySlug: "supplements",
    author: "Ray's Healthy Living",
    date: "2026-07-29",
    readTime: "6 min read",
    featureImageUrl: "/src/assets/cat-irish-moss.jpg",
    featureImageAlt: "Wildcrafted Irish sea moss in its natural form",
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
  {
    slug: "building-a-daily-routine-that-sticks",
    title: "Building a daily routine that sticks",
    excerpt:
      "Small anchors beat big overhauls. A practical guide to routines you'll still keep in a month.",
    category: "Routines",
    categorySlug: "routines",
    author: "Ray's Healthy Living",
    date: "2026-07-11",
    readTime: "4 min read",
    featureImageUrl: "/src/assets/product-capsules.jpg",
    featureImageAlt: "A person building a consistent morning wellness routine",
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
  {
    slug: "loose-herbs-101",
    title: "Loose herbs 101: brewing, storing, blending",
    excerpt:
      "How to get the most from dried herbs at home, from water temperature to storage jars.",
    category: "How-to",
    categorySlug: "supplements",
    author: "Ray's Healthy Living",
    date: "2026-06-24",
    readTime: "7 min read",
    featureImageUrl: "/src/assets/cat-loose-herbs.jpg",
    featureImageAlt: "Dried loose herbs ready for brewing",
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
