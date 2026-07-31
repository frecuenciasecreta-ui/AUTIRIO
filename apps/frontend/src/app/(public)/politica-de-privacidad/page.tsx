import { ShieldCheck } from 'lucide-react';

export default function PoliticaPrivacidadPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      
      <div className="border-b border-slate-800 pb-6 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-accent">
          Protección de Datos RGPD (UE 2016/679) & LOPDGDD 3/2018
        </span>
        <h1 className="text-3xl font-black text-white">Política de Privacidad</h1>
        <p className="text-xs text-slate-400">Última actualización: Julio 2026</p>
      </div>

      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 space-y-6 text-xs text-slate-300 leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">1. Responsable del Tratamiento</h2>
          <p>
            El responsable del tratamiento de los datos recabados en este sitio web es **AutoMaestro España S.L.** con CIF B-87654321 y domicilio social en Paseo de la Castellana 180, Madrid, España. Correo de contacto del Delegado de Protección de Datos (DPD): <code className="text-brand-accent">privacidad@automaestro.es</code>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">2. Finalidad y Conservación de Datos</h2>
          <p>
            Los datos solicitados a través del formulario de captación B2B ("Publica con Nosotros") y de consultas de vehículos se utilizan exclusivamente para:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-300">
            <li>Gestionar la solicitud de información y contacto comercial con concesionarios o particulares.</li>
            <li>Elaborar propuestas de planes de publicación y publicidad patrocinada.</li>
            <li>Enviar comunicaciones operativas en relación a la solicitud realizada.</li>
          </ul>
          <p className="pt-1">
            Los datos se conservarán mientras exista un interés comercial mutuo o durante los plazos legales aplicables en España.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">3. Legitimación del Tratamiento</h2>
          <p>
            La base legal para el tratamiento de los datos es el **consentimiento expreso** otorgado por el usuario mediante la marcación de la casilla de aceptación en los formularios web, conforme al artículo 6.1.a del RGPD.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">4. Ejercicio de Derechos (ARCO/POL)</h2>
          <p>
            El usuario tiene derecho a acceder, rectificar, suprimir, limitar el tratamiento, oponerse y solicitar la portabilidad de sus datos personales. Para ejercitar estos derechos, basta con enviar un correo electrónico con copia de su DNI o documento identificativo a <code className="text-brand-accent">privacidad@automaestro.es</code>.
          </p>
          <p>
            Asimismo, tiene derecho a presentar una reclamación ante la **Agencia Española de Protección de Datos (AEPD)** en <a href="https://www.aepd.es" target="_blank" rel="noreferrer" className="text-brand-accent underline">www.aepd.es</a> si considera vulnerados sus derechos.
          </p>
        </section>

      </div>

    </div>
  );
}
