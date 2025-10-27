import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Target, Award, Calendar, PieChart, Activity } from 'lucide-react';
import { getEstadisticasParticipacion } from '../api/participantes';
import { getEstadisticasProgreso } from '../api/progreso';

interface AnalyticsEventosProps {
  retoId: string;
  retoNombre: string;
}

export default function AnalyticsEventos({ retoId, retoNombre }: AnalyticsEventosProps) {
  const [statsParticipacion, setStatsParticipacion] = useState<any>(null);
  const [statsProgreso, setStatsProgreso] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarEstadisticas();
  }, [retoId]);

  const cargarEstadisticas = async () => {
    setLoading(true);
    const [{ data: participacion }, { data: progreso }] = await Promise.all([
      getEstadisticasParticipacion(retoId),
      getEstadisticasProgreso(retoId),
    ]);
    setStatsParticipacion(participacion);
    setStatsProgreso(progreso);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#6366F1] border-t-transparent"></div>
      </div>
    );
  }

  const tasaRetencion = statsParticipacion 
    ? ((statsParticipacion.activos + statsParticipacion.completados) / statsParticipacion.total * 100).toFixed(1)
    : '0';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#EEF2FF] to-[#DBEAFE] rounded-2xl p-6 border border-[#E2E8F0]">
        <div className="flex items-center gap-3 mb-2">
          <BarChart3 className="w-8 h-8 text-[#6366F1]" />
          <h3 className="text-2xl font-bold text-[#0F172A]">Analytics del Evento</h3>
        </div>
        <p className="text-[#64748B]">{retoNombre}</p>
      </div>

      {/* KPIs principales */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-8 h-8 text-[#3B82F6]" />
            <span className="text-sm font-semibold text-[#64748B]">Participantes</span>
          </div>
          <div className="text-3xl font-bold text-[#0F172A]">{statsParticipacion?.total || 0}</div>
          <div className="text-sm text-[#64748B] mt-1">Total inscritos</div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-8 h-8 text-[#10B981]" />
            <span className="text-sm font-semibold text-[#64748B]">Activos</span>
          </div>
          <div className="text-3xl font-bold text-[#10B981]">{statsParticipacion?.activos || 0}</div>
          <div className="text-sm text-[#64748B] mt-1">Participando ahora</div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-8 h-8 text-[#10B981]" />
            <span className="text-sm font-semibold text-[#64748B]">Completados</span>
          </div>
          <div className="text-3xl font-bold text-[#10B981]">{statsParticipacion?.completados || 0}</div>
          <div className="text-sm text-[#64748B] mt-1">Finalizaron el reto</div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-8 h-8 text-[#6366F1]" />
            <span className="text-sm font-semibold text-[#64748B]">Retención</span>
          </div>
          <div className="text-3xl font-bold text-[#6366F1]">{tasaRetencion}%</div>
          <div className="text-sm text-[#64748B] mt-1">Tasa de retención</div>
        </div>
      </div>

      {/* Estadísticas de progreso */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Distribución de estados */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-md">
          <h4 className="font-bold text-[#0F172A] mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-[#6366F1]" />
            Distribución de Estados
          </h4>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-slate-700">Inscritos</span>
                <span className="font-bold text-blue-600">{statsParticipacion?.inscritos || 0}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all" 
                  style={{ width: `${(statsParticipacion?.inscritos / statsParticipacion?.total * 100) || 0}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-slate-700">Activos</span>
                <span className="font-bold text-green-600">{statsParticipacion?.activos || 0}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all" 
                  style={{ width: `${(statsParticipacion?.activos / statsParticipacion?.total * 100) || 0}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-slate-700">Completados</span>
                <span className="font-bold text-emerald-600">{statsParticipacion?.completados || 0}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-emerald-600 h-2 rounded-full transition-all" 
                  style={{ width: `${(statsParticipacion?.completados / statsParticipacion?.total * 100) || 0}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-slate-700">Abandonados</span>
                <span className="font-bold text-red-600">{statsParticipacion?.abandonados || 0}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-red-600 h-2 rounded-full transition-all" 
                  style={{ width: `${(statsParticipacion?.abandonados / statsParticipacion?.total * 100) || 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Métricas de progreso */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-600" />
            Métricas de Progreso
          </h4>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-4">
              <div className="text-sm text-slate-700 mb-1">Progreso Promedio</div>
              <div className="text-3xl font-bold text-emerald-600">
                {statsParticipacion?.progresoPromedio?.toFixed(1) || 0}%
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
              <div className="text-sm text-slate-700 mb-1">Total de Registros</div>
              <div className="text-3xl font-bold text-blue-600">
                {statsProgreso?.totalRegistros || 0}
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
              <div className="text-sm text-slate-700 mb-1">Tasa de Completación</div>
              <div className="text-3xl font-bold text-purple-600">
                {statsProgreso?.tasaCompletacion?.toFixed(1) || 0}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Insights y recomendaciones */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
        <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-amber-600" />
          Insights y Recomendaciones
        </h4>
        <div className="space-y-3">
          {tasaRetencion && parseFloat(tasaRetencion) > 80 && (
            <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <span className="text-xl">✅</span>
              <div>
                <p className="font-medium text-green-900">¡Excelente retención!</p>
                <p className="text-sm text-green-700">Tu reto está manteniendo muy bien el engagement de los participantes.</p>
              </div>
            </div>
          )}

          {tasaRetencion && parseFloat(tasaRetencion) < 50 && (
            <div className="flex items-start gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <span className="text-xl">⚠️</span>
              <div>
                <p className="font-medium text-orange-900">Oportunidad de mejora</p>
                <p className="text-sm text-orange-700">Considera enviar más mensajes motivacionales y reconocer logros públicamente.</p>
              </div>
            </div>
          )}

          {statsParticipacion?.inscritos > 0 && statsParticipacion?.activos === 0 && (
            <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <span className="text-xl">💡</span>
              <div>
                <p className="font-medium text-blue-900">Activa tus participantes</p>
                <p className="text-sm text-blue-700">Hay participantes inscritos que aún no han comenzado. Envíales un recordatorio.</p>
              </div>
            </div>
          )}

          {statsParticipacion?.completados > 5 && (
            <div className="flex items-start gap-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <span className="text-xl">🎉</span>
              <div>
                <p className="font-medium text-purple-900">¡Celebra los logros!</p>
                <p className="text-sm text-purple-700">Tienes {statsParticipacion.completados} participantes que completaron el reto. ¡Reconócelos!</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-md">
        <h4 className="font-bold text-[#0F172A] mb-4">Acciones Rápidas</h4>
        <div className="grid md:grid-cols-3 gap-3">
          <button className="px-4 py-3 bg-[#10B981] text-white rounded-xl hover:bg-[#059669] transition-all duration-200 font-semibold shadow-md hover:shadow-lg">
            📊 Exportar Reporte
          </button>
          <button className="px-4 py-3 bg-[#3B82F6] text-white rounded-xl hover:bg-[#2563EB] transition-all duration-200 font-semibold shadow-md hover:shadow-lg">
            📧 Enviar Resumen
          </button>
          <button className="px-4 py-3 bg-[#6366F1] text-white rounded-xl hover:bg-[#4F46E5] transition-all duration-200 font-semibold shadow-md hover:shadow-lg">
            🏆 Ver Ganadores
          </button>
        </div>
      </div>
    </div>
  );
}

