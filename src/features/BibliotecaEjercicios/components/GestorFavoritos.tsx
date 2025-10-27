import { useState } from 'react';
import { Heart } from 'lucide-react';

interface GestorFavoritosProps {
  ejercicioId: string;
}

export default function GestorFavoritos({ ejercicioId }: GestorFavoritosProps) {
  const [isFavorito, setIsFavorito] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleFavorito = async () => {
    setIsLoading(true);
    
    // TODO: Implementar llamada a API
    setTimeout(() => {
      setIsFavorito(!isFavorito);
      setIsLoading(false);
    }, 300);
  };

  return (
    <button
      onClick={toggleFavorito}
      disabled={isLoading}
      className={`p-3 rounded-lg transition-all duration-200 ease-out flex items-center gap-2 ${
        isFavorito
          ? 'bg-[#FEE2E2] text-[#EF4444] border border-[#EF4444]/30'
          : 'bg-[#2A2A3A] text-[#94A3B8] hover:text-[#EF4444] hover:bg-[#334155] border border-[#334155]'
      }`}
    >
      <Heart className={`w-5 h-5 ${isFavorito ? 'fill-current' : ''}`} />
      {isFavorito ? 'Guardado' : 'Guardar'}
    </button>
  );
}

