import { TrendingUp, Users, Calendar, DollarSign, BarChart3, PieChart } from 'lucide-react';

export default function AnalyticsReservas() {
  // Datos de ejemplo
  const analytics = {
    tasaOcupacion: 85,
    reservasMes: 156,
    tasaCancelacion: 8,
    ingresosMes: 6240,
    crecimientoMes: 12,
    horasMasPopulares: [
      { hora: '18:00 - 19:00', reservas: 45, porcentaje: 28 },
      { hora: '07:00 - 08:00', reservas: 38, porcentaje: 24 },
      { hora: '19:00 - 20:00', reservas: 32, porcentaje: 20 },
      { hora: '12:00 - 13:00', reservas: 25, porcentaje: 16 },
      { hora: '10:00 - 11:00', reservas: 16, porcentaje: 10 },
    ],
    serviciosMasReservados: [
      { servicio: 'Spinning', reservas: 45, porcentaje: 29 },
      { servicio: 'HIIT', reservas: 38, porcentaje: 24 },
      { servicio: 'Evaluación Inicial', reservas: 28, porcentaje: 18 },
      { servicio: 'Seguimiento', reservas: 25, porcentaje: 16 },
      { servicio: 'Boxeo', reservas: 20, porcentaje: 13 },
    ],
    diasSemana: [
      { dia: 'Lun', reservas: 28 },
      { dia: 'Mar', reservas: 32 },
      { dia: 'Mié', reservas: 35 },
      { dia: 'Jue', reservas: 30 },
      { dia: 'Vie', reservas: 18 },
      { dia: 'Sáb', reservas: 8 },
      { dia: 'Dom', reservas: 5 },
    ],
  };

  const maxReservasDia = Math.max(...analytics.diasSemana.map(d => d.reservas));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl">
          <BarChart3 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Analytics de Reservas</h2>
          <p className="text-slate-600">Métricas de ocupación y rendimiento</p>
        </div>
      </div>

      {/* KPIs Principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-600 text-sm font-medium">Tasa de Ocupación</p>
            <div className="bg-blue-100 p-2 rounded-lg">
              <Calendar className="w-4 h-4 text-blue-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-800">{analytics.tasaOcupacion}%</p>
          <div className="mt-3 bg-slate-100 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${analytics.tasaOcupacion}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-600 text-sm font-medium">Reservas Mes</p>
            <div className="bg-green-100 p-2 rounded-lg">
              <Users className="w-4 h-4 text-green-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-800">{analytics.reservasMes}</p>
          <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
            <TrendingUp className="w-4 h-4" />
            <span>+{analytics.crecimientoMes}% vs mes anterior</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-600 text-sm font-medium">Tasa Cancelación</p>
            <div className="bg-orange-100 p-2 rounded-lg">
              <TrendingUp className="w-4 h-4 text-orange-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-800">{analytics.tasaCancelacion}%</p>
          <p className="text-xs text-slate-500 mt-2">Objetivo: {'<'} 10%</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-600 text-sm font-medium">Ingresos Mes</p>
            <div className="bg-purple-100 p-2 rounded-lg">
              <DollarSign className="w-4 h-4 text-purple-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-800">€{analytics.ingresosMes.toLocaleString()}</p>
          <p className="text-xs text-slate-500 mt-2">Promedio: €{Math.round(analytics.ingresosMes / analytics.reservasMes)}/reserva</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribución por Día de Semana */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-2 rounded-lg">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Reservas por Día de Semana</h3>
          </div>
          <div className="space-y-4">
            {analytics.diasSemana.map((dia) => (
              <div key={dia.dia}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">{dia.dia}</span>
                  <span className="text-sm font-semibold text-slate-800">{dia.reservas}</span>
                </div>
                <div className="bg-slate-100 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-3 rounded-full transition-all"
                    style={{ width: `${(dia.reservas / maxReservasDia) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Horarios Más Populares */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Horarios Más Populares</h3>
          </div>
          <div className="space-y-4">
            {analytics.horasMasPopulares.map((hora, index) => (
              <div key={hora.hora}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">{hora.hora}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-600">{hora.reservas} reservas</span>
                    <span className="text-xs font-semibold text-purple-600">({hora.porcentaje}%)</span>
                  </div>
                </div>
                <div className="bg-slate-100 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all ${
                      index === 0 ? 'bg-purple-600' : 
                      index === 1 ? 'bg-purple-500' : 
                      index === 2 ? 'bg-purple-400' : 'bg-purple-300'
                    }`}
                    style={{ width: `${hora.porcentaje}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Servicios Más Reservados */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-green-100 p-2 rounded-lg">
            <PieChart className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">Servicios Más Reservados</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {analytics.serviciosMasReservados.map((servicio, index) => (
            <div key={servicio.servicio} className="text-center">
              <div className="relative inline-flex">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-slate-200"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${servicio.porcentaje * 2.51}, 251`}
                    className={
                      index === 0 ? 'text-green-500' :
                      index === 1 ? 'text-blue-500' :
                      index === 2 ? 'text-purple-500' :
                      index === 3 ? 'text-orange-500' : 'text-pink-500'
                    }
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-slate-800">{servicio.porcentaje}%</span>
                </div>
              </div>
              <p className="mt-2 text-sm font-medium text-slate-700">{servicio.servicio}</p>
              <p className="text-xs text-slate-500">{servicio.reservas} reservas</p>
            </div>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-start gap-4">
          <div className="bg-blue-500 p-3 rounded-lg">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">Insights y Recomendaciones</h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>El horario de <strong>18:00-19:00</strong> es el más demandado. Considera añadir más clases en este horario.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>La ocupación de <strong>fines de semana es baja</strong> (35%). Promociones especiales podrían aumentar la demanda.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Tasa de cancelación del <strong>{analytics.tasaCancelacion}%</strong> está dentro del objetivo. Mantén las políticas actuales.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span><strong>Spinning y HIIT</strong> son los servicios más populares. Considera ampliar la oferta de clases similares.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

