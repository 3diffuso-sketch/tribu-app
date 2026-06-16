"use client";

/* ============================================================
   BottomNav — Dynamic navigation based on user role
   ============================================================ */

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { getNavItemsForRole, type NavItem } from "@/lib/permissions";

export function BottomNav() {
  const pathname = usePathname();
  const { role } = useAuth();

  // Hide nav on onboarding/auth/login pages
  if (
    pathname?.startsWith("/auth") ||
    pathname?.startsWith("/onboarding") ||
    pathname?.startsWith("/login")
  ) {
    return null;
  }

  const navItems = getNavItemsForRole(role);

  return (
    <nav className="bottom-nav" aria-label="Navegación principal">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname?.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-0.5 py-1 px-3 relative"
              aria-current={isActive ? "page" : undefined}
            >
              <div className="relative">
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  className="transition-colors duration-200"
                  style={{
                    color: isActive
                      ? "var(--roots-red)"
                      : "var(--foreground-muted)",
                  }}
                />
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ background: "var(--roots-red)" }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </div>
              <span
                className="text-[10px] font-medium transition-colors duration-200"
                style={{
                  color: isActive
                    ? "var(--roots-red)"
                    : "var(--foreground-muted)",
                }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
