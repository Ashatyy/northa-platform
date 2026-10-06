"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addResource(name: string, type: string, division: string) {
  await prisma.resource.create({
    data: { name, type, division: division as any }
  });
  revalidatePath("/dashboard/resource-management");
}

export async function deleteResource(id: string) {
  await prisma.resource.delete({ where: { id } });
  revalidatePath("/dashboard/resource-management");
}

export async function updateResourceStatus(id: string, status: string) {
  await prisma.resource.update({
    where: { id },
    data: { status }
  });
  revalidatePath("/dashboard/resource-management");
}
