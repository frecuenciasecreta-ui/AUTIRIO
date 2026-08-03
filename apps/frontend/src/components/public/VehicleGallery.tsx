'use client';

import { useState } from 'react';
import Image from 'next/image';
import { VehicleImage } from '@/lib/types';
import { Maximize2, ShieldCheck, Camera } from 'lucide-react';

interface VehicleGalleryProps {
  images: VehicleImage[];
  title: string;
}

export default function VehicleGallery({ images, title }: VehicleGalleryProps) {
  const defaultImages = images && images.length > 0
    ? images
    : [
        { id: '1', url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1200&q=80', isMain: true, displayOrder: 1 },
        { id: '2', url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80', isMain: false, displayOrder: 2 },
        { id: '3', url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&q=80', isMain: false, displayOrder: 3 },
      ];

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const activeImage = defaultImages[activeIndex]?.url || defaultImages[0].url;

  return (
    <div className="space-y-4">
      
      {/* MAIN FEATURED PHOTO STAGE (AUTONAL STYLE) */}
      <div className="relative h-[400px] sm:h-[500px] lg:h-[550px] w-full rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl group">
        
        <Image
          src={activeImage}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
          sizes="(max-width: 1200px) 100vw, 66vw"
        />

        {/* Gradient Overlay for badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" />

        {/* Autonal Certification Badge */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-slate-900/90 backdrop-blur-md border border-emerald-500/50 text-emerald-400 text-xs font-extrabold px-3.5 py-2 rounded-xl shadow-xl">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Fotografías Reales Certificadas</span>
        </div>

        {/* Counter Pill */}
        <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xl">
          <Camera className="w-4 h-4 text-brand-accent" />
          <span>{activeIndex + 1} / {defaultImages.length} Fotos</span>
        </div>

        {/* Expand Fullscreen Button */}
        <button
          onClick={() => setIsFullscreen(true)}
          className="absolute bottom-4 right-4 z-10 bg-slate-900/90 hover:bg-brand-accent text-white p-2.5 rounded-xl border border-slate-700/80 shadow-xl transition-all hover:scale-110"
          title="Ver en Pantalla Completa"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* THUMBNAILS CAROUSEL */}
      {defaultImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {defaultImages.map((img, idx) => (
            <button
              key={img.id || idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative h-20 w-28 flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all ${
                activeIndex === idx
                  ? 'border-brand-accent scale-105 shadow-lg shadow-blue-500/20 opacity-100 ring-2 ring-brand-accent/50'
                  : 'border-slate-800 opacity-60 hover:opacity-100'
              }`}
            >
              <Image src={img.url} alt={`${title} foto ${idx + 1}`} fill className="object-cover" sizes="112px" />
            </button>
          ))}
        </div>
      )}

      {/* FULLSCREEN MODAL */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-6 right-6 text-white text-sm font-bold bg-slate-800 hover:bg-rose-600 px-4 py-2 rounded-xl transition-colors z-50"
          >
            Cerrar [ESC]
          </button>
          <div className="relative w-full max-w-5xl h-[80vh]">
            <Image src={activeImage} alt={title} fill className="object-contain" />
          </div>
        </div>
      )}

    </div>
  );
}
