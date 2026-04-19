import Image from "next/image";
import { UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils";
import { DISH_CATEGORIES } from "@/lib/categories";

type Dish = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  category: string;
};

export function DishGrid({ dishes }: { dishes: Dish[] }) {
  const sections = DISH_CATEGORIES.map((cat) => ({
    ...cat,
    dishes: dishes.filter((d) => d.category === cat.label)
  })).filter((s) => s.dishes.length > 0);

  if (sections.length === 0) {
    return (
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center">
          <div className="bg-muted p-5">
            <UtensilsCrossed className="text-muted-foreground h-10 w-10" />
          </div>
          <p className="text-muted-foreground">No dishes available right now. Check back soon!</p>
        </div>
      </section>
    );
  }

  return (
    <div className="pb-24">
      {sections.map((section, i) => (
        <section
          key={section.id}
          id={section.id}
          className={cn("scroll-mt-20 px-4 pb-14 sm:px-6 lg:px-8", i === 0 ? "pt-20" : "pt-14")}
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

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 xl:grid-cols-5">
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

function DishCard({ dish }: { dish: Dish }) {
  return (
    <div className="group relative aspect-square cursor-default overflow-hidden bg-zinc-900">
      {dish.imageUrl ? (
        <Image
          src={dish.imageUrl}
          alt={dish.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <UtensilsCrossed className="h-10 w-10 text-white/10" />
        </div>
      )}

      <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/50 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
        <p className="line-clamp-2 text-sm leading-snug font-bold text-white sm:text-[15px]">
          {dish.name}
        </p>
        <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-white/50 sm:text-xs">
          {dish.description}
        </p>
        <p className="mt-2 text-sm font-semibold text-white/70 tabular-nums">
          ৳{dish.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
