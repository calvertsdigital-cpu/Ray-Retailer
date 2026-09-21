import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";

interface PriceRangeFilterProps {
  minPrice: number;
  maxPrice: number;
  currentMin: number;
  currentMax: number;
  onChange: (min: number, max: number) => void;
}

export function PriceRangeFilter({
  minPrice,
  maxPrice,
  currentMin,
  currentMax,
  onChange,
}: PriceRangeFilterProps) {
  const [localRange, setLocalRange] = useState([currentMin, currentMax]);

  useEffect(() => {
    setLocalRange([currentMin, currentMax]);
  }, [currentMin, currentMax]);

  const handleSliderChange = (values: number[]) => {
    setLocalRange(values);
  };

  const handleSliderCommit = (values: number[]) => {
    onChange(values[0], values[1]);
  };

  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider">Price Range</h2>
      <div className="space-y-4 px-2">
        <Slider
          min={minPrice}
          max={maxPrice}
          step={1}
          value={localRange}
          onValueChange={handleSliderChange}
          onValueCommit={handleSliderCommit}
          className="w-full"
        />
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">${localRange[0]}</span>
          <span className="text-muted-foreground">—</span>
          <span className="font-medium">${localRange[1]}</span>
        </div>
      </div>
    </section>
  );
}
