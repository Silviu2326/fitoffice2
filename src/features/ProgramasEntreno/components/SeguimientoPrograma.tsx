import { TrendingUp, Calendar, CheckCircle, Clock, Activity } from 'lucide-react';

interface Sesion {
  id: string;
  nombre: string;
  fecha: string;
  completada: boolean;
  duracion: string;
  ejercicios: number;
  ejerciciosCompletados: number;
}

export default function SeguimientoPrograma() {
  // Datos de ejemplo
  const sesiones: Sesion[] = [
    {
      id: '1',
      nombre: 'Día 1: Pecho y Tríceps',
      fecha: '2025-10-20',
      completada: true,
      duracion: '60 min',
      ejercicios: 8,
      ejerciciosCompletados: 8
    },
    {
      id: '2',
      nombre: 'Día 2: Espalda y Bíceps',
      fecha: '2025-10-22',
      completada: true,
      duracion: '65 min',
      ejercicios: 8,
      ejerciciosCompletados: 8
    },
    {
      id: '3',
      nombre: 'Día 3: Piernas',
      fecha: '2025-10-24',
      completada: true,
      duracion: '70 min',
      ejercicios: 10,
      ejerciciosCompletados: 9
    },
    {
      id: '4',
      nombre: 'Día 4: Hombros y Core',
      fecha: '2025-10-26',
      completada: false,
      duracion: '55 min',
      ejercicios: 7,
      ejerciciosCompletados: 0
    }
  ];

  const estadisticas = {
    sesionesCompletadas: 3,
    totalSesiones: 4,
    adherencia: 75,
    promedioEjercicios: 94
  };

  return (
    <div className="space-y-6">
      {/* Estadísticas generales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 hover:border-[#6366F1] hover:shadow-lg transition-all duration-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#D1FAE5] rounded-lg">
              <CheckCircle className="w-5 h-5 text-[#10B981]" />
            </div>
            <div>
              <p className="text-sm text-[#64748B] font-medium">Sesiones</p>
              <p className="text-xl font-bold text-[#0F172A]">
                {estadisticas.sesionesCompletadas}/{estadisticas.totalSesiones}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 hover:border-[#6366F1] hover:shadow-lg transition-all duration-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#DBEAFE] rounded-lg">
              <TrendingUp className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <div>
              <p className="text-sm text-[#64748B] font-medium">Adherencia</p>
              <p className="text-xl font-bold text-[#0F172A]">{estadisticas.adherencia}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 hover:border-[#6366F1] hover:shadow-lg transition-all duration-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#EEF2FF] rounded-lg">
              <Activity className="w-5 h-5 text-[#6366F1]" />
            </div>
            <div>
              <p className="text-sm text-[#64748B] font-medium">Ejercicios</p>
              <p className="text-xl font-bold text-[#0F172A]">{estadisticas.promedioEjercicios}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 hover:border-[#6366F1] hover:shadow-lg transition-all duration-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#FEF3C7] rounded-lg">
              <Clock className="w-5 h-5 text-[#F59E0B]" />
            </div>
            <div>
              <p className="text-sm text-[#64748B] font-medium">Próxima sesión</p>
              <p className="text-xl font-bold text-[#0F172A]">Hoy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de sesiones */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-[#0F172A]">Historial de Sesiones</h3>
        {sesiones.map((sesion, index) => (
          <div
            key={sesion.id}
            className={`bg-white border rounded-xl p-4 transition-all duration-200 ${
              sesion.completada
                ? 'border-[#E2E8F0] hover:shadow-md'
                : 'border-[#6366F1] bg-[#EEF2FF] shadow-sm'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  sesion.completada
                    ? 'bg-[#D1FAE5]'
                    : 'bg-[#6366F1]'
                }`}>
                  {sesion.completada ? (
                    <CheckCircle className="w-5 h-5 text-[#10B981]" />
                  ) : (
                    <span className="text-sm font-semibold text-white">{index + 1}</span>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-[#0F172A]">{sesion.nombre}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-sm text-[#64748B] font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(sesion.fecha).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'short'
                      })}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-[#64748B] font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      {sesion.duracion}
                    </span>
                  </div>
                </div>
              </div>
              {sesion.completada && (
                <span className="px-3 py-1 bg-[#D1FAE5] text-[#10B981] text-xs font-medium rounded-full border border-[#10B981]">
                  Completada
                </span>
              )}
            </div>

            {/* Barra de progreso de ejercicios */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[#64748B] font-medium">
                  Ejercicios: {sesion.ejerciciosCompletados}/{sesion.ejercicios}
                </span>
                <span className="text-[#10B981] font-semibold">
                  {Math.round((sesion.ejerciciosCompletados / sesion.ejercicios) * 100)}%
                </span>
              </div>
              <div className="w-full bg-[#E2E8F0] rounded-full h-1.5">
                <div
                  className="bg-[#10B981] h-1.5 rounded-full transition-all duration-200"
                  style={{ width: `${(sesion.ejerciciosCompletados / sesion.ejercicios) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

