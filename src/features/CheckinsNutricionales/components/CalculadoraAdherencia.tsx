import { useState, useEffect } from 'react';
import { TrendingUp, Users, CheckCircle, XCircle, Award } from 'lucide-react';
import { getAdherencia } from '../api/checkins';

interface AdherenciaCliente {
  cliente_id: string;
  cliente_nombre: string;
  checkins_realizados: number;
  checkins_esperados: number;
  porcentaje_adherencia: number;
  ultima_fecha: string;
}

export default function CalculadoraAdherencia() {
  const [adherencias, setAdherencias] = useState<AdherenciaCliente[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAdherencia();
  }, []);

  const loadAdherencia = async () => {
    setLoading(true);
    try {
      const data = await getAdherencia();
      setAdherencias(data);
    } catch (error) {
      console.error('Error al cargar adherencia:', error);
    } finally {
      setLoading(false);
    }
  };

  const getColorAdherencia = (porcentaje: number) => {
    if (porcentaje >= 80) return 'text-green-600 bg-green-100';
    if (porcentaje >= 60) return 'text-amber-600 bg-amber-100';
    return 'text-red-600 bg-red-100';
  };

  const getEstadoAdherencia = (porcentaje: number) => {
    if (porcentaje >= 80) return { texto: 'Excelente', icono: CheckCircle, color: 'text-green-600' };
    if (porcentaje >= 60) return { texto: 'Moderada', icono: Award, color: 'text-amber-600' };
    return { texto: 'Baja', icono: XCircle, color: 'text-red-600' };
  };

  const promedioGeneral = adherencias.length > 0
    ? adherencias.reduce((acc, a) => acc + a.porcentaje_adherencia, 0) / adherencias.length
    : 0;

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
        <h2 className="text-2xl font-bold text-slate-900">Calculadora de Adherencia</h2>
        <p className="text-slate-600 mt-1">Cálculo del cumplimiento del plan nutricional</p>
      </div>

      {/* Estadísticas generales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Adherencia Promedio</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{promedioGeneral.toFixed(0)}%</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Clientes Activos</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{adherencias.length}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Alta Adherencia</p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                {adherencias.filter(a => a.porcentaje_adherencia >= 80).length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Necesitan Apoyo</p>
              <p className="text-3xl font-bold text-red-600 mt-1">
                {adherencias.filter(a => a.porcentaje_adherencia < 60).length}
              </p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Lista de clientes */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Adherencia por Cliente</h3>
        </div>
        <div className="divide-y divide-slate-200">
          {adherencias.map((adherencia) => {
            const estado = getEstadoAdherencia(adherencia.porcentaje_adherencia);
            const IconoEstado = estado.icono;
            
            return (
              <div key={adherencia.cliente_id} className="p-6 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${getColorAdherencia(adherencia.porcentaje_adherencia)}`}>
                      <IconoEstado className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{adherencia.cliente_nombre}</h4>
                      <p className="text-sm text-slate-600">
                        Última actividad: {adherencia.ultima_fecha}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-bold ${estado.color}`}>
                      {adherencia.porcentaje_adherencia.toFixed(0)}%
                    </div>
                    <div className="text-sm text-slate-500">{estado.texto}</div>
                  </div>
                </div>

                {/* Barra de progreso */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Check-ins: {adherencia.checkins_realizados} / {adherencia.checkins_esperados}</span>
                    <span>{adherencia.porcentaje_adherencia.toFixed(1)}%</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        adherencia.porcentaje_adherencia >= 80
                          ? 'bg-green-500'
                          : adherencia.porcentaje_adherencia >= 60
                          ? 'bg-amber-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(adherencia.porcentaje_adherencia, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}

          {adherencias.length === 0 && (
            <div className="text-center py-12">
              <TrendingUp className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600">No hay datos de adherencia</p>
              <p className="text-sm text-slate-500 mt-1">Los datos aparecerán cuando haya check-ins registrados</p>
            </div>
          )}
        </div>
      </div>

      {/* Guía de adherencia */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">📈 Interpretación de la Adherencia</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h4 className="font-semibold text-green-900">80-100% Excelente</h4>
            </div>
            <p className="text-sm text-slate-600">
              Cliente comprometido, cumple con su plan nutricional de forma consistente. Mantener el plan actual.
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-amber-600" />
              <h4 className="font-semibold text-amber-900">60-79% Moderada</h4>
            </div>
            <p className="text-sm text-slate-600">
              Adherencia aceptable pero mejorable. Revisar obstáculos y proporcionar apoyo adicional.
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="w-5 h-5 text-red-600" />
              <h4 className="font-semibold text-red-900">0-59% Baja</h4>
            </div>
            <p className="text-sm text-slate-600">
              Requiere atención inmediata. Identificar problemas, ajustar estrategia y aumentar seguimiento.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

