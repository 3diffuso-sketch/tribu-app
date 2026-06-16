"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, MoreVertical, Plus } from "lucide-react";
import { DataTable } from "@/components/DataTable";
import { mockCommunities } from "@/lib/mock-data";

export default function AdminComunidadesPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
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
    {
      key: "memberCount",
      label: "Miembros",
    },
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
          <p className="text-sm text-foreground-muted">
            Supervisa las comunidades activas en TribU.
          </p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-roots-green text-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-roots-green-light transition-colors shadow-sm"
        >
          <Plus size={16} />
          Nueva Comunidad
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <DataTable
          columns={columns}
          data={mockCommunities}
          searchable={true}
          searchPlaceholder="Buscar comunidad..."
          actions={(row) => (
            <div className="flex items-center justify-end gap-1">
              <button onClick={() => alert("Gestionar subgrupos de " + row.name)} className="text-[10px] font-semibold text-roots-charcoal bg-roots-cream hover:bg-roots-sand px-2 py-1.5 rounded transition-colors">Subgrupos</button>
              <button onClick={() => alert("Comunidad pausada.")} className="text-[10px] font-semibold text-roots-orange bg-roots-orange/10 hover:bg-roots-orange/20 px-2 py-1.5 rounded transition-colors">Pausar</button>
              <button onClick={() => alert("Comunidad eliminada.")} className="text-[10px] font-semibold text-roots-red bg-roots-red/10 hover:bg-roots-red/20 px-2 py-1.5 rounded transition-colors">Eliminar</button>
            </div>
          )}
        />
      </motion.div>
      <AnimatePresence>
        {showCreateModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ background: "var(--overlay)" }} onClick={() => setShowCreateModal(false)}>
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
                    <option>Deportes</option>
                    <option>Arte</option>
                    <option>Música</option>
                    <option>Tecnología</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-roots-charcoal mb-1">Descripción</label>
                  <textarea rows={3} className="w-full bg-roots-cream/50 border border-roots-sand/40 rounded-xl py-2 px-3 text-sm focus:border-roots-green focus:outline-none" placeholder="Descripción de la comunidad..."></textarea>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button onClick={() => setShowCreateModal(false)} className="flex-1 py-3 rounded-xl bg-roots-cream text-roots-charcoal font-semibold text-sm hover:bg-roots-sand/50">Cancelar</button>
                <button onClick={() => setShowCreateModal(false)} className="flex-1 py-3 rounded-xl bg-roots-green text-white font-semibold text-sm hover:bg-roots-green-light">Crear Comunidad</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
