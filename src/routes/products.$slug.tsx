import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BadgeCheck, Check, Headphones, Leaf, Minus, Plus, ShoppingCart, Sparkles, Truck, Undo2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AdditionalInfoAccordion } from "@/components/product/AdditionalInfoAccordion";
import { ProductMediaGallery } from "@/components/product/ProductMedia";
import { ProductCard } from "@/components/site/ProductCard";
import { StarRating } from "@/components/site/StarRating";
import { Button } from "@/components/ui/button";
import { getProduct, products } from "@/data/catalog";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product unavailable | Ray's Healthy Living" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.product;
    return {
      meta: [
        { title: p.seoTitle },
        { name: "description", content: p.metaDescription },
        { property: "og:title", content: p.seoTitle },
        { property: "og:description", content: p.metaDescription },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [variantId, setVariantId] = useState(product.variants?.[0]?.id);
  const [qty, setQty] = useState(1);

  const variant = product.variants?.find((v) => v.id === variantId);
  
  const video = product.media.find((m) => m.type === "video" && m.published);
  const related = product.relatedSlugs
    .map((s) => products.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="pb-16">
      <nav aria-label="Breadcrumb" className="border-b border-border bg-cream">
        <div className="container-rhl flex flex-wrap gap-2 py-3 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <span aria-hidden>/</span>
          <Link to="/shop" className="hover:text-primary">
            Shop
          </Link>
          <span aria-hidden>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>
      </nav>

      {/* ===== TOP PRODUCT AREA — exactly three columns on desktop ===== */}
      <section className="container-rhl grid gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* Columns 1 + 2: thumbnail rail and active media */}
        <ProductMediaGallery media={product.media} productName={product.name} />

        {/* Column 3: purchasing information */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">{product.brand}</p>
          <h1 className="heading-1 mt-1.5">{product.name}</h1>

          <div className="mt-3 flex items-center gap-3">
            <StarRating rating={product.rating} />
            <a href="#reviews" className="text-sm text-muted-foreground underline-offset-2 hover:underline">
              {product.reviewCount} reviews
            </a>
          </div>

          <p className="mt-4 text-muted-foreground">{product.shortDescription}</p>

          {/* Pricing Information for Retailer */}
          <div className="mt-6 rounded-lg border-2 border-green-200 bg-green-50 p-4">
            <p className="text-xs font-semibold uppercase text-green-900">Wholesale vs Retail Pricing</p>
            <div className="mt-3 space-y-2">
              {variant && (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Wholesale Price:</span>
                    <span className="font-semibold text-gray-900">${variant.price?.toFixed(2) || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-700">Your Retail Price (20%):</span>
                    <span className="font-bold text-green-700">${(variant.price * 1.2).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-green-200 pt-2 mt-2">
                    <div className="flex justify-between text-sm font-semibold">
                      <span>Your Profit per Unit:</span>
                      <span className="text-green-600">${(variant.price * 0.2).toFixed(2)}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
            <fieldset className="mt-6">
              <legend className="text-sm font-semibold">Available options:</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVariantId(v.id)}
                    aria-pressed={v.id === variantId}
                    className={cn(
                      "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                      v.id === variantId
                        ? "border-primary bg-accent text-primary-dark"
                        : "border-border hover:border-primary/60",
                    )}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-lg border border-border">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Decrease quantity"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-9 text-center text-sm font-semibold" aria-live="polite">
                {qty}
              </span>
              <Button variant="ghost" size="icon" aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button
              size="lg"
              className="h-12 min-w-[200px] flex-1 text-base font-semibold"
              disabled={!product.inStock}
              onClick={() => {
                add(product.slug, qty, variantId);
                toast.success(`${product.name} added to cart`);
              }}
            >
              <ShoppingCart className="h-5 w-5" /> Add to Cart
            </Button>
          </div>

          <p className="mt-3 flex items-center gap-1.5 text-sm font-medium text-primary">
            <Check className="h-4 w-4" /> {product.inStock ? "In stock — ships in 1–2 days" : "Currently unavailable"}
          </p>

          {/* Quality badges */}
          <ul className="mt-6 grid grid-cols-3 gap-3 border-y border-border py-4 text-center">
            <li>
              <Sparkles className="mx-auto h-5 w-5 text-primary" aria-hidden />
              <p className="mt-1.5 text-xs font-bold">Made in USA</p>
              <p className="text-[11px] text-muted-foreground">with global ingredients</p>
            </li>
            <li>
              <BadgeCheck className="mx-auto h-5 w-5 text-primary" aria-hidden />
              <p className="mt-1.5 text-xs font-bold">Lab tested</p>
              <p className="text-[11px] text-muted-foreground">for purity &amp; potency</p>
            </li>
            <li>
              <Leaf className="mx-auto h-5 w-5 text-primary" aria-hidden />
              <p className="mt-1.5 text-xs font-bold">Plant based</p>
              <p className="text-[11px] text-muted-foreground">no fillers</p>
            </li>
          </ul>

          {/* Product identifiers */}
          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 rounded-xl border border-border bg-secondary/50 p-4 text-sm">
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider text-muted-foreground">RHL ID</dt>
              <dd className="font-mono text-sm">{variant?.sku ?? product.sku}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider text-muted-foreground">RHL UPC</dt>
              <dd className="font-mono text-sm">{product.upc ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Brand</dt>
              <dd>{product.brand}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Size</dt>
              <dd>{variant?.label ?? "Single size"}</dd>
            </div>
          </dl>


          {/* Trust / shipping band */}
          <ul className="mt-4 grid grid-cols-1 gap-3 rounded-xl bg-accent/60 p-4 text-sm sm:grid-cols-3">
            <li className="flex items-start gap-2">
              <Truck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              <span>
                <span className="block text-xs font-bold uppercase text-primary-dark">Free shipping</span>
                <span className="text-xs text-muted-foreground">On orders over $99</span>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Undo2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              <span>
                <span className="block text-xs font-bold uppercase text-primary-dark">Guarantee</span>
                <span className="text-xs text-muted-foreground">30-day money back</span>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Headphones className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              <span>
                <span className="block text-xs font-bold uppercase text-primary-dark">Support</span>
                <span className="text-xs text-muted-foreground">We're here 24/7</span>
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* ===== BELOW THE PRODUCT AREA — locked order ===== */}

      {/* 1. Product video (optional) */}
      {video && (
        <section className="section-y bg-cream" aria-labelledby="product-video">
          <div className="container-rhl">
            <h2 id="product-video" className="heading-2 mb-6">
              Watch this product
            </h2>
            <div className="mx-auto aspect-video w-full max-w-3xl overflow-hidden rounded-xl border border-border bg-foreground">
              <video controls playsInline preload="none" poster={video.poster} className="h-full w-full">
                <source src={video.src} type="video/mp4" />
                Your browser does not support embedded video.
              </video>
            </div>
          </div>
        </section>
      )}

      {/* 2. Product description / brand content */}
      <section className="section-y" aria-labelledby="product-description">
        <div className="container-rhl max-w-3xl">
          <h2 id="product-description" className="heading-2">
            About {product.name}
          </h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            {product.longDescription.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Benefits / icon grid */}
      {product.benefits.length > 0 && (
        <section className="section-y bg-accent/50" aria-labelledby="product-benefits">
          <div className="container-rhl">
            <h2 id="product-benefits" className="heading-2 mb-8">
              Key benefits
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {product.benefits.map((b) => (
                <div key={b.title} className="rounded-xl border border-border bg-card p-5 shadow-card">
                  <span className="text-2xl" aria-hidden>
                    {b.icon}
                  </span>
                  <h3 className="mt-3 text-base font-semibold">{b.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Customers also viewed */}
      {related.length > 0 && (
        <section className="section-y" aria-labelledby="also-viewed">
          <div className="container-rhl">
            <h2 id="also-viewed" className="heading-2 mb-8">
              Customers also viewed
            </h2>
            <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2">
              {related.map((p) => (
                <li key={p.id} className="w-[260px] shrink-0 snap-start">
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 5. See additional product information */}
      <section className="section-y bg-cream" aria-labelledby="additional-info">
        <div className="container-rhl max-w-3xl">
          <h2 id="additional-info" className="heading-2 mb-4">
            See additional product information
          </h2>
          <AdditionalInfoAccordion rows={product.additionalInfo} />
        </div>
      </section>

      {/* 6. Customer reviews */}
      <section className="section-y" id="reviews" aria-labelledby="reviews-heading">
        <div className="container-rhl max-w-3xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 id="reviews-heading" className="heading-2">
              Customer reviews
            </h2>
            <div className="flex items-center gap-3">
              <StarRating rating={product.rating} />
              <span className="text-sm text-muted-foreground">{product.reviewCount} reviews</span>
            </div>
          </div>
          <ul className="mt-8 space-y-5">
            {product.reviews.map((r) => (
              <li key={r.id} className="rounded-xl border border-border bg-card p-5 shadow-card">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <StarRating rating={r.rating} showValue={false} />
                  <span className="text-xs text-muted-foreground">{r.date}</span>
                </div>
                <h3 className="mt-2 font-semibold">{r.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{r.body}</p>
                <p className="mt-3 text-xs text-muted-foreground">
                  {r.author}
                  {r.verified && <span className="ml-2 font-medium text-primary">Verified buyer</span>}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
