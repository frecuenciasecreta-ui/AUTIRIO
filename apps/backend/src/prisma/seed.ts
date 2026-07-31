import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting AutoMaestro Database Seeding...');

  // 1. SuperAdmin User
  const adminPassword = await argon2.hash('AutoMaestroAdmin2026!');
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@automaestro.es' },
    update: {},
    create: {
      email: 'admin@automaestro.es',
      name: 'Director de Operaciones AutoMaestro',
      passwordHash: adminPassword,
      role: 'SUPER_ADMIN',
    },
  });
  console.log('✅ Admin user created:', adminUser.email);

  // 2. DGT ECO Labels
  const dgtLabels = [
    { code: 'CERO', name: 'Etiqueta CERO Emisiones', description: 'Vehículos Eléctricos (BEV) e Híbridos Enchufables (PHEV)', colorBadge: '#00A3E0' },
    { code: 'ECO', name: 'Etiqueta ECO', description: 'Vehículos Híbridos (HEV), MHEV, GLP y GNC', colorBadge: '#009A44' },
    { code: 'C', name: 'Etiqueta C', description: 'Gasolina EURO 4/5/6 o Diésel EURO 6', colorBadge: '#0072CE' },
    { code: 'B', name: 'Etiqueta B', description: 'Gasolina EURO 3 o Diésel EURO 4/5', colorBadge: '#FFC72C' },
  ];

  for (const label of dgtLabels) {
    await prisma.dgtEcoLabel.upsert({
      where: { code: label.code },
      update: {},
      create: label,
    });
  }
  console.log('✅ DGT Eco Labels seeded.');

  // 3. Fuel Types
  const fuels = [
    { code: 'GASOLINA', name: 'Gasolina' },
    { code: 'DIESEL', name: 'Diésel' },
    { code: 'HIBRIDO_HEV', name: 'Híbrido (HEV)' },
    { code: 'HIBRIDO_ENCHUFABLE_PHEV', name: 'Híbrido Enchufable (PHEV)' },
    { code: 'ELECTRICO_BEV', name: '100% Eléctrico (BEV)' },
  ];

  for (const fuel of fuels) {
    await prisma.fuelType.upsert({
      where: { code: fuel.code },
      update: {},
      create: fuel,
    });
  }
  console.log('✅ Fuel Types seeded.');

  // 4. Ad Placements
  const adPlacements = [
    { code: 'HOME_HERO', name: 'Banner Hero Principal (Home)', description: 'Banner superior en la portada.' },
    { code: 'HOME_MIDDLE', name: 'Banner Central (Home)', description: 'Ubicación entre catálogo y bloque B2B.' },
    { code: 'LISTING_SIDEBAR', name: 'Lateral del Catálogo (/coches)', description: 'Espacio publicitario en la columna lateral.' },
    { code: 'VEHICLE_DETAIL_RIGHT', name: 'Ficha del Vehículo (Derecha)', description: 'Ubicado al lado de los datos de contacto.' },
    { code: 'BLOG_HEADER', name: 'Cabecera del Blog', description: 'Banner superior en prensa y novedades.' },
    { code: 'FOOTER_BANNER', name: 'Pie de Página General', description: 'Banner horizontal visible antes del footer.' },
  ];

  for (const placement of adPlacements) {
    await prisma.adPlacement.upsert({
      where: { code: placement.code },
      update: {},
      create: placement,
    });
  }
  console.log('✅ Ad Placements seeded.');

  // 5. Tracking Providers
  const providers = ['GA4', 'GTM', 'META_PIXEL', 'META_CAPI', 'TIKTOK_PIXEL', 'LINKEDIN_INSIGHT', 'MICROSOFT_CLARITY', 'GOOGLE_SEARCH_CONSOLE'];
  for (const prov of providers) {
    await prisma.trackingScriptConfig.upsert({
      where: { provider: prov },
      update: {},
      create: {
        provider: prov,
        trackingId: '',
        isActive: false,
      },
    });
  }
  console.log('✅ Tracking Configs seeded.');

  // 6. Brands & Sample Cars
  const porsche = await prisma.brand.upsert({
    where: { slug: 'porsche' },
    update: {},
    create: { name: 'Porsche', slug: 'porsche', isPopular: true },
  });

  const porsche911 = await prisma.model.upsert({
    where: { slug: 'porsche-911' },
    update: {},
    create: { brandId: porsche.id, name: '911 Carrera GTS', slug: 'porsche-911', bodyType: 'Coupe' },
  });

  const labelC = await prisma.dgtEcoLabel.findUnique({ where: { code: 'C' } });
  const fuelGasolina = await prisma.fuelType.findUnique({ where: { code: 'GASOLINA' } });

  const partnerDealership = await prisma.dealership.upsert({
    where: { slug: 'iberia-motors-madrid' },
    update: {},
    create: {
      name: 'Iberia Motors Selección Madrid',
      slug: 'iberia-motors-madrid',
      cif: 'B87654321',
      email: 'contacto@iberiamotors.es',
      phone: '+34 912 345 678',
      whatsapp: '+34 600 112 233',
      province: 'Madrid',
      city: 'Pozuelo de Alarcón',
      isPartner: true,
    },
  });

  await prisma.vehicle.upsert({
    where: { slug: 'porsche-911-carrera-gts-2024-madrid' },
    update: {},
    create: {
      title: 'Porsche 911 Carrera GTS PDK 480CV',
      slug: 'porsche-911-carrera-gts-2024-madrid',
      brandId: porsche.id,
      modelId: porsche911.id,
      fuelTypeId: fuelGasolina.id,
      dgtEcoLabelId: labelC.id,
      dealershipId: partnerDealership.id,
      price: 189900,
      year: 2024,
      kilometers: 8500,
      powerHp: 480,
      transmission: 'AUTOMATIC',
      doors: 2,
      seats: 4,
      color: 'Gris Crayon',
      description: 'Unidad de reestreno. Paquete GTS Interior en Alcántara, frenos cerámicos PCCB, Paquete Sport Chrono.',
      equipment: '["Techo solar panorámico", "Burmester High-End", "Faros LED Matrix"]',
      isFeatured: true,
      status: 'PUBLISHED',
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1200&q=80', isMain: true, displayOrder: 1 },
        ],
      },
    },
  });

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
