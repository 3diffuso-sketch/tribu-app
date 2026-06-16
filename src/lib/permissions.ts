/* ============================================================
   Permissions system for TribU role-based access
   ============================================================ */

import type { UserRole, RolePermissions } from './types';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Settings,
  Compass,
  Heart,
  User,
  MessageCircle,
  Store,
  BarChart3,
  Shield,
  CheckSquare,
  type LucideIcon,
} from 'lucide-react';

// ── Permissions map by role ──
export const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  admin: {
    canCreateCommunity: true,
    canEditCommunity: true,
    canDeleteCommunity: true,
    canCreateEvent: true,
    canEditEvent: true,
    canDeleteEvent: true,
    canManageMembers: true,
    canBanMembers: true,
    canMuteMembers: true,
    canViewStats: true,
    canViewFullStats: true,
    canContactSponsors: true,
    canManageSponsors: true,
    canAccessAdmin: true,
    canModerateEvents: true,
    canCheckInAttendees: true,
    canAssignCrew: true,
    canManageBusinessProfile: true,
    canManageCalendar: true,
    canChatWithGuias: true,
  },
  sponsor: {
    canCreateCommunity: false,
    canEditCommunity: false,
    canDeleteCommunity: false,
    canCreateEvent: false,
    canEditEvent: false,
    canDeleteEvent: false,
    canManageMembers: false,
    canBanMembers: false,
    canMuteMembers: false,
    canViewStats: false,
    canViewFullStats: false,
    canContactSponsors: false,
    canManageSponsors: false,
    canAccessAdmin: false,
    canModerateEvents: false,
    canCheckInAttendees: false,
    canAssignCrew: false,
    canManageBusinessProfile: true,
    canManageCalendar: true,
    canChatWithGuias: true,
  },
  guia: {
    canCreateCommunity: true,
    canEditCommunity: true,
    canDeleteCommunity: false,
    canCreateEvent: true,
    canEditEvent: true,
    canDeleteEvent: false,
    canManageMembers: true,
    canBanMembers: true,
    canMuteMembers: true,
    canViewStats: true,
    canViewFullStats: true,
    canContactSponsors: true,
    canManageSponsors: false,
    canAccessAdmin: false,
    canModerateEvents: true,
    canCheckInAttendees: true,
    canAssignCrew: true,
    canManageBusinessProfile: false,
    canManageCalendar: false,
    canChatWithGuias: true,
  },
  crew: {
    canCreateCommunity: false,
    canEditCommunity: false,
    canDeleteCommunity: false,
    canCreateEvent: false,
    canEditEvent: true,
    canDeleteEvent: false,
    canManageMembers: false,
    canBanMembers: false,
    canMuteMembers: true,
    canViewStats: true,
    canViewFullStats: false,
    canContactSponsors: false,
    canManageSponsors: false,
    canAccessAdmin: false,
    canModerateEvents: true,
    canCheckInAttendees: true,
    canAssignCrew: false,
    canManageBusinessProfile: false,
    canManageCalendar: false,
    canChatWithGuias: false,
  },
  usuario: {
    canCreateCommunity: false,
    canEditCommunity: false,
    canDeleteCommunity: false,
    canCreateEvent: false,
    canEditEvent: false,
    canDeleteEvent: false,
    canManageMembers: false,
    canBanMembers: false,
    canMuteMembers: false,
    canViewStats: false,
    canViewFullStats: false,
    canContactSponsors: false,
    canManageSponsors: false,
    canAccessAdmin: false,
    canModerateEvents: false,
    canCheckInAttendees: false,
    canAssignCrew: false,
    canManageBusinessProfile: false,
    canManageCalendar: false,
    canChatWithGuias: false,
  },
};

// ── Navigation items per role ──
export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export function getNavItemsForRole(role: UserRole): NavItem[] {
  switch (role) {
    case 'admin':
      return [
        { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/admin/usuarios', label: 'Usuarios', icon: Users },
        { href: '/admin/comunidades', label: 'Comunidades', icon: Compass },
        { href: '/admin/moderacion', label: 'Moderación', icon: Shield },
      ];
    case 'sponsor':
      return [
        { href: '/sponsor', label: 'Inicio', icon: Store },
        { href: '/sponsor/calendario', label: 'Calendario', icon: Calendar },
        { href: '/sponsor/chat', label: 'Chat', icon: MessageCircle },
        { href: '/perfil', label: 'Perfil', icon: User },
      ];
    case 'guia':
      return [
        { href: '/guia', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/guia/eventos', label: 'Eventos', icon: Calendar },
        { href: '/guia/sponsors', label: 'Sponsors', icon: Store },
        { href: '/perfil', label: 'Perfil', icon: User },
      ];
    case 'crew':
      return [
        { href: '/crew', label: 'Panel', icon: LayoutDashboard },
        { href: '/crew/eventos', label: 'Eventos', icon: Calendar },
        { href: '/crew/moderacion', label: 'Moderar', icon: CheckSquare },
        { href: '/perfil', label: 'Perfil', icon: User },
      ];
    case 'usuario':
    default:
      return [
        { href: '/', label: 'Explorar', icon: Compass },
        { href: '/comunidades', label: 'Comunidades', icon: Users },
        { href: '/conexiones', label: 'Conexiones', icon: Heart },
        { href: '/perfil', label: 'Perfil', icon: User },
      ];
  }
}

// ── Home route per role ──
export function getHomeRouteForRole(role: UserRole): string {
  switch (role) {
    case 'admin': return '/admin';
    case 'sponsor': return '/sponsor';
    case 'guia': return '/guia';
    case 'crew': return '/crew';
    case 'usuario':
    default: return '/';
  }
}

// ── Permission checker ──
export function hasPermission(role: UserRole, permission: keyof RolePermissions): boolean {
  return ROLE_PERMISSIONS[role]?.[permission] ?? false;
}

// ── Route access checker ──
export function canAccessRoute(role: UserRole, pathname: string): boolean {
  if (role === 'admin') return true; // Admin can access everything

  const routeRoles: Record<string, UserRole[]> = {
    '/admin': ['admin'],
    '/sponsor': ['sponsor'],
    '/guia': ['guia'],
    '/crew': ['crew'],
    '/': ['usuario', 'guia', 'crew', 'admin'],
    '/comunidades': ['usuario', 'guia', 'crew', 'admin', 'sponsor'],
    '/conexiones': ['usuario', 'admin'],
    '/perfil': ['usuario', 'guia', 'crew', 'admin', 'sponsor'],
    '/onboarding': ['usuario', 'guia', 'crew', 'admin', 'sponsor'],
    '/login': ['usuario', 'guia', 'crew', 'admin', 'sponsor'],
    '/evento': ['usuario', 'guia', 'crew', 'admin'],
  };

  // Find matching route (check most specific first)
  const sortedRoutes = Object.keys(routeRoles).sort((a, b) => b.length - a.length);
  for (const route of sortedRoutes) {
    if (pathname === route || pathname.startsWith(route + '/')) {
      return routeRoles[route].includes(role);
    }
  }

  return true; // Allow unknown routes by default
}
