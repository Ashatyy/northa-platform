import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBooking } from "./actions";
import BookingFormClient from "./BookingFormClient";

export default async function NewBookingPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;

  if (!user) redirect("/login");

  const services = await prisma.service.findMany({
    orderBy: { division: "asc" }
  });

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <header className="mb-8">
          <h1 className="font-display text-4xl tracking-tighter uppercase text-text-display">
            Initiate Booking
          </h1>
          <p className="font-mono text-label text-text-secondary uppercase mt-2 tracking-widest">
            Select a service to allocate resources
          </p>
        </header>

        <form action={createBooking} className="bg-card border border-border p-8 space-y-8 relative">
          <BookingFormClient services={services} />
        </form>
      </div>
    </div>
  );
}
