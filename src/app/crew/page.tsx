"use client";

import { motion } from "framer-motion";
import { Shield, Calendar, CheckSquare, ListTodo, ChevronRight } from "lucide-react";
import Link from "next/link";
import { StatsCard } from "@/components/StatsCard";
import { useAuth } from "@/lib/auth-context";

export default function CrewDashboard() {
  const { user } = useAuth();

  const assignedEvents = [
    { id: 1, name: "Ruta Senderismo Albufera", date: "Sáb 20, 09:00", attendees: 45, status: "Próximo" },
    { id: 2, name: "Taller Yoga Playa", date: "Dom 21, 19:00", attendees: 20, status: "Próximo" },
  ];

  const pendingTasks = [
    { id: 1, task: "Confirmar lista de asistentes", event: "Ruta Senderismo Albufera" },
    { id: 2, task: "Moderar comentarios en foro", event: "General" },
  ];

  return (
    <div className="flex flex-col gap-6 px-5">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-display font-bold text-roots-charcoal mb-1">
          Panel de <span className="text-roots-brown">Crew</span>
        </h1>
        <p className="text-sm font-medium text-foreground-muted flex items-center gap-1.5">
          <Shield size={16} className="text-roots-brown" /> Hola, {user.name}
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-3">
        <StatsCard title="Eventos Asignados" value={3} icon={Calendar} color="var(--roots-orange)" delay={0.1} />
        <StatsCard title="Check-ins Hoy" value={12} trend={20} icon={CheckSquare} color="var(--roots-green)" delay={0.2} />
        <StatsCard title="Tareas Pendientes" value={2} icon={ListTodo} color="var(--roots-red)" delay={0.3} />
        <StatsCard title="Comunidades" value={1} icon={Shield} color="var(--roots-brown)" delay={0.4} />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-roots-charcoal">Eventos Asignados</h3>
          <Link href="/crew/eventos" className="text-xs font-medium text-roots-brown hover:underline">Ver todos</Link>
        </div>
        <div className="flex flex-col gap-3">
          {assignedEvents.map((evt) => (
            <Link key={evt.id} href={`/crew/eventos`} className="glass-card p-4 flex items-center justify-between hover:bg-roots-cream/50 transition-colors">
              <div>
                <p className="font-medium text-roots-charcoal text-sm">{evt.name}</p>
                <p className="text-[10px] text-foreground-muted">{evt.date} • {evt.attendees} asistentes</p>
              </div>
              <ChevronRight size={18} className="text-roots-sand" />
            </Link>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <h3 className="font-semibold text-roots-charcoal mb-3">Tareas Pendientes</h3>
        <div className="flex flex-col gap-2">
          {pendingTasks.map((task) => (
            <div key={task.id} className="glass-card p-3 flex items-start gap-3">
              <input type="checkbox" className="mt-1 w-4 h-4 rounded border-roots-sand text-roots-brown focus:ring-roots-brown/30" />
              <div>
                <p className="text-sm font-medium text-roots-charcoal leading-tight">{task.task}</p>
                <p className="text-[10px] text-foreground-muted mt-0.5">{task.event}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
