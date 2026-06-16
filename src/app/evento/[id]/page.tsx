"use client";

import { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft, Calendar, Clock, MapPin, Users, Star,
  Share2, Heart, QrCode, CheckCircle2, Sparkles,
} from "lucide-react";
import { mockEvents } from "@/lib/mock-data";

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const event = mockEvents.find((e) => e.id === id);
  const [isAttending, setIsAttending] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinData, setJoinData] = useState({ name: "", anonymous: false, gender: "" });
  const [showQR, setShowQR] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);
  const [liked, setLiked] = useState(false);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-foreground-muted text-lg">Evento no encontrado</p>
      </div>
    );
  }

  const spotsLeft = event.maxAttendees - event.attendees;
  const fill = (event.attendees / event.maxAttendees) * 100;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero image */}
      <div className="relative h-[56vw] max-h-[420px] w-full overflow-hidden">
        <Image src={event.image} alt={event.title} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(44,36,32,0.7) 0%, transparent 50%)" }} />
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 pt-12 z-10">
          <Link href="/" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center"><ArrowLeft size={20} className="text-white" /></Link>
          <div className="flex gap-2">
            <button onClick={() => setLiked(!liked)} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Heart size={20} className={liked ? "text-roots-red fill-roots-red" : "text-white"} />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center"><Share2 size={20} className="text-white" /></button>
          </div>
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-10">
          <span className="badge badge-red backdrop-blur-md bg-white/80 text-sm">{event.category}</span>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring" }} className="flex items-center gap-1.5 backdrop-blur-md bg-white/90 rounded-full px-3 py-1.5 shadow-lg">
            <Star size={16} className="text-roots-orange fill-roots-orange" />
            <span className="text-sm font-bold text-roots-brown">+{event.starsReward} ★</span>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 -mt-4 relative z-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-t-3xl pt-6 pb-4 -mx-5 px-5 shadow-[0_-8px_32px_rgba(0,0,0,0.06)]">
          <h1 className="font-display text-2xl font-bold text-roots-charcoal leading-tight">{event.title}</h1>

          <div className="mt-4 space-y-2.5">
            {[
              { icon: Calendar, label: event.date, sub: `${event.time}h` },
              { icon: Clock, label: "Duración estimada", sub: "~2 horas" },
              { icon: MapPin, label: event.location, sub: event.address },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3 text-sm text-foreground-muted">
                <div className="w-9 h-9 rounded-xl bg-roots-cream flex items-center justify-center"><Icon size={16} className="text-roots-red" /></div>
                <div><p className="font-medium text-roots-charcoal">{label}</p><p className="text-xs">{sub}</p></div>
              </div>
            ))}
          </div>

          {/* Organizer */}
          <div className="mt-5 flex items-center gap-3 p-3 rounded-2xl bg-roots-cream/50">
            <div className="w-11 h-11 rounded-full bg-roots-sand flex items-center justify-center text-roots-brown font-bold text-lg">{event.organizer.name.charAt(0)}</div>
            <div><p className="text-sm font-semibold text-roots-charcoal">{event.organizer.name}</p><p className="text-xs text-foreground-muted">Organizador</p></div>
          </div>

          <div className="mt-5">
            <h2 className="text-base font-semibold text-roots-charcoal mb-2">Acerca de este evento</h2>
            <p className="text-sm text-foreground-muted leading-relaxed">{event.description}</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {event.tags.map((tag) => (<span key={tag} className="text-xs font-semibold px-3 py-1 rounded-full bg-roots-sand/30 text-roots-brown">{tag}</span>))}
          </div>

          {/* Attendance */}
          <div className="mt-6 p-4 rounded-2xl bg-roots-cream/60">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2"><Users size={16} className="text-roots-brown" /><span className="text-sm font-medium text-roots-charcoal">{event.attendees}/{event.maxAttendees}</span></div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${spotsLeft <= 3 ? "bg-roots-red/10 text-roots-red" : "bg-roots-green/10 text-roots-green"}`}>{spotsLeft} plazas</span>
            </div>
            <div className="w-full h-2 bg-white rounded-full overflow-hidden">
              <motion.div className="h-full rounded-full" style={{ background: fill > 80 ? "var(--roots-red)" : "var(--roots-green)" }} initial={{ width: 0 }} animate={{ width: `${fill}%` }} transition={{ delay: 0.4, duration: 0.8 }} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Join Event Modal */}
      <AnimatePresence>
        {showJoinModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ background: "var(--overlay)" }} onClick={() => setShowJoinModal(false)}>
            <motion.div initial={{ scale: 0.85 }} animate={{ scale: 1 }} exit={{ scale: 0.85 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl">
              <h3 className="font-display text-xl font-bold text-roots-charcoal mb-4">Únete al evento</h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="flex items-center justify-between text-sm font-medium text-roots-charcoal mb-1.5">
                    <span>Tu nombre (opcional)</span>
                    <label className="flex items-center gap-2 text-xs font-normal cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={joinData.anonymous}
                        onChange={(e) => setJoinData({...joinData, anonymous: e.target.checked, name: e.target.checked ? "Anónimo" : ""})}
                        className="rounded border-roots-sand text-roots-red focus:ring-roots-red"
                      />
                      Asistir como anónimo
                    </label>
                  </label>
                  <input
                    type="text"
                    disabled={joinData.anonymous}
                    value={joinData.name}
                    onChange={(e) => setJoinData({...joinData, name: e.target.value})}
                    placeholder={joinData.anonymous ? "Anónimo" : "Escribe tu nombre"}
                    className="w-full bg-roots-cream/50 border border-roots-sand/40 rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:border-roots-red/50 disabled:opacity-50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-roots-charcoal mb-1.5">Sexo (opcional)</label>
                  <div className="flex gap-2">
                    {['Mujer', 'Hombre', 'Otro', 'No decir'].map(g => (
                      <button 
                        key={g}
                        onClick={() => setJoinData({...joinData, gender: g})}
                        className={`flex-1 py-2 px-1 rounded-lg text-[11px] font-medium border transition-colors ${joinData.gender === g ? 'bg-roots-charcoal text-white border-roots-charcoal' : 'bg-roots-cream/30 text-roots-charcoal border-roots-sand hover:bg-roots-cream'}`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button onClick={() => setShowJoinModal(false)} className="flex-1 py-3 rounded-xl bg-roots-cream text-roots-charcoal font-semibold text-sm">Cancelar</button>
                <button 
                  onClick={() => {
                    setIsAttending(true);
                    setShowJoinModal(false);
                  }} 
                  className="flex-1 py-3 rounded-xl bg-roots-red text-white font-semibold text-sm"
                >
                  Confirmar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* QR Modal */}
      <AnimatePresence>
        {showQR && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ background: "var(--overlay)" }} onClick={() => setShowQR(false)}>
            <motion.div initial={{ scale: 0.85 }} animate={{ scale: 1 }} exit={{ scale: 0.85 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-3xl p-6 w-full max-w-sm text-center shadow-2xl">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-roots-cream flex items-center justify-center"><QrCode size={28} className="text-roots-red" /></div>
              <h3 className="font-display text-xl font-bold text-roots-charcoal">Check-in QR</h3>
              <p className="text-sm text-foreground-muted mt-1 mb-5">Muestra este código al organizador para confirmar tu asistencia</p>
              <div className="mx-auto w-48 h-48 bg-roots-charcoal rounded-2xl p-3 mb-5">
                <div className="w-full h-full bg-white rounded-xl grid grid-cols-7 grid-rows-7 gap-0.5 p-2">
                  {Array.from({ length: 49 }).map((_, i) => (<div key={i} className="rounded-[2px]" style={{ background: [0,1,2,6,7,8,12,14,42,43,44,48,47,46,40,36,35,34].includes(i) ? "var(--roots-charcoal)" : Math.random() > 0.45 ? "var(--roots-charcoal)" : "white" }} />))}
                </div>
              </div>
              <button onClick={() => { setCheckedIn(true); setShowQR(false); }} className="w-full py-3.5 rounded-full bg-roots-green text-white font-semibold text-sm flex items-center justify-center gap-2"><CheckCircle2 size={18} />Confirmar asistencia</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Check-in success */}
      <AnimatePresence>
        {checkedIn && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ background: "var(--overlay)" }} onClick={() => setCheckedIn(false)}>
            <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.85 }} transition={{ type: "spring" }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl">
              <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.2, type: "spring" }} className="w-20 h-20 mx-auto mb-5 rounded-full flex items-center justify-center star-pulse" style={{ background: "linear-gradient(135deg, var(--roots-orange), var(--roots-red))" }}>
                <Sparkles size={36} className="text-white" />
              </motion.div>
              <h3 className="font-display text-2xl font-bold text-roots-charcoal">¡Check-in completado!</h3>
              <p className="text-sm text-foreground-muted mt-2 mb-2">Has ganado</p>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4, type: "spring" }} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-5" style={{ background: "linear-gradient(135deg, rgba(232,145,90,0.15), rgba(196,68,42,0.1))" }}>
                <Star size={22} className="text-roots-orange fill-roots-orange" />
                <span className="text-2xl font-bold text-roots-brown">+{event.starsReward}</span>
                <span className="text-sm font-medium text-roots-brown-light">estrellas</span>
              </motion.div>
              <p className="text-xs text-foreground-muted mb-5">Sigue asistiendo para subir de nivel</p>
              <Link href="/" className="inline-block w-full py-3.5 rounded-full bg-roots-red text-white font-semibold text-sm text-center">Volver a explorar</Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom action */}
      <div className="sticky bottom-0 left-0 right-0 p-4 pb-[calc(1rem+80px+env(safe-area-inset-bottom))] z-30">
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="flex gap-3">
          {!isAttending ? (
            <button onClick={() => setShowJoinModal(true)} className="flex-1 py-4 rounded-2xl bg-roots-red text-white font-semibold text-base shadow-lg shadow-roots-red/20 active:scale-[0.98] flex items-center justify-center gap-2 transition-all"><Users size={18} />Asistir al evento</button>
          ) : (
            <>
              <button onClick={() => setShowQR(true)} className="flex-1 py-4 rounded-2xl bg-roots-charcoal text-white font-semibold text-base shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 transition-all"><QrCode size={18} />Check-in QR</button>
              <button onClick={() => setIsAttending(false)} className="py-4 px-5 rounded-2xl bg-white border border-roots-sand/50 text-roots-brown font-semibold text-sm active:scale-[0.98] transition-all">Cancelar</button>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
