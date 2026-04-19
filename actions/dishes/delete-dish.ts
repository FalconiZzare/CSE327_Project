"use server";

import { requirePermission } from "@/lib/dal";
import prisma from "@/lib/prisma";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export async function deleteDish(id: string) {
  await requirePermission({ dish: ["delete"] });

  const dish = await prisma.dish.findUniqueOrThrow({ where: { id } });

  if (dish.imageUrl) {
    try {
      await del(dish.imageUrl);
    } catch {}
  }

  await prisma.dish.delete({ where: { id } });

  revalidatePath("/dashboard/dishes");
  revalidatePath("/");
}
