import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { products } from "@/data/catalog";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout | Ray's Healthy Living" },
      {
        name: "description",
        content: "Complete your Ray's Healthy Living order. Free shipping over $99 and a 30-day money-back guarantee.",
      },
      { property: "og:title", content: "Checkout | Ray's Healthy Living" },
      { property: "og:description", content: "Secure checkout for your natural wellness order." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { lines, hydrated, clear } = useCart();

  const items = lines
    .map((line) => {
      const product = products.find((p) => p.slug === line.slug);
      return product ? { product, qty: line.qty } : null;
    })
    .filter((x): x is { product: (typeof products)[number]; qty: number } => x !== null);

  const itemCount = items.reduce((sum, i) => sum + i.qty, 0);


  if (hydrated && items.length === 0) {
    return (
      <div className="container-rhl section-y max-w-lg text-center">
        <h1 className="heading-1">Checkout</h1>
        <p className="mt-3 text-muted-foreground">Your cart is empty.</p>
        <Button asChild className="mt-6">
          <Link to="/shop">Shop products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container-rhl section-y">
      <h1 className="heading-1">Checkout</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            clear();
            toast.success("Order request received — our team will confirm by email.");
          }}
        >
          <fieldset className="rounded-xl border border-border bg-card p-6">
            <legend className="px-1 text-base font-semibold">Contact</legend>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label htmlFor="co-email">Email address</Label>
                <Input id="co-email" type="email" required autoComplete="email" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="co-phone">Phone</Label>
                <Input id="co-phone" type="tel" autoComplete="tel" />
              </div>
            </div>
          </fieldset>

          <fieldset className="rounded-xl border border-border bg-card p-6">
            <legend className="px-1 text-base font-semibold">Shipping address</legend>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label htmlFor="co-first">First name</Label>
                <Input id="co-first" required autoComplete="given-name" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="co-last">Last name</Label>
                <Input id="co-last" required autoComplete="family-name" />
              </div>
              <div className="grid gap-1.5 sm:col-span-2">
                <Label htmlFor="co-address">Street address</Label>
                <Input id="co-address" required autoComplete="street-address" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="co-city">City</Label>
                <Input id="co-city" required autoComplete="address-level2" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="co-state">State</Label>
                <Input id="co-state" required autoComplete="address-level1" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="co-zip">ZIP code</Label>
                <Input id="co-zip" required autoComplete="postal-code" inputMode="numeric" />
              </div>
            </div>
          </fieldset>

          <Button type="submit" size="lg" className="w-full">
            Submit order request
          </Button>
          <p className="text-xs text-muted-foreground">
            No payment is taken here. Our team confirms availability and the order total with you before anything is
            charged.
          </p>
        </form>

        <aside className="h-fit rounded-xl border border-border bg-secondary p-6 lg:sticky lg:top-28">
          <h2 className="text-base font-semibold">Order summary</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {items.map(({ product, qty }) => (
              <li key={product.slug} className="flex justify-between gap-3">
                <span className="text-muted-foreground">{product.name}</span>
                <span className="font-medium">× {qty}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-5 flex justify-between border-t border-border pt-4 text-sm">
            <dt className="text-muted-foreground">Total items</dt>
            <dd className="font-semibold">{itemCount}</dd>
          </dl>
          <Link to="/cart" className="mt-4 inline-block text-sm font-semibold text-primary">
            ← Back to cart
          </Link>
        </aside>
      </div>
    </div>
  );
}
