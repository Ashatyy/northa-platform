"use client";

import { useState } from "react";
import { updateProfile } from "./actions";

export default function SettingsClient({ user }: { user: any }) {
  const [name, setName] = useState(user.name || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    await updateProfile(user.id, name);
    setMessage("Profile sync successful.");
    setIsUpdating(false);
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <header className="mb-8">
          <h1 className="font-display text-4xl tracking-tighter uppercase text-foreground">
            Account Settings
          </h1>
          <p className="font-mono text-xs text-muted-foreground uppercase mt-2 tracking-widest font-bold">
            Profile Settings & Security
          </p>
        </header>

        <form onSubmit={handleUpdate} className="bg-card border border-border p-8 space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-2">Identification</h3>
          
          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Primary Alias (Name)</label>
              <input 
                type="text" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                className="w-full h-12 border border-border bg-background px-4 font-sans text-sm focus:outline-none focus:border-primary rounded-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Registered Endpoint (Email - Immutable)</label>
              <input 
                type="text" 
                value={user.email} 
                disabled
                className="w-full h-12 border border-border bg-background px-4 font-sans text-sm rounded-none opacity-50 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button 
              type="submit" 
              disabled={isUpdating || name === user.name}
              className="h-12 px-8 bg-primary text-primary-foreground font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isUpdating ? "Transmitting..." : "Update Configuration"}
            </button>
            {message && <span className="font-mono text-xs text-primary">{message}</span>}
          </div>
        </form>
      </div>
    </div>
  );
}
