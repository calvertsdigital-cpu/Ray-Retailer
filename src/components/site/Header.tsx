import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronDown, Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { useRef, useState } from "react";

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

// Per-item dropdown configuration
// type: "menu"  → shows a dropdown panel with action links
// type: "direct" → clicking the label navigates directly, no dropdown
type DropdownAction = { 
  label: string; 
  to: string; 
  style: "primary" | "outline" | "ghost";
  external?: boolean; // Optional flag for external links
};

type SubnavItem =
  | { label: string; type: "direct"; to: string }
  | { label: string; type: "menu"; actions: DropdownAction[] };

const subnavItems: SubnavItem[] = [
  {
    label: "Irish Moss",
    type: "menu",
    actions: [
      { label: "Shop Now", to: "/shop", style: "primary" },
      { label: "Know More", to: "/irish-moss", style: "outline" },
    ],
  },
  {
    label: "CBD",
    type: "menu",
    actions: [
      { label: "Shop Now", to: "/shop", style: "primary" },
      { label: "Know More", to: "/cbd", style: "outline" },
    ],
  },
  {
    label: "Health Concern",
    type: "menu",
    actions: [{ label: "Shop Now", to: "/shop", style: "primary" }],
  },
  {
    label: "Brands",
    type: "direct",
    to: "/brands",
  },
  {
    label: "Categories",
    type: "direct",
    to: "/categories",
  },
  {
    label: "Maximum Cardio",
    type: "menu",
    actions: [
      { label: "Shop Now", to: "https://maximumcardio.com/", style: "primary", external: true },
      { label: "Know More", to: "/maximum-cardio", style: "outline" },
      { label: "Videos", to: "/maximum-cardio-video", style: "ghost" },
    ],
  },
  {
    label: "Essential Oil",
    type: "menu",
    actions: [
      { label: "Shop Now", to: "/shop", style: "primary" },
      { label: "Know More", to: "/essential-oil", style: "outline" },
    ],
  },
  {
    label: "Ray's Vitality",
    type: "menu",
    actions: [{ label: "Shop Now", to: "/shop", style: "primary" }],
  },
  {
    label: "Loose Herbs",
    type: "menu",
    actions: [{ label: "Shop Now", to: "/shop", style: "primary" }],
  },
  {
    label: "Coffee",
    type: "menu",
    actions: [{ label: "Shop Now", to: "/shop", style: "primary" }],
  },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { count, hydrated } = useCart();
  const navigate = useNavigate();

  // Track which sub-nav item has its dropdown open (by label)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openDropdown(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(label);
  }

  function scheduleClose() {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  }

  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }

  return (
    <header className="sticky top-0 z-50 bg-background">
      {/* ── Tier 1: Green top bar ── */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white">
        <div className="container-rhl flex h-12 items-center justify-between text-sm">
          <div className="hidden lg:flex items-center gap-6">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-white hover:text-green-100 transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3 ml-auto lg:ml-0">
            <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded text-sm font-semibold transition-colors">
              🛒 Wholesale
            </button>
          </div>
        </div>
      </div>

      {/* ── Tier 2: White main bar ── */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container-rhl flex h-24 items-center gap-6 py-2">
          <Link to="/" className="flex shrink-0 flex-col items-start" aria-label="Ray's Healthy Living home">
            <img src="/favicon.png" alt="Ray's Healthy Living" className="h-12 w-auto mb-0.5" />
            <span className="text-xs font-bold text-green-700">Quality</span>
          </Link>

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

          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-gray-900 transition-colors" title="Wishlist">
              <Heart className="h-6 w-6" />
            </button>
            <Link to="/account" className="text-gray-600 hover:text-gray-900 transition-colors" title="Account">
              <User className="h-6 w-6" />
            </Link>
            <Link to="/cart" className="relative text-gray-600 hover:text-gray-900 transition-colors" title="Shopping cart">
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
                  <label htmlFor="mobile-search" className="sr-only">Search products</label>
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

      {/* ── Tier 3: Sub-navbar ── */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="container-rhl flex flex-wrap items-center justify-center gap-1 py-2 lg:gap-1">
          {subnavItems.map((item) => {
            if (item.type === "direct") {
              // Brands / Categories — plain link, no dropdown at all
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className="whitespace-nowrap text-sm font-medium text-gray-700 hover:text-green-600 transition-colors px-3 py-1.5 rounded-md hover:bg-green-50 border-b-2 border-transparent hover:border-green-600"
                >
                  {item.label}
                </Link>
              );
            }

            // Items with dropdown menus
            const isOpen = activeDropdown === item.label;
            const hasMultipleActions = item.actions.length > 1;

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => openDropdown(item.label)}
                onMouseLeave={scheduleClose}
              >
                <button
                  className={`flex items-center gap-1 whitespace-nowrap text-sm font-medium transition-colors px-3 py-1.5 rounded-md border-b-2 ${isOpen
                      ? "text-green-600 border-green-600 bg-green-50"
                      : "text-gray-700 hover:text-green-600 border-transparent hover:border-green-600 hover:bg-green-50"
                    }`}
                  aria-haspopup={hasMultipleActions ? "menu" : undefined}
                  aria-expanded={isOpen}
                  onClick={() => {
                    // If only one action (Shop Now), navigate directly on click
                    const firstAction = item.actions[0];
                    if (item.actions.length === 1 && firstAction) {
                      navigate({ to: firstAction.to });
                    } else {
                      setActiveDropdown(isOpen ? null : item.label);
                    }
                  }}
                >
                  {item.label}
                  {hasMultipleActions && (
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
                    />
                  )}
                </button>

                {/* Dropdown panel */}
                {hasMultipleActions && (
                  <div
                    className={`absolute left-0 top-full pt-1 z-50 transition-all duration-150 ${isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
                      }`}
                    onMouseEnter={cancelClose}
                    onMouseLeave={scheduleClose}
                    role="menu"
                  >
                    <div className="min-w-[160px] rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden">
                      {item.actions.map((action) => {
                        const linkClassName = `block w-full px-4 py-2.5 text-sm font-medium transition-colors text-left ${
                          action.style === "primary"
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : action.style === "outline"
                              ? "text-green-700 hover:bg-green-50 border-t border-gray-100"
                              : "text-gray-600 hover:bg-gray-50 border-t border-gray-100"
                        }`;

                        // External link - use regular <a> tag
                        if (action.external) {
                          return (
                            <a
                              key={action.label}
                              href={action.to}
                              target="_blank"
                              rel="noopener noreferrer"
                              role="menuitem"
                              onClick={() => setActiveDropdown(null)}
                              className={linkClassName}
                            >
                              {action.label}
                            </a>
                          );
                        }

                        // Internal link - use TanStack Router Link
                        return (
                          <Link
                            key={action.label}
                            to={action.to}
                            role="menuitem"
                            onClick={() => setActiveDropdown(null)}
                            className={linkClassName}
                          >
                            {action.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </header>
  );
}
