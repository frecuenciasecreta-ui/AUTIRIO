import Link from 'next/link';
import HeroSearch from '@/components/public/HeroSearch';
import HeroShowcase from '@/components/public/HeroShowcase';
import CarCard from '@/components/public/CarCard';
import DgtBadge from '@/components/public/DgtBadge';
import AdBannerSlot from '@/components/ads/AdBannerSlot';
import AutirioLogo from '@/components/ui/AutirioLogo';
import { Vehicle } from '@/lib/types';
import { 
  ShieldCheck, Sparkles, Building2, TrendingUp, Award, ArrowRight, 
  Video, Target, Rocket, CheckCircle2, ChevronRight, Sliders, PlayCircle 
} from 'lucide-react';

async function getFeaturedVehicles(): Promise<Vehicle[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/vehicles/public?isFeatured=true&limit=6`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return getFallbackVehicles();
    const result = await res.json();
    const list = result?.data || result?.vehicles;
    if (Array.isArray(list) && list.length > 0) {
      return list;
    }
    return getFallbackVehicles();
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
      
      {/* HERO SHOWCASE PRESENTATION BANNER */}
      <HeroShowcase />

      {/* QUICK SEARCH BAR SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <HeroSearch />

        {/* Popular Brand Pills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 text-xs text-slate-400">
          <span className="font-semibold text-slate-300">Marcas más buscadas:</span>
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

      {/* IMPERIUM ECOSYSTEM SHOWCASE SECTION (3 PILLARS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-accent block">
            Infraestructura Comercial Externa para Concesionarios
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            El Ecosistema IMPERIUM Auto Digital
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-medium">
            Integramos tres capas especializadas para acelerar la rotación de inventarios manteniendo intacto el importe neto del concesionario.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1: IMPERIUM Media */}
          <div className="glass-panel p-8 rounded-3xl border border-slate-800/80 space-y-5 bg-gradient-to-b from-slate-900/80 to-slate-950 hover:border-brand-accent/50 transition-all hover:scale-[1.02] shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-brand-accent/15 border border-brand-accent/30 flex items-center justify-center text-brand-accent">
              <Video className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-accent block">Capa 01</span>
            <h3 className="text-xl font-black text-white">IMPERIUM Media</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Producción audiovisual 4K de alta calidad, Reels verticales, vídeos sin presentador, fotografía de detalle y guiones diseñados para destacar en redes.
            </p>
            <ul className="text-xs text-slate-400 space-y-2 pt-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Fotografías de Estudio y Detalle</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Vídeos Verticales para Reels & TikTok</li>
            </ul>
          </div>

          {/* Pillar 2: IMPERIUM Performance */}
          <div className="glass-panel p-8 rounded-3xl border border-slate-800/80 space-y-5 bg-gradient-to-b from-slate-900/80 to-slate-950 hover:border-emerald-500/50 transition-all hover:scale-[1.02] shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Target className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 block">Capa 02</span>
            <h3 className="text-xl font-black text-white">IMPERIUM Performance</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Campañas de publicidad digital segmentadas en Google Ads, Meta Ads (Instagram/Facebook) y retargeting activo para captar compradores de alta capacidad.
            </p>
            <ul className="text-xs text-slate-400 space-y-2 pt-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Publicidad Segmentada en España</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Captación de Compradores Cualificados</li>
            </ul>
          </div>

          {/* Pillar 3: IMPERIUM Commerce */}
          <div className="glass-panel p-8 rounded-3xl border border-slate-800/80 space-y-5 bg-gradient-to-b from-slate-900/80 to-slate-950 hover:border-amber-500/50 transition-all hover:scale-[1.02] shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Rocket className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 block">Capa 03</span>
            <h3 className="text-xl font-black text-white">IMPERIUM Commerce</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Gestión comercial inicial de las consultas, filtrado de presupuestos, confirmación de formas de pago y coordinación directa de citas con el concesionario.
            </p>
            <ul className="text-xs text-slate-400 space-y-2 pt-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Importe Neto 100% Protegido</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Prueba Piloto de 45 Días sin Riesgo</li>
            </ul>
          </div>

        </div>
      </section>

      {/* AD BANNER HERO SLOT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdBannerSlot placementCode="HOME_HERO" />
      </div>

      {/* FEATURED VEHICLES CATALOG */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-accent block mb-1">
              Selección Certificada
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Inventario en Exposición</h2>
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
                  <p className="text-slate-400">Descuentos en peajes e impuesto de circulación reducido hasta un 75%.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* B2B CONCESIONARIOS PILOT PROGRAM HIGH-CONVERSION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-brand-accent/40 p-8 sm:p-14 shadow-2xl">
          
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/20 border border-brand-accent/30 text-brand-accent text-xs font-bold">
              <Building2 className="w-4 h-4" />
              Exclusivo para Concesionarios en España
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Activa una Prueba Piloto de 45 Días sin Riesgo
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Seleccionamos 3 vehículos de tu concesionario, acordamos el precio neto que necesitas recibir, producimos contenido profesional y generamos compradores. Si no vendemos, no pagas honorarios por éxito.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/publica-con-nosotros"
                className="bg-brand-accent hover:bg-blue-600 text-white font-black text-sm px-8 py-4 rounded-2xl shadow-xl shadow-blue-600/30 flex items-center gap-2 transition-all hover:scale-105 uppercase tracking-wider"
              >
                <Sparkles className="w-5 h-5 text-amber-400" />
                Solicitar Prueba Piloto (3 Vehículos)
              </Link>
              <Link
                href="/concesionarios"
                className="bg-slate-900/80 hover:bg-slate-800 text-white font-bold text-sm px-6 py-4 rounded-2xl border border-slate-700 transition-colors"
              >
                Ver Concesionarios Aliados
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
