import { Link } from "@tanstack/react-router";

import { getProducts } from "@/data/catalog";

interface RecommendedProductsProps {
  productSlugs: string[];
  categoryLabel?: string;
}

export function RecommendedProducts({ productSlugs, categoryLabel }: RecommendedProductsProps) {
  const products = getProducts(productSlugs);

  if (products.length === 0) return null;

  return (
    <section className="mt-12" aria-labelledby="recommended-products-heading">
      <div className="flex items-center justify-between mb-4">
        <h2 id="recommended-products-heading" className="heading-2">
          Recommended Products
        </h2>
        {categoryLabel && (
          <Link to="/products" className="text-sm text-primary hover:underline font-semibold">
            View All {categoryLabel} Products →
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 overflow-x-auto">
        {products.map((product) => (
          <div
            key={product.slug}
            className="rounded-xl border border-border bg-card p-4 flex flex-col"
          >
            {/* Product image */}
            <div className="mb-3 h-20 w-20 mx-auto overflow-hidden rounded-lg bg-secondary">
              {product.media && product.media.length > 0 ? (
                <img
                  loading="lazy"
                  src={typeof product.media[0].src === "string" ? product.media[0].src : ""}
                  alt={product.media[0].alt}
                  className="h-full w-full object-cover"
                  width={80}
                  height={80}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                  {product.name[0]}
                </div>
              )}
            </div>

            {/* Product name */}
            <p className="text-sm font-semibold text-foreground line-clamp-2 leading-snug">
              {product.name}
            </p>

            {/* Support statement */}
            {product.supportStatement && (
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                {product.supportStatement}
              </p>
            )}

            <div className="mt-auto pt-3">
              <Link
                to="/products/$slug"
                params={{ slug: product.slug }}
                className="text-sm font-semibold text-primary hover:underline"
              >
                Learn More →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {categoryLabel && (
        <div className="mt-4 lg:hidden">
          <Link to="/products" className="text-sm text-primary hover:underline font-semibold">
            View All {categoryLabel} Products →
          </Link>
        </div>
      )}
    </section>
  );
}
