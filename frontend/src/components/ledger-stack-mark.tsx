import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Ledger Stack — selected FinNex brand mark.
 * Three isometric ledger planes (porcelain → teal → navy) with soft depth.
 */
export function LedgerStackGlyph({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const bottom = `ls-b-${uid}`;
  const mid = `ls-m-${uid}`;
  const top = `ls-t-${uid}`;
  const soft = `ls-s-${uid}`;

  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <defs>
        <linearGradient id={bottom} x1="6" y1="18" x2="26" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1a3358" />
          <stop offset="1" stopColor="#0f1c41" />
        </linearGradient>
        <linearGradient id={mid} x1="8" y1="12" x2="26" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2a8a98" />
          <stop offset="1" stopColor="#0b4f5c" />
        </linearGradient>
        <linearGradient id={top} x1="10" y1="6" x2="28" y2="16" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="0.55" stopColor="#e4f3f5" />
          <stop offset="1" stopColor="#b8d4da" />
        </linearGradient>
        <filter id={soft} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0.8" stdDeviation="0.55" floodColor="#0f1c41" floodOpacity="0.35" />
        </filter>
      </defs>
      <path filter={`url(#${soft})`} fill={`url(#${bottom})`} d="M4.5 19.2 16 25.8 27.5 19.2 16 12.6z" />
      <path filter={`url(#${soft})`} fill={`url(#${mid})`} opacity="0.92" d="M5.8 15.4 17.3 22 28.8 15.4 17.3 8.8z" />
      <path filter={`url(#${soft})`} fill={`url(#${top})`} d="M7.2 11.6 18.7 18.2 30.2 11.6 18.7 5z" />
      <path
        stroke="#ffffff"
        strokeWidth="0.55"
        strokeLinecap="round"
        opacity="0.55"
        d="M8.2 11.2 18.7 5.4 29 11.1"
      />
    </svg>
  );
}

/** Favicon / app-tile treatment: navy rounded square with the stack. */
export function LedgerStackFaviconMark({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const tile = `ls-tile-${uid}`;
  const b = `ls-fb-${uid}`;
  const m = `ls-fm-${uid}`;
  const t = `ls-ft-${uid}`;

  return (
    <svg viewBox="0 0 32 32" className={cn(className)} aria-hidden>
      <defs>
        <linearGradient id={tile} x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1a3358" />
          <stop offset="1" stopColor="#0f1c41" />
        </linearGradient>
        <linearGradient id={b} x1="6" y1="18" x2="26" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="#243b63" />
          <stop offset="1" stopColor="#0a152e" />
        </linearGradient>
        <linearGradient id={m} x1="8" y1="12" x2="26" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2a8a98" />
          <stop offset="1" stopColor="#0b4f5c" />
        </linearGradient>
        <linearGradient id={t} x1="10" y1="6" x2="28" y2="14" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="0.5" stopColor="#e4f3f5" />
          <stop offset="1" stopColor="#b8d4da" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="7" fill={`url(#${tile})`} />
      <path fill={`url(#${b})`} d="M5.2 18.8 16 24.8 26.8 18.8 16 12.8z" />
      <path fill={`url(#${m})`} opacity="0.95" d="M6.4 15.2 17.2 21.2 28 15.2 17.2 9.2z" />
      <path fill={`url(#${t})`} d="M7.6 11.6 18.4 17.6 29.2 11.6 18.4 5.6z" />
      <path
        stroke="#ffffff"
        strokeWidth="0.5"
        strokeLinecap="round"
        opacity="0.5"
        fill="none"
        d="M8.4 11.2 18.4 5.9 28.2 11.1"
      />
    </svg>
  );
}
