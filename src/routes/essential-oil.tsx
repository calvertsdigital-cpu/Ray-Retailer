/**
 * Essential Oils Landing Page — Ray's Healthy Living®
 * Follows the September 2026 Master Development Brief exactly.
 * Images: /eseproducte.png (hero), /esation-hero.png (products/collection)
 * Brand: Ray's / Ray's Healthy Living — no "Raze" or "VitalityWorks"
 */
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Wind, Moon, Zap, Sun, Droplets,
  Leaf, Shield, Heart, Brain, Star,
  BookOpen, Package, CheckCircle2,
  ArrowRight, FlaskConical,
} from "lucide-react";

export const Route = createFileRoute("/essential-oil")({
  head: () => ({
    meta: [
      { title: "Essential Oils for Everyday Wellness | Ray's Healthy Living®" },
      {
        name: "description",
        content:
          "Explore Ray's essential oil collection for relaxation, clarity, comfort, energy, breathing-space routines, and everyday lifestyle wellness. Shop individual oils and curated support kits.",
      },
    ],
  }),
  component: EssentialOilPage,
});

// ─── Data ────────────────────────────────────────────────────────────────────

const supportCategories = [
  {
    icon: Wind,
    title: "Stress Support",
    desc: "Calming aromatic options for relaxation routines and creating a more grounded environment.",
    colour: "#6b7f6b",
  },
  {
    icon: Moon,
    title: "Sleep Support",
    desc: "Oils selected for wind-down routines and a peaceful nighttime atmosphere.",
    colour: "#5b6b8a",
  },
  {
    icon: Brain,
    title: "Focus & Clarity Support",
    desc: "Fresh aromatic options suited to work, study, reading, and concentration routines.",
    colour: "#4a7a6a",
  },
  {
    icon: Sun,
    title: "Energy & Uplift Support",
    desc: "Bright aromatic selections for morning routines, atmosphere refresh, and uplifting sensory experiences.",
    colour: "#b07a2a",
  },
  {
    icon: Heart,
    title: "Head Comfort Support",
    desc: "Cooling and soothing aromatic experiences for personal comfort routines.",
    colour: "#8a5a5a",
  },
  {
    icon: Droplets,
    title: "Breathe & Airway Support",
    desc: "Refreshing oils for diffuser, steam, and seasonal breathing-space routines.",
    colour: "#3a7a8a",
  },
  {
    icon: Leaf,
    title: "Sinus & Seasonal Support",
    desc: "Aromatic options organized for changing seasons and environmental comfort routines.",
    colour: "#5a7a4a",
  },
  {
    icon: Zap,
    title: "Muscle & Body Comfort Support",
    desc: "Oils suited to properly diluted massage, post-activity, and body-comfort routines.",
    colour: "#7a5a3a",
  },
  {
    icon: Shield,
    title: "Immune Lifestyle Support",
    desc: "Seasonal household and wellness-routine selections for everyday lifestyle support.",
    colour: "#4a6a4a",
  },
  {
    icon: Star,
    title: "Mood & Emotional Balance Support",
    desc: "Aromatic options for decompression, reflection, journaling, and atmosphere reset.",
    colour: "#7a4a7a",
  },
  {
    icon: FlaskConical,
    title: "Digestive Comfort Support",
    desc: "Aromatic comfort and relaxation routines. Lifestyle-oriented aromatic support.",
    colour: "#7a6a3a",
  },
];

const bundleKits = [
  { name: "Stress Kit", desc: "A calming combination for relaxation, decompression, and creating a grounded home environment.", badge: "Popular" },
  { name: "Sleep Kit", desc: "Evening wind-down oils selected to support a peaceful nighttime atmosphere and bedtime routine.", badge: "" },
  { name: "Focus Kit", desc: "Fresh, clarifying oils for work, study, reading, and daily concentration routines.", badge: "Best Seller" },
  { name: "Breathe Kit", desc: "Refreshing oils for diffuser and breathing-space routines throughout the day.", badge: "" },
  { name: "Energy Kit", desc: "Uplifting aromatic oils for morning routines, atmosphere refresh, and sensory energy support.", badge: "" },
  { name: "Head Comfort Kit", desc: "Cooling and soothing oils for personal comfort and relaxation routines.", badge: "" },
  { name: "Seasonal Relief Kit", desc: "Seasonal atmosphere and environmental-comfort aromatic support routines.", badge: "" },
  { name: "Muscle Comfort Kit", desc: "Properly diluted massage and post-activity body-comfort aromatic routines.", badge: "" },
  { name: "Immune Lifestyle Kit", desc: "Seasonal household and everyday wellness-lifestyle aromatic support.", badge: "Popular" },
  { name: "Mood Balance Kit", desc: "Calm, reflection, and atmosphere-reset aromatic support for emotional balance routines.", badge: "" },
  { name: "Digestive Comfort Kit", desc: "Aromatic comfort and relaxation routines for everyday digestive lifestyle support.", badge: "" },
];

const educationBlocks = [
  { icon: BookOpen, title: "How to Use Essential Oils", desc: "Learn the foundational methods: diffusing, diluted topical application, and home environment use." },
  { icon: Wind, title: "Diffuser Basics", desc: "Water ratios, run times, cleaning, and choosing the right oil for your space and intention." },
  { icon: Droplets, title: "Topical Dilution & Carrier Oils", desc: "Why dilution matters, carrier-oil ratios, and how to patch-test before first use." },
  { icon: Star, title: "Build Your Daily Ritual", desc: "Morning, midday, and evening aromatic routines that fit into a realistic daily wellness schedule." },
  { icon: Leaf, title: "Shop by Support Goal", desc: "Use the 11 support categories to find the oils and kits aligned with your personal wellness goals." },
];

// ─── Component ───────────────────────────────────────────────────────────────

function EssentialOilPage() {
  return (
    <div style={{ backgroundColor: "#faf9f6", minHeight: "100vh" }}>

      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "480px", backgroundColor: "#e8e0d8" }}
        aria-label="Essential Oils hero"
      >
        {/* Background hero image */}
        <img
          src="/h.png"
          alt="Ray's essential oil bottles with a diffuser and botanicals on a natural wood surface"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.85 }}
        />
        {/* Gradient overlay for text legibility */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(245,240,232,0.92) 0%, rgba(245,240,232,0.65) 50%, transparent 100%)" }}
          aria-hidden="true"
        />

        <div className="container-rhl relative z-10 flex flex-col justify-center py-16 lg:py-24" style={{ minHeight: "480px" }}>
          <div className="max-w-lg">
            <h1
              className="font-black leading-tight mb-4"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "#2a2a1a", fontFamily: "Georgia, serif" }}
            >
              Essential Oils for<br />Everyday Wellness Support
            </h1>
            <p className="text-base leading-relaxed mb-8" style={{ color: "#4a4a3a", maxWidth: "420px" }}>
              Explore Ray's essential oil collection for relaxation, clarity, comfort, energy, breathing-space routines, and everyday lifestyle wellness.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 rounded font-bold text-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#3a5a2a", color: "white" }}
              >
                Shop Essential Oils
              </Link>
              <Link
                to="/essential-oil#kits"
                className="inline-flex items-center gap-2 px-6 py-3 rounded font-bold text-sm border-2 transition-colors hover:bg-stone-100"
                style={{ borderColor: "#3a5a2a", color: "#3a5a2a", backgroundColor: "rgba(255,255,255,0.7)" }}
              >
                Explore Support Kits
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. INTRODUCTION — two-column
      ══════════════════════════════════════════ */}
      <section className="container-rhl section-y">
        <div className="grid gap-10 md:grid-cols-2 items-center">
          {/* Image side */}
          <div className="overflow-hidden rounded-2xl" style={{ maxHeight: "320px" }}>
            <img
              src="/esation-hero.png"
              alt="Ray's essential oil collection — individual bottles arranged on a natural surface"
              className="w-full h-full object-cover"
              style={{ maxHeight: "320px" }}
            />
          </div>
          {/* Text side */}
          <div>
            <p
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ color: "#7a6a3a" }}
            >
              Ray's Healthy Living®
            </p>
            <h2
              className="font-bold mb-4 leading-snug"
              style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: "#2a2a1a", fontFamily: "Georgia, serif" }}
            >
              Organized by Lifestyle Need
            </h2>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "#5a5a4a" }}>
              Essential oils have long been used as part of daily wellness routines for mood, atmosphere, relaxation, focus, and sensory support.
            </p>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#5a5a4a" }}>
              At Ray's Healthy Living, the collection is organized by lifestyle need to make it easier to discover individual oils, curated kits, and educational guidance for everyday use.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-sm font-bold hover:underline"
              style={{ color: "#3a5a2a" }}
            >
              Browse the full collection <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. 11 SUPPORT CATEGORIES
      ══════════════════════════════════════════ */}
      <section
        className="py-14"
        style={{ backgroundColor: "white" }}
        aria-labelledby="support-heading"
      >
        <div className="container-rhl">
          <div className="text-center mb-10">
            <h2
              id="support-heading"
              className="font-bold mb-2"
              style={{ fontSize: "clamp(1.25rem, 3vw, 1.875rem)", color: "#2a2a1a", fontFamily: "Georgia, serif" }}
            >
              What Essential Oils Can Support
            </h2>
            <p className="text-sm" style={{ color: "#7a7a6a" }}>
              Shop by lifestyle need — find the right oil or kit for your daily routine.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-5">
            {supportCategories.map(({ icon: Icon, title, desc, colour }) => (
              <Link
                key={title}
                to="/shop"
                className="flex flex-col items-center text-center rounded-2xl border p-5 transition-shadow hover:shadow-lg group"
                style={{ backgroundColor: "#faf9f6", borderColor: "#e8e2d8" }}
              >
                {/* Icon circle */}
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full mb-3 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: colour + "18", border: `2px solid ${colour}30` }}
                >
                  <Icon className="h-6 w-6" style={{ color: colour }} aria-hidden="true" />
                </div>
                <p className="font-bold text-sm mb-1.5 leading-snug" style={{ color: "#2a2a1a" }}>
                  {title}
                </p>
                <p className="text-xs leading-relaxed mb-4 flex-1" style={{ color: "#7a7a6a" }}>
                  {desc}
                </p>
                <span
                  className="inline-block text-xs font-bold px-4 py-1.5 rounded border-2 transition-colors group-hover:text-white"
                  style={{
                    borderColor: "#3a5a2a",
                    color: "#3a5a2a",
                  }}
                >
                  View Kit
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. BUNDLE KITS
      ══════════════════════════════════════════ */}
      <section
        id="kits"
        className="py-14"
        style={{ backgroundColor: "#f4f0ea" }}
        aria-labelledby="bundles-heading"
      >
        <div className="container-rhl">
          <div className="text-center mb-10">
            <h2
              id="bundles-heading"
              className="font-bold mb-2"
              style={{ fontSize: "clamp(1.25rem, 3vw, 1.875rem)", color: "#2a2a1a", fontFamily: "Georgia, serif" }}
            >
              Explore Our Essential Oil Bundles
            </h2>
            <p className="text-sm" style={{ color: "#7a7a6a" }}>
              Curated kits designed around everyday wellness routines. Each kit contains hand-selected oils for a specific support goal.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
            {bundleKits.map(({ name, desc, badge }) => (
              <div
                key={name}
                className="flex flex-col overflow-hidden rounded-2xl border bg-white transition-shadow hover:shadow-lg"
                style={{ borderColor: "#e8e2d8" }}
              >
                {/* Image area */}
                <div
                  className="relative"
                  style={{ aspectRatio: "4/3", overflow: "hidden", backgroundColor: "#ede8e0" }}
                >
                  <img
                    src="/esation-hero.png"
                    alt={`Ray's ${name} — essential oil bundle`}
                    className="h-full w-full object-cover"
                  />
                  {badge && (
                    <span
                      className="absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded"
                      style={{ backgroundColor: "#3a5a2a", color: "white" }}
                    >
                      {badge}
                    </span>
                  )}
                </div>

                {/* Card body */}
                <div className="p-4 flex flex-col flex-1">
                  <p className="font-bold text-sm mb-1" style={{ color: "#2a2a1a" }}>
                    {name}
                  </p>
                  <p className="text-xs leading-relaxed flex-1 mb-4" style={{ color: "#7a7a6a" }}>
                    {desc}
                  </p>
                  <Link
                    to="/shop"
                    className="inline-flex items-center justify-center text-xs font-bold px-4 py-2 rounded border-2 transition-colors hover:text-white hover:bg-stone-700"
                    style={{ borderColor: "#3a5a2a", color: "#3a5a2a" }}
                  >
                    Shop Bundle
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. EDUCATION BLOCKS
      ══════════════════════════════════════════ */}
      <section className="py-14" style={{ backgroundColor: "white" }}>
        <div className="container-rhl">
          <div className="text-center mb-10">
            <h2
              className="font-bold mb-2"
              style={{ fontSize: "clamp(1.25rem, 3vw, 1.875rem)", color: "#2a2a1a", fontFamily: "Georgia, serif" }}
            >
              Learn More About Essential Oils
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {educationBlocks.map(({ icon: Icon, title, desc }) => (
              <Link
                key={title}
                to="/blog"
                className="flex flex-col items-center text-center p-5 rounded-2xl border transition-shadow hover:shadow-md group"
                style={{ backgroundColor: "#faf9f6", borderColor: "#e8e2d8" }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full mb-3"
                  style={{ backgroundColor: "#e8e2d8" }}
                >
                  <Icon className="h-5 w-5" style={{ color: "#5a5a3a" }} aria-hidden="true" />
                </div>
                <p className="font-bold text-sm mb-1" style={{ color: "#2a2a1a" }}>{title}</p>
                <p className="text-xs leading-relaxed" style={{ color: "#7a7a6a" }}>{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. TRUST BAR
      ══════════════════════════════════════════ */}
      <section
        className="py-10"
        style={{ backgroundColor: "#f4f0ea", borderTop: "1px solid #e8e2d8", borderBottom: "1px solid #e8e2d8" }}
      >
        <div className="container-rhl">
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { icon: CheckCircle2, label: "Curated for Wellness", desc: "Every oil and kit selected with your daily routine in mind." },
              { icon: Package, label: "Easy to Shop Kits", desc: "11 support categories. 11 ready-made bundles. One clear destination." },
              { icon: Star, label: "Trusted Quality", desc: "Ray's Healthy Living® — quality supplements and botanicals since day one." },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full"
                  style={{ backgroundColor: "#3a5a2a20" }}
                >
                  <Icon className="h-5 w-5" style={{ color: "#3a5a2a" }} aria-hidden="true" />
                </div>
                <p className="font-bold text-sm" style={{ color: "#2a2a1a" }}>{label}</p>
                <p className="text-xs leading-relaxed" style={{ color: "#7a7a6a", maxWidth: "180px" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. FINAL CTA
      ══════════════════════════════════════════ */}
      <section className="py-14" style={{ backgroundColor: "#3a5a2a" }}>
        <div className="container-rhl text-center">
          <h2
            className="font-bold mb-3"
            style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", color: "white", fontFamily: "Georgia, serif" }}
          >
            Ready to Start Your Wellness Routine?
          </h2>
          <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.8)", maxWidth: "480px", margin: "0 auto 2rem" }}>
            Shop individual essential oils or choose a curated support kit designed for your lifestyle goal.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-7 py-3 rounded font-bold text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: "white", color: "#3a5a2a" }}
            >
              Shop All Essential Oils
            </Link>
            <Link
              to="/essential-oil#kits"
              className="inline-flex items-center gap-2 px-7 py-3 rounded font-bold text-sm border-2 transition-colors hover:bg-white hover:text-stone-700"
              style={{ borderColor: "white", color: "white" }}
            >
              View Bundle Kits
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SAFETY DISCLAIMER — required
      ══════════════════════════════════════════ */}
      <div className="container-rhl py-8">
        <div
          className="rounded-xl p-5 text-xs leading-relaxed"
          style={{ backgroundColor: "#f4f0ea", color: "#7a7a6a", borderLeft: "3px solid #b8a878" }}
        >
          <strong style={{ color: "#5a5a3a" }}>Safety &amp; Disclaimer: </strong>
          These products are intended for wellness lifestyle support and aromatic use. They are not intended to diagnose, treat, cure, or prevent any disease. Essential oils are for external use only unless the product label explicitly states otherwise. Keep away from eyes and mucous membranes. Dilute properly with a carrier oil before topical application. Keep out of reach of children and pets. If pregnant, nursing, or under medical care, consult your healthcare provider before use. Patch test before first topical use. Follow all individual product directions.
          <br /><br />
          © {new Date().getFullYear()} Ray's Healthy Living®. All Rights Reserved.
        </div>
      </div>

    </div>
  );
}
