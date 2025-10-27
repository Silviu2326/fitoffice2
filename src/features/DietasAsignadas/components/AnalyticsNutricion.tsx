import { BarChart3, TrendingUp, Users, Target } from 'lucide-react';

export default function AnalyticsNutricion() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-[#EEF2FF] p-3 rounded-xl">
          <BarChart3 className="w-6 h-6 text-[#6366F1]" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#F1F5F9]">Analytics de Nutrición</h2>
          <p className="text-sm text-[#94A3B8]">Métricas de adherencia nutricional</p>
        </div>
      </div>

      {/* KPIs principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#1E1E2E] rounded-2xl p-6 border border-[#334155] shadow-md hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 text-[#10B981]" />
            <span className="text-sm text-[#10B981] font-semibold">+12%</span>
          </div>
          <p className="text-3xl font-bold text-[#F1F5F9] mb-1">25</p>
          <p className="text-sm text-[#94A3B8]">Clientes con dieta activa</p>
        </div>

        <div className="bg-[#1E1E2E] rounded-2xl p-6 border border-[#334155] shadow-md hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-8 h-8 text-[#3B82F6]" />
            <span className="text-sm text-[#3B82F6] font-semibold">+5%</span>
          </div>
          <p className="text-3xl font-bold text-[#F1F5F9] mb-1">87%</p>
          <p className="text-sm text-[#94A3B8]">Adherencia promedio</p>
        </div>

        <div className="bg-[#1E1E2E] rounded-2xl p-6 border border-[#334155] shadow-md hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 text-[#F59E0B]" />
            <span className="text-sm text-[#F59E0B] font-semibold">+18%</span>
          </div>
          <p className="text-3xl font-bold text-[#F1F5F9] mb-1">142</p>
          <p className="text-sm text-[#94A3B8]">Fotos revisadas (mes)</p>
        </div>

        <div className="bg-[#1E1E2E] rounded-2xl p-6 border border-[#334155] shadow-md hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="w-8 h-8 text-[#8B5CF6]" />
            <span className="text-sm text-[#8B5CF6] font-semibold">+8%</span>
          </div>
          <p className="text-3xl font-bold text-[#F1F5F9] mb-1">92%</p>
          <p className="text-sm text-[#94A3B8]">Satisfacción</p>
        </div>
      </div>

      {/* Gráfico de adherencia semanal */}
      <div className="bg-[#1E1E2E] rounded-2xl p-6 border border-[#334155] shadow-md">
        <h3 className="text-lg font-semibold text-[#F1F5F9] mb-6">Adherencia Semanal</h3>
        <div className="space-y-4">
          {[
            { semana: 'Semana 1', adherencia: 85, color: 'bg-[#10B981]' },
            { semana: 'Semana 2', adherencia: 88, color: 'bg-[#10B981]' },
            { semana: 'Semana 3', adherencia: 91, color: 'bg-[#10B981]' },
            { semana: 'Semana 4', adherencia: 87, color: 'bg-[#10B981]' }
          ].map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#F1F5F9] font-medium">{item.semana}</span>
                <span className="text-sm text-[#10B981] font-bold">{item.adherencia}%</span>
              </div>
              <div className="relative w-full h-3 bg-[#0F0F23] rounded-full overflow-hidden">
                <div
                  className={`absolute left-0 top-0 h-full ${item.color} transition-all duration-500`}
                  style={{ width: `${item.adherencia}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Distribución por tipo de dieta */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-[#1E1E2E] rounded-2xl p-6 border border-[#334155] shadow-md">
          <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">Distribución por Tipo</h3>
          <div className="space-y-4">
            {[
              { tipo: 'Dietas Individuales', cantidad: 15, porcentaje: 60, color: 'bg-[#10B981]' },
              { tipo: 'Planes Estándar', cantidad: 10, porcentaje: 40, color: 'bg-[#3B82F6]' }
            ].map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#F1F5F9]">{item.tipo}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-[#F1F5F9] font-semibold">{item.cantidad}</span>
                    <span className="text-xs text-[#94A3B8]">({item.porcentaje}%)</span>
                  </div>
                </div>
                <div className="relative w-full h-2.5 bg-[#0F0F23] rounded-full overflow-hidden">
                  <div
                    className={`absolute left-0 top-0 h-full ${item.color}`}
                    style={{ width: `${item.porcentaje}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1E1E2E] rounded-2xl p-6 border border-[#334155] shadow-md">
          <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">Objetivos Nutricionales</h3>
          <div className="space-y-4">
            {[
              { objetivo: 'Pérdida de grasa', cantidad: 12, porcentaje: 48, color: 'bg-[#EF4444]' },
              { objetivo: 'Ganancia muscular', cantidad: 8, porcentaje: 32, color: 'bg-[#3B82F6]' },
              { objetivo: 'Mantenimiento', cantidad: 5, porcentaje: 20, color: 'bg-[#F59E0B]' }
            ].map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#F1F5F9]">{item.objetivo}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-[#F1F5F9] font-semibold">{item.cantidad}</span>
                    <span className="text-xs text-[#94A3B8]">({item.porcentaje}%)</span>
                  </div>
                </div>
                <div className="relative w-full h-2.5 bg-[#0F0F23] rounded-full overflow-hidden">
                  <div
                    className={`absolute left-0 top-0 h-full ${item.color}`}
                    style={{ width: `${item.porcentaje}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabla de top clientes */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Top Clientes por Adherencia</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Cliente</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Tipo Dieta</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-slate-400">Adherencia</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-slate-400">Fotos</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-slate-400">Días activo</th>
              </tr>
            </thead>
            <tbody>
              {[
                { nombre: 'Ana García', tipo: 'Individual', adherencia: 95, fotos: 42, dias: 28 },
                { nombre: 'Carlos Ruiz', tipo: 'Plan Estándar', adherencia: 92, fotos: 38, dias: 21 },
                { nombre: 'María López', tipo: 'Individual', adherencia: 89, fotos: 35, dias: 24 },
                { nombre: 'Pedro Sánchez', tipo: 'Plan Estándar', adherencia: 87, fotos: 31, dias: 18 }
              ].map((cliente, index) => (
                <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                  <td className="py-3 px-4 text-white font-medium">{cliente.nombre}</td>
                  <td className="py-3 px-4 text-slate-300">{cliente.tipo}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-emerald-400 font-semibold">{cliente.adherencia}%</span>
                  </td>
                  <td className="py-3 px-4 text-center text-slate-300">{cliente.fotos}</td>
                  <td className="py-3 px-4 text-center text-slate-300">{cliente.dias}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

