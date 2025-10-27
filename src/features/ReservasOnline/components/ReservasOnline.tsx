import { Calendar, Clock, MapPin, Video, Users, Plus, Filter } from 'lucide-react';
import { useState } from 'react';

interface Reserva {
  id: string;
  cliente: string;
  tipo: 'presencial' | 'videollamada' | 'clase-grupal';
  servicio: string;
  fecha: string;
  hora: string;
  estado: 'confirmada' | 'pendiente' | 'completada';
  plazas?: number;
  ocupadas?: number;
}

interface ReservasOnlineProps {
  onNuevaReserva: () => void;
}

export default function ReservasOnline({ onNuevaReserva }: ReservasOnlineProps) {
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');

  // Datos de ejemplo
  const reservas: Reserva[] = [
    {
      id: '1',
      cliente: 'Ana García',
      tipo: 'presencial',
      servicio: 'Evaluación Inicial',
      fecha: '2025-10-27',
      hora: '10:00',
      estado: 'confirmada',
    },
    {
      id: '2',
      cliente: 'Carlos Ruiz',
      tipo: 'videollamada',
      servicio: 'Seguimiento Mensual',
      fecha: '2025-10-27',
      hora: '12:00',
      estado: 'confirmada',
    },
    {
      id: '3',
      cliente: 'Varios',
      tipo: 'clase-grupal',
      servicio: 'Spinning',
      fecha: '2025-10-27',
      hora: '18:00',
      estado: 'confirmada',
      plazas: 20,
      ocupadas: 15,
    },
    {
      id: '4',
      cliente: 'Varios',
      tipo: 'clase-grupal',
      servicio: 'HIIT',
      fecha: '2025-10-28',
      hora: '07:00',
      estado: 'confirmada',
      plazas: 15,
      ocupadas: 12,
    },
  ];

  const reservasFiltradas = reservas.filter((reserva) => {
    const pasaFiltroTipo = filtroTipo === 'todos' || reserva.tipo === filtroTipo;
    const pasaFiltroEstado = filtroEstado === 'todos' || reserva.estado === filtroEstado;
    return pasaFiltroTipo && pasaFiltroEstado;
  });

  const getIconoTipo = (tipo: string) => {
    switch (tipo) {
      case 'presencial':
        return <MapPin className="w-5 h-5" />;
      case 'videollamada':
        return <Video className="w-5 h-5" />;
      case 'clase-grupal':
        return <Users className="w-5 h-5" />;
      default:
        return <Calendar className="w-5 h-5" />;
    }
  };

  const getColorEstado = (estado: string) => {
    switch (estado) {
      case 'confirmada':
        return 'bg-[#D1FAE5] text-[#10B981] border-[#10B981]';
      case 'pendiente':
        return 'bg-[#FEF3C7] text-[#F59E0B] border-[#F59E0B]';
      case 'completada':
        return 'bg-[#DBEAFE] text-[#3B82F6] border-[#3B82F6]';
      default:
        return 'bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0]';
    }
  };

  return (
    <div className="space-y-6">
      {/* Estadísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-md border border-[#E2E8F0] hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#64748B] text-sm font-medium">Reservas Hoy</p>
              <p className="text-3xl font-bold text-[#0F172A] mt-2">12</p>
            </div>
            <div className="bg-[#EEF2FF] p-3 rounded-xl">
              <Calendar className="w-6 h-6 text-[#6366F1]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md border border-[#E2E8F0] hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#64748B] text-sm font-medium">Sesiones 1 a 1</p>
              <p className="text-3xl font-bold text-[#0F172A] mt-2">8</p>
            </div>
            <div className="bg-[#EEF2FF] p-3 rounded-xl">
              <MapPin className="w-6 h-6 text-[#6366F1]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md border border-[#E2E8F0] hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#64748B] text-sm font-medium">Clases Grupales</p>
              <p className="text-3xl font-bold text-[#0F172A] mt-2">4</p>
            </div>
            <div className="bg-[#D1FAE5] p-3 rounded-xl">
              <Users className="w-6 h-6 text-[#10B981]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md border border-[#E2E8F0] hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#64748B] text-sm font-medium">Ocupación</p>
              <p className="text-3xl font-bold text-[#0F172A] mt-2">85%</p>
            </div>
            <div className="bg-[#FEF3C7] p-3 rounded-xl">
              <Clock className="w-6 h-6 text-[#F59E0B]" />
            </div>
          </div>
        </div>
      </div>

      {/* Filtros y Acciones */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-[#E2E8F0]">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-[#94A3B8]" />
              <select
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
                className="border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200"
              >
                <option value="todos">Todos los tipos</option>
                <option value="presencial">Presencial</option>
                <option value="videollamada">Videollamada</option>
                <option value="clase-grupal">Clase Grupal</option>
              </select>
            </div>

            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200"
            >
              <option value="todos">Todos los estados</option>
              <option value="confirmada">Confirmadas</option>
              <option value="pendiente">Pendientes</option>
              <option value="completada">Completadas</option>
            </select>
          </div>

          <button
            onClick={onNuevaReserva}
            className="flex items-center gap-2 bg-[#6366F1] text-white px-6 py-3 rounded-xl hover:bg-[#4F46E5] active:bg-[#4338CA] transition-all duration-200 shadow-md hover:shadow-lg font-semibold"
          >
            <Plus className="w-5 h-5" />
            <span>Nueva Reserva</span>
          </button>
        </div>
      </div>

      {/* Lista de Reservas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reservasFiltradas.map((reserva) => (
          <div
            key={reserva.id}
            className="bg-white rounded-2xl p-6 shadow-md border border-[#E2E8F0] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-[#EEF2FF] p-3 rounded-xl text-[#6366F1]">
                  {getIconoTipo(reserva.tipo)}
                </div>
                <div>
                  <h3 className="font-semibold text-[#0F172A]">{reserva.servicio}</h3>
                  <p className="text-sm text-[#64748B]">{reserva.cliente}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getColorEstado(reserva.estado)}`}>
                {reserva.estado}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-[#64748B]">
                <Calendar className="w-4 h-4" />
                <span>{new Date(reserva.fecha).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#64748B]">
                <Clock className="w-4 h-4" />
                <span>{reserva.hora}</span>
              </div>
              {reserva.plazas && (
                <div className="flex items-center gap-2 text-sm text-[#64748B]">
                  <Users className="w-4 h-4" />
                  <span>{reserva.ocupadas} / {reserva.plazas} plazas</span>
                  <div className="flex-1 ml-2">
                    <div className="bg-[#F1F5F9] rounded-full h-2">
                      <div
                        className="bg-[#6366F1] h-2 rounded-full transition-all duration-200"
                        style={{ width: `${((reserva.ocupadas || 0) / reserva.plazas) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-[#E2E8F0] flex gap-2">
              <button className="flex-1 px-4 py-2 bg-[#F8FAFC] text-[#0F172A] rounded-xl hover:bg-[#F1F5F9] transition-all duration-200 text-sm font-semibold border border-[#E2E8F0]">
                Ver Detalles
              </button>
              <button className="flex-1 px-4 py-2 bg-[#6366F1] text-white rounded-xl hover:bg-[#4F46E5] transition-all duration-200 text-sm font-semibold shadow-md">
                Gestionar
              </button>
            </div>
          </div>
        ))}
      </div>

      {reservasFiltradas.length === 0 && (
        <div className="bg-white rounded-2xl p-12 shadow-md border border-[#E2E8F0] text-center">
          <Calendar className="w-16 h-16 text-[#94A3B8] mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#0F172A] mb-2">No hay reservas</h3>
          <p className="text-[#64748B] mb-6">No se encontraron reservas con los filtros seleccionados</p>
          <button
            onClick={onNuevaReserva}
            className="inline-flex items-center gap-2 bg-[#6366F1] text-white px-6 py-3 rounded-xl hover:bg-[#4F46E5] active:bg-[#4338CA] transition-all duration-200 shadow-md hover:shadow-lg font-semibold"
          >
            <Plus className="w-5 h-5" />
            <span>Crear Primera Reserva</span>
          </button>
        </div>
      )}
    </div>
  );
}

