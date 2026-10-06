/**
 * Tea Collection Page — Ray's Healthy Living®
 * Shows all tea products organised by type with filtering.
 * URL: /tea-coffee/tea?type=loose-botanical-leaves etc.
 */
import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { ShoppingCart, Leaf, ChevronRight, Filter } from "lucide-react";
import { useState } from "react";
import { loadTeaCoffeeCatalogFromSeed, getTeaProducts, getTeaByType } from "@/data/tea-coffee/loader";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

const TEA_TYPES = [
  { slug: "all",                       label: "All Teas" },
  { slug: "loose-botanical-leaves",    label: "Loose Botanical Leaves" },
  { slug: "herbal-teas",              label: "Herbal Teas" },
  { slug: "flowers",                   label: "Flowers" },
  { slug: "roots",                     label: "Roots" },
  { slug: "stems-traditional-botanicals", label: "Stems & Traditional Botanicals" },
  { slug: "botanical-powders",         label: "Botanical Powders" },
  { slug: "tea-accessories",           label: "Tea Accessories & Strainers" },
];

export const Route = createFileRoute("/tea-coffee/tea")({
  validateSearch: (search) => ({
    type: typeof search.type === "string" ? search.type : "all",
  }),
  head: () => ({
    meta: [
      { title: "Tea Collection | Ray's Healthy Living®" },
      { name: "description", content: "Shop Ray's Healthy Living® tea collection — loose botanical leaves, herbal teas, flowers, roots, powders and accessories." },
    ],
  }),
  component: TeaCollection,
});

function TeaCollection() {
  const { type } = useSearch({ from: "/tea-coffee/tea" });
  const activeType = type || "all";

  const catalog = loadTeaCoffeeCatalogFromSeed();
  const allTeas = getTeaProducts(catalog);
  const filtered = activeType === "all" ? allTeas : getTeaByType(catalog, activeType);

  const { add } = useCart();

  return (
    <div style={{ backgroundColor: "#faf9f6", minHeight: "100vh" }}>

      {/* ── Hero strip ── */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: "#2d4a1e", minHeight: "220px" }}
      >
        <img
          src="/chay.png"
          alt="Ray's tea collection"
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
              <li style={{ color: "white" }}>Tea Collection</li>
            </ol>
          </nav>
          <div className="flex items-center gap-3 mb-3">
            <Leaf className="h-8 w-8" style={{ color: "#86efac" }} />
            <h1 className="font-black text-white" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}>
              Tea Collection
            </h1>
          </div>
          <p style={{ color: "rgba(255,255,255,0.85)", maxWidth: "500px" }}>
            Traditional leaves, flowers, roots and botanical preparations. {allTeas.length} products.
          </p>
        </div>
      </section>

      <div className="container-rhl py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Sidebar filter ── */}
          <aside className="lg:w-56 shrink-0">
            <div
              className="rounded-2xl border p-5 sticky top-28"
              style={{ backgroundColor: "white", borderColor: "#e8dcc8" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Filter className="h-4 w-4" style={{ color: "var(--primary)" }} />
                <span className="font-bold text-sm" style={{ color: "#2a2a1a" }}>Shop Tea</span>
              </div>
              <nav>
                <ul className="space-y-1">
                  {TEA_TYPES.map((t) => (
                    <li key={t.slug}>
                      <Link
                        to="/tea-coffee/tea"
                        search={{ type: t.slug === "all" ? "" : t.slug }}
                        className="flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors"
                        style={{
                          backgroundColor: activeType === t.slug || (t.slug === "all" && activeType === "all") ? "var(--accent)" : "transparent",
                          color: activeType === t.slug || (t.slug === "all" && activeType === "all") ? "var(--primary)" : "#4a4a3a",
                          fontWeight: activeType === t.slug ? 600 : 400,
                        }}
                      >
                        <span>{t.label}</span>
                        <span
                          className="text-xs rounded-full px-1.5 py-0.5"
                          style={{ backgroundColor: "#f0f0ea", color: "#7a7a6a" }}
                        >
                          {t.slug === "all" ? allTeas.length : getTeaByType(catalog, t.slug).length}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* ── Products grid ── */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm" style={{ color: "#7a7a6a" }}>
                Showing <strong>{filtered.length}</strong>{" "}
                {activeType !== "all" ? TEA_TYPES.find(t => t.slug === activeType)?.label : "products"}
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg font-bold" style={{ color: "#4a4a3a" }}>No products in this category yet.</p>
                <Link to="/tea-coffee/tea" search={{}} className="mt-4 inline-block text-sm font-semibold hover:underline" style={{ color: "var(--primary)" }}>
                  View all teas →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
                {filtered.map((product) => (
                  <article
                    key={product.id}
                    className="flex flex-col overflow-hidden rounded-2xl border bg-white transition-shadow hover:shadow-lg"
                    style={{ borderColor: "#e8dcc8" }}
                  >
                    {/* Image */}
                    <div
                      className="aspect-square w-full overflow-hidden flex items-center justify-center"
                      style={{ backgroundColor: "#f0ede8" }}
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
                        <Leaf className="h-12 w-12 opacity-30" style={{ color: "var(--primary)" }} />
                      )}
                    </div>

                    {/* Card body */}
                    <div className="p-4 flex flex-col flex-1">
                      {/* Tea type badge */}
                      {product.teaType && (
                        <span
                          className="text-xs font-semibold uppercase tracking-wider mb-1"
                          style={{ color: "var(--primary)" }}
                        >
                          {TEA_TYPES.find(t => t.slug === product.teaType)?.label || product.teaType}
                        </span>
                      )}

                      <h3 className="text-sm font-bold leading-snug mb-1" style={{ color: "#1a1a0a" }}>
                        {product.name}
                      </h3>

                      <p className="text-xs leading-relaxed flex-1 mb-3" style={{ color: "#7a6a5a" }}>
                        {product.shortDescription}
                      </p>

                      {/* Size + Price */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs" style={{ color: "#9a8a7a" }}>{product.size}</span>
                        <span className="font-bold text-sm" style={{ color: "#2a2a1a" }}>
                          ${product.price.toFixed(2)}
                        </span>
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
                        {!product.inStock && (
                          <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                            style={{ backgroundColor: "#fee2e2", color: "#991b1b" }}>
                            Out of Stock
                          </span>
                        )}
                      </div>

                    {/* Actions */}
                      <div className="flex gap-2">
                        <Link
                          to="/tea-coffee/products/$slug"
                          params={{ slug: product.slug }}
                          className="flex-1 flex items-center justify-center py-2 rounded-lg text-sm font-bold border-2 transition-colors hover:bg-stone-50"
                          style={{ borderColor: "var(--primary)", color: "var(--primary)" }}
                        >
                          View Details
                        </Link>
                        <button
                          className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-sm font-bold transition-opacity hover:opacity-90 disabled:opacity-40"
                          style={{ backgroundColor: "var(--primary)", color: "white" }}
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
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ── Educational footer ── */}
      <div
        className="mt-8 py-6"
        style={{ backgroundColor: "#f0ede8", borderTop: "1px solid #e8dcc8" }}
      >
        <div className="container-rhl text-center">
          <p className="text-xs" style={{ color: "#9a8a7a" }}>
            Educational information only. Tea products are for food and lifestyle use.
            Nothing here diagnoses, treats or replaces advice from your licensed healthcare provider.
            © {new Date().getFullYear()} Ray's Healthy Living®. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
