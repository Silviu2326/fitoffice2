import { useState } from 'react';
import { Pause, Play, Calendar } from 'lucide-react';

interface FreezeSolicitud {
  id: string;
  cliente: string;
  plan: string;
  fecha_inicio_freeze: string;
  fecha_fin_freeze: string;
  motivo: string;
  estado: 'activo' | 'programado' | 'finalizado';
}

export default function FreezeSuscripcion() {
  const [freezes] = useState<FreezeSolicitud[]>([
    {
      id: '1',
      cliente: 'Roberto Sánchez',
      plan: 'Plan Premium',
      fecha_inicio_freeze: '2025-11-01',
      fecha_fin_freeze: '2025-12-01',
      motivo: 'Viaje de trabajo',
      estado: 'programado'
    },
    {
      id: '2',
      cliente: 'Laura Gómez',
      plan: '8 sesiones/mes',
      fecha_inicio_freeze: '2025-10-15',
      fecha_fin_freeze: '2025-11-15',
      motivo: 'Lesión temporal',
      estado: 'activo'
    }
  ]);

  const reactivarSuscripcion = (id: string) => {
    alert(`Reactivando suscripción ${id}`);
  };

  const calcularDiasFaltantes = (fecha: string): number => {
    const hoy = new Date();
    const fechaFin = new Date(fecha);
    const diferencia = fechaFin.getTime() - hoy.getTime();
    return Math.ceil(diferencia / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div>
        <h2 className="text-2xl font-bold text-[#0F172A]">Freeze de Suscripciones</h2>
        <p className="text-[#64748B] mt-1">Gestiona las pausas temporales de membresías</p>
      </div>

      {/* Información importante */}
      <div className="bg-[#DBEAFE] border border-[#3B82F6]/20 rounded-xl p-5">
        <div className="flex gap-3">
          <div className="bg-white p-2 rounded-lg flex-shrink-0">
            <Pause className="w-5 h-5 text-[#3B82F6]" />
          </div>
          <div>
            <h3 className="font-bold text-[#0F172A] mb-2">¿Qué es el Freeze?</h3>
            <p className="text-sm text-[#64748B] leading-relaxed">
              El freeze permite a los clientes pausar temporalmente su suscripción sin perder su 
              plan ni sus beneficios. Durante el periodo de freeze, no se realizan cobros y el 
              cliente puede reactivar cuando esté listo.
            </p>
          </div>
        </div>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-[#FEF3C7] p-3 rounded-xl">
              <Calendar className="w-6 h-6 text-[#F59E0B]" />
            </div>
            <span className="text-sm font-semibold text-[#64748B]">Programados</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">
            {freezes.filter(f => f.estado === 'programado').length}
          </p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-[#FEF3C7] p-3 rounded-xl">
              <Pause className="w-6 h-6 text-[#F59E0B]" />
            </div>
            <span className="text-sm font-semibold text-[#64748B]">Activos</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">
            {freezes.filter(f => f.estado === 'activo').length}
          </p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-[#D1FAE5] p-3 rounded-xl">
              <Play className="w-6 h-6 text-[#10B981]" />
            </div>
            <span className="text-sm font-semibold text-[#64748B]">Finalizados</span>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">
            {freezes.filter(f => f.estado === 'finalizado').length}
          </p>
        </div>
      </div>

      {/* Lista de freezes */}
      <div className="space-y-4">
        {freezes.map(freeze => {
          const diasFaltantes = calcularDiasFaltantes(freeze.fecha_fin_freeze);
          return (
            <div key={freeze.id} className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <h3 className="text-lg font-bold text-[#0F172A]">{freeze.cliente}</h3>
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                      freeze.estado === 'activo' 
                        ? 'bg-[#FEF3C7] text-[#F59E0B] border-[#F59E0B]/20'
                        : freeze.estado === 'programado'
                        ? 'bg-[#DBEAFE] text-[#3B82F6] border-[#3B82F6]/20'
                        : 'bg-[#D1FAE5] text-[#10B981] border-[#10B981]/20'
                    }`}>
                      {freeze.estado === 'activo' ? 'Activo' : 
                       freeze.estado === 'programado' ? 'Programado' : 'Finalizado'}
                    </span>
                  </div>

                  <p className="text-[#64748B] mb-3 font-semibold">{freeze.plan}</p>

                  <div className="flex flex-wrap gap-4 text-sm text-[#64748B] font-medium">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      Inicio: {new Date(freeze.fecha_inicio_freeze).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      Fin: {new Date(freeze.fecha_fin_freeze).toLocaleDateString()}
                    </span>
                    {diasFaltantes > 0 && (
                      <span className="font-bold text-[#F59E0B]">
                        {diasFaltantes} días restantes
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-[#64748B] mt-3 bg-[#F8FAFC] px-3 py-2 rounded-lg inline-block">
                    <span className="font-semibold text-[#0F172A]">Motivo:</span> {freeze.motivo}
                  </p>
                </div>

                {freeze.estado === 'activo' && (
                  <button
                    onClick={() => reactivarSuscripcion(freeze.id)}
                    className="flex items-center gap-2 bg-[#10B981] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#059669] active:bg-[#047857] transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <Play className="w-4 h-4" />
                    Reactivar Ahora
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {freezes.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-[#E2E8F0]">
          <div className="bg-[#F8FAFC] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Pause className="w-8 h-8 text-[#94A3B8]" />
          </div>
          <h3 className="text-[#0F172A] text-lg font-semibold mb-2">No hay suscripciones en freeze</h3>
          <p className="text-[#64748B]">No hay pausas temporales programadas o activas</p>
        </div>
      )}
    </div>
  );
}

