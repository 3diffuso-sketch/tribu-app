"use client";

import { motion } from "framer-motion";
import { Activity, Users, Calendar, BarChart3 } from "lucide-react";
import { MiniChart } from "@/components/MiniChart";

export default function GuiaEstadisticasPage() {
  const statsCards = [
    { label: "Tasa de Retención", value: "78%", trend: "+5%", positive: true },
    { label: "Engagement", value: "85%", trend: "+12%", positive: true },
    { label: "Eventos / Mes", value: "4.2", trend: "-0.5", positive: false },
  ];

  const topEvents = [
    { name: "Ruta Senderismo Albufera", attendees: 45, rating: 4.9 },
    { name: "Taller Yoga Playa", attendees: 38, rating: 4.8 },
    { name: "Cena Networking", attendees: 25, rating: 4.7 },
  ];

  return (
    <div className="flex flex-col gap-6 px-5">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold text-roots-charcoal flex items-center gap-2 mb-2">
          <BarChart3 className="text-roots-orange" />
          Estadísticas
        </h1>
        <p className="text-sm text-foreground-muted">
          Analiza el rendimiento y crecimiento de tu comunidad.
        </p>
      </motion.div>

      <div className="grid grid-cols-3 gap-3">
        {statsCards.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-3 flex flex-col justify-between"
          >
            <p className="text-[10px] font-semibold text-foreground-muted uppercase">{stat.label}</p>
            <div className="mt-1">
              <span className="text-xl font-display font-bold text-roots-charcoal">{stat.value}</span>
              <span className={`text-[10px] ml-1 font-semibold ${stat.positive ? 'text-roots-green' : 'text-roots-red'}`}>
                {stat.trend}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="glass-card p-5"
      >
        <h3 className="font-semibold text-roots-charcoal mb-4 flex items-center gap-2">
          <Users size={16} className="text-roots-green" /> Crecimiento de Miembros
        </h3>
        <MiniChart type="line" data={[45, 56, 67, 78, 89, 100, 112, 134]} height={80} color="var(--roots-green)" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div 
          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
          className="glass-card p-5"
        >
          <h3 className="font-semibold text-roots-charcoal mb-4 flex items-center gap-2">
            <Calendar size={16} className="text-roots-orange" /> Asistencia a Eventos
          </h3>
          <MiniChart type="bar" data={[18, 12, 22, 8, 16, 30]} labels={["Ene", "Feb", "Mar", "Abr", "May", "Jun"]} height={100} color="var(--roots-orange)" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
          className="glass-card p-5"
        >
          <h3 className="font-semibold text-roots-charcoal mb-4 flex items-center gap-2">
            <Activity size={16} className="text-roots-red" /> Distribución por Interés
          </h3>
          <MiniChart 
            type="donut" 
            data={[40, 30, 20, 10]} 
            labels={["Deportes", "Bienestar", "Social", "Cultura"]} 
            height={100} 
            color="var(--roots-red)" 
          />
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
        className="glass-card p-5"
      >
        <h3 className="font-semibold text-roots-charcoal mb-4">Top 3 Eventos</h3>
        <div className="flex flex-col gap-3">
          {topEvents.map((evt, idx) => (
            <div key={idx} className="flex items-center justify-between border-b border-roots-sand/30 pb-2 last:border-0 last:pb-0">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-roots-cream text-roots-charcoal font-bold text-xs flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="font-medium text-roots-charcoal text-sm">{evt.name}</span>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-roots-green">{evt.attendees} asist.</p>
                <p className="text-[10px] text-foreground-muted">⭐ {evt.rating}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
