"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Store, MapPin, Phone, Mail, Clock, Users, ChevronLeft, Globe, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

// We mock some data based on what the Sponsor profile form has
const mockBusinessData = {
  id: "s1",
  name: "La Terraza Valencia",
  category: "Restaurante/Bar",
  description: "Espacio único al aire libre ideal para eventos sociales, networking y celebraciones. Contamos con barra completa y equipo de sonido.",
  address: "Calle de la Paz 45, 46003 Valencia",
  phone: "+34 600 123 456",
  email: "hola@laterraza.es",
  website: "www.laterraza.es",
  maxCapacity: 120,
  openTime: "10:00",
  closeTime: "01:00",
  photos: [
    "/images/communities/runners.jpg",
    "/images/events/jam-session.jpg",
    "/images/communities/creativos.jpg"
  ],
  amenities: [
    "WiFi Alta Velocidad", "Aire Acondicionado", "Terraza", "Cocina", "Equipo de Sonido", "Acceso Silla de Ruedas"
  ]
};

export default function SponsorPublicProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  
  // En producción buscaríamos por params.id
  const business = mockBusinessData;

  return (
    <div className="flex flex-col pb-20">
      {/* Header with main photo */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <img 
          src={business.photos[0] || "/images/communities/creativos.jpg"} 
          alt={business.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        <button 
          onClick={() => router.back()}
          className="absolute top-4 left-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/40 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="absolute bottom-6 left-6 right-6 text-white flex justify-between items-end">
          <div>
            <span className="bg-roots-orange text-white text-xs font-bold px-2 py-1 rounded-md mb-2 inline-block">
              {business.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight">{business.name}</h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-white/90">
              <div className="flex items-center gap-1.5">
                <Users size={16} className="text-roots-green" />
                <span>Capacidad: {business.maxCapacity}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={16} className="text-roots-orange" />
                <span>{business.openTime} - {business.closeTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 md:px-10 lg:px-20 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-xl font-bold text-roots-charcoal mb-3">Sobre el Espacio</h2>
            <p className="text-foreground-muted leading-relaxed">
              {business.description}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h2 className="text-xl font-bold text-roots-charcoal mb-4 flex items-center gap-2">
              <Store className="text-roots-orange" />
              Servicios e Instalaciones
            </h2>
            <div className="flex flex-wrap gap-2">
              {business.amenities.map(amenity => (
                <span key={amenity} className="bg-roots-cream text-roots-charcoal text-sm font-medium px-4 py-2 rounded-xl border border-roots-sand/50 shadow-sm">
                  {amenity}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Galería */}
          {business.photos.length > 1 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h2 className="text-xl font-bold text-roots-charcoal mb-4">Galería</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {business.photos.slice(1).map((photo, index) => (
                  <div key={index} className="aspect-square rounded-2xl overflow-hidden shadow-sm">
                    <img src={photo} alt={`Foto ${index+2}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </div>

        {/* Sidebar Actions */}
        <div className="flex flex-col gap-4">
          <div className="glass-card p-6 sticky top-24">
            <h3 className="font-bold text-roots-charcoal mb-4">Información de Contacto</h3>
            
            <div className="flex flex-col gap-4 mb-6 text-sm">
              <div className="flex items-start gap-3 text-foreground-muted">
                <MapPin size={18} className="text-roots-red shrink-0 mt-0.5" />
                <span>{business.address}</span>
              </div>
              <div className="flex items-center gap-3 text-foreground-muted">
                <Phone size={18} className="text-roots-green shrink-0" />
                <span>{business.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-foreground-muted">
                <Mail size={18} className="text-roots-orange shrink-0" />
                <span>{business.email}</span>
              </div>
              <div className="flex items-center gap-3 text-foreground-muted">
                <Globe size={18} className="text-roots-charcoal shrink-0" />
                <span>{business.website}</span>
              </div>
            </div>

            {(user?.role === "guia" || user?.role === "crew") && (
              <Link 
                href={`/guia/chat?id=${business.id}`}
                className="w-full bg-roots-charcoal text-white font-bold py-3.5 rounded-xl hover:bg-roots-charcoal/90 transition-colors flex justify-center items-center gap-2 shadow-md"
              >
                <MessageCircle size={18} />
                Contactar Negocio
              </Link>
            )}
            
          </div>
        </div>

      </div>
    </div>
  );
}
