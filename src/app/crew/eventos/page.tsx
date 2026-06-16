"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, CheckSquare, Users, ChevronDown, ChevronUp } from "lucide-react";
import { mockEvents } from "@/lib/mock-data";

export default function CrewEventosPage() {
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  
  // Mock attendee lists
  const attendees = [
    { id: "a1", name: "Álex", checkedIn: true },
    { id: "a2", name: "María Gómez", checkedIn: false },
    { id: "a3", name: "Roberto", checkedIn: true },
    { id: "a4", name: "Elena Díaz", checkedIn: false },
  ];

  const assignedEvents = mockEvents.slice(0, 3); // Take first 3 for mock

  return (
    <div className="flex flex-col gap-6 px-5">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold text-roots-charcoal flex items-center gap-2 mb-2">
          <Calendar className="text-roots-orange" />
          Eventos Asignados
        </h1>
        <p className="text-sm text-foreground-muted">
          Gestiona los check-ins de los eventos en los que ayudas.
        </p>
      </motion.div>

      <div className="bg-roots-cream p-4 rounded-xl border border-roots-sand/50 text-sm text-roots-charcoal mb-2">
        <p className="font-medium flex items-center gap-2">
          <CheckSquare size={16} className="text-roots-brown" />
          Nota: No puedes crear ni eliminar eventos.
        </p>
        <p className="text-xs text-foreground-muted mt-1">
          Tu rol como Crew te permite ver la lista de asistentes y realizar el check-in durante el evento.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {assignedEvents.map((evt, i) => (
          <motion.div 
            key={evt.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card overflow-hidden"
          >
            <div 
              className="p-4 flex items-center justify-between cursor-pointer hover:bg-roots-cream/30 transition-colors"
              onClick={() => setExpandedEvent(expandedEvent === evt.id ? null : evt.id)}
            >
              <div>
                <h3 className="font-semibold text-roots-charcoal">{evt.title}</h3>
                <p className="text-xs text-foreground-muted mt-1">{evt.date} • {evt.time}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-roots-sand/30 text-roots-charcoal">
                    {evt.category}
                  </span>
                  <span className="text-[10px] font-medium text-roots-green flex items-center gap-1">
                    <Users size={12} /> {evt.attendees} asistentes
                  </span>
                </div>
              </div>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-roots-cream text-roots-charcoal">
                {expandedEvent === evt.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
            </div>

            <AnimatePresence>
              {expandedEvent === evt.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-roots-sand/50 bg-white/30"
                >
                  <div className="p-4">
                    <h4 className="text-sm font-semibold text-roots-charcoal mb-3 flex items-center justify-between">
                      Lista de Asistentes
                      <span className="text-xs font-normal text-foreground-muted bg-roots-cream px-2 py-0.5 rounded">
                        {attendees.filter(a => a.checkedIn).length} / {attendees.length} Check-ins
                      </span>
                    </h4>
                    <div className="flex flex-col gap-2">
                      {attendees.map(attendee => (
                        <div key={attendee.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-roots-cream/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-roots-sand/50 flex items-center justify-center text-xs font-bold text-roots-charcoal">
                              {attendee.name.charAt(0)}
                            </div>
                            <span className="text-sm font-medium text-roots-charcoal">{attendee.name}</span>
                          </div>
                          <button 
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                              attendee.checkedIn 
                                ? 'bg-roots-green/10 text-roots-green hover:bg-roots-green/20' 
                                : 'bg-roots-sand/30 text-foreground-muted hover:bg-roots-sand/50'
                            }`}
                          >
                            {attendee.checkedIn ? 'Check-in OK' : 'Marcar Check-in'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
