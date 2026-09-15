import { Link } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";

const nav = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/shop" },
  { label: "Health Concerns", to: "/health-concerns" },
  { label: "Categories", to: "/categories" },
  { label: "Brands", to: "/brands" },
  { label: "About", to: "/about" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
] as const;

function CartButton() {
  const { count, hydrated } = useCart();
  return (
    <Link
      to="/cart"
      aria-label={`Shopping cart, ${hydrated ? count : 0} items`}
      className="relative grid h-10 w-10 place-items-center rounded-full text-foreground transition-colors hover:bg-accent hover:text-primary"
    >
      <ShoppingBag className="h-5 w-5" />
      {hydrated && count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] font-semibold text-primary-foreground">
          {count}
        </span>
      )}
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="bg-primary-dark text-primary-foreground">
        <div className="container-rhl flex h-9 items-center justify-between text-xs">
          <p>Free shipping on orders over $99 · 30-day money-back guarantee</p>
          <a href="tel:+14434323295" className="hidden hover:underline sm:block">
            +1 (443) 432-3295
          </a>
        </div>
      </div>

      <div className="container-rhl flex h-18 items-center gap-4 py-3">
        <Link to="/" className="flex shrink-0 items-center gap-2" aria-label="Ray's Healthy Living home">
          <img src="/favicon.png" alt="Ray's Healthy Living" className="h-10 w-auto" />
        </Link>

        <nav aria-label="Main" className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-primary-dark"
              activeProps={{ className: "text-primary-dark bg-accent" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Link
            to="/shop"
            aria-label="Search products"
            className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-accent hover:text-primary"
          >
            <Search className="h-5 w-5" />
          </Link>
          <Link
            to="/account"
            aria-label="Your account"
            className="hidden h-10 w-10 place-items-center rounded-full transition-colors hover:bg-accent hover:text-primary sm:grid"
          >
            <User className="h-5 w-5" />
          </Link>
          <Link
            to="/account"
            aria-label="Your wishlist"
            className="hidden h-10 w-10 place-items-center rounded-full transition-colors hover:bg-accent hover:text-primary sm:grid"
          >
            <Heart className="h-5 w-5" />
          </Link>
          <CartButton />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88vw] max-w-sm">
              <SheetTitle className="px-4 pt-4 text-base">Menu</SheetTitle>
              <div className="px-4 pt-4">
                <label htmlFor="mobile-search" className="sr-only">
                  Search products
                </label>
                <Input id="mobile-search" placeholder="Search products" />
              </div>
              <nav aria-label="Mobile" className="mt-4 flex flex-col px-2 pb-8">
                {nav.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-4 py-3 text-base font-medium hover:bg-accent hover:text-primary-dark"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
