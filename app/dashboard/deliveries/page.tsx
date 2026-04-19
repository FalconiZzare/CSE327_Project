import type { Metadata } from "next";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { guardPermission } from "@/lib/dal";
import { UnderConstruction } from "@/components/dashboard/under-construction";

export const metadata: Metadata = {
  title: "Deliveries | Crunch Time"
};

export default async function DeliveriesPage() {
  await guardPermission({ deliveryQueue: ["access"] });

  return (
    <>
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-1 h-4" />
        <span className="text-sm font-medium">Deliveries</span>
      </header>
      <UnderConstruction
        title="Deliveries Coming Soon"
        description="Pick up completed orders from the kitchen and mark them as delivered once they reach the customer."
        features={[
          "View orders ready for pickup",
          "See customer delivery address",
          "Mark orders as out for delivery",
          "Confirm delivery on arrival",
          "View delivery history"
        ]}
      />
    </>
  );
}
