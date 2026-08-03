import './globals.css';
import DynamicScriptInjector from '@/components/tracking/DynamicScriptInjector';
import PublicLayoutWrapper from '@/components/public/PublicLayoutWrapper';
import CookieBanner from '@/components/public/CookieBanner';

export const metadata = {
  title: 'IMPERIUM Auto Digital | Sistema de Marketing & Comercialización Automotriz',
  description: 'Infraestructura comercial y de marketing para concesionarios en España. Producción audiovisual 4K, publicidad digital y catálogo de selección.',
  keywords: 'imperium auto digital, marketing concesionarios españa, coches segunda mano madrid, vehiculos certificacion barcelona, prueba piloto concesionarios',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col justify-between bg-background text-slate-100 font-sans">
        <DynamicScriptInjector />
        <PublicLayoutWrapper>{children}</PublicLayoutWrapper>
        <CookieBanner />
      </body>
    </html>
  );
}
