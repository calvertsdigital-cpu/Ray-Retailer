import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { ProductCard } from "@/components/site/ProductCard";
import { getBrandBySlug, products } from "@/data/catalog";

const brandBlurbs: Record<string, string> = {
  "Ray's Healthy Living": "Our own house blends, made in small batches and sold in our stores since day one.",
  "Nature's Field": "Everyday herbal capsules and extracts with clear labelling and consistent sourcing.",
  "Green Harvest Botanicals": "Whole-plant botanicals from growers who publish their harvest practices.",
  "Atlantic Sea Co.": "Cold-water sea moss and marine botanicals harvested along the Atlantic coast.",
};

export const Route = createFileRoute("/brands/$slug")({
  loader: ({ params }) => {
    const brand = getBrandBySlug(params.slug);
    if (!brand) throw notFound();
    return { brand };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Brand unavailable | Ray's Healthy Living" }, { name: "robots", content: "noindex" }] };
    }
    const brand = loaderData.brand;
    const title = `${brand} | Ray's Healthy Living`;
    const description = brandBlurbs[brand] ?? `Products from ${brand}, stocked at Ray's Healthy Living.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: BrandPage,
});

function BrandPage() {
  const { brand } = Route.useLoaderData();
  const list = products.filter((p) => p.brand === brand);

  return (
    <div>
      <nav aria-label="Breadcrumb" className="border-b border-border bg-cream">
        <div className="container-rhl flex flex-wrap gap-2 py-3 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <span aria-hidden>/</span>
          <Link to="/brands" className="hover:text-primary">
            Brands
          </Link>
          <span aria-hidden>/</span>
          <span className="text-foreground">{brand}</span>
        </div>
      </nav>

      <div className="container-rhl section-y">
        <p className="eyebrow mb-2">Brand</p>
        <h1 className="heading-1">{brand}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          {brandBlurbs[brand] ?? `Products from ${brand}, stocked at Ray's Healthy Living.`}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {list.length} {list.length === 1 ? "product" : "products"}
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
