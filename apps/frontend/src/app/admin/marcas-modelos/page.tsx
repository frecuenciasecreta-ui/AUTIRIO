'use client';

import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api';
import { Brand } from '@/lib/types';
import { Tag, Plus, CheckCircle2 } from 'lucide-react';

export default function AdminTaxonomiesPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [newBrandName, setNewBrandName] = useState('');

  const loadBrands = () => {
    fetchApi<Brand[]>('/taxonomies/brands')
      .then((res) => setBrands(res || []))
      .catch(() => setBrands([]));
  };

  useEffect(() => {
    loadBrands();
  }, []);

  const handleAddBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrandName) return;
    try {
      await fetchApi('/taxonomies/brands', {
        method: 'POST',
        body: JSON.stringify({ name: newBrandName, isPopular: true }),
      });
      setNewBrandName('');
      loadBrands();
    } catch (e: any) {
      alert(e.message || 'Error al añadir marca');
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-2xl font-black text-white">Marcas y Taxonomías</h1>
        <p className="text-xs text-slate-400 mt-1">Gestión de marcas oficiales, modelos y carrocerías del sistema.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-brand-accent" />
            Añadir Nueva Marca
          </h3>
          <form onSubmit={handleAddBrand} className="space-y-3 text-xs">
            <input
              type="text"
              placeholder="Nombre de la marca (ej. Ferrari)"
              value={newBrandName}
              onChange={(e) => setNewBrandName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-brand-accent"
            />
            <button
              type="submit"
              className="w-full bg-brand-accent hover:bg-blue-600 text-white font-bold py-2.5 rounded-xl transition-colors"
            >
              Guardar Marca
            </button>
          </form>
        </div>

        <div className="md:col-span-2 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Tag className="w-4 h-4 text-brand-accent" />
            Marcas Registradas ({brands.length})
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            {brands.map((b) => (
              <div key={b.id} className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                <span className="font-bold text-white">{b.name}</span>
                <span className="text-[10px] text-slate-400 font-mono">/ {b.slug}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
