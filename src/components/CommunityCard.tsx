"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Users, Lock, LockOpen } from "lucide-react";
import type { Community } from "@/lib/types";

interface CommunityCardProps {
  community: Community;
  index?: number;
}

export function CommunityCard({ community, index = 0 }: CommunityCardProps) {
  return (
    <Link href={`/comunidad/${community.id}`}>
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -4 }}
        className="glass-card overflow-hidden cursor-pointer group h-full flex flex-col"
        aria-label={`Ver comunidad: ${community.name}`}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={community.image}
            alt={community.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className="badge badge-green backdrop-blur-md bg-white/80">
              {community.category}
            </span>
          </div>
          {/* Privacy badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1 backdrop-blur-md bg-white/80 rounded-full p-2 text-roots-charcoal">
            {community.isLocked ? <Lock size={14} /> : <LockOpen size={14} />}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col space-y-2">
          <h3 className="font-display text-lg font-semibold text-roots-charcoal leading-snug line-clamp-2">
            {community.name}
          </h3>
          
          <p className="text-xs text-foreground-muted line-clamp-2 flex-1">
            {community.description}
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-roots-sand/30">
            <div className="flex items-center gap-1.5 text-sm text-foreground-muted">
              <Users size={14} />
              <span>{community.memberCount} miembros</span>
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
