'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, ChevronUp } from 'lucide-react';
import { CONTACT_NUMBERS } from '@/lib/constants';

export default function FloatingWhatsAppButtons() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto">
      
      {/* EXPANDABLE CONTACT PILLS */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-end gap-2.5"
          >
            {/* SPAIN LINE */}
            <motion.a
              whileHover={{ scale: 1.05, x: -4 }}
              whileTap={{ scale: 0.98 }}
              href={`${CONTACT_NUMBERS.spain.waUrl}?text=${encodeURIComponent('Hola, me interesa solicitar información sobre IMPERIUM Auto Digital')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#0D0F17]/95 hover:bg-emerald-950 backdrop-blur-xl border border-emerald-500/40 text-white shadow-2xl shadow-emerald-500/20 transition-all"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-5 h-5 fill-current" />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 flex items-center gap-1">
                  <span>🇪🇸</span> España / Europa
                </div>
                <div className="text-xs font-black text-white">{CONTACT_NUMBERS.spain.display}</div>
              </div>
            </motion.a>

            {/* COLOMBIA / LATAM LINE */}
            <motion.a
              whileHover={{ scale: 1.05, x: -4 }}
              whileTap={{ scale: 0.98 }}
              href={`${CONTACT_NUMBERS.colombia.waUrl}?text=${encodeURIComponent('Hola, me interesa solicitar información sobre IMPERIUM Auto Digital')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#0D0F17]/95 hover:bg-emerald-950 backdrop-blur-xl border border-emerald-500/40 text-white shadow-2xl shadow-emerald-500/20 transition-all"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-5 h-5 fill-current" />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 flex items-center gap-1">
                  <span>🇨🇴</span> Colombia / LatAm
                </div>
                <div className="text-xs font-black text-white">{CONTACT_NUMBERS.colombia.display}</div>
              </div>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN TOGGLE / WHATSAPP BADGE BUTTON */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 border-2 border-emerald-300 text-white shadow-2xl shadow-emerald-500/40 flex items-center justify-center relative group"
        aria-label="Contactar por WhatsApp"
      >
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-ping" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-slate-950" />
        
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageSquare className="w-6 h-6 text-white fill-current" />
        )}
      </motion.button>

    </div>
  );
}
