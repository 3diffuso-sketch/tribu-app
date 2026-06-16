"use client";

import { motion } from "framer-motion";
import { Compass, Users, MapPin, Search } from "lucide-react";
import { mockCommunities } from "@/lib/mock-data";
import Link from "next/link";

export default function SponsorComunidadesPage() {
  return (
    <div className="flex flex-col gap-6 px-5">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold text-roots-charcoal flex items-center gap-2 mb-2">
          <Compass className="text-roots-orange" />
          Explorar Comunidades
        </h1>
        <p className="text-sm text-foreground-muted">
          Descubre comunidades activas y ofréceles tu espacio para sus eventos.
        </p>
      </motion.div>

      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted" />
        <input 
          type="text" 
          placeholder="Buscar comunidades por nombre o categoría..." 
          className="w-full pl-10 pr-4 py-3 bg-white border border-roots-sand/50 rounded-xl text-sm focus:outline-none focus:border-roots-orange/50 transition-colors shadow-sm"
        />
      </div>

      <div className="flex overflow-x-auto pb-2 scrollbar-hide gap-2">
        {["Todas", "Deportes", "Gastronomía", "Arte", "Bienestar"].map(cat => (
          <button key={cat} className="px-4 py-1.5 rounded-full text-xs font-medium border border-roots-sand bg-white text-roots-charcoal hover:bg-roots-cream whitespace-nowrap transition-colors">
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockCommunities.map((community, i) => (
          <motion.div 
            key={community.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card overflow-hidden group flex flex-col h-full"
          >
            <div className="h-32 bg-roots-sand/30 relative overflow-hidden">
              {community.image && (
                <img src={community.image} alt={community.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/20 backdrop-blur-sm mb-1 inline-block">
                  {community.category}
                </span>
                <h3 className="font-display font-bold leading-tight">{community.name}</h3>
              </div>
            </div>
            
            <div className="p-4 flex flex-col flex-1">
              <p className="text-xs text-foreground-muted line-clamp-2 mb-3 flex-1">
                {community.description}
              </p>
              
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-roots-sand/30">
                <div className="flex items-center gap-1.5 text-xs text-roots-charcoal font-medium">
                  <Users size={14} className="text-roots-green" />
                  {community.memberCount} miembros
                </div>
                <div className="flex items-center gap-1.5 text-xs text-roots-charcoal font-medium">
                  <MapPin size={14} className="text-roots-red" />
                  Valencia
                </div>
              </div>

              <Link 
                href={`/sponsor/chat?id=${community.guiaId || 'new'}`}
                className="mt-4 w-full bg-roots-green/10 text-roots-green font-semibold py-2 rounded-lg text-center text-sm hover:bg-roots-green/20 transition-colors"
              >
                Contactar Guía
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
