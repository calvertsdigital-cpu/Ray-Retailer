import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";

import { ProductCard } from "@/components/site/ProductCard";
import { DepartmentCategoryFilter } from "@/components/site/DepartmentCategoryFilter";
import { PriceRangeFilter } from "@/components/site/PriceRangeFilter";
import { AvailabilityFilter } from "@/components/site/AvailabilityFilter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { hiddenSlugs } from "@/lib/cms";
import { fetchProducts, convertBackendProduct } from "@/lib/api";
import taxonomyData from "../../department-category-taxonomy.json";

const searchSchema = z.object({
  q: z.string().optional(),
  categories: z.array(z.string()).optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  inStock: z.boolean().optional(),
  outOfStock: z.boolean().optional(),
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
  const [backendProducts, setBackendProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Category filter state only (no department selection)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(search.categories || []);
  
  // Sync state with URL when URL changes
  useEffect(() => {
    setSelectedCategories(search.categories || []);
  }, [search.categories]);
  
  // Price filter state
  const [priceRange, setPriceRange] = useState<[number, number]>([
    search.minPrice || 0,
    search.maxPrice || 200
  ]);
  
  // Availability filter state
  const [showInStock, setShowInStock] = useState(search.inStock ?? true);
  const [showOutOfStock, setShowOutOfStock] = useState(search.outOfStock ?? true);

  const setSearch = (next: Partial<z.infer<typeof searchSchema>>) =>
    (setVisible(PAGE_SIZE), navigate({ search: (prev) => ({ ...prev, ...next }) }));

  const [hidden, setHidden] = useState<Set<string>>(new Set());
  useEffect(() => setHidden(hiddenSlugs()), []);

  // Fetch products from backend
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const categories = search.categories || [];
        
        console.log('🔄 Fetching with categories:', categories);
        
        const backendProds = await fetchProducts({
          limit: 500,
          search: search.q || '',
          departments: [], // No department filtering
          categories: categories,
          minPrice: search.minPrice,
          maxPrice: search.maxPrice,
        });
        const converted = backendProds.map(p => convertBackendProduct(p, true)); // true = apply 20% retail markup
        
        console.log('✅ Converted products:', converted.length, 'products');
        console.log('📦 Sample product:', converted[0]);
        
        setBackendProducts(converted);
      } catch (error) {
        console.error('Error fetching backend products:', error);
        setBackendProducts([]);
      }
      setLoading(false);
    };
    fetchData();
  }, [search.q, search.categories, search.minPrice, search.maxPrice]);

  // Use ONLY backend products (no demo products)
  const allProducts = backendProducts;

  const filtered = useMemo(() => {
    const base = search.q ? allProducts.filter(p => 
      p.name.toLowerCase().includes(search.q!.toLowerCase()) ||
      p.sku?.toLowerCase().includes(search.q!.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.q!.toLowerCase())
    ) : allProducts;
    
    let list = base.filter((p) => {
      if (hidden.has(p.slug)) return false;
      
      // Availability filter
      if (!showInStock && !showOutOfStock) return true; // Show all if both unchecked
      if (showInStock && showOutOfStock) return true; // Show all if both checked
      if (showInStock && !p.inStock) return false;
      if (showOutOfStock && p.inStock) return false;
      
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
        list = [...list].sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "newest":
        list = [...list].sort((a, b) => Number(Boolean(b.isNewArrival)) - Number(Boolean(a.isNewArrival)));
        break;
      default:
        break;
    }
    return list;
  }, [search, hidden, allProducts, showInStock, showOutOfStock]);

  // Prepare department data with counts
  const departmentData = useMemo(() => {
    return taxonomyData.departments.map((dept: any) => {
      // Count products in this department
      const deptProducts = allProducts.filter(p => p.department === dept.department);
      
      // Count products per category
      const categoriesWithCounts = (dept.categories || []).map((catName: string) => ({
        name: catName,
        count: allProducts.filter(p => p.department === dept.department && p.category === catName).length
      }));

      return {
        name: dept.department,
        categories: categoriesWithCounts,
        isOpen: false
      };
    });
  }, [allProducts]);

  // Calculate min/max prices from all products
  const priceExtent = useMemo(() => {
    if (allProducts.length === 0) return { min: 0, max: 200 };
    const prices = allProducts.map(p => p.price || 0);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices))
    };
  }, [allProducts]);

  // Filter handlers - Only category selection
  const handleCategoryChange = (category: string, checked: boolean) => {
    const updated = checked
      ? [...selectedCategories, category]
      : selectedCategories.filter(c => c !== category);
    setSelectedCategories(updated);
    setSearch({ categories: updated.length > 0 ? updated : undefined });
  };

  const handlePriceChange = (min: number, max: number) => {
    setPriceRange([min, max]);
    setSearch({ minPrice: min, maxPrice: max });
  };

  const handleInStockChange = (checked: boolean) => {
    setShowInStock(checked);
    setSearch({ inStock: checked });
  };

  const handleOutOfStockChange = (checked: boolean) => {
    setShowOutOfStock(checked);
    setSearch({ outOfStock: checked });
  };

  const activeCount = [
    search.q,
    ...(selectedCategories.length > 0 ? [true] : []),
  ].filter(Boolean).length;

  const filters = (
    <div className="space-y-7">
      {/* Department & Category Filter */}
      <DepartmentCategoryFilter
        departments={departmentData}
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
      />

      {/* Price Range Filter */}
      <PriceRangeFilter
        minPrice={priceExtent.min}
        maxPrice={priceExtent.max}
        currentMin={priceRange[0]}
        currentMax={priceRange[1]}
        onChange={handlePriceChange}
      />

      {/* Availability Filter */}
      <AvailabilityFilter
        showInStock={showInStock}
        showOutOfStock={showOutOfStock}
        onInStockChange={handleInStockChange}
        onOutOfStockChange={handleOutOfStockChange}
      />

      {activeCount > 0 && (
        <Button variant="ghost" onClick={() => {
          setSelectedCategories([]);
          setPriceRange([priceExtent.min, priceExtent.max]);
          setShowInStock(true);
          setShowOutOfStock(true);
          navigate({ search: {} });
        }}>
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
            {loading ? (
              'Loading products...'
            ) : (
              <>
                Showing {Math.min(visible, filtered.length)} of {filtered.length} product{filtered.length === 1 ? "" : "s"}
              </>
            )}
          </p>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                <p className="mt-4 text-sm text-muted-foreground">Loading products from backend...</p>
              </div>
            </div>
          ) : filtered.length === 0 ? (
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
