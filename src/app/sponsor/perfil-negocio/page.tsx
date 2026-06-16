"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Store, Save, Eye, Image as ImageIcon, X, Plus } from "lucide-react";
import { FormField } from "@/components/FormField";

export default function SponsorPerfilNegocioPage() {
  const [formData, setFormData] = useState({
    businessName: "La Terraza Valencia",
    description: "Espacio único al aire libre ideal para eventos sociales, networking y celebraciones. Contamos con barra completa y equipo de sonido.",
    address: "Calle de la Paz 45, 46003 Valencia",
    phone: "+34 600 123 456",
    email: "hola@laterraza.es",
    website: "www.laterraza.es",
    category: "Restaurante/Bar",
    maxCapacity: 120,
    openTime: "10:00",
    closeTime: "01:00",
    instagram: "@laterraza_vlc",
    nit: "B12345678",
  });

  const amenities = [
    { id: "wifi", label: "WiFi Alta Velocidad", selected: true },
    { id: "parking", label: "Parking", selected: false },
    { id: "ac", label: "Aire Acondicionado", selected: true },
    { id: "terrace", label: "Terraza", selected: true },
    { id: "kitchen", label: "Cocina", selected: true },
    { id: "projector", label: "Proyector", selected: false },
    { id: "sound", label: "Equipo de Sonido", selected: true },
    { id: "accessible", label: "Acceso Silla de Ruedas", selected: true },
  ];

  const [selectedAmenities, setSelectedAmenities] = useState<Record<string, boolean>>(
    Object.fromEntries(amenities.map(a => [a.id, a.selected]))
  );

  // Photos state
  const [photos, setPhotos] = useState<string[]>([
    "/images/communities/creativos.jpg" // mock initial photo
  ]);

  const toggleAmenity = (id: string) => {
    setSelectedAmenities(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (photos.length === 0) {
      alert("Debes agregar al menos una foto de tu negocio.");
      return;
    }
    // Simulate save
    alert("Perfil de negocio actualizado correctamente");
  };

  const handleAddPhoto = () => {
    if (photos.length >= 5) return;
    setPhotos([...photos, `/images/events/jam-session.jpg?random=${Date.now()}`]);
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-6 px-5 pb-10">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold text-roots-charcoal flex items-center gap-2">
          <Store className="text-roots-orange" />
          Perfil de Negocio
        </h1>
        <p className="text-sm text-foreground-muted">
          Actualiza la información completa de tu negocio. Los Guías y Usuarios verán este perfil al interactuar contigo.
        </p>
      </motion.div>

      <motion.form 
        onSubmit={handleSave}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col gap-5 glass-card p-5"
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold text-roots-charcoal">Información Principal</h2>
          <button type="button" className="text-xs font-medium text-roots-orange flex items-center gap-1 hover:underline">
            <Eye size={14} /> Vista Previa
          </button>
        </div>

        <FormField 
          label="Nombre del Negocio" 
          value={formData.businessName} 
          onChange={(v) => setFormData({...formData, businessName: v})} 
          required 
        />
        
        <FormField 
          label="NIT / CIF / Documento Comercial" 
          value={formData.nit} 
          onChange={(v) => setFormData({...formData, nit: v})} 
          required 
        />

        <FormField 
          label="Descripción detallada" 
          type="textarea"
          value={formData.description} 
          onChange={(v) => setFormData({...formData, description: v})} 
          required 
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField 
            label="Categoría" 
            type="select"
            options={[
              { value: "Restaurante/Bar", label: "Restaurante/Bar" },
              { value: "Coworking", label: "Coworking" },
              { value: "Salón de Eventos", label: "Salón de Eventos" },
              { value: "Estudio/Taller", label: "Estudio/Taller" },
            ]}
            value={formData.category} 
            onChange={(v) => setFormData({...formData, category: v})} 
            required 
          />
          <FormField 
            label="Capacidad Máxima (personas)" 
            type="number"
            value={formData.maxCapacity} 
            onChange={(v) => setFormData({...formData, maxCapacity: v})} 
            required 
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <FormField 
            label="Hora de Apertura" 
            type="text"
            placeholder="Ej: 08:00"
            value={formData.openTime} 
            onChange={(v) => setFormData({...formData, openTime: v})} 
            required 
          />
          <FormField 
            label="Hora de Cierre" 
            type="text"
            placeholder="Ej: 22:00"
            value={formData.closeTime} 
            onChange={(v) => setFormData({...formData, closeTime: v})} 
            required 
          />
        </div>

        {/* Galería de Fotos */}
        <h2 className="font-semibold text-roots-charcoal mt-2 border-t border-roots-sand/50 pt-4 flex items-center gap-2">
          <ImageIcon size={18} className="text-roots-red" />
          Galería de Fotos ({photos.length}/5)
        </h2>
        <p className="text-xs text-foreground-muted mb-2">
          Agrega hasta 5 fotos de tu espacio. Esto ayudará a los Guías a visualizar tus instalaciones. (Requerido)
        </p>

        <div className="grid grid-cols-3 gap-3 mb-2">
          <AnimatePresence>
            {photos.map((url, i) => (
              <motion.div 
                key={url + i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative aspect-square rounded-xl overflow-hidden bg-roots-sand/30 border border-roots-sand/60"
              >
                <img src={url} alt={`Foto ${i+1}`} className="w-full h-full object-cover" />
                <button 
                  type="button"
                  onClick={() => handleRemovePhoto(i)}
                  className="absolute top-1 right-1 bg-white/80 p-1 rounded-full text-roots-red hover:bg-white transition-colors"
                >
                  <X size={14} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          {photos.length < 5 && (
            <button
              type="button"
              onClick={handleAddPhoto}
              className="aspect-square rounded-xl flex flex-col items-center justify-center gap-1 bg-roots-cream border-2 border-dashed border-roots-sand/60 text-roots-charcoal hover:bg-roots-sand/20 hover:border-roots-green/50 transition-colors"
            >
              <Plus size={24} className="text-roots-green" />
              <span className="text-[10px] font-semibold">Subir Foto</span>
            </button>
          )}
        </div>

        <h2 className="font-semibold text-roots-charcoal mt-2 border-t border-roots-sand/50 pt-4">Contacto y Ubicación</h2>

        <FormField 
          label="Dirección Completa" 
          value={formData.address} 
          onChange={(v) => setFormData({...formData, address: v})} 
          required 
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField 
            label="Teléfono Móvil/Fijo" 
            value={formData.phone} 
            onChange={(v) => setFormData({...formData, phone: v})} 
            required
          />
          <FormField 
            label="Correo Electrónico" 
            type="text"
            value={formData.email} 
            onChange={(v) => setFormData({...formData, email: v})} 
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <FormField 
            label="Sitio Web (Opcional)" 
            value={formData.website} 
            onChange={(v) => setFormData({...formData, website: v})} 
          />
          <FormField 
            label="Instagram (Opcional)" 
            value={formData.instagram} 
            onChange={(v) => setFormData({...formData, instagram: v})} 
          />
        </div>

        <h2 className="font-semibold text-roots-charcoal mt-2 border-t border-roots-sand/50 pt-4">Servicios e Instalaciones</h2>
        
        <div className="flex flex-wrap gap-2">
          {amenities.map(amenity => (
            <button
              key={amenity.id}
              type="button"
              onClick={() => toggleAmenity(amenity.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                selectedAmenities[amenity.id] 
                  ? "bg-roots-orange/10 border-roots-orange text-roots-orange" 
                  : "bg-roots-cream border-roots-sand/60 text-foreground-muted"
              }`}
            >
              {amenity.label}
            </button>
          ))}
        </div>

        <button 
          type="submit" 
          className="mt-6 w-full bg-roots-charcoal text-white rounded-xl py-4 font-bold flex items-center justify-center gap-2 hover:bg-roots-charcoal/90 transition-colors shadow-md"
        >
          <Save size={18} /> Guardar Perfil de Negocio
        </button>
      </motion.form>
    </div>
  );
}
