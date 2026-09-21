import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface Category {
  name: string;
  count: number;
}

interface Department {
  name: string;
  categories: Category[];
  isOpen: boolean;
}

interface DepartmentCategoryFilterProps {
  departments: Department[];
  selectedCategories: string[];
  onCategoryChange: (category: string, checked: boolean) => void;
}

export function DepartmentCategoryFilter({
  departments,
  selectedCategories,
  onCategoryChange,
}: DepartmentCategoryFilterProps) {
  const [openDepartments, setOpenDepartments] = useState<Set<string>>(new Set());

  const toggleDepartment = (deptName: string) => {
    setOpenDepartments((prev) => {
      const next = new Set(prev);
      if (next.has(deptName)) {
        next.delete(deptName);
      } else {
        next.add(deptName);
      }
      return next;
    });
  };

  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider">Department</h2>
      <div className="space-y-1">
        {departments.map((dept) => {
          const isOpen = openDepartments.has(dept.name);
          const hasCategories = dept.categories && dept.categories.length > 0;
          const deptProductCount = dept.categories.reduce((sum, cat) => sum + cat.count, 0);

          return (
            <div key={dept.name} className="space-y-1">
              {/* Department Row - Click to expand/collapse */}
              <button
                type="button"
                onClick={() => hasCategories && toggleDepartment(dept.name)}
                className={cn(
                  "w-full flex items-center justify-between gap-2 px-2 py-1.5 rounded text-left transition-colors",
                  hasCategories && "hover:bg-muted cursor-pointer",
                  !hasCategories && "cursor-default opacity-60"
                )}
              >
                <span className="flex-1 text-sm font-medium">
                  {dept.name}
                  {deptProductCount > 0 && (
                    <span className="ml-2 text-xs text-muted-foreground">
                      ({deptProductCount})
                    </span>
                  )}
                </span>
                {hasCategories && (
                  isOpen ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  )
                )}
              </button>

              {/* Categories - Collapsible */}
              {hasCategories && isOpen && (
                <div className="ml-4 space-y-2 border-l-2 border-border pl-3 py-1">
                  {dept.categories.map((cat) => {
                    const isCatSelected = selectedCategories.includes(cat.name);
                    return (
                      <div key={cat.name} className="flex items-center gap-2">
                        <Checkbox
                          id={`cat-${dept.name}-${cat.name}`}
                          checked={isCatSelected}
                          onCheckedChange={(v) => onCategoryChange(cat.name, Boolean(v))}
                        />
                        <Label
                          htmlFor={`cat-${dept.name}-${cat.name}`}
                          className="flex-1 cursor-pointer text-sm font-normal"
                        >
                          {cat.name}
                          {cat.count > 0 && (
                            <span className="ml-1.5 text-xs text-muted-foreground">
                              ({cat.count})
                            </span>
                          )}
                        </Label>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
