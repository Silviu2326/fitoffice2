import { useState } from 'react';
import { CheckCircle, XCircle, Clock, User } from 'lucide-react';

interface DisponibilidadPersonal {
  id: string;
  nombre: string;
  cargo: string;
  estado: 'disponible' | 'ocupado' | 'ausente';
  horaInicio?: string;
  horaFin?: string;
  ubicacion: string;
}

export default function Disponibilidad() {
  const [personal] = useState<DisponibilidadPersonal[]>([
    {
      id: '1',
      nombre: 'Ana García',
      cargo: 'Entrenadora Personal',
      estado: 'disponible',
      horaInicio: '09:00',
      horaFin: '13:00',
      ubicacion: 'Sala Musculación'
    },
    {
      id: '2',
      nombre: 'Carlos Martínez',
      cargo: 'Fisioterapeuta',
      estado: 'ocupado',
      horaInicio: '13:00',
      horaFin: '17:00',
      ubicacion: 'Sala Rehabilitación'
    },
    {
      id: '3',
      nombre: 'Laura Rodríguez',
      cargo: 'Instructora Yoga',
      estado: 'ausente',
      ubicacion: '-'
    },
    {
      id: '4',
      nombre: 'Miguel Sánchez',
      cargo: 'Nutricionista',
      estado: 'disponible',
      horaInicio: '10:00',
      horaFin: '14:00',
      ubicacion: 'Consultorio Nutrición'
    }
  ]);

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'disponible':
        return <CheckCircle className="w-5 h-5 text-[#10B981]" />;
      case 'ocupado':
        return <Clock className="w-5 h-5 text-[#F59E0B]" />;
      case 'ausente':
        return <XCircle className="w-5 h-5 text-[#EF4444]" />;
      default:
        return null;
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'disponible':
        return 'bg-[#D1FAE5] text-[#10B981]';
      case 'ocupado':
        return 'bg-[#FEF3C7] text-[#F59E0B]';
      case 'ausente':
        return 'bg-[#FEE2E2] text-[#EF4444]';
      default:
        return 'bg-[#F1F5F9] text-[#64748B]';
    }
  };

  const disponibles = personal.filter(p => p.estado === 'disponible').length;
  const ocupados = personal.filter(p => p.estado === 'ocupado').length;
  const ausentes = personal.filter(p => p.estado === 'ausente').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#F1F5F9]">Disponibilidad del Personal</h2>
        <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
          <Clock className="w-4 h-4" />
          <span>Actualizado: Hoy, 10:30</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#1E1E2E] rounded-xl p-4 border border-[#334155] shadow-md transition-all duration-200 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-[#10B981]" />
            <h3 className="text-[#F1F5F9] font-semibold">Disponibles</h3>
          </div>
          <p className="text-3xl font-bold text-[#F1F5F9]">{disponibles}</p>
        </div>
        <div className="bg-[#1E1E2E] rounded-xl p-4 border border-[#334155] shadow-md transition-all duration-200 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-[#F59E0B]" />
            <h3 className="text-[#F1F5F9] font-semibold">Ocupados</h3>
          </div>
          <p className="text-3xl font-bold text-[#F1F5F9]">{ocupados}</p>
        </div>
        <div className="bg-[#1E1E2E] rounded-xl p-4 border border-[#334155] shadow-md transition-all duration-200 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <XCircle className="w-5 h-5 text-[#EF4444]" />
            <h3 className="text-[#F1F5F9] font-semibold">Ausentes</h3>
          </div>
          <p className="text-3xl font-bold text-[#F1F5F9]">{ausentes}</p>
        </div>
      </div>

      <div className="grid gap-4">
        {personal.map((persona) => (
          <div
            key={persona.id}
            className="bg-[#1E1E2E] rounded-xl p-6 border border-[#334155] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center shadow-md">
                  <User className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-[#F1F5F9]">{persona.nombre}</h3>
                    {getEstadoIcon(persona.estado)}
                    <span className={`px-3 py-1 ${getEstadoColor(persona.estado)} text-xs font-medium rounded-full`}>
                      {persona.estado}
                    </span>
                  </div>
                  <p className="text-[#94A3B8] text-sm mb-3">{persona.cargo}</p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {persona.horaInicio && persona.horaFin && (
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-[#94A3B8]" />
                        <span className="text-[#F1F5F9]">
                          {persona.horaInicio} - {persona.horaFin}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-[#94A3B8]">📍</span>
                      <span className="text-[#F1F5F9]">{persona.ubicacion}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {persona.estado === 'disponible' && (
                <button className="px-4 py-2 bg-[#6366F1] hover:bg-[#4F46E5] active:bg-[#4338CA] text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2">
                  Asignar Tarea
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

