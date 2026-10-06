"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  
  revalidatePath("/", "layout");
  redirect("/login");
}

export async function markAsRead(id: string) {
  const { prisma } = await import("@/lib/prisma");
  await prisma.notification.update({
    where: { id },
    data: { read: true }
  });
}
