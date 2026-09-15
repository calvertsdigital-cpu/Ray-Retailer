import { Star } from "lucide-react";

export function StarRating({
  rating,
  count,
  size = 14,
  showValue = true,
}: {
  rating: number;
  count?: number;
  size?: number;
  showValue?: boolean;
}) {
  const rounded = Math.round(rating * 2) / 2;
  return (
    <span className="inline-flex items-center gap-1.5 text-sm">
      <span className="flex items-center gap-0.5" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            width={size}
            height={size}
            className={i <= rounded ? "fill-gold text-gold" : "text-border"}
          />
        ))}
      </span>
      {showValue && <span className="font-medium">{rating.toFixed(1)}</span>}
      {typeof count === "number" && (
        <span className="text-muted-foreground">
          ({count} review{count === 1 ? "" : "s"})
        </span>
      )}
      <span className="sr-only">
        Rated {rating} out of 5{typeof count === "number" ? ` from ${count} reviews` : ""}
      </span>
    </span>
  );
}
