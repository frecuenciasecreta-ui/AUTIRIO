import { MetadataRoute } from 'next';

// This URL should be the production URL of the frontend
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://autirio.com';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static Routes
  const staticRoutes = [
    '',
    '/coches',
    '/quienes-somos',
    '/contacto',
    '/publica-con-nosotros'
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Fetch dynamic vehicles from API (first 100 for sitemap demo, in production we'd iterate pages)
  let dynamicVehicles: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_URL}/vehicles/public?limit=100`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      const vehicles = data.data || [];
      dynamicVehicles = vehicles.map((v: any) => ({
        url: `${SITE_URL}/coches/${v.slug}`,
        lastModified: v.updatedAt || new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      }));
    }
  } catch (error) {
    console.error('Error fetching vehicles for sitemap:', error);
  }

  return [...staticRoutes, ...dynamicVehicles];
}
