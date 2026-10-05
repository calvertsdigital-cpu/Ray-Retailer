/**
 * ArticleHeader — category chip, H1, subtitle, author row, meta row.
 * Matches the mockup exactly.
 */
import { format, parseISO } from "date-fns";
import { Clock } from "lucide-react";
import {
  Heart, HeartPulse, ShieldCheck, Leaf, Sprout,
  Apple, FlaskConical, Brain, CalendarCheck,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Heart, HeartPulse, ShieldCheck, Leaf, Sprout,
  Apple, FlaskConical, Brain, CalendarCheck,
};

interface ArticleHeaderProps {
  category: string;
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
    try { return format(parseISO(date), "MMMM d, yyyy"); }
    catch { return date; }
  })();

  const displayDate = updatedDate && updatedDate !== date
    ? (() => {
        try { return format(parseISO(updatedDate), "MMMM d, yyyy"); }
        catch { return updatedDate; }
      })()
    : formattedDate;

  const initials = author
    .split(" ").slice(0, 2)
    .map((w) => w[0]).join("").toUpperCase();

  return (
    <header>
      {/* Category chip */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold tracking-widest uppercase"
          style={{
            backgroundColor: "var(--accent)",
            borderColor: "oklch(0.52 0.132 150.5 / 0.25)",
            color: "var(--primary)",
          }}
        >
          {CategoryIcon && <CategoryIcon className="h-3.5 w-3.5" aria-hidden="true" />}
          {category}
        </span>
      </div>

      {/* H1 */}
      <h1 className="heading-1" style={{ color: "var(--foreground)" }}>
        {title}
      </h1>

      {/* Subtitle */}
      {subtitle && (
        <p className="mt-2 text-base leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
          {subtitle}
        </p>
      )}

      {/* Author + meta row */}
      <div className="mt-4 flex flex-wrap items-center gap-4">
        {/* Author block */}
        <div className="flex items-center gap-2.5">
          {authorAvatar ? (
            <img
              loading="lazy"
              src={authorAvatar}
              alt={author}
              className="h-9 w-9 rounded-full object-cover shrink-0 border"
              style={{ borderColor: "var(--border)" }}
              width={36}
              height={36}
            />
          ) : (
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold"
              style={{ backgroundColor: "var(--primary)", color: "white" }}
              aria-hidden="true"
            >
              {initials}
            </div>
          )}
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
              By {author}
            </p>
            {authorBrandLine && (
              <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                {authorBrandLine}
              </p>
            )}
          </div>
        </div>

        {/* Divider */}
        <div
          className="hidden sm:block h-8 w-px"
          style={{ backgroundColor: "var(--border)" }}
          aria-hidden="true"
        />

        {/* Date */}
        <time
          dateTime={updatedDate ?? date}
          className="text-sm"
          style={{ color: "var(--muted-foreground)" }}
        >
          {displayDate}
        </time>

        {/* Divider */}
        <div
          className="hidden sm:block h-8 w-px"
          style={{ backgroundColor: "var(--border)" }}
          aria-hidden="true"
        />

        {/* Read time */}
        <span
          className="flex items-center gap-1 text-sm"
          style={{ color: "var(--muted-foreground)" }}
        >
          <Clock className="h-4 w-4" aria-hidden="true" />
          {readTime}
        </span>
      </div>
    </header>
  );
}
