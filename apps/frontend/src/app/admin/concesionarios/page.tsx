'use client';

import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api';
import { Dealership } from '@/lib/types';
import { Building2, Plus, CheckCircle2 } from 'lucide-react';

export default function AdminDealershipsPage() {
  const [dealerships, setDealerships] = useState<Dealership[]>([]);

  useEffect(() => {
    fetchApi<Dealership[]>('/dealerships/admin/all')
      .then((res) => setDealerships(res || []))
      .catch(() => setDealerships([]));
  }, []);

  return (
    <div className="space-y-6">
      
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-2xl font-black text-white">Concesionarios Colaboradores</h1>
        <p className="text-xs text-slate-400 mt-1">Gestión de red de concesionarios partners en España.</p>
      </div>

      <div className="glass-panel rounded-3xl border border-slate-800 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {dealerships.map((d) => (
            <div key={d.id} className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-sm">{d.name}</h3>
                <span className="bg-emerald-500/20 text-emerald-400 font-bold text-[10px] px-2 py-0.5 rounded">
                  PARTNER
                </span>
              </div>
              <p className="text-slate-400">{d.city ? `${d.city}, ` : ''}{d.province}</p>
              <p className="text-slate-400">{d.phone} • {d.email}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
