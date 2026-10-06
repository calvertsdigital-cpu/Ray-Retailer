/**
 * Coffee Collection Page — Ray's Healthy Living®
 * Shows all 9 coffee selections in the 3×3 structure.
 * URL: /tea-coffee/coffee?type=arabica|robusta|culi&grind=whole-bean|...
 */
import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { ShoppingCart, Coffee, ChevronRight, Filter } from "lucide-react";
import { loadTeaCoffeeCatalogFromSeed, getCoffeeProducts, getCoffeeByType, getCoffeeByGrind } from "@/data/tea-coffee/loader";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

const COFFEE_TYPES = [
  { slug: "all",     label: "All Selections", colour: "#4a4a3a" },
  { slug: "arabica", label: "Arabica Reserve", colour: "#15803d" },
  { slug: "robusta", label: "Robusta Intense", colour: "#991b1b" },
  { slug: "culi",    label: "Culi Select — Peaberry", colour: "#d4af37" },
];

const GRIND_TYPES = [
  { slug: "all",                   label: "All Preparations" },
  { slug: "whole-bean",            label: "Whole Bean" },
  { slug: "medium-ground",         label: "Medium/Ground" },
  { slug: "fine-specialty-grind",  label: "Fine/Specialty Grind" },
];

const FAMILY_COLOUR: Record<string, string> = {
  arabica: "#15803d",
  robusta: "#991b1b",
  culi:    "#d4af37",
};

export const Route = createFileRoute("/tea-coffee/coffee")({
  validateSearch: (search) => ({
    type:  typeof search.type  === "string" ? search.type  : "all",
    grind: typeof search.grind === "string" ? search.grind : "all",
  }),
  head: () => ({
    meta: [
      { title: "Coffee Collection | Ray's Healthy Living®" },
      { name: "description", content: "Shop Ray's Coffee Collection — three coffee types (Arabica, Robusta, Culi Peaberry) each in three preparations. Nine premium selections." },
    ],
  }),
  component: CoffeeCollection,
});

function CoffeeCollection() {
  const { type, grind } = useSearch({ from: "/tea-coffee/coffee" });
  const activeType  = type  || "all";
  const activeGrind = grind || "all";

  const catalog     = loadTeaCoffeeCatalogFromSeed();
  const allCoffees  = getCoffeeProducts(catalog);

  // Apply both filters
  let filtered = allCoffees;
  if (activeType  !== "all") filtered = filtered.filter(p => p.coffeeType === activeType);
  if (activeGrind !== "all") filtered = filtered.filter(p => p.grindPreparation === activeGrind);

  const { add } = useCart();

  return (
    <div style={{ backgroundColor: "#faf9f6", minHeight: "100vh" }}>

      {/* ── Hero strip ── */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: "#2a1a0e", minHeight: "220px" }}
      >
        <img
          src="/cofee.png"
          alt="Ray's coffee collection"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.45 }}
        />
        <div className="container-rhl relative z-10 py-14 flex flex-col justify-center" style={{ minHeight: "220px" }}>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-1 text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
              <li><Link to="/" style={{ color: "rgba(255,255,255,0.7)" }} className="hover:text-white">Home</Link></li>
              <li><ChevronRight className="h-3 w-3" /></li>
              <li><Link to="/tea-coffee/" style={{ color: "rgba(255,255,255,0.7)" }} className="hover:text-white">Tea &amp; Coffee</Link></li>
              <li><ChevronRight className="h-3 w-3" /></li>
              <li style={{ color: "white" }}>Coffee Collection</li>
            </ol>
          </nav>
          <div className="flex items-center gap-3 mb-3">
            <Coffee className="h-8 w-8" style={{ color: "#d4af37" }} />
            <h1 className="font-black text-white" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}>
              Ray's Coffee Collection
            </h1>
          </div>
          <p style={{ color: "rgba(255,255,255,0.85)", maxWidth: "520px" }}>
            Three coffee types. Three preparations. Nine premium selections.
            One RHL coffee brand — not nine origins.
          </p>
        </div>
      </section>

      <div className="container-rhl py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Sidebar filter ── */}
          <aside className="lg:w-56 shrink-0">
            <div
              className="rounded-2xl border p-5 sticky top-28 space-y-6"
              style={{ backgroundColor: "white", borderColor: "#e8dcc8" }}
            >
              {/* Coffee Type filter */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Filter className="h-4 w-4" style={{ color: "var(--primary)" }} />
                  <span className="font-bold text-sm" style={{ color: "#2a2a1a" }}>Coffee Type</span>
                </div>
                <ul className="space-y-1">
                  {COFFEE_TYPES.map((t) => (
                    <li key={t.slug}>
                      <Link
                        to="/tea-coffee/coffee"
                        search={{ type: t.slug === "all" ? "" : t.slug, grind: activeGrind === "all" ? "" : activeGrind }}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors"
                        style={{
                          backgroundColor: activeType === t.slug ? `${t.colour}18` : "transparent",
                          color: activeType === t.slug ? t.colour : "#4a4a3a",
                          fontWeight: activeType === t.slug ? 700 : 400,
                          border: activeType === t.slug ? `1px solid ${t.colour}40` : "1px solid transparent",
                        }}
                      >
                        {t.slug !== "all" && (
                          <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: t.colour }} />
                        )}
                        <span>{t.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Grind/Preparation filter */}
              <div>
                <p className="font-bold text-sm mb-3" style={{ color: "#2a2a1a" }}>Preparation</p>
                <ul className="space-y-1">
                  {GRIND_TYPES.map((g) => (
                    <li key={g.slug}>
                      <Link
                        to="/tea-coffee/coffee"
                        search={{ type: activeType === "all" ? "" : activeType, grind: g.slug === "all" ? "" : g.slug }}
                        className="flex items-center px-3 py-2 rounded-lg text-sm transition-colors"
                        style={{
                          backgroundColor: activeGrind === g.slug ? "var(--accent)" : "transparent",
                          color: activeGrind === g.slug ? "var(--primary)" : "#4a4a3a",
                          fontWeight: activeGrind === g.slug ? 600 : 400,
                        }}
                      >
                        {g.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* ── Products grid ── */}
          <main className="flex-1">
            {/* 3×3 legend */}
            {activeType === "all" && activeGrind === "all" && (
              <div
                className="rounded-xl p-4 mb-6 flex flex-wrap gap-4"
                style={{ backgroundColor: "#f5f0e8", border: "1px solid #e8dcc8" }}
              >
                {COFFEE_TYPES.filter(t => t.slug !== "all").map(t => (
                  <Link
                    key={t.slug}
                    to="/tea-coffee/coffee"
                    search={{ type: t.slug, grind: "" }}
                    className="flex items-center gap-2 text-sm font-semibold hover:underline"
                    style={{ color: t.colour }}
                  >
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: t.colour }} />
                    {t.label}
                  </Link>
                ))}
                <span className="text-xs self-center" style={{ color: "#9a8a7a" }}>
                  — 9 selections total
                </span>
              </div>
            )}

            <div className="flex items-center justify-between mb-6">
              <p className="text-sm" style={{ color: "#7a7a6a" }}>
                Showing <strong>{filtered.length}</strong> coffee selection{filtered.length !== 1 ? "s" : ""}
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg font-bold" style={{ color: "#4a4a3a" }}>No products match this filter.</p>
                <Link to="/tea-coffee/coffee" search={{}} className="mt-4 inline-block text-sm font-semibold hover:underline" style={{ color: "var(--primary)" }}>
                  View all coffees →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-3">
                {filtered.map((product) => {
                  const familyColour = FAMILY_COLOUR[product.coffeeType] || "#4a4a3a";
                  return (
                    <article
                      key={product.id}
                      className="flex flex-col overflow-hidden rounded-2xl border bg-white transition-shadow hover:shadow-lg"
                      style={{ borderColor: "#e8dcc8", borderTop: `3px solid ${familyColour}` }}
                    >
                      {/* Image */}
                      <div
                        className="aspect-square w-full flex items-center justify-center"
                        style={{ backgroundColor: "#f5f0e8" }}
                      >
                        {product.images?.[0] ? (
                          <img
                            loading="lazy"
                            src={product.images[0]}
                            alt={product.name}
                            className="w-3/4 h-3/4 object-contain"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                          />
                        ) : (
                          <Coffee className="h-12 w-12 opacity-30" style={{ color: familyColour }} />
                        )}
                      </div>

                      {/* Card body */}
                      <div className="p-4 flex flex-col flex-1">
                        {/* Family + Grind badges */}
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {product.coffeeType && (
                            <span
                              className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                              style={{ backgroundColor: `${familyColour}18`, color: familyColour, border: `1px solid ${familyColour}30` }}
                            >
                              {product.coffeeType === "culi" ? "Culi" : product.coffeeType.charAt(0).toUpperCase() + product.coffeeType.slice(1)}
                            </span>
                          )}
                          {product.grindPreparation && (
                            <span
                              className="text-xs font-medium px-2 py-0.5 rounded-full"
                              style={{ backgroundColor: "#f5f0e8", color: "#7a6a5a" }}
                            >
                              {product.grindPreparation === "whole-bean" ? "Whole Bean"
                                : product.grindPreparation === "medium-ground" ? "Medium/Ground"
                                : "Fine/Specialty"}
                            </span>
                          )}
                        </div>

                        <h3 className="text-sm font-bold leading-snug mb-1" style={{ color: "#1a1a0a" }}>
                          {product.name}
                        </h3>

                        <p className="text-xs leading-relaxed flex-1 mb-2" style={{ color: "#7a6a5a" }}>
                          {product.shortDescription}
                        </p>

                        {product.flavorProfile && (
                          <p className="text-xs italic mb-3" style={{ color: "#9a8a7a" }}>
                            {product.flavorProfile}
                          </p>
                        )}

                        {/* Size + Price */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs" style={{ color: "#9a8a7a" }}>{product.size}</span>
                          <div className="text-right">
                            <span className="font-bold text-sm" style={{ color: "#2a2a1a" }}>
                              ${product.price.toFixed(2)}
                            </span>
                            {product.compareAtPrice && (
                              <span className="block text-xs line-through" style={{ color: "#b0a090" }}>
                                ${product.compareAtPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {product.isBestSeller && (
                            <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                              style={{ backgroundColor: "#fef9c3", color: "#92400e" }}>
                              Best Seller
                            </span>
                          )}
                          {product.isNewArrival && (
                            <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                              style={{ backgroundColor: "#dcfce7", color: "#14532d" }}>
                              New
                            </span>
                          )}
                        </div>

                        {/* Add to Cart */}
                        <div className="flex gap-2">
                          <Link
                            to="/tea-coffee/products/$slug"
                            params={{ slug: product.slug }}
                            className="flex-1 flex items-center justify-center py-2 rounded-lg text-sm font-bold border-2 transition-colors hover:bg-stone-50"
                            style={{ borderColor: familyColour, color: familyColour }}
                          >
                            View Details
                          </Link>
                          <button
                            className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-sm font-bold transition-opacity hover:opacity-90 disabled:opacity-40"
                            style={{ backgroundColor: familyColour, color: "white" }}
                            disabled={!product.inStock}
                            onClick={() => {
                              add(product.slug, 1);
                              toast.success(`${product.name} added to cart`);
                            }}
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>

      <div className="py-6" style={{ backgroundColor: "#f5f0e8", borderTop: "1px solid #e8dcc8" }}>
        <div className="container-rhl text-center">
          <p className="text-xs" style={{ color: "#9a8a7a" }}>
            Contains caffeine. Not recommended for children. Consult a healthcare professional if pregnant or sensitive to caffeine.
            © {new Date().getFullYear()} Ray's Healthy Living®. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
