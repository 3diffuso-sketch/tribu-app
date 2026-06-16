"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Store, Save, Eye } from "lucide-react";
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

  const toggleAmenity = (id: string) => {
    setSelectedAmenities(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate save
    alert("Perfil actualizado correctamente");
  };

  return (
    <div className="flex flex-col gap-6 px-5">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold text-roots-charcoal flex items-center gap-2">
          <Store className="text-roots-orange" />
          Perfil de Negocio
        </h1>
        <p className="text-sm text-foreground-muted">
          Actualiza la información que los Guías verán de tu espacio.
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
          label="Nombre del Espacio" 
          value={formData.businessName} 
          onChange={(v) => setFormData({...formData, businessName: v})} 
          required 
        />

        <FormField 
          label="Descripción" 
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
            label="Capacidad Máx." 
            type="number"
            value={formData.maxCapacity} 
            onChange={(v) => setFormData({...formData, maxCapacity: v})} 
            required 
          />
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
            label="Teléfono" 
            value={formData.phone} 
            onChange={(v) => setFormData({...formData, phone: v})} 
          />
          <FormField 
            label="Email" 
            type="text" // using text to simplify validation in mock
            value={formData.email} 
            onChange={(v) => setFormData({...formData, email: v})} 
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
          className="mt-4 w-full bg-roots-charcoal text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2 hover:bg-roots-charcoal/90 transition-colors"
        >
          <Save size={18} /> Guardar Cambios
        </button>
      </motion.form>
    </div>
  );
}
