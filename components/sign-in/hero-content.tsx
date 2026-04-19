"use client";

import TrueFocus from "@/components/reactbits/true-focus";
import { LogoMark, LogoWordmark } from "@/components/logo";

export function HeroContent() {
  return (
    <div className="flex h-full flex-col justify-between p-10 xl:p-14">
      <div className="flex shrink-0 items-center gap-2.5">
        <LogoMark className="h-6 w-auto" />
        <LogoWordmark className="text-background dark:text-foreground mt-0.5 hidden h-3.5 w-auto md:block" />
      </div>

      <div className="space-y-5">
        <p className="text-primary text-[10px] font-bold tracking-[0.45em] uppercase">Welcome to</p>
        <div className="text-white">
          <TrueFocus
            sentence="CRUNCH TIME"
            blurAmount={2}
            borderColor="var(--primary)"
            glowColor="oklch(0.514 0.222 16.935 / 0.45)"
            animationDuration={0.5}
            pauseBetweenAnimations={1.8}
            textSize="text-6xl xl:text-7xl"
            wordClassNames={["font-black", "font-light"]}
          />
        </div>
        <p className="max-w-sm text-sm/7 text-white/55 italic">
          &ldquo;High quality ingredients mixed with excellent service is the best recipe for a
          successful food vendor.&rdquo;
        </p>
      </div>

      <p className="text-[11px] text-white/30">
        &copy; {new Date().getFullYear()} Crunch Time. All rights reserved.
      </p>
    </div>
  );
}
