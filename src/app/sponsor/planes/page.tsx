"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Star, Zap } from "lucide-react";
import { useState } from "react";

export default function PlanesPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isAnnual, setIsAnnual] = useState(true);

  const handleSubscribe = (planId: string) => {
    // In MVP, we mock the payment flow
    alert(`Redirigiendo a pasarela de pago (Mock) para el plan: ${planId}`);
  };

  const plans = [
    {
      id: "basic",
      name: "Básico",
      icon: <Star size={24} className="text-roots-orange" />,
      priceMonthly: 29,
      priceAnnual: 290,
      description: "Ideal para pequeños locales que empiezan a colaborar.",
      features: [
        "Perfil en el directorio de espacios",
        "Contacto directo con 2 comunidades/mes",
        "Aparición en resultados de búsqueda",
        "Soporte por email"
      ],
      popular: false,
      trial: false
    },
    {
      id: "pro",
      name: "Pro",
      icon: <Zap size={24} className="text-roots-red" />,
      priceMonthly: 79,
      priceAnnual: 790,
      description: "Para negocios que quieren atraer eventos frecuentemente.",
      features: [
        "Todo lo del plan Básico",
        "Contacto ilimitado con comunidades",
        "Sugerencias de eventos automáticas",
        "Insignia de Local Recomendado",
        "Soporte prioritario 24/7"
      ],
      popular: true,
      trial: true // 30-day trial indicator
    },
    {
      id: "premium",
      name: "Premium",
      icon: <CheckCircle2 size={24} className="text-roots-green" />,
      priceMonthly: 199,
      priceAnnual: 1990,
      description: "Máxima visibilidad y patrocinio de la plataforma.",
      features: [
        "Todo lo del plan Pro",
        "Banner destacado en la app",
        "Patrocinio oficial de eventos grandes",
        "Estadísticas avanzadas de conversiones",
        "Gestor de cuenta dedicado"
      ],
      popular: false,
      trial: false
    }
  ];

  return (
    <div className="flex flex-col gap-8 px-5 pb-20 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mt-6">
        <h1 className="text-3xl font-display font-bold text-roots-charcoal mb-3">
          Planes para <span className="text-roots-orange">Sponsors</span>
        </h1>
        <p className="text-foreground-muted max-w-xl mx-auto">
          Conecta con las comunidades de TribU y llena tu espacio con eventos recurrentes. Elige el plan que mejor se adapte a tu negocio.
        </p>

        <div className="flex items-center justify-center gap-3 mt-8">
          <span className={`text-sm font-semibold ${!isAnnual ? "text-roots-charcoal" : "text-foreground-muted"}`}>Mensual</span>
          <button 
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-14 h-7 rounded-full bg-roots-sand/50 p-1 flex items-center transition-all"
          >
            <motion.div 
              layout 
              className="w-5 h-5 rounded-full bg-roots-charcoal shadow-sm"
              initial={false}
              animate={{ x: isAnnual ? 28 : 0 }}
            />
          </button>
          <span className={`text-sm font-semibold ${isAnnual ? "text-roots-charcoal" : "text-foreground-muted"}`}>Anual <span className="text-roots-green text-xs ml-1">-20%</span></span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {plans.map((plan, i) => (
          <motion.div 
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`relative bg-white border ${plan.popular ? 'border-roots-red shadow-lg' : 'border-roots-sand/50 shadow-sm'} rounded-3xl p-6 flex flex-col`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-roots-red text-white text-xs font-bold px-3 py-1 rounded-full">
                Más Popular
              </div>
            )}
            
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-roots-cream rounded-xl">
                {plan.icon}
              </div>
              <h3 className="text-xl font-bold text-roots-charcoal">{plan.name}</h3>
            </div>
            
            <div className="mb-2">
              <span className="text-4xl font-display font-bold text-roots-charcoal">
                €{isAnnual ? plan.priceAnnual : plan.priceMonthly}
              </span>
              <span className="text-foreground-muted text-sm">/{isAnnual ? 'año' : 'mes'}</span>
            </div>
            
            <p className="text-sm text-foreground-muted mb-6 h-10">
              {plan.description}
            </p>

            <button 
              onClick={() => handleSubscribe(plan.id)}
              className={`w-full py-3 rounded-xl font-semibold mb-6 transition-colors ${
                plan.popular 
                  ? 'bg-roots-red text-white hover:bg-roots-red/90' 
                  : 'bg-roots-cream text-roots-charcoal hover:bg-roots-sand/50'
              }`}
            >
              {plan.trial ? 'Empezar prueba de 30 días' : 'Seleccionar Plan'}
            </button>

            <div className="flex flex-col gap-3 flex-1">
              <p className="text-xs font-bold text-roots-charcoal uppercase tracking-wider mb-1">Incluye:</p>
              {plan.features.map((feature, j) => (
                <div key={j} className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-roots-green shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground-muted">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
