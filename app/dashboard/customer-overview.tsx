import Link from "next/link";
import { ShoppingBag, Clock, UtensilsCrossed, ArrowRight } from "lucide-react";
import { StatCard } from "./stat-card";

interface CustomerOverviewProps {
  user: { name: string; createdAt: Date | string };
  availableDishCount: number;
}

export function CustomerOverview({ user, availableDishCount }: CustomerOverviewProps) {
  const firstName = user.name.split(" ")[0];
  const memberSince = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric"
  }).format(new Date(user.createdAt));

  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Welcome back, {firstName}</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Customer &middot; Member since {memberSince}
        </p>
      </div>

      <section>
        <h2 className="text-muted-foreground mb-3 text-[11px] font-semibold tracking-widest uppercase">
          Your Activity
        </h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          <StatCard
            label="Orders Placed"
            value={0}
            icon={ShoppingBag}
            iconBg="bg-blue-100 dark:bg-blue-950/50"
            iconClass="text-blue-600 dark:text-blue-400"
          />
          <StatCard
            label="Active Orders"
            value={0}
            icon={Clock}
            iconBg="bg-amber-100 dark:bg-amber-950/50"
            iconClass="text-amber-600 dark:text-amber-400"
          />
          <StatCard
            label="Menu Items"
            value={availableDishCount}
            icon={UtensilsCrossed}
            iconBg="bg-green-100 dark:bg-green-950/50"
            iconClass="text-green-600 dark:text-green-400"
            sub="available today"
          />
        </div>
      </section>

      <section>
        <h2 className="text-muted-foreground mb-3 text-[11px] font-semibold tracking-widest uppercase">
          Quick Actions
        </h2>
        <Link
          href="/dashboard/menu"
          className="bg-card group hover:bg-muted/50 flex items-center gap-4 border px-5 py-4 transition-colors"
        >
          <div className="bg-primary/10 shrink-0 p-3">
            <UtensilsCrossed className="text-primary h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold">Browse Menu</p>
            <p className="text-muted-foreground text-sm">
              {availableDishCount} dish{availableDishCount !== 1 ? "es" : ""} available right now
            </p>
          </div>
          <ArrowRight className="text-muted-foreground h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </section>

      <section>
        <h2 className="text-muted-foreground mb-3 text-[11px] font-semibold tracking-widest uppercase">
          Recent Orders
        </h2>
        <div className="bg-card flex flex-col items-center justify-center gap-4 border px-6 py-14 text-center">
          <div className="bg-muted p-4">
            <ShoppingBag className="text-muted-foreground h-8 w-8" />
          </div>
          <div className="space-y-1">
            <p className="font-semibold">No orders yet</p>
            <p className="text-muted-foreground text-sm">
              Your orders will appear here once you place them.
            </p>
          </div>
          <Link
            href="/dashboard/menu"
            className="bg-primary text-primary-foreground px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
          >
            Place your first order
          </Link>
        </div>
      </section>
    </div>
  );
}
