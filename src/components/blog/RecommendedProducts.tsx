/**
 * RecommendedProducts — full-width product strip below the article body.
 * Uses self-contained RecommendedProductEntry[] from the article data so
 * images and benefit copy are always article-specific (no catalog fallback).
 *
 * Matches the mockup: light grey background band, 3-column cards, each with
 * a square product image, name, benefit line, and "Learn More →" link.
 */
import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";

import type { RecommendedProductEntry } from "@/data/blog";

interface RecommendedProductsProps {
  products: RecommendedProductEntry[];
  categoryLabel?: string;
}

export function RecommendedProducts({ products, categoryLabel }: RecommendedProductsProps) {
  if (!products || products.length === 0) return null;

  return (
    <section
      className="mt-12 -mx-4 px-4 py-8 md:-mx-8 md:px-8"
      style={{ backgroundColor: "var(--secondary)" }}
      aria-labelledby="recommended-products-heading"
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-6 container-rhl px-0">
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" style={{ color: "var(--primary)" }} aria-hidden="true" />
          <h2
            id="recommended-products-heading"
            className="heading-2"
            style={{ color: "var(--foreground)" }}
          >
            Recommended Products
          </h2>
        </div>
        {categoryLabel && (
          <Link
            to="/shop"
            className="text-sm font-semibold hover:underline hidden sm:inline"
            style={{ color: "var(--primary)" }}
          >
            View All {categoryLabel} Products →
          </Link>
        )}
      </div>

      {/* Product cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
        {products.map((p) => (
          <div
            key={p.name}
            className="flex flex-col rounded-xl border bg-white overflow-hidden"
            style={{ borderColor: "var(--border)" }}
          >
            {/* Product image */}
            <div className="aspect-square w-full overflow-hidden bg-gray-50">
              <img
                loading="lazy"
                src={p.imageUrl}
                alt={p.imageAlt}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                width={240}
                height={240}
              />
            </div>

            {/* Card body */}
            <div className="p-4 flex flex-col flex-1">
              <p
                className="text-sm font-semibold leading-snug"
                style={{ color: "var(--foreground)" }}
              >
                {p.name}
              </p>
              <p
                className="mt-1 text-xs leading-relaxed"
                style={{ color: "var(--muted-foreground)" }}
              >
                {p.benefit}
              </p>
              <div className="mt-auto pt-3">
                <Link
                  to={p.linkTo as "/shop"}
                  className="text-sm font-semibold hover:underline"
                  style={{ color: "var(--primary)" }}
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile "View All" */}
      {categoryLabel && (
        <div className="mt-4 sm:hidden text-center">
          <Link
            to="/shop"
            className="text-sm font-semibold hover:underline"
            style={{ color: "var(--primary)" }}
          >
            View All {categoryLabel} Products →
          </Link>
        </div>
      )}
    </section>
  );
}
