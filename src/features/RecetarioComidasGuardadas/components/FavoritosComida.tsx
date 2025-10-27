import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { Receta, getRecetas } from '../api/recetas';

interface FavoritosComidaProps {
  onSelectReceta?: (receta: Receta) => void;
}

export default function FavoritosComida({ onSelectReceta }: FavoritosComidaProps) {
  const [favoritos, setFavoritos] = useState<Receta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavoritos();
  }, []);

  const loadFavoritos = async () => {
    setLoading(true);
    try {
      const recetas = await getRecetas();
      setFavoritos(recetas.filter(r => r.favorito));
    } catch (error) {
      console.error('Error al cargar favoritos:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-[#E2E8F0] rounded animate-pulse"></div>
          <div className="h-8 bg-[#E2E8F0] rounded w-48 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-md border border-[#E2E8F0] animate-pulse">
              <div className="h-6 bg-[#E2E8F0] rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-[#F1F5F9] rounded w-full mb-2"></div>
              <div className="h-4 bg-[#F1F5F9] rounded w-4/5 mb-3"></div>
              <div className="h-4 bg-[#E2E8F0] rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Star className="w-6 h-6 text-[#F59E0B] fill-[#F59E0B]" />
        <h2 className="text-2xl font-bold text-[#0F172A]">Recetas Favoritas</h2>
        <span className="bg-[#EEF2FF] text-[#6366F1] px-3 py-1.5 rounded-full text-sm font-semibold">
          {favoritos.length} recetas
        </span>
      </div>

      {favoritos.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-[#E2E8F0]">
          <Star className="w-12 h-12 text-[#94A3B8] mx-auto mb-4" />
          <p className="text-[#0F172A] font-semibold">No tienes recetas favoritas</p>
          <p className="text-sm text-[#64748B] mt-2">
            Marca recetas como favoritas para acceso rápido
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoritos.map((receta) => (
            <div
              key={receta.id}
              onClick={() => onSelectReceta?.(receta)}
              className="bg-white rounded-2xl p-5 shadow-md border border-[#E2E8F0] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 ease-out cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-[#0F172A] flex-1">{receta.nombre}</h3>
                <Star className="w-5 h-5 text-[#F59E0B] fill-[#F59E0B] flex-shrink-0" />
              </div>
              <p className="text-sm text-[#64748B] mb-3 line-clamp-2">{receta.descripcion}</p>
              <div className="flex items-center gap-3 text-xs text-[#64748B]">
                <span>{receta.tiempo_preparacion} min</span>
                <span>•</span>
                <span>{receta.porciones} porciones</span>
                <span>•</span>
                <span className="capitalize">{receta.dificultad}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


