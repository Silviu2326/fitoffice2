import { Dumbbell, Heart, Zap, Flame, Target } from 'lucide-react';

interface Props {
  categoriaActiva: string;
  onCambiarCategoria: (categoria: string) => void;
}

export default function CategorizadorPlantillas({ categoriaActiva, onCambiarCategoria }: Props) {
  const categorias = [
    { id: 'todas', nombre: 'Todas', icono: Target, color: 'slate' },
    { id: 'Fuerza', nombre: 'Fuerza', icono: Dumbbell, color: 'emerald' },
    { id: 'Hipertrofia', nombre: 'Hipertrofia', icono: Flame, color: 'orange' },
    { id: 'Cardio', nombre: 'Cardio', icono: Heart, color: 'red' },
    { id: 'Movilidad', nombre: 'Movilidad', icono: Zap, color: 'blue' },
    { id: 'Funcional', nombre: 'Funcional', icono: Target, color: 'purple' }
  ];

  return (
    <div className="bg-[#1E1E2E] backdrop-blur-sm border border-[#334155] rounded-2xl p-4 shadow-md">
      <div className="flex items-center gap-2 mb-3">
        <Target className="w-4 h-4 text-[#6366F1]" />
        <h3 className="text-sm font-semibold text-[#F1F5F9]">Categorías</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {categorias.map((categoria) => {
          const Icono = categoria.icono;
          const isActive = categoriaActiva === categoria.id;
          return (
            <button
              key={categoria.id}
              onClick={() => onCambiarCategoria(categoria.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-[#6366F1] text-white shadow-md font-semibold'
                  : 'bg-[#2A2A3A] text-[#94A3B8] hover:bg-[#334155] hover:text-[#F1F5F9] border border-[#334155]'
              }`}
            >
              <Icono className="w-4 h-4" />
              <span className="text-sm font-medium">{categoria.nombre}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

