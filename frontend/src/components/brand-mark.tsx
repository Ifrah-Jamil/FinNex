import { cn } from "@/lib/utils";
import { LedgerStackGlyph } from "@/components/ledger-stack-mark";

/** FinNex wordmark — Ledger Stack brand mark. */
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
  const markSize = size === "sm" ? "h-8 w-8" : size === "lg" ? "h-12 w-12" : "h-9 w-9";
  const iconSize = size === "sm" ? "h-[1.35rem] w-[1.35rem]" : size === "lg" ? "h-7 w-7" : "h-5 w-5";
  const textSize = size === "sm" ? "text-sm" : size === "lg" ? "text-2xl" : "text-base";

  return (
    <span className={cn("inline-flex min-w-0 items-center gap-2.5", className)}>
      <span
        className={cn(
          "grid shrink-0 place-items-center overflow-hidden rounded-xl bg-[#0f1c41] text-primary-foreground shadow-[0_4px_14px_-4px_rgba(15,28,65,0.55)]",
          markSize,
          markClassName,
        )}
        aria-hidden
      >
        <LedgerStackGlyph className={iconSize} />
      </span>
      {showWordmark && (
        <span className={cn("truncate font-display font-bold tracking-tight", textSize)}>FinNex</span>
      )}
    </span>
  );
}
