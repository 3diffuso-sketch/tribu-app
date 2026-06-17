"use client";

import { motion } from "framer-motion";
import { User, Settings, Award, Calendar, Bell, ChevronRight, LogOut, HelpCircle, CreditCard } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { useState } from "react";
import { PricingModal } from "@/components/PricingModal";

export default function PerfilPage() {
  const { user, switchRole } = useAuth();
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

  const insignias = [
    { id: 1, name: "Fundador", icon: "👑", color: "bg-yellow-100 text-yellow-700" },
    { id: 2, name: "Deportista", icon: "🏃", color: "bg-green-100 text-green-700" },
    { id: 3, name: "Activo", icon: "🔥", color: "bg-orange-100 text-orange-700" },
  ];

  const estadisticas = [
    { label: "Eventos", value: 12 },
    { label: "Comunidades", value: 3 },
    { label: "Conexiones", value: 45 },
  ];

  const intereses = ["Running", "Yoga", "Networking", "Tecnología", "Fotografía"];

  return (
    <div className="flex flex-col gap-6 px-4 md:px-8 pb-24 pt-6 max-w-7xl mx-auto min-h-screen">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center">
        <h1 className="text-2xl font-display font-bold text-roots-charcoal">Mi Perfil</h1>
        <button className="p-2 bg-roots-cream rounded-full text-roots-charcoal hover:bg-roots-sand/50 transition-colors">
          <Settings size={20} />
        </button>
      </motion.div>

      {/* Profile Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-roots-sand/50 mb-3 overflow-hidden border-4 border-white shadow-sm flex items-center justify-center text-3xl font-display font-bold text-roots-charcoal">
          {user.avatar ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" /> : user.name.charAt(0)}
        </div>
        <h2 className="text-xl font-bold text-roots-charcoal">{user.name}</h2>
        <p className="text-sm text-foreground-muted capitalize mt-1 px-3 py-0.5 rounded-full bg-roots-cream border border-roots-sand/50">
          Rol actual: {user.role}
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card flex justify-around p-4">
        {estadisticas.map((stat, i) => (
          <div key={i} className="flex flex-col items-center text-center">
            <span className="text-xl font-bold text-roots-charcoal">{stat.value}</span>
            <span className="text-[10px] uppercase font-semibold text-foreground-muted">{stat.label}</span>
          </div>
        ))}
      </motion.div>

      {/* Mi Suscripción (Solo para Guía y Sponsor) */}
      {(user.role === "guia" || user.role === "sponsor") && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-card p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-roots-charcoal flex items-center gap-2">
              <CreditCard size={18} className="text-roots-green" />
              Mi Suscripción
            </h3>
          </div>
          <div className="flex items-center justify-between bg-roots-cream p-4 rounded-xl border border-roots-sand/50">
            <div>
              <p className="text-xs text-foreground-muted mb-1">Plan Actual</p>
              <p className="font-bold text-roots-charcoal">Básico</p>
            </div>
            <button 
              onClick={() => setIsPricingModalOpen(true)}
              className="bg-roots-green text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-roots-green/90 transition-colors shadow-sm"
            >
              Mejorar Plan
            </button>
          </div>
        </motion.div>
      )}

      {/* Insignias */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-roots-charcoal flex items-center gap-2">
            <Award size={18} className="text-roots-orange" />
            Mis Insignias
          </h3>
          <span className="text-xs text-roots-green font-medium">Ver todas</span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {insignias.map(insignia => (
            <div key={insignia.id} className={`flex flex-col items-center justify-center min-w-[80px] p-3 rounded-xl ${insignia.color}`}>
              <span className="text-2xl mb-1">{insignia.icon}</span>
              <span className="text-[10px] font-bold uppercase">{insignia.name}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Intereses */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-roots-charcoal">Intereses</h3>
          <button className="text-xs text-roots-green font-medium hover:underline">Editar</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {intereses.map(interes => (
            <span key={interes} className="px-3 py-1 bg-white border border-roots-sand/50 rounded-full text-xs font-medium text-roots-charcoal">
              {interes}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Menu Options */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-col gap-2">
        <Link href="/mis-eventos" className="glass-card p-4 flex items-center justify-between hover:bg-roots-cream/50 transition-colors">
          <div className="flex items-center gap-3 text-roots-charcoal font-medium">
            <Calendar size={18} className="text-roots-brown" />
            Historial de Eventos
          </div>
          <ChevronRight size={18} className="text-roots-sand" />
        </Link>
        <Link href="/perfil/notificaciones" className="glass-card p-4 flex items-center justify-between hover:bg-roots-cream/50 transition-colors">
          <div className="flex items-center gap-3 text-roots-charcoal font-medium">
            <Bell size={18} className="text-roots-red" />
            Preferencias de Notificación
          </div>
          <ChevronRight size={18} className="text-roots-sand" />
        </Link>
        <Link href="/ayuda" className="glass-card p-4 flex items-center justify-between hover:bg-roots-cream/50 transition-colors">
          <div className="flex items-center gap-3 text-roots-charcoal font-medium">
            <HelpCircle size={18} className="text-roots-orange" />
            Ayuda y Soporte
          </div>
          <ChevronRight size={18} className="text-roots-sand" />
        </Link>
      </motion.div>

      {/* Dev / Logout Button */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-4">
        <button 
          onClick={() => switchRole('usuario')}
          className="w-full bg-white border-2 border-roots-sand text-roots-charcoal font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-roots-cream transition-colors"
        >
          <LogOut size={18} />
          Cerrar Sesión (Dev Reset)
        </button>
      </motion.div>

      <PricingModal 
        isOpen={isPricingModalOpen} 
        onClose={() => setIsPricingModalOpen(false)} 
        currentPlan="basico" 
      />
    </div>
  );
}
