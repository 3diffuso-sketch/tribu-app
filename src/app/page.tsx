"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, SlidersHorizontal, Star, Sparkles, Users } from "lucide-react";
import { EventCard } from "@/components/EventCard";
import { CommunityCard } from "@/components/CommunityCard";
import { mockEvents, mockCommunities } from "@/lib/mock-data";
import { INTEREST_TAGS } from "@/lib/types";

const categories = ["Todos", "Senderismo", "Arte & Cultura", "Yoga & Bienestar", "Gastronomía", "Música", "Lectura"];

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const today = new Date();
  const tenDaysFromNow = new Date(today);
  tenDaysFromNow.setDate(today.getDate() + 10);

  const filteredCommunities = mockCommunities.filter((community) => {
    const matchesCategory = selectedCategory === "Todos" || community.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const filteredEvents = mockEvents.filter((event) => {
    const matchesCategory = selectedCategory === "Todos" || event.category === selectedCategory;
    const matchesSearch = searchQuery === "" ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Filter events happening today or in the next 10 days
    const eventDate = new Date(event.date);
    const inNext10Days = eventDate >= new Date(today.setHours(0,0,0,0)) && eventDate <= tenDaysFromNow;
    
    return matchesCategory && matchesSearch && inNext10Days;
  });

  return (
    <div className="min-h-screen">
      {/* ── Hero header ── */}
      <header className="relative px-5 pt-14 pb-8 overflow-hidden">
        {/* Decorative background gradient */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(135deg, rgba(196,68,42,0.06) 0%, rgba(232,145,90,0.04) 50%, transparent 100%)",
          }}
        />

        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={16} className="text-roots-orange" />
            <span className="text-sm font-medium text-foreground-muted">
              Valencia
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold text-roots-charcoal leading-tight">
            Descubre tu próxima
            <br />
            <span className="gradient-text">experiencia</span>
          </h1>
          <p className="mt-2 text-sm text-foreground-muted max-w-xs">
            La intimidad empieza en comunidad. Encuentra eventos y grupos que conecten con tus intereses.
          </p>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mt-5 flex items-center gap-3"
        >
          <div className="flex-1 relative">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted"
            />
            <input
              type="text"
              placeholder="Buscar eventos, comunidades, intereses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full bg-white border border-roots-sand/40 
                text-sm text-roots-charcoal placeholder:text-foreground-muted/60
                focus:outline-none focus:ring-2 focus:ring-roots-red/20 focus:border-roots-red/30
                transition-all duration-200 shadow-sm"
            />
          </div>
          <button
            className="w-11 h-11 flex items-center justify-center rounded-full bg-white border border-roots-sand/40 
              shadow-sm hover:shadow-md transition-all duration-200 hover:border-roots-red/30"
            aria-label="Filtros"
          >
            <SlidersHorizontal size={18} className="text-roots-brown" />
          </button>
        </motion.div>
      </header>

      {/* ── Category pills ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="px-5 pb-4"
      >
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-5 px-5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200
                ${
                  selectedCategory === cat
                    ? "bg-roots-red text-white shadow-md"
                    : "bg-white text-roots-brown border border-roots-sand/40 hover:border-roots-red/30"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── Stars info banner ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35 }}
        className="mx-5 mb-8 p-4 rounded-2xl flex items-center gap-3"
        style={{
          background:
            "linear-gradient(135deg, rgba(232,145,90,0.12) 0%, rgba(196,68,42,0.08) 100%)",
        }}
      >
        <div className="w-10 h-10 rounded-full bg-roots-orange/20 flex items-center justify-center star-pulse">
          <Star size={20} className="text-roots-orange fill-roots-orange" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-roots-brown">
            Gana estrellas asistiendo a eventos
          </p>
          <p className="text-xs text-foreground-muted mt-0.5">
            Acumula ★ para desbloquear Comunidades y Conexiones
          </p>
        </div>
      </motion.div>

      {/* ── Communities grid ── */}
      <section className="px-5 pb-10" aria-label="Comunidades en la zona">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-semibold text-roots-charcoal flex items-center gap-2">
            <Users size={20} className="text-roots-green" />
            Comunidades en tu zona
          </h2>
        </div>

        <AnimatePresence mode="wait">
          {filteredCommunities.length > 0 ? (
            <motion.div
              key={`com-${selectedCategory}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
            >
              {filteredCommunities.map((community, i) => (
                <CommunityCard key={community.id} community={community} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-8"
            >
              <p className="text-foreground-muted font-medium">
                No hay comunidades para esta búsqueda
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── Event grid ── */}
      <section className="px-5 pb-20" aria-label="Eventos próximos 10 días">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-semibold text-roots-charcoal">
            Próximos 10 días
          </h2>
          <span className="text-sm text-foreground-muted bg-roots-sand/30 px-2 py-0.5 rounded-full">
            {filteredEvents.length} eventos
          </span>
        </div>

        <AnimatePresence mode="wait">
          {filteredEvents.length > 0 ? (
            <motion.div
              key={`ev-${selectedCategory}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
            >
              {filteredEvents.map((event, i) => (
                <EventCard key={event.id} event={event} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty-ev"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-8"
            >
              <p className="text-foreground-muted font-medium">
                No hay eventos próximos para esta búsqueda
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
