/**
 * Tea & Coffee Product Detail Page — Ray's Healthy Living®
 * Route: /tea-coffee/products/:slug
 * Follows the same layout pattern as /products/:slug
 */
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ShoppingCart, Minus, Plus, Check, Truck, Undo2, Headphones,
  Leaf, Coffee, ChevronRight, BookOpen, Clock, Droplets,
  AlertCircle, ChevronDown, ChevronUp,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/site/StarRating";
import { loadTeaCoffeeCatalogFromSeed, getProductBySlug } from "@/data/tea-coffee/loader";
import { useCart } from "@/lib/cart";

// ── Coffee family colours ───────────────────────────────────────────────────
const FAMILY_COLOUR: Record<string, string> = {
  arabica: "#15803d",
  robusta: "#991b1b",
  culi:    "#d4af37",
};

const FAMILY_LABEL: Record<string, string> = {
  arabica: "Arabica Reserve",
  robusta: "Robusta Intense",
  culi:    "Culi Select — Peaberry",
};

const GRIND_LABEL: Record<string, string> = {
  "whole-bean":           "Whole Bean",
  "medium-ground":        "Medium/Ground",
  "fine-specialty-grind": "Fine/Specialty Grind",
};

const TEA_TYPE_LABEL: Record<string, string> = {
  "loose-botanical-leaves":      "Loose Botanical Leaves",
  "herbal-teas":                 "Herbal Teas",
  "flowers":                     "Flowers",
  "roots":                       "Roots",
  "stems-traditional-botanicals":"Stems & Traditional Botanicals",
  "botanical-powders":           "Botanical Powders",
  "tea-accessories":             "Tea Accessories",
};

// ── Accordion ───────────────────────────────────────────────────────────────
function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #e8dcc8" }}>
      <button
        type="button"
        className="w-full flex items-center justify-between py-4 text-left"
        onClick={() => setOpen(o => !o)}
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <span className="font-semibold text-sm" style={{ color: "#2a2a1a" }}>{title}</span>
        {open
          ? <ChevronUp className="h-4 w-4 shrink-0" style={{ color: "var(--primary)" }} />
          : <ChevronDown className="h-4 w-4 shrink-0" style={{ color: "#9a8a7a" }} />}
      </button>
      {open && (
        <div className="pb-4 text-sm leading-relaxed" style={{ color: "#5a5a4a" }}>
          {children}
        </div>
      )}
    </div>
  );
}

// ── Route ───────────────────────────────────────────────────────────────────
export const Route = createFileRoute("/tea-coffee/products/$slug")({
  loader: ({ params }) => {
    const catalog = loadTeaCoffeeCatalogFromSeed();
    const product = getProductBySlug(catalog, params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Product unavailable | Ray's Healthy Living" }] };
    const p = loaderData.product;
    return {
      meta: [
        { title: p.seoTitle || `${p.name} | Ray's Healthy Living®` },
        { name: "description", content: p.metaDescription || p.shortDescription },
      ],
    };
  },
  component: TeaCoffeeProductPage,
});

function TeaCoffeeProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  const isCoffee = product.productType === "coffee";
  const familyColour = isCoffee ? (FAMILY_COLOUR[product.coffeeType] || "#4a4a3a") : "var(--primary)";

  // Related products from same family/type (same coffee type, or same tea type)
  const catalog = loadTeaCoffeeCatalogFromSeed();
  const related = catalog.products
    .filter(p =>
      p.slug !== product.slug &&
      p.productType === product.productType &&
      (isCoffee ? p.coffeeType === product.coffeeType : p.teaType === product.teaType)
    )
    .slice(0, 3);

  return (
    <div style={{ backgroundColor: "#faf9f6", minHeight: "100vh" }}>

      {/* ── Breadcrumb ── */}
      <nav
        aria-label="Breadcrumb"
        className="border-b"
        style={{ backgroundColor: "var(--cream)", borderColor: "var(--border)" }}
      >
        <div className="container-rhl flex flex-wrap items-center gap-1.5 py-3 text-sm" style={{ color: "var(--muted-foreground)" }}>
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to="/tea-coffee/" className="hover:text-primary">Tea &amp; Coffee</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to={isCoffee ? "/tea-coffee/coffee" : "/tea-coffee/tea"} className="hover:text-primary">
            {isCoffee ? "Coffee Collection" : "Tea Collection"}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span style={{ color: "var(--foreground)" }}>{product.name}</span>
        </div>
      </nav>

      {/* ── Main product area ── */}
      <section className="container-rhl grid gap-10 py-10 lg:grid-cols-[1fr_380px]">

        {/* ── LEFT: Image gallery ── */}
        <div>
          {/* Main image */}
          <div
            className="rounded-2xl overflow-hidden flex items-center justify-center"
            style={{ aspectRatio: "1", backgroundColor: isCoffee ? "#f5f0e8" : "#f0f5f0", border: "1px solid #e8dcc8" }}
          >
            {product.images?.[0] ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-2/3 h-2/3 object-contain"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            ) : isCoffee ? (
              <Coffee className="h-32 w-32 opacity-20" style={{ color: familyColour }} />
            ) : (
              <Leaf className="h-32 w-32 opacity-20" style={{ color: "var(--primary)" }} />
            )}
          </div>

          {/* Thumbnail row if multiple images */}
          {product.images && product.images.length > 1 && (
            <div className="mt-4 flex gap-3">
              {product.images.slice(0, 5).map((src, i) => (
                <div
                  key={i}
                  className="h-16 w-16 rounded-xl overflow-hidden border-2 flex items-center justify-center"
                  style={{ borderColor: i === 0 ? familyColour : "#e8dcc8", backgroundColor: "#f5f0e8" }}
                >
                  <img src={src} alt="" className="w-full h-full object-contain p-1" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── RIGHT: Purchase info ── */}
        <div className="lg:sticky lg:top-24 lg:self-start">

          {/* Coffee family or tea type badge */}
          {isCoffee && product.coffeeType ? (
            <div className="flex items-center gap-2 mb-3">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: familyColour }}
              />
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: familyColour }}>
                {FAMILY_LABEL[product.coffeeType] || product.coffeeType}
              </span>
              {product.grindPreparation && (
                <>
                  <span style={{ color: "#ccc" }}>·</span>
                  <span className="text-xs font-medium" style={{ color: "#7a6a5a" }}>
                    {GRIND_LABEL[product.grindPreparation] || product.grindPreparation}
                  </span>
                </>
              )}
            </div>
          ) : !isCoffee && product.teaType ? (
            <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "var(--primary)" }}>
              {TEA_TYPE_LABEL[product.teaType] || product.teaType}
            </p>
          ) : null}

          <h1 className="heading-1 mb-3" style={{ color: "#1a1a0a" }}>{product.name}</h1>

          {/* Fake star rating */}
          <div className="flex items-center gap-3 mb-4">
            <StarRating rating={4.5} />
            <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>4.5 · 12 reviews</span>
          </div>

          <p className="text-sm leading-relaxed mb-5" style={{ color: "#5a5a4a" }}>
            {product.shortDescription}
          </p>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-5">
            <span className="text-3xl font-bold" style={{ color: "#1a1a0a" }}>
              ${product.price.toFixed(2)}
            </span>
            {product.compareAtPrice && (
              <span className="text-lg line-through" style={{ color: "#b0a090" }}>
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
            <span className="text-sm" style={{ color: "#7a7a6a" }}>{product.size}</span>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-5">
            {product.isBestSeller && (
              <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: "#fef9c3", color: "#92400e" }}>
                Best Seller
              </span>
            )}
            {product.isNewArrival && (
              <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: "#dcfce7", color: "#14532d" }}>
                New Arrival
              </span>
            )}
          </div>

          {/* Qty + Add to Cart */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="flex items-center rounded-lg border" style={{ borderColor: "#e8dcc8" }}>
              <Button variant="ghost" size="icon" onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Decrease quantity">
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-9 text-center text-sm font-semibold" aria-live="polite">{qty}</span>
              <Button variant="ghost" size="icon" onClick={() => setQty(q => q + 1)} aria-label="Increase quantity">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button
              size="lg"
              className="flex-1 h-12 text-base font-bold"
              disabled={!product.inStock}
              style={{ backgroundColor: familyColour, borderColor: familyColour }}
              onClick={() => {
                add(product.slug, qty);
                toast.success(`${product.name} added to cart`);
              }}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>

          <p className="flex items-center gap-1.5 text-sm font-medium mb-5" style={{ color: "var(--primary)" }}>
            <Check className="h-4 w-4" />
            {product.inStock ? "In stock — ships in 1–2 days" : "Currently unavailable"}
          </p>

          {/* Trust band */}
          <ul className="grid grid-cols-3 gap-2 rounded-xl p-3 border mb-5" style={{ backgroundColor: "#f5f0e8", borderColor: "#e8dcc8" }}>
            <li className="flex flex-col items-center text-center gap-1">
              <Truck className="h-4 w-4" style={{ color: familyColour }} />
              <span className="text-xs font-bold" style={{ color: "#2a2a1a" }}>Free Shipping</span>
              <span className="text-[10px]" style={{ color: "#9a8a7a" }}>Orders over $99</span>
            </li>
            <li className="flex flex-col items-center text-center gap-1">
              <Undo2 className="h-4 w-4" style={{ color: familyColour }} />
              <span className="text-xs font-bold" style={{ color: "#2a2a1a" }}>Guarantee</span>
              <span className="text-[10px]" style={{ color: "#9a8a7a" }}>30-day return</span>
            </li>
            <li className="flex flex-col items-center text-center gap-1">
              <Headphones className="h-4 w-4" style={{ color: familyColour }} />
              <span className="text-xs font-bold" style={{ color: "#2a2a1a" }}>Support</span>
              <span className="text-[10px]" style={{ color: "#9a8a7a" }}>We're here 24/7</span>
            </li>
          </ul>

          {/* Product IDs */}
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 rounded-xl border p-4 text-sm" style={{ backgroundColor: "white", borderColor: "#e8dcc8" }}>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider" style={{ color: "#9a8a7a" }}>RHL ID</dt>
              <dd className="font-mono">{product.rhlProductId}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider" style={{ color: "#9a8a7a" }}>Department</dt>
              <dd>Tea &amp; Coffee</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider" style={{ color: "#9a8a7a" }}>Size</dt>
              <dd>{product.size || "—"}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider" style={{ color: "#9a8a7a" }}>Origin</dt>
              <dd>{product.origin || "—"}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ── ABOUT + DETAILS ── */}
      <section className="container-rhl pb-12 max-w-3xl">
        <h2 className="heading-2 mb-5" style={{ color: "#2a2a1a" }}>About {product.name}</h2>
        <p className="text-base leading-relaxed mb-8" style={{ color: "#5a5a4a" }}>
          {product.longDescription || product.shortDescription}
        </p>

        {/* Quick-info chips */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-8">
          {[
            isCoffee
              ? { icon: Coffee, label: "Brewing", val: product.brewingMethod || "See preparation" }
              : { icon: Clock, label: "Steep time", val: product.steepingMethod || "See preparation" },
            { icon: Droplets, label: "Size", val: product.size },
            { icon: BookOpen, label: product.isSample ? "Sample" : "Full size", val: product.flavorProfile || product.botanicalFamily || "—" },
            { icon: Leaf, label: "Origin", val: product.origin || "—" },
          ].map(({ icon: Icon, label, val }) => (
            <div
              key={label}
              className="flex flex-col gap-1 rounded-xl p-4"
              style={{ backgroundColor: "#f5f0e8", border: "1px solid #e8dcc8" }}
            >
              <Icon className="h-5 w-5 mb-1" style={{ color: familyColour }} />
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#9a8a7a" }}>{label}</span>
              <span className="text-sm font-semibold" style={{ color: "#2a2a1a" }}>{val || "—"}</span>
            </div>
          ))}
        </div>

        {/* Accordions */}
        <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "#e8dcc8", backgroundColor: "white" }}>
          {product.preparation && (
            <Accordion title={isCoffee ? "Brewing Instructions" : "Preparation"}>
              <p>{product.preparation}</p>
            </Accordion>
          )}
          {product.ingredientsList && (
            <Accordion title="Ingredients">
              <p>{product.ingredientsList}</p>
            </Accordion>
          )}
          {product.storageInstructions && (
            <Accordion title="Storage">
              <p>{product.storageInstructions}</p>
            </Accordion>
          )}
          {product.caution && (
            <Accordion title="Cautions & Warnings">
              <div className="flex gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" style={{ color: "#b45309" }} />
                <p>{product.caution}</p>
              </div>
            </Accordion>
          )}
          <Accordion title="Health & Educational Disclaimer">
            <p>
              This product is intended for food and lifestyle use only. It is not intended to diagnose, treat, cure, or prevent any disease.
              Always consult a qualified healthcare provider before making changes to your diet or supplement routine.
              © {new Date().getFullYear()} Ray's Healthy Living®. All rights reserved.
            </p>
          </Accordion>
        </div>
      </section>

      {/* ── Related products ── */}
      {related.length > 0 && (
        <section
          className="py-12"
          style={{ backgroundColor: "#f5f0e8", borderTop: "1px solid #e8dcc8" }}
        >
          <div className="container-rhl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-2" style={{ color: "#2a2a1a" }}>
                {isCoffee ? `More ${FAMILY_LABEL[product.coffeeType] || "Coffee"} Selections` : `More ${TEA_TYPE_LABEL[product.teaType] || "Tea"} Products`}
              </h2>
              <Link
                to={isCoffee ? "/tea-coffee/coffee" : "/tea-coffee/tea"}
                className="text-sm font-semibold hover:underline"
                style={{ color: "var(--primary)" }}
              >
                View all →
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to="/tea-coffee/products/$slug"
                  params={{ slug: p.slug }}
                  className="flex flex-col overflow-hidden rounded-2xl border bg-white transition-shadow hover:shadow-lg"
                  style={{ borderColor: "#e8dcc8" }}
                >
                  <div
                    className="aspect-square flex items-center justify-center"
                    style={{ backgroundColor: "#f5f0e8" }}
                  >
                    {p.images?.[0] ? (
                      <img src={p.images[0]} alt={p.name} className="w-2/3 h-2/3 object-contain" />
                    ) : (
                      <Coffee className="h-10 w-10 opacity-20" style={{ color: familyColour }} />
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-bold leading-snug mb-1" style={{ color: "#1a1a0a" }}>{p.name}</p>
                    <p className="text-sm font-bold" style={{ color: "#2a2a1a" }}>${p.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
