import { BarChart3, PieChart, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';

interface SegmentPerformance {
  segment: string;
  size: number;
  conversion: number;
  revenue: number;
  engagement: number;
}

export default function SegmentAnalytics() {
  const [performance] = useState<SegmentPerformance[]>([
    {
      segment: 'Mujeres 30-45 Bono Caducando',
      size: 23,
      conversion: 73,
      revenue: 3450,
      engagement: 89
    },
    {
      segment: 'Alta Adherencia - Upsell',
      size: 45,
      conversion: 62,
      revenue: 8900,
      engagement: 94
    },
    {
      segment: 'Riesgo de Abandono',
      size: 18,
      conversion: 34,
      revenue: 1200,
      engagement: 23
    },
    {
      segment: 'Nuevos Miembros',
      size: 31,
      conversion: 56,
      revenue: 4650,
      engagement: 67
    }
  ]);

  const totalRevenue = performance.reduce((sum, seg) => sum + seg.revenue, 0);
  const avgConversion = Math.round(
    performance.reduce((sum, seg) => sum + seg.conversion, 0) / performance.length
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[24px] leading-8 font-semibold text-[#0F172A] flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-[#6366F1]" />
            Analytics de Segmentos
          </h2>
          <p className="text-[#64748B] mt-1 text-[14px] leading-5">
            Análisis de efectividad y rendimiento por segmento
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#FFFFFF] rounded-2xl p-6 border border-[#E2E8F0] shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-[#EEF2FF]">
              <Users className="w-5 h-5 text-[#6366F1]" />
            </div>
            <span className="text-[14px] leading-5 text-[#64748B]">Total Clientes</span>
          </div>
          <p className="text-[30px] leading-[38px] font-bold text-[#0F172A]">
            {performance.reduce((sum, seg) => sum + seg.size, 0)}
          </p>
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl p-6 border border-[#E2E8F0] shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-[#DBEAFE]">
              <TrendingUp className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <span className="text-[14px] leading-5 text-[#64748B]">Conversión Media</span>
          </div>
          <p className="text-[30px] leading-[38px] font-bold text-[#0F172A]">{avgConversion}%</p>
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl p-6 border border-[#E2E8F0] shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-[#E0E7FF]">
              <PieChart className="w-5 h-5 text-[#6366F1]" />
            </div>
            <span className="text-[14px] leading-5 text-[#64748B]">Revenue Total</span>
          </div>
          <p className="text-[30px] leading-[38px] font-bold text-[#0F172A]">€{totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Performance Table */}
      <div className="bg-[#FFFFFF] rounded-2xl p-6 border border-[#E2E8F0] shadow-md">
        <h3 className="text-[18px] leading-7 font-semibold text-[#0F172A] mb-4">Rendimiento por Segmento</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E2E8F0]">
                <th className="text-left text-[#64748B] font-medium py-3 px-4 text-[14px] leading-5">Segmento</th>
                <th className="text-left text-[#64748B] font-medium py-3 px-4 text-[14px] leading-5">Tamaño</th>
                <th className="text-left text-[#64748B] font-medium py-3 px-4 text-[14px] leading-5">Conversión</th>
                <th className="text-left text-[#64748B] font-medium py-3 px-4 text-[14px] leading-5">Revenue</th>
                <th className="text-left text-[#64748B] font-medium py-3 px-4 text-[14px] leading-5">Engagement</th>
              </tr>
            </thead>
            <tbody>
              {performance.map((seg, index) => (
                <tr
                  key={index}
                  className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors duration-100"
                >
                  <td className="py-4 px-4 text-[#0F172A] font-medium text-[16px] leading-6">{seg.segment}</td>
                  <td className="py-4 px-4 text-[#64748B] text-[14px] leading-5">{seg.size} clientes</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#6366F1] transition-all duration-300"
                          style={{ width: `${seg.conversion}%` }}
                        ></div>
                      </div>
                      <span className="text-[#0F172A] font-medium text-[14px] leading-5">{seg.conversion}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-[#10B981] font-semibold text-[16px] leading-6">
                    €{seg.revenue.toLocaleString()}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#3B82F6] transition-all duration-300"
                          style={{ width: `${seg.engagement}%` }}
                        ></div>
                      </div>
                      <span className="text-[#64748B] text-[14px] leading-5">{seg.engagement}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

