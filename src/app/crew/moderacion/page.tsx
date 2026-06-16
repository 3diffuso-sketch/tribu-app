"use client";

import { motion } from "framer-motion";
import { Shield, AlertTriangle, UserX, Clock, History } from "lucide-react";

export default function CrewModeracionPage() {
  const reports = [
    {
      id: 1,
      reporter: "Álex",
      content: "Mensaje inapropiado en el foro del evento",
      type: "conducta",
      time: "Hace 1 hora"
    },
    {
      id: 2,
      reporter: "María G.",
      content: "Spam en comentarios",
      type: "spam",
      time: "Ayer"
    }
  ];

  const mutedUsers = [
    { id: "u2", name: "Pedro S.", reason: "Spam repetitivo", duration: "24h", timeRemaining: "12h" }
  ];

  const log = [
    { action: "Comentario eliminado", user: "Ana M.", time: "Hoy, 10:30" },
    { action: "Usuario silenciado (2h)", user: "User123", time: "Ayer, 18:00" },
    { action: "Check-in masivo evento #45", user: "-", time: "Hace 2 días" },
  ];

  return (
    <div className="flex flex-col gap-6 px-5">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold text-roots-charcoal flex items-center gap-2 mb-2">
          <Shield className="text-roots-brown" />
          Herramientas de Moderación
        </h1>
        <p className="text-sm text-foreground-muted">
          Ayuda a mantener un ambiente seguro en la comunidad.
        </p>
      </motion.div>

      <div className="bg-roots-cream p-4 rounded-xl border border-roots-sand/50 text-sm text-roots-charcoal mb-2">
        <p className="font-medium text-roots-brown mb-1">Tu alcance como Crew:</p>
        <p className="text-xs text-foreground-muted">
          Puedes silenciar usuarios temporalmente y eliminar mensajes. Para expulsiones definitivas o baneos, contacta al Guía de la comunidad.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h2 className="font-semibold text-roots-charcoal mb-3 flex items-center gap-2">
            <AlertTriangle size={18} className="text-roots-orange" />
            Reportes Recientes ({reports.length})
          </h2>
          <div className="flex flex-col gap-3">
            {reports.map((report) => (
              <div key={report.id} className="glass-card p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                    report.type === 'spam' ? 'bg-roots-orange/10 text-roots-orange' : 'bg-roots-red/10 text-roots-red'
                  }`}>
                    {report.type}
                  </span>
                  <span className="text-[10px] text-foreground-muted">{report.time}</span>
                </div>
                <p className="text-sm text-roots-charcoal font-medium mb-1">"{report.content}"</p>
                <p className="text-xs text-foreground-muted mb-3">Reportado por: {report.reporter}</p>
                <div className="flex justify-end gap-2">
                  <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-roots-sand/30 text-foreground-muted hover:bg-roots-sand/50 transition-colors">
                    Ignorar
                  </button>
                  <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-roots-brown/10 text-roots-brown hover:bg-roots-brown/20 transition-colors">
                    Silenciar (24h)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="font-semibold text-roots-charcoal mb-3 flex items-center gap-2">
            <UserX size={18} className="text-roots-red" />
            Usuarios Silenciados
          </h2>
          <div className="glass-card overflow-hidden">
            {mutedUsers.map(u => (
              <div key={u.id} className="p-4 flex items-center justify-between border-b border-roots-sand/30 last:border-0">
                <div>
                  <p className="font-medium text-roots-charcoal text-sm">{u.name}</p>
                  <p className="text-[10px] text-foreground-muted mt-0.5">Motivo: {u.reason}</p>
                </div>
                <div className="text-right">
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-roots-orange mb-1">
                    <Clock size={10} /> {u.timeRemaining} restantes
                  </span>
                  <button className="text-xs font-medium text-roots-green hover:underline">Reactivar</button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="font-semibold text-roots-charcoal mb-3 flex items-center gap-2">
            <History size={18} className="text-roots-charcoal" />
            Registro de Actividad
          </h2>
          <div className="glass-card p-4">
            <div className="flex flex-col gap-3">
              {log.map((item, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <div>
                    <p className="font-medium text-roots-charcoal">{item.action}</p>
                    <p className="text-[10px] text-foreground-muted">Por ti {item.user !== '-' ? `(sobre ${item.user})` : ''}</p>
                  </div>
                  <span className="text-[10px] text-foreground-muted">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
