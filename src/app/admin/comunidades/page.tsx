"use client";

import { motion } from "framer-motion";
import { Compass, MoreVertical } from "lucide-react";
import { DataTable } from "@/components/DataTable";
import { mockCommunities } from "@/lib/mock-data";

export default function AdminComunidadesPage() {
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
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold text-roots-charcoal mb-2 flex items-center gap-2">
          <Compass className="text-roots-green" />
          Gestión de Comunidades
        </h1>
        <p className="text-sm text-foreground-muted">
          Supervisa las comunidades activas en TribU.
        </p>
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
            <button className="p-1.5 rounded-md hover:bg-roots-sand/30 text-foreground-muted transition-colors">
              <MoreVertical size={16} />
            </button>
          )}
        />
      </motion.div>
    </div>
  );
}
