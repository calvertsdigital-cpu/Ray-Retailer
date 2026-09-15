import { Play } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import type { ProductMedia as Media } from "@/data/types";

/**
 * Top-section media system: LEFT vertical thumbnail rail (horizontal, swipeable
 * on mobile) + CENTER stable-size active display. Only one video thumbnail is
 * ever rendered in the stack.
 */
export function ProductMediaGallery({ media, productName }: { media: Media[]; productName: string }) {
  const published = media.filter((m) => m.published).sort((a, b) => a.sortOrder - b.sortOrder);
  const images = published.filter((m) => m.type === "image");
  const video = published.find((m) => m.type === "video");
  const stack = video ? [...images, video] : images;

  const [activeId, setActiveId] = useState(stack[0]?.id);
  const active = stack.find((m) => m.id === activeId) ?? stack[0];

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      {/* LEFT COLUMN — vertical thumbnails on desktop, swipeable row on mobile */}
      <div
        role="tablist"
        aria-label={`${productName} media`}
        className="no-scrollbar order-2 flex gap-3 overflow-x-auto pb-1 md:order-1 md:w-20 md:flex-col md:overflow-visible md:pb-0"
      >
        {stack.map((m) => (
          <button
            key={m.id}
            role="tab"
            type="button"
            aria-selected={m.id === active?.id}
            aria-label={m.label}
            onClick={() => setActiveId(m.id)}
            className={cn(
              "relative aspect-square h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-secondary transition-colors md:h-auto md:w-full",
              m.id === active?.id ? "border-primary" : "border-border hover:border-primary/50",
            )}
          >
            <img
              src={m.type === "video" ? (m.poster ?? m.src) : m.src}
              alt={m.alt}
              loading="lazy"
              width={160}
              height={160}
              className="h-full w-full object-cover"
            />
            {m.type === "video" && (
              <>
                <span className="absolute inset-0 grid place-items-center bg-foreground/35">
                  <Play className="h-5 w-5 fill-background text-background" />
                </span>
                {m.approved && (
                  <span className="absolute inset-x-0 bottom-0 bg-primary py-0.5 text-[9px] font-semibold uppercase tracking-wide text-primary-foreground">
                    Approved
                  </span>
                )}
              </>
            )}
          </button>
        ))}
      </div>

      {/* CENTER COLUMN — stable dimensions, no layout jump on media change */}
      <div className="order-1 flex-1 md:order-2">
        <div className="aspect-square w-full overflow-hidden rounded-xl border border-border bg-secondary">
          {active?.type === "video" ? (
            <video
              key={active.id}
              controls
              playsInline
              preload="none"
              poster={active.poster}
              className="h-full w-full bg-foreground object-cover"
            >
              <source src={active.src} type="video/mp4" />
              Your browser does not support embedded video.
            </video>
          ) : (
            <img
              key={active?.id}
              src={active?.src}
              alt={active?.alt ?? productName}
              width={900}
              height={900}
              className="h-full w-full object-cover"
            />
          )}
        </div>
        {active && <p className="mt-2 text-center text-xs text-muted-foreground">{active.label}</p>}
      </div>
    </div>
  );
}
