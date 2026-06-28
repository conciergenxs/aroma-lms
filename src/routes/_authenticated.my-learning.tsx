import { createFileRoute } from "@tanstack/react-router";
import { modules } from "@/data/modules";
import { ModuleCard } from "@/components/ModuleCard";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const Route = createFileRoute("/_authenticated/my-learning")({
  component: MyLearningPage,
});

function MyLearningPage() {
  return (
    <div className="px-4 pt-4">
      <h1 className="font-serif text-3xl">My Learning</h1>
      <p className="text-sm text-foreground/70 mt-1">All modules you've started or completed.</p>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {modules.map((m) => (
          <ModuleCard key={m.id} module={m} />
        ))}
      </div>
      <SiteFooter />
    </div>
  );
}
