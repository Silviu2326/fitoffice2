import { useState } from 'react';
import { TrendingUp, TrendingDown, Copy, Target, Award, Users } from 'lucide-react';

interface PlantillaMetrica {
  id: string;
  nombre: string;
  usos: number;
  efectividad: number;
  tasaFinalizacion: number;
  satisfaccion: number;
  tendencia: 'up' | 'down' | 'neutral';
}

export default function AnalyticsPlantillas() {
  const [plantillas] = useState<PlantillaMetrica[]>([
    {
      id: '1',
      nombre: 'Full Body 3 Días',
      usos: 67,
      efectividad: 90,
      tasaFinalizacion: 89,
      satisfaccion: 4.7,
      tendencia: 'up'
    },
    {
      id: '2',
      nombre: 'Hipertrofia 12 Semanas',
      usos: 45,
      efectividad: 92,
      tasaFinalizacion: 78,
      satisfaccion: 4.8,
      tendencia: 'up'
    },
    {
      id: '3',
      nombre: 'Pierna 2x/Semana',
      usos: 32,
      efectividad: 88,
      tasaFinalizacion: 85,
      satisfaccion: 4.6,
      tendencia: 'neutral'
    },
    {
      id: '4',
      nombre: 'Cardio HIIT Intensivo',
      usos: 28,
      efectividad: 85,
      tasaFinalizacion: 72,
      satisfaccion: 4.3,
      tendencia: 'down'
    },
    {
      id: '5',
      nombre: 'Movilidad y Flexibilidad',
      usos: 19,
      efectividad: 82,
      tasaFinalizacion: 91,
      satisfaccion: 4.5,
      tendencia: 'up'
    }
  ]);

  const metricsGenerales = [
    {
      titulo: 'Total de Usos',
      valor: '191',
      cambio: '+23 este mes',
      tendencia: 'up',
      icono: Copy,
      color: 'emerald'
    },
    {
      titulo: 'Efectividad Promedio',
      valor: '87.4%',
      cambio: '+2.3% vs mes anterior',
      tendencia: 'up',
      icono: Target,
      color: 'blue'
    },
    {
      titulo: 'Tasa de Finalización',
      valor: '83%',
      cambio: '+5% este trimestre',
      tendencia: 'up',
      icono: Award,
      color: 'purple'
    },
    {
      titulo: 'Satisfacción Media',
      valor: '4.6/5',
      cambio: '92% de clientes satisfechos',
      tendencia: 'neutral',
      icono: Users,
      color: 'orange'
    }
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#F1F5F9]">Analytics de Plantillas</h2>
        <p className="text-[#94A3B8] text-sm mt-1">
          Métricas de uso y efectividad de tus plantillas
        </p>
      </div>

      {/* Métricas Generales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metricsGenerales.map((metric, index) => {
          const Icono = metric.icono;
          return (
            <div
              key={index}
              className="bg-[#1E1E2E] border border-[#334155] rounded-2xl p-5 hover:border-[#6366F1]/50 transition-all duration-200 shadow-md"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 bg-${metric.color}-500/20 rounded-xl`}>
                  <Icono className={`w-5 h-5 text-${metric.color}-400`} />
                </div>
                <p className="text-[#94A3B8] text-sm font-medium">{metric.titulo}</p>
              </div>
              <p className="text-2xl font-bold text-[#F1F5F9] mb-1">{metric.valor}</p>
              <p className="text-xs text-[#94A3B8]">{metric.cambio}</p>
            </div>
          );
        })}
      </div>

      {/* Tabla de Rendimiento */}
      <div className="bg-[#1E1E2E] border border-[#334155] rounded-2xl overflow-hidden shadow-md">
        <div className="p-4 border-b border-[#334155]">
          <h3 className="text-lg font-semibold text-[#F1F5F9]">Rendimiento por Plantilla</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0F0F23]/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                  Plantilla
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                  Usos
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                  Efectividad
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                  Finalización
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                  Satisfacción
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                  Tendencia
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#334155]">
              {plantillas.map((plantilla) => (
                <tr key={plantilla.id} className="hover:bg-[#2A2A3A]/50 transition-all duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-[#F1F5F9]">{plantilla.nombre}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#F1F5F9] font-medium">{plantilla.usos}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-[#334155] rounded-full h-2">
                        <div
                          className="bg-[#10B981] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${plantilla.efectividad}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-[#F1F5F9] font-semibold">{plantilla.efectividad}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-[#334155] rounded-full h-2">
                        <div
                          className="bg-[#3B82F6] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${plantilla.tasaFinalizacion}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-[#F1F5F9] font-semibold">{plantilla.tasaFinalizacion}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-[#F1F5F9] font-semibold">{plantilla.satisfaccion}</span>
                      <span className="text-xs text-[#94A3B8]">/5</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {plantilla.tendencia === 'up' && (
                      <div className="flex items-center gap-1 text-[#10B981] font-semibold">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-xs">+12%</span>
                      </div>
                    )}
                    {plantilla.tendencia === 'down' && (
                      <div className="flex items-center gap-1 text-[#EF4444] font-semibold">
                        <TrendingDown className="w-4 h-4" />
                        <span className="text-xs">-8%</span>
                      </div>
                    )}
                    {plantilla.tendencia === 'neutral' && (
                      <span className="text-xs text-[#94A3B8]">Sin cambios</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#10B981]/10 border border-[#10B981]/30 rounded-2xl p-5 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-[#10B981]" />
            <h4 className="font-semibold text-[#10B981]">Top Performer</h4>
          </div>
          <p className="text-sm text-[#6EE7B7]">
            "Hipertrofia 12 Semanas" tiene la mayor efectividad (92%) y alta satisfacción (4.8/5)
          </p>
        </div>
        <div className="bg-[#3B82F6]/10 border border-[#3B82F6]/30 rounded-2xl p-5 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-[#3B82F6]" />
            <h4 className="font-semibold text-[#3B82F6]">Mejor Adherencia</h4>
          </div>
          <p className="text-sm text-[#93C5FD]">
            "Movilidad y Flexibilidad" tiene la tasa de finalización más alta (91%)
          </p>
        </div>
      </div>
    </div>
  );
}

