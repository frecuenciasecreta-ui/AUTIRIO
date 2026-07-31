'use client';

import { useState } from 'react';
import Image from 'next/image';
import { VehicleImage } from '@/lib/types';

interface VehicleGalleryProps {
  images: VehicleImage[];
  title: string;
}

export default function VehicleGallery({ images, title }: VehicleGalleryProps) {
  const defaultImages = images && images.length > 0
    ? images
    : [{ id: '1', url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1200&q=80', isMain: true, displayOrder: 1 }];

  const [activeImage, setActiveImage] = useState<string>(defaultImages[0].url);

  return (
    <div className="space-y-4">
      {/* Main Large Display */}
      <div className="relative h-[420px] sm:h-[520px] w-full rounded-3xl overflow-hidden glass-panel border border-slate-800 bg-slate-950">
        <Image
          src={activeImage}
          alt={title}
          fill
          className="object-cover transition-opacity duration-300"
          priority
          sizes="(max-width: 1200px) 100vw, 66vw"
        />
      </div>

      {/* Thumbnails */}
      {defaultImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {defaultImages.map((img, idx) => (
            <button
              key={img.id || idx}
              onClick={() => setActiveImage(img.url)}
              className={`relative h-20 w-28 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                activeImage === img.url ? 'border-brand-accent scale-105 shadow-md shadow-blue-500/20' : 'border-slate-800 opacity-60 hover:opacity-100'
              }`}
            >
              <Image src={img.url} alt={`${title} foto ${idx + 1}`} fill className="object-cover" sizes="112px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
