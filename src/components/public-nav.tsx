"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function PublicNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-background/90 border-b border-border/50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="grid grid-cols-2 gap-[2px]">
            <div className="w-2.5 h-2.5 rounded-full bg-primary" />
            <div className="w-2.5 h-2.5 rounded-full bg-foreground" />
            <div className="w-2.5 h-2.5 rounded-full bg-foreground" />
            <div className="w-2.5 h-2.5 rounded-full bg-foreground" />
          </div>
          <span className="font-display text-2xl font-bold tracking-tight text-foreground">Northa</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold uppercase tracking-widest">
          <Link href="/who-we-are" className={`transition-colors hover:text-primary ${pathname === "/who-we-are" ? "text-primary" : "text-muted-foreground"}`}>WHO WE ARE</Link>
          <Link href="/our-offer" className={`transition-colors hover:text-primary ${pathname === "/our-offer" ? "text-primary" : "text-muted-foreground"}`}>OUR OFFER</Link>
          <Link href="/contact" className={`transition-colors hover:text-primary ${pathname === "/contact" ? "text-primary" : "text-muted-foreground"}`}>CONTACT</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:opacity-90 shadow-sm px-6 h-10 text-sm font-medium transition-opacity">
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  );
}
