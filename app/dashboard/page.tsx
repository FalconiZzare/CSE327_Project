import type { Metadata } from "next";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { requireAuth } from "@/lib/dal";
import prisma from "@/lib/prisma";
import type { AppRole } from "@/lib/access";
import { AdminOverview } from "./admin-overview";
import { CustomerOverview } from "./customer-overview";
import { ChefOverview } from "./chef-overview";
import { DeliveryOverview } from "./delivery-overview";

export const metadata: Metadata = {
  title: "Dashboard | Crunch Time"
};

const Header = () => (
  <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
    <SidebarTrigger className="-ml-1 cursor-pointer" />
    <Separator orientation="vertical" className="mx-1 h-4" />
    <span className="text-sm font-medium">Overview</span>
  </header>
);

export default async function DashboardPage() {
  const session = await requireAuth();
  const role = session.user.role as AppRole;
  const user = { name: session.user.name, createdAt: session.user.createdAt };

  if (role === "admin") {
    const [dishRows, userRoles, totalDishes, availableDishes] = await Promise.all([
      prisma.dish.findMany({
        orderBy: { createdAt: "desc" },
        take: 4,
        select: {
          id: true,
          name: true,
          price: true,
          imageUrl: true,
          category: true,
          available: true
        }
      }),
      prisma.user.findMany({ select: { role: true } }),
      prisma.dish.count(),
      prisma.dish.count({ where: { available: true } })
    ]);

    const customerCount = userRoles.filter((u) => u.role === "customer").length;
    const recentDishes = dishRows.map((d) => ({ ...d, price: Number(d.price) }));

    return (
      <>
        <Header />
        <AdminOverview
          user={user}
          totalDishes={totalDishes}
          availableDishes={availableDishes}
          totalUsers={userRoles.length}
          customerCount={customerCount}
          recentDishes={recentDishes}
        />
      </>
    );
  }

  if (role === "chef") {
    return (
      <>
        <Header />
        <ChefOverview user={user} />
      </>
    );
  }

  if (role === "delivery") {
    return (
      <>
        <Header />
        <DeliveryOverview user={user} />
      </>
    );
  }

  const availableDishCount = await prisma.dish.count({ where: { available: true } });

  return (
    <>
      <Header />
      <CustomerOverview user={user} availableDishCount={availableDishCount} />
    </>
  );
}
