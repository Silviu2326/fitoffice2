import { CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react';

interface AdherenciaTrackerProps {
  tipo: 'personal' | 'gimnasio';
}

export default function AdherenciaTracker({ tipo }: AdherenciaTrackerProps) {
  // Datos de ejemplo
  const adherenciaPersonal = {
    totalSesiones: 20,
    completadas: 16,
    porcentaje: 80
  };

  const adherenciaGimnasio = {
    totalClases: 45,
    ocupacionPromedio: 75,
    asistenciaTotal: 567
  };

  if (tipo === 'personal') {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-[#E2E8F0] p-6 hover:shadow-xl transition-all duration-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[20px] leading-7 font-semibold text-[#0F172A]">Tracker de Adherencia</h3>
          <TrendingUp className="w-6 h-6 text-[#10B981]" />
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0]">
            <p className="text-[12px] leading-4 font-medium text-[#64748B] mb-1">Total Sesiones</p>
            <p className="text-[24px] leading-8 font-bold text-[#0F172A]">{adherenciaPersonal.totalSesiones}</p>
          </div>
          <div className="bg-[#D1FAE5] rounded-xl p-4 border border-[#10B981]/20">
            <p className="text-[12px] leading-4 font-medium text-[#64748B] mb-1">Completadas</p>
            <p className="text-[24px] leading-8 font-bold text-[#10B981]">{adherenciaPersonal.completadas}</p>
          </div>
          <div className="bg-[#EEF2FF] rounded-xl p-4 border border-[#6366F1]/20">
            <p className="text-[12px] leading-4 font-medium text-[#64748B] mb-1">Adherencia</p>
            <p className="text-[24px] leading-8 font-bold text-[#6366F1]">{adherenciaPersonal.porcentaje}%</p>
          </div>
        </div>

        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-[12px] leading-4 font-semibold inline-block text-[#10B981]">
                Progreso de adherencia
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-xl bg-[#D1FAE5]">
            <div
              style={{ width: `${adherenciaPersonal.porcentaje}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-[#10B981] to-[#059669] transition-all duration-300"
            ></div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[14px] leading-5 text-[#64748B] mt-4">
          <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
          <span>Seguimiento individual por cliente</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-[#E2E8F0] p-6 hover:shadow-xl transition-all duration-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[20px] leading-7 font-semibold text-[#0F172A]">Tracker de Ocupación</h3>
        <TrendingUp className="w-6 h-6 text-[#6366F1]" />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0]">
          <p className="text-[12px] leading-4 font-medium text-[#64748B] mb-1">Total Clases</p>
          <p className="text-[24px] leading-8 font-bold text-[#0F172A]">{adherenciaGimnasio.totalClases}</p>
        </div>
        <div className="bg-[#EEF2FF] rounded-xl p-4 border border-[#6366F1]/20">
          <p className="text-[12px] leading-4 font-medium text-[#64748B] mb-1">Ocupación Media</p>
          <p className="text-[24px] leading-8 font-bold text-[#6366F1]">{adherenciaGimnasio.ocupacionPromedio}%</p>
        </div>
        <div className="bg-[#D1FAE5] rounded-xl p-4 border border-[#10B981]/20">
          <p className="text-[12px] leading-4 font-medium text-[#64748B] mb-1">Asistencia Total</p>
          <p className="text-[24px] leading-8 font-bold text-[#10B981]">{adherenciaGimnasio.asistenciaTotal}</p>
        </div>
      </div>

      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-[12px] leading-4 font-semibold inline-block text-[#6366F1]">
              Ocupación promedio de clases
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-xl bg-[#EEF2FF]">
          <div
            style={{ width: `${adherenciaGimnasio.ocupacionPromedio}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] transition-all duration-300"
          ></div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-[14px] leading-5 text-[#64748B] mt-4">
        <AlertCircle className="w-4 h-4 text-[#6366F1]" />
        <span>Métricas de ocupación por clase</span>
      </div>
    </div>
  );
}
