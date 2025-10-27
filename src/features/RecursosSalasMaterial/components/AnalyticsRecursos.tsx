import { BarChart3, TrendingUp, Users, Clock, Building2, Package } from 'lucide-react';

export default function AnalyticsRecursos() {
  // Datos de ejemplo para analytics
  const estadisticas = {
    ocupacionPromedio: 68,
    horasUso: 1247,
    recursosMasUsados: [
      { nombre: 'Sala de Musculación', uso: 92 },
      { nombre: 'Sala de Spinning', uso: 87 },
      { nombre: 'Sala de Yoga', uso: 74 },
      { nombre: 'Sala de CrossFit', uso: 68 },
      { nombre: 'Sala de Boxeo', uso: 45 }
    ],
    horasPico: [
      { hora: '06:00-09:00', ocupacion: 85 },
      { hora: '09:00-12:00', ocupacion: 45 },
      { hora: '12:00-15:00', ocupacion: 38 },
      { hora: '15:00-18:00', ocupacion: 52 },
      { hora: '18:00-21:00', ocupacion: 95 },
      { hora: '21:00-23:00', ocupacion: 62 }
    ],
    usoPorDia: [
      { dia: 'Lun', ocupacion: 82 },
      { dia: 'Mar', ocupacion: 78 },
      { dia: 'Mié', ocupacion: 85 },
      { dia: 'Jue', ocupacion: 72 },
      { dia: 'Vie', ocupacion: 68 },
      { dia: 'Sáb', ocupacion: 45 },
      { dia: 'Dom', ocupacion: 38 }
    ],
    eficienciaRecursos: 72,
    tiempoInactivo: 28
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-[24px] leading-8 font-semibold text-[#0F172A]">Analytics de Recursos</h2>
        <p className="text-[#64748B] text-[14px] leading-5 mt-1">Métricas y análisis de utilización de recursos</p>
      </div>

      {/* KPIs principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-[#10B981] to-[#059669] rounded-2xl p-6 text-white" style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}>
          <div className="flex items-center justify-between mb-3">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div className="text-[36px] leading-[44px] font-bold mb-1">{estadisticas.ocupacionPromedio}%</div>
          <div className="text-[#D1FAE5] text-[14px] leading-5">Ocupación Promedio</div>
          <div className="mt-2 text-[12px] leading-4 text-[#D1FAE5]">+5% vs mes anterior</div>
        </div>

        <div className="bg-gradient-to-br from-[#3B82F6] to-[#6366F1] rounded-2xl p-6 text-white" style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}>
          <div className="flex items-center justify-between mb-3">
            <Clock className="w-8 h-8" />
          </div>
          <div className="text-[36px] leading-[44px] font-bold mb-1">{estadisticas.horasUso}h</div>
          <div className="text-[#DBEAFE] text-[14px] leading-5">Horas de Uso Total</div>
          <div className="mt-2 text-[12px] leading-4 text-[#DBEAFE]">Este mes</div>
        </div>

        <div className="bg-gradient-to-br from-[#A855F7] to-[#EC4899] rounded-2xl p-6 text-white" style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}>
          <div className="flex items-center justify-between mb-3">
            <BarChart3 className="w-8 h-8" />
          </div>
          <div className="text-[36px] leading-[44px] font-bold mb-1">{estadisticas.eficienciaRecursos}%</div>
          <div className="text-[#F3E8FF] text-[14px] leading-5">Eficiencia de Recursos</div>
          <div className="mt-2 text-[12px] leading-4 text-[#F3E8FF]">Óptimo &gt; 70%</div>
        </div>

        <div className="bg-gradient-to-br from-[#F59E0B] to-[#EA580C] rounded-2xl p-6 text-white" style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}>
          <div className="flex items-center justify-between mb-3">
            <Users className="w-8 h-8" />
          </div>
          <div className="text-[36px] leading-[44px] font-bold mb-1">{estadisticas.tiempoInactivo}%</div>
          <div className="text-[#FEF3C7] text-[14px] leading-5">Tiempo Inactivo</div>
          <div className="mt-2 text-[12px] leading-4 text-[#FEF3C7]">Objetivo &lt; 30%</div>
        </div>
      </div>

      {/* Recursos más usados */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6" style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
        <h3 className="text-[20px] leading-7 font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-[#10B981]" />
          Recursos Más Usados
        </h3>
        <div className="space-y-4">
          {estadisticas.recursosMasUsados.map((recurso, idx) => (
            <div key={idx}>
              <div className="flex justify-between mb-2">
                <span className="font-medium text-[16px] leading-6 text-[#0F172A]">{recurso.nombre}</span>
                <span className="text-[#10B981] font-bold text-[16px] leading-6">{recurso.uso}%</span>
              </div>
              <div className="w-full bg-[#E2E8F0] rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#10B981] to-[#059669] transition-all duration-500"
                  style={{ width: `${recurso.uso}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Uso por franja horaria */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6" style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
        <h3 className="text-[20px] leading-7 font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-[#3B82F6]" />
          Ocupación por Franja Horaria
        </h3>
        <div className="space-y-3">
          {estadisticas.horasPico.map((franja, idx) => {
            const color = franja.ocupacion >= 80 ? 'bg-red-500' :
                         franja.ocupacion >= 60 ? 'bg-amber-500' :
                         franja.ocupacion >= 40 ? 'bg-blue-500' : 'bg-emerald-500';
            return (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-32 text-sm font-medium text-slate-700">{franja.hora}</div>
                <div className="flex-1">
                  <div className="w-full bg-slate-200 rounded-full h-6 overflow-hidden">
                    <div
                      className={`h-full ${color} flex items-center justify-end pr-2 transition-all duration-500`}
                      style={{ width: `${franja.ocupacion}%` }}
                    >
                      {franja.ocupacion >= 20 && (
                        <span className="text-white text-xs font-bold">
                          {franja.ocupacion}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Uso por día de la semana */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6" style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
        <h3 className="text-[20px] leading-7 font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-[#A855F7]" />
          Ocupación por Día de la Semana
        </h3>
        <div className="flex items-end justify-between gap-2 h-64">
          {estadisticas.usoPorDia.map((dia, idx) => {
            const altura = (dia.ocupacion / 100) * 100;
            const color = dia.ocupacion >= 80 ? 'from-red-500 to-red-600' :
                         dia.ocupacion >= 60 ? 'from-amber-500 to-amber-600' :
                         dia.ocupacion >= 40 ? 'from-blue-500 to-blue-600' : 'from-emerald-500 to-emerald-600';
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col items-center justify-end flex-1">
                  <span className="text-sm font-bold text-slate-700 mb-1">{dia.ocupacion}%</span>
                  <div
                    className={`w-full bg-gradient-to-t ${color} rounded-t-lg transition-all duration-500 hover:opacity-80`}
                    style={{ height: `${altura}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-slate-600">{dia.dia}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Insights y recomendaciones */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          Insights y Recomendaciones
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Pico de uso en horario vespertino</h4>
              <p className="text-sm text-slate-600">
                El 95% de ocupación entre 18:00-21:00 indica alta demanda. Considera ampliar horarios o recursos en esta franja.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Sala de Boxeo infrautilizada</h4>
              <p className="text-sm text-slate-600">
                Con solo 45% de uso, esta sala tiene potencial. Considera crear más clases o eventos de boxeo.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Package className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Baja ocupación fines de semana</h4>
              <p className="text-sm text-slate-600">
                La ocupación cae a 38-45% los fines de semana. Implementa promociones o eventos especiales.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

