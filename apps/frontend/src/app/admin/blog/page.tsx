'use client';

import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api';
import { Newspaper, Plus } from 'lucide-react';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetchApi<any[]>('/blog/admin/all')
      .then((res) => setPosts(res || []))
      .catch(() => setPosts([]));
  }, []);

  return (
    <div className="space-y-6">
      
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-2xl font-black text-white">Publicaciones de Blog & Noticias</h1>
        <p className="text-xs text-slate-400 mt-1">Gestión de contenido de prensa y artículos optimizados para SEO.</p>
      </div>

      <div className="glass-panel rounded-3xl border border-slate-800 p-6">
        <div className="space-y-3 text-xs">
          {posts.length === 0 ? (
            <p className="text-slate-400">No hay artículos publicados todavía.</p>
          ) : (
            posts.map((p) => (
              <div key={p.id} className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-sm">{p.title}</h3>
                  <span className="text-slate-400 text-[10px]">{p.publishedAt} • Autor: {p.author}</span>
                </div>
                <span className="bg-emerald-500/20 text-emerald-400 font-bold text-[10px] px-2 py-0.5 rounded">
                  PUBLICADO
                </span>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
