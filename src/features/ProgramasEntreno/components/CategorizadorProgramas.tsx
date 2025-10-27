import { Filter } from 'lucide-react';

interface Categoria {
  id: string;
  nombre: string;
  count: number;
  color: string;
}

interface CategorizadorProgramasProps {
  categoriaActiva: string;
  onCambiarCategoria: (categoria: string) => void;
}

export default function CategorizadorProgramas({ 
  categoriaActiva, 
  onCambiarCategoria 
}: CategorizadorProgramasProps) {
  const categorias: Categoria[] = [
    { id: 'todas', nombre: 'Todas', count: 15, color: 'slate' },
    { id: 'fuerza', nombre: 'Fuerza', count: 5, color: 'red' },
    { id: 'hipertrofia', nombre: 'Hipertrofia', count: 4, color: 'purple' },
    { id: 'resistencia', nombre: 'Resistencia', count: 2, color: 'blue' },
    { id: 'crossfit', nombre: 'CrossFit', count: 3, color: 'orange' },
    { id: 'rehabilitacion', nombre: 'Rehabilitación', count: 1, color: 'green' }
  ];

  const getColorClasses = (color: string, isActive: boolean) => {
    const colors: Record<string, { bg: string; text: string; border: string; activeBg: string }> = {
      slate: {
        bg: 'bg-slate-500/20',
        text: 'text-slate-400',
        border: 'border-slate-500/30',
        activeBg: 'bg-slate-500'
      },
      red: {
        bg: 'bg-red-500/20',
        text: 'text-red-400',
        border: 'border-red-500/30',
        activeBg: 'bg-red-500'
      },
      purple: {
        bg: 'bg-purple-500/20',
        text: 'text-purple-400',
        border: 'border-purple-500/30',
        activeBg: 'bg-purple-500'
      },
      blue: {
        bg: 'bg-blue-500/20',
        text: 'text-blue-400',
        border: 'border-blue-500/30',
        activeBg: 'bg-blue-500'
      },
      orange: {
        bg: 'bg-orange-500/20',
        text: 'text-orange-400',
        border: 'border-orange-500/30',
        activeBg: 'bg-orange-500'
      },
      green: {
        bg: 'bg-green-500/20',
        text: 'text-green-400',
        border: 'border-green-500/30',
        activeBg: 'bg-green-500'
      }
    };

    const colorSet = colors[color] || colors.slate;
    
    if (isActive) {
      return `${colorSet.activeBg} text-white border-transparent`;
    }
    return `${colorSet.bg} ${colorSet.text} ${colorSet.border} hover:${colorSet.activeBg} hover:text-white hover:border-transparent`;
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-4 h-4 text-[#64748B]" />
        <h3 className="text-sm font-semibold text-[#0F172A]">Filtrar por Categoría</h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {categorias.map((categoria) => {
          const isActive = categoriaActiva === categoria.id;
          return (
            <button
              key={categoria.id}
              onClick={() => onCambiarCategoria(categoria.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border font-medium transition-all duration-200 ${
                isActive 
                  ? 'bg-[#6366F1] text-white border-[#6366F1] shadow-sm' 
                  : 'bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0] hover:border-[#6366F1] hover:text-[#6366F1] hover:bg-[#EEF2FF]'
              }`}
            >
              <span className="text-sm">{categoria.nombre}</span>
              <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                isActive 
                  ? 'bg-white/20 text-white' 
                  : 'bg-[#E2E8F0] text-[#64748B]'
              }`}>
                {categoria.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

