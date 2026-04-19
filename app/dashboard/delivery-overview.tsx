import Link from "next/link";
import { Truck, Package, CheckCircle2, MapPin, ArrowRight } from "lucide-react";
import { StatCard } from "./stat-card";

interface DeliveryOverviewProps {
  user: { name: string; createdAt: Date | string };
}

export function DeliveryOverview({ user }: DeliveryOverviewProps) {
  const firstName = user.name.split(" ")[0];
  const memberSince = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric"
  }).format(new Date(user.createdAt));

  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">On the road, {firstName}?</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Delivery &middot; Member since {memberSince}
        </p>
      </div>

      <section>
        <h2 className="text-muted-foreground mb-3 text-[11px] font-semibold tracking-widest uppercase">
          Today&apos;s Summary
        </h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          <StatCard
            label="Ready for Pickup"
            value={0}
            icon={Package}
            iconBg="bg-amber-100 dark:bg-amber-950/50"
            iconClass="text-amber-600 dark:text-amber-400"
          />
          <StatCard
            label="Delivered Today"
            value={0}
            icon={CheckCircle2}
            iconBg="bg-green-100 dark:bg-green-950/50"
            iconClass="text-green-600 dark:text-green-400"
          />
          <StatCard
            label="All Time"
            value={0}
            icon={MapPin}
            iconBg="bg-blue-100 dark:bg-blue-950/50"
            iconClass="text-blue-600 dark:text-blue-400"
            sub="deliveries completed"
          />
        </div>
      </section>

      <section>
        <h2 className="text-muted-foreground mb-3 text-[11px] font-semibold tracking-widest uppercase">
          Quick Actions
        </h2>
        <Link
          href="/dashboard/deliveries"
          className="bg-card group hover:bg-muted/50 flex items-center gap-4 rounded-xl border px-5 py-4 transition-colors"
        >
          <div className="bg-primary/10 shrink-0 rounded-xl p-3">
            <Truck className="text-primary h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold">View Deliveries</p>
            <p className="text-muted-foreground text-sm">See orders ready for pickup</p>
          </div>
          <ArrowRight className="text-muted-foreground h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </section>

      <section>
        <h2 className="text-muted-foreground mb-3 text-[11px] font-semibold tracking-widest uppercase">
          Active Delivery
        </h2>
        <div className="bg-card flex flex-col items-center justify-center gap-4 rounded-xl border px-6 py-14 text-center">
          <div className="bg-muted rounded-full p-4">
            <Truck className="text-muted-foreground h-8 w-8" />
          </div>
          <div className="space-y-1">
            <p className="font-semibold">No active delivery</p>
            <p className="text-muted-foreground text-sm">
              Pick up a completed order to start your delivery.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
