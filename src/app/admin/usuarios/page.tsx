"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, MoreVertical, Shield, ShieldAlert, Star, ShieldCheck } from "lucide-react";
import { DataTable } from "@/components/DataTable";
import type { UserProfile, UserRole } from "@/lib/types";
import { defaultUsers } from "@/lib/auth-context";

// Generate mock users based on defaultUsers for the table
const mockUsersList: UserProfile[] = [
  ...Object.values(defaultUsers),
  { id: "u-1", name: "Pedro S.", avatar: "", bio: "", city: "Valencia", stars: 10, level: 2, interests: [], eventsAttended: 5, joinedDate: "Mayo 2025", role: "usuario", active: true },
  { id: "u-2", name: "Lucía G.", avatar: "", bio: "", city: "Valencia", stars: 2, level: 1, interests: [], eventsAttended: 1, joinedDate: "Junio 2025", role: "usuario", active: false },
  { id: "u-3", name: "Martín (Sponsor)", avatar: "", bio: "", city: "Valencia", stars: 0, level: 1, interests: [], eventsAttended: 0, joinedDate: "Enero 2025", role: "sponsor", active: true },
];

const roleColors: Record<UserRole, string> = {
  admin: "bg-roots-red/10 text-roots-red border-roots-red/20",
  sponsor: "bg-roots-orange/10 text-roots-orange border-roots-orange/20",
  guia: "bg-roots-green/10 text-roots-green border-roots-green/20",
  crew: "bg-roots-brown/10 text-roots-brown border-roots-brown/20",
  usuario: "bg-gray-100 text-gray-600 border-gray-200",
};

const roleIcons: Record<UserRole, React.ReactNode> = {
  admin: <ShieldAlert size={14} className="mr-1 inline" />,
  sponsor: <Star size={14} className="mr-1 inline" />,
  guia: <ShieldCheck size={14} className="mr-1 inline" />,
  crew: <Shield size={14} className="mr-1 inline" />,
  usuario: <Users size={14} className="mr-1 inline" />,
};

export default function AdminUsuariosPage() {
  const [filterRole, setFilterRole] = useState<UserRole | "todos">("todos");

  const filteredUsers = filterRole === "todos" 
    ? mockUsersList 
    : mockUsersList.filter(u => u.role === filterRole);

  const columns = [
    {
      key: "name",
      label: "Usuario",
      render: (val: string, row: UserProfile) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-roots-sand/50 flex items-center justify-center text-roots-charcoal font-bold text-xs overflow-hidden">
            {row.avatar ? <img src={row.avatar} alt={val} className="w-full h-full object-cover" /> : val.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-roots-charcoal">{val}</p>
            <p className="text-[10px] text-foreground-muted">{row.email || 'sin@email.com'}</p>
          </div>
        </div>
      )
    },
    {
      key: "role",
      label: "Rol",
      render: (val: UserRole) => (
        <span className={`px-2 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider border ${roleColors[val]}`}>
          {roleIcons[val]}
          {val}
        </span>
      )
    },
    {
      key: "joinedDate",
      label: "Registro",
    },
    {
      key: "active",
      label: "Estado",
      render: (val: boolean) => (
        <span className={`px-2 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider border ${
          val ? "bg-roots-green/10 text-roots-green border-roots-green/20" : "bg-roots-red/10 text-roots-red border-roots-red/20"
        }`}>
          {val ? 'Activo' : 'Inactivo'}
        </span>
      )
    }
  ];

  return (
    <div className="flex flex-col gap-6 px-5">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold text-roots-charcoal mb-2 flex items-center gap-2">
          <Users className="text-roots-red" />
          Gestión de Usuarios
        </h1>
        <p className="text-sm text-foreground-muted">
          Administra roles, accesos y estado de los usuarios de la plataforma.
        </p>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.1 }}
        className="flex overflow-x-auto pb-2 scrollbar-hide gap-2"
      >
        {(["todos", "admin", "sponsor", "guia", "crew", "usuario"] as const).map(role => (
          <button
            key={role}
            onClick={() => setFilterRole(role)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${
              filterRole === role 
                ? "bg-roots-charcoal text-white border-roots-charcoal" 
                : "bg-white text-roots-charcoal border-roots-sand hover:bg-roots-cream"
            }`}
          >
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <DataTable
          columns={columns}
          data={filteredUsers}
          searchable={true}
          searchPlaceholder="Buscar por nombre..."
          actions={(row) => (
            <div className="flex items-center justify-end gap-1">
              <button 
                onClick={() => alert(`Usuario ${row.name} bloqueado.`)}
                className="px-2 py-1.5 rounded text-[10px] font-bold bg-roots-red/10 text-roots-red hover:bg-roots-red/20 transition-colors"
                title="Bloquear Usuario"
              >
                Bloquear
              </button>
              <button className="p-1.5 rounded-md hover:bg-roots-sand/30 text-foreground-muted transition-colors">
                <MoreVertical size={16} />
              </button>
            </div>
          )}
        />
      </motion.div>
    </div>
  );
}
