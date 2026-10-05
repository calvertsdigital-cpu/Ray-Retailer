import { format, parseISO } from "date-fns";
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
};

interface ArticleHeaderProps {
  category: string;
  categorySlug: string;
  categoryIcon?: string;
  title: string;
  subtitle?: string;
  author: string;
  authorAvatar?: string;
  authorBrandLine?: string;
  date: string;
  updatedDate?: string;
  readTime: string;
}

export function ArticleHeader({
  category,
  categoryIcon,
  title,
  subtitle,
  author,
  authorAvatar,
  authorBrandLine,
  date,
  updatedDate,
  readTime,
}: ArticleHeaderProps) {
  const CategoryIcon = categoryIcon ? ICON_MAP[categoryIcon] : undefined;

  const formattedDate = (() => {
    try {
      return format(parseISO(date), "MMMM d, yyyy");
    } catch {
      return date;
    }
  })();

  const formattedUpdated = (() => {
    if (!updatedDate || updatedDate === date) return null;
    try {
      return format(parseISO(updatedDate), "MMMM d, yyyy");
    } catch {
      return null;
    }
  })();

  const initials = author
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <header>
      {/* Category chip */}
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-accent px-3 py-1 text-xs font-semibold eyebrow">
          {CategoryIcon && <CategoryIcon className="h-3.5 w-3.5" aria-hidden="true" />}
          {category}
        </span>
      </div>

      {/* Headline */}
      <h1 className="heading-1 mt-3">{title}</h1>

      {/* Subtitle */}
      {subtitle && (
        <p className="mt-2 text-lg text-muted-foreground leading-relaxed">{subtitle}</p>
      )}

      {/* Author row */}
      <div className="mt-4 flex items-center gap-3">
        {authorAvatar ? (
          <img
            loading="lazy"
            src={authorAvatar}
            alt={author}
            className="h-10 w-10 rounded-full object-cover shrink-0"
            width={40}
            height={40}
          />
        ) : (
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground"
            aria-hidden="true"
          >
            {initials}
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-foreground">{author}</p>
          {authorBrandLine && (
            <p className="text-xs text-muted-foreground">{authorBrandLine}</p>
          )}
        </div>
      </div>

      {/* Meta row */}
      <p className="mt-1 text-xs text-muted-foreground">
        Published <time dateTime={date}>{formattedDate}</time>
        {formattedUpdated && (
          <>
            {" · "}Updated <time dateTime={updatedDate}>{formattedUpdated}</time>
          </>
        )}
        {" · "}
        {readTime}
      </p>
    </header>
  );
}
