"use client";

import { RoleGuard } from "@/components/RoleGuard";

export default function GuiaLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={["guia", "admin"]}>
      <div className="pb-24 pt-6 max-w-7xl mx-auto px-4 md:px-8">
        {children}
      </div>
    </RoleGuard>
  );
}
