"use client";

import { useState } from "react";
import { updateBookingStatus, assignStaffToBooking } from "./actions";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type BookingData = {
  id: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "DECLINED";
  schedules: any[];
};

export default function BookingLifecycleClient({ booking, staff }: { booking: BookingData, staff: any[] }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleStatusChange = async (newStatus: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED") => {
    setIsUpdating(true);
    await updateBookingStatus(booking.id, newStatus);
    setIsUpdating(false);
  };

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStaff || !startDate || !endDate) return;
    setIsUpdating(true);
    const res = await assignStaffToBooking(booking.id, selectedStaff, new Date(startDate), new Date(endDate));
    if (res?.error) {
      alert(res.error);
    } else {
      setSelectedStaff("");
      setStartDate("");
      setEndDate("");
    }
    setIsUpdating(false);
  };

  return (
    <div className="space-y-8">
      <div className="bg-card border border-border p-6 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-2">Lifecycle Management</h3>
        <div className="flex flex-wrap gap-4 pt-2">
          {["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"].map((status) => (
            <button
              key={status}
              disabled={isUpdating || booking.status === status}
              onClick={() => handleStatusChange(status as any)}
              className={`px-6 py-2 text-xs font-bold uppercase tracking-widest border transition-colors ${
                booking.status === status 
                  ? 'bg-primary text-primary-foreground border-primary' 
                  : 'bg-background text-foreground border-border hover:border-primary disabled:opacity-50'
              }`}
            >
              Mark {status}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border p-6 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-2">Resource Allocation (Schedules)</h3>
        
        {booking.schedules.length > 0 ? (
          <div className="space-y-2 pt-2">
            {booking.schedules.map(s => (
              <div key={s.id} className="p-4 border border-border bg-background text-sm flex justify-between items-center">
                <div>
                  <span className="font-bold">{s.staff.name}</span> ({s.staff.email})
                </div>
                <div className="text-muted-foreground font-mono text-xs">
                  {new Date(s.startTime).toLocaleDateString()} - {new Date(s.endTime).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground pt-2">No resources allocated to this request yet.</p>
        )}

        <form onSubmit={handleAssign} className="pt-6 mt-6 border-t border-border space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest">Assign New Resource</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-[10px] uppercase">Staff Member</Label>
              <select required value={selectedStaff} onChange={e => setSelectedStaff(e.target.value)} className="w-full h-10 border border-border bg-background px-3 text-sm focus:outline-none focus:border-primary cursor-pointer rounded-none">
                <option value="" disabled>Select Staff...</option>
                {staff.map(st => <option key={st.id} value={st.id}>{st.name}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] uppercase">Start Date</Label>
              <input type="datetime-local" required value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full h-10 border border-border bg-background px-3 text-sm focus:outline-none focus:border-primary rounded-none" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] uppercase">End Date</Label>
              <input type="datetime-local" required value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full h-10 border border-border bg-background px-3 text-sm focus:outline-none focus:border-primary rounded-none" />
            </div>
          </div>
          <Button type="submit" disabled={isUpdating} className="rounded-none bg-foreground text-background hover:bg-primary font-bold tracking-widest text-xs uppercase px-8">
            Allocate Resource
          </Button>
        </form>
      </div>
    </div>
  );
}
