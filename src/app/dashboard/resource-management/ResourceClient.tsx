"use client";

import { useState } from "react";
import { addResource, deleteResource, updateResourceStatus } from "./actions";

type ResourceData = {
  id: string;
  name: string;
  type: string;
  division: string;
  status: string;
};

export default function ResourceClient({ resources }: { resources: ResourceData[] }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [division, setDivision] = useState("CONSTRUCTION");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !type) return;
    setIsUpdating(true);
    await addResource(name, type, division);
    setName("");
    setType("");
    setIsUpdating(false);
  };

  const handleDelete = async (id: string) => {
    setIsUpdating(true);
    await deleteResource(id);
    setIsUpdating(false);
  };

  const handleStatus = async (id: string, status: string) => {
    setIsUpdating(true);
    await updateResourceStatus(id, status);
    setIsUpdating(false);
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="mb-8">
          <h1 className="font-display text-4xl tracking-tighter uppercase text-foreground">
            Resource Management
          </h1>
          <p className="font-mono text-xs text-muted-foreground uppercase mt-2 tracking-widest font-bold">
            Physical Asset Tracking & Allocation Logistics
          </p>
        </header>

        <form onSubmit={handleAdd} className="bg-card border border-border p-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-2">Register New Asset</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input type="text" placeholder="Asset Name (e.g. Rig 42)" required value={name} onChange={e => setName(e.target.value)} className="w-full h-10 border border-border bg-background px-3 text-sm focus:outline-none focus:border-primary rounded-none" />
            <input type="text" placeholder="Type (e.g. Heavy Machinery)" required value={type} onChange={e => setType(e.target.value)} className="w-full h-10 border border-border bg-background px-3 text-sm focus:outline-none focus:border-primary rounded-none" />
            <select required value={division} onChange={e => setDivision(e.target.value)} className="w-full h-10 border border-border bg-background px-3 text-sm focus:outline-none focus:border-primary rounded-none">
              <option value="CONSTRUCTION">CONSTRUCTION</option>
              <option value="OIL_GAS">OIL & GAS</option>
              <option value="AGRICULTURE">AGRICULTURE</option>
              <option value="HOSPITALITY">HOSPITALITY</option>
            </select>
            <button type="submit" disabled={isUpdating} className="h-10 bg-primary text-primary-foreground font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50">
              Register Asset
            </button>
          </div>
        </form>

        <div className="bg-card border border-border overflow-x-auto mt-8">
          <table className="w-full text-left font-mono text-sm">
            <thead className="bg-secondary text-secondary-foreground border-b border-border">
              <tr>
                <th className="p-4 font-bold uppercase tracking-widest text-xs">Asset Name</th>
                <th className="p-4 font-bold uppercase tracking-widest text-xs">Type / Classification</th>
                <th className="p-4 font-bold uppercase tracking-widest text-xs">Division Sector</th>
                <th className="p-4 font-bold uppercase tracking-widest text-xs">Operational Status</th>
                <th className="p-4 font-bold uppercase tracking-widest text-xs">Actions</th>
              </tr>
            </thead>
            <tbody>
              {resources.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No assets registered.</td></tr>
              ) : resources.map(r => (
                <tr key={r.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="p-4 font-semibold text-foreground">{r.name}</td>
                  <td className="p-4">{r.type}</td>
                  <td className="p-4">{r.division}</td>
                  <td className="p-4">
                    <select 
                      disabled={isUpdating}
                      value={r.status}
                      onChange={(e) => handleStatus(r.id, e.target.value)}
                      className="h-8 border border-border bg-background px-2 text-xs focus:outline-none focus:border-primary cursor-pointer rounded-none disabled:opacity-50"
                    >
                      <option value="AVAILABLE">AVAILABLE</option>
                      <option value="IN_USE">IN USE</option>
                      <option value="MAINTENANCE">MAINTENANCE</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <button onClick={() => handleDelete(r.id)} disabled={isUpdating} className="text-destructive hover:underline text-xs font-bold uppercase">
                      Decommission
                    </button>
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
