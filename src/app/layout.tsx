import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "700"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Northa Group | Service Booking Platform",
  description: "Unified Enterprise Resource and Service Booking Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body
        className={cn(
          "font-sans antialiased min-h-screen",
          spaceGrotesk.variable,
          spaceMono.variable
        )}
      >
        <TooltipProvider>
          {children}
        </TooltipProvider>
        <Toaster toastOptions={{ className: 'font-mono text-xs uppercase tracking-widest rounded-none border border-border-ui text-text-primary bg-background p-4' }} />
      </body>
    </html>
  );
}
