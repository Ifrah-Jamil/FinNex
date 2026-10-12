import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { RequireAuth } from "@/components/require-auth";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "FinNex — Workspace" },
      { name: "description", content: "Financial document workspace for Pakistani trading SMEs." },
      { property: "og:title", content: "FinNex — Workspace" },
      { property: "og:description", content: "Financial document workspace for Pakistani trading SMEs." },
    ],
  }),
  component: ProtectedWorkspace,
});

function ProtectedWorkspace() {
  return (
    <RequireAuth>
      <AppShell />
    </RequireAuth>
  );
}
