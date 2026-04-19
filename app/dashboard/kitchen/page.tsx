import type { Metadata } from "next";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { guardPermission } from "@/lib/dal";
import { UnderConstruction } from "@/components/dashboard/under-construction";

export const metadata: Metadata = {
  title: "Kitchen Queue | Crunch Time"
};

export default async function KitchenPage() {
  await guardPermission({ kitchen: ["access"] });

  return (
    <>
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-1 h-4" />
        <span className="text-sm font-medium">Kitchen Queue</span>
      </header>
      <UnderConstruction
        title="Kitchen Queue Coming Soon"
        description="Manage incoming orders in real time — accept, reject, and hand off completed dishes to delivery."
        features={[
          "View incoming orders in real time",
          "Accept or reject individual orders",
          "Mark dishes as prepared",
          "Hand off completed orders to delivery",
          "Track kitchen throughput"
        ]}
      />
    </>
  );
}
