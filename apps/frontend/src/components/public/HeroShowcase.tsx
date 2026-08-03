'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShieldCheck, Sparkles, ArrowRight, Gauge, Calendar, Zap } from 'lucide-react';

interface ShowcaseCar {
  id: string;
  brand: string;
  model: string;
  tagline: string;
  price: string;
  year: number;
  km: string;
  hp: number;
  imageUrl: string;
  slug: string;
  badge: string;
}

const SHOWCASE_CARS: ShowcaseCar[] = [
  {
    id: '1',
    brand: 'PORSCHE',
    model: '911 Carrera GTS',
    tagline: 'Deportivo Pura Sangre con Tratamiento Cerámico',
    price: '189.900 €',
    year: 2024,
    km: '8.500 km',
    hp: 480,
    imageUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1200&q=80',
    slug: 'porsche-911-carrera-gts-2024-madrid',
    badge: 'Etiqueta C DGT',
  },
  {
    id: '2',
    brand: 'MERCEDES-BENZ',
    model: 'AMG GT R Coupe',
    tagline: 'V8 Biturbo 585CV Vértigo y Exclusividad',
    price: '195.000 €',
    year: 2023,
    km: '12.000 km',
    hp: 585,
    imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=80',
    slug: 'mercedes-amg-gt-r-2023',
    badge: 'Edición Selección',
  },
  {
    id: '3',
    brand: 'PORSCHE',
    model: 'Taycan Turbo S',
    tagline: 'Tecnología 100% Eléctrica 761CV de Aceleración',
    price: '154.900 €',
    year: 2023,
    km: '14.200 km',
    hp: 761,
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80',
    slug: 'porsche-taycan-turbo-s-2023-barcelona',
    badge: 'Etiqueta CERO DGT',
  },
  {
    id: '4',
    brand: 'BMW',
    model: 'M4 Competition Coupé',
    tagline: 'Rendimiento de Circuito Apto para el Día a Día',
    price: '108.500 €',
    year: 2023,
    km: '19.000 km',
    hp: 510,
    imageUrl: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&q=80',
    slug: 'bmw-m4-competition-2023',
    badge: 'M Performance',
  },
];

export default function HeroShowcase() {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || !mounted) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SHOWCASE_CARS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, mounted]);

  const currentCar = SHOWCASE_CARS[currentIndex];

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % SHOWCASE_CARS.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + SHOWCASE_CARS.length) % SHOWCASE_CARS.length);
  };

  return (
    <section className="relative w-full overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24 border-b border-slate-800/80 bg-[#07090D]">
      
      {/* Dynamic Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-brand-accent/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-indigo-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER BADGE & MAIN TITLE */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-10">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-bold text-slate-200 shadow-xl">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Encuentras más de <strong className="text-brand-accent">100+ Vehículos</strong> de Selección Certificados</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            La Excelencia del Motor <br />
            <span className="bg-gradient-to-r from-white via-slate-200 to-brand-accent bg-clip-text text-transparent">
              Intermediación Certificada
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 font-medium">
            Seleccionamos y gestionamos directamente los mejores coches deportivos y de gama alta en España.
          </p>
        </div>

        {/* HERO SHOWCASE DISPLAY CAROUSEL */}
        <div className="relative glass-panel rounded-3xl border border-slate-800/80 overflow-hidden shadow-2xl p-6 sm:p-10 lg:p-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* LEFT DETAILS COLUMN */}
            <div className="lg:col-span-5 space-y-6">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCar.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="bg-brand-accent/20 border border-brand-accent/40 text-brand-accent text-[11px] uppercase font-extrabold px-3 py-1 rounded-md">
                      {currentCar.badge}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {currentCar.brand}
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-black text-white">
                    {currentCar.model}
                  </h2>

                  <p className="text-sm text-slate-300 leading-relaxed font-medium">
                    {currentCar.tagline}
                  </p>

                  {/* Specs Quick Pills */}
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl text-center">
                      <Calendar className="w-4 h-4 text-brand-accent mx-auto mb-1" />
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">Año</span>
                      <span className="text-xs font-bold text-white">{currentCar.year}</span>
                    </div>

                    <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl text-center">
                      <Gauge className="w-4 h-4 text-brand-accent mx-auto mb-1" />
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">KM</span>
                      <span className="text-xs font-bold text-white">{currentCar.km}</span>
                    </div>

                    <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl text-center">
                      <Zap className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">Potencia</span>
                      <span className="text-xs font-bold text-white">{currentCar.hp} CV</span>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Precio Final</span>
                      <span className="text-3xl font-black text-white">{currentCar.price}</span>
                    </div>

                    <Link
                      href={`/coches/${currentCar.slug}`}
                      className="ml-auto bg-brand-accent hover:bg-blue-600 text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all hover:scale-105"
                    >
                      Ver Ficha Técnica
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>

            {/* RIGHT IMAGE PRESENTATION STAGE */}
            <div className="lg:col-span-7 relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-950/80 border border-slate-800/80 flex items-center justify-center">
              
              {/* Studio Light Floor Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCar.id}
                  initial={{ opacity: 0, x: 80, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -80, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={currentCar.imageUrl}
                    alt={currentCar.model}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white hover:bg-brand-accent transition-colors shadow-lg"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white hover:bg-brand-accent transition-colors shadow-lg"
                  aria-label="Siguiente"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
                {SHOWCASE_CARS.map((car, idx) => (
                  <button
                    key={car.id}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setCurrentIndex(idx);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? 'w-8 bg-brand-accent' : 'w-2 bg-slate-700'
                    }`}
                  />
                ))}
              </div>

            </div>

          </div>

        </div>

        {/* BOTTOM CAR BRAND CAROUSEL STRIP */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {SHOWCASE_CARS.map((car, idx) => (
            <button
              key={car.id}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentIndex(idx);
              }}
              className={`p-3 rounded-2xl border text-left transition-all ${
                idx === currentIndex
                  ? 'bg-slate-900 border-brand-accent shadow-lg shadow-blue-500/10'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 opacity-70 hover:opacity-100'
              }`}
            >
              <span className="text-[10px] uppercase font-bold text-slate-400 block">{car.brand}</span>
              <span className="text-xs font-bold text-white truncate block">{car.model}</span>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
