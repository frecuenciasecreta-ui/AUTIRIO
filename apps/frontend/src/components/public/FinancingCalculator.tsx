'use client';

import { useState } from 'react';
import { Calculator, CreditCard, CheckCircle2 } from 'lucide-react';

interface FinancingCalculatorProps {
  vehiclePrice: number;
}

export default function FinancingCalculator({ vehiclePrice }: FinancingCalculatorProps) {
  const [downPayment, setDownPayment] = useState<number>(Math.round(vehiclePrice * 0.2));
  const [months, setMonths] = useState<number>(48);
  const interestRate = 6.95; // Annual interest rate percentage

  const loanAmount = Math.max(0, vehiclePrice - downPayment);
  const monthlyRate = interestRate / 100 / 12;
  const estimatedMonthly = loanAmount > 0
    ? Math.round((loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1))
    : 0;

  return (
    <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-brand-accent" />
          <h3 className="text-base font-bold text-white">Simulador de Financiación</h3>
        </div>
        <span className="text-xs text-slate-400">TIN {interestRate}% • TAE 7.25%</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Down Payment Slider */}
        <div>
          <div className="flex justify-between text-xs font-semibold mb-2">
            <span className="text-slate-300">Entrada Inicial:</span>
            <span className="text-brand-accent font-bold">{downPayment.toLocaleString('es-ES')} €</span>
          </div>
          <input
            type="range"
            min="0"
            max={vehiclePrice * 0.7}
            step="1000"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="w-full accent-brand-accent cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>0 €</span>
            <span>70% ({(vehiclePrice * 0.7).toLocaleString('es-ES')} €)</span>
          </div>
        </div>

        {/* Months selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">Plazo de Financiación</label>
          <div className="grid grid-cols-3 gap-2">
            {[36, 48, 60, 72, 84].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMonths(m)}
                className={`py-2 text-xs font-bold rounded-lg border transition-colors ${
                  months === m
                    ? 'bg-brand-accent border-brand-accent text-white'
                    : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'
                }`}
              >
                {m} meses
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result Box */}
      <div className="bg-gradient-to-r from-blue-950/40 to-slate-900/80 p-4 rounded-xl border border-brand-accent/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs text-slate-400 block">Cuota Mensual Estimada:</span>
          <span className="text-3xl font-black text-white">{estimatedMonthly.toLocaleString('es-ES')} € <span className="text-xs text-slate-400 font-normal">/ mes</span></span>
        </div>
        <div className="text-xs text-slate-300 space-y-1">
          <p className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Sin permanencia forzosa</p>
          <p className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Preaprobación en 24h</p>
        </div>
      </div>
    </div>
  );
}
