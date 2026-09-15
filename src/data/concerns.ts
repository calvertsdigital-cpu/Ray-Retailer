import heroAlcoholism from "@/assets/hc-alcoholism-hero.jpg";

import type { HealthConcern } from "./types";

/**
 * Health Concern records. The master template renders entirely from these
 * fields — nothing condition-specific lives in the page component. Adding a
 * new concern means adding a record here (later, a CMS row), not a new page.
 */
export const healthConcerns: HealthConcern[] = [
  {
    id: "hc-alcoholism",
    slug: "alcoholism",
    name: "Alcoholism",
    category: "Behavioral Health & Recovery",
    heroHeadline: "Alcoholism Support & Recovery",
    heroSubtext:
      "Natural support for craving control, liver health, nutrient restoration, and long-term recovery.",
    heroImage: heroAlcoholism,
    bundleTitle: "Your recovery bundle",
    bundleSubtext: "Everything you need to support your recovery journey.",
    icon: "HeartHandshake",
    fastFacts: [
      { title: "B1", text: "Alcohol depletes key nutrients, especially Vitamin B1 (Thiamine)." },
      { title: "Cravings", text: "Cravings are often linked to nervous system imbalance." },
      { title: "Liver stress", text: "Liver stress increases fatigue and slows recovery." },
      { title: "Blood sugar", text: "Blood sugar instability can trigger alcohol urges and cravings." },
    ],
    bestFor: [
      "Frequent alcohol cravings",
      "Difficulty cutting back or stopping",
      "Low energy after drinking",
      "Poor sleep from alcohol use",
      "Feeling anxious without alcohol",
    ],
    notFor: [
      "Severe withdrawal requiring medical supervision",
      "Emergency detox situations",
      "Advanced liver disease without physician guidance",
    ],
    commonSymptoms: [
      "\u201CI feel like I need a drink to relax.\u201D",
      "\u201CI can\u2019t stop once I start.\u201D",
      "\u201CI feel tired and foggy the next day.\u201D",
      "\u201CMy sleep is worse when I drink.\u201D",
      "\u201CI feel anxious when I don\u2019t drink.\u201D",
    ],
    possibleCauses: [
      { title: "Nervous system imbalance", text: "Ongoing stress can leave the nervous system unsettled." },
      { title: "Vitamin deficiencies", text: "Especially B vitamins, which alcohol depletes over time." },
      { title: "Liver overload", text: "Liver overload and poor detoxification." },
      { title: "Blood sugar swings", text: "Blood sugar spikes and crashes." },
      { title: "Habitual patterns", text: "Habitual behavioral patterns built up over time." },
      { title: "Emotional stress", text: "Emotional stress and coping mechanisms." },
    ],
    recommended: [
      {
        slug: "vitamin-b1-thiamine-100mg",
        note: "Helps reduce cravings and supports nervous system recovery.",
        defaultQty: 1,
        inBundle: true,
      },
      {
        slug: "kudzu-root-extract",
        note: "Traditionally used to support reduction in alcohol consumption.",
        defaultQty: 1,
        inBundle: true,
      },
      {
        slug: "milk-thistle-liver-support",
        note: "Supports liver repair and natural detoxification.",
        defaultQty: 1,
        inBundle: true,
      },
      {
        slug: "magnesium-glycinate-400mg",
        note: "Helps calm the nervous system and reduce tension.",
        defaultQty: 1,
        inBundle: true,
      },
      {
        slug: "electrolyte-mineral-complex",
        note: "Supports hydration and mineral balance during recovery.",
        defaultQty: 1,
        inBundle: true,
      },
    ],
    dailyRoutine: [
      { title: "Warm water first", text: "Start the day with warm water before anything else." },
      { title: "Consistent meals", text: "Eat consistent cooked meals and avoid skipping meals." },
      { title: "Hydrate", text: "Hydrate throughout the day to reduce cravings." },
      { title: "Replace the habit", text: "Replace drinking habit with structured routine (tea, walking, journaling)." },
      { title: "Prioritize sleep", text: "Prioritize sleep to stabilize recovery and support healing." },
    ],
    cta: {
      title: "20-Day Alcohol Reset Challenge",
      text: "Ready to take control of your routine? Our structured 20-day system can help reduce dependency, rebuild habits, and restore balance\u2014one day at a time.",
      buttonLabel: "Inquire / Join Waitlist",
    },
    disclaimer:
      "This content is for educational and wellness awareness purposes only and is not medical advice. Statements have not been evaluated by the U.S. Food and Drug Administration and are not intended to diagnose, treat, cure or prevent any disease.",
    safetyWarning:
      "Alcohol withdrawal can be dangerous. Anyone experiencing severe withdrawal symptoms, seizures, confusion, hallucinations, severe shaking, or other urgent symptoms should seek immediate medical care.",
    seoTitle: "Alcoholism Support & Recovery — Health Concern | Ray's Healthy Living",
    metaDescription:
      "Educational support for alcohol-related concerns: nutrient depletion, liver health, daily routines, recommended products and when to seek medical care.",
    published: true,
  },
];

/** Concerns planned for the same master template once the test page is approved. */
export const upcomingConcerns = [
  { name: "Sleep & Rest", category: "Everyday Wellness", icon: "Moon" },
  { name: "Energy & Fatigue", category: "Everyday Wellness", icon: "Zap" },
  { name: "Stress & Mood", category: "Behavioral Health", icon: "Brain" },
  { name: "Digestive Comfort", category: "Digestive Health", icon: "Leaf" },
  { name: "Heart & Circulation", category: "Cardiovascular", icon: "HeartPulse" },
  { name: "Joint Comfort", category: "Mobility", icon: "Bone" },
  { name: "Immune Support", category: "Everyday Wellness", icon: "ShieldCheck" },
];

export const getConcern = (slug: string) => healthConcerns.find((c) => c.slug === slug);
