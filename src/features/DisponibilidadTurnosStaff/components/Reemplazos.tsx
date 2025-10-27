import { useState } from 'react';
import { Users, Calendar, Clock, AlertCircle } from 'lucide-react';

interface Reemplazo {
  id: string;
  personalOriginal: string;
  reemplazo: string;
  fecha: string;
  turno: string;
  motivo: string;
  estado: 'pendiente' | 'confirmado' | 'completado';
}

export default function Reemplazos() {
  const [reemplazos] = useState<Reemplazo[]>([
    {
      id: '1',
      personalOriginal: 'Laura Rodríguez',
      reemplazo: 'Carlos Martínez',
      fecha: '2025-10-28',
      turno: 'Mañana (9-13h)',
      motivo: 'Vacaciones',
      estado: 'confirmado'
    },
    {
      id: '2',
      personalOriginal: 'Ana García',
      reemplazo: 'Miguel Sánchez',
      fecha: '2025-10-29',
      turno: 'Tarde (13-17h)',
      motivo: 'Baja médica',
      estado: 'pendiente'
    },
    {
      id: '3',
      personalOriginal: 'Carlos Martínez',
      reemplazo: 'Laura Rodríguez',
      fecha: '2025-10-27',
      turno: 'Noche (17-21h)',
      motivo: 'Asunto personal',
      estado: 'completado'
    }
  ]);

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'confirmado':
        return 'bg-[#D1FAE5] text-[#10B981]';
      case 'pendiente':
        return 'bg-[#FEF3C7] text-[#F59E0B]';
      case 'completado':
        return 'bg-[#DBEAFE] text-[#3B82F6]';
      default:
        return 'bg-[#F1F5F9] text-[#64748B]';
    }
  };

  const pendientes = reemplazos.filter(r => r.estado === 'pendiente').length;
  const confirmados = reemplazos.filter(r => r.estado === 'confirmado').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#F1F5F9]">Sistema de Reemplazos</h2>
        <button className="px-4 py-2 bg-[#6366F1] hover:bg-[#4F46E5] active:bg-[#4338CA] text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2">
          Solicitar Reemplazo
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#1E1E2E] rounded-xl p-4 border border-[#334155] shadow-md transition-all duration-200 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-5 h-5 text-[#F59E0B]" />
            <h3 className="text-[#F1F5F9] font-semibold">Pendientes</h3>
          </div>
          <p className="text-3xl font-bold text-[#F1F5F9]">{pendientes}</p>
        </div>
        <div className="bg-[#1E1E2E] rounded-xl p-4 border border-[#334155] shadow-md transition-all duration-200 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-[#10B981]" />
            <h3 className="text-[#F1F5F9] font-semibold">Confirmados</h3>
          </div>
          <p className="text-3xl font-bold text-[#F1F5F9]">{confirmados}</p>
        </div>
      </div>

      <div className="grid gap-4">
        {reemplazos.map((reemplazo) => (
          <div
            key={reemplazo.id}
            className="bg-[#1E1E2E] rounded-xl p-6 border border-[#334155] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-3 py-1 ${getEstadoColor(reemplazo.estado)} text-xs font-medium rounded-full`}>
                    {reemplazo.estado}
                  </span>
                </div>
                
                <div className="grid gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-[#EF4444]" />
                    <div>
                      <p className="text-xs text-[#94A3B8] font-medium">Personal Original</p>
                      <p className="text-[#F1F5F9] font-semibold">{reemplazo.personalOriginal}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 pl-7">
                    <span className="text-[#6366F1]">→</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-[#10B981]" />
                    <div>
                      <p className="text-xs text-[#94A3B8] font-medium">Reemplazo</p>
                      <p className="text-[#F1F5F9] font-semibold">{reemplazo.reemplazo}</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#94A3B8]" />
                    <span className="text-[#F1F5F9]">{reemplazo.fecha}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#94A3B8]" />
                    <span className="text-[#F1F5F9]">{reemplazo.turno}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-[#94A3B8]" />
                    <span className="text-[#F1F5F9]">{reemplazo.motivo}</span>
                  </div>
                </div>
              </div>
              
              {reemplazo.estado === 'pendiente' && (
                <button className="px-4 py-2 bg-[#6366F1] hover:bg-[#4F46E5] active:bg-[#4338CA] text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2">
                  Confirmar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

