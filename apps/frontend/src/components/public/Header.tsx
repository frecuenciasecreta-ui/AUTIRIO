'use client';

import Link from 'next/link';
import { Car, Building2, Sparkles, ShieldCheck, Rocket } from 'lucide-react';
import AutirioLogo from '@/components/ui/AutirioLogo';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 bg-background/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* IMPERIUM AUTO DIGITAL LOGO */}
          <Link href="/" className="flex items-center flex-shrink-0 transition-all hover:scale-105 group relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <AutirioLogo className="h-9 sm:h-11 w-auto drop-shadow-md relative z-10" variant="light" />
          </Link>

          {/* NAVIGATION LINKS */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link href="/coches" className="text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-brand-accent transition-colors flex items-center gap-1.5">
              <Car className="w-4 h-4 text-brand-accent" />
              Catálogo de Selección
            </Link>
            
            <Link href="/concesionarios" className="text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-brand-accent transition-colors flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-slate-400" />
              Red de Concesionarios
            </Link>

            <Link href="/publica-con-nosotros" className="text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1.5">
              <Rocket className="w-4 h-4 text-amber-400 animate-pulse" />
              Plan Piloto Concesionarios
            </Link>
          </nav>

          {/* HIGH CONVERSION DUAL CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/publica-con-nosotros"
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-extrabold rounded-xl group bg-gradient-to-br from-brand-accent via-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-300 hover:scale-[1.02]"
            >
              <span className="relative px-4 py-2.5 transition-all ease-in duration-75 bg-background/30 rounded-[10px] flex items-center gap-2 group-hover:bg-transparent uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                Vender Mi Inventario
              </span>
            </Link>

            <Link
              href="/admin/login"
              className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900/60"
              title="Acceso Exclusivo Administración"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-brand-accent" />
              <span className="hidden sm:inline">Admin</span>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
