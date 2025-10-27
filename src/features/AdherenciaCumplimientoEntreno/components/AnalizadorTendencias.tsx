import { TrendingUp, TrendingDown, Calendar, BarChart3, Activity } from 'lucide-react';

interface TendenciaSemanal {
  semana: string;
  adherencia: number;
  sesionesCompletadas: number;
  cambio: number;
}

interface PatronIdentificado {
  id: string;
  tipo: 'positivo' | 'negativo' | 'neutral';
  descripcion: string;
  impacto: string;
}

export default function AnalizadorTendencias() {
  // Datos de ejemplo
  const tendenciasMensuales: TendenciaSemanal[] = [
    { semana: 'Sem 1', adherencia: 72, sesionesCompletadas: 215, cambio: 3 },
    { semana: 'Sem 2', adherencia: 75, sesionesCompletadas: 223, cambio: 3 },
    { semana: 'Sem 3', adherencia: 78, sesionesCompletadas: 234, cambio: 3 },
    { semana: 'Sem 4', adherencia: 80, sesionesCompletadas: 242, cambio: 2 }
  ];

  const patrones: PatronIdentificado[] = [
    {
      id: '1',
      tipo: 'positivo',
      descripcion: 'Incremento constante en adherencia últimas 4 semanas',
      impacto: 'La adherencia ha mejorado un 11% en el último mes'
    },
    {
      id: '2',
      tipo: 'positivo',
      descripcion: 'Mayor cumplimiento los lunes y martes',
      impacto: '85% de adherencia en inicio de semana vs 72% fin de semana'
    },
    {
      id: '3',
      tipo: 'negativo',
      descripcion: 'Caída de adherencia los viernes',
      impacto: 'Solo 65% de sesiones completadas los viernes'
    },
    {
      id: '4',
      tipo: 'neutral',
      descripcion: 'Sesiones matutinas tienen mejor adherencia',
      impacto: '82% adherencia mañana vs 74% tarde'
    }
  ];

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'positivo':
        return 'border-[#10B981]/30 bg-[#D1FAE5]';
      case 'negativo':
        return 'border-[#EF4444]/30 bg-[#FEE2E2]';
      case 'neutral':
        return 'border-[#6366F1]/30 bg-[#EEF2FF]';
      default:
        return 'border-[#E2E8F0] bg-[#F8FAFC]';
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'positivo':
        return <TrendingUp className="w-5 h-5 text-[#10B981]" />;
      case 'negativo':
        return <TrendingDown className="w-5 h-5 text-[#EF4444]" />;
      case 'neutral':
        return <Activity className="w-5 h-5 text-[#6366F1]" />;
      default:
        return <Activity className="w-5 h-5 text-[#64748B]" />;
    }
  };

  const tendenciaGeneral = tendenciasMensuales[tendenciasMensuales.length - 1].adherencia - tendenciasMensuales[0].adherencia;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-[#E2E8F0] p-6 hover:shadow-xl transition-all duration-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-[20px] leading-7 font-semibold text-[#0F172A]">Análisis de Tendencias</h3>
          <p className="text-[14px] leading-5 text-[#64748B] mt-1">Patrones de adherencia identificados</p>
        </div>
        <BarChart3 className="w-6 h-6 text-[#6366F1]" />
      </div>

      {/* Tendencia General */}
      <div className={`rounded-2xl p-6 mb-6 border ${tendenciaGeneral >= 0 ? 'bg-[#D1FAE5] border-[#10B981]/20' : 'bg-[#FEE2E2] border-[#EF4444]/20'}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[14px] leading-5 text-[#64748B] mb-2">Tendencia General (Último Mes)</p>
            <div className="flex items-center gap-3">
              {tendenciaGeneral >= 0 ? (
                <TrendingUp className="w-8 h-8 text-[#10B981]" />
              ) : (
                <TrendingDown className="w-8 h-8 text-[#EF4444]" />
              )}
              <div>
                <p className="text-[36px] leading-[44px] font-bold text-[#0F172A]">
                  {tendenciaGeneral >= 0 ? '+' : ''}{tendenciaGeneral}%
                </p>
                <p className="text-[14px] leading-5 text-[#64748B]">Cambio en adherencia</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[14px] leading-5 text-[#64748B] mb-1">Adherencia Actual</p>
            <p className="text-[32px] leading-10 font-bold text-[#10B981]">
              {tendenciasMensuales[tendenciasMensuales.length - 1].adherencia}%
            </p>
          </div>
        </div>
      </div>

      {/* Gráfico de Tendencias */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-[#64748B]" />
          <h4 className="font-semibold text-[#0F172A] text-[16px]">Evolución Semanal</h4>
        </div>
        <div className="space-y-3">
          {tendenciasMensuales.map((item, index) => (
            <div key={index} className="bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0] hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-[#0F172A] text-[16px]">{item.semana}</span>
                <div className="flex items-center gap-3">
                  <span className="text-[14px] leading-5 text-[#64748B]">{item.sesionesCompletadas} sesiones</span>
                  <span className={`flex items-center gap-1 text-[14px] leading-5 font-semibold ${item.cambio >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                    {item.cambio >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {item.cambio >= 0 ? '+' : ''}{item.cambio}%
                  </span>
                </div>
              </div>
              <div className="relative pt-1">
                <div className="overflow-hidden h-3 text-xs flex rounded-xl bg-[#E2E8F0]">
                  <div
                    style={{ width: `${item.adherencia}%` }}
                    className="shadow-none flex items-center justify-end px-2 whitespace-nowrap text-white font-semibold text-[10px] bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] transition-all duration-300"
                  >
                    {item.adherencia}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Patrones Identificados */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-[#64748B]" />
          <h4 className="font-semibold text-[#0F172A] text-[16px]">Patrones Identificados</h4>
        </div>
        <div className="space-y-3">
          {patrones.map((patron) => (
            <div key={patron.id} className={`border rounded-xl p-4 ${getTipoColor(patron.tipo)} hover:shadow-md transition-all duration-200`}>
              <div className="flex items-start gap-3">
                <div className="mt-1">{getTipoIcon(patron.tipo)}</div>
                <div className="flex-1">
                  <h5 className="font-semibold text-[#0F172A] text-[16px] mb-1">{patron.descripcion}</h5>
                  <p className="text-[14px] leading-5 text-[#64748B]">{patron.impacto}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
