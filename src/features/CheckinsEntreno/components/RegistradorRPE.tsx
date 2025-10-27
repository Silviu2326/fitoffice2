interface RegistradorRPEProps {
  value: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
}

export default function RegistradorRPE({ value, onChange, readonly = false }: RegistradorRPEProps) {
  const getColorClass = () => {
    if (value <= 3) return 'text-[#10B981]';
    if (value <= 6) return 'text-[#F59E0B]';
    if (value <= 8) return 'text-[#FB923C]';
    return 'text-[#EF4444]';
  };

  const getLabel = () => {
    if (value <= 3) return 'Leve';
    if (value <= 6) return 'Moderado';
    if (value <= 8) return 'Intenso';
    return 'Máximo';
  };

  if (readonly) {
    return (
      <div className="flex items-center gap-2">
        <span className={`text-lg font-bold ${getColorClass()}`}>{value}/10</span>
        <span className="text-sm text-[#94A3B8]">({getLabel()})</span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-[#F1F5F9]">RPE (Esfuerzo Percibido)</span>
        <span className={`text-lg font-bold ${getColorClass()}`}>{value}/10</span>
      </div>
      <input
        type="range"
        min="1"
        max="10"
        value={value}
        onChange={(e) => onChange?.(parseInt(e.target.value))}
        className="w-full h-2 bg-[#2A2A3A] rounded-lg appearance-none cursor-pointer accent-[#6366F1]"
      />
      <div className="flex justify-between text-xs text-[#94A3B8]">
        <span>Muy fácil (1-3)</span>
        <span>Moderado (4-6)</span>
        <span>Intenso (7-8)</span>
        <span>Máximo (9-10)</span>
      </div>
    </div>
  );
}

