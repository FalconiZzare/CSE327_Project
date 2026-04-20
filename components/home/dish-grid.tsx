import Image from "next/image";
import { UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils";
import { DISH_CATEGORIES } from "@/lib/categories";
import { Skeleton } from "@/components/ui/skeleton";
import prisma from "@/lib/prisma";

type Dish = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  category: string;
};

export async function DishGrid() {
  const rawDishes = await prisma.dish.findMany({
    where: { available: true },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      imageUrl: true,
      category: true
    }
  });

  const dishes: Dish[] = rawDishes.map((d) => ({ ...d, price: Number(d.price) }));

  const sections = DISH_CATEGORIES.map((cat) => ({
    ...cat,
    dishes: dishes.filter((d) => d.category === cat.label)
  })).filter((s) => s.dishes.length > 0);

  if (sections.length === 0) {
    return (
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <MenuHeader />
          <div className="mt-16 flex flex-col items-center gap-4 text-center">
            <div className="bg-muted p-5">
              <UtensilsCrossed className="text-muted-foreground h-10 w-10" />
            </div>
            <p className="text-muted-foreground">No dishes available right now. Check back soon!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="pb-24">
      <div className="px-4 pt-20 pb-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <MenuHeader />
        </div>
      </div>

      {sections.map((section, i) => (
        <section
          key={section.id}
          id={section.id}
          className={cn("scroll-mt-20 px-4 pb-14 sm:px-6 lg:px-8", i === 0 ? "pt-4" : "pt-14")}
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-7 flex items-center gap-5">
              <h2 className="shrink-0 text-xl font-bold tracking-[0.08em] uppercase">
                {section.label}
              </h2>
              <div className="bg-border h-px flex-1" />
              <span className="text-muted-foreground shrink-0 text-xs tabular-nums">
                {section.dishes.length} {section.dishes.length === 1 ? "item" : "items"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
              {section.dishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

export function DishGridSkeleton() {
  return (
    <div className="pb-24">
      <div className="px-4 pt-20 pb-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Skeleton className="h-10 w-48 sm:h-11" />
          <Skeleton className="mt-3 h-5 w-80 sm:w-96" />
        </div>
      </div>

      <div className="px-4 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 flex items-center gap-5">
            <Skeleton className="h-5 w-24" />
            <div className="bg-border h-px flex-1" />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[3/4]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuHeader() {
  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Menu</h2>
      <p className="text-muted-foreground mt-3 max-w-xl text-sm sm:text-base">
        Handcrafted daily by our chefs — from quick bites to full meals, every dish is made fresh to
        order.
      </p>
    </>
  );
}

function DishCard({ dish }: { dish: Dish }) {
  return (
    <div className="group relative aspect-[3/4] cursor-default overflow-hidden bg-zinc-900">
      {dish.imageUrl ? (
        <Image
          src={dish.imageUrl}
          alt={dish.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <UtensilsCrossed className="h-12 w-12 text-white/10" />
        </div>
      )}

      <div className="absolute top-3 left-3">
        <span className="bg-black/50 px-2 py-0.5 text-[10px] font-medium tracking-[0.12em] text-white/75 uppercase backdrop-blur-sm">
          {dish.category}
        </span>
      </div>

      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/35 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-4 lg:p-5">
        <p className="line-clamp-2 text-sm leading-snug font-bold text-white sm:text-base">
          {dish.name}
        </p>
        <p className="mt-1.5 line-clamp-3 text-[11px] leading-relaxed text-white/55 sm:text-xs">
          {dish.description}
        </p>
        <div className="mt-3 flex items-center gap-3">
          <span className="text-sm font-semibold text-white tabular-nums">
            ৳{dish.price.toFixed(2)}
          </span>
          <div className="h-px flex-1 bg-white/15" />
        </div>
      </div>
    </div>
  );
}
