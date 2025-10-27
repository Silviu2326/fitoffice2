import { BarChart3, TrendingUp, Users, Target, CheckCircle, AlertCircle } from 'lucide-react';

export default function MetricasAdherencia() {
  // Datos de ejemplo
  const metricas = {
    adherenciaGeneral: 78,
    tendencia: 5.2,
    clientesActivos: 45,
    clientesRiesgo: 8,
    sesionesCompletadas: 892,
    sesionesTotales: 1140,
    metaSemanal: 85
  };

  const metricasPorSemana = [
    { semana: 'Sem 1', adherencia: 72 },
    { semana: 'Sem 2', adherencia: 75 },
    { semana: 'Sem 3', adherencia: 78 },
    { semana: 'Sem 4', adherencia: 80 }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-[#E2E8F0] p-6 hover:shadow-xl transition-all duration-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-[20px] leading-7 font-semibold text-[#0F172A]">Métricas de Adherencia</h3>
          <p className="text-[14px] leading-5 text-[#64748B] mt-1">Análisis global de cumplimiento</p>
        </div>
        <BarChart3 className="w-6 h-6 text-[#10B981]" />
      </div>

      {/* Métrica Principal */}
      <div className="bg-gradient-to-br from-[#D1FAE5] to-[#A7F3D0] rounded-2xl p-6 mb-6 border border-[#10B981]/20 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[14px] leading-5 text-[#64748B] mb-2">Adherencia General</p>
            <p className="text-[48px] leading-[56px] font-extrabold text-[#10B981]">{metricas.adherenciaGeneral}%</p>
            <div className="flex items-center gap-2 mt-2">
              <TrendingUp className="w-4 h-4 text-[#10B981]" />
              <span className="text-[14px] leading-5 font-semibold text-[#059669]">
                +{metricas.tendencia}% vs mes anterior
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E2E8F0]">
              <p className="text-[12px] leading-4 text-[#64748B] mb-1">Meta Semanal</p>
              <p className="text-[24px] leading-8 font-bold text-[#0F172A]">{metricas.metaSemanal}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Métricas Clave */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[#EEF2FF] rounded-xl p-4 border border-[#6366F1]/20">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-[#6366F1]" />
            <p className="text-[14px] leading-5 font-semibold text-[#0F172A]">Clientes Activos</p>
          </div>
          <p className="text-[32px] leading-10 font-bold text-[#6366F1]">{metricas.clientesActivos}</p>
          <p className="text-[12px] leading-4 text-[#64748B] mt-1">Con adherencia &gt; 70%</p>
        </div>

        <div className="bg-[#FEE2E2] rounded-xl p-4 border border-[#EF4444]/20">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5 text-[#EF4444]" />
            <p className="text-[14px] leading-5 font-semibold text-[#0F172A]">En Riesgo</p>
          </div>
          <p className="text-[32px] leading-10 font-bold text-[#EF4444]">{metricas.clientesRiesgo}</p>
          <p className="text-[12px] leading-4 text-[#64748B] mt-1">Con adherencia &lt; 50%</p>
        </div>
      </div>

      {/* Sesiones */}
      <div className="bg-[#F8FAFC] rounded-xl p-4 mb-6 border border-[#E2E8F0]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-[#10B981]" />
            <p className="font-semibold text-[#0F172A] text-[16px]">Sesiones Completadas</p>
          </div>
          <p className="text-[24px] leading-8 font-bold text-[#0F172A]">
            {metricas.sesionesCompletadas} / {metricas.sesionesTotales}
          </p>
        </div>
        <div className="relative pt-1">
          <div className="overflow-hidden h-3 text-xs flex rounded-xl bg-[#E2E8F0]">
            <div
              style={{ width: `${(metricas.sesionesCompletadas / metricas.sesionesTotales) * 100}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-[#10B981] to-[#059669] transition-all duration-300"
            ></div>
          </div>
        </div>
      </div>

      {/* Tendencia por Semana */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-[#64748B]" />
          <h4 className="font-semibold text-[#0F172A] text-[16px]">Tendencia Últimas 4 Semanas</h4>
        </div>
        <div className="space-y-3">
          {metricasPorSemana.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="text-[14px] leading-5 font-medium text-[#64748B] w-16">{item.semana}</span>
              <div className="flex-1 relative pt-1">
                <div className="overflow-hidden h-8 text-xs flex rounded-xl bg-[#E2E8F0]">
                  <div
                    style={{ width: `${item.adherencia}%` }}
                    className="shadow-none flex items-center justify-end px-2 whitespace-nowrap text-white font-semibold bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] transition-all duration-300"
                  >
                    {item.adherencia}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
