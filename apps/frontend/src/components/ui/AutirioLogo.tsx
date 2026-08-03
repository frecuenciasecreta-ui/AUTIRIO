import React from 'react';
import Image from 'next/image';

interface AutirioLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'icon';
}

export default function AutirioLogo({ className = 'h-10 w-auto', variant = 'light' }: AutirioLogoProps) {
  return (
    <div className={`relative flex items-center ${className}`}>
      <Image
        src="/imperium-logo.png"
        alt="IMPERIUM Auto Digital"
        width={360}
        height={100}
        priority
        className="object-contain max-h-full w-auto drop-shadow-[0_0_15px_rgba(212,175,55,0.15)]"
      />
    </div>
  );
}
