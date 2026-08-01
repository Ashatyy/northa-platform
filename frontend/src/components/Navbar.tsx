'use client';

import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-8">
        <div className="mr-8 flex items-center space-x-2">
          <Link href="/" className="font-bold text-xl tracking-tight text-primary">
            EduLedger
          </Link>
        </div>
        <div className="flex items-center space-x-6 text-sm font-medium flex-1">
          <Link href="/admin" className="transition-colors hover:text-foreground/80 text-foreground/60">
            NUC Admin
          </Link>
          <Link href="/issuer" className="transition-colors hover:text-foreground/80 text-foreground/60">
            University Issuer
          </Link>
          <Link href="/verify" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Verify Credential
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <ConnectButton />
        </div>
      </div>
    </nav>
  );
}
