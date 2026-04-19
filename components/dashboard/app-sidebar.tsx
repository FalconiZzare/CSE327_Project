import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import Link from "next/link";
import { LogoMark } from "@/components/logo";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import type { AppRole } from "@/lib/access";

interface AppSidebarProps {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    role: string;
  };
}

function SidebarDivider() {
  return <div className="bg-sidebar-border h-px w-full shrink-0" />;
}

export function AppSidebar({ user }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-0">
        <Link
          href="/"
          className="flex h-13.75 items-center justify-center gap-2 overflow-hidden px-2 transition-all"
        >
          <LogoMark className="size-6 shrink-0" />
          <div className="grid flex-1 overflow-hidden group-data-[collapsible=icon]:hidden">
            <span className="truncate text-sm font-semibold">Crunch Time</span>
            <span className="text-muted-foreground truncate text-xs capitalize">{user.role}</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarDivider />
      <SidebarContent>
        <NavMain role={user.role as AppRole} />
      </SidebarContent>
      <SidebarDivider />
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
