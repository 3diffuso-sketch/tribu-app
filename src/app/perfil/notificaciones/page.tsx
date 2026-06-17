"use client";

import { motion } from "framer-motion";
import { ChevronLeft, Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NotificacionesConfigPage() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    push: true,
    email: false,
    events: true,
    messages: true,
    crewRequests: true
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col h-full bg-roots-cream min-h-screen px-5 pb-20 pt-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()} className="p-2 bg-white rounded-full text-roots-charcoal shadow-sm">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-2xl font-display font-bold text-roots-charcoal flex items-center gap-2">
          <Bell className="text-roots-red" />
          Notificaciones
        </h1>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col gap-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-roots-sand/50">
          <h2 className="font-bold text-roots-charcoal mb-4">Canales de envío</h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-roots-charcoal text-sm">Notificaciones Push</p>
                <p className="text-[11px] text-foreground-muted">Recibe alertas directamente en tu dispositivo.</p>
              </div>
              <button 
                onClick={() => toggle('push')}
                className={`w-12 h-6 rounded-full p-1 flex items-center transition-colors ${settings.push ? 'bg-roots-green' : 'bg-roots-sand'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${settings.push ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-roots-charcoal text-sm">Correos Electrónicos</p>
                <p className="text-[11px] text-foreground-muted">Recibe resúmenes y alertas importantes por email.</p>
              </div>
              <button 
                onClick={() => toggle('email')}
                className={`w-12 h-6 rounded-full p-1 flex items-center transition-colors ${settings.email ? 'bg-roots-green' : 'bg-roots-sand'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${settings.email ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-roots-sand/50">
          <h2 className="font-bold text-roots-charcoal mb-4">Tipos de Alerta</h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-roots-charcoal text-sm">Eventos y Recordatorios</p>
                <p className="text-[11px] text-foreground-muted">Nuevos eventos en tus comunidades y avisos.</p>
              </div>
              <button 
                onClick={() => toggle('events')}
                className={`w-12 h-6 rounded-full p-1 flex items-center transition-colors ${settings.events ? 'bg-roots-green' : 'bg-roots-sand'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${settings.events ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-roots-charcoal text-sm">Mensajes Directos</p>
                <p className="text-[11px] text-foreground-muted">Avisos cuando alguien te envíe un mensaje.</p>
              </div>
              <button 
                onClick={() => toggle('messages')}
                className={`w-12 h-6 rounded-full p-1 flex items-center transition-colors ${settings.messages ? 'bg-roots-green' : 'bg-roots-sand'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${settings.messages ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-roots-charcoal text-sm">Actualizaciones de Crew</p>
                <p className="text-[11px] text-foreground-muted">Alertas sobre solicitudes y cambios de rol.</p>
              </div>
              <button 
                onClick={() => toggle('crewRequests')}
                className={`w-12 h-6 rounded-full p-1 flex items-center transition-colors ${settings.crewRequests ? 'bg-roots-green' : 'bg-roots-sand'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${settings.crewRequests ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
