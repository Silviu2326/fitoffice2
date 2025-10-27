import { Repeat, Clock, Hash } from 'lucide-react';

interface GestorSeriesProps {
  ejercicio: any;
  onUpdate: (campo: string, valor: any) => void;
}

export default function GestorSeries({ ejercicio, onUpdate }: GestorSeriesProps) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-4">
      <h4 className="text-sm font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
        <Repeat className="w-4 h-4" />
        Series y Repeticiones
      </h4>

      <div className="space-y-3">
        {/* Series */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-[#64748B] flex items-center gap-2">
            <Hash className="w-3 h-3" />
            Series
          </label>
          <input
            type="number"
            value={ejercicio.series || 3}
            onChange={(e) => onUpdate('series', parseInt(e.target.value))}
            min="1"
            max="10"
            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-2 text-[#0F172A] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200"
          />
        </div>

        {/* Repeticiones */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-[#64748B] flex items-center gap-2">
            <Repeat className="w-3 h-3" />
            Repeticiones
          </label>
          <input
            type="number"
            value={ejercicio.repeticiones || 10}
            onChange={(e) => onUpdate('repeticiones', parseInt(e.target.value))}
            min="1"
            max="100"
            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-2 text-[#0F172A] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200"
          />
        </div>

        {/* Descanso */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-[#64748B] flex items-center gap-2">
            <Clock className="w-3 h-3" />
            Descanso (segundos)
          </label>
          <input
            type="number"
            value={ejercicio.descanso || 60}
            onChange={(e) => onUpdate('descanso', parseInt(e.target.value))}
            min="15"
            max="300"
            step="15"
            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-2 text-[#0F172A] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200"
          />
        </div>
      </div>

      {/* Resumen */}
      <div className="mt-4 p-3 bg-[#DBEAFE] border border-[#3B82F6]/20 rounded-lg">
        <p className="text-xs text-[#3B82F6]">
          <span className="font-bold">{ejercicio.series || 3} series</span> × 
          <span className="font-bold"> {ejercicio.repeticiones || 10} reps</span> con 
          <span className="font-bold"> {ejercicio.descanso || 60}s</span> de descanso
        </p>
      </div>
    </div>
  );
}

