"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import {
  Users,
  Compass,
  Calendar,
  Store,
  Activity,
  AlertTriangle,
  TrendingUp,
  Filter,
  CheckCircle,
  XCircle,
  MessageCircle,
  ShieldAlert,
  DollarSign,
  PieChart,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { MiniChart } from "@/components/MiniChart";
import { mockAdminRequests, mockRevenueData } from "@/lib/mock-data";

/* ──────────────────────────────────────────────
   Mock datasets per date-filter
   ────────────────────────────────────────────── */

type DateFilterKey = "hoy" | "esta-semana" | "este-mes" | "trimestre" | "este-ano" | "historico";

interface RevenueDataset {
  totalRevenue: string;
  mrr: string;
  arr: string;
  churn: string;
  arpu: string;
  ltv: string;
  cac: string;
  roi: string;
  roiPositive: boolean;
  sponsorsPercent: number;
  membresiasPercent: number;
  merchPercent: number;
  trendData: number[];
  trendLabels: string[];
}

const revenueByFilter: Record<DateFilterKey, RevenueDataset> = {
  hoy: {
    totalRevenue: "€580",
    mrr: "€4,500",
    arr: "€54,000",
    churn: "1.8%",
    arpu: "€11.20",
    ltv: "€165",
    cac: "€7.50",
    roi: "+140%",
    roiPositive: true,
    sponsorsPercent: 55,
    membresiasPercent: 30,
    merchPercent: 15,
    trendData: [480, 520, 560, 530, 570, 580],
    trendLabels: ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00"],
  },
  "esta-semana": {
    totalRevenue: "€3,800",
    mrr: "€4,500",
    arr: "€54,000",
    churn: "2.0%",
    arpu: "€11.80",
    ltv: "€172",
    cac: "€7.90",
    roi: "+145%",
    roiPositive: true,
    sponsorsPercent: 58,
    membresiasPercent: 27,
    merchPercent: 15,
    trendData: [450, 520, 580, 610, 550, 690],
    trendLabels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
  },
  "este-mes": {
    totalRevenue: "€15,200",
    mrr: "€4,500",
    arr: "€54,000",
    churn: "2.3%",
    arpu: "€12.50",
    ltv: "€180",
    cac: "€8.20",
    roi: "+152%",
    roiPositive: true,
    sponsorsPercent: 60,
    membresiasPercent: 25,
    merchPercent: 15,
    trendData: [1200, 1800, 2400, 2100, 3200, 4500],
    trendLabels: ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5", "Sem 6"],
  },
  trimestre: {
    totalRevenue: "€42,600",
    mrr: "€4,500",
    arr: "€54,000",
    churn: "2.5%",
    arpu: "€12.00",
    ltv: "€175",
    cac: "€8.80",
    roi: "+136%",
    roiPositive: true,
    sponsorsPercent: 62,
    membresiasPercent: 24,
    merchPercent: 14,
    trendData: [12800, 13500, 14200, 14800, 15200, 15600],
    trendLabels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
  },
  "este-ano": {
    totalRevenue: "€98,400",
    mrr: "€4,500",
    arr: "€54,000",
    churn: "2.8%",
    arpu: "€11.90",
    ltv: "€170",
    cac: "€9.10",
    roi: "+120%",
    roiPositive: true,
    sponsorsPercent: 58,
    membresiasPercent: 26,
    merchPercent: 16,
    trendData: [6200, 7100, 8400, 9200, 10800, 12500],
    trendLabels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
  },
  historico: {
    totalRevenue: "€215,000",
    mrr: "€4,500",
    arr: "€54,000",
    churn: "3.1%",
    arpu: "€10.80",
    ltv: "€155",
    cac: "€10.50",
    roi: "+95%",
    roiPositive: true,
    sponsorsPercent: 55,
    membresiasPercent: 28,
    merchPercent: 17,
    trendData: [3200, 5400, 8100, 12500, 15200, 18600],
    trendLabels: ["2024-Q1", "2024-Q2", "2024-Q3", "2024-Q4", "2025-Q1", "2025-Q2"],
  },
};

const dateFilterLabels: { key: DateFilterKey; label: string }[] = [
  { key: "hoy", label: "Hoy" },
  { key: "esta-semana", label: "Esta Semana" },
  { key: "este-mes", label: "Este Mes" },
  { key: "trimestre", label: "Trimestre" },
  { key: "este-ano", label: "Este Año" },
  { key: "historico", label: "Histórico" },
];

const quickActions = [
  { label: "Chat", href: "/admin/chat", icon: MessageCircle, color: "roots-red" },
  { label: "Sponsors", href: "/admin/sponsors", icon: Store, color: "roots-brown" },
  { label: "Usuarios", href: "/admin/usuarios", icon: Users, color: "roots-orange" },
  { label: "Comunidades", href: "/admin/comunidades", icon: Compass, color: "roots-green" },
  { label: "Eventos", href: "/admin/eventos", icon: Calendar, color: "roots-red" },
  { label: "Moderación", href: "/admin/moderacion", icon: ShieldAlert, color: "roots-charcoal" },
];

/* ──────────────────────────────────────────────
   Component
   ────────────────────────────────────────────── */

export default function AdminDashboard() {
  const [dateFilter, setDateFilter] = useState<DateFilterKey>("este-mes");
  const [alertReviewed, setAlertReviewed] = useState(false);
  const [alertApproved, setAlertApproved] = useState(false);

  const dataset = revenueByFilter[dateFilter];
  const growthData = [20, 35, 45, 60, 78, 95, 120, 156];
  const revenueValues = mockRevenueData.map((d) => d.amount);

  const recentActivity = [
    { id: 1, action: "Nuevo usuario registrado", user: "Laura M.", time: "Hace 10 min", type: "user" },
    { id: 2, action: "Comunidad creada", user: "Carlos N. (Guía)", time: "Hace 2 horas", type: "community" },
    { id: 3, action: "Sponsor verificado", user: "La Terraza Valencia", time: "Hace 5 horas", type: "sponsor" },
    { id: 4, action: "Evento completado", user: "Ruta Senderismo", time: "Ayer", type: "event" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  /* ── Donut chart segments (SVG) ── */
  const donutSegments = [
    { label: "Sponsors Plans", percent: dataset.sponsorsPercent, color: "var(--roots-green)" },
    { label: "Membresías", percent: dataset.membresiasPercent, color: "var(--roots-orange)" },
    { label: "Merchandising", percent: dataset.merchPercent, color: "var(--roots-brown)" },
  ];

  /* ── Revenue line chart with gradient (SVG) ── */
  const chartW = 320;
  const chartH = 100;
  const tData = dataset.trendData;
  const tMax = Math.max(...tData);
  const tMin = Math.min(...tData);
  const tRange = tMax - tMin || 1;

  const linePoints = tData.map((v, i) => {
    const x = (i / (tData.length - 1)) * chartW;
    const y = chartH - ((v - tMin) / tRange) * (chartH - 10) - 5;
    return { x, y };
  });

  const linePath = linePoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x},${p.y}`).join(" ");
  const fillPath = `${linePath} L ${chartW},${chartH} L 0,${chartH} Z`;

  /* ── Donut SVG math ── */
  const donutR = 15.9155;
  const donutCirc = 2 * Math.PI * donutR;

  return (
    <div className="flex flex-col gap-6 px-5 pb-10">
      {/* ── Header ── */}
      <motion.div initial="hidden" animate="visible" variants={containerVariants}>
        <motion.h1 variants={itemVariants} className="text-3xl font-display font-bold mb-1">
          <span className="gradient-text bg-gradient-to-r from-roots-red to-roots-orange">
            Panel de Administración
          </span>
        </motion.h1>
        <motion.p variants={itemVariants} className="text-foreground-muted mb-6">
          Visión general de la plataforma TribU.
        </motion.p>
      </motion.div>

      {/* ══════════════════════════════════════════
          1. REVENUE METRICS SECTION
          ══════════════════════════════════════════ */}

      {/* Date Filters – pill row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="flex items-center gap-2 flex-wrap bg-roots-cream/50 p-3 rounded-xl border border-roots-sand/40"
      >
        <Filter size={16} className="text-roots-orange mr-1" />
        {dateFilterLabels.map((f) => (
          <button
            key={f.key}
            onClick={() => setDateFilter(f.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              dateFilter === f.key
                ? "bg-roots-green text-white shadow-sm"
                : "bg-white text-roots-charcoal border border-roots-sand/50 hover:bg-roots-sand/30"
            }`}
          >
            {f.label}
          </button>
        ))}
      </motion.div>

      {/* Top revenue cards row */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
      >
        {/* Total Revenue */}
        <div className="glass-card p-4 col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-roots-green/10 flex items-center justify-center">
              <DollarSign size={18} className="text-roots-green" />
            </div>
            <span className="text-xs text-foreground-muted font-medium">Total Revenue</span>
          </div>
          <p className="text-3xl font-display font-bold text-roots-charcoal">{dataset.totalRevenue}</p>
          <div className="flex items-center gap-1 mt-1">
            <ArrowUpRight size={14} className="text-roots-green" />
            <span className="text-xs text-roots-green font-semibold">+18%</span>
            <span className="text-[10px] text-foreground-muted">vs anterior</span>
          </div>
        </div>

        {/* MRR */}
        <div className="glass-card p-4">
          <p className="text-[10px] uppercase tracking-wider text-foreground-muted font-semibold mb-1">MRR</p>
          <p className="text-xl font-bold text-roots-charcoal">{dataset.mrr}</p>
          <div className="flex items-center gap-1 mt-1">
            <ArrowUpRight size={12} className="text-roots-green" />
            <span className="text-[10px] text-roots-green font-medium">+8%</span>
          </div>
        </div>

        {/* ARR */}
        <div className="glass-card p-4">
          <p className="text-[10px] uppercase tracking-wider text-foreground-muted font-semibold mb-1">ARR Estimado</p>
          <p className="text-xl font-bold text-roots-charcoal">{dataset.arr}</p>
          <div className="flex items-center gap-1 mt-1">
            <ArrowUpRight size={12} className="text-roots-green" />
            <span className="text-[10px] text-roots-green font-medium">+12%</span>
          </div>
        </div>

        {/* Churn */}
        <div className="glass-card p-4">
          <p className="text-[10px] uppercase tracking-wider text-foreground-muted font-semibold mb-1">Churn Rate</p>
          <p className="text-xl font-bold text-roots-charcoal">{dataset.churn}</p>
          <div className="flex items-center gap-1 mt-1">
            <ArrowDownRight size={12} className="text-roots-red" />
            <span className="text-[10px] text-roots-red font-medium">+0.3%</span>
          </div>
        </div>
      </motion.div>

      {/* Revenue breakdown + trend row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Donut – Revenue by Source */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card p-5"
        >
          <h3 className="font-semibold text-roots-charcoal mb-4 flex items-center gap-2">
            <PieChart size={18} className="text-roots-orange" />
            Revenue por Fuente
          </h3>
          <div className="flex items-center gap-6">
            {/* SVG Donut */}
            <svg width={100} height={100} viewBox="0 0 36 36" className="transform -rotate-90 flex-shrink-0">
              {(() => {
                let offset = 0;
                return donutSegments.map((seg, i) => {
                  const dash = (seg.percent / 100) * donutCirc;
                  const gap = donutCirc - dash;
                  const el = (
                    <circle
                      key={i}
                      cx="18"
                      cy="18"
                      r={donutR}
                      fill="transparent"
                      stroke={seg.color}
                      strokeWidth="4"
                      strokeDasharray={`${dash} ${gap}`}
                      strokeDashoffset={-offset}
                      strokeLinecap="round"
                      className="transition-all duration-500"
                    />
                  );
                  offset += dash;
                  return el;
                });
              })()}
            </svg>

            {/* Legend */}
            <div className="flex flex-col gap-2">
              {donutSegments.map((seg, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: seg.color }} />
                  <div>
                    <p className="text-xs font-medium text-roots-charcoal">{seg.label}</p>
                    <p className="text-[10px] text-foreground-muted">{seg.percent}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Line chart – Revenue Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-5"
        >
          <h3 className="font-semibold text-roots-charcoal mb-4 flex items-center gap-2">
            <BarChart3 size={18} className="text-roots-green" />
            Tendencia de Revenue
          </h3>
          <svg
            width="100%"
            height={chartH}
            viewBox={`0 0 ${chartW} ${chartH}`}
            preserveAspectRatio="none"
            className="overflow-visible"
          >
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--roots-green)" stopOpacity="0.25" />
                <stop offset="100%" stopColor="var(--roots-green)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={fillPath} fill="url(#revGrad)" />
            <path
              d={linePath}
              fill="none"
              stroke="var(--roots-green)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {linePoints.map((p, i) => (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r="3"
                fill="white"
                stroke="var(--roots-green)"
                strokeWidth="2"
              />
            ))}
          </svg>
          {/* X-axis labels */}
          <div className="flex justify-between mt-2">
            {dataset.trendLabels.map((l, i) => (
              <span key={i} className="text-[9px] text-foreground-muted">
                {l}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Revenue KPIs row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
      >
        {[
          { label: "ARPU", value: dataset.arpu, positive: true },
          { label: "LTV", value: dataset.ltv, positive: true },
          { label: "CAC", value: dataset.cac, positive: false },
          { label: "ROI", value: dataset.roi, positive: dataset.roiPositive },
        ].map((kpi) => (
          <div key={kpi.label} className="glass-card p-3 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-foreground-muted font-semibold">{kpi.label}</p>
              <p className="text-lg font-bold text-roots-charcoal">{kpi.value}</p>
            </div>
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center ${
                kpi.positive ? "bg-roots-green/10" : "bg-roots-red/10"
              }`}
            >
              {kpi.positive ? (
                <ArrowUpRight size={14} className="text-roots-green" />
              ) : (
                <ArrowDownRight size={14} className="text-roots-red" />
              )}
            </div>
          </div>
        ))}
      </motion.div>

      {/* ══════════════════════════════════════════
          2. QUICK ACTION BUTTONS
          ══════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap gap-2"
      >
        {quickActions.map((qa) => {
          const Icon = qa.icon;
          return (
            <Link
              key={qa.label}
              href={qa.href}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all
                bg-${qa.color}/10 text-${qa.color} hover:bg-${qa.color}/20 border border-${qa.color}/20 hover:shadow-sm`}
              style={{
                backgroundColor: `var(--${qa.color}, #666)1A`,
                color: `var(--${qa.color}, #666)`,
                borderColor: `var(--${qa.color}, #666)33`,
              }}
            >
              <Icon size={16} />
              {qa.label}
            </Link>
          );
        })}
      </motion.div>

      {/* ══════════════════════════════════════════
          3. STATS CARDS
          ══════════════════════════════════════════ */}
      <div className="grid grid-cols-2 gap-3">
        <StatsCard title="Usuarios" value={156} trend={12} icon={Users} color="var(--roots-red)" delay={0.35} />
        <StatsCard title="Comunidades" value={4} trend={5} icon={Compass} color="var(--roots-green)" delay={0.4} />
        <StatsCard title="Eventos (Mes)" value={12} trend={20} icon={Calendar} color="var(--roots-orange)" delay={0.45} />
        <StatsCard title="Sponsors" value={8} trend={15} icon={Store} color="var(--roots-brown)" delay={0.5} />
      </div>

      {/* ══════════════════════════════════════════
          4. USER GROWTH CHART
          ══════════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="glass-card p-5"
        >
          <h3 className="font-semibold text-roots-charcoal mb-4 flex items-center gap-2">
            <Activity size={18} className="text-roots-red" />
            Crecimiento de Usuarios
          </h3>
          <MiniChart type="line" data={growthData} height={80} />
        </motion.div>

        {/* Revenue bar chart (original) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card p-5"
        >
          <h3 className="font-semibold text-roots-charcoal mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-roots-green" />
            Métricas de Revenue (EUR)
          </h3>
          <MiniChart
            type="bar"
            data={revenueValues}
            labels={mockRevenueData.map((d) => d.month)}
            color="var(--roots-green)"
            height={80}
          />
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════
          5. RECENT ACTIVITY  &  6. ALERTS
          ══════════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.65 }}
          className="glass-card p-5"
        >
          <h3 className="font-semibold text-roots-charcoal mb-4">Actividad Reciente</h3>
          <div className="flex flex-col gap-4">
            {recentActivity.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between border-b border-roots-sand/30 pb-3 last:border-0 last:pb-0"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-roots-charcoal">{item.action}</p>
                  <p className="text-xs text-foreground-muted">{item.user}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                  <span className="text-[10px] text-foreground-muted">{item.time}</span>
                  <button
                    onClick={() => alert(`Abriendo chat con ${item.user}...`)}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-roots-red/10 text-roots-red text-[10px] font-semibold hover:bg-roots-red/20 transition-colors"
                  >
                    <MessageCircle size={10} />
                    Chatear
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Alerts */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-card p-5 border-l-4 border-l-roots-orange"
        >
          <h3 className="font-semibold text-roots-charcoal mb-4 flex items-center gap-2">
            <AlertTriangle size={18} className="text-roots-orange" />
            Alertas Pendientes
          </h3>
          <div className="flex flex-col gap-3">
            {/* Alert 1 – Revisar */}
            <div className="bg-roots-cream p-3 rounded-lg border border-roots-sand/50">
              <p className="text-sm font-medium text-roots-charcoal">Reporte de usuario</p>
              <p className="text-xs text-foreground-muted mt-1">
                Usuario &quot;Juan_88&quot; reportado por spam en comunidad Yoga.
              </p>
              <button
                disabled={alertReviewed}
                onClick={() => {
                  alert('Reporte revisado: Usuario "Juan_88"');
                  setAlertReviewed(true);
                }}
                className={`mt-2 text-xs font-semibold transition-colors inline-flex items-center gap-1 px-2 py-1 rounded ${
                  alertReviewed
                    ? "bg-roots-green/10 text-roots-green cursor-default"
                    : "text-roots-red hover:bg-roots-red/10"
                }`}
              >
                {alertReviewed ? (
                  <>
                    <CheckCircle size={12} /> Revisado ✓
                  </>
                ) : (
                  "Revisar"
                )}
              </button>
            </div>

            {/* Alert 2 – Aprobar */}
            <div className="bg-roots-cream p-3 rounded-lg border border-roots-sand/50">
              <p className="text-sm font-medium text-roots-charcoal">Solicitud Sponsor</p>
              <p className="text-xs text-foreground-muted mt-1">
                Nuevo negocio &quot;Café Central&quot; requiere verificación.
              </p>
              <button
                disabled={alertApproved}
                onClick={() => {
                  alert('Sponsor aprobado: "Café Central"');
                  setAlertApproved(true);
                }}
                className={`mt-2 text-xs font-semibold transition-colors inline-flex items-center gap-1 px-2 py-1 rounded ${
                  alertApproved
                    ? "bg-roots-green/10 text-roots-green cursor-default"
                    : "text-roots-green hover:bg-roots-green/10"
                }`}
              >
                {alertApproved ? (
                  <>
                    <CheckCircle size={12} /> Aprobado ✓
                  </>
                ) : (
                  "Aprobar"
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════
            7. PETICIONES DE CREACIÓN
            ══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="glass-card p-5 border-l-4 border-l-roots-green md:col-span-2"
        >
          <h3 className="font-semibold text-roots-charcoal mb-4 flex items-center gap-2">
            <Compass size={18} className="text-roots-green" />
            Peticiones de Creación
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {mockAdminRequests.map((req) => (
              <div
                key={req.id}
                className="bg-roots-cream p-3 rounded-lg border border-roots-sand/50 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold uppercase text-roots-green bg-roots-green/10 px-2 py-0.5 rounded">
                      {req.type === "community_creation" ? "Comunidad" : "Guía"}
                    </span>
                    <span className="text-[10px] text-foreground-muted">{req.date}</span>
                  </div>
                  <p className="text-sm font-medium text-roots-charcoal">{req.details}</p>
                  <p className="text-xs text-foreground-muted mt-1">Por: {req.requestedBy}</p>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => alert(`Aprobada: ${req.details}`)}
                    className="flex items-center justify-center gap-1 flex-1 py-1.5 rounded bg-roots-green/10 text-roots-green font-semibold text-xs hover:bg-roots-green/20"
                  >
                    <CheckCircle size={14} /> Aprobar
                  </button>
                  <button
                    onClick={() => alert(`Rechazada: ${req.details}`)}
                    className="flex items-center justify-center gap-1 flex-1 py-1.5 rounded bg-roots-red/10 text-roots-red font-semibold text-xs hover:bg-roots-red/20"
                  >
                    <XCircle size={14} /> Rechazar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
