import { useState } from 'react';
import { Calendar, Clock, Building2, User, Plus, CheckCircle2, XCircle } from 'lucide-react';
import { type Reserva } from '../api/reservas';

export default function ReservasSalas() {
  const [vistaActual, setVistaActual] = useState<'calendario' | 'lista'>('lista');
  const [filtroEstado, setFiltroEstado] = useState<'todas' | 'pendiente' | 'confirmada'>('todas');

  // Datos de ejemplo
  const reservasMock: Reserva[] = [
    {
      id: '1',
      recursoId: '1',
      recursoNombre: 'Sala de Musculación',
      tipoRecurso: 'sala',
      usuarioId: 'user1',
      usuarioNombre: 'Carlos Martínez',
      fechaInicio: new Date('2025-10-27T09:00:00'),
      fechaFin: new Date('2025-10-27T11:00:00'),
      estado: 'confirmada',
      proposito: 'Clase de Entrenamiento Funcional',
      participantes: 15,
      fechaReserva: new Date('2025-10-20')
    },
    {
      id: '2',
      recursoId: '2',
      recursoNombre: 'Sala de Spinning',
      tipoRecurso: 'sala',
      usuarioId: 'user2',
      usuarioNombre: 'Ana López',
      fechaInicio: new Date('2025-10-27T18:00:00'),
      fechaFin: new Date('2025-10-27T19:00:00'),
      estado: 'confirmada',
      proposito: 'Clase de Spinning Avanzado',
      participantes: 20,
      fechaReserva: new Date('2025-10-22')
    },
    {
      id: '3',
      recursoId: '3',
      recursoNombre: 'Sala de Yoga',
      tipoRecurso: 'sala',
      usuarioId: 'user3',
      usuarioNombre: 'María García',
      fechaInicio: new Date('2025-10-28T10:00:00'),
      fechaFin: new Date('2025-10-28T11:30:00'),
      estado: 'pendiente',
      proposito: 'Clase de Yoga Restaurativo',
      participantes: 12,
      notas: 'Necesita música ambiental y velas',
      fechaReserva: new Date('2025-10-26')
    },
    {
      id: '4',
      recursoId: '5',
      recursoNombre: 'Sala de CrossFit',
      tipoRecurso: 'sala',
      usuarioId: 'user4',
      usuarioNombre: 'Pedro Sánchez',
      fechaInicio: new Date('2025-10-29T07:00:00'),
      fechaFin: new Date('2025-10-29T08:30:00'),
      estado: 'confirmada',
      proposito: 'WOD Matutino',
      participantes: 10,
      fechaReserva: new Date('2025-10-23')
    }
  ];

  const reservasFiltradas = reservasMock.filter(reserva => {
    if (filtroEstado === 'todas') return true;
    return reserva.estado === filtroEstado;
  });

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'confirmada':
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
            <CheckCircle2 className="w-4 h-4" />
            Confirmada
          </span>
        );
      case 'pendiente':
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
            <Clock className="w-4 h-4" />
            Pendiente
          </span>
        );
      case 'cancelada':
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
            <XCircle className="w-4 h-4" />
            Cancelada
          </span>
        );
      default:
        return null;
    }
  };

  const formatFechaHora = (fecha: Date) => {
    return new Date(fecha).toLocaleString('es-ES', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calcularDuracion = (inicio: Date, fin: Date) => {
    const diff = new Date(fin).getTime() - new Date(inicio).getTime();
    const horas = Math.floor(diff / (1000 * 60 * 60));
    const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return horas > 0 ? `${horas}h ${minutos}m` : `${minutos}m`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-[24px] leading-8 font-semibold text-[#0F172A]">Reservas de Salas</h2>
          <p className="text-[#64748B] text-[14px] leading-5 mt-1">Gestiona las reservas de espacios del centro</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#6366F1] text-white rounded-xl font-semibold hover:bg-[#4F46E5] active:bg-[#4338CA] transition-all duration-200"
          style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
          <Plus className="w-5 h-5" />
          Nueva Reserva
        </button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{reservasMock.length}</div>
              <div className="text-sm text-slate-600">Total Reservas</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">
                {reservasMock.filter(r => r.estado === 'confirmada').length}
              </div>
              <div className="text-sm text-slate-600">Confirmadas</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">
                {reservasMock.filter(r => r.estado === 'pendiente').length}
              </div>
              <div className="text-sm text-slate-600">Pendientes</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Building2 className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">
                {new Set(reservasMock.map(r => r.recursoId)).size}
              </div>
              <div className="text-sm text-slate-600">Salas Reservadas</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex gap-2">
        <button
          onClick={() => setFiltroEstado('todas')}
          className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
            filtroEstado === 'todas'
              ? 'bg-[#6366F1] text-white hover:bg-[#4F46E5]'
              : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
          }`}
        >
          Todas
        </button>
        <button
          onClick={() => setFiltroEstado('pendiente')}
          className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
            filtroEstado === 'pendiente'
              ? 'bg-[#6366F1] text-white hover:bg-[#4F46E5]'
              : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
          }`}
        >
          Pendientes
        </button>
        <button
          onClick={() => setFiltroEstado('confirmada')}
          className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
            filtroEstado === 'confirmada'
              ? 'bg-[#6366F1] text-white hover:bg-[#4F46E5]'
              : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
          }`}
        >
          Confirmadas
        </button>
      </div>

      {/* Lista de reservas */}
      <div className="space-y-4">
        {reservasFiltradas.map(reserva => (
          <div
            key={reserva.id}
            className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg text-white">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 mb-1">{reserva.recursoNombre}</h3>
                  <p className="text-slate-600 mb-2">{reserva.proposito}</p>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <User className="w-4 h-4" />
                    <span>Reservado por: <span className="font-medium text-slate-900">{reserva.usuarioNombre}</span></span>
                  </div>
                </div>
              </div>
              {getEstadoBadge(reserva.estado)}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-slate-400" />
                <div>
                  <div className="text-xs text-slate-600">Fecha y hora</div>
                  <div className="font-medium text-slate-900">{formatFechaHora(reserva.fechaInicio)}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-slate-400" />
                <div>
                  <div className="text-xs text-slate-600">Duración</div>
                  <div className="font-medium text-slate-900">
                    {calcularDuracion(reserva.fechaInicio, reserva.fechaFin)}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-slate-400" />
                <div>
                  <div className="text-xs text-slate-600">Participantes</div>
                  <div className="font-medium text-slate-900">{reserva.participantes} personas</div>
                </div>
              </div>
            </div>

            {reserva.notas && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-sm font-medium text-blue-900 mb-1">Notas</div>
                <p className="text-sm text-blue-700">{reserva.notas}</p>
              </div>
            )}

            {reserva.estado === 'pendiente' && (
              <div className="mt-4 flex gap-2">
                <button className="px-4 py-2 bg-[#10B981] text-white rounded-xl hover:bg-[#059669] transition-all duration-200 text-[14px] leading-5 font-semibold">
                  Confirmar Reserva
                </button>
                <button className="px-4 py-2 bg-[#EF4444] text-white rounded-xl hover:bg-[#DC2626] transition-all duration-200 text-[14px] leading-5 font-semibold">
                  Rechazar
                </button>
              </div>
            )}

            {reserva.estado === 'confirmada' && (
              <div className="mt-4 flex gap-2">
                <button className="px-4 py-2 bg-[#64748B] text-white rounded-xl hover:bg-[#475569] transition-all duration-200 text-[14px] leading-5 font-semibold">
                  Editar
                </button>
                <button className="px-4 py-2 bg-[#EF4444] text-white rounded-xl hover:bg-[#DC2626] transition-all duration-200 text-[14px] leading-5 font-semibold">
                  Cancelar Reserva
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {reservasFiltradas.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600 text-lg">No hay reservas {filtroEstado !== 'todas' && filtroEstado + 's'}</p>
        </div>
      )}
    </div>
  );
}

