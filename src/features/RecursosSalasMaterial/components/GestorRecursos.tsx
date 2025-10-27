import { useState } from 'react';
import { Plus, Building2, Package, Search, Filter } from 'lucide-react';
import { type Recurso } from '../api/recursos';

interface GestorRecursosProps {
  onCrearRecurso: () => void;
  onEditarRecurso: (recurso: Recurso) => void;
}

export default function GestorRecursos({ onCrearRecurso, onEditarRecurso }: GestorRecursosProps) {
  const [filtroTipo, setFiltroTipo] = useState<'todos' | 'sala' | 'material'>('todos');
  const [busqueda, setBusqueda] = useState('');

  // Datos de ejemplo
  const recursosMock: Recurso[] = [
    {
      id: '1',
      nombre: 'Sala de Musculación Principal',
      tipo: 'sala',
      estado: 'disponible',
      categoria: 'Musculación',
      aforo: 50,
      ubicacion: 'Planta 1',
      fechaCreacion: new Date('2024-01-15')
    },
    {
      id: '2',
      nombre: 'Sala de Spinning',
      tipo: 'sala',
      estado: 'en_uso',
      categoria: 'Cardio',
      aforo: 20,
      ubicacion: 'Planta 2',
      fechaCreacion: new Date('2024-01-15')
    },
    {
      id: '3',
      nombre: 'Bicicletas Estáticas',
      tipo: 'material',
      estado: 'disponible',
      categoria: 'Cardio',
      ubicacion: 'Sala de Spinning',
      fechaCreacion: new Date('2024-01-20')
    },
    {
      id: '4',
      nombre: 'Esterillas de Yoga',
      tipo: 'material',
      estado: 'disponible',
      categoria: 'Yoga',
      ubicacion: 'Sala de Yoga',
      fechaCreacion: new Date('2024-01-20')
    },
    {
      id: '5',
      nombre: 'Sala de Boxeo',
      tipo: 'sala',
      estado: 'mantenimiento',
      categoria: 'Boxeo',
      aforo: 15,
      ubicacion: 'Planta 3',
      fechaCreacion: new Date('2024-02-01')
    }
  ];

  const recursosFiltrados = recursosMock.filter(recurso => {
    const coincideTipo = filtroTipo === 'todos' || recurso.tipo === filtroTipo;
    const coincideBusqueda = recurso.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                             recurso.categoria?.toLowerCase().includes(busqueda.toLowerCase());
    return coincideTipo && coincideBusqueda;
  });

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'disponible':
        return 'bg-emerald-100 text-emerald-700';
      case 'en_uso':
        return 'bg-blue-100 text-blue-700';
      case 'mantenimiento':
        return 'bg-amber-100 text-amber-700';
      case 'bloqueado':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getEstadoTexto = (estado: string) => {
    switch (estado) {
      case 'disponible':
        return 'Disponible';
      case 'en_uso':
        return 'En Uso';
      case 'mantenimiento':
        return 'Mantenimiento';
      case 'bloqueado':
        return 'Bloqueado';
      default:
        return estado;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header con acciones */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-[24px] leading-8 font-semibold text-[#0F172A]">Gestión de Recursos</h2>
          <p className="text-[#64748B] text-[14px] leading-5 mt-1">Administra salas y material del centro</p>
        </div>
        <button
          onClick={onCrearRecurso}
          className="flex items-center gap-2 px-6 py-3 bg-[#6366F1] text-white rounded-xl font-semibold hover:bg-[#4F46E5] active:bg-[#4338CA] transition-all duration-200"
          style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
        >
          <Plus className="w-5 h-5" />
          Nuevo Recurso
        </button>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Buscar recursos..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full h-12 pl-10 pr-4 py-2 border border-[#E2E8F0] rounded-xl text-[16px] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFiltroTipo('todos')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
                filtroTipo === 'todos'
                  ? 'bg-[#6366F1] text-white hover:bg-[#4F46E5]'
                  : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
              }`}
            >
              <Filter className="w-4 h-4" />
              Todos
            </button>
            <button
              onClick={() => setFiltroTipo('sala')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
                filtroTipo === 'sala'
                  ? 'bg-[#6366F1] text-white hover:bg-[#4F46E5]'
                  : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
              }`}
            >
              <Building2 className="w-4 h-4" />
              Salas
            </button>
            <button
              onClick={() => setFiltroTipo('material')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
                filtroTipo === 'material'
                  ? 'bg-[#6366F1] text-white hover:bg-[#4F46E5]'
                  : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
              }`}
            >
              <Package className="w-4 h-4" />
              Material
            </button>
          </div>
        </div>
      </div>

      {/* Lista de recursos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recursosFiltrados.map(recurso => (
          <div
            key={recurso.id}
            onClick={() => onEditarRecurso(recurso)}
            className="bg-white rounded-2xl border border-[#E2E8F0] p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            style={{ boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                {recurso.tipo === 'sala' ? (
                  <div className="p-3 bg-[#DBEAFE] rounded-xl">
                    <Building2 className="w-5 h-5 text-[#3B82F6]" />
                  </div>
                ) : (
                  <div className="p-3 bg-[#F3E8FF] rounded-xl">
                    <Package className="w-5 h-5 text-[#A855F7]" />
                  </div>
                )}
              </div>
              <span className={`px-3 py-1 rounded-full text-[12px] leading-4 font-medium ${getEstadoColor(recurso.estado)}`}>
                {getEstadoTexto(recurso.estado)}
              </span>
            </div>

            <h3 className="font-semibold text-[18px] leading-7 text-[#0F172A] mb-1">{recurso.nombre}</h3>
            <p className="text-[14px] leading-5 text-[#64748B] mb-4">{recurso.categoria}</p>

            <div className="space-y-2 text-[14px] leading-5">
              {recurso.ubicacion && (
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Ubicación:</span>
                  <span className="font-medium text-[#0F172A]">{recurso.ubicacion}</span>
                </div>
              )}
              {recurso.aforo && (
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Aforo:</span>
                  <span className="font-medium text-[#0F172A]">{recurso.aforo} personas</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {recursosFiltrados.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-[#CBD5E1] mx-auto mb-4" />
          <p className="text-[#64748B] text-[18px] leading-7">No se encontraron recursos</p>
        </div>
      )}
    </div>
  );
}

