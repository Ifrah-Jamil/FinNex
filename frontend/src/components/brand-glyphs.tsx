/** Shared vector marks for sidebar, login, and favicon exports. */

export function LedgerGridGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" d="M6.5 8.5h11M6.5 12h11M6.5 15.5h8" />
      <path stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" opacity="0.55" d="M15.5 6.5v12" />
    </svg>
  );
}

export function NexusLinkGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.5 9c0-1.65 1.35-3 3-3s3 1.35 3 3v1.5c0 1.65-1.35 3-3 3h-.75"
      />
      <path
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
        d="M14.5 15c0 1.65-1.35 3-3 3s-3-1.35-3-3v-1.5c0-1.65 1.35-3 3-3h.75"
      />
    </svg>
  );
}

/** Double-entry ledger — debit/credit columns with shared posting lines. */
export function DoubleEntryGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" d="M8.5 7.5v9M15.5 7.5v9" />
      <path stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" d="M5.5 10h5M13.5 10h5M5.5 13.5h5M13.5 13.5h5" />
      <path stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" opacity="0.45" d="M10.5 7.5v9" />
    </svg>
  );
}

/** Transaction posting — inbound flow booked to the ledger. */
export function PostingFlowGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" d="M4.5 12h8M15.5 7.5v9" />
      <path
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 12l-2-2M10.5 12l-2 2"
      />
      <path stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" d="M15.5 9h4M15.5 12h3.5M15.5 15h4.5" />
    </svg>
  );
}

/** Reconciliation — two ledgers aligned and linked. */
export function ReconcileGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" d="M5 9h6M5 12h6M13 9h6M13 12h6" />
      <path
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
        d="M11.5 10.5l1 1 2-2"
      />
      <path stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" opacity="0.4" d="M11 7.5v9" />
    </svg>
  );
}

/** Smart capture — document frame with scan brackets and ledger rows. */
export function CaptureLedgerGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
        d="M8 6.5h8v11H8zM8 9.5h8M8 12.5h5.5"
      />
      <path stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" opacity="0.55" d="M6 8.5h2M6 11h2M16 8.5h2M16 11h2" />
    </svg>
  );
}

/** T-account — classic balance representation. */
export function TAccountGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" d="M12 6.5v11M6.5 10.5h11" />
      <path stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" d="M7.5 8h3M13.5 8h3M7.5 13h2.5M13.5 13h2.5" />
    </svg>
  );
}

/** Transaction hub — routed payments through a central book. */
export function TransactionHubGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="2.25" stroke="currentColor" strokeWidth="1.55" />
      <path stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" d="M5.5 12H9M15 12h3.5M12 8.5V9M12 15v.5" />
      <path
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.75"
        d="M6.5 12l1.5-1.5M6.5 12l1.5 1.5M17.5 12l-1.5-1.5M17.5 12l-1.5 1.5M12 7l1 1.5M12 7l-1 1.5M12 17l1-1.5M12 17l-1-1.5"
      />
    </svg>
  );
}

export type BrandGlyphKey =
  | "ledger-grid"
  | "nexus-link"
  | "double-entry"
  | "posting-flow"
  | "reconcile"
  | "capture-ledger"
  | "t-account"
  | "transaction-hub";

const GLYPHS: Record<BrandGlyphKey, typeof LedgerGridGlyph> = {
  "ledger-grid": LedgerGridGlyph,
  "nexus-link": NexusLinkGlyph,
  "double-entry": DoubleEntryGlyph,
  "posting-flow": PostingFlowGlyph,
  reconcile: ReconcileGlyph,
  "capture-ledger": CaptureLedgerGlyph,
  "t-account": TAccountGlyph,
  "transaction-hub": TransactionHubGlyph,
};

export function BrandGlyph({ name, className }: { name: BrandGlyphKey; className?: string }) {
  const Icon = GLYPHS[name];
  return <Icon {...(className ? { className } : {})} />;
}
