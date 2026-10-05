/**
 * Breadcrumbs — semantic nav with ol/li list.
 * Home › Articles & Blog › {Category} › {Article title}
 */
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

interface BreadcrumbsProps {
  category: string;
  articleTitle: string;
}

export function Breadcrumbs({ category, articleTitle }: BreadcrumbsProps) {
  const crumbs = [
    { label: "Home", to: "/" as const },
    { label: "Articles & Blog", to: "/blog" as const },
    { label: category, to: "/blog" as const },
  ];

  return (
    <nav
      aria-label="Breadcrumb"
      className="border-b"
      style={{ backgroundColor: "var(--cream)", borderColor: "var(--border)" }}
    >
      <div className="container-rhl py-3">
        <ol className="flex flex-wrap items-center gap-1 text-sm" style={{ color: "var(--muted-foreground)" }}>
          {crumbs.map((crumb) => (
            <li key={crumb.label} className="flex items-center gap-1">
              <Link
                to={crumb.to}
                className="hover:underline transition-colors"
                style={{ color: "var(--muted-foreground)" }}
              >
                {crumb.label}
              </Link>
              <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            </li>
          ))}
          <li>
            <span
              className="line-clamp-1 font-medium"
              style={{ color: "var(--foreground)" }}
              aria-current="page"
            >
              {articleTitle}
            </span>
          </li>
        </ol>
      </div>
    </nav>
  );
}
