"use client";

import { RoleGuard } from "@/components/RoleGuard";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={["admin"]}>
      <div className="pb-24 pt-6 max-w-lg mx-auto">
        {children}
      </div>
    </RoleGuard>
  );
}
