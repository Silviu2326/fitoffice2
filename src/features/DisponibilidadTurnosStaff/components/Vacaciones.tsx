import { useState } from 'react';
import { Calendar, Check, X, Clock, User } from 'lucide-react';

interface Vacacion {
  id: string;
  personal: string;
  fechaInicio: string;
  fechaFin: string;
  dias: number;
  estado: 'pendiente' | 'aprobada' | 'rechazada';
  reemplazo?: string;
}

export default function Vacaciones() {
  const [vacaciones] = useState<Vacacion[]>([
    {
      id: '1',
      personal: 'Ana García',
      fechaInicio: '2025-11-15',
      fechaFin: '2025-11-22',
      dias: 7,
      estado: 'pendiente',
    },
    {
      id: '2',
      personal: 'Laura Rodríguez',
      fechaInicio: '2025-10-28',
      fechaFin: '2025-11-03',
      dias: 6,
      estado: 'aprobada',
      reemplazo: 'Carlos Martínez'
    },
    {
      id: '3',
      personal: 'Carlos Martínez',
      fechaInicio: '2025-12-20',
      fechaFin: '2025-12-31',
      dias: 11,
      estado: 'pendiente',
    }
  ]);

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'aprobada':
        return 'bg-[#D1FAE5] text-[#10B981]';
      case 'pendiente':
        return 'bg-[#FEF3C7] text-[#F59E0B]';
      case 'rechazada':
        return 'bg-[#FEE2E2] text-[#EF4444]';
      default:
        return 'bg-[#F1F5F9] text-[#64748B]';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#F1F5F9]">Gestión de Vacaciones</h2>
        <button className="px-4 py-2 bg-[#6366F1] hover:bg-[#4F46E5] active:bg-[#4338CA] text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2">
          Nueva Solicitud
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#1E1E2E] rounded-xl p-4 border border-[#334155] shadow-md transition-all duration-200 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-[#F59E0B]" />
            <h3 className="text-[#F1F5F9] font-semibold">Pendientes</h3>
          </div>
          <p className="text-3xl font-bold text-[#F1F5F9]">2</p>
        </div>
        <div className="bg-[#1E1E2E] rounded-xl p-4 border border-[#334155] shadow-md transition-all duration-200 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <Check className="w-5 h-5 text-[#10B981]" />
            <h3 className="text-[#F1F5F9] font-semibold">Aprobadas</h3>
          </div>
          <p className="text-3xl font-bold text-[#F1F5F9]">1</p>
        </div>
        <div className="bg-[#1E1E2E] rounded-xl p-4 border border-[#334155] shadow-md transition-all duration-200 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 text-[#6366F1]" />
            <h3 className="text-[#F1F5F9] font-semibold">Días Totales</h3>
          </div>
          <p className="text-3xl font-bold text-[#F1F5F9]">24</p>
        </div>
      </div>

      <div className="grid gap-4">
        {vacaciones.map((vacacion) => (
          <div
            key={vacacion.id}
            className="bg-[#1E1E2E] rounded-xl p-6 border border-[#334155] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <User className="w-5 h-5 text-[#6366F1]" />
                  <h3 className="text-lg font-semibold text-[#F1F5F9]">{vacacion.personal}</h3>
                  <span className={`px-3 py-1 ${getEstadoColor(vacacion.estado)} text-xs font-medium rounded-full`}>
                    {vacacion.estado}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-[#94A3B8]" />
                    <span className="text-[#F1F5F9]">Inicio: {vacacion.fechaInicio}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-[#94A3B8]" />
                    <span className="text-[#F1F5F9]">Fin: {vacacion.fechaFin}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-[#94A3B8]" />
                    <span className="text-[#F1F5F9]">Días: {vacacion.dias}</span>
                  </div>
                  {vacacion.reemplazo && (
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-[#94A3B8]" />
                      <span className="text-[#F1F5F9]">Reemplazo: {vacacion.reemplazo}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {vacacion.estado === 'pendiente' && (
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm bg-[#10B981] hover:bg-[#059669] text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    Aprobar
                  </button>
                  <button className="px-3 py-1 text-sm bg-[#EF4444] hover:bg-[#DC2626] text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-1">
                    <X className="w-4 h-4" />
                    Rechazar
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

