import { useState } from 'react';
import { Users, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface ClaseAforo {
  id: string;
  nombre: string;
  fecha: string;
  hora: string;
  aforoMaximo: number;
  plazasOcupadas: number;
  listaEspera: number;
  tasaOcupacion: number;
  estado: 'disponible' | 'casi_llena' | 'completa';
}

export default function ControlAforo() {
  const [clases] = useState<ClaseAforo[]>([
    {
      id: '1',
      nombre: 'Yoga Avanzado',
      fecha: '2025-10-27',
      hora: '18:00',
      aforoMaximo: 20,
      plazasOcupadas: 20,
      listaEspera: 3,
      tasaOcupacion: 100,
      estado: 'completa'
    },
    {
      id: '2',
      nombre: 'Spinning',
      fecha: '2025-10-27',
      hora: '19:00',
      aforoMaximo: 25,
      plazasOcupadas: 22,
      listaEspera: 0,
      tasaOcupacion: 88,
      estado: 'casi_llena'
    },
    {
      id: '3',
      nombre: 'Pilates',
      fecha: '2025-10-27',
      hora: '10:00',
      aforoMaximo: 15,
      plazasOcupadas: 8,
      listaEspera: 0,
      tasaOcupacion: 53,
      estado: 'disponible'
    },
    {
      id: '4',
      nombre: 'CrossFit',
      fecha: '2025-10-27',
      hora: '20:00',
      aforoMaximo: 18,
      plazasOcupadas: 18,
      listaEspera: 5,
      tasaOcupacion: 100,
      estado: 'completa'
    },
    {
      id: '5',
      nombre: 'Zumba',
      fecha: '2025-10-27',
      hora: '17:00',
      aforoMaximo: 30,
      plazasOcupadas: 15,
      listaEspera: 0,
      tasaOcupacion: 50,
      estado: 'disponible'
    }
  ]);

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'disponible':
        return (
          <span className="px-3 py-1 bg-[#D1FAE5] text-[#10B981] text-xs font-medium rounded-full flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Disponible
          </span>
        );
      case 'casi_llena':
        return (
          <span className="px-3 py-1 bg-[#FEF3C7] text-[#F59E0B] text-xs font-medium rounded-full flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            Casi Llena
          </span>
        );
      case 'completa':
        return (
          <span className="px-3 py-1 bg-[#FEE2E2] text-[#EF4444] text-xs font-medium rounded-full flex items-center gap-1">
            <Users className="w-3 h-3" />
            Completa
          </span>
        );
      default:
        return null;
    }
  };

  const clasesCompletas = clases.filter(c => c.estado === 'completa').length;
  const totalEnEspera = clases.reduce((sum, c) => sum + c.listaEspera, 0);
  const promedioOcupacion = Math.round(
    clases.reduce((sum, c) => sum + c.tasaOcupacion, 0) / clases.length
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#0F172A]">Control de Aforo</h2>
        <button className="px-4 py-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2">
          Configurar Aforos
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-[#EF4444]" />
            <h3 className="text-[#0F172A] font-semibold">Clases Completas</h3>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">{clasesCompletas}</p>
          <p className="text-sm text-[#64748B] mt-1">de {clases.length} clases</p>
        </div>

        <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />
            <h3 className="text-[#0F172A] font-semibold">En Lista de Espera</h3>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">{totalEnEspera}</p>
          <p className="text-sm text-[#64748B] mt-1">personas esperando</p>
        </div>

        <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-[#10B981]" />
            <h3 className="text-[#0F172A] font-semibold">Ocupación Promedio</h3>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">{promedioOcupacion}%</p>
          <p className="text-sm text-[#64748B] mt-1">todas las clases</p>
        </div>
      </div>

      {/* Lista de clases */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-[#0F172A]">Clases Programadas</h3>
        {clases.map((clase) => (
          <div
            key={clase.id}
            className="bg-white rounded-xl p-6 border border-[#E2E8F0] hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="text-lg font-semibold text-[#0F172A]">{clase.nombre}</h4>
                  {getEstadoBadge(clase.estado)}
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div className="text-sm">
                    <span className="text-[#64748B]">Fecha:</span>
                    <span className="text-[#0F172A] font-medium ml-2">{clase.fecha}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-[#64748B]">Hora:</span>
                    <span className="text-[#0F172A] font-medium ml-2">{clase.hora}</span>
                  </div>
                  {clase.listaEspera > 0 && (
                    <div className="text-sm">
                      <span className="text-[#64748B]">Lista de Espera:</span>
                      <span className="text-[#F59E0B] ml-2 font-bold">{clase.listaEspera}</span>
                    </div>
                  )}
                </div>

                {/* Barra de progreso */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#64748B]">
                      {clase.plazasOcupadas} / {clase.aforoMaximo} plazas
                    </span>
                    <span className="text-[#0F172A] font-semibold">{clase.tasaOcupacion}%</span>
                  </div>
                  <div className="w-full bg-[#E2E8F0] rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-200 ${
                        clase.tasaOcupacion === 100
                          ? 'bg-[#EF4444]'
                          : clase.tasaOcupacion >= 80
                          ? 'bg-[#F59E0B]'
                          : 'bg-[#10B981]'
                      }`}
                      style={{ width: `${clase.tasaOcupacion}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="ml-6">
                {clase.estado === 'disponible' && (
                  <button className="px-4 py-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2">
                    Ver Detalles
                  </button>
                )}
                {clase.estado === 'completa' && clase.listaEspera > 0 && (
                  <button className="px-4 py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2">
                    Gestionar Espera
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recomendaciones */}
      <div className="bg-gradient-to-r from-[#DBEAFE] to-[#EEF2FF] border border-[#3B82F6]/20 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-[#0F172A] mb-3 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#3B82F6]" />
          Recomendaciones de Optimización
        </h3>
        <ul className="space-y-2 text-[#0F172A]">
          <li className="flex items-start gap-2">
            <span className="text-[#3B82F6] mt-1 font-bold">•</span>
            <span>Las clases de Yoga y CrossFit tienen alta demanda. Considera añadir más horarios.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#3B82F6] mt-1 font-bold">•</span>
            <span>Zumba tiene baja ocupación (50%). Promociona esta clase o ajusta el horario.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#3B82F6] mt-1 font-bold">•</span>
            <span>8 personas en lista de espera. Considera aumentar aforo o añadir sesiones adicionales.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

