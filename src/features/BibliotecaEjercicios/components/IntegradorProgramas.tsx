import { useState } from 'react';
import { Plus, CheckCircle } from 'lucide-react';

interface IntegradorProgramasProps {
  ejercicioId: string;
}

export default function IntegradorProgramas({ ejercicioId }: IntegradorProgramasProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAgregarAPrograma = () => {
    // TODO: Implementar lógica de agregar a programa
    setIsAdded(true);
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div>
      <button
        onClick={handleAgregarAPrograma}
        disabled={isAdded}
        className={`w-full px-4 py-3 rounded-lg font-semibold transition-all duration-200 ease-out flex items-center justify-center gap-2 shadow-md ${
          isAdded
            ? 'bg-[#D1FAE5] text-[#10B981] border border-[#10B981]/30 cursor-not-allowed'
            : 'bg-[#6366F1] text-white hover:bg-[#4F46E5] active:bg-[#4338CA] hover:shadow-lg'
        }`}
      >
        {isAdded ? (
          <>
            <CheckCircle className="w-5 h-5" />
            Agregado a Programa
          </>
        ) : (
          <>
            <Plus className="w-5 h-5" />
            Agregar a Programa
          </>
        )}
      </button>

      {showSuccess && (
        <div className="mt-3 p-3 bg-[#D1FAE5] border border-[#10B981]/30 rounded-lg">
          <p className="text-[#10B981] text-sm text-center font-medium">
            ✓ Ejercicio agregado exitosamente
          </p>
        </div>
      )}
    </div>
  );
}

