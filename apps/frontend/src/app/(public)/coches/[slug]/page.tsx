import { notFound } from 'next/navigation';
import VehicleGallery from '@/components/public/VehicleGallery';
import DgtBadge from '@/components/public/DgtBadge';
import FinancingCalculator from '@/components/public/FinancingCalculator';
import AdBannerSlot from '@/components/ads/AdBannerSlot';
import { Vehicle } from '@/lib/types';
import { Calendar, Gauge, Zap, MessageSquare, ShieldCheck, MapPin, Building2, CheckCircle2, Phone, Mail } from 'lucide-react';
import { Metadata, ResolvingMetadata } from 'next';

async function getVehicleBySlug(slug: string): Promise<Vehicle | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/vehicles/public/${slug}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
  } catch (e) {
    return null;
  }
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

  const title = `${vehicle.title} de segunda mano | Autirio`;
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

  const formattedPrice = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(vehicle.price);
  const formattedKm = new Intl.NumberFormat('es-ES').format(vehicle.kilometers);

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

  const whatsappMsg = encodeURIComponent(`Hola, quisiera más información sobre el vehículo: ${vehicle.title} (${formattedPrice}).`);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Schema.org Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HEADER BREADCRUMB & TITLE */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
          <span>Inicio</span>
          <span>/</span>
          <span>Catálogo</span>
          <span>/</span>
          <span>{vehicle.brand?.name}</span>
          <span>/</span>
          <span className="text-white font-medium">{vehicle.title}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <DgtBadge code={vehicle.dgtEcoLabel?.code || 'C'} size="lg" />
              <span className="text-xs font-bold uppercase tracking-wider text-brand-accent">
                {vehicle.brand?.name} • {vehicle.model?.name}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white">{vehicle.title}</h1>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-2">
              <MapPin className="w-3.5 h-3.5 text-brand-accent" />
              {vehicle.dealership?.province || 'Madrid'}, España • Ref: #{vehicle.id.slice(0, 8)}
            </p>
          </div>

          <div className="text-left md:text-right">
            <span className="text-xs text-slate-400 block uppercase font-bold tracking-wider">Precio Final Certificado</span>
            <span className="text-4xl font-black text-white">{formattedPrice}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* LEFT COLUMN: Gallery & Specs */}
        <div className="lg:col-span-2 space-y-10">
          
          <VehicleGallery images={vehicle.images || []} title={vehicle.title} />

          {/* Quick Specs Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="glass-panel p-4 rounded-2xl border border-slate-800 text-center">
              <Calendar className="w-5 h-5 text-brand-accent mx-auto mb-1.5" />
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Año Matriculación</span>
              <span className="text-base font-bold text-white">{vehicle.year}</span>
            </div>

            <div className="glass-panel p-4 rounded-2xl border border-slate-800 text-center">
              <Gauge className="w-5 h-5 text-brand-accent mx-auto mb-1.5" />
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Kilometraje</span>
              <span className="text-base font-bold text-white">{formattedKm} km</span>
            </div>

            <div className="glass-panel p-4 rounded-2xl border border-slate-800 text-center">
              <Zap className="w-5 h-5 text-amber-400 mx-auto mb-1.5" />
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Potencia</span>
              <span className="text-base font-bold text-white">{vehicle.powerHp} CV</span>
            </div>

            <div className="glass-panel p-4 rounded-2xl border border-slate-800 text-center">
              <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto mb-1.5" />
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Transmisión</span>
              <span className="text-base font-bold text-white">{vehicle.transmission === 'AUTOMATIC' ? 'Automático' : 'Manual'}</span>
            </div>
          </div>

          {/* Description */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-black text-white">Descripción y Historial</h3>
            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">{vehicle.description}</p>
          </div>

          {/* Equipment list */}
          {vehicle.equipment && vehicle.equipment.length > 0 && (
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="text-lg font-black text-white">Equipamiento Destacado</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                {vehicle.equipment.map((eq, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{eq}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Financing Calculator */}
          <FinancingCalculator vehiclePrice={vehicle.price} />

        </div>

        {/* RIGHT COLUMN: Contact Sidebar & Dealership card */}
        <div className="space-y-6">
          
          {/* WhatsApp Direct CTA */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-5">
            <h3 className="text-base font-bold text-white">¿Interesado en este coche?</h3>
            <p className="text-xs text-slate-400">
              Solicita información inmediata o reserva una prueba de conducción gestionada.
            </p>

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
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              Contactar por WhatsApp
            </a>

            <div className="pt-2 border-t border-slate-800 text-xs text-slate-300 space-y-2">
              <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-brand-accent" /> +34 912 345 678</p>
              <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-brand-accent" /> ventas@automaestro.es</p>
            </div>
          </div>

          {/* Dealership Info */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-3">
              <Building2 className="w-6 h-6 text-brand-accent" />
              <div>
                <h4 className="text-sm font-bold text-white">{vehicle.dealership?.name || 'Iberia Motors Selección'}</h4>
                <p className="text-[11px] text-slate-400">Concesionario Colaborador Oficial</p>
              </div>
            </div>
            <p className="text-xs text-slate-400">Garantía oficial mínima de 12 meses incluida en toda España.</p>
          </div>

          {/* Ad Slot Right */}
          <AdBannerSlot placementCode="VEHICLE_DETAIL_RIGHT" />

        </div>

      </div>

    </div>
  );
}
