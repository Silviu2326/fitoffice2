import { Calendar, Clock, MapPin, Video, Users, Search, Filter, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';

interface Reserva {
  id: string;
  cliente: string;
  tipo: 'presencial' | 'videollamada' | 'clase-grupal';
  servicio: string;
  fecha: string;
  hora: string;
  estado: 'completada' | 'cancelada' | 'no-show';
  precio: number;
  notas?: string;
}

export default function HistorialReservas() {
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');

  // Datos de ejemplo
  const reservas: Reserva[] = [
    {
      id: '1',
      cliente: 'Ana García',
      tipo: 'presencial',
      servicio: 'Evaluación Inicial',
      fecha: '2025-10-20',
      hora: '10:00',
      estado: 'completada',
      precio: 50,
      notas: 'Cliente muy satisfecho con la sesión'
    },
    {
      id: '2',
      cliente: 'Carlos Ruiz',
      tipo: 'videollamada',
      servicio: 'Seguimiento Mensual',
      fecha: '2025-10-19',
      hora: '12:00',
      estado: 'completada',
      precio: 40,
    },
    {
      id: '3',
      cliente: 'María López',
      tipo: 'presencial',
      servicio: 'Consulta Rápida',
      fecha: '2025-10-18',
      hora: '16:00',
      estado: 'cancelada',
      precio: 25,
      notas: 'Cliente canceló con 48h de antelación'
    },
    {
      id: '4',
      cliente: 'Pedro Martínez',
      tipo: 'videollamada',
      servicio: 'Planificación Trimestral',
      fecha: '2025-10-17',
      hora: '09:00',
      estado: 'no-show',
      precio: 80,
      notas: 'Cliente no se presentó'
    },
    {
      id: '5',
      cliente: 'Varios',
      tipo: 'clase-grupal',
      servicio: 'Spinning',
      fecha: '2025-10-16',
      hora: '18:00',
      estado: 'completada',
      precio: 200,
    },
  ];

  const reservasFiltradas = reservas.filter((reserva) => {
    const coincideBusqueda = reserva.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
                            reserva.servicio.toLowerCase().includes(busqueda.toLowerCase());
    const coincideEstado = filtroEstado === 'todos' || reserva.estado === filtroEstado;
    const coincideTipo = filtroTipo === 'todos' || reserva.tipo === filtroTipo;
    return coincideBusqueda && coincideEstado && coincideTipo;
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
      case 'completada':
        return 'bg-[#D1FAE5] text-[#10B981] border-[#10B981]';
      case 'cancelada':
        return 'bg-[#FEF3C7] text-[#F59E0B] border-[#F59E0B]';
      case 'no-show':
        return 'bg-[#FEE2E2] text-[#EF4444] border-[#EF4444]';
      default:
        return 'bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0]';
    }
  };

  const getIconoEstado = (estado: string) => {
    switch (estado) {
      case 'completada':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelada':
      case 'no-show':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const totalIngresos = reservasFiltradas
    .filter(r => r.estado === 'completada')
    .reduce((sum, r) => sum + r.precio, 0);

  const totalReservas = reservasFiltradas.length;
  const completadas = reservasFiltradas.filter(r => r.estado === 'completada').length;
  const canceladas = reservasFiltradas.filter(r => r.estado === 'cancelada').length;

  return (
    <div className="space-y-6">
      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-md border border-[#E2E8F0] hover:shadow-lg transition-all duration-200">
          <p className="text-[#64748B] text-sm font-medium">Total Reservas</p>
          <p className="text-3xl font-bold text-[#0F172A] mt-2">{totalReservas}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-md border border-[#E2E8F0] hover:shadow-lg transition-all duration-200">
          <p className="text-[#64748B] text-sm font-medium">Completadas</p>
          <p className="text-3xl font-bold text-[#10B981] mt-2">{completadas}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-md border border-[#E2E8F0] hover:shadow-lg transition-all duration-200">
          <p className="text-[#64748B] text-sm font-medium">Canceladas</p>
          <p className="text-3xl font-bold text-[#F59E0B] mt-2">{canceladas}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-md border border-[#E2E8F0] hover:shadow-lg transition-all duration-200">
          <p className="text-[#64748B] text-sm font-medium">Ingresos</p>
          <p className="text-3xl font-bold text-[#6366F1] mt-2">€{totalIngresos}</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-[#E2E8F0]">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por cliente o servicio..."
              className="w-full pl-10 pr-4 py-3 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="flex gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-[#94A3B8]" />
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200"
              >
                <option value="todos">Todos los estados</option>
                <option value="completada">Completadas</option>
                <option value="cancelada">Canceladas</option>
                <option value="no-show">No-show</option>
              </select>
            </div>

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
        </div>
      </div>

      {/* Tabla de Historial */}
      <div className="bg-white rounded-2xl shadow-md border border-[#E2E8F0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  Servicio
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  Fecha & Hora
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {reservasFiltradas.map((reserva) => (
                <tr key={reserva.id} className="hover:bg-[#F8FAFC] transition-all duration-200">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#F1F5F9] p-2 rounded-xl text-[#6366F1]">
                        {getIconoTipo(reserva.tipo)}
                      </div>
                      <div>
                        <p className="font-semibold text-[#0F172A]">{reserva.cliente}</p>
                        {reserva.notas && (
                          <p className="text-xs text-[#64748B] mt-1">{reserva.notas}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-[#0F172A] font-medium">{reserva.servicio}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-[#64748B]">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(reserva.fecha).toLocaleDateString('es-ES')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#64748B]">
                        <Clock className="w-4 h-4" />
                        <span>{reserva.hora}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[#64748B] capitalize">
                      {reserva.tipo.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getColorEstado(reserva.estado)}`}>
                      {getIconoEstado(reserva.estado)}
                      <span className="capitalize">{reserva.estado.replace('-', ' ')}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-[#0F172A]">€{reserva.precio}</p>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-[#6366F1] hover:text-[#4F46E5] font-semibold text-sm transition-colors duration-200">
                      Ver Detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {reservasFiltradas.length === 0 && (
          <div className="p-12 text-center">
            <Calendar className="w-16 h-16 text-[#94A3B8] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#0F172A] mb-2">No hay reservas</h3>
            <p className="text-[#64748B]">No se encontraron reservas con los filtros seleccionados</p>
          </div>
        )}
      </div>
    </div>
  );
}

