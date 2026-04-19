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

async function resolvePermission(permissions: Record<string, string[]>) {
  const session = await getSession();
  const role = (session?.user.role ?? "customer") as AppRole;
  const result = await auth.api.userHasPermission({
    body: { role, permissions }
  });
  return { session, allowed: result.success };
}

export async function checkPermission(permissions: Record<string, string[]>): Promise<boolean> {
  const { allowed } = await resolvePermission(permissions);
  return allowed;
}

export async function requirePermission(permissions: Record<string, string[]>) {
  const session = await requireAuth();
  const result = await auth.api.userHasPermission({
    body: { role: (session.user.role ?? "customer") as AppRole, permissions }
  });
  if (!result.success) throw new Error("Forbidden");
  return session;
}

export async function guardPermission(permissions: Record<string, string[]>) {
  const session = await requireAuth();
  const result = await auth.api.userHasPermission({
    body: { role: (session.user.role ?? "customer") as AppRole, permissions }
  });
  if (!result.success) redirect("/dashboard");
  return session;
}
