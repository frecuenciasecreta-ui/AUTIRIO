import { ShieldCheck, Building2, Mail, MapPin } from 'lucide-react';

export default function AvisoLegalPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      
      <div className="border-b border-slate-800 pb-6 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-accent">
          Cumplimiento LSSI-CE Ley 34/2002
        </span>
        <h1 className="text-3xl font-black text-white">Aviso Legal e Información General</h1>
        <p className="text-xs text-slate-400">Última actualización: Julio 2026</p>
      </div>

      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 space-y-6 text-xs text-slate-300 leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">1. Datos Identificativos del Titular</h2>
          <p>
            En cumplimiento con el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), se facilitan los siguientes datos informativos de la plataforma web:
          </p>
          <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-1.5 text-slate-200 font-mono">
            <p><strong>Denominación Social:</strong> AutoMaestro España S.L. / Titular de la plataforma</p>
            <p><strong>NIF/CIF:</strong> B-87654321</p>
            <p><strong>Domicilio Social:</strong> Paseo de la Castellana 180, 28046 Madrid, España</p>
            <p><strong>Email de Contacto:</strong> legal@automaestro.es</p>
            <p><strong>Teléfono:</strong> +34 900 834 210</p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">2. Objeto y Naturaleza del Servicio</h2>
          <p>
            AutoMaestro es un portal de intermediación publicitaria y gestión administrada de catálogo de vehículos en España. La plataforma NO realiza ventas directas de vehículos ni custodia la propiedad de los automóviles anunciados. La responsabilidad sobre las características técnicas, estado de conservación, transferencias y garantías mecánicas corresponde exclusivamente a los concesionarios colaboradores o vendedores finales anunciantes.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">3. Propiedad Intelectual e Industrial</h2>
          <p>
            Todos los derechos de propiedad intelectual del contenido de este sitio web, su diseño gráfico, código fuente en Next.js/NestJS, logotipos, marcas y fotografías pertenecen a AutoMaestro o a sus licenciantes autorizados. Queda prohibida la reproducción total o parcial sin autorización expresa por escrito.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">4. Legislación Aplicable y Jurisdicción</h2>
          <p>
            Para la resolución de todas las controversias o cuestiones relacionadas con el presente sitio web o de las actividades en él desarrolladas, será de aplicación la legislación española, sometiéndose las partes expresamente a los Juzgados y Tribunales de Madrid Capital.
          </p>
        </section>

      </div>

    </div>
  );
}
