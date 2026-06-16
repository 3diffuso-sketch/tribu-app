"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Users, ChevronLeft, Calendar, Share2, MessageCircle, Star, Target } from "lucide-react";
import { mockCommunities, mockEvents } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth-context";

export default function ComunidadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  
  const communityId = params.id as string;
  const community = mockCommunities.find(c => c.id === communityId) || mockCommunities[0];
  
  const communityEvents = mockEvents.filter(e => e.communityId === communityId);

  const [isJoined, setIsJoined] = useState(false);
  const [crewRequested, setCrewRequested] = useState(false);

  const handleJoin = () => {
    setIsJoined(true);
    alert(`¡Te has unido a ${community.name}!`);
  };

  const handleCrewRequest = () => {
    setCrewRequested(true);
    alert(`Solicitud para ser Crew enviada al guía de ${community.name}.`);
  };

  return (
    <div className="flex flex-col pb-20">
      {/* Header Banner */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <img 
          src={community.image || "/images/communities/runners.jpg"} 
          alt={community.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        
        <button 
          onClick={() => router.back()}
          className="absolute top-4 left-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/40 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="absolute bottom-6 left-6 right-6 text-white">
          <span className="bg-roots-orange text-white text-xs font-bold px-2 py-1 rounded-md mb-2 inline-block">
            {community.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight">{community.name}</h1>
          <div className="flex items-center gap-4 mt-2 text-sm text-white/90">
            <div className="flex items-center gap-1.5">
              <Users size={16} />
              <span>{community.memberCount + (isJoined ? 1 : 0)} miembros</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={16} />
              <span>{communityEvents.length} eventos creados</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 md:px-10 lg:px-20 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-xl font-bold text-roots-charcoal mb-3">Sobre nosotros</h2>
            <p className="text-foreground-muted leading-relaxed">
              {community.description}
            </p>
            {community.tags && community.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {community.tags.map(tag => (
                  <span key={tag} className="bg-roots-cream text-roots-charcoal text-xs font-medium px-3 py-1 rounded-full border border-roots-sand/50">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          {/* Subgroups */}
          {community.subgroups && community.subgroups.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h2 className="text-xl font-bold text-roots-charcoal mb-4 flex items-center gap-2">
                <Target className="text-roots-orange" />
                Subgrupos Disponibles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {community.subgroups.map(sg => (
                  <div key={sg.id} className="glass-card p-4 flex flex-col">
                    <h3 className="font-semibold text-roots-charcoal">{sg.name}</h3>
                    <p className="text-xs text-foreground-muted mt-1">{sg.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Próximos Eventos */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-xl font-bold text-roots-charcoal mb-4 flex items-center gap-2">
              <Calendar className="text-roots-green" />
              Próximos Eventos
            </h2>
            {communityEvents.length > 0 ? (
              <div className="flex flex-col gap-3">
                {communityEvents.map(evt => (
                  <div key={evt.id} className="bg-white border border-roots-sand/50 p-4 rounded-2xl flex justify-between items-center hover:shadow-sm transition-shadow">
                    <div>
                      <h3 className="font-semibold text-roots-charcoal">{evt.title}</h3>
                      <p className="text-xs text-foreground-muted mt-0.5">{evt.date} • {evt.time}</p>
                    </div>
                    <button className="text-roots-green font-medium text-sm hover:underline">Ver detalle</button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-foreground-muted text-sm bg-roots-sand/10 p-4 rounded-xl">No hay eventos próximos programados.</p>
            )}
          </motion.div>
        </div>

        {/* Sidebar Actions */}
        <div className="flex flex-col gap-4">
          <div className="glass-card p-5 sticky top-24">
            <h3 className="font-bold text-roots-charcoal mb-4">Únete a la experiencia</h3>
            
            {!isJoined ? (
              <button 
                onClick={handleJoin}
                className="w-full bg-roots-green text-white font-bold py-3 rounded-xl hover:bg-roots-green/90 transition-colors flex justify-center items-center gap-2"
              >
                Unirme a la Comunidad
              </button>
            ) : (
              <div className="flex flex-col gap-3">
                <button 
                  disabled
                  className="w-full bg-roots-sand/30 text-roots-charcoal font-bold py-3 rounded-xl flex justify-center items-center gap-2"
                >
                  Ya eres miembro
                </button>

                {(!crewRequested && user.role !== "guia" && user.role !== "crew") ? (
                  <button 
                    onClick={handleCrewRequest}
                    className="w-full bg-roots-charcoal text-white font-semibold py-3 rounded-xl hover:bg-roots-charcoal/90 transition-colors flex justify-center items-center gap-2 text-sm shadow-md"
                  >
                    <Star size={16} />
                    Solicitar ser Crew
                  </button>
                ) : (crewRequested) && (
                  <div className="text-center text-xs font-medium text-roots-orange bg-roots-orange/10 p-2 rounded-lg">
                    Solicitud para Crew enviada al Guía
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-roots-sand/50 flex flex-col gap-2">
              <button className="flex items-center gap-2 text-sm text-foreground-muted hover:text-roots-charcoal transition-colors">
                <MessageCircle size={18} />
                Contactar al Guía
              </button>
              <button className="flex items-center gap-2 text-sm text-foreground-muted hover:text-roots-charcoal transition-colors">
                <Share2 size={18} />
                Compartir comunidad
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
