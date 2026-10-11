import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrandMark } from "@/components/brand-mark";
import { useAuth } from "@/lib/auth-context";
import { AuthError } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — FinNex" },
      { name: "description", content: "Sign in to your FinNex workspace." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      await navigate({ to: "/app" });
    } catch (caught) {
      setError(
        caught instanceof AuthError ? caught.message : "Could not sign in. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center px-4 py-10">
      <div className="page-enter w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <Link to="/">
            <BrandMark size="lg" />
          </Link>
          <h1 className="mt-6 font-display text-3xl font-semibold">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to your company workspace on FinNex.
          </p>
        </div>

        <form onSubmit={onSubmit} className="surface space-y-4 p-6 sm:p-7">
          {error && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="email">Work email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.pk"
              className="rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl"
            />
          </div>

          <Button type="submit" className="w-full gap-2 rounded-xl" disabled={submitting}>
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {submitting ? "Signing in…" : "Sign in"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            New to FinNex?{" "}
            <Link to="/signup" className="font-medium text-primary hover:underline">
              Register your business
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
