"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Save, MoreVertical, Shield, Plus, Trash2, LayoutGrid } from "lucide-react";
import { FormField } from "@/components/FormField";
import { DataTable } from "@/components/DataTable";
import { mockCommunities } from "@/lib/mock-data";

const mockMembers = [
  { id: "m1", name: "Ana Martínez", role: "crew", joinedDate: "Enero 2025", active: true },
  { id: "m2", name: "Luis Pérez", role: "crew", joinedDate: "Febrero 2025", active: true },
  { id: "m3", name: "Roberto Gómez", role: "miembro", joinedDate: "Marzo 2025", active: true },
  { id: "m4", name: "Elena Díaz", role: "miembro", joinedDate: "Abril 2025", active: true },
];

export default function GuiaComunidadPage() {
  const guideCommunities = mockCommunities.slice(0, 3);
  const [selectedCommunityIndex, setSelectedCommunityIndex] = useState(0);
  
  const selectedCommunity = guideCommunities[selectedCommunityIndex];
  
  const [formData, setFormData] = useState({
    name: selectedCommunity.name,
    description: selectedCommunity.description,
    category: selectedCommunity.category,
    privacy: selectedCommunity.isLocked ? "private" : "public",
    autoApprove: true,
  });

  const [subgroups, setSubgroups] = useState(selectedCommunity.subgroups || []);
  const [newSubgroupName, setNewSubgroupName] = useState("");
  const [newSubgroupDesc, setNewSubgroupDesc] = useState("");

  const handleAddSubgroup = () => {
    if (subgroups.length >= 5) return;
    if (!newSubgroupName.trim()) return;
    setSubgroups([...subgroups, { id: `sub-${Date.now()}`, name: newSubgroupName, description: newSubgroupDesc }]);
    setNewSubgroupName("");
    setNewSubgroupDesc("");
  };

  const handleDeleteSubgroup = (id: string) => {
    setSubgroups(subgroups.filter(s => s.id !== id));
  };

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
    <div className="flex flex-col gap-6 px-5 pb-10">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold text-roots-charcoal flex items-center gap-2 mb-2">
          <Users className="text-roots-green" />
          Gestión de Comunidades
        </h1>
        <p className="text-sm text-foreground-muted">
          Administra tus comunidades y crea subgrupos para organizar tus eventos. (Máximo 3 comunidades).
        </p>
      </motion.div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {guideCommunities.map((c, i) => (
          <button
            key={c.id}
            onClick={() => {
              setSelectedCommunityIndex(i);
              setFormData({
                name: c.name, description: c.description, category: c.category, privacy: c.isLocked ? "private" : "public", autoApprove: true
              });
              setSubgroups(c.subgroups || []);
            }}
            className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
              selectedCommunityIndex === i ? 'bg-roots-green text-white shadow-md' : 'bg-white border border-roots-sand/60 text-roots-charcoal'
            }`}
          >
            {c.name}
          </button>
        ))}
        {guideCommunities.length < 3 && (
          <button className="px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap bg-roots-sand/30 text-roots-charcoal flex items-center gap-1 hover:bg-roots-sand/50">
            <Plus size={16} /> Nueva Comunidad
          </button>
        )}
      </div>

      <motion.div 
        key={`settings-${selectedCommunityIndex}`}
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="glass-card p-5"
      >
        <h2 className="font-semibold text-roots-charcoal mb-4 flex items-center gap-2">
          Ajustes de la Comunidad
        </h2>
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

      {/* Subgroups section */}
      <motion.div 
        key={`subgroups-${selectedCommunityIndex}`}
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="glass-card p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-roots-charcoal flex items-center gap-2">
            <LayoutGrid size={18} className="text-roots-orange" />
            Subgrupos ({subgroups.length}/5)
          </h2>
        </div>
        
        <div className="flex flex-col gap-3 mb-4">
          {subgroups.map(sub => (
            <div key={sub.id} className="flex items-center justify-between bg-white border border-roots-sand/60 p-3 rounded-xl">
              <div>
                <p className="font-semibold text-roots-charcoal text-sm">{sub.name}</p>
                <p className="text-xs text-foreground-muted">{sub.description}</p>
              </div>
              <button onClick={() => handleDeleteSubgroup(sub.id)} className="p-2 text-roots-red/70 hover:text-roots-red hover:bg-roots-red/10 rounded-lg transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          {subgroups.length === 0 && (
            <p className="text-sm text-foreground-muted text-center py-4 bg-roots-sand/10 rounded-xl">No hay subgrupos creados.</p>
          )}
        </div>

        {subgroups.length < 5 && (
          <div className="border-t border-roots-sand/50 pt-4 flex flex-col gap-3">
            <h3 className="text-sm font-medium text-roots-charcoal">Crear Nuevo Subgrupo</h3>
            <FormField label="Nombre del subgrupo" value={newSubgroupName} onChange={setNewSubgroupName} />
            <FormField label="Descripción breve" value={newSubgroupDesc} onChange={setNewSubgroupDesc} />
            <button onClick={handleAddSubgroup} className="bg-roots-charcoal text-white rounded-xl py-2.5 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-roots-charcoal/90">
              <Plus size={16} /> Añadir Subgrupo
            </button>
          </div>
        )}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
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
