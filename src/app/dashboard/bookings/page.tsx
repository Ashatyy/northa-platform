import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default async function BookingsPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;

  if (!user) redirect("/login");

  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
  
  // Admins and Staff see all bookings. Clients see only their own.
  const isAdminOrStaff = dbUser?.role === "ADMIN" || dbUser?.role === "STAFF";
  
  const bookings = await prisma.booking.findMany({
    where: isAdminOrStaff ? {} : { clientId: user.id },
    include: {
      service: true,
      client: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex justify-between items-end mb-8">
          <div>
            <h1 className="font-display text-4xl tracking-tighter uppercase text-foreground">
              Service Bookings
            </h1>
            <p className="font-mono text-xs text-muted-foreground uppercase mt-2 tracking-widest font-bold">
              Division Resource Allocation
            </p>
          </div>
          {!isAdminOrStaff && (
            <Link 
              href="/dashboard/bookings/new"
              className="inline-flex items-center justify-center whitespace-nowrap px-4 py-2 rounded-none font-mono tracking-widest uppercase text-xs font-bold h-10 bg-primary text-primary-foreground hover:opacity-90 transition-colors"
            >
              INITIATE BOOKING
            </Link>
          )}
        </header>

        <div className="bg-card border border-border overflow-hidden relative p-4">
          <Table>
            <TableCaption className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground text-left p-4">
              {bookings.length} BOOKING(S) FOUND IN SYSTEM
            </TableCaption>
            <TableHeader>
              <TableRow className="border-b border-border hover:bg-transparent">
                <TableHead className="font-mono text-xs font-bold uppercase text-muted-foreground">ID</TableHead>
                <TableHead className="font-mono text-xs font-bold uppercase text-muted-foreground">Service</TableHead>
                <TableHead className="font-mono text-xs font-bold uppercase text-muted-foreground">Division</TableHead>
                {isAdminOrStaff && <TableHead className="font-mono text-xs font-bold uppercase text-muted-foreground">Client</TableHead>}
                <TableHead className="font-mono text-xs font-bold uppercase text-muted-foreground">Status</TableHead>
                <TableHead className="font-mono text-xs font-bold uppercase text-muted-foreground text-right">Date</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((b) => (
                <TableRow key={b.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <TableCell className="font-mono text-xs text-foreground">
                    {b.id.split("-")[0]}...
                  </TableCell>
                  <TableCell className="font-sans text-sm font-medium">
                    {b.service.name}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {b.service.division}
                  </TableCell>
                  {isAdminOrStaff && (
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {b.client.email}
                    </TableCell>
                  )}
                  <TableCell>
                    <span className={`font-mono text-[10px] uppercase px-2 py-1 border font-bold ${b.status === 'CONFIRMED' ? 'border-primary text-primary' : 'border-border text-muted-foreground'}`}>
                      {b.status}
                    </span>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-right text-muted-foreground">
                    {b.createdAt.toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/dashboard/bookings/${b.id}`} className="inline-flex items-center justify-center font-bold text-[10px] uppercase tracking-widest hover:text-primary transition-colors border border-border px-3 py-1 hover:border-primary">
                      View
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
              {bookings.length === 0 && (
                <TableRow>
                  <TableCell colSpan={isAdminOrStaff ? 7 : 6} className="text-center p-8 font-mono text-xs text-muted-foreground uppercase font-bold">
                    No active bookings.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
