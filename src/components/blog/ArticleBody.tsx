/**
 * ArticleBody — renders structured ArticleSection[] or falls back to a flat
 * string[] for legacy posts.
 *
 * Layout matches the mockup:
 *  • checklist blocks: text on left, supporting image on right (desktop)
 *  • numbered blocks: number badge + text on left, thumbnail on right (desktop)
 */
import { CheckCircle2 } from "lucide-react";

import type { ArticleSection, ContentBlock } from "@/data/blog";

interface ArticleBodyProps {
  sections?: ArticleSection[];
  legacyBody?: string[];
}

// ─── block renderers ────────────────────────────────────────────────────────

function ParagraphBlock({ text }: { text: string }) {
  return (
    <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
      {text}
    </p>
  );
}

function ChecklistBlock({
  items,
  imageUrl,
  imageAlt,
}: {
  items: { text: string }[];
  imageUrl?: string;
  imageAlt?: string;
}) {
  return (
    /* On desktop: checklist left (~60%) + image right (~38%). On mobile: stacked. */
    <div className="mt-4 flex flex-col sm:flex-row sm:items-start sm:gap-6">
      {/* Checklist */}
      <ul className="flex-1 space-y-2.5" aria-label="Key points">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckCircle2
              className="mt-0.5 h-5 w-5 shrink-0"
              style={{ color: "var(--primary)" }}
              aria-hidden="true"
            />
            <span className="text-base" style={{ color: "var(--muted-foreground)" }}>
              {item.text}
            </span>
          </li>
        ))}
      </ul>

      {/* Side image — only on sm+ */}
      {imageUrl && (
        <div className="mt-4 sm:mt-0 sm:w-44 shrink-0">
          <img
            loading="lazy"
            src={imageUrl}
            alt={imageAlt ?? ""}
            className="w-full rounded-xl object-cover"
            style={{ aspectRatio: "4/3" }}
            width={176}
            height={132}
          />
        </div>
      )}
    </div>
  );
}

function NumberedBlock({
  items,
}: {
  items: {
    number: number;
    title: string;
    body: string;
    imageUrl?: string;
    imageAlt?: string;
  }[];
}) {
  return (
    <ol className="mt-4 space-y-8">
      {items.map((item) => (
        <li key={item.number} className="flex flex-col sm:flex-row sm:items-start sm:gap-4">
          {/* Text side */}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-base" style={{ color: "var(--foreground)" }}>
              {item.number}. {item.title}
            </p>
            <p
              className="mt-1.5 text-base leading-relaxed"
              style={{ color: "var(--muted-foreground)" }}
            >
              {item.body}
            </p>
          </div>

          {/* Thumbnail — right side, desktop only */}
          {item.imageUrl && (
            <div className="mt-3 sm:mt-0 sm:w-36 shrink-0">
              <img
                loading="lazy"
                src={item.imageUrl}
                alt={item.imageAlt ?? item.title}
                className="w-full rounded-xl object-cover"
                style={{ aspectRatio: "4/3" }}
                width={144}
                height={108}
              />
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}

function renderBlock(block: ContentBlock, idx: number) {
  switch (block.type) {
    case "paragraph":
      return <ParagraphBlock key={idx} text={block.text} />;

    case "checklist":
      return (
        <ChecklistBlock
          key={idx}
          items={block.items}
          {...(block.imageUrl !== undefined ? { imageUrl: block.imageUrl } : {})}
          {...(block.imageAlt !== undefined ? { imageAlt: block.imageAlt } : {})}
        />
      );

    case "numbered":
      return <NumberedBlock key={idx} items={block.items} />;

    case "callout": {
      const bg =
        block.variant === "warning"
          ? "var(--caution)"
          : "var(--accent)";
      return (
        <div
          key={idx}
          className="mt-4 rounded-xl border p-4 text-sm"
          style={{ background: bg }}
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

// ─── main component ──────────────────────────────────────────────────────────

export function ArticleBody({ sections, legacyBody }: ArticleBodyProps) {
  /* Rich structured content */
  if (sections && sections.length > 0) {
    return (
      <div className="mt-8">
        {sections.map((section) => (
          <section key={section.id} id={section.id} aria-labelledby={`h-${section.id}`}>
            <h2
              id={`h-${section.id}`}
              className="heading-2 mt-10 first:mt-0"
              style={{ color: "var(--primary)" }}
            >
              {section.heading}
            </h2>
            {section.content.map((block, idx) => renderBlock(block, idx))}
          </section>
        ))}
      </div>
    );
  }

  /* Legacy flat paragraphs fallback */
  return (
    <div className="mt-8 space-y-5 text-base leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
      {(legacyBody ?? []).map((para, idx) => (
        <p key={idx}>{para}</p>
      ))}
    </div>
  );
}
