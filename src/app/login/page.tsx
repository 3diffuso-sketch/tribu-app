"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LogIn, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { switchRole } = useAuth();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login for development: set role based on email if we wanted to
    // But currently, the RoleSwitcher allows dev switching.
    // For now, let's just push them to the home page or dashboard.
    switchRole("usuario");
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 py-12 relative overflow-hidden bg-roots-cream">
      {/* Decorative background circles */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 rounded-full bg-roots-orange/20 blur-3xl mix-blend-multiply" />
      <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 rounded-full bg-roots-green/20 blur-3xl mix-blend-multiply" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm mx-auto relative z-10"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-display font-bold text-roots-charcoal mb-2">
            Trib<span className="text-roots-orange">U</span>
          </h1>
          <p className="text-sm font-medium text-foreground-muted">
            Conecta con tu comunidad
          </p>
        </div>

        <div className="glass-card p-6 md:p-8">
          <h2 className="text-xl font-bold text-roots-charcoal mb-6 flex items-center gap-2">
            <LogIn size={20} className="text-roots-green" />
            Iniciar Sesión
          </h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-roots-charcoal mb-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full px-4 py-3 bg-white border border-roots-sand/50 rounded-xl text-sm focus:outline-none focus:border-roots-green transition-colors"
                required
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-roots-charcoal">Contraseña</label>
                <a href="#" className="text-[10px] font-medium text-roots-green hover:underline">¿Olvidaste tu contraseña?</a>
              </div>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white border border-roots-sand/50 rounded-xl text-sm focus:outline-none focus:border-roots-green transition-colors"
                required
              />
            </div>

            <button 
              type="submit" 
              className="mt-4 w-full bg-roots-charcoal text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-roots-charcoal/90 transition-colors shadow-md shadow-roots-charcoal/20"
            >
              Entrar <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-foreground-muted">
              ¿No tienes una cuenta? <a href="#" className="font-semibold text-roots-orange hover:underline">Regístrate</a>
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center text-[10px] text-foreground-muted bg-white/50 py-2 px-4 rounded-lg inline-block mx-auto">
          <strong>Modo Desarrollo:</strong> Puedes iniciar sesión con cualquier dato. Usa el botón flotante "Role" para cambiar de vistas.
        </div>
      </motion.div>
    </div>
  );
}
