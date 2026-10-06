import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ResourceClient from "./ResourceClient";

export default async function ResourceManagementPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;

  if (!user) redirect("/login");

  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
  if (dbUser?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const resources = await prisma.resource.findMany({
    orderBy: { createdAt: "desc" }
  });

  return <ResourceClient resources={resources} />;
}
