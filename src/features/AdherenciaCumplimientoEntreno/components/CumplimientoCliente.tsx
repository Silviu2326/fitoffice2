import { User, CheckCircle, Clock, TrendingUp } from 'lucide-react';

interface Sesion {
  id: string;
  fecha: string;
  ejercicio: string;
  completada: boolean;
  duracion?: number;
}

export default function CumplimientoCliente() {
  // Datos de ejemplo
  const clientes = [
    {
      id: '1',
      nombre: 'Juan Pérez',
      adherencia: 85,
      sesionesCompletadas: 17,
      sesionesPendientes: 3,
      ultimaSesion: '2025-10-25'
    },
    {
      id: '2',
      nombre: 'María García',
      adherencia: 92,
      sesionesCompletadas: 23,
      sesionesPendientes: 2,
      ultimaSesion: '2025-10-26'
    },
    {
      id: '3',
      nombre: 'Carlos López',
      adherencia: 65,
      sesionesCompletadas: 13,
      sesionesPendientes: 7,
      ultimaSesion: '2025-10-23'
    }
  ];

  const getAdherenciaColor = (adherencia: number) => {
    if (adherencia >= 80) return 'text-[#10B981] bg-[#D1FAE5]';
    if (adherencia >= 60) return 'text-[#F59E0B] bg-[#FEF3C7]';
    return 'text-[#EF4444] bg-[#FEE2E2]';
  };

  const getProgressBarColor = (adherencia: number) => {
    if (adherencia >= 80) return 'bg-[#10B981]';
    if (adherencia >= 60) return 'bg-[#F59E0B]';
    return 'bg-[#EF4444]';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-[#E2E8F0] p-6 hover:shadow-xl transition-all duration-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[20px] leading-7 font-semibold text-[#0F172A]">Cumplimiento por Cliente</h3>
        <User className="w-6 h-6 text-[#6366F1]" />
      </div>

      <div className="space-y-4">
        {clientes.map((cliente) => (
          <div key={cliente.id} className="border border-[#E2E8F0] rounded-xl p-4 hover:border-[#6366F1] hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="bg-[#EEF2FF] rounded-xl p-2">
                  <User className="w-5 h-5 text-[#6366F1]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#0F172A] text-[16px]">{cliente.nombre}</h4>
                  <p className="text-[14px] leading-5 text-[#64748B]">Última sesión: {cliente.ultimaSesion}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-[14px] leading-5 font-semibold ${getAdherenciaColor(cliente.adherencia)}`}>
                {cliente.adherencia}% adherencia
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-3">
              <div className="bg-[#F8FAFC] rounded-lg p-3 text-center border border-[#E2E8F0]">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <CheckCircle className="w-4 h-4 text-[#10B981]" />
                  <span className="text-[12px] leading-4 text-[#64748B]">Completadas</span>
                </div>
                <p className="text-[18px] leading-7 font-bold text-[#0F172A]">{cliente.sesionesCompletadas}</p>
              </div>
              <div className="bg-[#F8FAFC] rounded-lg p-3 text-center border border-[#E2E8F0]">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Clock className="w-4 h-4 text-[#F59E0B]" />
                  <span className="text-[12px] leading-4 text-[#64748B]">Pendientes</span>
                </div>
                <p className="text-[18px] leading-7 font-bold text-[#0F172A]">{cliente.sesionesPendientes}</p>
              </div>
              <div className="bg-[#F8FAFC] rounded-lg p-3 text-center border border-[#E2E8F0]">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrendingUp className="w-4 h-4 text-[#6366F1]" />
                  <span className="text-[12px] leading-4 text-[#64748B]">Total</span>
                </div>
                <p className="text-[18px] leading-7 font-bold text-[#0F172A]">{cliente.sesionesCompletadas + cliente.sesionesPendientes}</p>
              </div>
            </div>

            <div className="relative pt-1">
              <div className="overflow-hidden h-2.5 text-xs flex rounded-xl bg-[#E2E8F0]">
                <div
                  style={{ width: `${cliente.adherencia}%` }}
                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${getProgressBarColor(cliente.adherencia)} transition-all duration-300`}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-[#E2E8F0]">
        <p className="text-[14px] leading-5 text-[#64748B] text-center">
          ¿Este cliente hizo la sesión que le mandé? - Seguimiento individual
        </p>
      </div>
    </div>
  );
}
