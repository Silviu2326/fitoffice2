import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity, AlertCircle } from 'lucide-react';
import { getTendencias } from '../api/checkins';

interface Tendencia {
  cliente_id: string;
  cliente_nombre: string;
  peso_inicial: number;
  peso_actual: number;
  cambio_peso: number;
  hambre_promedio: number;
  saciedad_promedio: number;
  tendencia_peso: 'subiendo' | 'bajando' | 'estable';
  alertas: string[];
}

export default function AnalizadorTendencias() {
  const [tendencias, setTendencias] = useState<Tendencia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTendencias();
  }, []);

  const loadTendencias = async () => {
    setLoading(true);
    try {
      const data = await getTendencias();
      setTendencias(data);
    } catch (error) {
      console.error('Error al cargar tendencias:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTendenciaIcon = (tendencia: 'subiendo' | 'bajando' | 'estable') => {
    switch (tendencia) {
      case 'subiendo':
        return <TrendingUp className="w-5 h-5 text-red-600" />;
      case 'bajando':
        return <TrendingDown className="w-5 h-5 text-green-600" />;
      case 'estable':
        return <Activity className="w-5 h-5 text-blue-600" />;
    }
  };

  const getTendenciaColor = (tendencia: 'subiendo' | 'bajando' | 'estable') => {
    switch (tendencia) {
      case 'subiendo':
        return 'bg-red-100 text-red-800';
      case 'bajando':
        return 'bg-green-100 text-green-800';
      case 'estable':
        return 'bg-blue-100 text-blue-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Analizador de Tendencias</h2>
        <p className="text-slate-600 mt-1">Identificación de patrones y comportamientos nutricionales</p>
      </div>

      {/* Resumen de tendencias */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Perdiendo Peso</p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                {tendencias.filter(t => t.tendencia_peso === 'bajando').length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingDown className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Peso Estable</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">
                {tendencias.filter(t => t.tendencia_peso === 'estable').length}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Ganando Peso</p>
              <p className="text-3xl font-bold text-red-600 mt-1">
                {tendencias.filter(t => t.tendencia_peso === 'subiendo').length}
              </p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Lista detallada de tendencias */}
      <div className="space-y-4">
        {tendencias.map((tendencia) => (
          <div
            key={tendencia.cliente_id}
            className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-lg text-white">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{tendencia.cliente_nombre}</h3>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getTendenciaColor(tendencia.tendencia_peso)}`}>
                    {getTendenciaIcon(tendencia.tendencia_peso)}
                    {tendencia.tendencia_peso === 'subiendo' && 'Peso en aumento'}
                    {tendencia.tendencia_peso === 'bajando' && 'Peso en descenso'}
                    {tendencia.tendencia_peso === 'estable' && 'Peso estable'}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${
                  tendencia.cambio_peso > 0 ? 'text-red-600' : tendencia.cambio_peso < 0 ? 'text-green-600' : 'text-slate-900'
                }`}>
                  {tendencia.cambio_peso > 0 ? '+' : ''}{tendencia.cambio_peso.toFixed(1)} kg
                </div>
                <div className="text-sm text-slate-500">Cambio total</div>
              </div>
            </div>

            {/* Métricas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-sm text-slate-600 mb-1">Peso Inicial</p>
                <p className="text-xl font-bold text-slate-900">{tendencia.peso_inicial} kg</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-sm text-slate-600 mb-1">Peso Actual</p>
                <p className="text-xl font-bold text-slate-900">{tendencia.peso_actual} kg</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-sm text-slate-600 mb-1">Hambre Promedio</p>
                <p className="text-xl font-bold text-slate-900">{tendencia.hambre_promedio.toFixed(1)}/10</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-sm text-slate-600 mb-1">Saciedad Promedio</p>
                <p className="text-xl font-bold text-slate-900">{tendencia.saciedad_promedio.toFixed(1)}/10</p>
              </div>
            </div>

            {/* Alertas */}
            {tendencia.alertas.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-amber-900 mb-2">Alertas detectadas:</h4>
                    <ul className="space-y-1">
                      {tendencia.alertas.map((alerta, index) => (
                        <li key={index} className="text-sm text-amber-800">• {alerta}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {tendencias.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
            <Activity className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">No hay tendencias para analizar</p>
            <p className="text-sm text-slate-500 mt-1">Necesitas más check-ins para generar análisis</p>
          </div>
        )}
      </div>

      {/* Guía de interpretación */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">🔍 Patrones Clave a Identificar</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-purple-900 mb-3">Señales Positivas</h4>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Pérdida de peso gradual y sostenida (0.5-1kg/semana)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Hambre y saciedad en rangos normales (5-7)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Consistencia en los check-ins diarios</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Sin fluctuaciones extremas de peso</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-red-900 mb-3">Señales de Alerta</h4>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">⚠</span>
                <span>Pérdida de peso muy rápida (&gt;2kg/semana)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">⚠</span>
                <span>Hambre extrema constante (8-10)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">⚠</span>
                <span>Baja saciedad después de comer (1-3)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">⚠</span>
                <span>Irregularidad en check-ins (adherencia baja)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

