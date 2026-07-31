import { Cookie } from 'lucide-react';

export default function PoliticaCookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      
      <div className="border-b border-slate-800 pb-6 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-accent">
          Directiva de Privacidad & Guía AEPD España
        </span>
        <h1 className="text-3xl font-black text-white">Política de Cookies</h1>
        <p className="text-xs text-slate-400">Última actualización: Julio 2026</p>
      </div>

      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 space-y-6 text-xs text-slate-300 leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">1. ¿Qué es una Cookie?</h2>
          <p>
            Una cookie es un fichero que se descarga en su ordenador o dispositivo móvil al acceder a determinadas páginas web. Las cookies permiten a una página web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">2. Tipos de Cookies Utilizadas en AutoMaestro</h2>
          <div className="space-y-3">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <h3 className="font-bold text-white mb-1">Cookies Técnicas y Estrictamente Necesarias</h3>
              <p className="text-slate-400">Permiten la navegación a través de la web, la gestión de sesiones de administración y el uso de los diferentes servicios o filtros.</p>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <h3 className="font-bold text-white mb-1">Cookies de Analítica (Google Analytics 4 / Microsoft Clarity)</h3>
              <p className="text-slate-400">Tratadas por nosotros o por terceros, nos permiten cuantificar el número de usuarios e impresiones para realizar la medición y análisis estadístico de la utilización del portal.</p>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <h3 className="font-bold text-white mb-1">Cookies de Publicidad y Seguimiento (Meta Pixel / TikTok Pixel)</h3>
              <p className="text-slate-400">Permiten analizar hábitos de navegación en internet para mostrar publicidad relacionada con su perfil de preferencias en redes sociales o red de búsqueda.</p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">3. Cómo Configurar o Desactivar las Cookies</h2>
          <p>
            Usted puede permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones del navegador instalado en su ordenador (Chrome, Firefox, Safari, Edge).
          </p>
        </section>

      </div>

    </div>
  );
}
