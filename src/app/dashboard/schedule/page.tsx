import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ScheduleClient from "./ScheduleClient";

export default async function SchedulePage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;

  if (!user) redirect("/login");

  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
  
  if (dbUser?.role === "CLIENT") {
    redirect("/dashboard"); // Clients cannot access the schedule
  }

  const schedules = await prisma.schedule.findMany({
    include: {
      staff: true,
      booking: {
        include: { service: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="mb-8">
          <h1 className="font-display text-4xl tracking-tighter uppercase text-text-display">
            Staff Scheduling
          </h1>
          <p className="font-mono text-label text-text-secondary uppercase mt-2 tracking-widest">
            Cross-Division Resource Allocation Matrix
          </p>
        </header>

        <ScheduleClient initialSchedules={schedules} />
      </div>
    </div>
  );
}
