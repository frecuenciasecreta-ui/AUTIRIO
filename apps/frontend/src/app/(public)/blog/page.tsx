import Link from 'next/link';
import AdBannerSlot from '@/components/ads/AdBannerSlot';
import { Calendar, User, Newspaper } from 'lucide-react';

export default function BlogPage() {
  const posts = [
    {
      id: '1',
      title: 'Zonas de Bajas Emisiones (ZBE) en España: Guía Completa de Etiquetas DGT 2026',
      slug: 'guia-etiquetas-dgt-zbe-espana-2026',
      summary: 'Analizamos las restricciones vigentes en Madrid 360, Barcelona y ciudades de más de 50.000 habitantes. Descubre las ventajas fiscales y de movilidad de las etiquetas CERO y ECO.',
      publishedAt: '2026-07-20',
      author: 'Redacción AutoMaestro',
    },
    {
      id: '2',
      title: 'Novedades Porsche 911 2026: Motorización Híbrida de Altas Prestaciones',
      slug: 'novedades-porsche-911-hibrido-2026',
      summary: 'El icónico deportivo alemán incorpora tecnología e-Hybrid derivada de la competición para maximizar la aceleración y obtener el distintivo ECO DGT.',
      publishedAt: '2026-07-15',
      author: 'Carlos Sainz / Redacción',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      <div className="border-b border-slate-800 pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-accent block mb-1">
          Actualidad del Motor & Análisis
        </span>
        <h1 className="text-3xl font-black text-white">Noticias y Reportajes Automotrices</h1>
      </div>

      {/* Blog Header Ad Slot */}
      <AdBannerSlot placementCode="BLOG_HEADER" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <div key={post.id} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-brand-accent" /> {post.publishedAt}</span>
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-slate-400" /> {post.author}</span>
              </div>
              <h2 className="text-xl font-bold text-white hover:text-brand-accent transition-colors">
                {post.title}
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">{post.summary}</p>
            </div>

            <div className="pt-4 border-t border-slate-800/80">
              <Link href={`/blog`} className="text-xs font-bold text-brand-accent hover:underline">
                Leer Artículo Completo →
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
