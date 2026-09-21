import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface AvailabilityFilterProps {
  showInStock: boolean;
  showOutOfStock: boolean;
  onInStockChange: (checked: boolean) => void;
  onOutOfStockChange: (checked: boolean) => void;
}

export function AvailabilityFilter({
  showInStock,
  showOutOfStock,
  onInStockChange,
  onOutOfStockChange,
}: AvailabilityFilterProps) {
  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider">Availability</h2>
      <div className="space-y-2.5">
        <div className="flex items-center gap-2.5">
          <Checkbox
            id="availability-in-stock"
            checked={showInStock}
            onCheckedChange={(v) => onInStockChange(Boolean(v))}
          />
          <Label htmlFor="availability-in-stock" className="cursor-pointer text-sm font-normal">
            In Stock
          </Label>
        </div>
        <div className="flex items-center gap-2.5">
          <Checkbox
            id="availability-out-of-stock"
            checked={showOutOfStock}
            onCheckedChange={(v) => onOutOfStockChange(Boolean(v))}
          />
          <Label htmlFor="availability-out-of-stock" className="cursor-pointer text-sm font-normal">
            Out of Stock
          </Label>
        </div>
      </div>
    </section>
  );
}
