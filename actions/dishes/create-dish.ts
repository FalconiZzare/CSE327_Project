"use server";

import { requirePermission } from "@/lib/dal";
import prisma from "@/lib/prisma";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export async function createDish(formData: FormData) {
  await requirePermission({ dish: ["create"] });

  const name = (formData.get("name") as string).trim();
  const description = (formData.get("description") as string).trim();
  const price = parseFloat(formData.get("price") as string);
  const category = (formData.get("category") as string).trim();
  const available = formData.get("available") === "true";
  const imageFile = formData.get("image") as File | null;

  if (!name || !description || isNaN(price) || price < 0 || !category) {
    throw new Error("All fields are required and price must be a positive number.");
  }

  let imageUrl: string | undefined;
  if (imageFile && imageFile.size > 0) {
    const blob = await put(`dishes/${Date.now()}-${imageFile.name}`, imageFile, {
      access: "public"
    });
    imageUrl = blob.url;
  }

  await prisma.dish.create({
    data: { name, description, price, category, available, imageUrl }
  });

  revalidatePath("/dashboard/dishes");
  revalidatePath("/");
}
