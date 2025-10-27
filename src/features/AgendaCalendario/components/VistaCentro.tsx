import { Users, MapPin, User, Clock } from 'lucide-react';

interface ClaseColectiva {
  id: string;
  nombre: string;
  instructor: string;
  sala: string;
  hora: string;
  duracion: number;
  capacidad: number;
  ocupados: number;
  tipo: 'yoga' | 'spinning' | 'crossfit' | 'pilates' | 'funcional';
}

export default function VistaCentro() {
  // Datos de ejemplo
  const clasesDelDia: ClaseColectiva[] = [
    {
      id: '1',
      nombre: 'Yoga Matutino',
      instructor: 'Laura Fernández',
      sala: 'Sala A',
      hora: '08:00',
      duracion: 60,
      capacidad: 20,
      ocupados: 18,
      tipo: 'yoga'
    },
    {
      id: '2',
      nombre: 'Spinning Intensivo',
      instructor: 'Carlos Ruiz',
      sala: 'Sala de Ciclo',
      hora: '09:30',
      duracion: 45,
      capacidad: 25,
      ocupados: 25,
      tipo: 'spinning'
    },
    {
      id: '3',
      nombre: 'CrossFit WOD',
      instructor: 'Miguel Torres',
      sala: 'Box Principal',
      hora: '11:00',
      duracion: 60,
      capacidad: 15,
      ocupados: 12,
      tipo: 'crossfit'
    },
    {
      id: '4',
      nombre: 'Pilates',
      instructor: 'Ana Martín',
      sala: 'Sala B',
      hora: '13:00',
      duracion: 50,
      capacidad: 18,
      ocupados: 15,
      tipo: 'pilates'
    },
    {
      id: '5',
      nombre: 'Funcional Tarde',
      instructor: 'Pedro Sánchez',
      sala: 'Sala A',
      hora: '18:00',
      duracion: 60,
      capacidad: 20,
      ocupados: 19,
      tipo: 'funcional'
    }
  ];

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'yoga':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'spinning':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'crossfit':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'pilates':
        return 'bg-pink-100 text-pink-700 border-pink-200';
      case 'funcional':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getOcupacionColor = (ocupacion: number) => {
    if (ocupacion >= 90) return 'text-[#EF4444]';
    if (ocupacion >= 70) return 'text-[#F59E0B]';
    return 'text-[#10B981]';
  };

  const calcularOcupacion = (ocupados: number, capacidad: number) => {
    return Math.round((ocupados / capacidad) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] rounded-2xl p-6 text-white shadow-lg">
        <h2 className="text-[24px] leading-[32px] font-semibold mb-2">Agenda del Centro</h2>
        <p className="text-[14px] leading-[20px] text-[#DBEAFE]">Gestión completa de clases colectivas y servicios del gimnasio</p>
      </div>

      {/* Resumen del día */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[14px] leading-[20px] text-[#64748B]">Clases Hoy</p>
              <p className="text-[24px] leading-[32px] font-semibold text-[#0F172A]">{clasesDelDia.length}</p>
            </div>
            <div className="bg-[#DBEAFE] p-3 rounded-xl">
              <Users className="w-6 h-6 text-[#3B82F6]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[14px] leading-[20px] text-[#64748B]">Capacidad Total</p>
              <p className="text-[24px] leading-[32px] font-semibold text-[#0F172A]">
                {clasesDelDia.reduce((acc, c) => acc + c.capacidad, 0)}
              </p>
            </div>
            <div className="bg-[#EEF2FF] p-3 rounded-xl">
              <MapPin className="w-6 h-6 text-[#6366F1]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[14px] leading-[20px] text-[#64748B]">Plazas Ocupadas</p>
              <p className="text-[24px] leading-[32px] font-semibold text-[#0F172A]">
                {clasesDelDia.reduce((acc, c) => acc + c.ocupados, 0)}
              </p>
            </div>
            <div className="bg-[#D1FAE5] p-3 rounded-xl">
              <User className="w-6 h-6 text-[#10B981]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[14px] leading-[20px] text-[#64748B]">Ocupación Media</p>
              <p className="text-[24px] leading-[32px] font-semibold text-[#0F172A]">
                {Math.round(
                  (clasesDelDia.reduce((acc, c) => acc + c.ocupados, 0) /
                    clasesDelDia.reduce((acc, c) => acc + c.capacidad, 0)) *
                    100
                )}
                %
              </p>
            </div>
            <div className="bg-[#FEF3C7] p-3 rounded-xl">
              <Clock className="w-6 h-6 text-[#F59E0B]" />
            </div>
          </div>
        </div>
      </div>

      {/* Lista de clases */}
      <div className="bg-white rounded-2xl shadow-lg border border-[#E2E8F0]">
        <div className="p-6 border-b border-[#E2E8F0]">
          <h3 className="text-[20px] leading-[28px] font-semibold text-[#0F172A]">Clases Programadas</h3>
          <p className="text-[14px] leading-[20px] text-[#64748B]">Lunes, 26 de Octubre 2025</p>
        </div>

        <div className="divide-y divide-[#E2E8F0]">
          {clasesDelDia.map(clase => {
            const ocupacion = calcularOcupacion(clase.ocupados, clase.capacidad);
            const plazasDisponibles = clase.capacidad - clase.ocupados;

            return (
              <div key={clase.id} className="p-6 hover:bg-[#F8FAFC] transition-all duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    {/* Hora */}
                    <div className="text-center min-w-[60px]">
                      <p className="text-[18px] leading-[28px] font-bold text-[#0F172A]">{clase.hora}</p>
                      <p className="text-[12px] leading-[16px] text-[#94A3B8]">{clase.duracion} min</p>
                    </div>

                    {/* Tipo de clase */}
                    <div>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-[12px] leading-[16px] font-medium border ${getTipoColor(
                          clase.tipo
                        )}`}
                      >
                        {clase.tipo.toUpperCase()}
                      </span>
                    </div>

                    {/* Información */}
                    <div className="flex-1">
                      <h4 className="font-semibold text-[16px] text-[#0F172A] mb-1">{clase.nombre}</h4>
                      <div className="flex items-center gap-4 text-[14px] text-[#64748B]">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{clase.instructor}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{clase.sala}</span>
                        </div>
                      </div>

                      {/* Barra de ocupación */}
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-[12px] mb-1">
                          <span className={`font-medium ${getOcupacionColor(ocupacion)}`}>
                            {clase.ocupados}/{clase.capacidad} plazas
                          </span>
                          <span className={`font-bold ${getOcupacionColor(ocupacion)}`}>
                            {ocupacion}%
                          </span>
                        </div>
                        <div className="w-full bg-[#E2E8F0] rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full transition-all duration-200 ${
                              ocupacion >= 90
                                ? 'bg-[#EF4444]'
                                : ocupacion >= 70
                                ? 'bg-[#F59E0B]'
                                : 'bg-[#10B981]'
                            }`}
                            style={{ width: `${ocupacion}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="flex gap-2">
                    {plazasDisponibles > 0 ? (
                      <button className="px-4 py-2 bg-[#10B981] text-white rounded-xl hover:bg-[#059669] transition-all duration-200 text-[14px] font-semibold shadow-md">
                        Gestionar ({plazasDisponibles})
                      </button>
                    ) : (
                      <button className="px-4 py-2 bg-[#EF4444] text-white rounded-xl cursor-not-allowed text-[14px] font-semibold shadow-md">
                        Completo
                      </button>
                    )}
                    <button className="px-4 py-2 border border-[#E2E8F0] text-[#0F172A] rounded-xl hover:bg-[#F8FAFC] transition-all duration-200 text-[14px] font-semibold">
                      Detalles
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

