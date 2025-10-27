import { useState, useEffect } from 'react';
import { Settings, Plus, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { getCustomMetrics, CustomMetric } from '../api/metrics';

export default function KPIConfigurator() {
  const [metricas, setMetricas] = useState<CustomMetric[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    const data = await getCustomMetrics();
    setMetricas(data);
  };

  const getCategoriaColor = (categoria: CustomMetric['categoria']) => {
    switch (categoria) {
      case 'financiero':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'operacional':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'clientes':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'marketing':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Configurador de KPIs</h2>
            <p className="text-slate-600 mt-1">Personaliza tus métricas e indicadores clave</p>
          </div>
          <Settings className="w-8 h-8 text-emerald-600" />
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nueva Métrica Personalizada
        </button>
      </div>

      {/* Formulario de nueva métrica */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Nueva Métrica Personalizada</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Nombre de la Métrica</label>
              <input
                type="text"
                placeholder="Ej: Ticket Medio"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Categoría</label>
              <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                <option value="financiero">Financiero</option>
                <option value="operacional">Operacional</option>
                <option value="clientes">Clientes</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Descripción</label>
              <textarea
                rows={3}
                placeholder="Describe qué mide esta métrica..."
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Fórmula de Cálculo</label>
              <input
                type="text"
                placeholder="Ej: facturacion_total / numero_clientes"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-mono text-sm"
              />
              <p className="text-xs text-slate-500 mt-1">
                Variables disponibles: facturacion_total, numero_clientes, sesiones_realizadas, leads_totales, etc.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Unidad</label>
              <input
                type="text"
                placeholder="€, %, clientes, etc."
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="activo"
                defaultChecked
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
              />
              <label htmlFor="activo" className="text-sm font-medium text-slate-700">
                Métrica activa
              </label>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium">
              Guardar Métrica
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="flex-1 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors font-medium"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Lista de métricas configuradas */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Métricas Configuradas</h3>

        <div className="space-y-4">
          {metricas.map((metrica) => (
            <div
              key={metrica.id}
              className="p-5 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors border border-slate-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-semibold text-slate-900">{metrica.nombre}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoriaColor(metrica.categoria)}`}>
                      {metrica.categoria.toUpperCase()}
                    </span>
                    {metrica.activo ? (
                      <span className="flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-800 rounded text-xs font-medium">
                        <CheckCircle className="w-3 h-3" />
                        ACTIVA
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium">
                        <XCircle className="w-3 h-3" />
                        INACTIVA
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{metrica.descripcion}</p>
                  <div className="bg-white p-3 rounded border border-slate-200">
                    <p className="text-xs text-slate-500 mb-1">Fórmula:</p>
                    <code className="text-sm text-slate-900 font-mono">{metrica.formula}</code>
                    <p className="text-xs text-slate-500 mt-2">Unidad: <span className="font-semibold">{metrica.unidad}</span></p>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {metricas.length === 0 && (
          <div className="text-center py-12">
            <Settings className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600 text-lg">No hay métricas configuradas</p>
            <p className="text-slate-400 text-sm mt-2">Crea tu primera métrica personalizada</p>
          </div>
        )}
      </div>
    </div>
  );
}

