'use client';

import Link from 'next/link';
import { Car, Building2, Sparkles, PhoneCall, ShieldCheck } from 'lucide-react';
import AutirioLogo from '@/components/ui/AutirioLogo';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 bg-background/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0 transition-all hover:scale-105 group relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <AutirioLogo className="h-9 sm:h-11 w-auto drop-shadow-md relative z-10" variant="light" />
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/coches" className="text-sm font-semibold text-slate-300 hover:text-brand-accent transition-colors flex items-center gap-1.5">
              <Car className="w-4 h-4 text-brand-accent" />
              Catálogo de Vehículos
            </Link>
            <Link href="/concesionarios" className="text-sm font-medium text-slate-300 hover:text-brand-accent transition-colors flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-slate-400" />
              Concesionarios
            </Link>
            <Link href="/blog" className="text-sm font-medium text-slate-300 hover:text-brand-accent transition-colors">
              Prensa y Noticias
            </Link>
          </nav>

          {/* High Conversion CTA - "Publica con Nosotros" (NO Public User Register/Post Button) */}
          <div className="flex items-center gap-4">
            <Link
              href="/publica-con-nosotros"
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-bold rounded-xl group bg-gradient-to-br from-brand-accent via-blue-600 to-indigo-600 group-hover:from-brand-accent group-hover:to-blue-500 text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-300 hover:scale-[1.02]"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-background/20 rounded-[10px] flex items-center gap-2 group-hover:bg-transparent">
                <Sparkles className="w-4 h-4 text-gold-500 animate-pulse" />
                Publica con Nosotros
              </span>
            </Link>

            <Link
              href="/admin/login"
              className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-800/50"
              title="Acceso Exclusivo Administración"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
