import { useState } from 'react';
import { Search, Filter } from 'lucide-react';

interface Props {
  onBuscar: (termino: string) => void;
}

export default function BuscadorPlantillas({ onBuscar }: Props) {
  const [termino, setTermino] = useState('');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const handleBuscar = (e: React.FormEvent) => {
    e.preventDefault();
    onBuscar(termino);
  };

  return (
    <div className="bg-[#1E1E2E] backdrop-blur-sm border border-[#334155] rounded-2xl p-4 shadow-md">
      <form onSubmit={handleBuscar} className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
          <input
            type="text"
            value={termino}
            onChange={(e) => setTermino(e.target.value)}
            placeholder="Buscar plantillas por nombre, categoría o ejercicios..."
            className="w-full pl-10 pr-4 py-3 bg-[#0F0F23] border border-[#334155] rounded-xl text-[#F1F5F9] placeholder-[#64748B] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200"
          />
        </div>
        <button
          type="button"
          onClick={() => setMostrarFiltros(!mostrarFiltros)}
          className={`px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-2 font-semibold ${
            mostrarFiltros
              ? 'bg-[#6366F1] text-white shadow-md'
              : 'bg-[#2A2A3A] text-[#94A3B8] hover:bg-[#334155] hover:text-[#F1F5F9] border border-[#334155]'
          }`}
        >
          <Filter className="w-5 h-5" />
          <span className="hidden md:inline">Filtros</span>
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-[#6366F1] text-white rounded-xl hover:bg-[#4F46E5] active:bg-[#4338CA] transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
        >
          Buscar
        </button>
      </form>

      {/* Filtros Avanzados */}
      {mostrarFiltros && (
        <div className="mt-4 pt-4 border-t border-[#334155]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#94A3B8] mb-2">
                Nivel
              </label>
              <select className="w-full px-4 py-3 bg-[#0F0F23] border border-[#334155] rounded-xl text-[#F1F5F9] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200">
                <option value="">Todos los niveles</option>
                <option value="principiante">Principiante</option>
                <option value="intermedio">Intermedio</option>
                <option value="avanzado">Avanzado</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#94A3B8] mb-2">
                Duración
              </label>
              <select className="w-full px-4 py-3 bg-[#0F0F23] border border-[#334155] rounded-xl text-[#F1F5F9] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200">
                <option value="">Todas las duraciones</option>
                <option value="corto">Menos de 4 semanas</option>
                <option value="medio">4-8 semanas</option>
                <option value="largo">Más de 8 semanas</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#94A3B8] mb-2">
                Ordenar por
              </label>
              <select className="w-full px-4 py-3 bg-[#0F0F23] border border-[#334155] rounded-xl text-[#F1F5F9] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200">
                <option value="nombre">Nombre</option>
                <option value="usos">Más usadas</option>
                <option value="efectividad">Efectividad</option>
                <option value="reciente">Más recientes</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

