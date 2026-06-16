"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Plus, Save, MoreVertical, MapPin, Clock } from "lucide-react";
import { FormField } from "@/components/FormField";
import { DataTable } from "@/components/DataTable";
import { mockEvents, mockCommunities } from "@/lib/mock-data";

export default function GuiaEventosPage() {
  const guideCommunities = mockCommunities.slice(0, 3);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    address: "",
    category: "",
    maxAttendees: 20,
    starsReward: 5,
    communityId: guideCommunities[0]?.id || "",
    subgroupId: "",
  });

  const selectedCommunity = guideCommunities.find(c => c.id === formData.communityId);
  const subgroupsOptions = selectedCommunity?.subgroups?.map(s => ({ value: s.id, label: s.name })) || [];

  const columns = [
    {
      key: "title",
      label: "Evento",
      render: (val: string, row: any) => {
        const d = new Date(row.date);
        const formattedDate = isNaN(d.getTime()) ? row.date : d.toLocaleDateString("es-ES", { day: 'numeric', month: 'short' });
        return (
          <div className="flex flex-col">
            <span className="font-medium text-roots-charcoal">{val}</span>
            <span className="text-[10px] text-foreground-muted">{formattedDate} • {row.time}</span>
          </div>
        );
      }
    },
    {
      key: "attendees",
      label: "Asistentes",
      render: (val: number, row: any) => (
        <span className="text-xs">{val} / {row.maxAttendees}</span>
      )
    },
    {
      key: "status",
      label: "Estado",
      render: (val: string) => (
        <span className={`px-2 py-1 rounded-md text-[10px] font-semibold ${
          (!val || val === 'active') ? 'bg-roots-green/10 text-roots-green' : 'bg-gray-100 text-gray-600'
        }`}>
          {val === 'active' ? 'Activo' : val || 'Activo'}
        </span>
      )
    }
  ];

  return (
    <div className="flex flex-col gap-6 px-5 pb-10">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-display font-bold text-roots-charcoal flex items-center gap-2 mb-2">
            <Calendar className="text-roots-green" />
            Mis Eventos
          </h1>
          <p className="text-sm text-foreground-muted">
            {showForm ? "Crea un nuevo evento para tu comunidad." : "Gestiona los eventos de tu comunidad."}
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            showForm 
              ? 'bg-roots-sand/20 text-roots-charcoal hover:bg-roots-sand/30' 
              : 'bg-roots-green text-white hover:bg-roots-green/90 shadow-sm'
          }`}
        >
          {showForm ? "Cancelar" : <><Plus size={16} /> Crear Evento</>}
        </button>
      </motion.div>

      {showForm ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="glass-card p-5"
        >
          <form className="flex flex-col gap-4">
            {/* Comunidad y Subgrupo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-roots-sand/10 p-4 rounded-xl border border-roots-sand/40">
              <FormField 
                label="Comunidad a la que pertenece" 
                type="select"
                options={guideCommunities.map(c => ({ value: c.id, label: c.name }))}
                value={formData.communityId} 
                onChange={v => {
                  setFormData({...formData, communityId: v, subgroupId: ""});
                }} 
                required 
              />
              <FormField 
                label="Subgrupo" 
                type="select"
                options={[{value: "", label: "General (Toda la comunidad)"}, ...subgroupsOptions]}
                value={formData.subgroupId} 
                onChange={v => setFormData({...formData, subgroupId: v})} 
              />
            </div>

            <FormField label="Título del Evento" value={formData.title} onChange={v => setFormData({...formData, title: v})} required />
            <FormField label="Descripción" type="textarea" value={formData.description} onChange={v => setFormData({...formData, description: v})} required />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Fecha" type="date" value={formData.date} onChange={v => setFormData({...formData, date: v})} required />
              <FormField label="Hora" type="text" placeholder="ej. 18:00" value={formData.time} onChange={v => setFormData({...formData, time: v})} required />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Ubicación (Nombre)" value={formData.location} onChange={v => setFormData({...formData, location: v})} required />
              <FormField label="Dirección Completa" value={formData.address} onChange={v => setFormData({...formData, address: v})} required />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1">
                <FormField label="Asist. Max" type="number" value={formData.maxAttendees} onChange={v => setFormData({...formData, maxAttendees: v})} required />
              </div>
              <div className="col-span-1">
                <FormField label="Estrellas Recompensa" type="number" value={formData.starsReward} onChange={v => setFormData({...formData, starsReward: v})} required />
              </div>
              <div className="col-span-1">
                <FormField 
                  label="Categoría" 
                  type="select" 
                  options={[
                    {value:"Senderismo", label:"Senderismo"}, 
                    {value:"Arte & Cultura", label:"Arte & Cultura"},
                    {value:"Yoga & Bienestar", label:"Yoga & Bienestar"},
                    {value:"Gastronomía", label:"Gastronomía"},
                    {value:"Música", label:"Música"}
                  ]} 
                  value={formData.category} 
                  onChange={v => setFormData({...formData, category: v})} 
                  required 
                />
              </div>
            </div>

            <button type="button" onClick={() => setShowForm(false)} className="mt-4 w-full bg-roots-green text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2 hover:bg-roots-green/90 transition-colors">
              <Save size={18} /> Guardar Evento
            </button>
          </form>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <DataTable
            columns={columns}
            data={mockEvents}
            searchable={true}
            searchPlaceholder="Buscar evento..."
            actions={(row) => (
              <button className="p-1.5 rounded-md hover:bg-roots-sand/30 text-foreground-muted transition-colors">
                <MoreVertical size={16} />
              </button>
            )}
          />
        </motion.div>
      )}
    </div>
  );
}
