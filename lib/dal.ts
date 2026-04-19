import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import type { AppRole } from "@/lib/access";

export const getSession = cache(async () => {
  return auth.api.getSession({ headers: await headers() });
});

export async function requireAuth() {
  const session = await getSession();
  if (!session) redirect("/sign-in?callbackUrl=/dashboard");
  return session;
}

export async function requireRole(...allowed: AppRole[]) {
  const session = await requireAuth();
  const role = session.user.role as AppRole;
  if (!allowed.includes(role)) redirect("/dashboard");
  return session;
}
