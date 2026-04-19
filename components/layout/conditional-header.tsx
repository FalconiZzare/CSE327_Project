"use client";

import { usePathname } from "next/navigation";
import { Header } from "./header";

const HIDE_HEADER_ON = ["/sign-in"];
const HIDE_HEADER_PREFIX = ["/dashboard"];

export function ConditionalHeader() {
  const pathname = usePathname();
  if (HIDE_HEADER_ON.includes(pathname) || HIDE_HEADER_PREFIX.some((p) => pathname.startsWith(p)))
    return null;
  return (
    <>
      <Header />
      <div aria-hidden="true" className="h-16 shrink-0" />
    </>
  );
}
