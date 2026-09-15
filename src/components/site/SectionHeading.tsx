import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  action?: { label: string; to: "/shop" | "/health-concerns" | "/blog" };
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h2 className="heading-2">{title}</h2>
        {description && <p className="mt-2 text-muted-foreground">{description}</p>}
      </div>
      {action && (
        <Link
          to={action.to}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark"
        >
          {action.label} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
