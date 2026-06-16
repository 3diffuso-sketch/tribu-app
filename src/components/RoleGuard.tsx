"use client";

/* ============================================================
   RoleGuard — Route protection based on user role
   ============================================================ */

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldX } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { canAccessRoute, getHomeRouteForRole } from "@/lib/permissions";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
  const { role } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const hasAccess = allowedRoles
    ? allowedRoles.includes(role)
    : canAccessRoute(role, pathname || "/");

  useEffect(() => {
    if (!hasAccess) {
      // Redirect to role's home after a short delay to show access denied
      const timeout = setTimeout(() => {
        router.push(getHomeRouteForRole(role));
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [hasAccess, role, router]);

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center px-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-sm"
        >
          <div
            className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(196,68,42,0.1) 0%, rgba(232,145,90,0.08) 100%)",
            }}
          >
            <ShieldX size={36} className="text-roots-red" />
          </div>
          <h2 className="font-display text-2xl font-bold text-roots-charcoal mb-2">
            Acceso Denegado
          </h2>
          <p className="text-foreground-muted text-sm">
            No tienes permisos para acceder a esta sección. Redirigiendo...
          </p>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}
