import { Filter, X } from 'lucide-react';

interface FiltrosCategoriaProps {
  activeFilters: {
    grupoMuscular: string;
    equipamiento: string;
    dificultad: string;
    lesiones: string[];
  };
  onFilterChange: (filters: any) => void;
}

export default function FiltrosCategoria({ activeFilters, onFilterChange }: FiltrosCategoriaProps) {
  const gruposMusculares = ['Pecho', 'Espalda', 'Piernas', 'Hombros', 'Brazos', 'Core', 'Cardio'];
  const equipamientos = ['Barra', 'Mancuernas', 'Máquina', 'Peso Corporal', 'Kettlebell', 'TRX', 'Bandas'];
  const dificultades = ['Principiante', 'Intermedio', 'Avanzado'];

  const updateFilter = (key: string, value: string) => {
    onFilterChange({
      ...activeFilters,
      [key]: activeFilters[key as keyof typeof activeFilters] === value ? '' : value
    });
  };

  const clearAllFilters = () => {
    onFilterChange({
      grupoMuscular: '',
      equipamiento: '',
      dificultad: '',
      lesiones: []
    });
  };

  const hasActiveFilters = activeFilters.grupoMuscular || activeFilters.equipamiento || activeFilters.dificultad;

  return (
    <div className="bg-[#1E1E2E] border border-[#334155] rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-[#F1F5F9] flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filtros Avanzados
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-[#94A3B8] hover:text-[#F1F5F9] transition-colors duration-200 ease-out flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Limpiar filtros
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Grupos Musculares */}
        <div>
          <label className="text-sm font-semibold text-[#94A3B8] mb-3 block">
            Grupo Muscular
          </label>
          <div className="flex flex-wrap gap-2">
            {gruposMusculares.map((grupo) => (
              <button
                key={grupo}
                onClick={() => updateFilter('grupoMuscular', grupo)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-out ${
                  activeFilters.grupoMuscular === grupo
                    ? 'bg-[#6366F1] text-white shadow-md'
                    : 'bg-[#2A2A3A] text-[#94A3B8] hover:bg-[#334155] border border-[#334155]'
                }`}
              >
                {grupo}
              </button>
            ))}
          </div>
        </div>

        {/* Equipamiento */}
        <div>
          <label className="text-sm font-semibold text-[#94A3B8] mb-3 block">
            Equipamiento
          </label>
          <div className="flex flex-wrap gap-2">
            {equipamientos.map((equip) => (
              <button
                key={equip}
                onClick={() => updateFilter('equipamiento', equip)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-out ${
                  activeFilters.equipamiento === equip
                    ? 'bg-[#3B82F6] text-white shadow-md'
                    : 'bg-[#2A2A3A] text-[#94A3B8] hover:bg-[#334155] border border-[#334155]'
                }`}
              >
                {equip}
              </button>
            ))}
          </div>
        </div>

        {/* Dificultad */}
        <div>
          <label className="text-sm font-semibold text-[#94A3B8] mb-3 block">
            Dificultad
          </label>
          <div className="flex flex-wrap gap-2">
            {dificultades.map((dif) => (
              <button
                key={dif}
                onClick={() => updateFilter('dificultad', dif)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-out ${
                  activeFilters.dificultad === dif
                    ? 'bg-[#F59E0B] text-white shadow-md'
                    : 'bg-[#2A2A3A] text-[#94A3B8] hover:bg-[#334155] border border-[#334155]'
                }`}
              >
                {dif}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

