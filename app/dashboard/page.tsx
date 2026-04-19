import type { Metadata } from "next";
import { requireAuth } from "@/lib/dal";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Dashboard | Crunch Time"
};

export default async function DashboardPage() {
  const session = await requireAuth();

  return (
    <>
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-1 h-4" />
        <span className="text-sm font-medium">Dashboard</span>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome back, {session.user.name?.split(" ")[0]}
        </h1>
        <p className="text-muted-foreground">
          Signed in as{" "}
          <span className="text-foreground font-medium capitalize">{session.user.role}</span>.
        </p>
      </div>
    </>
  );
}
