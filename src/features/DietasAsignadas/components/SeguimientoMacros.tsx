import { TrendingUp, Target } from 'lucide-react';

interface MacroData {
  nombre: string;
  objetivo: number;
  consumido: number;
  color: string;
  bgColor: string;
}

export default function SeguimientoMacros() {
  const macros: MacroData[] = [
    {
      nombre: 'Proteínas',
      objetivo: 140,
      consumido: 125,
      color: 'text-[#10B981]',
      bgColor: 'bg-[#10B981]'
    },
    {
      nombre: 'Carbohidratos',
      objetivo: 180,
      consumido: 165,
      color: 'text-[#3B82F6]',
      bgColor: 'bg-[#3B82F6]'
    },
    {
      nombre: 'Grasas',
      objetivo: 60,
      consumido: 55,
      color: 'text-[#F59E0B]',
      bgColor: 'bg-[#F59E0B]'
    }
  ];

  const calcularPorcentaje = (consumido: number, objetivo: number) => {
    return Math.min((consumido / objetivo) * 100, 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-[#EEF2FF] p-3 rounded-xl">
          <TrendingUp className="w-6 h-6 text-[#6366F1]" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#F1F5F9]">Seguimiento de Macros</h2>
          <p className="text-sm text-[#94A3B8]">Control diario de macronutrientes</p>
        </div>
      </div>

      {/* Selección de cliente */}
      <div className="bg-[#1E1E2E] rounded-2xl p-6 border border-[#334155] shadow-md">
        <label className="block text-sm font-semibold text-[#F1F5F9] mb-2">Cliente</label>
        <select className="w-full bg-[#0F0F23] border border-[#334155] rounded-xl px-4 py-3 text-[#F1F5F9] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200">
          <option>Ana García - Pérdida de grasa</option>
          <option>Carlos Ruiz - Plan pérdida grasa nivel 1</option>
          <option>María López - Ganancia muscular</option>
        </select>
      </div>

      {/* Progreso de macros */}
      <div className="bg-[#1E1E2E] rounded-2xl p-6 border border-[#334155] shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-[#F1F5F9]">Progreso de Hoy</h3>
          <div className="flex items-center gap-2 text-[#6366F1]">
            <Target className="w-5 h-5" />
            <span className="text-sm font-semibold">Objetivo diario</span>
          </div>
        </div>

        <div className="space-y-6">
          {macros.map((macro) => {
            const porcentaje = calcularPorcentaje(macro.consumido, macro.objetivo);
            return (
              <div key={macro.nombre}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-[#F1F5F9]">{macro.nombre}</span>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-semibold ${macro.color}`}>
                      {macro.consumido}g
                    </span>
                    <span className="text-sm text-[#94A3B8]">/ {macro.objetivo}g</span>
                  </div>
                </div>
                <div className="relative w-full h-3 bg-[#0F0F23] rounded-full overflow-hidden">
                  <div
                    className={`absolute left-0 top-0 h-full ${macro.bgColor} transition-all duration-500`}
                    style={{ width: `${porcentaje}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-[#94A3B8]">
                    {porcentaje.toFixed(0)}% completado
                  </span>
                  <span className="text-xs text-[#94A3B8]">
                    Quedan {macro.objetivo - macro.consumido}g
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Resumen calórico */}
        <div className="mt-6 pt-6 border-t border-[#334155]">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-[#F1F5F9]">1820</p>
              <p className="text-xs text-[#94A3B8] mt-1">Calorías consumidas</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#10B981]">2000</p>
              <p className="text-xs text-[#94A3B8] mt-1">Objetivo diario</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#F59E0B]">180</p>
              <p className="text-xs text-[#94A3B8] mt-1">Quedan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Historial semanal */}
      <div className="bg-[#1E1E2E] rounded-2xl p-6 border border-[#334155] shadow-md">
        <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">Adherencia Semanal</h3>
        <div className="flex items-end justify-between gap-2 h-32">
          {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((dia, index) => {
            const altura = [85, 92, 78, 95, 88, 90, 91][index];
            return (
              <div key={dia} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-[#0F0F23] rounded-t-xl relative overflow-hidden" style={{ height: `${altura}%` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#6366F1] to-[#8B5CF6]"></div>
                </div>
                <span className="text-xs text-[#94A3B8] font-medium">{dia}</span>
              </div>
            );
          })}
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-[#94A3B8]">
            Adherencia promedio: <span className="text-[#10B981] font-semibold">88%</span>
          </p>
        </div>
      </div>
    </div>
  );
}

