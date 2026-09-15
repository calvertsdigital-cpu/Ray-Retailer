/** CMS-shaped blog records. Listing and detail pages both render from here. */
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
}

export const blogPosts: BlogPost[] = [
  {
    slug: "understanding-your-wellness-where-to-start",
    title: "Understanding your wellness: where to start",
    excerpt: "Before adding supplements, look at sleep, hydration and food timing. Here's a simple weekly reset.",
    category: "Foundations",
    author: "Ray's Healthy Living",
    date: "2026-08-18",
    readTime: "5 min read",
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
    excerpt: "What sea moss actually is, how people use it, and what to look for on a label.",
    category: "Ingredients",
    author: "Ray's Healthy Living",
    date: "2026-07-29",
    readTime: "6 min read",
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
    excerpt: "Small anchors beat big overhauls. A practical guide to routines you'll still keep in a month.",
    category: "Routines",
    author: "Ray's Healthy Living",
    date: "2026-07-11",
    readTime: "4 min read",
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
    excerpt: "How to get the most from dried herbs at home, from water temperature to storage jars.",
    category: "How-to",
    author: "Ray's Healthy Living",
    date: "2026-06-24",
    readTime: "7 min read",
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

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug && p.published);
