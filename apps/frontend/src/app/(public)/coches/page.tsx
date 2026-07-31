'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import CarCard from '@/components/public/CarCard';
import AdBannerSlot from '@/components/ads/AdBannerSlot';
import { Vehicle } from '@/lib/types';
import { fetchApi } from '@/lib/api';
import { SlidersHorizontal, Search, RefreshCw } from 'lucide-react';

function CatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filters state
  const [brandId, setBrandId] = useState(searchParams.get('brandId') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [fuelTypeId, setFuelTypeId] = useState(searchParams.get('fuelTypeId') || '');
  const [dgtEcoLabelId, setDgtEcoLabelId] = useState(searchParams.get('dgtEcoLabelId') || '');
  const [transmission, setTransmission] = useState(searchParams.get('transmission') || '');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [orderBy, setOrderBy] = useState('createdAt_desc');

  const loadVehicles = async (isLoadMore = false) => {
    if (isLoadMore) setLoadingMore(true);
    else setLoading(true);

    const query = new URLSearchParams();
    if (brandId) query.append('brandId', brandId);
    if (maxPrice) query.append('maxPrice', maxPrice);
    if (fuelTypeId) query.append('fuelTypeId', fuelTypeId);
    if (dgtEcoLabelId) query.append('dgtEcoLabelId', dgtEcoLabelId);
    if (transmission) query.append('transmission', transmission);
    if (search) query.append('search', search);
    if (orderBy) query.append('orderBy', orderBy);
    query.append('page', String(page));
    query.append('limit', '12');

    try {
      const data = await fetchApi<{ data: Vehicle[]; meta: { total: number; totalPages: number } }>(`/vehicles/public?${query.toString()}`);
      if (isLoadMore) {
        setVehicles(prev => [...prev, ...(data.data || [])]);
      } else {
        setVehicles(data.data || []);
      }
      setTotal(data.meta?.total || 0);
      setTotalPages(data.meta?.totalPages || 1);
    } catch (e) {
      if (!isLoadMore) setVehicles([]);
      setTotal(0);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [brandId, maxPrice, fuelTypeId, dgtEcoLabelId, transmission, orderBy, search]);

  useEffect(() => {
    loadVehicles(page > 1);
  }, [brandId, maxPrice, fuelTypeId, dgtEcoLabelId, transmission, orderBy, search, page]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  const resetFilters = () => {
    setBrandId('');
    setMaxPrice('');
    setFuelTypeId('');
    setDgtEcoLabelId('');
    setTransmission('');
    setSearch('');
    setPage(1);
    router.push('/coches');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header title */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-3xl font-black text-white">Catálogo de Vehículos Selección</h1>
          <p className="text-xs text-slate-400 mt-1">Mostrando {total} vehículos verificados disponibles en España</p>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-medium">Ordenar por:</span>
          <select
            value={orderBy}
            onChange={(e) => setOrderBy(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-accent"
          >
            <option value="createdAt_desc">Más Recientes primero</option>
            <option value="price_asc">Precio: de menor a mayor</option>
            <option value="price_desc">Precio: de mayor a menor</option>
            <option value="year_desc">Año: más nuevos primero</option>
            <option value="km_asc">Kilometraje: menor a mayor</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* SIDEBAR FILTERS */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-brand-accent" />
                Filtros de Búsqueda
              </span>
              <button onClick={resetFilters} className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1">
                <RefreshCw className="w-3 h-3" /> Limpiar
              </button>
            </div>

            {/* Keyword Search */}
            <form onSubmit={handleSearchSubmit}>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Palabra Clave</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Porsche, GTS, Madrid..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-brand-accent pr-8"
                />
                <button type="submit" className="absolute right-2.5 top-3 text-slate-400 hover:text-white">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Brand */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Marca</label>
              <select
                value={brandId}
                onChange={(e) => setBrandId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-brand-accent"
              >
                <option value="">Todas las Marcas</option>
                <option value="porsche">Porsche</option>
                <option value="bmw">BMW</option>
                <option value="mercedes-benz">Mercedes-Benz</option>
                <option value="tesla">Tesla</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Precio Máximo</label>
              <select
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-brand-accent"
              >
                <option value="">Cualquier Precio</option>
                <option value="50000">Hasta 50.000 €</option>
                <option value="100000">Hasta 100.000 €</option>
                <option value="150000">Hasta 150.000 €</option>
                <option value="200000">Hasta 200.000 €</option>
              </select>
            </div>

            {/* DGT Eco Label */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Etiqueta DGT</label>
              <select
                value={dgtEcoLabelId}
                onChange={(e) => setDgtEcoLabelId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-brand-accent"
              >
                <option value="">Todas las Etiquetas</option>
                <option value="CERO">🔵 Etiqueta CERO</option>
                <option value="ECO">🟢 Etiqueta ECO</option>
                <option value="C">🟢 Etiqueta C</option>
                <option value="B">🟡 Etiqueta B</option>
              </select>
            </div>

            {/* Transmission */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Transmisión</label>
              <select
                value={transmission}
                onChange={(e) => setTransmission(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-brand-accent"
              >
                <option value="">Cualquiera</option>
                <option value="AUTOMATIC">Automático</option>
                <option value="MANUAL">Manual</option>
              </select>
            </div>

          </div>

          {/* Sidebar Ad Placement */}
          <AdBannerSlot placementCode="LISTING_SIDEBAR" />
        </div>

        {/* MAIN VEHICLES GRID */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="py-20 text-center text-slate-400 space-y-3">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto text-brand-accent" />
              <p className="text-sm">Cargando inventario de vehículos...</p>
            </div>
          ) : vehicles.length === 0 ? (
            <div className="glass-panel p-12 text-center rounded-3xl border border-slate-800 space-y-4">
              <p className="text-base font-bold text-white">No se encontraron vehículos con los filtros seleccionados.</p>
              <p className="text-xs text-slate-400">Prueba a modificar los rangos de precio o limpiar los filtros.</p>
              <button
                onClick={resetFilters}
                className="bg-brand-accent text-white font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-blue-600 transition-colors"
              >
                Restablecer Filtros
              </button>
            </div>
            <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {vehicles.map((v) => (
                  <CarCard key={v.id} vehicle={v} />
                ))}
              </div>
              
              {page < totalPages && (
                <div className="text-center mt-10">
                  <button
                    onClick={() => setPage(p => p + 1)}
                    disabled={loadingMore}
                    className="bg-slate-900 border border-slate-700 text-white font-bold text-xs px-8 py-3 rounded-xl hover:border-brand-accent transition-colors disabled:opacity-50"
                  >
                    {loadingMore ? 'Cargando...' : 'Cargar más vehículos'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-400">
        <RefreshCw className="w-8 h-8 animate-spin mx-auto text-brand-accent mb-2" />
        <p className="text-sm">Cargando catálogo...</p>
      </div>
    }>
      <CatalogContent />
    </Suspense>
  );
}
