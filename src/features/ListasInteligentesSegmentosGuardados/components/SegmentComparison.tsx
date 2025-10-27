import { GitCompare, TrendingUp, Users, DollarSign, Activity } from 'lucide-react';
import { useState } from 'react';

interface ComparisonMetric {
  label: string;
  segmentA: number;
  segmentB: number;
  unit: string;
}

export default function SegmentComparison() {
  const [segmentA] = useState('Mujeres 30-45 Bono Caducando');
  const [segmentB] = useState('Alta Adherencia - Upsell');

  const [metrics] = useState<ComparisonMetric[]>([
    { label: 'Tamaño del Segmento', segmentA: 23, segmentB: 45, unit: 'clientes' },
    { label: 'Tasa de Conversión', segmentA: 73, segmentB: 62, unit: '%' },
    { label: 'Revenue por Cliente', segmentA: 150, segmentB: 197, unit: '€' },
    { label: 'Engagement', segmentA: 89, segmentB: 94, unit: '%' },
    { label: 'Tasa de Retención', segmentA: 67, segmentB: 92, unit: '%' },
    { label: 'Visitas Mensuales', segmentA: 8, segmentB: 15, unit: 'visitas' }
  ]);

  const calculateWinner = (a: number, b: number) => {
    if (a > b) return 'A';
    if (b > a) return 'B';
    return 'tie';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[24px] leading-8 font-semibold text-[#0F172A] flex items-center gap-2">
            <GitCompare className="w-6 h-6 text-[#6366F1]" />
            Comparación de Segmentos
          </h2>
          <p className="text-[#64748B] mt-1 text-[14px] leading-5">
            Análisis comparativo de rendimiento entre segmentos
          </p>
        </div>
      </div>

      {/* Segment Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#DBEAFE] border border-[#3B82F6] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-[#3B82F6]/20">
              <Users className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <span className="text-[14px] leading-5 text-[#3B82F6] font-medium">Segmento A</span>
          </div>
          <h3 className="text-[20px] leading-7 font-bold text-[#0F172A]">{segmentA}</h3>
        </div>

        <div className="bg-[#E0E7FF] border border-[#6366F1] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-[#6366F1]/20">
              <Users className="w-5 h-5 text-[#6366F1]" />
            </div>
            <span className="text-[14px] leading-5 text-[#6366F1] font-medium">Segmento B</span>
          </div>
          <h3 className="text-[20px] leading-7 font-bold text-[#0F172A]">{segmentB}</h3>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-[#FFFFFF] rounded-2xl p-6 border border-[#E2E8F0] shadow-md">
        <h3 className="text-[18px] leading-7 font-semibold text-[#0F172A] mb-6">Métricas Comparativas</h3>
        <div className="space-y-6">
          {metrics.map((metric, index) => {
            const winner = calculateWinner(metric.segmentA, metric.segmentB);
            
            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-[14px] leading-5 text-[#64748B]">
                  <span className="font-medium text-[#0F172A]">{metric.label}</span>
                  <div className="flex items-center gap-4">
                    <span className={`font-medium ${winner === 'A' ? 'text-[#3B82F6]' : 'text-[#64748B]'}`}>
                      {metric.segmentA}{metric.unit}
                    </span>
                    <span className="text-[#94A3B8]">vs</span>
                    <span className={`font-medium ${winner === 'B' ? 'text-[#6366F1]' : 'text-[#64748B]'}`}>
                      {metric.segmentB}{metric.unit}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-3 bg-[#F1F5F9] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#3B82F6] transition-all duration-300"
                      style={{
                        width: `${(metric.segmentA / Math.max(metric.segmentA, metric.segmentB)) * 100}%`
                      }}
                    ></div>
                  </div>
                  <div className="flex-1 h-3 bg-[#F1F5F9] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#6366F1] transition-all duration-300"
                      style={{
                        width: `${(metric.segmentB / Math.max(metric.segmentA, metric.segmentB)) * 100}%`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#FFFFFF] rounded-2xl p-6 border border-[#E2E8F0] shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-[#10B981]" />
            <span className="text-[14px] leading-5 text-[#64748B]">Mejor Conversión</span>
          </div>
          <p className="text-[20px] leading-7 font-bold text-[#0F172A]">{segmentA}</p>
          <p className="text-[14px] leading-5 text-[#10B981] mt-1">73% de conversión</p>
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl p-6 border border-[#E2E8F0] shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-5 h-5 text-[#3B82F6]" />
            <span className="text-[14px] leading-5 text-[#64748B]">Mayor Revenue</span>
          </div>
          <p className="text-[20px] leading-7 font-bold text-[#0F172A]">{segmentB}</p>
          <p className="text-[14px] leading-5 text-[#3B82F6] mt-1">€197 por cliente</p>
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl p-6 border border-[#E2E8F0] shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-5 h-5 text-[#6366F1]" />
            <span className="text-[14px] leading-5 text-[#64748B]">Mejor Engagement</span>
          </div>
          <p className="text-[20px] leading-7 font-bold text-[#0F172A]">{segmentB}</p>
          <p className="text-[14px] leading-5 text-[#6366F1] mt-1">94% de engagement</p>
        </div>
      </div>
    </div>
  );
}

