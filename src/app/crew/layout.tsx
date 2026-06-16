"use client";

import { RoleGuard } from "@/components/RoleGuard";

export default function CrewLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={["crew", "admin", "guia"]}>
      <div className="pb-24 pt-6 max-w-lg mx-auto">
        {children}
      </div>
    </RoleGuard>
  );
}
