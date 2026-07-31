'use client';

import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api';
import { Vehicle } from '@/lib/types';
import DgtBadge from '@/components/public/DgtBadge';
import { Plus, Trash2, Edit, CheckCircle2, X, RefreshCw } from 'lucide-react';

export default function AdminVehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    brandId: 'porsche',
    modelId: 'porsche-911',
    fuelTypeId: 'GASOLINA',
    dgtEcoLabelId: 'C',
    price: 189900,
    year: 2024,
    kilometers: 8500,
    powerHp: 480,
    transmission: 'AUTOMATIC',
    doors: 2,
    seats: 4,
    description: '',
  });

  const loadVehicles = () => {
    setLoading(true);
    fetchApi<Vehicle[]>('/vehicles/admin/all')
      .then((res) => setVehicles(res || []))
      .catch(() => setVehicles([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let finalImageUrl = 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1200&q=80'; // fallback
      
      if (selectedFile) {
        setUploadingImage(true);
        const form = new FormData();
        form.append('file', selectedFile);
        
        const uploadRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/upload`, {
          method: 'POST',
          // Assuming user auth token logic exists, otherwise we just POST
          body: form,
        });

        if (!uploadRes.ok) throw new Error('Error al subir la imagen');
        const uploadData = await uploadRes.json();
        finalImageUrl = uploadData.url;
        setUploadingImage(false);
      }

      await fetchApi('/vehicles/admin', {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          year: Number(formData.year),
          kilometers: Number(formData.kilometers),
          powerHp: Number(formData.powerHp),
          images: [{ url: finalImageUrl, isMain: true }],
        }),
      });
      setShowModal(false);
      setSelectedFile(null);
      setPreviewUrl(null);
      loadVehicles();
    } catch (err: any) {
      setUploadingImage(false);
      alert(err.message || 'Error al crear vehículo');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Seguro que deseas eliminar este vehículo del inventario?')) {
      await fetchApi(`/vehicles/admin/${id}`, { method: 'DELETE' });
      loadVehicles();
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-black text-white">Gestión de Vehículos</h1>
          <p className="text-xs text-slate-400">Crear, editar, destacar o retirar vehículos del catálogo oficial.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-brand-accent hover:bg-blue-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-lg shadow-blue-600/20"
        >
          <Plus className="w-4 h-4" />
          Añadir Vehículo
        </button>
      </div>

      {/* Table */}
      <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-brand-accent mb-2" />
            Cargando vehículos...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="text-[10px] uppercase font-bold text-slate-400 bg-slate-900/90 border-b border-slate-800">
                <tr>
                  <th className="p-4">Vehículo</th>
                  <th className="p-4">Etiqueta DGT</th>
                  <th className="p-4">Precio</th>
                  <th className="p-4">Año / Km</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {vehicles.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-900/40">
                    <td className="p-4 font-bold text-white">
                      <div>{v.title}</div>
                      <span className="text-[10px] text-slate-400 font-normal">{v.brand?.name} • {v.model?.name}</span>
                    </td>
                    <td className="p-4">
                      <DgtBadge code={v.dgtEcoLabel?.code || 'C'} size="sm" />
                    </td>
                    <td className="p-4 font-bold text-white">{v.price?.toLocaleString('es-ES')} €</td>
                    <td className="p-4">{v.year} • {v.kilometers?.toLocaleString('es-ES')} km</td>
                    <td className="p-4">
                      <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold text-[10px]">
                        PUBLICADO
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleDelete(v.id)}
                        className="p-1.5 bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 rounded-lg transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CREATE VEHICLE MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0D111A] border border-slate-700 w-full max-w-2xl rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-black text-white">Crear Nuevo Vehículo</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Título Completo del Anuncio</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-brand-accent"
                  placeholder="Ej. Porsche 911 Carrera GTS 480CV"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Precio (€)</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-brand-accent"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Etiqueta DGT</label>
                  <select
                    value={formData.dgtEcoLabelId}
                    onChange={(e) => setFormData({ ...formData, dgtEcoLabelId: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-brand-accent"
                  >
                    <option value="CERO">CERO Emisiones</option>
                    <option value="ECO">ECO</option>
                    <option value="C">C</option>
                    <option value="B">B</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Año</label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-brand-accent"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Kilómetros</label>
                  <input
                    type="number"
                    value={formData.kilometers}
                    onChange={(e) => setFormData({ ...formData, kilometers: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-brand-accent"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Potencia (CV)</label>
                  <input
                    type="number"
                    value={formData.powerHp}
                    onChange={(e) => setFormData({ ...formData, powerHp: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-brand-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Fotografía Principal del Vehículo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full bg-slate-900 border border-slate-700 text-slate-400 rounded-xl p-2.5 focus:outline-none focus:border-brand-accent file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-brand-accent file:text-white hover:file:bg-blue-600"
                />
                {previewUrl && (
                  <div className="mt-3">
                    <img src={previewUrl} alt="Preview" className="w-full h-40 object-cover rounded-xl border border-slate-700" />
                  </div>
                )}
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Descripción</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-brand-accent resize-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={uploadingImage}
                  className="px-5 py-2.5 rounded-xl bg-brand-accent hover:bg-blue-600 text-white font-bold disabled:opacity-50"
                >
                  {uploadingImage ? 'Subiendo imagen...' : 'Guardar Vehículo'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
