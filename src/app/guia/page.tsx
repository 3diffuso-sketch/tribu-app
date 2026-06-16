"use client";

import { motion } from "framer-motion";
import { Users, UserPlus, Calendar, Activity, ChevronRight } from "lucide-react";
import Link from "next/link";
import { StatsCard } from "@/components/StatsCard";
import { MiniChart } from "@/components/MiniChart";
import { useAuth } from "@/lib/auth-context";
import { mockEvents } from "@/lib/mock-data";

export default function GuiaDashboard() {
  const { user } = useAuth();
  
  const activeCrew = [
    { id: 1, name: "Ana Martínez", events: 3, avatar: "/images/avatars/ana.jpg" },
    { id: 2, name: "Luis Pérez", events: 1, avatar: "" },
  ];

  return (
    <div className="flex flex-col gap-6 px-5">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-display font-bold text-roots-charcoal mb-1">
          Panel de <span className="text-roots-green">Guía</span>
        </h1>
        <p className="text-sm font-medium text-foreground-muted flex items-center gap-1.5">
          Hola, {user.name}
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-3">
        <StatsCard title="Miembros" value={134} trend={12} icon={Users} color="var(--roots-green)" delay={0.1} />
        <StatsCard title="Nuevos (Mes)" value={12} trend={5} icon={UserPlus} color="var(--roots-orange)" delay={0.2} />
        <StatsCard title="Eventos Creados" value={15} icon={Calendar} color="var(--roots-red)" delay={0.3} />
        <StatsCard title="Asistencia Prom." value="85%" icon={Activity} color="var(--roots-brown)" delay={0.4} />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="glass-card p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-roots-charcoal">Crecimiento Mensual</h3>
          <Link href="/guia/estadisticas" className="text-xs font-medium text-roots-green hover:underline">Ver reporte</Link>
        </div>
        <MiniChart type="line" data={[45, 56, 67, 78, 89, 100, 112, 134]} height={80} color="var(--roots-green)" />
      </motion.div>

      {/* Próximos Eventos */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-roots-charcoal">Próximos Eventos</h3>
          <Link href="/guia/eventos" className="text-xs font-medium text-roots-green hover:underline">Ver todos</Link>
        </div>
        <div className="flex flex-col gap-3">
          {mockEvents.slice(0, 3).map((evt) => (
            <div key={evt.id} className="glass-card p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-roots-charcoal text-sm">{evt.title}</p>
                <p className="text-[10px] text-foreground-muted">{evt.date} • {evt.time}</p>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded text-[10px] font-semibold ${evt.status === 'active' ? 'bg-roots-green/10 text-roots-green' : 'bg-roots-sand text-foreground-muted'}`}>
                  {evt.status || 'Activo'}
                </span>
                <p className="text-[10px] text-foreground-muted mt-1">{evt.attendees}/{evt.maxAttendees} asist.</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Crew Activo */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-roots-charcoal">Tu Crew Activo</h3>
          <Link href="/guia/comunidad" className="text-xs font-medium text-roots-green hover:underline">Gestionar</Link>
        </div>
        <div className="glass-card overflow-hidden">
          {activeCrew.map((member, idx) => (
            <div key={member.id} className={`flex items-center justify-between p-4 ${idx !== activeCrew.length - 1 ? 'border-b border-roots-sand/30' : ''}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-roots-sand/50 overflow-hidden shrink-0 flex items-center justify-center text-roots-charcoal font-bold">
                  {member.avatar ? <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" /> : member.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-roots-charcoal text-sm">{member.name}</p>
                  <p className="text-[10px] text-roots-brown font-medium">Crew</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-roots-charcoal">{member.events} eventos</p>
                <p className="text-[10px] text-foreground-muted">asignados</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
