"use client";

import { usePathname } from "next/navigation";
import { Header } from "./header";

const HIDE_HEADER_ON = ["/sign-in"];

export function ConditionalHeader() {
  const pathname = usePathname();
  if (HIDE_HEADER_ON.includes(pathname)) return null;
  return (
    <>
      <Header />
      <div aria-hidden="true" className="h-16 shrink-0" />
    </>
  );
}
