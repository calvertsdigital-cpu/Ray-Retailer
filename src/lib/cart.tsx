import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export interface CartLine {
  slug: string;
  variantId?: string;
  qty: number;
}

interface CartApi {
  lines: CartLine[];
  count: number;
  add: (slug: string, qty?: number, variantId?: string) => void;
  addMany: (items: { slug: string; qty: number }[]) => void;
  setQty: (slug: string, qty: number, variantId?: string) => void;
  remove: (slug: string, variantId?: string) => void;
  clear: () => void;
  hydrated: boolean;
}

const CartContext = createContext<CartApi | null>(null);
const STORAGE_KEY = "rhl.cart.v1";

const sameLine = (l: CartLine, slug: string, variantId?: string) =>
  l.slug === slug && (l.variantId ?? "") === (variantId ?? "");

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const add = useCallback((slug: string, qty = 1, variantId?: string) => {
    setLines((prev) => {
      const existing = prev.find((l) => sameLine(l, slug, variantId));
      if (existing) {
        return prev.map((l) => (sameLine(l, slug, variantId) ? { ...l, qty: l.qty + qty } : l));
      }
      const line: CartLine = variantId === undefined ? { slug, qty } : { slug, qty, variantId };
      return [...prev, line];
    });
  }, []);

  const addMany = useCallback((items: { slug: string; qty: number }[]) => {
    setLines((prev) => {
      const next = [...prev];
      for (const item of items) {
        const idx = next.findIndex((l) => sameLine(l, item.slug));
        const current = next[idx];
        if (idx >= 0 && current) next[idx] = { ...current, qty: current.qty + item.qty };
        else next.push({ slug: item.slug, qty: item.qty });
      }
      return next;
    });
  }, []);

  const setQty = useCallback((slug: string, qty: number, variantId?: string) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => !sameLine(l, slug, variantId))
        : prev.map((l) => (sameLine(l, slug, variantId) ? { ...l, qty } : l)),
    );
  }, []);

  const remove = useCallback((slug: string, variantId?: string) => {
    setLines((prev) => prev.filter((l) => !sameLine(l, slug, variantId)));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartApi>(
    () => ({
      lines,
      count: lines.reduce((sum, l) => sum + l.qty, 0),
      add,
      addMany,
      setQty,
      remove,
      clear,
      hydrated,
    }),
    [lines, add, addMany, setQty, remove, clear, hydrated],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartApi {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
