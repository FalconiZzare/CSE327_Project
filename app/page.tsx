import { Suspense } from "react";
import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";
import { DishGrid, DishGridSkeleton } from "@/components/home/dish-grid";

export const metadata: Metadata = {
  title: "Crunch Time — Fresh food, delivered fast",
  description: "Restaurant-quality meals made by expert chefs, brought straight to your door."
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <Suspense fallback={<DishGridSkeleton />}>
        <DishGrid />
      </Suspense>
    </>
  );
}
