import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, LockKeyhole, UtensilsCrossed } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { requireAuth, checkPermission } from "@/lib/dal";
import prisma from "@/lib/prisma";
import { DeleteButton } from "./delete-button";
import { AvailabilityToggle } from "./availability-toggle";

export const metadata: Metadata = {
  title: "Dishes | Crunch Time"
};

export default async function DishesPage() {
  await requireAuth();

  if (!(await checkPermission({ dish: ["create"] }))) {
    return (
      <>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mx-1 h-4" />
          <span className="text-sm font-medium">Dishes</span>
        </header>
        <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
          <div className="bg-destructive/10 rounded-full p-5">
            <LockKeyhole className="text-destructive h-9 w-9" />
          </div>
          <div className="max-w-sm space-y-1.5">
            <h2 className="text-xl font-semibold">Access Denied</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              You don&apos;t have permission to manage dishes. This area is restricted to admins
              only.
            </p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </>
    );
  }

  const dishes = await prisma.dish.findMany({ orderBy: { createdAt: "desc" } });
  const availableCount = dishes.filter((d) => d.available).length;

  return (
    <>
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-1 h-4" />
        <span className="text-sm font-medium">Dishes</span>
        <span className="text-muted-foreground ml-auto text-xs">{dishes.length} total</span>
        <Button asChild size="sm" className="ml-3">
          <Link href="/dashboard/dishes/new">
            <Plus className="h-4 w-4" />
            Add Dish
          </Link>
        </Button>
      </header>

      {dishes.length > 0 && (
        <div className="border-b px-6 py-3">
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <span className="text-muted-foreground text-xs">
              <span className="text-foreground font-semibold tabular-nums">{dishes.length}</span>{" "}
              Total
            </span>
            <span className="text-muted-foreground text-xs">
              <span className="text-foreground font-semibold tabular-nums">{availableCount}</span>{" "}
              Available
            </span>
            <span className="text-muted-foreground text-xs">
              <span className="text-foreground font-semibold tabular-nums">
                {dishes.length - availableCount}
              </span>{" "}
              Unavailable
            </span>
          </div>
        </div>
      )}

      {dishes.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
          <div className="bg-muted rounded-full p-5">
            <UtensilsCrossed className="text-muted-foreground h-9 w-9" />
          </div>
          <div className="max-w-sm space-y-1.5">
            <h2 className="text-xl font-semibold">No dishes yet</h2>
            <p className="text-muted-foreground text-sm">
              Add your first dish to start building your menu.
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/dishes/new">
              <Plus className="h-4 w-4" />
              Add Dish
            </Link>
          </Button>
        </div>
      ) : (
        <div className="min-w-0 overflow-x-auto">
          <table className="w-full min-w-[640px] table-fixed text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-muted-foreground w-[35%] px-6 py-3 text-left text-[10px] font-semibold tracking-widest uppercase lg:w-[40%]">
                  Dish
                </th>
                <th className="text-muted-foreground w-[13%] px-6 py-3 text-left text-[10px] font-semibold tracking-widest uppercase lg:w-[15%]">
                  Category
                </th>
                <th className="text-muted-foreground w-[12%] px-6 py-3 text-left text-[10px] font-semibold tracking-widest uppercase">
                  Price
                </th>
                <th className="text-muted-foreground w-[25%] px-6 py-3 text-left text-[10px] font-semibold tracking-widest uppercase lg:w-[18%]">
                  Status
                </th>
                <th className="text-muted-foreground w-[15%] px-6 py-3 text-right text-[10px] font-semibold tracking-widest uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {dishes.map((dish) => (
                <tr key={dish.id} className="hover:bg-muted/40 transition-colors">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-muted relative h-11 w-11 shrink-0 overflow-hidden rounded-lg">
                        {dish.imageUrl ? (
                          <Image
                            src={dish.imageUrl}
                            alt={dish.name}
                            fill
                            className="object-cover"
                            sizes="44px"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <UtensilsCrossed className="text-muted-foreground h-4 w-4" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">{dish.name}</p>
                        <p className="text-muted-foreground truncate text-xs">{dish.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <span className="text-muted-foreground text-xs">{dish.category}</span>
                  </td>
                  <td className="px-6 py-3 font-medium tabular-nums">
                    ৳{Number(dish.price).toFixed(2)}
                  </td>
                  <td className="px-6 py-3">
                    <AvailabilityToggle id={dish.id} available={dish.available} />
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Button asChild variant="ghost" size="icon">
                        <Link href={`/dashboard/dishes/${dish.id}/edit`}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit {dish.name}</span>
                        </Link>
                      </Button>
                      <DeleteButton id={dish.id} name={dish.name} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
