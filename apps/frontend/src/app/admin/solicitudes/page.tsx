'use client';

import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api';
import { LeadRequest } from '@/lib/types';
import { Inbox, CheckCircle2, MessageSquare, Phone, Mail, MapPin, Building2, RefreshCw, Download } from 'lucide-react';

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<LeadRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const loadLeads = () => {
    setLoading(true);
    fetchApi<LeadRequest[]>('/leads/admin/all')
      .then((res) => setLeads(res || []))
      .catch(() => setLeads([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    await fetchApi(`/leads/admin/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
    loadLeads();
  };

  const exportToCSV = () => {
    if (leads.length === 0) {
      alert('No hay solicitudes para exportar');
      return;
    }

    const headers = ['ID', 'Nombre', 'Teléfono', 'Email', 'Empresa', 'Tipo Negocio', 'Provincia', 'Flota', 'Mensaje', 'Estado', 'Fecha'];
    const rows = leads.map((l) => [
      l.id,
      `"${l.name || ''}"`,
      `"${l.phone || ''}"`,
      `"${l.email || ''}"`,
      `"${l.companyName || ''}"`,
      `"${l.businessType || ''}"`,
      `"${l.province || ''}"`,
      `"${l.approxVehicles || ''}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`,
      `"${l.status || ''}"`,
      `"${l.createdAt || ''}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `leads_imperium_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-black text-white">Solicitudes Comerciales (Leads B2B / Tasaciones)</h1>
          <p className="text-xs text-slate-400 mt-1">Gestión de contactos provenientes del formulario "Publica con Nosotros / Anuncia tus Vehículos".</p>
        </div>

        <button
          onClick={exportToCSV}
          className="bg-gradient-to-r from-gold-600 via-gold-500 to-gold-700 text-slate-950 font-extrabold text-xs px-5 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-gold-500/20 hover:scale-105 transition-all uppercase tracking-wider"
        >
          <Download className="w-4 h-4 text-slate-950" />
          Exportar a Excel / CSV
        </button>
      </div>

      <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-gold-400 mb-2" />
            Cargando solicitudes...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="text-[10px] uppercase font-bold text-slate-400 bg-slate-900/90 border-b border-slate-800">
                <tr>
                  <th className="p-4">Contacto / Solicitante</th>
                  <th className="p-4">Empresa / Negocio</th>
                  <th className="p-4">Provincia / Aprox. Flota</th>
                  <th className="p-4">Mensaje</th>
                  <th className="p-4">Estado Pipeline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400">
                      No hay solicitudes registradas.
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-900/40">
                      <td className="p-4">
                        <div className="font-bold text-white text-sm">{lead.name}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-1">
                          <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-gold-400" /> {lead.phone}</span>
                          <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-slate-400" /> {lead.email}</span>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="font-semibold text-slate-200">{lead.companyName || 'N/A'}</div>
                        <span className="text-[10px] text-gold-400">{lead.businessType || 'Concesionario'}</span>
                      </td>

                      <td className="p-4">
                        <div className="font-medium text-slate-300">{lead.province}</div>
                        <span className="text-[10px] text-slate-400">{lead.approxVehicles || '1-10'} vehículos</span>
                      </td>

                      <td className="p-4 max-w-xs">
                        <p className="line-clamp-2 text-[11px] text-slate-400 italic">"{lead.message}"</p>
                      </td>

                      <td className="p-4">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className="bg-slate-900 border border-slate-700 text-white rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-gold-400 font-semibold"
                        >
                          <option value="NEW">🟢 Nueva Solicitud</option>
                          <option value="CONTACTED">🔵 Contactado</option>
                          <option value="IN_NEGOTIATION">🟡 En Negociación</option>
                          <option value="CLOSED_SUCCESS">⭐ Cerrado con Éxito</option>
                          <option value="DISCARDED">🔴 Descartado</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
