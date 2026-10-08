import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import {
  Activity,
  Zap,
  TrendingUp,
  Shield,
  Heart,
  BarChart2,
  Leaf,
  Brain,
  Wind,
  Droplets,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Check,
} from "lucide-react";

export const Route = createFileRoute("/irish-moss")({
  component: IrishMossPage,
  head: () => ({
    meta: [
      {
        title:
          "Irish Moss (Chondrus Crispus) — Benefits & Guide | Ray's Healthy Living®",
      },
      {
        name: "description",
        content:
          "Discover the top 11 health benefits of Irish Sea Moss, minerals, supplements and how to use Chondrus Crispus. Shop authentic Irish Moss at Ray's Healthy Living®.",
      },
      { property: "og:type", content: "article" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Article",
              headline:
                "Irish Moss (Chondrus Crispus) — Benefits & Guide",
              author: {
                "@type": "Organization",
                name: "Ray's Healthy Living",
              },
              publisher: {
                "@type": "Organization",
                name: "Ray's Healthy Living",
                url: "https://rayshealthyliving.com",
              },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://rayshealthyliving.com/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Irish Moss",
                  item: "https://rayshealthyliving.com/irish-moss",
                },
              ],
            },
          ],
        }),
      },
    ],
  }),
});

// ─── Types ──────────────────────────────────────────────────────────────────

interface Benefit {
  id: number;
  title: string;
  body: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  readMore?: boolean;
}

// ─── Data ───────────────────────────────────────────────────────────────────

const MINERALS: string[] = [
  "iodine",
  "calcium",
  "magnesium",
  "iron",
  "phosphorous",
  "potassium",
  "manganese",
  "zinc",
  "selenium",
  "beta-carotene",
  "vitamin B",
  "vitamin C",
];

const BENEFITS: Benefit[] = [
  {
    id: 1,
    title: "Improves Thyroid Function",
    icon: Activity,
    readMore: true,
    body: "Studies have shown that Irish Moss is a potent Thyroid Function Stimulator. It enhances TSH or Thyroid Stimulating Hormones that is released from the Pituitary. TSH is extremely important as it acts on the Thyroid Gland directly and affects the synthesis and release of other thyroid hormones. Sea Moss can thus play an effective role in managing a range of thyroid related conditions. This weed is also rich in selenium and iodine, both of which play critical roles in synthesis of Thyroid Hormones. These elements are precursors that stimulate and release TSH.",
  },
  {
    id: 2,
    title: "Manages Joint Pain",
    icon: Zap,
    body: "Sea Moss is a rich repertoire of anti-inflammatory agents and has antibacterial properties too. As such they are very effective in treating joint pains. The Moss contains natural potassium bromide and potassium iodide that calm the nerves in the joints and provide relief from pain.",
  },
  {
    id: 3,
    title: "Ups Metabolism",
    icon: TrendingUp,
    readMore: true,
    body: "Thyroid-regulating hormones are the key metabolism regulators of the body. Irish Sea Moss is known to stimulate thyroid function and as a result boost body metabolism. The iodine content of the weed triggers thyroid hormone production and boosts thyroid gland functioning which in turn have a direct bearing on body metabolism. Moreover, the purplish red algae have a high iron content which is important for oxygen transportation in the body. The iron helps meet the body's need of iron and effectively transports oxygen to the tissues and muscles through the body and naturally ups metabolism.",
  },
  {
    id: 4,
    title: "Boost Immune System",
    icon: Shield,
    readMore: true,
    body: "Irish Moss is rich in Bioactive compounds having antimicrobial and antiviral effects. Sulfated Polysaccharides are among the most important of such compounds present in Irish Moss that positively trigger the immune system. The weed influences gene-related immune response, immunity that is cell mediated and humoral immunity. Being rich in iron increases hemoglobin count in cells across the body and eases oxygen supply to cells and tissues.",
  },
  {
    id: 5,
    title: "Improves Heart Health",
    icon: Heart,
    body: "Heart-related issues mostly arise from poor blood flow in the cardiovascular system. The high iron content of Irish Moss improves body iron content and smoothens oxygen supply reducing chances of Angina. Antioxidants present in it reduces oxidative destruction of cells and tissues by free body radicals.",
  },
  {
    id: 6,
    title: "Helps in Weight Management",
    icon: BarChart2,
    body: "Eating Sea Moss gives the body required nutrients and at the same time it helps reduce appetite. The result is reduced food intake without suffering any ill effects of low food intake. Sea Moss provides a nutrient-rich supplement that supports satiety and healthy weight management when paired with a balanced diet.",
  },
  {
    id: 7,
    title: "Healthy Diet",
    icon: Leaf,
    body: "The human body needs many essential minerals and Irish Sea Weed contains a large portion of them. It is an excellent source of vitamins, minerals, proteins and fibres, making it a great food supplement. This nutrient-rich moss supports overall physical and mental health when included as part of a healthy diet.",
  },
  {
    id: 8,
    title: "Improves Overall Mental Health",
    icon: Brain,
    readMore: true,
    body: "Given the dense quantity of potassium present in Irish Moss, it plays a significant role in providing the body with overall mental health support. Regular intake has been associated with improved mood and reduced symptoms of stress and anxiety in some studies. Sea Moss's nutrient profile supports brain function and may help maintain cognitive wellbeing when included as part of a balanced diet.",
  },
  {
    id: 9,
    title: "Natural Decongestant",
    icon: Wind,
    body: "A high percentage of potassium chloride in Irish Sea Moss makes it effective in treating conditions like cough and congestion. Potassium chloride helps break down mucus on membranes and can relieve irritation, supporting easier breathing during colds and sinus issues.",
  },
  {
    id: 10,
    title: "Strengthens Digestive System",
    icon: Droplets,
    body: "Fiber-rich foods are ideal for the gut system and Irish Sea Moss is an excellent candidate. The seaweed works as a mild laxative and helps manage inflammatory disorders of the gut like gastritis, heartburn, nausea and indigestion. It helps both stimulate and soothe the digestive system, supporting overall gut health when used as part of a balanced diet.",
  },
  {
    id: 11,
    title: "Improves Sexual Health",
    icon: Sparkles,
    body: "Minerals such as zinc are crucial for maintaining a healthy sexual life and a good reproductive system. Sea Moss red algae, with its high zinc content and a host of other minerals, can help reduce dryness in females and support a healthier libido.",
  },
];

// ─── Sub-components (inline) ─────────────────────────────────────────────────

function BenefitCard({ benefit }: { benefit: Benefit }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = benefit.icon;

  const PREVIEW_CHARS = 160;
  const needsTruncation = benefit.readMore && benefit.body.length > PREVIEW_CHARS;
  const displayBody =
    needsTruncation && !expanded
      ? benefit.body.slice(0, PREVIEW_CHARS).trimEnd() + "…"
      : benefit.body;

  return (
    <div
      className="bg-white rounded-2xl border shadow-sm p-6 flex flex-col gap-3"
      style={{ borderColor: "#e8e8e8" }}
    >
      {/* Number badge + icon row */}
      <div className="flex items-center gap-3">
        <span
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
          style={{ background: "var(--im-green)" }}
        >
          {benefit.id}
        </span>
        <Icon size={22} color="var(--im-leaf)" aria-hidden="true" />
      </div>
      <h3 className="font-bold text-base" style={{ color: "var(--im-green)" }}>
        {benefit.title}
      </h3>
      <p
        className="text-base leading-relaxed flex-1"
        style={{ color: "var(--im-charcoal)" }}
      >
        {displayBody}
      </p>
      {needsTruncation && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-sm font-semibold mt-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{ color: "var(--im-orange)" }}
          aria-expanded={expanded}
        >
          {expanded ? (
            <>
              Show Less <ChevronUp size={14} aria-hidden="true" />
            </>
          ) : (
            <>
              Read More <ChevronDown size={14} aria-hidden="true" />
            </>
          )}
        </button>
      )}
    </div>
  );
}

function MineralChip({ label }: { label: string }) {
  return (
    <span
      style={{
        background: "var(--im-leaf)",
        color: "white",
        padding: "4px 12px",
        fontSize: "0.875rem",
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        borderRadius: "9999px",
      }}
    >
      <Leaf size={12} aria-hidden="true" />
      {label}
    </span>
  );
}

// ─── Supplement Tab/Accordion content ────────────────────────────────────────

const SUPPLEMENT_TABS = [
  {
    id: "healthy",
    label: "Healthy Natural Supplement",
    body: "Irish Sea Moss has long been used as a supplement that abates and fights symptoms of flu and cold. Being rich in a host of essential minerals like zinc, potassium, magnesium, manganese and iron, apart from Vitamins B and C, it boosts body immunity. The seaweed is invaluable with its natural chemical composition that contains potassium chloride. This compound is a vital element that augments dissolving catarrhs responsible for chest congestions. Sea Moss is thus a natural cold relief provider and a safe solution that people across the globe prefer to use over conventional over-the-counter cold and cough remedies. The weed is also known to be effective in other lung conditions like pneumonia and tuberculosis acting as an anti-inflammatory and demulcent agent.",
  },
  {
    id: "infections",
    label: "Fights Infections",
    body: "Apart from boosting the body's natural immune system and acting as a remedy to cold, cough and flu, Irish Moss is also a strong antiviral and antimicrobial agent. It is extremely effective in fighting a wide range of infections that are known to plague the body. Sea Moss is known to alleviate conditions like bronchitis and pneumonia apart from sore throat arising out of bacterial and viral infections. One of the main uses of Irish Moss is as a potent treatment to heal thyroid related problems. The Moss contains a significant amount of Iodine which is extremely important for optimal functioning of the thyroid gland. Iodine in the Moss stimulates the thyroid gland to its optimal level thus helping the body fight against a host of diseases. Germs tend to thrive on external surface areas with rich blood supply. As the blood circulates through the body, it passes through the thyroid gland where iodine and its antimicrobial properties cleanse it of the germs, killing weak ones and weakening the others. Iodine present in Sea Moss also helps relieve stress and tension and promotes a general sense of well-being physically and mentally.",
  },
  {
    id: "natural",
    label: "Natural Supplement",
    // TODO: duplicate content — consider removing in a future CMS revision
    body: "Irish Sea Moss has long been used as a supplement that abates and fights symptoms of flu and cold. Being rich in a host of essential minerals like zinc, potassium, magnesium, manganese and iron, apart from Vitamins B and C, it boosts body immunity. The seaweed is invaluable with its natural chemical composition that contains potassium chloride. This compound is a vital element that augments dissolving catarrhs responsible for chest congestions. Sea Moss is thus a natural cold relief provider and a safe solution that people across the globe prefer to use over conventional over-the-counter cold and cough remedies.",
  },
];

// ─── Page component ──────────────────────────────────────────────────────────

function IrishMossPage() {
  const [activeTab, setActiveTab] = useState("healthy");

  return (
    <article style={{ background: "var(--im-bg)" }}>
      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <section
        className="py-20"
        style={{
          background:
            "linear-gradient(135deg, var(--im-green) 0%, oklch(0.72 0.15 60) 100%)",
        }}
      >
        <div className="container-rhl">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-8 text-sm"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            <Link
              to="/"
              className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              Home
            </Link>
            <span className="mx-2" aria-hidden="true">›</span>
            <span style={{ color: "white" }}>Irish Moss</span>
          </nav>

          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left content */}
            <div className="flex-1">
              <h1
                className="font-bold mb-4"
                style={{ color: "white", fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.1 }}
              >
                Irish Moss
              </h1>
              {/* Chondrus Crispus badge */}
              <span
                className="inline-block mb-6 px-4 py-1 rounded-full text-sm font-semibold"
                style={{
                  background: "var(--im-orange)",
                  color: "white",
                }}
              >
                Chondrus Crispus
              </span>
              <p
                className="text-lg leading-relaxed mb-8 max-w-lg"
                style={{ color: "rgba(255,255,255,0.92)" }}
              >
                Irish Moss is known to improve Thyroid functions, aid metabolism
                and boost the overall immune system.
              </p>
              <Link
                to="/shop"
                search={{ categories: ["irish-moss"] }}
                className="inline-block px-8 py-3 rounded-full font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                style={{ background: "var(--im-orange)" }}
              >
                Shop Irish Moss →
              </Link>
            </div>

            {/* Right: blob placeholder */}
            <div className="flex-shrink-0 flex justify-center">
              <div
                aria-hidden="true"
                style={{
                  background:
                    "linear-gradient(135deg, var(--im-leaf), var(--im-green))",
                  borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%",
                  width: "280px",
                  height: "280px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "6rem",
                }}
              >
                🌿
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. WHAT IS IRISH SEA MOSS ─────────────────────────────────── */}
      <section className="py-16">
        <div className="container-rhl">
          <div className="flex flex-col lg:flex-row items-start gap-12">
            {/* Left: blob image placeholder */}
            <div className="flex-shrink-0 flex justify-center lg:justify-start w-full lg:w-auto">
              <div
                aria-hidden="true"
                style={{
                  background:
                    "linear-gradient(135deg, var(--im-leaf), var(--im-green))",
                  borderRadius: "55% 45% 65% 35% / 45% 55% 45% 55%",
                  width: "260px",
                  height: "260px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "5rem",
                  flexShrink: 0,
                }}
              >
                🍃
              </div>
            </div>

            {/* Right: text */}
            <div className="flex-1">
              <h2
                className="text-3xl font-bold mb-4"
                style={{ color: "var(--im-green)" }}
              >
                What is Irish Sea Moss
              </h2>
              <p
                style={{
                  color: "var(--im-orange)",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  marginBottom: "1.5rem",
                  lineHeight: 1.6,
                }}
              >
                Is a dried leaf-like form of a northern seaweed, that is,
                Chondrus Crispus also known as Pearl Moss and Carrageen.
              </p>
              <ul className="space-y-4">
                {[
                  "Grows naturally in abundance in Rocky places along the Atlantic coasts of North America and Europe.",
                  "As a fresh plant it is soft and cartilaginous ranging from a greenish-yellow to purplish-brown color.",
                  "When washed and dried, it takes on a translucent and horn-like form that is yellowish in color.",
                  "Irish Moss is a mucilaginous body by 55% parts, 10% albuminoids and 15% minerals rich in sulphur and iodine. Placed in water, it gives the odor of the sea and forms a heavy jelly when boiled. This jelly is used as a thickener and fining of beer.",
                ].map((fact, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="mt-1 flex-shrink-0"
                      style={{ color: "var(--im-leaf)" }}
                    >
                      <Check size={18} aria-hidden="true" />
                    </span>
                    <span
                      className="text-base leading-relaxed"
                      style={{ color: "var(--im-charcoal)" }}
                    >
                      {fact}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. THREE FEATURE CARDS ────────────────────────────────────── */}
      <section className="py-16" style={{ background: "var(--im-bg)" }}>
        <div className="container-rhl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div
              className="bg-white rounded-2xl border shadow-sm p-6 flex flex-col gap-3"
              style={{ borderColor: "#e8e8e8" }}
            >
              <h2
                className="text-xl font-bold"
                style={{ color: "var(--im-green)" }}
              >
                Can Sea Moss be Eaten Raw?
              </h2>
              <p
                style={{
                  color: "var(--im-orange)",
                  fontWeight: "bold",
                  fontSize: "0.975rem",
                  lineHeight: 1.6,
                }}
              >
                Sea Moss is good to be consumed as health drink. It can also be
                used for gravies, cakes and ice-creams, in shakes and as a
                thickening agent.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: "var(--im-charcoal)" }}
              >
                As a natural and wholesome item, you can also eat it raw. The
                Moss is nature's gift to humankind as an excellent source of
                minerals. At Ray's we sell only naturally grown Sea Moss. The
                plants are spread over large areas for natural sun-drying without
                adding any fertilizers or chemicals. We use only natural sunlight
                to preserve the goodness of nature coming from the sea shore. We
                source all Sea Moss exclusively from the seashore where it is
                carefully cultivated in natural environments making it completely
                safe for you to consume it raw or any other form that you prefer.
              </p>
            </div>

            {/* Card 2 */}
            <div
              className="bg-white rounded-2xl border shadow-sm p-6 flex flex-col gap-3"
              style={{ borderColor: "#e8e8e8" }}
            >
              <h2
                className="text-xl font-bold"
                style={{ color: "var(--im-green)" }}
              >
                Food Additive
              </h2>
              <p
                className="text-base leading-relaxed"
                style={{ color: "var(--im-charcoal)" }}
              >
                Raw Sea Moss can be used in food like pudding, smoothies, cream
                pie or whipped cream and salad dressing. In fact, it helps give
                any liquid a stable form. Whereas gelatin is an animal-based
                protein, our Irish Moss is totally a plant derivative. Its
                polysaccharide is a natural sugar form when blended in liquid
                gives the semi-liquid form. Irish Moss is rich in carrageen which
                is used by the food industry to make items like ice-cream, jelly
                and more.
              </p>
            </div>

            {/* Card 3 */}
            <div
              className="bg-white rounded-2xl border shadow-sm p-6 flex flex-col gap-3"
              style={{ borderColor: "#e8e8e8" }}
            >
              <h2
                className="text-xl font-bold"
                style={{ color: "var(--im-green)" }}
              >
                Health Food
              </h2>
              <p
                className="text-base leading-relaxed"
                style={{ color: "var(--im-charcoal)" }}
              >
                Irish Moss or Sea Moss is a powerhouse of nutrients yielding
                abundant goodness to health. It acts as a soothing aid to the
                stomach providing relief from heartburn, dyspepsia and gastritis.
                It works wonders for conditions like indigestion and constipation
                and helps heal peptic and duodenal ulcer. Natural Irish Moss is
                also a repertoire of antiviral and antibacterial activities and
                helps soothe skin conditions like sun burns, chapped skin,
                dermatitis, eczema and psoriasis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. MINERALS & VITAMINS ─────────────────────────────────────── */}
      <section className="py-16" style={{ background: "var(--im-bg)" }}>
        <div className="container-rhl">
          <h2
            className="text-3xl font-bold mb-10 text-center"
            style={{ color: "var(--im-green)" }}
          >
            Minerals &amp; Vitamins
          </h2>
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Left: text */}
            <div className="flex-1">
              <p
                className="text-base leading-relaxed mb-4"
                style={{ color: "var(--im-charcoal)" }}
              >
                Tasteless when eaten raw, Irish Moss is loaded with natural
                minerals essential for a healthy human body. It is a rare plant
                that has sulphur amino acids, compounds that are restricted to
                animal protein only.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: "var(--im-charcoal)" }}
              >
                It also contains beta-carotene, vitamins B and C.
              </p>
            </div>

            {/* Right: mineral chips */}
            <div className="flex-1 flex flex-wrap gap-2">
              {MINERALS.map((mineral) => (
                <MineralChip key={mineral} label={mineral} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. SUPPLEMENT TABS / ACCORDION ────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container-rhl">
          <h2
            className="text-3xl font-bold mb-10"
            style={{ color: "var(--im-green)" }}
          >
            Natural Supplement Benefits
          </h2>

          {/* Desktop: Tab buttons */}
          <div className="hidden md:block">
            <div className="flex gap-2 mb-6 border-b" style={{ borderColor: "#e8e8e8" }}>
              {SUPPLEMENT_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="px-5 py-3 text-sm font-semibold rounded-t-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={
                    activeTab === tab.id
                      ? {
                          background: "var(--im-green)",
                          color: "white",
                        }
                      : {
                          background: "transparent",
                          color: "var(--im-charcoal)",
                          borderBottom: "2px solid transparent",
                        }
                  }
                  aria-selected={activeTab === tab.id}
                  role="tab"
                >
                  {tab.label}
                </button>
              ))}
            </div>
            {SUPPLEMENT_TABS.filter((t) => t.id === activeTab).map((tab) => (
              <div
                key={tab.id}
                className="rounded-2xl p-6"
                style={{ background: "var(--im-bg)", border: "1px solid #e8e8e8" }}
                role="tabpanel"
              >
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "var(--im-charcoal)" }}
                >
                  {tab.body}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile: Accordion */}
          <div className="md:hidden">
            <Accordion.Root type="single" collapsible className="flex flex-col gap-2">
              {SUPPLEMENT_TABS.map((tab) => (
                <Accordion.Item
                  key={tab.id}
                  value={tab.id}
                  className="rounded-2xl border overflow-hidden"
                  style={{ borderColor: "#e8e8e8" }}
                >
                  <Accordion.Trigger
                    className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset"
                    style={{ color: "var(--im-green)", background: "var(--im-bg)" }}
                  >
                    {tab.label}
                    <ChevronDown
                      size={16}
                      aria-hidden="true"
                      className="transition-transform duration-200 [[data-state=open]_&]:rotate-180"
                    />
                  </Accordion.Trigger>
                  <Accordion.Content className="px-5 py-4 bg-white text-base leading-relaxed" style={{ color: "var(--im-charcoal)" }}>
                    {tab.body}
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </div>
        </div>
      </section>

      {/* ── 6. TOP BENEFITS ────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container-rhl">
          <h2
            className="text-3xl font-bold mb-10 text-center"
            style={{ color: "var(--im-orange)" }}
          >
            TOP BENEFITS OF IRISH SEA MOSS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((benefit) => (
              <BenefitCard key={benefit.id} benefit={benefit} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. USING AS SUPPLEMENT ─────────────────────────────────────── */}
      <section className="py-16" style={{ background: "var(--im-bg)" }}>
        <div className="container-rhl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left: blob */}
            <div className="flex-shrink-0 flex justify-center">
              <div
                aria-hidden="true"
                style={{
                  background:
                    "linear-gradient(135deg, var(--im-leaf), var(--im-green))",
                  borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%",
                  width: "240px",
                  height: "240px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "5rem",
                }}
              >
                💊
              </div>
            </div>

            {/* Right */}
            <div className="flex-1">
              <h2
                className="text-3xl font-bold mb-4"
                style={{ color: "var(--im-green)" }}
              >
                Using Irish Moss as Supplement
              </h2>
              <p
                className="text-base leading-relaxed mb-6"
                style={{ color: "var(--im-charcoal)" }}
              >
                A lot of people do enjoy the goodness of Irish Sea Moss by just
                adding it to their salads or smoothies, but there are others that
                don't like its sea-like smell. Most people prefer to take in the
                goodness of Sea Moss in the form of supplements. The powdered
                form of dried Sea Moss is available as capsules or as tinctures.
                Organic Irish Moss tincture is one such that is easy to take in
                any way you prefer. It's advisable to read manufacturer's
                instructions carefully before using any form of Irish Sea Moss
                supplement.
              </p>
              {/* Form chips */}
              <div className="flex flex-wrap gap-3">
                {["Capsules", "Tincture", "Powder"].map((form) => (
                  <span
                    key={form}
                    className="px-5 py-2 rounded-full text-sm font-semibold"
                    style={{
                      border: "2px solid var(--im-green)",
                      color: "var(--im-green)",
                      background: "white",
                    }}
                  >
                    {form}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. BLADDERWRACK BAND ───────────────────────────────────────── */}
      <section
        className="py-16"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.40 0.12 150), oklch(0.55 0.15 145))",
        }}
      >
        <div className="container-rhl">
          <h2
            className="text-3xl font-bold mb-8 text-center"
            style={{ color: "white" }}
          >
            Irish Sea Moss &amp; Bladderwrack Give Best Effects
          </h2>
          <div className="flex flex-col md:flex-row justify-center gap-8 mb-8">
            {["🌊", "🌿"].map((emoji, i) => (
              <div
                key={i}
                aria-hidden="true"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: "55% 45% 65% 35% / 45% 55% 45% 55%",
                  width: "160px",
                  height: "160px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "4rem",
                  margin: "0 auto",
                }}
              >
                {emoji}
              </div>
            ))}
          </div>
          <p
            className="text-base leading-relaxed max-w-3xl mx-auto text-center"
            style={{ color: "rgba(255,255,255,0.92)" }}
          >
            Bladderwrack, like Irish Sea Moss, is another seaweed and is known
            for its immense benefits on human health. One of the prominent
            benefits of this seaweed is its role in managing thyroid-related
            disorders arising due to iodine deficiency. A combination of Irish
            Sea Moss and Bladderwrack proves to be most beneficial as they work
            in synergy. It has been observed that the effect of the two weeds
            when taken together is far greater than when they are taken
            separately. The combination is ideal for treating gastrointestinal
            problems such as bloating, acidity and gastritis. Together, they also
            cleanse blood and help counter cardiovascular disorders with much
            efficacy.
          </p>
        </div>
      </section>

      {/* ── 9. BUY ORIGINAL CALLOUT ────────────────────────────────────── */}
      <section
        className="py-16"
        style={{ background: "oklch(0.95 0.03 150)" }}
      >
        <div className="container-rhl max-w-3xl text-center">
          <h2
            className="text-3xl font-bold mb-4"
            style={{ color: "var(--im-green)" }}
          >
            Buy only Original Irish Sea Moss
          </h2>
          <p
            className="text-base leading-relaxed mb-8"
            style={{ color: "var(--im-charcoal)" }}
          >
            Studies have shown that the benefits that naturally grown Irish Sea
            Moss give are widely absent from those that are grown in artificial
            brine land. The composition of the weed is seen to have changed thus
            robbing the artificially grown seaweed of the goodness that the
            natural algae have.
          </p>
          <Link
            to="/shop"
            search={{ categories: ["irish-moss"] }}
            className="inline-block px-8 py-3 rounded-full font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{ background: "var(--im-orange)" }}
          >
            Shop Authentic Irish Moss →
          </Link>
        </div>
      </section>

      {/* ── 10. DISCLAIMER BOX ─────────────────────────────────────────── */}
      <aside
        role="note"
        aria-label="Shellfish allergy warning"
        className="py-12"
        style={{ background: "var(--im-bg)" }}
      >
        <div
          className="border rounded-lg p-6 my-8 max-w-4xl mx-auto"
          style={{ borderColor: "#d1d5db" }}
        >
          <p
            className="text-base leading-relaxed mb-5"
            style={{ color: "var(--im-charcoal)" }}
          >
            In addition to the full complement of trace minerals found in all
            seaweeds, Irish Moss contains unique anti-viral properties. It has
            been used internally to treat coughs and chest infections, and
            topically to relieve shingles and other skin conditions.
          </p>
          <div
            className="border rounded-md p-4 mb-5"
            style={{
              background: "oklch(0.93 0.08 75)",
              borderColor: "oklch(0.75 0.12 75)",
            }}
          >
            <p
              className="text-sm font-bold uppercase leading-relaxed"
              style={{ color: "oklch(0.35 0.09 55)" }}
            >
              MAY CONTAIN TRACE AMOUNTS OF SHELLFISH. THIS PRODUCT IS NOT
              RECOMMENDED FOR INDIVIDUALS WHO ARE HIGHLY
              SENSITIVE/ALLERGIC TO SHELLFISH.
            </p>
          </div>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "#6b7280" }}
          >
            This product is not intended to diagnose, treat, cure or prevent
            any disease. These statements have not been evaluated by the Food
            and Drug Administration. Always consult your physician or other
            qualified health provider before beginning any new supplement or
            health program.
          </p>
        </div>
      </aside>
    </article>
  );
}
