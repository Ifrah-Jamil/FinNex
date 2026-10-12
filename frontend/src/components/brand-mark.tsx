import { cn } from "@/lib/utils";

/** FinNex wordmark mark — linked document / ledger glyph. */
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
  const iconSize = size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-4.5 w-4.5";
  const textSize = size === "sm" ? "text-sm" : size === "lg" ? "text-2xl" : "text-base";

  return (
    <span className={cn("inline-flex min-w-0 items-center gap-2.5", className)}>
      <span
        className={cn(
          "grid shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-[var(--shadow-cta)]",
          markSize,
          markClassName,
        )}
        aria-hidden
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={iconSize}
        >
          <path d="M7 3.5h7.2L19 8.3V20a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 6 20V5A1.5 1.5 0 0 1 7.5 3.5H7z" />
          <path d="M14 3.5V8h4.5" />
          <path d="M9 12.5h6" />
          <path d="M9 16h4" />
        </svg>
      </span>
      {showWordmark && (
        <span className={cn("truncate font-display font-bold tracking-tight", textSize)}>FinNex</span>
      )}
    </span>
  );
}
