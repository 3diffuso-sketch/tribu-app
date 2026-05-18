"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Sparkles, ChevronRight, ChevronLeft, Check } from "lucide-react";
import { INTEREST_TAGS } from "@/lib/types";

const steps = [
  { id: "welcome", title: "Bienvenido/a" },
  { id: "interests", title: "Tus intereses" },
  { id: "ready", title: "¡Listo!" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [name, setName] = useState("");

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : prev.length < 8
        ? [...prev, interest]
        : prev
    );
  };

  const canAdvance =
    (step === 0 && name.trim().length >= 2) ||
    (step === 1 && selectedInterests.length >= 3) ||
    step === 2;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--background)" }}>
      {/* Progress bar */}
      <div className="px-6 pt-14 pb-2">
        <div className="flex gap-2">
          {steps.map((_, i) => (
            <div key={i} className="flex-1 h-1 rounded-full overflow-hidden bg-roots-cream-dark">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, var(--roots-red), var(--roots-orange))" }}
                initial={{ width: 0 }}
                animate={{ width: i <= step ? "100%" : "0%" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 flex flex-col px-6 pt-6 pb-6 overflow-hidden">
        <AnimatePresence mode="wait">
          {/* Step 0 – Welcome */}
          {step === 0 && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 flex flex-col"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                className="w-20 h-20 rounded-3xl mx-auto mb-6 flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, var(--roots-red), var(--roots-orange))" }}
              >
                <Sparkles size={36} className="text-white" />
              </motion.div>

              <h1 className="font-display text-3xl font-bold text-roots-charcoal text-center leading-tight">
                La intimidad empieza{" "}
                <span className="gradient-text">en comunidad</span>
              </h1>
              <p className="text-center text-foreground-muted mt-3 text-sm max-w-xs mx-auto leading-relaxed">
                Descubre eventos, únete a comunidades y conecta con personas
                afines en Valencia.
              </p>

              <div className="mt-8">
                <label className="text-sm font-semibold text-roots-charcoal mb-2 block">
                  ¿Cómo te llamas?
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                  className="w-full px-5 py-3.5 rounded-2xl bg-white border border-roots-sand/40
                    text-roots-charcoal placeholder:text-foreground-muted/50 text-base
                    focus:outline-none focus:ring-2 focus:ring-roots-red/20 focus:border-roots-red/30
                    transition-all shadow-sm"
                  autoFocus
                />
              </div>

              <div className="mt-auto pt-6 space-y-3">
                <p className="text-center text-xs text-foreground-muted">
                  Ganarás ★ asistiendo a eventos para desbloquear más funciones
                </p>
                <div className="flex gap-2">
                  {[
                    { emoji: "🧭", label: "Explorar", stars: "0 ★" },
                    { emoji: "👥", label: "Comunidades", stars: "5 ★" },
                    { emoji: "❤️", label: "Conexiones", stars: "15 ★" },
                  ].map((lv) => (
                    <div key={lv.label} className="flex-1 p-3 rounded-xl bg-roots-cream/60 text-center">
                      <span className="text-lg">{lv.emoji}</span>
                      <p className="text-[11px] font-semibold text-roots-charcoal mt-1">{lv.label}</p>
                      <p className="text-[10px] text-foreground-muted">{lv.stars}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 1 – Interests */}
          {step === 1 && (
            <motion.div
              key="interests"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 flex flex-col"
            >
              <h1 className="font-display text-2xl font-bold text-roots-charcoal">
                ¿Qué te interesa?
              </h1>
              <p className="text-sm text-foreground-muted mt-1">
                Elige al menos 3 (máx. 8). Así encontraremos los mejores eventos.
              </p>
              <p className="text-xs text-roots-orange font-medium mt-2">
                {selectedInterests.length}/8 seleccionados
              </p>

              <div className="flex flex-wrap gap-2.5 mt-5 overflow-y-auto flex-1 content-start pb-4">
                {INTEREST_TAGS.map((interest) => {
                  const isSelected = selectedInterests.includes(interest);
                  return (
                    <motion.button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      whileTap={{ scale: 0.92 }}
                      className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200
                        ${isSelected
                          ? "bg-roots-red text-white shadow-md shadow-roots-red/20"
                          : "bg-white text-roots-brown border border-roots-sand/40 hover:border-roots-red/30"
                        }`}
                    >
                      {isSelected && <Check size={14} className="inline mr-1.5 -mt-0.5" />}
                      {interest}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 2 – Ready */}
          {step === 2 && (
            <motion.div
              key="ready"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 flex flex-col items-center justify-center text-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 250 }}
                className="w-24 h-24 rounded-full flex items-center justify-center mb-6 star-pulse"
                style={{ background: "linear-gradient(135deg, var(--roots-orange), var(--roots-red))" }}
              >
                <span className="text-4xl">🎉</span>
              </motion.div>

              <h1 className="font-display text-3xl font-bold text-roots-charcoal">
                ¡Bienvenido/a, {name}!
              </h1>
              <p className="text-foreground-muted mt-3 text-sm max-w-xs leading-relaxed">
                Tu perfil está listo. Empieza explorando eventos cerca de ti y gana estrellas para desbloquear más.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-2 max-w-xs">
                {selectedInterests.slice(0, 5).map((interest) => (
                  <span key={interest} className="badge badge-orange">{interest}</span>
                ))}
                {selectedInterests.length > 5 && (
                  <span className="badge badge-red">+{selectedInterests.length - 5}</span>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      <div className="px-6 pb-10 flex gap-3">
        {step > 0 && (
          <button
            onClick={() => setStep((s) => s - 1)}
            className="py-4 px-5 rounded-2xl bg-white border border-roots-sand/40 text-roots-brown
              font-semibold text-sm active:scale-[0.98] transition-all"
          >
            <ChevronLeft size={18} />
          </button>
        )}
        <button
          onClick={() => {
            if (step < 2) setStep((s) => s + 1);
            else router.push("/");
          }}
          disabled={!canAdvance}
          className={`flex-1 py-4 rounded-2xl font-semibold text-base flex items-center justify-center gap-2
            active:scale-[0.98] transition-all duration-200 ${
              canAdvance
                ? "bg-roots-red text-white shadow-lg shadow-roots-red/20"
                : "bg-roots-cream-dark text-foreground-muted/50 cursor-not-allowed"
            }`}
        >
          {step === 2 ? "Empezar a explorar" : "Continuar"}
          {step < 2 && <ChevronRight size={18} />}
        </button>
      </div>
    </div>
  );
}
