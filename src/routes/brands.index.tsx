import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Leaf, Sparkles, Star } from "lucide-react";

export const Route = createFileRoute("/brands/")({
  head: () => ({
    meta: [
      { title: "Our Brands | Ray's Healthy Living" },
      {
        name: "description",
        content:
          "Browse the natural supplement and herbal brands stocked at Ray's Healthy Living, from house-made blends to trusted botanical makers.",
      },
      { property: "og:title", content: "Our Brands | Ray's Healthy Living" },
      { property: "og:description", content: "The natural wellness brands we stock and why we trust them." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BrandsPage,
});

function BrandsPage() {
  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0f172a 0%, #1a2235 50%, #0f1f0f 100%)" }}
    >
      {/* Background decorative blobs */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #f97316, transparent)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #22c55e, transparent)" }}
      />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #2563eb, transparent)" }}
      />

      {/* Floating icons */}
      <Leaf
        className="pointer-events-none absolute top-20 left-16 h-8 w-8 text-green-400 opacity-30 animate-bounce"
        style={{ animationDuration: "3s" }}
      />
      <Star
        className="pointer-events-none absolute top-32 right-24 h-6 w-6 fill-yellow-400 text-yellow-400 opacity-40 animate-bounce"
        style={{ animationDuration: "2.5s", animationDelay: "0.5s" }}
      />
      <Sparkles
        className="pointer-events-none absolute bottom-32 left-20 h-7 w-7 text-orange-400 opacity-30 animate-bounce"
        style={{ animationDuration: "3.5s", animationDelay: "1s" }}
      />
      <Leaf
        className="pointer-events-none absolute bottom-24 right-16 h-5 w-5 text-green-300 opacity-25 animate-bounce"
        style={{ animationDuration: "2.8s", animationDelay: "0.8s" }}
      />

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">

        {/* Badge */}
        <span
          className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest"
          style={{ background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.4)", color: "#f97316" }}
        >
          <Sparkles className="h-3.5 w-3.5" />
          Coming Soon
        </span>

        {/* Heading */}
        <h1 className="mt-8 text-5xl font-black text-white leading-tight md:text-6xl">
          Something{" "}
          <span
            style={{ background: "linear-gradient(90deg, #f97316, #fbbf24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            Beautiful
          </span>
          <br />
          Is Growing Here
        </h1>

        {/* Divider */}
        <div className="mx-auto my-8 h-1 w-20 rounded-full" style={{ background: "linear-gradient(90deg, #f97316, #22c55e)" }} />

        {/* Message */}
        <p className="text-lg text-white/70 leading-relaxed">
          We are carefully hand-picking the finest natural wellness brands — each one vetted for ingredient integrity,
          honest labeling, and a genuine love for what they make.
        </p>
        <p className="mt-4 text-base text-white/50 leading-relaxed">
          Our Brands page is almost ready. We want every name on this list to be one we would recommend to family.
          That takes time, and we think you are worth the wait.
        </p>

        {/* Feature pills */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {[
            { icon: "🌿", label: "Certified Organic" },
            { icon: "🔬", label: "Third-Party Tested" },
            { icon: "🤝", label: "Ethically Sourced" },
            { icon: "⭐", label: "Trusted by Ray" },
          ].map((item) => (
            <span
              key={item.label}
              className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white/80"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <span>{item.icon}</span>
              {item.label}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}
          >
            Shop Our Products
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white/70 transition-colors hover:text-white"
            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        {/* Footer note */}
        <p className="mt-12 text-xs text-white/30">
          Ray's Healthy Living · Prince Frederick, Maryland · Quality you can trust
        </p>
      </div>
    </div>
  );
}
