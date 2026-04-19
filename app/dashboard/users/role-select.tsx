"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { updateUserRole } from "./actions";
import type { AppRole } from "@/lib/access";

const ROLES: AppRole[] = ["customer", "chef", "delivery", "admin"];

const ROLE_STYLES: Record<AppRole, string> = {
  customer: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
  chef: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400",
  delivery: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  admin: "bg-primary/10 text-primary"
};

interface RoleSelectProps {
  userId: string;
  role: AppRole;
  isSelf: boolean;
}

export function RoleSelect({ userId, role, isSelf }: RoleSelectProps) {
  const [current, setCurrent] = useState(role);
  const [isPending, startTransition] = useTransition();

  if (isSelf) {
    return (
      <span
        className={cn(
          "inline-flex items-center px-2 py-0.5 text-[10px] font-semibold tracking-widest uppercase",
          ROLE_STYLES[current]
        )}
      >
        {current}
      </span>
    );
  }

  function handleChange(next: string) {
    const nextRole = next as AppRole;
    const prev = current;
    setCurrent(nextRole);
    startTransition(async () => {
      try {
        await updateUserRole(userId, nextRole);
        toast.success(`Role updated to ${nextRole}`);
      } catch (err) {
        setCurrent(prev);
        toast.error(err instanceof Error ? err.message : "Failed to update role");
      }
    });
  }

  return (
    <Select value={current} onValueChange={handleChange} disabled={isPending}>
      <SelectTrigger
        className={cn(
          "h-auto w-fit gap-1.5 rounded-none border-0 px-2 py-0.5 text-[10px] font-semibold tracking-widest uppercase shadow-none ring-0 focus:ring-0 focus-visible:ring-0",
          ROLE_STYLES[current],
          isPending && "opacity-50"
        )}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="rounded-none">
        {ROLES.map((r) => (
          <SelectItem key={r} value={r} className="rounded-none text-xs tracking-wide uppercase">
            {r}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
