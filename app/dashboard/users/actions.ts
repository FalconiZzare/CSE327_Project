"use server";

import { requireRole } from "@/lib/dal";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import type { AppRole } from "@/lib/access";

export async function updateUserRole(userId: string, role: AppRole) {
  const session = await requireRole("admin");
  if (session.user.id === userId) throw new Error("You cannot change your own role.");

  await prisma.user.update({
    where: { id: userId },
    data: { role }
  });

  revalidatePath("/dashboard/users");
}
