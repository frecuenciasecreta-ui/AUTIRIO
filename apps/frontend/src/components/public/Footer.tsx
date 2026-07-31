import Link from 'next/link';
import { ShieldCheck, Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import AutirioLogo from '@/components/ui/AutirioLogo';

export default function Footer() {
  return (
    <footer className="bg-[#06080B] border-t border-slate-800/80 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/60">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-5 md:col-span-1">
            <Link href="/" className="inline-block transition-transform hover:scale-105">
              <AutirioLogo className="h-10 sm:h-12 w-auto drop-shadow-lg" variant="light" />
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              La plataforma de referencia para la compra y venta gestionada de vehículos de gama alta y selección profesional en España.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-brand-accent" /> Paseo de la Castellana 180, Madrid</p>
              <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-brand-accent" /> +34 900 834 210</p>
              <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-brand-accent" /> info@automaestro.es</p>
            </div>
          </div>

          {/* Col 2: SEO Popular Searches in Spain */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Categorías Destacadas DGT</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/coches?dgtEcoLabelId=CERO" className="hover:text-brand-accent transition-colors">Vehículos Etiqueta CERO (BEV/PHEV)</Link></li>
              <li><Link href="/coches?dgtEcoLabelId=ECO" className="hover:text-brand-accent transition-colors">Coches con Etiqueta ECO DGT</Link></li>
              <li><Link href="/coches?fuelTypeId=ELECTRICO_BEV" className="hover:text-brand-accent transition-colors">Deportivos 100% Eléctricos</Link></li>
              <li><Link href="/coches?brandId=porsche" className="hover:text-brand-accent transition-colors">Porsche de Selección Certificada</Link></li>
              <li><Link href="/coches?transmission=AUTOMATIC" className="hover:text-brand-accent transition-colors">SUVs Automáticos de Lujo</Link></li>
            </ul>
          </div>

          {/* Col 3: For Dealerships & B2B Partners */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Para Concesionarios</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/publica-con-nosotros" className="text-brand-accent font-semibold flex items-center gap-1.5 hover:underline">
                  <Sparkles className="w-3.5 h-3.5" />
                  Publica tu Catálogo Profesional
                </Link>
              </li>
              <li><Link href="/publica-con-nosotros" className="hover:text-white transition-colors">Anuncia tus Vehículos</Link></li>
              <li><Link href="/publica-con-nosotros" className="hover:text-white transition-colors">Haz Crecer tu Concesionario</Link></li>
              <li><Link href="/concesionarios" className="hover:text-white transition-colors">Red de Concesionarios Colaboradores</Link></li>
            </ul>
          </div>

          {/* Col 4: Trust & Compliance */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Garantía y Seguridad</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Plataforma auditada. Publicación y gestión 100% administrada por expertos para garantizar anuncios verificados y sin fraude.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/80 p-3 rounded-lg border border-slate-800">
              <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span>Verificación técnica y legal de cada vehículo</span>
            </div>
          </div>

        </div>

        {/* Bottom copyright & Legal links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Autirio España S.L. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6 mt-4 sm:mt-0 font-medium">
            <Link href="/aviso-legal" className="hover:text-white transition-colors">Aviso Legal</Link>
            <Link href="/politica-de-privacidad" className="hover:text-white transition-colors">Política de Privacidad</Link>
            <Link href="/politica-de-cookies" className="hover:text-white transition-colors">Política de Cookies</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
