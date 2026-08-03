'use client';

import Link from 'next/link';
import { Car, Building2, Sparkles, ShieldCheck, Rocket } from 'lucide-react';
import AutirioLogo from '@/components/ui/AutirioLogo';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-electric-500/20 bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* IMPERIUM AUTO DIGITAL LOGO IMAGE */}
          <Link href="/" className="flex items-center flex-shrink-0 transition-all hover:scale-105 group relative py-2">
            <div className="absolute inset-0 bg-electric-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <AutirioLogo className="h-10 sm:h-12 w-auto relative z-10" variant="light" />
          </Link>

          {/* NAVIGATION LINKS */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/coches" className="text-xs font-black uppercase tracking-widest text-slate-300 hover:text-electric-cyan transition-colors flex items-center gap-2">
              <Car className="w-4 h-4 text-electric-400" />
              Catálogo de Selección
            </Link>
            
            <Link href="/concesionarios" className="text-xs font-black uppercase tracking-widest text-slate-300 hover:text-electric-cyan transition-colors flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-400" />
              Red de Concesionarios
            </Link>

            <Link href="/publica-con-nosotros" className="text-xs font-black uppercase tracking-widest text-electric-cyan hover:text-white transition-colors flex items-center gap-2">
              <Rocket className="w-4 h-4 text-electric-cyan animate-pulse" />
              Plan Piloto Concesionarios
            </Link>
          </nav>

          {/* HIGH CONVERSION DUAL CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/publica-con-nosotros"
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-black rounded-2xl group bg-gradient-to-r from-electric-600 via-electric-500 to-electric-cyan text-white shadow-xl shadow-electric-500/30 hover:shadow-electric-500/50 transition-all duration-300 hover:scale-105 uppercase tracking-wider"
            >
              <span className="relative px-5 py-3 transition-all ease-in duration-75 bg-slate-950/40 rounded-[14px] flex items-center gap-2 group-hover:bg-transparent text-white font-black tracking-wider uppercase">
                <Sparkles className="w-4 h-4 text-electric-cyan animate-pulse" />
                Vender Mi Inventario
              </span>
            </Link>

            <Link
              href="/admin/login"
              className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-800 hover:border-electric-500/40 bg-slate-900/60"
              title="Acceso Exclusivo Administración"
            >
              <ShieldCheck className="w-4 h-4 text-electric-400" />
              <span className="hidden sm:inline font-bold">Admin</span>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
