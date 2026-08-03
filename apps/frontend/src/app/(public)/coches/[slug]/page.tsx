import { notFound } from 'next/navigation';
import VehicleGallery from '@/components/public/VehicleGallery';
import DgtBadge from '@/components/public/DgtBadge';
import FinancingCalculator from '@/components/public/FinancingCalculator';
import AdBannerSlot from '@/components/ads/AdBannerSlot';
import { Vehicle } from '@/lib/types';
import { 
  Calendar, Gauge, Zap, MessageSquare, ShieldCheck, MapPin, 
  Building2, CheckCircle2, Phone, Mail, CreditCard, Award, 
  Sparkles, Car, Sliders, Check, FileText, ChevronRight, Share2 
} from 'lucide-react';
import { Metadata, ResolvingMetadata } from 'next';

async function getVehicleBySlug(slug: string): Promise<Vehicle | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/vehicles/public/${slug}`, {
      cache: 'no-store',
    });
    if (!res.ok) return getFallbackVehicleBySlug(slug);
    const data = await res.json();
    return data || getFallbackVehicleBySlug(slug);
  } catch (e) {
    return getFallbackVehicleBySlug(slug);
  }
}

function getFallbackVehicleBySlug(slug: string): Vehicle | null {
  const fallbacks: Record<string, Vehicle> = {
    'porsche-911-carrera-gts-2024-madrid': {
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
      description: 'Espectacular unidad de Porsche 911 Carrera GTS PDK 480CV en estado impecable de reestreno. Equipado con paquete Sport Chrono, llantas Turbo S en negro satinado, sistema de escape deportivo conmutable, suspensión deportiva PASM (-10mm) y faros LED Matrix en negro. Historial completo de mantenimiento en Centro Porsche oficial. Garantía oficial de 12 meses incluida.',
      equipment: ['Paquete Sport Chrono', 'Frenos Cerámicos PCCB', 'Techo Solar Panorámico', 'Sistema de Sonido BOSE Surround', 'Faros LED Matrix PDLS+', 'Asientos Deportivos Plus Adaptativos (18 posiciones)'],
      isFeatured: true,
      isReserved: false,
      isSold: false,
      status: 'PUBLISHED',
      viewCount: 240,
      images: [
        { id: 'i1', url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1200&q=80', isMain: true, displayOrder: 1 },
        { id: 'i2', url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80', isMain: false, displayOrder: 2 },
      ],
      createdAt: new Date().toISOString(),
    },
    'mercedes-amg-gt-r-2023': {
      id: '2',
      title: 'Mercedes-AMG GT R Coupe V8 585CV',
      slug: 'mercedes-amg-gt-r-2023',
      brand: { id: 'b2', name: 'Mercedes-Benz', slug: 'mercedes-benz', isPopular: true },
      model: { id: 'm2', brandId: 'b2', name: 'AMG GT R', slug: 'amg-gt-r' },
      fuelType: { id: 'f1', name: 'Gasolina', code: 'GASOLINA' },
      dgtEcoLabel: { id: 'l1', code: 'C', name: 'Etiqueta C', colorBadge: '#0072CE' },
      price: 195000,
      year: 2023,
      kilometers: 12000,
      powerHp: 585,
      transmission: 'AUTOMATIC',
      doors: 2,
      seats: 2,
      description: 'La máxima expresión del automovilismo deportivo. Mercedes-AMG GT R de 585CV V8 Biturbo. Aerodinámica activa, dirección en el eje trasero, frenos carbocerámicos AMG y escape de titanio. Mantenimiento oficial Mercedes-AMG al día.',
      equipment: ['AMG Track Package', 'Frenos Carbocerámicos', 'Paquete de Carbono Exterior AMG', 'Bakets de Competición en Carbono', 'Sistema Burmester High-End 3D'],
      isFeatured: true,
      isReserved: false,
      isSold: false,
      status: 'PUBLISHED',
      viewCount: 190,
      images: [
        { id: 'i3', url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=80', isMain: true, displayOrder: 1 },
      ],
      createdAt: new Date().toISOString(),
    },
    'porsche-taycan-turbo-s-2023-barcelona': {
      id: '3',
      title: 'Porsche Taycan Turbo S 761CV Performance Plus',
      slug: 'porsche-taycan-turbo-s-2023-barcelona',
      brand: { id: 'b1', name: 'Porsche', slug: 'porsche', isPopular: true },
      model: { id: 'm3', brandId: 'b1', name: 'Taycan Turbo S', slug: 'porsche-taycan' },
      fuelType: { id: 'f2', name: '100% Eléctrico', code: 'ELECTRICO_BEV' },
      dgtEcoLabel: { id: 'l2', code: 'CERO', name: 'Etiqueta CERO', colorBadge: '#00A3E0' },
      price: 154900,
      year: 2023,
      kilometers: 14200,
      powerHp: 761,
      transmission: 'AUTOMATIC',
      doors: 4,
      seats: 4,
      description: 'Superdeportivo 100% eléctrico con etiqueta CERO DGT. Aceleración de 0 a 100 km/h en 2.8 segundos. Batería Performance Plus de 93.4 kWh con autonomía extendida. Carga ultrarrápida de 270kW (5 a 80% en 22 minutos).',
      equipment: ['Porsche InnoDrive', 'Sonido Burmester 3D High-End', 'Eje Trasero Direccional', 'Suspensión Neumática Adaptativa PASM', 'Pantalla para el Acompañante'],
      isFeatured: true,
      isReserved: false,
      isSold: false,
      status: 'PUBLISHED',
      viewCount: 310,
      images: [
        { id: 'i4', url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80', isMain: true, displayOrder: 1 },
      ],
      createdAt: new Date().toISOString(),
    },
    'bmw-m4-competition-2023': {
      id: '4',
      title: 'BMW M4 Competition Coupé M xDrive 510CV',
      slug: 'bmw-m4-competition-2023',
      brand: { id: 'b3', name: 'BMW', slug: 'bmw', isPopular: true },
      model: { id: 'm4', brandId: 'b3', name: 'M4 Competition', slug: 'bmw-m4' },
      fuelType: { id: 'f1', name: 'Gasolina', code: 'GASOLINA' },
      dgtEcoLabel: { id: 'l1', code: 'C', name: 'Etiqueta C', colorBadge: '#0072CE' },
      price: 108500,
      year: 2023,
      kilometers: 19000,
      powerHp: 510,
      transmission: 'AUTOMATIC',
      doors: 2,
      seats: 4,
      description: 'Impresionante BMW M4 Competition Coupé M xDrive de 510CV. Tracción integral inteligente M xDrive con modo 2WD para propulsión trasera pura. Color Isle of Man Green metallic con cuero Merino negro.',
      equipment: ['M Drive Professional', 'Diferencial M Sport', 'Head-Up Display', 'Asientos Baquet M en Carbono', 'Faros Láser BMW'],
      isFeatured: true,
      isReserved: false,
      isSold: false,
      status: 'PUBLISHED',
      viewCount: 175,
      images: [
        { id: 'i5', url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&q=80', isMain: true, displayOrder: 1 },
      ],
      createdAt: new Date().toISOString(),
    },
  };

  return fallbacks[slug] || fallbacks['porsche-911-carrera-gts-2024-madrid'];
}

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const vehicle = await getVehicleBySlug(params.slug);

  if (!vehicle) {
    return {
      title: 'Vehículo no encontrado - Autirio',
    };
  }

  const title = `${vehicle.title} de Segunda Mano Certificado | Autirio`;
  const description = `${vehicle.title} en excelente estado. ${vehicle.year}, ${vehicle.kilometers} km, ${vehicle.powerHp} CV. Certificado y garantizado en Autirio.`;
  const image = vehicle.images?.[0]?.url || 'https://autirio.com/default-car.jpg';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [image],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function VehicleDetailPage({ params }: { params: { slug: string } }) {
  const vehicle = await getVehicleBySlug(params.slug);

  if (!vehicle) {
    notFound();
  }

  const formattedPrice = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(vehicle?.price || 0);
  const formattedKm = new Intl.NumberFormat('es-ES').format(vehicle?.kilometers || 0);

  // Autonal-style estimated monthly financing payment calculation (e.g., 60 months with 20% down)
  const price = vehicle?.price || 0;
  const estimatedMonthly = Math.round((price * 0.8) / 60 * 1.15);
  const formattedMonthly = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(estimatedMonthly);

  // Schema.org Vehicle JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Car',
    name: vehicle.title,
    description: vehicle.description,
    brand: {
      '@type': 'Brand',
      name: vehicle.brand?.name,
    },
    model: vehicle.model?.name,
    vehicleModelDate: vehicle.year?.toString(),
    mileageFromOdometer: {
      '@type': 'QuantitativeValue',
      value: vehicle.kilometers,
      unitCode: 'KMT',
    },
    fuelType: vehicle.fuelType?.name,
    vehicleEngine: {
      '@type': 'EngineSpecification',
      enginePower: {
        '@type': 'QuantitativeValue',
        value: vehicle.powerHp,
        unitCode: 'HP',
      },
    },
    offers: {
      '@type': 'Offer',
      price: vehicle.price,
      priceCurrency: 'EUR',
      availability: vehicle.isSold ? 'https://schema.org/Sold' : 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/UsedCondition',
    },
    image: vehicle.images?.map((img) => img.url) || [],
  };

  const whatsappMsg = encodeURIComponent(`Hola, estoy interesado en recibir asesoría sobre el vehículo: ${vehicle.title} (${formattedPrice}). ¿Sigue disponible?`);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Schema.org Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* AUTONAL BREADCRUMB HEADER */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
          <span className="hover:text-white transition-colors cursor-pointer">Inicio</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="hover:text-white transition-colors cursor-pointer">Carros Usados</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-brand-accent">{vehicle.brand?.name}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-slate-200 truncate max-w-xs">{vehicle.title}</span>
        </div>

        {/* AUTONAL TOP VEHICLE TITLE & FINANCING BANNER HEADER */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/80 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-[#0A0E17] via-slate-900/90 to-[#07090D]">
          
          <div className="space-y-3">
            {/* Badges Bar */}
            <div className="flex flex-wrap items-center gap-2.5">
              <DgtBadge code={vehicle.dgtEcoLabel?.code || 'C'} size="sm" />
              <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-extrabold px-3 py-1 rounded-lg uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Certificado Autirio
              </span>
              <span className="bg-brand-accent/10 border border-brand-accent/30 text-brand-accent text-[11px] font-bold px-3 py-1 rounded-lg uppercase tracking-wider">
                Garantía 12 Meses Incluida
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">{vehicle.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-brand-accent" />
                {vehicle.dealership?.province || 'Madrid'}, España
              </span>
              <span>•</span>
              <span>Ref: #{vehicle.id.slice(0, 8)}</span>
              <span>•</span>
              <span className="text-emerald-400 font-bold">100% Disponible</span>
            </div>
          </div>

          {/* Autonal Price Box */}
          <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl md:text-right min-w-[260px] shadow-xl">
            <span className="text-[11px] font-extrabold text-brand-accent uppercase tracking-wider block">Fináncialo desde</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 my-0.5">
              {formattedMonthly} <span className="text-xs font-semibold text-slate-400">/ mes*</span>
            </div>
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between md:justify-end gap-3 text-xs">
              <span className="text-slate-400 font-semibold">Precio de Contado:</span>
              <span className="text-xl font-black text-white">{formattedPrice}</span>
            </div>
          </div>

        </div>
      </div>

      {/* MAIN TWO-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Gallery, Specs Grid, Description, Equipment, Calculator */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Autonal Photo Stage Gallery */}
          <VehicleGallery images={vehicle.images || []} title={vehicle.title} />

          {/* AUTONAL QUICK SPECS GRID (CARACTERÍSTICAS PRINCIPALES) */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/80 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-brand-accent" />
                Ficha Técnica y Datos Clave
              </h3>
              <span className="text-xs text-slate-400 font-medium">Revisado en 150 puntos</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              
              <div className="bg-slate-950/80 border border-slate-800/80 p-4 rounded-2xl flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center text-brand-accent">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Año Modelo</span>
                  <span className="text-sm font-black text-white">{vehicle.year}</span>
                </div>
              </div>

              <div className="bg-slate-950/80 border border-slate-800/80 p-4 rounded-2xl flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center text-brand-accent">
                  <Gauge className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Kilometraje</span>
                  <span className="text-sm font-black text-white">{formattedKm} km</span>
                </div>
              </div>

              <div className="bg-slate-950/80 border border-slate-800/80 p-4 rounded-2xl flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Potencia</span>
                  <span className="text-sm font-black text-white">{vehicle.powerHp} CV</span>
                </div>
              </div>

              <div className="bg-slate-950/80 border border-slate-800/80 p-4 rounded-2xl flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Transmisión</span>
                  <span className="text-sm font-black text-white">{vehicle.transmission === 'AUTOMATIC' ? 'Automática' : 'Manual'}</span>
                </div>
              </div>

              <div className="bg-slate-950/80 border border-slate-800/80 p-4 rounded-2xl flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Combustible</span>
                  <span className="text-sm font-black text-white">{vehicle.fuelType?.name || 'Gasolina'}</span>
                </div>
              </div>

              <div className="bg-slate-950/80 border border-slate-800/80 p-4 rounded-2xl flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Etiqueta DGT</span>
                  <span className="text-sm font-black text-white">{vehicle.dgtEcoLabel?.name || 'Etiqueta C'}</span>
                </div>
              </div>

            </div>
          </div>

          {/* DESCRIPTION & VEHICLE HISTORY */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/80 space-y-4">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-accent" />
              Descripción e Historial del Vehículo
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line font-normal">
              {vehicle.description}
            </p>
          </div>

          {/* AUTONAL EQUIPMENT & FEATURES LIST */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/80 space-y-6">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Equipamiento y Seguridad Destacada
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200">
              {(vehicle.equipment && vehicle.equipment.length > 0 ? vehicle.equipment : [
                'Sistema de navegación GPS integrando pantalla táctil',
                'Asistente de aparcamiento con sensores y cámara trasera',
                'Faros LED adaptativos con encendido automático',
                'Control de crucero adaptativo con frenada de emergencia',
                'Climatizador automático bizona',
                'Conectividad Apple CarPlay / Android Auto inalámbrico',
                'Llantas de aleación ligera homologadas',
                'Sistema de sonido envolvente premium'
              ]).map((item, idx) => (
                <div key={idx} className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FINANCING SIMULATOR */}
          <FinancingCalculator vehiclePrice={vehicle.price} />

        </div>

        {/* RIGHT COLUMN: STICKY AUTONAL DIRECT CONTACT SIDEBAR */}
        <div className="lg:col-span-4 space-y-6 sticky top-24">
          
          {/* Autonal Contact Box */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/80 space-y-6 shadow-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-black">
            
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-accent block">Intermediación Directa</span>
              <h3 className="text-xl font-black text-white">¿Te interesa este vehículo?</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Un asesor experto atenderá tus dudas de inmediato, gestionará tu prueba de conducción o te enviará una propuesta de financiación a medida.
              </p>
            </div>

            {/* Direct WhatsApp CTA Button (GREEN AUTONAL STYLE) */}
            <a
              href={`https://wa.me/34600112233?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'generate_lead', {
                    event_category: 'engagement',
                    event_label: 'whatsapp_click',
                    value: vehicle.price
                  });
                }
              }}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-4 px-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-emerald-600/30 transition-all hover:scale-[1.02] text-sm"
            >
              <MessageSquare className="w-5 h-5 fill-current" />
              Contactar por WhatsApp
            </a>

            {/* Secondary Financing Button */}
            <a
              href={`https://wa.me/34600112233?text=${encodeURIComponent(`Hola, quiero solicitar la simulación de financiación para el coche: ${vehicle.title}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-4 rounded-2xl border border-slate-700 flex items-center justify-center gap-2 transition-colors text-xs"
            >
              <CreditCard className="w-4 h-4 text-brand-accent" />
              Solicitar Financiación Personalizada
            </a>

            {/* Contact Phone & Email */}
            <div className="pt-4 border-t border-slate-800 space-y-3 text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center text-brand-accent">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">Atención Telefónica</span>
                  <a href="tel:+34912345678" className="font-extrabold text-white hover:text-brand-accent transition-colors">+34 912 345 678</a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center text-brand-accent">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">Correo Electrónico</span>
                  <span className="font-semibold text-slate-200">ventas@automaestro.es</span>
                </div>
              </div>
            </div>

          </div>

          {/* AUTONAL GUARANTEE BADGE CARD */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800/80 space-y-4">
            <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Garantía Autirio Selección
            </h4>

            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>Inspección de 150 Puntos:</strong> Motor, chasis y electrónica verificados.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>Envío a Domicilio:</strong> Entrega gestionada en cualquier punto de España.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>Garantía Oficial Mínima:</strong> 12 meses con cobertura nacional.</span>
              </li>
            </ul>
          </div>

          {/* Ad Slot Sidebar */}
          <AdBannerSlot placementCode="VEHICLE_DETAIL_RIGHT" />

        </div>

      </div>

    </div>
  );
}
