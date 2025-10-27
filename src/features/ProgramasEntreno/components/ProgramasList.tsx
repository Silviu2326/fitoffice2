import { Plus, Search, Filter, Copy, Edit, Trash2, Users } from 'lucide-react';
import { useState } from 'react';

interface Programa {
  id: string;
  nombre: string;
  tipo: 'personalizado' | 'grupal' | 'sala';
  descripcion: string;
  asignados: number;
  duracion: string;
  nivel: 'principiante' | 'intermedio' | 'avanzado';
  categoria: string;
}

interface ProgramasListProps {
  onNuevoPrograma: () => void;
  onEditarPrograma: (programa: Programa) => void;
  onDuplicarPrograma: (programa: Programa) => void;
  onAsignarPrograma: (programa: Programa) => void;
}

export default function ProgramasList({ 
  onNuevoPrograma, 
  onEditarPrograma, 
  onDuplicarPrograma,
  onAsignarPrograma 
}: ProgramasListProps) {
  const [busqueda, setBusqueda] = useState('');
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');

  // Datos de ejemplo
  const programas: Programa[] = [
    {
      id: '1',
      nombre: 'Rutina de Fuerza para Carla',
      tipo: 'personalizado',
      descripcion: 'Programa de fuerza enfocado en tren superior',
      asignados: 1,
      duracion: '8 semanas',
      nivel: 'intermedio',
      categoria: 'Fuerza'
    },
    {
      id: '2',
      nombre: 'Rehab Rodilla Miguel',
      tipo: 'personalizado',
      descripcion: 'Programa de rehabilitación post-operatorio',
      asignados: 1,
      duracion: '12 semanas',
      nivel: 'principiante',
      categoria: 'Rehabilitación'
    },
    {
      id: '3',
      nombre: 'CrossFit WOD Semanal',
      tipo: 'grupal',
      descripcion: 'Programa semanal para clases de CrossFit',
      asignados: 45,
      duracion: '1 semana',
      nivel: 'intermedio',
      categoria: 'CrossFit'
    },
    {
      id: '4',
      nombre: 'Plan de Sala - Hipertrofia',
      tipo: 'sala',
      descripcion: 'Rutina de sala para ganancia muscular',
      asignados: 23,
      duracion: '4 semanas',
      nivel: 'intermedio',
      categoria: 'Hipertrofia'
    }
  ];

  const programasFiltrados = programas.filter(p => {
    const matchBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                         p.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    const matchTipo = filtroTipo === 'todos' || p.tipo === filtroTipo;
    return matchBusqueda && matchTipo;
  });

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'personalizado':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'grupal':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'sala':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case 'principiante':
        return 'text-green-400';
      case 'intermedio':
        return 'text-yellow-400';
      case 'avanzado':
        return 'text-red-400';
      default:
        return 'text-slate-400';
    }
  };

  return (
    <div className="space-y-4">
      {/* Barra de acciones */}
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
            <input
              type="text"
              placeholder="Buscar programas..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full h-10 pl-10 pr-4 py-2 bg-white border border-[#E2E8F0] rounded-xl text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#64748B]" />
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="h-10 px-3 py-2 bg-white border border-[#E2E8F0] rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition-all duration-200"
            >
              <option value="todos">Todos los tipos</option>
              <option value="personalizado">Personalizados</option>
              <option value="grupal">Grupales</option>
              <option value="sala">Planes de Sala</option>
            </select>
          </div>
        </div>
        <button
          onClick={onNuevoPrograma}
          className="flex items-center gap-2 px-4 py-2 bg-[#6366F1] hover:bg-[#4F46E5] active:bg-[#4338CA] text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          Nuevo Programa
        </button>
      </div>

      {/* Lista de programas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {programasFiltrados.map((programa) => (
          <div
            key={programa.id}
            className="bg-white border border-[#E2E8F0] rounded-xl p-6 hover:border-[#6366F1] hover:shadow-lg transition-all duration-200"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-[#0F172A]">{programa.nombre}</h3>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getTipoColor(programa.tipo)}`}>
                    {programa.tipo === 'personalizado' ? 'Personal' : programa.tipo === 'grupal' ? 'Grupal' : 'Sala'}
                  </span>
                </div>
                <p className="text-sm text-[#64748B] mb-3">{programa.descripcion}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div>
                <p className="text-xs text-[#94A3B8] font-medium mb-1">Asignados</p>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-[#6366F1]" />
                  <p className="text-sm font-semibold text-[#0F172A]">{programa.asignados}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-[#94A3B8] font-medium mb-1">Duración</p>
                <p className="text-sm font-semibold text-[#0F172A]">{programa.duracion}</p>
              </div>
              <div>
                <p className="text-xs text-[#94A3B8] font-medium mb-1">Nivel</p>
                <p className={`text-sm font-semibold capitalize ${getNivelColor(programa.nivel)}`}>
                  {programa.nivel}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-[#E2E8F0]">
              <button
                onClick={() => onEditarPrograma(programa)}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] text-[#0F172A] text-sm font-medium rounded-lg transition-all duration-200"
              >
                <Edit className="w-3.5 h-3.5" />
                Editar
              </button>
              <button
                onClick={() => onDuplicarPrograma(programa)}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] text-[#0F172A] text-sm font-medium rounded-lg transition-all duration-200"
              >
                <Copy className="w-3.5 h-3.5" />
                Duplicar
              </button>
              <button
                onClick={() => onAsignarPrograma(programa)}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#6366F1] hover:bg-[#4F46E5] text-white text-sm font-semibold rounded-lg shadow-sm transition-all duration-200"
              >
                <Users className="w-3.5 h-3.5" />
                Asignar
              </button>
              <button className="ml-auto p-1.5 text-[#EF4444] hover:bg-[#FEE2E2] rounded-lg transition-all duration-200">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {programasFiltrados.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#64748B]">No se encontraron programas</p>
        </div>
      )}
    </div>
  );
}

