/**
 * CoffeeFamilyBadge
 * Color-coded badge for coffee family (Arabica, Robusta, Culi)
 * Used on product cards and detail pages
 */

import type { CoffeeType } from "@/data/tea-coffee/types";
import { COFFEE_TYPE_META } from "@/lib/tea-coffee-loader";

export interface CoffeeFamilyBadgeProps {
  coffeeType: CoffeeType;
  className?: string;
}

export function CoffeeFamilyBadge({ coffeeType, className = "" }: CoffeeFamilyBadgeProps) {
  const meta = COFFEE_TYPE_META[coffeeType];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold text-white ${className}`}
      style={{ backgroundColor: meta.color }}
      title={meta.label}
    >
      {meta.label}
    </span>
  );
}
