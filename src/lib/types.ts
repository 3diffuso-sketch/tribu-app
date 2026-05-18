/* ============================================================
   Types for TribU (Roots) application
   ============================================================ */

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
