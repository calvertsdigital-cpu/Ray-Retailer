/**
 * TeaCoffeeProductCard
 * Reusable card for tea and coffee products.
 * Displays: cover image, name, type badge (or tea type), grind/size, price, actions.
 */

import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import type { TeaCoffeeProduct } from "@/data/tea-coffee/types";
import { getCoverImage, GRIND_LABELS } from "@/lib/tea-coffee-loader";
import { CoffeeFamilyBadge } from "./CoffeeFamilyBadge";

export interface TeaCoffeeProductCardProps {
  product: TeaCoffeeProduct;
  onAddToCart?: (product: TeaCoffeeProduct) => void;
}

export function TeaCoffeeProductCard({ product, onAddToCart }: TeaCoffeeProductCardProps) {
  const coverImage = getCoverImage(product);

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white hover:shadow-lg transition-shadow">
      {/* Image */}
      <Link
        to={`/tea-coffee/products/${product.slug}`}
        className="relative block overflow-hidden bg-gray-100 pb-[75%]"
      >
        <img
          src={coverImage}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Content */}
      <div className="flex flex-col gap-2 p-3">
        {/* Type badge */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            {product.productType === "coffee" && product.coffeeType ? (
              <CoffeeFamilyBadge coffeeType={product.coffeeType} />
            ) : product.productType === "tea" && product.teaType ? (
              <span className="inline-block rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                {product.teaType
                  .split("-")
                  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(" ")}
              </span>
            ) : null}
          </div>
          {product.isBestSeller && (
            <span className="text-[10px] font-bold uppercase text-orange-600 bg-orange-50 px-2 py-1 rounded">
              Best Seller
            </span>
          )}
        </div>

        {/* Name */}
        <Link
          to={`/tea-coffee/products/${product.slug}`}
          className="font-semibold text-gray-900 hover:text-green-700 line-clamp-2"
        >
          {product.name}
        </Link>

        {/* Grind or size info */}
        <p className="text-xs text-gray-600">
          {product.productType === "coffee" && product.grindPreparation
            ? GRIND_LABELS[product.grindPreparation]
            : null}
          {product.size && <span>{product.size}</span>}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-green-700">${product.price.toFixed(2)}</span>
          {product.compareAtPrice && (
            <span className="text-sm text-gray-400 line-through">${product.compareAtPrice.toFixed(2)}</span>
          )}
        </div>

        {/* Stock status */}
        <p className={`text-xs font-medium ${product.inStock ? "text-green-600" : "text-red-600"}`}>
          {product.inStock ? "In Stock" : "Out of Stock"}
        </p>

        {/* Actions */}
        <div className="mt-auto flex gap-2 pt-2">
          <Link
            to={`/tea-coffee/products/${product.slug}`}
            className="flex-1 rounded-md border border-green-600 py-2 text-center text-sm font-medium text-green-600 hover:bg-green-50 transition-colors"
          >
            View Details
          </Link>
          <button
            onClick={() => onAddToCart?.(product)}
            disabled={!product.inStock}
            className="rounded-md bg-green-600 p-2 text-white hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            title="Add to cart"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
