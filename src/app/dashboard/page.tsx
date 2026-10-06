import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Calendar, CheckCircle2, Clock, Activity, Users, Box, BarChart3, AlertCircle } from "lucide-react";
import { format } from "date-fns";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;

  if (!user) {
    redirect("/login");
  }

  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
  const role = dbUser?.role || "CLIENT";

  let content = null;

  if (role === "CLIENT") {
    const totalBookings = await prisma.booking.count({ where: { clientId: user.id } });
    const pendingBookings = await prisma.booking.count({ where: { clientId: user.id, status: "PENDING" } });
    const recentBookings = await prisma.booking.findMany({
      where: { clientId: user.id },
      include: { service: true },
      orderBy: { createdAt: 'desc' },
      take: 5
    });
    
    content = (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card p-6 border border-border shadow-sm">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-2">Total Requests</h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center">
                <Box className="w-6 h-6" />
              </div>
              <span className="text-4xl font-display font-bold">{totalBookings}</span>
            </div>
          </div>
          <div className="bg-card p-6 border border-border shadow-sm">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-2">Pending</h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <span className="text-4xl font-display font-bold">{pendingBookings}</span>
            </div>
          </div>
          <div className="bg-card p-6 border border-border shadow-sm flex flex-col justify-center items-start">
            <Link href="/dashboard/bookings/new" className="inline-flex items-center justify-center rounded-none bg-primary text-primary-foreground hover:opacity-90 px-6 h-12 text-sm font-semibold transition-opacity w-full group">
              NEW SERVICE REQUEST
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="bg-card border border-border shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold uppercase tracking-widest">Recent Activity</h2>
            <Link href="/dashboard/bookings" className="text-sm text-primary hover:underline font-medium">View All</Link>
          </div>
          
          {recentBookings.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>No service requests found.</p>
              <Link href="/dashboard/bookings/new" className="text-primary hover:underline mt-2 inline-block">Initiate a request</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentBookings.map(booking => (
                <div key={booking.id} className="flex items-center justify-between p-4 border border-border bg-background hover:border-primary/50 transition-colors">
                  <div>
                    <h4 className="font-semibold">{booking.service.name}</h4>
                    <p className="text-sm text-muted-foreground">{format(booking.createdAt, 'PPP')}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-none text-xs font-medium uppercase tracking-wider bg-secondary text-secondary-foreground border border-border">
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  } else if (role === "STAFF") {
    const schedules = await prisma.schedule.findMany({
      where: { staffId: user.id },
      include: { booking: { include: { service: true, client: true } } },
      orderBy: { startTime: 'asc' },
      take: 5
    });
    
    content = (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card p-6 border border-border shadow-sm">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-2">Upcoming Assignments</h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <span className="text-4xl font-display font-bold">{schedules.length}</span>
            </div>
          </div>
          <div className="bg-card p-6 border border-border shadow-sm flex flex-col justify-center items-start">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-2">Division</h3>
            <span className="text-2xl font-bold">{dbUser?.division || "UNASSIGNED"}</span>
          </div>
        </div>

        <div className="bg-card border border-border shadow-sm p-8">
          <h2 className="text-xl font-bold uppercase tracking-widest mb-6">Your Schedule</h2>
          {schedules.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>No upcoming assignments.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {schedules.map(schedule => (
                <div key={schedule.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-border bg-background hover:border-primary/50 transition-colors gap-4">
                  <div>
                    <h4 className="font-semibold text-primary">{format(schedule.startTime, 'PPP p')} - {format(schedule.endTime, 'p')}</h4>
                    <p className="font-medium mt-1">{schedule.booking?.service.name || "General Task"}</p>
                    <p className="text-sm text-muted-foreground">{schedule.booking?.client.name || "Internal"}</p>
                  </div>
                  <div>
                     <Link href={`/dashboard/schedule/${schedule.id}`} className="inline-flex items-center justify-center rounded-none bg-secondary text-secondary-foreground hover:bg-muted px-4 h-9 text-xs font-semibold border border-border">
                        VIEW DETAILS
                     </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  } else if (role === "ADMIN") {
    const totalUsers = await prisma.user.count();
    const totalBookings = await prisma.booking.count();
    const pendingBookings = await prisma.booking.count({ where: { status: "PENDING" } });
    
    const recentBookings = await prisma.booking.findMany({
      include: { client: true, service: true },
      orderBy: { createdAt: 'desc' },
      take: 5
    });

    content = (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-card p-6 border border-border shadow-sm">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Total Users</h3>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-secondary flex items-center justify-center border border-border">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-3xl font-display font-bold">{totalUsers}</span>
            </div>
          </div>
          <div className="bg-card p-6 border border-border shadow-sm">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Total Requests</h3>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-secondary flex items-center justify-center border border-border">
                <Box className="w-5 h-5" />
              </div>
              <span className="text-3xl font-display font-bold">{totalBookings}</span>
            </div>
          </div>
          <div className="bg-card p-6 border border-border shadow-sm">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Pending Action</h3>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary/10 text-primary flex items-center justify-center">
                <AlertCircle className="w-5 h-5" />
              </div>
              <span className="text-3xl font-display font-bold text-primary">{pendingBookings}</span>
            </div>
          </div>
          <div className="bg-card p-6 border border-border shadow-sm">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">System Status</h3>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-green-500/10 text-green-500 flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-green-600 dark:text-green-500">OPERATIONAL</span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold uppercase tracking-widest">Global Activity Stream</h2>
            <Link href="/dashboard/bookings" className="text-sm text-primary hover:underline font-medium">Manage All</Link>
          </div>
          
          {recentBookings.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>No activity recorded in the system.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentBookings.map(booking => (
                <div key={booking.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-border bg-background hover:border-primary/50 transition-colors gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-secondary flex flex-col items-center justify-center border border-border text-xs font-bold uppercase">
                      {booking.service.division.substring(0, 3)}
                    </div>
                    <div>
                      <h4 className="font-semibold">{booking.service.name}</h4>
                      <p className="text-sm text-muted-foreground">Req by: <span className="text-foreground">{booking.client.name}</span> • {format(booking.createdAt, 'MMM d, yyyy')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-none text-xs font-medium uppercase tracking-wider bg-secondary text-secondary-foreground border border-border">
                      {booking.status}
                    </span>
                    <Link href={`/dashboard/bookings/${booking.id}`} className="inline-flex items-center justify-center rounded-none bg-primary text-primary-foreground hover:opacity-90 px-4 h-8 text-xs font-semibold">
                      REVIEW
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground uppercase">
              Command Center
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Welcome back, <span className="text-foreground font-semibold">{dbUser?.name || user.email}</span>
            </p>
          </div>
          
          <div className="flex items-center gap-2 bg-background border border-border shadow-sm rounded-none px-4 py-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span className="text-sm font-bold text-foreground uppercase tracking-widest">{role} CLEARANCE</span>
          </div>
        </header>

        {content}
        
      </div>
    </div>
  );
}
