"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { seedUsers } from "./actions";

export default function SeedPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSeed = async () => {
    setLoading(true);
    setMessage("Generating dummy users...");
    
    const result = await seedUsers();
    
    setMessage(result.message);
    setLoading(false);
  };

  return (
    <div className="min-h-screen dot-grid bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-surface border-border-ui border p-8 space-y-8 relative">
        {/* Decorative corner brackets */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-border-visible" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-border-visible" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-border-visible" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-border-visible" />

        <div className="space-y-2 text-center">
          <h1 className="font-display text-4xl tracking-tighter text-text-display uppercase">Seeder</h1>
          <p className="font-mono text-label text-text-secondary tracking-widest uppercase">
            System Initialization
          </p>
        </div>

        <div className="bg-text-display/5 border border-text-display p-4 space-y-4">
          <p className="font-mono text-label text-text-display">
            IMPORTANT: Before clicking the button, you must turn OFF &quot;Confirm email&quot; in Supabase &gt; Authentication &gt; Providers &gt; Email.
          </p>
          <p className="font-mono text-label text-text-secondary">
            This will create 9 dummy accounts (3 Admins, 3 Staff, 3 Clients) with the password "password123".
          </p>
        </div>

        {message && (
          <div className="bg-surface-raised border border-border-visible p-3 text-center">
            <p className="font-mono text-label text-text-primary">{message}</p>
          </div>
        )}

        <Button
          onClick={handleSeed}
          disabled={loading}
          className="w-full rounded-none font-mono tracking-widest uppercase text-label h-12 bg-text-display text-background hover:bg-text-primary transition-colors disabled:opacity-50"
        >
          {loading ? "PROCESSING..." : "EXECUTE SEED"}
        </Button>
      </div>
    </div>
  );
}
