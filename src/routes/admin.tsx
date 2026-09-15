import { createFileRoute } from "@tanstack/react-router";
import { Download, Eye, EyeOff, RotateCcw, Save, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { categories, products } from "@/data/catalog";
import {
  ADMIN_FLAG_KEY,
  readOverrides,
  writeOverrides,
  type OverrideMap,
  type ProductOverride,
} from "@/lib/cms";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin | Ray's Healthy Living" },
      { name: "description", content: "Manage the Ray's Healthy Living product catalog: names, brands, categories, descriptions, prices, images and visibility." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Admin | Ray's Healthy Living" },
      { property: "og:description", content: "Internal catalog management for Ray's Healthy Living." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

const PASSCODE = "rayadmin";

function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState("");

  useEffect(() => {
    setUnlocked(window.localStorage.getItem(ADMIN_FLAG_KEY) === "granted");
  }, []);

  if (!unlocked) {
    return (
      <div className="container-rhl section-y max-w-sm">
        <p className="eyebrow mb-2">Admin</p>
        <h1 className="heading-1">Store management</h1>
        <form
          className="mt-6 space-y-4 rounded-xl border border-border bg-card p-6"
          onSubmit={(e) => {
            e.preventDefault();
            if (code.trim() !== PASSCODE) {
              toast.error("That code isn't right");
              return;
            }

            window.localStorage.setItem(ADMIN_FLAG_KEY, "granted");
            setUnlocked(true);
          }}
        >
          <div className="grid gap-1.5">
            <Label htmlFor="admin-code">Access code</Label>
            <Input id="admin-code" type="password" value={code} onChange={(e) => setCode(e.target.value)} />
          </div>
          <Button type="submit" className="w-full">
            Unlock
          </Button>
        </form>
      </div>
    );
  }

  return <AdminDashboard />;
}

function AdminDashboard() {
  const [overrides, setOverrides] = useState<OverrideMap>({});
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(products[0]?.slug ?? "");

  useEffect(() => setOverrides(readOverrides()), []);

  const save = (next: OverrideMap) => {
    setOverrides(next);
    writeOverrides(next);
  };

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? products.filter((p) => `${p.name} ${p.brand} ${p.sku} ${p.upc ?? ""}`.toLowerCase().includes(q))
      : products;
    return list.slice(0, 200);
  }, [query]);

  const product = products.find((p) => p.slug === selected);
  const patch: ProductOverride = (product && overrides[product.slug]) ?? {};

  const update = (field: keyof ProductOverride, value: unknown) => {
    if (!product) return;
    save({ ...overrides, [product.slug]: { ...patch, [field]: value } });
  };

  return (
    <div className="container-rhl section-y">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow mb-2">Admin</p>
          <h1 className="heading-1">Product catalog</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {products.length} products imported from the 2026 order catalog. Edits save instantly and apply across the
            whole site.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() => {
              const blob = new Blob([JSON.stringify(overrides, null, 2)], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "rhl-catalog-edits.json";
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            <Download className="h-4 w-4" /> Export edits
          </Button>
          <Button variant="outline" onClick={() => window.location.reload()}>
            <Save className="h-4 w-4" /> Apply to storefront
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              window.localStorage.removeItem(ADMIN_FLAG_KEY);
              window.location.href = "/";
            }}
          >
            Sign out
          </Button>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]">
        <aside className="rounded-xl border border-border bg-card p-4">
          <Label htmlFor="admin-search" className="sr-only">
            Search products
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="admin-search"
              className="pl-9"
              placeholder="Search name, brand, item # or UPC"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <ul className="mt-3 max-h-[60vh] space-y-1 overflow-y-auto pr-1">
            {matches.map((p) => (
              <li key={p.slug}>
                <button
                  type="button"
                  onClick={() => setSelected(p.slug)}
                  className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-secondary ${
                    p.slug === selected ? "bg-secondary font-medium" : ""
                  }`}
                >
                  <span className="block truncate">{overrides[p.slug]?.name ?? p.name}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {p.sku}
                    {overrides[p.slug]?.hidden ? " · hidden" : ""}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {product ? (
          <section className="space-y-5 rounded-xl border border-border bg-card p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="heading-2">{patch.name ?? product.name}</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => update("hidden", !patch.hidden)}>
                  {patch.hidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  {patch.hidden ? "Hidden" : "Visible"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const next = { ...overrides };
                    delete next[product.slug];
                    save(next);
                    toast.success("Edits reset for this product");
                  }}
                >
                  <RotateCcw className="h-4 w-4" /> Reset
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Product name (name only — no size or pack)" id="f-name">
                <Input id="f-name" value={patch.name ?? product.name} onChange={(e) => update("name", e.target.value)} />
              </Field>
              <Field label="Brand" id="f-brand">
                <Input id="f-brand" value={patch.brand ?? product.brand} onChange={(e) => update("brand", e.target.value)} />
              </Field>
              <Field label="Category" id="f-cat">
                <select
                  id="f-cat"
                  className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={patch.category ?? product.category}
                  onChange={(e) => update("category", e.target.value)}
                >
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Price (0 = not published)" id="f-price">
                <Input
                  id="f-price"
                  type="number"
                  min={0}
                  step="0.01"
                  value={patch.price ?? product.price}
                  onChange={(e) => update("price", Number(e.target.value))}
                />
              </Field>
              <Field label="Main image URL" id="f-img" className="sm:col-span-2">
                <Input
                  id="f-img"
                  placeholder="https://…"
                  value={patch.image ?? ""}
                  onChange={(e) => update("image", e.target.value)}
                />
              </Field>
              <Field label="Short support line (shown on cards)" id="f-support" className="sm:col-span-2">
                <Input
                  id="f-support"
                  value={patch.supportStatement ?? product.supportStatement}
                  onChange={(e) => update("supportStatement", e.target.value)}
                />
              </Field>
              <Field label="Short description" id="f-short" className="sm:col-span-2">
                <Textarea
                  id="f-short"
                  rows={2}
                  value={patch.shortDescription ?? product.shortDescription}
                  onChange={(e) => update("shortDescription", e.target.value)}
                />
              </Field>
              <Field label="Full description (one paragraph per line)" id="f-long" className="sm:col-span-2">
                <Textarea
                  id="f-long"
                  rows={6}
                  value={(patch.longDescription ?? product.longDescription).join("\n")}
                  onChange={(e) => update("longDescription", e.target.value.split("\n").filter(Boolean))}
                />
              </Field>
            </div>

            <dl className="grid gap-2 border-t border-border pt-4 text-sm text-muted-foreground sm:grid-cols-3">
              <div>
                <dt className="font-medium text-foreground">Item #</dt>
                <dd>{product.sku}</dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">UPC</dt>
                <dd>{product.upc ?? "—"}</dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Sizes</dt>
                <dd>{product.variants?.map((v) => v.label).join(", ") ?? "Single size"}</dd>
              </div>
            </dl>
          </section>
        ) : null}
      </div>
    </div>
  );
}

function Field({
  label,
  id,
  className,
  children,
}: {
  label: string;
  id: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`grid gap-1.5 ${className ?? ""}`}>
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  );
}
