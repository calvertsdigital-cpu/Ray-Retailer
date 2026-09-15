import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { ProductCard } from "@/components/site/ProductCard";
import { getCategory, products } from "@/data/catalog";

export const Route = createFileRoute("/categories/$slug")({
  loader: ({ params }) => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Category unavailable | Ray's Healthy Living" }, { name: "robots", content: "noindex" }] };
    }
    const c = loaderData.category;
    const title = `${c.name} | Ray's Healthy Living`;
    return {
      meta: [
        { title },
        { name: "description", content: c.blurb },
        { property: "og:title", content: title },
        { property: "og:description", content: c.blurb },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const list = products.filter((p) => p.category === category.slug);

  return (
    <div>
      <nav aria-label="Breadcrumb" className="border-b border-border bg-cream">
        <div className="container-rhl flex flex-wrap gap-2 py-3 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <span aria-hidden>/</span>
          <Link to="/categories" className="hover:text-primary">
            Categories
          </Link>
          <span aria-hidden>/</span>
          <span className="text-foreground">{category.name}</span>
        </div>
      </nav>

      <div className="container-rhl section-y">
        <p className="eyebrow mb-2">Category</p>
        <h1 className="heading-1">{category.name}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">{category.blurb}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          {list.length} {list.length === 1 ? "product" : "products"}
        </p>

        {list.length === 0 ? (
          <p className="mt-8 rounded-xl border border-dashed border-border p-12 text-center text-muted-foreground">
            No products on this shelf yet.
          </p>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
