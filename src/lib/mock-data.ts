/* ============================================================
   Mock data for TribU MVP — Valencia
   ============================================================ */

import type { Event, Community, UserProfile, Connection } from "./types";

const today = new Date();
const addDays = (d: Date, days: number) => {
  const newDate = new Date(d);
  newDate.setDate(newDate.getDate() + days);
  return newDate.toISOString();
};

export const mockEvents: Event[] = [
  {
    id: "ev-1",
    title: "Paseo nocturno por el Turia con tapas",
    description: "Una ruta guiada por los Jardines del Turia al atardecer, seguida de una parada en un bar de tapas local. Ideal para conocer gente nueva en un ambiente relajado.",
    date: addDays(today, 1),
    time: "19:30",
    location: "Jardines del Turia",
    address: "Pont de Fusta, Valencia",
    image: "/images/events/turia-walk.jpg",
    category: "Senderismo",
    tags: ["Naturaleza", "Gastronomía", "Viajes"],
    attendees: 14,
    maxAttendees: 20,
    starsReward: 2,
    organizer: { name: "Marina R.", avatar: "/images/avatars/marina.jpg" },
    city: "Valencia",
    communityId: "com-1",
    subgroupId: "sub-1",
    status: "active"
  },
  {
    id: "ev-2",
    title: "Taller de cerámica artesanal",
    description: "Aprende técnicas básicas de modelado y esmaltado. Cada participante se lleva su pieza a casa. Incluye materiales y bebida de bienvenida.",
    date: addDays(today, 4),
    time: "11:00",
    location: "Barrio del Carmen",
    address: "C/ Caballeros 38, Valencia",
    image: "/images/events/ceramica.jpg",
    category: "Arte & Cultura",
    tags: ["Arte & Cultura", "Cocina", "Emprendimiento"],
    attendees: 8,
    maxAttendees: 12,
    starsReward: 3,
    organizer: { name: "Pablo G.", avatar: "/images/avatars/pablo.jpg" },
    city: "Valencia",
    communityId: "com-3",
    subgroupId: "sub-3",
    status: "active"
  },
  {
    id: "ev-3",
    title: "Sesión de yoga al amanecer en la Malvarrosa",
    description: "Saluda al sol con una clase de Vinyasa Flow frente al mar. Trae tu esterilla. Todos los niveles bienvenidos.",
    date: addDays(today, 2),
    time: "07:00",
    location: "Playa de la Malvarrosa",
    address: "Paseo Marítimo, Valencia",
    image: "/images/events/yoga-playa.jpg",
    category: "Yoga & Bienestar",
    tags: ["Yoga & Bienestar", "Deportes", "Meditación"],
    attendees: 22,
    maxAttendees: 25,
    starsReward: 2,
    organizer: { name: "Lucía S.", avatar: "/images/avatars/lucia.jpg" },
    city: "Valencia",
    communityId: "com-1",
    subgroupId: "sub-2",
    status: "active"
  },
  {
    id: "ev-4",
    title: "Club de lectura: ficción latinoamericana",
    description: "Comentamos 'La casa de los espíritus' de Isabel Allende. Café y pastas incluidos. Espacio íntimo para compartir ideas.",
    date: addDays(today, 8),
    time: "18:00",
    location: "Librería Bartleby",
    address: "C/ Cervantes 18, Valencia",
    image: "/images/events/club-lectura.jpg",
    category: "Lectura",
    tags: ["Lectura", "Arte & Cultura", "Idiomas"],
    attendees: 6,
    maxAttendees: 10,
    starsReward: 2,
    organizer: { name: "Andrea M.", avatar: "/images/avatars/andrea.jpg" },
    city: "Valencia",
    communityId: "com-4",
    subgroupId: "sub-5",
    status: "active"
  },
  {
    id: "ev-5",
    title: "Ruta gastronómica por Ruzafa",
    description: "Descubre los mejores rincones culinarios del barrio más vibrante de Valencia. 5 paradas, 5 sabores diferentes.",
    date: addDays(today, 12), // Más de 10 días, no debería aparecer en próximos 10 días
    time: "13:00",
    location: "Ruzafa",
    address: "Plaza del Barón de Cortés, Valencia",
    image: "/images/events/ruzafa-gastro.jpg",
    category: "Gastronomía",
    tags: ["Gastronomía", "Viajes", "Fotografía"],
    attendees: 16,
    maxAttendees: 18,
    starsReward: 3,
    organizer: { name: "Carlos D.", avatar: "/images/avatars/carlos.jpg" },
    city: "Valencia",
    communityId: "com-2",
    subgroupId: "sub-4",
    status: "active"
  },
  {
    id: "ev-6",
    title: "Jam session acústica en La Nau",
    description: "Trae tu instrumento o simplemente ven a escuchar. Ambiente libre, cerveza artesanal y buena compañía.",
    date: addDays(today, 0), // Hoy
    time: "20:00",
    location: "Centre Cultural La Nau",
    address: "C/ de la Universitat 2, Valencia",
    image: "/images/events/jam-session.jpg",
    category: "Música",
    tags: ["Música", "Arte & Cultura", "Baile"],
    attendees: 30,
    maxAttendees: 50,
    starsReward: 2,
    organizer: { name: "David L.", avatar: "/images/avatars/david.jpg" },
    city: "Valencia",
    communityId: "com-3",
    subgroupId: "sub-3",
    status: "active"
  },
];

export const mockCommunities: Community[] = [
  {
    id: "com-1",
    name: "Runners de Valencia",
    description: "Grupo de running semanal por los Jardines del Turia y alrededores. Todos los ritmos.",
    image: "/images/communities/runners.jpg",
    memberCount: 134,
    category: "Deportes",
    tags: ["Deportes", "Naturaleza", "Yoga & Bienestar"],
    isLocked: false,
    requiredStars: 5,
    subgroups: [
      { id: "sub-1", name: "Principiantes", description: "Ritmo suave, ideal para empezar." },
      { id: "sub-2", name: "Maratón", description: "Entrenamiento para fondo y medias maratones." }
    ]
  },
  {
    id: "com-2",
    name: "Foodies VLC",
    description: "Exploramos la escena gastronómica valenciana: restaurantes, mercados y cocina casera.",
    image: "/images/communities/foodies.jpg",
    memberCount: 89,
    category: "Gastronomía",
    tags: ["Gastronomía", "Cocina", "Viajes"],
    isLocked: false,
    requiredStars: 5,
    subgroups: [
      { id: "sub-4", name: "Rutas de Tapas", description: "Exploración de bares y tapas los fines de semana." }
    ]
  },
  {
    id: "com-3",
    name: "Creativos al aire libre",
    description: "Pintura, fotografía y escritura en espacios naturales de Valencia.",
    image: "/images/communities/creativos.jpg",
    memberCount: 56,
    category: "Arte & Cultura",
    tags: ["Arte & Cultura", "Fotografía", "Naturaleza"],
    isLocked: true,
    requiredStars: 5,
    subgroups: [
      { id: "sub-3", name: "Fotografía Urbana", description: "Salidas fotográficas por el centro de la ciudad." }
    ]
  },
  {
    id: "com-4",
    name: "Tech & Café",
    description: "Charlas informales sobre tecnología, startups e innovación. Cada jueves en un café diferente.",
    image: "/images/communities/tech.jpg",
    memberCount: 72,
    category: "Tecnología",
    tags: ["Tecnología", "Emprendimiento", "Idiomas"],
    isLocked: true,
    requiredStars: 5,
    subgroups: [
      { id: "sub-5", name: "Desarrollo Web", description: "Grupo sobre React, Next.js y ecosistema web." }
    ]
  },
];

export const mockUser: UserProfile = {
  id: "user-1",
  name: "Álex",
  role: "usuario",
  avatar: "/images/avatars/alex.jpg",
  bio: "Amante de la naturaleza y la buena comida. Siempre buscando nuevas experiencias en Valencia.",
  city: "Valencia",
  stars: 3,
  level: 1,
  interests: ["Senderismo", "Gastronomía", "Fotografía", "Yoga & Bienestar"],
  eventsAttended: 3,
  joinedDate: "Abril 2025",
};

export const mockConnections: Connection[] = [
  {
    id: "conn-1",
    name: "Sofía M.",
    avatar: "/images/avatars/sofia.jpg",
    bio: "Diseñadora gráfica, fan del yoga y las rutas de senderismo.",
    sharedInterests: ["Senderismo", "Yoga & Bienestar", "Fotografía"],
    compatibilityScore: 87,
    isLocked: true,
  },
  {
    id: "conn-2",
    name: "Javier R.",
    avatar: "/images/avatars/javier.jpg",
    bio: "Cocinero aficionado y ciclista urbano. Me encanta descubrir rincones nuevos.",
    sharedInterests: ["Gastronomía", "Viajes"],
    compatibilityScore: 72,
    isLocked: true,
  },
  {
    id: "conn-3",
    name: "Elena P.",
    avatar: "/images/avatars/elena.jpg",
    bio: "Profesora de literatura. Los libros y el café son mi combo perfecto.",
    sharedInterests: ["Lectura", "Gastronomía"],
    compatibilityScore: 65,
    isLocked: true,
  },
];
