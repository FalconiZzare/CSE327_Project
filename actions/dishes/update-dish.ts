"use server";

import { requirePermission } from "@/lib/dal";
import prisma from "@/lib/prisma";
import { put, del } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export async function updateDish(id: string, formData: FormData) {
  await requirePermission({ dish: ["update"] });

  const name = (formData.get("name") as string).trim();
  const description = (formData.get("description") as string).trim();
  const price = parseFloat(formData.get("price") as string);
  const category = (formData.get("category") as string).trim();
  const available = formData.get("available") === "true";
  const imageFile = formData.get("image") as File | null;
  const removeImage = formData.get("removeImage") === "true";

  if (!name || !description || isNaN(price) || price < 0 || !category) {
    throw new Error("All fields are required and price must be a positive number.");
  }

  const existing = await prisma.dish.findUniqueOrThrow({ where: { id } });

  let imageUrl = existing.imageUrl;

  if (imageFile && imageFile.size > 0) {
    if (existing.imageUrl) {
      try {
        await del(existing.imageUrl);
      } catch {}
    }
    const blob = await put(`dishes/${Date.now()}-${imageFile.name}`, imageFile, {
      access: "public"
    });
    imageUrl = blob.url;
  } else if (removeImage && existing.imageUrl) {
    try {
      await del(existing.imageUrl);
    } catch {}
    imageUrl = null;
  }

  await prisma.dish.update({
    where: { id },
    data: { name, description, price, category, available, imageUrl }
  });

  revalidatePath("/dashboard/dishes");
  revalidatePath(`/dashboard/dishes/${id}/edit`);
  revalidatePath("/");
}
