import { useState, useEffect } from 'react';
import { Clock, Users, Star, TrendingUp, Flame, Eye } from 'lucide-react';
import { Receta, getRecetas } from '../api/recetas';
import { toggleFavorito } from '../api/favoritos';

interface RecetarioListProps {
  filtros?: {
    categoria?: string;
    termino?: string;
    tags?: string[];
  };
  onSelectReceta?: (receta: Receta) => void;
}

export default function RecetarioList({ filtros, onSelectReceta }: RecetarioListProps) {
  const [recetas, setRecetas] = useState<Receta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecetas();
  }, [filtros]);

  const loadRecetas = async () => {
    setLoading(true);
    try {
      let data = await getRecetas();
      
      if (filtros?.categoria) {
        data = data.filter(r => r.categoria === filtros.categoria);
      }
      
      if (filtros?.termino) {
        const terminoLower = filtros.termino.toLowerCase();
        data = data.filter(r => 
          r.nombre.toLowerCase().includes(terminoLower) ||
          r.descripcion.toLowerCase().includes(terminoLower)
        );
      }
      
      if (filtros?.tags && filtros.tags.length > 0) {
        data = data.filter(r => 
          filtros.tags!.some(tag => r.tags.includes(tag))
        );
      }
      
      setRecetas(data);
    } catch (error) {
      console.error('Error al cargar recetas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorito = async (recetaId: string) => {
    try {
      await toggleFavorito(recetaId);
      setRecetas(recetas.map(r => 
        r.id === recetaId ? { ...r, favorito: !r.favorito } : r
      ));
    } catch (error) {
      console.error('Error al marcar favorito:', error);
    }
  };

  const getDificultadColor = (dificultad: string) => {
    switch (dificultad) {
      case 'facil': return 'text-[#10B981] bg-[#D1FAE5]';
      case 'media': return 'text-[#F59E0B] bg-[#FEF3C7]';
      case 'dificil': return 'text-[#EF4444] bg-[#FEE2E2]';
      default: return 'text-[#64748B] bg-[#F1F5F9]';
    }
  };

  const getCategoriaEmoji = (categoria: string) => {
    const emojis: Record<string, string> = {
      desayuno: '🌅',
      almuerzo: '☕',
      comida: '🍽️',
      merienda: '🍪',
      cena: '🌙',
      snack: '🥜',
    };
    return emojis[categoria] || '🍴';
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-2xl shadow-md border border-[#E2E8F0] overflow-hidden animate-pulse">
            <div className="h-48 bg-gradient-to-br from-[#E2E8F0] to-[#CBD5E1]"></div>
            <div className="p-5 space-y-3">
              <div className="h-6 bg-[#E2E8F0] rounded w-3/4"></div>
              <div className="h-4 bg-[#F1F5F9] rounded w-full"></div>
              <div className="h-4 bg-[#F1F5F9] rounded w-5/6"></div>
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="h-4 bg-[#E2E8F0] rounded"></div>
                <div className="h-4 bg-[#E2E8F0] rounded"></div>
                <div className="h-4 bg-[#E2E8F0] rounded"></div>
              </div>
              <div className="h-20 bg-[#F8FAFC] rounded-xl mt-4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recetas.map((receta) => (
        <div
          key={receta.id}
          className="bg-white rounded-2xl shadow-md border border-[#E2E8F0] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 ease-out overflow-hidden group cursor-pointer"
          onClick={() => onSelectReceta?.(receta)}
        >
          <div className="h-48 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] relative overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-white text-6xl">
              {getCategoriaEmoji(receta.categoria)}
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleToggleFavorito(receta.id);
              }}
              className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all duration-200 ease-out"
            >
              <Star
                className={`w-5 h-5 ${
                  receta.favorito 
                    ? 'fill-[#F59E0B] text-[#F59E0B]' 
                    : 'text-[#94A3B8]'
                }`}
              />
            </button>

            <div className="absolute bottom-3 left-3">
              <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-semibold text-[#0F172A] capitalize">
                {receta.categoria}
              </span>
            </div>
          </div>

          <div className="p-5">
            <h3 className="text-lg font-bold text-[#0F172A] mb-2 group-hover:text-[#6366F1] transition-colors duration-200 ease-out">
              {receta.nombre}
            </h3>
            <p className="text-sm text-[#64748B] mb-4 line-clamp-2">
              {receta.descripcion}
            </p>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                <Clock className="w-4 h-4" />
                <span>{receta.tiempo_preparacion} min</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                <Users className="w-4 h-4" />
                <span>{receta.porciones} porc.</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                <TrendingUp className="w-4 h-4" />
                <span>{receta.veces_usado} usos</span>
              </div>
            </div>

            <div className="bg-[#F8FAFC] rounded-xl p-3 mb-4">
              <div className="grid grid-cols-4 gap-2 text-center">
                <div>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Flame className="w-3 h-3 text-[#6366F1]" />
                  </div>
                  <p className="text-xs text-[#64748B]">Calorías</p>
                  <p className="text-sm font-bold text-[#0F172A]">{receta.valor_nutricional.calorias}</p>
                </div>
                <div>
                  <p className="text-xs text-[#64748B] mb-1">Proteínas</p>
                  <p className="text-sm font-bold text-[#3B82F6]">{receta.valor_nutricional.proteinas}g</p>
                </div>
                <div>
                  <p className="text-xs text-[#64748B] mb-1">Carbos</p>
                  <p className="text-sm font-bold text-[#10B981]">{receta.valor_nutricional.carbohidratos}g</p>
                </div>
                <div>
                  <p className="text-xs text-[#64748B] mb-1">Grasas</p>
                  <p className="text-sm font-bold text-[#F59E0B]">{receta.valor_nutricional.grasas}g</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize ${getDificultadColor(receta.dificultad)}`}>
                {receta.dificultad}
              </span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectReceta?.(receta);
                }}
                className="text-[#6366F1] hover:text-[#4F46E5] text-sm font-semibold flex items-center gap-1 transition-colors duration-200 ease-out"
              >
                <Eye className="w-4 h-4" />
                Ver más
              </button>
            </div>

            {receta.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-[#F1F5F9]">
                {receta.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-[#EEF2FF] text-[#6366F1] px-2.5 py-1 rounded-md font-medium"
                  >
                    {tag}
                  </span>
                ))}
                {receta.tags.length > 3 && (
                  <span className="text-xs text-[#94A3B8] px-2 py-1">
                    +{receta.tags.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      ))}

      {recetas.length === 0 && (
        <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-[#E2E8F0]">
          <div className="text-6xl mb-4">🍽️</div>
          <p className="text-[#0F172A] font-semibold">No se encontraron recetas</p>
          <p className="text-sm text-[#64748B] mt-2">Intenta con otros filtros o crea una nueva receta</p>
        </div>
      )}
    </div>
  );
}


