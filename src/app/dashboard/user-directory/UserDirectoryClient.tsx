"use client";

import { useState } from "react";
import { updateUserRole, updateUserDivision } from "./actions";

type UserData = {
  id: string;
  name: string | null;
  email: string;
  role: string;
  division: string | null;
  createdAt: Date;
};

export default function UserDirectoryClient({ users }: { users: UserData[] }) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleRoleChange = async (userId: string, newRole: string) => {
    setUpdatingId(userId);
    await updateUserRole(userId, newRole);
    setUpdatingId(null);
  };

  const handleDivisionChange = async (userId: string, newDivision: string) => {
    setUpdatingId(userId);
    await updateUserDivision(userId, newDivision === "NONE" ? null : newDivision);
    setUpdatingId(null);
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="mb-8">
          <h1 className="font-display text-4xl tracking-tighter uppercase text-foreground">
            User Directory
          </h1>
          <p className="font-mono text-xs text-muted-foreground uppercase mt-2 tracking-widest font-bold">
            Role-Based Access Control & Division Assignments
          </p>
        </header>

        <div className="bg-card border border-border overflow-x-auto">
          <table className="w-full text-left font-mono text-sm">
            <thead className="bg-secondary text-secondary-foreground border-b border-border">
              <tr>
                <th className="p-4 font-bold uppercase tracking-widest text-xs">User Profile</th>
                <th className="p-4 font-bold uppercase tracking-widest text-xs">Clearance</th>
                <th className="p-4 font-bold uppercase tracking-widest text-xs">Division Sector</th>
                <th className="p-4 font-bold uppercase tracking-widest text-xs">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="p-4">
                    <div className="font-semibold text-foreground">{u.name || "Unknown"}</div>
                    <div className="text-xs text-muted-foreground">{u.email}</div>
                  </td>
                  <td className="p-4">
                    <select 
                      disabled={updatingId === u.id}
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      className="h-8 border border-border bg-background px-2 text-xs focus:outline-none focus:border-primary cursor-pointer rounded-none disabled:opacity-50"
                    >
                      <option value="CLIENT">CLIENT</option>
                      <option value="STAFF">STAFF</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <select 
                      disabled={updatingId === u.id || u.role === 'CLIENT'}
                      value={u.division || "NONE"}
                      onChange={(e) => handleDivisionChange(u.id, e.target.value)}
                      className="h-8 border border-border bg-background px-2 text-xs focus:outline-none focus:border-primary cursor-pointer rounded-none disabled:opacity-50"
                    >
                      <option value="NONE">Unassigned</option>
                      <option value="CONSTRUCTION">CONSTRUCTION</option>
                      <option value="OIL_GAS">OIL & GAS</option>
                      <option value="AGRICULTURE">AGRICULTURE</option>
                      <option value="HOSPITALITY">HOSPITALITY</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <span className="text-[10px] text-muted-foreground uppercase">
                      {updatingId === u.id ? "Syncing..." : "Active"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
