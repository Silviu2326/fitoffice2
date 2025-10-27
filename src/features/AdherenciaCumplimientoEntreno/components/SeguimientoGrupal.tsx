import { Users, TrendingUp, Activity, Award, TrendingDown } from 'lucide-react';

interface PlanGrupal {
  id: string;
  nombre: string;
  totalSocios: number;
  sociosSiguiendo: number;
  porcentajeSeguimiento: number;
  tendencia: 'up' | 'down' | 'stable';
}

export default function SeguimientoGrupal() {
  // Datos de ejemplo
  const planesGrupales: PlanGrupal[] = [
    {
      id: '1',
      nombre: 'Plan Funcional Básico',
      totalSocios: 120,
      sociosSiguiendo: 95,
      porcentajeSeguimiento: 79,
      tendencia: 'up'
    },
    {
      id: '2',
      nombre: 'Plan CrossFit Estándar',
      totalSocios: 85,
      sociosSiguiendo: 72,
      porcentajeSeguimiento: 85,
      tendencia: 'up'
    },
    {
      id: '3',
      nombre: 'Plan Cardio + Fuerza',
      totalSocios: 95,
      sociosSiguiendo: 58,
      porcentajeSeguimiento: 61,
      tendencia: 'down'
    },
    {
      id: '4',
      nombre: 'Plan Iniciación',
      totalSocios: 150,
      sociosSiguiendo: 112,
      porcentajeSeguimiento: 75,
      tendencia: 'stable'
    }
  ];

  const getTendenciaIcon = (tendencia: 'up' | 'down' | 'stable') => {
    if (tendencia === 'up') return <TrendingUp className="w-4 h-4 text-[#10B981]" />;
    if (tendencia === 'down') return <TrendingDown className="w-4 h-4 text-[#EF4444]" />;
    return <Activity className="w-4 h-4 text-[#F59E0B]" />;
  };

  const getSeguimientoColor = (porcentaje: number) => {
    if (porcentaje >= 80) return 'bg-[#10B981]';
    if (porcentaje >= 60) return 'bg-[#F59E0B]';
    return 'bg-[#EF4444]';
  };

  const totalSocios = planesGrupales.reduce((sum, plan) => sum + plan.totalSocios, 0);
  const totalSiguiendo = planesGrupales.reduce((sum, plan) => sum + plan.sociosSiguiendo, 0);
  const seguimientoPromedio = Math.round((totalSiguiendo / totalSocios) * 100);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-[#E2E8F0] p-6 hover:shadow-xl transition-all duration-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-[20px] leading-7 font-semibold text-[#0F172A]">Seguimiento de Planes Grupales</h3>
          <p className="text-[14px] leading-5 text-[#64748B] mt-1">¿Cuánta gente sigue el plan grupal estándar?</p>
        </div>
        <Users className="w-6 h-6 text-[#6366F1]" />
      </div>

      {/* Resumen General */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0]">
          <p className="text-[12px] leading-4 font-medium text-[#64748B] mb-1">Total Socios</p>
          <p className="text-[24px] leading-8 font-bold text-[#0F172A]">{totalSocios}</p>
        </div>
        <div className="bg-[#D1FAE5] rounded-xl p-4 border border-[#10B981]/20">
          <p className="text-[12px] leading-4 font-medium text-[#64748B] mb-1">Siguiendo Plan</p>
          <p className="text-[24px] leading-8 font-bold text-[#10B981]">{totalSiguiendo}</p>
        </div>
        <div className="bg-[#EEF2FF] rounded-xl p-4 border border-[#6366F1]/20">
          <p className="text-[12px] leading-4 font-medium text-[#64748B] mb-1">Seguimiento</p>
          <p className="text-[24px] leading-8 font-bold text-[#6366F1]">{seguimientoPromedio}%</p>
        </div>
      </div>

      {/* Lista de Planes */}
      <div className="space-y-4">
        {planesGrupales.map((plan) => (
          <div key={plan.id} className="border border-[#E2E8F0] rounded-xl p-4 hover:border-[#6366F1] hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-[#0F172A] text-[16px]">{plan.nombre}</h4>
                  {getTendenciaIcon(plan.tendencia)}
                </div>
                <p className="text-[14px] leading-5 text-[#64748B]">
                  {plan.sociosSiguiendo} de {plan.totalSocios} socios siguiendo el plan
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[24px] leading-8 font-bold text-[#0F172A]">{plan.porcentajeSeguimiento}%</span>
              </div>
            </div>

            <div className="relative pt-1">
              <div className="overflow-hidden h-3 text-xs flex rounded-xl bg-[#E2E8F0]">
                <div
                  style={{ width: `${plan.porcentajeSeguimiento}%` }}
                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${getSeguimientoColor(plan.porcentajeSeguimiento)} transition-all duration-300`}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mejor Plan */}
      <div className="mt-6 bg-gradient-to-r from-[#D1FAE5] to-[#A7F3D0] border border-[#10B981]/20 rounded-2xl p-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="bg-[#10B981] rounded-xl p-2">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-[14px] leading-5 font-semibold text-[#0F172A]">Plan con mejor adherencia</p>
            <p className="text-[18px] leading-7 font-bold text-[#059669]">Plan CrossFit Estándar - 85%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
