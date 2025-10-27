interface SemáforoSerieProps {
  sensacion: 'buena' | 'regular' | 'mala';
  dolorLumbar: boolean;
}

export default function SemáforoSerie({ sensacion, dolorLumbar }: SemáforoSerieProps) {
  const getColor = () => {
    if (dolorLumbar || sensacion === 'mala') return 'red';
    if (sensacion === 'regular') return 'yellow';
    return 'green';
  };

  const color = getColor();

  const colorClasses = {
    red: 'bg-[#EF4444] shadow-[#EF4444]/50',
    yellow: 'bg-[#F59E0B] shadow-[#F59E0B]/50',
    green: 'bg-[#10B981] shadow-[#10B981]/50'
  };

  const getLabel = () => {
    if (dolorLumbar) return 'Dolor Lumbar';
    if (sensacion === 'buena') return 'Excelente';
    if (sensacion === 'regular') return 'Regular';
    return 'Precaución';
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${colorClasses[color]} shadow-lg`}></div>
      <span className={`text-sm font-medium ${
        color === 'red' ? 'text-[#EF4444]' :
        color === 'yellow' ? 'text-[#F59E0B]' :
        'text-[#10B981]'
      }`}>
        {getLabel()}
      </span>
    </div>
  );
}

