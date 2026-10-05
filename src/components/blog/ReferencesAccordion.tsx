/**
 * ReferencesAccordion — collapsible references list.
 * Uses Radix accordion. Closed by default. Hidden when empty.
 */
import * as Accordion from "@radix-ui/react-accordion";
import { Plus, BookOpen } from "lucide-react";

import type { ArticleReference } from "@/data/blog";

interface ReferencesAccordionProps {
  references: ArticleReference[];
}

export function ReferencesAccordion({ references }: ReferencesAccordionProps) {
  if (!references || references.length === 0) return null;

  return (
    <div className="mt-8">
      <Accordion.Root type="single" collapsible>
        <Accordion.Item
          value="references"
          className="rounded-xl border overflow-hidden"
          style={{ borderColor: "var(--border)" }}
        >
          <Accordion.Header>
            <Accordion.Trigger
              className="flex w-full items-center justify-between px-5 py-4 text-left font-semibold text-sm transition-colors hover:bg-gray-50 group"
              style={{ color: "var(--foreground)" }}
            >
              <span className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" style={{ color: "var(--primary)" }} aria-hidden="true" />
                References &amp; Sources
              </span>
              <Plus
                className="h-5 w-5 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-45"
                style={{ color: "var(--muted-foreground)" }}
                aria-hidden="true"
              />
            </Accordion.Trigger>
          </Accordion.Header>

          <Accordion.Content className="overflow-hidden data-[state=open]:animate-none data-[state=closed]:animate-none">
            <ol className="px-5 pb-5 space-y-3">
              {references.map((ref, idx) => (
                <li key={ref.id} className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                  <span className="font-semibold" style={{ color: "var(--foreground)" }}>
                    {idx + 1}.{" "}
                  </span>
                  {ref.authors && <span>{ref.authors}. </span>}
                  <span className="italic">{ref.title}. </span>
                  {ref.publisher && <span>{ref.publisher}. </span>}
                  {ref.year && <span>{ref.year}. </span>}
                  {ref.url && (
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline break-all"
                      style={{ color: "var(--primary)" }}
                    >
                      {ref.url}
                    </a>
                  )}
                </li>
              ))}
            </ol>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  );
}
