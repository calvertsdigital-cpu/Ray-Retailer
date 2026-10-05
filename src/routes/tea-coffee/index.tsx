/**
 * Tea & Coffee Landing Page
 * Follows the approved September 2026 RHL design spec.
 * Images: /chay.png (tea), /cofee.png (coffee), /chaii coffe .png (hero)
 */
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpen,
  Coffee,
  Heart,
  Leaf,
  BookOpenCheck,
  Flame,
  Trophy,
  ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/tea-coffee/")({
  head: () => ({
    meta: [
      { title: "Tea & Coffee | Ray's Healthy Living®" },
      {
        name: "description",
        content:
          "Explore Ray's Healthy Living® collection of traditional teas, botanical ingredients and our RHL coffee collection. Tradition. Preparation. Daily Wellness.",
      },
    ],
  }),
  component: TeaCoffeeLanding,
});

// ─── Ecosystem links ──────────────────────────────────────────────────────────
const ecosystemLinks = [
  {
    icon: Coffee,
    label: "Preparation Guides",
    desc: "Learn how to prepare tea and coffee.",
    to: "/tea-coffee/articles",
  },
  {
    icon: Leaf,
    label: "Traditional Uses",
    desc: "Explore the history and benefits.",
    to: "/tea-coffee/articles",
  },
  {
    icon: BookOpen,
    label: "Articles",
    desc: "Read the latest tea and coffee education.",
    to: "/blog",
  },
  {
    icon: Heart,
    label: "Health Concerns",
    desc: "Discover how tea and coffee fit into your wellness goals.",
    to: "/health-concerns",
  },
  {
    icon: Trophy,
    label: "U20X™ Challenges",
    desc: "Build better daily routines with accountability.",
    to: "/health-concerns",
  },
];

// ─── Coffee 3×3 structure ────────────────────────────────────────────────────
const coffeeTypes = [
  {
    family: "Arabica Reserve",
    colour: "#15803d", // deep green
    badge: "coffee-family-arabica",
    desc: "Smooth, aromatic and naturally sweet. Our signature reserve blend.",
    preps: ["Whole Bean", "Medium/Ground", "Fine/Specialty Grind"],
  },
  {
    family: "Robusta Intense",
    colour: "#991b1b", // dark red
    badge: "coffee-family-robusta",
    desc: "Bold, full-bodied with a rich crema. High natural caffeine.",
    preps: ["Whole Bean", "Medium/Ground", "Fine/Specialty Grind"],
  },
  {
    family: "Culi Select — Peaberry",
    colour: "#d4af37", // gold
    badge: "coffee-family-culi",
    desc: "Single-seed peaberry. Concentrated flavour, naturally rounded.",
    preps: ["Whole Bean", "Medium/Ground", "Fine/Specialty Grind"],
  },
];

function TeaCoffeeLanding() {
  return (
    <div style={{ backgroundColor: "var(--tc-cream, #fdf8f3)", minHeight: "100vh" }}>

      {/* ══════════════════════════════════════════
          HERO — "Tradition. Preparation. Daily Wellness."
      ══════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "480px", backgroundColor: "#1a2e1a" }}
      >
        {/* Background image — chai coffee blend */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/chaii coffe .png')",
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
            opacity: 0.55,
          }}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="container-rhl relative z-10 flex flex-col justify-center py-16 lg:py-24" style={{ minHeight: "480px" }}>
          <div className="max-w-xl">
            <p
              className="text-sm font-bold tracking-[0.2em] uppercase mb-3"
              style={{ color: "var(--tc-gold, #d4af37)" }}
            >
              — Tea &amp; Coffee —
            </p>
            <h1
              className="font-black leading-tight mb-4"
              style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", color: "white" }}
            >
              Tradition. Preparation.<br />Daily Wellness.
            </h1>
            <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.85)", maxWidth: "440px" }}>
              Explore Ray's Healthy Living® collection of traditional teas, botanical ingredients and our RHL coffee collection.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/tea-coffee/tea"
                className="inline-flex items-center gap-2 px-6 py-3 rounded font-bold text-sm transition-colors hover:opacity-90"
                style={{ backgroundColor: "var(--primary, #2e7d32)", color: "white" }}
              >
                SHOP TEA →
              </Link>
              <Link
                to="/tea-coffee/coffee"
                className="inline-flex items-center gap-2 px-6 py-3 rounded font-bold text-sm transition-colors hover:opacity-90"
                style={{ backgroundColor: "var(--tc-gold, #d4af37)", color: "#3a2000" }}
              >
                SHOP COFFEE →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          EXPLORE THE COLLECTION — Two banners
      ══════════════════════════════════════════ */}
      <section className="container-rhl section-y">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 gap-2">
          <h2
            className="font-black"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "var(--tc-coffee-charcoal, #4a4a4a)" }}
          >
            Explore the Collection
          </h2>
          <p
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: "var(--tc-gold, #d4af37)" }}
          >
            Traditional Ingredients. Premium Coffee. A Healthier You.
          </p>
        </div>

        {/* Two large collection cards */}
        <div className="grid gap-5 md:grid-cols-2">

          {/* TEA card */}
          <Link
            to="/tea-coffee/tea"
            className="relative overflow-hidden rounded-2xl block group"
            style={{ minHeight: "280px", backgroundColor: "#2d4a1e" }}
            aria-label="Explore Tea collection"
          >
            <img
              src="/chay.png"
              alt="Assorted dried botanical teas, loose leaves and flowers"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ opacity: 0.6 }}
            />
            <div className="relative z-10 p-8 flex flex-col justify-end h-full" style={{ minHeight: "280px" }}>
              <h3
                className="font-black mb-2"
                style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "white" }}
              >
                TEA
              </h3>
              <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.85)", maxWidth: "260px" }}>
                Traditional leaves, flowers, roots and botanical preparations.
              </p>
              <span
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded font-bold text-sm self-start transition-colors group-hover:opacity-90"
                style={{ backgroundColor: "var(--primary, #2e7d32)", color: "white" }}
              >
                EXPLORE TEA →
              </span>
            </div>
          </Link>

          {/* COFFEE card */}
          <Link
            to="/tea-coffee/coffee"
            className="relative overflow-hidden rounded-2xl block group"
            style={{ minHeight: "280px", backgroundColor: "#2a1a0e" }}
            aria-label="Explore Ray's Coffee Collection"
          >
            <img
              src="/cofee.png"
              alt="Ray's coffee beans and a rich brewed coffee cup"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ opacity: 0.55 }}
            />
            <div className="relative z-10 p-8 flex flex-col justify-end h-full" style={{ minHeight: "280px" }}>
              <h3
                className="font-black mb-2 leading-tight"
                style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", color: "white" }}
              >
                RAY'S COFFEE<br />COLLECTION
              </h3>
              <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.85)", maxWidth: "300px" }}>
                Three coffee types. Three preparations.<br />Nine premium selections.
              </p>
              <span
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded font-bold text-sm self-start transition-colors group-hover:opacity-90"
                style={{ backgroundColor: "var(--tc-gold, #d4af37)", color: "#3a2000" }}
              >
                EXPLORE COFFEE →
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ECOSYSTEM LINKS — 5 icon pillars
      ══════════════════════════════════════════ */}
      <section
        className="py-12"
        style={{ backgroundColor: "white", borderTop: "1px solid var(--tc-gold, #d4af37)", borderBottom: "1px solid var(--tc-gold, #d4af37)" }}
      >
        <div className="container-rhl">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {ecosystemLinks.map(({ icon: Icon, label, desc, to }) => (
              <Link
                key={label}
                to={to}
                className="flex flex-col items-center text-center gap-3 group p-4 rounded-xl transition-colors hover:bg-amber-50"
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full border-2 transition-colors group-hover:border-amber-400"
                  style={{ borderColor: "var(--tc-gold, #d4af37)", backgroundColor: "var(--tc-cream, #fdf8f3)" }}
                >
                  <Icon
                    className="h-6 w-6"
                    style={{ color: "var(--tc-coffee-charcoal, #4a4a4a)" }}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ color: "var(--tc-coffee-charcoal, #4a4a4a)" }}>
                    {label}
                  </p>
                  <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "#7a6a5a" }}>
                    {desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          RAY'S COFFEE — 3×3 Structure explainer
      ══════════════════════════════════════════ */}
      <section className="container-rhl section-y">
        <div className="text-center mb-10">
          <p
            className="text-xs font-bold tracking-widest uppercase mb-2"
            style={{ color: "var(--tc-gold, #d4af37)" }}
          >
            Ray's Coffee Collection
          </p>
          <h2
            className="font-black mb-3"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--tc-coffee-charcoal, #4a4a4a)" }}
          >
            Three Types. Three Preparations. Nine Selections.
          </h2>
          <p className="text-sm leading-relaxed mx-auto" style={{ color: "#7a6a5a", maxWidth: "520px" }}>
            One RHL coffee brand — not nine origins. Each type is available in three preparations so you can choose exactly how you brew.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {coffeeTypes.map(({ family, colour, desc, preps }) => (
            <div
              key={family}
              className="rounded-2xl border overflow-hidden"
              style={{ borderColor: "var(--border, #e0e0e0)", backgroundColor: "white" }}
            >
              {/* Colour header strip */}
              <div className="h-2 w-full" style={{ backgroundColor: colour }} />

              <div className="p-6">
                {/* Family badge */}
                <span
                  className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3"
                  style={{ backgroundColor: colour + "20", color: colour, border: `1px solid ${colour}40` }}
                >
                  {family}
                </span>

                <p className="text-sm leading-relaxed mb-5" style={{ color: "#7a6a5a" }}>
                  {desc}
                </p>

                {/* Preparations */}
                <div className="space-y-2">
                  {preps.map((prep) => (
                    <Link
                      key={prep}
                      to="/tea-coffee/coffee"
                      className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-amber-50 group"
                      style={{ border: "1px solid #e8dcc8", color: "var(--tc-coffee-charcoal, #4a4a4a)" }}
                    >
                      <span>{prep}</span>
                      <ChevronRight className="h-4 w-4 opacity-40 group-hover:opacity-100" aria-hidden="true" />
                    </Link>
                  ))}
                </div>

                <Link
                  to="/tea-coffee/coffee"
                  className="mt-5 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider hover:underline"
                  style={{ color: colour }}
                >
                  Shop {family.split(" ")[0]} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PREPARATION GUIDES — quick-link strip
      ══════════════════════════════════════════ */}
      <section
        className="py-10"
        style={{ backgroundColor: "var(--tc-cream, #fdf8f3)", borderTop: "1px solid #e8dcc8" }}
      >
        <div className="container-rhl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
            <h2
              className="font-bold"
              style={{ fontSize: "1.25rem", color: "var(--tc-coffee-charcoal, #4a4a4a)" }}
            >
              Preparation Guides
            </h2>
            <Link
              to="/tea-coffee/articles"
              className="text-sm font-semibold hover:underline"
              style={{ color: "var(--primary, #2e7d32)" }}
            >
              View All Guides →
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Tea Preparation Guide", sub: "Water temperature, steeping times and covering.", to: "/tea-coffee/tea" },
              { title: "Coffee Timing", sub: "When to drink coffee for best effect.", to: "/tea-coffee/coffee" },
              { title: "Understanding Coffee Grinds", sub: "Whole bean vs. ground vs. fine grind.", to: "/tea-coffee/coffee" },
              { title: "Steeping Methods", sub: "French press, infuser, decoction and more.", to: "/tea-coffee/tea" },
              { title: "Coffee & Hydration", sub: "How to stay hydrated alongside your coffee routine.", to: "/tea-coffee/coffee" },
              { title: "Traditional Uses", sub: "Historical and cultural context of botanicals.", to: "/tea-coffee/articles" },
            ].map(({ title, sub, to }) => (
              <Link
                key={title}
                to={to}
                className="flex items-start gap-3 p-4 rounded-xl border bg-white transition-shadow hover:shadow-md group"
                style={{ borderColor: "#e8dcc8" }}
              >
                <BookOpenCheck
                  className="h-5 w-5 shrink-0 mt-0.5"
                  style={{ color: "var(--primary, #2e7d32)" }}
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--tc-coffee-charcoal, #4a4a4a)" }}>
                    {title}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#9a8a7a" }}>{sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          HEALTH CONCERNS bridge
      ══════════════════════════════════════════ */}
      <section className="container-rhl py-12">
        <div
          className="rounded-2xl overflow-hidden grid md:grid-cols-2 gap-0"
          style={{ border: "1px solid #e8dcc8" }}
        >
          {/* Tea concern */}
          <div
            className="p-8 flex flex-col justify-between"
            style={{ backgroundColor: "#f0f7f0" }}
          >
            <div>
              <Leaf className="h-8 w-8 mb-3" style={{ color: "var(--primary, #2e7d32)" }} />
              <h3 className="font-bold text-lg mb-2" style={{ color: "var(--primary, #2e7d32)" }}>
                Tea &amp; Your Health
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#4a6a4a" }}>
                Many traditional botanical teas connect to specific health concerns — digestive support, immune health, calm routines and more. Find which teas align with your wellness goals.
              </p>
            </div>
            <Link
              to="/health-concerns"
              className="mt-5 self-start inline-flex items-center gap-2 px-5 py-2.5 rounded font-bold text-sm transition-colors hover:opacity-90"
              style={{ backgroundColor: "var(--primary, #2e7d32)", color: "white" }}
            >
              Explore Health Concerns →
            </Link>
          </div>

          {/* U20X bridge */}
          <div
            className="p-8 flex flex-col justify-between"
            style={{ background: "linear-gradient(135deg, var(--u20x-navy, #001f3f) 0%, var(--u20x-blue, #0074d9) 100%)", color: "white" }}
          >
            <div>
              <Flame className="h-8 w-8 mb-3" style={{ color: "rgba(255,255,255,0.9)" }} />
              <p className="text-xs font-black tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.7)" }}>
                U20X™ Challenges
              </p>
              <h3 className="font-bold text-lg mb-2">Turn Preparation Into a Daily Practice</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.82)" }}>
                A morning tea or coffee ritual is a habit. U20X™ helps you build it — 20 days at a time — with accountability and real results.
              </p>
            </div>
            <Link
              to="/health-concerns"
              className="mt-5 self-start inline-flex items-center gap-2 px-5 py-2.5 rounded font-bold text-sm transition-colors hover:opacity-90"
              style={{ backgroundColor: "var(--u20x-blue, #0074d9)", color: "white" }}
            >
              Take the Leap →
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DISCLAIMER
      ══════════════════════════════════════════ */}
      <div
        className="container-rhl pb-10"
      >
        <p className="text-xs leading-relaxed text-center" style={{ color: "#9a8a7a" }}>
          Educational information only. Tea and coffee are food-grade botanical products. Nothing on this page diagnoses, treats or replaces advice from your licensed healthcare provider.
          © {new Date().getFullYear()} Ray's Healthy Living®. All rights reserved.
        </p>
      </div>

    </div>
  );
}
