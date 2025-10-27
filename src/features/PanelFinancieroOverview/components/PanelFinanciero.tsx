import { DollarSign, TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface PanelFinancieroProps {
  tipo: 'entrenador' | 'gimnasio';
  ingresosTotales: number;
  gastosTotales: number;
  beneficioNeto: number;
  tendencia: number;
}

export default function PanelFinanciero({
  tipo,
  ingresosTotales,
  gastosTotales,
  beneficioNeto,
  tendencia
}: PanelFinancieroProps) {
  const isTendenciaPositiva = tendencia >= 0;

  return (
    <div className="bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),_0_2px_4px_-1px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[24px] leading-[32px] font-semibold text-[#0F172A] mb-1">
            {tipo === 'entrenador' ? 'Panel Financiero Personal' : 'Panel Financiero del Centro'}
          </h2>
          <p className="text-[14px] leading-[20px] text-[#64748B]">
            {tipo === 'entrenador' 
              ? 'Resumen de tus ingresos y rendimiento' 
              : 'Visión global de la facturación del centro'}
          </p>
        </div>
        <div className="bg-[#6366F1] p-4 rounded-xl">
          <Activity className="w-8 h-8 text-white" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Ingresos Totales */}
        <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#E2E8F0]">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-[#10B981]" />
            <p className="text-[#64748B] text-[14px] leading-[20px] font-medium">Ingresos Totales</p>
          </div>
          <p className="text-[30px] leading-[38px] font-bold text-[#0F172A]">€{ingresosTotales.toLocaleString()}</p>
          <p className="text-[12px] leading-[16px] font-medium text-[#94A3B8] mt-2">Mes actual</p>
        </div>

        {/* Gastos Totales */}
        <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#E2E8F0]">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-[#EF4444]" />
            <p className="text-[#64748B] text-[14px] leading-[20px] font-medium">Gastos Totales</p>
          </div>
          <p className="text-[30px] leading-[38px] font-bold text-[#0F172A]">€{gastosTotales.toLocaleString()}</p>
          <p className="text-[12px] leading-[16px] font-medium text-[#94A3B8] mt-2">Mes actual</p>
        </div>

        {/* Beneficio Neto */}
        <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#E2E8F0]">
          <div className="flex items-center gap-2 mb-2">
            {isTendenciaPositiva ? (
              <TrendingUp className="w-5 h-5 text-[#10B981]" />
            ) : (
              <TrendingDown className="w-5 h-5 text-[#EF4444]" />
            )}
            <p className="text-[#64748B] text-[14px] leading-[20px] font-medium">Beneficio Neto</p>
          </div>
          <p className={`text-[30px] leading-[38px] font-bold ${beneficioNeto >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
            €{beneficioNeto.toLocaleString()}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className={`text-[12px] leading-[16px] font-medium ${isTendenciaPositiva ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
              {isTendenciaPositiva ? '+' : ''}{tendencia.toFixed(1)}%
            </span>
            <span className="text-[12px] leading-[16px] text-[#94A3B8]">vs. mes anterior</span>
          </div>
        </div>
      </div>
    </div>
  );
}

