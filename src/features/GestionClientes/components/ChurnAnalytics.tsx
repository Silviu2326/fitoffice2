import { TrendingDown, Users, DollarSign, Calendar, AlertTriangle, TrendingUp } from 'lucide-react';

export default function ChurnAnalytics() {
  const metricas = {
    churnRate: 8.5,
    clientesPerdidosMes: 12,
    valorPerdidoMes: 2400,
    tasaRetencion: 91.5,
    tiempoVidaPromedio: 18,
    valorTotalVida: 3200
  };

  const motivosBaja = [
    { motivo: 'Problemas económicos', cantidad: 35, porcentaje: 40 },
    { motivo: 'Falta de tiempo', cantidad: 25, porcentaje: 29 },
    { motivo: 'Mudanza', cantidad: 15, porcentaje: 17 },
    { motivo: 'Insatisfacción', cantidad: 8, porcentaje: 9 },
    { motivo: 'Otros', cantidad: 4, porcentaje: 5 }
  ];

  const tendenciaMensual = [
    { mes: 'May', churn: 7.2, nuevos: 25, bajas: 10 },
    { mes: 'Jun', churn: 6.8, nuevos: 30, bajas: 9 },
    { mes: 'Jul', churn: 8.1, nuevos: 22, bajas: 11 },
    { mes: 'Ago', churn: 9.5, nuevos: 18, bajas: 14 },
    { mes: 'Sep', churn: 7.8, nuevos: 28, bajas: 10 },
    { mes: 'Oct', churn: 8.5, nuevos: 24, bajas: 12 }
  ];

  const segmentosRiesgo = [
    { segmento: 'Menos de 3 meses', clientes: 45, riesgo: 25, porcentaje: 56 },
    { segmento: '3-6 meses', clientes: 38, riesgo: 12, porcentaje: 32 },
    { segmento: '6-12 meses', clientes: 52, riesgo: 8, porcentaje: 15 },
    { segmento: 'Más de 1 año', clientes: 120, riesgo: 10, porcentaje: 8 }
  ];

  return (
    <div className="space-y-6">
      {/* Métricas principales */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <TrendingDown className="w-7 h-7 text-red-600" />
          Analytics de Churn y Retención
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-red-600 p-2 rounded-lg">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Churn Rate</p>
                <p className="text-3xl font-bold text-red-900">{metricas.churnRate}%</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 mt-2">Tasa de abandono mensual</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-emerald-600 p-2 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Tasa de Retención</p>
                <p className="text-3xl font-bold text-emerald-900">{metricas.tasaRetencion}%</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 mt-2">Clientes que permanecen activos</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Tiempo de Vida</p>
                <p className="text-3xl font-bold text-blue-900">{metricas.tiempoVidaPromedio}</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 mt-2">Meses promedio como cliente</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-purple-600 p-2 rounded-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Valor Total de Vida</p>
                <p className="text-3xl font-bold text-purple-900">€{metricas.valorTotalVida}</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 mt-2">Lifetime Value promedio</p>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-amber-600 p-2 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Clientes Perdidos</p>
                <p className="text-3xl font-bold text-amber-900">{metricas.clientesPerdidosMes}</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 mt-2">Este mes</p>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-red-600 p-2 rounded-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Valor Perdido</p>
                <p className="text-3xl font-bold text-red-900">€{metricas.valorPerdidoMes}</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 mt-2">Ingreso perdido este mes</p>
          </div>
        </div>
      </div>

      {/* Análisis de motivos de baja */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Análisis de Motivos de Baja</h3>
        <div className="space-y-4">
          {motivosBaja.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">{item.motivo}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-600">{item.cantidad} clientes</span>
                  <span className="text-sm font-bold text-slate-900">{item.porcentaje}%</span>
                </div>
              </div>
              <div className="bg-slate-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${
                    item.porcentaje >= 30 ? 'bg-red-600' :
                    item.porcentaje >= 15 ? 'bg-amber-500' :
                    'bg-blue-500'
                  }`}
                  style={{ width: `${item.porcentaje}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tendencia mensual */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Tendencia Mensual de Churn</h3>
        <div className="space-y-4">
          {tendenciaMensual.map((mes, index) => (
            <div key={index} className="p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-semibold text-slate-900">{mes.mes} 2025</h4>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                  mes.churn < 7 ? 'bg-emerald-100 text-emerald-800' :
                  mes.churn < 9 ? 'bg-amber-100 text-amber-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  Churn: {mes.churn}%
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded border border-slate-200">
                  <p className="text-xs text-slate-500">Nuevos Clientes</p>
                  <p className="text-xl font-bold text-emerald-600">{mes.nuevos}</p>
                </div>
                <div className="bg-white p-3 rounded border border-slate-200">
                  <p className="text-xs text-slate-500">Bajas</p>
                  <p className="text-xl font-bold text-red-600">{mes.bajas}</p>
                </div>
                <div className="bg-white p-3 rounded border border-slate-200">
                  <p className="text-xs text-slate-500">Balance</p>
                  <p className={`text-xl font-bold ${
                    mes.nuevos - mes.bajas > 0 ? 'text-emerald-600' : 'text-red-600'
                  }`}>
                    {mes.nuevos - mes.bajas > 0 ? '+' : ''}{mes.nuevos - mes.bajas}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Análisis de segmentos de riesgo */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-amber-600" />
          Análisis de Riesgo por Segmento
        </h3>
        <div className="space-y-4">
          {segmentosRiesgo.map((segmento, index) => (
            <div key={index} className="p-5 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-semibold text-slate-900">{segmento.segmento}</h4>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-slate-600">{segmento.clientes} clientes totales</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    segmento.porcentaje >= 40 ? 'bg-red-100 text-red-800' :
                    segmento.porcentaje >= 20 ? 'bg-amber-100 text-amber-800' :
                    'bg-emerald-100 text-emerald-800'
                  }`}>
                    {segmento.porcentaje}% riesgo
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-600 mb-2">Clientes en Riesgo</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-slate-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${
                          segmento.porcentaje >= 40 ? 'bg-red-600' :
                          segmento.porcentaje >= 20 ? 'bg-amber-500' :
                          'bg-emerald-500'
                        }`}
                        style={{ width: `${(segmento.riesgo / segmento.clientes) * 100}%` }}
                      />
                    </div>
                    <span className="text-lg font-bold text-slate-900">{segmento.riesgo}</span>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-xs text-slate-500">Tasa de Retención</p>
                    <p className="text-2xl font-bold text-emerald-600">{100 - segmento.porcentaje}%</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recomendaciones */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-blue-600" />
          Recomendaciones para Reducir Churn
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
            <div className="bg-blue-600 p-2 rounded-lg mt-0.5">
              <span className="text-white font-bold text-sm">1</span>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">Programa de Onboarding Mejorado</h4>
              <p className="text-sm text-slate-600 mt-1">El 56% de riesgo en clientes nuevos indica necesidad de mejor integración inicial</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
            <div className="bg-blue-600 p-2 rounded-lg mt-0.5">
              <span className="text-white font-bold text-sm">2</span>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">Facilidades de Pago</h4>
              <p className="text-sm text-slate-600 mt-1">40% de bajas por problemas económicos - considerar planes flexibles y promociones</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
            <div className="bg-blue-600 p-2 rounded-lg mt-0.5">
              <span className="text-white font-bold text-sm">3</span>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">Flexibilidad Horaria</h4>
              <p className="text-sm text-slate-600 mt-1">29% por falta de tiempo - ofrecer horarios más amplios y sesiones online</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

