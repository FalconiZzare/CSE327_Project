"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import Link from "next/link";
import {
  Soup,
  CookingPot,
  Cookie,
  IceCreamCone,
  Wine,
  Store,
  ShoppingCart,
  Menu,
  LogIn
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { LogoMark, LogoWordmark } from "@/components/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const NAV_ITEMS = [
  { label: "Rice", icon: Soup, href: "/#rice" },
  { label: "Curry", icon: CookingPot, href: "/#curry" },
  { label: "Snacks", icon: Cookie, href: "/#snacks" },
  { label: "Desserts", icon: IceCreamCone, href: "/#desserts" },
  { label: "Drinks", icon: Wine, href: "/#drinks" },
  { label: "Street Food", icon: Store, href: "/#street-food" }
];

export function Header() {
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 80) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" }
      }}
      animate={isHidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="border-border/50 bg-background/80 fixed inset-x-0 top-0 z-50 h-16 border-b backdrop-blur-xl"
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <LogoMark className="h-6 w-auto" />
          <LogoWordmark className="mt-0.5 hidden h-3.5 w-auto md:block" />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {NAV_ITEMS.map(({ label, icon: Icon, href }) => (
            <Link
              key={label}
              href={href}
              className="group text-foreground/65 hover:bg-accent hover:text-foreground flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150"
            >
              <Icon
                className="text-primary size-3.75 shrink-0 transition-transform duration-150 group-hover:scale-110"
                strokeWidth={1.75}
              />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="sm"
            className="border-border/60 hidden gap-1.5 border sm:flex"
            asChild
          >
            <Link href="/sign-in">
              <LogIn className="size-3.5" />
              Sign In
            </Link>
          </Button>

          <div className="relative">
            <Button variant="default" size="sm" className="gap-1.5" asChild>
              <Link href="/cart">
                <ShoppingCart className="size-3.5" />
                <span className="hidden sm:inline">Cart</span>
              </Link>
            </Button>
            <span className="bg-foreground text-background pointer-events-none absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full text-[9px] leading-none font-bold">
              0
            </span>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="size-9 lg:hidden">
                <Menu className="size-5" />
                <span className="sr-only">Open navigation</span>
              </Button>
            </SheetTrigger>

            <SheetContent className="flex w-72 flex-col p-0">
              <SheetHeader className="border-border/50 border-b px-4 py-4">
                <SheetTitle asChild>
                  <Link href="/" className="flex items-center gap-2.5">
                    <LogoMark className="h-7 w-auto" />
                    <LogoWordmark className="h-3.75 w-auto" />
                  </Link>
                </SheetTitle>
                <SheetDescription className="sr-only">Site navigation menu</SheetDescription>
              </SheetHeader>

              <nav className="flex flex-col gap-0.5 p-3">
                {NAV_ITEMS.map(({ label, icon: Icon, href }) => (
                  <SheetClose asChild key={label}>
                    <Link
                      href={href}
                      className="text-foreground/65 hover:bg-accent hover:text-foreground flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
                    >
                      <Icon className="text-primary size-5 shrink-0" strokeWidth={1.75} />
                      <span>{label}</span>
                    </Link>
                  </SheetClose>
                ))}
              </nav>

              <div className="border-border/50 mt-auto flex flex-col gap-2 border-t p-4">
                <Button variant="outline" className="w-full gap-2" asChild>
                  <Link href="/sign-in">
                    <LogIn className="size-4" />
                    Sign In
                  </Link>
                </Button>
                <Button variant="default" className="w-full gap-2" asChild>
                  <Link href="/cart">
                    <ShoppingCart className="size-4" />
                    View Cart (0)
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
