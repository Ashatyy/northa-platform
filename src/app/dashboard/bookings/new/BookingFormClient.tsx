"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type Service = {
  id: string;
  name: string;
  division: string;
  metadataSchema: any;
};

export default function BookingFormClient({ services }: { services: Service[] }) {
  const [selectedServiceId, setSelectedServiceId] = useState<string>("");
  const [formData, setFormData] = useState<Record<string, any>>({});

  const selectedService = services.find(s => s.id === selectedServiceId);
  const schemaProps = selectedService?.metadataSchema?.properties || {};

  const handleInputChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="serviceId" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Target Service</Label>
        <select 
          name="serviceId" 
          id="serviceId"
          required
          value={selectedServiceId}
          onChange={(e) => {
            setSelectedServiceId(e.target.value);
            setFormData({});
          }}
          className="w-full h-12 rounded-none border border-border bg-background px-4 font-sans text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
        >
          <option value="" disabled>Select a division service...</option>
          {services.map(s => (
            <option key={s.id} value={s.id}>
              [{s.division}] {s.name}
            </option>
          ))}
        </select>
      </div>
      
      {selectedServiceId && (
        <div className="space-y-4 border-t border-border pt-6 mt-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-foreground">Service Parameters</h3>
          {Object.entries(schemaProps).map(([key, prop]: [string, any]) => (
            <div key={key} className="space-y-3">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{key}</Label>
              {prop.enum ? (
                <select
                  required
                  defaultValue=""
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  className="w-full h-12 rounded-none border border-border bg-background px-4 font-sans text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select an option...</option>
                  {prop.enum.map((opt: string) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : key.toLowerCase() === 'notes' ? (
                <textarea
                  required
                  placeholder="Additional context or requirements..."
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  className="w-full min-h-[120px] rounded-none border border-border bg-background p-4 font-sans text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              ) : prop.type === 'number' ? (
                <input
                  type="number"
                  required
                  onChange={(e) => handleInputChange(key, Number(e.target.value))}
                  className="w-full h-12 rounded-none border border-border bg-background px-4 font-sans text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              ) : (
                <input
                  type="text"
                  required
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  className="w-full h-12 rounded-none border border-border bg-background px-4 font-sans text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              )}
            </div>
          ))}
          
          {/* Hidden input to pass the compiled JSON to the server action */}
          <input type="hidden" name="metadata" value={JSON.stringify(formData)} />
        </div>
      )}

      <Button 
        type="submit" 
        disabled={!selectedServiceId}
        className="w-full rounded-none tracking-widest uppercase text-sm font-bold h-14 bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        Transmit Request
      </Button>
    </div>
  );
}
