import { LineChart, Calendar, TrendingUp, AlertTriangle } from 'lucide-react';

interface ProyeccionMes {
  mes: string;
  ingresoProyectado: number;
  gastoProyectado: number;
  beneficioProyectado: number;
  confianza: 'alta' | 'media' | 'baja';
}

interface ProyeccionesFinancierasProps {
  proyecciones: ProyeccionMes[];
  tasaCrecimiento: number;
}

export default function ProyeccionesFinancieras({ proyecciones, tasaCrecimiento }: ProyeccionesFinancierasProps) {
  const getColorConfianza = (confianza: string) => {
    switch (confianza) {
      case 'alta':
        return 'bg-[#D1FAE5] text-[#10B981]';
      case 'media':
        return 'bg-[#FEF3C7] text-[#F59E0B]';
      case 'baja':
        return 'bg-[#FEE2E2] text-[#EF4444]';
      default:
        return 'bg-[#F1F5F9] text-[#64748B]';
    }
  };

  const totalProyectado = proyecciones.reduce((sum, p) => sum + p.beneficioProyectado, 0);
  const promedioMensual = totalProyectado / proyecciones.length;

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),_0_2px_4px_-1px_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[#6366F1] p-2 rounded-xl">
          <LineChart className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-[20px] leading-[28px] font-semibold text-[#0F172A]">Proyecciones Financieras</h3>
          <p className="text-[14px] leading-[20px] text-[#64748B]">Estimaciones basadas en datos históricos</p>
        </div>
        <div className="flex items-center gap-2 bg-[#F8FAFC] px-3 py-2 rounded-xl border border-[#E2E8F0]">
          <Calendar className="w-4 h-4 text-[#64748B]" />
          <span className="text-[14px] leading-[20px] text-[#0F172A]">{proyecciones.length} meses</span>
        </div>
      </div>

      {/* Resumen de proyección */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[#EEF2FF] border border-[#6366F1] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-[#6366F1]" />
            <p className="text-[14px] leading-[20px] text-[#64748B]">Beneficio Proyectado</p>
          </div>
          <p className="text-[24px] leading-[32px] font-bold text-[#0F172A]">€{totalProyectado.toLocaleString()}</p>
          <p className="text-[12px] leading-[16px] font-medium text-[#94A3B8] mt-1">Próximos {proyecciones.length} meses</p>
        </div>

        <div className="bg-[#D1FAE5] border border-[#10B981] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-[#10B981]" />
            <p className="text-[14px] leading-[20px] text-[#64748B]">Tasa de Crecimiento</p>
          </div>
          <p className={`text-[24px] leading-[32px] font-bold ${tasaCrecimiento >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
            {tasaCrecimiento >= 0 ? '+' : ''}{tasaCrecimiento}%
          </p>
          <p className="text-[12px] leading-[16px] font-medium text-[#94A3B8] mt-1">Estimado mensual</p>
        </div>
      </div>

      {/* Lista de proyecciones mensuales */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {proyecciones.map((proyeccion, index) => (
          <div key={index} className="bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="bg-[#EEF2FF] p-2 rounded-xl">
                  <Calendar className="w-4 h-4 text-[#6366F1]" />
                </div>
                <div>
                  <p className="font-medium text-[#0F172A] text-[16px] leading-[24px]">{proyeccion.mes}</p>
                  <span className={`text-[12px] leading-[16px] font-medium px-3 py-1 rounded-full ${getColorConfianza(proyeccion.confianza)}`}>
                    Confianza {proyeccion.confianza}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[18px] leading-[28px] font-bold text-[#0F172A]">
                  €{proyeccion.beneficioProyectado.toLocaleString()}
                </p>
                <p className="text-[12px] leading-[16px] font-medium text-[#94A3B8]">Beneficio estimado</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-[14px] leading-[20px]">
              <div className="bg-[#D1FAE5] rounded-lg px-3 py-2">
                <p className="text-[#64748B] text-[12px] leading-[16px] font-medium">Ingresos</p>
                <p className="text-[#10B981] font-semibold">€{proyeccion.ingresoProyectado.toLocaleString()}</p>
              </div>
              <div className="bg-[#FEE2E2] rounded-lg px-3 py-2">
                <p className="text-[#64748B] text-[12px] leading-[16px] font-medium">Gastos</p>
                <p className="text-[#EF4444] font-semibold">€{proyeccion.gastoProyectado.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Nota informativa */}
      <div className="mt-6 bg-[#FEF3C7] border border-[#F59E0B] rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[14px] leading-[20px] font-medium text-[#F59E0B] mb-1">Nota sobre proyecciones</p>
            <p className="text-[12px] leading-[16px] text-[#64748B]">
              Las proyecciones se basan en datos históricos y tendencias actuales. 
              Los resultados reales pueden variar según factores externos y cambios en el negocio.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-[#E2E8F0]">
        <div className="flex items-center justify-between text-[14px] leading-[20px]">
          <span className="text-[#64748B]">Promedio mensual proyectado</span>
          <span className="text-[18px] leading-[28px] font-bold text-[#0F172A]">€{promedioMensual.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

