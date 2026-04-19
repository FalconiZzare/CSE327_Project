import type { Metadata } from "next";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { requireRole } from "@/lib/dal";
import prisma from "@/lib/prisma";
import { getInitials } from "@/lib/utils";
import { RoleSelect } from "./role-select";
import type { AppRole } from "@/lib/access";

export const metadata: Metadata = {
  title: "Users | Crunch Time"
};

const ROLE_COUNTS_ORDER: AppRole[] = ["customer", "chef", "delivery", "admin"];

const STAT_LABELS: Record<AppRole, string> = {
  customer: "Customers",
  chef: "Chefs",
  delivery: "Delivery",
  admin: "Admins"
};

export default async function UsersPage() {
  const session = await requireRole("admin");

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      createdAt: true
    },
    orderBy: { createdAt: "desc" }
  });

  const counts = users.reduce(
    (acc, u) => {
      const r = (u.role ?? "customer") as AppRole;
      acc[r] = (acc[r] ?? 0) + 1;
      return acc;
    },
    {} as Partial<Record<AppRole, number>>
  );

  return (
    <>
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-1 h-4" />
        <span className="text-sm font-medium">Users</span>
        <span className="text-muted-foreground ml-auto text-xs">{users.length} total</span>
      </header>

      <div className="flex flex-1 flex-col">
        <div className="border-b px-6 py-3">
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            {ROLE_COUNTS_ORDER.map((role) => (
              <span key={role} className="text-muted-foreground text-xs">
                <span className="text-foreground font-semibold tabular-nums">
                  {counts[role] ?? 0}
                </span>{" "}
                {STAT_LABELS[role]}
              </span>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-muted-foreground px-6 py-3 text-left text-[10px] font-semibold tracking-widest uppercase">
                  User
                </th>
                <th className="text-muted-foreground px-6 py-3 text-left text-[10px] font-semibold tracking-widest uppercase">
                  Role
                </th>
                <th className="text-muted-foreground px-6 py-3 text-left text-[10px] font-semibold tracking-widest uppercase">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {users.map((user) => {
                const initials = getInitials(user.name);
                const joined = new Intl.DateTimeFormat("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric"
                }).format(new Date(user.createdAt));
                const isSelf = user.id === session.user.id;

                return (
                  <tr key={user.id} className="hover:bg-muted/40 transition-colors">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-8 shrink-0 rounded-none after:hidden">
                          {user.image && (
                            <AvatarImage
                              src={user.image}
                              alt={user.name}
                              className="rounded-none"
                            />
                          )}
                          <AvatarFallback className="rounded-none text-xs font-semibold">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{user.name}</span>
                            {isSelf && (
                              <span className="text-muted-foreground text-[10px] font-semibold tracking-widest uppercase">
                                you
                              </span>
                            )}
                          </div>
                          <span className="text-muted-foreground truncate text-xs">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <RoleSelect
                        userId={user.id}
                        role={(user.role ?? "customer") as AppRole}
                        isSelf={isSelf}
                      />
                    </td>
                    <td className="text-muted-foreground px-6 py-3 text-xs">{joined}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {users.length === 0 && (
            <div className="text-muted-foreground flex h-40 items-center justify-center text-sm">
              No users found.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
