import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Vehicle } from '@/lib/types';
import DgtBadge from './DgtBadge';
import { Calendar, Gauge, Zap, MessageSquare, ArrowRight } from 'lucide-react';

interface CarCardProps {
  vehicle: Vehicle;
}

export default function CarCard({ vehicle }: CarCardProps) {
  const mainImage = vehicle.images?.find((img) => img.isMain)?.url || vehicle.images?.[0]?.url || 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&q=80';

  const formattedPrice = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(vehicle?.price || 0);
  const formattedKm = new Intl.NumberFormat('es-ES').format(vehicle?.kilometers || 0);

  const whatsappMessage = encodeURIComponent(`Hola, estoy interesado en el vehículo: ${vehicle.title} (${formattedPrice}) publicado en AutoMaestro.`);

  return (
    <div className="glass-card rounded-2xl overflow-hidden group flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5">
      
      {/* Image Container */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-900">
        <Image
          src={mainImage}
          alt={vehicle.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          {vehicle.isFeatured && (
            <span className="bg-gold-500/90 backdrop-blur-md text-black font-extrabold text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-md shadow-md">
              Destacado
            </span>
          )}
          <DgtBadge code={vehicle.dgtEcoLabel?.code || 'C'} size="sm" />
        </div>

        {/* Price Pill */}
        <div className="absolute bottom-3 right-3 bg-background/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-700/80 shadow-lg">
          <span className="text-lg font-black text-white">{formattedPrice}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-accent mb-1 block">
            {vehicle.brand?.name} • {vehicle.model?.name}
          </span>
          <Link href={`/coches/${vehicle.slug}`}>
            <h3 className="text-base font-bold text-white group-hover:text-brand-accent transition-colors line-clamp-1">
              {vehicle.title}
            </h3>
          </Link>

          {/* Specs Grid */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{vehicle.year}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-slate-400" />
              <span>{formattedKm} km</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-slate-400 text-amber-400" />
              <span>{vehicle.powerHp} CV</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between gap-3">
          <Link
            href={`/coches/${vehicle.slug}`}
            className="flex-1 bg-slate-800/90 hover:bg-slate-700 text-white text-xs font-semibold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
          >
            Ver Detalles
            <ArrowRight className="w-3.5 h-3.5 text-brand-accent" />
          </Link>

          <a
            href={`https://wa.me/34600112233?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-400 p-2.5 rounded-xl flex items-center justify-center transition-colors"
            title="Consultar por WhatsApp"
          >
            <MessageSquare className="w-4 h-4" />
          </a>
        </div>
      </div>

    </div>
  );
}
