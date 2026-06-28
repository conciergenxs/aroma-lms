import { createFileRoute } from "@tanstack/react-router";
import { modules } from "@/data/modules";
import { ModuleCard } from "@/components/ModuleCard";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const Route = createFileRoute("/_authenticated/my-learning")({
  component: MyLearningPage,
});

function MyLearningPage() {
  return (
    <div className="px-[14px] pt-[28px]">
      <h1 className="font-serif text-[31px] font-bold leading-none">My Learning</h1>
      <p className="text-[15px] text-foreground/75 mt-4">All modules you've started or completed.</p>
      <div className="mt-6 grid grid-cols-2 gap-3">
        {modules.map((m) => (
          <ModuleCard key={m.id} module={m} />
        ))}
      </div>
      <SiteFooter />
    </div>
  );
}
