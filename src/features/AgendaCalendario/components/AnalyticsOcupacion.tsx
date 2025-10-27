import { TrendingUp, Users, Clock, DollarSign, BarChart3 } from 'lucide-react';

export default function AnalyticsOcupacion() {
  // Datos de ejemplo
  const metricas = {
    tasaOcupacion: 78,
    citasSemanales: 42,
    horasFacturadas: 56,
    ingresosSemanal: 2840
  };

  const ocupacionPorDia = [
    { dia: 'Lun', ocupacion: 85 },
    { dia: 'Mar', ocupacion: 92 },
    { dia: 'Mié', ocupacion: 78 },
    { dia: 'Jue', ocupacion: 88 },
    { dia: 'Vie', ocupacion: 75 },
    { dia: 'Sáb', ocupacion: 45 },
    { dia: 'Dom', ocupacion: 30 }
  ];

  const franjasMasPopulares = [
    { franja: '09:00 - 11:00', reservas: 45, color: 'bg-[#10B981]' },
    { franja: '11:00 - 13:00', reservas: 38, color: 'bg-[#3B82F6]' },
    { franja: '16:00 - 18:00', reservas: 52, color: 'bg-[#6366F1]' },
    { franja: '18:00 - 20:00', reservas: 48, color: 'bg-[#F59E0B]' }
  ];

  const maxReservas = Math.max(...franjasMasPopulares.map(f => f.reservas));

  return (
    <div className="space-y-6">
      {/* KPIs principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-md">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 text-[#10B981]" />
            <span className="text-[12px] leading-[16px] text-[#10B981] font-semibold bg-[#D1FAE5] px-2 py-1 rounded-md">
              +12%
            </span>
          </div>
          <p className="text-[30px] leading-[38px] font-bold text-[#0F172A] mb-1">{metricas.tasaOcupacion}%</p>
          <p className="text-[14px] leading-[20px] text-[#64748B]">Tasa de Ocupación</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-md">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 text-[#3B82F6]" />
            <span className="text-[12px] leading-[16px] text-[#3B82F6] font-semibold bg-[#DBEAFE] px-2 py-1 rounded-md">
              Esta semana
            </span>
          </div>
          <p className="text-[30px] leading-[38px] font-bold text-[#0F172A] mb-1">{metricas.citasSemanales}</p>
          <p className="text-[14px] leading-[20px] text-[#64748B]">Citas Realizadas</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-md">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-8 h-8 text-[#6366F1]" />
            <span className="text-[12px] leading-[16px] text-[#6366F1] font-semibold bg-[#EEF2FF] px-2 py-1 rounded-md">
              Facturadas
            </span>
          </div>
          <p className="text-[30px] leading-[38px] font-bold text-[#0F172A] mb-1">{metricas.horasFacturadas}h</p>
          <p className="text-[14px] leading-[20px] text-[#64748B]">Horas de Servicio</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-md">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-8 h-8 text-[#F59E0B]" />
            <span className="text-[12px] leading-[16px] text-[#F59E0B] font-semibold bg-[#FEF3C7] px-2 py-1 rounded-md">
              +8%
            </span>
          </div>
          <p className="text-[30px] leading-[38px] font-bold text-[#0F172A] mb-1">€{metricas.ingresosSemanal}</p>
          <p className="text-[14px] leading-[20px] text-[#64748B]">Ingresos Semanales</p>
        </div>
      </div>

      {/* Ocupación por día */}
      <div className="bg-white rounded-2xl shadow-lg border border-[#E2E8F0] p-6">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-6 h-6 text-[#10B981]" />
          <div>
            <h3 className="text-[20px] leading-[28px] font-semibold text-[#0F172A]">Ocupación por Día</h3>
            <p className="text-[14px] leading-[20px] text-[#64748B]">Análisis de la semana actual</p>
          </div>
        </div>

        <div className="space-y-4">
          {ocupacionPorDia.map(dia => (
            <div key={dia.dia} className="flex items-center gap-4">
              <div className="w-16 text-[14px] font-semibold text-[#0F172A]">{dia.dia}</div>
              <div className="flex-1 bg-[#F1F5F9] rounded-full h-8 overflow-hidden relative">
                <div
                  className={`h-full flex items-center px-4 text-white font-semibold text-[14px] transition-all duration-200 ${
                    dia.ocupacion >= 80
                      ? 'bg-[#10B981]'
                      : dia.ocupacion >= 60
                      ? 'bg-[#3B82F6]'
                      : 'bg-[#F59E0B]'
                  }`}
                  style={{ width: `${dia.ocupacion}%` }}
                >
                  {dia.ocupacion}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Franjas horarias más populares */}
      <div className="bg-white rounded-2xl shadow-lg border border-[#E2E8F0] p-6">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="w-6 h-6 text-[#6366F1]" />
          <div>
            <h3 className="text-[20px] leading-[28px] font-semibold text-[#0F172A]">Franjas Horarias Más Populares</h3>
            <p className="text-[14px] leading-[20px] text-[#64748B]">Optimiza tu agenda según la demanda</p>
          </div>
        </div>

        <div className="space-y-4">
          {franjasMasPopulares.map((franja, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-32 text-[14px] font-semibold text-[#0F172A]">{franja.franja}</div>
              <div className="flex-1 bg-[#F1F5F9] rounded-full h-10 overflow-hidden relative">
                <div
                  className={`${franja.color} h-full flex items-center justify-between px-4 text-white font-semibold text-[14px] transition-all duration-200`}
                  style={{ width: `${(franja.reservas / maxReservas) * 100}%` }}
                >
                  <span>{franja.reservas} reservas</span>
                </div>
              </div>
              <div className="w-20 text-right text-[14px] text-[#64748B]">
                {Math.round((franja.reservas / (metricas.citasSemanales || 1)) * 100)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recomendaciones */}
      <div className="bg-gradient-to-r from-[#10B981] to-[#059669] rounded-2xl p-6 text-white shadow-lg">
        <h3 className="text-[20px] leading-[28px] font-semibold mb-3 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Recomendaciones para Optimizar
        </h3>
        <ul className="space-y-2 text-[14px] leading-[20px] text-[#D1FAE5]">
          <li className="flex items-start gap-2">
            <span className="text-white">•</span>
            <span>
              Las tardes (16:00-20:00) son tus horas más demandadas. Considera aumentar la capacidad.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-white">•</span>
            <span>
              Los fines de semana tienen baja ocupación. Ofrece promociones especiales para aumentar
              reservas.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-white">•</span>
            <span>
              Tu tasa de ocupación del 78% es excelente. Mantén el ritmo y considera expandir servicios.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

