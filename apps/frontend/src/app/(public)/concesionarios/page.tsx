import Link from 'next/link';
import { Dealership } from '@/lib/types';
import { Building2, MapPin, Phone, Mail, Sparkles, CheckCircle2 } from 'lucide-react';

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
  ];
}

export default async function DealershipsPage() {
  const dealerships = await getDealerships();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-accent block mb-1">
            Red Certificada en España
          </span>
          <h1 className="text-3xl font-black text-white">Concesionarios Colaboradores</h1>
          <p className="text-xs text-slate-400 mt-1">Garantía oficial y stock verificado directamente por el equipo de AutoMaestro.</p>
        </div>

        <Link
          href="/publica-con-nosotros"
          className="bg-brand-accent hover:bg-blue-600 text-white font-bold text-xs px-5 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-blue-600/20"
        >
          <Sparkles className="w-4 h-4 text-gold-500" />
          Sumar mi Concesionario a la Red
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dealerships.map((d) => (
          <div key={d.id} className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-accent/20 border border-brand-accent/30 flex items-center justify-center text-brand-accent font-bold text-lg">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white line-clamp-1">{d.name}</h3>
                <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Partner Verificado
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 text-xs text-slate-300 space-y-2">
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-400" /> {d.city ? `${d.city}, ` : ''}{d.province}</p>
              <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-slate-400" /> {d.phone}</p>
              <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-slate-400" /> {d.email}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
