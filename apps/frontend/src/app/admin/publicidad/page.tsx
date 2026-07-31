'use client';

import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api';
import { AdCampaign } from '@/lib/types';
import { Megaphone, Plus, Eye, MousePointerClick, TrendingUp, RefreshCw, X } from 'lucide-react';

export default function AdminAdsPage() {
  const [ads, setAds] = useState<AdCampaign[]>([]);
  const [placements, setPlacements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: 'Campaña Destacada Porsche Madrid',
    placementId: '',
    type: 'IMAGE',
    imageUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1200&q=80',
    targetUrl: 'https://automaestro.es/publica-con-nosotros',
    startDate: '2026-07-01',
    endDate: '2026-12-31',
    priority: 1,
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [adsRes, placementsRes] = await Promise.all([
        fetchApi<AdCampaign[]>('/ads/admin/all'),
        fetchApi<any[]>('/ads/placements'),
      ]);
      setAds(adsRes || []);
      setPlacements(placementsRes || []);
      if (placementsRes && placementsRes.length > 0) {
        setFormData((prev) => ({ ...prev, placementId: placementsRes[0].id }));
      }
    } catch (e) {
      setAds([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetchApi('/ads/admin', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      setShowModal(false);
      loadData();
    } catch (err: any) {
      alert(err.message || 'Error al crear la campaña publicitaria');
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-black text-white">Módulo de Gestión Publicitaria</h1>
          <p className="text-xs text-slate-400">Control de banners, patrocinios, Google AdSense y métricas de clics/CTR.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-brand-accent hover:bg-blue-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-lg shadow-blue-600/20"
        >
          <Plus className="w-4 h-4" />
          Crear Nueva Campaña
        </button>
      </div>

      <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-brand-accent mb-2" />
            Cargando campañas publicitarias...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="text-[10px] uppercase font-bold text-slate-400 bg-slate-900/90 border-b border-slate-800">
                <tr>
                  <th className="p-4">Nombre Campaña</th>
                  <th className="p-4">Ubicación (Placement)</th>
                  <th className="p-4">Tipo</th>
                  <th className="p-4">Impresiones</th>
                  <th className="p-4">Clics</th>
                  <th className="p-4">CTR</th>
                  <th className="p-4">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {ads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-400">
                      No hay campañas publicitarias activas. Crea la primera haciendo clic en "Crear Nueva Campaña".
                    </td>
                  </tr>
                ) : (
                  ads.map((ad) => (
                    <tr key={ad.id} className="hover:bg-slate-900/40">
                      <td className="p-4 font-bold text-white">{ad.name}</td>
                      <td className="p-4 font-mono text-[11px] text-brand-accent">{ad.placementId}</td>
                      <td className="p-4">{ad.type}</td>
                      <td className="p-4 font-bold text-slate-200">{ad.impressionsCount?.toLocaleString('es-ES')}</td>
                      <td className="p-4 font-bold text-emerald-400">{ad.clicksCount?.toLocaleString('es-ES')}</td>
                      <td className="p-4 font-bold text-purple-400">{ad.ctr || '0.00%'}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${ad.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                          {ad.isActive ? 'ACTIVA' : 'INACTIVA'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CREATE AD MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0D111A] border border-slate-700 w-full max-w-xl rounded-3xl p-6 sm:p-8 space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-black text-white">Crear Campaña Publicitaria</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Nombre de la Campaña</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-brand-accent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Ubicación (Placement)</label>
                  <select
                    value={formData.placementId}
                    onChange={(e) => setFormData({ ...formData, placementId: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-brand-accent"
                  >
                    {placements.map((p) => (
                      <option key={p.id} value={p.id}>{p.name} ({p.code})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Tipo de Anuncio</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-brand-accent"
                  >
                    <option value="IMAGE">Imagen Banner</option>
                    <option value="GOOGLE_ADSENSE">Google AdSense</option>
                    <option value="CUSTOM_HTML">HTML Personalizado</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">URL de la Imagen Banner</label>
                <input
                  type="text"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-brand-accent"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">URL de Destino (al hacer clic)</label>
                <input
                  type="text"
                  value={formData.targetUrl}
                  onChange={(e) => setFormData({ ...formData, targetUrl: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-brand-accent"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-brand-accent hover:bg-blue-600 text-white font-bold"
                >
                  Publicar Anuncio
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
