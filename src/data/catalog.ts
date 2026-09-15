import type { AccordionRow, Category, Product, ProductMedia, Review } from "./types";
import { catalogProducts } from "./wholesale";

import { applyStoredOverrides, hiddenSlugs } from "@/lib/cms";


import capsules from "@/assets/product-capsules.jpg";
import irishMoss from "@/assets/cat-irish-moss.jpg";
import looseHerbs from "@/assets/cat-loose-herbs.jpg";
import essentialOil from "@/assets/cat-essential-oil.jpg";
import bottleAsset from "@/assets/rhl-bottle.jpg.asset.json";
import guaranteeAsset from "@/assets/rhl-guarantee.jpg.asset.json";

const lifestyle = bottleAsset.url;
const benefitsGraphic = guaranteeAsset.url;

export const categories: Category[] = [
  {
    slug: "irish-moss",
    name: "Irish Moss",
    blurb: "Sea moss gels, capsules and raw moss for everyday mineral support.",
    image: irishMoss,
  },
  {
    slug: "rays-vitality",
    name: "Ray's Vitality",
    blurb: "Our own daily wellness formulas, made for the whole family.",
    image: capsules,
  },
  {
    slug: "loose-herbs",
    name: "Loose Herbs",
    blurb: "Ethically sourced single herbs, weighed and packed in store.",
    image: looseHerbs,
  },
  {
    slug: "essential-oil",
    name: "Essential Oils",
    blurb: "Pure, undiluted oils for calm routines and clean living.",
    image: essentialOil,
  },
  {
    slug: "maximum-cardio",
    name: "Maximum Cardio",
    blurb: "Circulation, heart and stamina support from trusted brands.",
    image: capsules,
  },
  {
    slug: "capsules",
    name: "Capsules & Tablets",
    blurb: "Single herbs, vitamins and targeted formulas in vegetarian capsules.",
    image: capsules,
  },
  {
    slug: "tinctures",
    name: "Liquid Extracts",
    blurb: "Full spectrum and select herbal extracts in 1, 2 and 4 oz bottles.",
    image: essentialOil,
  },
  {
    slug: "coffee",
    name: "Coffee & Wellness Drinks",
    blurb: "Herbal coffees and functional blends to start the day well.",
    image: looseHerbs,
  },
];

export const brands = [
  "Ray's Healthy Living",
  "Nature's Field",
  "Green Harvest Botanicals",
  "Atlantic Sea Co.",
];

/* ---------------------------------------------------------------------- */

function media(name: string, opts?: { video?: boolean }): ProductMedia[] {
  const base: ProductMedia[] = [
    {
      id: `${name}-front`,
      type: "image",
      kind: "front-label",
      label: "Front label",
      src: capsules,
      alt: `${name} front label`,
      sortOrder: 1,
      published: true,
    },
    {
      id: `${name}-back`,
      type: "image",
      kind: "back-label",
      label: "Supplement facts",
      src: benefitsGraphic,
      alt: `${name} supplement facts panel`,
      sortOrder: 2,
      published: true,
    },
    {
      id: `${name}-size`,
      type: "image",
      kind: "size-reference",
      label: "Size reference",
      src: lifestyle,
      alt: `${name} capsule size reference`,
      sortOrder: 3,
      published: true,
    },
    {
      id: `${name}-benefits`,
      type: "image",
      kind: "benefits",
      label: "Benefits",
      src: irishMoss,
      alt: `${name} key benefits graphic`,
      sortOrder: 4,
      published: true,
    },
    {
      id: `${name}-lifestyle`,
      type: "image",
      kind: "lifestyle",
      label: "In everyday life",
      src: essentialOil,
      alt: `${name} shown in an everyday wellness routine`,
      sortOrder: 5,
      published: true,
    },
  ];

  if (opts?.video) {
    base.push({
      id: `${name}-video`,
      type: "video",
      kind: "video",
      label: "Product overview",
      src: "https://cdn.coverr.co/videos/coverr-a-woman-pours-a-glass-of-water-3389/1080p.mp4",
      poster: looseHerbs,
      alt: `${name} product overview video`,
      sortOrder: 6,
      published: true,
      approved: true,
    });
  }
  return base;
}

function info(rows: {
  used: string;
  benefits: string[];
  how: string;
  use: string;
  avoid: string[];
  combine: string;
  faqs: { q: string; a: string }[];
}): AccordionRow[] {
  return [
    { id: "used-for", title: "What is this product used for?", body: rows.used, sortOrder: 1, visible: true },
    { id: "benefits", title: "What are the key benefits?", items: rows.benefits, sortOrder: 2, visible: true },
    { id: "how", title: "How does it work in the body?", body: rows.how, sortOrder: 3, visible: true },
    { id: "usage", title: "How do I use this product?", body: rows.use, sortOrder: 4, visible: true },
    { id: "not-for", title: "Who should NOT use this product?", items: rows.avoid, sortOrder: 5, visible: true },
    { id: "combine", title: "Can I combine this with other supplements?", body: rows.combine, sortOrder: 6, visible: true },
    { id: "faq", title: "Frequently Asked Questions", faqs: rows.faqs, sortOrder: 7, visible: true },
    {
      id: "disclaimer",
      title: "Disclaimer",
      body:
        "Statements made, or products sold through this website, have not been evaluated by the United States Food and Drug Administration. They are not intended to diagnose, treat, cure or prevent any disease. Results may vary with each individual.",
      sortOrder: 8,
      visible: true,
    },
  ];
}

function reviews(seed: string, entries: [string, number, string, string][]): Review[] {
  return entries.map(([author, rating, title, body], i) => ({
    id: `${seed}-r${i}`,
    author,
    rating,
    date: (["2026-07-14", "2026-06-02", "2026-04-21", "2026-03-08"] as const)[i % 4] ?? "2026-07-14",
    title,
    body,
    verified: true,
  }));
}

/* ---------------------------------------------------------------------- */

const curatedProducts: Product[] = [
  {
    id: "p-b1",
    sku: "RHL-B1-100",
    upc: "081000010013",
    slug: "vitamin-b1-thiamine-100mg",
    name: "Vitamin B1 Thiamine 100 mg",
    brand: "Ray's Healthy Living",
    category: "rays-vitality",
    price: 18.95,
    rating: 4.8,
    reviewCount: 126,
    inStock: true,
    shortDescription: "A straightforward thiamine (vitamin B1) supplement for everyday nutritional support.",
    supportStatement: "Nutritional support — thiamine is commonly depleted with heavy alcohol use.",
    longDescription: [
      "Thiamine, also known as vitamin B1, is a water-soluble B vitamin the body does not store in large amounts, so it needs to be replenished regularly through food or supplementation.",
      "Our thiamine is packed in an FDA-registered, NSF GMP certified facility and tested for identity and purity before it reaches the shelf in our Prince Frederick store.",
    ],
    media: media("Vitamin B1 Thiamine", { video: true }),
    benefits: [
      { icon: "Zap", title: "Everyday energy metabolism", text: "B1 is part of how the body turns food into usable energy." },
      { icon: "Brain", title: "Nervous system nutrition", text: "A foundational nutrient for normal nervous system function." },
      { icon: "Leaf", title: "Simple formula", text: "No artificial colors, sweeteners or unnecessary fillers." },
      { icon: "ShieldCheck", title: "Tested and certified", text: "Produced in an NSF GMP certified facility." },
    ],
    concernSlugs: ["alcoholism"],
    relatedSlugs: ["magnesium-glycinate-400mg", "electrolyte-mineral-complex", "milk-thistle-liver-support"],
    additionalInfo: info({
      used: "A daily nutritional supplement for people who want to support their thiamine intake, including those with limited dietary variety or higher nutritional needs.",
      benefits: [
        "Supports normal energy metabolism as part of the diet",
        "Contributes to normal nervous system function",
        "Easy once-daily capsule",
        "Free from artificial colors and sweeteners",
      ],
      how: "Thiamine acts as a co-factor that the body uses when converting carbohydrates from food into energy. Because it is water-soluble, the body excretes what it does not use.",
      use: "Take one capsule daily with a meal, or as directed by your healthcare professional.",
      avoid: [
        "Children under 18 unless directed by a healthcare professional",
        "Anyone who is pregnant or nursing without professional guidance",
        "Anyone with a known sensitivity to any listed ingredient",
      ],
      combine: "Thiamine is commonly taken alongside a broader B-complex, magnesium or an electrolyte supplement. If you take prescription medication, check with your pharmacist or doctor first.",
      faqs: [
        { q: "When is the best time to take it?", a: "Most customers take it in the morning with breakfast." },
        { q: "Is it vegetarian?", a: "Yes — the capsule shell is plant-derived." },
        { q: "How many servings per bottle?", a: "100 capsules, a 100-day supply at one per day." },
        { q: "Can I take more than one a day?", a: "Only under the guidance of a healthcare professional." },
      ],
    }),
    reviews: reviews("b1", [
      ["Denise M.", 5, "Simple and effective", "I picked this up in the Prince Frederick store and the staff explained exactly how to take it."],
      ["Carl W.", 5, "Good value", "Three months in a bottle for under twenty dollars is hard to beat."],
      ["Angela R.", 4, "No aftertaste", "Easy to swallow and no strange aftertaste like other B vitamins I've tried."],
    ]),
    isBestSeller: true,
    seoTitle: "Vitamin B1 Thiamine 100 mg | Ray's Healthy Living",
    metaDescription: "Daily thiamine (vitamin B1) capsules from Ray's Healthy Living — tested, NSF GMP certified and free from artificial additives.",
  },
  {
    id: "p-kudzu",
    sku: "RHL-KUD-60",
    slug: "kudzu-root-extract",
    name: "Kudzu Root Extract",
    brand: "Green Harvest Botanicals",
    category: "loose-herbs",
    price: 24.5,
    rating: 4.5,
    reviewCount: 58,
    inStock: true,
    shortDescription: "A traditional botanical extract from the root of the kudzu vine.",
    supportStatement: "A traditional herbal option some people explore while changing drinking habits.",
    longDescription: [
      "Kudzu root has a long history of traditional use. We offer it as a straightforward standardized extract so you know exactly what is in each capsule.",
      "Research into kudzu and alcohol intake is limited and ongoing. We present this product for general herbal support only and make no claims about treating or curing any condition.",
    ],
    media: media("Kudzu Root Extract"),
    benefits: [
      { icon: "Sprout", title: "Traditional botanical", text: "A herb with a long record of traditional use." },
      { icon: "FlaskConical", title: "Standardized extract", text: "Consistent extract strength batch to batch." },
      { icon: "Leaf", title: "Responsibly sourced", text: "From growers who share our sourcing standards." },
    ],
    concernSlugs: ["alcoholism"],
    relatedSlugs: ["vitamin-b1-thiamine-100mg", "milk-thistle-liver-support", "ashwagandha-root-capsules"],
    additionalInfo: info({
      used: "A traditional herbal supplement for adults who want to include kudzu root in their routine.",
      benefits: ["Standardized botanical extract", "Vegetarian capsule", "Third-party tested for purity"],
      how: "Kudzu root contains naturally occurring plant compounds called isoflavones. Its effects in the body are still being studied and should not be overstated.",
      use: "Take one capsule twice daily with water, or as directed by your healthcare professional.",
      avoid: [
        "Anyone taking medication that interacts with herbal supplements",
        "People who are pregnant or nursing",
        "Anyone advised to undergo medically supervised detoxification",
      ],
      combine: "Often taken alongside thiamine or a general mineral supplement. Speak with a healthcare professional before combining herbs with prescription medicine.",
      faqs: [
        { q: "Will this stop cravings?", a: "No. We make no claims of that kind. Kudzu is offered as a traditional herbal supplement only." },
        { q: "Is it habit forming?", a: "Kudzu root is not considered habit forming." },
        { q: "How long is a bottle?", a: "60 capsules — 30 days at two per day." },
      ],
    }),
    reviews: reviews("kudzu", [
      ["Tomas L.", 5, "Clear labelling", "Appreciate that the description is honest about what is and isn't known."],
      ["Priya S.", 4, "Good quality", "Capsules are clean, no filler smell."],
    ]),
    seoTitle: "Kudzu Root Extract | Ray's Healthy Living",
    metaDescription: "Standardized kudzu root extract capsules — a traditional botanical supplement from Ray's Healthy Living.",
  },
  {
    id: "p-milk-thistle",
    sku: "RHL-MTH-90",
    slug: "milk-thistle-liver-support",
    name: "Milk Thistle Liver Support",
    brand: "Nature's Field",
    category: "rays-vitality",
    price: 21.0,
    compareAtPrice: 26.0,
    rating: 4.7,
    reviewCount: 204,
    inStock: true,
    shortDescription: "Milk thistle seed extract standardized to 80% silymarin.",
    supportStatement: "General liver-support positioning as part of a balanced routine.",
    longDescription: [
      "Milk thistle is one of the most requested herbs at our counter. Each capsule delivers a standardized seed extract with 80% silymarin.",
      "This is a general wellness supplement. It is not intended to repair or treat alcohol-related liver damage or any other medical condition.",
    ],
    media: media("Milk Thistle", { video: true }),
    benefits: [
      { icon: "Leaf", title: "Standardized silymarin", text: "80% silymarin from milk thistle seed." },
      { icon: "ShieldCheck", title: "Purity tested", text: "Tested for heavy metals and pesticides." },
      { icon: "Sprout", title: "Vegetarian capsule", text: "Plant-based capsule shell, no gelatin." },
      { icon: "Recycle", title: "Ethically sourced", text: "From growers we know by name." },
    ],
    concernSlugs: ["alcoholism"],
    relatedSlugs: ["vitamin-b1-thiamine-100mg", "kudzu-root-extract", "irish-sea-moss-gel"],
    additionalInfo: info({
      used: "A daily herbal supplement for adults who want general liver support as part of an overall healthy routine.",
      benefits: ["Standardized to 80% silymarin", "One capsule daily", "Non-GMO and gluten-free", "Third-party tested"],
      how: "Silymarin is a group of naturally occurring plant compounds found in milk thistle seed. It is traditionally associated with general liver wellness.",
      use: "Take one capsule daily with food.",
      avoid: [
        "Anyone allergic to plants in the ragweed or daisy family",
        "People who are pregnant or nursing without professional advice",
        "Anyone with a diagnosed liver condition, unless advised by their doctor",
      ],
      combine: "Commonly paired with a daily multivitamin or dandelion root. Check with a professional if you take prescription medication.",
      faqs: [
        { q: "Does this repair the liver?", a: "No. We do not make repair or treatment claims. It is a general wellness supplement." },
        { q: "Can I take it long term?", a: "Many customers do, but discuss ongoing use with your healthcare professional." },
        { q: "Is it gluten-free?", a: "Yes, and it is tested for allergens." },
      ],
    }),
    reviews: reviews("mth", [
      ["Renee B.", 5, "My repeat order", "Third bottle. Good price and I trust where Ray sources from."],
      ["Kevin D.", 5, "Easy on the stomach", "No issues taking it with breakfast."],
      ["Ify O.", 4, "Solid", "Would like a larger bottle option."],
    ]),
    isBestSeller: true,
    seoTitle: "Milk Thistle Liver Support, 80% Silymarin | Ray's Healthy Living",
    metaDescription: "Standardized milk thistle seed extract capsules for general liver support — non-GMO, gluten-free and third-party tested.",
  },
  {
    id: "p-mag",
    sku: "RHL-MAG-120",
    slug: "magnesium-glycinate-400mg",
    name: "Magnesium Glycinate 400 mg",
    brand: "Ray's Healthy Living",
    category: "rays-vitality",
    price: 26.95,
    rating: 4.9,
    reviewCount: 341,
    inStock: true,
    shortDescription: "Gentle, highly absorbable magnesium in a glycinate form.",
    supportStatement: "General mineral and nutritional support for rest and everyday calm.",
    longDescription: [
      "Magnesium glycinate is the form we recommend most often for people who find other magnesium supplements hard on the stomach.",
      "Each serving provides 400 mg of elemental magnesium bound to glycine for gentle absorption.",
    ],
    media: media("Magnesium Glycinate", { video: true }),
    benefits: [
      { icon: "Moon", title: "Evening routine friendly", text: "A popular part of a wind-down routine." },
      { icon: "HeartPulse", title: "Muscle and nerve nutrition", text: "Magnesium contributes to normal muscle function." },
      { icon: "Leaf", title: "Gentle form", text: "Glycinate is well tolerated by most people." },
      { icon: "ShieldCheck", title: "Clean label", text: "No magnesium stearate, no artificial additives." },
    ],
    concernSlugs: ["alcoholism"],
    relatedSlugs: ["electrolyte-mineral-complex", "vitamin-b1-thiamine-100mg", "lavender-essential-oil"],
    additionalInfo: info({
      used: "A daily mineral supplement for adults who want to support their magnesium intake, particularly in the evening.",
      benefits: ["400 mg elemental magnesium per serving", "Gentle glycinate form", "No stearates or fillers", "120 capsules per bottle"],
      how: "Magnesium is an essential mineral involved in hundreds of everyday processes, including normal muscle and nervous system function.",
      use: "Take two capsules in the evening with water or food.",
      avoid: [
        "Anyone with kidney disease unless directed by a doctor",
        "People taking medications that affect mineral balance, without advice",
        "Children, unless directed by a healthcare professional",
      ],
      combine: "Works well alongside electrolytes, vitamin D or a B-complex. Space it away from mineral-blocking medications as advised by your pharmacist.",
      faqs: [
        { q: "Will it make me drowsy?", a: "Magnesium is not a sedative, though many customers prefer taking it at night." },
        { q: "Does it cause stomach upset?", a: "Glycinate is generally the gentlest common form." },
        { q: "Is it vegan?", a: "Yes." },
        { q: "How long does a bottle last?", a: "60 days at two capsules daily." },
      ],
    }),
    reviews: reviews("mag", [
      ["Hannah P.", 5, "Best magnesium I've used", "No stomach issues at all and my evenings feel calmer."],
      ["Marcus T.", 5, "Great staff advice", "The team helped me choose this over citrate."],
      ["Lorraine F.", 5, "Repeat customer", "On my fifth bottle."],
    ]),
    isBestSeller: true,
    seoTitle: "Magnesium Glycinate 400 mg | Ray's Healthy Living",
    metaDescription: "Gentle, highly absorbable magnesium glycinate capsules with no stearates or fillers. 120 capsules from Ray's Healthy Living.",
  },
  {
    id: "p-electrolyte",
    sku: "RHL-ELEC-30",
    slug: "electrolyte-mineral-complex",
    name: "Electrolyte & Mineral Complex",
    brand: "Ray's Healthy Living",
    category: "rays-vitality",
    price: 32.0,
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
    shortDescription: "Unsweetened electrolyte powder with sodium, potassium, magnesium and trace minerals.",
    supportStatement: "Hydration and mineral support where appropriate.",
    longDescription: [
      "A simple daily hydration powder without added sugar or artificial sweeteners — just the minerals your water is missing.",
      "Mixes clear into cold water with a light mineral taste.",
    ],
    media: media("Electrolyte Complex"),
    benefits: [
      { icon: "Droplets", title: "Everyday hydration", text: "Supports normal fluid and electrolyte balance." },
      { icon: "Leaf", title: "No added sugar", text: "Unsweetened and free from artificial flavors." },
      { icon: "Sparkles", title: "Trace minerals", text: "Includes naturally sourced trace minerals." },
    ],
    concernSlugs: ["alcoholism"],
    relatedSlugs: ["magnesium-glycinate-400mg", "irish-sea-moss-gel", "vitamin-b1-thiamine-100mg"],
    additionalInfo: info({
      used: "A daily hydration powder for adults, especially useful on active days or in hot weather.",
      benefits: ["Sodium, potassium and magnesium per serving", "Unsweetened", "30 servings per tub", "Mixes clear"],
      how: "Electrolytes are minerals that carry an electrical charge and help the body maintain normal fluid balance.",
      use: "Mix one scoop into 16–20 oz of cold water once daily.",
      avoid: [
        "Anyone on a sodium- or potassium-restricted diet without medical advice",
        "People with kidney conditions unless directed by a doctor",
      ],
      combine: "Pairs naturally with magnesium and daily vitamins.",
      faqs: [
        { q: "Does it taste salty?", a: "Lightly mineral, not sweet. Some customers add lemon." },
        { q: "Can I use it more than once a day?", a: "Follow the label unless advised otherwise by a professional." },
        { q: "Is it caffeine free?", a: "Yes." },
      ],
    }),
    reviews: reviews("elec", [
      ["Sam K.", 5, "No sugar, finally", "Everything else on the market is sweetened."],
      ["Dana V.", 4, "Good mixability", "Dissolves quickly in cold water."],
    ]),
    isNewArrival: true,
    seoTitle: "Electrolyte & Mineral Complex, Unsweetened | Ray's Healthy Living",
    metaDescription: "Unsweetened daily electrolyte powder with sodium, potassium, magnesium and trace minerals. 30 servings.",
  },
  {
    id: "p-seamoss",
    sku: "RHL-SM-16",
    slug: "irish-sea-moss-gel",
    name: "Wildcrafted Irish Sea Moss Gel",
    brand: "Atlantic Sea Co.",
    category: "irish-moss",
    price: 29.99,
    rating: 4.8,
    reviewCount: 412,
    inStock: true,
    shortDescription: "Raw wildcrafted sea moss gel, 16 oz, nothing added.",
    supportStatement: "A whole-food source of naturally occurring minerals.",
    longDescription: [
      "Our best-known product. Wildcrafted sea moss, soaked and blended into a smooth gel with nothing else added.",
      "Keep refrigerated and use within four weeks of opening.",
    ],
    media: media("Irish Sea Moss Gel", { video: true }),
    benefits: [
      { icon: "Waves", title: "Wildcrafted", text: "Harvested from clean Atlantic waters." },
      { icon: "Leaf", title: "Single ingredient", text: "Sea moss and spring water. That's all." },
      { icon: "Sparkles", title: "Naturally mineral rich", text: "A whole-food source of trace minerals." },
      { icon: "Snowflake", title: "Fresh batches", text: "Made in small batches and kept cold." },
    ],
    concernSlugs: [],
    relatedSlugs: ["electrolyte-mineral-complex", "magnesium-glycinate-400mg", "elderberry-syrup"],
    additionalInfo: info({
      used: "A whole-food daily supplement that can be eaten by the spoonful or blended into smoothies, teas and soups.",
      benefits: ["Single ingredient", "Naturally occurring trace minerals", "16 oz jar", "No preservatives"],
      how: "Sea moss is a sea vegetable naturally containing a range of minerals. It is eaten as a food rather than acting as a medicine.",
      use: "Take 1–2 tablespoons daily. Refrigerate after opening.",
      avoid: ["Anyone with a seafood or iodine sensitivity", "People advised to limit iodine intake"],
      combine: "Blends well with elderberry syrup or a daily smoothie.",
      faqs: [
        { q: "How long does it keep?", a: "Up to four weeks refrigerated, or freeze in portions." },
        { q: "Does it taste of the sea?", a: "Very mildly. Most people blend it into food." },
        { q: "Is it wildcrafted or pool grown?", a: "Wildcrafted." },
      ],
    }),
    reviews: reviews("sm", [
      ["Jasmine A.", 5, "The real thing", "You can tell the difference from pool-grown moss."],
      ["Ola B.", 5, "Family favourite", "We add it to smoothies every morning."],
      ["Chris N.", 4, "Great, ships cold", "Arrived properly packed."],
    ]),
    isBestSeller: true,
    seoTitle: "Wildcrafted Irish Sea Moss Gel, 16 oz | Ray's Healthy Living",
    metaDescription: "Raw wildcrafted Irish sea moss gel with a single ingredient and no preservatives. Made in small batches.",
  },
  {
    id: "p-ashwagandha",
    sku: "RHL-ASH-60",
    slug: "ashwagandha-root-capsules",
    name: "Ashwagandha Root Capsules",
    brand: "Green Harvest Botanicals",
    category: "loose-herbs",
    price: 22.5,
    rating: 4.6,
    reviewCount: 173,
    inStock: true,
    shortDescription: "Organic ashwagandha root, 600 mg per capsule.",
    supportStatement: "A traditional adaptogen used in everyday stress routines.",
    longDescription: [
      "Certified organic ashwagandha root, milled and encapsulated without extracts or carriers.",
      "A staple of traditional herbal practice and one of our most asked-for herbs.",
    ],
    media: media("Ashwagandha Root"),
    benefits: [
      { icon: "Sprout", title: "Certified organic", text: "From certified organic growers." },
      { icon: "Leaf", title: "Whole root", text: "Milled root, not a synthetic isolate." },
      { icon: "ShieldCheck", title: "Purity tested", text: "Screened for heavy metals." },
    ],
    concernSlugs: [],
    relatedSlugs: ["magnesium-glycinate-400mg", "lavender-essential-oil", "kudzu-root-extract"],
    additionalInfo: info({
      used: "A traditional herbal supplement for adults building a daily stress and rest routine.",
      benefits: ["600 mg organic root per capsule", "No extract carriers", "Vegetarian capsule"],
      how: "Ashwagandha is classed traditionally as an adaptogen — a plant used to support the body's response to everyday stress.",
      use: "Take one capsule daily with food.",
      avoid: ["People who are pregnant", "Anyone with a thyroid condition, without medical advice", "Children"],
      combine: "Frequently paired with magnesium in an evening routine.",
      faqs: [
        { q: "Root or leaf?", a: "Root only." },
        { q: "Is it organic?", a: "Yes, certified organic." },
        { q: "When will I notice anything?", a: "Herbs work gradually; give any routine several weeks." },
      ],
    }),
    reviews: reviews("ash", [
      ["Tara J.", 5, "Good clean herb", "No additives on the label, which is why I buy here."],
      ["Neil G.", 4, "Works for me", "Part of my evening routine now."],
    ]),
    seoTitle: "Organic Ashwagandha Root Capsules 600 mg | Ray's Healthy Living",
    metaDescription: "Certified organic whole-root ashwagandha capsules with no extract carriers or fillers.",
  },
  {
    id: "p-lavender",
    sku: "RHL-LAV-15",
    slug: "lavender-essential-oil",
    name: "Lavender Essential Oil 15 ml",
    brand: "Nature's Field",
    category: "essential-oil",
    price: 16.0,
    rating: 4.7,
    reviewCount: 96,
    inStock: true,
    shortDescription: "Pure steam-distilled lavender oil in amber glass.",
    supportStatement: "A calm-routine classic for diffusing at the end of the day.",
    longDescription: [
      "Steam-distilled from Lavandula angustifolia and bottled undiluted in UV-protective amber glass.",
      "For aromatic and topical use when properly diluted in a carrier oil.",
    ],
    media: media("Lavender Essential Oil"),
    benefits: [
      { icon: "Flower2", title: "Single species", text: "True lavender, not a lavandin blend." },
      { icon: "Droplets", title: "Undiluted", text: "100% pure oil, no carrier added." },
      { icon: "Moon", title: "Evening ritual", text: "A favourite for diffusing before bed." },
    ],
    concernSlugs: [],
    relatedSlugs: ["ashwagandha-root-capsules", "peppermint-essential-oil", "magnesium-glycinate-400mg"],
    additionalInfo: info({
      used: "Aromatic use in a diffuser, or topical use once properly diluted in a carrier oil.",
      benefits: ["100% pure steam-distilled oil", "Amber glass bottle", "Euro dropper insert"],
      how: "Essential oils are the aromatic volatile compounds of the plant, captured through steam distillation.",
      use: "Add 3–5 drops to a diffuser, or dilute to 1–2% in a carrier oil for topical use.",
      avoid: ["Do not take internally", "Keep away from children and pets", "Avoid undiluted skin contact"],
      combine: "Blends well with our peppermint and eucalyptus oils.",
      faqs: [
        { q: "Is it food grade?", a: "No — this is for aromatic and diluted topical use only." },
        { q: "Where is it from?", a: "Distilled from French-grown lavender." },
        { q: "How long does it keep?", a: "Around three years stored cool and sealed." },
      ],
    }),
    reviews: reviews("lav", [
      ["Beth C.", 5, "Beautiful scent", "Much softer than the supermarket kind."],
      ["Omar F.", 4, "Good bottle", "The dropper controls the drops well."],
    ]),
    isNewArrival: true,
    seoTitle: "Pure Lavender Essential Oil 15 ml | Ray's Healthy Living",
    metaDescription: "100% pure steam-distilled lavender essential oil in amber glass. For aromatic and diluted topical use.",
  },
  {
    id: "p-peppermint",
    sku: "RHL-PEP-15",
    slug: "peppermint-essential-oil",
    name: "Peppermint Essential Oil 15 ml",
    brand: "Nature's Field",
    category: "essential-oil",
    price: 14.5,
    rating: 4.6,
    reviewCount: 71,
    inStock: true,
    shortDescription: "Bright, cooling peppermint oil, steam distilled and undiluted.",
    supportStatement: "A bright, cooling oil for a refreshing routine.",
    longDescription: [
      "Steam-distilled peppermint with a high natural menthol content and a clean, sharp aroma.",
      "Bottled in amber glass with a euro dropper.",
    ],
    media: media("Peppermint Essential Oil"),
    benefits: [
      { icon: "Wind", title: "Fresh aroma", text: "Clean, cooling scent for daytime use." },
      { icon: "Droplets", title: "Undiluted", text: "100% pure oil." },
      { icon: "Leaf", title: "Steam distilled", text: "No solvents used in extraction." },
    ],
    concernSlugs: [],
    relatedSlugs: ["lavender-essential-oil", "herbal-coffee-blend", "ashwagandha-root-capsules"],
    additionalInfo: info({
      used: "Aromatic use in a diffuser or diluted topical use in a carrier oil.",
      benefits: ["High natural menthol content", "Amber glass bottle", "Steam distilled"],
      how: "The aromatic compounds of the peppermint leaf are captured by steam distillation.",
      use: "Add 3–5 drops to a diffuser, or dilute to 1% for topical use.",
      avoid: ["Do not take internally", "Avoid use around infants and pets", "Avoid contact with eyes"],
      combine: "Pairs well with eucalyptus and lemon oils.",
      faqs: [
        { q: "Can I put it in water?", a: "No — essential oils are not for internal use." },
        { q: "Is it strong?", a: "Yes, start with fewer drops than you expect to need." },
        { q: "Bottle size?", a: "15 ml." },
      ],
    }),
    reviews: reviews("pep", [
      ["Grace H.", 5, "Very potent", "A little goes a long way."],
      ["Ben A.", 4, "Nice and clean", "No synthetic edge to the scent."],
    ]),
    seoTitle: "Pure Peppermint Essential Oil 15 ml | Ray's Healthy Living",
    metaDescription: "Steam-distilled undiluted peppermint essential oil with a high natural menthol content.",
  },
  {
    id: "p-cardio",
    sku: "RHL-CAR-90",
    slug: "maximum-cardio-circulation-formula",
    name: "Maximum Cardio Circulation Formula",
    brand: "Nature's Field",
    category: "maximum-cardio",
    price: 44.0,
    rating: 4.5,
    reviewCount: 62,
    inStock: true,
    shortDescription: "A herbal and nutrient blend built around hawthorn, CoQ10 and L-arginine.",
    supportStatement: "Daily nutritional support for people focused on heart-healthy habits.",
    longDescription: [
      "A comprehensive daily formula combining hawthorn berry, CoQ10, L-arginine and supporting nutrients.",
      "Designed as one part of a heart-healthy lifestyle that also includes diet, movement and regular check-ups.",
    ],
    media: media("Maximum Cardio", { video: true }),
    benefits: [
      { icon: "HeartPulse", title: "Circulation focused", text: "Nutrients traditionally used in circulation routines." },
      { icon: "Sprout", title: "Herbal and nutrient blend", text: "Hawthorn berry with CoQ10 and L-arginine." },
      { icon: "ShieldCheck", title: "GMP produced", text: "Made in an NSF GMP certified facility." },
    ],
    concernSlugs: [],
    relatedSlugs: ["magnesium-glycinate-400mg", "irish-sea-moss-gel", "milk-thistle-liver-support"],
    additionalInfo: info({
      used: "A daily supplement for adults focused on heart-healthy habits alongside diet and exercise.",
      benefits: ["Hawthorn berry extract", "CoQ10 and L-arginine", "90 capsules per bottle"],
      how: "The formula supplies nutrients and botanicals traditionally included in circulation-focused routines.",
      use: "Take three capsules daily with food, or as directed.",
      avoid: [
        "Anyone taking blood pressure or blood-thinning medication, without medical advice",
        "People who are pregnant or nursing",
        "Anyone preparing for surgery",
      ],
      combine: "Speak with your doctor before combining with cardiovascular medication.",
      faqs: [
        { q: "Does this replace my medication?", a: "No. Never stop prescribed medication without your doctor's guidance." },
        { q: "How long is a bottle?", a: "30 days at three capsules daily." },
        { q: "Any stimulants?", a: "No caffeine or stimulants." },
      ],
    }),
    reviews: reviews("car", [
      ["Walter S.", 5, "My daily", "I take this alongside what my doctor prescribes."],
      ["Nadia E.", 4, "Big capsules", "Effective but they are large."],
    ]),
    seoTitle: "Maximum Cardio Circulation Formula | Ray's Healthy Living",
    metaDescription: "A daily hawthorn, CoQ10 and L-arginine formula for adults focused on heart-healthy habits.",
  },
  {
    id: "p-elderberry",
    sku: "RHL-ELD-8",
    slug: "elderberry-syrup",
    name: "Black Elderberry Syrup",
    brand: "Ray's Healthy Living",
    category: "rays-vitality",
    price: 19.75,
    rating: 4.9,
    reviewCount: 288,
    inStock: true,
    shortDescription: "Elderberry syrup with raw honey and ginger, 8 oz.",
    supportStatement: "A family favourite for the cooler months.",
    longDescription: [
      "Slow-simmered black elderberries with raw honey, ginger and cinnamon. No refined sugar or preservatives.",
      "Loved by families across Calvert County for generations.",
    ],
    media: media("Elderberry Syrup"),
    benefits: [
      { icon: "Sparkles", title: "Raw honey base", text: "Sweetened only with raw honey." },
      { icon: "Leaf", title: "No preservatives", text: "Simple ingredients you can read." },
      { icon: "Users", title: "Family friendly", text: "Suitable for ages 2 and up." },
    ],
    concernSlugs: [],
    relatedSlugs: ["irish-sea-moss-gel", "vitamin-b1-thiamine-100mg", "herbal-coffee-blend"],
    additionalInfo: info({
      used: "A daily wellness syrup for families, most popular through autumn and winter.",
      benefits: ["Raw honey base", "Ginger and cinnamon", "8 oz glass bottle", "No refined sugar"],
      how: "Elderberry is a traditional wellness food used for generations in home preparations.",
      use: "Adults 1 tablespoon daily, children over 2 years 1 teaspoon daily.",
      avoid: ["Infants under 12 months, because of the raw honey", "Anyone with a honey allergy"],
      combine: "Pairs well with sea moss gel or a daily vitamin.",
      faqs: [
        { q: "Refrigerate?", a: "Yes, after opening." },
        { q: "How long does a bottle last?", a: "About 16 adult servings." },
        { q: "Is it very sweet?", a: "Lightly sweet with a warm ginger finish." },
      ],
    }),
    reviews: reviews("eld", [
      ["Michelle O.", 5, "Every winter", "We buy three bottles at a time."],
      ["Frank D.", 5, "Kids take it happily", "Tastes good enough that there's no argument."],
      ["Amy R.", 5, "Real ingredients", "No corn syrup, which is why I switched."],
    ]),
    isBestSeller: true,
    seoTitle: "Black Elderberry Syrup with Raw Honey, 8 oz | Ray's Healthy Living",
    metaDescription: "Slow-simmered black elderberry syrup with raw honey, ginger and cinnamon. No refined sugar or preservatives.",
  },
  {
    id: "p-coffee",
    sku: "RHL-COF-12",
    slug: "herbal-coffee-blend",
    name: "Herbal Coffee Blend, Caffeine Free",
    brand: "Ray's Healthy Living",
    category: "coffee",
    price: 17.5,
    rating: 4.4,
    reviewCount: 47,
    inStock: true,
    shortDescription: "Roasted chicory, dandelion root and barley — brews like coffee, no caffeine.",
    supportStatement: "A warm morning ritual without the caffeine.",
    longDescription: [
      "Roasted chicory root, dandelion root and barley ground for drip, French press or stovetop.",
      "Rich and full-bodied with a naturally sweet finish.",
    ],
    media: media("Herbal Coffee Blend"),
    benefits: [
      { icon: "Coffee", title: "Caffeine free", text: "All the ritual, none of the caffeine." },
      { icon: "Sprout", title: "Root roasted", text: "Chicory and dandelion root." },
      { icon: "Leaf", title: "Nothing added", text: "No flavourings or sweeteners." },
    ],
    concernSlugs: [],
    relatedSlugs: ["elderberry-syrup", "ashwagandha-root-capsules", "irish-sea-moss-gel"],
    additionalInfo: info({
      used: "A caffeine-free hot drink for anyone cutting back on coffee but keeping the routine.",
      benefits: ["Caffeine free", "12 oz ground", "Brews in any coffee maker"],
      how: "Roasted roots and grains produce coffee-like depth and body without caffeine.",
      use: "Use one tablespoon per cup and brew as you would ground coffee.",
      avoid: ["Anyone with a gluten sensitivity, as the blend contains barley"],
      combine: "Good with oat milk or a spoon of elderberry syrup.",
      faqs: [
        { q: "Does it taste like coffee?", a: "Close, with a naturally sweeter, earthier finish." },
        { q: "Is it gluten-free?", a: "No — it contains barley." },
        { q: "Grind size?", a: "Medium, suitable for drip and press." },
      ],
    }),
    reviews: reviews("cof", [
      ["Sean M.", 4, "Good swap", "Helped me cut back to one real coffee a day."],
      ["Lucia T.", 5, "Lovely earthy taste", "Nice in the evening."],
    ]),
    isNewArrival: true,
    seoTitle: "Caffeine-Free Herbal Coffee Blend | Ray's Healthy Living",
    metaDescription: "Roasted chicory, dandelion root and barley blend that brews like coffee with no caffeine.",
  },
];

/**
 * The curated, fully-written records come first; the imported wholesale
 * catalog fills out the rest of the shelf. Slugs are unique across both.
 */
export const products: Product[] = [
  ...curatedProducts,
  ...catalogProducts.filter((p) => !curatedProducts.some((c) => c.slug === p.slug)),
];

// Apply any admin edits saved in the browser to the in-memory catalog.
applyStoredOverrides(products);

/** Products the admin has not hidden — use this for storefront listings. */
export const listedProducts = () => {
  const hidden = hiddenSlugs();
  return products.filter((p) => !hidden.has(p.slug));
};

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getProducts = (slugs: string[]) =>
  slugs.map((s) => getProduct(s)).filter((p): p is Product => Boolean(p));

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

/** Stable URL slug for a brand name, e.g. "Nature's Field" → "natures-field". */
export const brandSlug = (brand: string) =>
  brand
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const getBrandBySlug = (slug: string) => brands.find((b) => brandSlug(b) === slug);

/** Free-text search across every field a shopper might type. */
export const searchProducts = (query: string) => {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter((p) =>
    [
      p.name,
      p.brand,
      p.sku,
      p.upc ?? "",
      p.category,
      p.shortDescription,
      p.supportStatement,
      ...(p.variants ?? []).map((v) => `${v.label} ${v.sku}`),
    ]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
};
