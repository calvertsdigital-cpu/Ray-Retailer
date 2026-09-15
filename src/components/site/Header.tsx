import { Link } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User, Home, Info, Mail, LogOut, Bell, ShoppingCart } from "lucide-react";
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

export function Header() {
  const [open, setOpen] = useState(false);
  const { count, hydrated } = useCart();

  const subnavItems = [
    { label: "IRISH MOSS", to: "/shop" },
    { label: "CBD", to: "/shop" },
    { label: "Health Concern", to: "/health-concerns" },
    { label: "Brands", to: "/brands" },
    { label: "Categories", to: "/categories" },
    { label: "Maximum Cardio", to: "/shop" },
    { label: "Essential Oil", to: "/shop" },
    { label: "Ray's Vitality", to: "/shop" },
    { label: "Loose Herbs", to: "/shop" },
    { label: "Coffee", to: "/shop" },
  ] as const;

  const topnavItems = [
    { label: "Home", icon: Home },
    { label: "About", icon: Info },
    { label: "Pitchdecks", icon: ShoppingCart },
    { label: "Blog", icon: Bell },
    { label: "Contact", icon: Mail },
  ] as const;

  return (
    <header className="sticky top-0 z-50 bg-background">
      {/* Top bar with green background */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white">
        <div className="container-rhl flex h-10 items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            {topnavItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className="flex items-center gap-1.5 hover:text-green-100 transition-colors"
                  title={item.label}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline text-xs">{item.label}</span>
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-3">
            <button className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded text-xs font-semibold transition-colors">
              🛒 Wholesale
            </button>
            <button className="flex items-center gap-1 hover:text-green-100 transition-colors">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline text-xs">Find Book</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container-rhl flex h-24 items-center gap-6 py-2">
          {/* Logo and tagline */}
          <Link to="/" className="flex shrink-0 flex-col items-start" aria-label="Ray's Healthy Living home">
            <img src="/favicon.png" alt="Ray's Healthy Living" className="h-12 w-auto mb-0.5" />
            <span className="text-xs font-bold text-green-700">Quality</span>
          </Link>

          {/* Search bar */}
          <div className="flex flex-1 items-center">
            <div className="relative w-full max-w-lg">
              <input
                type="text"
                placeholder="What can we help you find?"
                className="w-full px-4 py-2 border border-gray-300 rounded-l text-sm focus:outline-none focus:border-green-500"
              />
              <button className="absolute right-0 top-0 bottom-0 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r transition-colors">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-gray-900 transition-colors" title="Wishlist">
              <Heart className="h-6 w-6" />
            </button>
            <Link
              to="/account"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              title="Account"
            >
              <User className="h-6 w-6" />
            </Link>
            <Link
              to="/cart"
              className="relative text-gray-600 hover:text-gray-900 transition-colors"
              title="Shopping cart"
            >
              <ShoppingBag className="h-6 w-6" />
              {hydrated && count > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                  {count}
                </span>
              )}
            </Link>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                  <Menu className="h-6 w-6" />
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
      </div>

      {/* Sub-navbar */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="container-rhl flex items-center gap-4 overflow-x-auto py-2.5 lg:gap-6">
          {subnavItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="whitespace-nowrap text-sm font-medium text-gray-700 hover:text-green-600 transition-colors pb-1 border-b-2 border-transparent hover:border-green-600"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
