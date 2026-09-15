import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { z } from "zod";

import { ProductCard } from "@/components/site/ProductCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { brands, categories, products, searchProducts } from "@/data/catalog";
import { healthConcerns } from "@/data/concerns";
import { hiddenSlugs } from "@/lib/cms";

const searchSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  brand: z.string().optional(),
  concern: z.string().optional(),
  sort: z.enum(["featured", "name-asc", "name-desc", "rating", "newest"]).optional(),
});

export const Route = createFileRoute("/shop")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Shop Natural Supplements & Herbs | Ray's Healthy Living" },
      {
        name: "description",
        content:
          "Browse organic supplements, sea moss, loose herbs, essential oils and wellness drinks. Filter by category, brand or health concern.",
      },
      { property: "og:title", content: "Shop Natural Supplements & Herbs | Ray's Healthy Living" },
      {
        property: "og:description",
        content: "Filter our full catalog by category, brand or health concern.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shop,
});

const PAGE_SIZE = 24;

function Shop() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const [visible, setVisible] = useState(PAGE_SIZE);

  const setSearch = (next: Partial<z.infer<typeof searchSchema>>) =>
    (setVisible(PAGE_SIZE), navigate({ search: (prev) => ({ ...prev, ...next }) }));

  const [hidden, setHidden] = useState<Set<string>>(new Set());
  useEffect(() => setHidden(hiddenSlugs()), []);

  const filtered = useMemo(() => {
    const base = search.q ? searchProducts(search.q) : products;
    let list = base.filter((p) => {
      if (hidden.has(p.slug)) return false;
      if (search.category && p.category !== search.category) return false;
      if (search.brand && p.brand !== search.brand) return false;
      if (search.concern && !p.concernSlugs.includes(search.concern)) return false;
      return true;
    });


    switch (search.sort) {
      case "name-asc":
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        list = [...list].sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        list = [...list].sort((a, b) => Number(Boolean(b.isNewArrival)) - Number(Boolean(a.isNewArrival)));
        break;
      default:
        break;
    }
    return list;
  }, [search, hidden]);

  const activeCount = [search.category, search.brand, search.concern, search.q].filter(Boolean).length;

  const filters = (
    <div className="space-y-7">
      <FilterGroup title="Category">
        {categories.map((c) => (
          <CheckRow
            key={c.slug}
            id={`cat-${c.slug}`}
            label={c.name}
            checked={search.category === c.slug}
            onChange={(v) => setSearch({ category: v ? c.slug : undefined })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Brand">
        {brands.map((b) => (
          <CheckRow
            key={b}
            id={`brand-${b}`}
            label={b}
            checked={search.brand === b}
            onChange={(v) => setSearch({ brand: v ? b : undefined })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Health concern">
        {healthConcerns.map((c) => (
          <CheckRow
            key={c.slug}
            id={`hc-${c.slug}`}
            label={c.name}
            checked={search.concern === c.slug}
            onChange={(v) => setSearch({ concern: v ? c.slug : undefined })}
          />
        ))}
      </FilterGroup>

      {activeCount > 0 && (
        <Button variant="ghost" onClick={() => navigate({ search: {} })}>
          <X className="h-4 w-4" /> Clear all filters
        </Button>
      )}
    </div>
  );

  return (
    <>
      <div className="border-b border-border bg-cream">
        <div className="container-rhl py-10">
          <p className="eyebrow">Shop</p>
          <h1 className="heading-1 mt-2">Every product on our shelves</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Filter by category, brand or the health concern you are shopping for. Every product here is the same
            record used across the site — including on our health concern guides.
          </p>
        </div>
      </div>

      <div className="container-rhl grid gap-8 py-10 lg:grid-cols-[260px_1fr]">
        <aside aria-label="Product filters" className="hidden lg:block">
          {filters}
        </aside>

        <div>
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <div className="min-w-[200px] flex-1">
              <Label htmlFor="shop-search" className="sr-only">
                Search products
              </Label>
              <Input
                id="shop-search"
                placeholder="Search by product name, brand, SKU or UPC"
                defaultValue={search.q ?? ""}
                onChange={(e) => setSearch({ q: e.target.value || undefined })}
              />
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <SlidersHorizontal className="h-4 w-4" /> Filters{activeCount ? ` (${activeCount})` : ""}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[86vw] max-w-sm overflow-y-auto">
                <SheetTitle className="px-4 pt-4">Filters</SheetTitle>
                <div className="p-4">{filters}</div>
              </SheetContent>
            </Sheet>

            <Select value={search.sort ?? "featured"} onValueChange={(v) => setSearch({ sort: v as never })}>
              <SelectTrigger className="w-[178px]" aria-label="Sort products">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="name-asc">Name: A–Z</SelectItem>
                <SelectItem value="name-desc">Name: Z–A</SelectItem>
                <SelectItem value="rating">Top rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <p className="mb-4 text-sm text-muted-foreground" aria-live="polite">
            Showing {Math.min(visible, filtered.length)} of {filtered.length} product{filtered.length === 1 ? "" : "s"}
            {filtered.length !== products.length ? ` (${products.length} in the full catalog)` : ""}

          </p>

          {filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-12 text-center">
              <p className="font-semibold">No products match those filters</p>
              <p className="mt-1 text-sm text-muted-foreground">Try a different search term or clearing a filter.</p>
            </div>
          ) : (
            <>
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.slice(0, visible).map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
              {visible < filtered.length && (
                <div className="mt-8 flex justify-center">
                  <Button variant="outline" size="lg" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                    Load more products ({filtered.length - visible} left)
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider">{title}</h2>
      <div className="space-y-2.5">{children}</div>
    </section>
  );
}

function CheckRow({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <Checkbox id={id} checked={checked} onCheckedChange={(v) => onChange(Boolean(v))} />
      <Label htmlFor={id} className="cursor-pointer text-sm font-normal">
        {label}
      </Label>
    </div>
  );
}
