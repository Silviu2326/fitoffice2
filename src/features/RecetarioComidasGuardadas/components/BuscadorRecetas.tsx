import { useState } from 'react';
import { Search, X } from 'lucide-react';

interface BuscadorRecetasProps {
  onBuscar?: (filtros: any) => void;
}

export default function BuscadorRecetas({ onBuscar }: BuscadorRecetasProps) {
  const [termino, setTermino] = useState('');
  const [tagsSeleccionados, setTagsSeleccionados] = useState<string[]>([]);

  const tagsDisponibles = [
    'Alto en proteína',
    'Bajo en carbohidratos',
    'Vegetariano',
    'Vegano',
    'Sin gluten',
    'Sin lactosa',
    'Keto',
    'Paleo',
    'Bajo en calorías',
    'Fitness',
  ];

  const handleToggleTag = (tag: string) => {
    const nuevos = tagsSeleccionados.includes(tag)
      ? tagsSeleccionados.filter(t => t !== tag)
      : [...tagsSeleccionados, tag];
    setTagsSeleccionados(nuevos);
  };

  const handleBuscar = () => {
    onBuscar?.({
      termino,
      tags: tagsSeleccionados,
    });
  };

  const handleLimpiar = () => {
    setTermino('');
    setTagsSeleccionados([]);
    onBuscar?.({
      termino: '',
      tags: [],
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-[#E2E8F0] p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Search className="w-6 h-6 text-[#6366F1]" />
        <h3 className="text-xl font-bold text-[#0F172A]">Buscar Recetas</h3>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#0F172A] mb-2">
          Buscar por nombre o descripción
        </label>
        <div className="relative">
          <input
            type="text"
            value={termino}
            onChange={(e) => setTermino(e.target.value)}
            placeholder="Ej: Pollo, ensalada, proteína..."
            className="w-full h-12 px-4 py-3 pr-10 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 ease-out"
            onKeyDown={(e) => e.key === 'Enter' && handleBuscar()}
          />
          {termino && (
            <button
              onClick={() => setTermino('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0F172A] transition-colors duration-200 ease-out"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#0F172A] mb-3">
          Filtrar por etiquetas
        </label>
        <div className="flex flex-wrap gap-2">
          {tagsDisponibles.map((tag) => (
            <button
              key={tag}
              onClick={() => handleToggleTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ease-out ${
                tagsSeleccionados.includes(tag)
                  ? 'bg-[#6366F1] text-white shadow-md hover:bg-[#4F46E5]'
                  : 'bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0] hover:border-[#6366F1] hover:bg-[#EEF2FF]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-4 border-t border-[#E2E8F0]">
        <button
          onClick={handleBuscar}
          className="flex-1 bg-[#6366F1] text-white py-3 rounded-xl hover:bg-[#4F46E5] active:bg-[#4338CA] transition-all duration-200 ease-out font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          <Search className="w-5 h-5" />
          Buscar
        </button>
        <button
          onClick={handleLimpiar}
          className="px-6 bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] py-3 rounded-xl hover:bg-[#F1F5F9] transition-all duration-200 ease-out font-semibold"
        >
          Limpiar
        </button>
      </div>

      {(termino || tagsSeleccionados.length > 0) && (
        <div className="bg-[#EEF2FF] border border-[#6366F1] rounded-xl p-4">
          <p className="text-sm text-[#0F172A] font-semibold mb-2">
            Filtros activos:
          </p>
          {termino && (
            <p className="text-sm text-[#64748B]">
              <strong>Búsqueda:</strong> {termino}
            </p>
          )}
          {tagsSeleccionados.length > 0 && (
            <p className="text-sm text-[#64748B]">
              <strong>Etiquetas:</strong> {tagsSeleccionados.join(', ')}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

