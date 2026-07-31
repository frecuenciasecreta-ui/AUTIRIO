'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AdCampaign } from '@/lib/types';
import { fetchApi } from '@/lib/api';

interface AdBannerSlotProps {
  placementCode: string;
  className?: string;
}

export default function AdBannerSlot({ placementCode, className = '' }: AdBannerSlotProps) {
  const [ad, setAd] = useState<AdCampaign | null>(null);

  useEffect(() => {
    fetchApi<AdCampaign | null>(`/ads/placement/${placementCode}`)
      .then((res) => setAd(res))
      .catch(() => setAd(null));
  }, [placementCode]);

  if (!ad) return null;

  const handleClick = () => {
    if (ad.id) {
      fetchApi(`/ads/click/${ad.id}`, { method: 'POST' }).catch(() => {});
    }
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-1 group ${className}`}>
      <span className="absolute top-2 right-2 text-[9px] font-bold text-slate-400 bg-black/60 px-1.5 py-0.5 rounded uppercase z-10">
        Publicidad
      </span>

      {ad.type === 'IMAGE' && ad.imageUrl && (
        <a
          href={ad.targetUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="block relative w-full h-32 md:h-40 rounded-xl overflow-hidden"
        >
          <Image src={ad.imageUrl} alt={ad.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
        </a>
      )}

      {ad.type === 'CUSTOM_HTML' && ad.customHtml && (
        <div
          dangerouslySetInnerHTML={{ __html: ad.customHtml }}
          onClick={handleClick}
          className="w-full text-xs text-slate-300"
        />
      )}

      {ad.type === 'GOOGLE_ADSENSE' && (
        <div className="p-4 text-center text-xs text-slate-400 border border-dashed border-slate-700 rounded-xl">
          [ Espacio Google AdSense - Slot ID: {ad.adSenseSlotId || 'default'} ]
        </div>
      )}
    </div>
  );
}
