"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, ChevronLeft, Search } from "lucide-react";
import { ChatWindow } from "@/components/ChatWindow";
import { useAuth } from "@/lib/auth-context";
import type { Mensaje } from "@/lib/types";

// Mock data
const mockConversations = [
  { id: "c1", partnerId: "user-sponsor", partnerName: "La Terraza Valencia", community: "Sponsor", unread: 1, avatar: "", lastTime: "10:30" },
  { id: "c2", partnerId: "user-sponsor-2", partnerName: "Coworking Ruzafa", community: "Sponsor", unread: 0, avatar: "", lastTime: "Ayer" },
];

const mockMessages: Record<string, Mensaje[]> = {
  "c1": [
    { id: "m1", senderId: "user-guia", senderName: "Carlos", senderAvatar: "", receiverId: "user-sponsor", content: "Hola, me interesa reservar el espacio para el próximo martes.", timestamp: "10:20", read: true },
    { id: "m2", senderId: "user-sponsor", senderName: "La Terraza Valencia", senderAvatar: "", receiverId: "user-guia", content: "¡Claro! ¿Cuántas personas serían aproximadamente?", timestamp: "10:25", read: true },
    { id: "m3", senderId: "user-guia", senderName: "Carlos", senderAvatar: "", receiverId: "user-sponsor", content: "Seríamos unas 15 personas. Necesitamos el proyector.", timestamp: "10:30", read: true },
    { id: "m4", senderId: "user-sponsor", senderName: "La Terraza Valencia", senderAvatar: "", receiverId: "user-guia", content: "Perfecto. Te confirmo la reserva.", timestamp: "10:31", read: false },
  ]
};

export default function GuiaChatPage() {
  const { user } = useAuth();
  const [selectedConv, setSelectedConv] = useState<string | null>("c1");
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
    <div className="flex flex-col h-[calc(100vh-140px)] px-5 pb-10">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 shrink-0">
        <h1 className="text-2xl font-display font-bold text-roots-charcoal flex items-center gap-2">
          <MessageCircle className="text-roots-green" />
          Chat con Sponsors
        </h1>
      </motion.div>

      <div className="flex-1 relative overflow-hidden bg-white/40 border border-roots-sand/50 rounded-2xl flex">
        {/* List View */}
        <div className={`w-full md:w-1/3 flex flex-col border-r border-roots-sand/30 ${selectedConv ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-3 border-b border-roots-sand/30">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted" />
              <input type="text" placeholder="Buscar chat..." className="w-full bg-roots-cream py-2 pl-9 pr-3 rounded-xl text-sm focus:outline-none" />
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
                  <p className="text-[11px] text-roots-green font-medium truncate">{conv.community}</p>
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
              <p className="text-sm mt-1">Selecciona una conversación para empezar a chatear con los Sponsors.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
