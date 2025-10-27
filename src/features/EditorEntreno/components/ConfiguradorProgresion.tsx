import { TrendingUp, Settings, Zap } from 'lucide-react';

interface ConfiguradorProgresionProps {
  ejercicio: any;
  onUpdate: (valor: string) => void;
}

export default function ConfiguradorProgresion({ ejercicio, onUpdate }: ConfiguradorProgresionProps) {
  const progresion = ejercicio.progresion || 'manual';

  const tiposProgresion = [
    {
      id: 'manual',
      nombre: 'Manual',
      descripcion: 'Ajustes manuales sesión a sesión',
      icon: Settings
    },
    {
      id: 'lineal',
      nombre: 'Lineal',
      descripcion: 'Incremento progresivo automático',
      icon: TrendingUp
    },
    {
      id: 'ondulante',
      nombre: 'Ondulante',
      descripcion: 'Variación cíclica de intensidad',
      icon: Zap
    }
  ];

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-4">
      <h4 className="text-sm font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
        <TrendingUp className="w-4 h-4" />
        Progresión Automática
      </h4>

      <div className="space-y-2">
        {tiposProgresion.map((tipo) => {
          const Icon = tipo.icon;
          const isSelected = progresion === tipo.id;
          
          return (
            <button
              key={tipo.id}
              onClick={() => onUpdate(tipo.id)}
              className={`w-full p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                isSelected
                  ? 'border-[#10B981] bg-[#D1FAE5]'
                  : 'border-[#E2E8F0] bg-white hover:border-[#6366F1]'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  isSelected ? 'bg-[#10B981]/20' : 'bg-[#F8FAFC]'
                }`}>
                  <Icon className={`w-4 h-4 ${
                    isSelected ? 'text-[#10B981]' : 'text-[#64748B]'
                  }`} />
                </div>
                <div className="flex-1">
                  <h5 className={`font-semibold text-sm ${
                    isSelected ? 'text-[#10B981]' : 'text-[#0F172A]'
                  }`}>
                    {tipo.nombre}
                  </h5>
                  <p className="text-xs text-[#64748B] mt-1">{tipo.descripcion}</p>
                </div>
                {isSelected && (
                  <div className="flex-shrink-0">
                    <div className="w-5 h-5 rounded-full bg-[#10B981] flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Información adicional según el tipo */}
      {progresion === 'lineal' && (
        <div className="mt-4 p-3 bg-[#DBEAFE] border border-[#3B82F6]/20 rounded-lg">
          <p className="text-xs text-[#3B82F6]">
            <span className="font-semibold">Progresión Lineal:</span> Incremento automático de peso/reps cada semana según rendimiento
          </p>
        </div>
      )}
      
      {progresion === 'ondulante' && (
        <div className="mt-4 p-3 bg-[#EEF2FF] border border-[#6366F1]/20 rounded-lg">
          <p className="text-xs text-[#6366F1]">
            <span className="font-semibold">Progresión Ondulante:</span> Variación automática de volumen e intensidad en ciclos
          </p>
        </div>
      )}
    </div>
  );
}

