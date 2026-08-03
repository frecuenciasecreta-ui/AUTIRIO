'use client';

import { useState } from 'react';
import Link from 'next/link';
import { fetchApi } from '@/lib/api';
import { Sparkles, Building2, ShieldCheck, CheckCircle2, Send, PhoneCall, TrendingUp, Target, Rocket, Calculator, Check, Video } from 'lucide-react';
import { Turnstile } from '@marsidev/react-turnstile';

export default function PublicaConNosotrosPage() {
  const [netPrice, setNetPrice] = useState<number>(18500);

  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    phone: '',
    whatsapp: '',
    email: '',
    province: '',
    approxVehicles: '1-10',
    businessType: 'Concesionario Oficial',
    pilotOption: 'Prueba Piloto 3 Vehículos (45 Días)',
    message: '',
    privacyAccepted: false,
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  // Net price calculation logic
  const suggestedPublicPrice = Math.round(netPrice * 1.075);
  const imperiumFee = suggestedPublicPrice - netPrice;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacyAccepted) {
      setErrorMsg('Debes aceptar la Política de Privacidad para enviar tu solicitud.');
      return;
    }

    if (!turnstileToken) {
      setErrorMsg('Por favor, completa la verificación de seguridad antispam.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      await fetchApi('/leads/public', {
        method: 'POST',
        body: JSON.stringify({
          type: 'B2B_PILOT_PARTNER_REQUEST',
          turnstileToken,
          netPrice,
          suggestedPublicPrice,
          imperiumFee,
          ...formData,
        }),
      });
      setSubmitted(true);
      
      // Track conversion
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'generate_lead', {
          event_category: 'form',
          event_label: 'b2b_imperium_pilot_request'
        });
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Ocurrió un error al enviar la solicitud. Por favor inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">
      
      {/* Header Banner */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-accent/20 border border-brand-accent/30 text-brand-accent text-xs font-extrabold uppercase tracking-wider">
          <Rocket className="w-4 h-4 text-amber-400 animate-pulse" />
          Plan Comercial IMPERIUM Auto Digital • Red de Concesionarios
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
          Suma tu Concesionario con un <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-200 to-brand-accent bg-clip-text text-transparent">
            Programa Piloto de 45 Días sin Riesgo
          </span>
        </h1>

        <p className="text-base text-slate-300 leading-relaxed font-medium max-w-3xl mx-auto">
          No somos una compraventa tradicional ni un catálogo estático. Somos tu infraestructura externa de marketing audiovisual, captación digital y gestión de compradores. <strong className="text-white">Tú mantienes el control total de tu precio neto.</strong>
        </p>
      </div>

      {/* NET PRICE CALCULATOR (SIMULADOR DE PRECIO NETO PROTEGIDO) */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-[#0A0E17] shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 block mb-1">
              Simulador Transparente de Honorarios
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Calculator className="w-6 h-6 text-brand-accent" />
              ¿Cómo Funciona el Modelo de Precio Neto Protegido?
            </h3>
          </div>
          <span className="text-xs font-semibold text-slate-400 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
            0 € Coste de Estructura Fija
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Slider input */}
          <div className="lg:col-span-6 space-y-4">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              1. Selecciona el Importe Neto que Necesita Recibir tu Concesionario (€):
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="5000"
                max="100000"
                step="500"
                value={netPrice}
                onChange={(e) => setNetPrice(Number(e.target.value))}
                className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-accent"
              />
              <span className="text-xl font-black text-white bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl min-w-[120px] text-center">
                {netPrice.toLocaleString('es-ES')} €
              </span>
            </div>
            <p className="text-xs text-slate-400">
              *Tú fijas esta cifra por escrito antes de publicar. Si no se alcanza este importe, la venta no se realiza sin tu autorización.
            </p>
          </div>

          {/* Result Breakdown Boxes */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-1">
              <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Precio Público Sugerido</span>
              <div className="text-2xl font-black text-emerald-400">
                {suggestedPublicPrice.toLocaleString('es-ES')} €
              </div>
              <span className="text-[11px] text-slate-400 block">Estudiado según mercado real</span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-1">
              <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Honorario Autorizado IMPERIUM</span>
              <div className="text-2xl font-black text-brand-accent">
                {imperiumFee.toLocaleString('es-ES')} €
              </div>
              <span className="text-[11px] text-slate-400 block">Solo si conseguimos la venta</span>
            </div>

          </div>

        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Commercial Pitch & Value Props */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
            <h3 className="text-xl font-black text-white">¿Qué Incluye la Prueba Piloto?</h3>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-brand-accent/20 flex items-center justify-center flex-shrink-0 text-brand-accent font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Selección de 3 Vehículos</h4>
                  <p className="text-slate-400 mt-0.5">Elegimos un coche de alta rotación, uno intermedio y uno que necesites rotar más rápido.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0 text-emerald-400 font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Producción Audiovisual 4K y Reels</h4>
                  <p className="text-slate-400 mt-0.5">Fotografía profesional, vídeos verticales para Instagram/TikTok y fichas de alto impacto.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0 text-amber-400 font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Gestión y Calificación de Leads</h4>
                  <p className="text-slate-400 mt-0.5">Atendemos las consultas iniciales, filtramos presupuesto y te agendamos solo compradores cualificados.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Direct Box */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-brand-accent" />
              ¿Prefieres atención telefónica inmediata?
            </h4>
            <p className="text-xs text-slate-400">Habla directamente con la dirección comercial de IMPERIUM Auto Digital:</p>
            <p className="text-lg font-black text-white">+34 912 345 678</p>
            <p className="text-xs text-slate-400">Correo directo: <strong className="text-white">direccion@imperiumautodigital.es</strong></p>
          </div>

        </div>

        {/* Right Column: Commercial Form */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-700/80 shadow-2xl relative">
            
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
                <h3 className="text-2xl font-black text-white">¡Solicitud de Prueba Piloto Recibida!</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Gracias por tu interés en IMPERIUM Auto Digital. Nos pondremos en contacto contigo en menos de 24 horas para coordinar la reunión de 15 minutos o la sesión de prueba audiovisual.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-slate-800 pb-4 mb-2">
                  <h2 className="text-xl font-black text-white">Solicitar Prueba Piloto para Concesionarios</h2>
                  <p className="text-xs text-slate-400 mt-1">Completa los datos de tu concesionario para agendar una reunión o pedir una muestra gratuita.</p>
                </div>

                {errorMsg && (
                  <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs rounded-xl">
                    {errorMsg}
                  </div>
                )}

                {/* Opción de Prueba deseada */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">¿Qué opción prefieres para empezar?</label>
                  <select
                    value={formData.pilotOption}
                    onChange={(e) => setFormData({ ...formData, pilotOption: e.target.value })}
                    className="w-full bg-slate-900 border border-brand-accent/50 text-white rounded-xl px-3.5 py-3 text-xs font-bold focus:outline-none"
                  >
                    <option value="Prueba Piloto 3 Vehículos (45 Días)">🚀 Prueba Piloto 3 Vehículos (45 Días sin riesgo)</option>
                    <option value="Muestra Gratuita de Vídeo 4K (1 Coche)">🎥 Muestra Gratuita de Vídeo/Reel 4K (1 Coche)</option>
                    <option value="Reunión Diagnóstico 15 Minutos">📞 Reunión Diagnóstico de 15 Minutos</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Nombre */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Nombre y Apellidos *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Carlos Mendoza"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-3 text-xs focus:outline-none focus:border-brand-accent"
                    />
                  </div>

                  {/* Empresa */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Nombre del Concesionario *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Automóviles BCN / Reina Motors"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-3 text-xs focus:outline-none focus:border-brand-accent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Teléfono */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Teléfono de Contacto *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+34 600 000 000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-3 text-xs focus:outline-none focus:border-brand-accent"
                    />
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">WhatsApp Directo</label>
                    <input
                      type="tel"
                      placeholder="+34 600 000 000"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-3 text-xs focus:outline-none focus:border-brand-accent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Correo Corporativo *</label>
                    <input
                      type="email"
                      required
                      placeholder="comercial@concesionario.es"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-3 text-xs focus:outline-none focus:border-brand-accent"
                    />
                  </div>

                  {/* Provincia */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Ubicación / Provincia *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Barcelona, Madrid, Sabadell"
                      value={formData.province}
                      onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-3 text-xs focus:outline-none focus:border-brand-accent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Número aproximado de vehículos */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Inventario Aproximado</label>
                    <select
                      value={formData.approxVehicles}
                      onChange={(e) => setFormData({ ...formData, approxVehicles: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-3 text-xs focus:outline-none focus:border-brand-accent"
                    >
                      <option value="1-10">De 1 a 10 coches</option>
                      <option value="11-30">De 11 a 30 coches</option>
                      <option value="31-50">De 31 a 50 coches</option>
                      <option value="50+">Más de 50 coches</option>
                    </select>
                  </div>

                  {/* Tipo de negocio */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Perfil del Concesionario</label>
                    <select
                      value={formData.businessType}
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-3 text-xs focus:outline-none focus:border-brand-accent"
                    >
                      <option value="Concesionario Oficial">Concesionario Oficial</option>
                      <option value="Compraventa Profesional">Compraventa Multimarca</option>
                      <option value="Particular / Vendedor Recurrente">Particular / Vendedor Recurrente</option>
                    </select>
                  </div>
                </div>

                {/* Mensaje */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Notas o Vehículos Sugeridos para la Prueba</label>
                  <textarea
                    rows={3}
                    placeholder="Indica qué vehículos te interesaría incluir en la prueba piloto (marcas, modelos y rango de precio)."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3.5 text-xs focus:outline-none focus:border-brand-accent resize-none"
                  />
                </div>

                {/* RGPD Acceptance Checkbox */}
                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="privacyAccepted"
                    required
                    checked={formData.privacyAccepted}
                    onChange={(e) => setFormData({ ...formData, privacyAccepted: e.target.checked })}
                    className="mt-0.5 w-4 h-4 rounded border-slate-700 accent-brand-accent cursor-pointer"
                  />
                  <label htmlFor="privacyAccepted" className="text-xs text-slate-300 cursor-pointer select-none">
                    He leído y acepto la <Link href="/politica-de-privacidad" className="text-brand-accent underline font-semibold">Política de Privacidad</Link> y el <Link href="/aviso-legal" className="text-brand-accent underline font-semibold">Aviso Legal</Link>. *
                  </label>
                </div>

                {/* Cloudflare Turnstile */}
                <div className="pt-2">
                  <Turnstile
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
                    onSuccess={(token) => setTurnstileToken(token)}
                    options={{ theme: 'dark' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-accent hover:bg-blue-600 text-white font-extrabold py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30 transition-all hover:scale-[1.01] uppercase tracking-wider text-xs"
                >
                  <Send className="w-4 h-4" />
                  {loading ? 'Enviando Solicitud...' : 'Enviar Solicitud Piloto IMPERIUM'}
                </button>
              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
