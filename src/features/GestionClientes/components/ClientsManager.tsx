import { useState } from 'react';
import { Plus, Search, Users, UserCheck, AlertTriangle, UserX, Phone, Mail, Calendar } from 'lucide-react';

interface Cliente {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  estado: 'activo' | 'riesgo' | 'perdido';
  planActual: string;
  fechaInicio: string;
  ultimaActividad: string;
  adherencia: number;
}

export default function ClientsManager() {
  const [clientes, setClientes] = useState<Cliente[]>([
    {
      id: '1',
      nombre: 'Carlos Pérez',
      email: 'carlos@email.com',
      telefono: '+34 666 111 222',
      estado: 'activo',
      planActual: 'Plan Premium',
      fechaInicio: '2025-01-15',
      ultimaActividad: '2025-10-25',
      adherencia: 95
    },
    {
      id: '2',
      nombre: 'Laura González',
      email: 'laura@email.com',
      telefono: '+34 677 222 333',
      estado: 'riesgo',
      planActual: 'Plan Estándar',
      fechaInicio: '2025-03-20',
      ultimaActividad: '2025-10-10',
      adherencia: 45
    },
    {
      id: '3',
      nombre: 'Miguel Ruiz',
      email: 'miguel@email.com',
      telefono: '+34 688 333 444',
      estado: 'activo',
      planActual: 'Plan Premium',
      fechaInicio: '2025-02-10',
      ultimaActividad: '2025-10-24',
      adherencia: 88
    },
    {
      id: '4',
      nombre: 'Ana Martínez',
      email: 'ana@email.com',
      telefono: '+34 699 444 555',
      estado: 'perdido',
      planActual: 'Plan Básico',
      fechaInicio: '2024-12-01',
      ultimaActividad: '2025-09-15',
      adherencia: 20
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState<string>('todos');

  const filteredClientes = clientes.filter(cliente => {
    const matchesSearch = cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cliente.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterEstado === 'todos' || cliente.estado === filterEstado;
    return matchesSearch && matchesFilter;
  });

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'activo':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'riesgo':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'perdido':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'activo':
        return <UserCheck className="w-4 h-4" />;
      case 'riesgo':
        return <AlertTriangle className="w-4 h-4" />;
      case 'perdido':
        return <UserX className="w-4 h-4" />;
      default:
        return <Users className="w-4 h-4" />;
    }
  };

  const getAdherenciaColor = (adherencia: number) => {
    if (adherencia >= 80) return 'text-emerald-600';
    if (adherencia >= 50) return 'text-amber-600';
    return 'text-red-600';
  };

  const estadisticas = {
    total: clientes.length,
    activos: clientes.filter(c => c.estado === 'activo').length,
    riesgo: clientes.filter(c => c.estado === 'riesgo').length,
    perdidos: clientes.filter(c => c.estado === 'perdido').length
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      {/* Header con estadísticas */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Gestor de Clientes</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
            <Plus className="w-5 h-5" />
            Nuevo Cliente
          </button>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Total Clientes</p>
                <p className="text-xl font-bold text-slate-900">{estadisticas.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-600 p-2 rounded-lg">
                <UserCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Clientes Activos</p>
                <p className="text-xl font-bold text-slate-900">{estadisticas.activos}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="bg-amber-600 p-2 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600">En Riesgo</p>
                <p className="text-xl font-bold text-slate-900">{estadisticas.riesgo}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="bg-red-600 p-2 rounded-lg">
                <UserX className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Clientes Perdidos</p>
                <p className="text-xl font-bold text-slate-900">{estadisticas.perdidos}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros y búsqueda */}
        <div className="mt-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar clientes por nombre o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <select
            value={filterEstado}
            onChange={(e) => setFilterEstado(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="todos">Todos los estados</option>
            <option value="activo">Activos</option>
            <option value="riesgo">En Riesgo</option>
            <option value="perdido">Perdidos</option>
          </select>
        </div>
      </div>

      {/* Lista de clientes */}
      <div className="p-6">
        <div className="space-y-4">
          {filteredClientes.map((cliente) => (
            <div
              key={cliente.id}
              className="flex items-start justify-between p-5 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors border border-slate-200"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-lg font-semibold text-slate-900">{cliente.nombre}</h3>
                  <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getEstadoColor(cliente.estado)}`}>
                    {getEstadoIcon(cliente.estado)}
                    {cliente.estado.toUpperCase()}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 border border-blue-200 rounded-full text-xs font-medium">
                    {cliente.planActual}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{cliente.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{cliente.telefono}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Desde: {new Date(cliente.fechaInicio).toLocaleDateString('es-ES')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Última: {new Date(cliente.ultimaActividad).toLocaleDateString('es-ES')}</span>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-600">Adherencia:</span>
                    <div className="flex-1 max-w-xs bg-slate-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          cliente.adherencia >= 80 ? 'bg-emerald-600' : 
                          cliente.adherencia >= 50 ? 'bg-amber-600' : 'bg-red-600'
                        }`}
                        style={{ width: `${cliente.adherencia}%` }}
                      />
                    </div>
                    <span className={`text-sm font-semibold ${getAdherenciaColor(cliente.adherencia)}`}>
                      {cliente.adherencia}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="ml-4">
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium">
                  Ver Perfil 360º
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

