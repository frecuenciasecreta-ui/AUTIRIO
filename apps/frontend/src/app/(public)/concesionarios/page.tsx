import Link from 'next/link';
import { Dealership } from '@/lib/types';
import { Building2, MapPin, Phone, Mail, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

async function getDealerships(): Promise<Dealership[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/dealerships/public`, {
      next: { revalidate: 120 },
    });
    if (!res.ok) return getFallbackDealerships();
    return await res.json();
  } catch (e) {
    return getFallbackDealerships();
  }
}

function getFallbackDealerships(): Dealership[] {
  return [
    {
      id: 'd1',
      name: 'Iberia Motors Selección Madrid',
      slug: 'iberia-motors-madrid',
      email: 'contacto@iberiamotors.es',
      phone: '+34 912 345 678',
      whatsapp: '+34 600 112 233',
      province: 'Madrid',
      city: 'Pozuelo de Alarcón',
      isPartner: true,
    },
    {
      id: 'd2',
      name: 'Barcelona Automotive Excellence',
      slug: 'barcelona-automotive-excellence',
      email: 'ventas@bcnautomotive.es',
      phone: '+34 933 112 233',
      province: 'Barcelona',
      city: 'Sant Cugat del Vallès',
      isPartner: true,
    },
    {
      id: 'd3',
      name: 'Valencia Performance Cars',
      slug: 'valencia-performance-cars',
      email: 'info@valenciaperformance.es',
      phone: '+34 963 889 900',
      province: 'Valencia',
      city: 'Paterna',
      isPartner: true,
    },
  ];
}

export default async function DealershipsPage() {
  const dealerships = await getDealerships();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12 bg-[#040508]">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6">
        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-electric-cyan block">
            Red Certificada en España
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white">Concesionarios Colaboradores</h1>
          <p className="text-sm text-slate-400 font-medium">Garantía oficial e inventario verificado bajo el sistema de IMPERIUM Auto Digital.</p>
        </div>

        <Link
          href="/publica-con-nosotros"
          className="bg-gradient-to-r from-gold-600 via-gold-500 to-gold-700 hover:from-gold-500 hover:to-gold-600 text-slate-950 font-black text-xs px-6 py-4 rounded-2xl flex items-center gap-2 shadow-xl shadow-gold-500/20 transition-all hover:scale-105 uppercase tracking-wider"
        >
          <Sparkles className="w-4 h-4 text-slate-950" />
          Sumar mi Concesionario a la Red
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dealerships.map((d) => (
          <div key={d.id} className="glass-card-electric p-7 rounded-3xl border border-white/10 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-electric-500/20 border border-electric-500/30 flex items-center justify-center text-electric-cyan font-bold text-lg">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white line-clamp-1">{d.name}</h3>
                  <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Partner Verificado
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 text-xs text-slate-300 space-y-2.5 font-medium">
                <p className="flex items-center gap-2.5"><MapPin className="w-4 h-4 text-electric-cyan" /> {d.city ? `${d.city}, ` : ''}{d.province}</p>
                <p className="flex items-center gap-2.5"><Phone className="w-4 h-4 text-electric-cyan" /> {d.phone}</p>
                <p className="flex items-center gap-2.5"><Mail className="w-4 h-4 text-electric-cyan" /> {d.email}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80">
              <Link
                href={`/coches?dealershipId=${d.id}`}
                className="w-full bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-black py-3 px-4 rounded-xl flex items-center justify-center gap-2 border border-slate-700 transition-colors uppercase tracking-wider"
              >
                <span>Ver Inventario del Concesionario</span>
                <ArrowRight className="w-3.5 h-3.5 text-electric-cyan" />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
