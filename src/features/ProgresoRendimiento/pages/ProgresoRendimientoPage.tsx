import { useState } from 'react';
import { TrendingUp, Users, Filter } from 'lucide-react';
import ProgresoCliente from '../components/ProgresoCliente';
import GraficosEvolucion from '../components/GraficosEvolucion';
import FotosComparativas from '../components/FotosComparativas';
import MetricasFuerza from '../components/MetricasFuerza';
import HistorialRendimiento from '../components/HistorialRendimiento';
import AnalizadorTendencias from '../components/AnalizadorTendencias';
import AlertasEstancamiento from '../components/AlertasEstancamiento';
import OptimizadorProgreso from '../components/OptimizadorProgreso';

export default function ProgresoRendimientoPage() {
  const [clienteSeleccionado, setClienteSeleccionado] = useState('');
  const [vistaActiva, setVistaActiva] = useState<'resumen' | 'detallado' | 'analisis'>('resumen');

  return (
    <div className="flex-1 overflow-auto bg-slate-900">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-3 rounded-xl">
                  <TrendingUp className="w-8 h-8" />
                </div>
                Progreso & Rendimiento
              </h1>
              <p className="text-slate-400">
                Sistema completo de seguimiento de progreso con evolución de fuerza, métricas de rendimiento y análisis visual
              </p>
            </div>
            <div className="flex gap-3">
              <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors border border-slate-700 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filtros
              </button>
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                <Users className="w-5 h-5" />
                Seleccionar Cliente
              </button>
            </div>
          </div>

          {/* Selector de cliente */}
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <div className="flex items-center gap-4">
              <label className="text-slate-300 font-medium">Cliente:</label>
              <select 
                className="flex-1 bg-slate-900 text-white px-4 py-2 rounded-lg border border-slate-700"
                value={clienteSeleccionado}
                onChange={(e) => setClienteSeleccionado(e.target.value)}
              >
                <option value="">Todos los clientes</option>
                <option value="1">Juan Pérez - Programa de Fuerza</option>
                <option value="2">María García - Hipertrofia</option>
                <option value="3">Carlos López - Rendimiento</option>
                <option value="4">Ana Martínez - Pérdida de Peso</option>
              </select>
            </div>
          </div>

          {/* Tabs de navegación */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setVistaActiva('resumen')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                vistaActiva === 'resumen'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              Resumen
            </button>
            <button
              onClick={() => setVistaActiva('detallado')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                vistaActiva === 'detallado'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              Vista Detallada
            </button>
            <button
              onClick={() => setVistaActiva('analisis')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                vistaActiva === 'analisis'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              Análisis Avanzado
            </button>
          </div>
        </div>

        {/* Vista Resumen */}
        {vistaActiva === 'resumen' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ProgresoCliente clienteId={clienteSeleccionado} />
              <MetricasFuerza />
            </div>
            <GraficosEvolucion />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AlertasEstancamiento />
              <AnalizadorTendencias />
            </div>
          </div>
        )}

        {/* Vista Detallada */}
        {vistaActiva === 'detallado' && (
          <div className="space-y-6">
            <ProgresoCliente clienteId={clienteSeleccionado} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MetricasFuerza />
              <GraficosEvolucion />
            </div>
            <FotosComparativas />
            <HistorialRendimiento />
          </div>
        )}

        {/* Vista Análisis Avanzado */}
        {vistaActiva === 'analisis' && (
          <div className="space-y-6">
            <AnalizadorTendencias />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AlertasEstancamiento />
              <OptimizadorProgreso />
            </div>
            <GraficosEvolucion />
            <HistorialRendimiento />
          </div>
        )}

        {/* Info Footer */}
        <div className="mt-8 bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
          <p className="text-sm text-blue-400">
            <strong>💡 Información:</strong> El seguimiento de progreso y rendimiento es fundamental tanto para entrenadores personales como para gimnasios con programas premium. 
            Para entrenadores, es esencial para todos sus clientes para demostrar valor y optimizar programas. Para gimnasios, es crucial para programas premium y entrenamiento personal interno 
            para justificar precios y mostrar resultados. El sistema proporciona análisis visual, métricas objetivas y tendencias que motivan a los usuarios y demuestran la efectividad de los programas.
          </p>
        </div>
      </div>
    </div>
  );
}

