import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, XCircle } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import BookingLifecycleClient from "./BookingLifecycleClient";
import ClientCancelButton from "./ClientCancelButton";

export default async function BookingDetailsPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;
  const dbUser = user ? await prisma.user.findUnique({ where: { id: user.id } }) : null;

  const booking = await prisma.booking.findUnique({
    where: { id: params.id },
    include: { service: true, client: true, schedules: { include: { staff: true } } }
  });

  if (!booking) notFound();
  
  const staff = await prisma.user.findMany({ where: { role: 'STAFF' } });

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <Link href="/dashboard" className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
            </Link>
            <h1 className="font-display text-4xl tracking-tighter uppercase text-foreground">
              Request Details
            </h1>
          </div>
          <div className="bg-secondary text-secondary-foreground px-4 py-2 text-xs font-bold uppercase tracking-widest border border-border">
            {booking.status}
          </div>
        </header>

        <div className="bg-card border border-border p-8 space-y-6">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Service</h3>
              <p className="text-lg font-semibold">{booking.service.name}</p>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Client</h3>
              <p className="text-lg font-semibold">{booking.client.name}</p>
            </div>
            <div className="col-span-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Service Requirements</h3>
              <div className="bg-background border border-border p-6 space-y-4">
                {Object.entries(booking.metadata as Record<string, any>).map(([key, val]) => (
                  <div key={key}>
                    <p className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{key}</p>
                    <p className="text-sm font-medium">{val}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {booking.schedules.length > 0 && (
          <div className="bg-card border border-border p-8 space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Allocated Schedule & Resources</h3>
            <div className="space-y-4">
              {booking.schedules.map(s => (
                <div key={s.id} className="p-4 border border-border bg-background flex justify-between items-center">
                  <div>
                    <p className="font-bold text-sm uppercase tracking-widest">{s.staff.name}</p>
                    <p className="text-xs text-muted-foreground">Assigned Personnel</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm">
                      {new Date(s.startTime).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                    </p>
                    <p className="font-mono text-sm text-muted-foreground">to</p>
                    <p className="font-mono text-sm">
                      {new Date(s.endTime).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {dbUser?.role === 'ADMIN' && (
          <BookingLifecycleClient booking={booking} staff={staff} />
        )}

        {dbUser?.role === 'CLIENT' && booking.status === 'PENDING' && (
          <div className="bg-card border border-border p-8 space-y-4 flex flex-col items-start">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Manage Request</h3>
            <p className="text-sm text-muted-foreground">You can cancel this request while it is still pending.</p>
            <ClientCancelButton bookingId={booking.id} />
          </div>
        )}
      </div>
    </div>
  );
}
