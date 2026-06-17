"use client";

import { motion } from "framer-motion";
import { Store, Calendar, MessageCircle, Star, Edit, ChevronRight } from "lucide-react";
import Link from "next/link";
import { StatsCard } from "@/components/StatsCard";
import { useAuth } from "@/lib/auth-context";

export default function SponsorDashboard() {
  const { user } = useAuth();
  
  const upcomingEvents = [
    { id: 1, name: "Clase de Yoga Sunset", community: "Yoga & Relax", attendees: 15, date: "Hoy, 19:00" },
    { id: 2, content: "Cata de Vinos Locales", community: "Gastrónomos", attendees: 20, date: "Jue 18, 20:00" },
  ];

  const recentMessages = [
    { id: 1, sender: "Carlos Navarro", community: "Deportes Extremos", unread: 2, time: "Hace 10 min" },
    { id: 2, sender: "Laura M.", community: "Arte y Pintura", unread: 0, time: "Ayer" },
  ];

  return (
    <div className="flex flex-col gap-6 px-5">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h1 className="text-3xl font-display font-bold text-roots-charcoal mb-1">
          Hola, <span className="text-roots-orange">{user.name.split(' ')[0]}</span>
        </h1>
        <p className="text-sm font-medium text-roots-charcoal flex justify-center items-center gap-1.5">
          <Store size={16} className="text-roots-orange" /> La Terraza Valencia
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-3">
        <StatsCard title="Solicitudes" value={3} icon={Store} color="var(--roots-orange)" delay={0.1} />
        <StatsCard title="Eventos (Mes)" value={2} trend={50} icon={Calendar} color="var(--roots-green)" delay={0.2} />
        <StatsCard title="Mensajes" value={5} icon={MessageCircle} color="var(--roots-red)" delay={0.3} />
        <StatsCard title="Valoración" value="4.8" subtitle="de 5.0" icon={Star} color="var(--roots-brown)" delay={0.4} />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="flex gap-2"
      >
        <Link href="/sponsor/calendario" className="flex-1 bg-roots-charcoal text-white rounded-xl py-3 px-4 flex flex-col items-center justify-center gap-1 hover:bg-roots-charcoal/90 transition-colors">
          <Calendar size={20} />
          <span className="text-xs font-semibold">Mi Calendario</span>
        </Link>
        <Link href="/sponsor/perfil-negocio" className="flex-1 bg-white border border-roots-sand/50 text-roots-charcoal rounded-xl py-3 px-4 flex flex-col items-center justify-center gap-1 hover:bg-roots-cream transition-colors">
          <Edit size={20} className="text-roots-orange" />
          <span className="text-xs font-semibold">Editar Perfil</span>
        </Link>
      </motion.div>

      {/* Próximos Eventos */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-roots-charcoal">Próximos Eventos</h3>
          <Link href="/sponsor/calendario" className="text-xs font-medium text-roots-orange hover:underline">Ver todos</Link>
        </div>
        <div className="flex flex-col gap-3">
          {upcomingEvents.map((evt) => (
            <div key={evt.id} className="glass-card p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-roots-charcoal text-sm">{evt.name || evt.content}</p>
                <p className="text-[10px] text-foreground-muted">{evt.community} • {evt.attendees} asistentes</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-roots-green">{evt.date.split(',')[0]}</p>
                <p className="text-[10px] text-foreground-muted">{evt.date.split(',')[1]}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Mensajes */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-roots-charcoal">Mensajes Recientes</h3>
          <Link href="/sponsor/chat" className="text-xs font-medium text-roots-orange hover:underline">Ver todos</Link>
        </div>
        <div className="glass-card overflow-hidden">
          {recentMessages.map((msg, idx) => (
            <Link key={msg.id} href={`/sponsor/chat?id=${msg.id}`} className={`flex items-center justify-between p-4 hover:bg-roots-cream transition-colors ${idx !== recentMessages.length - 1 ? 'border-b border-roots-sand/30' : ''}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-roots-sand/50 flex items-center justify-center text-roots-charcoal font-bold text-sm">
                  {msg.sender.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-roots-charcoal text-sm flex items-center gap-2">
                    {msg.sender}
                    {msg.unread > 0 && (
                      <span className="w-4 h-4 rounded-full bg-roots-red text-white text-[9px] font-bold flex items-center justify-center">
                        {msg.unread}
                      </span>
                    )}
                  </p>
                  <p className="text-[10px] text-foreground-muted">{msg.community}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-foreground-muted">{msg.time}</span>
                <ChevronRight size={16} className="text-roots-sand" />
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
