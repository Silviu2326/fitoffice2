import { X, Clock, Users, Star, Flame, ChefHat, ShoppingCart } from 'lucide-react';
import { Receta } from '../api/recetas';

interface VisorRecetaProps {
  receta: Receta;
  onClose: () => void;
  onToggleFavorito?: (id: string) => void;
  onGenerarListaCompra?: (receta: Receta) => void;
}

export default function VisorReceta({ 
  receta, 
  onClose, 
  onToggleFavorito,
  onGenerarListaCompra 
}: VisorRecetaProps) {
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

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col" style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
        <div className="relative h-64 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6]">
          {receta.foto_url ? (
            <img 
              src={receta.foto_url} 
              alt={receta.nombre}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white text-8xl">
              {getCategoriaEmoji(receta.categoria)}
            </div>
          )}
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all duration-200 ease-out"
          >
            <X className="w-6 h-6 text-[#0F172A]" />
          </button>

          <button
            onClick={() => onToggleFavorito?.(receta.id)}
            className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all duration-200 ease-out"
          >
            <Star
              className={`w-6 h-6 ${
                receta.favorito 
                  ? 'fill-[#F59E0B] text-[#F59E0B]' 
                  : 'text-[#94A3B8]'
              }`}
            />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="mb-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-[#0F172A] mb-2">{receta.nombre}</h2>
                <p className="text-[#64748B]">{receta.descripcion}</p>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold capitalize whitespace-nowrap ${getDificultadColor(receta.dificultad)}`}>
                {receta.dificultad}
              </span>
            </div>

            <div className="flex gap-6 text-sm text-[#64748B]">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#6366F1]" />
                <span><strong className="text-[#0F172A]">{receta.tiempo_preparacion}</strong> minutos</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#6366F1]" />
                <span><strong className="text-[#0F172A]">{receta.porciones}</strong> porciones</span>
              </div>
              <div className="flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-[#6366F1]" />
                <span>Usada <strong className="text-[#0F172A]">{receta.veces_usado}</strong> veces</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#EEF2FF] to-[#E0E7FF] rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-bold text-[#0F172A] mb-4 flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#6366F1]" />
              Información Nutricional (por porción)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <p className="text-sm text-[#64748B] mb-1">Calorías</p>
                <p className="text-2xl font-bold text-[#6366F1]">{receta.valor_nutricional.calorias}</p>
                <p className="text-xs text-[#94A3B8]">kcal</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <p className="text-sm text-[#64748B] mb-1">Proteínas</p>
                <p className="text-2xl font-bold text-[#3B82F6]">{receta.valor_nutricional.proteinas}</p>
                <p className="text-xs text-[#94A3B8]">gramos</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <p className="text-sm text-[#64748B] mb-1">Carbohidratos</p>
                <p className="text-2xl font-bold text-[#10B981]">{receta.valor_nutricional.carbohidratos}</p>
                <p className="text-xs text-[#94A3B8]">gramos</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <p className="text-sm text-[#64748B] mb-1">Grasas</p>
                <p className="text-2xl font-bold text-[#F59E0B]">{receta.valor_nutricional.grasas}</p>
                <p className="text-xs text-[#94A3B8]">gramos</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <p className="text-sm text-[#64748B] mb-1">Fibra</p>
                <p className="text-2xl font-bold text-[#10B981]">{receta.valor_nutricional.fibra}</p>
                <p className="text-xs text-[#94A3B8]">gramos</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-[#0F172A] mb-4">Ingredientes</h3>
            <div className="bg-[#F8FAFC] rounded-xl p-4">
              <ul className="space-y-2">
                {receta.ingredientes.map((ingrediente, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#6366F1] mr-3">•</span>
                    <span className="text-[#64748B]">
                      <strong className="text-[#0F172A]">{ingrediente.cantidad} {ingrediente.unidad}</strong> de {ingrediente.nombre}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-[#0F172A] mb-4">Preparación</h3>
            <div className="space-y-3">
              {receta.instrucciones.map((instruccion, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="bg-[#6366F1] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-[#64748B] pt-1">{instruccion}</p>
                </div>
              ))}
            </div>
          </div>

          {receta.tags.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-[#0F172A] mb-4">Etiquetas</h3>
              <div className="flex flex-wrap gap-2">
                {receta.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-[#EEF2FF] text-[#6366F1] px-3 py-1.5 rounded-full text-sm font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t border-[#E2E8F0]">
            <button
              onClick={() => onGenerarListaCompra?.(receta)}
              className="flex-1 bg-[#6366F1] text-white py-3 rounded-xl hover:bg-[#4F46E5] active:bg-[#4338CA] transition-all duration-200 ease-out flex items-center justify-center gap-2 font-semibold shadow-md hover:shadow-lg"
            >
              <ShoppingCart className="w-5 h-5" />
              Generar Lista de Compra
            </button>
            <button
              onClick={onClose}
              className="px-6 bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] py-3 rounded-xl hover:bg-[#F1F5F9] transition-all duration-200 ease-out font-semibold"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


