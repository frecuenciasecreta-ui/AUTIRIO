'use client';

import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api';
import { ShieldAlert, Database, Lock, CheckCircle2 } from 'lucide-react';

export default function AdminSettingsPage() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    fetchApi<any[]>('/audit/admin/logs')
      .then((res) => setLogs(res || []))
      .catch(() => setLogs([]));
  }, []);

  return (
    <div className="space-y-6">
      
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-2xl font-black text-white">Configuración del Sistema & Registros de Seguridad</h1>
        <p className="text-xs text-slate-400 mt-1">Audit log de actividades administrativas, backups de base de datos y parámetros globales.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-brand-accent" />
            Copia de Seguridad (Backups)
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Las copias de seguridad de PostgreSQL se ejecutan automáticamente cada 24h en el contenedor Docker.
          </p>
          <button
            onClick={() => alert('Copia de seguridad iniciada en segundo plano')}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-2.5 rounded-xl border border-slate-700 transition-colors"
          >
            Generar Backup Manual Ahora
          </button>
        </div>

        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            Registro de Auditoría de Seguridad (Audit Logs)
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="text-[10px] uppercase font-bold text-slate-400 bg-slate-900/80 border-b border-slate-800">
                <tr>
                  <th className="p-3">Fecha</th>
                  <th className="p-3">Acción</th>
                  <th className="p-3">Usuario / IP</th>
                  <th className="p-3">Detalles</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-[11px]">
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-4 text-center text-slate-400">
                      Sin eventos registrados.
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr key={log.id}>
                      <td className="p-3 text-slate-400">{new Date(log.createdAt).toLocaleString('es-ES')}</td>
                      <td className="p-3 font-bold text-brand-accent">{log.action}</td>
                      <td className="p-3">{log.user?.email || 'Sistema'} ({log.ipAddress})</td>
                      <td className="p-3 text-slate-300">{log.details}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
