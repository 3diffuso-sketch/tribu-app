"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Users, ChevronLeft, Calendar, Share2, MessageCircle, Star, Target, ShoppingBag, Send } from "lucide-react";
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
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'info'|'chat'|'subgrupos'|'merch'>('info');

  const handleJoin = () => {
    const joinedCount = user.joinedCommunities?.length || 0;
    if (joinedCount >= 5) {
      setShowLimitModal(true);
      return;
    }
    setIsJoined(true);
    alert(`¡Te has unido a ${community.name}!`);
  };

  const handleCrewRequest = () => {
    setCrewRequested(true);
    alert(`Solicitud para ser Crew enviada al guía de ${community.name}.`);
  };

  const handleContactUser = () => {
    if ((user.eventsAttended || 0) < 3) {
      alert("Debes haber asistido a por lo menos 3 eventos y hecho check-in para poder contactar a otros usuarios.");
    } else {
      alert("Abriendo chat con el usuario...");
    }
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
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Tabs */}
          <div className="flex overflow-x-auto pb-2 scrollbar-hide gap-4 border-b border-roots-sand/30">
            <button onClick={() => setActiveTab('info')} className={`pb-2 font-semibold text-sm transition-colors ${activeTab === 'info' ? 'text-roots-charcoal border-b-2 border-roots-red' : 'text-foreground-muted hover:text-roots-charcoal'}`}>Información</button>
            <button onClick={() => setActiveTab('subgrupos')} className={`pb-2 font-semibold text-sm transition-colors ${activeTab === 'subgrupos' ? 'text-roots-charcoal border-b-2 border-roots-red' : 'text-foreground-muted hover:text-roots-charcoal'}`}>Subgrupos ({community.subgroups?.length || 0})</button>
            <button onClick={() => setActiveTab('chat')} className={`pb-2 font-semibold text-sm transition-colors ${activeTab === 'chat' ? 'text-roots-charcoal border-b-2 border-roots-red' : 'text-foreground-muted hover:text-roots-charcoal'}`}>Chat General</button>
            <button onClick={() => setActiveTab('merch')} className={`pb-2 font-semibold text-sm transition-colors ${activeTab === 'merch' ? 'text-roots-charcoal border-b-2 border-roots-red' : 'text-foreground-muted hover:text-roots-charcoal'}`}>Tienda</button>
          </div>

          {activeTab === 'info' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-8">
              <div>
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
              </div>

              {/* Próximos Eventos */}
              <div>
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
              </div>
            </motion.div>
          )}

          {activeTab === 'subgrupos' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              {community.subgroups && community.subgroups.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {community.subgroups.map(sg => (
                    <div key={sg.id} className="glass-card p-4 flex flex-col justify-between h-full">
                      <div>
                        <h3 className="font-semibold text-roots-charcoal flex items-center gap-2">
                          <Target size={16} className="text-roots-orange" />
                          {sg.name}
                        </h3>
                        <p className="text-xs text-foreground-muted mt-2">{sg.description}</p>
                      </div>
                      <button className="mt-4 w-full bg-roots-cream text-roots-charcoal border border-roots-sand font-semibold py-2 rounded-lg text-xs hover:bg-roots-sand/50 transition-colors">
                        Unirse al Subgrupo
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-foreground-muted text-sm bg-roots-sand/10 p-4 rounded-xl">Esta comunidad no tiene subgrupos todavía.</p>
              )}
            </motion.div>
          )}

          {activeTab === 'chat' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col h-[400px] border border-roots-sand/50 rounded-2xl overflow-hidden bg-white/50">
              <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
                <div className="bg-roots-green/10 text-roots-green text-xs p-3 rounded-lg text-center mx-auto max-w-sm">
                  Chat general de la comunidad. Solo Guías y Crew pueden enviar mensajes o imágenes.
                </div>
                {/* Mock Message */}
                <div className="flex flex-col items-start">
                  <span className="text-[10px] text-foreground-muted ml-2 mb-1">Guía</span>
                  <div className="bg-roots-cream text-roots-charcoal p-3 rounded-2xl rounded-tl-sm text-sm border border-roots-sand/30">
                    ¡Bienvenidos todos! Mañana tenemos evento.
                  </div>
                </div>
              </div>
              <div className="p-3 bg-white border-t border-roots-sand/30 flex gap-2 items-center">
                <input 
                  type="text" 
                  disabled={user.role !== 'guia' && user.role !== 'crew'}
                  placeholder={user.role === 'guia' || user.role === 'crew' ? "Escribe un mensaje..." : "Solo administradores pueden enviar mensajes."}
                  className="flex-1 bg-roots-cream border border-roots-sand rounded-xl py-2 px-4 text-sm focus:outline-none disabled:opacity-50"
                />
                <button 
                  disabled={user.role !== 'guia' && user.role !== 'crew'}
                  className="w-10 h-10 rounded-full bg-roots-green flex items-center justify-center text-white disabled:opacity-50"
                >
                  <Send size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'merch' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-2 mb-4">
                <ShoppingBag className="text-roots-brown" />
                <h2 className="text-xl font-bold text-roots-charcoal">Tienda Oficial</h2>
              </div>
              {community.merch && community.merch.length > 0 ? (
                <div className="flex overflow-x-auto gap-4 pb-4 snap-x">
                  {community.merch.map(item => (
                    <div key={item.id} className="min-w-[200px] bg-white border border-roots-sand/50 rounded-2xl overflow-hidden snap-start shadow-sm flex flex-col">
                      <div className="h-32 bg-roots-sand/30 overflow-hidden relative">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        <span className="absolute top-2 right-2 bg-white/90 backdrop-blur-md px-2 py-1 rounded-md text-xs font-bold text-roots-charcoal">
                          €{item.price.toFixed(2)}
                        </span>
                      </div>
                      <div className="p-4 flex flex-col gap-3 flex-1">
                        <h3 className="font-semibold text-roots-charcoal text-sm">{item.name}</h3>
                        <button className="mt-auto w-full bg-roots-charcoal text-white font-semibold py-2 rounded-lg text-xs hover:bg-roots-charcoal/90 transition-colors">
                          Comprar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-foreground-muted text-sm bg-roots-sand/10 p-4 rounded-xl">No hay productos disponibles por ahora.</p>
              )}
            </motion.div>
          )}
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
              <button onClick={handleContactUser} className="flex items-center gap-2 text-sm text-foreground-muted hover:text-roots-charcoal transition-colors">
                <Users size={18} />
                Directorio de Miembros
              </button>
              <button className="flex items-center gap-2 text-sm text-foreground-muted hover:text-roots-charcoal transition-colors">
                <Share2 size={18} />
                Compartir comunidad
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showLimitModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ background: "var(--overlay)" }} onClick={() => setShowLimitModal(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl text-center">
              <div className="w-16 h-16 bg-roots-orange/10 text-roots-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Target size={32} />
              </div>
              <h3 className="font-display text-xl font-bold text-roots-charcoal mb-2">Límite Alcanzado</h3>
              <p className="text-sm text-foreground-muted mb-6">
                Solo puedes unirte a un máximo de 5 comunidades simultáneamente. Para unirte a otra, debes esperar 20 días desde la última vez que saliste de una. Si no deseas esperar, puedes pagar una membresía única de 10 USD.
              </p>
              <div className="flex flex-col gap-3">
                <button onClick={() => { alert("Iniciando pago simulado..."); setShowLimitModal(false); }} className="w-full py-3 rounded-xl bg-roots-charcoal text-white font-semibold text-sm hover:bg-roots-charcoal/90 shadow-md">
                  Pagar 10 USD
                </button>
                <button onClick={() => setShowLimitModal(false)} className="w-full py-3 rounded-xl bg-roots-cream text-roots-charcoal font-semibold text-sm hover:bg-roots-sand/50">
                  Esperar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
