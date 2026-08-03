import Link from 'next/link';
import HeroSearch from '@/components/public/HeroSearch';
import HeroShowcase from '@/components/public/HeroShowcase';
import CarCard from '@/components/public/CarCard';
import DgtBadge from '@/components/public/DgtBadge';
import AdBannerSlot from '@/components/ads/AdBannerSlot';
import AutirioLogo from '@/components/ui/AutirioLogo';
import { Vehicle } from '@/lib/types';
import { ShieldCheck, Sparkles, Building2, TrendingUp, Award, ArrowRight } from 'lucide-react';

async function getFeaturedVehicles(): Promise<Vehicle[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/vehicles/public?isFeatured=true&limit=6`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return getFallbackVehicles();
    const data = await res.json();
    return data.vehicles || getFallbackVehicles();
  } catch (e) {
    return getFallbackVehicles();
  }
}

function getFallbackVehicles(): Vehicle[] {
  return [
    {
      id: '1',
      title: 'Porsche 911 Carrera GTS PDK 480CV',
      slug: 'porsche-911-carrera-gts-2024-madrid',
      brand: { id: 'b1', name: 'Porsche', slug: 'porsche', isPopular: true },
      model: { id: 'm1', brandId: 'b1', name: '911 Carrera GTS', slug: 'porsche-911' },
      fuelType: { id: 'f1', name: 'Gasolina', code: 'GASOLINA' },
      dgtEcoLabel: { id: 'l1', code: 'C', name: 'Etiqueta C', colorBadge: '#0072CE' },
      price: 189900,
      year: 2024,
      kilometers: 8500,
      powerHp: 480,
      transmission: 'AUTOMATIC',
      doors: 2,
      seats: 4,
      description: 'Unidad de reestreno exclusiva.',
      equipment: ['Sport Chrono', 'Frenos cerámicos', 'Techo panorámico'],
      isFeatured: true,
      isReserved: false,
      isSold: false,
      status: 'PUBLISHED',
      viewCount: 120,
      images: [
        { id: 'i1', url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&q=80', isMain: true, displayOrder: 1 },
      ],
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Porsche Taycan Turbo S 761CV Performance Plus',
      slug: 'porsche-taycan-turbo-s-2023-barcelona',
      brand: { id: 'b1', name: 'Porsche', slug: 'porsche', isPopular: true },
      model: { id: 'm2', brandId: 'b1', name: 'Taycan Turbo S', slug: 'porsche-taycan' },
      fuelType: { id: 'f2', name: '100% Eléctrico', code: 'ELECTRICO_BEV' },
      dgtEcoLabel: { id: 'l2', code: 'CERO', name: 'Etiqueta CERO', colorBadge: '#00A3E0' },
      price: 154900,
      year: 2023,
      kilometers: 14200,
      powerHp: 761,
      transmission: 'AUTOMATIC',
      doors: 4,
      seats: 4,
      description: 'Superdeportivo 100% eléctrico con etiqueta CERO DGT.',
      equipment: ['Porsche InnoDrive', 'Sonido Burmester', 'PASM'],
      isFeatured: true,
      isReserved: false,
      isSold: false,
      status: 'PUBLISHED',
      viewCount: 310,
      images: [
        { id: 'i2', url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80', isMain: true, displayOrder: 1 },
      ],
      createdAt: new Date().toISOString(),
    },
  ];
}

export default async function HomePage() {
  const featuredCars = await getFeaturedVehicles();

  return (
    <div className="space-y-20 pb-20">
      
      {/* HERO SHOWCASE PRESENTATION BANNER (CARMAX STYLE) */}
      <HeroShowcase />

      {/* QUICK SEARCH BAR SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <HeroSearch />

        {/* Popular Brand Pills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 text-xs text-slate-400">
          <span className="font-semibold text-slate-300">Marcas populares:</span>
          {['Porsche', 'BMW', 'Mercedes-Benz', 'Tesla', 'Audi', 'Ferrari'].map((b) => (
            <Link
              key={b}
              href={`/coches?search=${b}`}
              className="bg-slate-900/90 hover:bg-slate-800 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 transition-colors"
            >
              {b}
            </Link>
          ))}
        </div>
      </div>

      {/* AD BANNER HERO SLOT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdBannerSlot placementCode="HOME_HERO" />
      </div>

      {/* FEATURED VEHICLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-accent block mb-1">
              Colección Exclusiva
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Vehículos Destacados</h2>
          </div>

          <Link href="/coches" className="text-sm font-bold text-brand-accent hover:text-blue-400 flex items-center gap-1">
            Ver Todos los Coches ({featuredCars.length}+)
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCars.map((car) => (
            <CarCard key={car.id} vehicle={car} />
          ))}
        </div>
      </section>

      {/* AD BANNER MIDDLE SLOT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdBannerSlot placementCode="HOME_MIDDLE" />
      </div>

      {/* DGT ECO LABELS BANNER IN SPAIN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            <div className="space-y-4">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                Zonas de Bajas Emisiones (ZBE España)
              </span>
              <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                Circula sin Restricciones con Etiquetas DGT CERO y ECO
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Encuentra tu próximo vehículo 100% eléctrico o híbrido en Madrid, Barcelona, Valencia y principales ciudades.
              </p>
              
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <DgtBadge code="CERO" size="lg" />
                <DgtBadge code="ECO" size="lg" />
                <DgtBadge code="C" size="lg" />
              </div>
            </div>

            <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4 text-xs">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-brand-accent flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-white">Etiqueta CERO Emisiones</h4>
                  <p className="text-slate-400">Aparcamiento gratuito en zona SER y acceso total a ZBE sin restricciones.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-white">Etiqueta ECO</h4>
                  <p className="text-slate-400">Descuentos en peajes, impuesto de circulación reducidos hasta un 75%.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* B2B CONCESIONARIOS / PUBLICA CON NOSOTROS HIGH-CONVERSION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-brand-accent/40 p-8 sm:p-14 shadow-2xl">
          
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/20 border border-brand-accent/30 text-brand-accent text-xs font-bold">
              <Building2 className="w-4 h-4" />
              Exclusivo para Concesionarios y Profesionales
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              ¿Quieres Anunciar tus Vehículos en AutoMaestro?
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              No somos un marketplace abierto. Gestionamos directamente el posicionamiento de tu stock ante compradores de alta capacidad adquisitiva en España. Solicitudes comerciales revisadas en menos de 24h.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/publica-con-nosotros"
                className="bg-brand-accent hover:bg-blue-600 text-white font-black text-sm px-8 py-4 rounded-xl shadow-xl shadow-blue-600/30 flex items-center gap-2 transition-all hover:scale-105"
              >
                <Sparkles className="w-5 h-5 text-gold-500" />
                Publica con Nosotros
              </Link>
              <Link
                href="/publica-con-nosotros"
                className="bg-slate-900/80 hover:bg-slate-800 text-white font-bold text-sm px-6 py-4 rounded-xl border border-slate-700 transition-colors"
              >
                Solicitar Reunión Comercial
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
