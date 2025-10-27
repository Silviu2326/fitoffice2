import { useState } from 'react';
import { Activity, BarChart3 } from 'lucide-react';
import AdherenciaTracker from '../components/AdherenciaTracker';
import CumplimientoCliente from '../components/CumplimientoCliente';
import OcupacionClase from '../components/OcupacionClase';
import SeguimientoGrupal from '../components/SeguimientoGrupal';
import MetricasAdherencia from '../components/MetricasAdherencia';
import AlertasAdherencia from '../components/AlertasAdherencia';
import AnalizadorTendencias from '../components/AnalizadorTendencias';
import OptimizadorAdherencia from '../components/OptimizadorAdherencia';

export default function AdherenciaCumplimientoEntrenoPage() {
  const [tipoNegocio, setTipoNegocio] = useState<'personal' | 'gimnasio'>('personal');

  return (
    <div className="flex-1 overflow-y-auto bg-[#F8FAFC]">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] p-3 rounded-2xl shadow-lg">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-[30px] leading-[38px] font-bold text-[#0F172A]">Adherencia & Cumplimiento de Entreno</h1>
                <p className="text-[#64748B] mt-1 text-[16px] leading-6">
                  Sistema de seguimiento de adherencia con lógica diferenciada
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-1 flex gap-2 border border-[#E2E8F0]">
              <button
                onClick={() => setTipoNegocio('personal')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  tipoNegocio === 'personal'
                    ? 'bg-[#6366F1] text-white shadow-md hover:bg-[#4F46E5]'
                    : 'text-[#64748B] hover:bg-[#F8FAFC]'
                }`}
              >
                Entrenador Personal
              </button>
              <button
                onClick={() => setTipoNegocio('gimnasio')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  tipoNegocio === 'gimnasio'
                    ? 'bg-[#6366F1] text-white shadow-md hover:bg-[#4F46E5]'
                    : 'text-[#64748B] hover:bg-[#F8FAFC]'
                }`}
              >
                Gimnasio / Centro
              </button>
            </div>
          </div>

          {/* Descripción según tipo */}
          <div className="rounded-xl p-4 border bg-[#EEF2FF] border-[#6366F1]/20">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-5 h-5 text-[#6366F1]" />
              <p className="font-semibold text-[#0F172A] text-[16px]">
                {tipoNegocio === 'personal' 
                  ? '¿Este cliente hizo la sesión que le mandé? - Seguimiento individual'
                  : '% de ocupación en la clase vs plazas - Métricas grupales'}
              </p>
            </div>
          </div>
        </div>

        {/* Contenido según tipo de negocio */}
        {tipoNegocio === 'personal' ? (
          <>
            {/* Vista Entrenador Personal */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <AdherenciaTracker tipo="personal" />
              <MetricasAdherencia />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <CumplimientoCliente />
              <AlertasAdherencia />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnalizadorTendencias />
              <OptimizadorAdherencia />
            </div>
          </>
        ) : (
          <>
            {/* Vista Gimnasio */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <AdherenciaTracker tipo="gimnasio" />
              <OcupacionClase />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <SeguimientoGrupal />
              <MetricasAdherencia />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnalizadorTendencias />
              <OptimizadorAdherencia />
            </div>
          </>
        )}

        {/* Nota informativa */}
        <div className="mt-8 bg-gradient-to-r from-[#F8FAFC] to-[#F1F5F9] border border-[#E2E8F0] rounded-2xl p-6 shadow-md">
          <div className="flex items-start gap-4">
            <div className="bg-[#EEF2FF] rounded-xl p-3 mt-1">
              <Activity className="w-6 h-6 text-[#6366F1]" />
            </div>
            <div>
              <h3 className="font-semibold text-[#0F172A] text-[20px] leading-7 mb-3">Lógica Diferenciada por Tipo de Negocio</h3>
              <p className="text-[#64748B] text-[14px] leading-5">
                <strong className="text-[#0F172A]">Para entrenadores personales:</strong> El sistema se enfoca en el seguimiento individual de cada cliente, 
                monitoreando si completan las sesiones asignadas, calculando su adherencia personal y generando alertas 
                cuando el cumplimiento es bajo.
              </p>
              <p className="text-[#64748B] text-[14px] leading-5 mt-3">
                <strong className="text-[#0F172A]">Para gimnasios y centros:</strong> El enfoque cambia a métricas grupales como el porcentaje de 
                ocupación de clases vs plazas disponibles, seguimiento de cuántos socios siguen los planes grupales estándar, 
                y optimización de horarios según tendencias de asistencia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

