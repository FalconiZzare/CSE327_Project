"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

const container = {
  initial: {},
  animate: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } }
};

const rise = {
  initial: { opacity: 0, y: 28 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
  }
};

const STATS = [
  { value: "4.9★", label: "Avg rating" },
  { value: "~30 min", label: "Delivery time" },
  { value: "50+", label: "Fresh dishes" }
];

export function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden">
      <Image
        src="/images/food_back.jpg"
        alt=""
        fill
        priority
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-linear-to-r from-black/92 via-black/70 to-black/10" />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div variants={container} initial="initial" animate="animate" className="max-w-145">
          <motion.div variants={rise}>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 backdrop-blur-md">
              <Flame className="text-primary size-3" strokeWidth={2.5} />
              <span className="text-[11px] font-semibold tracking-[0.12em] text-white/65 uppercase">
                Free delivery on your first order
              </span>
            </div>
          </motion.div>

          <motion.h1
            variants={rise}
            className="mb-6 text-[clamp(2.8rem,6vw,5rem)] leading-[1.06] font-bold tracking-[-0.02em] text-white"
          >
            Crafted fresh,
            <br />
            <span className="text-primary">Delivered fast.</span>
          </motion.h1>

          <motion.p
            variants={rise}
            className="mb-10 max-w-100 text-[15px] leading-[1.75] text-white/50 sm:text-base"
          >
            Restaurant-quality meals made by expert chefs and brought straight to your door. No
            compromises, ever.
          </motion.p>

          <motion.div variants={rise} className="flex flex-wrap gap-3">
            <Link
              href="#"
              className={cn(
                "bg-primary text-primary-foreground inline-flex h-12 items-center gap-2 rounded-full px-7 text-sm font-semibold",
                "shadow-primary/30 hover:shadow-primary/40 shadow-lg transition-all duration-200 hover:brightness-110"
              )}
            >
              Order Now
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/sign-in"
              className={cn(
                "inline-flex h-12 items-center gap-2 rounded-full border border-white/20 bg-white/8 px-7 text-sm font-semibold text-white/80 backdrop-blur-sm",
                "transition-all duration-200 hover:border-white/30 hover:bg-white/[0.14] hover:text-white"
              )}
            >
              Sign In
            </Link>
          </motion.div>

          <motion.div
            variants={rise}
            className="mt-14 flex flex-wrap items-center gap-8 border-t border-white/8 pt-8"
          >
            {STATS.map(({ value, label }, i) => (
              <div key={i} className="flex flex-col gap-0.5">
                <span className="text-[1.6rem] leading-none font-bold tracking-tight text-white">
                  {value}
                </span>
                <span className="mt-1 text-[11px] font-medium tracking-widest text-white/35 uppercase">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 pt-1.5"
        >
          <div className="h-1.5 w-0.75 rounded-full bg-white/35" />
        </motion.div>
      </motion.div>
    </section>
  );
}
