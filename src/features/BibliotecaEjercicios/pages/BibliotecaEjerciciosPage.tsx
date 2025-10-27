import { useState } from 'react';
import { BookOpen, Search, Filter, Star, Play, AlertTriangle, Plus } from 'lucide-react';
import BibliotecaEjercicios from '../components/BibliotecaEjercicios';
import VisorEjercicio from '../components/VisorEjercicio';
import BuscadorEjercicios from '../components/BuscadorEjercicios';
import FiltrosCategoria from '../components/FiltrosCategoria';

export default function BibliotecaEjerciciosPage() {
  const [selectedEjercicio, setSelectedEjercicio] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    grupoMuscular: '',
    equipamiento: '',
    dificultad: '',
    lesiones: []
  });
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="flex-1 overflow-auto bg-[#0F0F23]">
      {/* Header */}
      <div className="bg-[#1E1E2E] border-b border-[#334155] sticky top-0 z-10">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-[#6366F1] p-3 rounded-2xl shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#F1F5F9]">Biblioteca de Ejercicios</h1>
                <p className="text-[#94A3B8] mt-1">
                  📚 Catálogo completo de ejercicios con vídeos y guías de ejecución
                </p>
              </div>
            </div>
            <button className="bg-[#6366F1] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#4F46E5] active:bg-[#4338CA] transition-all duration-200 ease-out flex items-center gap-2 shadow-md hover:shadow-lg">
              <Plus className="w-5 h-5" />
              Crear Ejercicio
            </button>
          </div>

          {/* Barra de búsqueda */}
          <div className="flex gap-4">
            <BuscadorEjercicios 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ease-out flex items-center gap-2 ${
                showFilters 
                  ? 'bg-[#6366F1] text-white shadow-md' 
                  : 'bg-[#2A2A3A] text-[#94A3B8] hover:bg-[#334155] border border-[#334155]'
              }`}
            >
              <Filter className="w-5 h-5" />
              Filtros
            </button>
          </div>

          {/* Filtros desplegables */}
          {showFilters && (
            <div className="mt-4">
              <FiltrosCategoria 
                activeFilters={activeFilters}
                onFilterChange={setActiveFilters}
              />
            </div>
          )}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de ejercicios */}
          <div className="lg:col-span-2">
            <BibliotecaEjercicios 
              searchTerm={searchTerm}
              filters={activeFilters}
              onSelectEjercicio={setSelectedEjercicio}
            />
          </div>

          {/* Visor de ejercicio */}
          <div className="lg:col-span-1">
            <VisorEjercicio ejercicio={selectedEjercicio} />
          </div>
        </div>
      </div>
    </div>
  );
}

