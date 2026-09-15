import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories } from "@/data/catalog";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All products", to: "/shop" as const },
      { label: "Categories", to: "/categories" as const },
      { label: "Brands", to: "/brands" as const },
      { label: "Health concerns", to: "/health-concerns" as const },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Ray's", to: "/about" as const },
      { label: "Wellness blog", to: "/blog" as const },
      { label: "Contact us", to: "/contact" as const },
      { label: "Your account", to: "/account" as const },
    ],
  },
];

const policies = [
  { label: "Condition of Use", to: "/condition-of-use" as const },
  { label: "Shipping & Return", to: "/shipping-returns" as const },
  { label: "Privacy Policy", to: "/privacy" as const },
  { label: "Terms of Sale", to: "/terms" as const },
  { label: "Health Disclaimer", to: "/disclaimer" as const },
];

export function Footer() {
  return (
    <footer className="mt-16 bg-primary-dark text-primary-foreground">
      <div className="container-rhl grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold">Ray's Healthy Living</h1>
          <p className="mt-4 max-w-sm text-sm text-primary-foreground/80">
            A family-centric business providing quality health and beauty supplements built on natural and organic
            ingredients, at prices families can keep up with.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-primary-foreground/80">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              70 Solomons Island Rd S, Prince Frederick, MD 20678, United States
            </li>
            <li className="flex gap-2">
              <Phone className="h-4 w-4 shrink-0" />
              <a href="tel:+14434323295" className="hover:underline">
                +1 (443) 432-3295
              </a>
            </li>
            <li className="flex gap-2">
              <Mail className="h-4 w-4 shrink-0" />
              <a href="mailto:info@rayshealthyliving.com" className="hover:underline">
                info@rayshealthyliving.com
              </a>
            </li>
          </ul>
          <div className="mt-5 flex gap-2">
            {[Facebook, Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="https://rayshealthyliving.com"
                aria-label="Ray's Healthy Living social profile"
                className="grid h-9 w-9 place-items-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/20"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="text-sm font-semibold uppercase tracking-wider">{col.title}</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/80">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="hover:text-primary-foreground hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider">Categories</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/80">
            {categories.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link
                  to="/shop"
                  search={{ category: c.slug }}
                  className="hover:text-primary-foreground hover:underline"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="container-rhl flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-base font-semibold">Stay Strong. Stay Vibrant.</h2>
            <p className="text-sm text-primary-foreground/80">Your weekly wellness boost, straight to your inbox.</p>
          </div>
          <form
            className="flex w-full max-w-md gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Thanks — you're on the list.");
              (e.currentTarget as HTMLFormElement).reset();
            }}
          >
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>
            <Input
              id="footer-email"
              type="email"
              required
              placeholder="you@example.com"
              className="border-primary-foreground/25 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/60"
            />
            <Button type="submit" variant="secondary">
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="container-rhl space-y-3 py-6 text-xs text-primary-foreground/70">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {policies.map((p) => (
              <li key={p.label}>
                <Link to={p.to} className="hover:underline">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
          <p>
            *Disclaimer: Statements made, or products sold through this website, have not been evaluated by the United
            States Food and Drug Administration. They are not intended to diagnose, treat, cure or prevent any disease.
          </p>
          <p>© {new Date().getFullYear()} Ray's Healthy Living. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
