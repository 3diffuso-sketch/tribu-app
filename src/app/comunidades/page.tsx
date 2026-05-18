"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Users, Star, Lock, Sparkles, ArrowRight } from "lucide-react";
import { mockCommunities, mockUser } from "@/lib/mock-data";
import { LEVELS } from "@/lib/types";

export default function CommunitiesPage() {
  const user = mockUser;
  const requiredLevel = 2;
  const levelInfo = LEVELS[requiredLevel];
  const isUnlocked = user.stars >= levelInfo.minStars;
  const starsNeeded = levelInfo.minStars - user.stars;

  return (
    <div className="min-h-screen pb-4">
      {/* Header */}
      <header className="relative px-5 pt-14 pb-6 overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(135deg, rgba(107,123,58,0.08) 0%, rgba(232,145,90,0.04) 50%, transparent 100%)" }} />
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-1">
            <Users size={16} className="text-roots-green" />
            <span className="text-sm font-medium text-foreground-muted">Nivel 2</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-roots-charcoal leading-tight">
            Comunidades
          </h1>
          <p className="mt-2 text-sm text-foreground-muted max-w-xs">
            Únete a grupos de personas con tus mismos intereses en Valencia.
          </p>
        </motion.div>
      </header>

      <div className="px-5">
        {/* Lock banner */}
        {!isUnlocked && (
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="mb-6 p-5 rounded-2xl text-center" style={{ background: "linear-gradient(135deg, rgba(232,145,90,0.12), rgba(196,68,42,0.08))" }}>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4, type: "spring" }} className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center star-pulse" style={{ background: "linear-gradient(135deg, var(--roots-orange), var(--roots-red))" }}>
              <Lock size={28} className="text-white" />
            </motion.div>
            <h2 className="font-display text-lg font-bold text-roots-charcoal">Nivel bloqueado</h2>
            <p className="text-sm text-foreground-muted mt-1">
              Necesitas <strong className="text-roots-orange">{starsNeeded} ★ más</strong> para desbloquear las comunidades.
            </p>
            <p className="text-xs text-foreground-muted mt-2">Asiste a más eventos para ganar estrellas</p>
            {/* Progress */}
            <div className="mt-4 max-w-xs mx-auto">
              <div className="flex justify-between text-xs text-foreground-muted mb-1"><span>{user.stars} ★</span><span>{levelInfo.minStars} ★</span></div>
              <div className="w-full h-2.5 bg-white rounded-full overflow-hidden">
                <motion.div className="h-full rounded-full" style={{ background: "linear-gradient(90deg, var(--roots-orange), var(--roots-red))" }} initial={{ width: 0 }} animate={{ width: `${(user.stars / levelInfo.minStars) * 100}%` }} transition={{ delay: 0.6, duration: 1 }} />
              </div>
            </div>
          </motion.div>
        )}

        {isUnlocked && (
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="mb-6 p-4 rounded-2xl flex items-center gap-3" style={{ background: "linear-gradient(135deg, rgba(107,123,58,0.12), rgba(107,123,58,0.06))" }}>
            <div className="w-10 h-10 rounded-full bg-roots-green/20 flex items-center justify-center"><Sparkles size={20} className="text-roots-green" /></div>
            <div><p className="text-sm font-semibold text-roots-green">¡Nivel 2 desbloqueado!</p><p className="text-xs text-foreground-muted">Explora y únete a comunidades</p></div>
          </motion.div>
        )}

        {/* Communities grid */}
        <h2 className="font-display text-xl font-semibold text-roots-charcoal mb-4">
          {isUnlocked ? "Comunidades disponibles" : "Vista previa"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {mockCommunities.map((community, i) => (
            <motion.article key={community.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 + 0.3 }} className={`glass-card overflow-hidden ${!isUnlocked ? "locked-overlay" : ""}`}>
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image src={community.image} alt={community.name} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute top-3 left-3"><span className="badge badge-green backdrop-blur-md bg-white/80">{community.category}</span></div>
                {!isUnlocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-roots-charcoal/30 backdrop-blur-[2px] z-20">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg"><Lock size={20} className="text-roots-brown" /></div>
                  </div>
                )}
              </div>
              <div className="p-4 relative z-0">
                <h3 className="font-display text-lg font-semibold text-roots-charcoal">{community.name}</h3>
                <p className="text-sm text-foreground-muted mt-1 line-clamp-2">{community.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-1.5 text-sm text-foreground-muted"><Users size={14} /><span>{community.memberCount} miembros</span></div>
                  <div className="flex items-center gap-1 text-xs text-roots-orange"><Star size={12} className="fill-roots-orange" /><span>{community.requiredStars} ★</span></div>
                </div>
                {isUnlocked && (
                  <button className="mt-3 w-full py-2.5 rounded-xl bg-roots-green text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-roots-green-light transition-colors">
                    Unirme <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
