"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Zap, Star, Shield } from "lucide-react";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: string;
}

export function PricingModal({ isOpen, onClose, currentPlan }: PricingModalProps) {
  const [isAnnual, setIsAnnual] = useState(false);

  // Precios base mensuales
  const plans = [
    {
      id: "basico",
      name: "Básico",
      icon: Star,
      priceMonthly: 0,
      description: "Ideal para empezar tu comunidad.",
      color: "roots-green",
      features: [
        "Hasta 1 comunidad",
        "Máximo 50 miembros",
        "1 evento mensual",
        "Soporte comunitario",
      ],
    },
    {
      id: "pro",
      name: "Pro",
      icon: Zap,
      priceMonthly: 29,
      description: "Para comunidades en crecimiento.",
      color: "roots-orange",
      popular: true,
      features: [
        "Hasta 5 comunidades",
        "Miembros ilimitados",
        "Eventos ilimitados",
        "Chat prioritario",
        "Estadísticas avanzadas",
      ],
    },
    {
      id: "premium",
      name: "Premium",
      icon: Shield,
      priceMonthly: 99,
      description: "Herramientas avanzadas para sponsors y guías top.",
      color: "roots-red",
      features: [
        "Comunidades ilimitadas",
        "Marca blanca",
        "Destacado en búsquedas",
        "API y Webhooks",
        "Soporte 24/7",
      ],
    },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-roots-charcoal/60 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-roots-warm-white rounded-3xl shadow-2xl border border-roots-sand p-6 md:p-8"
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="text-left">
              <h2 className="text-3xl font-display font-bold text-roots-charcoal mb-2">
                Planes y Precios
              </h2>
              <p className="text-foreground-muted">
                Mejora tu suscripción para desbloquear más beneficios en TribU.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-roots-cream rounded-full text-roots-charcoal hover:bg-roots-sand/50 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Toggle Mensual/Anual */}
          <div className="flex justify-center mb-10">
            <div className="bg-roots-cream p-1.5 rounded-full border border-roots-sand/50 inline-flex items-center relative">
              <button
                onClick={() => setIsAnnual(false)}
                className={`relative z-10 px-6 py-2.5 text-sm font-bold rounded-full transition-colors ${
                  !isAnnual ? "text-roots-charcoal" : "text-foreground-muted hover:text-roots-charcoal"
                }`}
              >
                Mensual
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`relative z-10 px-6 py-2.5 text-sm font-bold rounded-full transition-colors flex items-center gap-2 ${
                  isAnnual ? "text-roots-charcoal" : "text-foreground-muted hover:text-roots-charcoal"
                }`}
              >
                Anual
                <span className="bg-roots-green/20 text-roots-green text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wide">
                  Ahorra 30%
                </span>
              </button>

              {/* Toggle Slider indicator */}
              <motion.div
                className="absolute top-1.5 bottom-1.5 rounded-full bg-white shadow-sm border border-roots-sand/30"
                initial={false}
                animate={{
                  left: isAnnual ? "50%" : "6px",
                  width: isAnnual ? "calc(50% - 6px)" : "calc(50% - 6px)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const price = isAnnual
                ? Math.round(plan.priceMonthly * 0.7)
                : plan.priceMonthly;
              const Icon = plan.icon;
              const isCurrent = currentPlan.toLowerCase() === plan.id;

              return (
                <div
                  key={plan.id}
                  className={`relative bg-white rounded-2xl p-6 border-2 transition-all flex flex-col ${
                    plan.popular
                      ? "border-roots-orange shadow-lg transform md:-translate-y-2"
                      : "border-roots-sand/50 hover:border-roots-sand"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-roots-orange text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                      Más Popular
                    </div>
                  )}
                  {isCurrent && (
                    <div className="absolute top-4 right-4 bg-roots-green/10 text-roots-green text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full flex items-center gap-1">
                      <Check size={12} /> Actual
                    </div>
                  )}

                  <div className={`w-12 h-12 rounded-xl bg-${plan.color}/10 flex items-center justify-center mb-4`}>
                    <Icon size={24} className={`text-${plan.color}`} style={{ color: `var(--${plan.color})` }} />
                  </div>

                  <h3 className="text-xl font-display font-bold text-roots-charcoal mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-foreground-muted mb-6 h-8">
                    {plan.description}
                  </p>

                  <div className="mb-6 flex items-baseline gap-1">
                    <span className="text-4xl font-display font-bold text-roots-charcoal">
                      €{price}
                    </span>
                    <span className="text-sm text-foreground-muted">
                      /mes
                    </span>
                  </div>

                  {isAnnual && plan.priceMonthly > 0 && (
                    <p className="text-xs text-roots-green font-semibold mb-4 bg-roots-green/10 inline-block px-2 py-1 rounded-md self-start">
                      Pago anual de €{price * 12}
                    </p>
                  )}

                  <div className="flex-1">
                    <ul className="flex flex-col gap-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-roots-charcoal">
                          <Check size={16} className="text-roots-green shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    disabled={isCurrent}
                    className={`mt-8 w-full py-3 rounded-xl font-bold text-sm transition-colors ${
                      isCurrent
                        ? "bg-roots-cream text-foreground-muted cursor-default border border-roots-sand/50"
                        : plan.popular
                        ? "bg-roots-orange text-white hover:bg-roots-orange/90 shadow-sm"
                        : "bg-roots-charcoal text-white hover:bg-roots-charcoal/90 shadow-sm"
                    }`}
                  >
                    {isCurrent ? "Plan Actual" : "Seleccionar Plan"}
                  </button>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
