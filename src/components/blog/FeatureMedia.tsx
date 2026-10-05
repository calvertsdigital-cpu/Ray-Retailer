interface FeatureMediaProps {
  src: string;
  alt: string;
  overlayText?: string;
}

export function FeatureMedia({ src, alt, overlayText }: FeatureMediaProps) {
  return (
    <div className="relative mt-6 w-full overflow-hidden rounded-xl">
      <img
        loading="lazy"
        src={src}
        alt={alt}
        className="w-full aspect-[16/7] object-cover"
        width={1164}
        height={509}
      />
      {overlayText && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-6 py-6">
          <p className="text-white text-lg font-semibold leading-snug">{overlayText}</p>
        </div>
      )}
    </div>
  );
}
