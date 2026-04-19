import Link from "next/link";
import Image from "next/image";
import {
  UtensilsCrossed,
  CheckCircle2,
  Users,
  ShoppingBag,
  Plus,
  ArrowRight,
  UserCog
} from "lucide-react";
import { cn } from "@/lib/utils";
import { StatCard } from "./stat-card";

type Dish = {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  category: string;
  available: boolean;
};

interface AdminOverviewProps {
  user: { name: string; createdAt: Date | string };
  totalDishes: number;
  availableDishes: number;
  totalUsers: number;
  customerCount: number;
  recentDishes: Dish[];
}

const QUICK_ACTIONS = [
  {
    href: "/dashboard/dishes/new",
    icon: Plus,
    label: "Add Dish",
    description: "Add a new item to the menu"
  },
  {
    href: "/dashboard/dishes",
    icon: UtensilsCrossed,
    label: "Manage Dishes",
    description: "Edit, remove, or toggle availability"
  },
  {
    href: "/dashboard/users",
    icon: UserCog,
    label: "Manage Users",
    description: "View users and assign roles"
  }
];

export function AdminOverview({
  user,
  totalDishes,
  availableDishes,
  totalUsers,
  customerCount,
  recentDishes
}: AdminOverviewProps) {
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
          Admin &middot; Member since {memberSince}
        </p>
      </div>

      <section>
        <h2 className="text-muted-foreground mb-3 text-[11px] font-semibold tracking-widest uppercase">
          Overview
        </h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            label="Total Dishes"
            value={totalDishes}
            icon={UtensilsCrossed}
            iconBg="bg-amber-100 dark:bg-amber-950/50"
            iconClass="text-amber-600 dark:text-amber-400"
            sub={`${availableDishes} available`}
          />
          <StatCard
            label="Available"
            value={availableDishes}
            icon={CheckCircle2}
            iconBg="bg-green-100 dark:bg-green-950/50"
            iconClass="text-green-600 dark:text-green-400"
            sub={`${totalDishes - availableDishes} hidden`}
          />
          <StatCard
            label="Total Users"
            value={totalUsers}
            icon={Users}
            iconBg="bg-blue-100 dark:bg-blue-950/50"
            iconClass="text-blue-600 dark:text-blue-400"
            sub="across all roles"
          />
          <StatCard
            label="Customers"
            value={customerCount}
            icon={ShoppingBag}
            iconBg="bg-zinc-100 dark:bg-zinc-800"
            iconClass="text-zinc-600 dark:text-zinc-400"
            sub="active accounts"
          />
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-5">
        <section className="lg:col-span-3">
          <h2 className="text-muted-foreground mb-3 text-[11px] font-semibold tracking-widest uppercase">
            Quick Actions
          </h2>
          <div className="flex flex-col gap-3">
            {QUICK_ACTIONS.map(({ href, icon: Icon, label, description }) => (
              <Link
                key={href}
                href={href}
                className="bg-card group hover:bg-muted/50 flex items-center gap-4 rounded-xl border px-5 py-4 transition-colors"
              >
                <div className="bg-primary/10 shrink-0 rounded-xl p-3">
                  <Icon className="text-primary h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{label}</p>
                  <p className="text-muted-foreground text-sm">{description}</p>
                </div>
                <ArrowRight className="text-muted-foreground h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </section>

        <section className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-muted-foreground text-[11px] font-semibold tracking-widest uppercase">
              Recently Added
            </h2>
            <Link
              href="/dashboard/dishes"
              className="text-muted-foreground hover:text-foreground text-xs transition-colors"
            >
              View all
            </Link>
          </div>
          <div className="bg-card rounded-xl border">
            {recentDishes.length === 0 ? (
              <div className="text-muted-foreground flex h-32 items-center justify-center text-sm">
                No dishes yet
              </div>
            ) : (
              <ul className="divide-y">
                {recentDishes.map((dish) => (
                  <li key={dish.id}>
                    <Link
                      href={`/dashboard/dishes/${dish.id}/edit`}
                      className="hover:bg-muted/50 flex items-center gap-3 px-4 py-3 transition-colors first:rounded-t-xl last:rounded-b-xl"
                    >
                      <div className="bg-muted relative h-10 w-10 shrink-0 overflow-hidden rounded-lg">
                        {dish.imageUrl ? (
                          <Image
                            src={dish.imageUrl}
                            alt={dish.name}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <UtensilsCrossed className="text-muted-foreground h-4 w-4" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{dish.name}</p>
                        <p className="text-muted-foreground text-xs">
                          {dish.category} &middot; ৳{dish.price.toFixed(2)}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "inline-flex shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                          dish.available
                            ? "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400"
                            : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                        )}
                      >
                        {dish.available ? "On" : "Off"}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
