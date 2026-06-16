"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, User as UserIcon } from "lucide-react";
import type { Mensaje } from "@/lib/types";

interface ChatWindowProps {
  messages: Mensaje[];
  currentUserId: string;
  onSend: (content: string) => void;
  recipientName: string;
}

export function ChatWindow({ messages, currentUserId, onSend, recipientName }: ChatWindowProps) {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onSend(inputValue);
    setInputValue("");
  };

  return (
    <div className="flex flex-col h-[500px] glass-card overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b border-roots-sand/40 bg-white flex items-center gap-3 shadow-sm z-10">
        <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-roots-sand to-roots-cream-dark flex items-center justify-center text-roots-brown shrink-0 shadow-inner">
          <UserIcon size={22} />
        </div>
        <div>
          <h3 className="font-display font-bold text-roots-charcoal leading-tight">{recipientName}</h3>
          <p className="text-xs text-roots-green font-semibold flex items-center gap-1.5 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-roots-green inline-block shadow-[0_0_8px_rgba(107,123,58,0.6)]"></span> En línea
          </p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 bg-[var(--roots-warm-white)]/50">
        {messages.map((msg, idx) => {
          const isMe = msg.senderId === currentUserId;
          return (
            <motion.div
              key={msg.id || idx}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={`flex flex-col max-w-[85%] ${isMe ? "self-end items-end" : "self-start items-start"}`}
            >
              <div
                className={`px-4 py-2.5 rounded-[20px] shadow-sm ${
                  isMe
                    ? "bg-gradient-to-br from-roots-charcoal to-roots-brown-dark text-white rounded-tr-[4px]"
                    : "bg-white text-roots-charcoal rounded-tl-[4px] border border-roots-sand/40"
                }`}
              >
                <p className="text-[15px] leading-relaxed">{msg.content}</p>
              </div>
              <span className="text-[11px] font-medium text-foreground-muted mt-1 px-1.5 opacity-70">
                {msg.timestamp}
              </span>
            </motion.div>
          );
        })}
        <div ref={messagesEndRef} className="h-2" />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-roots-sand/40 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
        <form onSubmit={handleSend} className="flex items-center gap-2 relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Escribe tu mensaje aquí..."
            className="w-full bg-roots-warm-white border-2 border-roots-sand/30 rounded-full py-3.5 pl-5 pr-14 text-[15px] text-roots-charcoal placeholder:text-foreground-muted/60 focus:outline-none focus:border-roots-red/40 focus:bg-white transition-all shadow-inner"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-roots-red to-roots-orange text-white flex items-center justify-center disabled:opacity-50 disabled:from-roots-sand disabled:to-roots-sand transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
          >
            <Send size={18} className="ml-0.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
