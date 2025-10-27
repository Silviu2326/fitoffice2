import { useState } from 'react';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

interface CambioPlan {
  id: string;
  cliente: string;
  plan_actual: string;
  plan_nuevo: string;
  precio_actual: number;
  precio_nuevo: number;
  tipo: 'upgrade' | 'downgrade';
  fecha_solicitud: string;
  estado: 'pendiente' | 'procesado';
}

export default function UpgradeDowngrade() {
  const [cambios] = useState<CambioPlan[]>([
    {
      id: '1',
      cliente: 'Ana Martínez',
      plan_actual: 'Plan Básico',
      plan_nuevo: 'Plan Premium',
      precio_actual: 49,
      precio_nuevo: 79,
      tipo: 'upgrade',
      fecha_solicitud: '2025-10-25',
      estado: 'pendiente'
    },
    {
      id: '2',
      cliente: 'Luis Fernández',
      plan_actual: '12 sesiones/mes',
      plan_nuevo: '8 sesiones/mes',
      precio_actual: 299,
      precio_nuevo: 199,
      tipo: 'downgrade',
      fecha_solicitud: '2025-10-24',
      estado: 'procesado'
    }
  ]);

  const procesarCambio = (id: string) => {
    alert(`Procesando cambio de plan ${id}`);
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div>
        <h2 className="text-2xl font-bold text-[#0F172A]">Upgrade & Downgrade de Planes</h2>
        <p className="text-[#64748B] mt-1">Gestiona los cambios de plan de tus clientes</p>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-[#D1FAE5] p-3 rounded-xl">
              <TrendingUp className="w-6 h-6 text-[#10B981]" />
            </div>
            <span className="text-sm font-semibold text-[#64748B]">Upgrades</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">
            {cambios.filter(c => c.tipo === 'upgrade').length}
          </p>
          <p className="text-sm text-[#64748B] mt-2">Mejoras de plan</p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-[#FEF3C7] p-3 rounded-xl">
              <TrendingDown className="w-6 h-6 text-[#F59E0B]" />
            </div>
            <span className="text-sm font-semibold text-[#64748B]">Downgrades</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">
            {cambios.filter(c => c.tipo === 'downgrade').length}
          </p>
          <p className="text-sm text-[#64748B] mt-2">Reducciones de plan</p>
        </div>
      </div>

      {/* Lista de cambios */}
      <div className="space-y-4">
        {cambios.map(cambio => (
          <div key={cambio.id} className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <h3 className="text-lg font-bold text-[#0F172A]">{cambio.cliente}</h3>
                  {cambio.tipo === 'upgrade' ? (
                    <span className="px-3 py-1.5 bg-[#D1FAE5] text-[#10B981] border border-[#10B981]/20 rounded-full text-xs font-semibold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Upgrade
                    </span>
                  ) : (
                    <span className="px-3 py-1.5 bg-[#FEF3C7] text-[#F59E0B] border border-[#F59E0B]/20 rounded-full text-xs font-semibold flex items-center gap-1">
                      <TrendingDown className="w-3 h-3" />
                      Downgrade
                    </span>
                  )}
                  <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                    cambio.estado === 'procesado' 
                      ? 'bg-[#DBEAFE] text-[#3B82F6] border-[#3B82F6]/20' 
                      : 'bg-[#FEF3C7] text-[#F59E0B] border-[#F59E0B]/20'
                  }`}>
                    {cambio.estado === 'procesado' ? 'Procesado' : 'Pendiente'}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-[#0F172A]">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{cambio.plan_actual}</span>
                    <span className="text-[#64748B] font-medium">€{cambio.precio_actual}</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#94A3B8]" />
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{cambio.plan_nuevo}</span>
                    <span className={`font-bold ${
                      cambio.tipo === 'upgrade' ? 'text-[#10B981]' : 'text-[#F59E0B]'
                    }`}>
                      €{cambio.precio_nuevo}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-[#64748B] mt-3 font-medium">
                  Solicitado: {new Date(cambio.fecha_solicitud).toLocaleDateString()}
                </p>
              </div>

              {cambio.estado === 'pendiente' && (
                <button
                  onClick={() => procesarCambio(cambio.id)}
                  className="bg-[#6366F1] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#4F46E5] active:bg-[#4338CA] transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Procesar Cambio
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {cambios.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-[#E2E8F0]">
          <div className="bg-[#F8FAFC] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-[#94A3B8]" />
          </div>
          <h3 className="text-[#0F172A] text-lg font-semibold mb-2">No hay cambios de plan</h3>
          <p className="text-[#64748B]">No hay solicitudes de upgrade o downgrade pendientes</p>
        </div>
      )}
    </div>
  );
}

