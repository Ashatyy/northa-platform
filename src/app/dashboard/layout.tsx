import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { createClient } from "@/utils/supabase/server";
import { Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;

  if (user) {
    const dbUser = await prisma.user.findUnique({ where: { id: user.id }, select: { id: true } });
    if (!dbUser) {
      const roleValue = (user.user_metadata?.role?.toUpperCase() || "CLIENT") as Role;
      await prisma.user.create({
        data: {
          id: user.id,
          email: user.email!,
          name: user.email!.split("@")[0],
          role: roleValue,
        }
      });
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full min-h-screen bg-background dot-grid flex flex-col">
        <div className="w-full border-b border-border flex items-center p-4 bg-background">
          <SidebarTrigger className="text-muted-foreground hover:text-foreground rounded-none" />
        </div>
        <div className="flex-1">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
