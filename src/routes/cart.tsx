import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getProduct } from "@/data/catalog";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart | Ray's Healthy Living" },
      { name: "description", content: "Review your natural wellness products before checkout." },
      { property: "og:title", content: "Your Cart | Ray's Healthy Living" },
      { property: "og:description", content: "Review your natural wellness products before checkout." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, setQty, remove, hydrated } = useCart();

  const rows = lines
    .map((l) => {
      const product = getProduct(l.slug);
      if (!product) return null;
      const variant = product.variants?.find((v) => v.id === l.variantId);
      return { ...l, product, variant };
    })
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  const itemCount = rows.reduce((s, r) => s + r.qty, 0);

  return (
    <div className="container-rhl section-y">
      <h1 className="heading-1">Your cart</h1>

      {!hydrated ? (
        <p className="mt-8 text-muted-foreground">Loading your cart…</p>
      ) : rows.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-border p-12 text-center">
          <ShoppingBag className="mx-auto h-8 w-8 text-muted-foreground" />
          <p className="mt-3 font-semibold">Your cart is empty</p>
          <p className="mt-1 text-sm text-muted-foreground">Browse the shop or start from a health concern.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link to="/shop">Shop products</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/health-concerns">Explore health concerns</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
          <ul className="space-y-4">
            {rows.map((r) => (
              <li
                key={`${r.slug}-${r.variantId ?? ""}`}
                className="flex gap-4 rounded-xl border border-border bg-card p-4 shadow-card"
              >
                <Link to="/products/$slug" params={{ slug: r.product.slug }} className="shrink-0">
                  <img
                    src={r.product.media.find((m) => m.type === "image")?.src}
                    alt=""
                    loading="lazy"
                    width={96}
                    height={96}
                    className="h-24 w-24 rounded-lg border border-border object-cover"
                  />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link to="/products/$slug" params={{ slug: r.product.slug }} className="font-semibold hover:text-primary">
                    {r.product.name}
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    {r.product.brand}
                    {r.variant ? ` · ${r.variant.label}` : ""}
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      aria-label={`Decrease ${r.product.name} quantity`}
                      onClick={() => setQty(r.slug, r.qty - 1, r.variantId)}
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </Button>
                    <span className="w-8 text-center text-sm">{r.qty}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      aria-label={`Increase ${r.product.name} quantity`}
                      onClick={() => setQty(r.slug, r.qty + 1, r.variantId)}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    aria-label={`Remove ${r.product.name}`}
                    onClick={() => remove(r.slug, r.variantId)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-border bg-card p-5 shadow-card">
              <h2 className="text-lg font-semibold">Order summary</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Items</dt>
                  <dd className="font-semibold">{itemCount}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Shipping</dt>
                  <dd>Confirmed at checkout</dd>
                </div>
              </dl>
              <p className="mt-3 text-xs text-muted-foreground">
                Order totals are confirmed by our team when your order is reviewed.
              </p>
              <Button asChild size="lg" className="mt-5 w-full">
                <Link to="/checkout">Proceed to checkout</Link>
              </Button>
              <Button asChild variant="ghost" className="mt-2 w-full">
                <Link to="/shop">Continue shopping</Link>
              </Button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
