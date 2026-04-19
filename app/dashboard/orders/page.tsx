import type { Metadata } from "next";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { requireAuth } from "@/lib/dal";
import { UnderConstruction } from "@/components/dashboard/under-construction";

export const metadata: Metadata = {
  title: "Orders | Crunch Time"
};

const CUSTOMER_FEATURES = [
  "View your full order history",
  "Track the status of current orders",
  "Cancel orders that haven't been accepted yet",
  "Re-order from past purchases"
];

const ADMIN_FEATURES = [
  "View all orders across every customer",
  "Filter by status, date, or customer",
  "Monitor the end-to-end order workflow",
  "Override or cancel orders manually"
];

export default async function OrdersPage() {
  const session = await requireAuth();
  const isAdmin = session.user.role === "admin";

  return (
    <>
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-1 h-4" />
        <span className="text-sm font-medium">{isAdmin ? "Orders" : "My Orders"}</span>
      </header>
      <UnderConstruction
        title={isAdmin ? "Order Management Coming Soon" : "My Orders Coming Soon"}
        description={
          isAdmin
            ? "A full overview of every order placed on the platform, with controls to manage the workflow."
            : "Track your current orders and browse everything you've ordered in the past."
        }
        features={isAdmin ? ADMIN_FEATURES : CUSTOMER_FEATURES}
      />
    </>
  );
}
