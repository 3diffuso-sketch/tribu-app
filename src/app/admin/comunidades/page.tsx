"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Plus, ChevronDown, MessageCircle } from "lucide-react";
import { DataTable } from "@/components/DataTable";
import { mockCommunities } from "@/lib/mock-data";

export default function AdminComunidadesPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCreateSubgroupModal, setShowCreateSubgroupModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const columns = [
    {
      key: "name",
      label: "Comunidad",
      render: (val: string, row: any) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-roots-sand/50 overflow-hidden shrink-0">
            <img src={row.image} alt={val} className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <p className="font-medium text-roots-charcoal truncate">{val}</p>
            <p className="text-[10px] text-foreground-muted truncate">Guía: {row.guiaName || "Sin asignar"}</p>
          </div>
        </div>
      )
    },
    {
      key: "category",
      label: "Categoría",
      render: (val: string) => (
        <span className="px-2 py-1 rounded-md text-[10px] font-semibold bg-roots-cream border border-roots-sand text-roots-charcoal">
          {val}
        </span>
      )
    },
    { key: "memberCount", label: "Miembros" },
    {
      key: "isLocked",
      label: "Acceso",
      render: (val: boolean) => (
        <span className={`px-2 py-1 rounded-md text-[10px] font-semibold border ${
          val ? "bg-roots-orange/10 text-roots-orange border-roots-orange/20" : "bg-roots-green/10 text-roots-green border-roots-green/20"
        }`}>
          {val ? 'Privada' : 'Pública'}
        </span>
      )
    }
  ];

  return (
    <div className="flex flex-col gap-6 px-5">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-roots-charcoal mb-2 flex items-center gap-2">
            <Compass className="text-roots-green" />
            Gestión de Comunidades
          </h1>
          <p className="text-sm text-foreground-muted">Supervisa las comunidades activas en TribU.</p>
        </div>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 bg-roots-green text-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-roots-green/90 transition-colors shadow-sm"
          >
            <Plus size={16} />
            Crear
            <ChevronDown size={14} className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -5, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -5, scale: 0.95 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-roots-sand/50 overflow-hidden z-30"
              >
                <button
                  onClick={() => { setShowDropdown(false); setShowCreateModal(true); }}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-roots-charcoal hover:bg-roots-cream transition-colors flex items-center gap-2"
                >
                  <Compass size={16} className="text-roots-green" />
                  Comunidad
                </button>
                <div className="border-t border-roots-sand/30" />
                <button
                  onClick={() => { setShowDropdown(false); setShowCreateSubgroupModal(true); }}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-roots-charcoal hover:bg-roots-cream transition-colors flex items-center gap-2"
                >
                  <Plus size={16} className="text-roots-orange" />
                  Subgrupo
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <DataTable
          columns={columns}
          data={mockCommunities}
          searchable={true}
          searchPlaceholder="Buscar comunidad..."
          actions={(row) => (
            <div className="flex items-center justify-end gap-1">
              <button onClick={() => alert('Abriendo chat con guía de ' + row.name + '...')} className="text-[10px] font-semibold text-white bg-roots-green hover:bg-roots-green/90 px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                <MessageCircle size={12} /> Chat
              </button>
              <button onClick={() => alert('Comunidad ' + row.name + ' pausada.')} className="text-[10px] font-semibold text-roots-orange bg-roots-orange/10 hover:bg-roots-orange/20 px-2 py-1.5 rounded-lg transition-colors">Pausar</button>
              <button onClick={() => alert('Comunidad ' + row.name + ' eliminada.')} className="text-[10px] font-semibold text-roots-red bg-roots-red/10 hover:bg-roots-red/20 px-2 py-1.5 rounded-lg transition-colors">Eliminar</button>
            </div>
          )}
        />
      </motion.div>

      <AnimatePresence>
        {showCreateModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ background: 'rgba(0,0,0,0.4)' }} onClick={() => setShowCreateModal(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl">
              <h3 className="font-display text-xl font-bold text-roots-charcoal mb-4">Crear Comunidad</h3>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-roots-charcoal mb-1">Nombre</label>
                  <input type="text" placeholder="Ej. Runners Valencia" className="w-full bg-roots-cream/50 border border-roots-sand/40 rounded-xl py-2 px-3 text-sm focus:border-roots-green focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-roots-charcoal mb-1">Categoría</label>
                  <select className="w-full bg-roots-cream/50 border border-roots-sand/40 rounded-xl py-2 px-3 text-sm focus:border-roots-green focus:outline-none">
                    <option>Deportes</option><option>Arte</option><option>Música</option><option>Tecnología</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-roots-charcoal mb-1">Descripción</label>
                  <textarea rows={3} className="w-full bg-roots-cream/50 border border-roots-sand/40 rounded-xl py-2 px-3 text-sm focus:border-roots-green focus:outline-none" placeholder="Descripción de la comunidad..." />
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowCreateModal(false)} className="flex-1 py-3 rounded-xl bg-roots-cream text-roots-charcoal font-semibold text-sm hover:bg-roots-sand/50">Cancelar</button>
                <button onClick={() => { alert('Comunidad creada exitosamente.'); setShowCreateModal(false); }} className="flex-1 py-3 rounded-xl bg-roots-green text-white font-semibold text-sm hover:bg-roots-green/90">Crear Comunidad</button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showCreateSubgroupModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ background: 'rgba(0,0,0,0.4)' }} onClick={() => setShowCreateSubgroupModal(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl">
              <h3 className="font-display text-xl font-bold text-roots-charcoal mb-4">Crear Subgrupo</h3>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-roots-charcoal mb-1">Comunidad Padre</label>
                  <select className="w-full bg-roots-cream/50 border border-roots-sand/40 rounded-xl py-2 px-3 text-sm focus:border-roots-green focus:outline-none">
                    {mockCommunities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-roots-charcoal mb-1">Nombre del Subgrupo</label>
                  <input type="text" placeholder="Ej. Trail Running" className="w-full bg-roots-cream/50 border border-roots-sand/40 rounded-xl py-2 px-3 text-sm focus:border-roots-green focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-roots-charcoal mb-1">Descripción</label>
                  <textarea rows={3} className="w-full bg-roots-cream/50 border border-roots-sand/40 rounded-xl py-2 px-3 text-sm focus:border-roots-green focus:outline-none" placeholder="Descripción del subgrupo..." />
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowCreateSubgroupModal(false)} className="flex-1 py-3 rounded-xl bg-roots-cream text-roots-charcoal font-semibold text-sm hover:bg-roots-sand/50">Cancelar</button>
                <button onClick={() => { alert('Subgrupo creado exitosamente.'); setShowCreateSubgroupModal(false); }} className="flex-1 py-3 rounded-xl bg-roots-green text-white font-semibold text-sm hover:bg-roots-green/90">Crear Subgrupo</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
