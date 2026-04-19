"use client";

import Link from "next/link";
import { House } from "lucide-react";

export function HomeButton() {
  return (
    <Link
      href="/"
      className="group lg:border-border lg:bg-background lg:hover:border-border lg:hover:bg-accent absolute top-5 right-5 z-20 flex items-center gap-2 rounded-none border border-white/20 bg-black/35 p-2.5 backdrop-blur-sm transition-all duration-200 hover:border-white/35 hover:bg-black/55 lg:top-8 lg:px-4 lg:py-2 lg:backdrop-blur-none"
    >
      <House
        className="lg:text-muted-foreground lg:group-hover:text-foreground size-3.5 text-white/60 transition-colors duration-200 group-hover:text-white"
        strokeWidth={1.75}
      />
      <span className="lg:text-muted-foreground lg:group-hover:text-foreground hidden text-xs font-medium text-white/60 transition-colors duration-200 group-hover:text-white lg:inline">
        Home
      </span>
    </Link>
  );
}
