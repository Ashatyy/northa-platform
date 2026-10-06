"use client";

import { useState } from "react";
import { Bell, X } from "lucide-react";
import { markAsRead } from "@/app/dashboard/actions";

type Notification = {
  id: string;
  title: string;
  message: string;
  createdAt: Date;
};

export default function NotificationBell({ initialNotifications }: { initialNotifications: Notification[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleDismiss = async (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    await markAsRead(id);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="relative p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
      >
        <Bell className="w-5 h-5" />
        {notifications.length > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
        )}
      </button>

      {isOpen && (
        <div className="absolute top-12 left-0 w-72 bg-card border border-border shadow-lg rounded-xl z-50 p-4">
          <h4 className="font-bold text-xs uppercase tracking-widest text-muted-foreground mb-4">Alerts</h4>
          {notifications.length === 0 ? (
            <p className="text-xs text-muted-foreground">No new alerts.</p>
          ) : (
            <div className="space-y-3">
              {notifications.map(n => (
                <div key={n.id} className="relative p-3 border border-border bg-background rounded-lg text-xs">
                  <button 
                    onClick={() => handleDismiss(n.id)}
                    className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <p className="font-bold mb-1 pr-4">{n.title}</p>
                  <p className="text-muted-foreground">{n.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
