import { BarChart3, Calendar, TrendingUp } from 'lucide-react';

interface MesRendimiento {
  mes: string;
  ingresos: number;
  gastos: number;
  beneficio: number;
}

interface RendimientoMensualProps {
  meses: MesRendimiento[];
}

export default function RendimientoMensual({ meses }: RendimientoMensualProps) {
  const maxValor = Math.max(...meses.map(m => Math.max(m.ingresos, m.gastos)));
  
  const calcularPorcentaje = (valor: number) => {
    return (valor / maxValor) * 100;
  };

  const mesActual = meses[meses.length - 1];
  const mesAnterior = meses[meses.length - 2];
  const variacion = mesAnterior 
    ? ((mesActual.beneficio - mesAnterior.beneficio) / mesAnterior.beneficio) * 100 
    : 0;

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),_0_2px_4px_-1px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-[#6366F1] p-2 rounded-xl">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-[20px] leading-[28px] font-semibold text-[#0F172A]">Rendimiento Mensual</h3>
            <p className="text-[14px] leading-[20px] text-[#64748B]">Evolución de últimos meses</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-[#F8FAFC] px-4 py-2 rounded-xl border border-[#E2E8F0]">
          <Calendar className="w-4 h-4 text-[#64748B]" />
          <span className="text-[14px] leading-[20px] text-[#0F172A]">Últimos {meses.length} meses</span>
        </div>
      </div>

      {/* Resumen del mes actual */}
      <div className="bg-[#EEF2FF] rounded-xl p-4 mb-6 border border-[#6366F1]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[14px] leading-[20px] text-[#64748B] mb-1">Beneficio Mes Actual</p>
            <p className="text-[24px] leading-[32px] font-bold text-[#0F172A]">€{mesActual.beneficio.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <div className={`flex items-center gap-2 ${variacion >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
              <TrendingUp className={`w-5 h-5 ${variacion < 0 ? 'rotate-180' : ''}`} />
              <span className="text-[20px] leading-[28px] font-bold">{variacion >= 0 ? '+' : ''}{variacion.toFixed(1)}%</span>
            </div>
            <p className="text-[12px] leading-[16px] font-medium text-[#94A3B8]">vs. mes anterior</p>
          </div>
        </div>
      </div>

      {/* Gráfico de barras */}
      <div className="space-y-6">
        {meses.map((mes, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between text-[14px] leading-[20px]">
              <span className="text-[#0F172A] font-medium">{mes.mes}</span>
              <div className="flex items-center gap-4">
                <span className="text-[#10B981]">€{mes.ingresos.toLocaleString()}</span>
                <span className="text-[#EF4444]">€{mes.gastos.toLocaleString()}</span>
                <span className={`font-bold ${mes.beneficio >= 0 ? 'text-[#0F172A]' : 'text-[#EF4444]'}`}>
                  €{mes.beneficio.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="relative h-8 bg-[#F1F5F9] rounded-xl overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#10B981] to-[#059669] transition-all duration-200"
                style={{ width: `${calcularPorcentaje(mes.ingresos)}%` }}
              />
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#EF4444] to-[#DC2626] opacity-50 transition-all duration-200"
                style={{ width: `${calcularPorcentaje(mes.gastos)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Leyenda */}
      <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#10B981]" />
          <span className="text-[12px] leading-[16px] font-medium text-[#64748B]">Ingresos</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
          <span className="text-[12px] leading-[16px] font-medium text-[#64748B]">Gastos</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#0F172A]" />
          <span className="text-[12px] leading-[16px] font-medium text-[#64748B]">Beneficio</span>
        </div>
      </div>
    </div>
  );
}

