"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateProfile(id: string, name: string) {
  await prisma.user.update({
    where: { id },
    data: { name }
  });
  revalidatePath("/dashboard/settings");
  revalidatePath("/dashboard", "layout");
}
