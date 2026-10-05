/**
 * FeatureMedia — full-width hero image with an optional bold overlay text
 * in the bottom-left corner, separated from the image by a dark gradient.
 * The green accent underline bar beneath the text matches the mockup.
 */
interface FeatureMediaProps {
  src: string;
  alt: string;
  /** Bold headline displayed over the bottom-left of the image */
  overlayText?: string;
}

export function FeatureMedia({ src, alt, overlayText }: FeatureMediaProps) {
  return (
    <div className="relative mt-6 w-full overflow-hidden rounded-xl">
      <img
        loading="lazy"
        src={src}
        alt={alt}
        className="w-full object-cover"
        style={{ aspectRatio: "16/7", maxHeight: "420px" }}
        width={1164}
        height={509}
      />

      {/* Dark gradient scrim — only rendered when overlay text is present */}
      {overlayText && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.30) 55%, transparent 100%)",
          }}
          aria-hidden="true"
        />
      )}

      {overlayText && (
        <div className="absolute bottom-0 left-0 px-6 py-6 max-w-[55%]">
          <p className="text-white font-bold leading-tight" style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)" }}>
            {overlayText}
          </p>
          {/* Green accent underline bar — matches mockup */}
          <div
            className="mt-2 h-1 w-12 rounded-full"
            style={{ backgroundColor: "var(--primary)" }}
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
}
