/**
 * TeaCoffeeFilterBar
 * Collapsible filter panel for collection pages.
 * Coffee: Coffee Type + Preparation
 * Tea: Tea Type + Botanical Family
 */

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { CoffeeType, TeaType, GrindPreparation } from "@/data/tea-coffee/types";
import { COFFEE_TYPE_META, GRIND_LABELS } from "@/lib/tea-coffee-loader";

export interface TeaCoffeeFilterBarProps {
  productType: "tea" | "coffee";
  coffeeTypes?: CoffeeType[];
  teaTypes?: TeaType[];
  selectedCoffeeType?: CoffeeType | null;
  selectedGrind?: GrindPreparation | null;
  selectedTeaType?: TeaType | null;
  selectedBotanicalFamily?: string | null;
  onCoffeeTypeChange?: (type: CoffeeType | null) => void;
  onGrindChange?: (grind: GrindPreparation | null) => void;
  onTeaTypeChange?: (type: TeaType | null) => void;
  onBotanicalFamilyChange?: (family: string | null) => void;
}

export function TeaCoffeeFilterBar({
  productType,
  coffeeTypes = [],
  teaTypes = [],
  selectedCoffeeType,
  selectedGrind,
  selectedTeaType,
  selectedBotanicalFamily,
  onCoffeeTypeChange,
  onGrindChange,
  onTeaTypeChange,
  onBotanicalFamilyChange,
}: TeaCoffeeFilterBarProps) {
  const [open, setOpen] = useState(true);

  if (productType === "coffee") {
    return (
      <div className="rounded-lg border border-gray-200 bg-white">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between px-4 py-3 font-semibold text-gray-900 hover:bg-gray-50"
        >
          <span>Filter</span>
          <ChevronDown className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <div className="border-t border-gray-100 px-4 py-3 space-y-4">
            {/* Coffee Type */}
            <div>
              <p className="mb-2 text-sm font-semibold text-gray-700">Coffee Type</p>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="coffee-type"
                    checked={!selectedCoffeeType}
                    onChange={() => onCoffeeTypeChange?.(null)}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-600">All Types</span>
                </label>
                {coffeeTypes.map((type) => (
                  <label key={type} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="coffee-type"
                      checked={selectedCoffeeType === type}
                      onChange={() => onCoffeeTypeChange?.(type)}
                      className="rounded"
                    />
                    <span
                      className="inline-block w-3 h-3 rounded-full"
                      style={{ backgroundColor: COFFEE_TYPE_META[type].color }}
                    />
                    <span className="text-sm text-gray-600">{COFFEE_TYPE_META[type].label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Grind Preparation */}
            <div>
              <p className="mb-2 text-sm font-semibold text-gray-700">Grind</p>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="grind"
                    checked={!selectedGrind}
                    onChange={() => onGrindChange?.(null)}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-600">All Grinds</span>
                </label>
                {(["whole-bean", "medium-ground", "fine-specialty-grind"] as GrindPreparation[]).map((grind) => (
                  <label key={grind} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="grind"
                      checked={selectedGrind === grind}
                      onChange={() => onGrindChange?.(grind)}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-600">{GRIND_LABELS[grind]}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Tea filters
  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3 font-semibold text-gray-900 hover:bg-gray-50"
      >
        <span>Filter</span>
        <ChevronDown className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="border-t border-gray-100 px-4 py-3 space-y-4">
          {/* Tea Type */}
          <div>
            <p className="mb-2 text-sm font-semibold text-gray-700">Tea Type</p>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="tea-type"
                  checked={!selectedTeaType}
                  onChange={() => onTeaTypeChange?.(null)}
                  className="rounded"
                />
                <span className="text-sm text-gray-600">All Types</span>
              </label>
              {teaTypes.map((type) => (
                <label key={type} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="tea-type"
                    checked={selectedTeaType === type}
                    onChange={() => onTeaTypeChange?.(type)}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-600">
                    {type
                      .split("-")
                      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                      .join(" ")}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
