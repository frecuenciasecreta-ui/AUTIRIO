'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('autirio_cookie_consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('autirio_cookie_consent', 'accepted');
    setShowBanner(false);
    window.dispatchEvent(new Event('cookiesAccepted'));
  };

  const declineCookies = () => {
    localStorage.setItem('autirio_cookie_consent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 pointer-events-none">
      <div className="max-w-4xl mx-auto glass-panel bg-[#0D111A]/95 backdrop-blur-xl border border-slate-700/80 shadow-2xl p-5 sm:p-6 rounded-3xl pointer-events-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        <div className="flex-1">
          <h4 className="text-white font-bold flex items-center gap-2 mb-2">
            <ShieldCheck className="w-5 h-5 text-brand-accent" />
            Privacidad y Cookies
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Utilizamos cookies propias y de terceros para fines analíticos y para mostrarte publicidad personalizada en base a un perfil elaborado a partir de tus hábitos de navegación. 
            <Link href="/politica-de-privacidad" className="text-brand-accent underline ml-1">Más información</Link>.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto flex-shrink-0">
          <button 
            onClick={declineCookies}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-slate-300 hover:text-white border border-slate-700 rounded-xl hover:bg-slate-800 transition-colors"
          >
            Rechazar opcionales
          </button>
          <button 
            onClick={acceptCookies}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-brand-accent hover:bg-blue-600 rounded-xl shadow-lg shadow-blue-600/20 transition-colors"
          >
            Aceptar y Continuar
          </button>
        </div>
        
      </div>
    </div>
  );
}
