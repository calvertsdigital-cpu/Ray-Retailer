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
  BookOpen,
  LucideIcon,
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
  BookOpen,
};

interface Category {
  slug: string;
  label: string;
  icon: string;
}

interface TopicExplorerProps {
  categories: Category[];
}

export function TopicExplorer({ categories }: TopicExplorerProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h2 className="font-semibold text-sm text-foreground mb-3">Explore More Articles</h2>
      <div className="grid grid-cols-2 gap-2">
        {categories.map((cat) => {
          const Icon = ICON_MAP[cat.icon] ?? BookOpen;
          return (
            <Link
              key={cat.slug}
              to="/blog"
              className="flex min-h-[44px] items-center gap-2 rounded-lg px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
              aria-label={`Browse ${cat.label} articles`}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="text-xs leading-tight">{cat.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
