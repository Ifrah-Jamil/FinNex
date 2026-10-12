import { cn } from "@/lib/utils";
import { LedgerGridGlyph } from "@/components/brand-glyphs";

/** FinNex wordmark — institutional ledger mark for workspace chrome. */
export function BrandMark({
  className,
  markClassName,
  showWordmark = true,
  size = "md",
}: {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const markSize = size === "sm" ? "h-8 w-8" : size === "lg" ? "h-11 w-11" : "h-9 w-9";
  const iconSize = size === "sm" ? "h-4 w-4" : size === "lg" ? "h-5 w-5" : "h-4 w-4";
  const textSize = size === "sm" ? "text-[13px]" : size === "lg" ? "text-xl" : "text-base";

  return (
    <span className={cn("inline-flex min-w-0 items-center gap-2.5", className)}>
      <span
        className={cn(
          "grid shrink-0 place-items-center rounded-md bg-[var(--color-category-navy)] text-primary-foreground",
          markSize,
          markClassName,
        )}
        aria-hidden
      >
        <LedgerGridGlyph className={iconSize} />
      </span>
      {showWordmark && (
        <span className={cn("truncate font-sans text-[15px] font-semibold tracking-tight", textSize)}>
          FinNex
        </span>
      )}
    </span>
  );
}
