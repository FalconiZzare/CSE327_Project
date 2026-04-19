"use client";

import { ThemeProvider } from "next-themes";
import { AppProgressProvider as ProgressBar } from "@bprogress/next";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ProgressBar
        height="2px"
        color="oklch(0.514 0.222 16.935)"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
    </ThemeProvider>
  );
}
