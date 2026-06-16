"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ChevronLeft, Search } from "lucide-react";
import { ChatWindow } from "@/components/ChatWindow";
import { useAuth } from "@/lib/auth-context";
import type { Mensaje } from "@/lib/types";

// Mock data for Admin Chat
const mockConversations = [
  { id: "c1", partnerId: "user-guia", partnerName: "Carlos Navarro", role: "Guía", unread: 2, avatar: "", lastTime: "10:30" },
  { id: "c2", partnerId: "u-3", partnerName: "Ana Martínez", role: "Crew", unread: 0, avatar: "", lastTime: "Ayer" },
  { id: "c3", partnerId: "u-sponsor", partnerName: "La Terraza Valencia", role: "Sponsor Local", unread: 0, avatar: "", lastTime: "Lun" },
];

const mockMessages: Record<string, Mensaje[]> = {
  "c1": [
    { id: "m1", senderId: "user-guia", senderName: "Carlos", senderAvatar: "", receiverId: "user-admin", content: "Hola, tengo una duda sobre la moderación de un evento.", timestamp: "10:20", read: true },
    { id: "m2", senderId: "user-admin", senderName: "Admin", senderAvatar: "", receiverId: "user-guia", content: "Dime, ¿qué ocurrió?", timestamp: "10:25", read: true },
    { id: "m3", senderId: "user-guia", senderName: "Carlos", senderAvatar: "", receiverId: "user-admin", content: "Un usuario está haciendo spam en los comentarios.", timestamp: "10:30", read: false },
  ],
  "c3": [
    { id: "s1", senderId: "user-sponsor", senderName: "La Terraza", senderAvatar: "", receiverId: "user-admin", content: "Queremos destacar nuestro local en más eventos.", timestamp: "09:00", read: true },
  ]
};

export default function AdminChatPage() {
  const { user } = useAuth();
  const [selectedConv, setSelectedConv] = useState<string | null>(null);
  const [messages, setMessages] = useState<Record<string, Mensaje[]>>(mockMessages);

  const handleSend = (content: string) => {
    if (!selectedConv) return;
    const newMsg: Mensaje = {
      id: `m${Date.now()}`,
      senderId: user.id,
      senderName: user.name,
      senderAvatar: user.avatar,
      receiverId: mockConversations.find(c => c.id === selectedConv)?.partnerId || "",
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true
    };
    
    setMessages(prev => ({
      ...prev,
      [selectedConv]: [...(prev[selectedConv] || []), newMsg]
    }));
  };

  const activePartner = mockConversations.find(c => c.id === selectedConv);

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] px-5">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 shrink-0">
        <h1 className="text-2xl font-display font-bold text-roots-charcoal flex items-center gap-2">
          <MessageCircle className="text-roots-red" />
          Chat Administrativo
        </h1>
        <p className="text-sm text-foreground-muted">
          Comunícate con Guías, Crew y Sponsors Locales.
        </p>
      </motion.div>

      <div className="flex-1 relative overflow-hidden bg-white/40 border border-roots-sand/50 rounded-2xl flex">
        {/* List View */}
        <div className={`w-full md:w-1/3 flex flex-col border-r border-roots-sand/30 ${selectedConv ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-3 border-b border-roots-sand/30">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted" />
              <input type="text" placeholder="Buscar conversación..." className="w-full bg-roots-cream py-2 pl-9 pr-3 rounded-xl text-sm focus:outline-none" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {mockConversations.map(conv => (
              <button
                key={conv.id}
                onClick={() => setSelectedConv(conv.id)}
                className={`w-full flex items-center gap-3 p-3 text-left transition-colors border-b border-roots-sand/20 last:border-0 ${
                  selectedConv === conv.id ? 'bg-roots-cream' : 'hover:bg-roots-cream/50'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-roots-sand/50 shrink-0 flex items-center justify-center text-roots-charcoal font-bold">
                  {conv.partnerName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <p className="font-semibold text-roots-charcoal text-sm truncate">{conv.partnerName}</p>
                    <span className="text-[10px] text-foreground-muted">{conv.lastTime}</span>
                  </div>
                  <p className="text-[11px] text-roots-red font-semibold truncate uppercase">{conv.role}</p>
                  <p className="text-xs text-foreground-muted truncate">
                    {messages[conv.id]?.slice(-1)[0]?.content || "Inicia la conversación"}
                  </p>
                </div>
                {conv.unread > 0 && (
                  <div className="w-5 h-5 rounded-full bg-roots-red text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                    {conv.unread}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat View */}
        <div className={`w-full md:w-2/3 flex flex-col bg-white/50 ${!selectedConv ? 'hidden md:flex' : 'flex'}`}>
          {selectedConv && activePartner ? (
            <>
              <div className="md:hidden p-3 border-b border-roots-sand/30 flex items-center gap-2">
                <button onClick={() => setSelectedConv(null)} className="p-1.5 hover:bg-roots-cream rounded-full">
                  <ChevronLeft size={20} className="text-roots-charcoal" />
                </button>
                <span className="font-medium text-roots-charcoal">Atrás</span>
              </div>
              <ChatWindow 
                messages={messages[selectedConv] || []}
                currentUserId={user.id}
                onSend={handleSend}
                recipientName={activePartner.partnerName}
              />
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-foreground-muted p-6 text-center">
              <MessageCircle size={48} className="text-roots-sand mb-4" strokeWidth={1} />
              <p className="font-medium text-roots-charcoal">Tus mensajes</p>
              <p className="text-sm mt-1">Selecciona una conversación para empezar a chatear con los usuarios.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
