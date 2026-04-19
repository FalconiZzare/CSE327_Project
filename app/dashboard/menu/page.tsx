import type { Metadata } from "next";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { requireAuth } from "@/lib/dal";
import { UnderConstruction } from "@/components/dashboard/under-construction";

export const metadata: Metadata = {
  title: "Menu | Crunch Time"
};

export default async function MenuPage() {
  await requireAuth();

  return (
    <>
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-1 h-4" />
        <span className="text-sm font-medium">Menu</span>
      </header>
      <UnderConstruction
        title="Menu Coming Soon"
        description="Browse dishes, filter by category, and add your favourites to your cart — all from one place."
        features={[
          "Browse the full dish catalogue",
          "Filter by category",
          "Add items to cart",
          "View dish details and ingredients",
          "Checkout and place orders"
        ]}
      />
    </>
  );
}
