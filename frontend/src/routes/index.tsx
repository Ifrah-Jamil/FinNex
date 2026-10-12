import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Check,
  FileSearch,
  ScanLine,
  ShieldCheck,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { BrandMark } from "@/components/brand-mark";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "FinNex — Financial Document Automation for Pakistani Trading SMEs",
      },
      {
        name: "description",
        content:
          "Capture supplier invoices from email, WhatsApp images and PDFs, review extractions, and keep PKR books organized — built for retail and trading businesses in Pakistan.",
      },
      {
        property: "og:title",
        content: "FinNex — Financial Document Automation",
      },
      {
        property: "og:description",
        content:
          "Invoice capture, review workflows and financial analytics for Pakistani trading SMEs.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  {
    icon: ScanLine,
    title: "Invoice capture",
    body: "Upload a PDF, phone photo or WhatsApp screenshot. Vendor, lines, tax and totals are extracted for review.",
  },
  {
    icon: FileSearch,
    title: "Human review",
    body: "Approve or correct extractions before anything hits your books — confidence scores keep risky docs in a queue.",
  },
  {
    icon: BarChart3,
    title: "Finance visibility",
    body: "Revenue, expenses and cash snapshots in PKR so owners see the month without rebuilding spreadsheets.",
  },
  {
    icon: ShieldCheck,
    title: "Secure workspace access",
    body: "Company-scoped sign-in with roles, so only the right people upload, approve or view financial documents.",
  },
];

const steps = [
  {
    n: "01",
    title: "Bring documents in",
    body: "Upload from the browser or connect email and Slack so supplier invoices land in one place.",
  },
  {
    n: "02",
    title: "Review what FinNex read",
    body: "Check vendor, amounts and tax. Fix anything uncertain, then approve in one step.",
  },
  {
    n: "03",
    title: "See the numbers",
    body: "Track spend and revenue on the dashboard and export the reports your bank or accountant asks for.",
  },
];

function Landing() {
  return (
    <div className="min-h-screen">
      <header className="glass sticky top-0 z-30 border-b">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3.5 sm:px-6">
          <Link to="/" className="min-w-0">
            <BrandMark />
          </Link>
          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <Button asChild className="gap-2 rounded-xl">
              <Link to="/app">
                Open FinNex <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero — brand first, one composition, no vanity stats */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(11,79,92,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(11,79,92,0.05)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-12">
          <div className="reveal text-left">
            <p className="font-display text-5xl font-semibold tracking-tight text-primary sm:text-7xl">
              FinNex
            </p>
            <h1 className="mt-4 max-w-xl font-display text-3xl font-semibold leading-[1.12] text-foreground sm:text-4xl">
              Financial documents, finally under control.
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              Built for Pakistani retail and trading SMEs — capture supplier invoices, review
              extractions, and keep PKR finances organized without spreadsheet chaos.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="gap-2 rounded-xl px-7">
                <Link to="/app">
                  Open FinNex <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div
            className="reveal surface overflow-hidden p-3 sm:p-4"
            style={{ animationDelay: "80ms" }}
          >
            <div className="rounded-2xl border border-border/80 bg-card">
              <div className="flex items-center justify-between border-b px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Upload className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">Invoice review</p>
                    <p className="text-xs text-muted-foreground">ABC Traders · Karachi</p>
                  </div>
                </div>
                <span className="rounded-full bg-success/10 px-2.5 py-1 text-[11px] font-semibold text-success">
                  Ready to approve
                </span>
              </div>
              <div className="grid gap-3 p-4 sm:grid-cols-2">
                {[
                  ["Vendor", "ABC Traders"],
                  ["Invoice #", "INV-2048"],
                  ["Date", "11 Oct 2026"],
                  ["Total", "PKR 184,500"],
                  ["Sales tax", "PKR 28,500"],
                  ["Category", "Inventory"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl bg-muted/50 px-3 py-2.5">
                    <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p>
                    <p className="mt-0.5 truncate text-sm font-semibold">{value}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between border-t px-4 py-3">
                <p className="text-xs text-muted-foreground">Extracted from WhatsApp photo · 96% confidence</p>
                <Button size="sm" className="rounded-lg">
                  Approve
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y bg-card/60">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            How FinNex works
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <article key={step.n} className="page-enter">
                <p className="font-display text-3xl font-semibold text-primary/35">{step.n}</p>
                <h2 className="mt-2 font-display text-xl font-semibold">{step.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            What you get in the workspace
          </h2>
          <p className="mt-3 text-muted-foreground">
            A focused product for document-heavy trading businesses — not a kitchen-sink ERP.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {features.map((f) => (
            <article key={f.title} className="surface p-6 transition-shadow hover:shadow-[var(--shadow-secondary)]">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="surface overflow-hidden px-6 py-10 sm:px-10 sm:py-12">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-semibold">
                Made for the way Pakistani suppliers actually bill you
              </h2>
              <ul className="mt-6 space-y-3">
                {[
                  "English invoice reading with PKR amounts",
                  "Sales-tax aware extraction for local bills",
                  "Company-scoped access for owners and accountants",
                  "Works from phone photos when a PDF never arrives",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-success/15 text-success">
                      <Check className="h-3 w-3" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-8 gap-2 rounded-xl">
                <Link to="/app">
                  Open FinNex <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="rounded-2xl border border-primary/15 bg-primary/5 p-6">
              <p className="font-display text-lg font-semibold text-primary">Industrial project focus</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                FinNex targets retail and trading SMEs that receive supplier invoices over email and
                WhatsApp — a narrower, realistic scope so the product stays usable for a real finance
                workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t bg-card/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <BrandMark />
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Financial document automation for Pakistani trading SMEs.
            </p>
          </div>
          <Link to="/app" className="text-sm font-medium text-primary hover:underline">
            Open FinNex
          </Link>
        </div>
        <div className="border-t px-4 py-5 text-center text-xs text-muted-foreground sm:px-6">
          © 2026 FinNex. Built for industrial use in Pakistan.
        </div>
      </footer>
    </div>
  );
}
