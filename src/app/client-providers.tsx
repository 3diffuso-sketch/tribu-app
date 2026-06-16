"use client";

import { AuthProvider } from "@/lib/auth-context";
import { BottomNav } from "@/components/BottomNav";
import { RoleSwitcher } from "@/components/RoleSwitcher";
import { ReactNode } from "react";

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <BottomNav />
      <RoleSwitcher />
    </AuthProvider>
  );
}
