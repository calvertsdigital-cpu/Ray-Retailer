import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { getProduct } from "@/data/catalog";
import type { RecommendedProductRef } from "@/data/types";
import { useCart } from "@/lib/cart";

interface BundleLine {
  slug: string;
  qty: number;
}

/**
 * Auto-populated recommended bundle basket for a health concern. Uses the same
 * product records as the shop — nothing is duplicated — and adds into the
 * normal cart.
 */
export function BundleBuilder({
  recommended,
  concernName,
  title,
  subtext,
}: {
  recommended: RecommendedProductRef[];
  concernName: string;
  title?: string;
  subtext?: string;
}) {
  const { addMany } = useCart();
  const [lines, setLines] = useState<BundleLine[]>(
    recommended.filter((r) => r.inBundle).map((r) => ({ slug: r.slug, qty: r.defaultQty })),
  );

  const rows = lines
    .map((l) => {
      const product = getProduct(l.slug);
      return product ? { ...l, product } : null;
    })
    .filter((r): r is BundleLine & { product: NonNullable<ReturnType<typeof getProduct>> } => Boolean(r));

  const itemCount = rows.reduce((sum, r) => sum + r.qty, 0);

  const setQty = (slug: string, qty: number) =>
    setLines((prev) =>
      qty <= 0 ? prev.filter((l) => l.slug !== slug) : prev.map((l) => (l.slug === slug ? { ...l, qty } : l)),
    );

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
        <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary-dark">
          <ShoppingCart className="h-5 w-5 text-primary" aria-hidden />
          {title ?? `Your ${concernName.toLowerCase()} bundle`}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {subtext ?? `Everything we would suggest for ${concernName.toLowerCase()}, in one basket.`}
        </p>

        {rows.length === 0 ? (
          <p className="mt-5 rounded-lg border border-dashed border-border p-5 text-center text-sm text-muted-foreground">
            Your bundle is empty. Add any recommended product from the list.
          </p>
        ) : (
          <ul className="mt-5 divide-y divide-border">
            {rows.map((r) => (
              <li key={r.slug} className="flex gap-3 py-4">
                <img
                  src={r.product.media.find((m) => m.type === "image")?.src}
                  alt=""
                  loading="lazy"
                  width={56}
                  height={56}
                  className="h-14 w-14 shrink-0 rounded-lg border border-border object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      to="/products/$slug"
                      params={{ slug: r.slug }}
                      className="text-sm font-semibold leading-snug hover:text-primary"
                    >
                      {r.product.name}
                    </Link>
                    <button
                      type="button"
                      aria-label={`Remove ${r.product.name} from bundle`}
                      onClick={() => setQty(r.slug, 0)}
                      className="rounded p-1 text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-2 flex w-fit items-center rounded-lg border border-border">
                    <button
                      type="button"
                      className="grid h-8 w-8 place-items-center text-muted-foreground hover:text-primary"
                      aria-label={`Decrease ${r.product.name} quantity`}
                      onClick={() => setQty(r.slug, r.qty - 1)}
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-7 text-center text-sm font-semibold">{r.qty}</span>
                    <button
                      type="button"
                      className="grid h-8 w-8 place-items-center text-muted-foreground hover:text-primary"
                      aria-label={`Increase ${r.product.name} quantity`}
                      onClick={() => setQty(r.slug, r.qty + 1)}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <dl className="flex justify-between border-t border-border pt-4 text-sm">
          <dt className="text-muted-foreground">Items in bundle</dt>
          <dd className="font-semibold" aria-live="polite">
            {itemCount}
          </dd>
        </dl>

        <Button
          className="mt-4 h-12 w-full text-sm font-bold uppercase tracking-wide"
          disabled={rows.length === 0}
          onClick={() => {
            addMany(rows.map((r) => ({ slug: r.slug, qty: r.qty })));
            toast.success("Bundle added to your cart");
          }}
        >
          <ShoppingCart className="h-4 w-4" /> Add bundle to cart
        </Button>
        <Button asChild variant="outline" className="mt-3 h-12 w-full text-sm font-bold uppercase tracking-wide">
          <Link to="/cart">View cart</Link>
        </Button>
      </div>

      <div className="rounded-2xl border border-primary/25 bg-accent/60 p-5">
        <p className="text-sm font-bold text-primary-dark">Prefer to customize?</p>
        <p className="mt-1 text-sm text-muted-foreground">
          You can add or remove items in your bundle before checkout.
        </p>
      </div>
    </div>
  );
}
