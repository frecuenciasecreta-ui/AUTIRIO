import './globals.css';
import DynamicScriptInjector from '@/components/tracking/DynamicScriptInjector';
import PublicLayoutWrapper from '@/components/public/PublicLayoutWrapper';
import CookieBanner from '@/components/public/CookieBanner';

export const metadata = {
  title: 'Autirio España | Vehículos de Selección Certificados y Alta Gama',
  description: 'Plataforma líder en España para la compra de coches seminuevos y de ocasión verificados. Marcas premium: Porsche, BMW, Mercedes-Benz, Audi, Tesla con Etiqueta DGT CERO y ECO.',
  keywords: 'coches segunda mano españa, porsche 911 ocasion, vehiculos etiqueta cero madrid, coches electricos barcelona, concesionarios premium',
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
