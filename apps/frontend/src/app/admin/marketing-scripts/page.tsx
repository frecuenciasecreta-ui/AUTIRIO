'use client';

import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api';
import { TrackingScriptConfig } from '@/lib/types';
import { Code2, Save, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export default function AdminMarketingScriptsPage() {
  const [configs, setConfigs] = useState<TrackingScriptConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState('');

  const loadConfigs = () => {
    setLoading(true);
    fetchApi<TrackingScriptConfig[]>('/tracking/admin/all')
      .then((res) => setConfigs(res || []))
      .catch(() => setConfigs([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadConfigs();
  }, []);

  const handleToggle = async (provider: string, isActive: boolean, trackingId?: string) => {
    await fetchApi(`/tracking/admin/${provider}`, {
      method: 'PUT',
      body: JSON.stringify({ isActive: !isActive, trackingId }),
    });
    setSaveSuccess(`Configuración de ${provider} actualizada`);
    setTimeout(() => setSaveSuccess(''), 3000);
    loadConfigs();
  };

  const handleUpdateId = async (provider: string, trackingId: string, isActive: boolean) => {
    await fetchApi(`/tracking/admin/${provider}`, {
      method: 'PUT',
      body: JSON.stringify({ trackingId, isActive }),
    });
    setSaveSuccess(`ID de ${provider} guardado`);
    setTimeout(() => setSaveSuccess(''), 3000);
    loadConfigs();
  };

  return (
    <div className="space-y-6">
      
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-2xl font-black text-white">Integración de Scripts y Píxeles de Marketing</h1>
        <p className="text-xs text-slate-400 mt-1">Activa, desactiva o actualiza identificadores de seguimiento en tiempo real sin modificar el código de la aplicación.</p>
      </div>

      {saveSuccess && (
        <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          {saveSuccess}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {configs.map((c) => (
          <div key={c.provider} className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-accent/20 border border-brand-accent/30 flex items-center justify-center text-brand-accent font-bold">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{c.provider}</h3>
                  <span className="text-[10px] text-slate-400">Proveedor de Analítica / Ads</span>
                </div>
              </div>

              {/* Toggle switch */}
              <button
                onClick={() => handleToggle(c.provider, c.isActive, c.trackingId)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  c.isActive ? 'bg-emerald-500' : 'bg-slate-800'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    c.isActive ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Tracking ID Input */}
            <div className="space-y-1">
              <label className="block text-[11px] font-semibold text-slate-300">Identificador / Pixel ID</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  defaultValue={c.trackingId || ''}
                  placeholder="Ej. G-XXXXX / Pixel ID"
                  onBlur={(e) => handleUpdateId(c.provider, e.target.value, c.isActive)}
                  className="flex-1 bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-accent font-mono"
                />
                <button
                  type="button"
                  className="bg-slate-800 hover:bg-slate-700 text-white p-2 rounded-xl border border-slate-700"
                  title="Guardar ID"
                >
                  <Save className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
