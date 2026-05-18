"use client";

import { motion } from "framer-motion";
import { Heart, Star, Lock, Sparkles, MessageCircle, Percent } from "lucide-react";
import { mockConnections, mockUser } from "@/lib/mock-data";
import { LEVELS } from "@/lib/types";

export default function ConnectionsPage() {
  const user = mockUser;
  const requiredLevel = 3;
  const levelInfo = LEVELS[requiredLevel];
  const isUnlocked = user.stars >= levelInfo.minStars;
  const starsNeeded = levelInfo.minStars - user.stars;

  return (
    <div className="min-h-screen pb-4">
      {/* Header */}
      <header className="relative px-5 pt-14 pb-6 overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(135deg, rgba(196,68,42,0.08) 0%, rgba(232,145,90,0.06) 50%, transparent 100%)" }} />
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-1">
            <Heart size={16} className="text-roots-red" />
            <span className="text-sm font-medium text-foreground-muted">Nivel 3</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-roots-charcoal leading-tight">
            Conexiones
          </h1>
          <p className="mt-2 text-sm text-foreground-muted max-w-xs">
            Personas afines a ti. Propón citas y conoce gente especial.
          </p>
        </motion.div>
      </header>

      <div className="px-5">
        {/* Lock banner */}
        {!isUnlocked && (
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="mb-6 p-5 rounded-2xl text-center" style={{ background: "linear-gradient(135deg, rgba(196,68,42,0.1), rgba(232,145,90,0.08))" }}>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4, type: "spring" }} className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center star-pulse" style={{ background: "linear-gradient(135deg, var(--roots-red), var(--roots-red-dark))" }}>
              <Lock size={28} className="text-white" />
            </motion.div>
            <h2 className="font-display text-lg font-bold text-roots-charcoal">Nivel bloqueado</h2>
            <p className="text-sm text-foreground-muted mt-1">
              Necesitas <strong className="text-roots-red">{starsNeeded} ★ más</strong> para desbloquear las conexiones.
            </p>
            <p className="text-xs text-foreground-muted mt-2">Asiste a eventos y únete a comunidades</p>
            <div className="mt-4 max-w-xs mx-auto">
              <div className="flex justify-between text-xs text-foreground-muted mb-1"><span>{user.stars} ★</span><span>{levelInfo.minStars} ★</span></div>
              <div className="w-full h-2.5 bg-white rounded-full overflow-hidden">
                <motion.div className="h-full rounded-full" style={{ background: "linear-gradient(90deg, var(--roots-orange), var(--roots-red))" }} initial={{ width: 0 }} animate={{ width: `${(user.stars / levelInfo.minStars) * 100}%` }} transition={{ delay: 0.6, duration: 1 }} />
              </div>
            </div>
          </motion.div>
        )}

        {isUnlocked && (
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="mb-6 p-4 rounded-2xl flex items-center gap-3" style={{ background: "linear-gradient(135deg, rgba(196,68,42,0.1), rgba(196,68,42,0.05))" }}>
            <div className="w-10 h-10 rounded-full bg-roots-red/15 flex items-center justify-center"><Sparkles size={20} className="text-roots-red" /></div>
            <div><p className="text-sm font-semibold text-roots-red">¡Nivel 3 desbloqueado!</p><p className="text-xs text-foreground-muted">Conecta con personas afines</p></div>
          </motion.div>
        )}

        {/* Connections */}
        <h2 className="font-display text-xl font-semibold text-roots-charcoal mb-4">
          {isUnlocked ? "Personas sugeridas" : "Vista previa"}
        </h2>

        <div className="space-y-4">
          {mockConnections.map((conn, i) => (
            <motion.article key={conn.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 + 0.3 }} className={`glass-card p-4 ${!isUnlocked ? "locked-overlay" : ""}`}>
              <div className="flex items-start gap-4 relative z-0">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-roots-sand flex items-center justify-center text-xl font-bold text-roots-brown">{conn.name.charAt(0)}</div>
                  {/* Compatibility badge */}
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1 + 0.5, type: "spring" }} className="absolute -bottom-1 -right-1 flex items-center gap-0.5 bg-white rounded-full px-1.5 py-0.5 shadow-md border border-roots-sand/30">
                    <Percent size={10} className="text-roots-green" />
                    <span className="text-[10px] font-bold text-roots-green">{conn.compatibilityScore}</span>
                  </motion.div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-roots-charcoal">{conn.name}</h3>
                  <p className="text-sm text-foreground-muted mt-0.5 line-clamp-2">{conn.bio}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {conn.sharedInterests.map((interest) => (
                      <span key={interest} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-roots-cream-dark text-roots-brown-light">{interest}</span>
                    ))}
                  </div>
                </div>
              </div>

              {isUnlocked && (
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 py-2.5 rounded-xl bg-roots-red text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-roots-red-light transition-colors">
                    <Heart size={16} /> Conectar
                  </button>
                  <button className="py-2.5 px-4 rounded-xl bg-roots-cream text-roots-brown font-semibold text-sm flex items-center justify-center gap-2 hover:bg-roots-cream-dark transition-colors">
                    <MessageCircle size={16} />
                  </button>
                </div>
              )}

              {!isUnlocked && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg"><Lock size={18} className="text-roots-brown" /></div>
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
