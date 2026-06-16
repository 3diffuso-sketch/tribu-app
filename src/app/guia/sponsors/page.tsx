"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Store, MapPin, Users, Calendar as CalendarIcon, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { CalendarView } from "@/components/CalendarView";

const mockSponsors = [
  { id: "s1", name: "La Terraza Valencia", category: "Restaurante/Bar", capacity: 120, address: "Calle de la Paz 45", image: "" },
  { id: "s2", name: "Coworking Ruzafa", category: "Coworking", capacity: 40, address: "Calle Cuba 12", image: "" },
  { id: "s3", name: "Estudio Creativo Norte", category: "Estudio", capacity: 20, address: "Av. Primado Reig 100", image: "" },
  { id: "s4", name: "Parque Deportivo", category: "Deportes", capacity: 200, address: "Cauce del Río", image: "" },
];

export default function GuiaSponsorsPage() {
  const [selectedSponsor, setSelectedSponsor] = useState<string | null>(null);

  // Mock slots for selected sponsor
  const mockSlots = [
    { id: "sl1", date: "2026-06-15", startTime: "10:00", endTime: "20:00", available: true },
    { id: "sl2", date: "2026-06-16", startTime: "10:00", endTime: "20:00", available: true },
    { id: "sl3", date: "2026-06-17", startTime: "00:00", endTime: "00:00", available: false, reservedBy: "other" },
  ];

  return (
    <div className="flex flex-col gap-6 px-5 relative min-h-[calc(100vh-120px)]">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold text-roots-charcoal flex items-center gap-2 mb-2">
          <Store className="text-roots-green" />
          Sponsors Disponibles
        </h1>
        <p className="text-sm text-foreground-muted">
          Encuentra espacios locales para realizar tus próximos eventos.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockSponsors.map((sponsor, i) => (
          <motion.div
            key={sponsor.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-4 flex flex-col"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-roots-charcoal">{sponsor.name}</h3>
                <span className="text-[10px] font-semibold bg-roots-cream border border-roots-sand/50 px-2 py-0.5 rounded text-roots-charcoal">
                  {sponsor.category}
                </span>
              </div>
              <div className="w-12 h-12 bg-roots-sand/50 rounded-lg flex items-center justify-center text-roots-charcoal shrink-0">
                <Store size={20} />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 text-xs text-foreground-muted mb-4">
              <div className="flex items-center gap-1.5"><MapPin size={14} className="text-roots-red" /> {sponsor.address}</div>
              <div className="flex items-center gap-1.5"><Users size={14} className="text-roots-green" /> Capacidad: {sponsor.capacity}</div>
            </div>

            <div className="flex items-center gap-2 mt-auto">
              <button 
                onClick={() => setSelectedSponsor(sponsor.id)}
                className="flex-1 bg-roots-charcoal text-white text-xs font-semibold py-2 rounded-lg flex items-center justify-center gap-1 hover:bg-roots-charcoal/90 transition-colors"
              >
                <CalendarIcon size={14} /> Disponibilidad
              </button>
              <Link 
                href={`/guia/chat?id=${sponsor.id}`}
                className="flex-1 bg-white border border-roots-sand/60 text-roots-charcoal text-xs font-semibold py-2 rounded-lg flex items-center justify-center gap-1 hover:bg-roots-cream transition-colors"
              >
                <MessageCircle size={14} className="text-roots-orange" /> Contactar
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Calendar Modal */}
      <AnimatePresence>
        {selectedSponsor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-roots-charcoal/40 backdrop-blur-sm"
              onClick={() => setSelectedSponsor(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-lg z-10 overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-4 border-b border-roots-sand/30 flex items-center justify-between bg-roots-cream/50">
                <h3 className="font-semibold text-roots-charcoal">Disponibilidad del Espacio</h3>
                <button onClick={() => setSelectedSponsor(null)} className="p-1.5 hover:bg-roots-sand/30 rounded-full text-foreground-muted transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="p-4 overflow-y-auto">
                <CalendarView slots={mockSlots} readonly={true} />
                <div className="mt-4 pt-4 border-t border-roots-sand/30">
                  <Link 
                    href={`/guia/chat?id=${selectedSponsor}`}
                    className="w-full bg-roots-green text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-roots-green/90 transition-colors"
                  >
                    <MessageCircle size={18} /> Solicitar Fecha al Sponsor
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
