import { Users, TrendingUp, Calendar, Clock } from 'lucide-react';

interface Clase {
  id: string;
  nombre: string;
  horario: string;
  dia: string;
  plazasTotal: number;
  plazasOcupadas: number;
  ocupacion: number;
}

export default function OcupacionClase() {
  // Datos de ejemplo
  const clases: Clase[] = [
    {
      id: '1',
      nombre: 'Spinning Intenso',
      horario: '07:00',
      dia: 'Lunes',
      plazasTotal: 20,
      plazasOcupadas: 18,
      ocupacion: 90
    },
    {
      id: '2',
      nombre: 'Yoga Flow',
      horario: '09:00',
      dia: 'Lunes',
      plazasTotal: 15,
      plazasOcupadas: 12,
      ocupacion: 80
    },
    {
      id: '3',
      nombre: 'CrossFit WOD',
      horario: '18:00',
      dia: 'Lunes',
      plazasTotal: 25,
      plazasOcupadas: 10,
      ocupacion: 40
    },
    {
      id: '4',
      nombre: 'Pilates Reformer',
      horario: '11:00',
      dia: 'Martes',
      plazasTotal: 12,
      plazasOcupadas: 11,
      ocupacion: 92
    }
  ];

  const getOcupacionColor = (ocupacion: number) => {
    if (ocupacion >= 80) return 'bg-[#10B981]';
    if (ocupacion >= 60) return 'bg-[#F59E0B]';
    if (ocupacion >= 40) return 'bg-[#F97316]';
    return 'bg-[#EF4444]';
  };

  const getOcupacionBgColor = (ocupacion: number) => {
    if (ocupacion >= 80) return 'bg-[#D1FAE5] border-[#10B981]/20';
    if (ocupacion >= 60) return 'bg-[#FEF3C7] border-[#F59E0B]/20';
    if (ocupacion >= 40) return 'bg-[#FFEDD5] border-[#F97316]/20';
    return 'bg-[#FEE2E2] border-[#EF4444]/20';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-[#E2E8F0] p-6 hover:shadow-xl transition-all duration-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-[20px] leading-7 font-semibold text-[#0F172A]">Ocupación de Clases</h3>
          <p className="text-[14px] leading-5 text-[#64748B] mt-1">% de ocupación vs plazas disponibles</p>
        </div>
        <Users className="w-6 h-6 text-[#6366F1]" />
      </div>

      <div className="space-y-4">
        {clases.map((clase) => (
          <div key={clase.id} className={`border rounded-xl p-4 ${getOcupacionBgColor(clase.ocupacion)} hover:shadow-md transition-all duration-200`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-[#0F172A] text-[16px]">{clase.nombre}</h4>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1 text-[14px] leading-5 text-[#64748B]">
                    <Calendar className="w-4 h-4" />
                    <span>{clase.dia}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[14px] leading-5 text-[#64748B]">
                    <Clock className="w-4 h-4" />
                    <span>{clase.horario}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[24px] leading-8 font-bold text-[#0F172A]">{clase.ocupacion}%</p>
                <p className="text-[12px] leading-4 text-[#64748B]">ocupación</p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-2">
              <span className="text-[14px] leading-5 text-[#64748B]">
                {clase.plazasOcupadas} / {clase.plazasTotal} plazas
              </span>
              <span className="text-[14px] leading-5 font-semibold text-[#0F172A]">
                {clase.plazasTotal - clase.plazasOcupadas} disponibles
              </span>
            </div>

            <div className="relative pt-1">
              <div className="overflow-hidden h-3 text-xs flex rounded-xl bg-[#E2E8F0]">
                <div
                  style={{ width: `${clase.ocupacion}%` }}
                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${getOcupacionColor(clase.ocupacion)} transition-all duration-300`}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-[#EEF2FF] rounded-xl p-4 border border-[#6366F1]/20">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-[#6366F1]" />
            <p className="text-[14px] leading-5 font-semibold text-[#0F172A]">Ocupación Media</p>
          </div>
          <p className="text-[32px] leading-10 font-bold text-[#6366F1]">75.5%</p>
        </div>
        <div className="bg-[#D1FAE5] rounded-xl p-4 border border-[#10B981]/20">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-[#10B981]" />
            <p className="text-[14px] leading-5 font-semibold text-[#0F172A]">Total Asistentes</p>
          </div>
          <p className="text-[32px] leading-10 font-bold text-[#10B981]">51</p>
        </div>
      </div>
    </div>
  );
}
