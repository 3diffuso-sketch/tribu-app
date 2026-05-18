"use client";

import { motion } from "framer-motion";
import { Star, Calendar, MapPin, TrendingUp, ChevronRight, Lock, Settings, Award, Compass } from "lucide-react";
import { mockUser } from "@/lib/mock-data";
import { LEVELS } from "@/lib/types";

const levelEntries = Object.entries(LEVELS) as [string, typeof LEVELS[keyof typeof LEVELS]][];

export default function ProfilePage() {
  const user = mockUser;
  const currentLevel = LEVELS[user.level as keyof typeof LEVELS];
  const nextLevel = LEVELS[(user.level + 1) as keyof typeof LEVELS] ?? null;
  const starsToNext = nextLevel ? nextLevel.minStars - user.stars : 0;

  return (
    <div className="min-h-screen pb-4">
      {/* Header */}
      <header className="relative px-5 pt-14 pb-8 overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(135deg, rgba(196,68,42,0.08) 0%, rgba(232,145,90,0.04) 50%, transparent 100%)" }} />
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-2xl font-bold text-roots-charcoal">Mi Perfil</h1>
          <button className="w-10 h-10 rounded-full bg-white border border-roots-sand/40 flex items-center justify-center shadow-sm"><Settings size={18} className="text-roots-brown" /></button>
        </div>

        {/* Avatar + Info */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-roots-sand flex items-center justify-center text-3xl font-bold text-roots-brown border-[3px] border-white shadow-lg">{user.name.charAt(0)}</div>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring" }} className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-roots-orange flex items-center justify-center border-2 border-white">
              <span className="text-[10px] font-bold text-white">{user.level}</span>
            </motion.div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-roots-charcoal">{user.name}</h2>
            <div className="flex items-center gap-1 text-sm text-foreground-muted mt-0.5"><MapPin size={14} />{user.city}</div>
            <p className="text-xs text-foreground-muted mt-1">Miembro desde {user.joinedDate}</p>
          </div>
        </motion.div>
      </header>

      <div className="px-5 space-y-5">
        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="grid grid-cols-3 gap-3">
          {[
            { icon: Star, value: user.stars, label: "Estrellas", color: "text-roots-orange", fill: true },
            { icon: Calendar, value: user.eventsAttended, label: "Eventos", color: "text-roots-red", fill: false },
            { icon: TrendingUp, value: `Nivel ${user.level}`, label: currentLevel.name, color: "text-roots-green", fill: false },
          ].map(({ icon: Icon, value, label, color, fill }) => (
            <div key={label} className="glass-card p-4 text-center">
              <Icon size={22} className={`mx-auto mb-1.5 ${color} ${fill ? "fill-roots-orange" : ""}`} />
              <p className="text-lg font-bold text-roots-charcoal">{value}</p>
              <p className="text-[11px] text-foreground-muted">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* Level progress */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-card p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-roots-charcoal flex items-center gap-2"><Award size={18} className="text-roots-orange" />Progreso de nivel</h3>
            {nextLevel && <span className="text-xs font-medium text-roots-orange">{starsToNext} ★ para nivel {user.level + 1}</span>}
          </div>

          {/* Level steps */}
          <div className="space-y-3">
            {levelEntries.map(([lvl, info]) => {
              const lvlNum = parseInt(lvl);
              const isUnlocked = user.level >= lvlNum;
              const isCurrent = user.level === lvlNum;
              return (
                <div key={lvl} className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${isCurrent ? "bg-roots-cream" : "bg-transparent"}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${isUnlocked ? "bg-roots-green text-white" : "bg-roots-cream-dark text-foreground-muted"}`}>
                    {isUnlocked ? "✓" : <Lock size={14} />}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-semibold ${isUnlocked ? "text-roots-charcoal" : "text-foreground-muted"}`}>Nivel {lvl}: {info.name}</p>
                    <p className="text-xs text-foreground-muted">{info.description}</p>
                  </div>
                  <span className="text-xs text-foreground-muted">{info.minStars} ★</span>
                </div>
              );
            })}
          </div>

          {/* Stars progress bar */}
          {nextLevel && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-foreground-muted mb-1.5">
                <span>{user.stars} ★</span><span>{nextLevel.minStars} ★</span>
              </div>
              <div className="w-full h-2.5 bg-roots-cream-dark rounded-full overflow-hidden">
                <motion.div className="h-full rounded-full" style={{ background: "linear-gradient(90deg, var(--roots-orange), var(--roots-red))" }} initial={{ width: 0 }} animate={{ width: `${(user.stars / nextLevel.minStars) * 100}%` }} transition={{ delay: 0.5, duration: 1 }} />
              </div>
            </div>
          )}
        </motion.div>

        {/* Bio */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-5">
          <h3 className="font-semibold text-roots-charcoal mb-2">Sobre mí</h3>
          <p className="text-sm text-foreground-muted leading-relaxed">{user.bio}</p>
        </motion.div>

        {/* Interests */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="glass-card p-5">
          <h3 className="font-semibold text-roots-charcoal mb-3">Mis intereses</h3>
          <div className="flex flex-wrap gap-2">
            {user.interests.map((interest) => (<span key={interest} className="badge badge-orange">{interest}</span>))}
          </div>
        </motion.div>

        {/* Quick links */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card overflow-hidden divide-y divide-roots-sand/20">
          {[
            { label: "Mis eventos", icon: Compass, href: "/" },
            { label: "Configuración", icon: Settings, href: "#" },
          ].map(({ label, icon: Icon }) => (
            <button key={label} className="flex items-center gap-3 w-full p-4 text-left hover:bg-roots-cream/50 transition-colors">
              <Icon size={18} className="text-roots-brown" />
              <span className="flex-1 text-sm font-medium text-roots-charcoal">{label}</span>
              <ChevronRight size={16} className="text-foreground-muted" />
            </button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
