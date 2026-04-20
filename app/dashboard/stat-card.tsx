import type { ElementType } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: number | string;
  icon: ElementType;
  iconClass: string;
  iconBg: string;
  sub?: string;
}

export function StatCard({ label, value, icon: Icon, iconClass, iconBg, sub }: StatCardProps) {
  return (
    <div className="bg-card border p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-muted-foreground text-[11px] font-semibold tracking-widest uppercase">
            {label}
          </p>
          <p className="mt-2 text-3xl font-bold tracking-tight tabular-nums">{value}</p>
          {sub && <p className="text-muted-foreground mt-1.5 text-xs">{sub}</p>}
        </div>
        <div className={cn("shrink-0 p-2.5", iconBg)}>
          <Icon className={cn("h-5 w-5", iconClass)} />
        </div>
      </div>
    </div>
  );
}
