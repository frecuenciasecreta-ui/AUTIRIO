'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter, Sparkles } from 'lucide-react';

export default function HeroSearch() {
  const router = useRouter();
  const [brandId, setBrandId] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [fuelTypeId, setFuelTypeId] = useState('');
  const [dgtEcoLabelId, setDgtEcoLabelId] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (brandId) params.append('brandId', brandId);
    if (maxPrice) params.append('maxPrice', maxPrice);
    if (fuelTypeId) params.append('fuelTypeId', fuelTypeId);
    if (dgtEcoLabelId) params.append('dgtEcoLabelId', dgtEcoLabelId);

    router.push(`/coches?${params.toString()}`);
  };

  return (
    <div className="w-full glass-card-gold p-6 sm:p-8 rounded-3xl border border-gold-500/30 shadow-2xl">
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
        
        {/* Brand */}
        <div>
          <label className="block text-xs font-black text-slate-300 uppercase tracking-widest mb-2">Marca</label>
          <select
            value={brandId}
            onChange={(e) => setBrandId(e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-700 text-white rounded-xl px-3.5 py-3 text-xs font-bold focus:outline-none focus:border-gold-400 transition-colors"
          >
            <option value="">Todas las Marcas</option>
            <option value="porsche">Porsche</option>
            <option value="bmw">BMW</option>
            <option value="mercedes-benz">Mercedes-Benz</option>
            <option value="tesla">Tesla</option>
          </select>
        </div>

        {/* Max Price */}
        <div>
          <label className="block text-xs font-black text-slate-300 uppercase tracking-widest mb-2">Precio Máximo</label>
          <select
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-700 text-white rounded-xl px-3.5 py-3 text-xs font-bold focus:outline-none focus:border-gold-400 transition-colors"
          >
            <option value="">Sin Límite de Precio</option>
            <option value="50000">Hasta 50.000 €</option>
            <option value="100000">Hasta 100.000 €</option>
            <option value="150000">Hasta 150.000 €</option>
            <option value="200000">Hasta 200.000 €</option>
          </select>
        </div>

        {/* Fuel Type */}
        <div>
          <label className="block text-xs font-black text-slate-300 uppercase tracking-widest mb-2">Propulsión</label>
          <select
            value={fuelTypeId}
            onChange={(e) => setFuelTypeId(e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-700 text-white rounded-xl px-3.5 py-3 text-xs font-bold focus:outline-none focus:border-gold-400 transition-colors"
          >
            <option value="">Todos los Combustibles</option>
            <option value="ELECTRICO_BEV">100% Eléctrico (BEV)</option>
            <option value="HIBRIDO_ENCHUFABLE_PHEV">Híbrido Enchufable (PHEV)</option>
            <option value="GASOLINA">Gasolina</option>
            <option value="DIESEL">Diésel</option>
          </select>
        </div>

        {/* DGT Eco Label */}
        <div>
          <label className="block text-xs font-black text-slate-300 uppercase tracking-widest mb-2">Etiqueta DGT</label>
          <select
            value={dgtEcoLabelId}
            onChange={(e) => setDgtEcoLabelId(e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-700 text-white rounded-xl px-3.5 py-3 text-xs font-bold focus:outline-none focus:border-gold-400 transition-colors"
          >
            <option value="">Cualquier Etiqueta</option>
            <option value="CERO">🔵 DGT CERO Emisiones</option>
            <option value="ECO">🟢 DGT ECO</option>
            <option value="C">🟢 DGT C</option>
            <option value="B">🟡 DGT B</option>
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-gold-600 via-gold-500 to-gold-700 hover:from-gold-500 hover:to-gold-600 text-slate-950 font-black py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-gold-500/20 transition-all duration-200 uppercase tracking-wider text-xs"
          >
            <Search className="w-4 h-4 text-slate-950" />
            Buscar Vehículos
          </button>
        </div>

      </form>
    </div>
  );
}
