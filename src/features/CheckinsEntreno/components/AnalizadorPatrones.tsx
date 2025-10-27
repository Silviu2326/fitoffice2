import { BarChart3, TrendingUp, Target, Activity } from 'lucide-react';

interface Patron {
  cliente: string;
  ejercicio: string;
  tendencia: 'mejorando' | 'estable' | 'empeorando';
  rpePromedio: number;
  rpeCambio: number;
  satisfaccion: number;
}

export default function AnalizadorPatrones() {
  const patrones: Patron[] = [
    {
      cliente: 'Juan Pérez',
      ejercicio: 'Sentadilla',
      tendencia: 'mejorando',
      rpePromedio: 6.8,
      rpeCambio: -0.5,
      satisfaccion: 85
    },
    {
      cliente: 'María García',
      ejercicio: 'Press Banca',
      tendencia: 'estable',
      rpePromedio: 7.2,
      rpeCambio: 0.1,
      satisfaccion: 75
    },
    {
      cliente: 'Carlos Ruiz',
      ejercicio: 'Peso Muerto',
      tendencia: 'empeorando',
      rpePromedio: 8.5,
      rpeCambio: 1.2,
      satisfaccion: 60
    }
  ];

  const getTendenciaColor = (tendencia: string) => {
    switch (tendencia) {
      case 'mejorando':
        return 'text-[#10B981]';
      case 'estable':
        return 'text-[#F59E0B]';
      case 'empeorando':
        return 'text-[#EF4444]';
      default:
        return 'text-[#94A3B8]';
    }
  };

  const getTendenciaLabel = (tendencia: string) => {
    switch (tendencia) {
      case 'mejorando':
        return 'Mejorando';
      case 'estable':
        return 'Estable';
      case 'empeorando':
        return 'Empeorando';
      default:
        return 'Sin datos';
    }
  };

  return (
    <div className="space-y-6">
      {/* Métricas generales */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-[#1E1E2E] border border-[#334155] rounded-[16px] p-6 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="w-8 h-8 text-[#6366F1]" />
          </div>
          <p className="text-2xl font-bold text-[#F1F5F9] mb-1">7.5</p>
          <p className="text-[#94A3B8] text-sm">RPE Promedio Global</p>
        </div>

        <div className="bg-[#1E1E2E] border border-[#334155] rounded-[16px] p-6 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 text-[#10B981]" />
          </div>
          <p className="text-2xl font-bold text-[#10B981] mb-1">67%</p>
          <p className="text-[#94A3B8] text-sm">Tendencias Positivas</p>
        </div>

        <div className="bg-[#1E1E2E] border border-[#334155] rounded-[16px] p-6 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-8 h-8 text-[#F59E0B]" />
          </div>
          <p className="text-2xl font-bold text-[#F1F5F9] mb-1">22%</p>
          <p className="text-[#94A3B8] text-sm">Estables</p>
        </div>

        <div className="bg-[#1E1E2E] border border-[#334155] rounded-[16px] p-6 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-8 h-8 text-[#EF4444]" />
          </div>
          <p className="text-2xl font-bold text-[#EF4444] mb-1">11%</p>
          <p className="text-[#94A3B8] text-sm">Requieren Atención</p>
        </div>
      </div>

      {/* Análisis por cliente/ejercicio */}
      <div className="space-y-4">
        {patrones.map((patron, index) => (
          <div
            key={index}
            className="bg-[#1E1E2E] border border-[#334155] rounded-[16px] p-6 hover:border-[#6366F1] transition-all duration-200 shadow-md"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-[#F1F5F9]">{patron.cliente}</h3>
                <p className="text-[#94A3B8]">{patron.ejercicio}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getTendenciaColor(patron.tendencia)}`}>
                {getTendenciaLabel(patron.tendencia)}
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* RPE Promedio */}
              <div>
                <p className="text-sm text-[#94A3B8] mb-2">RPE Promedio (últimas 4 semanas)</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-[#F1F5F9]">{patron.rpePromedio}</span>
                  <span className={`text-sm ${patron.rpeCambio < 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                    {patron.rpeCambio > 0 ? '+' : ''}{patron.rpeCambio}
                  </span>
                </div>
              </div>

              {/* Satisfacción */}
              <div>
                <p className="text-sm text-[#94A3B8] mb-2">Satisfacción General</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-[#2A2A3A] rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        patron.satisfaccion >= 75 ? 'bg-[#10B981]' :
                        patron.satisfaccion >= 50 ? 'bg-[#F59E0B]' :
                        'bg-[#EF4444]'
                      }`}
                      style={{ width: `${patron.satisfaccion}%` }}
                    ></div>
                  </div>
                  <span className="text-lg font-bold text-[#F1F5F9]">{patron.satisfaccion}%</span>
                </div>
              </div>

              {/* Recomendación */}
              <div>
                <p className="text-sm text-[#94A3B8] mb-2">Recomendación</p>
                <p className="text-[#F1F5F9]">
                  {patron.tendencia === 'mejorando' && 'Continuar con el plan actual'}
                  {patron.tendencia === 'estable' && 'Considerar progresión gradual'}
                  {patron.tendencia === 'empeorando' && 'Revisar volumen e intensidad'}
                </p>
              </div>
            </div>

            {/* Gráfico de tendencia simplificado */}
            <div className="mt-4 pt-4 border-t border-[#334155]">
              <p className="text-sm text-[#94A3B8] mb-3">Tendencia de RPE (últimas 8 sesiones)</p>
              <div className="flex items-end gap-2 h-20">
                {[6.5, 7.0, 6.8, 7.2, 6.9, 7.1, 6.7, patron.rpePromedio].map((value, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-[#6366F1]/30 rounded-t"
                    style={{ height: `${(value / 10) * 100}%` }}
                    title={`RPE: ${value}`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

