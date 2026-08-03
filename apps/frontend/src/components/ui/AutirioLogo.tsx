import React from 'react';

interface AutirioLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'icon';
}

export default function AutirioLogo({ className = 'h-10 w-auto', variant = 'light' }: AutirioLogoProps) {
  const isIcon = variant === 'icon';

  return (
    <svg 
      viewBox={isIcon ? "0 0 120 120" : "0 0 540 120"} 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Luxury Gold Metallic Gradient */}
        <linearGradient id="goldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2C6" />
          <stop offset="30%" stopColor="#E5C158" />
          <stop offset="70%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#8A6D24" />
        </linearGradient>

        {/* Titanium Silver Metallic Gradient */}
        <linearGradient id="silverMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="40%" stopColor="#F1F5F9" />
          <stop offset="80%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>

        {/* Ambient Gold Glow Filter */}
        <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* MONOGRAM 'IA' + CAR ROOF SILHOUETTE ICON */}
      <g transform={isIcon ? "translate(10, 10) scale(0.9)" : "translate(10, 5) scale(0.85)"}>
        {/* Letter 'I' */}
        <rect x="24" y="20" width="10" height="52" rx="1.5" fill="url(#goldMetallic)" />

        {/* Letter 'A' (Peak & Right Stem) */}
        <path 
          d="M62 20 L40 72 H51 L62 44 L73 72 H84 L62 20Z" 
          fill="url(#goldMetallic)" 
        />

        {/* Sweeping Gold Car Roof Silhouette */}
        <path 
          d="M4 64 Q 28 48, 52 46 T 94 53 Q 112 56, 124 60 C 114 57, 95 52, 75 51 Q 50 50, 24 59 Z" 
          fill="url(#goldMetallic)"
          filter="url(#goldGlow)"
        />
      </g>

      {/* TEXT PART (IMPERIUM - AUTO DIGITAL -) */}
      {!isIcon && (
        <g transform="translate(135, 62)">
          {/* IMPERIUM (Titanium Silver Metallic) */}
          <text 
            x="0" 
            y="0" 
            fontFamily="Inter, system-ui, sans-serif" 
            fontWeight="900" 
            fontSize="38" 
            fill="url(#silverMetallic)"
            letterSpacing="0.22em"
          >
            IMPERIUM
          </text>

          {/* — AUTO DIGITAL — (Champagne Gold Metallic) */}
          <g transform="translate(2, 24)">
            {/* Left Accent Line */}
            <line x1="0" y1="-4" x2="38" y2="-4" stroke="url(#goldMetallic)" strokeWidth="1.8" />
            
            {/* AUTO DIGITAL Text */}
            <text 
              x="48" 
              y="0" 
              fontFamily="Inter, system-ui, sans-serif" 
              fontWeight="800" 
              fontSize="12" 
              fill="url(#goldMetallic)"
              letterSpacing="0.36em"
            >
              AUTO DIGITAL
            </text>

            {/* Right Accent Line */}
            <line x1="240" y1="-4" x2="278" y2="-4" stroke="url(#goldMetallic)" strokeWidth="1.8" />
          </g>
        </g>
      )}
    </svg>
  );
}
