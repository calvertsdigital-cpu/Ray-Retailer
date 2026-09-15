import { Link } from "@tanstack/react-router";
import { Heart, Plus } from "lucide-react";
import { toast } from "sonner";

import { StarRating } from "./StarRating";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/types";

/**
 * Shared product card. Product prices are intentionally NOT displayed
 * anywhere on the storefront — pricing lives in the data model only.
 */
export function ProductCard({
  product,
  note,
  className,
}: {
  product: Product;
  /** Optional concern-specific support statement override. */
  note?: string;
  className?: string;
}) {
  const { add } = useCart();
  const cover = product.media.find((m) => m.type === "image");

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-shadow hover:shadow-lift",
        className,
      )}
    >
      <div className="relative">
        <Link
          to="/products/$slug"
          params={{ slug: product.slug }}
          className="block aspect-square overflow-hidden bg-secondary"
        >
          <img
            src={cover?.src}
            alt={cover?.alt ?? product.name}
            loading="lazy"
            width={600}
            height={600}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </Link>
        <button
          type="button"
          aria-label={`Save ${product.name} to your wishlist`}
          onClick={() => toast.success("Saved to your wishlist")}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 text-foreground shadow-card transition-colors hover:text-primary"
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{product.brand}</p>
        <h3 className="text-base font-semibold leading-snug">
          <Link to="/products/$slug" params={{ slug: product.slug }} className="hover:text-primary">
            {product.name}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{note ?? product.supportStatement}</p>
        <p className="font-mono text-[11px] text-muted-foreground">
          RHL ID {product.sku}
          {product.upc ? ` · UPC ${product.upc}` : ""}
        </p>
        <div className="mt-1">
          <StarRating rating={product.rating} count={product.reviewCount} showValue={false} />
        </div>

        <div className="mt-auto flex items-center gap-2 pt-3">
          <Button asChild variant="outline" size="sm" className="flex-1">
            <Link to="/products/$slug" params={{ slug: product.slug }}>
              View product
            </Link>
          </Button>
          <Button
            size="sm"
            aria-label={`Add ${product.name} to cart`}
            onClick={() => {
              add(product.slug, 1);
              toast.success(`${product.name} added to cart`);
            }}
          >
            <Plus className="h-4 w-4" /> Add
          </Button>
        </div>
      </div>
    </article>
  );
}
