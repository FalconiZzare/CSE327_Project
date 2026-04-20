import Link from "next/link";
import { ChefHat, Clock, CheckCircle2, Flame, ArrowRight } from "lucide-react";
import { StatCard } from "./stat-card";

interface ChefOverviewProps {
  user: { name: string; createdAt: Date | string };
}

export function ChefOverview({ user }: ChefOverviewProps) {
  const firstName = user.name.split(" ")[0];
  const memberSince = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric"
  }).format(new Date(user.createdAt));

  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Ready to cook, {firstName}?</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Chef &middot; Member since {memberSince}
        </p>
      </div>

      <section>
        <h2 className="text-muted-foreground mb-3 text-[11px] font-semibold tracking-widest uppercase">
          Today&apos;s Summary
        </h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          <StatCard
            label="In Queue"
            value={0}
            icon={Clock}
            iconBg="bg-amber-100 dark:bg-amber-950/50"
            iconClass="text-amber-600 dark:text-amber-400"
            sub="orders waiting"
          />
          <StatCard
            label="Completed Today"
            value={0}
            icon={CheckCircle2}
            iconBg="bg-green-100 dark:bg-green-950/50"
            iconClass="text-green-600 dark:text-green-400"
          />
          <StatCard
            label="All Time"
            value={0}
            icon={Flame}
            iconBg="bg-orange-100 dark:bg-orange-950/50"
            iconClass="text-orange-600 dark:text-orange-400"
            sub="dishes prepared"
          />
        </div>
      </section>

      <section>
        <h2 className="text-muted-foreground mb-3 text-[11px] font-semibold tracking-widest uppercase">
          Quick Actions
        </h2>
        <Link
          href="/dashboard/kitchen"
          className="bg-card group hover:bg-muted/50 flex items-center gap-4 border px-5 py-4 transition-colors"
        >
          <div className="bg-primary/10 shrink-0 p-3">
            <ChefHat className="text-primary h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold">Open Kitchen Queue</p>
            <p className="text-muted-foreground text-sm">View and manage incoming orders</p>
          </div>
          <ArrowRight className="text-muted-foreground h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </section>

      <section>
        <h2 className="text-muted-foreground mb-3 text-[11px] font-semibold tracking-widest uppercase">
          Pending Orders
        </h2>
        <div className="bg-card flex flex-col items-center justify-center gap-4 border px-6 py-14 text-center">
          <div className="bg-muted p-4">
            <ChefHat className="text-muted-foreground h-8 w-8" />
          </div>
          <div className="space-y-1">
            <p className="font-semibold">All clear</p>
            <p className="text-muted-foreground text-sm">No orders in the queue right now.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
