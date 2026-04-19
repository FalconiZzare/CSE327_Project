import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";
import { DishGrid } from "@/components/home/dish-grid";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Crunch Time — Fresh food, delivered fast",
  description: "Restaurant-quality meals made by expert chefs, brought straight to your door."
};

export default async function Home() {
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

  const dishes = rawDishes.map((d) => ({ ...d, price: Number(d.price) }));

  return (
    <>
      <HeroSection />
      <DishGrid dishes={dishes} />
    </>
  );
}
