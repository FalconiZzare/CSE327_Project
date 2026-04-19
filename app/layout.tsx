import type { Metadata } from "next";
import { Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ConditionalHeader } from "@/components/layout/conditional-header";
import { Providers } from "./providers";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-sans" });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Crunch Time",
  description:
    "High quality ingredients mixed with excellent service is the best recipe for a successful food vendor."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={cn("h-full", "antialiased", geistMono.variable, "font-sans", montserrat.variable)}
    >
      <body className="flex min-h-full flex-col">
        <Providers>
          <ConditionalHeader />
          <div className="flex flex-1 flex-col">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
