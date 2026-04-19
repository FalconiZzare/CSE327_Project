import { cookies } from "next/headers";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { requireAuth } from "@/lib/dal";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [session, cookieStore] = await Promise.all([requireAuth(), cookies()]);
  const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar
        user={{
          id: session.user.id,
          name: session.user.name ?? "User",
          email: session.user.email,
          image: session.user.image,
          role: session.user.role ?? "customer"
        }}
      />
      <SidebarInset className="min-w-0 overflow-x-clip">{children}</SidebarInset>
    </SidebarProvider>
  );
}
