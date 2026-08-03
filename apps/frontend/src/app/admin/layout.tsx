'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Car,
  Tag,
  Inbox,
  Megaphone,
  Code2,
  Building2,
  Newspaper,
  ShieldAlert,
  LogOut,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('automaestro_token');
    const userData = localStorage.getItem('automaestro_user');

    if (!token && !userData && !pathname?.includes('/admin/login')) {
      router.push('/admin/login');
    } else if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {}
    }
  }, [pathname, router]);

  if (pathname?.includes('/admin/login')) {
    return <>{children}</>;
  }

  const handleLogout = () => {
    localStorage.removeItem('automaestro_token');
    localStorage.removeItem('automaestro_user');
    router.push('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Vehículos', href: '/admin/vehiculos', icon: Car },
    { label: 'Marcas y Modelos', href: '/admin/marcas-modelos', icon: Tag },
    { label: 'Solicitudes Leads B2B', href: '/admin/solicitudes', icon: Inbox },
    { label: 'Módulo Publicidad', href: '/admin/publicidad', icon: Megaphone },
    { label: 'Scripts & Tracking Ads', href: '/admin/marketing-scripts', icon: Code2 },
    { label: 'Concesionarios', href: '/admin/concesionarios', icon: Building2 },
    { label: 'Blog & Prensa', href: '/admin/blog', icon: Newspaper },
    { label: 'Configuración & Audit', href: '/admin/configuracion', icon: ShieldAlert },
  ];

  return (
    <div className="min-h-screen bg-[#07090D] flex flex-col md:flex-row text-slate-100">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-[#0A0E17] border-r border-slate-800/80 p-5 flex flex-col justify-between flex-shrink-0">
        <div className="space-y-8">
          
          {/* Admin Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-accent to-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-base font-black text-white block">AutoMaestro</span>
              <span className="text-[10px] uppercase font-bold text-brand-accent tracking-wider">Control Panel</span>
            </div>
          </div>

          {/* Navigation links */}
          <nav className="space-y-1 text-xs">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-accent text-white shadow-md shadow-blue-600/25'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                </Link>
              );
            })}
          </nav>

        </div>

        {/* Footer User Info & Logout */}
        <div className="pt-5 border-t border-slate-800/80 space-y-3">
          <div className="text-xs">
            <p className="font-bold text-white truncate">{user?.name || 'Administrador'}</p>
            <p className="text-[10px] text-slate-400 truncate">{user?.email || 'admin@automaestro.es'}</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-slate-900 hover:bg-rose-950/40 hover:text-rose-400 text-slate-400 text-xs font-semibold py-2 px-3 rounded-xl border border-slate-800 flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Cerrar Sesión
          </button>
        </div>

      </aside>

      {/* MAIN ADMIN CONTENT */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {children}
      </main>

    </div>
  );
}
