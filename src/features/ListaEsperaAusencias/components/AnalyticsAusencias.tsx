import { useState } from 'react';
import { TrendingDown, TrendingUp, BarChart3, PieChart, Calendar, User } from 'lucide-react';

export default function AnalyticsAusencias() {
  const [periodo, setPeriodo] = useState<'semana' | 'mes' | 'trimestre'>('mes');

  const stats = {
    totalAusencias: 45,
    noShow: 28,
    cancelaciones: 17,
    tasaAsistencia: 87.5,
    tendencia: 'mejorando',
    penalizacionesAplicadas: 18,
    ingresosPenalizaciones: 185.00
  };

  const sociosMayorAusencia = [
    { nombre: 'Pedro Sánchez', ausencias: 8, noShow: 5, tasa: 60 },
    { nombre: 'Laura Fernández', ausencias: 6, noShow: 3, tasa: 70 },
    { nombre: 'Miguel Torres', ausencias: 5, noShow: 4, tasa: 72 },
    { nombre: 'Carmen Ruiz', ausencias: 4, noShow: 2, tasa: 78 }
  ];

  const clasesMayorAusencia = [
    { nombre: 'Spinning 07:00', ausencias: 12, ocupacion: 75 },
    { nombre: 'Yoga 06:30', ausencias: 10, ocupacion: 80 },
    { nombre: 'CrossFit 20:00', ausencias: 8, ocupacion: 85 },
    { nombre: 'Pilates 10:00', ausencias: 7, ocupacion: 88 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#0F172A]">Analytics de Ausencias</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setPeriodo('semana')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
              periodo === 'semana'
                ? 'bg-[#6366F1] text-white shadow-md'
                : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
            }`}
          >
            Semana
          </button>
          <button
            onClick={() => setPeriodo('mes')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
              periodo === 'mes'
                ? 'bg-[#6366F1] text-white shadow-md'
                : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
            }`}
          >
            Mes
          </button>
          <button
            onClick={() => setPeriodo('trimestre')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
              periodo === 'trimestre'
                ? 'bg-[#6366F1] text-white shadow-md'
                : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
            }`}
          >
            Trimestre
          </button>
        </div>
      </div>

      {/* Stats principales */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 text-[#3B82F6]" />
            <h3 className="text-[#64748B] text-sm font-medium">Total Ausencias</h3>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">{stats.totalAusencias}</p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingDown className="w-4 h-4 text-[#10B981]" />
            <span className="text-sm text-[#10B981] font-medium">-12% vs mes anterior</span>
          </div>
        </div>

        <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-5 h-5 text-[#EF4444]" />
            <h3 className="text-[#64748B] text-sm font-medium">No Show</h3>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">{stats.noShow}</p>
          <p className="text-sm text-[#64748B] mt-1">{((stats.noShow / stats.totalAusencias) * 100).toFixed(0)}% del total</p>
        </div>

        <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-[#10B981]" />
            <h3 className="text-[#64748B] text-sm font-medium">Tasa Asistencia</h3>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">{stats.tasaAsistencia}%</p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp className="w-4 h-4 text-[#10B981]" />
            <span className="text-sm text-[#10B981] font-medium">+3.2% mejora</span>
          </div>
        </div>

        <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <PieChart className="w-5 h-5 text-[#6366F1]" />
            <h3 className="text-[#64748B] text-sm font-medium">Penalizaciones</h3>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">${stats.ingresosPenalizaciones}</p>
          <p className="text-sm text-[#64748B] mt-1">{stats.penalizacionesAplicadas} aplicadas</p>
        </div>
      </div>

      {/* Gráfico de tendencia */}
      <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm">
        <h3 className="text-lg font-semibold text-[#0F172A] mb-4">Tendencia de Ausencias</h3>
        <div className="h-64 flex items-end justify-between gap-2">
          {[12, 15, 10, 8, 13, 9, 7, 11, 6, 8, 5, 7].map((valor, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full bg-gradient-to-t from-[#EF4444] to-[#F59E0B] rounded-t-lg transition-all hover:opacity-80"
                style={{ height: `${(valor / 15) * 100}%` }}
              ></div>
              <span className="text-xs text-[#64748B] font-medium">{index + 1}</span>
            </div>
          ))}
        </div>
        <div className="text-center mt-4 text-sm text-[#64748B]">
          Días del mes actual
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Socios con mayor ausencia */}
        <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm">
          <h3 className="text-lg font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-[#EF4444]" />
            Socios con Mayor Ausencia
          </h3>
          <div className="space-y-3">
            {sociosMayorAusencia.map((socio, index) => (
              <div key={index} className="bg-[#F8FAFC] rounded-lg p-4 border border-[#E2E8F0]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#0F172A] font-semibold">{socio.nombre}</span>
                  <span className="text-[#EF4444] font-bold">{socio.ausencias} ausencias</span>
                </div>
                <div className="flex items-center justify-between text-sm text-[#64748B] mb-2">
                  <span>No Show: {socio.noShow}</span>
                  <span>Asistencia: {socio.tasa}%</span>
                </div>
                <div className="w-full bg-[#E2E8F0] rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-[#EF4444] to-[#F59E0B] h-2 rounded-full transition-all duration-200"
                    style={{ width: `${100 - socio.tasa}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clases con mayor ausencia */}
        <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm">
          <h3 className="text-lg font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#F59E0B]" />
            Clases con Mayor Ausencia
          </h3>
          <div className="space-y-3">
            {clasesMayorAusencia.map((clase, index) => (
              <div key={index} className="bg-[#F8FAFC] rounded-lg p-4 border border-[#E2E8F0]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#0F172A] font-semibold">{clase.nombre}</span>
                  <span className="text-[#F59E0B] font-bold">{clase.ausencias} ausencias</span>
                </div>
                <div className="flex items-center justify-between text-sm text-[#64748B] mb-2">
                  <span>Ocupación: {clase.ocupacion}%</span>
                </div>
                <div className="w-full bg-[#E2E8F0] rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-[#F59E0B] to-[#EF4444] h-2 rounded-full transition-all duration-200"
                    style={{ width: `${(clase.ausencias / 15) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-gradient-to-r from-[#EEF2FF] to-[#E0E7FF] border border-[#6366F1]/20 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-[#0F172A] mb-3 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#6366F1]" />
          Insights y Recomendaciones
        </h3>
        <ul className="space-y-2 text-[#0F172A]">
          <li className="flex items-start gap-2">
            <span className="text-[#10B981] mt-1 font-bold">✓</span>
            <span>La tasa de asistencia ha mejorado un 3.2% este mes. Las notificaciones automáticas están funcionando.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#F59E0B] mt-1 font-bold">⚠</span>
            <span>Las clases matinales (07:00 y 06:30) tienen mayor tasa de ausencia. Considera enviar recordatorios adicionales.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#EF4444] mt-1 font-bold">•</span>
            <span>Pedro Sánchez tiene 5 no-shows. Recomendamos una conversación personal para entender las causas.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#3B82F6] mt-1 font-bold">ℹ</span>
            <span>Las penalizaciones han generado $185 este mes, lo que indica que el sistema está siendo efectivo.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

