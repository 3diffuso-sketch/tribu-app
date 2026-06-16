"use client";

import { RoleGuard } from "@/components/RoleGuard";

export default function SponsorLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={["sponsor", "admin"]}>
      <div className="pb-24 pt-6 max-w-lg mx-auto">
        {children}
      </div>
    </RoleGuard>
  );
}
