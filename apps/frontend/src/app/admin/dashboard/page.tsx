'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchApi } from '@/lib/api';
import { Car, Inbox, Megaphone, TrendingUp, Plus, ArrowRight, Eye, MousePointerClick } from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalVehicles: 12,
    totalLeads: 8,
    totalImpressions: 4520,
    totalClicks: 320,
    ctr: '7.08%',
  });

  const [recentLeads, setRecentLeads] = useState<any[]>([]);

  useEffect(() => {
    fetchApi<any[]>('/leads/admin/all')
      .then((res) => setRecentLeads(res?.slice(0, 5) || []))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-black text-white">Dashboard de Administración</h1>
          <p className="text-xs text-slate-400">Resumen operativo de catálogo, solicitudes comerciales y rendimiento publicitario.</p>
        </div>

        <Link
          href="/admin/vehiculos"
          className="bg-brand-accent hover:bg-blue-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-lg shadow-blue-600/20"
        >
          <Plus className="w-4 h-4" />
          Añadir Nuevo Vehículo
        </Link>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Vehículos Activos</span>
            <div className="p-2 rounded-xl bg-blue-500/20 text-brand-accent">
              <Car className="w-5 h-5" />
            </div>
          </div>
          <span className="text-3xl font-black text-white">{stats.totalVehicles}</span>
          <p className="text-[11px] text-emerald-400">Catálogo administrado en España</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Solicitudes B2B</span>
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Inbox className="w-5 h-5" />
            </div>
          </div>
          <span className="text-3xl font-black text-white">{stats.totalLeads}</span>
          <p className="text-[11px] text-slate-400">Leads de concesionarios y clientes</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Impresiones Anuncios</span>
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Eye className="w-5 h-5" />
            </div>
          </div>
          <span className="text-3xl font-black text-white">{stats.totalImpressions.toLocaleString('es-ES')}</span>
          <p className="text-[11px] text-slate-400">Vistas en Home, Filtros y Fichas</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">CTR Medio Publicidad</span>
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
              <MousePointerClick className="w-5 h-5" />
            </div>
          </div>
          <span className="text-3xl font-black text-white">{stats.ctr}</span>
          <p className="text-[11px] text-purple-400">{stats.totalClicks} Clics registrados</p>
        </div>

      </div>

      {/* RECENT LEADS PIPELINE */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Inbox className="w-5 h-5 text-brand-accent" />
            Últimas Solicitudes Comerciales (Leads B2B)
          </h3>
          <Link href="/admin/solicitudes" className="text-xs font-semibold text-brand-accent hover:underline flex items-center gap-1">
            Ver pipeline completo <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="text-[10px] uppercase font-bold text-slate-400 bg-slate-900/80 border-b border-slate-800">
              <tr>
                <th className="p-3">Nombre</th>
                <th className="p-3">Empresa / Tipo</th>
                <th className="p-3">Contacto</th>
                <th className="p-3">Provincia</th>
                <th className="p-3">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {recentLeads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-slate-400">
                    No hay solicitudes recientes.
                  </td>
                </tr>
              ) : (
                recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-900/40">
                    <td className="p-3 font-bold text-white">{lead.name}</td>
                    <td className="p-3">{lead.companyName || lead.businessType || 'Particular'}</td>
                    <td className="p-3">{lead.phone} • {lead.email}</td>
                    <td className="p-3">{lead.province}</td>
                    <td className="p-3">
                      <span className="bg-blue-500/20 text-brand-accent px-2 py-0.5 rounded font-bold text-[10px]">
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
