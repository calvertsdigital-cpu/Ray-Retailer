import { createFileRoute, Link } from "@tanstack/react-router";

import { brandSlug, brands, products } from "@/data/catalog";

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
    <div className="container-rhl section-y">
      <p className="eyebrow mb-2">Brands</p>
      <h1 className="heading-1">Makers we trust</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Each brand on our shelves is vetted for ingredient quality, honest labeling and consistent sourcing.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand) => {
          const count = products.filter((p) => p.brand === brand).length;
          return (
            <Link
              key={brand}
              to="/brands/$slug"
              params={{ slug: brandSlug(brand) }}
              className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary"
            >
              <h2 className="text-lg font-semibold">{brand}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {count} {count === 1 ? "product" : "products"}
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-primary">Shop this brand →</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
