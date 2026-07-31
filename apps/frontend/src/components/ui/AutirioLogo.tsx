import React from 'react';

interface AutirioLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'icon';
}

export default function AutirioLogo({ className = 'h-10', variant = 'light' }: AutirioLogoProps) {
  const isIcon = variant === 'icon';
  const textColor = variant === 'light' ? '#FFFFFF' : '#0A0E17';
  
  return (
    <svg 
      viewBox={isIcon ? "0 0 100 100" : "0 0 400 100"} 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="blueGradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00A3E0" />
          <stop offset="1" stopColor="#0066FF" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* ICON PART (The stylized 'A' with car silhouette) */}
      <g transform={isIcon ? "translate(10, 10) scale(0.8)" : "translate(0, 10) scale(0.8)"}>
        {/* The 'A' shape */}
        <path 
          d="M50 10 L15 80 H35 L50 45 L65 80 H85 L50 10Z" 
          fill="url(#blueGradient)" 
        />
        {/* Car Silhouette Cutout / Overlay */}
        <path 
          d="M10 65 Q 30 55, 45 52 T 75 55 Q 90 60, 95 65 L 90 70 Q 75 62, 50 62 T 15 70 Z" 
          fill="#0A0E17" 
          stroke="#00A3E0"
          strokeWidth="1.5"
          filter="url(#glow)"
        />
      </g>

      {/* TEXT PART (Only if not icon variant) */}
      {!isIcon && (
        <g transform="translate(100, 55)">
          <text 
            x="0" 
            y="0" 
            fontFamily="Inter, sans-serif" 
            fontWeight="900" 
            fontSize="42" 
            fill={textColor}
            letterSpacing="0.15em"
          >
            AUT<tspan fill="url(#blueGradient)">I</tspan>RIO
          </text>
          
          <text 
            x="4" 
            y="22" 
            fontFamily="Inter, sans-serif" 
            fontWeight="600" 
            fontSize="9" 
            fill="#64748B"
            letterSpacing="0.25em"
          >
            TU PRÓXIMO <tspan fill="#00A3E0">AUTO</tspan>, TU MEJOR <tspan fill="#00A3E0">ELECCIÓN</tspan>
          </text>
        </g>
      )}
    </svg>
  );
}
