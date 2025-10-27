import { Calendar, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button } from '../../../components/ui';

interface ComparisonData {
  metrica: string;
  periodoAnterior: number;
  periodoActual: number;
  unidad: string;
  cambio: number;
  tendencia: 'up' | 'down';
}

export default function ComparisonTool() {
  const comparaciones: ComparisonData[] = [
    {
      metrica: 'Facturación',
      periodoAnterior: 8500,
      periodoActual: 9800,
      unidad: '€',
      cambio: 15.29,
      tendencia: 'up'
    },
    {
      metrica: 'Clientes Activos',
      periodoAnterior: 42,
      periodoActual: 45,
      unidad: 'clientes',
      cambio: 7.14,
      tendencia: 'up'
    },
    {
      metrica: 'Adherencia',
      periodoAnterior: 85,
      periodoActual: 88,
      unidad: '%',
      cambio: 3.53,
      tendencia: 'up'
    },
    {
      metrica: 'Tasa de Retención',
      periodoAnterior: 90,
      periodoActual: 92,
      unidad: '%',
      cambio: 2.22,
      tendencia: 'up'
    },
    {
      metrica: 'Tasa de Conversión',
      periodoAnterior: 28,
      periodoActual: 32,
      unidad: '%',
      cambio: 14.29,
      tendencia: 'up'
    },
    {
      metrica: 'Ticket Medio',
      periodoAnterior: 202,
      periodoActual: 218,
      unidad: '€',
      cambio: 7.92,
      tendencia: 'up'
    }
  ];

  const getTrendIcon = (tendencia: 'up' | 'down') => {
    return tendencia === 'up' 
      ? <TrendingUp className="w-5 h-5 text-emerald-600" />
      : <TrendingDown className="w-5 h-5 text-red-600" />;
  };

  const getTrendColor = (tendencia: 'up' | 'down') => {
    return tendencia === 'up' ? 'text-emerald-600' : 'text-red-600';
  };

  const getBackgroundColor = (tendencia: 'up' | 'down') => {
    return tendencia === 'up' 
      ? 'bg-gradient-to-br from-emerald-50 to-emerald-100' 
      : 'bg-gradient-to-br from-red-50 to-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Selector de períodos */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Comparación de Períodos</h2>
            <p className="text-slate-600 mt-1">Analiza la evolución de tus métricas</p>
          </div>
          <Calendar className="w-8 h-8 text-emerald-600" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Período Anterior</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Desde</label>
                <input
                  type="date"
                  defaultValue="2025-09-01"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Hasta</label>
                <input
                  type="date"
                  defaultValue="2025-09-30"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Período Actual</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Desde</label>
                <input
                  type="date"
                  defaultValue="2025-10-01"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Hasta</label>
                <input
                  type="date"
                  defaultValue="2025-10-31"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>

        <button className="w-full px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium">
          Comparar Períodos
        </button>
      </div>

      {/* Resultados de la comparación */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Resultados de la Comparación</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comparaciones.map((comp, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl border-2 ${getBackgroundColor(comp.tendencia)} border-slate-200`}
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-slate-900">{comp.metrica}</h4>
                {getTrendIcon(comp.tendencia)}
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="text-center">
                  <p className="text-xs text-slate-600 mb-1">Anterior</p>
                  <p className="text-xl font-bold text-slate-900">
                    {comp.periodoAnterior.toLocaleString('es-ES')}{comp.unidad}
                  </p>
                </div>
                
                <ArrowRight className="w-6 h-6 text-slate-400" />
                
                <div className="text-center">
                  <p className="text-xs text-slate-600 mb-1">Actual</p>
                  <p className="text-xl font-bold text-slate-900">
                    {comp.periodoActual.toLocaleString('es-ES')}{comp.unidad}
                  </p>
                </div>
              </div>

              <div className={`text-center pt-3 border-t-2 ${comp.tendencia === 'up' ? 'border-emerald-200' : 'border-red-200'}`}>
                <p className={`text-2xl font-bold ${getTrendColor(comp.tendencia)}`}>
                  {comp.tendencia === 'up' ? '+' : '-'}{comp.cambio.toFixed(1)}%
                </p>
                <p className="text-xs text-slate-600 mt-1">cambio</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resumen general */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-4">Resumen General</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-xl border border-emerald-200">
            <p className="text-sm text-slate-600 mb-2">Métricas Mejoradas</p>
            <p className="text-4xl font-bold text-emerald-600">6/6</p>
            <p className="text-xs text-slate-600 mt-2">100% de las métricas muestran mejora</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
            <p className="text-sm text-slate-600 mb-2">Crecimiento Promedio</p>
            <p className="text-4xl font-bold text-blue-600">+8.4%</p>
            <p className="text-xs text-slate-600 mt-2">Media de todas las métricas</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
            <p className="text-sm text-slate-600 mb-2">Mejor Rendimiento</p>
            <p className="text-2xl font-bold text-purple-600">Facturación</p>
            <p className="text-xs text-slate-600 mt-2">+15.29% de incremento</p>
          </div>
        </div>
      </div>
    </div>
  );
}

