"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Users, Star } from "lucide-react";
import type { Event } from "@/lib/types";

interface EventCardProps {
  event: Event;
  index?: number;
}

export function EventCard({ event, index = 0 }: EventCardProps) {
  return (
    <Link href={`/evento/${event.id}`}>
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -4 }}
        className="glass-card overflow-hidden cursor-pointer group"
        aria-label={`Ver evento: ${event.title}`}
      >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="badge badge-red backdrop-blur-md bg-white/80">
            {event.category}
          </span>
        </div>
        {/* Stars reward */}
        <div className="absolute top-3 right-3 flex items-center gap-1 backdrop-blur-md bg-white/80 rounded-full px-2.5 py-1">
          <Star size={14} className="text-roots-orange fill-roots-orange" />
          <span className="text-xs font-bold text-roots-brown">
            +{event.starsReward}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2.5">
        <h3 className="font-display text-lg font-semibold text-roots-charcoal leading-snug line-clamp-2">
          {event.title}
        </h3>

        <div className="flex items-center gap-4 text-sm text-foreground-muted">
          <span className="flex items-center gap-1.5">
            <Calendar size={14} />
            {event.date}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={14} />
            {event.location}
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5 text-sm text-foreground-muted">
            <Users size={14} />
            <span>
              {event.attendees}/{event.maxAttendees} asistentes
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-16 h-1.5 bg-roots-cream-dark rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background:
                  event.attendees / event.maxAttendees > 0.8
                    ? "var(--roots-red)"
                    : "var(--roots-green)",
              }}
              initial={{ width: 0 }}
              animate={{
                width: `${(event.attendees / event.maxAttendees) * 100}%`,
              }}
              transition={{ delay: index * 0.08 + 0.3, duration: 0.6 }}
            />
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {event.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-roots-cream-dark text-roots-brown-light"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      </motion.article>
    </Link>
  );
}
