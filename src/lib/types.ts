/* ============================================================
   Types for TribU (Roots) application
   ============================================================ */

// ── User Roles ──
export type UserRole = 'admin' | 'sponsor' | 'guia' | 'crew' | 'usuario';

// ── Existing types (preserved) ──

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  address: string;
  image: string;
  category: string;
  tags: string[];
  attendees: number;
  maxAttendees: number;
  starsReward: number;
  organizer: {
    name: string;
    avatar: string;
  };
  city: string;
  communityId?: string;
  subgroupId?: string;
  status?: 'active' | 'cancelled' | 'completed';
  crewAssigned?: string[];
}

export interface Community {
  id: string;
  name: string;
  description: string;
  image: string;
  memberCount: number;
  category: string;
  tags: string[];
  isLocked: boolean;
  requiredStars: number;
  guiaId?: string;
  guiaName?: string;
  crewIds?: string[];
  subgroups?: { id: string; name: string; description: string }[];
  merch?: MerchItem[];
  status?: 'pending' | 'active' | 'suspended';
}

export interface MerchItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  city: string;
  stars: number;
  level: number; // 1, 2, or 3
  interests: string[];
  eventsAttended: number;
  joinedDate: string;
  role: UserRole;
  email?: string;
  active?: boolean;
  joinedCommunities?: string[];
  joinedSubgroups?: string[];
  lastLeftCommunityDate?: string;
  notificationSettings?: 'all' | 'users_only' | 'none';
  isCrewRequestPending?: boolean;
}

export interface Connection {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  sharedInterests: string[];
  compatibilityScore: number; // 0–100
  isLocked: boolean;
}

export const LEVELS = {
  1: { name: "Explorador", minStars: 0, description: "Descubre eventos y empieza a conectar" },
  2: { name: "Miembro", minStars: 5, description: "Únete a comunidades afines" },
  3: { name: "Conectado", minStars: 15, description: "Desbloquea conexiones y citas" },
} as const;

export const INTEREST_TAGS = [
  "Gastronomía",
  "Senderismo",
  "Arte & Cultura",
  "Música",
  "Deportes",
  "Yoga & Bienestar",
  "Fotografía",
  "Lectura",
  "Tecnología",
  "Viajes",
  "Cine",
  "Baile",
  "Cocina",
  "Naturaleza",
  "Idiomas",
  "Voluntariado",
  "Meditación",
  "Gaming",
  "Emprendimiento",
  "Mascotas",
] as const;

// ── New types for role-based system ──

export interface SponsorProfile {
  userId: string;
  businessName: string;
  description: string;
  logo: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  socialLinks: { platform: string; url: string }[];
  category: string;
  maxCapacity: number;
  amenities: string[];
  photos: string[]; // up to 5 photos
  openTime: string;
  closeTime: string;
  availableDays: string[];
}

export interface DisponibilidadSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  available: boolean;
  reservedBy?: string;
  eventName?: string;
}

export interface Mensaje {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversacion {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  participantRole: UserRole;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export interface SponsorPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  trialDays?: number;
}

export interface AdminRequest {
  id: string;
  type: 'community_creation' | 'guia_creation';
  status: 'pending' | 'approved' | 'rejected';
  details: string;
  requestedBy: string;
  date: string;
}

export interface CommunityStats {
  communityId: string;
  totalMembers: number;
  newMembersMonth: number;
  totalEvents: number;
  eventsMonth: number;
  avgAttendance: number;
  retentionRate: number;
  monthlyGrowth: number[];
  topEvents: { name: string; attendees: number }[];
  categoryDistribution: { category: string; count: number }[];
}

export interface RolePermissions {
  canCreateCommunity: boolean;
  canEditCommunity: boolean;
  canDeleteCommunity: boolean;
  canCreateEvent: boolean;
  canEditEvent: boolean;
  canDeleteEvent: boolean;
  canManageMembers: boolean;
  canBanMembers: boolean;
  canMuteMembers: boolean;
  canViewStats: boolean;
  canViewFullStats: boolean;
  canContactSponsors: boolean;
  canManageSponsors: boolean;
  canAccessAdmin: boolean;
  canModerateEvents: boolean;
  canCheckInAttendees: boolean;
  canAssignCrew: boolean;
  canManageBusinessProfile: boolean;
  canManageCalendar: boolean;
  canChatWithGuias: boolean;
}

// ── Role metadata for UI ──
export const ROLE_META: Record<UserRole, { label: string; icon: string; color: string; description: string }> = {
  admin: {
    label: 'Administrador',
    icon: '🛡️',
    color: 'var(--roots-red)',
    description: 'Acceso total a la plataforma. Gestión de usuarios, comunidades y moderación.',
  },
  sponsor: {
    label: 'Sponsor',
    icon: '🏢',
    color: 'var(--roots-orange)',
    description: 'Negocios locales que ofrecen espacios y patrocinan eventos.',
  },
  guia: {
    label: 'Guía',
    icon: '🧭',
    color: 'var(--roots-green)',
    description: 'Gestiona comunidades, crea eventos y lidera experiencias.',
  },
  crew: {
    label: 'Crew',
    icon: '🤝',
    color: 'var(--roots-brown)',
    description: 'Ayuda a moderar y gestionar eventos asignados por el Guía.',
  },
  usuario: {
    label: 'Usuario',
    icon: '⭐',
    color: 'var(--roots-red-light)',
    description: 'Descubre eventos, únete a comunidades y conecta con personas.',
  },
};
