import { Users, Calendar, Clock, TrendingUp } from 'lucide-react';

interface ProgramaGrupal {
  id: string;
  nombre: string;
  descripcion: string;
  participantes: number;
  maxParticipantes: number;
  horario: string;
  instructor: string;
  progreso: number;
}

export default function ProgramasGrupo() {
  // Datos de ejemplo
  const programasGrupales: ProgramaGrupal[] = [
    {
      id: '1',
      nombre: 'CrossFit WOD Semanal',
      descripcion: 'Programa semanal intensivo de CrossFit',
      participantes: 45,
      maxParticipantes: 50,
      horario: 'L-V 18:00-19:00',
      instructor: 'Carlos Ruiz',
      progreso: 65
    },
    {
      id: '2',
      nombre: 'Yoga Vinyasa Flow',
      descripcion: 'Clase de yoga dinámica para flexibilidad y fuerza',
      participantes: 22,
      maxParticipantes: 25,
      horario: 'L-M-V 19:30-20:30',
      instructor: 'Ana López',
      progreso: 40
    },
    {
      id: '3',
      nombre: 'Spinning Cardio',
      descripcion: 'Entrenamiento cardiovascular en bicicleta',
      participantes: 18,
      maxParticipantes: 20,
      horario: 'M-J-S 07:00-08:00',
      instructor: 'Miguel Torres',
      progreso: 80
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-[#0F172A]">Programas Grupales Activos</h3>
        <span className="text-sm text-[#64748B] font-medium">{programasGrupales.length} programas</span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {programasGrupales.map((programa) => (
          <div
            key={programa.id}
            className="bg-white border border-[#E2E8F0] rounded-xl p-6 hover:border-[#6366F1] hover:shadow-lg transition-all duration-200"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-[#0F172A] mb-1">{programa.nombre}</h4>
                <p className="text-sm text-[#64748B]">{programa.descripcion}</p>
              </div>
              <span className="px-3 py-1 bg-[#EEF2FF] text-[#6366F1] text-sm font-medium rounded-full border border-[#6366F1]">
                Grupal
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#6366F1]" />
                <div>
                  <p className="text-xs text-[#94A3B8] font-medium">Participantes</p>
                  <p className="text-sm font-semibold text-[#0F172A]">
                    {programa.participantes}/{programa.maxParticipantes}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#6366F1]" />
                <div>
                  <p className="text-xs text-[#94A3B8] font-medium">Horario</p>
                  <p className="text-sm font-semibold text-[#0F172A]">{programa.horario}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#6366F1]" />
                <div>
                  <p className="text-xs text-[#94A3B8] font-medium">Instructor</p>
                  <p className="text-sm font-semibold text-[#0F172A]">{programa.instructor}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#6366F1]" />
                <div>
                  <p className="text-xs text-[#94A3B8] font-medium">Progreso</p>
                  <p className="text-sm font-semibold text-[#0F172A]">{programa.progreso}%</p>
                </div>
              </div>
            </div>

            {/* Barra de progreso */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[#94A3B8] font-medium">Progreso del programa</span>
                <span className="text-[#6366F1] font-semibold">{programa.progreso}%</span>
              </div>
              <div className="w-full bg-[#E2E8F0] rounded-full h-2">
                <div
                  className="bg-[#6366F1] h-2 rounded-full transition-all duration-200"
                  style={{ width: `${programa.progreso}%` }}
                />
              </div>
            </div>

            {/* Indicador de capacidad */}
            <div className="mt-3 pt-3 border-t border-[#E2E8F0]">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#94A3B8] font-medium">Capacidad</span>
                <span className={`text-xs font-semibold ${
                  programa.participantes / programa.maxParticipantes > 0.8
                    ? 'text-[#EF4444]'
                    : 'text-[#10B981]'
                }`}>
                  {Math.round((programa.participantes / programa.maxParticipantes) * 100)}% ocupado
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

