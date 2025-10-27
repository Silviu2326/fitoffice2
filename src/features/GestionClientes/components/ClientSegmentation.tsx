import { useState } from 'react';
import { Filter, Users, Plus, Search, Save } from 'lucide-react';

interface Segmento {
  id: string;
  nombre: string;
  descripcion: string;
  criterios: string[];
  numeroClientes: number;
  fechaCreacion: string;
  activo: boolean;
}

export default function ClientSegmentation() {
  const [segmentos] = useState<Segmento[]>([
    {
      id: '1',
      nombre: 'Clientes Premium Activos',
      descripcion: 'Clientes con plan premium y alta adherencia',
      criterios: ['Plan Premium', 'Adherencia > 80%', 'Activo más de 6 meses'],
      numeroClientes: 45,
      fechaCreacion: '2025-10-01',
      activo: true
    },
    {
      id: '2',
      nombre: 'Riesgo de Abandono',
      descripcion: 'Clientes con señales de baja inminente',
      criterios: ['Adherencia < 50%', 'Inactivo > 10 días', 'Cancelaciones recientes'],
      numeroClientes: 18,
      fechaCreacion: '2025-09-15',
      activo: true
    },
    {
      id: '3',
      nombre: 'Nuevos Clientes (< 3 meses)',
      descripcion: 'Clientes en fase de onboarding',
      criterios: ['Cliente desde < 3 meses', 'En fase de adaptación'],
      numeroClientes: 32,
      fechaCreacion: '2025-09-01',
      activo: true
    },
    {
      id: '4',
      nombre: 'Clientes Veteranos',
      descripcion: 'Leales con más de 1 año',
      criterios: ['Cliente desde > 12 meses', 'Adherencia promedio > 70%'],
      numeroClientes: 87,
      fechaCreacion: '2025-08-20',
      activo: true
    },
    {
      id: '5',
      nombre: 'Recuperación Potencial',
      descripcion: 'Clientes perdidos recuperables',
      criterios: ['Estado: Perdido', 'Posibilidad retorno: Alta', 'Baja < 6 meses'],
      numeroClientes: 12,
      fechaCreacion: '2025-10-10',
      activo: true
    }
  ]);

  const [criteriosDisponibles] = useState([
    { categoria: 'Estado', opciones: ['Activo', 'En Riesgo', 'Perdido'] },
    { categoria: 'Plan', opciones: ['Plan Premium', 'Plan Estándar', 'Plan Básico'] },
    { categoria: 'Adherencia', opciones: ['> 80%', '50-80%', '< 50%'] },
    { categoria: 'Tiempo como Cliente', opciones: ['< 3 meses', '3-6 meses', '6-12 meses', '> 12 meses'] },
    { categoria: 'Actividad', opciones: ['Activo última semana', 'Inactivo > 7 días', 'Inactivo > 15 días'] },
    { categoria: 'Facturación', opciones: ['Pagos al día', 'Pago pendiente', 'Retrasos frecuentes'] }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showNewSegmentForm, setShowNewSegmentForm] = useState(false);

  const filteredSegmentos = segmentos.filter(seg =>
    seg.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    seg.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalClientes = segmentos.reduce((sum, seg) => sum + seg.numeroClientes, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      {/* Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Filter className="w-7 h-7 text-blue-600" />
              Segmentación de Clientes
            </h2>
            <p className="text-slate-600 mt-1">Segmentación automática de clientes para campañas y análisis</p>
          </div>
          <button
            onClick={() => setShowNewSegmentForm(!showNewSegmentForm)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Nuevo Segmento
          </button>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Filter className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Segmentos Activos</p>
                <p className="text-xl font-bold text-slate-900">{segmentos.filter(s => s.activo).length}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="bg-purple-600 p-2 rounded-lg">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Clientes Segmentados</p>
                <p className="text-xl font-bold text-slate-900">{totalClientes}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-600 p-2 rounded-lg">
                <Save className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Total Segmentos</p>
                <p className="text-xl font-bold text-slate-900">{segmentos.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Buscador */}
        <div className="mt-6 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar segmentos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Formulario nuevo segmento */}
      {showNewSegmentForm && (
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Crear Nuevo Segmento</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Nombre del Segmento</label>
              <input
                type="text"
                placeholder="Ej: Clientes Premium Activos"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Descripción</label>
              <textarea
                placeholder="Describe el propósito de este segmento..."
                rows={2}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">Criterios de Segmentación</label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {criteriosDisponibles.map((grupo, index) => (
                  <div key={index} className="bg-white p-3 rounded-lg border border-slate-200">
                    <h4 className="text-xs font-semibold text-slate-700 mb-2">{grupo.categoria}</h4>
                    <div className="space-y-2">
                      {grupo.opciones.map((opcion, idx) => (
                        <label key={idx} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                          />
                          <span className="text-sm text-slate-600">{opcion}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium">
                Crear Segmento
              </button>
              <button
                onClick={() => setShowNewSegmentForm(false)}
                className="px-6 py-2 bg-slate-300 text-slate-700 rounded-lg hover:bg-slate-400 transition-colors font-medium"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lista de segmentos */}
      <div className="p-6">
        <div className="space-y-4">
          {filteredSegmentos.map((segmento) => (
            <div
              key={segmento.id}
              className="p-5 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-slate-900">{segmento.nombre}</h3>
                    {segmento.activo && (
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-full text-xs font-medium">
                        ACTIVO
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600">{segmento.descripcion}</p>
                </div>
                <div className="bg-blue-100 text-blue-900 px-4 py-2 rounded-lg border border-blue-200">
                  <p className="text-xs text-blue-700">Clientes</p>
                  <p className="text-2xl font-bold">{segmento.numeroClientes}</p>
                </div>
              </div>

              {/* Criterios */}
              <div className="mb-4">
                <p className="text-sm font-semibold text-slate-700 mb-2">Criterios aplicados:</p>
                <div className="flex flex-wrap gap-2">
                  {segmento.criterios.map((criterio, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 border border-blue-200 rounded-full text-xs font-medium"
                    >
                      {criterio}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metadata */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                <span className="text-xs text-slate-500">
                  Creado: {new Date(segmento.fechaCreacion).toLocaleDateString('es-ES')}
                </span>
                <div className="flex gap-2">
                  <button className="px-4 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium">
                    Ver Clientes
                  </button>
                  <button className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    Exportar
                  </button>
                  <button className="px-4 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                    Campaña
                  </button>
                  <button className="px-4 py-1.5 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors text-sm font-medium">
                    Editar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Panel de ayuda */}
      <div className="p-6 bg-blue-50 border-t border-blue-200">
        <h3 className="text-sm font-semibold text-slate-900 mb-2">💡 Casos de uso de segmentación</h3>
        <ul className="text-sm text-slate-700 space-y-1">
          <li>• <strong>Campañas dirigidas:</strong> Envía mensajes personalizados a segmentos específicos</li>
          <li>• <strong>Análisis de comportamiento:</strong> Identifica patrones en diferentes grupos de clientes</li>
          <li>• <strong>Retención proactiva:</strong> Crea alertas automáticas para segmentos de riesgo</li>
          <li>• <strong>Ofertas personalizadas:</strong> Diseña promociones específicas por segmento</li>
        </ul>
      </div>
    </div>
  );
}

