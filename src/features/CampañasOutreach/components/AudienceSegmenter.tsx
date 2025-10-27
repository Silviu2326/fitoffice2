import { useState } from 'react';
import { Users, Filter, Plus } from 'lucide-react';

interface Segment {
  id: string;
  name: string;
  description: string;
  count: number;
  criteria: string[];
  lastUpdated: string;
}

export default function AudienceSegmenter() {
  const [segments] = useState<Segment[]>([
    {
      id: '1',
      name: 'Leads Calientes',
      description: 'Leads con alta probabilidad de conversión',
      count: 234,
      criteria: ['Visitó más de 3 veces', 'Descargó contenido', 'Abrió emails'],
      lastUpdated: '2025-10-25'
    },
    {
      id: '2',
      name: 'Socios Activos Premium',
      description: 'Socios con alta actividad y plan premium',
      count: 156,
      criteria: ['Plan Premium', 'Asistencia >80%', 'Antigüedad >6 meses'],
      lastUpdated: '2025-10-26'
    },
    {
      id: '3',
      name: 'Riesgo de Baja',
      description: 'Socios con señales de cancelación',
      count: 89,
      criteria: ['Asistencia <20%', 'No abre emails', 'Sin check-ins 30+ días'],
      lastUpdated: '2025-10-24'
    },
    {
      id: '4',
      name: 'Inactivos para Reactivar',
      description: 'Ex-socios o leads fríos para reactivación',
      count: 312,
      criteria: ['Sin actividad >60 días', 'Ex-socio', 'Lead frío'],
      lastUpdated: '2025-10-23'
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] p-3 rounded-xl shadow-md">
            <Filter className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#0F172A]">Segmentación de Audiencias</h2>
            <p className="text-[#64748B]">Clasifica contactos por comportamiento y perfil</p>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-[#6366F1] text-white px-6 py-3 rounded-lg hover:bg-[#4F46E5] transition-all duration-200 shadow-md hover:shadow-lg font-semibold">
          <Plus className="w-5 h-5" />
          Nuevo Segmento
        </button>
      </div>

      {/* Total Audience */}
      <div className="bg-[#EEF2FF] border border-[#6366F1]/20 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Users className="w-12 h-12 text-[#6366F1]" />
            <div>
              <h3 className="text-lg font-semibold text-[#0F172A]">Audiencia Total</h3>
              <p className="text-sm text-[#64748B]">Contactos en tu base de datos</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-[#0F172A]">791</div>
            <div className="text-sm text-[#64748B]">contactos únicos</div>
          </div>
        </div>
      </div>

      {/* Segments Grid */}
      <div className="grid gap-4">
        {segments.map((segment) => (
          <div
            key={segment.id}
            className="bg-white rounded-xl p-6 border border-[#E2E8F0] hover:border-[#6366F1] transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#0F172A] mb-2">{segment.name}</h3>
                <p className="text-[#64748B] text-sm mb-3">{segment.description}</p>
                <div className="flex flex-wrap gap-2">
                  {segment.criteria.map((criterion, index) => (
                    <span
                      key={index}
                      className="bg-[#F1F5F9] text-[#64748B] text-xs px-3 py-1.5 rounded-full font-medium"
                    >
                      {criterion}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right ml-4">
                <div className="text-3xl font-bold text-[#6366F1]">{segment.count}</div>
                <div className="text-sm text-[#64748B]">contactos</div>
              </div>
            </div>
            <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-sm">
              <span className="text-[#94A3B8]">
                Actualizado: {new Date(segment.lastUpdated).toLocaleDateString('es-ES')}
              </span>
              <div className="flex gap-2">
                <button className="text-[#6366F1] hover:text-[#4F46E5] transition-colors font-medium">
                  Editar
                </button>
                <button className="text-[#6366F1] hover:text-[#4F46E5] transition-colors font-medium">
                  Crear Campaña
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-[#0F172A] mb-3">
          Segmentación Avanzada
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="text-[#0F172A] font-semibold mb-2">Criterios Disponibles:</h4>
            <ul className="space-y-1 text-[#64748B]">
              <li>• Comportamiento (asistencia, check-ins)</li>
              <li>• Demografía (edad, ubicación)</li>
              <li>• Tipo de plan y antigüedad</li>
              <li>• Interacciones con campañas</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[#0F172A] font-semibold mb-2">Actualizaciones:</h4>
            <ul className="space-y-1 text-[#64748B]">
              <li>• Los segmentos se actualizan en tiempo real</li>
              <li>• Historial de cambios disponible</li>
              <li>• Exportación a CSV/Excel</li>
              <li>• Integración con campañas</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
