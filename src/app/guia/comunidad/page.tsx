"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Save, MoreVertical, Shield } from "lucide-react";
import { FormField } from "@/components/FormField";
import { DataTable } from "@/components/DataTable";

const mockMembers = [
  { id: "m1", name: "Ana Martínez", role: "crew", joinedDate: "Enero 2025", active: true },
  { id: "m2", name: "Luis Pérez", role: "crew", joinedDate: "Febrero 2025", active: true },
  { id: "m3", name: "Roberto Gómez", role: "miembro", joinedDate: "Marzo 2025", active: true },
  { id: "m4", name: "Elena Díaz", role: "miembro", joinedDate: "Abril 2025", active: true },
  { id: "m5", name: "Javier Ruiz", role: "miembro", joinedDate: "Mayo 2025", active: true },
  { id: "m6", name: "Laura Sánchez", role: "miembro", joinedDate: "Mayo 2025", active: true },
];

export default function GuiaComunidadPage() {
  const [formData, setFormData] = useState({
    name: "Runners de Valencia",
    description: "Comunidad dedicada a corredores de todos los niveles en la ciudad de Valencia. Organizamos salidas semanales y entrenamientos grupales.",
    category: "Deportes",
    privacy: "public",
    autoApprove: true,
  });

  const columns = [
    {
      key: "name",
      label: "Miembro",
      render: (val: string, row: any) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-roots-sand/50 flex items-center justify-center text-roots-charcoal font-bold text-xs">
            {val.charAt(0)}
          </div>
          <span className="font-medium text-roots-charcoal">{val}</span>
        </div>
      )
    },
    {
      key: "role",
      label: "Rol",
      render: (val: string) => (
        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
          val === 'crew' ? 'bg-roots-brown/10 text-roots-brown' : 'bg-gray-100 text-gray-600'
        }`}>
          {val === 'crew' ? <><Shield size={10} className="inline mr-1"/>Crew</> : 'Miembro'}
        </span>
      )
    },
    { key: "joinedDate", label: "Se unió" }
  ];

  return (
    <div className="flex flex-col gap-6 px-5">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold text-roots-charcoal flex items-center gap-2 mb-2">
          <Users className="text-roots-green" />
          Mi Comunidad
        </h1>
        <p className="text-sm text-foreground-muted">
          Gestiona los detalles de tu comunidad y administra a los miembros.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="glass-card p-5"
      >
        <h2 className="font-semibold text-roots-charcoal mb-4">Ajustes Generales</h2>
        <form className="flex flex-col gap-4">
          <FormField 
            label="Nombre de la Comunidad" 
            value={formData.name} 
            onChange={(v) => setFormData({...formData, name: v})} 
          />
          <FormField 
            label="Descripción" 
            type="textarea"
            value={formData.description} 
            onChange={(v) => setFormData({...formData, description: v})} 
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField 
              label="Categoría" 
              type="select"
              options={[
                { value: "Deportes", label: "Deportes" },
                { value: "Bienestar", label: "Bienestar" },
                { value: "Social", label: "Social" },
                { value: "Cultura", label: "Cultura" },
              ]}
              value={formData.category} 
              onChange={(v) => setFormData({...formData, category: v})} 
            />
            <FormField 
              label="Privacidad" 
              type="select"
              options={[
                { value: "public", label: "Pública" },
                { value: "private", label: "Privada" },
              ]}
              value={formData.privacy} 
              onChange={(v) => setFormData({...formData, privacy: v})} 
            />
          </div>
          <div className="flex items-center justify-between py-2 border-t border-roots-sand/50 mt-2">
            <div>
              <p className="text-sm font-medium text-roots-charcoal">Aprobación Automática</p>
              <p className="text-xs text-foreground-muted">Aceptar nuevos miembros sin revisión</p>
            </div>
            <FormField 
              label=""
              type="toggle"
              value={formData.autoApprove}
              onChange={(v) => setFormData({...formData, autoApprove: v})}
            />
          </div>
          <button type="button" className="mt-2 w-full bg-roots-green text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2 hover:bg-roots-green/90 transition-colors">
            <Save size={18} /> Guardar Cambios
          </button>
        </form>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 className="font-semibold text-roots-charcoal mb-4">Miembros ({mockMembers.length})</h2>
        <DataTable
          columns={columns}
          data={mockMembers}
          searchable={true}
          searchPlaceholder="Buscar miembro..."
          actions={(row) => (
            <button className="p-1.5 rounded-md hover:bg-roots-sand/30 text-foreground-muted transition-colors">
              <MoreVertical size={16} />
            </button>
          )}
        />
      </motion.div>
    </div>
  );
}
