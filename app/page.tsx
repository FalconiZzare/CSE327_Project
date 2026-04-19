import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";

export const metadata: Metadata = {
  title: "Crunch Time — Fresh food, delivered fast",
  description: "Restaurant-quality meals made by expert chefs, brought straight to your door."
};

export default function Home() {
  return (
    <>
      <HeroSection />
    </>
  );
}
