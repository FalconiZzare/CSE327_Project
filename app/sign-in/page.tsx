import type { Metadata } from "next";
import Image from "next/image";
import { HeroContent } from "@/components/sign-in/hero-content";
import { AuthButtons } from "@/components/sign-in/auth-buttons";
import { HomeButton } from "@/components/sign-in/home-button";

export const metadata: Metadata = {
  title: "Sign In | Crunch Time",
  description: "Sign in to your Crunch Time account"
};

export default function SignInPage() {
  return (
    <div className="relative flex flex-1 overflow-hidden">
      <HomeButton />
      <div className="absolute inset-0 lg:relative lg:flex lg:w-[55%] lg:flex-col xl:w-3/5">
        <Image
          src="/images/login_bg.avif"
          alt=""
          fill
          sizes="(min-width: 1280px) 60vw, (min-width: 1024px) 55vw, 100vw"
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/65 to-black/25" />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

        <div className="absolute inset-0 bg-black/20 lg:hidden" />

        <div className="relative z-10 hidden flex-1 flex-col lg:flex">
          <HeroContent />
        </div>
      </div>

      <div className="lg:bg-background relative z-10 flex flex-1 flex-col items-center justify-center px-5 py-14">
        <div className="w-full max-w-90 rounded-2xl border border-white/10 bg-black/5 px-7 py-16 shadow-2xl backdrop-blur-[6px] lg:rounded-none lg:border-none lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none">
          <AuthButtons />
        </div>
      </div>
    </div>
  );
}
