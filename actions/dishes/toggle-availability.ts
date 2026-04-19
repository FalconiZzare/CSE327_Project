"use server";

import { revalidatePath } from "next/cache";
import { requirePermission } from "@/lib/dal";
import prisma from "@/lib/prisma";

export async function toggleAvailability(id: string, available: boolean) {
  await requirePermission({ dish: ["update"] });

  await prisma.dish.update({
    where: { id },
    data: { available }
  });

  revalidatePath("/dashboard/dishes");
}
