"use client";

import { motion } from "framer-motion";
import { Calendar, MoreVertical } from "lucide-react";
import { DataTable } from "@/components/DataTable";
import { mockEvents } from "@/lib/mock-data";

export default function AdminEventosPage() {
  const columns = [
    {
      key: "title",
      label: "Evento",
      render: (val: string, row: any) => (
        <div className="flex flex-col">
          <span className="font-medium text-roots-charcoal">{val}</span>
          <span className="text-[10px] text-foreground-muted">{row.date} • {row.time}</span>
        </div>
      )
    },
    {
      key: "organizer",
      label: "Guía / Creador",
      render: (val: any) => (
        <div className="flex items-center gap-2">
          {val?.avatar ? (
            <img src={val.avatar} alt={val.name} className="w-6 h-6 rounded-full object-cover" />
          ) : (
            <div className="w-6 h-6 rounded-full bg-roots-sand/50" />
          )}
          <span className="text-xs">{val?.name || 'Desconocido'}</span>
        </div>
      )
    },
    {
      key: "attendees",
      label: "Asistentes",
      render: (val: number, row: any) => (
        <span className="text-xs">{val} / {row.maxAttendees}</span>
      )
    },
    {
      key: "status",
      label: "Estado",
      render: (val: string) => {
        let statusClass = "bg-gray-100 text-gray-600 border-gray-200";
        let text = val || "Activo";
        
        if (text.toLowerCase() === "activo" || !val) {
          statusClass = "bg-roots-green/10 text-roots-green border-roots-green/20";
          text = "Activo";
        } else if (text.toLowerCase() === "cancelado") {
          statusClass = "bg-roots-red/10 text-roots-red border-roots-red/20";
        } else if (text.toLowerCase() === "completado") {
          statusClass = "bg-roots-orange/10 text-roots-orange border-roots-orange/20";
        }

        return (
          <span className={`px-2 py-1 rounded-md text-[10px] font-semibold border ${statusClass}`}>
            {text}
          </span>
        );
      }
    }
  ];

  return (
    <div className="flex flex-col gap-6 px-5">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold text-roots-charcoal mb-2 flex items-center gap-2">
          <Calendar className="text-roots-orange" />
          Gestión de Eventos
        </h1>
        <p className="text-sm text-foreground-muted">
          Revisa todos los eventos programados en la plataforma.
        </p>
      </motion.div>

      {/* Summary Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-3"
      >
        <div className="glass-card p-3 text-center">
          <p className="text-[10px] uppercase font-semibold text-foreground-muted">Total</p>
          <p className="text-2xl font-display font-bold text-roots-charcoal">{mockEvents.length}</p>
        </div>
        <div className="glass-card p-3 text-center">
          <p className="text-[10px] uppercase font-semibold text-foreground-muted">Activos</p>
          <p className="text-2xl font-display font-bold text-roots-green">{mockEvents.length}</p>
        </div>
        <div className="glass-card p-3 text-center opacity-50">
          <p className="text-[10px] uppercase font-semibold text-foreground-muted">Cancelados</p>
          <p className="text-2xl font-display font-bold text-roots-red">0</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <DataTable
          columns={columns}
          data={mockEvents}
          searchable={true}
          searchPlaceholder="Buscar evento..."
          actions={(row) => (
            <button className="p-1.5 rounded-md hover:bg-roots-sand/30 text-foreground-muted transition-colors">
              <MoreVertical size={16} />
            </button>
          )}
        />
      </motion.div>
    </div>
  );
}
