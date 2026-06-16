"use client";

/* ============================================================
   Auth Context — Role-based authentication for TribU
   ============================================================ */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { UserRole, UserProfile, RolePermissions } from "./types";
import { ROLE_PERMISSIONS } from "./permissions";

interface AuthContextValue {
  user: UserProfile;
  role: UserRole;
  permissions: RolePermissions;
  switchRole: (role: UserRole) => void;
  switchUser: (userId: string) => void;
  isAuthenticated: boolean;
}

// Default users per role (imported from mock data dynamically)
const defaultUsers: Record<UserRole, UserProfile> = {
  admin: {
    id: "user-admin",
    name: "Admin TribU",
    avatar: "/images/avatars/admin.jpg",
    bio: "Administrador de la plataforma TribU.",
    city: "Valencia",
    stars: 99,
    level: 3,
    interests: [],
    eventsAttended: 0,
    joinedDate: "Enero 2024",
    role: "admin",
    email: "admin@tribu.app",
    active: true,
  },
  sponsor: {
    id: "user-sponsor",
    name: "María López",
    avatar: "/images/avatars/maria.jpg",
    bio: "Propietaria de La Terraza Valencia. Ofrecemos espacios únicos para eventos comunitarios.",
    city: "Valencia",
    stars: 0,
    level: 1,
    interests: ["Gastronomía", "Emprendimiento", "Música"],
    eventsAttended: 0,
    joinedDate: "Marzo 2025",
    role: "sponsor",
    email: "maria@laterraza.es",
    active: true,
  },
  guia: {
    id: "user-guia",
    name: "Carlos Navarro",
    avatar: "/images/avatars/carlos.jpg",
    bio: "Guía de comunidades de bienestar y deporte en Valencia. Creo experiencias que conectan personas.",
    city: "Valencia",
    stars: 45,
    level: 3,
    interests: ["Yoga & Bienestar", "Senderismo", "Meditación", "Deportes"],
    eventsAttended: 34,
    joinedDate: "Febrero 2025",
    role: "guia",
    email: "carlos@tribu.app",
    active: true,
  },
  crew: {
    id: "user-crew",
    name: "Ana Martínez",
    avatar: "/images/avatars/ana.jpg",
    bio: "Crew de la comunidad Runners de Valencia. Ayudo a organizar eventos y moderar la comunidad.",
    city: "Valencia",
    stars: 20,
    level: 2,
    interests: ["Deportes", "Senderismo", "Fotografía"],
    eventsAttended: 15,
    joinedDate: "Abril 2025",
    role: "crew",
    email: "ana@tribu.app",
    active: true,
  },
  usuario: {
    id: "user-1",
    name: "Álex",
    avatar: "/images/avatars/alex.jpg",
    bio: "Amante de la naturaleza y la buena comida. Siempre buscando nuevas experiencias en Valencia.",
    city: "Valencia",
    stars: 3,
    level: 1,
    interests: ["Senderismo", "Gastronomía", "Fotografía", "Yoga & Bienestar"],
    eventsAttended: 3,
    joinedDate: "Abril 2025",
    role: "usuario",
    email: "alex@email.com",
    active: true,
  },
};

const STORAGE_KEY = "tribu-current-role";

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>("usuario");
  const [user, setUser] = useState<UserProfile>(defaultUsers.usuario);

  // Restore role from localStorage on mount
  useEffect(() => {
    const savedRole = localStorage.getItem(STORAGE_KEY) as UserRole | null;
    if (savedRole && defaultUsers[savedRole]) {
      setRole(savedRole);
      setUser(defaultUsers[savedRole]);
    }
  }, []);

  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
    setUser(defaultUsers[newRole]);
    localStorage.setItem(STORAGE_KEY, newRole);
  };

  const switchUser = (userId: string) => {
    const found = Object.values(defaultUsers).find((u) => u.id === userId);
    if (found) {
      setRole(found.role);
      setUser(found);
      localStorage.setItem(STORAGE_KEY, found.role);
    }
  };

  const permissions = ROLE_PERMISSIONS[role];

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        permissions,
        switchRole,
        switchUser,
        isAuthenticated: true,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Export default users for use in mock-data and other components
export { defaultUsers };
