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
    label: "Tea & Coffee",
    type: "menu",
    actions: [
      { label: "Shop Now", to: "/tea-coffee/tea", style: "primary" },
      { label: "Know More", to: "/tea-coffee/", style: "outline" },
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
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { count, hydrated } = useCart();
  const navigate = useNavigate();

  // Track which sub-nav item has its dropdown open (by label)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [tcMegaOpen, setTcMegaOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tcCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  function openMega() {
    if (tcCloseTimer.current) clearTimeout(tcCloseTimer.current);
    setTcMegaOpen(true);
  }

  function scheduleMegaClose() {
    tcCloseTimer.current = setTimeout(() => setTcMegaOpen(false), 150);
  }

  function cancelMegaClose() {
    if (tcCloseTimer.current) clearTimeout(tcCloseTimer.current);
  }

  return (
    <header className="sticky top-0 bg-background" style={{ zIndex: 9999, isolation: "isolate" }}>
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
        <div className="container-rhl flex h-16 items-center gap-3 py-2 lg:h-24 lg:gap-6">
          <Link to="/" className="flex shrink-0 flex-col items-start" aria-label="Ray's Healthy Living home">
            <img src="/favicon.png" alt="Ray's Healthy Living" className="h-9 w-auto lg:h-12 mb-0.5" />
            <span className="hidden text-xs font-bold text-green-700 lg:block">Quality</span>
          </Link>

          <div className="hidden flex-1 items-center sm:flex">
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

          <div className="ml-auto flex items-center gap-3 lg:gap-4">
            <button className="sm:hidden text-gray-600 hover:text-gray-900 transition-colors" title="Search">
              <Search className="h-5 w-5" />
            </button>
            <button className="hidden sm:block text-gray-600 hover:text-gray-900 transition-colors" title="Wishlist">
              <Heart className="h-6 w-6" />
            </button>
            <Link to="/account" className="text-gray-600 hover:text-gray-900 transition-colors" title="Account">
              <User className="h-5 w-5 lg:h-6 lg:w-6" />
            </Link>
            <Link to="/cart" className="relative text-gray-600 hover:text-gray-900 transition-colors" title="Shopping cart">
              <ShoppingBag className="h-5 w-5 lg:h-6 lg:w-6" />
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
                  
                  {/* Tea & Coffee Mobile Accordion */}
                  <div className="mt-3 border-t border-border pt-3">
                    <button
                      onClick={() => setTcMegaOpen(!tcMegaOpen)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-base font-medium rounded-md transition-colors ${
                        tcMegaOpen
                          ? "text-primary bg-primary/10"
                          : "text-foreground hover:bg-accent"
                      }`}
                    >
                      <span>Tea & Coffee</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${tcMegaOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {tcMegaOpen && (
                      <div className="mt-2 space-y-3 px-4 py-2">
                        {/* Tea Submenu */}
                        <div className="text-sm font-semibold text-primary mb-2">Tea</div>
                        <ul className="space-y-1.5 ml-2">
                          <li><Link to="/tea-coffee/tea?type=loose-botanical-leaves" onClick={() => setOpen(false)} className="link-tc-ghost block text-sm">Loose Botanical Leaves</Link></li>
                          <li><Link to="/tea-coffee/tea?type=herbal-teas" onClick={() => setOpen(false)} className="link-tc-ghost block text-sm">Herbal Teas</Link></li>
                          <li><Link to="/tea-coffee/tea?type=flowers" onClick={() => setOpen(false)} className="link-tc-ghost block text-sm">Flowers</Link></li>
                          <li><Link to="/tea-coffee/tea?type=roots" onClick={() => setOpen(false)} className="link-tc-ghost block text-sm">Roots</Link></li>
                          <li><Link to="/tea-coffee/tea?type=stems-traditional-botanicals" onClick={() => setOpen(false)} className="link-tc-ghost block text-sm">Stems & Traditional Botanicals</Link></li>
                          <li><Link to="/tea-coffee/tea?type=botanical-powders" onClick={() => setOpen(false)} className="link-tc-ghost block text-sm">Botanical Powders</Link></li>
                          <li><Link to="/tea-coffee/tea?type=tea-accessories" onClick={() => setOpen(false)} className="link-tc-ghost block text-sm">Tea Accessories</Link></li>
                          <li><Link to="/tea-coffee/tea" onClick={() => setOpen(false)} className="link-tc-ghost block text-sm font-semibold text-primary">All Teas</Link></li>
                        </ul>

                        {/* Coffee Submenu */}
                        <div className="text-sm font-semibold text-primary mb-2 mt-4">Coffee</div>
                        <ul className="space-y-1.5 ml-2">
                          <li><Link to="/tea-coffee/coffee?type=arabica" onClick={() => setOpen(false)} className="link-tc-ghost block text-sm">Arabica Reserve</Link></li>
                          <li><Link to="/tea-coffee/coffee?type=robusta" onClick={() => setOpen(false)} className="link-tc-ghost block text-sm">Robusta Intense</Link></li>
                          <li><Link to="/tea-coffee/coffee?type=culi" onClick={() => setOpen(false)} className="link-tc-ghost block text-sm">Culi Select — Peaberry</Link></li>
                          <li><Link to="/tea-coffee/coffee?grind=whole-bean" onClick={() => setOpen(false)} className="link-tc-ghost block text-sm">Whole Bean</Link></li>
                          <li><Link to="/tea-coffee/coffee?grind=medium-ground" onClick={() => setOpen(false)} className="link-tc-ghost block text-sm">Medium/Ground</Link></li>
                          <li><Link to="/tea-coffee/coffee?grind=fine-specialty-grind" onClick={() => setOpen(false)} className="link-tc-ghost block text-sm">Fine/Specialty Grind</Link></li>
                          <li><Link to="/tea-coffee/coffee" onClick={() => setOpen(false)} className="link-tc-ghost block text-sm font-semibold text-primary">All Selections</Link></li>
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Subnav categories in mobile menu */}
                  <div className="mt-3 border-t border-border pt-3">
                    <p className="px-4 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Categories</p>
                    {subnavItems.filter(i => i.type === "direct").map((item) => (
                      <Link
                        key={item.label}
                        to={(item as { to: string }).to}
                        onClick={() => setOpen(false)}
                        className="rounded-md px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-primary-dark"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* ── Tier 3: Sub-navbar — desktop only ── */}
      <div className="hidden border-b border-gray-200 bg-gray-50 lg:block" style={{ position: "relative", zIndex: 9999 }}>
        <div className="flex items-center justify-center flex-wrap gap-0.5 py-2 px-4 mx-auto" style={{ maxWidth: "1164px" }}>
          {subnavItems.map((item) => {
            if (item.type === "direct") {
              // Brands / Categories — plain link, no dropdown at all
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors px-3 py-1.5 rounded-md hover:bg-green-50 border-b-2 border-transparent hover:border-green-600"
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
                  className={`flex items-center gap-1 text-sm font-medium transition-colors px-3 py-1.5 rounded-md border-b-2 ${isOpen
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
                    className={`absolute left-0 top-full pt-1 transition-all duration-150 ${isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"}`}
                    style={{ zIndex: 9999 }}
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

          {/* ── Tea & Coffee Mega Menu ── */}
          <div
            className="relative"
            onMouseEnter={openMega}
            onMouseLeave={scheduleMegaClose}
          >
            <button
              onClick={() => setTcMegaOpen((v) => !v)}
              className={`flex items-center gap-1 text-sm font-medium transition-colors px-3 py-1.5 rounded-md border-b-2 ${
                tcMegaOpen
                  ? "text-green-600 border-green-600 bg-green-50"
                  : "text-gray-700 hover:text-green-600 border-transparent hover:border-green-600 hover:bg-green-50"
              }`}
              aria-haspopup="true"
              aria-expanded={tcMegaOpen}
            >
              Tea &amp; Coffee
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-150 ${tcMegaOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Mega menu panel — uses design tokens for Tea & Coffee colors */}
            {tcMegaOpen && (
              <div
                className="absolute left-1/2 -translate-x-1/2 top-full pt-2"
                style={{ zIndex: 9999 }}
                onMouseEnter={cancelMegaClose}
                onMouseLeave={scheduleMegaClose}
              >
                <div className="w-screen max-w-3xl bg-tc-mega-menu divide-x divide-tc-gold">
                  <div className="grid grid-cols-2">
                    
                    {/* ── TEA COLUMN ─────────────────────────── */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-5">
                        <img src="/tea-coffee/chamomile.svg" alt="Tea" className="h-12 w-12 rounded-sm" />
                        <h3 className="text-tc-heading-md text-primary">TEA</h3>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        {/* Shop Tea */}
                        <div>
                          <p className="text-tc-label mb-3">Shop Tea</p>
                          <ul className="space-y-2">
                            <li><Link to="/tea-coffee/tea?type=loose-botanical-leaves" onClick={() => setTcMegaOpen(false)} className="link-tc-ghost text-sm">Loose Botanical Leaves</Link></li>
                            <li><Link to="/tea-coffee/tea?type=herbal-teas" onClick={() => setTcMegaOpen(false)} className="link-tc-ghost text-sm">Herbal Teas</Link></li>
                            <li><Link to="/tea-coffee/tea?type=flowers" onClick={() => setTcMegaOpen(false)} className="link-tc-ghost text-sm">Flowers</Link></li>
                            <li><Link to="/tea-coffee/tea?type=roots" onClick={() => setTcMegaOpen(false)} className="link-tc-ghost text-sm">Roots</Link></li>
                            <li><Link to="/tea-coffee/tea?type=stems-traditional-botanicals" onClick={() => setTcMegaOpen(false)} className="link-tc-ghost text-sm">Stems & Traditional Botanicals</Link></li>
                            <li><Link to="/tea-coffee/tea?type=botanical-powders" onClick={() => setTcMegaOpen(false)} className="link-tc-ghost text-sm">Botanical Powders</Link></li>
                            <li><Link to="/tea-coffee/tea?type=tea-accessories" onClick={() => setTcMegaOpen(false)} className="link-tc-ghost text-sm">Tea Accessories & Strainers</Link></li>
                            <li><Link to="/tea-coffee/tea" onClick={() => setTcMegaOpen(false)} className="link-tc-ghost text-sm font-semibold text-primary">All Teas</Link></li>
                          </ul>
                        </div>

                        {/* Learn */}
                        <div>
                          <p className="text-tc-label mb-3">Learn</p>
                          <ul className="space-y-2">
                            <li><Link to="/tea-coffee/learn/tea-preparation" onClick={() => setTcMegaOpen(false)} className="link-tc-ghost text-sm">Tea Preparation Guide</Link></li>
                            <li><Link to="/tea-coffee/learn/how-much-tea" onClick={() => setTcMegaOpen(false)} className="link-tc-ghost text-sm">How Much Tea to Use</Link></li>
                            <li><Link to="/tea-coffee/learn/steeping-methods" onClick={() => setTcMegaOpen(false)} className="link-tc-ghost text-sm">Steeping Methods</Link></li>
                            <li><Link to="/tea-coffee/learn/traditional-uses" onClick={() => setTcMegaOpen(false)} className="link-tc-ghost text-sm">Traditional Uses</Link></li>
                            <li><Link to="/tea-coffee/articles" onClick={() => setTcMegaOpen(false)} className="link-tc-ghost text-sm">Tea Articles</Link></li>
                            <li><Link to="/tea-coffee/learn/tea-wellness" onClick={() => setTcMegaOpen(false)} className="link-tc-ghost text-sm">Tea & Wellness Education</Link></li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* ── COFFEE COLUMN ──────────────────────── */}
                    <div className="p-6 bg-tc-cream">
                      <div className="flex items-center gap-3 mb-5">
                        <img src="/tea-coffee/coffee-beans.svg" alt="Coffee" className="h-12 w-12 rounded-sm" />
                        <h3 className="text-tc-heading-md" style={{ color: "var(--tc-coffee-charcoal)" }}>COFFEE</h3>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        {/* Shop Coffee */}
                        <div>
                          <p className="text-tc-label mb-3">Ray's Coffee Collection</p>
                          <ul className="space-y-2">
                            <li><Link to="/tea-coffee/coffee?type=arabica" onClick={() => setTcMegaOpen(false)} className="link-tc-ghost text-sm">Arabica Reserve</Link></li>
                            <li><Link to="/tea-coffee/coffee?type=robusta" onClick={() => setTcMegaOpen(false)} className="link-tc-ghost text-sm">Robusta Intense</Link></li>
                            <li><Link to="/tea-coffee/coffee?type=culi" onClick={() => setTcMegaOpen(false)} className="link-tc-ghost text-sm">Culi Select — Peaberry</Link></li>
                            <li><Link to="/tea-coffee/coffee?grind=whole-bean" onClick={() => setTcMegaOpen(false)} className="link-tc-ghost text-sm">Whole Bean</Link></li>
                            <li><Link to="/tea-coffee/coffee?grind=medium-ground" onClick={() => setTcMegaOpen(false)} className="link-tc-ghost text-sm">Medium/Ground</Link></li>
                            <li><Link to="/tea-coffee/coffee?grind=fine-specialty-grind" onClick={() => setTcMegaOpen(false)} className="link-tc-ghost text-sm">Fine/Specialty Grind</Link></li>
                            <li><Link to="/tea-coffee/coffee" onClick={() => setTcMegaOpen(false)} className="link-tc-ghost text-sm font-semibold" style={{ color: "var(--coffee-robusta)" }}>Shop All 9 Coffee Selections</Link></li>
                          </ul>
                        </div>

                        {/* Learn */}
                        <div>
                          <p className="text-tc-label mb-3">Learn</p>
                          <ul className="space-y-2">
                            <li><Link to="/tea-coffee/learn/coffee-preparation" onClick={() => setTcMegaOpen(false)} className="link-tc-ghost text-sm">Coffee Preparation</Link></li>
                            <li><Link to="/tea-coffee/learn/coffee-timing" onClick={() => setTcMegaOpen(false)} className="link-tc-ghost text-sm">Coffee Timing</Link></li>
                            <li><Link to="/tea-coffee/learn/coffee-hydration" onClick={() => setTcMegaOpen(false)} className="link-tc-ghost text-sm">Coffee & Hydration</Link></li>
                            <li><Link to="/tea-coffee/learn/understanding-grinds" onClick={() => setTcMegaOpen(false)} className="link-tc-ghost text-sm">Understanding Coffee Grinds</Link></li>
                            <li><Link to="/tea-coffee/learn/whole-bean-vs-ground" onClick={() => setTcMegaOpen(false)} className="link-tc-ghost text-sm">Whole Bean vs. Ground</Link></li>
                            <li><Link to="/tea-coffee/articles" onClick={() => setTcMegaOpen(false)} className="link-tc-ghost text-sm">Coffee Articles</Link></li>
                          </ul>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
