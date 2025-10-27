import { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, User, Calendar, DollarSign, CheckCircle, XCircle, Clock } from 'lucide-react';

interface Suscripcion {
  id: string;
  clienteNombre: string;
  plan: string;
  tipo: 'PT' | 'Gimnasio' | 'Servicio';
  precio: number;
  sesionesDisponibles?: number;
  sesionesTotales?: number;
  estado: 'activa' | 'pausada' | 'vencida' | 'cancelada';
  fechaInicio: string;
  fechaRenovacion: string;
}

export default function SuscripcionesManager() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState<string>('todas');
  const [filterTipo, setFilterTipo] = useState<string>('todos');

  // Datos de ejemplo
  const suscripciones: Suscripcion[] = [
    {
      id: '1',
      clienteNombre: 'Juan García',
      plan: '4 Sesiones PT/Mes',
      tipo: 'PT',
      precio: 120,
      sesionesDisponibles: 3,
      sesionesTotales: 4,
      estado: 'activa',
      fechaInicio: '2025-01-01',
      fechaRenovacion: '2025-11-01'
    },
    {
      id: '2',
      clienteNombre: 'María López',
      plan: 'Membresía Premium',
      tipo: 'Gimnasio',
      precio: 59,
      estado: 'activa',
      fechaInicio: '2025-03-15',
      fechaRenovacion: '2025-11-15'
    },
    {
      id: '3',
      clienteNombre: 'Carlos Ruiz',
      plan: '8 Sesiones PT/Mes',
      tipo: 'PT',
      precio: 200,
      sesionesDisponibles: 0,
      sesionesTotales: 8,
      estado: 'activa',
      fechaInicio: '2025-02-10',
      fechaRenovacion: '2025-11-10'
    },
    {
      id: '4',
      clienteNombre: 'Ana Martínez',
      plan: 'Membresía Básica',
      tipo: 'Gimnasio',
      precio: 39,
      estado: 'pausada',
      fechaInicio: '2025-01-20',
      fechaRenovacion: '2025-12-20'
    },
    {
      id: '5',
      clienteNombre: 'Pedro Sánchez',
      plan: '12 Sesiones PT/Mes',
      tipo: 'PT',
      precio: 280,
      sesionesDisponibles: 10,
      sesionesTotales: 12,
      estado: 'activa',
      fechaInicio: '2025-04-01',
      fechaRenovacion: '2025-11-01'
    }
  ];

  const getEstadoBadge = (estado: Suscripcion['estado']) => {
    const badges = {
      activa: { color: 'bg-[#D1FAE5] text-[#10B981] border-[#10B981]/20', icon: CheckCircle, label: 'Activa' },
      pausada: { color: 'bg-[#FEF3C7] text-[#F59E0B] border-[#F59E0B]/20', icon: Clock, label: 'Pausada' },
      vencida: { color: 'bg-[#FEE2E2] text-[#EF4444] border-[#EF4444]/20', icon: XCircle, label: 'Vencida' },
      cancelada: { color: 'bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0]', icon: XCircle, label: 'Cancelada' }
    };
    const badge = badges[estado];
    const Icon = badge.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${badge.color}`}>
        <Icon className="w-3 h-3" />
        {badge.label}
      </span>
    );
  };

  const filteredSuscripciones = suscripciones.filter(sub => {
    const matchesSearch = sub.clienteNombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sub.plan.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEstado = filterEstado === 'todas' || sub.estado === filterEstado;
    const matchesTipo = filterTipo === 'todos' || sub.tipo === filterTipo;
    return matchesSearch && matchesEstado && matchesTipo;
  });

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748B] w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por cliente o plan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-[#E2E8F0] rounded-xl text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all"
          />
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748B] w-4 h-4" />
            <select
              value={filterEstado}
              onChange={(e) => setFilterEstado(e.target.value)}
              className="pl-9 pr-8 py-3 bg-white border border-[#E2E8F0] rounded-xl text-[#0F172A] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all"
            >
              <option value="todas">Todos los estados</option>
              <option value="activa">Activas</option>
              <option value="pausada">Pausadas</option>
              <option value="vencida">Vencidas</option>
              <option value="cancelada">Canceladas</option>
            </select>
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748B] w-4 h-4" />
            <select
              value={filterTipo}
              onChange={(e) => setFilterTipo(e.target.value)}
              className="pl-9 pr-8 py-3 bg-white border border-[#E2E8F0] rounded-xl text-[#0F172A] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all"
            >
              <option value="todos">Todos los tipos</option>
              <option value="PT">PT</option>
              <option value="Gimnasio">Gimnasio</option>
              <option value="Servicio">Servicio</option>
            </select>
          </div>
          <button className="px-6 py-3 bg-[#6366F1] text-white rounded-xl font-semibold hover:bg-[#4F46E5] active:bg-[#4338CA] transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg">
            <Plus className="w-4 h-4" />
            Nueva Suscripción
          </button>
        </div>
      </div>

      {/* Suscripciones Table */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  Sesiones
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  Renovación
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filteredSuscripciones.map((sub) => (
                <tr key={sub.id} className="hover:bg-[#F8FAFC] transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] p-2 rounded-lg shadow-sm">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-[#0F172A] font-semibold">{sub.clienteNombre}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-[#64748B] font-medium">{sub.plan}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 bg-[#DBEAFE] text-[#3B82F6] rounded-full text-xs font-semibold">
                      {sub.tipo}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1 text-[#10B981] font-semibold">
                      <DollarSign className="w-4 h-4" />
                      €{sub.precio}/mes
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {sub.tipo === 'PT' && sub.sesionesDisponibles !== undefined ? (
                      <div className="text-[#64748B]">
                        <span className={sub.sesionesDisponibles === 0 ? 'text-[#EF4444] font-semibold' : 'text-[#0F172A] font-semibold'}>
                          {sub.sesionesDisponibles}
                        </span>
                        <span className="text-[#94A3B8]"> / {sub.sesionesTotales}</span>
                      </div>
                    ) : (
                      <span className="text-[#94A3B8]">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getEstadoBadge(sub.estado)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-[#64748B]">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">{new Date(sub.fechaRenovacion).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="text-[#64748B] hover:text-[#6366F1] transition-colors duration-200">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredSuscripciones.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-[#E2E8F0]">
          <div className="bg-[#F8FAFC] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-[#94A3B8]" />
          </div>
          <h3 className="text-[#0F172A] text-lg font-semibold mb-2">No se encontraron suscripciones</h3>
          <p className="text-[#64748B]">Intenta ajustar los filtros de búsqueda</p>
        </div>
      )}
    </div>
  );
}
