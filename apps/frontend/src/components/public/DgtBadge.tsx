import React from 'react';

interface DgtBadgeProps {
  code: 'CERO' | 'ECO' | 'C' | 'B' | 'SIN_ETIQUETA' | string;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function DgtBadge({ code, name, size = 'md' }: DgtBadgeProps) {
  let badgeClass = 'bg-slate-700 text-white';
  let labelText = name || code;

  switch (code) {
    case 'CERO':
      badgeClass = 'badge-dgt-cero';
      labelText = 'DGT CERO';
      break;
    case 'ECO':
      badgeClass = 'badge-dgt-eco';
      labelText = 'DGT ECO';
      break;
    case 'C':
      badgeClass = 'badge-dgt-c';
      labelText = 'DGT C';
      break;
    case 'B':
      badgeClass = 'badge-dgt-b';
      labelText = 'DGT B';
      break;
    default:
      badgeClass = 'bg-slate-800 text-slate-400 font-semibold text-xs px-2 py-0.5 rounded';
      labelText = 'Sin Etiqueta';
  }

  const sizeClasses = size === 'sm' ? 'text-[10px] px-2 py-0.5' : size === 'lg' ? 'text-sm px-3 py-1.5' : 'text-xs px-2.5 py-1';

  return (
    <span className={`inline-flex items-center font-bold tracking-wider rounded ${badgeClass} ${sizeClasses}`}>
      {labelText}
    </span>
  );
}
