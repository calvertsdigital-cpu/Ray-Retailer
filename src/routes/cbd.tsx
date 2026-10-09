/**
 * CBD / Hemp Oil Education Page — Ray's Healthy Living®
 * Route: /cbd
 * Matches the approved mockup: green accent, alternating split sections,
 * skin conditions grid, all hemp oil benefit sections.
 */
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Brain, Heart, Droplets, Zap, ShieldCheck,
  Leaf, Activity, Sparkles, ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/cbd")({
  head: () => ({
    meta: [
      { title: "CBD Hemp Oil — Benefits & Education | Ray's Healthy Living®" },
      {
        name: "description",
        content:
          "Discover the benefits of CBD Hemp Oil for skin, brain health, heart health, pain relief, acne, muscle recovery and more. Shop premium CBD at Ray's Healthy Living®.",
      },
      { property: "og:type", content: "article" },
    ],
  }),
  component: CBDPage,
});

// ─── Design tokens ───────────────────────────────────────────────────────────
const G  = "#2e7d32";   // primary green
const GL = "#7ab82a";   // leaf green
const W  = "#ffffff";

// ─── Reusable split section ───────────────────────────────────────────────────
function SplitSection({
  imageLeft,
  title,
  lead,
  body,
  imageSrc,
  imageAlt,
  accent = false,
}: {
  imageLeft: boolean;
  title: string;
  lead?: string;
  body: string | string[];
  imageSrc: string;
  imageAlt: string;
  accent?: boolean;
}) {
  const paragraphs = Array.isArray(body) ? body : [body];
  const bg = accent ? "#f0fdf4" : "#ffffff";

  const ImageCol = (
    <div className="flex justify-center items-center">
      <div
        style={{
          borderRadius: imageLeft
            ? "60% 40% 70% 30% / 50% 60% 40% 50%"
            : "40% 60% 30% 70% / 60% 40% 60% 40%",
          overflow: "hidden",
          width: "300px",
          height: "300px",
          flexShrink: 0,
          background: "linear-gradient(135deg, #d4f7b7 0%, #a5f3a0 100%)",
        }}
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          loading="lazy"
          width={300}
          height={300}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>
    </div>
  );

  const TextCol = (
    <div className="flex-1">
      <h2
        className="text-3xl font-bold mb-4 leading-tight"
        style={{ color: G }}
      >
        {title}
      </h2>
      {lead && (
        <p className="text-base font-semibold mb-4" style={{ color: GL }}>
          {lead}
        </p>
      )}
      {paragraphs.map((p, i) => (
        <p
          key={i}
          className="text-base leading-relaxed mb-3"
          style={{ color: "#374151" }}
        >
          {p}
        </p>
      ))}
    </div>
  );

  return (
    <section className="py-16" style={{ backgroundColor: bg }}>
      <div className="container-rhl">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {imageLeft ? (
            <>
              {ImageCol}
              {TextCol}
            </>
          ) : (
            <>
              {TextCol}
              {ImageCol}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Skin conditions grid ────────────────────────────────────────────────────
const skinConditions = [
  "Acne & Acne",
  "Dermatitis",
  "Psoriasis",
  "Eczema",
  "Varicose Eczema",
  "Lichen Planus",
];

// ─── Page ────────────────────────────────────────────────────────────────────
function CBDPage() {
  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>

      {/* ── Breadcrumb ── */}
      <nav
        aria-label="Breadcrumb"
        className="border-b py-3"
        style={{ backgroundColor: "#f9fafb", borderColor: "#e5e7eb" }}
      >
        <div className="container-rhl flex flex-wrap items-center gap-1.5 text-sm" style={{ color: "#6b7280" }}>
          <Link to="/" className="hover:underline" style={{ color: "#6b7280" }}>Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span style={{ color: "#111827" }}>CBD</span>
        </div>
      </nav>

      {/* ══════════════════════════════════════════
          1. HEMP OIL BENEFITS — intro split
      ══════════════════════════════════════════ */}
      <section className="py-16" style={{ backgroundColor: "#ffffff" }}>
        <div className="container-rhl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Text */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-5" style={{ color: G }}>
                Hemp oil benefits
              </h1>
              <p className="text-base leading-relaxed mb-4" style={{ color: "#374151" }}>
                CBD Cannabidiol is a naturally occurring compound found in the cannabis plant. Unlike THC, CBD is non-psychoactive, meaning it won't get you high.
              </p>
              <p className="text-base leading-relaxed mb-4" style={{ color: "#374151" }}>
                CBD oil is extracted from hemp plants and has gained popularity for its potential therapeutic benefits. Research suggests CBD may help with anxiety, pain management, and sleep disorders.
              </p>
              <p className="text-base leading-relaxed mb-6" style={{ color: "#374151" }}>
                CBD has been noted for its anti-inflammatory properties and potential to support overall wellness. Many users report improved sleep quality and reduced stress levels.
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: G }}
              >
                Shop CBD →
              </Link>
            </div>
            {/* Image */}
            <div className="flex justify-center items-center">
              <div
                style={{
                  borderRadius: "40% 60% 30% 70% / 60% 40% 60% 40%",
                  overflow: "hidden",
                  width: "300px",
                  height: "300px",
                  background: "linear-gradient(135deg, #bbf7d0, #86efac)",
                }}
              >
                <div
                  className="w-full h-full flex items-center justify-center text-8xl"
                  style={{ background: "linear-gradient(135deg, #d1fae5 0%, #6ee7b7 100%)" }}
                  aria-hidden="true"
                >
                  🌿
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. HEMP OIL FOR SKIN DISEASES
      ══════════════════════════════════════════ */}
      <section className="py-16" style={{ backgroundColor: "#f0fdf4" }}>
        <div className="container-rhl">
          <div className="flex flex-col lg:flex-row items-start gap-12">
            {/* Left: product image blob */}
            <div className="flex justify-center items-center lg:w-1/2">
              <div
                style={{
                  borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%",
                  overflow: "hidden",
                  width: "280px",
                  height: "280px",
                  background: "linear-gradient(135deg, #d1fae5, #a7f3d0)",
                  flexShrink: 0,
                }}
                aria-hidden="true"
              >
                <div className="w-full h-full flex items-center justify-center text-7xl">
                  💧
                </div>
              </div>
            </div>
            {/* Right: text + skin grid */}
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4" style={{ color: G }}>
                Hemp Oil for Skin Diseases
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: "#374151" }}>
                Hemp Oil is rich in fatty acids and vitamins that are ideal nourishment for healthy skin and keep it healthy. Using this oil helps keep skin moist while protecting it from oxidation that causes dry aging. It is also externally useful to prevent redness on skin and treat inflammations.
              </p>
              <p
                className="text-base font-semibold mb-5"
                style={{ color: GL }}
              >
                Hemp Oil can be used to treat a range of skin conditions like:
              </p>
              {/* Skin conditions grid */}
              <div className="grid grid-cols-3 gap-3">
                {skinConditions.map((condition) => (
                  <div
                    key={condition}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl text-center"
                    style={{ backgroundColor: "white", border: "1px solid #d1fae5" }}
                  >
                    <div
                      className="h-12 w-12 rounded-full flex items-center justify-center text-xl"
                      style={{ backgroundColor: "#d1fae5" }}
                      aria-hidden="true"
                    >
                      🌿
                    </div>
                    <span className="text-xs font-semibold" style={{ color: "#374151" }}>
                      {condition}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. HEMP OIL & BRAIN HEALTH
      ══════════════════════════════════════════ */}
      <section className="py-16" style={{ backgroundColor: "#ffffff" }}>
        <div className="container-rhl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4" style={{ color: G }}>
                Hemp Oil &amp; Brain Health
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: "#374151" }}>
                Fatty acids present in Hemp Oil are known to be good for brain health. It is especially beneficial to those who have undergone brain operation by protecting the brain. Studies conducted have proved that Hemp Oil is effective in protecting the brain against inflammation.
              </p>
              <p className="text-sm font-semibold mb-5" style={{ color: GL }}>
                Everything you need to know about CBD oil
              </p>
              {/* Video placeholder */}
              <div
                className="rounded-2xl overflow-hidden flex items-center justify-center"
                style={{
                  backgroundColor: "#1f2937",
                  aspectRatio: "16/9",
                  maxWidth: "420px",
                  border: "1px solid #e5e7eb",
                }}
                aria-label="CBD Hemp Oil educational video"
              >
                <div className="flex flex-col items-center gap-3 text-white">
                  <div
                    className="h-14 w-14 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: GL }}
                    aria-hidden="true"
                  >
                    <span style={{ fontSize: "1.5rem" }}>▶</span>
                  </div>
                  <span className="text-sm opacity-70">Play Video</span>
                </div>
              </div>
            </div>
            {/* Image */}
            <div className="flex justify-center items-center">
              <div
                style={{
                  borderRadius: "40% 60% 30% 70% / 60% 40% 60% 40%",
                  overflow: "hidden",
                  width: "300px",
                  height: "300px",
                  background: "linear-gradient(135deg, #d1fae5, #6ee7b7)",
                }}
                aria-hidden="true"
              >
                <div className="w-full h-full flex items-center justify-center text-7xl">
                  🧠
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. HEMP OIL & HEART HEALTH
      ══════════════════════════════════════════ */}
      <SplitSection
        imageLeft={false}
        title="Hemp Oil & Heart Health"
        body={[
          "Hemp Oil contains omega-3 and omega-6 fatty acids in the ideal ratio for heart health. These essential fatty acids help reduce cholesterol levels and support cardiovascular function.",
          "Regular consumption of Hemp Oil may help lower blood pressure, reduce inflammation in the cardiovascular system, and improve overall heart health.",
          "The anti-inflammatory properties of Hemp Oil can help prevent arterial blockage and support healthy blood circulation throughout the body.",
        ]}
        imageSrc=""
        imageAlt="Hemp oil supporting heart health"
        accent={true}
      />

      {/* ══════════════════════════════════════════
          5. HEMP OIL & CBD
      ══════════════════════════════════════════ */}
      <section className="py-16" style={{ backgroundColor: "#ffffff" }}>
        <div className="container-rhl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4" style={{ color: G }}>
                Hemp Oil &amp; CBD
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: "#374151" }}>
                The full spectrum of Hemp Oil that includes CBD is often richer in nutrient values. But when the concentration of the Hemp Seeds is high, it offers equivalent goodness that nourishes good health and protects body.
              </p>
            </div>
            <div className="flex justify-center items-center">
              <div
                style={{
                  borderRadius: "40% 60% 30% 70% / 60% 40% 60% 40%",
                  overflow: "hidden",
                  width: "300px",
                  height: "300px",
                  background: "linear-gradient(135deg, #d1fae5, #6ee7b7)",
                }}
                aria-hidden="true"
              >
                <div className="w-full h-full flex items-center justify-center text-7xl">
                  🌱
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. HEMP OIL & PAIN RELIEF
      ══════════════════════════════════════════ */}
      <section className="py-16" style={{ backgroundColor: "#f0fdf4" }}>
        <div className="container-rhl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Product image left */}
            <div className="flex justify-center items-center">
              <div
                style={{
                  borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%",
                  overflow: "hidden",
                  width: "280px",
                  height: "280px",
                  background: "linear-gradient(135deg, #d1fae5, #a7f3d0)",
                  flexShrink: 0,
                }}
                aria-hidden="true"
              >
                <div className="w-full h-full flex items-center justify-center text-7xl">
                  💊
                </div>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4" style={{ color: G }}>
                Hemp Oil &amp; Pain Relief
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: "#374151" }}>
                Hemp Oil is known to be a natural analgesic agent and is especially effective in cases of inflammation. Studies show that Hemp Oil is effective against a range of body aches and pains. Make sure that you buy only high quality and pure Hemp Oil for getting its true analgesic benefits.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "#374151" }}>
                Most studies on its analgesic effects have been carried out on mice and results on humans are still awaited.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. HEMP OIL & ACNE TREATMENT
      ══════════════════════════════════════════ */}
      <section className="py-16" style={{ backgroundColor: "#ffffff" }}>
        <div className="container-rhl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4" style={{ color: G }}>
                Hemp Oil &amp; Acne Treatment
              </h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: "#374151" }}>
                Fatty acids in Hemp Oil are effective in treating acne and other inflammatory conditions resulting in acne.
              </p>
              {/* Video placeholder */}
              <div
                className="rounded-2xl overflow-hidden flex items-center justify-center"
                style={{
                  backgroundColor: "#1f2937",
                  aspectRatio: "16/9",
                  maxWidth: "380px",
                  border: "1px solid #e5e7eb",
                }}
                aria-label="Hemp Oil Acne Treatment video"
              >
                <div className="flex flex-col items-center gap-3 text-white">
                  <div
                    className="h-14 w-14 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: GL }}
                    aria-hidden="true"
                  >
                    <span style={{ fontSize: "1.5rem" }}>▶</span>
                  </div>
                  <span className="text-sm opacity-70">Play Video</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div
                style={{
                  borderRadius: "40% 60% 30% 70% / 60% 40% 60% 40%",
                  overflow: "hidden",
                  width: "300px",
                  height: "300px",
                  background: "linear-gradient(135deg, #d1fae5, #6ee7b7)",
                }}
                aria-hidden="true"
              >
                <div className="w-full h-full flex items-center justify-center text-7xl">
                  ✨
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          8. HEMP OIL & MUSCLE PAIN
      ══════════════════════════════════════════ */}
      <section className="py-16" style={{ backgroundColor: "#f0fdf4" }}>
        <div className="container-rhl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Product image left */}
            <div className="flex justify-center items-center">
              <div
                style={{
                  borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%",
                  overflow: "hidden",
                  width: "280px",
                  height: "280px",
                  background: "linear-gradient(135deg, #d1fae5, #a7f3d0)",
                  flexShrink: 0,
                }}
                aria-hidden="true"
              >
                <div className="w-full h-full flex items-center justify-center text-7xl">
                  💪
                </div>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4" style={{ color: G }}>
                Hemp Oil &amp; Muscle Pain
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "#374151" }}>
                Hemp Oil along with CBD is effective in relaxing tense muscles and alleviates strain in them. Its anti-inflammatory properties work on stressed muscles, ease tension in them and help them recover faster. Massaging Hemp Oil on painful and stressed muscles gives a sense of relaxation and brings a feeling of well-being almost instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          QUICK BENEFITS GRID
      ══════════════════════════════════════════ */}
      <section className="py-16" style={{ backgroundColor: "#ffffff" }}>
        <div className="container-rhl">
          <h2
            className="text-3xl font-bold text-center mb-10"
            style={{ color: G }}
          >
            Key Benefits of CBD Hemp Oil
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {[
              { icon: Brain,      label: "Brain Health",     desc: "Supports cognitive function and protects against inflammation" },
              { icon: Heart,      label: "Heart Health",     desc: "Supports cardiovascular function and healthy blood flow" },
              { icon: Droplets,   label: "Skin Health",      desc: "Nourishes skin, reduces inflammation and acne" },
              { icon: Zap,        label: "Pain Relief",      desc: "Natural analgesic properties for aches and pains" },
              { icon: ShieldCheck,label: "Immune Support",   desc: "Boosts natural immune response" },
              { icon: Leaf,       label: "Anti-Inflammatory",desc: "Reduces inflammation throughout the body" },
              { icon: Activity,   label: "Muscle Recovery",  desc: "Eases tension and aids post-activity recovery" },
              { icon: Sparkles,   label: "Stress Relief",    desc: "Promotes calm and reduces everyday stress levels" },
            ].map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center gap-3 p-5 rounded-2xl border transition-shadow hover:shadow-md"
                style={{ backgroundColor: "#fafffe", borderColor: "#d1fae5" }}
              >
                <div
                  className="h-12 w-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#d1fae5" }}
                >
                  <Icon className="h-6 w-6" style={{ color: G }} aria-hidden="true" />
                </div>
                <p className="font-bold text-sm" style={{ color: "#111827" }}>{label}</p>
                <p className="text-xs leading-relaxed" style={{ color: "#6b7280" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA BAND
      ══════════════════════════════════════════ */}
      <section
        className="py-14 text-white text-center"
        style={{ background: `linear-gradient(135deg, ${G} 0%, ${GL} 100%)` }}
      >
        <div className="container-rhl max-w-2xl">
          <h2 className="text-3xl font-bold mb-3">
            Ready to Experience CBD?
          </h2>
          <p className="text-base mb-8 opacity-90">
            Shop Ray's Healthy Living® premium CBD hemp oil products — naturally sourced, quality tested.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#f97316" }}
          >
            Shop CBD Now →
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DISCLAIMER
      ══════════════════════════════════════════ */}
      <aside
        role="note"
        aria-label="Health disclaimer"
        className="py-8"
        style={{ backgroundColor: "#f9fafb" }}
      >
        <div
          className="container-rhl max-w-4xl rounded-xl border p-6"
          style={{ borderColor: "#e5e7eb" }}
        >
          <p className="text-xs leading-relaxed" style={{ color: "#6b7280" }}>
            <strong style={{ color: "#374151" }}>Educational information only.</strong>{" "}
            The content on this page is for informational and educational purposes only and is not intended to substitute for professional medical advice, diagnosis, or treatment. Always consult your physician or other qualified healthcare provider before starting any supplement, diet, or health program. Statements have not been evaluated by the FDA and are not intended to diagnose, treat, cure, or prevent any disease.
            © {new Date().getFullYear()} Ray's Healthy Living®. All Rights Reserved.
          </p>
        </div>
      </aside>
    </div>
  );
}
