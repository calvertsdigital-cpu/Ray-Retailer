import { createFileRoute, Link } from "@tanstack/react-router";

import { categories, products } from "@/data/catalog";

export const Route = createFileRoute("/categories/")({
  head: () => ({
    meta: [
      { title: "Shop by Category | Ray's Healthy Living" },
      {
        name: "description",
        content:
          "Browse every Ray's Healthy Living shelf: Irish moss, capsules and tablets, liquid extracts, loose herbs, essential oils, coffee and more.",
      },
      { property: "og:title", content: "Shop by Category | Ray's Healthy Living" },
      { property: "og:description", content: "Every shelf in the Ray's Healthy Living store, in one place." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <div className="container-rhl section-y">
      <p className="eyebrow mb-2">Categories</p>
      <h1 className="heading-1">Shop by category</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Every category is generated from the product catalogue, so new products appear on the right shelf automatically.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => {
          const count = products.filter((p) => p.category === c.slug).length;
          return (
            <Link
              key={c.slug}
              to="/categories/$slug"
              params={{ slug: c.slug }}
              className="group overflow-hidden rounded-xl border border-border bg-card shadow-card transition-shadow hover:shadow-lift"
            >
              <div className="aspect-[4/3] overflow-hidden bg-secondary">
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  width={600}
                  height={450}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-5">
                <h2 className="text-lg font-semibold">{c.name}</h2>
                <p className="mt-1.5 text-sm text-muted-foreground">{c.blurb}</p>
                <p className="mt-3 text-sm font-semibold text-primary">
                  {count} {count === 1 ? "product" : "products"} →
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
