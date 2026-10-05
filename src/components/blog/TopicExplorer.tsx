/**
 * TopicExplorer — 2-column category grid with coloured icons.
 * Matches the mockup "Explore More Articles" sidebar module.
 */
import { Link } from "@tanstack/react-router";
import {
  Heart,
  HeartPulse,
  ShieldCheck,
  Leaf,
  Sprout,
  Apple,
  FlaskConical,
  Brain,
  CalendarCheck,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Heart,
  HeartPulse,
  ShieldCheck,
  Leaf,
  Sprout,
  Apple,
  FlaskConical,
  Brain,
  CalendarCheck,
};

// Accent colours for each category icon — matches mockup
const ICON_COLOURS: Record<string, string> = {
  Heart:        "#ef4444", // red
  HeartPulse:   "#f97316", // orange
  ShieldCheck:  "#3b82f6", // blue
  Leaf:         "#16a34a", // green
  Sprout:       "#22c55e", // light green
  Apple:        "#f97316", // orange
  FlaskConical: "#8b5cf6", // purple
  Brain:        "#a855f7", // violet
  CalendarCheck:"#6366f1", // indigo
};

interface CategoryItem {
  slug: string;
  label: string;
  icon: string;
}

interface TopicExplorerProps {
  categories: CategoryItem[];
}

export function TopicExplorer({ categories }: TopicExplorerProps) {
  return (
    <div
      className="rounded-xl border bg-white p-5"
      style={{ borderColor: "var(--border)" }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Sprout className="h-5 w-5" style={{ color: "var(--primary)" }} aria-hidden="true" />
        <h2 className="font-bold text-base" style={{ color: "var(--foreground)" }}>
          Explore More Articles
        </h2>
      </div>

      {/* 2-column grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
        {categories.map((cat) => {
          const Icon = ICON_MAP[cat.icon] ?? Leaf;
          const colour = ICON_COLOURS[cat.icon] ?? "var(--primary)";
          return (
            <Link
              key={cat.slug}
              to="/blog"
              className="flex items-center gap-2 text-sm font-medium rounded-lg px-2 py-1.5 transition-colors hover:bg-gray-50 min-h-[44px]"
              style={{ color: "var(--foreground)" }}
            >
              <Icon
                className="h-4 w-4 shrink-0"
                style={{ color: colour }}
                aria-hidden="true"
              />
              <span className="leading-tight">{cat.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
