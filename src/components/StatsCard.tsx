"use client";

import { motion } from "framer-motion";
import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: number;
  icon: LucideIcon;
  color?: string;
  delay?: number;
}

export function StatsCard({
  title,
  value,
  subtitle,
  trend,
  icon: Icon,
  color = "var(--roots-red)",
  delay = 0,
}: StatsCardProps) {
  const isPositive = trend && trend > 0;
  const isNegative = trend && trend < 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="glass-card p-5 relative overflow-hidden group"
    >
      <div
        className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br opacity-5 rounded-bl-full transition-transform group-hover:scale-110"
        style={{ backgroundImage: `linear-gradient(to bottom right, ${color}, transparent)` }}
      />
      
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-sm font-medium text-foreground-muted mb-1">{title}</p>
          <h3 className="text-3xl font-display font-bold text-roots-charcoal">{value}</h3>
          
          {(subtitle || trend !== undefined) && (
            <div className="flex items-center gap-2 mt-2">
              {trend !== undefined && (
                <span
                  className={`inline-flex items-center text-xs font-semibold px-1.5 py-0.5 rounded-md ${
                    isPositive
                      ? "bg-roots-green/10 text-roots-green"
                      : isNegative
                      ? "bg-roots-red/10 text-roots-red"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {isPositive ? <TrendingUp size={12} className="mr-1" /> : isNegative ? <TrendingDown size={12} className="mr-1" /> : null}
                  {Math.abs(trend)}%
                </span>
              )}
              {subtitle && <span className="text-xs text-foreground-muted">{subtitle}</span>}
            </div>
          )}
        </div>
        
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center bg-opacity-10"
          style={{ backgroundColor: `${color}1A`, color }}
        >
          <Icon size={20} strokeWidth={2} />
        </div>
      </div>
    </motion.div>
  );
}
