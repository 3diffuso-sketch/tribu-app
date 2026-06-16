"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon } from "lucide-react";
import { CalendarView } from "@/components/CalendarView";
import type { DisponibilidadSlot } from "@/lib/types";

// Mock slots
const initialSlots: DisponibilidadSlot[] = [
  { id: "s1", date: "2026-06-05", startTime: "10:00", endTime: "22:00", available: true },
  { id: "s2", date: "2026-06-10", startTime: "16:00", endTime: "20:00", available: false, reservedBy: "user-guia", eventName: "Taller de Bienestar" },
  { id: "s3", date: "2026-06-12", startTime: "10:00", endTime: "22:00", available: true },
  { id: "s4", date: "2026-06-15", startTime: "18:00", endTime: "23:00", available: false, reservedBy: "user-123", eventName: "Cena Networking" },
  { id: "s5", date: "2026-06-20", startTime: "00:00", endTime: "00:00", available: false }, // Blocked entirely
];

export default function SponsorCalendarioPage() {
  const [slots, setSlots] = useState<DisponibilidadSlot[]>(initialSlots);

  const handleToggleAvailability = (dateStr: string) => {
    setSlots(prev => {
      const existing = prev.find(s => s.date === dateStr);
      if (existing) {
        if (existing.reservedBy) return prev; // Cannot toggle if reserved
        // Toggle available <-> blocked
        return prev.map(s => s.date === dateStr ? { ...s, available: !s.available } : s);
      } else {
        // Create new available slot
        return [...prev, { id: `new-${Date.now()}`, date: dateStr, startTime: "10:00", endTime: "22:00", available: true }];
      }
    });
  };

  return (
    <div className="flex flex-col gap-6 px-5">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold text-roots-charcoal flex items-center gap-2 mb-2">
          <CalendarIcon className="text-roots-green" />
          Calendario de Disponibilidad
        </h1>
        <p className="text-sm text-foreground-muted">
          Gestiona qué días ofreces tu espacio a las comunidades.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <CalendarView 
          slots={slots} 
          onToggleAvailability={handleToggleAvailability}
        />
      </motion.div>
      
      <div className="bg-roots-cream p-4 rounded-xl border border-roots-sand/50">
        <h3 className="text-sm font-semibold text-roots-charcoal mb-2">¿Cómo funciona?</h3>
        <ul className="text-xs text-foreground-muted space-y-2 list-disc list-inside">
          <li>Marca días en verde para indicar a los Guías que tu espacio está disponible para eventos.</li>
          <li>Los días bloqueados (rojo) no aparecerán en las búsquedas.</li>
          <li>Las reservas confirmadas (naranja) son inmutables desde esta vista.</li>
        </ul>
      </div>
    </div>
  );
}
