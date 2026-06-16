"use client";

/* ============================================================
   RoleSwitcher — Dev tool for switching between user roles
   ============================================================ */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { ROLE_META, type UserRole } from "@/lib/types";

const roles: UserRole[] = ["admin", "sponsor", "guia", "crew", "usuario"];

export function RoleSwitcher() {
  const { role, switchRole } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const currentMeta = ROLE_META[role];

  return (
    <div className="fixed top-3 right-3 z-[100]">
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-white border border-roots-sand/60 shadow-md
          hover:shadow-lg transition-all duration-200 text-sm font-medium"
        style={{ color: currentMeta.color }}
      >
        <span className="text-base">{currentMeta.icon}</span>
        <span className="hidden sm:inline">{currentMeta.label}</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99]"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl border border-roots-sand/40 
                shadow-xl overflow-hidden z-[100]"
            >
              <div className="p-2">
                <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-foreground-muted">
                  Cambiar Rol (Dev)
                </p>

                {roles.map((r) => {
                  const meta = ROLE_META[r];
                  const isActive = r === role;

                  return (
                    <button
                      key={r}
                      onClick={() => {
                        switchRole(r);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150
                        ${isActive ? "bg-roots-cream" : "hover:bg-roots-cream/50"}`}
                    >
                      <span className="text-xl">{meta.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-sm font-medium"
                          style={{ color: meta.color }}
                        >
                          {meta.label}
                        </p>
                        <p className="text-[11px] text-foreground-muted truncate">
                          {meta.description}
                        </p>
                      </div>
                      {isActive && (
                        <Check
                          size={16}
                          className="flex-shrink-0"
                          style={{ color: meta.color }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
