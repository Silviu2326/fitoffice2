import { PieChart, Target, Percent, TrendingUp } from 'lucide-react';

interface MetricaRentabilidad {
  nombre: string;
  valor: number;
  objetivo: number;
  unidad: '%' | '€';
}

interface AnalisisRentabilidadProps {
  margenBruto: number;
  margenNeto: number;
  roi: number;
  puntoEquilibrio: number;
  metricas: MetricaRentabilidad[];
}

export default function AnalisisRentabilidad({
  margenBruto,
  margenNeto,
  roi,
  puntoEquilibrio,
  metricas
}: AnalisisRentabilidadProps) {
  const calcularProgreso = (valor: number, objetivo: number) => {
    return Math.min((valor / objetivo) * 100, 100);
  };

  const getColorProgreso = (progreso: number) => {
    if (progreso >= 80) return 'from-[#10B981] to-[#059669]';
    if (progreso >= 50) return 'from-[#F59E0B] to-[#D97706]';
    return 'from-[#EF4444] to-[#DC2626]';
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),_0_2px_4px_-1px_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[#3B82F6] p-2 rounded-xl">
          <PieChart className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-[20px] leading-[28px] font-semibold text-[#0F172A]">Análisis de Rentabilidad</h3>
          <p className="text-[14px] leading-[20px] text-[#64748B]">Métricas de eficiencia financiera</p>
        </div>
      </div>

      {/* Indicadores principales */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[#DBEAFE] border border-[#3B82F6] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Percent className="w-4 h-4 text-[#3B82F6]" />
            <p className="text-[14px] leading-[20px] text-[#64748B]">Margen Bruto</p>
          </div>
          <p className="text-[24px] leading-[32px] font-bold text-[#0F172A]">{margenBruto}%</p>
          <div className="w-full bg-[#E2E8F0] rounded-full h-2 mt-3">
            <div
              className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] h-2 rounded-full transition-all duration-200"
              style={{ width: `${margenBruto}%` }}
            />
          </div>
        </div>

        <div className="bg-[#EEF2FF] border border-[#6366F1] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Percent className="w-4 h-4 text-[#6366F1]" />
            <p className="text-[14px] leading-[20px] text-[#64748B]">Margen Neto</p>
          </div>
          <p className="text-[24px] leading-[32px] font-bold text-[#0F172A]">{margenNeto}%</p>
          <div className="w-full bg-[#E2E8F0] rounded-full h-2 mt-3">
            <div
              className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] h-2 rounded-full transition-all duration-200"
              style={{ width: `${margenNeto}%` }}
            />
          </div>
        </div>

        <div className="bg-[#D1FAE5] border border-[#10B981] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-[#10B981]" />
            <p className="text-[14px] leading-[20px] text-[#64748B]">ROI</p>
          </div>
          <p className="text-[24px] leading-[32px] font-bold text-[#0F172A]">{roi}%</p>
          <p className="text-[12px] leading-[16px] font-medium text-[#94A3B8] mt-2">Retorno de inversión</p>
        </div>

        <div className="bg-[#FEF3C7] border border-[#F59E0B] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-[#F59E0B]" />
            <p className="text-[14px] leading-[20px] text-[#64748B]">Punto Equilibrio</p>
          </div>
          <p className="text-[24px] leading-[32px] font-bold text-[#0F172A]">€{puntoEquilibrio.toLocaleString()}</p>
          <p className="text-[12px] leading-[16px] font-medium text-[#94A3B8] mt-2">Mensual</p>
        </div>
      </div>

      {/* Métricas detalladas */}
      <div className="space-y-4">
        <h4 className="text-[14px] leading-[20px] font-medium text-[#64748B] mb-3">Objetivos y Rendimiento</h4>
        {metricas.map((metrica, index) => {
          const progreso = calcularProgreso(metrica.valor, metrica.objetivo);
          return (
            <div key={index} className="bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0]">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[14px] leading-[20px] font-medium text-[#0F172A]">{metrica.nombre}</p>
                <div className="flex items-center gap-3">
                  <span className="text-[#64748B] text-[14px] leading-[20px]">
                    {metrica.valor}{metrica.unidad} / {metrica.objetivo}{metrica.unidad}
                  </span>
                  <span className={`text-[14px] leading-[20px] font-bold ${progreso >= 80 ? 'text-[#10B981]' : progreso >= 50 ? 'text-[#F59E0B]' : 'text-[#EF4444]'}`}>
                    {progreso.toFixed(0)}%
                  </span>
                </div>
              </div>
              <div className="w-full bg-[#E2E8F0] rounded-full h-2">
                <div
                  className={`bg-gradient-to-r ${getColorProgreso(progreso)} h-2 rounded-full transition-all duration-200`}
                  style={{ width: `${progreso}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

