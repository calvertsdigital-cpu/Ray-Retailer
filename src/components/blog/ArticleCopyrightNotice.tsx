import { GLOBAL_COPYRIGHT_NOTICE } from "@/data/blog";

export function ArticleCopyrightNotice() {
  const year = new Date().getFullYear();
  const text = GLOBAL_COPYRIGHT_NOTICE.replace("{year}", String(year));

  return (
    <aside className="mt-6 rounded-xl border border-border bg-secondary p-4">
      <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
    </aside>
  );
}
