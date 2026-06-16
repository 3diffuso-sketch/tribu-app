"use client";

import { motion } from "framer-motion";
import { Shield, AlertTriangle, UserX, MessageSquare, Eye } from "lucide-react";

export default function AdminModeracionPage() {
  const reports = [
    {
      id: 1,
      reporter: "María G.",
      reported: "Juan_88",
      reason: "Spam en chat de comunidad",
      content: "Hola, invierte en crypto conmigo entra a este link...",
      type: "spam",
      time: "Hace 2 horas",
      status: "pending"
    },
    {
      id: 2,
      reporter: "Carlos N.",
      reported: "Pedro S.",
      reason: "Comportamiento inapropiado en evento",
      content: "El usuario fue agresivo con el guía durante la ruta.",
      type: "conducta",
      time: "Hace 5 horas",
      status: "pending"
    },
    {
      id: 3,
      reporter: "Sistema",
      reported: "Evento 'Fiesta VIP'",
      reason: "Posible contenido fraudulento",
      content: "El evento solicita pagos externos no autorizados.",
      type: "fraude",
      time: "Ayer",
      status: "pending"
    }
  ];

  const typeStyles: Record<string, string> = {
    spam: "bg-roots-orange/10 text-roots-orange border-roots-orange/20",
    conducta: "bg-roots-red/10 text-roots-red border-roots-red/20",
    fraude: "bg-roots-charcoal/10 text-roots-charcoal border-roots-charcoal/20",
  };

  return (
    <div className="flex flex-col gap-6 px-5">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-display font-bold text-roots-charcoal flex items-center gap-2">
            <Shield className="text-roots-charcoal" />
            Moderación
          </h1>
          <span className="flex items-center justify-center bg-roots-red text-white text-xs font-bold w-6 h-6 rounded-full">
            {reports.length}
          </span>
        </div>
        <p className="text-sm text-foreground-muted">
          Revisa y resuelve reportes de usuarios y eventos.
        </p>
      </motion.div>

      <div className="flex flex-col gap-4">
        {reports.map((report, idx) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (idx + 1) }}
            className="glass-card p-5 relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle size={16} className={report.type === 'conducta' ? 'text-roots-red' : 'text-roots-orange'} />
                <span className="font-semibold text-roots-charcoal text-sm">{report.reason}</span>
              </div>
              <span className="text-[10px] text-foreground-muted">{report.time}</span>
            </div>

            <div className="bg-white/50 border border-roots-sand/50 rounded-lg p-3 mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-foreground-muted">
                  Reportado por: <span className="font-medium text-roots-charcoal">{report.reporter}</span>
                </p>
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase border ${typeStyles[report.type]}`}>
                  {report.type}
                </span>
              </div>
              <p className="text-xs text-foreground-muted">
                Implicado: <span className="font-medium text-roots-charcoal">{report.reported}</span>
              </p>
              <div className="mt-2 bg-roots-cream p-2 rounded text-sm text-roots-charcoal border-l-2 border-roots-charcoal/30">
                "{report.content}"
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-roots-sand/30 pt-3">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-foreground-muted hover:bg-roots-sand/30 transition-colors">
                <Eye size={14} /> Investigar
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-roots-green bg-roots-green/10 hover:bg-roots-green/20 transition-colors">
                <MessageSquare size={14} /> Ignorar
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-roots-red bg-roots-red/10 hover:bg-roots-red/20 transition-colors">
                <UserX size={14} /> Suspender
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
