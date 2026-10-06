"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Search, Plus, Trash2, Calendar as CalendarIcon } from "lucide-react";
import { deleteSchedule } from "./actions";

type ScheduleData = {
  id: string;
  startTime: Date;
  endTime: Date;
  staff: { name: string; email: string };
  booking?: { service: { name: string } } | null;
};

export default function ScheduleClient({ initialSchedules }: { initialSchedules: ScheduleData[] }) {
  const [search, setSearch] = useState("");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Optimistic UI for deletion
  const [schedules, setSchedules] = useState(initialSchedules);

  useEffect(() => {
    setSchedules(initialSchedules);
  }, [initialSchedules]);

  const filteredSchedules = schedules.filter(s => 
    s.staff.name.toLowerCase().includes(search.toLowerCase()) || 
    s.staff.email.toLowerCase().includes(search.toLowerCase()) ||
    s.booking?.service.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    setIsDeleting(id);
    await deleteSchedule(id);
    setSchedules(schedules.filter(s => s.id !== id));
    setIsDeleting(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search by staff name, email, or service..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 h-12 bg-background border border-border text-sm focus:outline-none focus:border-primary rounded-none"
          />
        </div>
        <button className="flex items-center justify-center gap-2 h-12 px-6 bg-primary text-primary-foreground font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Allocate Resource
        </button>
      </div>

      <div className="bg-card border border-border p-6">
        <h2 className="font-bold text-xs uppercase text-muted-foreground tracking-widest mb-6 border-b border-border pb-4">
          Active Staff Assignments
        </h2>
        
        {filteredSchedules.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <CalendarIcon className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>No schedules match your search.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredSchedules.map(s => (
              <div key={s.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-border bg-background hover:border-primary/30 transition-colors gap-4 group">
                <div className="flex items-start md:items-center gap-4">
                  <div className="hidden md:flex w-10 h-10 bg-secondary items-center justify-center border border-border text-xs font-bold uppercase">
                    {s.staff.name.substring(0, 2)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">{format(new Date(s.startTime), 'MMM d, yyyy h:mm a')} - {format(new Date(s.endTime), 'h:mm a')}</h4>
                    <p className="font-medium mt-1">{s.booking?.service.name || "General Maintenance / Unassigned"}</p>
                    <p className="text-sm text-muted-foreground">Allocated to: <span className="text-foreground">{s.staff.email}</span></p>
                  </div>
                </div>
                <div>
                   <button 
                     onClick={() => handleDelete(s.id)}
                     disabled={isDeleting === s.id}
                     className="inline-flex items-center justify-center rounded-none bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground px-4 h-10 text-xs font-semibold border border-destructive/20 transition-colors disabled:opacity-50"
                   >
                     {isDeleting === s.id ? 'REMOVING...' : <><Trash2 className="w-4 h-4 mr-2" /> REVOKE</>}
                   </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
