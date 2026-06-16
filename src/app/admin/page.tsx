"use client";

import { motion } from "framer-motion";
import { Users, Compass, Calendar, Store, Activity, AlertTriangle } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { MiniChart } from "@/components/MiniChart";

export default function AdminDashboard() {
  const growthData = [20, 35, 45, 60, 78, 95, 120, 156];

  const recentActivity = [
    { id: 1, action: "Nuevo usuario registrado", user: "Laura M.", time: "Hace 10 min", type: "user" },
    { id: 2, action: "Comunidad creada", user: "Carlos N. (Guía)", time: "Hace 2 horas", type: "community" },
    { id: 3, action: "Sponsor verificado", user: "La Terraza Valencia", time: "Hace 5 horas", type: "sponsor" },
    { id: 4, action: "Evento completado", user: "Ruta Senderismo", time: "Ayer", type: "event" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col gap-6 px-5">
      <motion.div initial="hidden" animate="visible" variants={containerVariants}>
        <motion.h1 variants={itemVariants} className="text-3xl font-display font-bold mb-1">
          <span className="gradient-text bg-gradient-to-r from-roots-red to-roots-orange">Panel de Administración</span>
        </motion.h1>
        <motion.p variants={itemVariants} className="text-foreground-muted mb-6">
          Visión general de la plataforma TribU.
        </motion.p>
      </motion.div>

      <div className="grid grid-cols-2 gap-3">
        <StatsCard title="Usuarios" value={156} trend={12} icon={Users} color="var(--roots-red)" delay={0.1} />
        <StatsCard title="Comunidades" value={4} trend={5} icon={Compass} color="var(--roots-green)" delay={0.2} />
        <StatsCard title="Eventos (Mes)" value={12} trend={20} icon={Calendar} color="var(--roots-orange)" delay={0.3} />
        <StatsCard title="Sponsors" value={8} trend={15} icon={Store} color="var(--roots-brown)" delay={0.4} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-5 mt-2"
      >
        <h3 className="font-semibold text-roots-charcoal mb-4 flex items-center gap-2">
          <Activity size={18} className="text-roots-red" />
          Crecimiento de Usuarios
        </h3>
        <MiniChart type="line" data={growthData} height={80} />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        {/* Actividad Reciente */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card p-5"
        >
          <h3 className="font-semibold text-roots-charcoal mb-4">Actividad Reciente</h3>
          <div className="flex flex-col gap-4">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex items-start justify-between border-b border-roots-sand/30 pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-roots-charcoal">{item.action}</p>
                  <p className="text-xs text-foreground-muted">{item.user}</p>
                </div>
                <span className="text-[10px] text-foreground-muted">{item.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Alertas */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-card p-5 border-l-4 border-l-roots-orange"
        >
          <h3 className="font-semibold text-roots-charcoal mb-4 flex items-center gap-2">
            <AlertTriangle size={18} className="text-roots-orange" />
            Alertas Pendientes
          </h3>
          <div className="flex flex-col gap-3">
            <div className="bg-roots-cream p-3 rounded-lg border border-roots-sand/50">
              <p className="text-sm font-medium text-roots-charcoal">Reporte de usuario</p>
              <p className="text-xs text-foreground-muted mt-1">Usuario "Juan_88" reportado por spam en comunidad Yoga.</p>
              <button className="mt-2 text-xs font-semibold text-roots-red hover:underline">Revisar</button>
            </div>
            <div className="bg-roots-cream p-3 rounded-lg border border-roots-sand/50">
              <p className="text-sm font-medium text-roots-charcoal">Solicitud Sponsor</p>
              <p className="text-xs text-foreground-muted mt-1">Nuevo negocio "Café Central" requiere verificación.</p>
              <button className="mt-2 text-xs font-semibold text-roots-green hover:underline">Aprobar</button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
