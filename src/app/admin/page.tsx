"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Users, Compass, Calendar, Store, Activity, AlertTriangle, TrendingUp, Filter, CheckCircle, XCircle } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { MiniChart } from "@/components/MiniChart";
import { mockAdminRequests, mockRevenueData } from "@/lib/mock-data";

export default function AdminDashboard() {
  const [dateFilter, setDateFilter] = useState("este-mes");
  const growthData = [20, 35, 45, 60, 78, 95, 120, 156];
  const revenueValues = mockRevenueData.map(d => d.amount);

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

      <div className="flex items-center justify-between bg-roots-cream/50 p-3 rounded-xl border border-roots-sand/40">
        <span className="text-sm font-semibold text-roots-charcoal flex items-center gap-2">
          <Filter size={16} className="text-roots-orange" />
          Filtro de Fecha
        </span>
        <select 
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="bg-white border border-roots-sand rounded-lg py-1.5 px-3 text-sm focus:outline-none focus:border-roots-green"
        >
          <option value="hoy">Hoy</option>
          <option value="esta-semana">Esta Semana</option>
          <option value="este-mes">Este Mes</option>
          <option value="este-ano">Este Año</option>
          <option value="historico">Histórico</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StatsCard title="Usuarios" value={156} trend={12} icon={Users} color="var(--roots-red)" delay={0.1} />
        <StatsCard title="Comunidades" value={4} trend={5} icon={Compass} color="var(--roots-green)" delay={0.2} />
        <StatsCard title="Eventos (Mes)" value={12} trend={20} icon={Calendar} color="var(--roots-orange)" delay={0.3} />
        <StatsCard title="Sponsors" value={8} trend={15} icon={Store} color="var(--roots-brown)" delay={0.4} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-5"
        >
          <h3 className="font-semibold text-roots-charcoal mb-4 flex items-center gap-2">
            <Activity size={18} className="text-roots-red" />
            Crecimiento de Usuarios
          </h3>
          <MiniChart type="line" data={growthData} height={80} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="glass-card p-5"
        >
          <h3 className="font-semibold text-roots-charcoal mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-roots-green" />
            Métricas de Revenue (EUR)
          </h3>
          <MiniChart type="bar" data={revenueValues} labels={mockRevenueData.map(d => d.month)} color="var(--roots-green)" height={80} />
        </motion.div>
      </div>

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

        {/* Peticiones de Creación */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="glass-card p-5 border-l-4 border-l-roots-green md:col-span-2"
        >
          <h3 className="font-semibold text-roots-charcoal mb-4 flex items-center gap-2">
            <Compass size={18} className="text-roots-green" />
            Peticiones de Creación
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {mockAdminRequests.map(req => (
              <div key={req.id} className="bg-roots-cream p-3 rounded-lg border border-roots-sand/50 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold uppercase text-roots-green bg-roots-green/10 px-2 py-0.5 rounded">
                      {req.type === 'community_creation' ? 'Comunidad' : 'Guía'}
                    </span>
                    <span className="text-[10px] text-foreground-muted">{req.date}</span>
                  </div>
                  <p className="text-sm font-medium text-roots-charcoal">{req.details}</p>
                  <p className="text-xs text-foreground-muted mt-1">Por: {req.requestedBy}</p>
                </div>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => alert(`Aprobada: ${req.details}`)} className="flex items-center justify-center gap-1 flex-1 py-1.5 rounded bg-roots-green/10 text-roots-green font-semibold text-xs hover:bg-roots-green/20">
                    <CheckCircle size={14} /> Aprobar
                  </button>
                  <button onClick={() => alert(`Rechazada: ${req.details}`)} className="flex items-center justify-center gap-1 flex-1 py-1.5 rounded bg-roots-red/10 text-roots-red font-semibold text-xs hover:bg-roots-red/20">
                    <XCircle size={14} /> Rechazar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
