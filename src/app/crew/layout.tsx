"use client";

import { RoleGuard } from "@/components/RoleGuard";

export default function CrewLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={["crew", "admin", "guia"]}>
      <div className="pb-24 pt-6 max-w-7xl mx-auto px-4 md:px-8">
        {children}
      </div>
    </RoleGuard>
  );
}
