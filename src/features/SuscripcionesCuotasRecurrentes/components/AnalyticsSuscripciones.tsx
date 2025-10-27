import { BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react';

export default function AnalyticsSuscripciones() {
  // Datos de ejemplo para las métricas
  const metricas = {
    suscripciones_activas: 156,
    tasa_retencion: 87.5,
    mrr: 12450,
    arpu: 79.81,
    churn_rate: 4.2,
    ltv: 850
  };

  const planes = [
    { nombre: 'Plan Básico', suscriptores: 45, porcentaje: 28.8 },
    { nombre: 'Plan Premium', suscriptores: 78, porcentaje: 50.0 },
    { nombre: 'Plan VIP', suscriptores: 33, porcentaje: 21.2 }
  ];

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div>
        <h2 className="text-2xl font-bold text-[#0F172A]">Analytics de Suscripciones</h2>
        <p className="text-[#64748B] mt-1">Métricas de retención, conversión y rendimiento</p>
      </div>

      {/* KPIs principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-[#EEF2FF] p-3 rounded-xl">
              <Users className="w-6 h-6 text-[#6366F1]" />
            </div>
            <span className="text-sm font-semibold text-[#64748B]">Suscripciones Activas</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">{metricas.suscripciones_activas}</p>
          <p className="text-sm text-[#10B981] mt-2 font-semibold">+12% vs mes anterior</p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-[#D1FAE5] p-3 rounded-xl">
              <TrendingUp className="w-6 h-6 text-[#10B981]" />
            </div>
            <span className="text-sm font-semibold text-[#64748B]">Tasa de Retención</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">{metricas.tasa_retencion}%</p>
          <p className="text-sm text-[#10B981] mt-2 font-semibold">+2.3% vs mes anterior</p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-[#DBEAFE] p-3 rounded-xl">
              <DollarSign className="w-6 h-6 text-[#3B82F6]" />
            </div>
            <span className="text-sm font-semibold text-[#64748B]">MRR (Ingresos Recurrentes)</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">€{metricas.mrr.toLocaleString()}</p>
          <p className="text-sm text-[#10B981] mt-2 font-semibold">+8.5% vs mes anterior</p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-[#D1FAE5] p-3 rounded-xl">
              <BarChart3 className="w-6 h-6 text-[#10B981]" />
            </div>
            <span className="text-sm font-semibold text-[#64748B]">ARPU (Ingreso por Usuario)</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">€{metricas.arpu}</p>
          <p className="text-sm text-[#10B981] mt-2 font-semibold">+3.2% vs mes anterior</p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-[#FEF3C7] p-3 rounded-xl">
              <TrendingUp className="w-6 h-6 text-[#F59E0B]" />
            </div>
            <span className="text-sm font-semibold text-[#64748B]">Churn Rate</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">{metricas.churn_rate}%</p>
          <p className="text-sm text-[#10B981] mt-2 font-semibold">-1.2% vs mes anterior</p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-[#EEF2FF] p-3 rounded-xl">
              <DollarSign className="w-6 h-6 text-[#6366F1]" />
            </div>
            <span className="text-sm font-semibold text-[#64748B]">LTV (Valor de Vida)</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">€{metricas.ltv}</p>
          <p className="text-sm text-[#10B981] mt-2 font-semibold">+5.8% vs mes anterior</p>
        </div>
      </div>

      {/* Distribución por planes */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-[#0F172A] mb-5">Distribución por Planes</h3>
        <div className="space-y-5">
          {planes.map((plan, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-[#0F172A]">{plan.nombre}</span>
                <span className="text-sm text-[#64748B] font-medium">
                  {plan.suscriptores} suscriptores ({plan.porcentaje}%)
                </span>
              </div>
              <div className="w-full bg-[#F1F5F9] rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] h-full rounded-full transition-all duration-500"
                  style={{ width: `${plan.porcentaje}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tendencias */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-[#0F172A] mb-5">Tendencia de Crecimiento</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[#64748B] font-medium">Nuevas suscripciones</span>
              <span className="font-bold text-[#10B981]">+23 este mes</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#64748B] font-medium">Cancelaciones</span>
              <span className="font-bold text-[#EF4444]">-8 este mes</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#64748B] font-medium">Crecimiento neto</span>
              <span className="font-bold text-[#10B981]">+15 suscriptores</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-[#0F172A] mb-5">Próximas Renovaciones</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[#64748B] font-medium">Esta semana</span>
              <span className="font-bold text-[#0F172A]">12 renovaciones</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#64748B] font-medium">Este mes</span>
              <span className="font-bold text-[#0F172A]">45 renovaciones</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#64748B] font-medium">Valor estimado</span>
              <span className="font-bold text-[#10B981]">€3,580</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

