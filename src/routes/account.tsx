import { createFileRoute, Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Your Account | Ray's Healthy Living" },
      {
        name: "description",
        content: "Sign in to your Ray's Healthy Living account to view orders, saved products and your wishlist.",
      },
      { property: "og:title", content: "Your Account | Ray's Healthy Living" },
      { property: "og:description", content: "Orders, saved products and wishlist in one place." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  return (
    <div className="container-rhl section-y max-w-md">
      <p className="eyebrow mb-2">Account</p>
      <h1 className="heading-1">Sign in</h1>
      <p className="mt-3 text-muted-foreground">
        Accounts, orders and wishlists are coming soon. In the meantime you can shop and check out as a guest.
      </p>

      <form
        className="mt-8 space-y-4 rounded-xl border border-border bg-card p-6"
        onSubmit={(e) => e.preventDefault()}
        aria-describedby="account-note"
      >
        <div className="grid gap-1.5">
          <Label htmlFor="a-email">Email address</Label>
          <Input id="a-email" type="email" autoComplete="email" disabled />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="a-password">Password</Label>
          <Input id="a-password" type="password" autoComplete="current-password" disabled />
        </div>
        <Button type="submit" className="w-full" disabled>
          Sign in
        </Button>
        <p id="account-note" className="text-xs text-muted-foreground">
          Sign-in isn't switched on yet.
        </p>
      </form>

      <Button asChild variant="outline" className="mt-6 w-full">
        <Link to="/shop">Continue shopping</Link>
      </Button>
    </div>
  );
}
