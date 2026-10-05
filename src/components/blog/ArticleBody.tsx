import { CheckCircle2 } from "lucide-react";

import type { ArticleSection, ContentBlock } from "@/data/blog";

interface ArticleBodyProps {
  sections?: ArticleSection[];
  legacyBody?: string[];
}

function renderBlock(block: ContentBlock, idx: number) {
  switch (block.type) {
    case "paragraph":
      return (
        <p key={idx} className="mt-4 text-base leading-relaxed text-muted-foreground">
          {block.text}
        </p>
      );

    case "checklist":
      return (
        <ul key={idx} className="mt-4 space-y-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2
                className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                aria-hidden="true"
              />
              <span className="text-base text-muted-foreground">{item.text}</span>
            </li>
          ))}
        </ul>
      );

    case "numbered":
      return (
        <ol key={idx} className="mt-4 space-y-6">
          {block.items.map((item) => (
            <li key={item.number} className="flex items-start gap-4">
              {/* Number badge */}
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground"
                aria-hidden="true"
              >
                {item.number}
              </span>
              {/* Text content */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground">{item.title}</p>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
              {/* Optional thumbnail — hidden on mobile */}
              {item.imageUrl && (
                <img
                  loading="lazy"
                  src={item.imageUrl}
                  alt={item.imageAlt ?? item.title}
                  className="hidden sm:block h-20 w-20 shrink-0 rounded-lg object-cover"
                  width={80}
                  height={80}
                />
              )}
            </li>
          ))}
        </ol>
      );

    case "callout": {
      const bgClass =
        block.variant === "warning"
          ? "bg-caution border-caution-foreground/20"
          : "bg-accent border-border";
      return (
        <div
          key={idx}
          className={`mt-4 rounded-xl border p-4 text-sm ${bgClass}`}
          role="note"
        >
          {block.text}
        </div>
      );
    }

    default:
      return null;
  }
}

export function ArticleBody({ sections, legacyBody }: ArticleBodyProps) {
  if (sections && sections.length > 0) {
    return (
      <div className="mt-8">
        {sections.map((section) => (
          <section key={section.id} id={section.id} aria-labelledby={`heading-${section.id}`}>
            <h2
              id={`heading-${section.id}`}
              className="heading-2 mt-10 mb-4"
            >
              {section.heading}
            </h2>
            {section.content.map((block, idx) => renderBlock(block, idx))}
          </section>
        ))}
      </div>
    );
  }

  // Legacy flat body fallback
  return (
    <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
      {(legacyBody ?? []).map((para, idx) => (
        <p key={idx}>{para}</p>
      ))}
    </div>
  );
}
