"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateUserRole(userId: string, role: string) {
  await prisma.user.update({
    where: { id: userId },
    data: { role: role as any }
  });
  revalidatePath("/dashboard/user-directory");
}

export async function updateUserDivision(userId: string, division: string | null) {
  await prisma.user.update({
    where: { id: userId },
    data: { division: division as any }
  });
  revalidatePath("/dashboard/user-directory");
}
