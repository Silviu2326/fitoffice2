import { Activity, TrendingUp } from 'lucide-react';

interface ConfiguradorRPEProps {
  ejercicio: any;
  onUpdate: (valor: number) => void;
}

export default function ConfiguradorRPE({ ejercicio, onUpdate }: ConfiguradorRPEProps) {
  const rpe = ejercicio.rpe || 7;

  const getRPEColor = (value: number) => {
    if (value <= 3) return 'text-[#10B981] bg-[#D1FAE5] border-[#10B981]/30';
    if (value <= 6) return 'text-[#F59E0B] bg-[#FEF3C7] border-[#F59E0B]/30';
    if (value <= 8) return 'text-[#F59E0B] bg-[#FEF3C7] border-[#F59E0B]/30';
    return 'text-[#EF4444] bg-[#FEE2E2] border-[#EF4444]/30';
  };

  const getRPEDescription = (value: number) => {
    if (value <= 3) return 'Muy fácil - Calentamiento';
    if (value <= 5) return 'Fácil - Recuperación activa';
    if (value <= 7) return 'Moderado - Entrenamiento base';
    if (value <= 8) return 'Difícil - Trabajo intenso';
    if (value === 9) return 'Muy difícil - Máximo esfuerzo';
    return 'Máximo - Fallo muscular';
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-4">
      <h4 className="text-sm font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
        <Activity className="w-4 h-4" />
        RPE - Rate of Perceived Exertion
      </h4>

      {/* Slider */}
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-[#64748B]">Intensidad</span>
            <span className={`text-2xl font-bold px-3 py-1 rounded-lg border ${getRPEColor(rpe)}`}>
              {rpe}
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={rpe}
            onChange={(e) => onUpdate(parseInt(e.target.value))}
            className="w-full h-2 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#6366F1]"
          />
          <div className="flex justify-between text-xs text-[#94A3B8]">
            <span>1</span>
            <span>5</span>
            <span>10</span>
          </div>
        </div>

        {/* Descripción */}
        <div className={`p-3 rounded-lg border ${getRPEColor(rpe)}`}>
          <p className="text-xs font-semibold flex items-center gap-2">
            <TrendingUp className="w-3 h-3" />
            {getRPEDescription(rpe)}
          </p>
        </div>
      </div>

      {/* Guía rápida */}
      <div className="mt-4 p-3 bg-[#F8FAFC] rounded-lg">
        <p className="text-xs text-[#64748B]">
          <span className="font-semibold">Guía:</span> 1-3 muy fácil, 4-6 moderado, 7-8 intenso, 9-10 máximo
        </p>
      </div>
    </div>
  );
}

