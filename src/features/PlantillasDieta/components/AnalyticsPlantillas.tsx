import { BarChart3, TrendingUp, Users, Target, Star, Activity } from 'lucide-react';

export default function AnalyticsPlantillas() {
  const metricas = {
    totalPlantillas: 24,
    plantillasMasUsadas: 'Déficit Suave 2-3kg/mes',
    efectividadMedia: 86,
    totalCategorias: 8,
    usosEsteMes: 127,
    crecimientoMensual: 15,
  };

  const topPlantillas = [
    { nombre: 'Déficit Suave 2-3kg/mes', usos: 25, efectividad: 92, categoria: 'Pérdida de Peso' },
    { nombre: 'Volumen Limpio 3000 kcal', usos: 18, efectividad: 88, categoria: 'Ganancia Muscular' },
    { nombre: 'Vegetariana 1800 kcal', usos: 12, efectividad: 85, categoria: 'Vegetariana' },
    { nombre: 'Keto Estricta 1500 kcal', usos: 8, efectividad: 78, categoria: 'Cetogénica' },
    { nombre: 'Mediterránea 2000 kcal', usos: 15, efectividad: 90, categoria: 'Mediterránea' },
  ];

  const tendencias = [
    { mes: 'Oct', usos: 45, creadas: 2 },
    { mes: 'Nov', usos: 68, creadas: 3 },
    { mes: 'Dic', usos: 82, creadas: 4 },
    { mes: 'Ene', usos: 95, creadas: 5 },
    { mes: 'Feb', usos: 127, creadas: 6 },
  ];

  const categoriaStats = [
    { nombre: 'Pérdida de Peso', plantillas: 12, usos: 89, efectividad: 88 },
    { nombre: 'Ganancia Muscular', plantillas: 9, usos: 67, efectividad: 85 },
    { nombre: 'Vegetariana', plantillas: 8, usos: 54, efectividad: 86 },
    { nombre: 'Cetogénica', plantillas: 5, usos: 32, efectividad: 82 },
    { nombre: 'Mediterránea', plantillas: 6, usos: 45, efectividad: 89 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <BarChart3 className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#0F172A]">Analytics de Plantillas</h2>
            <p className="text-sm text-[#94A3B8] mt-1">
              Métricas de uso y efectividad de tus plantillas nutricionales
            </p>
          </div>
        </div>
      </div>

      {/* Métricas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#94A3B8] text-sm font-semibold">Total Plantillas</span>
            <Target className="w-5 h-5 text-[#6366F1]" />
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">{metricas.totalPlantillas}</p>
          <p className="text-xs text-emerald-600 mt-1">+{metricas.crecimientoMensual}% este mes</p>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#94A3B8] text-sm font-semibold">Efectividad Media</span>
            <Star className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">{metricas.efectividadMedia}%</p>
          <p className="text-xs text-emerald-600 mt-1">+2% vs mes anterior</p>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#94A3B8] text-sm font-semibold">Usos Este Mes</span>
            <Activity className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">{metricas.usosEsteMes}</p>
          <p className="text-xs text-emerald-600 mt-1">+32% vs mes anterior</p>
        </div>
      </div>

      {/* Top Plantillas */}
      <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[#0F172A]">Top 5 Plantillas Más Usadas</h3>
          <TrendingUp className="w-5 h-5 text-emerald-500" />
        </div>

        <div className="space-y-4">
          {topPlantillas.map((plantilla, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                  index === 0
                    ? 'bg-amber-100 text-amber-700'
                    : index === 1
                    ? 'bg-slate-200 text-slate-700'
                    : index === 2
                    ? 'bg-orange-100 text-orange-700'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {index + 1}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-[#0F172A]">{plantilla.nombre}</h4>
                <span className="text-xs text-[#94A3B8]">{plantilla.categoria}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-[#0F172A]">{plantilla.usos} usos</p>
                <p className="text-xs text-emerald-600">{plantilla.efectividad}% efectiva</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tendencias de Uso */}
      <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-6">
        <h3 className="text-lg font-bold text-[#0F172A] mb-6">Tendencias de Uso (Últimos 5 meses)</h3>

        <div className="space-y-4">
          {tendencias.map((mes) => {
            const maxUsos = Math.max(...tendencias.map((t) => t.usos));
            const porcentaje = (mes.usos / maxUsos) * 100;

            return (
              <div key={mes.mes} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-[#0F172A]">{mes.mes}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-[#94A3B8]">{mes.usos} usos</span>
                    <span className="text-[#94A3B8]">{mes.creadas} creadas</span>
                  </div>
                </div>
                <div className="relative w-full bg-[#E2E8F0] rounded-full h-3">
                  <div
                    className="absolute top-0 left-0 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-200 ease-out"
                    style={{ width: `${porcentaje}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Estadísticas por Categoría */}
      <div className="bg-white rounded-xl shadow-md border border-[#E2E8F0] p-6">
        <div className="flex items-center gap-2 mb-6">
          <Users className="w-5 h-5 text-[#6366F1]" />
          <h3 className="text-lg font-bold text-[#0F172A]">Estadísticas por Categoría</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                  Categoría
                </th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                  Plantillas
                </th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                  Usos Totales
                </th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                  Efectividad
                </th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                  Popularidad
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {categoriaStats.map((categoria, index) => (
                <tr key={index} className="hover:bg-[#F8FAFC] transition-all duration-200 ease-out">
                  <td className="px-4 py-4">
                    <span className="font-semibold text-[#0F172A]">{categoria.nombre}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="text-[#0F172A]">{categoria.plantillas}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="font-semibold text-blue-600">{categoria.usos}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-20 bg-[#E2E8F0] rounded-full h-2">
                        <div
                          className="bg-emerald-500 h-2 rounded-full transition-all duration-200 ease-out"
                          style={{ width: `${categoria.efectividad}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-[#0F172A]">{categoria.efectividad}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="inline-flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.round((categoria.usos / 100) * 5)
                              ? 'text-amber-400 fill-current'
                              : 'text-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-emerald-500 text-white rounded-lg">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-emerald-900">Mejor Rendimiento</h4>
          </div>
          <p className="text-sm text-emerald-800 mb-2">
            Las plantillas de <strong>Mediterránea</strong> tienen la mayor efectividad promedio (89%)
          </p>
          <p className="text-xs text-emerald-700">
            Considera crear más variantes de este tipo de dieta
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-blue-500 text-white rounded-lg">
              <Activity className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-blue-900">Crecimiento</h4>
          </div>
          <p className="text-sm text-blue-800 mb-2">
            El uso de plantillas ha crecido un <strong>32%</strong> este mes
          </p>
          <p className="text-xs text-blue-700">
            Mantén actualizado tu catálogo con nuevas opciones
          </p>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
        <h3 className="text-sm font-bold text-orange-900 mb-2">💡 Cómo Interpretar los Analytics</h3>
        <ul className="text-sm text-orange-800 space-y-1">
          <li>• La efectividad mide el % de clientes que completan la plantilla con éxito</li>
          <li>• Los usos indican cuántas veces se ha asignado una plantilla</li>
          <li>• Las tendencias mensuales te ayudan a identificar patrones estacionales</li>
          <li>• Las categorías más efectivas merecen más atención en tu catálogo</li>
        </ul>
      </div>
    </div>
  );
}

