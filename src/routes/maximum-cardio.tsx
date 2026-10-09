import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown, ChevronRight, Minus, Plus, Share2, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/maximum-cardio")({
  head: () => ({
    meta: [
      { title: "Maximum Cardio | Ray's Healthy Living" },
      {
        name: "description",
        content:
          "Maximum Cardio is a scientifically formulated supplement designed to optimise heart and cardiovascular health. Boost energy, stamina, mental clarity and immune function.",
      },
      { property: "og:title", content: "Maximum Cardio | Ray's Healthy Living" },
      {
        property: "og:description",
        content:
          "Boost energy, stamina, mental clarity and immune function with Maximum Cardio.",
      },
    ],
  }),
  component: MaximumCardioPage,
});

/* ─── static data ─────────────────────────────────────────── */

const FLAVORS = ["Orange", "Grape", "Peach", "Pina-Colada"] as const;
type Flavor = (typeof FLAVORS)[number];

const BUNDLES = [
  {
    id: 1,
    label: "1 pack",
    sub: "Standard price",
    price: 44.99,
    compareAt: null as number | null,
    savePct: null as number | null,
    badge: null as string | null,
  },
  {
    id: 2,
    label: "2 pack",
    sub: "Save $6.00 · You save 13%",
    price: 83.98,
    compareAt: 89.98,
    savePct: 13,
    badge: "Most Popular",
  },
  {
    id: 3,
    label: "3 pack",
    sub: "Save $11.00 · You save 18%",
    price: 122.97,
    compareAt: 134.97,
    savePct: 18,
    badge: "Best Deal",
  },
] as const;

const CUSTOMER_REVIEWS = [
  {
    id: "r1",
    author: "Pam Loube",
    verified: true,
    date: "06/21/2026",
    title: "Lowers My Blood Pressure!",
    body: "I've been tracking my blood pressure daily and it has really made a significant difference! My systolic has gone from the 140s, 150s, and even 160s! to the 120s, 130s, and an occasionally 140s. The diastolic has also gone down from the mid 90s to the low 80s. Plus I love the grape flavor and it's easy to drink.",
    rating: 5,
  },
  {
    id: "r2",
    author: "Cheryl Jones",
    verified: true,
    date: "11/03/2025",
    title: "Really gives me energy",
    body: "Really gives me energy",
    rating: 5,
  },
  {
    id: "r3",
    author: "D.H.",
    verified: true,
    date: "07/11/2025",
    title: "Excellent",
    body: "Excellent",
    source: "Review written in-store app",
    rating: 5,
  },
  {
    id: "r4",
    author: "Roxie Rivera",
    verified: false,
    date: "01/29/2025",
    title: "Very knowledgeable!",
    body: "Very knowledgeable!",
    rating: 5,
  },
  {
    id: "r5",
    author: "Savannah Brock",
    verified: false,
    date: "01/29/2025",
    title: "",
    body: "The sweetest man! Helped me find prenatals for my specific needs and a detox for my daughter! Even threw in some free stuff for me to try 🎁 definitely coming back for all my needs!",
    rating: 5,
  },
];

const TOTAL_REVIEWS = 53;
const AVG_RATING = 4.85;

const RATING_DIST = [
  { stars: 5, count: 51 },
  { stars: 4, count: 0 },
  { stars: 3, count: 0 },
  { stars: 2, count: 1 },
  { stars: 1, count: 1 },
];

/* ─── helpers ─────────────────────────────────────────────── */

function StarRow({ rating, size = 4 }: { rating: number; size?: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`h-${size} w-${size} ${s <= Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </span>
  );
}

/* ─── page ─────────────────────────────────────────────────── */

function MaximumCardioPage() {
  const { add } = useCart();
  const [flavor, setFlavor] = useState<Flavor>("Peach");
  const [bundleId, setBundleId] = useState<number>(1);
  const [qty, setQty] = useState(1);
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  const [descOpen, setDescOpen] = useState(true);

  const bundle = BUNDLES.find((b) => b.id === bundleId) ?? BUNDLES[0];

  return (
    <div className="bg-white min-h-screen">
      {/* ── Breadcrumb ── */}
      <nav className="border-b border-gray-200 bg-gray-50 text-xs text-gray-500">
        <div className="container-rhl flex gap-2 py-3 flex-wrap">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-3.5 w-3.5 mt-0.5" />
          <span>Bundle</span>
          <ChevronRight className="h-3.5 w-3.5 mt-0.5" />
          <span className="text-gray-800 font-medium">Maximum Cardio</span>
        </div>
      </nav>

      <div className="container-rhl py-8">
        <div className="grid gap-10 lg:grid-cols-[auto_420px]">

          {/* ── LEFT — image gallery ── */}
          <div className="flex gap-4">
            {/* Thumbnail rail */}
            <div className="flex flex-col gap-2 w-16 shrink-0">
              {["/image.png", "/image.png", "/image.png", "/image.png"].map((src, i) => (
                <button
                  key={i}
                  className={`aspect-square rounded-lg border-2 overflow-hidden bg-gray-50 transition-colors ${
                    i === 0 ? "border-gray-800" : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <img src={src} alt={`Maximum Cardio view ${i + 1}`} className="w-full h-full object-contain p-1" />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="flex-1 aspect-square rounded-xl border border-gray-200 bg-gray-50 overflow-hidden max-w-md">
              <img
                src="/image.png"
                alt="Maximum Cardio — Ray's Healthy Living"
                className="w-full h-full object-contain p-6"
              />
            </div>
          </div>

          {/* ── RIGHT — product info ── */}
          <div>
            {/* Title & price */}
            <h1 className="text-2xl font-bold text-gray-900">Maximum Cardio</h1>

            <div className="mt-2 flex items-baseline gap-3">
              <span className="text-2xl font-bold text-red-600">${bundle.price.toFixed(2)}</span>
              {bundle.compareAt && (
                <span className="text-sm text-gray-400 line-through">${bundle.compareAt.toFixed(2)}</span>
              )}
            </div>

            {/* Shop Pay instalment note */}
            <p className="mt-1 text-xs text-gray-500">
              Pay in 2 interest-free installments of ${(bundle.price / 2).toFixed(2)} with{" "}
              <span className="font-semibold text-indigo-600">shop</span>
              <span className="font-semibold text-indigo-400">Pay</span>
              <span className="ml-1 text-indigo-500 underline cursor-pointer">ⓘ</span>
            </p>

            {/* Flavor selector */}
            <div className="mt-5">
              <p className="text-sm font-semibold text-gray-700">
                Flavor: <span className="font-normal">{flavor}</span>
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {FLAVORS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFlavor(f)}
                    className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                      f === flavor
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-300 text-gray-600 hover:border-gray-500"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Bundle & Save */}
            <div className="mt-5">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Bundle & Save</p>
              <div className="flex flex-col gap-2">
                {BUNDLES.map((b) => (
                  <label
                    key={b.id}
                    className={`relative flex items-center gap-3 rounded-xl border-2 cursor-pointer px-4 py-3 transition-all ${
                      b.id === bundleId
                        ? "border-gray-800 bg-gray-50"
                        : "border-gray-200 hover:border-gray-400 bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name="bundle"
                      className="accent-gray-800"
                      checked={b.id === bundleId}
                      onChange={() => setBundleId(b.id)}
                    />
                    <div className="flex-1 min-w-0">
                      <span className="font-semibold text-sm text-gray-800">{b.label}</span>
                      {b.savePct && (
                        <span className="ml-2 text-xs text-green-600 font-medium">Save {b.savePct}%</span>
                      )}
                      <p className="text-xs text-gray-500 mt-0.5">{b.sub}</p>
                      {b.id === 3 && (
                        <div className="mt-2 flex flex-col gap-1">
                          {[1, 2, 3].map((n) => (
                            <div key={n} className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">x{n}</span>
                              <div className="relative">
                                <select
                                  className="appearance-none rounded-lg border border-gray-300 bg-white pl-3 pr-7 py-1 text-xs text-gray-700 focus:outline-none focus:border-green-500"
                                  defaultValue={flavor}
                                >
                                  {FLAVORS.map((f) => (
                                    <option key={f}>{f}</option>
                                  ))}
                                </select>
                                <ChevronDown className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400" />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="shrink-0 font-bold text-gray-900">${b.price.toFixed(2)}</span>
                    {b.badge && (
                      <span
                        className={`absolute -top-2.5 right-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase text-white ${
                          b.badge === "Most Popular" ? "bg-gray-800" : "bg-orange-500"
                        }`}
                      >
                        {b.badge}
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Out of stock notice */}
            <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-xs text-red-700">
              There is not enough items in our stock, please select smaller bundle.
            </div>

            {/* Quantity + Add to Cart */}
            <div className="mt-5">
              <p className="text-sm font-semibold text-gray-700 mb-2">Quantity</p>
              <div className="flex items-center gap-3">
                {/* Qty stepper */}
                <div className="flex items-center rounded-lg border border-gray-300 overflow-hidden">
                  <button
                    aria-label="Decrease"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-semibold">{qty}</span>
                  <button
                    aria-label="Increase"
                    onClick={() => setQty((q) => q + 1)}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* Add to cart */}
                <button
                  onClick={() => {
                    add("maximum-cardio-circulation-formula", qty);
                    toast.success("Maximum Cardio added to cart");
                  }}
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-gray-900 py-3 text-sm font-bold text-white uppercase tracking-wide transition-opacity hover:opacity-90"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </button>
              </div>

              {/* Buy with Shop */}
              <button className="mt-2 w-full rounded-lg py-3 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
                Buy with <span className="font-black">shop</span>Pay
              </button>

              <button className="mt-1.5 w-full text-xs text-indigo-600 hover:underline">
                More payment options
              </button>
            </div>

            {/* Ask a question / Share */}
            <div className="mt-4 flex items-center gap-6 text-sm text-gray-500">
              <button className="flex items-center gap-1.5 hover:text-gray-800 transition-colors">
                <span className="text-base">💬</span> Ask a question
              </button>
              <button className="flex items-center gap-1.5 hover:text-gray-800 transition-colors">
                <Share2 className="h-4 w-4" /> Share
              </button>
            </div>

            {/* Disclaimer accordion */}
            <div className="mt-4 border-t border-gray-200 pt-3">
              <button
                onClick={() => setDisclaimerOpen((o) => !o)}
                className="flex w-full items-center justify-between text-sm font-medium text-gray-700"
              >
                Disclaimer
                <ChevronDown className={`h-4 w-4 transition-transform ${disclaimerOpen ? "rotate-180" : ""}`} />
              </button>
              {disclaimerOpen && (
                <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                  These statements have not been evaluated by the Food and Drug Administration. This product is not
                  intended to diagnose, treat, cure, or prevent any disease. Always consult your healthcare provider
                  before starting any new supplement, especially if you are pregnant, nursing, taking medication, or
                  have a medical condition.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ── Product Description ── */}
        <div className="mt-10 border-t border-gray-200 pt-6 max-w-3xl">
          <button
            onClick={() => setDescOpen((o) => !o)}
            className="flex items-center gap-2 text-sm font-semibold text-gray-800 hover:text-primary transition-colors"
          >
            <ChevronDown className={`h-4 w-4 transition-transform ${descOpen ? "rotate-180" : ""}`} />
            Product description
          </button>
          {descOpen && (
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              MaximumCardio is a scientifically formulated supplement designed to optimize heart and cardiovascular
              health. It helps improve circulation, enhance stamina, and support overall well-being. With carefully
              selected ingredients, this formula promotes energy levels, mental clarity, and immune function, making it
              an essential addition to a healthy lifestyle. Smooth and delicious in grape flavor, it's crafted for those
              who prioritize heart health and vitality.
            </p>
          )}
        </div>

        {/* ── Customer Reviews ── */}
        <div className="mt-12 border-t border-gray-200 pt-8 max-w-3xl">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Customer Reviews</h2>

          {/* Summary row */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-6 pb-6 border-b border-gray-200">
            {/* Left: aggregate */}
            <div className="shrink-0">
              <div className="flex items-center gap-2">
                <StarRow rating={AVG_RATING} size={5} />
                <span className="text-sm font-semibold text-gray-800">{AVG_RATING} out of 5</span>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Based on {TOTAL_REVIEWS} reviews{" "}
                <span className="inline-flex items-center gap-0.5 text-green-600 font-medium">✓</span>
              </p>
            </div>

            {/* Middle: bar chart */}
            <div className="flex-1 flex flex-col gap-1">
              {RATING_DIST.map((d) => (
                <div key={d.stars} className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="w-6 text-right">{d.stars}★</span>
                  <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-yellow-400"
                      style={{ width: `${(d.count / TOTAL_REVIEWS) * 100}%` }}
                    />
                  </div>
                  <span className="w-4 text-left">{d.count}</span>
                </div>
              ))}
            </div>

            {/* Right: CTA */}
            <div className="shrink-0">
              <button className="rounded-lg border-2 border-gray-800 px-5 py-2.5 text-sm font-bold text-gray-800 hover:bg-gray-100 transition-colors">
                Write a review
              </button>
            </div>
          </div>

          {/* Sort */}
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
            <span>Most recent</span>
            <ChevronDown className="h-4 w-4" />
          </div>

          {/* Review list */}
          <div className="mt-4 divide-y divide-gray-100">
            {CUSTOMER_REVIEWS.map((r) => (
              <div key={r.id} className="py-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                      {r.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                        {r.author}
                        {r.verified && (
                          <span className="inline-flex items-center gap-0.5 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700">
                            ✓ Verified
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 text-xs text-gray-400">{r.date}</span>
                </div>

                <div className="mt-2">
                  <StarRow rating={r.rating} size={4} />
                  {r.title && <p className="mt-1 text-sm font-semibold text-gray-800">{r.title}</p>}
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed">{r.body}</p>
                  {r.source && <p className="mt-1 text-xs text-gray-400">{r.source}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
