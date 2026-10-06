"use server";

import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createBooking(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const serviceId = formData.get("serviceId") as string;
  let metadataRaw = formData.get("metadata") as string;
  let metadata = {};

  try {
    metadata = JSON.parse(metadataRaw);
  } catch (e) {
    metadata = { raw: metadataRaw };
  }

  await prisma.booking.create({
    data: {
      clientId: user.id,
      serviceId,
      metadata,
      status: "PENDING",
    }
  });

  revalidatePath("/dashboard/bookings");
  redirect("/dashboard/bookings");
}
