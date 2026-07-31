'use client';

import { useState } from 'react';
import Link from 'next/link';
import { fetchApi } from '@/lib/api';
import { Sparkles, Building2, ShieldCheck, CheckCircle2, Send, PhoneCall, TrendingUp, Target } from 'lucide-react';
import { Turnstile } from '@marsidev/react-turnstile';

export default function PublicaConNosotrosPage() {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    phone: '',
    whatsapp: '',
    email: '',
    province: '',
    approxVehicles: '1-10',
    businessType: 'Concesionario Oficial',
    message: '',
    privacyAccepted: false,
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

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
          type: 'B2B_PARTNER_REQUEST',
          turnstileToken, // token to be verified in backend
          ...formData,
        }),
      });
      setSubmitted(true);
      
      // Track conversion
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'generate_lead', {
          event_category: 'form',
          event_label: 'b2b_partner_request'
        });
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Ocurrió un error al enviar la solicitud. Por favor inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-accent/20 border border-brand-accent/30 text-brand-accent text-xs font-bold">
          <Sparkles className="w-4 h-4 text-gold-500" />
          Servicio Exclusivo de Publicación Gestionada
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Haz Crecer tu Concesionario o Anuncia tus Vehículos en España
        </h1>

        <p className="text-base text-slate-400 leading-relaxed">
          En AutoMaestro no permitimos el registro libre de usuarios. Toda publicación es administrada minuciosamente para garantizar un catálogo exclusivo de máxima confianza y rentabilidad.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Commercial Pitch & Value Props */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
            <h3 className="text-xl font-black text-white">¿Por qué publicar en AutoMaestro?</h3>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-brand-accent/20 flex items-center justify-center flex-shrink-0 text-brand-accent">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Compradores de Alta Capacidad</h4>
                  <p className="text-slate-400 mt-0.5">Audiencia enfocada en vehículos seminuevos, deportivos y de ocasión con presupuesto validado.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0 text-emerald-400">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Campañas de Marketing Dedicadas</h4>
                  <p className="text-slate-400 mt-0.5">Promocionamos tu stock mediante Google Ads, Meta Ads (Facebook e Instagram), TikTok Ads y remarketing activo.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-gold-500/20 flex items-center justify-center flex-shrink-0 text-gold-500">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Gestión 100% Administrada</h4>
                  <p className="text-slate-400 mt-0.5">Sin fraudes ni anuncios duplicados. Nuestro equipo carga y optimiza las fotos y fichas de tus coches.</p>
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
            <p className="text-xs text-slate-400">Llama a nuestro Departamento Comercial B2B en España:</p>
            <p className="text-lg font-black text-white">+34 900 834 210</p>
          </div>

        </div>

        {/* Right Column: Commercial Form */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-700/80 shadow-2xl relative">
            
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
                <h3 className="text-2xl font-black text-white">¡Solicitud Enviada con Éxito!</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Hemos recibido tus datos correctamente. Un Gestor Comercial de AutoMaestro se pondrá en contacto contigo en un plazo máximo de 24 horas laborables.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-slate-800 pb-4 mb-2">
                  <h2 className="text-xl font-black text-white">Solicitud Comercial de Publicación</h2>
                  <p className="text-xs text-slate-400 mt-1">Rellena el formulario para consultar tarifas, planes de publicación y espacios patrocinados.</p>
                </div>

                {errorMsg && (
                  <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs rounded-xl">
                    {errorMsg}
                  </div>
                )}

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
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Empresa / Concesionario</label>
                    <input
                      type="text"
                      placeholder="Ej. Iberia Motors S.L."
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
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">WhatsApp</label>
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
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Correo Electrónico *</label>
                    <input
                      type="email"
                      required
                      placeholder="carlos@iberiamotors.es"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-3 text-xs focus:outline-none focus:border-brand-accent"
                    />
                  </div>

                  {/* Provincia */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Provincia *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Madrid, Barcelona, Valencia"
                      value={formData.province}
                      onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-3 text-xs focus:outline-none focus:border-brand-accent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Número aproximado de vehículos */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Número Aprox. de Vehículos</label>
                    <select
                      value={formData.approxVehicles}
                      onChange={(e) => setFormData({ ...formData, approxVehicles: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-3 text-xs focus:outline-none focus:border-brand-accent"
                    >
                      <option value="1-5">De 1 a 5 coches</option>
                      <option value="6-20">De 6 a 20 coches</option>
                      <option value="21-50">De 21 a 50 coches</option>
                      <option value="50+">Más de 50 coches</option>
                    </select>
                  </div>

                  {/* Tipo de negocio */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Tipo de Negocio</label>
                    <select
                      value={formData.businessType}
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-3 text-xs focus:outline-none focus:border-brand-accent"
                    >
                      <option value="Concesionario Oficial">Concesionario Oficial</option>
                      <option value="Compraventa Profesional">Compraventa Profesional</option>
                      <option value="Particular / Coleccionista">Particular / Coleccionista</option>
                      <option value="Empresa de Renting / Flota">Empresa de Renting / Flota</option>
                    </select>
                  </div>
                </div>

                {/* Mensaje */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Mensaje o Detalles Adicionales *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Indica las marcas que comercializas o si estás interesado en banners patrocinados."
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

                {/* First Layer RGPD Legal Notice Box */}
                <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
                  <p><strong>Información Básica de Protección de Datos (RGPD):</strong></p>
                  <p><strong>Responsable:</strong> AutoMaestro España S.L.</p>
                  <p><strong>Finalidad:</strong> Gestión de consultas comerciales B2B y concertación de reuniones.</p>
                  <p><strong>Legitimación:</strong> Consentimiento del interesado.</p>
                  <p><strong>Derechos:</strong> Acceso, rectificación, supresión en <code className="text-slate-300">privacidad@automaestro.es</code>.</p>
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
                  className="w-full bg-brand-accent hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30 transition-all hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4" />
                  {loading ? 'Enviando Solicitud...' : 'Enviar Solicitud Comercial'}
                </button>
              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
