import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Vehicle } from '@/lib/types';
import DgtBadge from './DgtBadge';
import { Calendar, Gauge, Zap, MessageSquare, ArrowRight, MapPin, Sparkles } from 'lucide-react';

interface CarCardProps {
  vehicle: Vehicle;
}

export default function CarCard({ vehicle }: CarCardProps) {
  const mainImage = vehicle.images?.find((img) => img.isMain)?.url || vehicle.images?.[0]?.url || 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&q=80';

  const formattedPrice = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(vehicle?.price || 0);
  const formattedKm = new Intl.NumberFormat('es-ES').format(vehicle?.kilometers || 0);

  const whatsappMessage = encodeURIComponent(`Hola, estoy interesado en el vehículo: ${vehicle.title} (${formattedPrice}) publicado en IMPERIUM Auto Digital.`);

  return (
    <div className="glass-card-electric rounded-3xl overflow-hidden group flex flex-col justify-between relative border border-white/10 hover:border-electric-500/60 shadow-xl transition-all duration-500">
      
      {/* Image Container with Zoom & Glow Overlay */}
      <div className="relative h-60 w-full overflow-hidden bg-slate-950">
        <Image
          src={mainImage}
          alt={vehicle.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-2 z-10">
          {vehicle.isFeatured && (
            <span className="bg-gradient-to-r from-gold-600 to-gold-500 text-slate-950 font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-lg shadow-lg flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-slate-950" />
              Selección
            </span>
          )}
          <DgtBadge code={vehicle.dgtEcoLabel?.code || 'C'} size="sm" />
        </div>

        {/* Location Badge */}
        <div className="absolute top-3.5 right-3.5 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-[10px] font-bold text-slate-300 flex items-center gap-1">
          <MapPin className="w-3 h-3 text-electric-cyan" />
          <span>Madrid, España</span>
        </div>

        {/* Price Pill */}
        <div className="absolute bottom-3.5 right-3.5 bg-slate-950/90 backdrop-blur-md px-4 py-1.5 rounded-2xl border border-electric-cyan/30 shadow-xl">
          <span className="text-xl font-black electric-gradient-text">{formattedPrice}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-electric-300 block mb-1">
            {vehicle.brand?.name} • {vehicle.model?.name}
          </span>
          
          <Link href={`/coches/${vehicle.slug}`}>
            <h3 className="text-lg font-black text-white group-hover:text-electric-cyan transition-colors line-clamp-1">
              {vehicle.title}
            </h3>
          </Link>

          {/* Specs Grid */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-3.5 border-t border-slate-800/80 text-xs text-slate-300 font-medium">
            <div className="flex items-center gap-1.5 bg-slate-900/60 p-2 rounded-xl border border-slate-800">
              <Calendar className="w-3.5 h-3.5 text-electric-300" />
              <span>{vehicle.year}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/60 p-2 rounded-xl border border-slate-800">
              <Gauge className="w-3.5 h-3.5 text-electric-300" />
              <span>{formattedKm} km</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/60 p-2 rounded-xl border border-slate-800">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>{vehicle.powerHp} CV</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between gap-3">
          <Link
            href={`/coches/${vehicle.slug}`}
            className="flex-1 bg-gradient-to-r from-electric-600 to-electric-500 hover:from-electric-500 hover:to-electric-cyan text-white text-xs font-black py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-electric-500/20 uppercase tracking-wider"
          >
            <span>Ver Ficha Técnica</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <a
            href={`https://wa.me/34600112233?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 p-3 rounded-xl flex items-center justify-center transition-colors shadow-lg"
            title="Consultar por WhatsApp"
          >
            <MessageSquare className="w-4 h-4" />
          </a>
        </div>
      </div>

    </div>
  );
}
