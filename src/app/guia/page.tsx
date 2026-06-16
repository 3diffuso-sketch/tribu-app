"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, UserPlus, Calendar, Activity, ChevronDown } from "lucide-react";
import Link from "next/link";
import { StatsCard } from "@/components/StatsCard";
import { MiniChart } from "@/components/MiniChart";
import { useAuth } from "@/lib/auth-context";
import { mockEvents, mockCommunities } from "@/lib/mock-data";

export default function GuiaDashboard() {
  const { user } = useAuth();
  
  // Assume the guide owns the first 3 communities
  const guideCommunities = mockCommunities.slice(0, 3);
  
  const [selectedCommunityId, setSelectedCommunityId] = useState(guideCommunities[0]?.id);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const selectedCommunity = guideCommunities.find(c => c.id === selectedCommunityId) || guideCommunities[0];
  
  // Fake dynamic data based on selected community
  const kpis = {
    "com-1": { members: 134, newMembers: 12, eventsCreated: 15, avgAttendance: "85%", growth: [45, 56, 67, 78, 89, 100, 112, 134] },
    "com-2": { members: 89, newMembers: 5, eventsCreated: 8, avgAttendance: "92%", growth: [20, 30, 45, 50, 60, 75, 80, 89] },
    "com-3": { members: 56, newMembers: 22, eventsCreated: 4, avgAttendance: "70%", growth: [5, 10, 15, 25, 30, 40, 50, 56] }
  };
  
  const currentKpi = kpis[selectedCommunity.id as keyof typeof kpis] || kpis["com-1"];
  
  const activeCrew = [
    { id: 1, name: "Ana Martínez", events: 3, avatar: "/images/avatars/ana.jpg" },
    { id: 2, name: "Luis Pérez", events: 1, avatar: "" },
  ];

  // Filter events by community
  const communityEvents = mockEvents.filter(e => e.communityId === selectedCommunity.id).slice(0, 3);

  return (
    <div className="flex flex-col gap-6 px-5 pb-10">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-2">
        <h1 className="text-3xl font-display font-bold text-roots-charcoal mb-1">
          Panel de <span className="text-roots-green">Guía</span>
        </h1>
        <p className="text-sm font-medium text-foreground-muted flex items-center gap-1.5">
          Hola, {user.name}
        </p>

        {/* Community Selector */}
        <div className="relative mt-2">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full bg-white border border-roots-sand/60 rounded-xl p-3 flex items-center justify-between shadow-sm focus:outline-none focus:ring-2 focus:ring-roots-green/20"
          >
            <div className="flex items-center gap-3 text-left">
              <div className="w-8 h-8 bg-roots-green/10 rounded-lg flex items-center justify-center text-roots-green">
                <Users size={16} />
              </div>
              <div>
                <p className="text-xs text-foreground-muted font-medium">Comunidad Activa</p>
                <p className="text-sm font-semibold text-roots-charcoal">{selectedCommunity?.name}</p>
              </div>
            </div>
            <ChevronDown size={18} className={`text-foreground-muted transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white border border-roots-sand/60 rounded-xl shadow-lg z-10 overflow-hidden"
              >
                {guideCommunities.map(c => (
                  <button
                    key={c.id}
                    onClick={() => { setSelectedCommunityId(c.id); setIsDropdownOpen(false); }}
                    className={`w-full text-left p-3 text-sm font-medium transition-colors ${selectedCommunityId === c.id ? 'bg-roots-green/10 text-roots-green' : 'text-roots-charcoal hover:bg-roots-sand/30'}`}
                  >
                    {c.name}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div
        key={`kpis-${selectedCommunity.id}`}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-2 gap-3"
      >
        <StatsCard title="Miembros" value={currentKpi.members} trend={currentKpi.newMembers} icon={Users} color="var(--roots-green)" delay={0.1} />
        <StatsCard title="Nuevos (Mes)" value={currentKpi.newMembers} trend={5} icon={UserPlus} color="var(--roots-orange)" delay={0.2} />
        <StatsCard title="Eventos Creados" value={currentKpi.eventsCreated} icon={Calendar} color="var(--roots-red)" delay={0.3} />
        <StatsCard title="Asistencia Prom." value={currentKpi.avgAttendance} icon={Activity} color="var(--roots-brown)" delay={0.4} />
      </motion.div>

      <motion.div 
        key={`chart-${selectedCommunity.id}`}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="glass-card p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-roots-charcoal">Crecimiento Mensual</h3>
          <Link href="/guia/estadisticas" className="text-xs font-medium text-roots-green hover:underline">Ver reporte</Link>
        </div>
        <MiniChart type="line" data={currentKpi.growth} height={80} color="var(--roots-green)" />
      </motion.div>

      {/* Subgroups summary */}
      {selectedCommunity.subgroups && selectedCommunity.subgroups.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h3 className="font-semibold text-roots-charcoal mb-3">Subgrupos Activos</h3>
          <div className="flex flex-wrap gap-2">
            {selectedCommunity.subgroups.map(sub => (
              <span key={sub.id} className="bg-white border border-roots-sand/60 px-3 py-1.5 rounded-full text-xs font-medium text-roots-charcoal shadow-sm">
                {sub.name}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Próximos Eventos */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-roots-charcoal">Próximos Eventos</h3>
          <Link href="/guia/eventos" className="text-xs font-medium text-roots-green hover:underline">Ver todos</Link>
        </div>
        <div className="flex flex-col gap-3">
          {communityEvents.length > 0 ? communityEvents.map((evt) => (
            <div key={evt.id} className="glass-card p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-roots-charcoal text-sm">{evt.title}</p>
                <p className="text-[10px] text-foreground-muted">
                  {new Date(evt.date).toLocaleDateString("es-ES", { day: 'numeric', month: 'short' })} • {evt.time}
                </p>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded text-[10px] font-semibold ${evt.status === 'active' ? 'bg-roots-green/10 text-roots-green' : 'bg-roots-sand text-foreground-muted'}`}>
                  {evt.status || 'Activo'}
                </span>
                <p className="text-[10px] text-foreground-muted mt-1">{evt.attendees}/{evt.maxAttendees} asist.</p>
              </div>
            </div>
          )) : (
            <p className="text-sm text-foreground-muted text-center py-4 bg-white border border-roots-sand/30 rounded-xl">No hay eventos próximos en esta comunidad.</p>
          )}
        </div>
      </motion.div>

      {/* Crew Activo */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
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
