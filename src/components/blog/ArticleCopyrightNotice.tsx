/**
 * ArticleCopyrightNotice — renders the global copyright/reuse notice with
 * the current year injected dynamically. Always separate from the disclaimer.
 */
import { GLOBAL_COPYRIGHT_NOTICE } from "@/data/blog";

export function ArticleCopyrightNotice() {
  const year = new Date().getFullYear();
  const text = GLOBAL_COPYRIGHT_NOTICE.replace("{year}", String(year));

  return (
    <p
      className="mt-6 text-xs leading-relaxed text-center border-t pt-6"
      style={{ color: "var(--muted-foreground)", borderColor: "var(--border)" }}
    >
      {text}
    </p>
  );
}
