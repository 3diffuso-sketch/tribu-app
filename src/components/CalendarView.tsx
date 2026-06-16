"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import type { DisponibilidadSlot } from "@/lib/types";

interface CalendarViewProps {
  slots?: DisponibilidadSlot[];
  onSlotClick?: (date: string) => void;
  onToggleAvailability?: (date: string) => void;
  readonly?: boolean;
}

export function CalendarView({ slots = [], onSlotClick, onToggleAvailability, readonly = false }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 1)); // Fixed to June 2026 for mock data
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  // Adjust so Monday is 0, Sunday is 6
  const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const getSlotForDate = (dateStr: string) => {
    return slots.find(s => s.date === dateStr);
  };

  const renderDays = () => {
    const days = [];
    const todayStr = new Date().toISOString().split("T")[0];

    // Empty cells before start of month
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12 border border-transparent" />);
    }

    // Days of month
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const slot = getSlotForDate(dateStr);
      const isSelected = selectedDate === dateStr;
      
      let bgColor = "bg-white border-roots-sand/30";
      let textColor = "text-roots-charcoal";
      
      if (slot) {
        if (slot.available) {
          bgColor = "bg-roots-green/10 border-roots-green/30 text-roots-green";
        } else if (slot.reservedBy) {
          bgColor = "bg-roots-orange/10 border-roots-orange/30 text-roots-orange";
        } else {
          bgColor = "bg-roots-red/10 border-roots-red/30 text-roots-red line-through opacity-70";
        }
      }

      if (isSelected) {
        bgColor = "bg-roots-charcoal border-roots-charcoal text-white shadow-md transform scale-105";
        textColor = "text-white";
      }

      days.push(
        <button
          key={d}
          onClick={() => {
            setSelectedDate(dateStr);
            if (onSlotClick) onSlotClick(dateStr);
          }}
          className={`h-12 w-full rounded-lg border flex flex-col items-center justify-center transition-all ${bgColor} hover:shadow-sm`}
        >
          <span className={`text-sm font-medium ${textColor}`}>{d}</span>
          {slot && (
            <div className="flex gap-0.5 mt-1">
              <div className={`w-1 h-1 rounded-full ${slot.available ? 'bg-roots-green' : slot.reservedBy ? 'bg-roots-orange' : 'bg-roots-red'}`} />
            </div>
          )}
        </button>
      );
    }

    return days;
  };

  const selectedSlot = selectedDate ? getSlotForDate(selectedDate) : null;

  return (
    <div className="flex flex-col gap-4">
      <div className="glass-card p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-lg text-roots-charcoal flex items-center gap-2">
            <CalendarIcon size={18} className="text-roots-red" />
            {monthNames[month]} {year}
          </h3>
          <div className="flex gap-2">
            <button onClick={prevMonth} className="p-1.5 rounded-full hover:bg-roots-sand/20 text-foreground-muted transition-colors">
              <ChevronLeft size={18} />
            </button>
            <button onClick={nextMonth} className="p-1.5 rounded-full hover:bg-roots-sand/20 text-foreground-muted transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 gap-2 mb-2 text-center">
          {["L", "M", "X", "J", "V", "S", "D"].map((d, i) => (
            <div key={i} className="text-xs font-semibold text-foreground-muted">{d}</div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-7 gap-2">
          {renderDays()}
        </div>
        
        {/* Legend */}
        <div className="mt-4 pt-4 border-t border-roots-sand/30 flex flex-wrap gap-3 justify-center text-xs text-foreground-muted">
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-roots-green/40 border border-roots-green" /> Disponible</div>
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-roots-orange/40 border border-roots-orange" /> Reservado</div>
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-roots-red/40 border border-roots-red" /> Bloqueado</div>
        </div>
      </div>

      {/* Selected Day Panel */}
      <AnimatePresence mode="wait">
        {selectedDate && (
          <motion.div
            key={selectedDate}
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            className="glass-card overflow-hidden"
          >
            <div className="p-4 border-l-4 border-roots-charcoal">
              <h4 className="font-semibold text-roots-charcoal mb-2">Detalles del {selectedDate}</h4>
              
              {!selectedSlot ? (
                <div className="text-sm text-foreground-muted">
                  <p>Sin configuración para este día.</p>
                  {!readonly && onToggleAvailability && (
                    <button 
                      onClick={() => onToggleAvailability(selectedDate)}
                      className="mt-3 px-4 py-1.5 bg-roots-green/10 text-roots-green font-medium text-sm rounded-lg hover:bg-roots-green/20 transition-colors"
                    >
                      Marcar como Disponible
                    </button>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium bg-roots-cream px-2 py-1 rounded">
                      {selectedSlot.startTime} - {selectedSlot.endTime}
                    </span>
                    {selectedSlot.available && <span className="badge-green">Disponible</span>}
                    {selectedSlot.reservedBy && <span className="badge-orange">Reservado</span>}
                    {!selectedSlot.available && !selectedSlot.reservedBy && <span className="badge-red">Bloqueado</span>}
                  </div>
                  
                  {selectedSlot.reservedBy && (
                    <div className="text-sm bg-roots-cream/50 p-2 rounded-md mt-1">
                      <p className="font-medium text-roots-charcoal">{selectedSlot.eventName}</p>
                      <p className="text-foreground-muted text-xs">Por Guía ID: {selectedSlot.reservedBy}</p>
                    </div>
                  )}

                  {!readonly && onToggleAvailability && !selectedSlot.reservedBy && (
                    <button 
                      onClick={() => onToggleAvailability(selectedDate)}
                      className={`mt-2 px-4 py-1.5 font-medium text-sm rounded-lg transition-colors w-max
                        ${selectedSlot.available 
                          ? 'bg-roots-red/10 text-roots-red hover:bg-roots-red/20' 
                          : 'bg-roots-green/10 text-roots-green hover:bg-roots-green/20'}`}
                    >
                      {selectedSlot.available ? 'Bloquear Día' : 'Desbloquear Día'}
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
