"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Store, MessageCircle, Eye, Ban } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { DataTable } from "@/components/DataTable";

type SponsorStatus = "activo" | "pendiente" | "suspendido";
type SponsorPlan = "Básico" | "Pro" | "Premium";

interface Sponsor {
  id: string;
  name: string;
  category: string;
  plan: SponsorPlan;
  revenue: number;
  status: SponsorStatus;
  date: string;
}

const mockSponsors: Sponsor[] = [
  { id: "s1", name: "La Terraza Valencia", category: "Restaurante", plan: "Pro", revenue: 790, status: "activo", date: "Ene 2025" },
  { id: "s2", name: "Café Central", category: "Cafetería", plan: "Básico", revenue: 290, status: "pendiente", date: "May 2025" },
  { id: "s3", name: "CoWork Hub", category: "Coworking", plan: "Premium", revenue: 1990, status: "activo", date: "Mar 2025" },
  { id: "s4", name: "Yoga Zen", category: "Bienestar", plan: "Pro", revenue: 790, status: "activo", date: "Feb 2025" },
  { id: "s5", name: "Bar El Rincón", category: "Bar", plan: "Básico", revenue: 290, status: "suspendido", date: "Nov 2024" },
  { id: "s6", name: "Sala Matisse", category: "Salón", plan: "Pro", revenue: 790, status: "activo", date: "Abr 2025" },
  { id: "s7", name: "Parque Activo", category: "Parque", plan: "Básico", revenue: 290, status: "activo", date: "Jun 2025" },
  { id: "s8", name: "Tech Space VLC", category: "Coworking", plan: "Premium", revenue: 1990, status: "activo", date: "Dic 2024" },
];

const planColors: Record<SponsorPlan, string> = {
  "Básico": "bg-gray-100 text-gray-600 border-gray-200",
  "Pro": "bg-roots-orange/10 text-roots-orange border-roots-orange/20",
  "Premium": "bg-roots-red/10 text-roots-red border-roots-red/20",
};

const statusColors: Record<SponsorStatus, string> = {
  activo: "bg-roots-green/10 text-roots-green border-roots-green/20",
  pendiente: "bg-roots-orange/10 text-roots-orange border-roots-orange/20",
  suspendido: "bg-roots-red/10 text-roots-red border-roots-red/20",
};

const statusLabels: Record<SponsorStatus, string> = {
  activo: "Activo",
  pendiente: "Pendiente",
  suspendido: "Suspendido",
};

type FilterTab = "todos" | SponsorStatus;

export default function AdminSponsorsPage() {
  const [filterTab, setFilterTab] = useState<FilterTab>("todos");

  const filteredSponsors =
    filterTab === "todos"
      ? mockSponsors
      : mockSponsors.filter((s) => s.status === filterTab);

  const columns = [
    {
      key: "name",
      label: "Negocio",
      render: (val: string, row: Sponsor) => (
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-roots-charcoal">{val}</p>
          <span className="inline-block w-fit px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-roots-sand/40 text-roots-brown border border-roots-sand/60">
            {row.category}
          </span>
        </div>
      ),
    },
    {
      key: "plan",
      label: "Plan",
      render: (val: SponsorPlan) => (
        <span
          className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border ${planColors[val]}`}
        >
          {val}
        </span>
      ),
    },
    {
      key: "revenue",
      label: "Revenue Mensual",
      render: (val: number) => (
        <span className="font-semibold text-roots-charcoal">
          €{val.toLocaleString("es-ES")}
        </span>
      ),
    },
    {
      key: "status",
      label: "Estado",
      render: (val: SponsorStatus) => (
        <span
          className={`px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider border ${statusColors[val]}`}
        >
          {statusLabels[val]}
        </span>
      ),
    },
    {
      key: "date",
      label: "Fecha Alta",
    },
  ];

  return (
    <div className="flex flex-col gap-6 px-5">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold text-roots-charcoal mb-2 flex items-center gap-2">
          <Store className="text-roots-red" />
          Gestión de Sponsors
        </h1>
        <p className="text-sm text-foreground-muted">
          Administra sponsors, planes y revenue de la plataforma.
        </p>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Sponsors"
          value={8}
          icon={Store}
          color="var(--roots-charcoal)"
          delay={0}
        />
        <StatsCard
          title="Sponsors Activos"
          value={6}
          trend={10}
          icon={Store}
          color="var(--roots-green)"
          delay={0.05}
        />
        <StatsCard
          title="Revenue Sponsors"
          value="€4,500/mes"
          icon={Store}
          color="var(--roots-orange)"
          delay={0.1}
        />
        <StatsCard
          title="Pendientes Verificación"
          value={2}
          icon={Store}
          color="var(--roots-red)"
          delay={0.15}
        />
      </div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex overflow-x-auto pb-2 scrollbar-hide gap-2"
      >
        {(
          [
            { key: "todos", label: "Todos" },
            { key: "activo", label: "Activos" },
            { key: "pendiente", label: "Pendientes" },
            { key: "suspendido", label: "Suspendidos" },
          ] as const
        ).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilterTab(tab.key)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${
              filterTab === tab.key
                ? "bg-roots-charcoal text-white border-roots-charcoal"
                : "bg-white text-roots-charcoal border-roots-sand hover:bg-roots-cream"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Data Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <DataTable
          columns={columns}
          data={filteredSponsors}
          searchable={true}
          searchPlaceholder="Buscar sponsor..."
          actions={(row: Sponsor) => (
            <>
              <button
                onClick={() => alert(`Abriendo chat con ${row.name}...`)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-bold bg-roots-green/10 text-roots-green hover:bg-roots-green/20 hover:shadow-sm transition-all"
                title="Chatear"
              >
                <MessageCircle size={13} />
                Chatear
              </button>
              <button
                onClick={() => alert(`Viendo perfil de ${row.name}`)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-bold bg-roots-brown/10 text-roots-brown hover:bg-roots-brown/20 hover:shadow-sm transition-all"
                title="Ver Perfil"
              >
                <Eye size={13} />
                Ver Perfil
              </button>
              <button
                onClick={() => alert("Sponsor suspendido")}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-bold bg-roots-red/10 text-roots-red hover:bg-roots-red/20 hover:shadow-sm transition-all"
                title="Suspender"
              >
                <Ban size={13} />
                Suspender
              </button>
            </>
          )}
        />
      </motion.div>
    </div>
  );
}
