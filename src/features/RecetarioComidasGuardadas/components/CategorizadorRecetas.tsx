import { useState, useEffect } from 'react';
import { getCategorias, Categoria } from '../api/categorias';

interface CategorizadorRecetasProps {
  onSelectCategoria?: (categoriaId: string) => void;
}

export default function CategorizadorRecetas({ onSelectCategoria }: CategorizadorRecetasProps) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaActiva, setCategoriaActiva] = useState<string | null>(null);

  useEffect(() => {
    loadCategorias();
  }, []);

  const loadCategorias = async () => {
    const data = await getCategorias();
    setCategorias(data);
  };

  const handleSelectCategoria = (categoriaId: string) => {
    const newCategoria = categoriaActiva === categoriaId ? null : categoriaId;
    setCategoriaActiva(newCategoria);
    onSelectCategoria?.(newCategoria || '');
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-[#E2E8F0] p-6">
      <h3 className="text-lg font-bold text-[#0F172A] mb-4">Categorías</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {categorias.map((categoria) => (
          <button
            key={categoria.id}
            onClick={() => handleSelectCategoria(categoria.id)}
            className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200 ease-out ${
              categoriaActiva === categoria.id
                ? 'border-[#6366F1] bg-[#EEF2FF] shadow-md'
                : 'border-[#E2E8F0] hover:border-[#6366F1] hover:bg-[#F8FAFC]'
            }`}
          >
            <span className="text-4xl">{categoria.icono}</span>
            <span className={`text-sm font-semibold ${
              categoriaActiva === categoria.id ? 'text-[#6366F1]' : 'text-[#0F172A]'
            }`}>{categoria.nombre}</span>
            <span className="text-xs text-[#64748B]">{categoria.count} recetas</span>
          </button>
        ))}
      </div>
    </div>
  );
}


