import { createClient } from "@/utils/supabase/server";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem 
} from "@/components/ui/sidebar";
import { logout } from "@/app/dashboard/actions";
import Link from "next/link";
import { Server, CalendarDays, Users, LayoutDashboard, Ticket, FileCode2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import NotificationBell from "./NotificationBell";

export async function AppSidebar() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;
  const role = user?.user_metadata?.role || "client";

  const dbUser = user ? await prisma.user.findUnique({ where: { id: user.id } }) : null;
  const notifications = dbUser ? await prisma.notification.findMany({
    where: { userId: dbUser.id, read: false },
    orderBy: { createdAt: "desc" },
    take: 5
  }) : [];

  // Role-based navigation maps
  const navItems = [
    {
      title: "OVERVIEW",
      url: "/dashboard",
      icon: LayoutDashboard,
      roles: ["admin", "staff", "client"],
    },
    {
      title: "SERVICE BOOKINGS",
      url: "/dashboard/bookings",
      icon: Ticket,
      roles: ["admin", "staff", "client"],
    },
    {
      title: "RESOURCE MANAGEMENT",
      url: "/dashboard/resource-management",
      icon: Server,
      roles: ["admin", "staff"],
    },
    {
      title: "STAFF SCHEDULING",
      url: "/dashboard/schedule",
      icon: CalendarDays,
      roles: ["admin", "staff"],
    },
    {
      title: "USER DIRECTORY",
      url: "/dashboard/user-directory",
      icon: Users,
      roles: ["admin"],
    },
    {
      title: "DIVISION METRICS",
      url: "/dashboard/metrics",
      icon: FileCode2,
      roles: ["admin"],
    },
  ];

  const allowedNav = navItems.filter(item => item.roles.includes(role));

  return (
    <Sidebar className="border-r border-border bg-background font-sans">
      <SidebarHeader className="p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="grid grid-cols-2 gap-[2px]">
              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
              <div className="w-2.5 h-2.5 rounded-full bg-foreground" />
              <div className="w-2.5 h-2.5 rounded-full bg-foreground" />
              <div className="w-2.5 h-2.5 rounded-full bg-foreground" />
            </div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">Northa</h2>
          </div>
          <NotificationBell initialNotifications={notifications} />
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-4 pt-0">
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-semibold text-xs mb-2 px-2">
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {allowedNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="rounded-xl hover:bg-primary/10 hover:text-primary transition-all text-muted-foreground h-10 px-3 group mb-1">
                    <Link href={item.url} className="flex items-center gap-3 w-full h-full">
                      <item.icon className="h-4 w-4 group-hover:text-primary transition-colors" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-6 border-t border-border">
        <div className="bg-card shadow-sm border border-border/50 rounded-2xl p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Active User</span>
            <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(0,102,255,0.8)] block" />
          </div>
          <p className="text-sm font-semibold text-foreground truncate">{user?.email}</p>
          <p className="text-xs text-primary font-medium mt-1 uppercase tracking-widest">{role}</p>
          
          <div className="mt-4 pt-4 border-t border-border/50 flex flex-col gap-3">
            <Link href="/dashboard/settings" className="text-xs font-semibold text-muted-foreground hover:text-foreground w-full text-left transition-colors">
              Account Settings
            </Link>
            <form action={logout}>
              <button type="submit" className="text-xs font-semibold text-muted-foreground hover:text-destructive w-full text-left transition-colors">
                Terminate Session
              </button>
            </form>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
