"use client";

import { useState } from "react";
import { updateBookingStatus } from "./actions";

export default function ClientCancelButton({ bookingId }: { bookingId: string }) {
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancel = async () => {
    if (confirm("Are you sure you want to cancel this request? This action cannot be undone.")) {
      setIsCancelling(true);
      await updateBookingStatus(bookingId, "CANCELLED");
      setIsCancelling(false);
    }
  };

  return (
    <button
      onClick={handleCancel}
      disabled={isCancelling}
      className="inline-flex items-center justify-center h-10 px-6 font-bold text-xs uppercase tracking-widest bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive hover:text-destructive-foreground transition-colors disabled:opacity-50"
    >
      {isCancelling ? "Cancelling..." : "Cancel Request"}
    </button>
  );
}
