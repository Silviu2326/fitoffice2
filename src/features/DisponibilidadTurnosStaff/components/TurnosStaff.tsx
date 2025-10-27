import { useState } from 'react';
import { Calendar, Clock, User, CheckCircle, AlertCircle } from 'lucide-react';

interface Turno {
  id: string;
  personal: string;
  cargo: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  estado: 'activo' | 'ausente' | 'reemplazo';
  especialidad: string;
}

export default function TurnosStaff() {
  const [turnos] = useState<Turno[]>([
    {
      id: '1',
      personal: 'Ana García',
      cargo: 'Entrenadora Personal',
      fecha: '2025-10-26',
      horaInicio: '09:00',
      horaFin: '13:00',
      estado: 'activo',
      especialidad: 'Musculación'
    },
    {
      id: '2',
      personal: 'Carlos Martínez',
      cargo: 'Fisioterapeuta',
      fecha: '2025-10-26',
      horaInicio: '13:00',
      horaFin: '17:00',
      estado: 'activo',
      especialidad: 'Rehabilitación'
    },
    {
      id: '3',
      personal: 'Laura Rodríguez',
      cargo: 'Instructora Yoga',
      fecha: '2025-10-26',
      horaInicio: '17:00',
      horaFin: '21:00',
      estado: 'activo',
      especialidad: 'Yoga'
    }
  ]);

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'activo':
        return 'bg-[#D1FAE5] text-[#10B981]';
      case 'ausente':
        return 'bg-[#FEE2E2] text-[#EF4444]';
      case 'reemplazo':
        return 'bg-[#FEF3C7] text-[#F59E0B]';
      default:
        return 'bg-[#F1F5F9] text-[#64748B]';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#F1F5F9]">Turnos del Personal</h2>
        <button className="px-4 py-2 bg-[#6366F1] hover:bg-[#4F46E5] active:bg-[#4338CA] text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2">
          Asignar Turno
        </button>
      </div>

      <div className="grid gap-4">
        {turnos.map((turno) => (
          <div
            key={turno.id}
            className="bg-[#1E1E2E] rounded-xl p-6 border border-[#334155] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <User className="w-5 h-5 text-[#6366F1]" />
                  <h3 className="text-lg font-semibold text-[#F1F5F9]">{turno.personal}</h3>
                  <span className={`px-3 py-1 ${getEstadoColor(turno.estado)} text-xs font-medium rounded-full`}>
                    {turno.estado}
                  </span>
                </div>
                <p className="text-[#94A3B8] text-sm mb-3">{turno.cargo}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-[#94A3B8]" />
                    <span className="text-[#F1F5F9]">{turno.fecha}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-[#94A3B8]" />
                    <span className="text-[#F1F5F9]">
                      {turno.horaInicio} - {turno.horaFin}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm col-span-2">
                    {turno.estado === 'activo' ? (
                      <CheckCircle className="w-4 h-4 text-[#10B981]" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-[#F59E0B]" />
                    )}
                    <span className="text-[#F1F5F9]">Especialidad: {turno.especialidad}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm bg-[#2A2A3A] hover:bg-[#334155] text-white rounded-lg font-medium border border-[#475569] transition-all duration-200">
                  Editar
                </button>
                <button className="px-3 py-1 text-sm bg-[#2A2A3A] hover:bg-[#334155] text-white rounded-lg font-medium border border-[#475569] transition-all duration-200">
                  Reemplazar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

