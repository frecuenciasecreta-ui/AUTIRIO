import Link from 'next/link';
import Image from 'next/image';
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
    <div className="space-y-24 pb-20 bg-[#040508]">
      
      {/* 1. HERO SHOWCASE PRESENTATION BANNER */}
      <HeroShowcase />

      {/* 2. QUICK SEARCH BAR SECTION */}
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

      {/* 3. FEATURED VEHICLES CATALOG (MÁXIMA VISIBILIDAD DE VENTA DE COCHES DE PRIMERA MANO) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-electric-cyan block mb-1">
              Catálogo de Selección Certificado
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Inventario en Exposición</h2>
          </div>

          <Link href="/coches" className="text-sm font-bold text-electric-cyan hover:text-white flex items-center gap-1.5 transition-colors">
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

      {/* AD BANNER HERO SLOT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdBannerSlot placementCode="HOME_HERO" />
      </div>

      {/* 4. DGT ECO LABELS BANNER IN SPAIN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card-electric p-8 sm:p-12 rounded-3xl border border-electric-500/20 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            <div className="space-y-4">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                Zonas de Bajas Emisiones (ZBE España)
              </span>
              <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                Circula sin Restricciones con Etiquetas DGT CERO y ECO
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed font-medium">
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
                <ShieldCheck className="w-6 h-6 text-electric-cyan flex-shrink-0" />
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

      {/* ORGANIC SECTION DIVIDER */}
      <div className="relative max-w-7xl mx-auto my-12 pointer-events-none">
        <div className="h-px bg-gradient-to-r from-transparent via-electric-500/30 to-transparent w-full" />
        <div className="absolute left-1/2 -translate-x-1/2 -top-3 px-4 bg-[#040508]">
          <div className="w-6 h-6 rounded-full bg-electric-500/10 border border-electric-500/30 flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-electric-cyan" />
          </div>
        </div>
      </div>

      {/* 5. IMPERIUM ECOSYSTEM CHESS LAYOUT (B2B INFRAESTRUCTURA DE CONCESIONARIOS AL FINAL DE LA PORTADA) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-6">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-gold-400 block">
            Infraestructura Comercial Externa para Concesionarios
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            El Ecosistema IMPERIUM Auto Digital
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-medium">
            Tres capas especializadas de marketing audiovisual y comercialización para acelerar la rotación de tu inventario.
          </p>
        </div>

        {/* CHESS ITEM 1: IMPERIUM MEDIA (Media a la izquierda, Texto a la derecha) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 relative h-72 sm:h-96 rounded-3xl overflow-hidden border border-gold-500/20 bg-slate-950 shadow-2xl group">
            <Image
              src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1000&q=80"
              alt="IMPERIUM Media Producción 4K"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <span className="bg-gold-500/20 backdrop-blur-md border border-gold-500/40 text-gold-300 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
                🎥 Producción 4K & Reels
              </span>
              <div className="w-10 h-10 rounded-full bg-slate-900/90 border border-slate-700 flex items-center justify-center text-gold-400">
                <PlayCircle className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 lg:pl-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-wider">
              Capa 01 • Producción Audiovisual
            </div>
            <h3 className="text-3xl font-black text-white leading-tight">
              IMPERIUM Media
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-medium">
              Transformamos vehículos estáticos en piezas de deseo. Producimos vídeos en calidad 4K, Reels verticales optimizados para TikTok e Instagram, fotografías de detalle y guiones orientados a la venta.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" /> Fotografías de Estudio y Detalle Técnico</li>
              <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" /> Vídeos Verticales de Alta Tasa de Retención</li>
              <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" /> Guiones sin Presentador Orientados a Convertir</li>
            </ul>

            <div className="pt-2">
              <Link
                href="/publica-con-nosotros"
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-950 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-700 px-6 py-3.5 rounded-xl shadow-lg shadow-gold-500/20 hover:scale-105 transition-all"
              >
                Solicitar Muestra de Vídeo Gratuita
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

        {/* CHESS ITEM 2: IMPERIUM PERFORMANCE (Texto a la izquierda, Media a la derecha) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-8">
          
          <div className="lg:col-span-6 space-y-6 lg:pr-6 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              Capa 02 • Captación Digital
            </div>
            <h3 className="text-3xl font-black text-white leading-tight">
              IMPERIUM Performance
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-medium">
              Desplegamos campañas de publicidad altamente segmentadas en Google Ads y Meta Ads para alcanzar compradores de alto poder adquisitivo en España en búsqueda activa de vehículos.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Segmentación Geográfica y Socioeconómica</li>
              <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Retargeting Continuo de Compradores Cualificados</li>
              <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Medición en Tiempo Real de Leads Generados</li>
            </ul>

            <div className="pt-2">
              <Link
                href="/publica-con-nosotros"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-200 bg-slate-900 border border-slate-700 hover:border-emerald-500 px-6 py-3.5 rounded-xl transition-all"
              >
                Ver Estrategia de Captación
                <ChevronRight className="w-4 h-4 text-emerald-400" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative h-72 sm:h-96 rounded-3xl overflow-hidden border border-emerald-500/20 bg-slate-950 shadow-2xl group order-1 lg:order-2">
            <Image
              src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1000&q=80"
              alt="IMPERIUM Performance Ads"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <span className="bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
                🎯 Campañas Google & Meta Ads
              </span>
            </div>
          </div>

        </div>

        {/* CHESS ITEM 3: IMPERIUM COMMERCE (Media a la izquierda, Texto a la derecha) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-8">
          
          <div className="lg:col-span-6 relative h-72 sm:h-96 rounded-3xl overflow-hidden border border-gold-500/20 bg-slate-950 shadow-2xl group">
            <Image
              src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1000&q=80"
              alt="IMPERIUM Commerce Plan Piloto"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <span className="bg-gold-500/20 backdrop-blur-md border border-gold-500/40 text-gold-300 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
                🚀 Prueba Piloto 45 Días sin Riesgo
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 lg:pl-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-wider">
              Capa 03 • Gestión Comercial
            </div>
            <h3 className="text-3xl font-black text-white leading-tight">
              IMPERIUM Commerce
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-medium">
              Gestión inicial de consultas, filtrado de presupuestos y coordinación de citas. Operamos bajo el modelo de <strong>Importe Neto Protegido</strong>: el concesionario fija lo que necesita recibir y nuestro honorario se suma dentro del precio público.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" /> Prueba Piloto con 3 Vehículos por 45 Días</li>
              <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" /> Cero Coste de Fijo Mensual</li>
              <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" /> Compradores Filtrados y Citas Agendadas</li>
            </ul>

            <div className="pt-2">
              <Link
                href="/publica-con-nosotros"
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-950 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-700 px-6 py-3.5 rounded-xl shadow-lg shadow-gold-500/20 hover:scale-105 transition-all"
              >
                Solicitar Prueba Piloto 3 Vehículos
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

      </section>

      {/* 6. B2B CONCESIONARIOS PILOT PROGRAM HIGH-CONVERSION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-[#0A0E17] border border-gold-500/40 p-8 sm:p-14 shadow-2xl">
          
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-bold">
              <Building2 className="w-4 h-4" />
              Exclusivo para Concesionarios en España
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Activa una Prueba Piloto de 45 Días sin Riesgo
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
              Seleccionamos 3 vehículos de tu concesionario, acordamos el precio neto que necesitas recibir, producimos contenido profesional y generamos compradores. Si no vendemos, no pagas honorarios por éxito.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/publica-con-nosotros"
                className="bg-gradient-to-r from-gold-600 via-gold-500 to-gold-700 hover:from-gold-500 hover:to-gold-600 text-slate-950 font-black text-sm px-8 py-4 rounded-2xl shadow-xl shadow-gold-500/20 flex items-center gap-2 transition-all hover:scale-105 uppercase tracking-wider"
              >
                <Sparkles className="w-5 h-5 text-slate-950" />
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
