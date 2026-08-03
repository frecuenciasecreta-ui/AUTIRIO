'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Sparkles, ArrowRight, Gauge, Calendar, Zap, 
  Rocket, CheckCircle2, ChevronDown 
} from 'lucide-react';

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
  accel: string;
}

const SHOWCASE_CARS: ShowcaseCar[] = [
  {
    id: '1',
    brand: 'BMW',
    model: 'M4 Competition Coupé',
    tagline: 'Superdeportivo 510CV con Tratamiento Cerámico y Vídeo 4K',
    price: '108.500 €',
    year: 2024,
    km: '11.500 km',
    hp: 510,
    accel: '3.9s 0-100',
    imageUrl: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&q=80',
    slug: 'bmw-m4-competition-2023',
    badge: '🚀 Vídeo 4K IA Activo',
  },
  {
    id: '2',
    brand: 'PORSCHE',
    model: '911 Carrera GTS PDK',
    tagline: 'Deportivo Pura Sangre con Paquete Sport Chrono',
    price: '189.900 €',
    year: 2024,
    km: '8.500 km',
    hp: 480,
    accel: '3.4s 0-100',
    imageUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1200&q=80',
    slug: 'porsche-911-carrera-gts-2024-madrid',
    badge: 'Etiqueta C DGT',
  },
  {
    id: '3',
    brand: 'PORSCHE',
    model: 'Taycan Turbo S 761CV',
    tagline: 'Tecnología 100% Eléctrica 761CV de Aceleración',
    price: '154.900 €',
    year: 2023,
    km: '14.200 km',
    hp: 761,
    accel: '2.8s 0-100',
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80',
    slug: 'porsche-taycan-turbo-s-2023-barcelona',
    badge: 'Etiqueta CERO DGT',
  },
];

export default function HeroShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentCar = SHOWCASE_CARS[currentIndex];

  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden flex flex-col justify-between pt-24 pb-12 bg-[#040508]">
      
      {/* FULLSCREEN BACKGROUND VIDEO WITH CRYSTAL CLEAR HIGH CONTRAST */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          // @ts-ignore
          webkit-playsinline="true"
          preload="auto"
          className="w-full h-full object-cover filter brightness-100 contrast-105 transition-all duration-700"
          src="/hero-video.mp4"
        />
        
        {/* Crisp Lighting Vignette for Text Contrast without Blurring Video */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#040508] via-[#040508]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040508]/80 via-transparent to-[#040508]/80" />
        
        {/* Subtle Ambient Electric Lighting */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[300px] bg-electric-500/10 rounded-full blur-[140px] animate-glow-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto space-y-12">
        
        {/* HERO TYPOGRAPHY & BRAND TAGLINE */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center space-y-6 max-w-5xl mx-auto"
        >
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-slate-950/80 border border-electric-500/40 text-xs font-black tracking-widest uppercase text-electric-300 shadow-2xl backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-electric-cyan animate-pulse" />
            <span>IMPERIUM Auto Digital • Sistema Comercial B2B + B2C</span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none uppercase">
            Redefining <br />
            <span className="electric-gradient-text">
              The Art of Driving
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Compra y venta gestionada de vehículos de alta gama y selección profesional en España. <strong className="text-gold-400">Importe neto protegido para el concesionario.</strong>
          </p>

          {/* ANIMATED HIGH CONVERSION CTA BUTTONS */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-5">
            <Link
              href="/coches"
              className="group relative inline-flex items-center gap-3 px-8 py-4.5 rounded-2xl bg-gradient-to-r from-electric-600 via-electric-500 to-electric-cyan text-white font-black text-xs uppercase tracking-wider shadow-2xl shadow-electric-500/40 hover:scale-105 transition-all duration-300 border border-electric-cyan/40"
            >
              <span>Explorar Vehículos Certificados</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/publica-con-nosotros"
              className="group inline-flex items-center gap-3 px-8 py-4.5 rounded-2xl bg-gradient-to-r from-gold-600 via-gold-500 to-gold-700 text-slate-950 font-black text-xs uppercase tracking-wider shadow-2xl shadow-gold-500/20 hover:scale-105 transition-all duration-300"
            >
              <Rocket className="w-4 h-4 text-slate-950" />
              <span>Solicitar Plan Piloto Concesionarios</span>
            </Link>
          </div>
        </motion.div>

        {/* FLOATING GLASSMORPHISM CAR SPEC TICKER (TESLA/PORSCHE STYLE) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="glass-card-electric p-6 sm:p-8 rounded-3xl max-w-5xl mx-auto shadow-2xl border border-electric-500/30 backdrop-blur-xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center items-center divide-x divide-slate-800/80">
            
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">Modelo Destacado</span>
              <div className="text-lg font-black text-white">{currentCar.brand} {currentCar.model}</div>
            </div>

            <div className="space-y-1 pl-4">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">Aceleración</span>
              <div className="text-xl font-black text-electric-cyan">{currentCar.accel}</div>
            </div>

            <div className="space-y-1 pl-4">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">Potencia Máxima</span>
              <div className="text-xl font-black text-amber-400">{currentCar.hp} CV</div>
            </div>

            <div className="space-y-1 pl-4">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">Precio Certificado</span>
              <div className="text-xl font-black gold-gradient-text">{currentCar.price}</div>
            </div>

          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Revisión técnica de 150 puntos y garantía oficial nacional
            </span>
            
            <Link href={`/coches/${currentCar.slug}`} className="text-electric-cyan font-bold hover:underline flex items-center gap-1">
              Ver Ficha Técnica
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>

      </div>

      {/* SCROLL DOWN INDICATOR */}
      <div className="relative z-10 text-center pb-4 animate-bounce">
        <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-widest block mb-1">
          Desliza para Explorar
        </span>
        <ChevronDown className="w-5 h-5 text-electric-cyan mx-auto" />
      </div>

    </section>
  );
}
