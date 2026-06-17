"use client";

import { motion } from "framer-motion";
import { ChevronLeft, HelpCircle, Mail, MessageCircle, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AyudaPage() {
  const router = useRouter();

  const faqs = [
    { q: "¿Cómo me uno a una comunidad?", a: "Busca la comunidad en la sección Explorar y dale a 'Unirme'. Recuerda que tienes un límite de 5 comunidades." },
    { q: "¿Qué pasa si llego a mi límite de comunidades?", a: "Debes esperar 20 días tras salir de una o pagar una pequeña cuota para unirte a otra." },
    { q: "¿Cómo contacto a otro usuario?", a: "Debes asistir al menos a 3 eventos y hacer check-in. Luego, en el directorio de la comunidad podrás contactarlos." },
    { q: "¿Cómo me convierto en Guía?", a: "Puedes enviar una solicitud desde tu perfil o en la comunidad. Nuestro equipo lo revisará." },
  ];

  return (
    <div className="flex flex-col h-full bg-roots-cream min-h-screen px-5 pb-20 pt-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()} className="p-2 bg-white rounded-full text-roots-charcoal shadow-sm">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-2xl font-display font-bold text-roots-charcoal flex items-center gap-2">
          <HelpCircle className="text-roots-orange" />
          Centro de Ayuda
        </h1>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-roots-sand/50 flex flex-col items-center text-center gap-3">
          <div className="w-12 h-12 bg-roots-green/10 text-roots-green rounded-full flex items-center justify-center">
            <MessageCircle size={24} />
          </div>
          <h3 className="font-bold text-roots-charcoal">Chat de Soporte</h3>
          <p className="text-sm text-foreground-muted">Habla con nuestro equipo directamente desde la app.</p>
          <button className="w-full bg-roots-green text-white font-semibold py-2 rounded-xl mt-2">Iniciar Chat</button>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-roots-sand/50 flex flex-col items-center text-center gap-3">
          <div className="w-12 h-12 bg-roots-brown/10 text-roots-brown rounded-full flex items-center justify-center">
            <Mail size={24} />
          </div>
          <h3 className="font-bold text-roots-charcoal">Correo Electrónico</h3>
          <p className="text-sm text-foreground-muted">Envíanos un correo a soporte@tribuapp.com</p>
          <button className="w-full bg-roots-cream border border-roots-sand text-roots-charcoal font-semibold py-2 rounded-xl mt-2">Enviar Email</button>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 className="text-xl font-bold text-roots-charcoal mb-4 flex items-center gap-2">
          <FileText className="text-roots-charcoal" size={20} />
          Preguntas Frecuentes
        </h2>
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white border border-roots-sand/50 p-4 rounded-xl shadow-sm">
              <h4 className="font-semibold text-roots-charcoal text-sm mb-1">{faq.q}</h4>
              <p className="text-sm text-foreground-muted">{faq.a}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
