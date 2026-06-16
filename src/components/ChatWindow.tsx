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
      <div className="p-4 border-b border-roots-sand/30 bg-roots-cream/50 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-roots-sand/50 flex items-center justify-center text-roots-charcoal shrink-0">
          <UserIcon size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-roots-charcoal">{recipientName}</h3>
          <p className="text-xs text-roots-green font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-roots-green inline-block"></span> En línea
          </p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {messages.map((msg, idx) => {
          const isMe = msg.senderId === currentUserId;
          return (
            <motion.div
              key={msg.id || idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col max-w-[80%] ${isMe ? "self-end items-end" : "self-start items-start"}`}
            >
              <div
                className={`px-4 py-2.5 rounded-2xl ${
                  isMe
                    ? "bg-roots-red text-white rounded-tr-sm"
                    : "bg-roots-cream text-roots-charcoal rounded-tl-sm border border-roots-sand/30"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
              <span className="text-[10px] text-foreground-muted mt-1 px-1">
                {msg.timestamp}
              </span>
            </motion.div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-roots-sand/30">
        <form onSubmit={handleSend} className="flex items-center gap-2 relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="w-full bg-roots-cream/50 border border-roots-sand/40 rounded-full py-2.5 pl-4 pr-12 text-sm focus:outline-none focus:border-roots-red/50 transition-colors"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-roots-red text-white flex items-center justify-center disabled:opacity-50 disabled:bg-roots-sand transition-colors"
          >
            <Send size={14} className="ml-0.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
