import { useState } from 'react';
import { Clock, User, Calendar, CheckCircle } from 'lucide-react';

interface HorarioFlexible {
  id: string;
  personal: string;
  preferencia: string;
  horasSemanales: number;
  diasTrabajo: string[];
  disponibilidadExtra: boolean;
}

export default function HorariosFlexibles() {
  const [horarios] = useState<HorarioFlexible[]>([
    {
      id: '1',
      personal: 'Ana García',
      preferencia: 'Turno Mañana',
      horasSemanales: 30,
      diasTrabajo: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
      disponibilidadExtra: true
    },
    {
      id: '2',
      personal: 'Carlos Martínez',
      preferencia: 'Turno Tarde',
      horasSemanales: 35,
      diasTrabajo: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      disponibilidadExtra: false
    },
    {
      id: '3',
      personal: 'Laura Rodríguez',
      preferencia: 'Flexible',
      horasSemanales: 25,
      diasTrabajo: ['Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      disponibilidadExtra: true
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#F1F5F9]">Horarios Flexibles</h2>
        <button className="px-4 py-2 bg-[#6366F1] hover:bg-[#4F46E5] active:bg-[#4338CA] text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2">
          Configurar Horario
        </button>
      </div>

      <div className="grid gap-4">
        {horarios.map((horario) => (
          <div
            key={horario.id}
            className="bg-[#1E1E2E] rounded-xl p-6 border border-[#334155] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center shadow-md">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#F1F5F9]">{horario.personal}</h3>
                    <p className="text-[#94A3B8] text-sm">{horario.preferencia}</p>
                  </div>
                  {horario.disponibilidadExtra && (
                    <span className="px-3 py-1 bg-[#D1FAE5] text-[#10B981] text-xs font-medium rounded-full flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Extra disponible
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#94A3B8]" />
                    <div>
                      <p className="text-xs text-[#94A3B8]">Horas Semanales</p>
                      <p className="text-[#F1F5F9] font-semibold">{horario.horasSemanales}h</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#94A3B8]" />
                    <div>
                      <p className="text-xs text-[#94A3B8]">Días de Trabajo</p>
                      <p className="text-[#F1F5F9] font-semibold">{horario.diasTrabajo.length} días</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-xs text-[#94A3B8] mb-2 font-medium">Días Disponibles:</p>
                  <div className="flex flex-wrap gap-2">
                    {horario.diasTrabajo.map((dia, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[#2A2A3A] text-[#F1F5F9] text-xs font-medium rounded-full border border-[#475569]"
                      >
                        {dia}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <button className="px-3 py-1 text-sm bg-[#2A2A3A] hover:bg-[#334155] text-white rounded-lg font-medium border border-[#475569] transition-all duration-200">
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#1E1E2E] rounded-xl p-6 border border-[#334155] shadow-md">
        <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">Configuración de Turnos</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="border border-[#334155] rounded-xl p-4 bg-[#2A2A3A]/30 hover:bg-[#2A2A3A]/50 transition-all duration-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-[#10B981] shadow-sm"></div>
              <h4 className="text-[#F1F5F9] font-semibold">Turno Mañana</h4>
            </div>
            <p className="text-[#94A3B8] text-sm">09:00 - 13:00</p>
            <p className="text-[#64748B] text-sm">4 horas</p>
          </div>
          <div className="border border-[#334155] rounded-xl p-4 bg-[#2A2A3A]/30 hover:bg-[#2A2A3A]/50 transition-all duration-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-[#6366F1] shadow-sm"></div>
              <h4 className="text-[#F1F5F9] font-semibold">Turno Tarde</h4>
            </div>
            <p className="text-[#94A3B8] text-sm">13:00 - 17:00</p>
            <p className="text-[#64748B] text-sm">4 horas</p>
          </div>
          <div className="border border-[#334155] rounded-xl p-4 bg-[#2A2A3A]/30 hover:bg-[#2A2A3A]/50 transition-all duration-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-[#8B5CF6] shadow-sm"></div>
              <h4 className="text-[#F1F5F9] font-semibold">Turno Noche</h4>
            </div>
            <p className="text-[#94A3B8] text-sm">17:00 - 21:00</p>
            <p className="text-[#64748B] text-sm">4 horas</p>
          </div>
        </div>
      </div>
    </div>
  );
}

